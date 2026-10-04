Rutherford provides higher-level orchestration than a raw MCP-to-ACP bridge: delegate to one worker, query several in parallel, run a multi-round debate, review changes or request a plan.

Its agent roster is configuration-driven. A custom ACP agent needs only a launch command; for OMP, the candidate entry is:

```toml
[agents.omp]
command = ["omp", "acp"]
```

The package has a `doctor` operation that tests a real ACP round trip. I have not run that test against OMP.

Session scope matters. The architecture describes ordinary consensus calls as independent one-turn sessions, while debate keeps one session per participant across rounds and closes it afterward. This is less direct than MCACP for Hermes repeatedly continuing a particular worker conversation.

Background jobs created with `mode="async"` are in memory and clear on server restart. Separately, `persist=true` creates on-disk run records and artifacts, and `continue_job` builds on completed durable jobs. These are separate mechanisms; persisted records do not establish recovery of an in-flight worker process.

No built-in connector to arbitrary Cloudflare Durable Agents was found in the documentation reviewed.

Sources: [Rutherford README](https://github.com/chapmanjw/rutherford-mcp-server), [Architecture](https://github.com/chapmanjw/rutherford-mcp-server/blob/main/docs/architecture.md), [Adding agents](https://github.com/chapmanjw/rutherford-mcp-server/blob/main/docs/adding-an-agent.md), [Persistence configuration](https://github.com/chapmanjw/rutherford-mcp-server/blob/main/docs/configuration.md).
