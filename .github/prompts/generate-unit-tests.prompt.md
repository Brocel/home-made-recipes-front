---
agent: 'agent'
name: generate-unit-tests
description: 'Generate or update Angular unit tests for the selected file'
---

Analyze the target file and generate the minimum useful test coverage.

Context:

- Target file: ${input:file:Paste the file path or selected code}
- Test framework: Angular + the repository's existing test setup

Requirements:

- Cover the public behavior, not implementation details
- Include happy path, edge cases, and error states when relevant
- Mock only external dependencies
- Keep tests readable and maintainable
- Follow the repository naming and testing conventions
- Prefer clear Arrange / Act / Assert structure
- Do not over-mock
- Update existing tests if needed rather than duplicating them
- Always ask before modifying or refactoring code.

Output:

1. What should be tested
2. The proposed test cases
3. The test code
4. Any risk or missing context
