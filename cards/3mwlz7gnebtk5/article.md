# What creating and onboarding an agent means in Paperclip

Research snapshot: September 29, 2026. These are documented capabilities, not a completed onboarding test.

A person can create an agent in the interface, or a manager agent can propose a hire for approval. The persistent record contains its organizational role and reporting relationship. Instructions and instruction files describe its work; an adapter determines which program or remote service actually runs it. Work proceeds through scheduled or event-triggered heartbeats rather than requiring a permanently running process for every agent.

Source: [Agents guide](https://docs.paperclip.ing/guides/org/agents/).

The API separates direct creation from approval-aware hiring: `POST /api/companies/{companyId}/agents` and `POST /api/companies/{companyId}/agent-hires`. Configurable fields include the runtime adapter, secret references, heartbeat settings, monthly budget, and desired skills. Permission changes have a separate route. These are operational configuration and authorization records, not training a new model.

Source: [Agents API](https://docs.paperclip.ing/reference/api/agents/).

An adapter launches the runtime, supplies task and organization context, and reports output, session data, and usage. Preflight checks can test whether the program, endpoint, and authentication are usable. The published catalog includes several coding runtimes and generic integration mechanisms. Its OpenClaw, process, and HTTP backends work, but the manual adapter dropdown still labels these entries Coming soon; documented alternatives include API, import, and the OpenClaw invite flow.

Sources: [Adapter overview](https://docs.paperclip.ing/reference/adapters/overview/), [Creating an adapter](https://docs.paperclip.ing/reference/adapters/creating-an-adapter/).

For a pilot, I would add an acceptance task after registration: demonstrate one permitted operation and rejection of one forbidden operation, then show that the result reaches the task record. This is my proposed onboarding criterion, not an assertion that Paperclip automatically proves an agent's competence or security.
