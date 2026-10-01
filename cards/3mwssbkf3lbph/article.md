# Persistence and the fleet's sleep/wake requirement

The [session-state documentation](https://herdr.dev/docs/session-state/) distinguishes two mechanisms. Detaching a client leaves the original processes running. After a server restart, those processes are gone: Herdr restores the terminal layout and can launch a supported agent's native resume command. Resumption happens after a client attaches and supplies terminal size and theme context. Restored conversation state does not mean arbitrary running work survived.

The [integration documentation](https://herdr.dev/docs/integrations/) describes OMP lifecycle and session reports. Its saved conversation can be reopened with `omp --resume=<session>`. A [custom agent](https://herdr.dev/docs/add-herdr-support/) can likewise report lifecycle state, a resume command and its exit.

My architectural interpretation is that this supplies part of the runtime driver, especially terminal hosting and human inspection. It does not establish the fleet's [wake-on-message policy](card:3mwnywvp4rgpj): an external controller still needs to retain task-to-session mappings, route incoming requests, decide when to stop compute and resume the intended conversation. Ordinary Herdr detachment leaves that compute running.

Whether unattended restart can meet our controller's recovery needs is an open integration question. This assessment is based on documentation, not an executed recovery test.
