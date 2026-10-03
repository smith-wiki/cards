A practical repository-task lifecycle, proposed from the documented components:

1. Receive a task through chat, a webhook or a schedule. Record the repository, base revision, goal and task stage in the Agent.
2. Start a Sandbox from an image containing Git and the project's runtimes. Clone the repository and create a task branch.
3. Let the harness read files and request edits. Tool executors perform the work in the clone.
4. Run the project's checks and feed output back to the model for another edit when needed.
5. Commit and push the branch, then create a pull request through GitHub API or MCP. Record the commit and PR identifiers in agent state.

The tool names and task stages are application choices. The SDK does not turn this sequence into an automatic workflow merely because the agent has a prompt.

| Data | Where this design keeps it |
| --- | --- |
| Goal, stage, repository and revision identifiers | Durable Agent storage |
| Clone, dependencies and uncommitted edits | Sandbox filesystem |
| Committed changes delivered to the remote | Git repository |
| Files needed to resume after a container stop | An explicitly saved snapshot or backup |

Agent storage can remain while the Sandbox stops. A stopped container loses its local files and processes. Snapshots, currently in public beta, preserve filesystem changes, but do not resume processes. A remote push preserves committed changes, while uncommitted work needs a snapshot or other backup.

For background work, keep the container active while the task runs and record progress outside it. Durable execution or Workflows can organize recovery. A new container still needs explicit restoration or recloning.

Sources: [agent Sandbox](https://developers.cloudflare.com/agents/tools/sandbox/), [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/), [repository test runner](https://developers.cloudflare.com/sandbox/commands/run-tests-from-a-git-repository/), [coding-agent runner](https://developers.cloudflare.com/sandbox/get-started/build-a-coding-agent-runner/), [GitHub pull requests](https://docs.github.com/en/rest/pulls/pulls#create-a-pull-request).
