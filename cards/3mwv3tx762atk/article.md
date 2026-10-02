# Branches and forks are distinct

Artifacts supports ordinary Git branches inside one repository. Creating a branch does not create another Artifacts repository.

| Branch | Fork |
| --- | --- |
| Another line of work inside the same repository | A separate repository initialized from existing history |
| Same remote URL and repository access | Own remote URL and repository tokens |
| Shares the repository lifecycle | Can be retained or deleted independently |

In an existing clone, create and publish a branch using normal Git:

```bash
git switch -c experiment
# Make changes and commit them.
git -c http.extraHeader="Authorization: Bearer $ARTIFACTS_TOKEN" push -u origin experiment
```

The push requires a write Git token. Documented tokens are scoped to a repository, with read or write access; no branch-specific token scope is documented.

Cloudflare recommends branches when collaborators share a lifecycle, and separate repositories for autonomous work that needs independent access and cleanup.

Sources: [Best practices](https://developers.cloudflare.com/artifacts/concepts/best-practices/), [Git protocol and authentication](https://developers.cloudflare.com/artifacts/api/git-protocol/), [Fork API](https://developers.cloudflare.com/artifacts/api/workers-binding/#forkname-opts).
