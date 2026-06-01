---
agent: agent
name: review-performance
description: Review Angular UI code for performance risks
---

Review the provided Angular code for performance issues.

Requirements:

- Use the file in the current chat context as the primary source.
- If the context is insufficient, say exactly what is missing before proposing changes.

Check:

- Unnecessary subscriptions
- Inefficient rendering
- Missing track expressions
- Overly large components
- Avoidable change detection work
- Always ask before modifying or refactoring code.

Output:

1. Issues found
2. Severity
3. Concrete fixes
