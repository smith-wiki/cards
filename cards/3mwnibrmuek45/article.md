# Remembering facts, reusing experience, and changing behavior

[LangMem's conceptual guide](https://langchain-ai.github.io/langmem/concepts/conceptual_guide/) distinguishes semantic knowledge, episodic examples, and procedural instructions. [LangGraph's memory overview](https://docs.langchain.com/oss/python/concepts/memory) discusses adapting prompts from feedback, separately from changing model weights.

A hypothetical operational example illustrates the distinction. A fact might identify the database used by a service. An episode might record an incident, the actions attempted, and their observed results. A procedure might specify the checks to perform before using a remedy in a similar incident.

The episode is evidence that something happened under particular conditions. It is not automatically a valid general procedure. A restart following an incident does not establish that restarting fixes every incident of that kind.

I would retain applicability conditions and observed outcomes, then evaluate any promoted procedure before making it a standing instruction. Generated lessons remain interpretations until supported by results or review.

In this external-memory pattern, future behavior changes because the agent receives different facts, examples, or instructions in context. Saving these records does not itself retrain the underlying model. A product's claim that an agent "learns" should therefore be unpacked into the actual mechanism and the evidence that it improves the intended tasks.
