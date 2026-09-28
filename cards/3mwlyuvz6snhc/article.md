# Paperclip is a candidate for the fleet's management layer

Research snapshot: September 29, 2026. This is a documentation-based candidate assessment, not a deployment test or a decision to adopt it.

Paperclip manages persistent agent records and organizational relationships rather than only a sequence of model calls. Its repository describes tasks with ownership, a database-backed wakeup queue, reporting lines, spending records, approval workflows, pause/resume/termination, and adapters to different execution environments.

Its adapters connect existing agents and programs. The documented examples include Claude Code, Codex, OpenClaw, command-line programs, and HTTP services. A declared role and reporting line configure management behavior; they do not by themselves create an operating-system security boundary.

Source: [Paperclip repository](https://github.com/paperclipai/paperclip).

The product's own FAQ makes two important qualifications. Local installation does not automatically install agent runtimes. Governance controls govern actions inside Paperclip, while operators remain responsible for securing the actual agents. Those distinctions make Paperclip potentially complementary to the [OpenShell fleet architecture](card:3mwlx5xqkpopy), not a replacement for sandbox enforcement.

The site offers a local self-hosted version and a waitlist for its hosted offering. That is evidence of something installable, not evidence that every advertised scenario is production-qualified.

Source: [Paperclip product and FAQ](https://paperclip.ing/).

The next useful checks are the exact onboarding protocol, which integrations already exist, how budgets and termination affect active work, and what an OpenShell adapter would still have to implement.
