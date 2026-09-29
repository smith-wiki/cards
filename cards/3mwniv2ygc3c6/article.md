# One write policy, with explicit freshness and failure behavior

Proposed implementation of the [evidence ownership boundary](card:3mwnitufhgf4q). This extends the [earlier write-timing discussion](card:3mwnidr7nhaed); no deployment or fault-injection test has been performed.

## Minimal write path

Accept an authorized event or explicit edit, persist its identifier and revision, then deliver the appropriate input to the memory engine. Let the engine perform its own extraction and consolidation where those functions meet the requirement. Do not build a duplicate extraction service merely to wrap an existing one.

One acceptance path means one policy and contract, not one process or one globally serialized writer. Multiple agents and workers can use it. Conflicting edits to a shared record still need version checks or scoped serialization; last arrival is not automatically the newest real-world fact.

When an application database update must trigger a separate service, [AWS's transactional outbox guidance](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html) describes persisting the update and delivery record in the same transaction. Delivery can be retried, so consumers must handle duplicates. This addresses a dual-write failure; it does not make the downstream service update atomically with the source database.

For a small implementation, a durable database job table and worker can serve this purpose. A separate message broker and full event-sourcing platform are not prerequisites. Reuse a suitable existing durable delivery mechanism instead of duplicating it.

## Define the acknowledgement

Distinguish accepted source data, completed extraction, searchable results, and completed consolidation. [Hindsight's ingestion API](https://hindsight.vectorize.io/developer/api/retain), checked September 29, 2026, illustrates the distinction: async ingestion returns an operation ID; its documented caller-supplied operation ID supports safe retries under specified conditions. Equivalent behavior must be checked rather than assumed for another engine.

An important correction should be immediately available through an authoritative direct read or current-request context, and stale derived claims should be suppressed when their lineage is known. When that guarantee cannot be met, report the pending state rather than implying that every reader already sees the correction.

I would treat permission revocation and deletion as control operations, not ordinary text to be interpreted later by the extractor. Restrict affected reads while downstream removal is incomplete, and distinguish immediate access blocking from completed physical deletion under the retention policy. A backup or replay path must not silently restore removed data.
