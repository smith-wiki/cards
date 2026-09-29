# Runtime boundary for the existing cluster

Proposed interface under the controller: `start(specRevision, input, sourceRef)`, `send(session, message)` when supported, `status(run)`, `cancel(run)`, and `artifacts(run)`. A Kubernetes Job is a simple per-run backend; longer interactive sessions may call for a persistent sandbox. Local debugging may use microsandbox to run the same OCI image with a translated sandbox configuration. Its own `sandbox.yaml` describes the sandbox rather than the team's role and access contract. Sources: https://microsandbox.dev/platform/local ; https://github.com/superradcompany/microsandbox

Microsandbox does not have a documented first-party k3s backend in the checked material. Treat local microVM execution and k3s workloads as two adapters of a proposed architecture, not as demonstrated policy parity. Test network egress, filesystem mounts, secret injection and cancellation on both. The microsandbox local page says public Internet is reachable by default unless narrowed; local tests should configure the intended allowlist: https://microsandbox.dev/platform/local

OpenShell is a candidate for stronger production enforcement and a Kubernetes backend, but its Kubernetes setup requires Kubernetes 1.29+, the Agent Sandbox controller/CRDs, and a CNI that actually enforces ingress and egress NetworkPolicy. K3s includes a network policy controller unless disabled; installed versions and enforcement should be checked on the user's cluster before selection. Sources: https://docs.nvidia.com/openshell/latest/kubernetes/setup ; https://docs.k3s.io/networking/networking-services

This is a compatibility hypothesis, not a claim that a local microsandbox run is identical to an OpenShell/k3s run.
