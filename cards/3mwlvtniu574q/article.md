# Sentry is a separate infrastructure decision

NVIDIA's [September 28 announcement](https://developer.nvidia.com/blog/nvidia-open-agent-safety-platform-a-reference-for-continuous-in-silicon-agent-monitoring) places OpenShell on the workload side of a layered architecture and Sentry on BlueField-4, using DOCA. In the described Vera Rubin POD topology, the DPU lies on the node's only route to the model and can enforce policy from a trust domain separate from the host.

The [official press release](https://nvidianews.nvidia.com/news/open-agent-safety-platform) calls Sentry a reference system design and claims independent monitoring, identity and access enforcement, and millisecond quarantine. These are NVIDIA's claims, not performance or detection results reproduced here. The [platform FAQ](https://www.nvidia.com/en-us/solutions/ai/agent-safety/) explicitly says OpenShell does not require BlueField-4.

The practical distinction is software isolation around an agent versus a further enforcement point outside the host itself. 'In-silicon' should not be read as automatic understanding of every thought or every business consequence.

This review found usable OpenShell installation and support documentation, but did not establish an equivalent standalone Sentry installation path or validate a specific hardware/software combination. That is an unresolved onboarding question, not proof that Sentry is unavailable.

Before depending on Sentry, verify the required BlueField/DOCA versions, deployable artifacts, supported traffic inspection, telemetry access, quarantine behavior, and evaluation results for behavioral detection.

Engineering inference: blocking future model calls is not the same as undoing actions already taken or necessarily stopping tool code already in flight. The practical security design must define the whole intervention, not just interruption of inference.
