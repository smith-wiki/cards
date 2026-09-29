# The AX Task secret boundary

The user's point is correct: moving a credential from literal `Task.spec.env` to a Secret reference would improve storage and transport, but it would **not** keep the credential from a process that receives it. An agent able to inspect its environment, mounted files, process memory or local tools can use a credential made available inside its sandbox. Snapshots can also retain data placed there.

The current [AX Task secret issue](https://github.com/google/ax/issues/348) reports that `Task.spec.env` only accepts literal name/value pairs and has no Kubernetes-style `valueFrom` field. Such values are returned by `ax get task`. AX's `Model.secretKey` path is a distinct platform model configuration; do not infer that it gives an arbitrary agent process a protected secret. [Runner docs](https://github.com/google/ax/blob/main/docs/runner.md) describe what values the container receives.

## Divide credentials by authority

| Credential | Holder | What the agent sees |
| --- | --- | --- |
| Chat bot private key/token | Always-available bus adapter | Inbound message and metadata; outbound reply is published by the adapter using the bot identity. |
| Upstream model provider key | Separate inference gateway | A constrained model endpoint; the agent does not receive the provider master key. |
| GitHub/MCP/service credentials | Tool broker or MCP server | Only approved tool operations and resources; the upstream key stays in the broker. |
| Per-run capability, if needed | Task process | A revocable, short-lived grant restricted to one agent/run, action set and target; the agent **can** read and use it within that scope. |

The AX [Gateway](https://github.com/google/ax) can constrain network destinations in some revisions, but an egress allowlist is not authorization for `merge_pull_request` versus `get_pull_request`. A [current AX discussion](https://github.com/google/ax/issues/357) identifies that per-Task, per-operation gap. The tool endpoint must enforce authorization using an authenticated principal and actual tool arguments; restrict direct egress to upstream APIs if the design relies on the proxy.

Authentication between an AX Task and a proxy is still an open integration point. [Agent Substrate](https://github.com/agent-substrate/substrate/blob/main/docs/api-guide.md) documents Actor identity primitives, while [AX's roadmap](https://github.com/google/ax/blob/main/docs/roadmap.md) places Task SPIFFE identity and finer setup/runtime policies in future work. Do not assume the two are wired together for an AX Task. A short-lived Task token can support a proof of concept, but it remains readable by the agent and by any principal able to read literal Task configuration. Bound its scope, lifetime and revocation accordingly.

The essential distinction is **secret delivery versus authority delegation**. The agent must be allowed to perform useful actions, but it need not possess the long-lived credential that grants unrestricted access to the external service.
