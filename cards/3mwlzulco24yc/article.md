# Reuse existing input machinery where it fits

The upstream buzz-acp README says the harness spawns an ACP-compatible agent and forwards relay mentions to it. Owner controls include !cancel for a scoped in-flight turn and !shutdown for graceful harness exit. This is more than a display-only chat interface, but it does not establish a universal external runtime controller.

Source: [buzz-acp README](https://raw.githubusercontent.com/block/buzz/main/crates/buzz-acp/README.md).

For an already running compatible agent, Agent Client Protocol defines session/prompt and session/cancel. These are session-level interactions, not sandbox creation or an operating-system kill command.

Source: [ACP prompt turn](https://agentclientprotocol.com/protocol/prompt-turn).

The proposed integration separates starting the runtime, sending an agent-level command, and forcibly stopping compute. An exec call starts a program; it does not automatically inject a new prompt into an existing agent session. Use the agent's supported protocol or an explicit wrapper for that part.

This reviews upstream capabilities, not the Operator's installed Buzz version. No Buzz-to-AX or Buzz-to-OpenShell integration has been tested.
