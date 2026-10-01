# Change notifications and execution

Account-level events describe repository creation, deletion, fork, and import. Repository-level events include push, clone, fetch, and token creation or revocation. Push data identifies changed references and their before/after commits.

Event subscriptions can deliver messages to Cloudflare Queues. A queue consumer can be a Worker or an HTTP pull consumer outside Cloudflare. The build/deploy guide also documents a pushed-event trigger targeting a Workflow.

This composes storage with execution: Artifacts records versions and changes; a separate consumer or Workflow supplies validation, indexing, builds, deployment, or the next agent run. Queue consumers should tolerate repeated delivery under Queues' at-least-once model.

Sources: [Artifacts event subscriptions](https://developers.cloudflare.com/artifacts/guides/event-subscriptions/), [Queues event subscriptions](https://developers.cloudflare.com/queues/event-subscriptions/), [Queues delivery guarantees](https://developers.cloudflare.com/queues/reference/delivery-guarantees/), [CI on push](https://developers.cloudflare.com/artifacts/guides/build-and-deploy-on-push/).
