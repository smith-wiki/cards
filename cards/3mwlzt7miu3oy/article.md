# Windmill as a ready operational wrapper

Windmill generates webhook endpoints for scripts and flows. An asynchronous invocation returns a job UUID, which can be used to retrieve execution status and results. The Runs view records inputs, outcomes, and job controls, including cancellation.

Sources: [webhooks](https://www.windmill.dev/docs/core_concepts/webhooks), [job runs](https://www.windmill.dev/docs/core_concepts/monitor_past_and_future_runs).

For the Operator's setup, the proposed scripts would implement launch, input delivery, and stop using the selected runtime's SDK or CLI. Existing communication interfaces would call these endpoints, directly or through authenticated event adapters. Windmill's own interface would be operational, not a replacement place to chat with agents.

This route reduces the amount of job-management infrastructure to write, but it does not remove the runtime-specific adapter. Cancelling a Windmill job that launched a remote sandbox must not be assumed to delete that sandbox; the stop path needs an explicit runtime operation and confirmation.

Windmill supports self-hosting. Its named concurrency-limit feature, however, is documented for Cloud plans and self-hosted Enterprise. That matters if the desired design relies on per-agent or per-conversation serialization rather than implementing that constraint elsewhere.

Sources: [self-hosting](https://www.windmill.dev/docs/advanced/self_host), [concurrency limits](https://www.windmill.dev/docs/core_concepts/concurrency_limits).

This is a candidate implementation path based on documentation, not a deployed integration.
