# Onboarding an agent as a participant

Separate three identities:

1. **Agent identity**: the stable name and role recorded in the chosen native profile and deployment configuration.
2. **Communication identity**: a distinct bot or service account that appears as the sender in rooms and threads.
3. **Execution authority**: the secret, tool credentials, and sandbox rights used by the runtime. A chat account does not grant GitHub write permission, and an AX Task is not itself a chat account.

An onboarding operation should create or register the communication identity, grant only the intended rooms, store its secret in the infrastructure's secret manager, bind it to the native agent profile and runner, then verify that a mention reaches the right agent and a reply is attributed to its account. Revocation should disable the chat identity and runtime credentials. This is a workflow over existing platform APIs and manifests, not a proposal for a new agent description language. OIDC and SCIM can help manage human identities where supported, but they do not automatically issue every platform's bot credentials.

## Existing provisioning surfaces

- **Buzz:** each bot is a Nostr keypair. The official `buzz-acp` instructions use `buzz-admin generate-key` and `buzz-admin add-member --pubkey ...`; each agent needs its own keypair. A closed relay and target room may require separate membership grants, including the room's Bot role. Keep the owner's key out of the agent. Rotating the key changes the public chat identity, so membership and mentions need migration. [Buzz ACP guide](https://github.com/block/buzz/blob/main/crates/buzz-acp/README.md) | [OpenClaw Buzz onboarding](https://docs.openclaw.ai/channels/buzz)
- **Mattermost:** a System Admin or plugin can create and manage bot accounts through the bot API. [Bot accounts](https://docs.mattermost.com/developers/integrate/reference/bot-accounts)
- **Slack:** app manifests are native YAML/JSON for app configuration and can be applied through the App Manifest APIs; installation and token management still follow Slack's app authorization model. [App manifests](https://docs.slack.dev/app-manifests/configuring-apps-with-app-manifests/)
- **Zulip:** native bot accounts and API keys exist, including key rotation; programmatic creation of a bot through a documented API has not been verified in this survey. [Bots](https://zulip.com/help/running-bots) | [Rotate bot key](https://zulip.com/api/regenerate-bot-api-key)
- **Discourse and IRC:** user/API-key and network-specific account mechanisms exist, but they need separate checks against the desired provisioning and revocation contract.

There is **no uniform cross-chat account creation API**. Keep the communication layer unspecified by requiring a provision/create-or-register operation, a verified sender ID, access grants, credential rotation/revocation, and inbound/outbound message APIs. Then choose a platform-native provisioner. Centrally managed identity is a property of the chosen platform and its APIs, not a feature supplied by Google AX.

Buzz-specific caution for a shared human team: `buzz-acp` defaults to an owner-only inbound gate, so authorize intended team senders explicitly. Its permission mode can default to `bypass-permissions`; enforce actual tool and sandbox policy separately.
