---
agent: agent
name: generate-reactive-form
description: 'Generate an Angular smart component with a reactive form'
---

Create a smart Angular component that owns the form logic and orchestrates data flow.

Context:

- Feature name: ${input:feature:Which feature is this for?}
- Component name: ${input:component:Component name}
- Form purpose: ${input:purpose:What does the form do?}
- Fields: ${input:fields:List the fields and validation rules}
- Structure: ${input:structure:Any specific form structure or grouping?}
- Submission behavior: ${input:submit:What happens on submit?}
- Data source / service: ${input:service:Which service or API should it use?}
- Navigation / modal behavior: ${input:flow:Any routing, close, or modal behavior?}
- Actions: ${input:actions:What actions should the form trigger?}
- Secondary actions: ${input:secondary:Any cancel/reset or other secondary actions?}

Requirements:

- Use standalone component
- Use reactive forms
- Prefer inject() over constructor injection
- Use signals / computed state where relevant
- Keep business logic out of the template
- Include loading, disabled, and error states
- Use src/app/ui/layouts/form-layout to wrap the form
- Use the existing design system components (located in src/app/ui/primitives/form folder)
- Use the src/app/ui/primitives/app-button for form submission
- Keep the secondary actions outside the form-layout
- Use I18n keys for all text (labels, placeholders, error messages, button text, etc.)
- Preserve accessibility
- Always ask before modifying or refactoring code.

Output:

1. Recommended component structure
2. TS file
3. HTML file
4. SCSS file if needed
5. Notes about missing context
