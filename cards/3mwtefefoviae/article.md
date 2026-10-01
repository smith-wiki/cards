# Current capacity bounds

The documented limits checked on October 1, 2026 are:

- Repository storage: 1 GB.
- Individual file/blob: 32 MB.
- Total account storage: 1 TB; increases can be requested.
- Repository and namespace counts: unlimited.
- Control-plane requests: 2,000 per 10 seconds per namespace.
- Git requests: 2,000 per 10 seconds per repository.

An architecture can use many bounded workspaces, but must account for the repository and blob limits. Large-file or large-dataset designs need a separate capacity plan.

Source: [Artifacts limits](https://developers.cloudflare.com/artifacts/platform/limits/).
