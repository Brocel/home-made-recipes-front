---
applyTo: 'src/app/**/*.ts'
---

# Documentation Guidelines

## Philosophy

Documentation should improve understanding, not create noise.

Comments must:

- explain intent
- clarify non-obvious decisions
- document architectural reasoning
- help navigation in large files

Comments must NOT:

- restate obvious code
- duplicate type information
- describe trivial assignments
- explain standard Angular syntax

Prefer self-documenting code whenever possible.

---

# General Rules

- Keep comments concise and meaningful.
- Keep comments synchronized with the implementation.
- Remove outdated comments immediately.
- Prefer clear naming over excessive documentation.
- Add comments only when they provide additional value.

---

# JSDoc Usage

Use JSDoc selectively for:

- exported public APIs
- reusable utilities
- complex functions
- shared abstractions
- non-obvious behaviors
- framework-specific constraints

Example:

```ts
/**
 * Maps API DTOs into UI-friendly recipe models.
 */
function mapRecipeDto(dto: RecipeDto): Recipe {}
```

Avoid JSDoc for:

- trivial getters/setters
- obvious one-line methods
- private implementation details with clear naming

---

# Section Comments

Use section separators only when they improve readability in medium or large files.

Prefer grouping:

- dependencies
- inputs
- outputs
- state
- computed values
- view models
- lifecycle hooks
- public methods
- private methods

Example:

```ts
// =========================================================
// Dependencies
// =========================================================

private readonly router = inject(Router);

// =========================================================
// Inputs
// =========================================================

readonly recipeId = input.required<string>();

// =========================================================
// State
// =========================================================

readonly loading = signal(false);
```

Do not over-segment very small files.

---

# Inline Comments

Use inline comments only for:

- tricky business logic
- temporary framework workarounds
- performance-sensitive code
- uncommon Angular behavior
- non-obvious transformations

Example:

```ts
// Preserve scroll position before route replacement.
```

Avoid:

```ts
// Set loading to true
this.loading.set(true);
```

---

# Angular-Specific Guidelines

- Prefer documenting WHY over HOW.
- Document signal interactions only when behavior is non-trivial.
- Document side effects when using `effect()`.
- Document complex reactive form logic when validation flows are difficult to understand.
- Document architectural boundaries when relevant.

---

# File Organization

Prefer consistent file organization before adding comments.

Well-structured code should reduce the need for documentation.

Typical order:

1. Dependencies
2. Inputs
3. Outputs
4. State
5. Computed values
6. View models
7. Lifecycle hooks
8. Public methods
9. Private methods

---

# Avoid

- Commenting obvious code
- Decorative comments without purpose
- Redundant comments
- Large narrative blocks
- Explaining what TypeScript already expresses
- Explaining obvious Angular APIs

Bad example:

```ts
// Create a signal
readonly loading = signal(false);
```

Bad example:

```ts
// Loop through recipes
recipes.forEach(...)
```

---

# Preferred Outcomes

Good documentation should:

- reduce cognitive load
- improve maintainability
- accelerate onboarding
- clarify architectural intent
- help future refactoring
