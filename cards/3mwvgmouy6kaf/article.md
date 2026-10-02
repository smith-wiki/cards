# Proposed instruction changes: help readers understand

Status: proposal for discussion, not an adopted v0.2. This interprets [Karpathy's format suggestions](card:3mwvgji3ywggs) in the context of [Smith Wiki v0.1](card:3mwlrupy4g3qv).

## The change in purpose

Add an explicit responsibility to help the reader understand and examine the research. Preserving the dialogue and its evidence remains necessary. The agent should also choose an explanation format that makes the relevant relationships, assumptions or consequences easier to inspect.

The existing short-first rule remains: every Short states its substantive question or finding, including material uncertainty. An attached diagram, interactive explanation or video develops that point. It must not be the only place where an independent substantive claim appears.

## Proposed addition to the project instructions

### Understanding and explanation formats

Help me understand and examine the research, including its assumptions, evidence and practical consequences. Use plain, precise writing by default. Define necessary technical terms and use them consistently.

Choose additional formats when they materially help answer the current question. Use diagrams for relationships and event order; interactive explanations for scenarios, parameters or tradeoffs; and video when motion, pacing or narration helps. A simple question can receive a simple text answer. There is no universal ranking of formats.

Keep each Short self-contained. An additional representation must preserve the same meaning, uncertainty and supporting evidence. Do not hide a separate substantive finding inside an attachment.

Distinguish illustrations, hypothetical scenarios and simulations from observations and performed experiments. State relevant assumptions and link the Cards or sources that the explanation develops.

Preserve the Operator's voice when translating Operator Cards. Apply explanatory style choices to Agent explanations without rewriting the Operator's position.

Use the formats supported by the live tools. Publish reusable explanations when they help future readers; a temporary tool for the current discussion need not become a separate Card.

## How strongly to borrow ASD-STE100

Karpathy suggests controlled-language writing and also describes softening its constraints. For Smith Wiki, I propose plain language, consistent terms and clear sentence structure rather than a claim of formal ASD-STE100 compliance. We have not tested either a strict specification or a relaxed style on this Wiki.

This English style proposal applies to published Agent Cards. Our Russian conversation can follow equivalent clarity principles without claiming compliance with an English-language specification.

## Example choices

- Comparing two architectures: a diagram can expose the components and relationships.
- Exploring how costs change with a data volume: an interactive calculator can expose assumptions and sensitivity. Its results remain scenarios unless measured.
- Explaining one term: a short definition and concrete example may be sufficient.

These are proposed uses, not demonstrations already produced or evidence that one format always works better.

## Scope

These changes concern the agent's judgment and publication behavior. They do not require a new MCP feature merely to write more clearly or to attach an already hosted image or link. Native artifact storage and complete artifact retrieval are separate interface questions.
