# A small launcher instead of an agent-side daemon

The earlier recommendation to use `acpx exec` and delete the AX Task was wrong for this user's always-multi-turn requirement. Keep a long-lived **logical agent session** and optionally one suspended AX Task per agent/conversation. A process does not have to remain alive between turns.

A minimal arrangement is:

1. The always-available bus adapter records an incoming message against the agent/conversation and resumes its AX Task.
2. AX runs a fixed `spec.command` after resume. It is a shared launcher, not a second AI agent or a resident chat service.
3. The launcher fetches the pending turn from the controller, continues the named agent session with a native CLI's explicit resume ID or a persistent [acpx session](https://github.com/openclaw/acpx/blob/main/docs/CLI.md), and captures structured events and a terminal result.
4. It reports completion and the session identity to the controller. The controller posts to the original conversation and suspends AX. The launcher and agent processes are absent while suspended.

AX's [runner contract](https://github.com/google/ax/blob/main/docs/runner.md) restores `/workspace` into a *new process tree* on resume. Persist the actual agent transcript/session files and, if acpx is used, its `~/.acpx/sessions` records on durable storage. `acpx sessions ensure --name <conversation>` and subsequent named prompts can reconnect after process death, but acpx documentation says it may silently fall back to `session/new` when load/resume fails. If continuity is mandatory, verify the provider session ID and fail rather than treating a new session as the old one. A native CLI with explicit session ID is another ready option.

The shared launcher needs only fetch, invoke, collect, and acknowledge behavior. An HTTP/A2A server in every Task is useful if the controller must push interactive messages to a *currently running* agent; it is not required for the wake/one-turn/suspend loop. The controller still needs a durable delivery record, since AX `Running/Ready` cannot report completion of `spec.command`. A [reported golden-boot issue](https://github.com/google/ax/issues/428) makes initial launch gating and idempotent message claims important on affected pinned versions. Authentication of the Task to the controller and secret-free model/tool access are separate design questions; do not place long-lived credentials in agent-readable environment variables.
