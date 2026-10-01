The Storage Buckets page advertises included CDN and egress, then qualifies the egress allowance as an 8:1 ratio to total stored data. For 20 TB stored, that ratio corresponds to 160 TB of outgoing data.

In the reviewed public pricing and billing material, I did not find the allowance's reset period, what happens above it, or whether reads by Hugging Face Jobs count against the ratio. This is an unresolved budgeting condition, not a claim that excess traffic is necessarily charged.

Repeated full-dataset scans can move large amounts of data. The practical cost assessment therefore needs both the storage quote and the applicable traffic terms.

Jobs supports lazy mounts and streaming. This allows work on a dataset larger than local disk, but does not establish a throughput guarantee for the Operator's particular workload. Benchmark the intended sequential or random access pattern before committing a large dataset.

Sources: [Storage page: CDN and 8:1 egress allowance](https://huggingface.co/storage), [large datasets in Jobs](https://huggingface.co/docs/hub/en/jobs-large-datasets), [billing documentation](https://huggingface.co/docs/hub/en/billing).
