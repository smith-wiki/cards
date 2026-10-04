Hermes documents `delegate_task` as spawning child Hermes AIAgent instances with fresh conversations and inherited enabled toolsets. The model cannot pass a `toolsets` parameter to grant extra capabilities.

Consequently, a parent restricted to planning tools cannot use ordinary delegation to create a child with shell or file tools. The `role="orchestrator"` option enables further delegation within the configured depth; it does not establish a separate worker permission profile.

For the requested planner/executor split, the documented Kanban design uses separately configured worker profiles.

Source: [Subagent Delegation: inherited tool access](https://hermes-agent.nousresearch.com/docs/user-guide/features/delegation#inherited-tool-access).
