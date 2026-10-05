Cloudflare documents immutable, point-in-time filesystem snapshots. They are supported under the durable_object scheduling policy and tied to the image version. A restored container starts processes again; it does not continue their old memory state.

For an OMP worker, preserve both the repository workspace and the agent's persisted session data. A repository checkout alone is not the conversation. Changes after the last saved snapshot are not included in that snapshot.

The orchestration record should reference the worker checkpoint it can actually restore. If a tool changed an external system after that checkpoint, restoring the files does not undo or establish the outcome of that action. Reconcile it before deciding whether to retry.

Source: [Cloudflare snapshots](https://developers.cloudflare.com/containers/guides/snapshots/). The worker checkpoint and reconciliation rules above are proposed application responsibilities, not an automatic Pi/OMP integration.
