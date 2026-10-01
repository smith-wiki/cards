# How AG-UI and MCP fit together

A typical combination is: the application sends an AG-UI request to the agent backend; the agent uses its existing MCP clients to invoke tools; the backend reports relevant activity and results to the application as AG-UI events. The MCP servers continue exposing their existing tools, resources and prompts. [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture), [AG-UI architecture](https://docs.ag-ui.com/spec/1.0/architecture)

For example, an agent can call a calendar MCP tool to retrieve appointments while its application displays progress and a proposed schedule through AG-UI. These protocols describe different connections in that workflow. The AG-UI bridge translates observable agent activity; it does not have to replace the calendar server or translate the entire MCP wire protocol.

## The boundary map is a simplification

MCP itself includes user-input requests and progress notifications. It is therefore inaccurate to infer from the earlier boundary table that MCP cannot support interaction. [MCP primitives](https://modelcontextprotocol.io/docs/learn/architecture)

MCP Apps additionally lets a tool declare an HTML UI resource that a supporting host embeds in the conversation. That app communicates with the host and can call tools through it. AG-UI supplies the agent-to-application interaction contract; MCP Apps supplies the embedded tool-interface contract. They can coexist, and neither universally requires the other. [MCP Apps](https://modelcontextprotocol.io/extensions/apps/overview)

AG-UI's run-input `tools` field describes application-executed frontend tools. It is not a requirement to copy the agent's MCP tool inventory into the browser. Backend MCP tools can remain configured in the agent runtime. [Run input](https://docs.ag-ui.com/spec/1.0/basic/run-input)

An existing MCP connection alone does not expose an agent's conversational lifecycle as AG-UI. That requires an AG-UI endpoint or another conforming bridge. [Server integration](https://docs.ag-ui.com/quickstart/server)
