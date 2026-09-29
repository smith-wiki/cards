# Kapa as a managed candidate for repository search

Checked September 29, 2026. This is a documented-capability assessment, not a comparative benchmark.

The [GitHub Code connector](https://docs.kapa.ai/knowledge-sources/connectors/github-code) accepts Markdown and MDX. It supports directory and regex selection and branch/tag pinning. [Refresh documentation](https://docs.kapa.ai/knowledge-sources/refreshes) specifies hourly checks for GitHub Code additions, changes, and deletions; that is a schedule, not an instant post-commit freshness guarantee.

The [hosted MCP documentation](https://docs.kapa.ai/retrieval/hosted-mcp-server) describes search across project knowledge and an optional document-reading tool. Public access uses Google/GitHub OAuth; it is not anonymous. Public and Internal servers use default retrieval, whereas API-key integrations can request deep retrieval. Document reading must be enabled explicitly.

My assessment: shortlist Kapa when managed ingestion and a hosted knowledge-search service matter more than controlling the retrieval implementation. Do not assume that its deepest retrieval mode is available through the public configuration. Confirm commercial terms, language performance, and source coverage on the intended corpus before adoption.
