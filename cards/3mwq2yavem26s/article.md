# Where tool execution happens

Remote MCP tools can be called from OpenAI's service. Commands and local MCP tools run in the connected environment.

Custom functions have a callback boundary: you provide a schema; the agent requests a name and arguments; your application executes the operation and submits its result; the harness continues the turn. Attaching an environment does not install a function handler.

Example: an application-owned `publish_reply` handler can check authority, publish through its client, record the outcome, and return it.

[Functions](https://developers.openai.com/api/docs/guides/agents-api/tools/functions) | [Architecture](https://developers.openai.com/api/docs/guides/agents-api/architecture).
