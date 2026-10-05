Proposed remote-worker recovery contract, not an implemented adapter:

Persist an operation ID and delegation intent before dispatch. Keep the worker identity, ACP session ID, workspace/checkpoint reference, status, and final result alongside that operation. A resumed Pi task should first reconcile this record with the worker, rather than submit the same assignment as new work.

The difficult case is a crash after the worker accepts a prompt but before the caller stores the acknowledgement. A bridge-side record cannot by itself close that gap. Even a bridge that deduplicates incoming requests still needs a recovery policy at its own ACP boundary. The worker must support deduplicated admission, provide recoverable evidence of acceptance, or leave the operation explicitly uncertain. Replaying a whole coding task is not equivalent to reattaching to a running task.

One possible state machine is prepared, dispatching, running, awaiting_permission, completed, or uncertain. These are proposed application states, not Pi or ACP method names. Serialize submissions to the same worker session unless its negotiated capabilities explicitly allow more, and prevent old and new controllers from issuing conflicting work.

ACP v1 defines conversation loading and progress notifications, not a blanket guarantee that an arbitrary external command executes exactly once. Pi's requestId deduplicates admission to a Pi conversation; it is not automatically an idempotency key understood by OMP.

Sources: [ACP v1 session setup](https://github.com/agentclientprotocol/agent-client-protocol/blob/main/docs/protocol/v1/session-setup.mdx), [ACP v1 overview](https://github.com/agentclientprotocol/agent-client-protocol/blob/main/docs/protocol/v1/overview.mdx), [Pi Durable README](https://github.com/earendil-works/pi/blob/main/packages/durable/README.md).
