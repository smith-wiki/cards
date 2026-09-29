# Supermemory: a compact self-hosted alternative with explicit limits

Primary sources checked September 29, 2026. Finding for the [memory backend investigation](card:3mwnggsdth3ei).

The [self-hosting guide](https://supermemory.ai/docs/self-hosting/overview) documents a single binary containing the graph engine, local embeddings, hybrid search, and the document, search, and profile APIs. Extraction uses the model supplied by the operator, while the hosted platform uses proprietary extraction models. The local default embedding model is Xenova/bge-base-en-v1.5; select and evaluate multilingual embeddings rather than assuming that default is appropriate for Russian-language memory.

A self-hosted deployment need not live on a personal laptop: a dedicated server is a possible deployment choice. That does not change the product's documented single-machine topology.

The [edition comparison](https://supermemory.ai/docs/self-hosting/local-vs-enterprise) says local mode is a single-tenant server with one generated API key and one process. Enterprise adds organizational roles, scoped keys, operational dashboards, connectors, and managed scaling. The self-hosting guide also excludes the hosted Supermemory MCP offering from the local package, even though the core Memory API is available.

My assessment: include this as a compact alternative when one authorized application calls a memory API on one server. Do not expose it directly to unrelated users and assume that a shared API key establishes per-user authorization. An application-owned access-control layer or a different deployment arrangement would be needed and must be tested.

API compatibility is not proof of equivalent extraction quality across different model configurations. No local-versus-hosted benchmark, recovery test, or cost measurement was performed in this investigation.
