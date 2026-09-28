# The platform is an enforcement contract, not a connector marketplace

OpenShell exposes different integration points for different responsibilities. The platform interpretation is that agents can share runtime controls while infrastructure providers and security vendors supply specialized implementations around those controls.

## Security checks on the agent's traffic

A supervisor middleware service implements protobuf-defined gRPC interfaces. For an HTTP request it receives the target, headers, body, and sandbox context, after network authorization and before provider credential injection. It can allow, deny, or change the request. Responses have a separate inspection interface. A body rewrite is checked again against applicable body-aware policy.

This is where a custom content checker could be integrated. An adapter may call an existing security product, but that does not prove any particular vendor already ships such an adapter.

Source: [middleware operations](https://docs.nvidia.com/openshell/latest/extensibility/supervisor-middleware/operations).

## Governance of platform management

Gateway interceptors are external gRPC services for selected management API writes. They can apply an approved policy to new sandboxes, reject policy changes, or enforce organizational constraints. Modification and validation happen before the operation commits; post-commit observation cannot undo it. The gateway retains authorization and final validation.

Source: [gateway interceptors](https://docs.nvidia.com/openshell/latest/extensibility/gateway-interceptors).

## Compute and secret-store integration

Compute drivers create, inspect, and remove workloads on a chosen runtime. Credential drivers connect provider records to secret storage. Documented built-ins include Docker, Podman, Kubernetes, virtual-machine compute, Kubernetes Secrets, and Vault-compatible credential storage. External drivers use typed protocols over a local Unix socket rather than a tool-call API exposed to the agent.

Source: [drivers](https://docs.nvidia.com/openshell/latest/extensibility/drivers).

## Monitoring integration

OpenShell can export OCSF events as JSONL. External log pipelines can ingest them without becoming inline authorization components. The documentation gives paths for tools such as Splunk and Elastic, but also lists schema-compatibility gaps. In particular, its v1.5 downgrade target for CrowdStrike FDR is marked unsupported. A format-level integration should not be confused with a fully validated product pairing.

Source: [OCSF JSON export](https://docs.nvidia.com/openshell/latest/observability/ocsf-json-export).

## Concrete partner example: identity rather than business actions

DigiCert says AI Trust Manager supports OpenShell and describes PKI-backed Agent Passports and verification before launch. Signed audit evidence is described partly in future tense. Its announcement illustrates how a partner can add identity and evidence around the runtime; it does not provide enough implementation detail to identify the exact OpenShell extension used or reproduce deployment.

Source: [DigiCert's announcement](https://www.digicert.com/blog/digicert-brings-ai-passports-to-the-nvidia-open-agent-safety-platform).

## What remains common, and what does not

Extension contracts preserve the public API and policy model while adapting deployment-specific behavior. They also negotiate versions and capabilities. That is a concrete technical basis for calling this a platform, rather than relying on the number of company logos.

Source: [extensibility overview](https://docs.nvidia.com/openshell/latest/extensibility/overview).

Integration still has engineering costs. Middleware has explicit traffic-coverage limitations, and NVIDIA warns that its API is evolving. A deployment must configure its endpoints, security checks, credentials, failure behavior, and compatibility tests. Platform extensibility does not establish universal semantic understanding of tools or permanent API stability.

Source: [supervisor middleware](https://docs.nvidia.com/openshell/latest/extensibility/supervisor-middleware).

This analysis is based on documentation and vendor announcements reviewed for this investigation, not on tested integrations.
