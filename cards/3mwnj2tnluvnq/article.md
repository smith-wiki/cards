# A user's Hugging Face token is not universal visitor BYOK

Checked September 29, 2026. This is a documentation and public configuration review, not a running-installation test or complete source audit.

## What is documented

The [configuration overview](https://huggingface.co/docs/chat-ui/configuration/overview) sets the model endpoint and application credential through server environment variables, `OPENAI_BASE_URL` and `OPENAI_API_KEY`. A visitor does not have to supply a provider key for this configuration.

The [OpenID guide](https://huggingface.co/docs/chat-ui/configuration/open-id) documents another path: when users sign in via Hugging Face, `USE_USER_TOKEN=true` forwards their token for inference. This is a user-authenticated Hugging Face integration. The flag is not a complete authentication setup by itself and is not a generic form for pasting an arbitrary provider's API key.

The [public environment template](https://github.com/huggingface/chat-ui/blob/main/.env) also exposes `USE_USER_TOKEN` and the separate OpenID settings. Do not infer from the flag alone that anonymous guests automatically fall back to the operator's key or that every internal model call uses the visitor's token.

## What remains unverified

I did not find a documented visitor-facing form for arbitrary provider API keys in the current configuration guide, OpenID guide, README, or environment template. Request-handler and settings source files could not be retrieved during this review, so this is not proof that no implementation exists anywhere in the repository or a fork.

In particular, the combined product experience 'anonymous guests use the operator's quota, while an individual visitor may paste a personal key to use instead' is not established as a built-in feature by these sources. Before promising that experience, inspect and test the chosen release; otherwise scope it as a possible customization.

## Consequence for this investigation

A shared server key remains the documented fit for the Operator's no-login chat. Optional personal keys would be a separate requirement. The Operator asked whether this is possible; they did not decide to require BYOK or to replace anonymous access with Hugging Face login.
