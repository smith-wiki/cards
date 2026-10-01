# Herdr's control API and the turn boundary

The [socket API](https://herdr.dev/docs/socket-api/) exposes agent commands and event subscriptions. Scripts can launch an agent in an existing shell pane, submit a prompt, read terminal output and wait for lifecycle changes. This makes Herdr a candidate implementation behind the fleet's [controller contract](card:3mwnqov562pvf).

The [automation guide](https://herdr.dev/docs/agent-automation/) explicitly says that prompt waits do not track individual turns. If an agent is already working, completion of that active turn can satisfy the wait for a newly submitted prompt. A timeout also does not prove that no input was delivered.

My proposed integration policy is to serialize submissions per agent conversation, confirm readiness before delivery, and inspect state before retrying an ambiguous request. A state transition alone should not be treated as a durable, task-specific success receipt.

A useful proposed test is two successive prompts to one OMP conversation, checking which response satisfies each wait, followed by an interrupted delivery. This test has not been performed.
