# OpenShell: the immediately testable part of the platform

Research snapshot: September 29, 2026, Australia/Adelaide. This is a documentation review, not a completed deployment or security test. The September 28 walkthrough describes OpenShell 0.1.0; the live documentation is labeled v0.1.2. Pin a release and its documentation before testing.

## What runs where

OpenShell surrounds an existing agent rather than replacing its model, planning loop, or tools. The gateway provisions and manages sandboxes. A trusted supervisor outside the workload checks requests and supplies credentials. The workload's network boundary permits only its protected supervisor connection. Kernel controls restrict filesystem access and processes. These controls also matter when an agent executes generated code rather than calling a framework tool.

Sources: [architecture](https://docs.nvidia.com/openshell/latest/about/architecture), [launch walkthrough](https://developer.nvidia.com/blog/add-runtime-controls-to-ai-agents-with-nvidia-openshell).

## The capabilities worth evaluating

**Service access.** Policies can constrain destinations and calling executables, then inspect configured REST, GraphQL, or MCP traffic. This can distinguish permitted API operations from forbidden ones on the same service. The granularity depends on the protocol; it is not a universal business-rule engine.

Source: [network rules](https://docs.nvidia.com/openshell/latest/how-it-works/policies/network-rules).

**Credentials outside the workload.** With profile-backed providers, the agent receives placeholders. Real credentials are substituted on the trusted side only for authorized destinations and operations. Provider profiles can carry endpoint rules and refresh configuration. This protects configured provider credentials, not arbitrary secrets someone separately mounts into the workload.

Source: [provider profiles](https://docs.nvidia.com/openshell/latest/how-it-works/providers/profiles).

**Permission review.** The optional policy advisor lets an agent propose network access after a denial. Proposals wait for human review by default; risk-checked automatic approval is an explicit alternative. Network changes can take effect without restarting. The current advisor documentation limits proposals to network rules. Filesystem and process controls require sandbox recreation to change.

Sources: [policy advisor](https://docs.nvidia.com/openshell/latest/how-it-works/policies/advisor), [security configuration](https://docs.nvidia.com/openshell/latest/security/best-practices).

**Audit and shared operation.** OCSF events can be exported as JSONL for external analysis. Workspaces separate sandboxes, policies, providers, and access. Shared gateways need identity roles and workspace membership configured: local gateways without OIDC roles treat authenticated users as platform administrators.

Sources: [OCSF export](https://docs.nvidia.com/openshell/latest/observability/ocsf-json-export), [workspaces](https://docs.nvidia.com/openshell/latest/how-it-works/workspaces).

**Application-specific checks.** Supervisor middleware can inspect, reject, or modify supported request and response content. This is an extension point for additional checks, not evidence that every desired semantic policy ships ready-made. Failure blocks affected traffic by default, but inspection coverage has explicit limitations.

Source: [supervisor middleware](https://docs.nvidia.com/openshell/latest/extensibility/supervisor-middleware).

## What is required to try it

OpenShell is Apache-2.0 software. It can run without BlueField-4. Supported deployment options include Docker, Podman, Kubernetes, and MicroVM. The support matrix lists Linux amd64/arm64 and Apple Silicon macOS, with Windows through WSL 2 experimental. Required Linux kernel facilities still matter even when the host is macOS. The default workload image does not include an agent; bring an appropriate image or install the intended agent.

Sources: [repository](https://github.com/NVIDIA/OpenShell), [support matrix](https://docs.nvidia.com/openshell/latest/about/support-matrix), [platform FAQ](https://www.nvidia.com/en-us/solutions/ai/agent-safety/).

## Initial interpretation

The practical opportunity is to give an agent useful tools while moving permission enforcement out of its own decision-making loop. That is relevant to coding, research, and API automation, but actual usefulness depends on the tools, credentials, and execution environment of the deployment. No specific compatibility with the Operator's infrastructure has been established yet.
