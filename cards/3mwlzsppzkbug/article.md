# Hatchet as the execution controller, not another messaging interface

Hatchet documents event and webhook triggers, persistent task records, retries, and workers that execute registered functions. It can be self-hosted and is MIT-licensed. That matches the clarified requirement more closely than an organizational agent-management product.

Sources: [overview](https://docs.hatchet.run/v1), [events](https://docs.hatchet.run/v1/events), [webhooks](https://docs.hatchet.run/v1/webhooks), [workers](https://docs.hatchet.run/v1/workers).

## Proposed use

Keep a trusted control worker running outside the agent sandbox. Its task is to create or resume the actual agent through AX or OpenShell, deliver input, observe execution, and record the result. The worker is not the agent and does not need to spend model tokens while waiting for work. This is a proposed adapter, not an integration tested here.

Hatchet can constrain concurrency by a key, which could be a conversation or agent identifier. Its CANCEL_IN_PROGRESS strategy can request replacement of a running task, but that is not evidence that an external sandbox has already stopped.

Sources: [concurrency](https://docs.hatchet.run/v1/concurrency), [cancellation](https://docs.hatchet.run/v1/cancellation).

Keep event deduplication and external side-effect deduplication distinct. A durable task system does not by itself make an external publication or payment execute exactly once. For the pilot, persist the event-to-run-to-runtime relationship and reconcile uncertain outcomes before retrying a launch.

This is the first code-first candidate I would evaluate for the clarified need, not a decision to deploy it. A direct event-to-runtime controller may be enough when the existing system already supplies reliable scheduling and state.
