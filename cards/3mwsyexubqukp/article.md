The joint HF/SkyPilot post of July 7, 2026 reports a Qwen3.5-4B fine-tune with model weights mounted from a Hub repo and checkpoints written to a Storage Bucket. Model reads reached up to about 500 MB/s. Checkpoint writes were about 168 MB/s on AWS, 123 on GCP, and 112 on Lambda.

These measurements provide a storage-access reference. They do not establish sustained throughput for a particular HF Jobs flavor or tens of TB of dataset reads.

Jobs documentation describes remote scans as network-bound and dependent on library parallelism. It says direct `hf://` queries are typically faster for large multi-file Parquet scans than scanning through a filesystem mount. Mount reads are cached on the Job's ephemeral disk, so cached and fresh reads should be measured separately.

No paid Job or benchmark was run in this investigation.

Sources: [HF/SkyPilot benchmark](https://huggingface.co/blog/skypilot-hf-storage), [Jobs access methods and caching](https://huggingface.co/docs/hub/en/jobs-large-datasets).
