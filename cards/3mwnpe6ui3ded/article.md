# Invoking an agent from a human conversation

A possible sequence:

1. A person writes `@researcher compare X and Y` (or uses an equivalent command or UI action). Ordinary human discussion does not automatically launch an agent.
2. The adapter emits `invoke {sourceMessageRef, discussionRef, actorRef, agentRef, inputRef}`. The trusted controller checks the actor's right to invoke this agent in this scope, creates a `runId`, and records the source-message-to-run mapping.
3. The communication layer posts a short acknowledgment with the run reference; subsequent progress, request for human input, completion, or failure can be posted in the same discussion. The controller owns run state and runtime operations.
4. A reply addressed to the agent may become `continue {runId, messageRef}`. A command such as `cancel <runId>` becomes a cancellation request; the controller must propagate it to the agent runtime and report the observed outcome.

If two agents or two runs are active in one topic, `discussionRef` is insufficient for routing a follow-up. Use a reply to a specific agent message, a run reference, or an explicit agent mention, and reject ambiguous commands. An agent can request another agent through the controller without requiring its internal delegation to appear as a chat message.

This is a proposed interaction model. Buzz's documented ACP bridge already routes mentions into agent subprocesses, but its architecture document says the bridge does not persist state; it does not establish the durable task lifecycle proposed here. [Buzz architecture](https://github.com/block/buzz/blob/main/ARCHITECTURE.md).
