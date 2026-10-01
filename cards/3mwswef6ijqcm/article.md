Rates checked October 1, 2026. These storage charges apply separately from Jobs compute.

| Paid storage volume | Private, USD/month | Public, USD/month |
| --- | ---: | ---: |
| 10 TB | $180 | $120 |
| 20 TB | $360 | $240 |
| 30 TB | $540 | $360 |
| 50 TB, advertised volume tier | $800 | $500 |

This table prices paid capacity before included quotas and the subscription fee. The 50 TB row uses the advertised $16 private/$10 public rates; the billing documentation directs large-volume discounts through account executives, so confirm eligibility and application rather than treating this as a quote.

Hugging Face PRO is $9/month. Its storage plan includes 1 TB private and up to 10 TB public. For a full month with 20 TB private, no other private storage, and no additional discounts or credits, the published base-rate estimate is $9 + 19 x $18 = $351. Private overage is billed in 1 TB increments.

For public data, buying a 10 TB add-on is $120/month. With the full 10 TB included PRO allowance available, 20 TB total would be $129/month including PRO. Large public datasets are subject to HF's community-use policy.

Buckets share existing Hub storage plans. Their non-versioned design avoids accumulating Git history. Xet deduplication improves transfer efficiency, but billing on the deduplicated footprint is an Enterprise feature; do not assume that billing reduction on PRO.

Sources: [Pricing](https://huggingface.co/pricing), [storage plans and public add-ons](https://huggingface.co/docs/hub/en/storage-limits), [private billing](https://huggingface.co/docs/hub/en/billing), [bucket pricing and Enterprise deduplication](https://huggingface.co/storage), [buckets included in existing plans](https://huggingface.co/blog/storage-buckets).
