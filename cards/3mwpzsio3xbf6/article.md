# A useful credential boundary, with remaining work

OpenAI explicitly keeps the application API key outside the environment. The executor receives an environment key that agent-generated code can read; it permits environment connections rather than other API operations.

For third-party access in self-hosted environments, a trusted proxy or server must keep credentials outside agent-readable compute. That infrastructure is application-owned. Injecting a secret from a secret manager into the environment still exposes it.

This matches [the earlier AX analysis](card:3mwnyyt7y7cdk): delegate limited authority instead of handing the agent master keys. The broker must enforce allowed operations and resources.

[Official sandbox security guide](https://developers.openai.com/api/docs/guides/agents-api/environments/security).
