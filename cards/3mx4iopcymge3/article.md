Pi documents api.output() for streaming tool output and view/watch APIs for observing committed conversation state. ACP provides session/update notifications. Connecting those surfaces to a messaging chat is application work.

Proposed flow: receive ACP events, update a persisted job view, and render that view into the correct chat/thread. Keep routing and message identifiers in the bridge, not in the worker's prompt. Throttle edits and recover the current display from saved state after reconnect. Invoke the orchestration model for results or decisions, not for forwarding every output chunk.

This preserves the [Operator's requirement that the bridge own chat delivery](card:3mx2vz2qdse66). It does not establish an existing Pi-to-Hermes chat integration.

Sources: [Pi Durable observation and tool APIs](https://github.com/earendil-works/pi/blob/main/packages/durable/README.md), [ACP v1 updates](https://github.com/agentclientprotocol/agent-client-protocol/blob/main/docs/protocol/v1/overview.mdx).
