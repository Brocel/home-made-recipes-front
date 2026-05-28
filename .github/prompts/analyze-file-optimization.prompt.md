---
agent: 'agent'
name: analyze-file-optimization
description: 'Analyze a file and propose concrete optimizations or refactors'
---

Analyze the target file and propose improvements.

Context:

- Goal: ${input:goal:What do you want to improve?}
- Constraints: ${input:constraints:Any architecture, performance, style, or migration constraints?}
- Focus: ${input:focus:What should be prioritized? (performance, readability, structure, typing, reusability, accessibility, tests)}

Requirements:

- Use the file in the current chat context as the primary source.
- If the context is insufficient, say exactly what is missing before proposing changes.
- Explain what the file does.
- Identify code smells, duplication, unnecessary complexity, and risky patterns.
- Rank findings by impact.
- Respect the repository architecture and conventions.
- Do not recommend changes that would fight the existing stack.
- Use current Angular best practices when evaluating improvements.
- Keep refactors incremental and practical.

Output:

1. Summary
2. Problems found
3. Optimization ideas ranked by impact
4. Safe refactor plan
5. Questions or missing context
