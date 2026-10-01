# How input reaches an agent and why the session stays alive

Herdr is the terminal multiplexer on the agent host. Its background server owns each pane's virtual terminal and process state. The agent must run inside a Herdr pane; tmux is not required for this persistence. Source: [Herdr concepts](https://herdr.dev/docs/concepts/).

In the Roamgate deployment, browser input goes to the web bridge, through its SSH connection to the selected host's terminal socket, and into that pane's terminal. Herdr delivers terminal input to the agent. The agent receives it through its terminal-facing input, as it would receive typing in a local terminal. Source: [Roamgate architecture](https://github.com/powerfooI/roamgate/blob/main/docs/ARCHITECTURE.md).

Programmatic prompt submission adds text plus encoded Enter and respects bracketed paste. It operates the existing terminal session. Source: [Agent automation](https://herdr.dev/docs/agent-automation/).

Persistence follows from ownership: disconnecting the browser or SSH path leaves the local Herdr server and agent process running. The same live agent can accept a later message without restarting. A host or ordinary Herdr server restart ends the original processes; supported conversation restore launches a replacement agent using saved session identity. Source: [Session state](https://herdr.dev/docs/session-state/).

This is an explanation of documented behavior, not a test report.
