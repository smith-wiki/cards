The repository can be an ordinary Git checkout on the disk of a Linux Sandbox.

The Agent exposes a command tool to its model. That tool executes commands in the attached container and returns their output. With Git and the project's runtimes installed in the image, the agent can clone a repository, read and edit its files, search the tree, run builds and tests, and use Git for commits and pushes.

For example, these are normal commands inside the Sandbox:
```bash
git clone "$REPO_URL" /workspace/repo
cd /workspace/repo
git checkout -b agent/task
# The agent reads and edits files here.
npm ci
npm test
git diff
```

The commands above illustrate the workflow; they were not executed in this investigation. Dependency installation and cloning need permitted network access, and private repositories require credentials.

Cloudflare's repository-test guide demonstrates a clone into the container filesystem followed by dependency installation and test execution. Its Agents Sandbox guide shows how a Think agent exposes a command tool.

Local work happens inside the Cloudflare container. The model receives tool results; reading every file through the GitHub API is not required.

Sources: [Clone a repository and run its tests](https://developers.cloudflare.com/sandbox/commands/run-tests-from-a-git-repository/), [attach a Sandbox to an Agent](https://developers.cloudflare.com/agents/tools/sandbox/).
