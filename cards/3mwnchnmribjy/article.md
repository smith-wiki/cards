# An official application to fork

Reviewed 2026-09-29.

The [Responses Starter App](https://github.com/openai/openai-responses-starter-app) demonstrates multi-turn conversations, streamed Responses API output, tools, annotations, and MCP integration.

Its [manifest](https://github.com/openai/openai-responses-starter-app/blob/main/package.json) declares Next.js 15, React 18, TypeScript, Tailwind 3, Radix components, Zustand, react-markdown, and syntax-highlighting dependencies. These are declared dependency ranges, not a production deployment inventory or a recommendation to skip dependency updates.

The [license file](https://github.com/openai/openai-responses-starter-app/blob/main/LICENSE) gives application code MIT terms and separately includes the SIL Open Font License for bundled fonts.

Unlike embedding an externally hosted ChatKit renderer, this route supplies application source to modify and build. It still uses OpenAI's API in the example; owning the web application does not make inference local.

Before production use, audit dependencies and implement or verify user isolation, durable conversation storage, authorization, request limits, uploads, and secret handling. This review did not build or deploy the template.
