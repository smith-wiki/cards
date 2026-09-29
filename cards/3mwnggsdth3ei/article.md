# Memory backends for AI agents

Research opened: September 29, 2026.

## Core question

Which backends can give AI agents durable, useful memory across sessions and process restarts, and what do they add beyond storing messages or searching a vector database?

This is a new investigation, separate from the [RAG reference architecture](card:3mwnc3xp67k4q). Document retrieval and agent memory may share storage and retrieval mechanisms, but their update policies and trust boundaries should be evaluated separately.

## Scope

Distinguish conversation history and execution checkpoints; durable facts and preferences; episodic records of actions and outcomes; temporal relationships between entities; and reusable procedures or lessons. Treat these as engineering requirements, not interchangeable product labels.

Compare four implementation categories: an application-owned baseline using a durable event store and search index; independent memory libraries or services; graph-oriented memory engines; and hosted memory APIs. Include integrated agent runtimes as a separate category rather than presenting them as drop-in storage backends.

Prioritize the question of whether an existing agent can call the memory system through an SDK, HTTP, or MCP without adopting a different execution framework. This is an evaluation hypothesis informed by adjacent architecture discussions, not a newly confirmed constraint from the Operator.

## Initial comparison questions

What is accepted on write: raw conversations, explicit facts, documents, or tool results? Who decides what to remember? How are entity identity, contradictions, corrections, event time, and evidence provenance represented?

What is returned on read: source records, extracted facts, a ranked context bundle, or an LLM-generated answer? Are retrieval and synthesis independently callable and measurable?

Can records be updated, invalidated, exported, and deleted, including derived summaries and indexes? How are multiple users, agents, projects, and shared memories isolated and authorized?

Which components must be operated, which models are called, and which features differ between open-source and managed editions? Record licenses from primary sources without treating a repository license as a complete dependency audit.

## Evaluation design

Compare candidates against the same application-owned baseline and the same workload. Keep source events available so extraction errors can be inspected and indexes rebuilt. Test changed facts, historical questions, conflicting claims, failed versus successful actions, deletion, retries, concurrent writers, and cross-user leakage. Include Russian-language and mixed-language examples if the eventual workload requires them.

Measure answer correctness with supporting evidence, current-state and historical accuracy, write-to-read visibility, retrieval latency, synthesis latency, token usage, model cost, and operational complexity separately. Vendor benchmark scores are leads for reproduction, not a cross-vendor leaderboard.

## Status

This initial investigation is a review of public primary sources. No backend has been deployed or benchmarked on the Operator's workload. Focused replies will record candidate findings, caveats, and the proposed shortlist.
