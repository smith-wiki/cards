// Publishes pending Cards to Bluesky and commits their receipts.
//
// A Card is pending while cards/<id>/bluesky.json is absent. Pending Cards are
// processed in ascending Card ID order; each is posted from its author's
// account right away, without waiting for its page, with rkey = Card ID so a
// retry can never create a second post. Failures write nothing and are retried
// on the next run.
//
//   node scripts/publish.mjs            publish, commit and push receipts
//   node scripts/publish.mjs --dry-run  print the records, no network writes
//
// Environment: BLUESKY_AGENT_IDENTIFIER, BLUESKY_AGENT_APP_PASSWORD,
// BLUESKY_OPERATOR_IDENTIFIER, BLUESKY_OPERATOR_APP_PASSWORD, and optionally
// BLUESKY_SERVICE_URL (default https://bsky.social).
import { execFile } from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";
import {
  SHORT_TEXT_MAX_GRAPHEMES,
  articleDescription,
  blueskyText,
  cardPageId,
  cardPageUrl,
  graphemeLength,
  loadCards,
  shortTextSegments,
} from "../lib/cards.mjs";

const PUBLIC_API = "https://public.api.bsky.app";
const CARDYB = "https://cardyb.bsky.app/v1/extract";
const USER_AGENT = "smith-wiki-cards-publisher";
const IMAGE_MAX_BYTES = 1_000_000;
const THUMB_MAX_BYTES = 1_000_000;
const FETCH_TIMEOUT_MS = 15_000;
/** Title of an Article Card's link preview; the post's text already carries the Short text. */
export const ARTICLE_PREVIEW_TITLE = "Read more";
const AUTHORS = { agent: "AGENT", operator: "OPERATOR" };

function errorMessage(error) {
  const message = error instanceof Error ? error.message : String(error);
  return message.replace(/[\r\n]+/g, " ").slice(0, 500);
}

function decodeEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, decimal) => String.fromCodePoint(Number(decimal)))
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");
}

function metaContent(html, key) {
  for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attributes = Object.fromEntries(
      Array.from(tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g), (match) => [match[1].toLowerCase(), match[2] ?? match[3]]),
    );
    if ((attributes.property ?? attributes.name)?.toLowerCase() !== key) continue;
    const content = decodeEntities(attributes.content ?? "").trim();
    if (content) return content;
  }
  return "";
}

/** Downloads an image and checks its type and size. */
async function fetchImage(fetchImpl, url, maxBytes, mime) {
  const response = await fetchImpl(url, {
    headers: { "User-Agent": USER_AGENT },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`image ${url}: HTTP ${response.status}`);
  const type = mime || (response.headers.get("content-type") || "").split(";", 1)[0].trim();
  if (!type.startsWith("image/")) throw new Error(`image ${url}: not an image (${type || "no type"})`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength > maxBytes) throw new Error(`image ${url}: ${bytes.byteLength} bytes exceeds ${maxBytes}`);
  return { bytes, type };
}

class BlueskyError extends Error {
  constructor(message, status, error) {
    super(message);
    this.status = status;
    this.error = error;
  }
}

/** One Bluesky account: the Card author's. */
export class BlueskyClient {
  constructor({ identifier, appPassword, serviceUrl, fetchImpl = fetch }) {
    this.identifier = identifier;
    this.appPassword = appPassword;
    this.serviceUrl = (serviceUrl || "https://bsky.social").replace(/\/+$/, "");
    this.fetch = fetchImpl;
    this.session = null;
  }

  async authenticate() {
    if (this.session) return this.session;
    const response = await this.fetch(`${this.serviceUrl}/xrpc/com.atproto.server.createSession`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: this.identifier, password: this.appPassword }),
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok || typeof payload?.accessJwt !== "string" || typeof payload?.did !== "string") {
      throw new Error(`Bluesky authentication failed for ${this.identifier}: HTTP ${response.status}`);
    }
    this.session = payload;
    return payload;
  }

  async did() {
    return (await this.authenticate()).did;
  }

  async uploadImage(url, maxBytes, mime) {
    const { bytes, type } = await fetchImage(this.fetch, url, maxBytes, mime);
    const session = await this.authenticate();
    const response = await this.fetch(`${this.serviceUrl}/xrpc/com.atproto.repo.uploadBlob`, {
      method: "POST",
      headers: { Authorization: `Bearer ${session.accessJwt}`, "Content-Type": type },
      body: bytes,
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok || !payload?.blob) throw new Error(`image ${url}: upload failed: HTTP ${response.status}`);
    return payload.blob;
  }

  async createPost(rkey, record) {
    const session = await this.authenticate();
    const response = await this.fetch(`${this.serviceUrl}/xrpc/com.atproto.repo.createRecord`, {
      method: "POST",
      headers: { Authorization: `Bearer ${session.accessJwt}`, "Content-Type": "application/json" },
      body: JSON.stringify({ repo: session.did, collection: "app.bsky.feed.post", rkey, validate: true, record }),
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok || typeof payload?.uri !== "string" || typeof payload?.cid !== "string") {
      const detail = [payload?.error, payload?.message].filter(Boolean).join(": ");
      throw new BlueskyError(`Bluesky rejected the post: HTTP ${response.status}${detail ? ` ${detail}` : ""}`, response.status, payload?.error);
    }
    return { uri: payload.uri, cid: payload.cid };
  }

  /** The author's existing post with this rkey, or null. */
  async getPost(rkey) {
    const session = await this.authenticate();
    const query = new URLSearchParams({ repo: session.did, collection: "app.bsky.feed.post", rkey });
    const response = await this.fetch(`${this.serviceUrl}/xrpc/com.atproto.repo.getRecord?${query}`, {
      headers: { Authorization: `Bearer ${session.accessJwt}` },
    });
    const payload = await response.json().catch(() => null);
    if (response.ok && typeof payload?.uri === "string" && typeof payload?.cid === "string") return payload;
    if (response.status === 400 || response.status === 404) return null;
    throw new Error(`Bluesky record lookup failed: HTTP ${response.status}`);
  }
}

/** Stands in for BlueskyClient in --dry-run: reads nothing private, writes nothing. */
class DryRunClient {
  constructor(author) {
    this.author = author;
  }

  async did() {
    return `did:dry-run:${this.author}`;
  }

  async uploadImage(url, _maxBytes, mime) {
    return { $type: "blob", ref: { $link: "dry-run" }, mimeType: mime || "image/*", size: 0, source: url };
  }
}

/** Writes each receipt once, commits it, and pushes it to the remote. */
export class GitReceiptStore {
  constructor({ root, push = true }) {
    this.root = root;
    this.push = push;
    this.run = (...args) => promisify(execFile)("git", args, { cwd: root });
  }

  async save(id, receipt) {
    const relative = `cards/${id}/bluesky.json`;
    // "wx": a receipt is written once and never replaced.
    await writeFile(path.join(this.root, relative), `${JSON.stringify(receipt, null, 2)}\n`, { flag: "wx" });
    await this.run("add", "--", relative);
    await this.run("commit", "--quiet", "-m", `Publish Card ${id} to Bluesky`, "--", relative);
    if (!this.push) return;
    for (let attempt = 1; ; attempt++) {
      try {
        await this.run("push", "--quiet", "origin", "HEAD:main");
        return;
      } catch (error) {
        if (attempt === 3) throw error;
        // The MCP Worker adds Cards to main concurrently; receipts never touch its files.
        await this.run("pull", "--quiet", "--rebase", "origin", "main");
      }
    }
  }
}

function clientsFromEnv(env, fetchImpl) {
  const clients = {};
  return (author) => {
    if (clients[author]) return clients[author];
    const key = AUTHORS[author];
    const identifier = env[`BLUESKY_${key}_IDENTIFIER`];
    const appPassword = env[`BLUESKY_${key}_APP_PASSWORD`];
    if (!identifier || !appPassword) {
      throw new Error(`BLUESKY_${key}_IDENTIFIER and BLUESKY_${key}_APP_PASSWORD are required to publish ${author} Cards`);
    }
    clients[author] = new BlueskyClient({ identifier, appPassword, serviceUrl: env.BLUESKY_SERVICE_URL, fetchImpl });
    return clients[author];
  };
}

/**
 * Publishes every pending Card it can. Returns the Card IDs by outcome:
 * published, deferred (parent not visible yet; retried next run),
 * failed (logged; retried next run).
 */
export async function publish({
  root = process.cwd(),
  env = process.env,
  fetchImpl = fetch,
  store = new GitReceiptStore({ root }),
  clientFor = clientsFromEnv(env, fetchImpl),
  dryRun = false,
  now = () => Date.now(),
  log = console.log,
} = {}) {
  const result = { published: [], deferred: [], failed: [] };
  const cards = await loadCards(path.join(root, "cards"), {
    onError: (id, error) => {
      log(`${id}: unreadable Card: ${errorMessage(error)}`);
      result.failed.push(id);
    },
  });
  const byId = new Map(cards.map((card) => [card.id, card]));
  const receipts = new Map(cards.filter((card) => card.receipt).map((card) => [card.id, card.receipt]));
  const pending = cards.filter((card) => !card.receipt);
  const dryClients = {};
  const accountFor = (author) => (dryRun ? (dryClients[author] ??= new DryRunClient(author)) : clientFor(author));

  async function publicPost(uri) {
    const response = await fetchImpl(`${PUBLIC_API}/xrpc/app.bsky.feed.getPosts?uris=${encodeURIComponent(uri)}`, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!response.ok) throw new Error(`getPosts ${uri}: HTTP ${response.status}`);
    const payload = await response.json();
    return payload?.posts?.find((post) => post.uri === uri) ?? null;
  }

  // { parent, root } strong refs for a reply to Card `id`, or null when that
  // Card's post is not visible yet.
  async function replyRefs(id, uri) {
    const card = byId.get(id);
    const receipt = receipts.get(id);
    if (card && receipt) {
      const parent = { uri: receipt.uri, cid: receipt.cid };
      if (!card.parent) return { parent, root: parent };
      const above = await replyRefs(card.parent.id, card.parent.uri);
      if (above) return { parent, root: above.root };
    }
    const post = await publicPost(uri);
    if (!post) return null;
    const parent = { uri: post.uri, cid: post.cid };
    const root = post.record?.reply?.root;
    return { parent, root: root ? { uri: root.uri, cid: root.cid } : parent };
  }

  async function linkMetadata(url) {
    try {
      const response = await fetchImpl(`${CARDYB}?url=${encodeURIComponent(url)}`, {
        headers: { "User-Agent": USER_AGENT },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      const payload = await response.json().catch(() => null);
      if (response.ok && payload && !payload.error && payload.title) {
        return { title: payload.title, description: payload.description || "", image: payload.image || "" };
      }
      log(`link ${url}: cardyb has no preview (${payload?.error || `HTTP ${response.status}`}); reading OpenGraph tags`);
    } catch (error) {
      log(`link ${url}: cardyb failed (${errorMessage(error)}); reading OpenGraph tags`);
    }
    try {
      const response = await fetchImpl(url, {
        headers: { Accept: "text/html", "User-Agent": USER_AGENT },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (!(response.headers.get("content-type") || "").includes("html")) throw new Error("not an HTML page");
      const html = await response.text();
      const image = metaContent(html, "og:image");
      return {
        title: metaContent(html, "og:title") || decodeEntities(/<title[^>]*>([^<]*)<\/title>/i.exec(html)?.[1] ?? "").trim(),
        description: metaContent(html, "og:description") || metaContent(html, "description"),
        image: image ? new URL(image, url).href : "",
      };
    } catch (error) {
      log(`link ${url}: no OpenGraph tags (${errorMessage(error)})`);
      return { title: "", description: "", image: "" };
    }
  }

  async function embedFor(card, client) {
    if (card.images) {
      const images = [];
      for (const image of card.images) {
        images.push({ image: await client.uploadImage(image.src, IMAGE_MAX_BYTES, image.mime), alt: image.alt });
      }
      return { $type: "app.bsky.embed.images", images };
    }
    if (card.link) {
      const meta = await linkMetadata(card.link.url);
      const external = {
        uri: card.link.url,
        title: card.link.title || meta.title || card.link.url,
        description: card.link.description || meta.description || "",
      };
      if (meta.image) {
        try {
          external.thumb = await client.uploadImage(meta.image, THUMB_MAX_BYTES);
        } catch (error) {
          log(`link ${card.link.url}: preview without thumb: ${errorMessage(error)}`);
        }
      }
      return { $type: "app.bsky.embed.external", external };
    }
    if (card.article !== null) {
      return {
        $type: "app.bsky.embed.external",
        external: { uri: cardPageUrl(card.id), title: ARTICLE_PREVIEW_TITLE, description: articleDescription(card.article) },
      };
    }
    return undefined;
  }

  // Bluesky post URLs of the Cards a Short text links to, keyed by the link's URL
  // as written (Cards from before the host move link to cards.smith.wiki).
  // A post's URL is known before it exists: rkey = Card ID under the author's DID.
  async function cardPostUrls(shortText) {
    const urls = new Map();
    for (const { url } of shortTextSegments(shortText)) {
      const target = url && byId.get(cardPageId(url));
      if (!target || urls.has(url)) continue;
      const did = await accountFor(target.author).did();
      urls.set(url, `https://bsky.app/profile/${did}/post/${target.id}`);
    }
    return urls;
  }

  async function publishCard(card) {
    // Card links point at the Cards' posts, so Bluesky connects the posts, not the site.
    const postUrls = await cardPostUrls(card.shortText);
    const { text, facets } = blueskyText(card.shortText, (url) => postUrls.get(url) ?? url);
    const length = graphemeLength(text);
    if (length > SHORT_TEXT_MAX_GRAPHEMES) {
      throw new Error(`Short text is ${length} graphemes; Bluesky allows ${SHORT_TEXT_MAX_GRAPHEMES}`);
    }
    const refs = card.parent ? await replyRefs(card.parent.id, card.parent.uri) : null;
    if (card.parent && !refs) return `deferred: parent ${card.parent.uri} is not visible yet`;

    const client = accountFor(card.author);
    const embed = await embedFor(card, client);
    const record = {
      $type: "app.bsky.feed.post",
      text,
      ...(facets.length ? { facets } : {}),
      langs: ["en"],
      createdAt: new Date(now()).toISOString(),
      ...(refs ? { reply: refs } : {}),
      ...(embed ? { embed } : {}),
    };
    if (dryRun) {
      log(`${card.id}: would post as ${card.author}:\n${JSON.stringify(record, null, 2)}`);
      return null;
    }

    let post;
    let publishedAt = record.createdAt;
    try {
      post = await client.createPost(card.id, record);
    } catch (error) {
      // An earlier run may have posted but failed to commit the receipt: the
      // rkey is taken, so record the existing post instead of posting again.
      const existing = await client.getPost(card.id).catch(() => null);
      if (!existing) throw error;
      post = { uri: existing.uri, cid: existing.cid };
      publishedAt = existing.value?.createdAt || publishedAt;
      log(`${card.id}: already on Bluesky; recording the existing post`);
    }
    const receipt = {
      uri: post.uri,
      cid: post.cid,
      url: `https://bsky.app/profile/${await client.did()}/post/${card.id}`,
      published_at: publishedAt,
    };
    await store.save(card.id, receipt);
    receipts.set(card.id, receipt);
    return receipt;
  }

  log(`${pending.length} pending Card(s)${dryRun ? " (dry run)" : ""}`);
  for (const card of pending) {
    try {
      const outcome = await publishCard(card);
      if (typeof outcome === "string") {
        log(`${card.id}: ${outcome}`);
        result.deferred.push(card.id);
      } else {
        if (outcome) log(`${card.id}: published ${outcome.url}`);
        result.published.push(card.id);
      }
    } catch (error) {
      log(`${card.id}: failed: ${errorMessage(error)}`);
      result.failed.push(card.id);
    }
  }
  return result;
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const result = await publish({ dryRun });
  console.log(`${dryRun ? "would publish" : "published"} ${result.published.length}, deferred ${result.deferred.length}, failed ${result.failed.length}`);
  if (result.failed.length) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
