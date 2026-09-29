# What Google AX can and cannot own

[Google AX](https://github.com/google/ax) (Agent Executor) is the intended Google project. It accepts `ax.io/v1alpha1` YAML with `Task`, `Workspace` and `Model` and runs Task images on Agent Substrate. Its `ax` CLI applies those resources through the AX gRPC control plane; they are not Kubernetes Agent CRDs. AX currently stores resource state in Redis. The project's README warns that its concepts and APIs may change before a stable release.

A `Task` is one isolated **execution**, not the human team's task record. It specifies the image, command, resources, environment and Workspace bindings. A `Workspace` prepares repositories, files such as `AGENTS.md`, MCP endpoints and skills; `Model` references a Kubernetes Secret for AX components that need model access. Thus AX can manage runs without becoming the authority for what work is open in the chat or optional GitHub Issues.

[AX's documented gRPC API](https://github.com/google/ax/blob/main/DESIGN.md) has Task create/get/watch/suspend/resume/delete and Workspace/Model operations. Its [default runner](https://github.com/google/ax/blob/main/docs/runner.md) serves health and metadata endpoints and supervises the command. It does **not** provide a generic `session/prompt` or A2A endpoint. A chosen agent process must expose a suitable message interface, or a persistent chat harness can run inside the Task.

## Deployment checks before adopting AX

1. **Existing k3s:** AX requires Agent Substrate installed first; confirm the exact Kubernetes API version, Substrate installation path, storage and networking on this cluster. Do not assume the current self-managed k3s cluster meets its prerequisites.
2. **Task secrets:** current [AX issue 348](https://github.com/google/ax/issues/348) shows `Task.spec.env` only accepts literal values and has no `valueFrom` secret reference; `Model.spec.secretKey` does not supply credentials to an arbitrary Task process. Passing a Buzz private key in a Task manifest exposes it to readers of the AX API. Verify this gap against the pinned revision before using AX for a bot that holds credentials.
3. **Workload identity and policy:** AX's [roadmap](https://github.com/google/ax/blob/main/docs/roadmap.md) lists per-Task SPIFFE identity and finer least-privilege policies as future work. An agent's tool restrictions and actual resource authority need their own enforcement in the current design.
4. **Local debugging:** `ax-task-runner --task-file ... --workspace-file ...` can test the runner outside a cluster. It does not reproduce the Substrate sandbox. A direct AX-to-microsandbox backend is not documented in the current project.

The immediate architectural boundary is clear: the communication system owns conversation; AX owns isolated execution; a native agent runtime interprets the agent's role file; credentials and authorization must be bound explicitly.
