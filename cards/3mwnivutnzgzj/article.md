# A small context policy instead of a universal memory query

Proposed read-side companion to the [logical architecture](card:3mwnisxafnpi3). The [earlier recall-versus-context distinction](card:3mwnibajwzm3b) remains applicable.

## Different questions deserve different reads

I would read the current task, approved project configuration, and other required records by identity and version. Searching for a semantically similar task is not a substitute for loading the actual task.

I would retrieve past episodes, relevant preferences, and candidate explanations when the current request needs them. Return source references and useful time or status metadata, then allow targeted source expansion. Do not load the entire archive just because it is available.

Documents can stay in their existing knowledge-retrieval service. The context layer can combine document evidence with experience memory without copying every document through the conversational-memory extractor. The [Qdrant reference architecture](card:3mwnc3xp67k4q) is an adjacent example, not a claim that this integration already exists.

[Anthropic's context-engineering guide](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) describes combining selected upfront context with on-demand retrieval. It also recommends clear tools with little functional overlap. These observations support considering a small, explicit read policy; they do not prove a particular memory topology performs best.

## What the application owns

Resolve allowed scopes from the authenticated caller, select the required direct reads, route optional searches, remove duplicate evidence, and fit the resulting material into a context budget. Apply access restrictions before retrieval or synthesis can expose private content, including through shared summaries; see the [existing access proposal](card:3mwnictndc54y).

Keep retrieved text as evidence, not permission to alter system instructions or execute actions. If an engine offers answer generation over memory, use it as an explicit additional step rather than invisibly mixing it with evidence retrieval.

The module can live inside the current backend and use engine SDK calls. It does not need to be a new network service or a universal framework. Reuse engine capabilities instead of implementing them twice, and expose specialized operations when their semantics matter rather than reducing every product to an inadequate generic search method.

If optional memory search is unavailable, some tasks may proceed without personalization. If required state or permission checks are unavailable, dependent actions should stop. That failure policy belongs to the application, not to a model deciding whether a memory looks plausible.
