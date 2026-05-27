---
applyTo: "src/app/**/*.ts"
---

# API and data handling guidelines

## Rules

- Keep DTOs isolated from components.
- Map remote data into UI-friendly models.
- Keep transport logic inside API services.
- Keep UI logic out of API services.

## Avoid

- leaking backend response shapes into the view layer
- placing transformation logic in templates
