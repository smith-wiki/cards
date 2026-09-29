# n8n can supply the public chat and agent backend

Documentation reviewed September 29, 2026; no deployment performed.

The [Chat Trigger documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/) explicitly describes public availability, a built-in Hosted Chat interface, and Authentication=None for access without sign-in. It connects to an agent or chain. Streaming is available with compatible nodes. Each visitor message starts a workflow execution.

The [MCP Client Tool](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolmcp/) connects an agent to an external MCP server, supports server credentials, and lets the operator select permitted tools. This is the required MCP-client direction, not merely publishing an n8n workflow as an MCP server.

Proposed minimal configuration: public Chat Trigger -> AI Agent, with a model, selected MCP tools, and session-scoped memory connected to the agent. Use Hosted Chat initially rather than developing another frontend. A persistent memory setup is needed when earlier messages must remain available; do not configure a fixed session key shared by every visitor.

This is a documented integration path, not an audited public service. Rate limits, concurrency, spending controls, guest isolation, and tool permissions still need deployment-specific validation. A ready runtime removes custom orchestration code; it does not establish that all abuse controls are enabled by default. Self-hosting edition and license conditions should be checked before adoption.
