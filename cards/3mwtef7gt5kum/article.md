# A filesystem view for agents

ArtifactFS takes a Git remote, credentials, a branch/ref, and a mount location. It provides a working directory without waiting for a full ordinary clone; file reads hydrate content and use a local cache. Lazy fetching depends on remote support for partial-clone filtering.

The client supports file creation, modification, deletion, and ordinary Git staging, commits, and push. Local writes do not themselves publish a remote version: commit and push remain the publication steps.

ArtifactFS is a separate, optional client requiring FUSE on its host. It can also work with Git remotes other than Artifacts.

Sources: [ArtifactFS guide](https://developers.cloudflare.com/artifacts/guides/artifact-fs/), [Official ArtifactFS repository](https://github.com/cloudflare/artifact-fs).
