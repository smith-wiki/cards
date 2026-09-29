# Options for a frontend you control

Reviewed 2026-09-29. This is a fit-based shortlist, not a benchmark.

[assistant-ui](https://github.com/assistant-ui/assistant-ui) is an MIT-licensed React/TypeScript library with composable chat primitives, streaming, attachments, and custom-backend adapters. Its managed cloud is optional. It is the more relevant candidate when building a distinct product rather than installing a complete application.

[LibreChat](https://github.com/LibreChat-AI/LibreChat) is an MIT-licensed, self-hosted chat application with multiple model providers, user authentication, conversation management, and MCP tools. Evaluate it when a ready platform matters more than owning every UI decision.

[Open WebUI](https://github.com/open-webui/open-webui) supports self-hosted chat with Ollama and OpenAI-compatible services. Its current repository documents multiple licenses, including branding-preservation conditions. Do not assume unrestricted MIT-style rebranding.

My proposed custom architecture is a developer-owned React application, assistant-ui for chat behavior, selected Apps SDK UI components or design tokens for appearance, and a separate authenticated backend for models, tools, and persistent data. This combination is not an official OpenAI recipe or a verified drop-in integration.

A useful prototype should test long streamed answers, cancellation, retries, scroll stability, code and math rendering, uploads, tool approvals, and per-user history isolation. No such prototype was run here.
