# Repository knowledge and agent memory should be separate layers

They solve different problems.

Repository knowledge answers questions about the current or historical project state: which symbol calls another, what configuration exists, what a document says, or which commit introduced a change. Its authoritative source is the repository and related build artifacts. The index should be rebuildable from those sources, and freshness is tied to repository revisions.

Agent memory answers questions about past interaction and experience: what the user prefers, what the agent tried before, which investigation was a dead end, which decision was discussed, or which workaround succeeded in a previous session. Its source is conversations, tool outcomes, explicit corrections, and agent observations. It may remain useful even after the repository changes.

These stores can use similar retrieval techniques without becoming the same logical system.

Graphify OSS is therefore better evaluated as repository/project knowledge: it maps code, docs, schemas, and related artifacts into a persistent graph with provenance and incremental updates.

Source:
- https://github.com/Graphify-Labs/graphify

Hindsight is better evaluated as agent memory: retain writes experience and facts, recall retrieves memories, and reflect reasons over them.

Sources:
- https://hindsight.vectorize.io/blog/2026/07/24/recall-vs-reflect
- https://hindsight.vectorize.io/faq

The separation is architectural, not necessarily physical. Both could run on the same database technology, but they should not share update and trust semantics merely because both expose search.
