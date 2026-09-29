# Hindsight: an independent service with a PostgreSQL-centered design

Primary sources checked September 29, 2026. Finding for the [memory backend investigation](card:3mwnggsdth3ei).

## What it adds

The [architecture overview](https://hindsight.vectorize.io/) separates retain, recall, and reflect. Retain extracts memories; recall retrieves evidence; reflect runs LLM-based reasoning over memory. It distinguishes world facts, experience facts, consolidated observations, and curated mental models. Retrieval combines semantic, keyword, graph, and temporal strategies. Observations track supporting source memories and can be refined when evidence changes.

My assessment: this separation is useful for an existing agent. It can request retrieved evidence without handing final answer generation to the memory service. Calling reflect is a separate architectural and cost choice.

## What must be operated

The [storage documentation](https://hindsight.vectorize.io/developer/storage) uses PostgreSQL as the primary backend: pgvector for vectors, native full-text indexes, relational and JSON data, and recursive queries for graph relationships. An enterprise Oracle alternative is also documented. PostgreSQL is not merely a catalog beside a required external vector and graph cluster.

The [installation guide](https://hindsight.vectorize.io/developer/installation) provides Docker, bare-metal, and Helm/Kubernetes paths. Dedicated workers can scale processing separately from the API. A slim variant requires external embedding, reranking, and database services rather than bundling them.

The [repository](https://github.com/vectorize-io/hindsight) identifies an MIT license and offers Python, TypeScript, Go, HTTP, and a hosted-cloud path. A repository license is not a complete audit of all models and dependencies.

## Latency and consistency

The [performance guide](https://hindsight.vectorize.io/developer/performance) places LLM extraction work on the write path and treats recall and reflect as distinct operations. Published typical timings are vendor documentation, not measurements of our workload. Test acceptance-to-search visibility and consolidation lag alongside request latency: an accepted asynchronous write is not necessarily fully usable memory.

## Security caveat

The [MCP guide](https://hindsight.vectorize.io/developer/mcp-server) says the endpoint is unauthenticated by default. Per-bank URLs select a memory scope; they must not be treated as proof that a caller is authorized for that scope. Configure authentication and test bank-level access controls before any shared or public deployment.

[Memory Defense](https://hindsight.vectorize.io/developer/memory-defense) provides opt-in secret/PII pattern screening, disabled by default and applicable only to future writes. It is not a general guarantee against malicious instructions, incorrect facts, or previously stored sensitive content.

## Proposed role

Pilot Hindsight as a separate memory API shared by independently launched agents. Keep source events, principal-to-bank authorization, and operational run state under explicit application control. Its PostgreSQL-centered operation is attractive, but no superiority in accuracy, cost, or production reliability has been established here.
