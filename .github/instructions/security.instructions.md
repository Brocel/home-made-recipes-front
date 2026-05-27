---
applyTo: "src/app/**/*.{ts,html}"
---

# Security guidelines

## Rules

- Never expose secrets in code, templates, logs, or comments.
- Validate and sanitize external input.
- Keep authorization-sensitive logic outside dumb components.
- Avoid unsafe DOM manipulation unless there is no alternative.

## Avoid

- hardcoding credentials
- trusting user input without validation
- bypassing sanitization
