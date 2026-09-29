# Existing agent description formats: broader landscape

The earlier answer named too few formats. This is a landscape of **native, documented formats**, not an exhaustive claim about every project. "A YAML file" is a serialization choice; the crucial questions are which runtime interprets it and which authority enforces its access rules.

| Family | Existing formats | What they describe |
| --- | --- | --- |
| Coding agent profiles | OpenCode V2 `.opencode/agents/*.md`, Claude Code `.claude/agents/*.md`, GitHub Copilot `.github/agents/*.agent.md`, Gemini CLI `.gemini/agents/*.md`, OpenHands `.agents/agents/*.md`, Codex `.codex/agents/*.toml` | A role, instructions, model and selected tools or permissions; some formats define only subagents. |
| Recipe and framework config | Goose Recipe YAML, Google ADK `root_agent.yaml`, Microsoft Agent Framework declarative YAML/JSON, CrewAI agent configs, Continue `config.yaml` | A runtime-specific agent or a launch recipe, often with separate code or configuration. |
| Kubernetes API resources | kagent `Agent` and `SandboxAgent`, ARK `Agent`, Orloj `Agent`, Orka `Agent`, Sympozium `Agent` | A reconciled resource for an agent on a cluster, with different model, tool and policy semantics. |
| Portable spec | Oracle Open Agent Specification (JSON/YAML) | A framework-neutral agent or workflow description interpreted by an adapter. |
| Chat-first gateway | OpenClaw JSON5 agent entries; experimental Claws package with `CLAW.md` and `profiles/openclaw.yml`; ZeroClaw TOML | Agent identity, routing, tool limits and chat integration, with runtime-specific host configuration. |
| App/workflow export | Dify DSL YAML, AutoGen JSON, Haystack YAML, Langflow/Flowise/n8n JSON | An application graph, pipeline, serialized component, or state; these should not be treated as equivalent to a per-agent security profile. |

There are also **non-candidates for the agent language**: A2A Agent Cards advertise an agent; MCP specifies tool interaction; Agent Skills and AGENTS.md supply instructions; Kubernetes RBAC, NetworkPolicy and sandbox policies enforce access at different layers. None alone defines and launches the whole agent.

## Comparison against the current requirements

The desired unit is a versioned file per agent with role and access description; the controller runs on k3s; the communication layer owns conversation, while GitHub Issues is optional. No additional task board is wanted. A native schema may express tool permissions but cannot alone guarantee filesystem, network or credential isolation. Check both the **runtime permission interpretation** and the **Pod/sandbox authority**. Check whether the candidate requires its own durable task owner, whether it can be invoked from an arbitrary chat adapter, and whether local development uses the same manifest.

The next comparison should start with OpenCode V2, Claude Code, Goose Recipe, kagent, ARK, Orloj, Oracle Agent Spec, and OpenClaw/Claws. This is a comparison set, not a stack decision. There is no need to design a new language at this stage.

## Primary references

- [OpenCode V2 agents](https://opencode.ai/v2/docs/agents), [permissions](https://opencode.ai/v2/docs/permissions)
- [Claude Code subagents](https://code.claude.com/docs/en/sub-agents)
- [Goose Recipes](https://block.github.io/goose/docs/guides/recipes/)
- [kagent](https://kagent.dev/docs/)
- [ARK Agent](https://mckinsey.github.io/agents-at-scale-ark/reference/resources/agent/)
- [Orloj Agent](https://docs.orloj.dev/reference/resources/agent)
- [Oracle Open Agent Specification](https://github.com/oracle/agent-spec)
- [OpenClaw Claws](https://docs.openclaw.ai/cli/claws), [Buzz channel](https://docs.openclaw.ai/channels/buzz)
- [Google ADK Agent Config](https://adk.dev/agents/config/)
- [Microsoft Agent Framework declarative agents](https://learn.microsoft.com/en-us/agent-framework/agents/declarative)
