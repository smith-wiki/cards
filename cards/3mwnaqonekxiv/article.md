# Proposed ingestion design for mixed-size Markdown repositories

This is an engineering proposal for the [Operator's corpus](card:3mwnaeuzebfdb), not a performed experiment or a claim that one chunk size is universally optimal.

Treat the Git file as the source document and the search chunk as a derived view. Preserve its title, heading ancestry, repository, branch or tag, indexed commit, path, and original line ranges. Keep a stable logical document identifier separate from the revision identifier.

Keep short, self-contained files whole. Split long files first at headings and paragraph boundaries. Preserve code fences, list context, and table headers where possible; when an exceptionally large block must be split, mark the continuation and keep enough structural context to interpret it. A range such as 400-1,000 tokens is only an initial experimental budget, not a discovered optimum.

Return a concise hit for discovery, then allow reading the surrounding section or complete short file. A search chunk should not become the only context the agent can ever access. A concise heading/path prefix is a low-complexity first experiment before generating additional LLM summaries for every chunk.

Run ingestion separately from the public query service. On a selected Git revision, identify added, changed, renamed, and deleted files. Use content hashes to avoid redundant embedding work, but preserve separate provenance when identical text appears in different repositories or versions. Replacing a file must remove its superseded chunks; deletion must remove its searchable content.

Publish the indexed revision and freshness status. Source links should identify the revision that supplied the quoted lines, not silently redirect a citation to unrelated later content. Test a changed passage and a deleted file explicitly before relying on automatic synchronization.
