---
agent: 'agent'
name: generate-smart-component
description: 'Generate an Angular smart component with orchestration logic'
---

Generate a smart Angular component that manages data flow and orchestration.

Context:

- Feature name: ${input:feature:Which feature is this for?}
- Component name: ${input:component:Component name}
- Goal: ${input:goal:What should this component coordinate?}
- Services: ${input:services:Which services does it use?}
- Child components: ${input:children:Which dumb components does it render?}
- State: ${input:state:Loading, error, selection, filters, pagination, etc.}

Requirements:

- Analyse and see if any existing component can be reused or extended before creating a new one
- Use standalone component
- Use inject() for dependencies
- Use signals/computed for local UI state when appropriate
- Keep business logic out of child components
- Shape a clean view model for the template
- Prefer reactive forms if the feature includes user input
- Include loading/error/empty states
- Preserve accessibility
- Keep the component small and testable
- Always ask before modifying or refactoring code.

Output:

1. Suggested architecture
2. TS file
3. HTML file
4. SCSS file if needed
5. Test ideas
