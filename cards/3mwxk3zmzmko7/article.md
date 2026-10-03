Separate what the model is told from what application code is allowed to do.

| Control | What it defines |
| --- | --- |
| System prompt and context | Role, instructions and task context |
| Tool description and input schema | An action the model can request and its accepted arguments |
| Tool executor | The code that performs the action |
| `activeTools` | Which tools are available for a particular turn |
| Wrangler bindings and service credentials | Resources the agent's implementation can access |
| Routing checks | Which caller may reach an instance |

`getTools()` adds custom tools to Think's built-in workspace tools and other configured sources. Connected MCP tools are automatically included by default. Limit the active catalog explicitly when needed.

A method marked `@callable()` is exposed to WebSocket clients. That does not automatically make it an LLM tool; model-facing tools have their own definitions.

Think's experimental Actions API can declare required permissions and require human approval. Authorization is opt-in: turns receive a full grant by default unless the application overrides `authorizeTurn()` or `authorizeAction()`.

For external services, the executor still uses that service's credentials and permission checks. A sentence in the prompt is not an enforced resource permission.

Sources: [Think tools](https://developers.cloudflare.com/agents/harnesses/think/tools/), [Actions authorization](https://developers.cloudflare.com/agents/harnesses/think/actions/), [bindings](https://developers.cloudflare.com/agents/runtime/operations/configuration/), [routing hooks](https://developers.cloudflare.com/agents/runtime/communication/routing/), [callable methods](https://developers.cloudflare.com/agents/runtime/lifecycle/agent-class/).
