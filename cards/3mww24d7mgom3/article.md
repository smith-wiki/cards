The repository's architecture guide describes an account-scoped Scheduler Gatekeeper. It keeps schedules in a Durable Object and delivers workspace callbacks from an alarm. The deployment starter includes asking an agent to schedule a task among its verification steps.

This is evidence of a built-in scheduling mechanism. We have not tested it or verified whether an external harness can use it.

Sources: [architecture guide](https://github.com/cloudflare/cloudflare-os/blob/main/AGENTS.md) and [deployment starter](https://github.com/cloudflare/cloudflare-os-starter).
