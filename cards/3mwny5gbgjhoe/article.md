# Routing messages from the communication layer

The minimum delivery record is **(platform, room, thread, message ID, target agent ID)**. The adapter or harness verifies the sender's right to invoke that agent, de-duplicates the incoming event, preserves the thread context, starts or locates execution, and returns the answer under the agent's communication identity. It records *delivery and correlation*, not a second canonical task board. The human work remains in the conversation and optionally its linked GitHub Issue.

## Buzz: existing native bridge

[Block's `buzz-acp`](https://github.com/block/buzz/blob/main/crates/buzz-acp/README.md) subscribes to the Buzz relay, handles mentions, prompts a local [ACP](https://agentclientprotocol.com/) subprocess, and lets that subprocess reply using Buzz CLI. It documents Goose, Codex via `codex-acp`, Claude Code via `claude-agent-acp`, and any ACP-compatible executable. Set its thread session policy when independent threads need independent context; the default is channel-level. Its owner-only trigger gate needs an explicit team policy.

A composition worth testing is an AX Task image containing `buzz-acp` and the selected ACP agent, with `buzz-acp` as the Task command. AX then supplies the isolated lifetime and workspace while the shipped Buzz harness handles messages. This is an **architectural inference**, not a packaged AX/Buzz integration. The current AX Task secret-reference gap prevents treating that arrangement as deployment-ready for a Buzz private key. Also, the ACP session's thread separation is a context rule, not a security boundary, and the harness permission mode needs explicit review.

## Chat-independent adapter

For Zulip, Discourse, Slack or another bus, a narrow service receives the platform's webhook or event stream, acknowledges it, identifies the target agent and canonical thread, creates or locates an AX Task through AX's gRPC API, sends the prompt to the **agent runtime's own endpoint**, and publishes the response through the platform API. [Agent Substrate's router](https://github.com/agent-substrate/substrate) can direct HTTP to an actor; AX's default runner has no chat endpoint, so the chosen runtime must supply one. A2A can be one existing interface for a suitable runtime, but AX does not automatically turn its Tasks into A2A agents.

- [Zulip outgoing webhook](https://zulip.com/api/outgoing-webhook-payload) and [send message](https://zulip.com/api/send-message) can preserve a topic.
- [Slack Events API](https://docs.slack.dev/apis/events-api/) and `thread_ts` support threaded replies.
- [Discourse webhooks](https://meta.discourse.org/t/configure-webhooks-that-trigger-on-discourse-events-to-integrate-with-external-services/49045) and post API preserve a topic.

For a long run, acknowledge the event promptly and publish asynchronously. Store incoming event IDs and result correlation to handle retries and avoid duplicate agent actions. If a chat platform lacks replay, that limitation should be visible in the communication-layer contract.

**Decision point:** Buzz plus `buzz-acp` minimizes chat integration code but ties the bridge to Buzz and ACP. A generic adapter preserves the communication black box but requires a small piece of integration software and an agent runtime with a reachable prompt API. Neither requires a second owner of the human tasks.
