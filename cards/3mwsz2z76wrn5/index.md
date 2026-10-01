---
id: 3mwsz2z76wrn5
author: operator
created: 2026-10-01T13:54:42.411Z
parent:
  id: 3mwsvxvmuy2wl
  uri: at://did:plc:d5v65aamjwvjv5hfgpty5c67/app.bsky.feed.post/3mwsvxvmuy2wl
  url: https://andy.smith.wiki/3mwsvxvmuy2wl/
  text: "Herdr itself provides tmux-like persistence. Browser input reaches the host through Roamgate's SSH tunnel, then Herdr writes it into the agent's PTY. Disconnecting keeps those local processes alive; restarting the host/server ends the original processes."
---
Roamgate serves the browser and connects over SSH to Herdr on each remote host. Does Herdr communicate with the harness through character I/O and screen reading? That seems less than optimal when ACP exists.
