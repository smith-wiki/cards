# The trust boundary of a team

This is a design constraint for the proposed architecture; the specific sandbox remains to be chosen.

The trusted controller authenticates incoming commands, assigns task-specific capabilities, and requests isolated runtimes. Agents get a scoped tool identity and workspace. Their prompts and role names can describe intended behavior, but enforcement belongs to the runtime, credential broker, and tool server.

For a Kubernetes deployment, avoid granting an agent direct permission to create arbitrary Pods. Kubernetes states that workload creation in a namespace implicitly grants access to mountable Secrets, volumes, and ServiceAccounts in that namespace. [Kubernetes RBAC good practices](https://kubernetes.io/docs/concepts/security/rbac-good-practices/). Network restrictions also require an enforcing network plugin and an explicit policy; Pods otherwise permit outgoing traffic by default. [NetworkPolicy docs](https://kubernetes.io/docs/concepts/services-networking/network-policies/).

An MCP server must validate that the token presented to it was issued for that server; upstream API tokens are distinct. The protocol is an integration surface, not the fleet's authorization policy. [MCP authorization security considerations](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations).

A worker that only invokes constrained remote tools may need a different execution boundary from one that runs model-written shell commands. The latter makes sandbox choice central. GKE Agent Sandbox is [one documented runtime candidate](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/machine-learning/agent-sandbox); the earlier discussion also examined [OpenShell](card:3mwlx5xqkpopy). Neither has been selected or tested for this team.
