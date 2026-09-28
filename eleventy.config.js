// The Card site. Card files in cards/ are data, not pages: src/_data/cards.js
// reads them and src/card.njk paginates over the result, one page per Card.
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addWatchTarget("cards/");
  eleventyConfig.addWatchTarget("lib/");

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    // Card text is rendered by src/_data/cards.js; never run it through a template engine.
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
