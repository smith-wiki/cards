# What the hardware layer adds

NVIDIA describes Sentry as a watchdog using DOCA on BlueField-4, separate from the workload's host. In its Vera Rubin POD reference topology, the DPU lies on the node's only route to the model. The September 28 technical article says existing Vera systems with BlueField-4 can enable the protection through a software update; it does not provide a reproducible Sentry deployment procedure.

Source: [NVIDIA technical architecture](https://developer.nvidia.com/blog/nvidia-open-agent-safety-platform-a-reference-for-continuous-in-silicon-agent-monitoring).

The launch claims identity checks, attested telemetry, behavioral monitoring, and millisecond quarantine. These are vendor descriptions, not detection or latency results measured in this investigation.

Source: [NVIDIA launch announcement](https://nvidianews.nvidia.com/news/open-agent-safety-platform).

Engineering implication: blocking future inference cannot undo an external write and is not, by itself, proof that already-running tool code has terminated. A deployment must define its full intervention and observe completion.

This develops the [earlier hardware-layer finding](card:3mwlvtniu574q), rather than establishing a tested Sentry installation.
