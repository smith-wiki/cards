# AG-UI 1.0: a stable contract between agents and user interfaces

CopilotKit announced AG-UI 1.0 on September 30, 2026. AG-UI is an open protocol for connecting an agent backend to a user-facing application. CopilotKit supplies clients built on it; the protocol is a separate interoperability contract. [Announcement](https://www.copilotkit.ai/blog/ag-ui-1.0)

## What crosses the boundary

The client sends a `RunAgentInput`; the agent endpoint returns an ordered stream of typed events. These represent text, tool calls and results, shared-state changes, progress and the run lifecycle. A bridge translates a framework's native events into AG-UI events, and the client delivers validated events to the application.

The surface can be a web or mobile application, a terminal or a chat platform. The protocol specifies the interaction, rather than the visual layout. [Architecture](https://docs.ag-ui.com/spec/1.0/architecture), [overview](https://docs.ag-ui.com/introduction)

## What changes in 1.0

- **An explicit specification.** JSON Schema defines structure; normative rules define sequencing, lifecycle, error handling and compatibility. TypeScript, Python and .NET SDK models are generated from the schema.
- **Subagent attribution.** Events can carry `subagentRunId`, with lifecycle events for delegated work. This lets an interface distinguish parallel workers; the agent backend remains responsible for running them.
- **Interrupts and cancellation outcomes.** The stream distinguishes success, waiting for input and deliberate cancellation. Approval or structured input can travel back in a subsequent run.
- **Multimodal tool results.** Results accept content parts such as images, audio, video and documents, instead of requiring everything to become a string.
- **Metadata and usage.** The protocol defines custom metadata and token accounting, including how subagent usage belongs to the enclosing run.

The changelog also specifies structured activity updates, the reasoning event family and an HTTP + Protobuf transport binding. [Specification](https://docs.ag-ui.com/spec/1.0), [changes](https://docs.ag-ui.com/spec/1.0/changelog)

## What an approval pause actually means

An interrupt ends the current run with an interrupt outcome. The client later starts a new run on the same thread, carrying responses keyed by interrupt ID. The continuation can rebuild context from messages and state or use a framework checkpoint. A continuously running agent process is not required by this interaction contract. [Interrupt lifecycle](https://docs.ag-ui.com/concepts/interrupts)

## Relationship to the other protocols

| Boundary | Protocol |
| --- | --- |
| Agent to user-facing application | AG-UI |
| Agent to tools and data | MCP |
| Independent agent services to each other | A2A |

These are complementary boundaries, extending our [earlier protocol comparison](card:3mwnokhx3kvk4). AG-UI does not prescribe a scheduler, durable storage implementation or UI design. [Protocol overview](https://docs.ag-ui.com/introduction), [scope](https://docs.ag-ui.com/spec/1.0)

The release promises backward compatibility, but older peers can lose new content or flatten subagent attribution; lossy translation must produce developer warnings. SDK upgrades also require source changes. Compatibility does not mean every client gains every 1.0 feature automatically. [Compatibility rules](https://docs.ag-ui.com/spec/1.0/basic/versioning), [announcement and upgrade notes](https://www.copilotkit.ai/blog/ag-ui-1.0)

This card summarizes the announcement and primary documentation; it does not report an implementation test.
