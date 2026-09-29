# Dify supplies both the public chat and the agent backend

Checked September 29, 2026. Documentation review, not a deployment or security test.

Dify's [self-hosted web-app settings](https://docs.dify.ai/en/self-host/use-dify/publish/webapp/web-app-settings) explicitly state that published web apps are public by default. The visitor does not need an account in the operator's console.

The [self-hosted tools guide](https://docs.dify.ai/en/self-host/use-dify/workspace/tools) documents importing tools from an external MCP server and using them in agents or Chatflows. Its built-in connection accepts HTTP transport, not a directly launched stdio-only server. This is MCP client functionality, distinct from publishing a Dify app as an MCP server.

The [chat web-app guide](https://docs.dify.ai/en/self-host/use-dify/publish/webapp/chatflow-webapp) describes the generated conversational interface and conversation management. The [embed guide](https://docs.dify.ai/en/self-host/use-dify/publish/webapp/embedding-in-websites) provides standalone, iframe, and widget distribution using the same published application.

I would evaluate a Chatflow with an Agent node, one model, and a deliberately restricted set of MCP tools. Publish it using the built-in web interface before considering a custom frontend or backend. Model and tool credentials belong to the platform configuration, not the browser.

This avoids writing the agent loop and a guest-facing application from scratch. It does not prove that desired per-guest quotas, a strict aggregate budget, or every MCP authentication flow works in a selected release. Test the actual MCP server, two independent visitors, cancellation, and resource limits before opening access. Dify's additional license conditions also need review.
