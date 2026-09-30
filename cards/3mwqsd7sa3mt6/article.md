# Historical OMP session import

OpenViking includes openviking-server ingest for historical agent logs. The tool parses existing local conversations and replays them through the same create-session, add-message, commit pipeline used by live integrations. It can also watch supported local logs for new sessions.

The current documentation lists Claude Code, Codex, WorkBuddy, OpenCode, MiMo, Hermes, and OpenClaw sources. It does not list pi or OMP.

For OMP I would therefore extend the log ingester with an OMP source parser, or feed our backend-neutral reconstructed OMP SessionEnvelope into the OpenViking Session API. The latter remains straightforward because OpenViking accepts explicit session IDs and message additions before commit.

The important advantage over a backend-specific importer is that historical sessions then pass through exactly the same memory extraction pipeline as live OpenViking sessions.

Sources:
- https://docs.openviking.ai/en/agent-integrations/09-log-ingestion
- https://docs.openviking.ai/en/api/05-sessions
