---
agent: 'agent'
name: 'analyze-app-system'
description: 'Analyze a full app or a scoped system and suggest optimizations, refactors, and architectural improvements'
---

Analyze the application or the requested system deeply, then propose concrete optimization and refactoring opportunities.

Context:

- System name: ${input:systemName:What system should be analyzed? (for example: Modal system, Toaster system, Form Validation system, or the whole app)}
- Folders to explore: ${input:folders:Which folders should be analyzed? Separate paths with commas}
- Specific files to inspect: ${input:files:Which exact files should be analyzed in particular? Separate paths with commas}
- Analysis goal: ${input:goal:What do you want from the analysis? (performance, architecture, maintainability, duplication, accessibility, i18n, testability, etc.)}
- Constraints: ${input:constraints:Any constraints to respect? (existing architecture, Angular 20 patterns, no new dependencies, etc.)}
- Output style: ${input:style:Do you want a short summary, a detailed report, or a prioritized action plan?}

Requirements:

- First identify the scope and summarize what the system does.
- Inspect the requested folders and the specific files in priority order.
- Detect duplication, dead code, unnecessary complexity, weak typing, invalid boundaries, and inconsistent patterns.
- Check alignment with the repository instructions, especially:
  - smart / dumb component split
  - standalone components
  - signals and computed state
  - reactive forms
  - inject() instead of constructor injection when appropriate
  - accessibility
  - i18n
  - SCSS and design-system usage
  - testing expectations
- Separate findings by impact:
  - critical
  - high
  - medium
  - low
- Distinguish between:
  - safe quick wins
  - refactors that need coordination
  - changes that are probably not worth doing
- Do not propose a rewrite of unrelated parts of the app.
- Do not invent architecture that does not already fit the repository.
- If relevant context is missing, say exactly what is missing before proposing a solution.

Output:

1. Scope summary
2. What is working well
3. Problems and risks found
4. Optimization and refactoring ideas ranked by impact
5. Recommended refactor plan in small steps
6. Files that should be reviewed next
7. Missing context or assumptions
