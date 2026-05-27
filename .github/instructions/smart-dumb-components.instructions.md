---
applyTo: "src/app/features/**/*.{ts,html,scss}"
---

# Smart / dumb component guidelines

## Smart components

- Load data.
- Coordinate services.
- Build view models.
- Handle routing interactions.

## Dumb components

- Render state.
- Receive inputs.
- Emit outputs.
- Remain free of HTTP and routing logic.

## Avoid

- placing orchestration in presentational components
- passing services directly into dumb components
