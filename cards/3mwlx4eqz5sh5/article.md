# Fleet-wide rules are not automatically a permission ceiling

The selected sandbox policy is the base. Attached providers can add network rules, producing the effective policy that is enforced.

A gateway-wide global policy has different semantics: it replaces individual sandbox policies, blocks their changes and proposal approvals, and suppresses provider-contributed network rules while active. Removing it restores normal selection.

Source: [policy selection and composition](https://docs.nvidia.com/openshell/latest/how-it-works/policies/overview).

My implication for a mixed-role fleet: do not assume that a broad global policy intersects with a narrower researcher or publisher policy. Design and test the actual effective permissions. A deployment that needs organizational ceilings plus role-specific rules must explicitly implement and validate that composition rather than infer it from the word global.
