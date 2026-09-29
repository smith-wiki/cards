# Mapping normalized OMP sessions into memory engines

Hindsight recommends retaining a full conversation as one item. A stable document_id gives replace-and-reprocess semantics when the same conversation is retained again, and batch retention supports bulk ingestion. That makes an OMP session id a natural document id.

Source:
- https://hindsight.vectorize.io/developer/api/retain

Mem0 OSS accepts message arrays and user_id, agent_id, or run_id plus metadata. An OMP session id maps naturally to run_id. Current OSS extraction is ADD-only, so a bulk importer should keep its own import manifest or define explicit replacement behavior instead of assuming replay is harmless.

Sources:
- https://github.com/mem0ai/mem0/blob/main/mem0/memory/main.py
- https://github.com/mem0ai/mem0/blob/main/docs/migration/oss-v2-to-v3.mdx

Graphiti accepts text or message episodes with reference times and group ids. The third-party pi-graphiti extension additionally ships a file-ingest path for notes, documents, and transcripts, with explicit group targeting and chunking.

Sources:
- https://github.com/getzep/graphiti
- https://pi.dev/packages/pi-graphiti

These are ingestion capabilities, not proof that the same historical import can be safely rerun. The importer should track source session id, source revision or hash, and backend ingestion state.
