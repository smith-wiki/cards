# No visitor login, but explicit isolation

This is a proposed boundary for the public LibreChat-backed chat, not a claim that the required controls already exist in the proposed gateway.

## Guest sessions

I would issue an opaque, server-generated guest-session cookie with Secure, HttpOnly, and an appropriate SameSite policy. Keep a server-side mapping from that session to its conversations, with expiration. Check ownership for every read, write, continuation, cancellation, attachment, and stream-resumption operation. A client-supplied conversation ID is not authorization.

The visitor sees no registration or login flow. Clearing the cookie may lose access to earlier conversations unless the application provides a separate recovery mechanism. No-login access is not a promise that operators or model providers receive no data.

## The shared-identity trap

[LibreChat's memory documentation](https://www.librechat.ai/docs/features/memory) says saved Agents use the user's personal memory pool unless configured for a per-user, per-agent partition. Neither description establishes isolation between multiple anonymous visitors represented by the same upstream user and agent.

My inference is that a new guest cookie and a separate visible transcript cannot by themselves establish isolation throughout the agent runtime. Check persistent memory, tool credentials, uploaded files, retrieval scope, and workspaces as well. I would disable personal memory and stateful execution for the first pilot and expose only approved public data and narrowly scoped read-only tools.

Use a dedicated least-privilege upstream identity or deployment, not the Operator's administrator account. Do not auto-login every visitor to a shared LibreChat browser account. Do not expose the upstream API key or a general-purpose authenticated proxy to the browser.

## Abuse controls

I would enforce per-session and per-IP request limits, concurrency limits, maximum context and output sizes, agent-step limits, timeouts, and an application-wide spending cutoff. Session cookies and IP limits alone do not stop an attacker from acquiring new sessions. Challenge suspicious traffic when needed, and keep the public route narrow: the server chooses the allowed agent and capabilities.

## Proposed acceptance test

Open two clean browser profiles. Verify that neither can read, continue, cancel, attach to, or resume the other's conversation, and that no memory, files, or tool state cross the boundary. Test budget exhaustion and concurrent requests as well. These checks have not been run.
