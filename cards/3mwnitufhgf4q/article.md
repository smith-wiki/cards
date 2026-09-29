# Own the evidence and decisions, not necessarily every internal memory schema

A proposed boundary within the [logical architecture](card:3mwnisxafnpi3), extending the [earlier reference design](card:3mwngtchjxree).

## What should survive an engine replacement?

I would preserve retained source events and explicit edits, with stable identifiers and versions, independently of a disposable search representation. This includes corrections made directly to a memory: if the correction exists only in the outgoing engine, reprocessing the original conversation could lose it.

Independence does not require copying every source into a new database. A durable reference to an accessible, versioned source may suffice. A source that can disappear or change without retained history needs a different retention arrangement. Do not retain secrets or all raw messages indefinitely just to make rebuilding easier.

A source record establishes that a particular statement or observation occurred. It does not make every statement true. An assistant's report of successful deployment is distinct from a deployment tool's observed result; neither automatically establishes the environment's current state forever.

## Authority is assigned by domain

Keep authoritative task state in the execution system. Keep approved project decisions in records with explicit owners and revisions. Keep derived claims linked to their evidence, including disagreement and uncertainty. There can be multiple authoritative systems for different domains without multiple competing authorities for the same record.

I would version approved procedures separately from automatically inferred candidate lessons. A remembered instruction must not silently grant permissions or rewrite execution policy. The [existing scope and authorization proposal](card:3mwnictndc54y) still applies.

## Reconstruction has limits

[Microsoft's CQRS guide](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs) describes separating write models from read projections, including within one database. This is a useful analogy for keeping replaceable search structures apart from primary records, not a requirement to adopt full event sourcing.

For LLM-derived memory, replay is a new inference process: the same retained evidence may yield different extractions after model, prompt, or pipeline changes. Preserve selected derived artifacts and their versions when exact historical reconstruction matters. Back up what cannot be recreated acceptably.

Deletion must affect the retained inputs and derived copies covered by the deletion policy. Rebuilds must respect deletions rather than resurrecting removed information from old events. These are proposed requirements, not verified guarantees of the candidate engines.
