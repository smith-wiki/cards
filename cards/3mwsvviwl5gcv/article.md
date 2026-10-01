Selected published rates, checked October 1, 2026; these are hardware charges.

| Hardware | Resources | USD/hour |
| --- | --- | ---: |
| CPU Basic | 2 vCPU, 16 GB RAM | $0.01 |
| CPU Upgrade | 8 vCPU, 32 GB RAM | $0.03 |
| T4 small | 16 GB GPU memory | $0.40 |
| L4 | 24 GB GPU memory | $0.80 |
| A100 | 80 GB GPU memory | $2.50 |
| RTX PRO 6000 | 96 GB GPU memory | $2.75 |
| H200 | 141 GB GPU memory | $5.00 |

Billing is per minute in Starting and Running; build time is excluded. Exposing ports adds $0.01/hour per Job, regardless of port count. Storage and external services are separate considerations.

For example, 30 billable minutes on A100 is approximately $1.25 in hardware charges.

Sources: [Pricing and billing](https://huggingface.co/docs/hub/en/jobs-pricing), [hardware list in the Python guide](https://huggingface.co/docs/huggingface_hub/en/guides/jobs#select-the-hardware).
