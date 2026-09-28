import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { promisify } from "node:util";
import YAML from "yaml";
import { articleDescription, blueskyText } from "../lib/cards.mjs";
import { GitReceiptStore, publish } from "./publish.mjs";

const DID = { agent: "did:plc:agent", operator: "did:plc:operator" };
const ENV = {
  BLUESKY_AGENT_IDENTIFIER: "agent.smith.wiki",
  BLUESKY_AGENT_APP_PASSWORD: "agent-password",
  BLUESKY_OPERATOR_IDENTIFIER: "operator.smith.wiki",
  BLUESKY_OPERATOR_APP_PASSWORD: "operator-password",
};
const ID = ["3m5xk2aaaaaa2", "3m5xk2aaaaaa3", "3m5xk2aaaaaa4", "3m5xk2aaaaaa5"];
const BLOG = "3m4aaaaaaaaa2";
const page = (id) => `https://cards.smith.wiki/${id}/`;
const uri = (author, id) => `at://${DID[author]}/app.bsky.feed.post/${id}`;

async function repo(cards) {
  const root = await mkdtemp(path.join(os.tmpdir(), "cards-"));
  for (const { body = "A Card.", article, receipt, ...data } of cards) {
    const dir = path.join(root, "cards", data.id);
    await mkdir(dir, { recursive: true });
    const frontmatter = { author: "agent", created: "2026-09-28T14:03:22.417Z", ...data, ...(article ? { article: true } : {}) };
    await writeFile(path.join(dir, "index.md"), `---\n${YAML.stringify(frontmatter)}---\n${body}\n`);
    if (article) await writeFile(path.join(dir, "article.md"), article);
    if (receipt) await writeFile(path.join(dir, "bluesky.json"), JSON.stringify(receipt));
  }
  return root;
}

const receiptOf = (author, id) => ({ uri: uri(author, id), cid: `cid-${id}`, url: "https://bsky.app/…", published_at: "2026-09-28T00:00:00.000Z" });

/**
 * A fake network: Card pages, two Bluesky accounts, the public AppView,
 * cardyb, and external pages/images. `routes` overrides any URL prefix.
 */
function network({ visible = {}, routes = {} } = {}) {
  const calls = [];
  const created = [];
  const fetchImpl = async (url, init = {}) => {
    const method = init.method || "GET";
    calls.push({ url, method });
    for (const [prefix, handler] of Object.entries(routes)) {
      if (url.startsWith(prefix)) return handler(url, init);
    }
    if (url.startsWith("https://cards.smith.wiki/")) return new Response("ok");
    if (url.endsWith("/com.atproto.server.createSession")) {
      const { identifier } = JSON.parse(init.body);
      const author = identifier.split(".")[0];
      return Response.json({ accessJwt: `jwt-${author}`, did: DID[author], handle: identifier });
    }
    if (url.endsWith("/com.atproto.repo.createRecord")) {
      const body = JSON.parse(init.body);
      created.push(body);
      return Response.json({ uri: `at://${body.repo}/app.bsky.feed.post/${body.rkey}`, cid: `cid-${body.rkey}` });
    }
    if (url.endsWith("/com.atproto.repo.uploadBlob")) {
      return Response.json({ blob: { $type: "blob", ref: { $link: `blob-${init.body.byteLength}` }, mimeType: init.headers["Content-Type"], size: init.body.byteLength } });
    }
    if (url.startsWith("https://public.api.bsky.app/xrpc/app.bsky.feed.getPosts")) {
      const wanted = new URL(url).searchParams.get("uris");
      return Response.json({ posts: visible[wanted] ? [{ uri: wanted, ...visible[wanted] }] : [] });
    }
    throw new Error(`unexpected fetch ${method} ${url}`);
  };
  return { fetchImpl, calls, created };
}

function memoryStore() {
  const saved = [];
  return { saved, save: async (id, receipt) => void saved.push({ id, receipt }) };
}

async function run(root, net, options = {}) {
  const store = memoryStore();
  const lines = [];
  const result = await publish({
    root,
    env: ENV,
    fetchImpl: net.fetchImpl,
    store,
    log: (line) => lines.push(line),
    sleep: async () => {},
    now: () => Date.parse("2026-09-28T15:00:00Z"),
    ...options,
  });
  return { result, store, lines };
}

test("Bluesky text replaces links with anchors and facets use UTF-8 byte offsets", () => {
  const { text, facets } = blueskyText(
    `Café — see [the résumé](${page(ID[0])}) and [the “post”](https://andysmith.ai/2026/Sep/1/x/).`,
  );
  assert.equal(text, "Café — see the résumé and the “post”.");
  assert.deepEqual(facets.map((facet) => facet.index), [
    { byteStart: 14, byteEnd: 26 },
    { byteStart: 31, byteEnd: 45 },
  ]);
  const bytes = new TextEncoder().encode(text);
  const anchors = facets.map(({ index }) => new TextDecoder().decode(bytes.slice(index.byteStart, index.byteEnd)));
  assert.deepEqual(anchors, ["the résumé", "the “post”"]);
  assert.deepEqual(facets.map((facet) => facet.features[0].uri), [page(ID[0]), "https://andysmith.ai/2026/Sep/1/x/"]);
});

test("Short text of exactly 300 graphemes publishes; 301 fails and stays pending", async () => {
  // Link markup does not count; each "é" is one grapheme but two bytes.
  const at300 = `[x](${page(ID[3])})${"é".repeat(299)}`;
  const root = await repo([
    { id: ID[0], body: at300 },
    { id: ID[1], body: `${at300}é` },
  ]);
  const net = network();
  const { result, store } = await run(root, net);
  assert.deepEqual(result.published, [ID[0]]);
  assert.deepEqual(result.failed, [ID[1]]);
  assert.deepEqual(net.created.map((body) => body.rkey), [ID[0]]);
  assert.deepEqual(store.saved.map((entry) => entry.id), [ID[0]]);
});

test("pending Cards publish in ascending Card ID order and Cards with a receipt are skipped", async () => {
  const root = await repo([
    { id: ID[2], body: "Third." },
    { id: ID[1], body: "Second.", receipt: receiptOf("agent", ID[1]) },
    { id: ID[0], body: "First." },
  ]);
  const net = network();
  const { result, store } = await run(root, net);
  assert.deepEqual(net.created.map((body) => body.rkey), [ID[0], ID[2]]);
  assert.deepEqual(result.published, [ID[0], ID[2]]);
  const [first] = net.created;
  assert.equal(first.repo, DID.agent);
  assert.equal(first.validate, true);
  assert.equal(first.record.text, "First.");
  assert.deepEqual(first.record.langs, ["en"]);
  assert.deepEqual(store.saved[0].receipt, {
    uri: uri("agent", ID[0]),
    cid: `cid-${ID[0]}`,
    url: `https://bsky.app/profile/${DID.agent}/post/${ID[0]}`,
    published_at: "2026-09-28T15:00:00.000Z",
  });
});

test("a reply is deferred while its parent is not visible on Bluesky", async () => {
  const root = await repo([
    { id: ID[0], author: "operator", body: "Reply.", parent: { id: BLOG, uri: uri("operator", BLOG), url: "https://andysmith.ai/2026/Sep/1/x/", text: "Blog." } },
  ]);
  const net = network();
  const { result, store } = await run(root, net);
  assert.deepEqual(result.deferred, [ID[0]]);
  assert.equal(net.created.length, 0);
  assert.equal(store.saved.length, 0);
});

test("a reply to a parent that is itself a reply keeps the parent's root", async () => {
  const blogRoot = { uri: uri("operator", "3m3aaaaaaaaa2"), cid: "cid-root" };
  const root = await repo([
    { id: ID[0], author: "operator", body: "Reply.", parent: { id: BLOG, uri: uri("agent", BLOG), url: page(BLOG), text: "Blog reply." } },
  ]);
  const net = network({ visible: { [uri("agent", BLOG)]: { cid: "cid-parent", record: { reply: { root: blogRoot, parent: blogRoot } } } } });
  await run(root, net);
  assert.deepEqual(net.created[0].record.reply, {
    parent: { uri: uri("agent", BLOG), cid: "cid-parent" },
    root: blogRoot,
  });
});

test("a reply to a same-repo reply takes the root from the chain of receipts", async () => {
  const root = await repo([
    { id: ID[0], body: "Root.", receipt: receiptOf("agent", ID[0]) },
    { id: ID[1], author: "operator", body: "Reply.", parent: { id: ID[0], uri: uri("agent", ID[0]), url: page(ID[0]), text: "Root." }, receipt: receiptOf("operator", ID[1]) },
    { id: ID[2], body: "Reply to reply.", parent: { id: ID[1], uri: uri("operator", ID[1]), url: page(ID[1]), text: "Reply." } },
  ]);
  const net = network();
  await run(root, net);
  assert.deepEqual(net.created[0].record.reply, {
    parent: { uri: uri("operator", ID[1]), cid: `cid-${ID[1]}` },
    root: { uri: uri("agent", ID[0]), cid: `cid-${ID[0]}` },
  });
  assert.equal(net.calls.filter((call) => call.url.includes("getPosts")).length, 0);
});

test("a post that already exists is recorded without a second create", async () => {
  const root = await repo([{ id: ID[0], body: "Posted before." }]);
  let creates = 0;
  const net = network({
    routes: {
      "https://bsky.social/xrpc/com.atproto.repo.createRecord": () => {
        creates++;
        return Response.json({ error: "InvalidRequest", message: "Record already exists" }, { status: 400 });
      },
      "https://bsky.social/xrpc/com.atproto.repo.getRecord": (url) => {
        assert.equal(new URL(url).searchParams.get("rkey"), ID[0]);
        return Response.json({ uri: uri("agent", ID[0]), cid: "cid-existing", value: { createdAt: "2026-09-28T14:05:00.000Z" } });
      },
    },
  });
  const { result, store } = await run(root, net);
  assert.equal(creates, 1);
  assert.deepEqual(result.published, [ID[0]]);
  assert.deepEqual(store.saved[0].receipt, {
    uri: uri("agent", ID[0]),
    cid: "cid-existing",
    url: `https://bsky.app/profile/${DID.agent}/post/${ID[0]}`,
    published_at: "2026-09-28T14:05:00.000Z",
  });
});

test("images upload each file and keep alt text", async () => {
  const root = await repo([{
    id: ID[0],
    body: "Two charts.",
    images: [
      { src: "https://cards-files.smith.wiki/a.png", alt: "First chart", mime: "image/png" },
      { src: "https://cards-files.smith.wiki/b.jpg", alt: "Second chart", mime: "image/jpeg" },
    ],
  }]);
  const net = network({ routes: { "https://cards-files.smith.wiki/": (url) => new Response(new Uint8Array(url.endsWith("a.png") ? 10 : 20)) } });
  await run(root, net);
  assert.deepEqual(net.created[0].record.embed, {
    $type: "app.bsky.embed.images",
    images: [
      { image: { $type: "blob", ref: { $link: "blob-10" }, mimeType: "image/png", size: 10 }, alt: "First chart" },
      { image: { $type: "blob", ref: { $link: "blob-20" }, mimeType: "image/jpeg", size: 20 }, alt: "Second chart" },
    ],
  });
});

test("a Link falls back to OpenGraph tags, frontmatter overrides win, and an oversized thumb is dropped", async () => {
  const root = await repo([
    { id: ID[0], body: "A paper.", link: { url: "https://example.com/paper", title: "Override title" } },
    { id: ID[1], body: "Another paper.", link: { url: "https://example.com/big" } },
  ]);
  const html = (image) => `<html><head><title>Fallback</title><meta property="og:title" content="OG &amp; title"><meta name="description" content="OG description"><meta property="og:image" content="${image}"></head></html>`;
  const net = network({
    routes: {
      "https://cardyb.bsky.app/": () => Response.json({ error: "Unable to generate link preview" }),
      "https://example.com/paper": () => new Response(html("/thumb.png"), { headers: { "content-type": "text/html" } }),
      "https://example.com/big": () => new Response(html("https://example.com/big.png"), { headers: { "content-type": "text/html" } }),
      "https://example.com/thumb.png": () => new Response(new Uint8Array(1_000_000), { headers: { "content-type": "image/png" } }),
      "https://example.com/big.png": () => new Response(new Uint8Array(1_000_001), { headers: { "content-type": "image/png" } }),
    },
  });
  await run(root, net);
  assert.deepEqual(net.created[0].record.embed, {
    $type: "app.bsky.embed.external",
    external: {
      uri: "https://example.com/paper",
      title: "Override title",
      description: "OG description",
      thumb: { $type: "blob", ref: { $link: "blob-1000000" }, mimeType: "image/png", size: 1_000_000 },
    },
  });
  assert.deepEqual(net.created[1].record.embed.external, { uri: "https://example.com/big", title: "OG & title", description: "OG description" });
});

test("a Link uses cardyb metadata when it has a preview", async () => {
  const root = await repo([{ id: ID[0], body: "A paper.", link: { url: "https://example.com/paper", description: "Override description" } }]);
  const net = network({
    routes: {
      "https://cardyb.bsky.app/v1/extract?url=https%3A%2F%2Fexample.com%2Fpaper": () =>
        Response.json({ error: "", title: "Cardyb title", description: "Cardyb description", image: "https://cardyb.bsky.app/v1/image?url=x" }),
      "https://cardyb.bsky.app/v1/image": () => new Response(new Uint8Array(5), { headers: { "content-type": "image/jpeg" } }),
    },
  });
  await run(root, net);
  assert.deepEqual(net.created[0].record.embed.external, {
    uri: "https://example.com/paper",
    title: "Cardyb title",
    description: "Override description",
    thumb: { $type: "blob", ref: { $link: "blob-5" }, mimeType: "image/jpeg", size: 5 },
  });
  assert.equal(net.calls.some((call) => call.url === "https://example.com/paper"), false);
});

test("an Article embeds the Card page with the plain Short text and the Article's first paragraph", async () => {
  const root = await repo([{
    id: ID[0],
    body: `Findings, building on [the survey](${page(ID[3])}).`,
    article: "# Findings\n\nAgents **share** a [wiki](https://example.com/w)\nacross sessions.\n\nSecond paragraph.\n",
  }]);
  const net = network();
  await run(root, net);
  assert.deepEqual(net.created[0].record.embed, {
    $type: "app.bsky.embed.external",
    external: { uri: page(ID[0]), title: "Findings, building on the survey.", description: "Agents share a wiki across sessions." },
  });
});

test("an Article description is cut to 300 code points", () => {
  const description = articleDescription(`${"é".repeat(400)}\n\nNext.`);
  assert.equal(Array.from(description).length, 300);
  assert.ok(description.endsWith("…"));
});

test("Cards whose page is not live stay pending once the wait budget is spent", async () => {
  const root = await repo([{ id: ID[0] }, { id: ID[1] }]);
  let clock = 0;
  const sleeps = [];
  const net = network({ routes: { "https://cards.smith.wiki/": () => new Response("missing", { status: 404 }) } });
  const { result } = await run(root, net, {
    now: () => clock,
    sleep: async (ms) => {
      sleeps.push(ms);
      clock += ms;
    },
    pageWaitBudgetMs: 60_000,
    pagePollIntervalMs: 20_000,
  });
  assert.deepEqual(result.deferred, [ID[0], ID[1]]);
  assert.equal(net.created.length, 0);
  assert.equal(clock, 60_000);
  assert.equal(net.calls.filter((call) => call.url === page(ID[1])).length, 1);
});

test("the git receipt store commits a receipt once and never overwrites it", async () => {
  const root = await repo([{ id: ID[0] }]);
  const git = (...args) => promisify(execFile)("git", args, { cwd: root });
  await git("init", "--quiet", "-b", "main");
  await git("-c", "user.name=t", "-c", "user.email=t@t", "commit", "--quiet", "--allow-empty", "-m", "init");
  const store = new GitReceiptStore({ root, push: false });
  store.run = (...args) => git("-c", "user.name=t", "-c", "user.email=t@t", ...args);
  const receipt = receiptOf("agent", ID[0]);
  await store.save(ID[0], receipt);
  assert.deepEqual(JSON.parse(await readFile(path.join(root, "cards", ID[0], "bluesky.json"), "utf8")), receipt);
  const { stdout } = await git("log", "--format=%s", "--name-only", "-1");
  assert.equal(stdout.trim(), `Publish Card ${ID[0]} to Bluesky\n\ncards/${ID[0]}/bluesky.json`);
  await assert.rejects(store.save(ID[0], { ...receipt, cid: "other" }), { code: "EEXIST" });
});
