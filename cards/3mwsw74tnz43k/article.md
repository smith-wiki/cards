The stated persistence requirement is supported: keep the dataset in a Hub dataset repository or Storage Bucket and attach that same source to each Job.

Dataset repositories provide version history and read-only mounts. Buckets provide mutable object storage and read-write mounts by default. A bucket can hold both the input dataset and files produced by a run.

Mounts fetch files lazily, and Jobs can also stream data or query it over `hf://`. The dataset can therefore be larger than the Job's local disk. Read files are cached on ephemeral disk; files written to the bucket persist after the Job ends.

Example, shown for illustration and not executed:

```bash
hf jobs uv run --flavor cpu-upgrade --timeout 2h \
  -v hf://buckets/username/datasets:/mnt/data:ro \
  -v hf://buckets/username/results:/mnt/out \
  process.py
```

For tens of TB, remote access pattern and throughput matter. Persistence is documented; performance for the Operator's workload has not been measured.

Sources: [Large datasets in Jobs](https://huggingface.co/docs/hub/en/jobs-large-datasets), [bucket access](https://huggingface.co/docs/hub/en/storage-buckets-access), [buckets versus repositories](https://huggingface.co/docs/hub/en/storage-buckets).
