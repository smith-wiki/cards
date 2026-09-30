# Process ownership and portable research

The Operator wants to own the agent process and retain enough data to change compute providers. Agents API exposes OpenAI's managed Codex harness; connecting a self-hosted executor does not transfer ownership of that harness.

For selected public research, managed execution may still be useful. A proposed application-owned research record would retain the question, inputs, experiment code, available outputs and evidence outside the API session. This helps preserve the research without establishing portable execution checkpoints or equivalent behavior across providers.

[Agents API architecture](https://developers.openai.com/api/docs/guides/agents-api/architecture).
