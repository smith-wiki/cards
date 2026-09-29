# Team topology before a framework

This is a proposed starting topology, not a requirement that every request use multiple agents.

A coordinator holds the user-facing task, decomposes it when useful, gives each specialist a bounded assignment and permitted tools, and collects artifacts. Known routing and acceptance checks can remain in code. OpenAI's Agents SDK distinguishes manager-as-tool, handoff, and code orchestration; choosing among them changes who controls the conversation, not where the worker is deployed. [OpenAI orchestration patterns](https://openai.github.io/openai-agents-python/multi_agent/).

Parallelism is useful for independent search or review. It is less useful when agents need the same mutable workspace or have tight dependencies. Anthropic reports about 15 times the tokens of a chat interaction in its own multi-agent research system and says many coding tasks have less available parallelism than broad research. This is one system's measured experience, not a universal multiplier. [Anthropic's multi-agent research account](https://www.anthropic.com/engineering/multi-agent-research-system).

Define an agent role as versioned instructions, tools, model, budget, access policy, and output contract. A runtime may be started for a task and released afterward while the identity, session, task history, and artifacts persist outside it. Anthropic describes separating its session log, harness loop, and sandbox after an earlier single-container design lost sessions on container failure. [Managed Agents architecture](https://www.anthropic.com/engineering/managed-agents).

The prior discussion already separated [event-to-execution control](card:3mwlzpcvo76kg) from a team-management product. This research adds delegation and artifact ownership without assuming a new messaging interface.
