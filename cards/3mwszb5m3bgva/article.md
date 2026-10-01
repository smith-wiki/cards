# ACP is a better contract for programmatic fleet control

ACP v1 defines `session/prompt`, streamed `session/update` events, permission requests and cancellation. A prompt request ends with a response containing `stopReason`, giving the controller an explicit boundary for that turn. Sources: [ACP overview](https://agentclientprotocol.com/protocol/v1/overview), [Prompt turn](https://agentclientprotocol.com/protocol/v1/prompt-turn).

Herdr's terminal approach preserves each agent's existing interactive interface and can run ordinary CLI applications. Its prompt waits observe agent lifecycle state rather than identifying individual turns. Source: [Herdr automation](https://herdr.dev/docs/agent-automation/).

My preference for an automated fleet is therefore ACP where the harness or a verified adapter supports it. This preference concerns the control contract and dependence on terminal presentation; it is not a measured performance result.

ACP's standard stdio transport still has a client launching an agent subprocess. The protocol does not provide a detached host daemon that survives browser or SSH disconnection. Source: [ACP transports](https://agentclientprotocol.com/protocol/v1/transports).

The proposed architecture keeps a persistent host service for process ownership and remote access, while using ACP between that service and the harness. An existing Roamgate/Herdr deployment would need implementation changes for this path; the researched configuration continues to expose terminal control.
