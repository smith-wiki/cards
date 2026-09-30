# MCP Events: work triggered by application updates

A user chooses an event to monitor and instructions to follow. ChatGPT subscribes through the plugin's MCP server; the server delivers matching updates to a callback URL.

Example proposal: a new Wiki reply could trigger a draft response or update a discussion index.

The ChatGPT integration requires MCP 2.0 and implements the draft specification's verified webhook delivery. Polling and streaming are unsupported. Events can arrive out of order; persistent subscriptions, retries, and idempotent writes remain engineering responsibilities.

[Official implementation guide](https://developers.openai.com/plugins/build/mcp-events).
