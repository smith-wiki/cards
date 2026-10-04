OMA, Open Managed Agents, is the closest broader platform found for combining cloud sessions and local ACP workers.

It can be self-hosted on Cloudflare or Node.js. Session event logs are stored in SQLite-backed Durable Objects on Cloudflare.

Its documented MCP server at `POST /v1/mcp` exposes `list_agents`, `create_agent`, `create_session`, `send_message` and `get_events`. Sending is asynchronous; the caller polls events. Hermes could use this control surface while OMA runs the workers.

OMA's `acp-proxy` harness delegates a session's agent loop to a local ACP process via `oma bridge daemon`. The examples cover Claude Code, Codex and Grok Build. OMP registration and compatibility were not verified.

The boundary is important: OMA controls its own agent/session platform. The reviewed documentation does not establish a plug-in connector to any existing application built with Cloudflare's Agents SDK. Adopting OMA is a platform choice, rather than adding a Cloudflare backend to MCACP.

Sources: [OMA repository](https://github.com/duyet/oma), [Platform overview](https://docs.oma.duyet.net/), [MCP control and local ACP runtime](https://github.com/duyet/oma/blob/main/AGENTS.md).
