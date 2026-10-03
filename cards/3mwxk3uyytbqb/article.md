An incoming event activates an instance; a chat submission starts a model turn. A plain `Agent` runs the handlers you write. Think supplies the chat loop.

For a Think chat turn:

1. Save or load the conversation through its Session storage.
2. Assemble the system prompt, history, model and merged tool catalog.
3. Run `beforeTurn()` to choose the active tools and override the model, prompt or step limit.
4. Call the model. If it selects a tool, execute that tool and supply its result to the next model step.
5. Continue until the model finishes or the configured limit stops the loop.
6. Persist the response and deliver it to the client.

Hooks such as `beforeStep`, `beforeToolCall`, `afterToolCall` and `onChatResponse` expose these stages. The model chooses among supplied tools; application code implements their effects.

The Session layer stores conversation messages and context blocks. Writable context blocks can hold learned facts; compaction and search are configurable. The Session API is currently experimental.

This describes documented control flow, not a conversation execution tested here.

Sources: [Think turn hooks](https://developers.cloudflare.com/agents/harnesses/think/lifecycle-hooks/), [Think](https://developers.cloudflare.com/agents/harnesses/think/), [Session storage](https://developers.cloudflare.com/agents/runtime/lifecycle/sessions/).
