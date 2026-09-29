# Graphiti and Zep: distinguish the engine from the platform

Primary sources checked September 29, 2026. Finding for the [memory backend investigation](card:3mwnggsdth3ei).

## Graphiti

The [Graphiti repository](https://github.com/getzep/graphiti) describes incremental ingestion of episodes, entity and relationship extraction, and temporal facts. Its bi-temporal model distinguishes when facts apply from when the system records them. Invalidation can preserve an earlier relationship for historical queries rather than treating every correction as a destructive overwrite.

Retrieval combines vectors, full-text search, and graph traversal. Supported storage includes Neo4j, FalkorDB, and Amazon Neptune. The repository also supplies an MCP server. Extraction still requires model configuration and reliable structured output; a graph is not created merely by inserting embeddings.

## Zep is a separate product comparison

The [official comparison](https://help.getzep.com/zep-vs-graphiti) distinguishes self-operated Graphiti from Zep's managed context platform. Zep adds proprietary models, context assembly, users and message management, and governance around its Konig graph service. Graphiti leaves surrounding application management and access control to its operator. Running Graphiti is therefore not equivalent to self-hosting the complete current Zep product.

The [graph overview](https://help.getzep.com/graph-overview) explains the connections between facts, their source episodes, and temporal metadata. These links support inspection; they do not certify that an extracted claim is true.

## Proposed role

Graphiti is a conditional pilot candidate for questions such as who owned a service when an incident happened, which project a person belonged to at a given time, and how changing relationships connect several entities. Compare it with a structured-fact baseline before accepting extra ingestion and database complexity.

For a small preference store, I would test a simpler independent memory service first. For historical or multi-hop relationship questions, I would include Graphiti early. Neither judgment is a measured quality ranking. Fact invalidation must also be tested separately from complete deletion of sensitive source material and derived records.
