Cloudflare documents exec() with writable stdin and readable stdout/stderr. OMP documents an ACP server over stdio. The official ACP TypeScript SDK accepts a bidirectional message stream.

Together, these suggest a direct transport: a Pi tool or task calls an ACP client in the Durable Object, which communicates with omp acp through the container's process streams. The executable and dependencies must already be available in the container. Start the container first, request piped stdin, and keep stderr separate from the protocol stream. Do not use a pseudo-terminal for this transport.

This removes the need for an extra HTTP/WebSocket server merely to exchange ACP messages. It does not establish how an ACP connection or a process handle is reacquired after an orchestrator restart. A supervisor may still be useful for decoupled execution and recovery.

Sources: [Cloudflare command execution](https://developers.cloudflare.com/containers/guides/execute-commands/), [OMP CLI](https://github.com/can1357/oh-my-pi/blob/main/docs/cli-reference.md), [ACP TypeScript connection API](https://agentclientprotocol.github.io/typescript-sdk/classes/ClientSideConnection.html). The SDK documentation recommends its newer client API over the deprecated connection class; this finding concerns the stream boundary, not a tested implementation.
