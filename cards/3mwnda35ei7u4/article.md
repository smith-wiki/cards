# A public chat frontend without replacing the LibreChat agent

Reviewed September 29, 2026. This is an architecture proposal, not a deployed integration.

## Documented foundation

The [LibreChat Agents API](https://www.librechat.ai/docs/features/agents_api) exposes agents through streaming Chat Completions and Open Responses endpoints. The Chat Completions request identifies the saved agent through its `model` field. The API is explicitly beta.

## Proposed separation

Keep the authenticated LibreChat application private for configuring and testing the agent. Give visitors a separate public chat page that talks only to an application-owned gateway. The gateway calls LibreChat using credentials held on the server.

Proposed request path:

`Visitor -> public chat page -> guest-session gateway -> LibreChat Agents API -> model and approved tools`

The visitor does not need a LibreChat account or a login screen. The gateway, however, needs a secure way to distinguish guests and associate each request with the correct conversation. This is application work, not a hidden LibreChat guest-mode switch.

For the page, [assistant-ui's custom runtime](https://www.assistant-ui.com/docs/runtimes/custom/overview) is a candidate: it provides React chat components and adapters for an application-owned backend. The adapter would translate the gateway's stream into UI messages. This does not establish drop-in compatibility with every LibreChat feature.

## Tradeoff

This approach retains LibreChat's agent configuration and execution backend without maintaining a fork of its login flow. It does not retain LibreChat's complete frontend. A basic text-chat integration should not be assumed to reproduce native file handling, tool approvals, citations, persistent threads, or resumable streams.

I would pin the LibreChat version and first test two concurrent guest sessions, a multi-turn conversation, one actual agent-tool call, stream cancellation, and denial of requests that attempt to address another guest's conversation. None of these tests has been performed in this exchange.
