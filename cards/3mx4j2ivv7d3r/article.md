The Operator is right: using Pi Durable does not require a second coding harness such as OMP. I carried an external-worker assumption into the [earlier architecture proposal](card:3mx4in35aav42) when it was not necessary for this alternative.

Earendil explicitly describes Pi Durable as a framework for agentic applications, including coding agents. Its announcement demonstrates installing `CodingTools` into a registry and opening a harness with SQLite storage and a `NodeExecutionEnv`. The package README lists the four provided tools: `read`, `write`, `edit`, and `bash`. These operate through the execution environment supplied for the call.

This means Pi Durable can own the coding agent's model/tool loop and persisted conversation itself. OMP would only be a separate choice of executor, not a dependency of Pi Durable.

Pi Durable remains experimental. This correction is based on the announcement and documentation, not a deployment test.

Sources: [Pi Durable announcement](https://earendil.com/posts/pi-durable/), [Pi Durable package README, Tools](https://github.com/earendil-works/pi/blob/main/packages/durable/README.md#tools).
