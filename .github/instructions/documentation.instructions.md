---
applyTo: 'src/app/**/*.ts'
---

# Documentation guidelines

## Rules

- Add comments only when they explain non-obvious decisions.
- Prefer JSDoc for public functions and classes when documentation adds value.
- Keep comments synchronized with the code.

## Avoid

- commenting obvious code
- duplicating what the type system already states

## Comment instructions

- Separate relevant code part of a .ts file with clear title, example:

```ts
  // =========================================================
  // Inputs
  // =========================================================
  readonly loginData = input<any>('');

  // =========================================================
  // Ouputs
  // =========================================================
  readonly successfulLogin = output<void>();

  // =========================================================
  // State
  // =========================================================
  readonly loading = signal(false);
```
