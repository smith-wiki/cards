This is an integration design supported by the documented interfaces, not a deployment tested in this research.

1. Export a Durable Object class from a Worker. Choose a stable object identity for the harness; one harness may contain several conversations.
2. Adapt the Durable Object's SQLite storage to Pi Durable's portable storage interface. The Node file-based SQLite adapter is not the integration to use here.
3. Open Harness with that storage, pi-ai model access and an extension registry. The LLM is reached through an API; it does not execute inside the Durable Object.
4. Expose input and observation through your application's HTTP or WebSocket interface. Reopen stored state and resume pending work after a restart; connect scheduled wake-ups to Cloudflare's lifecycle where needed.
5. Implement API-based tools in the Worker environment. For shell commands and Linux files, supply a remote execution environment backed by a Sandbox or another machine.

Earendil explicitly describes Durable Objects as a target for its portable storage cores when an adapter is supplied. This documents portability, not a ready-made Pi Durable Cloudflare deployment.

Sources: [Pi Durable announcement](https://earendil.com/posts/pi-durable/), [storage and environment documentation](https://github.com/earendil-works/pi/blob/main/packages/durable/README.md), [Durable Objects overview](https://developers.cloudflare.com/durable-objects/), [Cloudflare execution environments](https://developers.cloudflare.com/sandbox/concepts/).
