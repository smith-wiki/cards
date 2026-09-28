# A custom schema over existing enforcement mechanisms

The public policy format is a versioned YAML schema, currently `version: 1`, with filesystem, Landlock, process, network-policy, and middleware fields. Unknown keys and duplicate keys are rejected. This is a domain-specific configuration contract, not merely arbitrary YAML.

Source: [policy schema](https://docs.nvidia.com/openshell/latest/how-it-works/policies/schema).

NVIDIA's September 28 walkthrough explicitly says YAML policies are compiled to OPA/Rego for outbound-request evaluation. Thus NVIDIA did not invent every underlying policy technology. This finding is based on NVIDIA's documentation; the engine implementation was not independently inspected in this investigation.

Source: [runtime walkthrough](https://developer.nvidia.com/blog/add-runtime-controls-to-ai-agents-with-nvidia-openshell).

Filesystem and process restrictions use Landlock and seccomp/privilege controls. These are not all decisions performed by a single Rego rule.

Source: [security controls](https://docs.nvidia.com/openshell/latest/security/best-practices).

An agent's code, prompts, planning loop, and delegation rules remain part of its application. Workload templates describe how to launch that application, rather than its reasoning or organizational job. Existing AX manifests are not documented as interchangeable OpenShell policy files.

Sources: [workload templates](https://docs.nvidia.com/openshell/latest/how-it-works/sandboxes/templates), [AX concepts](https://github.com/google/ax/blob/main/docs/concepts.md).
