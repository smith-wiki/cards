# Herdr combines terminal control with structured status

The normal prompt path operates the existing terminal: text and an encoded Enter are submitted to the agent's pane. Source: [Agent automation](https://herdr.dev/docs/agent-automation/).

For state detection, Herdr either examines terminal text against detection rules or uses integration reports. These are terminal-buffer rules, not screenshot OCR. When lifecycle reports are available, Herdr uses them instead of screen detection. OMP's integration reports state and session identity. Source: [Agents](https://herdr.dev/docs/agents/).

This qualifies the description of Herdr as screen-driven: an OMP setup can have structured observation while still delivering prompts through terminal I/O. It does not thereby gain ACP's prompt-request and turn-response contract.
