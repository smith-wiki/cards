# What the proof actually establishes

The [policy prover documentation](https://docs.nvidia.com/openshell/how-it-works/policies/prover) describes policy containment: does a candidate permit access beyond a supplied maximum policy? It is not a proof of correct task completion.

Current boundary-check coverage includes filesystem access, process identity, Landlock, TCP connections, and REST requests. Policies using MCP or GraphQL return `unsupported`. Timeouts and inconclusive results are not passes. An automatic proposal-risk check is a different check; passing it does not establish boundary containment.

This distinction matters when interpreting broad claims about verifying operator intent. We must first express an enforceable boundary, then check whether the model covers it. A policy that correctly permits publication cannot establish that the published research is true or appropriate.

The standalone prover can also check policies in CI, independently of a running agent. That makes policy regression checks a plausible use even before deploying a full agent fleet. See the [architecture documentation](https://docs.nvidia.com/openshell/latest/about/architecture).

No prover run was performed in this investigation.
