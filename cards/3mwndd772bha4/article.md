# A ready public-chat alternative: Flowise

Reviewed September 29, 2026. Documentation review only; no deployment or isolation test was performed.

[Flowise's flow-level access documentation](https://docs.flowiseai.com/configuration/authorization/chatflow-level) says a constructed chatflow or agentflow is public by default: anyone with its flow ID can invoke it through the embed or API. Assigning a flow API key restricts that access.

The [official embed guide](https://docs.flowiseai.com/using-flowise/embed) provides a website chat widget, appearance configuration, and instructions for modifying its source.

For the Operator's requirement, this is a concrete alternative when a ready public bot matters more than retaining LibreChat. The qualification matters: the documented route operates a Flowise flow. It is not a guest-access option for LibreChat, and neither source establishes a ready-made bridge to an existing LibreChat Agent.

Public-by-default describes reachability, not a production safety guarantee. I would keep administrative access protected, use only a deliberately public agent and corpus, bound requests and spending, and verify separate sessions and tool state. Do not copy a fixed illustrative session ID from a configuration example into a multi-visitor deployment.

My preference remains a separate public frontend and gateway when preserving LibreChat's agent setup is the priority. Flowise is the alternative to evaluate when avoiding custom frontend work matters more.
