The announcement's small subagent example is not a generic external-agent connector. It creates a task-owned conversation inside the same harness, then reuses that conversation and its submission after a restart.

For an external ACP worker, the equivalent recovery behavior is an integration requirement, not an inherited guarantee. Pi can retain the delegation intent, but the remote worker must expose enough identity and state to determine what already happened.

This is an architectural distinction drawn from the documented example, not a deployment test.

Source: [Pi Durable announcement, crash recovery and subagent example](https://earendil.com/posts/pi-durable/).
