Pi Durable's public interface is a project-specific TypeScript library API: Harness.open(), conversation.submit(), viewState()/watch(), and harness.resume(). Its persisted tasks and documents belong to its own runtime. The README explicitly says the experimental API can change between releases.

There are separate interfaces around the broader Pi toolkit:

| Interface | Role |
| --- | --- |
| Pi coding-agent RPC | Pi-specific JSONL commands, responses and events over stdin/stdout |
| Experimental Pi service protocol | Pi-specific routed envelopes and Chord service payloads, with CBOR wire framing |
| ACP (Agent Client Protocol) | A shared JSON-RPC 2.0 protocol between a client and an agent |
| MCP (Model Context Protocol) | A standard for connecting an AI application to tools, data and external systems |

ACP includes session/new, session/prompt, session/update and optional session/load. Loading replays a previous conversation to the client. The specification describes this client-visible behavior; it does not establish Pi Durable's internal task state machines, atomic document commits or tool replay rules.

OMP offers ACP directly through omp acp. An architectural option for a client that should switch agent implementations is to use ACP at the boundary and keep any Pi Durable-specific controls behind an adapter. This is a proposed integration approach, not a verified ready-made Pi Durable ACP adapter. Protocol compatibility should not be treated as checkpoint or storage compatibility.

Sources: [Pi Durable API](https://github.com/earendil-works/pi/blob/main/packages/durable/README.md), [Pi RPC](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/rpc.md), [Pi service protocol](https://github.com/earendil-works/pi/blob/main/packages/protocol/README.md), [ACP overview](https://agentclientprotocol.com/protocol/v1/overview), [ACP session loading](https://agentclientprotocol.com/protocol/v1/session-setup), [MCP introduction](https://modelcontextprotocol.io/docs/getting-started/intro), [OMP integration](https://github.com/can1357/oh-my-pi).
