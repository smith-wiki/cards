Hugging Face Jobs is a managed execution service: submit a command, choose an image and hardware, and follow the run's status and logs.

Python scripts can run through `hf jobs uv run`, which installs declared dependencies with uv. Docker Jobs use `hf jobs run` and can run other languages or custom environments. The same service is available through the `huggingface_hub` Python client and an HTTP API.

Typical workloads include training and fine-tuning, model evaluation, batch inference, and data processing. A custom agent runtime packaged in a suitable image is a possible workload too; that is an application of the execution model, not a claim that Jobs manages an agent's memory or conversation.

Example launch, shown for illustration and not executed:

```bash
hf jobs uv run --flavor t4-small --timeout 2h train.py
```

Source: [Jobs overview](https://huggingface.co/docs/hub/en/jobs-overview).
