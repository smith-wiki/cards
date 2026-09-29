# Writing memory is selection and interpretation, not just storage

[Google Memory Bank](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank) documents extraction of meaningful information and consolidation with existing memories. [Hindsight's retain API](https://hindsight.vectorize.io/developer/api/retain) similarly turns content into extracted facts and entities; its guide explicitly warns that retained content is not stored verbatim. These are examples of memory-management functions, not capabilities guaranteed by every backend.

Consider a hypothetical message: "For project Atlas, we are considering replacing SQLite with PostgreSQL, but have not decided yet."

A useful derived record preserves the project, the alternatives, and the undecided status. "Atlas uses PostgreSQL" would be an extraction error. A later decision to migrate still would not establish that deployment had happened.

My proposed write contract preserves source references, speaker or evidence type, scope, dates, and material uncertainty. Identifying that two names refer to the same entity and merging repeated statements can improve organization, but both operations need inspection because a mistaken merge changes meaning.

The source archive and the memory projection should remain distinguishable. Repeating a model-generated claim should not turn it into independent corroboration. This is a reliability requirement for the investigation, not an assertion that all reviewed products already satisfy it.
