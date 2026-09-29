# Per-agent native profiles and the chat-first exception

## OpenCode V2

A file at `.opencode/agents/<name>.md` has YAML frontmatter and a Markdown body used as its system prompt. The frontmatter includes model, `mode` (`primary`, `subagent`, or `all`) and an ordered `permissions` list of action/resource/effect rules. This is a documented profile for one named agent; `opencode run --agent <name>` or the server API can drive it. **Version matters:** V2 uses `permissions`; legacy V1 examples with `permission` should not be copied into V2. A selected primary agent does not automatically change the session's selected model. The rules gate OpenCode tools, while Pod and sandbox configuration must constrain the actual process and network.
[Agent format](https://opencode.ai/v2/docs/agents) | [CLI](https://opencode.ai/v2/docs/cli/commands/) | [Permissions](https://opencode.ai/v2/docs/permissions)

## Claude Code

A file at `.claude/agents/<name>.md` similarly carries YAML frontmatter and a Markdown role. Native fields cover tools, `disallowedTools`, model, permission mode and MCP servers. It can be selected as the main agent in a headless `claude --agent <name> -p ...` invocation. This is a Claude Code runtime schema, and its permissions are not a substitute for container isolation.
[Custom subagents](https://code.claude.com/docs/en/sub-agents) | [CLI reference](https://code.claude.com/docs/en/cli-reference)

## Goose Recipe

A Recipe is YAML/JSON for a repeatable Goose run, with instructions, model, extensions/MCP servers and tool selection. It is an existing language, but it is a launch recipe rather than a complete infrastructure access policy. It can be useful if the controller creates short-lived runs for chat requests.
[Recipe reference](https://github.com/aaif-goose/goose/blob/main/documentation/docs/guides/recipes/recipe-reference.md)

## OpenClaw and experimental Claws

OpenClaw already routes agents from channels, including an official Buzz plugin for team rooms. Its established agent registry is JSON5 with separate workspace instructions. The **experimental** Claws package instead has a `CLAW.md` manifest with YAML frontmatter and portable role text, plus `profiles/openclaw.yml` for model, subagents and allowed or denied tools. It is a native package with validation and lifecycle commands, **not a single YAML file**. Host credentials, channel bindings and some runtime policy remain outside the package; it requires `OPENCLAW_EXPERIMENTAL_CLAWS=1`. The documented Buzz route binds rooms to agents; arbitrary mention-based selection among multiple agents within one room still needs verification.
[Claws CLI](https://docs.openclaw.ai/cli/claws) | [Agents config](https://docs.openclaw.ai/gateway/config-agents/entries-and-multi-agent) | [Buzz](https://docs.openclaw.ai/channels/buzz)

These four options do not require a new agent language. They have different integration boundaries: OpenCode/Claude/Goose need a chat adapter, whereas OpenClaw includes one. None implies a separate owner of the human team's tasks.
