# Which protocol connects Herdr and an agent?

There are two different paths.

**Prompt delivery and output:** Herdr owns the agent's terminal. `agent prompt` writes text and an encoded Enter into that terminal, respecting bracketed paste. Output is the agent's terminal display. This is terminal I/O, rather than a standardized agent conversation protocol. Source: [Agent automation](https://herdr.dev/docs/agent-automation/).

**State and session reporting:** integrations call Herdr's local control API. Its transport is newline-delimited JSON over a Unix domain socket on Unix or a named pipe on Windows. Source: [Socket transport](https://herdr.dev/docs/socket-api/#socket-transport).

OMP's integration reports lifecycle state and native session identity through that API. Source: [OMP integration](https://herdr.dev/docs/integrations/#omp).

The consequence is that Herdr can operate existing interactive agents while their integrations provide structured status. This does not turn terminal transcripts into structured, task-specific agent results.
