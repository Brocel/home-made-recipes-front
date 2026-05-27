---
applyTo: 'src/app/**/*.ts'
---

# Reactive forms guidelines

## Rules

- Use Reactive Forms for create/edit flows, authentication, and validated filters.
- Strongly type forms where practical.
- Keep validation explicit and reusable.
- Extract validators when they are shared or non-trivial.

## UI behavior

- Disable submit while the form is invalid or pending.
- Show validation messages close to the relevant control.
- Keep errors concise and specific.

## Avoid

- template-driven forms
- scattering validation rules across many files
- mixing form orchestration with presentation logic
