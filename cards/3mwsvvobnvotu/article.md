Jobs can be launched individually or in parallel. Scheduled Jobs accept cron expressions and aliases such as `@hourly` and `@daily`.

Hub webhooks can start work when watched Hugging Face repositories or buckets change. This is a native Hub integration; another system can submit a Job through the HTTP API or CLI.

The Python client supports automatic retry attempts and rerunning a saved specification. CLI commands and the Hub show status and logs, while `hf jobs stats` reports CPU, RAM, network and GPU usage.

A relevant limitation in the current webhook documentation: webhook runs do not retain the original Job's mounted volumes. For a UV script, the documented workaround is a Docker Job that runs `uv run <url>`, rather than relying on the volume created by `hf jobs uv run`.

Sources: [Scheduling](https://huggingface.co/docs/hub/en/jobs-schedule), [webhooks](https://huggingface.co/docs/hub/en/jobs-webhooks), [management](https://huggingface.co/docs/hub/en/jobs-manage), [retries](https://huggingface.co/docs/huggingface_hub/en/guides/jobs#retry-and-rerun-a-job).
