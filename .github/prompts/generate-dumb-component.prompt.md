---
agent: 'agent'
name: generate-dumb-component
description: 'Generate a presentational Angular dumb component'
---

Create a dumb Angular component that only renders UI and emits user actions.

Context:

- Component name: ${input:component:Component name}
- Purpose: ${input:purpose:What should it display?}
- Inputs: ${input:inputs:List all inputs and their types}
- Outputs: ${input:outputs:List all events to emit}
- Visual states: ${input:states:Empty, loading, error, selected, disabled, etc.}
- Styling notes: ${input:style:Any styling or design system constraints?}
- Accessibility notes: ${input:accessibility:Any accessibility constraints?}

Requirements:

- Check if a similar component already exists in src/app/ui/primitives before creating a new one
- No HTTP calls
- No routing logic
- No direct business logic
- No service orchestration
- Use inputs/outputs only
- Keep the template simple and declarative
- Follow the repository style and accessibility conventions

Before writing code, ask for any missing context that is necessary to build it safely.
Then output:

1. Required missing context
2. Component structure
3. TS file
4. HTML file
5. SCSS file if needed
