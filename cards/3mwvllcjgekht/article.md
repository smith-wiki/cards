The current OMP SDK exposes createAgentSession(), event subscriptions, tool configuration and SessionManager. Its file-backed sessions preserve messages and state deltas, with open/continue/list/fork support. RPC and ACP provide integration from another process or language.

OMP's checkpoint/rewind tools mark and collapse conversation context; that is a different mechanism from Pi Durable's persisted task state machines. Session persistence and live background jobs should not be read as a guarantee that arbitrary unfinished work resumes after a process crash.

In the reviewed documentation, I did not find an equivalent general conversation/task/document runtime with Pi Durable's checkpoint and replay contract. This is a scoped finding, not a claim that OMP cannot implement it. The repository has a related open workflow-persistence proposal, issue #6947.

Sources: [OMP SDK](https://github.com/can1357/oh-my-pi/blob/main/docs/sdk.md), [session format](https://github.com/can1357/oh-my-pi/blob/main/docs/session.md), [OMP tools and integration](https://github.com/can1357/oh-my-pi), [workflow proposal](https://github.com/can1357/oh-my-pi/issues/6947).
