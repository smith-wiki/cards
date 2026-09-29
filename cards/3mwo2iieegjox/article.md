# OMP changes the memory-backend shortlist

Checked September 29, 2026.

OMP's current memory abstraction is a closed set containing off, local, Hindsight, Mnemopi, and Sharpshooter. The built-in Hindsight and Mnemopi integrations participate in OMP's memory lifecycle and tools. The local backend separately scans persisted sessions and builds project summaries and lessons.

Sources:
- https://github.com/can1357/oh-my-pi/blob/main/docs/memory.md
- https://github.com/can1357/oh-my-pi/blob/main/packages/coding-agent/src/memory-backend/types.ts

OMP still has an open feature request for a public extension API that can register arbitrary first-class memory backends. An extension can register tools and lifecycle hooks, but cannot currently add a new value to the core memory-backend resolver without changing OMP itself.

Source:
- https://github.com/can1357/oh-my-pi/issues/7902

This matters for the comparison: Hindsight and Mnemopi should receive an integration-complexity advantage for an OMP deployment. Other engines can still be viable, but should be evaluated as extension adapters unless OMP gains a public backend-registration API.
