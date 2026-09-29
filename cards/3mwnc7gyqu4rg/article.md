# Include update correctness and reading in the comparison

These are proposed implementation checks for the [reference](card:3mwnc2epckwai), not claims about an already built system.

A changed file may become shorter or produce different chunk boundaries. Replacing current chunks must also remove obsolete ones; deleting or renaming a file must reconcile the index. Merely appending newly generated chunks is not the intended behavior.

Track the last successfully indexed state per repository and branch. After a failed or skipped job, compute the required changes from that state rather than assuming the previous push was indexed. Make retries repeatable without duplicates and prevent a slow older job from publishing over a newer successful one.

For document reading, preserve a source identifier and indexed revision, and read that same revision. Search excerpts alone do not fulfill the existing requirement to read documents. Source text could be held in storage or read from a version-pinned repository source; the storage choice is not decided here.

Include basic monitoring, query/output bounds, abuse controls, and spending limits in operating effort. Open audience access does not require exposing administrative writes or permitting unbounded resource use.

These checks should apply to both the custom reference and managed candidates. A push trigger specifies when indexing starts, not a guarantee of immediate searchable completion.
