# Is AG-UI an open standard?

AG-UI is an open protocol with a published 1.0 specification, JSON Schema and public SDK implementations. The repository uses the MIT license. These make the interaction contract available to independent client and server implementers. [Specification](https://docs.ag-ui.com/spec/1.0), [repository license](https://github.com/ag-ui-protocol/ag-ui/blob/main/LICENSE)

AG-UI and CopilotKit have different roles: AG-UI defines the protocol; CopilotKit supplies application libraries and services built around it. The open-source CopilotKit SDKs and runtime can operate without a CopilotKit service, and an independent AG-UI client does not have to use CopilotKit. [Architecture](https://docs.ag-ui.com/spec/1.0/architecture), [open-source core](https://docs.copilotkit.ai/teams/mastra/concepts/oss-vs-enterprise)

## Who develops it?

The project's documentation traces its origin to CopilotKit's partnership with LangChain and CrewAI. CopilotKit announced the 1.0 specification, and reports that feedback from Anthropic, Pydantic AI and TanStack was incorporated after public discussion of the draft. [Project overview](https://docs.ag-ui.com/introduction), [1.0 announcement](https://www.copilotkit.ai/blog/ag-ui-1.0)

That establishes an open specification and public development process. Vendor integrations and contributions should be distinguished from shared governance of the standard: the existence of an integration does not establish that its vendor controls specification changes.

This review verifies published specifications, licensing and integration evidence; it does not establish ratification by an independent standards body or a particular governance committee.
