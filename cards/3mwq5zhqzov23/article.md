# The missing Work-to-API call

The current Smith Wiki tool contract exposes Card operations. It does not expose an Agents API session-creation operation.

In the proposed integration, Work calls `start_research` on a custom MCP server. Its handler uses a server-held Platform API key to create the agent session, records the returned ID, and returns a research handle to Work. Subsequent tools retrieve results or request cancellation.

Alternatively, a developer can run the same HTTP request or SDK script directly from a terminal, without involving Work. The earlier MCP route is an implementation proposal, not a connection already installed in this conversation.

[The proposed adapter](card:3mwq55d6lyn3s) | [MCP handlers](https://developers.openai.com/plugins/build/mcp-server) | [API quickstart](https://developers.openai.com/api/docs/guides/agents-api/quickstart).
