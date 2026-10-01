# Where I would put AG-UI in the proposed fleet

This is a proposal extending the earlier [controller and launcher design](card:3mwo4f4q4ma7r), not a decision to adopt CopilotKit or a verified integration.

The Operator's requirements are [replaceable bus and runtime drivers, with agents sleeping between calls](card:3mwnypzh3ufhm), plus multi-turn session continuity.

I would put an AG-UI endpoint on the existing controller or its application gateway:

1. Accept the application's AG-UI request.
2. Resolve the requested agent and map the UI thread to its saved native session.
3. Use the existing runtime driver to wake the workload and deliver the turn.
4. Translate native events into AG-UI for the application.
5. Preserve the session and agreed application state, record completion, and apply the existing sleep policy.

This does not require a resident AG-UI server inside every suspended workload. The producer may be a proxy or bridge. [Protocol roles](https://docs.ag-ui.com/spec/1.0)

## Session ownership

The gateway should reconcile the request's visible message history and state with the saved session, rather than blindly appending the whole history to the native session on every turn. Session mapping and reconciliation are application design work; `threadId` supplies conversation identity, not a storage implementation. [Run input](https://docs.ag-ui.com/spec/1.0/basic/run-input)

An approval interruption can end a turn and later resume on the same thread with the user's decision. The runtime may restore a checkpoint or rebuild context; the interaction contract does not require a continuously alive agent process. [Interrupts](https://docs.ag-ui.com/concepts/interrupts)

## Connection lifetime

The default HTTP + SSE binding does not resume a broken stream using `Last-Event-ID`. A durable event log and reconnection behavior must therefore be designed separately if required. [HTTP + SSE](https://docs.ag-ui.com/spec/1.0/basic/transports/http-sse)

Likewise, `HttpAgent.abortRun()` aborts the HTTP request. To make a Stop button stop the agent's work, the gateway must connect it to the harness or controller's actual cancellation mechanism. [HttpAgent](https://docs.ag-ui.com/sdk/js/client/http-agent)

The first experiment I would propose is one controller endpoint, one native session mapping and one text-chat client. Then add observable tool activity, followed by one domain-state update and one approval pause. This experiment has not been run.
