import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { promisify } from "node:util";
import YAML from "yaml";
import { articleDescription, blueskyText } from "../lib/cards.mjs";
import { GitReceiptStore, mp4AspectRatio, publish } from "./publish.mjs";

const DID = { agent: "did:plc:agent", operator: "did:plc:operator" };
const ENV = {
  BLUESKY_AGENT_IDENTIFIER: "agent.smith.wiki",
  BLUESKY_AGENT_APP_PASSWORD: "agent-password",
  BLUESKY_OPERATOR_IDENTIFIER: "operator.smith.wiki",
  BLUESKY_OPERATOR_APP_PASSWORD: "operator-password",
};
const ID = ["3m5xk2aaaaaa2", "3m5xk2aaaaaa3", "3m5xk2aaaaaa4", "3m5xk2aaaaaa5"];
const BLOG = "3m4aaaaaaaaa2";
const page = (id) => `https://andy.smith.wiki/${id}/`;
const legacyPage = (id) => `https://cards.smith.wiki/${id}/`;
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
    if (/^https:\/\/(andy|cards)\.smith\.wiki\//.test(url)) throw new Error(`publication must not fetch Card pages: ${url}`);
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
    now: () => Date.parse("2026-09-28T15:00:00Z"),
    sleep: async () => {},
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

test("links to Cards become links to the Cards' Bluesky posts under their authors' DIDs", async () => {
  const root = await repo([
    { id: ID[0], author: "operator", body: "Question.", parent: { id: BLOG, uri: uri("operator", BLOG), url: "https://andysmith.ai/2026/Sep/1/x/", text: "Blog." }, receipt: receiptOf("operator", ID[0]) },
    { id: ID[1], body: "Unpublished yet." },
    { id: ID[2], body: `See [the question](${page(ID[0])}), [the note](${legacyPage(ID[1])}), and [the post](https://andysmith.ai/2026/Sep/1/x/).` },
  ]);
  const net = network();
  await run(root, net);
  const record = net.created.find((body) => body.rkey === ID[2]).record;
  assert.deepEqual(record.facets.map((facet) => facet.features[0].uri), [
    `https://bsky.app/profile/${DID.operator}/post/${ID[0]}`,
    `https://bsky.app/profile/${DID.agent}/post/${ID[1]}`,
    "https://andysmith.ai/2026/Sep/1/x/",
  ]);
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

// A minimal MP4: boxes nested as given, with track headers of the given size.
function box(type, ...parts) {
  const body = Buffer.concat(parts.map((part) => Buffer.from(part)));
  const header = Buffer.alloc(8);
  header.writeUInt32BE(8 + body.length);
  header.write(type, 4, "latin1");
  return Buffer.concat([header, body]);
}

function tkhd({ version = 0, width, height, rotated = false }) {
  const times = version === 1 ? 32 : 20;
  const body = Buffer.alloc(4 + times + 16 + 36 + 8);
  body[0] = version;
  const matrix = 4 + times + 16;
  // 90 degrees: a = 0, b = 1, c = -1, d = 0; identity otherwise (16.16, w = 1 in 2.30).
  const [a, b, c, d] = rotated ? [0, 0x10000, -0x10000, 0] : [0x10000, 0, 0, 0x10000];
  body.writeInt32BE(a, matrix);
  body.writeInt32BE(b, matrix + 4);
  body.writeInt32BE(c, matrix + 12);
  body.writeInt32BE(d, matrix + 16);
  body.writeInt32BE(0x40000000, matrix + 32);
  body.writeUInt32BE(width * 0x10000, matrix + 36);
  body.writeUInt32BE(height * 0x10000, matrix + 40);
  return box("tkhd", body);
}

// moov after mdat, as many encoders write it; one trak per track header.
const mp4 = (...tracks) =>
  new Uint8Array(Buffer.concat([box("ftyp", "isom"), box("mdat", Buffer.alloc(16)), box("moov", box("mvhd", Buffer.alloc(100)), ...tracks.map((track) => box("trak", track)))]));

test("the video aspect ratio comes from the first sized track header, rotation-aware", () => {
  // An audio track (0 x 0) comes first; the video track is version 1.
  assert.deepEqual(mp4AspectRatio(mp4(tkhd({ width: 0, height: 0 }), tkhd({ version: 1, width: 1920, height: 1080 }))), { width: 1920, height: 1080 });
  assert.deepEqual(mp4AspectRatio(mp4(tkhd({ width: 1920, height: 1080, rotated: true }))), { width: 1080, height: 1920 });
  assert.equal(mp4AspectRatio(new Uint8Array([0x1a, 0x45, 0xdf, 0xa3, 0x9f, 0x42, 0x86, 0x81, 0x01])), null);
});

/** The video service, the author's PDS (from the session's DID document), and the video file. */
function videoNetwork(jobStatuses) {
  const pds = "https://pds.example.com";
  const polls = [];
  const net = network({
    routes: {
      "https://bsky.social/xrpc/com.atproto.server.createSession": () =>
        Response.json({
          accessJwt: "jwt-agent",
          did: DID.agent,
          didDoc: { id: DID.agent, service: [{ id: "#atproto_pds", type: "AtprotoPersonalDataServer", serviceEndpoint: pds }] },
        }),
      "https://files.smith.wiki/cards/v.mp4": () => new Response(mp4(tkhd({ width: 1280, height: 720 }))),
      [`${pds}/xrpc/com.atproto.server.getServiceAuth`]: (url, init) => {
        const query = new URL(url).searchParams;
        assert.equal(init.headers.Authorization, "Bearer jwt-agent");
        assert.equal(query.get("aud"), "did:web:pds.example.com");
        assert.equal(query.get("lxm"), "com.atproto.repo.uploadBlob");
        return Response.json({ token: "service-token" });
      },
      "https://video.bsky.app/xrpc/app.bsky.video.uploadVideo": (url, init) => {
        const query = new URL(url).searchParams;
        assert.equal(init.headers.Authorization, "Bearer service-token");
        assert.equal(init.headers["Content-Type"], "video/mp4");
        assert.equal(query.get("did"), DID.agent);
        assert.equal(query.get("name"), `${ID[0]}.mp4`);
        return Response.json({ jobId: "job-1", did: DID.agent, state: "JOB_STATE_CREATED" });
      },
      "https://video.bsky.app/xrpc/app.bsky.video.getJobStatus?jobId=job-1": () => {
        polls.push(jobStatuses[polls.length]);
        return Response.json({ jobStatus: { jobId: "job-1", did: DID.agent, ...jobStatuses[polls.length - 1] } });
      },
    },
  });
  return { net, polls };
}

const VIDEO_BLOB = { $type: "blob", ref: { $link: "bafkvideo" }, mimeType: "video/mp4", size: 1234 };

test("a video is processed by the video service and posts its blob with alt text and aspect ratio", async () => {
  const root = await repo([{ id: ID[0], body: "A demo.", video: { src: "https://files.smith.wiki/cards/v.mp4", mime: "video/mp4", alt: "The demo" } }]);
  const { net, polls } = videoNetwork([
    { state: "JOB_STATE_ENCODING", progress: 40 },
    { state: "JOB_STATE_COMPLETED", blob: VIDEO_BLOB },
  ]);
  const { result, store } = await run(root, net);
  assert.equal(polls.length, 2);
  assert.deepEqual(net.created[0].record.embed, {
    $type: "app.bsky.embed.video",
    video: VIDEO_BLOB,
    alt: "The demo",
    aspectRatio: { width: 1280, height: 720 },
  });
  assert.deepEqual(result.published, [ID[0]]);
  assert.equal(store.saved.length, 1);
});

test("a failed video processing job leaves the Card pending", async () => {
  const root = await repo([{ id: ID[0], body: "A demo.", video: { src: "https://files.smith.wiki/cards/v.mp4", mime: "video/mp4", alt: "The demo" } }]);
  const { net } = videoNetwork([{ state: "JOB_STATE_FAILED", error: "Video too long" }]);
  const { result, store, lines } = await run(root, net);
  assert.deepEqual(result.failed, [ID[0]]);
  assert.equal(net.created.length, 0);
  assert.equal(store.saved.length, 0);
  assert.match(lines.join("\n"), /Video too long/);
});

test("an HTML page previews the Card page with the page's title and description", async () => {
  const root = await repo([
    { id: ID[0], body: "A toy.", html: { src: "https://files.smith.wiki/cards/t.html", title: "Toy", description: "A small toy" } },
    { id: ID[1], body: "Another toy.", html: { src: "https://files.smith.wiki/cards/u.html", title: "Other toy" } },
  ]);
  const net = network();
  await run(root, net);
  assert.deepEqual(net.created[0].record.embed, {
    $type: "app.bsky.embed.external",
    external: { uri: page(ID[0]), title: "Toy", description: "A small toy" },
  });
  assert.deepEqual(net.created[1].record.embed.external, { uri: page(ID[1]), title: "Other toy", description: "" });
  assert.equal(net.calls.some((call) => call.url.includes(".html")), false);
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

test("an Article previews the Card page as 'Read more' with the Article's first paragraph", async () => {
  const root = await repo([{
    id: ID[0],
    body: `Findings, building on [the survey](${page(ID[3])}).`,
    article: "# Findings\n\nAgents **share** a [wiki](https://example.com/w)\nacross sessions.\n\nSecond paragraph.\n",
  }]);
  const net = network();
  await run(root, net);
  assert.deepEqual(net.created[0].record.embed, {
    $type: "app.bsky.embed.external",
    external: { uri: page(ID[0]), title: "Read more", description: "Agents share a wiki across sessions." },
  });
});

test("an Article description is cut to 300 code points", () => {
  const description = articleDescription(`${"é".repeat(400)}\n\nNext.`);
  assert.equal(Array.from(description).length, 300);
  assert.ok(description.endsWith("…"));
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
