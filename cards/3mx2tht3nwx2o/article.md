This is an architecture proposal for the clarified requirement, not a shipped Hermes OMP/Cloudflare integration.

Hermes' MCP guide recommends MCP for external systems behind an RPC interface, or a narrow native tool when that is simpler. Its MCP configuration can register only selected server tools through `mcp_servers.<name>.tools.include`.

Expose an agent-control surface: discover available workers, submit a task, retrieve status and results, send a follow-up to the same worker session, and cancel a task. These are proposed capabilities, not names of existing Hermes tools. Remove Hermes' own shell, file editing, browser and general code-execution tools; retain only the necessary control and internal planning tools.

The OMP adapter acts as an ACP client to `omp acp`. It owns process supervision, session identity, updates and the applicable permission policy. OMP supports ACP over stdio; simply making Hermes an ACP server would put it on the wrong side of this connection.

The Cloudflare adapter calls exposed agent methods. Cloudflare documents external WebSocket RPC through `@callable()`; a Workers-side adapter can instead use Durable Object RPC. The adapter should preserve the target agent's identity and task references.

Results or blockers must return to the appropriate Hermes conversation so it can continue deciding. Specify the escalation policy in Hermes' instructions: resolve what it can through reasoning and further delegation, and ask the operator only when it cannot decide. Kanban can track task lifecycle if integrated, but external worker lanes still require implementation.

Sources: [Hermes MCP guide](https://hermes-agent.nousresearch.com/docs/guides/use-mcp-with-hermes), [MCP tool filtering](https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp#per-server-filtering), [OMP ACP mode](https://github.com/can1357/oh-my-pi/blob/main/docs/cli-reference.md), [Cloudflare callable methods](https://developers.cloudflare.com/agents/runtime/lifecycle/callable-methods/), [External Kanban lanes](https://hermes-agent.nousresearch.com/docs/user-guide/features/kanban-worker-lanes#adding-an-external-cli-worker-lane).
