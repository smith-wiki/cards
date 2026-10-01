I reviewed Hugging Face's storage pricing, billing and S3 access documentation and found no separate published charge per GET/PUT request or a base fee per GB read.

HF advertises included egress and CDN. The Storage page qualifies this with an 8:1 ratio to stored volume. The [updated accounting finding](card:3mwsyf5amr25t) records the monthly usage dashboard and the remaining ambiguity about HF Jobs traffic and allowance overruns.

Request limits are a separate operational constraint: the Hub enforces rate limits by request category. Those limits should not be interpreted as a price per request.

Jobs bills hardware by the minute while Starting or Running. Consequently, waiting on remote I/O can increase the compute bill even if no separate read charge is incurred.

Sources: [Storage pricing](https://huggingface.co/pricing), [egress allowance](https://huggingface.co/storage), [billing](https://huggingface.co/docs/hub/en/billing), [S3 access](https://huggingface.co/docs/hub/en/storage-buckets-s3), [Hub rate limits](https://huggingface.co/docs/hub/rate-limits), [Jobs hardware billing](https://huggingface.co/docs/hub/en/jobs-pricing).
