# Ways to invoke an agent after wake-up

There are two decisions: how AX starts or resumes the sandbox, and how a process in that sandbox receives one prompt. ACP answers the second decision for coding agents; a native noninteractive CLI answers it for one agent. They can be combined.

| Invocation inside the sandbox | Ready implementation | Result and state |
| --- | --- | --- |
| Native CLI | `claude -p`, `gemini -p`, `codex exec`, or `opencode run` | Use each agent's JSON/JSONL mode, process exit, and its own resume/session options. Flags and event shapes differ. |
| ACP over local stdio | Start an ACP agent, negotiate `initialize`, create/load a session, send `session/prompt`, consume `session/update` and the final response, handle permissions and cancel. | Common coding-agent interaction, but the client process and agent process must be started after wake-up. Loading a prior session is capability-dependent. |
| ACP through acpx | `acpx --format json --cwd /workspace codex exec --file -` (replace `codex` with another supported agent) | A ready headless ACP client: temporary session, one prompt from stdin, raw ACP NDJSON stream. No custom ACP client is needed for this local invocation. |

Native examples: [Claude Code headless](https://code.claude.com/docs/en/headless), [Gemini CLI headless](https://geminicli.com/docs/cli/headless/), [Codex exec](https://learn.chatgpt.com/docs/non-interactive-mode), [OpenCode CLI](https://opencode.ai/docs/cli/). In OpenCode, `-p` is a server password; its prompt command is `opencode run`.

The [ACP v1 overview](https://github.com/agentclientprotocol/agent-client-protocol/blob/main/docs/protocol/v1/overview.mdx) specifies prompt, updates, permissions, cancel, and optional session load. [acpx CLI](https://github.com/openclaw/acpx/blob/main/docs/CLI.md) supports one-shot `exec`, named persisted sessions, JSON output, and permission policies. Pin versions: acpx is pre-1.0, and its Codex/Claude integrations launch separate ACP bridge packages. For a saved acpx session, both `~/.acpx` state and the agent's own session files must survive AX suspend/resume; AX guarantees only its documented workspace snapshot. acpx may fall back to a *new* session when resume/load fails, so check continuity if the old context is essential.

The prompt should enter via stdin or a fetched payload identified by an invocation ID, rather than a full message in AX Task YAML or process arguments. This changes exposure of prompt content, not the agent's authority. Credentials supplied to the sandbox can still be read by the agent. Neither ACP authentication nor CLI invocation isolates such credentials. AX wake-up and release remain the outer controller's responsibility.
