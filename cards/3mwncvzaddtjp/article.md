# Keep the MCP layer thin

[FastMCP supports mounting into an existing Python web application](https://gofastmcp.com/deployment/http). I propose using it only as the transport wrapper around the application's own search and revision-aware reading functions, without changing publication.

[Qdrant's official MCP server](https://github.com/qdrant/mcp-server-qdrant) documents `qdrant-store` and `qdrant-find`, configurable embeddings through FastEmbed, and `QDRANT_READ_ONLY` to disable writes. It is useful reference code, but its documented tool surface is not a complete Markdown repository search-and-read service.

Keep model selection and query encoding aligned with ingestion. Expose source-reading and metadata filtering deliberately rather than assuming any MCP wrapper around the same database reproduces the intended retrieval behavior.
