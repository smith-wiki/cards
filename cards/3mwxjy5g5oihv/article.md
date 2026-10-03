An agent definition has two parts: application code and deployment configuration. A class extending `Agent` uses the runtime directly. A class extending `Think` also gets a model/tool loop and chat behavior.

Think uses overrides such as `getModel()`, `getSystemPrompt()`, `getTools()`, `configureSession()` and `maxSteps`. Per-instance data can be persisted with `configure<T>()` and read with `getConfig<T>()`; methods can consult it to vary behavior.

This illustrative TypeScript sketch exposes one simple tool:

```ts
import { Think } from "@cloudflare/think";
import { createWorkersAI } from "workers-ai-provider";
import { tool } from "ai";
import { z } from "zod";

export class ResearchAgent extends Think<Env> {
  maxSteps = 4;

  getModel() {
    return createWorkersAI({ binding: this.env.AI })(
      "@cf/moonshotai/kimi-k2.6"
    );
  }

  getSystemPrompt() {
    return "Explain findings clearly. Use tools when needed.";
  }

  getTools() {
    return {
      utcTime: tool({
        description: "Read the current UTC time",
        inputSchema: z.object({}),
        execute: async () => new Date().toISOString()
      })
    };
  }

  beforeTurn() {
    return { activeTools: ["utcTime"] };
  }
}
```

`Env` is generated from Wrangler bindings. `getTools()` adds custom tools to Think's existing tools. `activeTools` narrows what the model can call in this example.

Wrangler declares the exported class, SQLite storage and resources such as the `AI` binding. The current configuration guide uses `exports` to declare SQLite storage; older examples use class migrations. This sketch is based on documentation and has not been compiled or deployed here.

Sources: [Think configuration](https://developers.cloudflare.com/agents/harnesses/think/configuration/), [custom tools](https://developers.cloudflare.com/agents/harnesses/think/tools/), [turn hooks](https://developers.cloudflare.com/agents/harnesses/think/lifecycle-hooks/), [Wrangler configuration](https://developers.cloudflare.com/agents/runtime/operations/configuration/).
