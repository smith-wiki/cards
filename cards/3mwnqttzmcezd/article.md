# Agent Server as an integrated run service

LangSmith Agent Server is closer to a ready agent run API than a generic workflow engine. It has Assistant configurations, Threads, Runs, Cron jobs, a durable task queue, checkpoint and store persistence, streaming, and run cancellation. Its server and queue workers can be split. [Agent Server architecture](https://docs.langchain.com/langsmith/agent-server).

A standalone server runs on one's own infrastructure, with PostgreSQL and Redis plus LangSmith API and license keys. Its documentation recommends Kubernetes for production; license verification requires network egress unless using an air-gapped arrangement. This differs from using the open-source LangGraph library alone. [Standalone deployment](https://docs.langchain.com/langsmith/deploy-standalone-server).

For our communication contract, an adapter would map a discussion and task to an Assistant/Thread/Run, create or continue runs, and publish results back to people. Agent Server does not itself define the human team's agent assignment and budgets or prove that an arbitrary external sandbox has stopped. It is a candidate if the chosen agent loop fits its hosted run model; no pilot has been done.
