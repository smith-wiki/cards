# qdrant-loader is a direct-fit candidate

The third-party [qdrant-loader](https://github.com/cbtw-apac/qdrant-loader) supports Git repositories as sources, branch selection, include and exclude paths, file-type filters, chunking, embeddings and Qdrant as the destination. Its documentation also describes incremental processing and persistent state, with SQLite or PostgreSQL backends.

The package is not an official Qdrant project. Its PyPI release history shows version 1.0.4 published in July 2026, and the current changelog includes ingestion checkpoints, resume behavior, concurrency work and worker flows. That makes it worth testing as a maintained candidate rather than dismissing it as an abandoned demo.

It is broader than a tiny Markdown-to-Qdrant function: it has its own configuration, state database, scheduler and embedding-provider abstraction. For a corpus consisting only of Markdown, that extra machinery may or may not be justified. The important tests are deletion and rename reconciliation, source metadata fidelity, and whether its embedding choices fit the intended retrieval design.
