# A documented integration route is not the same as a verified security boundary

Paperclip's OpenClaw adapter connects to a Gateway over WebSocket, negotiates authentication and device identity, starts agent work, waits for completion, and streams events into its run logs. This is a runtime invocation interface, not direct provisioning of an OpenShell sandbox.

Source: [Paperclip OpenClaw Gateway adapter](https://docs.paperclip.ing/reference/adapters/openclaw-gateway/).

OpenClaw separately documents an OpenShell sandbox backend. It uses the OpenShell CLI for lifecycle management and SSH for execution and file operations. The OpenClaw Gateway stays outside the sandbox, and native plugins or Gateway RPC tools may run on the host. Therefore this route does not establish that every tool action is governed by OpenShell.

Source: [OpenClaw OpenShell backend](https://docs.openclaw.ai/gateway/openshell).

For a fleet that does not already use OpenClaw, I would instead evaluate a direct Paperclip adapter. Its execution and preflight interface could call the OpenShell SDK to create or reuse a sandbox, execute work, collect outputs, and clean up. Cancellation, session restoration, usage accounting, and credential scope would need explicit implementation and tests. This is a proposed adapter, not one found ready-made in the checked catalog.

Sources: [Paperclip adapter development](https://docs.paperclip.ing/reference/adapters/creating-an-adapter/), [OpenShell Python SDK](https://docs.nvidia.com/openshell/latest/sdk/python).

No end-to-end integration was run. Introducing OpenClaw solely as an additional bridge is not automatically simpler than implementing the direct adapter.
