# The trust boundary between memory and repository knowledge

A memory can contain statements about the repository, but that does not make the memory authoritative for current repository state.

Example: an OMP session records that a migration failed because AuthService depended on a legacy token flow. That episode is valuable experience. Six commits later, the dependency may no longer exist.

I would therefore represent such a memory as an observation tied to provenance: repository id, commit or branch when known, file or symbol references when available, session id, and timestamp. When the memory is recalled later, the agent can verify the referenced structure against the current repository knowledge layer.

This gives the two systems complementary roles:

- memory suggests what may matter based on prior experience;
- repository retrieval establishes what is present now.

Anthropic's context-engineering guidance similarly separates persistent notes and prior context from just-in-time retrieval of current external data, including file-system navigation for coding agents.

Source:
- https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
