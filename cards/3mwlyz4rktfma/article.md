# LangSmith Fleet is an alternative when the agent builder should be included

Research snapshot: September 29, 2026. Documentation review only; no agent was deployed.

LangSmith Fleet, formerly Agent Builder, can create agents from a description or template and connect their accounts. Its documented capabilities include scheduled or event-triggered work, persistent memory files, skills, subagents, and per-tool approval settings.

Sources: [Fleet overview](https://docs.langchain.com/langsmith/fleet), [Fleet essentials](https://docs.langchain.com/langsmith/fleet/essentials).

This makes it relevant when the Operator wants to create and equip agents in one product, rather than mainly coordinate existing command-line programs and remote runtimes. The distinction is an assessment of the documented native workflows, not a claim that external integrations are impossible.

Fleet exposes agent invocation through the LangGraph SDK and REST API. It also documents exporting an agent as a Python project. Exported tools can still depend on LangSmith's registry or OAuth broker; exporting code should not be confused with removing every external service dependency.

Source: [Use Fleet agents in code](https://github.com/langchain-ai/docs/blob/main/src/langsmith/fleet/code.mdx).

The overview explicitly labels Fleet self-hosting beta. A managed Fleet agent is not automatically executing inside the Operator's OpenShell environment. An exported or self-hosted deployment would need its own compatibility and security-boundary evaluation.

I would compare Fleet with Paperclip on the same small research task before choosing between a product-managed agent environment and a heterogeneous bring-your-own-runtime fleet.
