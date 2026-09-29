# A two-stage entry path is better than starting in k3s

Reviewed September 29, 2026.

OpenShell supports several compute drivers behind the same CLI workflow: Docker for local and single-machine use, rootless Podman, MicroVM for a VM isolation boundary, and Kubernetes for shared clusters and remote compute. This means learning its core concepts does not require Kubernetes.

Source: [Sandbox Runtimes](https://docs.nvidia.com/openshell/latest/how-it-works/sandboxes/runtimes).

The current installation path is deliberately short: the installer installs the CLI and local gateway, after which a sandbox can be created locally. The quickstart also documents launching supported agents and importing provider profiles.

Sources: [Installation](https://docs.nvidia.com/openshell/latest/about/installation), [Quickstart](https://docs.nvidia.com/openshell/get-started/quickstart).

For the Operator, I propose two stages. First, use Docker, Podman, or MicroVM on a disposable or development machine to learn sandbox lifecycle, provider credential injection, network and filesystem policies, denial behavior, and audit output. Second, package one real agent workload and move it to the existing k3s cluster to test shared operation, persistence, network-policy enforcement, and event-driven lifecycle integration.

A correction to the earlier k3s recommendation is important. NVIDIA's current Kubernetes setup documentation explicitly labels the Helm chart experimental, says it is under active development, and says not to use it in production. Therefore a k3s deployment is useful as an integration experiment, but it should not currently be presented as the safest production starting point.

Source: [Kubernetes Setup](https://docs.nvidia.com/openshell/latest/kubernetes/setup).

BlueField, DOCA, Sentry, and Dell AI Factory are not required for this first evaluation. They address additional infrastructure or hardware-isolated security concerns. OpenShell is the directly installable entry point into the platform concepts.

No OpenShell installation was performed in this research; this is a documentation-based deployment recommendation.
