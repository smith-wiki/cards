## If the source repository is on GitHub

The checked CI example listens for pushes to Cloudflare Artifacts. Its event filter names an Artifacts namespace and repository, not a GitHub repository.

Artifacts documents importing a public HTTPS Git repository, including GitHub. The import creates an Artifacts repository with its own remote and token. This establishes a copy; the documented import flow does not register an ongoing subscription to GitHub pushes.

To keep GitHub as the primary repository, I propose adding a separate synchronization step that pushes each selected GitHub commit into the Artifacts copy. The existing CI example would then run on the resulting Artifacts push. This synchronization step is additional work; I have not implemented or tested it.

A direct GitHub integration would also need source access and event handling. The August 4 launch post lists triggers for other version control systems as future work. I found no ready-made direct GitHub hookup in the checked README and Artifacts setup guide. This is an observation about these sources, not a claim that a custom integration is impossible.

Sources: [current CI example setup](https://github.com/cloudflare/ci/blob/main/examples/cloudflare-artifacts/README.md), [public repository import](https://developers.cloudflare.com/artifacts/guides/import-repositories/), [CI launch and roadmap](https://blog.cloudflare.com/ci-workflows/).
