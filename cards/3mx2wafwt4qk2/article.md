The worker should not know how to publish into the user's chat. The relevant feature is automatic host-side rendering of runtime events.

## Closest documented ready implementation

OpenClaw supports external ACP harnesses and documents:

- `sessions_spawn` with `runtime: "acp"` and `streamTo: "parent"`: initial-run progress summaries go back to the requester session.
- `acp.stream.deliveryMode: "live"`: incremental delivery instead of waiting for completion.
- Visibility controls for status tags and parent progress. The sessions documentation says Discord parent progress needs explicit `streaming.mode: "progress"`.

This is host-side behavior; it does not require a worker to call a chat tool. However, the documented parent relay is progress summaries, not a guarantee that every raw ACP event becomes an independently rendered chat item.

Sources: [OpenClaw ACP session parameters](https://docs.openclaw.ai/tools/acp-agents/sessions#sessions_spawn-parameters), [OpenClaw ACP runtime configuration](https://docs.openclaw.ai/gateway/config-runtime#acp).

This is evidence for a ready implementation in OpenClaw, not a verified Hermes integration or a recommendation to replace the orchestrator without further evaluation. Neither Hermes + OMP compatibility nor Cloudflare Durable worker support has been established here.

## What the Hermes candidates actually establish

MCACP exposes intermediate worker events through asynchronous polling and batches message chunks. Its documentation does not establish automatic rendering into a Hermes conversation.

Source: [MCACP configuration and interaction patterns](https://github.com/Oortonaut/mcacp/blob/master/docs/configuration.md).

A narrower project, `tommulkins/cursor-hermes-bridge`, says it converts ACP message chunks into MCP `notifications/progress` and claims Hermes displays partial output. It targets Cursor, auto-approves permissions, and lists concurrent sessions as unfinished. It is not a verified generic OMP orchestrator.

Source: [cursor-hermes-bridge README](https://github.com/tommulkins/cursor-hermes-bridge#streaming-progress).

An open Hermes PR reports that ordinary MCP calls do not request SDK progress notifications. Its proposed callback only refreshes the idle deadline; the author explicitly separates progress payload handling from that fix. This means a server emitting MCP progress is insufficient evidence that the payload reaches the user's chat. The Cursor bridge's display claim needs a version-specific end-to-end check.

Source: [Hermes MCP progress timeout PR #94727](https://github.com/NousResearch/hermes-agent/pull/94727).

The remaining Hermes gap is a verified runtime-to-conversation renderer. Worker-side `hermes send` and model-mediated polling/forwarding do not satisfy the clarified requirement.
