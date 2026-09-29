# Kapa relative to the custom reference

Checked September 29, 2026. This maps responsibilities; it is not a benchmark. See the [earlier Kapa assessment](card:3mwnajmku5fwk).

The [GitHub connector](https://docs.kapa.ai/knowledge-sources/connectors/github-code) accepts Markdown and MDX and allows source selection. The [refresh schedule](https://docs.kapa.ai/knowledge-sources/refreshes) lists hourly checks for additions, updates, and deletions. This replaces an owned Git ingestion job with managed synchronization, but not the same event-triggered update contract.

The [hosted MCP](https://docs.kapa.ai/retrieval/hosted-mcp-server) supplies search and an optional full-document tool. Public access requires Google or GitHub OAuth. Public and internal configurations use default retrieval, not the API-key deep mode.

Relative to the reference, Kapa takes over the Git connector, managed retrieval, and MCP serving. Configuration, corpus selection, evaluation, and commercial/access-policy decisions remain with the Operator.

My interpretation: its main documented distinction is outsourcing more application responsibilities. Whether that produces better retrieval, lower total cost, or acceptable freshness requires evaluation against the same corpus and questions.
