# Runtime controllers cover another part of the contract

Google AX declares a Task with a sandboxed command, Workspaces with repositories/MCP/skills, and Model bindings. It exposes task create/watch/suspend/resume/delete. AX explicitly does not model an agent's planning, delegation, and fan-out. Its README warns of breaking changes before a stable release. [Core concepts](https://github.com/google/ax/blob/main/docs/concepts.md), [repository README](https://github.com/google/ax).

The current AX runner retains workspace files across suspend/resume but starts a fresh container and process tree. It also does not yet report its agent command's exit status to the control plane. Completion reporting and prompt-turn delivery need an agent protocol or application callback. Budgets and approval policies appear in AX's roadmap, not a verified current feature. [Runner contract](https://github.com/google/ax/blob/main/docs/runner.md), [roadmap](https://github.com/google/ax/blob/main/docs/roadmap.md).

NVIDIA OpenShell's SDK can create, observe, exec into, stop/start, and delete a policy-governed sandbox. It does not define the human task or agent conversation. [Python SDK](https://docs.nvidia.com/openshell/latest/sdk/python).

The proposed integration stores `runId -> runtimeId`, uses an agent-facing protocol such as ACP or a wrapper to deliver turns, and verifies that a requested stop actually ended the concrete runtime. This connects to the [prior fleet assessment](card:3mwlzrs7zawpz). It is not a tested AX or OpenShell deployment.
