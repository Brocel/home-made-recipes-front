---
agent: 'agent'
name: analyze-file-optimization
description: 'Analyze a file and propose concrete optimizations or refactors'
---

Analyze the target file and propose improvements.

Context:

- File path or selection: ${input:file:Paste the file path or selected code}
- Goal: ${input:goal:What do you want to improve?}
- Constraints: ${input:constraints:Any architecture, performance, or style constraints?}

Requirements:

- Explain what the file does
- Identify code smells, duplication, unnecessary complexity, and risky patterns
- Separate high-impact changes from low-impact changes
- Respect the repository architecture and conventions
- Do not recommend changes that would fight the existing stack
- If the file is already good, say so explicitly
- Use most recent Angular best practices to guide the optimization argumentation

Output:

1. Summary
2. Problems found
3. Optimization ideas ranked by impact
4. Safe refactor plan
5. Questions or missing context
