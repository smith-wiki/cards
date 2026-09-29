# One agent definition per file

Proposed repository shape: `agents/researcher.yaml`, `agents/reviewer.yaml`, with a shared JSON Schema and a CI validation step. This is a domain contract to design, not the native schema of Paperclip, AX, OpenShell, or Kubernetes.

A definition may contain a stable agent ID; role and instructions; OCI image or harness; model reference; approved invocation audience; context-read scope; tool capabilities; secret *references*; filesystem and network needs; CPU, memory, duration and spend limits. The controller loads a reviewed Git revision, pins its digest into each run, and translates each requested capability through an allowlisted policy map. It rejects anything the target runtime cannot enforce. Actual credentials and secret values stay outside Git.

The permission path matters: invocation authorization at the communication adapter; argument-aware authorization at the tool or MCP server; network, process and filesystem boundaries at the sandbox; Kubernetes RBAC only for Kubernetes API rights. A role prompt, a visible tool list, or arbitrary YAML fields do not enforce permission. OpenShell has YAML enforcement policy for filesystem, process, network and MCP tool names, but its MCP proxy does not match tool arguments: https://docs.nvidia.com/openshell/latest/how-it-works/policies/schema

For a first k3s implementation, mount the versioned files for the trusted controller (for example through GitOps and ConfigMaps), and start a Job or sandbox for each run. Introduce an Agent CRD and operator if Kubernetes API watch, status and `kubectl get agents` become useful; a CRD by itself does not implement a controller. Kubernetes's own ConfigMap-vs-custom-resource guidance supports this boundary: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/

The agent process must not inherit the controller's Kubernetes credential. Kubernetes warns that permission to create workloads in a namespace can indirectly reach mountable Secrets and any ServiceAccount in that namespace; isolate those trust levels and constrain workload templates: https://kubernetes.io/docs/concepts/security/rbac-good-practices/

Paperclip can export/import agent identity, instructions, adapter config and grants, but uses `agents/<slug>/AGENTS.md` plus a shared `.paperclip.yaml`, and import is a merge with collision behavior, not continuous reconciliation of one YAML per agent: https://docs.paperclip.ing/guides/power/export-import/
