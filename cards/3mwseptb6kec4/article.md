# Adapting a custom agent and application to AG-UI

The following is an implementation proposal, not a tested integration with the Operator's agents.

## Agent boundary

Expose an endpoint that accepts `RunAgentInput` and returns protocol events. The default transport is an HTTP POST followed by an SSE response. The request identifies a conversation with `threadId`, a turn with `runId`, and carries the visible message history; application state, context, frontend tools and interrupt responses are additional inputs. A 1.0 implementation also declares its protocol version. [Run input](https://docs.ag-ui.com/spec/1.0/basic/run-input), [HTTP + SSE](https://docs.ag-ui.com/spec/1.0/basic/transports/http-sse)

A gateway translates the input into the existing harness's invocation and translates its structured output back:

| Native information | AG-UI representation |
| --- | --- |
| Turn starts | `RUN_STARTED` |
| Assistant response | Text-message start, content and end events |
| Tool activity and result | Tool-call events and result |
| Shared application data | State snapshot or delta |
| Successful completion | `RUN_FINISHED` |
| Failure after the stream opens | `RUN_ERROR` |

Use the existing framework integration where one fits, or implement this bridge around the harness's native API, ACP connection or structured CLI output. A protocol proxy can be the producer; AG-UI does not require every underlying agent process to implement HTTP. [Specification roles](https://docs.ag-ui.com/spec/1.0), [server example](https://docs.ag-ui.com/quickstart/server)

If only final text is available, the gateway can emit that as a text message when it arrives. Rich progress, tool attribution and shared-state updates require corresponding information from the harness.

## Interaction hooks

Define the application's shared-state structure and decide how it enters agent context. Emit snapshots or patches when the agent changes that state. A generic adapter cannot infer domain data reliably from arbitrary prose. [Shared state](https://docs.ag-ui.com/concepts/state)

For approvals, the runtime needs a pause point before the relevant action. The bridge exposes the interrupt; the next request carries the user's response, which the runtime handles before continuing. Emitting an approval prompt after an action has already executed would not implement this workflow. [Interrupt lifecycle](https://docs.ag-ui.com/concepts/interrupts)

## Application boundary

Use an AG-UI client such as `HttpAgent` from `@ag-ui/client`, subscribing to events and connecting them to the application's displays. CopilotKit is an optional framework providing frontend primitives and a runtime around this interaction. [HttpAgent](https://docs.ag-ui.com/sdk/js/client/http-agent), [CopilotKit introduction](https://docs.copilotkit.ai/)

Start with conversational text and completion, then add the state and approval flows the application actually needs. The agent's existing MCP tool connections can continue operating behind the bridge.
