# MCP permission is not argument-level authorization

The current [policy schema](https://docs.nvidia.com/openshell/latest/how-it-works/policies/schema) matches MCP methods and tool names, not tool arguments. The documented network integration covers sandbox-to-server Streamable HTTP traffic. It should not be assumed to inspect every MCP transport. See the [network guide](https://docs.nvidia.com/openshell/latest/how-it-works/policies/network-rules).

For a hypothetical research-and-publishing agent, permitting `search_cards` and denying `create_card` is a useful coarse boundary. But once `create_card` is allowed, a tool-name rule does not determine whether a particular article is confidential, whether its content is accurate, or whether this publication was approved. Likewise, allowing a generic `send_message` tool does not by itself restrict recipients.

These are illustrative tool-design examples, not claims about a tested Smith Wiki integration. A remote server must still validate its inputs and enforce its own authorization. A narrow tool API, a separate publisher identity, or a server-side approval gate can supply a boundary that a generic tool cannot express. Middleware is another possible integration point where its supported traffic inspection is sufficient.

The [middleware documentation](https://docs.nvidia.com/openshell/latest/extensibility/supervisor-middleware) also lists blind spots: it does not inspect traffic using `tls: skip`, WebSocket binary messages, or server-to-client WebSocket messages. Some response bodies cannot be inspected. Consequently, adding a content checker is not equivalent to proving that all content passes through it.

There is a related REST caveat: `read-only` is an HTTP-method preset, not proof that the upstream service has no side effects. The [network guide](https://docs.nvidia.com/openshell/latest/how-it-works/policies/network-rules) makes this explicit. Correct application semantics still matter.

For evaluation, require actual denials rather than merely logged violations. The [schema reference](https://docs.nvidia.com/openshell/latest/how-it-works/policies/schema) defaults inspected endpoints to `enforcement: audit`; set `enforcement: enforce` where violations must be blocked. This is distinct from deny-by-default admission of network connections.
