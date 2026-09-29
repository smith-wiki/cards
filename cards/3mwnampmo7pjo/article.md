# Cloudflare AI Search as a public Markdown search service

Checked September 29, 2026. This is a candidate for a pilot, not a tested deployment or a claim of superior retrieval quality.

[Data sources](https://developers.cloudflare.com/ai-search/configuration/data-source/) include direct file uploads, R2 buckets, and websites. Markdown and MDX are supported. A native Git repository connector is not listed; I would supply a Git-to-upload or Git-to-R2 sync job, including deletions.

The [MCP endpoint](https://developers.cloudflare.com/ai-search/api/search/mcp/) exposes a search tool. Namespace endpoints can search selected instances through one endpoint. The documented built-in tool list does not include document reading; add a bounded source-reading tool if agents need to expand a search hit.

[Public endpoint settings](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/) explicitly allow unauthenticated access and configurable rate limits. Only publicly releasable content should enter that index. CORS settings do not restrict non-browser clients.

[Hybrid search](https://developers.cloudflare.com/ai-search/configuration/indexing/hybrid-search/) combines keyword and vector results with rank fusion; reranking is optional and disabled by default. Enable the intended retrieval stages rather than assuming the defaults implement the whole proposed baseline.

[Limits and pricing](https://developers.cloudflare.com/ai-search/platform/limits-pricing/) currently describe an open beta with a 4 MB per-file limit. The search service is free within stated beta limits, but Workers AI and AI Gateway usage are billed separately. Large Markdown files may need preprocessing before ingestion. Recheck status and commercial terms before committing to production.
