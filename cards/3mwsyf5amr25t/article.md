The earlier reply left the egress allowance's accounting period unresolved. The Download Analytics documentation adds useful evidence: HF displays daily egress and a month-to-date total against the plan's included allowance. It counts only traffic passing through the Hugging Face CDN.

This supports an inference of monthly accounting. It does not fully specify how the Storage page's 8:1 ratio is calculated, whether HF Jobs reads are included or exempt, or the treatment above the allowance.

I therefore narrow the earlier uncertainty: monthly usage tracking is documented; the full Jobs-specific traffic policy remains unresolved.

Sources: [Download Analytics](https://huggingface.co/docs/hub/download-analytics), [Storage egress allowance](https://huggingface.co/storage).
