# Kubernetes resources and portable specifications

## kagent: check the versioned API

kagent 0.x has an `Agent` CRD (`kagent.dev/v1alpha2`) and sandbox variants. **kagent 1.x changes this model:** an `AgentTemplate` declares model, prompt and tools; a `Harness` declares the runtime and infrastructure policy; an `AgentInstance` is a running conversation created from the pairing. The Harness can run kagent, Codex, Claude or a bring-your-own A2A image, backed by Agent Substrate. This is a ready-made Kubernetes language, but 1.x is not simply one self-contained YAML document per agent. Verify cluster version and Substrate prerequisites before assuming deployment on the existing k3s.
[kagent 1.x core concepts](https://kagent.dev/docs/kagent/1.x/about/core-concepts/) | [kagent 0.x API](https://kagent.dev/docs/kagent/0.x/resources/api-ref/)

## ARK

The ARK `Agent` custom resource (`ark.mckinsey.com/v1alpha1`) carries a prompt, model reference and typed tool references (including MCP, HTTP or other agents). The runtime executes through a `Query` resource. A Query is an invocation record, not necessarily the team's canonical task board; a chat adapter could call the agent and return results in the original thread. The tool reference is not by itself a guarantee about the target system's credentials and authorization.
[ARK Agent reference](https://mckinsey.github.io/agents-at-scale-ark/reference/resources/agent/)

## Orloj

The `orloj.dev/v1 Agent` has `prompt`, `model_ref`, available `tools`, `roles` and limits. Orloj also defines `AgentRole`, `ToolPermission` and `AgentPolicy` resources, with runtime governance. Be precise about `allowed_tools`: tools listed there are pre-authorized and **bypass the AgentRole/ToolPermission check**, although AgentPolicy restrictions still apply. A strict separation of who can declare an agent and who can grant tool use therefore needs a deliberate policy. It can be run with an operator or through the Orloj server, subject to version and deployment checks.
[Agent resource](https://docs.orloj.dev/reference/resources/agent) | [Governance](https://docs.orloj.dev/concepts/governance/)

## Other Kubernetes-native formats

[Orka Agent](https://orka-agents.github.io/orka/docs/getting-started) targets coding runtimes such as Codex and Claude through an Agent/Task model; assess its experimental maturity and whether Task is only execution state in the proposed integration. [Sympozium resources](https://deploy.sympozium.ai/docs/concepts/custom-resources/) include channels and policy, but role prompt may reside outside its Agent CRD. [Inference Gateway ADL](https://docs.inference-gateway.com/adl/) is a YAML language that generates an application and manifests; do not confuse its source file with the operator's separate CRD schema.

## Portable and framework formats

[Oracle Open Agent Specification](https://github.com/oracle/agent-spec) defines a framework-neutral JSON/YAML representation of agents and workflows, with adapters. It is closer to a portable description than a controller for k3s; infrastructure permissions remain the deployer's work. [Google ADK Agent Config](https://adk.dev/agents/config/) describes agents in YAML but its declarative mode is experimental. [Microsoft Agent Framework declarative agents](https://learn.microsoft.com/en-us/agent-framework/agents/declarative) are YAML/JSON loaded by its runtime. CrewAI, AutoGen and Haystack have native serialized configurations with differing code and workflow dependencies.

**Selection test:** compare the native schema and enforcement, local run path, chat invocation, k3s prerequisites, and whether execution resources merely record runs or try to own the human task lifecycle. The chat or optional GitHub Issue should remain authoritative for human work status.
