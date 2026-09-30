Comparison as of September 30, 2026, based on current official documentation.

| Product | Multiple persistent agents | Deployment and boundaries |
| --- | --- | --- |
| OpenAI dots | One primary personal dot at launch; additional dots are planned. A single dot can coordinate several responsibilities and background agents. | Managed cloud computer, connected apps, and action review. Specialist organizational dots are a separate enterprise pilot. |
| Hermes | Profiles each hold configuration, memory, sessions, skills, cron jobs, and gateway state. | You operate the runtime. A profile is not a filesystem sandbox; the default local backend retains the OS user's access. |
| OpenClaw | Several agents in one Gateway, with individual workspace, authentication state, and session store. | Workspaces are not sandboxes. The supported trust model is one trusted operator or team per Gateway. Cross-agent session access is enabled by default; stricter separation requires configuration or separate Gateways and OS boundaries. |
| Letta | App Server can manage several agents in parallel. | An alternative runtime for custom applications, with SDK/WebSocket access. Choose its local backend for local state storage; local tool execution alone does not imply local memory storage. |

Creating multiple agent identities and enforcing different permissions are separate architectural tasks. This comparison describes documented behavior, not a benchmark of which agent completes tasks better.

Sources: [dots launch](https://openai.com/index/introducing-dots/), [Hermes profiles](https://hermes-agent.nousresearch.com/docs/user-guide/profiles/), [OpenClaw multi-agent routing](https://docs.openclaw.ai/concepts/multi-agent), [OpenClaw trust model](https://docs.openclaw.ai/gateway/security/trust-model), [Letta App Server](https://docs.letta.com/self-hosting/app-server).
