# Compare supported security paths, not project names

The upstream [egress trust-bundle guide](https://github.com/agent-substrate/substrate/blob/main/docs/egress-trust-bundle.md) documents a TLS-intercepting egress gateway enabled through an experimental installation option. It also identifies a DNS relay that does not pass through that egress policy check.

The [GKE support page](https://docs.cloud.google.com/kubernetes-engine/ai-ml/about-agent-substrate), last updated September 24, 2026, lists EgressPolicy, default-deny and hostname rules, and credential injection as unsupported. That support boundary must not be replaced with assumptions drawn from upstream implementation work.

The comparison with OpenShell is therefore not simply security versus scaling. Both address isolation, but the specific supported access-control mechanisms differ. No equivalent enforcement test was performed in this investigation.
