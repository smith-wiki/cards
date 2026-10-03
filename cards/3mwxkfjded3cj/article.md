Keep the logical agent separate from the temporary object running in memory.

A new invocation can activate the same named agent after sleep or eviction. Initialization runs again. `initialState` applies only when stored state is absent; existing data loads from SQLite.

After work finishes, the runtime can hibernate the instance when it meets the conditions for hibernation. Pending work and outbound connections can prevent immediate sleep. Hibernated WebSocket connections can remain open.

Save progress during execution. Cloudflare does not provide a guaranteed shutdown callback for a final save. Ordinary fields and a JavaScript call stack are not durable storage.

Recovery from interrupted work is separate. Think wraps chat turns in recoverable fibers and schedules a bounded continuation or retry. This is built in. Our [earlier recovery explanation](https://andy.smith.wiki/3mwxj732lkhgu/) describes responsibilities for custom work on the base Agent, where snapshots and recovery behavior must be supplied.

These are documented behaviors; we have not tested interruption or recovery here.

Sources: [Durable Object lifecycle](https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/), [persistent state](https://developers.cloudflare.com/agents/runtime/lifecycle/state/), [Think recovery](https://developers.cloudflare.com/agents/harnesses/think/recovery/), [custom fibers](https://developers.cloudflare.com/agents/runtime/execution/durable-execution/).
