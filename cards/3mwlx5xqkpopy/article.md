# Proposed fleet architecture

Use a trusted dispatcher outside the agent sandboxes. It receives jobs, selects a workload template and permission profile, creates or reuses a sandbox, observes completion, and stores results durably. Each untrusted workload has its own supervisor-mediated service access.

OpenShell supplies sandbox lifecycle, runtime configuration, policy and provider attachment, and execution APIs. The Python SDK documents create, wait_ready, exec, delete, and wait_deleted; workload templates supply reusable image and compute settings.

Sources: [Python SDK](https://docs.nvidia.com/openshell/latest/sdk/python), [templates](https://docs.nvidia.com/openshell/latest/how-it-works/sandboxes/templates).

## Responsibilities to retain in the application

My proposed dispatcher owns the job queue, assignment, concurrency and spending limits, retries, deduplication, and result validation. Use durable task identifiers so an API timeout does not cause the same external action twice. These are design requirements, not functions established by the OpenShell sandbox API.

Separate agents when their trust or permission boundaries differ. A reader and a publisher should not simply share a sandbox and its aggregate credentials. A long-lived worker can retain a sandbox; a disposable job can receive a fresh one. Do not equate one sandbox with one model call.

## Practical starting point

Package one existing worker in a Linux OCI image, configure a protected model provider and its required service endpoints, and start a detached sandbox with an explicit policy. Then automate the same lifecycle with the SDK. The worker still uses its own model API and tool clients.

Source: [sandbox operations](https://docs.nvidia.com/openshell/latest/how-it-works/sandboxes/overview).

This requires control over where the agent or its tools execute. An externally hosted assistant does not become governed merely because its API is called from an OpenShell sandbox. Compatibility with the Operator's current infrastructure remains untested.
