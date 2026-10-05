There are two proposed placements, not a decision to replace Hermes.

With Pi as the orchestrator, the chat reaches a Pi conversation whose model sees only delegation and control tools. Application tasks drive external workers. On Cloudflare, PiHarness supplies Pi's storage and wake-up integration; the worker adapter remains application code.

With Hermes as the orchestrator, Hermes calls an agent-control service through MCP or a native tool. That service can use durable tasks and records to submit, monitor, cancel, and report external jobs. Waiting and status checks should be ordinary code, not another planning LLM. Using Pi for that service is possible composition, not a documented ready-made Hermes backend.

The second design does not checkpoint Hermes' own model/tool loop. Returning a completed job to the right Hermes conversation, and resuming an interrupted Hermes turn, remain separate integration responsibilities. I would not add a second autonomous planner merely to gain persistence.

Related: [earlier Hermes control-surface proposal](card:3mx2tht3nwx2o).

Sources: [Pi Durable task and conversation API](https://github.com/earendil-works/pi/blob/main/packages/durable/README.md), [Cloudflare PiHarness](https://developers.cloudflare.com/agents/harnesses/pi/).
