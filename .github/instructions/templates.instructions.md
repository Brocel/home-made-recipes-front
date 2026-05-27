---
applyTo: 'src/app/**/*.html'
---

# Template guidelines

## Rules

- Keep templates declarative.
- Prefer `@if`, `@for`, and `@switch`.
- Use `track` for repeated lists.
- Keep business logic out of templates.
- Use semantic HTML first.

## Accessibility

- Ensure labels are associated with controls.
- Preserve keyboard navigation.
- Keep focus indicators visible.
- Add accessible names to icon-only buttons.

## Avoid

- nested ternaries
- complex inline expressions
- duplicated branches that can be extracted into computed state
