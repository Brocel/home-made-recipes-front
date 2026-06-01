---
agent: 'agent'
name: generate-modal
description: 'Generate an Angular modal using the existing modal system'
---

Complete the existing modal-host with a smart modal, reusing the existing modal system.

Context:

- Component name: ${input:component:Component hosted by the modal}
- Modal purpose: ${input:purpose:What is the modal for?}
- Actions: ${input:actions:What actions should the modal trigger?}

Requirements:

- Reuse the existing modal architecture: src/app/features/ux/modal-host and src/app/ui/services/modal.service.ts
- Do not build a new modal system
- Use signals where relevant
- Keep accessibility and focus handling intact
- Include clear open / close behavior
- Keep template logic simple
- Always ask before modifying or refactoring code.

Output:

1. Integration plan
2. TS file
3. HTML file
4. SCSS file if needed
5. Any assumptions or missing details
