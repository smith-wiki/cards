In the documented Agent/Think setup, the Sandbox is attached to the named Agent's Durable Object. The command tool starts a container only when one is not running. Later tool calls and chat turns reach the same attachment.

| Part | What survives |
| --- | --- |
| Think Session | Conversation history stored in Durable Object SQLite |
| Running Sandbox | The clone, dependencies and processes while that container remains alive |
| Saved snapshot | Files restored into a replacement container; running processes are not restored |

For example, the Agents guide configures a ten-minute inactivity timeout. One turn clones and edits a repository; another turn arriving while the container still runs uses those files. Ten minutes is the guide's chosen setting, not a universal default.

After inactivity stops the container, the Session can still load its stored history. Repository tools then need to start a container and restore saved files or clone again. Snapshot creation and restoration must be wired into application code; Session persistence does not automatically snapshot the Sandbox.

A useful application design stores the latest snapshot reference and repository revision in durable agent state, then uses them when repository work resumes. This is a proposed integration of the documented components.

Sources: [attached Agent Sandbox](https://developers.cloudflare.com/agents/tools/sandbox/), [Session storage](https://developers.cloudflare.com/agents/runtime/lifecycle/sessions/), [container lifetime and snapshots](https://developers.cloudflare.com/sandbox/concepts/lifetime/).
