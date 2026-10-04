## Gateway integration: reuse the existing renderer

Hermes already has platform adapter methods for sending and editing messages. Editing requires the chat ID, platform message ID and replacement content. Support depends on the platform.

[Adapter developer guide](https://hermes-agent.nousresearch.com/docs/developer-guide/adding-platform-adapters)
[Existing edit interface and platform support](https://github.com/NousResearch/hermes-agent/issues/21859)

The internal [GatewayStreamConsumer](https://github.com/NousResearch/hermes-agent/blob/main/gateway/stream_consumer.py) accepts an adapter, chat ID and optional metadata/reply context:

| Method | Role |
| --- | --- |
| `on_delta(text)` | Queue incoming text fragments |
| `run()` | Drain the queue and progressively update the platform message |
| `finish(final_text)` | Complete the stream with authoritative final text |

It already handles buffering, update intervals and message length limits. Long output or segment boundaries can produce additional messages.

The proposed ACP integration is to feed worker text fragments into this consumer and finish it when the worker completes. Tool events still need their own mapping to visible status. This is an integration proposal, not a verified existing ACP plugin.

[The public plugin hook](https://hermes-agent.nousresearch.com/docs/developer-guide/plugins/) `ctx.register_platform_handler(platform, factory)` passes `(native, adapter)` to a plugin. This offers an in-process entry point; the internal renderer is not a remote bridge API.

The host must supply the originating chat/thread context and run rendering on the gateway event loop. Workers need only ACP. An external bridge still needs an exposed send/edit or stream endpoint; the standard MCP server does not provide one.

Checked source and documentation; no live integration test was performed.
