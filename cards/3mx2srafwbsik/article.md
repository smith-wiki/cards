The default Kanban lane launches a named Hermes profile as a separate process. A profile is independently configured; it is not simply a fresh-context child of the planner.

The worker-lane reference describes extension points for non-Hermes executors. An integration supplies an assignee identifier, a spawn mechanism and lifecycle reporting through the board API or tools. This is an integration contract, not evidence that every coding harness already has a shipped adapter.

There is a documented optional Codex App-Server runtime: Kanban workers can execute with Codex's native tools and report results through Hermes' MCP callback. This establishes a supported runtime path for Codex; it does not establish native support for OMP or arbitrary ACP workers.

Sources: [Worker-lane contract](https://hermes-agent.nousresearch.com/docs/user-guide/features/kanban-worker-lanes), [Codex runtime with Kanban](https://hermes-agent.nousresearch.com/docs/user-guide/features/codex-app-server-runtime#kanban-multi-agent-worktree-dispatch).
