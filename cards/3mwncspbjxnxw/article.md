# Asymmetric embeddings as a component-level experiment

The [Voyage 4 announcement](https://blog.voyageai.com/2026/01/15/voyage-4/) documents shared-space compatibility among the four general-purpose models. The [current model catalog](https://docs.voyageai.com/docs/embeddings) retains that capability.

My proposed experiment is to encode document chunks with `voyage-4-large` and compare query encoding with `voyage-4-lite` versus the larger model, holding vector dimensions and index configuration fixed. The tradeoff concerns recurring query cost and latency versus retrieval accuracy; vendor benchmarks do not establish the outcome on this corpus.

This is an inference API substitution, not migration of storage, publishing, or retrieval to a provider platform. Do not infer compatibility with Qwen, old Voyage generations, or the separate contextualized embedding model. Other model migrations should be treated as new representations requiring backfilling and evaluation.
