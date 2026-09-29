# Four kinds of state

1. **Task ledger:** task ID, source event, owner, parent/dependencies, status, limits, approval state, attempts, runtime resource ID, and links to outputs. This belongs to a trusted controller.
2. **Agent session:** the current reasoning loop's messages and checkpoints, so an interrupted run can resume. LangGraph distinguishes a thread-scoped checkpointer from a store used across threads. [Persistence docs](https://docs.langchain.com/oss/python/langgraph/persistence).
3. **Artifacts:** files, patches, reports, evidence, and evaluation results. Store durable references and provenance, rather than copying all large outputs into every agent message. A2A also distinguishes messages used for coordination from artifacts used for task results. [A2A specification](https://a2a-protocol.org/latest/specification/).
4. **Reusable knowledge:** repository search, domain facts, preferences, and learned procedures. Select what a later task may read; do not treat the whole transcript as automatic memory. This connects to the [separate memory investigation](card:3mwni4c4wr23y).

A queue or workflow system can preserve execution state, but external actions such as publishing or applying changes still need idempotency keys or reconciliation before retrying. Temporal explicitly requires nondeterministic API and LLM operations to run as Activities outside workflow replay. [Temporal workflow definition](https://docs.temporal.io/workflow-definition). These are conceptual boundaries; no database or engine has been selected.
