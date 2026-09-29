# Three different problems behind agent memory

Conceptual framing for the [Operator's question](card:3mwni2vbklvdh), checked September 29, 2026.

A conversation store preserves messages. A runtime checkpoint preserves the execution state needed to resume a workflow. Cross-session memory makes selected knowledge available to later tasks, potentially in different threads or agent processes. These responsibilities can use the same database without becoming the same function.

[LangGraph's memory overview](https://docs.langchain.com/oss/python/concepts/memory) distinguishes thread-scoped state, persisted through checkpoints, from long-term information stored across conversations. This is a useful engineering distinction, not a universal naming convention.

Saving a large history is not the same as making it useful at the next model call. [Anthropic's context-engineering guide](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) describes selecting context, compacting conversations, and maintaining durable notes that an agent can consult later.

For this investigation, I propose distinguishing a storage backend from a memory-management service. The former persists and retrieves records. The latter may additionally decide what to extract, reconcile, summarize, and present. Product boundaries vary, so these are comparison questions rather than promises that every candidate implements the full lifecycle.

The goal is not to preserve every token in every prompt. It is to make relevant past information available with enough context to use it correctly.
