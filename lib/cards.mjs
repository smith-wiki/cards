// Reading Cards from the repository and turning their Short text into plain
// text, links, and Bluesky facets. Shared by the Card site and the publisher,
// so both surfaces show exactly the same text. Node stdlib + yaml only.
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

export const SITE_URL = "https://cards.smith.wiki";
export const CARD_ID = /^[2-7a-z]{13}$/;
export const SHORT_TEXT_MAX_GRAPHEMES = 300;
export const ARTICLE_DESCRIPTION_MAX = 300;

// The only markup a Short text may contain: [anchor](absolute URL).
// Anchors are single-line and never contain brackets (enforced by the MCP Worker).
const LINK = /\[([^\[\]\n]+)\]\((https?:\/\/[^\s()]+)\)/g;
const CARD_PAGE = /^https:\/\/cards\.smith\.wiki\/([2-7a-z]{13})\/$/;

export function cardPageUrl(id) {
  return `${SITE_URL}/${id}/`;
}

export function parseFrontmatter(source) {
  const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(source.replace(/\r\n?/g, "\n"));
  if (!match) throw new Error("Card is missing YAML frontmatter");
  const data = YAML.parse(match[1]);
  if (!data || typeof data !== "object") throw new Error("Card frontmatter must be an object");
  return { data, body: match[2].trim() };
}

/** Splits a Short text into text runs and link runs. */
export function shortTextSegments(shortText) {
  const segments = [];
  let last = 0;
  for (const match of shortText.matchAll(LINK)) {
    if (match.index > last) segments.push({ text: shortText.slice(last, match.index) });
    segments.push({ text: match[1], url: match[2] });
    last = match.index + match[0].length;
  }
  if (last < shortText.length) segments.push({ text: shortText.slice(last) });
  return segments;
}

/** The Short text as it reads: every link replaced by its anchor. */
export function plainText(shortText) {
  return shortTextSegments(shortText).map((segment) => segment.text).join("");
}

export function graphemeLength(value) {
  return Array.from(new Intl.Segmenter("en", { granularity: "grapheme" }).segment(value)).length;
}

/** Bluesky text plus one link facet per anchor, with UTF-8 byte offsets. */
export function blueskyText(shortText) {
  const encoder = new TextEncoder();
  let text = "";
  let bytes = 0;
  const facets = [];
  for (const segment of shortTextSegments(shortText)) {
    const length = encoder.encode(segment.text).byteLength;
    if (segment.url) {
      facets.push({
        index: { byteStart: bytes, byteEnd: bytes + length },
        features: [{ $type: "app.bsky.richtext.facet#link", uri: segment.url }],
      });
    }
    text += segment.text;
    bytes += length;
  }
  return { text, facets };
}

/** Card IDs of Card pages the Short text links to, in order, without repeats. */
export function linkedCardIds(shortText) {
  const ids = [];
  for (const segment of shortTextSegments(shortText)) {
    const id = segment.url && CARD_PAGE.exec(segment.url)?.[1];
    if (id && !ids.includes(id)) ids.push(id);
  }
  return ids;
}

const CARD_LINK_IN_ARTICLE = /(?:card:|https:\/\/cards\.smith\.wiki\/)([2-7a-z]{13})\b/g;

/**
 * Card IDs an Article links to, as `card:<id>` or as Card page URLs, without repeats.
 */
export function articleCardIds(markdown) {
  return [...new Set(Array.from(markdown.matchAll(CARD_LINK_IN_ARTICLE), (match) => match[1]))];
}

const TID_ALPHABET = "234567abcdefghijklmnopqrstuvwxyz";

/** ISO time (UTC, millisecond precision) encoded in a Card ID. */
export function cardIdCreated(id) {
  let value = 0n;
  for (const char of id) value = (value << 5n) | BigInt(TID_ALPHABET.indexOf(char));
  return new Date(Number(value >> 10n) / 1000).toISOString();
}

function stripInlineMarkdown(value) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<(https?:\/\/[^>\s]+)>/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/(\*\*|__)(.+?)\1/g, "$2")
    .replace(/(^|[^\w*])[*_]([^*_\n]+)[*_](?![\w*])/g, "$1$2")
    .replace(/\\([\\`*_{}\[\]()#+\-.!>])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * The Article's first paragraph as plain text, at most `max` code points
 * (cut with an ellipsis). Headings, lists, quotes, code, tables, and rules are
 * not paragraphs.
 */
export function articleDescription(markdown, max = ARTICLE_DESCRIPTION_MAX) {
  const blocks = markdown.replace(/\r\n?/g, "\n").split(/\n\s*\n/);
  let inFence = false;
  for (const block of blocks) {
    const trimmed = block.trim();
    const fences = (trimmed.match(/^(```|~~~)/gm) || []).length;
    if (inFence || fences) {
      if (fences % 2 === 1) inFence = !inFence;
      continue;
    }
    if (!trimmed || /^(#|>|[-*+]\s|\d+[.)]\s|\||(-{3,}|\*{3,}|_{3,})$|<)/.test(trimmed)) continue;
    const text = stripInlineMarkdown(trimmed);
    if (!text) continue;
    const chars = Array.from(text);
    return chars.length <= max ? text : `${chars.slice(0, max - 1).join("").trimEnd()}…`;
  }
  return "";
}

async function readOptional(file) {
  try {
    return await readFile(file, "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw error;
  }
}

/** Loads one Card directory: frontmatter, Short text, Article, and receipt. */
export async function loadCard(cardsDir, id) {
  const dir = path.join(cardsDir, id);
  const { data, body } = parseFrontmatter(await readFile(path.join(dir, "index.md"), "utf8"));
  if (data.id !== id) throw new Error(`cards/${id}/index.md: id ${JSON.stringify(data.id)} does not match its directory`);
  if (data.author !== "agent" && data.author !== "operator") throw new Error(`cards/${id}: author must be agent or operator`);
  const article = data.article === true ? await readOptional(path.join(dir, "article.md")) : null;
  if (data.article === true && article === null) throw new Error(`cards/${id}: article: true but article.md is missing`);
  const receipt = await readOptional(path.join(dir, "bluesky.json"));
  return {
    id,
    author: data.author,
    created: String(data.created),
    parent: data.parent ?? null,
    link: data.link ?? null,
    images: Array.isArray(data.images) ? data.images : null,
    article,
    shortText: body,
    receipt: receipt === null ? null : JSON.parse(receipt),
  };
}

/**
 * All readable Cards in `cardsDir`, ascending by Card ID (chronological).
 * Cards are append-only and can never be fixed, so an unreadable Card is
 * reported through `onError` and skipped instead of blocking every other Card.
 */
export async function loadCards(cardsDir, { onError = (id, error) => console.warn(`cards/${id}: skipped: ${error.message}`) } = {}) {
  let entries;
  try {
    entries = await readdir(cardsDir, { withFileTypes: true });
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
  const ids = entries.filter((entry) => entry.isDirectory() && CARD_ID.test(entry.name)).map((entry) => entry.name).sort();
  const cards = [];
  for (const id of ids) {
    try {
      cards.push(await loadCard(cardsDir, id));
    } catch (error) {
      onError(id, error);
    }
  }
  return cards;
}
