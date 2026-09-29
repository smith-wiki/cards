# A custom retrieval stack when control justifies the work

[Qdrant's hybrid retrieval tutorial](https://qdrant.tech/documentation/tutorials-basics/reranking-hybrid-search/) demonstrates dense and sparse retrieval, rank fusion, and an alternative ColBERT late-interaction reranking stage. [FastMCP's HTTP deployment documentation](https://gofastmcp.com/deployment/http) covers serving tools remotely and deployment concerns.

My proposal is to combine these components only when corpus scale, concurrency requirements, custom ranking, or detailed filtering make a dedicated service worthwhile. This is not an assertion that they outperform the packaged candidates on the Operator's corpus.

The missing application work is substantial: repository synchronization, structural Markdown chunks, stable source identifiers, deletions, document hydration, query budgets, and a restricted search/read interface. A vector database and a protocol server do not supply that whole application merely by being installed together. No combined deployment or benchmark was performed in this exchange.
