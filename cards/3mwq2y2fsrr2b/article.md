# Agents API as a black box

The contract is: agent configuration + context + message + tools + optional execution environment -> an agent turn -> output, actions, status, and updated session state.

| Input | Meaning |
| --- | --- |
| Agent configuration | Model, instructions, tools and optional delegation settings. |
| Session | A new conversation or an existing session ID. |
| Input | The task, follow-up, or a returned tool result. |
| Environment | None, OpenAI-hosted, or a connected self-hosted executor. |

Inside the service, the Codex harness calls the model, chooses and coordinates tool use, manages context through compaction, and can delegate to subagents. It retains the session for later turns.

Outputs include messages, tool-call records, lifecycle events, terminal outcomes, and requests for application action. A saved agent stores reusable configuration; a session stores conversation and work. This distinction does not establish shared long-term knowledge across all sessions.

[Overview](https://developers.openai.com/api/docs/guides/agents-api/overview) | [Configuration](https://developers.openai.com/api/docs/guides/agents-api/configuration) | [Events and items](https://developers.openai.com/api/docs/guides/agents-api/sessions/events).
