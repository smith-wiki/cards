# Guest identity and conversation state

This is a proposed application design, not an implemented authentication system.

## Guest access

Use the web framework's session facilities, an opaque server-issued identifier, HTTPS, and a Secure/HttpOnly cookie with an appropriate SameSite policy. Bind every conversation to the guest session and expire both under an explicit retention policy. This gives a no-login experience; it does not identify a unique human. Losing the session cookie can mean losing access to previous conversations.

[OWASP's Session Management guidance](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) explicitly covers sessions for anonymous visitors and recommends server-side session state and protected cookies. Apply origin/CSRF protections appropriate to the deployment as well; do not treat CORS as abuse prevention.

For every read, message, cancellation, deletion, and later stream-resumption operation, look up the requested object within the session's authorized scope. [OWASP's IDOR guidance](https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html) says complex object identifiers do not replace object-level access checks.

## Suggested stored entities

These are logical records, not separate services:

- Guest session: expiry and its scope of access.
- Conversation: owning session and the chosen agent configuration/version.
- Message: structured content, including applicable tool-call/result associations.
- Run: request identity, status, usage accounting, and timestamps.
- Quota accounting: consumed and reserved capacity for the chosen limits.

For the public endpoint, accept the new visitor message and request identity, then load the trusted conversation history on the server. Persist assistant and tool outputs from the backend, not by trusting the browser to post authoritative replacements.

Keep conversation history distinct from cross-session agent memory. I would omit personal long-term memory for the first public version. A shared read-only public knowledge source is different from a memory store into which guests can write.

## Small API surface

Illustrative endpoints are session initialization, conversation creation, posting a message with a streamed response, reading conversation history, cancelling a run, and deleting a conversation. Session initialization can happen lazily on the first request. This is a design sketch, not a published API contract.

Storage may be simplified to short-lived context if the product does not need durable history. The resulting experience must explicitly accept loss of history on expiry; do not imply account-style recovery or cross-device access.
