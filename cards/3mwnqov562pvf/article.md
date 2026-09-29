# Refining the controller's identity model

The [first interface sketch](card:3mwnqlsat4rsx) used `send(runId, messageRef)`. That works for a currently running or waiting execution, but it is too narrow for a new message after the execution has completed.

- `discussionRef`: the human-visible channel, topic, or thread.
- `taskId`: an assignment and its outcome across multiple attempts and conversations.
- `sessionId`: the agent's resumable conversational context, when its harness supports one.
- `runId`: a concrete execution or turn, with status and usage.
- `runtimeId`: the process, container, or sandbox that currently hosts it.

A follow-up might resume a waiting run, start a new run using the same session, or create a new task. The controller decides from explicit routing and policy, not merely from the fact that the message is in the same discussion. A cancellation request identifies the active run and propagates to its runtime.

These distinctions map to real product models: Paperclip exposes an Issue plus heartbeat Runs and comments; [Issues API](https://docs.paperclip.ing/reference/api/issues/), [Run CLI](https://docs.paperclip.ing/reference/cli/run/). LangSmith Agent Server separates Threads from Runs and checkpoints; [Agent Server](https://docs.langchain.com/langsmith/agent-server). Google AX's Task identifies an execution environment and lifecycle; it does not define the human discussion or agent prompt-turn protocol. [AX concepts](https://github.com/google/ax/blob/main/docs/concepts.md).

This is a proposed translation model for the communication adapter and controller. Products need not use our exact names internally.
