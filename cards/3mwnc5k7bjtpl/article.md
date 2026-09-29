# Cloudflare AI Search relative to the custom reference

Checked September 29, 2026. This compares documented responsibilities, not measured quality or cost. It develops the [earlier proposed Cloudflare architecture](card:3mwnbeet7sei7).

The [managed pipeline](https://developers.cloudflare.com/ai-search/concepts/how-ai-search-works/) handles chunking, embeddings, index storage, and retrieval. Its optional keyword retrieval and reranking can be compared separately from the simple reference implementation.

The proposed replacement is: push-triggered cloud job uploads changed Markdown through the Items API or mirrors it into R2; AI Search processes it; the public backend delegates retrieval to AI Search.

[Supported sources](https://developers.cloudflare.com/ai-search/configuration/data-source/) are uploaded files, R2, and websites, rather than a documented direct Git connector. The application still owns Git change detection and reconciliation, including deletions. The documented maximum file size is 4 MB, so larger Markdown files need preprocessing.

The [built-in MCP](https://developers.cloudflare.com/ai-search/api/search/mcp/) exposes search. A separate bounded document-reading tool remains integration work for the Operator's search-and-read requirement. Indexing is asynchronous; a completed upload should not be equated with searchable completion.

The question for evaluation is whether transferring the indexing and search pipeline to Cloudflare saves enough implementation and operating effort, at acceptable quality, freshness, and control. That benefit has not been measured on this corpus.
