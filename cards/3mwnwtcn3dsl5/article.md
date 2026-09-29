# Specification: Git repository to Qdrant synchronization Action

## Goal

Build a small reusable GitHub Action that keeps the Markdown files in a repository synchronized with a Qdrant collection after every push.

The Action is an indexing primitive, not a RAG framework. It should be easy to add to an existing repository with a few workflow lines and should require no persistent local machine or separate state database.

## Core workflow

On every push:

1. Determine the previous successfully indexed Git revision and the new revision.
2. Identify added, modified, renamed, and deleted Markdown files.
3. For added or modified files, parse and chunk the current file contents.
4. Produce stable source metadata for every chunk.
5. Upsert the new chunk set into Qdrant.
6. Remove stale chunks belonging to deleted, renamed, or replaced files.
7. Record the successfully indexed revision only after the update completes.

The Action must be safe to retry and must not leave duplicate chunks after repeated execution.

## Intended CI usage

The primary interface is a GitHub Action:

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0

- uses: <owner>/<action>@v1
  with:
    qdrant-url: ${{ secrets.QDRANT_URL }}
    qdrant-api-key: ${{ secrets.QDRANT_API_KEY }}
    collection: docs
    repository: ${{ github.repository }}
```

Additional configuration should stay optional. A repository with ordinary Markdown files should work with sensible defaults.

A thin CLI may exist underneath the Action for testing and reuse, but the GitHub Action is the primary product surface.

## File selection

Default:

- include `**/*.md`
- optionally support `**/*.mdx`
- ignore common generated and dependency directories such as `.git`, `node_modules`, build output, and vendor directories

Support explicit include and exclude globs.

Do not crawl remote repositories. The Action operates on the already checked-out repository.

## Chunking

Use a pluggable chunker, with a simple Markdown-aware implementation as the default.

The initial implementation may use Chonkie.

Default behavior:

- preserve Markdown heading boundaries where practical
- attach the heading breadcrumb to each chunk
- keep short documents or sections intact when they fit the configured token budget
- split oversized sections by token budget
- preserve fenced code blocks where practical
- avoid semantic or LLM-based chunking in the initial version

Chunking must be deterministic for the same file contents and configuration.

## Stable identity

Every indexed chunk must have a deterministic point identifier derived from stable source properties.

Recommended identity inputs:

- repository identifier
- branch or configured source scope
- file path
- chunk identity within the file
- chunking configuration version

Do not use random UUIDs for normal indexing.

The design must allow all points for one source file to be found and deleted efficiently.

## Required payload metadata

Store at least:

- repository
- branch or source scope
- path
- commit SHA
- document title if available
- heading breadcrumb
- chunk ordinal or stable chunk key
- raw chunk text
- source URL if it can be constructed deterministically
- indexer version
- chunking configuration version

Metadata should be sufficient for the search backend to return a result with a traceable source and later read the corresponding document.

## Qdrant writes

The Action should support a pre-existing Qdrant collection.

Do not make collection lifecycle management a core responsibility in the first version.

Support either:

1. client-side embeddings supplied by a configured provider, or
2. Qdrant Cloud Inference when available.

Prefer the second path for the smallest deployment when it satisfies the selected embedding model requirements.

The Action should not contain retrieval, reranking, MCP serving, or answer generation.

## Incremental synchronization

The Action should use Git history rather than an external state database whenever possible.

For a normal push, use the pushed before/after revisions to determine the delta.

Handle:

- added files
- modified files
- deleted files
- renamed files

For a modified file, replacement semantics are preferred:

1. generate the complete new chunk set
2. upsert the new set
3. delete points from the previous version that are no longer present

A renamed file must not leave vectors under the old path.

A deleted file must remove all of its indexed points.

## Recovery and full reindex

Provide a full-reindex mode for:

- first installation
- missing or unavailable Git history
- embedding-model migration
- chunking-strategy migration
- index corruption or manual recovery

Example conceptual input:

```yaml
with:
  full-reindex: true
```

A full reindex should produce the same logical result as indexing the repository from scratch.

## Concurrency and correctness

Two overlapping pushes must not let an older run overwrite a newer successfully indexed state.

Use Git revision metadata and CI concurrency controls where appropriate.

A failed run must not claim that its revision was successfully indexed.

Retries must be idempotent.

## Security

The Action receives write credentials only for the Qdrant scope it needs.

Do not expose Qdrant credentials to pull requests from untrusted forks.

Do not execute content found inside Markdown files.

Treat repository text as data.

If one shared collection is used for multiple repositories, every point written by the Action must carry the repository namespace in payload metadata.

## Observability

Emit a concise CI summary containing:

- source revision
- number of files added, modified, renamed, and deleted
- number of chunks inserted or updated
- number of stale chunks deleted
- total indexing duration
- whether the run was incremental or full

Failures should identify the file and pipeline stage involved without printing secrets.

## Non-goals for v1

Do not include:

- search API
- MCP server
- answer generation
- reranking
- graph construction
- document OCR
- PDF or Office parsing
- agent memory
- web crawling
- scheduled synchronization
- persistent orchestration service
- mandatory state database
- automatic collection sharding or cluster administration

These can be separate systems or later extensions.

## Acceptance criteria

The first version is complete when:

1. A repository can add the Action with a small workflow file.
2. The first run indexes all selected Markdown files into Qdrant.
3. Editing one Markdown file only reprocesses the affected source file.
4. Deleting a file removes its old points.
5. Renaming a file does not leave points under the old path.
6. Re-running the same revision produces no duplicates.
7. A failed run can be retried safely.
8. A full reindex reproduces the expected collection state.
9. Search results can identify repository, path, heading, and indexed commit from payload metadata.
10. No external state service is required for the normal GitHub Actions path.

## Design principle

Keep the component deliberately narrow: **Git state in, synchronized Qdrant points out**.

If a feature is primarily about retrieval, ranking, serving, answering, or publishing, it belongs outside this Action.
