# Deployment requirements for the proposed fleet

OpenShell's Kubernetes driver requires the Agent Sandbox controller and a CNI that actually enforces ingress and egress NetworkPolicy. Merely accepting policy objects is insufficient. The gateway provisions separate supervisor and workload resources.

Source: [Kubernetes setup](https://docs.nvidia.com/openshell/latest/kubernetes/setup).

For a control plane that survives a gateway Pod failure, the documented configuration uses two or more gateway replicas with shared PostgreSQL. The default SQLite-backed single-replica setup is different. PostgreSQL availability, backups, and failover must be provided separately; sessions may need reconnection during failures.

Source: [high availability](https://docs.nvidia.com/openshell/latest/kubernetes/high-availability).

My proposed acceptance test starts with a few workers and test credentials. Verify both allowed work and blocked actions, provider-key isolation, effective policy after provider attachment, recovery after worker and gateway failures, and durable result handling. Measure useful task throughput and per-sandbox resource cost rather than inferring capacity from architecture diagrams.

This is a proposed test plan. No cluster, scale benchmark, or recovery test was run in this investigation.
