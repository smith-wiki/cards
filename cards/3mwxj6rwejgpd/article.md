Each agent instance is a Durable Object with a stable identity and its own storage. The SDK persists state changed through `setState()` and loads it when the instance starts again. It can also synchronize state with connected clients.

Hibernation is enabled by default. An idle instance can sleep while its WebSocket connections remain open. A new request, message or alarm activates it again. Store required context in persistent storage; ordinary in-memory variables do not survive eviction.

Schedules also live in SQLite. The SDK supports a delay, a specific date, a cron expression, or an interval. Durable Object alarms wake the agent for scheduled work.

For example, an assistant can receive a request, save a follow-up task, become idle, and later wake to perform that task. This is an illustrative use of documented features, not an experiment performed here.

Sources: [Agent internals and hibernation options](https://developers.cloudflare.com/agents/runtime/lifecycle/agent-class/), [scheduling](https://developers.cloudflare.com/agents/runtime/execution/schedule-tasks/).
