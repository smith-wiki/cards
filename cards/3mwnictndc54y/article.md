# Shared knowledge without indiscriminate access

Several agents may need a common project history while still keeping user-specific or private information separate. This creates two independent design questions: how records are organized, and who may read or change them.

[Google Memory Bank's access-control guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/iam-conditions) demonstrates scope-based permissions and distinguishes read-only and editing roles. This is an example of enforced authorization beyond adding a user ID to a search filter.

For our comparison, I propose deriving allowed scopes from authenticated application identity rather than accepting whatever identifier a model supplies. Apply restrictions to extraction, consolidation, search, synthesis, and exports: a private fact should not leak through a shared summary.

Separate shared facts from shared authority. Remembering that a person once requested an operation does not grant permission to perform it later. Likewise, several agents reading the same project memory does not coordinate their concurrent side effects or replace a task execution store.

These are proposed boundaries for an eventual deployment, not a claim that we have tested any candidate's access controls.
