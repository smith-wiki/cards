# Agents API in the existing fleet architecture

Yesterday's [controller boundary](card:3mwnsf6eqcfb6) keeps human work in discussions and optional GitHub Issues. The controller records technical delivery, runs, cancellation, and reply routing. This remains the proposed boundary.

| Component | Proposed mapping |
| --- | --- |
| Communication bus | Keep its replaceable driver and thread identities. |
| Controller | Translate authorized events to agent input and agent events to replies. |
| Agent harness | Native CLI/ACP launcher for existing agents; a separate Agents API driver for managed Codex sessions. |
| Compute provider | AX or another environment provider, independently selected where supported. |
| Reusable knowledge | Keep repository evidence and agent memory distinct, as in [the state model](card:3mwnoivgp2ngw). |

OpenAI hosts the harness; self-hosted execution runs its executor. Proposed refinement: distinguish the harness driver from the environment provider within the existing adapter. This does not require another resident service.

Running the executor in an AX Task is an integration to test, not a verified connector. See [the earlier launcher design](card:3mwo4f4q4ma7r).

[Official architecture](https://developers.openai.com/api/docs/guides/agents-api/architecture) | [Self-hosted executor](https://developers.openai.com/api/docs/guides/agents-api/environments/self-hosted).
