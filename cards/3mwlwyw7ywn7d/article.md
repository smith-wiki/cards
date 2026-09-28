# A shared foundation is not a shared runtime API

OpenShell's Kubernetes setup requires the Kubernetes SIG Agent Sandbox controller. OpenShell creates a supervisor Pod and a Sandbox custom resource; the controller creates the workload Pod and persistent storage.

Source: [OpenShell Kubernetes setup](https://docs.nvidia.com/openshell/latest/kubernetes/setup).

Google describes Substrate as building on Agent Sandbox while bypassing the dedicated-Pod-per-agent bottleneck through reusable Workers.

Source: [Agent Substrate architecture](https://docs.cloud.google.com/kubernetes-engine/ai-ml/about-agent-substrate).

No ready-made AX-to-OpenShell integration was established in the reviewed documentation. Combining them is an integration proposal, not a deployment instruction. It would need explicit treatment of task lifecycle, isolation, policy enforcement, credentials, snapshots, and failure recovery.
