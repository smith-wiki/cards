# OpenShell on bare-metal k3s: conditional compatibility

Reviewed September 29, 2026 against the documentation labeled OpenShell v0.1.2. No access to the Operator's cluster was used and no installation was performed.

NVIDIA documents a Kubernetes deployment through Helm, requiring Kubernetes 1.29 or newer, RBAC, Helm 3, and the Agent Sandbox controller and CRDs. OpenShell provisions a separate supervisor Pod and workload Pod, with network policy controlling the boundary. This supports evaluating k3s as a Kubernetes distribution; the reviewed support matrix does not separately certify the Operator's exact distribution, node OS, or configuration.

Source: [Kubernetes setup](https://docs.nvidia.com/openshell/latest/kubernetes/setup).

## The host kernel is a material gate

The current support matrix requires enabled Landlock ABI 3 or newer, introduced in Linux 6.2, plus specific seccomp user-notification and task-memory-access operations. A modern container image cannot supply missing host kernel facilities. The runtime probes the required operations before admitting the workload. Merely reaching a recent Kubernetes version does not establish compatibility.

Source: [support matrix, Kernel Requirements](https://docs.nvidia.com/openshell/latest/about/support-matrix).

## NetworkPolicy must actually be enforced

OpenShell creates policy objects, but the cluster must enforce both ingress and egress restrictions. Otherwise workload traffic can bypass the supervisor. K3s includes an embedded network-policy controller based on kube-router unless disabled; Flannel in a k3s installation does not, by itself, establish that policy enforcement is missing. Inspect the installed networking configuration and test denial behavior rather than automatically replacing the CNI.

Source: [k3s networking services](https://docs.k3s.io/networking/networking-services).

## Proposed first use

Use a small, isolated agent workload with test credentials and an explicit permission profile. Keep its controller and credentials outside the untrusted workload. Establish permitted access, rejected direct egress, and actual stop/delete behavior before connecting business data. This is a proposed pilot, not a finding about the current cluster.
