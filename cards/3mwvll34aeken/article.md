Pi Durable is embedded in your application process. Configure pi-ai model access, an extension registry and tool execution environments, then open a Harness over SQLite or JSONL.

Create or reopen a conversation and choose its model, instructions and tools. submit() durably admits an input and returns a Submission; wait() observes completion, while view/watch APIs expose current state and updates.

After restarting, open the same storage and call resume(). A repeated input with the same requestId finds the original submission. Task checkpoints preserve execution progress; tool replay still needs an explicit safety policy.

Your application owns starting and stopping the process. The package remains experimental.

Sources: [package API](https://github.com/earendil-works/pi/blob/main/packages/durable/README.md), [design explanation](https://earendil.com/posts/pi-durable/).
