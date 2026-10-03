Choose the execution environment for the work your agent needs to do.

| Work | Documented environment |
| --- | --- |
| Generated code that calls application-defined tools | Code Mode in a Dynamic Worker |
| Bash, scripts, compilers, package installation and Linux project files | An attached Sandbox container |

Code Mode lets the model compose tool calls as code. The Linux sandbox provides a separate environment for running commands. Cloudflare's Sandbox guide describes attaching a container to the agent's Durable Object and exposing a command tool to the model.

The sandbox has its own environment. It cannot directly read the agent's storage, environment variables or bindings. Your application controls Internet access.

These are documented options. We have not tested execution or file persistence in this investigation.

Sources: [Sandbox and execution choice](https://developers.cloudflare.com/agents/tools/sandbox/), [repository features and packages](https://github.com/cloudflare/agents).
