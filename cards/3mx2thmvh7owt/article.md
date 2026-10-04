Hermes' ACP host integration exposes Hermes as a server. Separately, its provider documentation describes an outbound `copilot-acp` backend with configurable executable and arguments.

I inspected the current `agent/copilot_acp_client.py` source. `_run_prompt` enters `_session`, which starts a subprocess, sends `initialize` and `session/new`, invokes `session/prompt`, then releases the process. The implementation answers `session/request_permission` with a cancelled outcome. This is source observation, not an OMP integration test.

The backend provides a model-facing facade; it is not sufficient evidence of a persistent external-worker session manager. OMP's ACP approval behavior also needs consideration: OMP documents client permission gates and how explicit approval configuration changes them.

Current `delegate_task` source strips model-supplied `acp_command` and `acp_args` from tasks as trusted-configuration-only fields. Older examples exposing these as model-selectable parameters should not be copied without checking the installed version.

Sources: [Hermes ACP host integration](https://hermes-agent.nousresearch.com/docs/user-guide/features/acp), [Provider documentation](https://hermes-agent.nousresearch.com/docs/integrations/providers), [Outbound ACP client source](https://github.com/NousResearch/hermes-agent/blob/main/agent/copilot_acp_client.py), [Delegation source](https://github.com/NousResearch/hermes-agent/blob/main/tools/delegate_tool.py), [OMP ACP approvals](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md).
