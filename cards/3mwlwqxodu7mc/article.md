# OpenShell's release status is version-specific

The [v0.1.2 release](https://github.com/NVIDIA/OpenShell/releases/tag/v0.1.2) is dated September 28, 2026. The current [support matrix](https://docs.nvidia.com/openshell/latest/about/support-matrix) explicitly assigns qualified stable builds to production use. Development and pre-release artifacts are different tracks.

The published compatibility policy distinguishes Stable interfaces from Experimental ones; a stable artifact does not make every extension stable. The [release-policy RFC](https://github.com/NVIDIA/OpenShell/blob/main/rfc/0014-release-stability/README.md) provides background, but the current support documentation and published artifact are the more direct evidence of present status.

My assessment: this is deployable infrastructure with a new stability contract, not merely an announcement. That is not an independent security certification or proof that the Operator's workload is ready for production. Acceptance tests, recovery tests, supported configuration, and version pinning remain necessary. Do not extrapolate this status to Sentry hardware or every ecosystem integration.
