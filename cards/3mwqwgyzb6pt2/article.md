# Plugins package workflows and connections

Reviewed on 2026-10-01, Asia/Bangkok.

OpenAI describes current ChatGPT and Codex plugins as installable packages. Their simplest forms are skills only, an MCP server only, or skills combined with an MCP server.

A skill contains a SKILL.md file and can include references, templates, assets, and helper scripts. It teaches the model when and how to complete a workflow. The MCP server supplies the tools, schemas, service connections, and controlled actions used by that workflow.

For example, a document workflow can use packaged instructions to process a file provided in the conversation. It needs an MCP connection only if it must retrieve information or act through an external service.

The comparison therefore has two questions:
- What does the plugin package add around a connection?
- Which MCP features does the relevant ChatGPT client actually implement?

A feature missing from a client is not automatically a limitation of plugin packaging. Equally, packaging an MCP server does not establish that the client supports every feature of the protocol.

This is the initial architectural distinction, not a completed MCP compatibility matrix. We still need to verify individual capabilities and their conditions.

Sources:
- [OpenAI: Plugin architecture](https://developers.openai.com/plugins/concepts/plugins)
- [OpenAI: Plugins in ChatGPT and Codex](https://learn.chatgpt.com/docs/plugins)
