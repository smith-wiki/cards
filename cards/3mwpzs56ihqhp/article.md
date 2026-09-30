# Persistent session, sleeping compute

The Operator's [multi-turn requirement](card:3mwo4dqecqpvd) separates logical session from running process. Agents API supports continuing a session after its environment stops.

For this backend, a proposed controller path is: deliver input to the saved session; handle an `environment_connection` request by starting or resuming compute; connect the executor; collect the outcome; coordinate shutdown with incoming work.

File persistence, startup deduplication, and safe shutdown remain application responsibilities. An idle event alone is insufficient; a killed command is not automatically restarted.

A message to an idle session starts a turn. A message during an active turn steers that turn. The bus adapter must distinguish follow-up steering from a separately queued job.

[Lifecycle](https://developers.openai.com/api/docs/guides/agents-api/environments/lifecycle) | [Sessions and turns](https://developers.openai.com/api/docs/guides/agents-api/sessions).
