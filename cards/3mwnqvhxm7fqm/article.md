# Two proposed integration experiments

This is a shortlist for evaluation, not a decision or a claim of deployed compatibility.

**Paperclip path:** map one human discussion and explicit invocation to an Issue and an assigned agent. Persist the `discussionRef -> issueId` mapping, propagate later human messages as comments, and mirror the relevant agent output and run status back to the discussion. Test interrupt/cancel and authorization. Watch for divergent conversations: the human discussion and Paperclip issue both contain messages, so decide which record is authoritative for each fact. See [Paperclip assessment](card:3mwnqq7zmmdrj).

**Composable path:** a small trusted service owns agent configuration and the mapping among discussion, task, session, run, and runtime. Hatchet or Temporal supplies durable scheduling/waits/retries. An agent protocol or wrapper delivers prompt turns. AX or OpenShell supplies isolated execution and stop/delete operations. See [workflow engines](card:3mwnqrom3zgmo) and [runtime layer](card:3mwnqtemyepgg).

Compare one end-to-end case in both designs: a person invokes a specialist, it requests human input, another agent is delegated a subtask, a follow-up arrives after completion, and a separate run is canceled. Restart the adapter/controller midway, then inspect deduplication, status, reply routing, and external resource cleanup. This is a proposed test; none of it has been performed.

[LangSmith Agent Server](card:3mwnqttzmcezd) is a third direction if the chosen agent loop naturally lives within its Assistant/Thread/Run model and its self-hosting terms fit.
