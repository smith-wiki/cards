Update checked on October 3, 2026. Cloudflare's Pi page was updated on October 2.

The earlier proposal said a storage adapter and wake/resume wiring still needed implementation. Current documentation supplies these through `PiHarness`, imported from `agents/harness/pi`.

The adapter uses the Durable Object's SQLite database. Lifecycle jobs wake interrupted sessions. Pi Durable owns the transcript, agent loop and task recovery. Your application still configures models, tools and client transport.

`PiHarness` is beta. Pi Durable is experimental, and the API may change. This is a documentation finding; we have not tested a deployment.

Source: [Cloudflare's Pi integration](https://developers.cloudflare.com/agents/harnesses/pi/).

Related: [Cloudflare Agents investigation](https://andy.smith.wiki/3mwxivtomvn33/).
