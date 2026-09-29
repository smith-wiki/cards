# One OMP session importer, multiple memory drivers

OMP stores sessions as JSONL, but the logical conversation is a tree: entries have ids and parent ids, a leaf selects the active branch, and compaction and reset entries affect reconstructed context. The documented SessionManager builds effective context from this structure.

Source:
- https://github.com/can1357/oh-my-pi/blob/main/docs/session.md

I propose an importer with two layers.

First, an OMP reader reconstructs the effective transcript and emits a backend-neutral session envelope: stable session id, project root, timestamps, user and assistant turns, selected tool-result evidence, and source-file identity.

Second, backend drivers ingest that envelope. This keeps OMP parsing and privacy filtering independent from the chosen memory engine. It also lets historical backfill and future live capture share the same normalization rules.

Do not blindly import every physical JSONL record. That can include abandoned branches, compaction artifacts, and implementation entries that were not part of the effective conversation.
