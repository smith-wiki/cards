Artifacts Git credentials consist of the repository's remote URL and a token scoped to that repository. Read tokens permit clone, fetch, and pull. Write tokens also permit push.

For a supplied URL and read token:

```bash
git -c http.extraHeader="Authorization: Bearer $READ_TOKEN" clone "$REMOTE" workspace
```

To push an existing local commit to main with a supplied write token, run this from the local repository:

```bash
git -c http.extraHeader="Authorization: Bearer $WRITE_TOKEN" push "$REMOTE" HEAD:main
```

The remote should be the exact value returned by Artifacts. Tokens expire, so a workflow must obtain a fresh token when required. A repository configured as read-only cannot be pushed to.

Clone downloads a local copy. Fork creates another server-side repository and requires the management access described in [the companion answer](card:3mwtc4r2kn73v).

An application can create or fork the repository and issue credentials for its user or agent. From this credential model, it follows that the recipient does not need a personal Cloudflare account merely to use the supplied Git URL and token.

Sources:
- [Authentication and Git commands](https://developers.cloudflare.com/artifacts/guides/authentication/)
- [Git protocol and token scopes](https://developers.cloudflare.com/artifacts/api/git-protocol/)
- [Creating repositories and retrieving remotes](https://developers.cloudflare.com/artifacts/get-started/rest-api/)
- [Read-only option](https://developers.cloudflare.com/artifacts/api/workers-binding/)
