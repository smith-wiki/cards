// Every Card as a view model for the Card site, ascending by Card ID.
// All Card text is HTML-escaped here; templates print the *Html fields as-is.
import path from "node:path";
import MarkdownIt from "markdown-it";
import {
  articleDescription,
  cardPageUrl,
  linkedCardIds,
  loadCards,
  plainText,
  shortTextSegments,
} from "../../lib/cards.mjs";

// Articles may cite external references; raw HTML is never passed through.
const markdown = new MarkdownIt({ html: false, linkify: true });
// The Short text is the page's only h1; Article headings start at h2.
markdown.core.ruler.push("demote_headings", (state) => {
  for (const token of state.tokens) {
    if (token.type === "heading_open" || token.type === "heading_close") {
      token.tag = `h${Math.min(Number(token.tag.slice(1)) + 1, 6)}`;
    }
  }
});

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function textHtml(value) {
  return escapeHtml(value).replaceAll("\n", "<br>");
}

function shortTextHtml(shortText) {
  return shortTextSegments(shortText)
    .map((segment) => (segment.url ? `<a href="${escapeHtml(segment.url)}">${textHtml(segment.text)}</a>` : textHtml(segment.text)))
    .join("");
}

function host(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function summary(card) {
  return {
    id: card.id,
    url: `/${card.id}/`,
    created: card.created,
    date: card.created.slice(0, 10),
    author: card.author,
    isReply: Boolean(card.parent),
    shortHtml: shortTextHtml(card.shortText),
  };
}

export default async function () {
  const cards = await loadCards(path.resolve(import.meta.dirname, "../../cards"));
  const replies = new Map();
  const mentions = new Map();
  for (const card of cards) {
    if (card.parent) replies.set(card.parent.id, [...(replies.get(card.parent.id) ?? []), card]);
    for (const id of linkedCardIds(card.shortText)) {
      if (id !== card.id) mentions.set(id, [...(mentions.get(id) ?? []), card]);
    }
  }

  return cards.map((card) => {
    const plain = plainText(card.shortText);
    const description = (card.article && articleDescription(card.article)) || plain;
    return {
      ...summary(card),
      plain,
      // Long Short texts get a smaller headline so the page still reads as one.
      long: Array.from(plain).length > 140,
      parent: card.parent && { url: card.parent.url, textHtml: textHtml(card.parent.text ?? "") },
      images: card.images?.map((image) => ({ src: image.src, alt: image.alt ?? "" })) ?? null,
      link: card.link && {
        url: card.link.url,
        title: card.link.title || host(card.link.url),
        description: card.link.description || "",
      },
      articleHtml: card.article === null ? null : markdown.render(card.article),
      bluesky: card.receipt?.url ?? null,
      replies: (replies.get(card.id) ?? []).map(summary),
      mentionedBy: (mentions.get(card.id) ?? []).map(summary),
      meta: {
        title: plain,
        description,
        canonical: cardPageUrl(card.id),
        image: card.images?.[0]?.src ?? null,
        type: "article",
      },
    };
  });
}

