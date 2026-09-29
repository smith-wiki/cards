# Scope the public-chat backend before estimating its size

This is an architectural assessment for the Operator's proposed public chat, not a measured implementation estimate or a commitment to particular features.

For a first version, I propose one configured agent, text messages, a hosted model API, optional narrowly scoped read-only tools, and conversations bound to expiring guest sessions. Exclude visitor file uploads, arbitrary code execution, cross-session personal memory, side-effecting tools, and durable background jobs until there is a reason to add them.

With that boundary, use one application containing HTTP routes and an agent-execution module, with shared storage for sessions, conversation state, runs, and quota accounting. These are logical modules, not a demand for microservices. A database already available to the deployment is a reasonable starting point. A separate cache, queue, or workflow engine is not part of this initial proposal.

A private demonstration can be mostly a model call and a streaming response. A first public release is a small application rather than a transparent API proxy: it also needs ownership checks, input limits, abuse controls, usage accounting, and explicit failure states. I would describe the latter as moderate backend complexity under the proposed scope, not as a complete chat platform.

The agent loop itself can be reused. The [OpenAI Agents SDK runner documentation](https://openai.github.io/openai-agents-python/running_agents/) describes model calls, tool execution, streamed events, and a maximum-turn limit. This supports delegating orchestration to an SDK; it does not establish a complete guest-facing service.

If an existing agent runtime already provides a suitable invocation and event interface, the application can call it instead of embedding another runner. The remaining public-access responsibilities still belong to the application.

No load target, latency target, or existing backend framework has been specified. Therefore, an exact delivery or capacity estimate would be premature. This assessment concerns the shape of the work, not tested throughput or deployment readiness.
