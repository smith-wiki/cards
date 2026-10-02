Checked against the MCP Gatekeeper documentation on October 2, 2026. This is a documentation review, not a deployment test.

The connector uses Streamable HTTP. A grant can expose all tools or a named subset. Resource-level limits, such as allowing a tool to access only one repository, must be enforced elsewhere.

The connector treats tools marked read-only by the server as immediate observations. Other calls enter an approval queue. It has no action simulation or revert mechanism. An MCP server's read-only annotation must therefore be trustworthy.

[Source: MCP Gatekeeper](https://github.com/cloudflare/cloudflare-os/blob/main/packages/gatekeeper-mcp/README.md).
