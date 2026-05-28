---
agent: 'agent'
name: refactor-style
description: 'Refactor SCSS of an Angular component using the project styling system'
---

Refactor SCSS of a component using the repository styling system.

Context:

- Component type: ${input:type:Smart, dumb, layout, form, modal, card, etc.}
- Visual states: ${input:states:Default, hover, focus, active, disabled, loading, error, etc.}
- Responsive rules: ${input:responsive:Any responsive behavior?}
- Layout constraints: ${input:layout:Grid, flex, spacing, size constraints, etc.}

Requirements:

- Use the file in the current chat context as the primary source.
- If the context is insufficient, say exactly what is missing before proposing changes.
- Use the existing styling system (src/styles and src/styles.scss) and conventions
- Identify and reuse existing variables, mixins, and tokens
- Create new variables or mixins only if necessary and follow the existing naming conventions
- Do not introduce arbitrary values when a token exists
- Keep selectors shallow and maintainable
- Avoid deep nesting and !important
- Scope styles to the component
- Preserve accessibility and focus visibility

Output:

1. Styling approach
2. SCSS file
3. Any token or mixin assumptions
