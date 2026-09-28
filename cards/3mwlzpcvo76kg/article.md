# Correcting the selection criterion

My [earlier recommendation](card:3mwlzdd5ruzfv) emphasized organizational agent management: profiles, reporting lines, hiring, and budgets. The Operator has now clarified that messaging interfaces already exist and the missing capability is operational: invoke an agent on an event, give it a command, and terminate it.

That changes the first selection criterion. We should evaluate execution controllers and job runners, not prioritize agent-team builders. This does not mean Paperclip is merely a message bus or cannot launch processes; it means its organizational model was not the requirement to optimize for.

The proposed boundary is: existing event sources -> a trusted execution controller -> AX or OpenShell -> the actual agent process. The controller must retain the relationship between the event, the run, and the concrete runtime resource so that cancellation reaches the execution rather than only a dashboard record.

This is a correction of my interpretation and an architectural proposal, not a completed integration.
