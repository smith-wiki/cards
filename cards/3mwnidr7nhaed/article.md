# Who writes and reads the memory?

A memory service can receive explicit facts, agent-selected notes, or raw interaction events for extraction. This is one design axis. Whether processing happens before the response or in a separate worker is another.

[LangGraph's memory overview](https://docs.langchain.com/oss/python/concepts/memory) discusses inline and background memory writing and their latency/freshness tradeoffs. [Google Memory Bank](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank) documents integration through tools and callbacks as well as asynchronous generation.

For a hypothetical application, the request path could load a small project profile, retrieve relevant episodes, give that evidence to the agent, execute the task, and retain selected messages and observed results afterward. The agent could also request additional memory during its work. This is an example integration, not a mandatory architecture or a performed test.

Storing records does not make a model automatically consult them. The application or agent runtime still has to put selected content into a model request or return it through a tool.

I would measure write acceptance, extraction completion, search visibility, and consolidation completion separately. A fast queue acknowledgement says little about when a different agent can use the new knowledge. For a just-issued correction, the current request may need the original message directly rather than waiting for derived memory.
