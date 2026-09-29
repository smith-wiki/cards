# ChatKit: backend control is not renderer control

Reviewed 2026-09-29.

The [JavaScript integration repository](https://github.com/openai/chatkit-js) and [Python server SDK](https://github.com/openai/chatkit-python) use Apache-2.0 licenses. They provide integration code, not evidence that the entire production ChatGPT interface has been released.

The [official ChatKit hosting matrix](https://openai.github.io/chatkit-js/) explicitly places the rendering iframe at OpenAI in both hosted-backend and self-hosted-backend configurations. With your backend, you run the chat server and store messages and attachments. The externally hosted UI remains an architectural dependency.

The [custom integration guide](https://developers.openai.com/api/docs/guides/custom-chatkit) describes a Python ChatKitServer, streaming responses, and application-provided storage. Treat this as a server integration route rather than an independently hosted frontend build.

A separate lifecycle warning matters: the [current API guide](https://developers.openai.com/api/docs/guides/chatkit) schedules Agent Builder shutdown for November 30, 2026, while retaining ChatKit and directing new work toward a custom server-side agent. Older examples recommending new Agent Builder workflows should not override that notice.

Recommendation: evaluate ChatKit for a convenient embed, not as the default choice for an offline or fully developer-hosted UI. No deployment or network audit was performed.
