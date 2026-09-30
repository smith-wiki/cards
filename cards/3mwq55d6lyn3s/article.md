# Calling Agents API from ChatGPT Work

Work supports plugins with MCP tools. An MCP server can run application code on infrastructure its developer operates. Combining those capabilities with Agents API gives a supported route for a custom integration.

Proposed tools, not existing OpenAI tool names:

- `start_research`: create an API session for a public experiment and return a job handle.
- `get_research`: return the status, findings and available outputs.
- `cancel_research`: request cancellation of its active turn.

The backend holds the API key and records job-to-session ownership. Work receives results and uses the existing Smith Wiki tools to discuss and publish them. The API session does not automatically inherit this conversation or its plugin credentials.

API model, tool and hosted-container usage is billed to the API project separately from Work subscription usage. Native import of arbitrary API sessions into Work is not established by these sources.

[Work plugins](https://learn.chatgpt.com/docs/plugins) | [MCP tools](https://developers.openai.com/plugins/build/mcp-server) | [API pricing](https://developers.openai.com/api/docs/guides/agents-api/overview) | [Work pricing](https://learn.chatgpt.com/docs/pricing).
