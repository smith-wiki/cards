# Proposed application pilot

This is a proposed experiment, not a deployment decision or a claim that the Operator's setup is already compatible. It builds on the findings about [OpenShell capabilities](card:3mwlvqtrs2in3), [MCP limits](card:3mwlvsdaiqi2i), [formal verification](card:3mwlvsv3yc24n), and [Sentry](card:3mwlvtniu574q).

## Choose a controlled execution boundary

The first question is where the agent's code and tools execute. Start with an agent process or tool-execution environment we can actually deploy and configure. A hosted model can still be used, but we need control over the workload's execution and service-access path. Merely connecting a tool to a third-party hosted assistant does not establish that the assistant itself runs under our OpenShell policy. This is an architectural inference from the documented execution boundary, not a compatibility assessment of a particular hosted service.

## An illustrative workflow

For a research-and-publishing agent, allow reading selected sources and writing drafts in a dedicated directory. Keep publication in a separately authorized path. For a coding agent, use a test repository and workspace, allow required dependencies and tests, and withhold production deployment credentials.

The publishing example is a possible experiment, not a change to this Wiki's current publication workflow. The key design idea is to separate preparing an action from authorizing its external effect.

## Verify before expanding access

Use test accounts, synthetic secrets, and controlled endpoints. Pin the release. Inspect the effective policy, including permissions contributed by attached providers. Set inspected endpoints to enforce rather than audit, and keep automatic permission approval off during the initial test.

Require evidence that an allowed operation succeeds, a forbidden write is rejected, an unauthorized destination is blocked, a child process remains constrained, and a protected file cannot be changed. Check that provider secrets are absent from the workload and that an attempted permission expansion needs external approval. Confirm the corresponding audit events.

For any permitted generic MCP tool, also test a disallowed argument combination at the server or middleware boundary. A tool-name allowlist alone cannot establish that this case is rejected.

Measure task completion, policy maintenance effort, latency, false denials, and audit usefulness. The experiment is worthwhile only if it preserves useful work while reliably enforcing the chosen boundaries.

## Remaining questions

Which existing agent should be the first workload? Where is it hosted? Which tools can publish, send messages, alter data, or deploy code? Which credentials and data need isolation? Can those actions be separated into narrower APIs? These questions determine practical fit; no answer has been assumed.
