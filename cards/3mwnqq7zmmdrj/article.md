# Paperclip as a team controller candidate

The [earlier Paperclip-first proposal](card:3mwlzdd5ruzfv) was withdrawn after the Operator clarified an immediate event-to-execution need. The present question is broader: a human team, agent team, task ownership, and a separate communication layer. That makes Paperclip relevant again, without deciding to use it.

Paperclip's self-description separates a control plane for agents, goals, issues, budgets, and heartbeats from execution adapters for existing runtimes. It is self-hostable and its repository is MIT licensed. [Paperclip overview](https://github.com/paperclipai/paperclip/blob/master/docs/start/what-is-paperclip.md), [repository](https://github.com/paperclipai/paperclip).

Its Issues API creates and assigns tasks, records parents and blockers, accepts comments and mentions, and can interrupt an active run on a comment when the caller has board rights. Run records and cancellation have separate APIs/CLI. [Issues API](https://docs.paperclip.ing/reference/api/issues/), [run commands](https://docs.paperclip.ing/reference/cli/run/).

The integration to test is a stable mapping from `discussionRef/messageRef` to `issueId/commentId/runId`, including a later human reply, agent output, and cancellation. Paperclip says comments are the primary communication channel between agents. Its built-in chat channels currently require an experimental switch, and one connection carries one agent; Slack, Discord, and Teams are documented but that is not evidence of Buzz, Zulip, or Discourse integration. [Connectors](https://docs.paperclip.ing/connectors/).

This is a documentation-based candidate assessment. The external two-way adapter, actual execution isolation, duplicate-event behavior, and stop confirmation are untested for the Operator's setup.
