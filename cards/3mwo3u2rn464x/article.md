# Proposed context architecture

Keep source systems separate and compose them at read time.

A coding-agent request can be handled as:

1. Read required authoritative task state directly.
2. Query repository knowledge for current structural or documentary evidence.
3. Recall relevant agent memory from prior OMP sessions.
4. Add provenance and revision metadata to both.
5. Put a bounded subset into the model context.
6. Let the agent perform additional just-in-time repository queries when needed.

Conceptually:

```
Git / repo / docs  -> repository index ----\
                                      context assembler -> agent
OMP sessions       -> agent memory --------/
run state          -> direct state --------/
```

The context assembler can be small. It does not need to normalize both stores into one schema internally; it only needs to enforce scope, provenance, token budget, and precedence.

For current repository facts, direct repository evidence should normally outrank stale remembered claims. For user preferences or prior decisions, memory may be the only relevant source. This avoids asking one backend to support incompatible freshness and authority rules.
