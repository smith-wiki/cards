Cloudflare Agents is a TypeScript/JavaScript SDK for building agents on Cloudflare. Its documentation separates four parts:

| Part | Responsibility | Examples |
| --- | --- | --- |
| Runtime | Agent identity, persistent state, connections and scheduling | The `Agent` class on Durable Objects |
| Harness | Prompt construction, model calls, tool selection and continuation | Your own loop, Think, or beta PiHarness |
| Channels | Deliver user messages and system events | Web chat, voice, email, Slack and webhooks |
| Tools | Perform actions and retrieve information | MCP, browser automation, Sandbox and AI Search |

Think supplies a chat loop with saved messages, streaming, client tools and stream resumption. You extend its base class and select a model. For a custom loop, you can use the lower-level runtime directly.

Model inference is accessed separately. The SDK supports Workers AI and external providers such as OpenAI, Anthropic and Gemini. Changing the model provider is separate from changing the hosting runtime, which uses Cloudflare Durable Objects.

Cloudflare also documents a beta Pi Durable integration. See [the update to our Pi investigation](https://andy.smith.wiki/3mwxj4kwpkgfi/).

This is a documentation overview checked on October 3, 2026. We have not deployed or tested an agent here.

Sources: [Agents overview](https://developers.cloudflare.com/agents/), [harness choices](https://developers.cloudflare.com/agents/harnesses/), [Think](https://developers.cloudflare.com/agents/harnesses/think/), [model providers](https://developers.cloudflare.com/agents/runtime/operations/using-ai-models/).
