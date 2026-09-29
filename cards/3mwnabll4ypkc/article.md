# ConnectX and BlueField occupy different hardware roles

ConnectX connects a server to the network and accelerates data movement. Its networking hardware can offload work from the host; describing it as merely a passive network port would be misleading. NVIDIA's SuperNIC portfolio emphasizes communication between GPUs across servers.

Sources: [Ethernet portfolio](https://www.nvidia.com/en-us/networking/products/ethernet/), [SuperNIC portfolio](https://www.nvidia.com/en-us/networking/products/ethernet/supernic/).

BlueField combines networking with a programmable compute subsystem. NVIDIA's BlueField software documentation describes Arm processors running Linux alongside ConnectX networking. A useful approximation is a small infrastructure computer associated with the network interface, rather than simply a faster NIC. The hardware and software details depend on the generation.

Source: [BlueField software overview](https://networking-docs.nvidia.com/bsp/4.16.0/bluefield-software-overview).

Its purpose is to run or accelerate networking, storage and security services separately from application workloads. It is not the model that performs an agent's reasoning, nor a ready-made controller that maps chat events to agent sessions.

Source: [BlueField platform](https://www.nvidia.com/en-us/networking/products/data-processing-unit/).

This is a documentation-based explanation, not a hardware test.
