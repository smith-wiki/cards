# Cancellation must reach the execution boundary

Hatchet documents cooperative cancellation: tasks receive a signal and are expected to stop work and propagate cancellation to their dependencies. This is not an automatic hard kill of a remote runtime.

Source: [Hatchet cancellation](https://docs.hatchet.run/v1/cancellation).

OpenShell distinguishes stopping compute while retaining the workspace from deleting the sandbox. Stop waits for Stopped. Deletion ends sandbox processes and releases resources, but an accepted deletion may still be pending. AX documents deletion as tearing down the underlying sandbox, with the CLI waiting for completion.

Sources: [OpenShell lifecycle](https://docs.nvidia.com/openshell/latest/how-it-works/sandboxes/overview), [AX concepts](https://raw.githubusercontent.com/google/ax/main/docs/concepts.md).

## Proposed controller contract

Persist a stop request against a specific runtime identity, prevent retries from launching a replacement, issue the runtime stop/delete call, and report completion only after observing the terminal condition. Retrying cleanup should remain possible even when the original execution worker is gone.

A periodic reconciler or equivalent mechanism should compare desired and actual state and clean up orphaned runs. A finally block helps during orderly cancellation but cannot establish cleanup after the worker itself crashes.

Keep turn cancellation, process termination, and deletion of retained state separate. Use whole-sandbox deletion as a kill boundary only when that sandbox belongs to the run being stopped. Stopping local execution also does not reverse an external action already accepted by another service.

These are proposed integration requirements. No cancellation, crash-recovery, or isolation test was performed.
