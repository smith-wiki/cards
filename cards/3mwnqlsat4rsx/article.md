# Proposed controller contract

This is a functional specification for comparison, not an implementation already verified in one product. It follows the [provisional communication contract](card:3mwnpdmk5v52l) and the [earlier event-to-runtime discussion](card:3mwlzrs7zawpz).

## External operations

- `invoke(agentRef, sourceMessageRef, actorRef, contextRef, idempotencyKey) -> runId`: authorize, deduplicate, record a durable request, and queue it.
- `send(runId, messageRef) -> accepted/status`: deliver a follow-up to the intended session or resume a waiting run. A message in a shared discussion alone cannot select a run.
- `get/watch(runId) -> status, outputRefs, error, usage`: let the communication adapter show acceptance, progress, requests for input, and final outcome.
- `cancel(runId, actorRef) -> status`: request cancellation, propagate it to the underlying session and runtime, then confirm actual termination or report uncertainty.
- `delegate(parentRunId, agentRef, task, limits) -> childRunId`: use the same admission and observation path for agent-created subtasks, with inherited or narrower policy.

## Controller-owned state

An agent registry defines versioned instructions/harness, model, tools, runtime template, identity, scope, and limits. The run ledger maps the source event to run ID, session ID, runtime resource ID, parent, owner, status, deadlines, attempts, artifacts, and costs. Scheduler policy bounds concurrency and budgets; a permission broker provides task-scoped tool access.

A useful initial state model is `queued -> starting -> running -> waiting_for_input -> completed | failed | cancelled`, with recovery for unknown runtime outcomes. A workflow's cancellation signal is not proof that an external agent stopped. The controller needs an explicit stop operation and a reconciliation loop for orphaned resources, as noted in [the earlier cancellation finding](card:3mwlzu5kb4zl2).

The controller need not decide the semantic plan itself. A deterministic rule or a coordinator agent may propose subtasks; the controller enforces allowed transitions and retains durable ownership.
