# Wake-on-message controller

The user requires agent compute to be absent while idle: a mention or directed message wakes the agent, the agent performs a turn, and the runtime goes idle again. A chat-to-ACP bridge that keeps an agent process alive does not provide this lifecycle. Keep one small **always-available adapter**; it owns technical delivery state, not the human work queue.

Two independent plugin boundaries preserve replaceability:

- **Bus driver:** receives and verifies platform events, identifies the target account, sender, room and thread, then publishes a response in that same conversation.
- **Runtime driver:** starts or resumes execution, delivers a turn through the chosen agent runtime's prompt interface, observes an explicit completion/failure, and releases compute.

A durable intake record keyed by the upstream message ID prevents retries from starting the same turn twice. The adapter serializes turns for one agent/conversation or applies an explicit concurrency rule. Conversation content and the optional GitHub Issue remain the source of truth for human work. The intake record contains correlation and delivery status only.

## Google AX lifecycle

AX has gRPC `CreateTask`, `WatchTask`, `SuspendTask`, `ResumeTask` and `DeleteTask`. The Task starts a command inside Agent Substrate and can preserve `/workspace` across suspend/resume. In the documented AX runner, suspend sends SIGTERM and resume starts a **new process** with restored files, so a coding agent must reload its session from durable state or receive relevant thread context again. `ResumeTask` has no prompt field. The agent runtime needs its own message endpoint or an authenticated mailbox. AX's default runner only exposes health and metadata endpoints.
[AX design/API](https://github.com/google/ax/blob/main/DESIGN.md) | [Runner contract](https://github.com/google/ax/blob/main/docs/runner.md)

The current runner stays alive after `spec.command` exits, and AX does not read the command's exit status back from the container. Consequently `Task: Running` is **not** a turn-complete signal. The agent command or a custom runner's documented `OnCommandExit` hook can send the result/terminal event to the adapter; only then should the adapter publish the reply and suspend/delete the Task. Automatic idle suspension remains on the [AX roadmap](https://github.com/google/ax/blob/main/docs/roadmap.md). A [recent issue](https://github.com/google/ax/issues/428) also reports that `spec.command` executed during golden boot on a specific revision; side-effecting work should not be put directly in startup without verifying the pinned build.

There are two viable runtime mappings to test:

1. **Task per activation:** create a Task for one turn, deliver input when the real actor is ready, obtain an explicit result and delete it. The thread/history or external session store provides context for the next call.
2. **Suspended Task per agent/conversation:** retain its workspace, queue the next message, resume the Task, let the new agent process load input/state, confirm completion and suspend again. This preserves files while idle, at the cost of snapshot/storage and more lifecycle handling.

An existing [CloudEvents](https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md) envelope can normalize event identity (`source` plus `id`); it does not supply chat connectors. [A2A](https://a2a-protocol.org/dev/specification/) can be a standard prompt/task API exposed by a runtime driver, but AX does not provide that API automatically. [ACP](https://agentclientprotocol.com/) can control local coding-agent subprocesses after wake-up; it is not the wake-up service. This design creates no new agent YAML language.
