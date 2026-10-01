# What AG-UI is useful for

AG-UI is a shared communication contract between an agent backend and an application used by a person. It carries the agent's observable work as typed events: streamed text, tool activity, results, progress and state updates. CopilotKit supplies client SDKs built on that contract. [Overview](https://docs.ag-ui.com/introduction), [announcement](https://www.copilotkit.ai/blog/ag-ui-1.0)

The problem is integration work. Different agent frameworks expose different streams and lifecycle conventions. An AG-UI bridge translates those into one event vocabulary, so the application's common interaction layer can work with compatible backends. Framework-specific capabilities and application behavior still need integration. [Architecture](https://docs.ag-ui.com/spec/1.0/architecture)

## Example: a travel-planning application

This is an illustrative application design, not a tested integration.

1. The user asks the agent to plan a trip.
2. The agent emits progress and results while its tools search. The application can show the current task and available options.
3. The agent updates structured trip data, such as dates, itinerary items and estimated costs. The application renders that data as a form, table or calendar.
4. The user changes a date in the interface; the application includes the updated state in the next agent request.
5. Before booking, the agent can request approval. The interface collects the decision and returns it in a subsequent run.

The application developer chooses and implements these displays and actions. AG-UI supplies the exchange format. Shared state uses complete snapshots and incremental JSON Patch updates; interrupt responses link user decisions back to the waiting work. [Shared state](https://docs.ag-ui.com/concepts/state), [interrupts](https://docs.ag-ui.com/concepts/interrupts)

## Where it fits

| Connection | Protocol |
| --- | --- |
| Agent and user-facing application | AG-UI |
| Agent and external tools or data | MCP |
| Independent agent services | A2A |

These connections can coexist. [Protocol overview](https://docs.ag-ui.com/introduction)

My assessment: AG-UI is most useful when an agent participates in an interactive application with progress, editable data and approval flows, or when the same interaction layer must support several agent backends. A basic text chat can also use it, but adopting a standard becomes less valuable when there is little integration complexity to remove.

You retain the choice of agent runtime and application design. AG-UI specifies their boundary; execution and durable storage require an implementation. [Specification scope](https://docs.ag-ui.com/spec/1.0)
