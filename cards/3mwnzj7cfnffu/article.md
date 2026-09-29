# Graphify: structural project memory plus a hosted agent-memory layer

Primary sources checked September 29, 2026.

Graphify's open-source core is primarily a project knowledge-graph engine. Its documentation says code is parsed locally with tree-sitter and specialized structural extractors, while documents and media can contribute concepts and relationships through a configured model. The result is a persistent graph that supports query, path tracing, explanation, provenance labels, community detection, and MCP access.

Sources:
- https://docs.graphify.com/concepts/architecture
- https://github.com/Graphify-Labs/graphify

The open-source repository also includes a smaller work-memory mechanism. `graphify save-result` records whether a previous investigation was useful, a dead end, or corrected, and `graphify reflect` aggregates those outcomes into lessons and a graph overlay. This is experience feedback tied to project investigation, not a complete multi-user memory service.

Graphify Cloud adds a distinct Agent Memory feature. Its documentation describes remembered facts organized around entities, with source references, provenance, graph anchors, and grounding metrics. The same Cloud workspace also includes a separate Learning feature for pull-request feedback, which adjusts advisory review behavior rather than general memory.

Sources:
- https://docs.graphify.com/platform/memory
- https://docs.graphify.com/platform/learning
- https://docs.graphify.com/platform/overview

For this research, Graphify should therefore be evaluated in two pieces: the OSS structural graph and work-memory functions, and the hosted or enterprise agent-memory layer. Do not assume that every Cloud memory capability exists in the local open-source engine.
