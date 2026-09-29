# Correction, change over time, and forgetting

Consider three different requests about hypothetical project Atlas.

"The earlier database name was wrong" corrects a mistaken record. "We migrated to PostgreSQL after using SQLite" changes the current state while preserving a meaningful historical state. "Forget this project's data" asks for removal, not merely historical invalidation.

[Graphiti](https://github.com/getzep/graphiti) documents validity windows and invalidation of superseded facts while preserving temporal history and source provenance. [Google Memory Bank](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank) documents memory revisions and expiration. These illustrate different functions, not an identical lifecycle contract across products.

I propose checking event time separately from recording time. An old incident report imported today should not automatically overwrite a more recent observation of the system. Contradictory reports may need to remain unresolved until better evidence arrives; recency alone is not authority.

For deletion, check every relevant representation: source records retained by the application, extracted facts, summaries, search indexes, and the backup/retention process. Hiding one fact from normal search is not proof that the information is gone everywhere.

These are requirements and example tests, not guarantees established by this documentation review.
