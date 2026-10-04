## External bridge: the MCP surface

The current `hermes mcp serve` interface includes:

| Interface | Purpose |
| --- | --- |
| `channels_list` | Discover chat targets |
| `conversations_list` / `conversation_get` | Inspect conversations and routing context |
| `messages_send(target, message)` | Send a new platform message |
| `events_poll` / `events_wait` | Read conversation events |

There is no exposed message-edit or stream-publish operation. The send engine can return a platform message ID, but that does not provide an update operation. Event-reading tools do not publish ACP updates into a chat.

[Official MCP documentation](https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp)
[Current MCP implementation](https://github.com/NousResearch/hermes-agent/blob/main/mcp_serve.py)
[Send engine](https://github.com/NousResearch/hermes-agent/blob/main/tools/send_message_tool.py)

[Issue #21859](https://github.com/NousResearch/hermes-agent/issues/21859) requests an edit action. [PR #25919](https://github.com/NousResearch/hermes-agent/pull/25919) remains open; its review identifies changes needed for the current messaging architecture. It is not a ready, merged capability.

Checked documentation and source; no live chat test was performed.
