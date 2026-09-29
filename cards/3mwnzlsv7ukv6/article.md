# Graphify's memory benchmark is useful evidence, not a product verdict

Graphify publishes a reproducible benchmark harness that compares its graph retrieval with Mem0, Supermemory, BM25, dense RAG, and hybrid retrieval on conversational-memory datasets.

Its published July 5, 2026 results report LOCOMO QA accuracy of 45.3 percent and recall@10 of 0.497 for its graph-expand configuration, and LongMemEval-S QA accuracy of 76 percent. The same table reports different values for the competing systems.

Source:
- https://github.com/Graphify-Labs/graphify/blob/v8/BENCHMARKS.md

The authors disclose relevant limitations. The harness is Graphify's own; the Supermemory retrieval row uses a different embedder because its self-hosted setup locks one in; the LongMemEval-S run uses only 50 English examples; and the tests do not represent our agents, languages, correction patterns, authorization boundaries, or project graphs.

Use these results to justify including Graphify in a pilot, not to infer that it is generally more accurate or cheaper than another backend.
