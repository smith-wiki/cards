Start with the [OWASP contributor guide](https://genai.owasp.org/contributing/). Paid OWASP membership is not required.

Request access through the [OWASP Slack invitation](https://owasp.org/slack/invite), join #project-genai, then #team-genai-agentic-security-initiative. The [initiative page](https://genai.owasp.org/initiatives/agentic-security-initiative/) confirms that channel and links its ongoing projects. Introduce the area you can work on to the initiative leads; contributors can offer help or first observe the work.

One concrete engineering direction is the [Agent Control Standard repository](https://github.com/GenAI-Security-Project/agent-control-standard). ACS defines hooks between an executing agent and a separate Guardian that evaluates planned actions. The project asks contributors to run its reference implementation with a real harness and report where behavior breaks or differs from the specification. Ports, runtime shims, conformance work, and implementation hardening are further contribution areas.

A proposed experiment, not one we have performed: check what happens when the Guardian is unavailable, returns a malformed response, or the agent crashes after an approved external action. Bring reproducible observations to the project before starting a large integration. Follow the repository's own contribution rules for code or specification changes.
