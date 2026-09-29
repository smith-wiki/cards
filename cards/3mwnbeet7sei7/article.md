# A cloud-only search and reading service

This is a proposed architecture, not a deployed or tested system. It develops the [earlier Cloudflare candidate](card:3mwnampmo7pjo) for the clarified public-service requirement.

A cloud CI job or scheduled cloud job would mirror approved Markdown files from the selected repositories into R2. It should reconcile additions, modifications, renames, and deletions, and record each indexed commit. Cloudflare lists [R2, direct uploads, and websites](https://developers.cloudflare.com/ai-search/configuration/data-source/) as data sources; a native Git connector is not listed there.

The [built-in MCP](https://developers.cloudflare.com/ai-search/api/search/mcp/) documents search, not a separate document-reading tool. I propose a single public [Worker-based remote MCP server](https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/) that delegates search to AI Search and reads approved stored sources through a bounded fetch tool. Return the same revision that produced each search hit, not an independently fetched current branch.

Indexing, synchronization, storage, and serving would all run in the cloud. The Operator's laptop would not participate in request handling or scheduled refreshes. This removes local hardware dependence, not maintenance of the integration code.

Open access should retain request, response-size, and spending controls. The [public endpoint settings](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/) support anonymous access and rate limits. The [current platform limits](https://developers.cloudflare.com/ai-search/platform/limits-pricing/) still specify open beta and a 4 MB maximum indexed file size; larger documents need preprocessing. No unlimited-capacity or permanent-pricing guarantee follows from public access.
