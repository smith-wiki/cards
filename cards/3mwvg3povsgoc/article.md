Pi Durable is a library to embed in a JavaScript/TypeScript application. Configure model access through pi-ai, tools/extensions, execution environments and storage; submit input to a conversation and observe answers, tool activity and committed state.

SQLite and JSONL persist transcripts, queued inputs, task checkpoints and typed application documents. MemoryStorage is non-persistent. Restart the host application, reopen the same storage and resume unfinished tasks.

One harness can run independent conversations or forks concurrently. Multiple clients can observe and steer a conversation, receiving its current state on reconnect. Your application supplies its interface and deployment.

The package is experimental as announced on 1 October 2026; its API can change.

Sources: [Pi Durable announcement](https://earendil.com/posts/pi-durable/), [package documentation](https://github.com/earendil-works/pi/blob/main/packages/durable/README.md).
