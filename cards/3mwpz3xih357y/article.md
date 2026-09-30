# Agents API: a managed runtime for applications

OpenAI runs the Codex agent loop, session state, orchestration, and context compaction. An application supplies tools and chooses an execution environment. The runtime supports steering, MCP connections, and subagents.

With self-hosted compute, `codex exec-server` executes commands in the application's environment. The session can survive stopping that environment. When new input needs an executor, an `environment_connection` action can trigger a webhook handler to start it.

Interpretation: this could reduce the runtime infrastructure an application must build. It still owns environment startup, file persistence, shutdown coordination, and recovery. Interrupted commands are not automatically restarted.

Current limits include US-only data residency and no Zero Data Retention, including with self-hosted compute. API model, tool, and hosted-container charges apply.

Sources: [Overview](https://developers.openai.com/api/docs/guides/agents-api/overview), [Self-hosted sandboxes](https://developers.openai.com/api/docs/guides/agents-api/environments/self-hosted), [Sandbox lifecycle](https://developers.openai.com/api/docs/guides/agents-api/environments/lifecycle).
