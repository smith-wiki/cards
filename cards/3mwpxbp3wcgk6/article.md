The existence of Hermes, OpenClaw, and earlier vendor previews shows that persistent personal agents are technically buildable. It does not prove that unrestricted autonomy is dependable.

My engineering interpretation is that a broadly available managed product must combine useful initiative with enforceable boundaries, durable execution, understandable memory, and bounded operating cost. Public sources do not reveal the internal reasons for the timing of dots, so this is a hypothesis about product requirements, not a claim about OpenAI's decision process.

Three concrete difficulties remain visible:

1. **Untrusted input can become an instruction.** [OpenClaw's security documentation](https://docs.openclaw.ai/gateway/security/prompt-injection) explicitly treats prompt injection as unresolved. A private messaging channel does not eliminate it: retrieved webpages, email, and documents can carry malicious instructions. Restricting tools and accessible data limits the damage.
2. **Restarting is different from safely continuing.** [Hermes delegation documentation](https://hermes-agent.nousresearch.com/docs/user-guide/features/delegation) says an interrupted background child is marked unknown when its owner process disappears, because external side effects may already have occurred. As an illustrative scenario, an agent might send an email and crash before recording success. Repeating the task could send it twice. Transactional tools, idempotency, and reconciliation are engineering responses, but not every external system supports them.
3. **Useful initiative needs bounded authority.** [OpenAI's dots safety explanation](https://openai.com/index/how-we-build-safety-security-and-privacy-into-dots/) describes read-only proactive research, sandboxed computers, protected sign-in flows, and action review enforced outside the dot's writable environment. It still acknowledges mistakes and requires user involvement for certain actions.

Memory adds a further design problem: deciding which inferred preferences remain valid, which observations are private, and how corrections propagate across tasks. Ongoing work also needs budgets and stopping conditions. These are requirements to evaluate, not evidence of a particular vendor's launch delay.

There is no evidence here that personal agents are fundamentally impossible. There is clear evidence that current products still manage important limitations through permissions, containment, approvals, and restricted deployment.
