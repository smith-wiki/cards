# CopilotKit: application libraries built around agent interaction

CopilotKit is an open-source framework for adding an AI assistant to an application you build. Its frontend libraries provide chat and interaction primitives; its server runtime connects the application to an agent backend. The available frontend surfaces include React, Vue, Angular and React Native. [Introduction](https://docs.copilotkit.ai/)

For example, an expense application could let a user ask about a report, inspect the agent's progress, review structured suggestions and approve a change. CopilotKit supplies the integration primitives; the developer supplies the expense data, business behavior and interface choices.

## The pieces

- **Frontend SDKs:** chat components, hooks, tool and state rendering, and human interaction.
- **Runtime:** a request handler hosted in your application server, connecting to an agent framework through AG-UI.
- **Agent integration:** use a compatible existing backend, write a bridge for a custom backend, or use CopilotKit's built-in agent.

AG-UI is the open interaction protocol. CopilotKit is one framework built on it, and an AG-UI client can be implemented independently. [AG-UI architecture](https://docs.ag-ui.com/spec/1.0/architecture), [CopilotKit architecture](https://docs.copilotkit.ai/intelligence/intelligence-platform)

## Open-source core and Intelligence

The core SDKs and runtime are MIT-licensed and can run in your own infrastructure without a CopilotKit service. Application-owned persistence remains possible.

CopilotKit Intelligence is a separate product offering saved conversation streams, cross-device continuity, memories, learning and analytics. It has managed and self-hosted deployment options and separate terms. Those services are optional additions, not requirements for using AG-UI or the open-source application libraries. [Open source versus Intelligence](https://docs.copilotkit.ai/teams/mastra/concepts/oss-vs-enterprise)

For the proposed custom fleet, my recommendation is to evaluate the frontend libraries independently of the fleet runtime: a controller can expose an AG-UI bridge while retaining its existing execution and session responsibilities. This is a proposed architecture, not a verified integration.
