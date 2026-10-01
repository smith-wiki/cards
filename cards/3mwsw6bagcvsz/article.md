Checked on October 1, 2026. Ready-made Zulip integrations exist as Hermes gateway plugins; this answer is based on their documentation, not a deployment or runtime test performed here.

**ZulipMCP's Hermes plugin** is under `hermes_plugin/zulip` in the `zulip/zulipmcp` repository. It connects to Hermes' messaging gateway and keeps an independent persistent session for each channel/topic. A bot mention activates a topic; later messages do not need another mention. After a gateway restart, mention the bot once to reactivate the topic and resume its saved session. Each incoming message starts a fresh Hermes turn. The adapter handles incoming messages and ordinary replies; MCP supplies additional Zulip tools.

Its setup uses a generic Zulip bot, a `.zuliprc` credentials file, installation into Hermes' Python environment, and the `zulip-platform` plugin. Follow the plugin README for the exact configuration.

**The community plugin `niyazmft/zulip-hermes-integration`** is another ready-made adapter. Its README documents channel and direct-message conversations, mentions, file handling, and administrative commands. Per-topic conversation sessions are opt-in with `ZULIP_TOPIC_SESSIONS=true`.

Sources:
- [ZulipMCP repository](https://github.com/zulip/zulipmcp)
- [ZulipMCP Hermes gateway plugin](https://github.com/zulip/zulipmcp/blob/main/hermes_plugin/zulip/README.md)
- [Community Hermes-Zulip plugin](https://github.com/niyazmft/zulip-hermes-integration)
