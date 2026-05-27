---
applyTo: "src/app/**/*.ts"
---

# Angular guidelines

## Preferred Angular APIs

Prefer:
- standalone components
- `signal()`
- `computed()`
- `effect()`
- `input()`
- `output()`
- `inject()`
- reactive forms

## Component rules

- Use standalone components by default.
- Keep components small and focused.
- Avoid constructors for dependency injection unless required.
- Keep orchestration out of dumb components.

## TypeScript rules

- Use strict typing.
- Avoid `any`.
- Prefer explicit return types for public methods.
- Keep methods short and readable.

## RxJS usage

- Use observables for remote data and event streams.
- Avoid manual subscriptions when a template pipe or signal-based alternative is better.
- Do not use RxJS for simple local UI state.
