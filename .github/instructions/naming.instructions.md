---
applyTo: 'src/app/**/*.{ts,html,scss}'
---

# Naming guidelines

## Rules

- Use camelCase for variables and functions.
- Use PascalCase for classes and components.
- Use kebab-case for folder and file names.
- Boolean names should start with `is`, `has`, `can`, or `should`.
- Prefix the class name with 'App' (and the file name with app-) when there is an ambiguity (example: for a custom Input component -> AppInput, app-input.ts).

## Avoid

- abbreviations that reduce readability
- inconsistent suffixes for similar artifacts
- 'Component' suffix for component file and class names
