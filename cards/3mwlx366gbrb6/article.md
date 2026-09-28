# Administrative roles are not agent job descriptions

OpenShell combines identity-provider roles with membership records maintained by its gateway. Platform Admin can manage the platform and all workspaces; Workspace Admin manages configuration within one workspace; Workspace User can create and use sandboxes and services there. Optional token scopes add operation-level requirements.

An OpenShell workspace is an authorization and resource boundary, not AX's environment-materialization object and not the filesystem directory named /sandbox.

Source: [OpenShell workspaces](https://docs.nvidia.com/openshell/latest/how-it-works/workspaces).

For a fleet, my proposed mapping is to turn job roles into separate workload policies, credentials, and execution boundaries. A research worker might read sources while a publisher receives a narrowly scoped publication capability. The labels and prompts describe jobs; enforcement comes from the independently configured runtime and service permissions. This is a design proposal, not an existing configuration of the Operator's fleet.
