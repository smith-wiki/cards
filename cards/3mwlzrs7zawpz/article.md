# Lifecycle primitives already exist

AX's documented Task lifecycle includes creation, status observation, suspension, resumption, and deletion. Deleting a Task tears down its Substrate sandbox, and `ax delete` waits for completion. The CLI also exposes command execution through `ax ssh` for appropriately configured tasks.

Sources: [AX concepts](https://raw.githubusercontent.com/google/ax/main/docs/concepts.md), [AX README](https://raw.githubusercontent.com/google/ax/main/README.md).

OpenShell's Python SDK demonstrates create, wait_ready, exec, delete, and wait_deleted. Session objects retain sandbox and workspace identifiers for repeated operations.

Source: [OpenShell Python SDK](https://docs.nvidia.com/openshell/latest/sdk/python).

The architectural gap is therefore not implementing a new container launcher. It is an event adapter plus a trusted controller that selects the agent configuration, calls the runtime, records the resource identity, and routes later commands and cancellation to that same execution. This is an inference from the documented interfaces, not a verified turnkey connector for the Operator's communication tools.

A small controller can call the runtime directly. A general job runner becomes useful when durable admission, retries, concurrency, and operational visibility would otherwise have to be built. Neither choice requires replacing existing communication interfaces.
