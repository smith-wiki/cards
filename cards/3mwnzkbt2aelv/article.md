# Graphify versus Graphiti

The similar names hide different starting points.

Graphify starts from artifacts, especially software repositories. Its structural path parses code into symbols and relationships, merges references, clusters the resulting graph, and incrementally refreshes changed files. Its core questions are structural: what calls this, what depends on that, what path connects two concepts, and which source supports an edge.

Sources:
- https://docs.graphify.com/concepts/architecture
- https://docs.graphify.com/guides/incremental-updates

Graphiti starts from episodes and builds a temporal Context Graph. Its documentation emphasizes entity and edge extraction, a bi-temporal model, fact invalidation, provenance to episodes, and retrieval combining semantic, full-text, temporal, and graph signals. Its core questions include what relationship held at a particular time and how changing facts evolved.

Sources:
- https://help.getzep.com/v2/graphiti/getting-started/overview
- https://help.getzep.com/zep-vs-graphiti

The architectural distinction is therefore not graph versus non-graph. It is source-structure-first versus event-and-fact-lifecycle-first. Graphify can retain project and agent context, while Graphiti is explicitly designed around changing temporal facts. Which matters more depends on the workload; no comparative deployment has been run here.
