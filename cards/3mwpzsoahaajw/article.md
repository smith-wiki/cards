# The private-state constraint

The Operator's [memory requirement](card:3mwo2e7v2qwlj) excludes sending private project details to a vendor cloud.

Agents API self-hosting places command execution and files on chosen compute. The harness remains hosted by OpenAI, and the API retains session state. It currently supports only US data residency and does not support Zero Data Retention, even with a self-hosted sandbox.

Inference from this flow: private contents returned to the model by tools cross the cloud boundary. This backend does not satisfy the stated private-state requirement. Its architectural separation of session and compute can still inform the self-hosted fleet design.

[Architecture](https://developers.openai.com/api/docs/guides/agents-api/architecture) | [Data limits in overview](https://developers.openai.com/api/docs/guides/agents-api/overview).
