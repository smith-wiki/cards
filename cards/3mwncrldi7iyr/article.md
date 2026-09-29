# Hybrid retrieval inside the reference

Qdrant documents [server-side BM25 encoding](https://qdrant.tech/documentation/inference/inference-bm25/) and [dense/sparse rank fusion through Query API](https://qdrant.tech/documentation/search/hybrid-queries/). These replace the reference's dense-only search operation, not its database or backend. Match the API and encoding configuration to the deployed server/client versions.

My proposed test: retrieve bounded candidate sets from both representations, fuse them, and compare with dense-only retrieval. For repository documents, include literal identifiers, paths, and configuration keys. Inspect tokenization rather than assuming BM25 preserves every identifier. Use an explicit exact-match route when literal identity matters.

The hypothesis is better coverage of both paraphrases and terminology. No corpus-specific improvement has been measured.
