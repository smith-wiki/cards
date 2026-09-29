# Public access belongs to your application

Checked September 29, 2026. This clarifies the [earlier proposal](https://cards.smith.wiki/3mwnda35ei7u4/); it is not a deployed or tested integration.

LibreChat documents authenticated agent inference using an API key or configured OIDC. Its own chat interface has no guest mode. Sources: [Agents API](https://www.librechat.ai/docs/features/agents_api) and [Authentication](https://www.librechat.ai/docs/features/authentication).

The proposed path is:

`Visitor -> your public frontend -> your server-side gateway -> authenticated LibreChat Agents API`

The gateway can be a backend route in the frontend application's deployment; it need not be a separately deployed service. It should choose the permitted agent, retain credentials on the server, issue guest sessions, check conversation ownership, and enforce per-session and per-IP limits plus aggregate budget and concurrency limits. Do not expose a general-purpose authenticated proxy.

The user-facing experience can therefore have no registration or login, while the upstream API remains authenticated. Building only a browser frontend is not the proposed solution. Guest-session quotas are application responsibilities, not a promise that LibreChat automatically distinguishes visitors behind one upstream account.

Keep shared personal memory disabled for the initial pilot and verify isolation beyond visible transcripts; see the [existing isolation proposal](https://cards.smith.wiki/3mwndc4eky7yt/).
