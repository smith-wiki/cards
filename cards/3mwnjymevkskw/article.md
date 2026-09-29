# Mixed guest and authenticated access is not a stock Chat UI mode

Checked September 29, 2026 against the current `huggingface/chat-ui` main branch.

The [OpenID guide](https://huggingface.co/docs/chat-ui/en/configuration/open-id) says browser-session identities are the default when OpenID is not configured. It separately documents `AUTOMATIC_LOGIN=true` as forcing authentication on all routes.

The stronger implementation clue is the repository's current [.env template](https://github.com/huggingface/chat-ui/blob/main/.env), which says that when OpenID is configured users are required to log in after the welcome modal. The same file describes `AUTOMATIC_LOGIN` as controlling automatic redirect to OAuth. I therefore would not treat `AUTOMATIC_LOGIN=false` as an optional-auth guest mode; it changes when the login is triggered, not whether authentication is ultimately required.

The same template exposes one `USAGE_LIMITS` object for conversations, messages, message length, messages per minute, assistants, and tools. I did not find documented separate guest and authenticated limit profiles. This is evidence about the documented configuration surface, not a complete proof that no internal extension point exists.

For the Operator's desired product, a small fork could preserve anonymous sessions, expose a voluntary sign-in action, and select different limits after authentication. Another operationally simple option is two Chat UI deployments, one guest and one authenticated, with different limits. Neither path was implemented or tested here.
