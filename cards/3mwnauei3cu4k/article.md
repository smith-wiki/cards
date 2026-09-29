# A release-specific boundary between DPF and Sentry

This qualifies the earlier general explanation of DPF's role and matters to the Operator's [small-business deployment question](card:3mwnalv7kwlgk).

On September 29, 2026, the current DPF documentation entry redirected to v26.4.1. It identifies dual-port BlueField-3 as supported hardware. Its platform matrix lists Kubernetes 1.33-1.36, Helm 3.5+, specific adapter models, BFB and firmware requirements, and validation on Ubuntu 24.04 with containerd.

Sources: [DPF v26.4.1 overview](https://networking-docs.nvidia.com/dpf/26.4.1), [platform support](https://networking-docs.nvidia.com/dpf/26.4.1/platform-support).

NVIDIA's agent-safety FAQ describes Sentry with BlueField-4. Therefore the fact that DPF is Kubernetes-native does not demonstrate that installing its current public release onto the Operator's k3s cluster provides the newly announced Sentry stack. This is a compatibility gap in the reviewed evidence, not proof that no partner or separately qualified deployment exists.

Source: [agent-safety platform FAQ](https://www.nvidia.com/en-us/solutions/ai/agent-safety/).

DPF can manage a separate cluster of DPUs. Installing its management controllers alone does not create the hardware or its independent trust domain.

Source: [DPF architecture overview](https://networking-docs.nvidia.com/doca/archive/3-5-0/doca-platform-framework-dpf).
