# Revised recommendation: do not retain LibreChat by default

Reviewed September 29, 2026. This is an architectural recommendation, not a deployed system or a claim that LibreChat lacks useful backend features.

The Operator wants a public chat without visitor sign-in and is willing to implement the backend. Under those requirements, I would remove LibreChat from the default design. My [earlier gateway proposal](https://cards.smith.wiki/3mwnda35ei7u4/) preserved LibreChat's builder and agent execution backend; neither is an architectural requirement of a public chat. I gave that preservation too much weight before establishing whether the Operator wanted those features.

## What retaining LibreChat would actually buy

The [official Agents documentation](https://www.librechat.ai/docs/features/agents) describes a graphical builder for instructions and model configuration, saved configuration history, tool and MCP selection, and file-search capabilities. The [Agents API documentation](https://www.librechat.ai/docs/features/agents_api) describes invoking configured agents from external applications. These are real reuse opportunities, rather than a reason to describe LibreChat as merely another HTTP proxy.

Retaining it can make sense when those ready integrations and an operator-facing builder save more work than the additional deployment and API integration cost. That is a conditional benefit, not something the Operator has said they need.

## Proposed direction

Use a public frontend connected to an application-owned backend, which runs or calls the chosen agent implementation. No separate LibreChat deployment is required in this proposal. Guest access and agent execution can be separate modules within the same application; the diagram does not imply separate services.

The existing frontend candidate remains relevant: [assistant-ui documents custom-backend adapters](https://www.assistant-ui.com/docs/runtimes/custom/overview), including LocalRuntime for an application-defined request function. This supports evaluating a reusable UI without adopting LibreChat as the agent platform. It does not establish that history, files, tool approvals, and every other feature are automatically integrated.

The choice is therefore not 'LibreChat or write every dependency from scratch.' It is whether to reuse a complete platform or compose the narrower UI and runtime capabilities the public chat actually needs. No implementation or integration tests were performed.
