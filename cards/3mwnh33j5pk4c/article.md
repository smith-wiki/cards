# Reuse the agent engine, retain the public-service policy

Documentation checked September 29, 2026. No integration was run.

## Documented building blocks

The [OpenAI Agents SDK runner](https://openai.github.io/openai-agents-python/running_agents/) provides an execution loop that calls a model, executes requested tools, adds their results, and continues until final output or a configured turn limit. It also exposes streamed events. This is a reusable engine, not a public website's session or quota system.

[assistant-ui's AI SDK integration overview](https://www.assistant-ui.com/docs/runtimes/ai-sdk/overview) documents a frontend adapter, and its [integration guide](https://www.assistant-ui.com/docs/runtimes/ai-sdk/v7) shows a backend route, streaming, and bounded multi-step tool use. This is a concrete TypeScript integration candidate. For a different backend, its [custom-runtime interfaces](https://www.assistant-ui.com/docs/runtimes/custom/overview) allow an application-defined request or state adapter.

Choose one compatible engine for the initial service rather than combining runtimes without a demonstrated need. My proposal is assistant-ui plus AI SDK for a TypeScript implementation; an existing Python application could use the OpenAI Agents SDK and a custom UI adapter instead. This is not a tested comparison of those alternatives.

## Do not copy an example's trust assumptions into a public endpoint

assistant-ui documents that its default transport can forward system messages and frontend tools. That is a capability for application developers, not evidence that arbitrary browser-provided configuration is safe for an anonymous service.

For this chat I propose accepting only the allowed visitor message and conversation/request identifiers. Select the model, system instructions, enabled tools, upstream endpoints, and credentials on the server. A UI adapter may still transmit additional fields, but the public route must ignore or reject anything outside its contract. Load canonical history from the application's store rather than accepting forged assistant messages or tool results as authoritative.

The public agent should initially use only narrowly scoped, server-approved read-only tools. Treat retrieved documents and tool responses as untrusted data. [OWASP's AI Agent Security guidance](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html) recommends least privilege, per-tool scoping, session isolation, and independent authorization checks. A prompt asking the model to be careful is not a substitute for those checks.
