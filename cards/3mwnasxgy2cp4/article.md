# Autopilot needs its own compatibility test

GKE Autopilot uses Container-Optimized OS with containerd and does not permit operators to modify node software. It also applies admission restrictions and a default seccomp profile. Those constraints matter to a runtime that depends on specific kernel operations.

Sources: [GKE node images](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/node-images), [Autopilot security measures](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-security).

Do not conclude that OpenShell is incompatible merely because Autopilot blocks privileged containers. OpenShell's current support matrix specifies required seccomp operations usable without added capabilities, alongside Landlock and task-memory-access probes. A valid verdict requires the actual rendered manifests and a sandbox startup test on the selected node image and runtime.

Source: [OpenShell support matrix](https://docs.nvidia.com/openshell/latest/about/support-matrix).

The reviewed sources do not establish a tested OpenShell-on-Autopilot configuration. I therefore propose GKE Standard for the first cloud experiment, where node-image selection and diagnosis are more controllable. This is not a claim that Autopilot cannot work.

Likewise, Agent Sandbox, GKE Sandbox, and OpenShell are distinct components. Do not assume that enabling gVisor in GKE automatically satisfies OpenShell's native-kernel requirements.
