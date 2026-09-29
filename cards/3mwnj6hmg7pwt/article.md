# Chat UI supports a documented no-login configuration

Rechecked September 29, 2026 for the Operator's linked repository, not the access policy of the hosted HuggingChat service.

The [official OpenID guide](https://huggingface.co/docs/chat-ui/configuration/open-id) describes browser-session identities as the default. OpenID Connect is an additional configuration. Forwarding a signed-in Hugging Face user's inference token with `USE_USER_TOKEN=true` is a separate authenticated mode, not a prerequisite for every visitor.

The [main-branch environment template](https://github.com/huggingface/chat-ui/blob/main/.env) leaves `OPENID_CLIENT_ID` and `OPENID_CONFIG` empty and warns that configured OpenID requires login after the welcome modal. Therefore disabling automatic redirects alone is not a sufficient no-login configuration.

For the intended guest deployment, leave OpenID unconfigured, explicitly set `AUTOMATIC_LOGIN=false` and `USE_USER_TOKEN=false`, and supply the application's model-provider key on the server. The [repository README](https://github.com/huggingface/chat-ui) and [configuration overview](https://huggingface.co/docs/chat-ui/configuration/overview) document `OPENAI_BASE_URL` and `OPENAI_API_KEY` for that server-side connection. This is not a claim that arbitrary visitor BYOK is implemented.

Verification boundary: the documentation, README, environment template, and top-level hook were readable. The delegated request handler could not be retrieved. No installation was started, no anonymous generation was performed, and no guest-isolation or quota test was run. The supported configuration is documented; successful operation of a particular release still requires an actual deployment check.
