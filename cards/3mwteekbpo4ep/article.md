# Addressing versions

A blob holds file content. A tree associates names and modes with blobs or nested trees. A commit identifies a root tree, parent commits, and metadata. A branch is a reference to a commit and can advance as work is published.

Store a commit hash when a task must refer to an exact version. Store a branch name when it should follow subsequent updates. A commit hash identifies content; it does not promise retention after repository deletion.

These are standard Git concepts exposed by Artifacts, not a separate Cloudflare version model.

Sources: [Git objects](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects), [Git references](https://git-scm.com/book/en/v2/Git-Internals-Git-References), [Artifacts REST content routes](https://developers.cloudflare.com/artifacts/api/rest-api/).
