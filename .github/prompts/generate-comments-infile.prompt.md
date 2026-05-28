---
agent: 'agent'
name: generate-comments-infile
description: Add meaningful documentation comments to a TypeScript file
---

Review the TypeScript file available in the current chat context or active editor, then add only comments that improve clarity.

Important:

- Respect the repository documentation instructions.
- Do not add comments just because a section exists.
- Do not repeat what the type system or obvious code already says.
- Prefer JSDoc only when it adds value for public APIs, exported types, or complex logic.
- Add section separators only when they genuinely improve readability in a larger file.
- Leave the file unchanged if it is already clear enough.

Focus on:

- non-obvious decisions
- architectural intent
- tricky logic
- framework-specific behavior
- meaningful sectioning in larger files

Avoid:

- obvious comments
- redundant comments
- decorative separators
- over-documenting small functions or simple assignments

Output:

1. A short assessment of whether documentation is needed
2. The commented version of the file
3. A brief note on what was intentionally left uncommented
