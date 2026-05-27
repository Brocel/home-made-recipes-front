---
name: factorisator
description: Extract reusable logic into utilities or shared services when it is genuinely reusable.
---

When asked to identify reusable logic, follow this workflow:

1. Read the target file and nearby callers.
2. Identify repeated logic, branching, or transformation code.
3. Check whether the logic is truly reusable across the app.
4. Prefer a utility function for pure logic.
5. Prefer a shared service when the logic needs DI, state, or side effects.
6. Avoid extracting one-off code.
7. Avoid over-abstracting early.
8. Keep the public API small and explicit.
9. Preserve the current architecture and naming conventions.
10. Suggest the safest extraction path first.

Output:

- What can be extracted
- Why it is reusable
- Where it should live
- What the new API should look like
- Risks or trade-offs
