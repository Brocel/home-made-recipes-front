---
agent: agent
name: review-performance
description: Review Angular UI code for performance risks
---

Review the provided Angular code for performance issues.

Context:

${input:context:Paste the code or describe the screen}

Check:

- Unnecessary subscriptions
- Inefficient rendering
- Missing track expressions
- Overly large components
- Avoidable change detection work

Output:

1. Issues found
2. Severity
3. Concrete fixes
