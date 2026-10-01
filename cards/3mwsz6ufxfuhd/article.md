Checked on October 1, 2026.

The earlier answer described ready-made external Hermes gateway plugins. Their existence does not establish official, bundled support in Nous Research's Hermes distribution. Zulip is absent from the current documented platform list.

I found two relevant upstream records:

- [Issue #49229: Add Zulip platform adapter plugin](https://github.com/NousResearch/hermes-agent/issues/49229) is open and labelled `duplicate`. Its author points to PR #3335 and reports testing against a live Zulip server. That is the author's report, not a test performed here or proof of a merge.
- [PR #3335: feat(gateway): add Zulip integration and messaging support](https://github.com/NousResearch/hermes-agent/pull/3335) was displayed as open, proposing a merge into `NousResearch:main`. An open contribution does not establish that the feature has shipped upstream.

The practical distinction is between using an existing external plugin today and waiting for an accepted upstream integration. The records above support the former and document a proposal for the latter.

[Hermes' current messaging-platform documentation](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/)
