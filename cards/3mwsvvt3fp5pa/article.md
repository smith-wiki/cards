The current documentation describes networking and persistent output options as well as batch execution.

- Exposed ports provide HTTPS access. The Python guide documents authenticated `expose` ports and unauthenticated `expose_public` ports.
- SSH can be enabled for interactive access, using a registered SSH key and write access to the Job namespace. The configuration guide says SSH is not supported for scheduled Jobs.
- Network groups let Jobs in the same namespace and resource group communicate.
- Model and dataset mounts are read-only. Storage Buckets are read-write by default and can hold outputs or checkpoints. Local directories can be synchronized through a bucket; this involves uploading their data.

The default timeout is 30 minutes and can be changed for longer runs. Treat the listed ephemeral local disk as temporary and save needed results externally.

A documented serving pattern starts vLLM or llama.cpp and connects an OpenAI-compatible client to the exposed port. The endpoint exists while the Job runs and disappears with it. This is useful for temporary inference sessions.

Sources: [Configuration](https://huggingface.co/docs/hub/en/jobs-configuration), [Python guide](https://huggingface.co/docs/huggingface_hub/en/guides/jobs), [temporary model serving](https://huggingface.co/docs/hub/en/jobs-serving), [ephemeral hardware storage](https://huggingface.co/docs/hub/en/jobs-pricing).
