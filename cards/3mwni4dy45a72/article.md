# Chainlit: a small coded chat application, not a no-code bot appliance

Reviewed September 29, 2026. Documentation review only; no deployment was performed.

[Chainlit authentication](https://docs.chainlit.io/authentication/overview) documents public access by default. [The Python quickstart](https://docs.chainlit.io/get-started/pure-python) supplies a chat UI and a message callback in an application file, launched with `chainlit run app.py`. This is a materially narrower application shape than adopting an agent-builder platform.

The [MCP guide](https://docs.chainlit.io/advanced-features/mcp) supports SSE, Streamable HTTP, and stdio, but requires application handlers and integration with the model/tool loop. Its built-in connection interface accepts connection details from the visitor. That is different from the desired experience of an operator-configured public assistant. I propose configuring approved MCP endpoints in server-side application code or the chosen runtime, rather than exposing that connection interface to anonymous visitors. In particular, do not expose user-selected subprocess commands.

[User sessions](https://docs.chainlit.io/concepts/user-session) provide per-chat in-memory state. For a small initial deployment, I would keep only the active conversation and avoid adding a persistence service until needed. This is a proposed scope, not an Operator commitment.

Important limitation: [the built-in chat-history feature](https://docs.chainlit.io/data-persistence/history) requires authentication as well as persistence. Public conversation access does not automatically provide anonymous cross-session history.

Chainlit saves frontend and chat-server work, not all application code. Fixed MCP wiring, model execution, and public-use limits remain integration responsibilities. No memory, throughput, or isolation benchmark has been run.
