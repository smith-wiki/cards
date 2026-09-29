# Decision boundary for a custom module

There is a ready-made candidate close enough to test before building another framework: [qdrant-loader](https://github.com/cbtw-apac/qdrant-loader). There is also an officially documented external directory-ingestion path through [Unstructured](https://qdrant.tech/documentation/data-management/unstructured/).

There is not, in current Qdrant itself, a documented `ingest repository` operation that owns Git traversal, Markdown chunking and incremental synchronization.

If qdrant-loader handles the required source selection, deletion and rename behavior, metadata, and embedding configuration cleanly, it can replace the custom shared indexer. If it does not, the remaining custom component can be intentionally small: obtain the Git delta, chunk changed Markdown, delete or replace stale points, attach stable source metadata, and send text to Qdrant. [Cloud Inference](https://qdrant.tech/documentation/cloud/inference/) can perform the embedding step inside the Qdrant request path.

This conclusion is about implementation fit, not measured retrieval quality; chunking and embedding choices still need evaluation on the corpus.
