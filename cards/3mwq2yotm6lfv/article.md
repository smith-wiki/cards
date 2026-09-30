# Applicability and guarantees

Agents API fits applications that want OpenAI to operate the Codex model/tool loop and retain sessions. Configuring it does not replace that harness with the application's OMP or Lisp runtime.

The application still owns who may invoke the agent, which resources a tool may access, communication routing, side-effect reconciliation, and lifecycle of self-hosted compute.

A terminal turn outcome is observable, but `completed` does not prove every tool succeeded. Cancellation stops the active agent turn; do not infer rollback of operations already performed. Disconnecting an event stream is not cancellation.

A message during an active turn steers it. Changing session instructions or tools requires a new session through the documented update contract.

Private-state limitations and subagent isolation remain as described in [the fleet comparison](card:3mwpzsoahaajw) and [delegation boundary](card:3mwpzscqj2ajm).

[Runtime choices](https://developers.openai.com/api/docs/guides/agents) | [Sessions](https://developers.openai.com/api/docs/guides/agents-api/sessions) | [Configuration](https://developers.openai.com/api/docs/guides/agents-api/configuration).
