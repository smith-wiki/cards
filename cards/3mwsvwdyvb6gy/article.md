# What runs on the central server and agent hosts?

For the browser setup discussed here, process ownership is:

| Location | Running components |
| --- | --- |
| Your device | Browser frontend |
| Central host | Roamgate web bridge and outgoing SSH connections |
| Each agent host | Herdr background server, terminal panes and agent processes |

Roamgate's [deployment documentation](https://github.com/powerfooI/roamgate/blob/main/docs/DEPLOYMENT.md#multiple-and-remote-herdr-connections) requires an already-running remote Herdr server. Its managed Herdr setup helper supports the default local configuration only. Deploy and start Herdr separately on remote hosts.

The [SSH transport](https://github.com/powerfooI/roamgate/blob/main/docs/ARCHITECTURE.md#ssh-transport) forwards two remote sockets: the control API and terminal traffic. The central bridge connects to those existing services. Reconnecting to a host does not itself mean launching a new agent for each message.

Agent launch is a separate operation inside a Herdr pane. The [automation guide](https://herdr.dev/docs/agent-automation/) provides `agent start` for an existing shell pane and identifies OMP, Codex and other executables as supported kinds. The agent runs on that host and uses its filesystem and environment.

This describes documented operation, not a deployment performed here.
