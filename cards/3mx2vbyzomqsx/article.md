The Operator wants messages from external workers to appear during work in the same chat used to talk to Hermes.

## Ready delivery mechanisms

Hermes documents two existing routes:

- `hermes send --to <target> "message text"` sends a message using configured platform credentials without an agent loop or LLM. Targets can include a platform, chat and thread. This is the simplest candidate for a local OMP worker that can run commands and has access to the configured Hermes installation.
- `hermes mcp serve` exposes `messages_send` to another MCP client. Its documented examples include Telegram and Discord targets. The MCP sending route requires a running gateway. Merely enabling a server in OMP's regular MCP configuration does not prove that the tools are available in an ACP session; session wiring must be checked.

Sources: [Hermes CLI, send](https://hermes-agent.nousresearch.com/docs/reference/cli-commands#hermes-send), [Hermes MCP server](https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp#running-hermes-as-an-mcp-server), [OMP ACP session implementation](https://github.com/can1357/oh-my-pi/blob/main/packages/coding-agent/src/modes/acp/acp-agent.ts).

## Proposed local setup, not tested

Hermes controls OMP through MCACP. The task includes the destination chat/thread, a task ID and a worker label. OMP explicitly reports its start, useful milestones, blockers and completion using the existing delivery command or an available MCP messaging tool. Results and permission decisions continue through the orchestration channel.

Illustrative command with a placeholder chat ID:

```bash
hermes send --to telegram:CHAT_ID "[OMP / task-17] Running the test suite."
```

Because delivery reuses configured bot credentials, the worker label belongs in the message text; this does not establish a separate platform identity for each worker. Hermes itself can remain limited to agent-control tools.

## Limits that affect the choice

MCACP exposes asynchronous worker events, including message chunks and tool updates. That is an event source, not proof that Hermes automatically publishes those events into the user's chat. Explicit worker reporting also depends on the worker following its reporting instructions. A faithful automatic stream needs a verified event-to-chat delivery path.

Source: [MCACP interaction patterns and event consolidation](https://github.com/Oortonaut/mcacp/blob/master/docs/configuration.md).

The documented messaging routes do not establish support for injecting external-worker messages into the Hermes terminal or desktop conversation UI.

Hermes's embedded MCP server is currently stdio-only. A remote Cloudflare Durable Agent cannot use that local transport directly; an accessible transport or a separate delivery integration is still needed. A complete ready-made Hermes + ACP + Durable + same-chat streaming package has not been verified.

Sources: [Hermes MCP limits](https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp#current-limits), [Cloudflare MCP transports](https://developers.cloudflare.com/agents/model-context-protocol/protocol/transport/).
