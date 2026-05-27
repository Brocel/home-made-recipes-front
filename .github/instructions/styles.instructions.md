---
applyTo: 'src/app/**/*.scss'
---

# Styles guidelines

## Rules

- Use SCSS and existing CSS variables or design tokens.
- Keep selectors shallow and component-scoped.
- Use BEM-style naming where it improves clarity.
- Prefer reusable class composition over repeated declarations.
- Use mixins and functions for common patterns, but avoid over-abstraction.

## Avoid

- deep nesting
- `!important`
- inline styles
- hardcoded values when a token already exists
