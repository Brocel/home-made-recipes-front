---
name: refactor-proposal
description: Propose component, service, model, or type refactors that fit the repository architecture.
---

When asked to refactor code, follow this process:

1. Identify the unit of change: component, service, model, type, or feature.
2. Map dependencies and side effects.
3. Classify the change as low, medium, or high risk.
4. Check whether the change preserves the smart/dumb split.
5. Check whether the change preserves typing, accessibility, and testability.
6. Prefer small, incremental refactors.
7. Prefer signals, inject(), reactive forms, and standalone components where appropriate.
8. Avoid rewriting unrelated code.
9. Suggest the best structure for the repository.
10. Provide a practical implementation plan before any code rewrite.

Output:

- Refactor diagnosis
- Proposed structure
- Incremental steps
- Risks
- Suggested code changes
