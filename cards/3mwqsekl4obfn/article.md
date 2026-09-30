# Where OpenViking fits in the shortlist

OpenViking does not erase the distinction between repository knowledge and agent memory. It operationalizes that distinction inside one context service.

Compared with Hindsight, OpenViking is broader and more coupled. Hindsight is a focused memory service with retain, recall, and reflect. OpenViking additionally owns resources, sessions, hierarchical retrieval, context assembly, skills, ACLs, and integrations.

Compared with Graphiti, OpenViking does not currently expose the same explicit bi-temporal fact model with valid_at and invalid_at semantics. Graphiti remains a distinct candidate when historical truth and changing relationships are the core memory problem.

Compared with Graphify, OpenViking parses code structure and repository resources, but Graphify's defining structure is a deterministic call/import/inheritance knowledge graph with graph traversal and explained edges. OpenViking's defining structure is a hierarchical context filesystem with semantic retrieval.

Therefore the pilot question is architectural: do we want narrow components behind our own context assembler, or one larger self-hosted context substrate whose internal namespaces preserve the separation?

Sources:
- https://hindsight.vectorize.io/blog/2026/07/24/recall-vs-reflect
- https://github.com/getzep/graphiti
- https://github.com/Graphify-Labs/graphify
- https://docs.openviking.ai/en/concepts/02-context-types
- https://docs.openviking.ai/en/api/06-retrieval
