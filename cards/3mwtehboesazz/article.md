# Cloudflare Artifacts as a black box

Artifacts stores named Git repositories and exposes their versions, lifecycle, credentials, and change notifications. Your application supplies the agent runtime and the policy for accepting its work.

| Primitive | What an application can do | Detail |
| --- | --- | --- |
| Namespace and repository | Group workspaces; retain a workspace across agent runs | [Containers](card:3mwtee4zkwllj) |
| Git object and reference | Identify an exact snapshot or follow a moving branch | [Version model](card:3mwteekbpo4ep) |
| Create, import, fork | Start empty, initialize from a public remote, or allocate an independent workspace | [Provisioning](card:3mwteepn4hv4s) |
| Repository Git token | Grant read/write access with expiry and revocation | [Credential scope](card:3mwtcvvmhztsn) |
| Direct content read | Inspect history, objects, or one file without cloning | [Interfaces](card:3mwteevajhhcn) |
| Change event | Start downstream processing when versions or repository state change | [Events](card:3mwtef2kaufrq) |
| Optional ArtifactFS client | Give filesystem tools a mounted Git working directory | [Filesystem view](card:3mwtef7gt5kum) |

## A proposed agent-task composition

1. A controller holds management credentials and creates or forks a task repository.
2. Once the repository is ready, the controller records its starting commit and issues a short-lived write Git token for that repository.
3. The agent clones or mounts the repository, edits files, creates commits, and pushes.
4. A push event starts validation or other downstream work against the event's commit hash.
5. The controller records the accepted output commit, revokes credentials, and applies its retention or deletion policy.

This is a composition of documented primitives, not an automatically managed task lifecycle. A branch shares repository credentials and lifecycle; an independent fork allows separate access and cleanup. The documented fork API has no arbitrary source-commit selector, so exact baseline selection must be handled by the client.

The present capacity bounds are [1 GB per repo and 32 MB per file/blob](card:3mwtefefoviae). They constrain the size of each workspace even when repository count is unlimited.
