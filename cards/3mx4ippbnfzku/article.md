Proposed experiment, not performed:

Use a disposable repository and a harmless worker task. Record the operation ID, worker session ID, acceptance evidence, workspace checkpoint, and completion-report ID.

First stop Pi before dispatch, then reopen its storage. The assignment should start once. Next stop the adapter after the ACP worker accepts a prompt but before acknowledgement is recorded. Recovery must find that work or explicitly report uncertain acceptance; it must not silently resend.

Stop Pi after a worker result is persisted but before the parent receives it. Verify result recovery and the actual delivery endpoint's deduplication behavior; Pi requestId does not establish that behavior for Hermes.

Finally stop and recreate the container during a tool call. Restore the saved workspace and session data, and check what OMP can genuinely recover. An interrupted external effect must be reconciled rather than inferred from restored files.

Also test cancellation and permission requests across reconnects, since orphaned work or duplicated approvals can defeat an otherwise correct happy path.

The experiment distinguishes orchestration persistence, protocol reconnection, worker-session recovery, and filesystem recovery. It should precede any claim that the complete integration is durable.
