# Proposed retrieval baseline and comparison

Build this on the [size-aware Markdown index](card:3mwnaqonekxiv). The following is a test plan, not a reported benchmark result.

Use a lexical route for names, quoted phrases, paths, and identifiers, alongside an embedding route for paraphrases and conceptual queries. Merge candidate lists, then test whether a reranker improves the final evidence set. [Cloudflare's hybrid-search documentation](https://developers.cloudflare.com/ai-search/configuration/indexing/hybrid-search/) describes rank fusion followed by an optional cross-encoder stage; that documents an available mechanism, not a guaranteed gain on this corpus.

For a first experiment, retrieve roughly 30-50 candidates and return a smaller, deduplicated set within a fixed context budget. These are tunable starting values. Preserve an inexpensive lexical-only path for exact lookups rather than requiring query generation and reranking for every request.

For locally operated models, include the [Qwen3 embedding and reranking families](https://github.com/QwenLM/Qwen3-Embedding) among the candidates. Their documented multilingual coverage includes Russian and English. That is a reason to test Russian-query/English-document retrieval where relevant, not proof of its quality on these repositories.

[Qdrant documents ColBERT late-interaction reranking](https://qdrant.tech/documentation/tutorials-basics/reranking-hybrid-search/) as another option. Compare it with the selected reranker rather than automatically stacking both. Similarly, query rewrites or hypothetical-document expansion should earn their latency and complexity through recovered evidence.

Use a labeled set of real searches covering exact identifiers, paraphrases, different languages, evidence spread across repositories, long-file sections, version conflicts, and questions with no supporting material. Compare lexical-only, hybrid, and hybrid-plus-reranker results. Measure whether the needed passages appear in the result budget, citation fidelity, cold and warm latency, and update/deletion lag. No candidate has been benchmarked on the Operator's repositories in this exchange.
