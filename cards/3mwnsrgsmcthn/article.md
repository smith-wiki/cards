# Unstructured provides a ready directory-to-Qdrant pipeline

Qdrant's official [Unstructured integration](https://qdrant.tech/documentation/data-management/unstructured/) shows `unstructured-ingest` reading local files, applying a chunking strategy and embedding provider, then writing into a Qdrant collection.

For an already checked-out repository in CI, this substantially reduces glue code for a full ingestion pass. Unstructured also offers structure-aware chunking such as `by_title`.

What I have not found in the documented Qdrant integration is a Git-aware contract for changed files, deletions, renames and stale-vector reconciliation. Therefore I would treat it as a ready document-ingestion CLI, not yet as a complete replacement for the push-triggered incremental indexer required here.

For plain Markdown it also brings a broader document-processing framework than a Chonkie-based splitter, so the operational and dependency cost should be compared rather than assumed to be free.
