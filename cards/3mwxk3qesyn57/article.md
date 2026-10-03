Creation has two different meanings: deploying an agent type and activating a particular instance.

1. Export a class such as `ResearchAgent` from your Worker.
2. Configure its Durable Object binding and SQLite storage, then deploy the Worker. The binding exposes a namespace as `env.ResearchAgent`.
3. Choose an instance name for the work or conversation.

```ts
import { getAgentByName } from "agents";

const agent = await getAgentByName(
  env.ResearchAgent,
  "research-001"
);
```

`agent` is a remote proxy. The SDK handles addressing and initialization through the Durable Object namespace. Another lookup in the same namespace with the same name reaches the same logical agent. A different name selects a different instance with its own storage.

For client routing, use `/agents/research-agent/research-001`, or the client SDK with the agent class and instance name. The Worker forwards the event to that instance.

Cloudflare creates the actual runtime object when it must handle work. It calls the constructor and the SDK's `onStart` before handling the invocation. After hibernation or eviction, this initialization can run again for the same identity. `onStart` is not a one-time provisioning callback.

A raw Durable Object `getByName()` only creates a proxy; the first method call starts its lifecycle. The higher-level `getAgentByName()` also performs SDK initialization. Resolving an instance does not, by itself, submit a model conversation turn.

Sources: [routing and named instances](https://developers.cloudflare.com/agents/runtime/communication/routing/), [bindings](https://developers.cloudflare.com/agents/runtime/operations/configuration/), [Agent startup](https://developers.cloudflare.com/agents/runtime/lifecycle/agent-class/), [Durable Object activation](https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/).
