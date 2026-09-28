# Valid policy syntax does not imply the intended enforcement

The schema defaults an inspected endpoint's enforcement to audit: violations are logged but requests continue. enforce makes those rules blocking. Landlock best_effort can continue without the requested filesystem rules when they cannot be applied; hard_requirement fails startup instead. The mandatory baseline remains a separate requirement.

Source: [policy schema defaults](https://docs.nvidia.com/openshell/latest/how-it-works/policies/schema).

These settings should be explicit in a strict pilot, followed by tests that an authorized request succeeds and a forbidden one is denied. Check the actual applied paths, not just successful YAML parsing. No such deployment test was performed here.

The earlier [MCP limitation](card:3mwlvsdaiqi2i) still matters: allowing a tool name does not constrain every possible argument or prove the resulting action appropriate.
