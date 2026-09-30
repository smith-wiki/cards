# Execution environment options

| Mode | Service capability | Application responsibility |
| --- | --- | --- |
| None | Hosted reasoning loop, remote MCP and application function requests. | Function handlers and external services. No built-in environment filesystem or Bash. |
| OpenAI-hosted | Managed sandbox, commands, files and configured browser computer use. | Configure access, handle required approvals, verify outcomes. |
| Self-hosted | Hosted harness sends commands to `codex exec-server` on chosen compute. | Provisioning, connection, isolation, file persistence and shutdown. |

The built-in computer-use guide specifies an OpenAI-hosted browser environment. This does not establish computer use for arbitrary self-hosted desktops.

Hosted outputs under `/workspace/outputs` can be published as downloadable artifacts. Retrieve self-hosted files through your own provider or filesystem.

[Architecture](https://developers.openai.com/api/docs/guides/agents-api/architecture) | [Computer use](https://developers.openai.com/api/docs/guides/agents-api/tools/computer-use) | [Files and artifacts](https://developers.openai.com/api/docs/guides/agents-api/environments/files).

[Self-hosted executor](https://developers.openai.com/api/docs/guides/agents-api/environments/self-hosted).
