# Three interfaces to the same repository

| Interface | Useful operations |
| --- | --- |
| REST | Repository lifecycle, Git-token lifecycle, history and direct object/file reads |
| Workers binding | Similar operations from Worker code, including log, readCommit, readTree, readBlob, and readFile |
| Git over HTTPS | Clone, fetch, and push with a repository Git token |

For a small inspection, read a file by path and branch/tag/commit through REST or the binding. For editing a workspace, use a Git client or library, create commits, and push. Diff and merge are client Git operations; the current REST/binding reference does not expose dedicated diff, merge, or file-write methods.

Git tokens authenticate Git routes, not management REST requests. See [the earlier credential distinction](card:3mwtcvvmhztsn).

Sources: [REST API](https://developers.cloudflare.com/artifacts/api/rest-api/), [Workers binding](https://developers.cloudflare.com/artifacts/api/workers-binding/), [Repositories and interfaces](https://developers.cloudflare.com/artifacts/concepts/repositories/).
