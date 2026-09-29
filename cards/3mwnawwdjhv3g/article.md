# Kubernetes portability stops at hardware ownership

DOCA's accelerated services target BlueField and ConnectX, and Sentry's announced independent enforcement domain uses BlueField-4. Running a controller in Kubernetes does not instantiate a DPU or grant control of a cloud provider's physical network hardware.

Sources: [DOCA platform](https://www.nvidia.com/en-us/networking/products/software/doca/), [agent-safety FAQ](https://www.nvidia.com/en-us/solutions/ai/agent-safety/).

GKE exposes managed node environments, with especially strict node-access limits in Autopilot. The reviewed GKE and NVIDIA documentation did not establish a standard customer-operated Sentry/BlueField path for those nodes. This is a documented-evidence limit, not a claim that no specialized cloud arrangement or remote management architecture could exist.

Source: [GKE node images and node-management limits](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/node-images).

For the current small-business proposal, use ordinary compute for OpenShell and treat hardware-isolated protection as a separate procurement and compatibility investigation. See the [DPF generation qualification](card:3mwnauei3cu4k).
