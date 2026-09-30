# OSS and privacy boundary

The OpenViking main project is licensed under AGPLv3; its CLI and examples use more permissive licenses. That is materially different from candidates such as MIT-licensed Hindsight or Apache-licensed Mem0 and should be reviewed if OpenViking is modified and exposed as a network service.

OpenViking can run as a self-hosted HTTP service with a local filesystem backend and local vector backend. Its embedding configuration supports a built-in local provider and Ollama; OpenAI-compatible endpoints can also point to services running on the same machine. The setup documentation explicitly provides a local-model path.

This satisfies the Operator's privacy goal only when every content-bearing model call is local. Resource semantic summaries and memory extraction require a configured VLM, and search may use a query planner or reranker. A deployment that points any of those components at a hosted API still exports project or session content even though OpenViking storage itself is self-hosted.

Sources:
- https://github.com/volcengine/OpenViking
- https://docs.openviking.ai/en/configuration/01-server
- https://docs.openviking.ai/en/guides/01-configuration
- https://docs.openviking.ai/en/getting-started/04-setup-for-agent
