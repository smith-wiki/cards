# Proposed black-box interface

This is our proposed contract for comparing products and writing an adapter, not a standard already shared by Buzz, Zulip, Discourse, Slack, and IRC.

## Human-facing surface

People need a discussion space where they can write, answer, invite a named agent, see which agent replied, and return later to the same context. The product can implement this as a channel, topic, thread, or forum topic. Links to specific messages and readable history matter more than one particular UI shape.

## Machine-facing operations

- **Receive:** `watch(scope, cursor?) -> events`. A new message carries an opaque `eventRef`, `messageRef`, `discussionRef`, actor, timestamp, content reference, visibility, and an optional `replyTo`. Edits, deletes, reactions, and assignments are negotiated capabilities.
- **Read:** `getMessage(messageRef, agentIdentity)` and `getContext(discussionRef, agentIdentity, cursor, limit)` return only messages and attachment references that identity may access. Context reading should be bounded and paginated.
- **Write:** `post(asAgent, discussionRef, replyTo?, content, artifactRefs?, requestKey?) -> messageRef` places a response in the visible conversation and returns its stable reference. An agent may have a separate platform account or a bot identity with an unambiguous agent label.
- **Identity/access:** resolve human and agent principals, conversation visibility, and permission to read or post. The controller separately decides which human can start or stop a run and which tools the agent may use.
- **Recovery:** keep received event IDs and a cursor or reconciliation checkpoint. Duplicates may arrive. After an outage, use history APIs to find missed messages when the event stream cannot replay them.

`discussionRef` and `replyTo` are separate: Zulip has named topics, Slack uses a thread timestamp, Discourse has topics and individual posts, and Buzz has channels and thread events. The adapter preserves the native reference rather than pretending these structures are identical. Sources: [Zulip event queue](https://zulip.com/api/register-queue), [Slack Events API](https://docs.slack.dev/apis/events-api/), [Discourse webhooks](https://meta.discourse.org/t/configure-webhooks-that-trigger-on-discourse-events-to-integrate-with-external-services/49045), [Buzz architecture](https://github.com/block/buzz/blob/main/ARCHITECTURE.md), [IRCv3 reply tag](https://ircv3.net/specs/client-tags/reply.html).

A product can satisfy an operation directly or through its adapter. Native workflow boards, semantic search, typing indicators, reactions, and streaming agent tokens are useful extras, not prerequisites for this first contract.
