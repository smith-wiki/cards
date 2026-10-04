This corrects the earlier worker-side messaging proposal. The Operator wants automatic live rendering of incoming ACP events, without teaching workers about the chat setup.

The proposed responsibility split is:

- The ACP worker receives its task and emits ordinary protocol events.
- The host bridge retains the originating conversation, task ID, worker ID and message/tool IDs. It appends incoming text chunks to the worker's displayed message and updates tool cards or status messages as events arrive.
- Hermes receives worker events and results for orchestration decisions. Rendering routine updates must not require another Hermes model turn.

Chat credentials, destination IDs, message editing, batching and platform rate limits belong to the host bridge. The worker does not receive chat-delivery instructions.

This is a target architecture, not a claim that Hermes currently implements it.

Acceptance checks should use a plain ACP worker with no messaging tools or reporting prompt. Intermediate text must appear before completion; subsequent chunks must update the corresponding message; tool status changes must preserve identity; concurrent workers must remain distinguishable in the originating conversation.

For a future Cloudflare Durable worker, keep the same presentation boundary and map its runtime events into it. That is an architectural extension point; a ready adapter has not been verified.

MCACP already documents worker event retrieval, including asynchronous polling and consolidated message chunks. This provides an event source, but does not establish the requested chat renderer.

Source: [MCACP interaction patterns and event consolidation](https://github.com/Oortonaut/mcacp/blob/master/docs/configuration.md).
