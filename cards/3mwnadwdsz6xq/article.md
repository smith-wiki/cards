# DOCA is software for building and operating infrastructure

DOCA includes drivers, libraries, tools, examples and a runtime. Developers can program supported networking, security and storage capabilities, while operators can deploy existing infrastructure services. The DOCA-Host package also supports host-side installation for BlueField and ConnectX; not all DOCA code runs on the DPU.

Source: [DOCA developer overview](https://developer.nvidia.com/networking/doca).

NVIDIA describes DOCA Platform Framework (DPF) as Kubernetes-native management for provisioning BlueField devices and managing networking, storage and security services. This is orchestration, but at the infrastructure layer. It does not establish the event-to-agent-session controller sought in [the fleet discussion](card:3mwlzo5z7ctus).

Source: [DOCA platform, Orchestration section](https://www.nvidia.com/en-us/networking/products/software/doca/).

An illustrative use is an infrastructure service installing traffic rules or enabling accelerated encryption. The hardware supplies the acceleration, DOCA supplies software interfaces and services, and the deployed service determines the actual policy. Installing DOCA alone does not define the Operator's agent permissions.

This explanation describes documented roles; no DOCA service was installed or tested.
