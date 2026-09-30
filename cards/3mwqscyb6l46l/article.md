# OMP integration path

OpenViking ships an official pi Coding Agent extension. It performs automatic recall before prompts, captures turns, commits sessions, can take over compacted context, and mirrors the server's MCP tools into pi.

OMP's extension loader explicitly accepts legacy pi.extensions manifests for compatibility. Therefore the OpenViking pi extension is a strong candidate for direct reuse under OMP.

However, OpenViking's compatibility documentation names pi, not OMP. This investigation has not installed the extension into OMP. Treat direct compatibility as a testable hypothesis rather than an established integration.

If the existing pi extension needs adjustment, the architectural adapter is still small: OMP lifecycle hooks capture the conversation, while OpenViking's HTTP/SDK session API supplies create session, add messages, search, and commit.

Sources:
- https://docs.openviking.ai/en/agent-integrations/11-pi
- https://github.com/can1357/oh-my-pi/blob/main/docs/skills/authoring-extensions.md
