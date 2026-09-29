# What Qdrant itself now removes from the ingestion pipeline

Qdrant can perform inference at write and query time. [Qdrant Cloud Inference](https://qdrant.tech/documentation/cloud/inference/) lets an application send text through the Qdrant API and have Qdrant generate and store vectors; the Python client also integrates [FastEmbed](https://github.com/qdrant/qdrant-client) for client-side embedding.

This means a custom indexer does not necessarily need a separate embedding service or embedding SDK. It can send chunks as text plus metadata and let the Qdrant integration produce vectors.

The boundary remains important: current Qdrant documentation does not expose a repository or directory ingestion primitive that recursively reads files, parses Markdown, chooses chunk boundaries, tracks Git state, or removes stale chunks after deletion or rename. Qdrant starts after the application has selected the content to index.

Qdrant's own [data-management integrations](https://qdrant.tech/documentation/data-management/) list external ingestion tools such as Unstructured, Chonkie, Airbyte and others. That separation is consistent with Qdrant being the vector/search layer rather than a Git-aware document loader.
