# Provider credentials belong to the Chat UI server

Reviewed September 29, 2026. Documentation and public configuration review only. No running installation, browser network capture, or complete source-level credential-flow audit was performed.

The [configuration guide](https://huggingface.co/docs/chat-ui/configuration/overview) configures `OPENAI_API_KEY` alongside `OPENAI_BASE_URL` through the server environment or `.env.local`. The [architecture guide](https://huggingface.co/docs/chat-ui/developing/architecture) describes an application with both frontend and backend, including server-side model endpoints. This supports the intended path: browser -> Chat UI backend -> model provider. A visitor need not receive the provider key to use that path.

The [public environment template](https://github.com/huggingface/chat-ui/blob/main/.env) separates provider credentials from client-visible `PUBLIC_*` settings. [SvelteKit's server-only modules](https://svelte.dev/docs/kit/server-only-modules) prevent imports of private environment modules and server modules into browser code. Framework protections do not prove that an application's responses, errors, or configuration serialization never disclose a secret.

Therefore I would not characterize opening a public chat as automatically handing out the API key, but I also cannot certify a selected Chat UI release against disclosure based on these documents alone. The request handlers and configuration serialization could not be inspected in this review.

For a deployment check, use a separate test credential and inspect browser-delivered JavaScript, page data, network responses, errors, and exported settings. Separately examine server-to-MCP traffic on an endpoint you control. Check that provider credentials are neither returned to the browser nor sent to an unrelated MCP endpoint. This is a proposed test, not one performed here.

The [Docker guide](https://huggingface.co/docs/chat-ui/en/installation/docker) supports passing `.env.local` at runtime with `--env-file`. Keep secrets out of public repositories, browser settings, and distributed images. Use credentials dedicated to this application with only required permissions; see [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html).
