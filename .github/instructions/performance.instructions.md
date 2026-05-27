---
applyTo: "src/app/**/*.{ts,html,scss}"
---

# Performance guidelines

## Rules

- Prefer lazy loading for feature routes.
- Use `track` in repeated lists.
- Prefer computed signals for derived UI state.
- Keep components small and focused.

## Avoid

- unnecessary subscriptions
- large monolithic components
- change-detection-heavy patterns when simpler alternatives exist
