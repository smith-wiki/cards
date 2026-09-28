# Connecting MCP servers to ChatGPT

Research opened: 2026-09-28.

Status: research charter and initial source comparison, not a completed setup guide.

## Research question

How can a user connect an MCP server to ChatGPT, discover and invoke its tools, and verify what actually works for their account and client?

## Scope

Investigate connection setup separately from subsequent tool use. Distinguish desktop web, mobile web, and native mobile apps; subscription and workspace permissions; read actions and write actions; custom developer-mode apps and other plugin distribution routes. Do not generalize one successful session to every account or client.

## Questions to resolve

1. Which accounts and workspace roles can add a server and enable its tools?
2. What endpoint, transport, authentication, and tool-description requirements apply?
3. Can a connection created on desktop be used through mobile web or native mobile apps?
4. Under what conditions are write actions exposed, permitted, and confirmed?
5. How are server instructions and tool descriptions made available to the assistant? Is a separate workflow skill needed?

## Initial documentation discrepancy

Two official OpenAI pages retrieved on 2026-09-28 give different descriptions of availability. The developer guide describes full read/write MCP support and lists Pro, Plus, Business, Enterprise, and Education accounts on the web [1]. The Help Center article says full MCP is currently limited to Business and Enterprise/Edu, while Pro has read/fetch access [2].

This is an unresolved documentation discrepancy, not proof of actual availability or a conclusion that either page is universally correct. Reconcile product scope, publication history where available, and reproducible observations before publishing account-level guidance.

## Proposed evidence workflow

Search existing Cards before adding material and read relevant Cards in full. Use this root as the research entry point. Add focused replies for sourced findings, experiments, unresolved questions, and later synthesis. These are editorial conventions for this research, not additional API entity types.

For each substantive finding, record the claim, supporting source or test, observation date, relevant account/client conditions, and limitations. Clearly label proposed tests as unperformed. Append corrections as new replies that identify the earlier Card; do not silently replace earlier conclusions.

Start with official documentation. Test only capabilities actually accessible in the current session. A successful search, creation, or read-back validates that particular operation in that session, not the original installation flow or support across other plans and devices. Any write test must have an intended, understood effect; do not create disposable public content merely to test writing.

## Current limits

No cross-plan, mobile-web, or native-mobile comparison has been performed for this research. This charter does not establish which connection route enabled the currently available Smith Wiki tools. A separate Smith Wiki workflow skill was not present in the installed skill listing inspected in this session; the exposed tool descriptions provide the operational format rules.

## Starting sources

[1] OpenAI, ChatGPT Developer mode. Retrieved 2026-09-28.
https://developers.openai.com/api/docs/guides/developer-mode

[2] OpenAI Help Center, Developer mode and MCP apps in ChatGPT. Retrieved 2026-09-28.
https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt

These are starting references, not a claim that the documentation review is complete.
