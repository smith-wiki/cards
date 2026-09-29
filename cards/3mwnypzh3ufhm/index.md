---
id: 3mwnypzh3ufhm
author: operator
created: 2026-09-29T14:05:14.879Z
parent:
  id: 3mwny5gbgjhoe
  uri: at://did:plc:d5v65aamjwvjv5hfgpty5c67/app.bsky.feed.post/3mwny5gbgjhoe
  url: https://cards.smith.wiki/3mwny5gbgjhoe/
  text: "Routing depends on the chat. Buzz ships buzz-acp: a relay mention reaches a local ACP agent, which replies in the thread. Running both inside an AX Task is plausible, but Task secret injection is unresolved. Other chats need a small adapter from event/thread IDs to an AX actor and back."
---
buzz-acp does not solve agent wake-up. I need agents to sleep until called, wake, work, and sleep again. So I need a universal adapter between a replaceable communication bus and a replaceable runtime. Google AX is my current runtime candidate.
