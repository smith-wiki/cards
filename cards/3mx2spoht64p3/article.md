Proposed starter setup, adapted from the official documentation. I have not run it on the operator's installation.

Create named profiles with descriptions, then configure each profile's model and credentials with `hermes -p <name> setup`:

```bash
hermes profile create planner --description "Decomposes goals, assigns work and evaluates results."
hermes profile create coder --description "Implements assigned changes and runs checks."
hermes profile create reviewer --description "Reviews changes and verifies acceptance criteria."
```

Use `hermes -p planner tools` to restrict the planner's saved tool selection to `kanban`, `memory`, `todo` and `clarify` on the platform you use. A CLI session can select these explicitly:

```bash
hermes -p planner chat --toolsets kanban,memory,todo,clarify
```

Merge these entries into the planner's existing `config.yaml` as an additional guard:

```yaml
model:
  openai_runtime: auto
agent:
  disabled_toolsets:
    - terminal
    - file
    - code_execution
    - browser
    - computer_use
    - delegation
    - cronjob
```

The configuration reference says `agent.disabled_toolsets` applies after platform selection, so excluded tools stay removed. Also keep action-capable MCP servers and plugins out of the planner's selection. The workers have their own tool configurations.

The runtime choice matters: the optional Codex App-Server runtime provides its own built-in shell and editing tools. Disabling Hermes' terminal/file toolsets must not be treated as disabling Codex's native tools. Keep the restricted planner on Hermes' default runtime; execution workers can use a different runtime.

Profiles separate Hermes state; they do not provide OS sandboxing.

Sources: [Profiles](https://hermes-agent.nousresearch.com/docs/user-guide/profiles/), [Toolsets](https://hermes-agent.nousresearch.com/docs/reference/toolsets-reference), [Global toolset disable](https://hermes-agent.nousresearch.com/docs/user-guide/configuration#global-toolset-disable), [Codex runtime tools](https://hermes-agent.nousresearch.com/docs/user-guide/features/codex-app-server-runtime#what-tools-the-model-actually-has).
