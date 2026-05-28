---
agent: agent
name: review-accessibility
description: Review Angular UI code for accessibility issues
---

Review the provided Angular code for accessibility issues.

Requirements:

- Use the file in the current chat context as the primary source.
- If the context is insufficient, say exactly what is missing before proposing changes.

Check:

- semantic HTML
- labels and accessible names
- keyboard navigation
- focus states
- form error messaging
- icon-only controls

Return:

- issues found
- severity
- concrete fixes
