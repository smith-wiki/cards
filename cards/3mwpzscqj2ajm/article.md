# Internal delegation and fleet isolation

Agents API supplies subagent creation, messaging, waiting, and interruption. Subagents have their own contexts and can work in parallel.

When a session has an environment, coordinator and subagents share its filesystem; spawning does not create another environment. Subagents inherit MCP tools, credentials, and allowed tools. Function tools are currently unsupported for subagents.

Architectural implication: use this for bounded specialists within one workload. A researcher and publisher with different permissions still require isolation and policy outside this delegation mechanism. Preserve [the fleet's permission boundary](card:3mwnyyt7y7cdk).

[Official multi-agent guide](https://developers.openai.com/api/docs/guides/agents-api/multi-agent).
