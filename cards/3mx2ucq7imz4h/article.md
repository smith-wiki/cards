MCACP is a ready-made candidate for Hermes controlling external ACP workers. Its README documents process lifecycle, parallel sessions, asynchronous prompting, event polling, cancellation, stored sessions and reload.

The `operator` permission policy returns requests to the calling agent, which answers through `grant_permission`. This matches Hermes deciding routine requests and escalating only what it cannot decide. The escalation rule remains Hermes' instruction, not something this permission mode guarantees.

MCACP's configuration accepts a fixed executable and arguments per agent. OMP documents `omp acp`. Combining those interfaces gives this candidate registration:

```json
{
  "defaultPermissionPolicy": "operator",
  "agent_servers": {
    "omp": {
      "command": "omp",
      "args": ["acp"],
      "permissionPolicy": "operator"
    }
  }
}
```

This is an inferred configuration, not a tested Hermes/OMP integration. Resuming an actual conversation depends on the worker's ACP session-loading support. MCACP stores sessions on disk; that is different from Cloudflare Durable Object execution.

Give Hermes only the necessary agent-control tools and keep worker registration outside its writable scope. Exclude installation and configuration-management tools when the intended authority is only delegation.

The smaller [theorionic/mcp-acp-bridge](https://github.com/theorionic/mcp-acp-bridge) also documents concurrent connections, polling and manual approvals. Its README does not document restart persistence or a configurable OMP registration.

The similarly named [i-am-bee/acp-mcp](https://github.com/i-am-bee/acp-mcp) implements Agent Communication Protocol, a different ACP from OMP's Agent Client Protocol.

Sources: [MCACP](https://github.com/Oortonaut/mcacp), [Configuration](https://github.com/Oortonaut/mcacp/blob/master/docs/configuration.md), [OMP CLI](https://github.com/can1357/oh-my-pi/blob/main/docs/cli-reference.md), [Agent Communication Protocol adapter](https://agentcommunicationprotocol.dev/integrations/mcp-adapter).
