# Delivery and recovery are part of the contract

Ingest an event with its native ID, store the normalized event and the resulting task mapping, then acknowledge the platform quickly. A retry with the same event or source-message-and-agent key resolves to the same run rather than starting another agent. Store an ingestion cursor or reconciliation checkpoint.

Slack documents an event ID, a three-second acknowledgment deadline, and retries after delivery failures. [Slack Events API](https://docs.slack.dev/apis/events-api/). Zulip's registered event queue has a last-event ID but is garbage-collected after a configured idle period; the client must reinitialize after expiry. [Zulip register queue](https://zulip.com/api/register-queue). Therefore recovery may require paging through message history and comparing stable message references, not relying solely on an infinite event stream. IRCv3 history is an extension and only returns messages still available on that server or bouncer. [IRCv3 chathistory](https://ircv3.net/specs/extensions/chathistory).

Outbound posting has a separate uncertainty: after a timeout, the platform might have accepted the agent's message without returning its ID. Use a platform idempotency key if available; otherwise reconcile using a stored run reference or visible marker before retrying, and surface an uncertain state if a duplicate cannot be ruled out. Do not claim universal exactly-once posting.

If the product supports edits or deletes, the adapter can surface them as versioned events. The first pilot can define whether edits to a request update an active run or require a new explicit request. This is a design choice, not assumed product behavior.
