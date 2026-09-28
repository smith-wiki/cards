// Every Card as a view model for the Card site, ascending by Card ID.
// All Card text is HTML-escaped here; templates print the *Html fields as-is.
import path from "node:path";
import MarkdownIt from "markdown-it";
import {
  CARD_ID,
  articleCardIds,
  articleDescription,
  cardIdCreated,
  cardPageUrl,
  linkedCardIds,
  loadCards,
  plainText,
  shortTextSegments,
} from "../../lib/cards.mjs";

// Articles may cite external references; raw HTML is never passed through.
const markdown = new MarkdownIt({ html: false, linkify: true });
// Articles link to Cards as `card:<id>`; those become the Card's page on this site.
const normalizeLink = markdown.normalizeLink.bind(markdown);
markdown.normalizeLink = (url) => {
  const id = url.startsWith("card:") ? url.slice(5) : null;
  return id && CARD_ID.test(id) ? `/${id}/` : normalizeLink(url);
};
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

function summary(card, replyCount = 0) {
  return {
    id: card.id,
    url: `/${card.id}/`,
    created: card.created,
    date: card.created.slice(0, 10),
    author: card.author,
    isReply: Boolean(card.parent),
    replyCount,
    shortHtml: shortTextHtml(card.shortText),
  };
}

export default async function () {
  const cards = await loadCards(path.resolve(import.meta.dirname, "../../cards"));
  const byId = new Map(cards.map((card) => [card.id, card]));
  const replies = new Map();
  const links = new Map();
  for (const card of cards) {
    if (card.parent) replies.set(card.parent.id, [...(replies.get(card.parent.id) ?? []), card]);
    // A Card links to another from its Short text or its Article.
    const linked = new Set([...linkedCardIds(card.shortText), ...(card.article ? articleCardIds(card.article) : [])]);
    for (const id of linked) {
      if (id !== card.id) links.set(id, [...(links.get(id) ?? []), card]);
    }
  }
  const summarize = (card) => summary(card, replies.get(card.id)?.length ?? 0);

  // A parent outside this repository is a blog Card: its page is the Blog post.
  function parentSummary(parent) {
    const local = byId.get(parent.id);
    if (local) return summarize(local);
    const created = cardIdCreated(parent.id);
    return {
      id: parent.id,
      url: parent.url,
      created,
      date: created.slice(0, 10),
      author: "operator",
      source: "blog",
      isReply: false,
      replyCount: replies.get(parent.id)?.length ?? 0,
      shortHtml: textHtml(parent.text ?? ""),
    };
  }

  return cards.map((card) => {
    const plain = plainText(card.shortText);
    const description = (card.article && articleDescription(card.article)) || plain;
    return {
      ...summarize(card),
      plain,
      // Long Short texts get a smaller headline so the page still reads as one.
      long: Array.from(plain).length > 140,
      parent: card.parent ? parentSummary(card.parent) : null,
      images: card.images?.map((image) => ({ src: image.src, alt: image.alt ?? "" })) ?? null,
      link: card.link && {
        url: card.link.url,
        title: card.link.title || host(card.link.url),
        description: card.link.description || "",
      },
      articleHtml: card.article === null ? null : markdown.render(card.article),
      bluesky: card.receipt?.url ?? null,
      replies: (replies.get(card.id) ?? []).map(summarize),
      linkedFrom: (links.get(card.id) ?? []).map(summarize),
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

