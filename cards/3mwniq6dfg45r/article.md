# Review MCP credentials separately from the model key

Reviewed September 29, 2026. No credential-disclosure vulnerability has been confirmed in this review.

The [MCP configuration guide](https://huggingface.co/docs/chat-ui/configuration/mcp-tools) describes administrator-configured servers with optional authentication headers and user-added endpoints. An administrator's base list is therefore not evidence that users are restricted to that list. MCP authentication and authentication to the model provider are different connections; use separate credentials and do not assume that safe handling of one proves safe handling of the other.

For this fixed public bot, I would permit only operator-approved endpoints and tools, enforced by the backend rather than merely hiding controls in the browser. I have not verified a built-in setting that implements this exact policy in the selected release.

The [public environment template](https://github.com/huggingface/chat-ui/blob/main/.env) says `MCP_ALLOW_INSECURE_URLS=true` permits HTTP on localhost and private LAN addresses for local development and must not be enabled in production. This documents one guardrail, not comprehensive proof against server-side request forgery or credential forwarding mistakes.

[OWASP SSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html) supports allowlisting known destinations and applying network restrictions as well as application validation. For a first deployment, I would use narrowly scoped read-only MCP tools over explicitly public data and no generic tool that reads the application's environment or secret files.

Before public exposure, inspect which MCP configuration fields reach the browser and whether authentication headers remain bound to their intended destination. Do not put a secret into a browser-visible endpoint URL or assume every field read from an environment variable remains server-private. These are proposed checks, not observed failures.
