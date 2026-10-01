As of October 1, 2026, I found no Discourse adapter in Hermes' documented messaging platforms or platform registry. This does not establish that no community integration exists.

There are two plausible paths:

1. **Test Discourse AI against the Hermes API server.** Discourse AI allows a custom provider URL, and Hermes exposes OpenAI-compatible Chat Completions and Responses endpoints. Hermes' API runs an AIAgent with the server profile's memory, skills, and configured tools. This specific pairing has not been tested here. Request compatibility, Discourse's own prompts and tools, and conversation continuity need verification. API compatibility alone does not prove that successive messages resume the same saved Hermes session.

2. **Build a Discourse adapter for Hermes' Messaging Gateway.** Hermes has a common platform-adapter interface for receiving messages, invoking the agent, and sending replies. A proposed Discourse adapter would receive forum events and post responses through the Discourse API under a bot account. I would map each forum topic to a persistent Hermes conversation. This is a design proposal, not an implemented or tested connector.

Sources:
- [Hermes messaging platforms](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/)
- [Hermes platform registry](https://github.com/NousResearch/hermes-agent/blob/main/gateway/platform_registry.py)
- [Hermes API server and Open WebUI](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/open-webui)
- [Hermes gateway internals](https://hermes-agent.nousresearch.com/docs/developer-guide/gateway-internals)
- [Discourse AI model configuration](https://meta.discourse.org/t/discourse-ai-large-language-model-llm-settings-page/319903)
- [Discourse API](https://docs.discourse.org/)
