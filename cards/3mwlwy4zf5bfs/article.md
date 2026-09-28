# AX, Substrate, and OpenShell address different parts of an agent fleet

Research snapshot: September 29, 2026. This comparison is based on current documentation, not a deployment test.

## Google's two layers

AX has Task, Workspace, and Model resources. A Task describes an image, command, resources, environment, and workspace bindings. A Workspace materializes repositories, MCP tools, and skills; a Model centralizes provider configuration. AX explicitly leaves planning, delegation, and task-tree composition to the agent or application.

Source: [AX core concepts](https://github.com/google/ax/blob/main/docs/concepts.md).

Agent Substrate supplies the lower execution layer. It separates persistent Actors from a reusable pool of Workers. Suspension saves active memory and local files; a later request restores the Actor onto an available Worker. This targets the cost of large populations of mostly idle, stateful agents.

Source: [GKE Agent Substrate architecture](https://docs.cloud.google.com/kubernetes-engine/ai-ml/about-agent-substrate).

## OpenShell's emphasis

OpenShell manages many sandboxes and their individual policies, providers, and supervisors. Its emphasis is enforcing permitted filesystem, process, and service access outside the agent workload. The agent implementation and application-level task coordination remain separate.

Source: [NVIDIA's runtime walkthrough](https://developer.nvidia.com/blog/add-runtime-controls-to-ai-agents-with-nvidia-openshell).

OpenShell also has stop/start, but the documented contract retains workspace data and configuration and launches a fresh command instance. That is not the same contract as Substrate's active-memory snapshot and resume.

Source: [OpenShell sandbox lifecycle](https://docs.nvidia.com/openshell/latest/how-it-works/sandboxes/overview).

## Interpretation for the Operator

For governing an existing fleet's access, OpenShell is a directly relevant runtime candidate. For very many persistent agents that spend most of their time idle, Substrate's execution model deserves separate evaluation. Neither supplies the entire business-level decision process for assigning, validating, and retrying the fleet's work. This is an architectural assessment, not a tested performance comparison.
