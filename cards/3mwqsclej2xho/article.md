# OpenViking versus dedicated memory engines

OpenViking spans several responsibilities that we previously separated.

For repository knowledge it can ingest local files, directories, Git repositories, URLs, and other resources. Code ingestion uses tree-sitter based skeleton extraction when available, and resource Watches can refresh supported remote sources such as Git repositories.

For agent memory, committing a session archives messages and asynchronously extracts long-term memories. The current memory pipeline can create, merge, skip, and delete memories; every commit records a memory_diff.json audit record. Memory consolidation can later deduplicate and reorganize memories.

For context delivery, retrieval is hierarchical rather than only flat vector search. Search results remain typed as memories, resources, or skills, and the context mode can assemble an injection-ready block under a token budget.

This is broader than Hindsight's retain/recall/reflect memory-service boundary and broader than Graphiti's temporal graph engine. It also overlaps the repository retrieval layer we had been considering separately.

The cost of that breadth is architectural coupling: choosing OpenViking means adopting its virtual filesystem, session model, extraction pipeline, retrieval semantics, and service surface rather than only adding a narrow memory API.

Sources:
- https://docs.openviking.ai/en/api/02-resources
- https://docs.openviking.ai/en/concepts/06-extraction
- https://docs.openviking.ai/en/concepts/08-session
- https://docs.openviking.ai/en/api/06-retrieval
