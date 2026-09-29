# A small public backend needs explicit run lifecycle behavior

This is a proposed implementation and test scope. None of these tests has been performed.

## Stream and run are different objects

Use the chosen SDK's supported stream protocol rather than inventing a separate wire format without need. The frontend needs text updates and, when relevant, tool status, a completion event, and a safe error message.

For each generation, create a run record associated with the owning session and conversation. Track active and terminal states and distinguish a cancellation request from confirmed local termination. Attach a scoped request identity and use a uniqueness check before starting work so a double-click or routine network retry does not automatically create another paid run.

This is not an exactly-once guarantee for external side effects. An upstream timeout can leave execution ambiguous. Do not blindly repeat actions after such a failure.

For the first version I propose one active run per conversation. On an explicit Stop action, and on a detected disconnect under the selected policy, request cancellation from the model call and tools and prevent additional agent steps. Apply an execution deadline independently of disconnect detection. Do not claim that closing a browser instantly stops all remote work or reverses its charges.

Persist the final result and terminal state, including interrupted/error states and available usage information. Add a policy to reconcile stale runs after a process failure instead of leaving them permanently marked active.

## Reconnection is an optional next layer

[assistant-ui's resumable-stream documentation](https://www.assistant-ui.com/docs/guides/resumable-streams) describes persisting encoded bytes for client reconnection and notes the need for storage and owner checks on resume routes. I would defer this for a short-response pilot.

My architectural distinction is that replaying recorded output does not itself restart model/tool execution after a worker dies. Requiring tasks to survive deployment, lengthy user approvals, or process failure introduces durable execution and recovery work beyond ordinary HTTP streaming.

## Operations and proposed release checks

Keep structured metadata for request/run ID, agent version, latency, model/tool usage, errors, and quota decisions. Avoid logging raw credentials or guest transcripts by default; define storage and log retention. [OWASP AI Agent Security guidance](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html) recommends monitoring, data protection, and adversarial validation.

Before opening this service, I would test:

- Two separate browser sessions cannot read, continue, cancel, delete, or later resume each other's work.
- A repeated request identity does not start an independent duplicate run.
- Concurrent requests cannot bypass shared admission limits.
- Stop, upstream timeout, tool error, disconnect, and process restart leave intelligible states and conservative usage accounting.
- Forged system instructions, model choices, tool results, tool definitions, and arbitrary upstream URLs are rejected as privileged configuration.

These are proposed acceptance criteria, not evidence of a completed security assessment.
