# OpenShell on GKE: separate the Kubernetes API from the execution boundary

Reviewed September 29, 2026. This is an architectural recommendation, not a completed GKE installation.

OpenShell documents a Kubernetes deployment and relies on the Agent Sandbox controller. The controller's availability on Kubernetes does not establish that every managed-cloud node image can satisfy OpenShell's runtime requirements.

Sources: [OpenShell Kubernetes setup](https://docs.nvidia.com/openshell/latest/kubernetes/setup), [Agent Sandbox overview](https://agent-sandbox.sigs.k8s.io/docs/getting_started/overview/).

## Proposed first configuration

Use GKE Standard with a dedicated node pool for the experiment. Select an available Linux image and verify Landlock ABI 3+, the required seccomp notification operations, and the required same-UID task-memory access. Standard permits choosing Ubuntu with containerd or Container-Optimized OS; an Ubuntu user-space label does not prove that all kernel facilities are available. Prefer a compatible supported image rather than replacing the GKE-managed kernel.

Sources: [OpenShell support matrix](https://docs.nvidia.com/openshell/latest/about/support-matrix), [GKE node images](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/node-images).

For networking, ordinary GKE Dataplane V2 configurations enforce Kubernetes NetworkPolicy. Clusters using the legacy dataplane need explicit network-policy configuration. Do not install another CNI over GKE merely to reproduce a bare-metal setup.

Source: [GKE Dataplane V2](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/dataplane-v2).

## What remains operated by us

Configure OpenShell authentication, permission profiles, provider credentials, persistent storage, logs, and job-to-runtime lifecycle mapping. GKE managing Kubernetes does not make OpenShell a managed NVIDIA service or supply the Operator's event-to-agent dispatcher.

Sources: [access control](https://docs.nvidia.com/openshell/latest/kubernetes/access-control), [Kubernetes setup](https://docs.nvidia.com/openshell/latest/kubernetes/setup).

The acceptance gate is a real workload passing runtime admission and access-denial tests on a pinned node image and OpenShell release. We have not established that gate for the Operator's GKE environment.
