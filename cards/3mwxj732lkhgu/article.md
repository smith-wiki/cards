An agent can keep its data across restarts while losing an operation that was still running. Durable Object eviction discards in-memory execution and breaks active upstream connections.

The SDK documents `runFiber()` for work inside the agent. It records a task in SQLite and keeps the agent alive while it runs. Application code saves intermediate snapshots with `stash()` and handles `onFiberRecovered()` to continue after eviction.

`startFiber()` additionally supports accepting background work, deduplicating submissions and inspecting its status.

For work that should run independently of the agent with retries for individual steps, Cloudflare recommends Workflows. Choose the recovery mechanism explicitly; ordinary stored state is not a saved JavaScript stack.

These are documented guarantees and responsibilities, not failure recovery tested in this investigation.

Source: [Durable execution with fibers](https://developers.cloudflare.com/agents/runtime/execution/durable-execution/).
