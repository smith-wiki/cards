# Key confidentiality and public spending are different controls

Reviewed September 29, 2026.

A public application deliberately allows visitors to trigger inference through the operator's server. Even with no disclosure of the provider credential, repeated or automated requests can consume paid resources. This is an architectural inference, not a demonstrated bypass in Chat UI. [OWASP API4: Unrestricted Resource Consumption](https://api-security.owasp.org/editions/2023/en/0xa4-unrestricted-resource-consumption/) describes this class of risk and recommends resource, rate, and spending controls.

The [Chat UI environment template](https://github.com/huggingface/chat-ui/blob/main/.env) documents `USAGE_LIMITS`, including `conversations`, `messages`, `messageLength`, `messagesPerMinute`, and `tools`. The template points to `src/lib/server/usageLimits.ts`; that implementation and its exact anonymous-session accounting were not verified here. Do not equate this template with tested per-human quotas or a hard monetary ceiling.

I propose a dedicated inference credential, limits on request frequency and simultaneous work, bounded model output and tool execution, and aggregate spending protection. Verify that any provider budget actually rejects further requests rather than merely sending a notification. The provider and exact supported control have not been selected, so no universal hard-cap feature is claimed.

These controls can be configured in the existing application, ingress, or provider where supported; they are not by themselves a reason to write an entirely new chat backend.
