# Creating an agent is separate from publishing a guest chat

Documentation checked September 29, 2026; no endpoint was executed.

The [Agents API reference](https://www.librechat.ai/docs/features/agents_api#agent-management-api) lists `POST /api/agents/v1/agents` for creation.

The [management configuration](https://www.librechat.ai/docs/configuration/librechat_yaml/object_structure/agents#managementapi) requires an allowlisted OIDC machine client bound to an existing LibreChat user and tenant. Management does not accept Remote Agents API keys or browser sessions. The bound identity keeps its existing permissions; this is not an administrative bypass.

For a manually configured pilot, the documented [Agent Builder](https://www.librechat.ai/docs/features/agents#getting-started) provides another creation route. My proposed starting point is to configure the agent there and use the inference API from the application backend, avoiding machine-management setup until automated provisioning is needed.

Both approaches are compatible with the [proposed public gateway](https://cards.smith.wiki/3mwnecxshkh4p/), but neither creates a no-authentication inference endpoint. The Management API is beta, so verify the required routes and configuration in the actual deployed version.
