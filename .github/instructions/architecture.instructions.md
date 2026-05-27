---
applyTo: "src/app/**/*.{ts,html,scss}"
---

# Architecture guidelines

## Boundaries

- Keep feature code inside the owning feature folder whenever possible.
- Do not move feature-specific logic into shared folders unless it is truly reusable.
- Keep presentation, orchestration, and data access separated.

## Smart / Dumb split

- Smart components may coordinate services, routing, and page state.
- Dumb components must only render inputs and emit outputs.
- Dumb components must not know about HTTP, router, or storage concerns.

## State

- Prefer local state first.
- Use signals for component state.
- Use shared services only when multiple components need the same state.
- Introduce a global store only when the feature genuinely requires it.

## Side effects

- Keep side effects explicit and isolated.
- Use `effect()` only when synchronizing with external systems.
- Do not derive state inside side effects.
