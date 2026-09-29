# Controller-to-agent invocation with Google AX

[AX's gRPC API](https://github.com/google/ax/blob/main/DESIGN.md) offers CreateTask, ResumeTask, SuspendTask, DeleteTask and WatchTask, but no prompt RPC. The [runner contract](https://github.com/google/ax/blob/main/docs/runner.md) starts `spec.command` and exposes health/metadata on port 80. A resumed AX Task receives restored `/workspace` files and a fresh process tree. Thus an ACP stdio connection cannot be treated as surviving suspend.

## Path A: one invocation per Task

The bus adapter stores a correlation record, creates an AX Task with a fixed, inert launcher and an invocation ID, then permits the *real* Task to fetch the message. The launcher runs a native CLI or [acpx](https://github.com/openclaw/acpx/blob/main/docs/CLI.md), captures structured events and a final result, and reports a terminal outcome to the adapter. The adapter posts the reply to the original thread and deletes the Task. A later message creates a new Task; the launcher can reload the agent's saved session or assemble context from the conversation.

Do not equate AX `Running/Ready` with agent completion. The stock runner remains alive after its command exits and AX does not read its exit code. A custom runner can use the documented `OnCommandExit` hook, or the launcher can emit a completion callback. A [reported AX/Substrate golden-boot behavior](https://github.com/google/ax/issues/428) ran `spec.command` before the real Task at specific commits: use an explicit start gate and deduplicate by invocation ID, and verify the pinned build before side effects.

## Path B: reusable suspended Task

The Task hosts a small request endpoint or polls an authenticated mailbox after each resume. The controller resumes the Task, sends a message, waits for an explicit turn result, and suspends it again. Its endpoint can implement [A2A v1.0](https://a2a-protocol.org/v1.0.0/definitions/): SendMessage, GetTask, CancelTask, optional streaming, context ID and asynchronous invocation status. An A2A Task is a protocol-level invocation record, not a human task backlog or an AX Task. The endpoint still needs code to bridge the request to a local ACP agent or CLI; AX does not serve A2A by default. Agent Substrate's HTTP router can wake suspended Actors, but direct request-to-wake behavior through AX and a custom runner should be proven with the pinned versions.

For a first slice, Path A with a single CLI/acpx invocation and explicit result is smaller. Select Path B if preserving one sandbox and its durable workspace across messages is important. Keep bus identity, invocation ID, agent session ID and AX Task ID separate. The communication thread (and optional GitHub Issue) remains the human work record. [AX runner](https://github.com/google/ax/blob/main/docs/runner.md) | [A2A definition](https://a2a-protocol.org/v1.0.0/definitions/)
