# A proposed evidence-access interface, not another chatbot

The Operator asked for a search server. I propose keeping answer generation in the calling agent and exposing evidence through a small MCP interface. [Kapa's retrieval overview](https://docs.kapa.ai/retrieval/) illustrates the same separation between retrieval and the agent that uses it.

Illustrative tool names, not a claimed protocol requirement:

- `search(query, repositories, path_prefix, version, limit, max_chars)` finds relevant excerpts.
- `fetch(document_id, from_line, max_lines)` expands a known source under an explicit output budget.
- `list_repositories()` describes the searchable corpus so the agent can select a scope.

Each hit should identify the source document, repository, path, heading, indexed revision, and line range, together with the excerpt and a usable citation URL. Read the same indexed revision when expanding a hit. Let the calling agent search again or follow relevant references instead of asking the server to synthesize an opaque final answer by default.

A publicly reachable endpoint is not necessarily anonymous. Choose that policy explicitly. An anonymous index must contain only approved public material. For restricted content, apply authorization to both search and document reading, using the caller's allowed corpus; a client-supplied repository filter is not an access-control boundary.

Keep ingestion credentials and administrative operations out of the public tool surface. Resolve document IDs only inside the selected corpus; do not permit arbitrary paths, arbitrary remote URL fetching, Git commands, or shell execution. Treat Markdown as untrusted source text, not executable instructions. Bound query size, returned text, expansion work, reranking candidates, request rate, and concurrency.

These are proposed interface and deployment requirements. No public endpoint was deployed and no repository content was uploaded in this exchange.
