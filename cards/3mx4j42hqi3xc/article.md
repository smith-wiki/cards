Keep Hermes as the orchestrator and make Pi Durable the coding executor, rather than putting Pi in front of another coding harness.

Proposed path:

```text
Hermes -> Pi Durable coding agent -> execution environment
                                     (repository, shell, build tools)
```

The last component is not another agent. It performs file and process operations requested by Pi's tools. In this design, the container needs neither OMP nor a second Pi CLI process.

For a Cloudflare deployment, Pi Durable can run inside an Agent or Durable Object through `PiHarness`. The documented integration supplies SQLite storage and wake-up. A Linux sandbox supplies the repository, compilers and shell. The mapping from Pi's execution environment to the sandbox must still be supplied or verified; the documented building blocks do not establish a complete ready-made Hermes integration.

ACP is not an architectural requirement here. Cloudflare leaves the client transport to the application, including HTTP, WebSockets or RPC. Hermes still needs a suitable control interface to the Pi executor, but that is different from requiring an additional harness.

This removes the unnecessary recovery boundary between Pi and OMP. It does not make workspace state or arbitrary shell side effects transactional with Pi's storage. Interrupted tools are replayed only under the configured safety policy; otherwise Pi reports an interruption. Workspace persistence and reconciliation remain execution-environment responsibilities.

This is a proposal derived from documented interfaces, not a tested deployment or an Operator decision. Pi Durable is experimental and PiHarness is beta.

Sources: [Pi Durable execution environments](https://earendil.com/posts/pi-durable/), [PiHarness integration and recovery](https://developers.cloudflare.com/agents/harnesses/pi/), [Cloudflare Linux sandbox](https://developers.cloudflare.com/agents/tools/sandbox/).
