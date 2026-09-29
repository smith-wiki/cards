# Execution mechanisms are present; application decisions remain outside

OpenShell's gateway provisions a workload and a trusted supervisor, attaches policy and provider configuration, and manages connectivity. The sandbox runtime owns the process tree and supports command execution, signals and status.

Source: [OpenShell architecture](https://docs.nvidia.com/openshell/latest/about/architecture).

The lifecycle documentation includes stop/start with retained state and deletion that stops processes and releases resources. A deletion acknowledgment can precede actual cleanup completion.

Source: [sandbox lifecycle](https://docs.nvidia.com/openshell/latest/how-it-works/sandboxes/overview).

For the Operator's fleet, the remaining application layer maps an incoming event to the correct agent and session, decides whether to create or reuse execution, delivers the task, and handles retries and result storage. This is an architectural allocation of responsibilities, not a newly tested integration. Do not describe OpenShell as lacking process management merely because this event-routing layer is separate.

See the [earlier fleet architecture proposal](card:3mwlx5xqkpopy).
