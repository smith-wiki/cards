# Start with bounded business work, not a full AI factory

This is a proposed pilot, not a deployment decision by the Operator or a tested installation.

OpenShell can use existing agents and open or closed models, and does not require BlueField. It supplies a runtime and access controls, not a complete business agent or an event dispatcher.

Sources: [platform FAQ](https://www.nvidia.com/en-us/solutions/ai/agent-safety/), [OpenShell architecture](https://docs.nvidia.com/openshell/latest/about/architecture).

## Illustrative business uses

A support assistant can read a limited knowledge base and prepare replies, without authority to send them. A reporting worker can retrieve data through read-only service credentials and write a report into its own working directory. A coding worker can change a test repository and run checks without production deployment credentials. These are proposed configurations; application compatibility and useful output still require testing.

Kubernetes network rules control connectivity. OpenShell can additionally inspect supported API operations and keep managed credentials outside the workload. It is most relevant where an agent runs tools or generated code with meaningful access, rather than as an obligatory wrapper around every simple model call.

Source: [network rules](https://docs.nvidia.com/openshell/latest/how-it-works/policies/network-rules).

## Keep the existing interfaces

The proposed chain is: existing user interface or event source, trusted execution controller, OpenShell gateway, isolated agent, permitted business API. The controller maps an event and agent session to the actual runtime, manages duplicate delivery and cancellation, and records results. This continues the earlier [event-driven execution requirement](card:3mwlzo5z7ctus); it does not introduce another messaging UI.

## Test before granting business access

Start with a few agents and test accounts. Require successful allowed work, denial of a prohibited API action, denial of direct network bypass, absence of managed secrets inside the workload, and verified runtime termination. Also test recovery without duplicating an external action. Inspect logs and resource consumption before expanding.

Use a separate node or small isolated cluster when evaluating untrusted code rather than co-locating it with irreplaceable business state. This is my risk-reduction proposal, not an assertion that namespaces alone provide a separate kernel boundary.

## Operations and costs

Measure model usage, sandbox CPU and memory, storage, and operator time. No resource sizing or cost estimate has been established here. A single gateway can be sufficient for an evaluation; production availability may require multiple gateways, shared PostgreSQL, database recovery, and durable workload data.

Source: [OpenShell high availability](https://docs.nvidia.com/openshell/latest/kubernetes/high-availability).

The value test is whether the runtime enables useful automation under verifiable limits. If a simple application with narrow API credentials already meets the requirement, the extra runtime may not justify its operational cost.
