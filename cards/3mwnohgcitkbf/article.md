# Two control planes for a self-hosted agent team

This is an architectural proposal, not a deployment test or a stack decision.

**Coordination** accepts work from the Operator's existing interfaces, assigns a task ID and owner, records dependencies and status, selects an agent configuration, and collects results. A model-led supervisor can suggest or create subtasks when the work is open ended; programmatic rules can handle known routes. OpenAI's Agents SDK documents manager-as-tool, handoff, and code-controlled orchestration as distinct patterns. [Agent orchestration](https://openai.github.io/openai-agents-python/multi_agent/). Anthropic describes orchestrator-workers as useful when the necessary subtasks are not known in advance. [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents).

**Execution** creates or reuses an agent runtime, passes in the task and scoped tools, observes it, and propagates cancellation to the concrete process or sandbox. AX and OpenShell were examined in [the prior fleet discussion](card:3mwlzrs7zawpz); this proposal does not assume either one. An orchestration task marked canceled does not prove the external runtime has stopped.

The controller should persist event ID -> task ID -> agent run ID -> runtime resource ID. Each external write needs its own idempotency or reconciliation rule: even a durable workflow engine can retry an activity after a side effect happened. [Temporal activity definition](https://docs.temporal.io/activity-definition).

A first conceptual path is: existing inbox/event -> trusted controller and task ledger -> one assigned agent or bounded worker tasks -> review/validation -> result artifact and response. The controller owns policy and durable state; agents own bounded reasoning and tool use.
