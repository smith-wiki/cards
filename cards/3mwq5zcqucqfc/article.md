# Where and how to create an agent

The documented entry point is OpenAI's HTTP API, called from an application or terminal using a Platform project API key.

| Request | Result |
| --- | --- |
| `POST https://api.openai.com/v1/agents` | Saved configuration with an agent ID. |
| `POST https://api.openai.com/v1/agents/sessions` | Working session with its own ID and conversation. |

The simplest first request supplies `agent` configuration, `environment: {type: openai_hosted}`, and `input` together to the sessions endpoint. A separate saved agent is optional. To reuse one, pass `agent_id` when starting a session.

The beta HTTP contract requires `OpenAI-Beta: agents=v1` and bearer authentication. SDKs add the beta header. This is a programmatic interface; these sources do not establish a visual agent builder in Work.

[Official quickstart](https://developers.openai.com/api/docs/guides/agents-api/quickstart) | [Saved agents](https://developers.openai.com/api/docs/guides/agents-api/configuration).
