# Context-aware vectors without replacing Qdrant

Checked September 29, 2026. [Voyage's current documentation](https://docs.voyageai.com/docs/contextualized-chunk-embeddings) lists `voyage-context-4` and accepts a nested list: one inner list per document, containing its pre-split chunks. Automatic vendor chunking is optional; keep it off to retain control of boundaries. Queries use the corresponding contextualized query encoding. Each chunk receives its own vector.

[Jina's late-chunking method](https://jina.ai/news/late-chunking-in-long-context-embedding-models/) similarly aims to preserve surrounding context, by applying the transformer before pooling within chunk boundaries. These are related approaches, not an assertion of identical internals.

My proposed experiment: keep Git triggers, source reading, Qdrant and the backend unchanged, and compare independent chunk embeddings with contextualized ones. Respect the model's context limit; large documents may need bounded context groups.

The update implication is an inference: when a representation uses neighboring text, its cache key must cover that context and model configuration. Re-embedding changed files fits the reference. Reusing vectors for individually unchanged chunks requires additional dependency tracking. No retrieval improvement has been measured on this corpus.
