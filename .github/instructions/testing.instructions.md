---
applyTo: "src/**/*.spec.ts"
---

# Testing guidelines

## Rules

- Test behavior, not implementation details.
- Update tests when behavior changes.
- Prefer small, readable Arrange / Act / Assert structure.

## Component tests

- Verify rendering, inputs, outputs, validation, and empty/loading/error states.

## Service tests

- Cover mapping, error handling, and edge cases.

## Avoid

- brittle tests tied to private methods
- over-mocking the system under test
