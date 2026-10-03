Repository work fits into the tool layer of Cloudflare Agents. The harness asks the model what to do; your tool executors read or change the repository.

| Approach | What it provides |
| --- | --- |
| GitHub API or MCP | Read files and issues, update repository contents, create branches and pull requests through GitHub services. |
| Workspace with JavaScript Git | Clone a repository into a virtual filesystem, edit files, inspect diffs, commit and push from a Worker. |
| Linux Sandbox | A working clone plus Git, language runtimes and project commands for installing dependencies, building and testing. |

Think already exposes file tools over its SQLite-backed Workspace. Git operations need their own integration: the repository's shell package supplies a Git implementation, and you can expose selected operations as custom tools or through Code Mode.

For a coding agent that must execute a project's normal test suite, a Sandbox provides the Linux environment. Build an image with the required tools and connect its command executor to your harness. Cloudflare's coding-agent runner demonstrates editing a GitHub clone and returning a diff; it also has guides for existing coding CLIs.

A push sends commits to a Git remote. Opening a GitHub pull request uses the GitHub API or an MCP tool with permission to create PRs. Credentials and exposed tools determine the agent's actual access.

These are documented building blocks, not a deployed repository agent in this investigation.

Sources: [Think tools](https://developers.cloudflare.com/agents/harnesses/think/tools/), [Workspace Git implementation](https://github.com/cloudflare/agents/blob/main/packages/shell/README.md), [agent Sandbox](https://developers.cloudflare.com/agents/tools/sandbox/), [coding-agent runner](https://developers.cloudflare.com/sandbox/get-started/build-a-coding-agent-runner/), [GitHub MCP tools](https://github.com/github/github-mcp-server), [create a pull request](https://docs.github.com/en/rest/pulls/pulls#create-a-pull-request).
