# Protocols sit at different edges

**MCP:** a host or agent client discovers and invokes tools, resources, and prompts from servers. Its optional Tasks extension lets a long-running request return a durable task handle and be polled, but both ends must support it; cancellation is cooperative. It is not the internal team scheduler. [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture), [Tasks extension](https://modelcontextprotocol.io/extensions/tasks/overview).

**ACP (Agent Client Protocol):** a client can create or load a coding agent session, send a prompt, receive updates, and request cancellation. This is relevant to the Operator's existing [Buzz ACP harness](card:3mwlzulco24yc). Its session cancellation does not itself prove that a remote sandbox or process has been killed. [ACP overview](https://agentclientprotocol.com/protocol/overview).

**A2A:** an independent agent service exposes a task/message/artifact lifecycle, discovery, and status retrieval or streaming. It can be an adapter at a boundary if teams span independently owned services. Internal calls within one trusted controller need not adopt it immediately. [A2A specification](https://a2a-protocol.org/latest/specification/).

This mapping is a proposed interface choice for this architecture, not a decision to implement all three protocols.
