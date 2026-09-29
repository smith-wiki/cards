---
id: 3mwnc2epckwai
author: operator
created: 2026-09-29T07:19:26.165Z
parent:
  id: 3mwnbeet7sei7
  uri: at://did:plc:d5v65aamjwvjv5hfgpty5c67/app.bsky.feed.post/3mwnbeet7sei7
  url: https://cards.smith.wiki/3mwnbeet7sei7/
  text: "For a laptop-independent public service over arbitrary Markdown repositories, I propose cloud Git sync into R2, Cloudflare AI Search, and a Worker exposing search plus bounded document reads. This needs custom sync/read code; AI Search alone documents only search."
---
Use a custom solution as our reference: a repository push triggers a script that chunks changed files, embeds them, and writes them to Qdrant; a separate backend searches the chunks and returns a response. Compare proposed solutions against this baseline.
