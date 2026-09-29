# An enforced permission is not a correctness guarantee

The current policy-prover documentation explicitly says that a passing containment check does not establish task safety or prove that the running sandbox enforces the policy. Protocol coverage is limited; MCP and GraphQL are outside the boundary check.

Source: [policy prover](https://docs.nvidia.com/openshell/latest/how-it-works/policies/prover).

Native MCP rules can permit a tool name but do not match its arguments. A permitted publishing operation therefore needs server-side rules or additional inspection to constrain its destination and content.

Source: [network rules, MCP](https://docs.nvidia.com/openshell/latest/how-it-works/policies/network-rules).

Illustrative implication: an agent can produce an incorrect research claim while staying inside every technical permission. Runtime enforcement limits authority; checking evidence and approving consequential content solve a different problem.

These are the same boundaries recorded in the [MCP finding](card:3mwlvsdaiqi2i) and [formal-verification finding](card:3mwlvsv3yc24n), applied to the current question about what the platform does and does not provide.
