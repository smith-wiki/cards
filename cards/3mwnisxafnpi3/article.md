# Logical memory architecture is not a deployment diagram

Continuation of the [one-engine proposal](card:3mwniqbikfhdx). This is a proposed architecture, not a selected product or a deployed system.

## A documented example

[Hindsight's storage guide](https://hindsight.vectorize.io/developer/storage), checked September 29, 2026, describes PostgreSQL with pgvector, native full-text search, relational records, JSONB, and recursive graph queries. This demonstrates that several retrieval mechanisms can share one database. It does not establish that this topology meets every workload's performance or isolation requirements.

[LangGraph's memory overview](https://docs.langchain.com/oss/python/concepts/memory) distinguishes thread-level checkpoints from cross-session memory. A runtime and a memory system can therefore serve different responsibilities even when their data uses the same database technology.

## Proposed logical boundaries

| Responsibility | What belongs here | What it should not be confused with |
| --- | --- | --- |
| Execution state | Run ID, step, tool completion records, pending work, approvals | An inferred recollection that a task probably finished |
| Source evidence | Retained messages, observed tool results, versioned document references, explicit decisions and edits | Automatically established truth about the world |
| Derived memory | Extracted claims, episode summaries, associations, candidate lessons and search representations | The only surviving copy of a decision or correction |
| Context assembly | Direct reads, scoped search, evidence expansion, selection within a context budget | A new authoritative database |

These are boundaries of ownership and behavior, not four mandatory microservices. A small implementation could keep the source and execution records in its existing application database, call one memory engine, and assemble context inside the agent backend. Database schemas and service credentials should respect the boundaries; do not write directly into a memory product's internal tables merely because it shares a PostgreSQL server.

The engine's own extraction and reconciliation functions should be reused where suitable. A small adapter need not reproduce the entire engine. Separate deployment is justified by an actual operational, capability, or isolation requirement, not by naming another category of memory.
