# Containers and workspaces

A namespace groups repositories with names unique within that namespace. It is useful for environments, tenants, or groups of jobs. Optional `eu` or `us` jurisdiction applies to all repositories in the namespace and cannot be changed after creation.

A repository is the durable workspace: a Git remote with its own version history, references, credentials, and lifecycle. An agent can terminate and another process can resume from the stored version.

Namespace grouping does not establish a documented repository-level restriction for the account REST token. Git credentials provide explicit repository scope; see [the token scope finding](card:3mwtcvvmhztsn).

Sources: [Repositories](https://developers.cloudflare.com/artifacts/concepts/repositories/), [Data localization](https://developers.cloudflare.com/artifacts/guides/data-localization/).
