# What Cloudflare Basin is

Cloudflare Basin is the new name for Cloudflare Data Platform. It became generally available on October 1, 2026.

The simplest mental model is a managed, serverless analytics stack built around R2 and Apache Iceberg:

1. **Basin Pipelines** receives events from HTTP endpoints, Workers bindings, or Cloudflare Logpush. It can validate, filter, reshape, and transform the events with SQL.
2. **Basin Catalog** stores and manages the metadata for Apache Iceberg tables in R2. It also performs maintenance such as compaction, snapshot expiration, and manifest optimization.
3. **Basin SQL** is a serverless distributed query engine that reads those Iceberg tables for analytical SQL queries.

The data flow is therefore:

```
apps / devices / logs / Workers
              |
              v
       Basin Pipelines
      ingest + transform
              |
              v
       R2 + Iceberg tables
              |
       Basin Catalog
              |
      +-------+-------+
      |               |
      v               v
 Basin SQL      external engines
                DuckDB / Spark /
                Snowflake / PyIceberg
```

## Why it exists

The main problem Basin removes is the infrastructure normally needed between "my application produces events" and "I can run analytical SQL over those events."

Without a service like Basin, a team may need separate systems for durable event ingestion, stream transformations, object storage, table metadata and maintenance, and distributed query compute. Basin combines those functions into Cloudflare's Developer Platform.

Cloudflare also deliberately uses Apache Iceberg instead of a proprietary table format. That matters because the same tables can be accessed by compatible external engines. The data is therefore less tied to Basin SQL itself.

R2 is the storage layer, and Cloudflare positions its lack of egress charges as another part of this portability story: data can be queried by tools outside Cloudflare without the usual R2 data-transfer charge.

## What it is not

Basin SQL is a read-only analytics query engine. It does not support INSERT, UPDATE, DELETE, CREATE, DROP, or ALTER. Cloudflare explicitly describes it as a query engine rather than a database.

So Basin is not a replacement for D1, PostgreSQL, Durable Objects, or another transactional store used as the live state of an application. It is closer to a serverless lakehouse for logs, events, telemetry, clickstreams, BI data, and other analytical workloads.

## Sources

- Cloudflare changelog: https://developers.cloudflare.com/changelog/post/2026-10-01-basin-ga/
- Basin overview: https://developers.cloudflare.com/basin/
- Cloudflare launch article: https://blog.cloudflare.com/cloudflare-basin/
- Basin SQL limitations: https://developers.cloudflare.com/basin-sql/reference/limitations-best-practices/
