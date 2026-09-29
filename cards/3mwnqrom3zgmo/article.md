# Durable execution engines as the controller's core

Both are self-hostable candidates for a trusted worker behind the provisional communication adapter. They execute code we write; neither is a ready-made organizational agent team or a prompt protocol.

**Hatchet v1** records tasks and their runs, supports event triggers, durable waits correlated to a run, child tasks, retries, concurrency limits, and run cancellation. Its documented self-host setup can use PostgreSQL alone for simple workloads, and the project is MIT licensed. A follow-up from chat can be translated into a correlated event. Hatchet's comparison guide states that Temporal-style synchronous validated Updates do not have an equivalent; they need an event plus application logic. [Overview](https://docs.hatchet.run/v1), [Hatchet's Temporal migration guide](https://docs.hatchet.run/v1/from-temporal-to-hatchet).

**Temporal** preserves Workflow history, waits for Signals or Updates, and executes external calls in Activities with retry and cancellation semantics. Self-hosting adds a Temporal Service and persistence/visibility infrastructure. Activity cancellation reaches the worker when it heartbeats; the worker must still stop a launched agent or sandbox. [Activity execution and cancellation](https://docs.temporal.io/activity-execution), [self-hosting](https://docs.temporal.io/self-hosted-guide).

For either engine, our code must define agent configurations, authorize requests from the human space, map discussion/task/session/run/runtime IDs, launch a runtime, deliver a prompt to its agent protocol, report artifacts, and reconcile an uncertain external stop or write. Hatchet's PostgreSQL-only simple setup suggests a smaller operating footprint; Temporal's Signals, Queries, and Updates offer more ways to address a live workflow. This is a documentation-based architectural comparison, not a benchmark or pilot.

Windmill is a broader script-and-flow operational interface; Restate and DBOS are additional durable execution candidates. Their licensing and deployment tradeoffs merit comparison if neither Hatchet nor Temporal fits the actual run model.
