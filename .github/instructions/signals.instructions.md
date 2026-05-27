---
applyTo: "src/app/**/*.ts"
---

# Signals guidelines

## Rules

- Use `signal()` for local mutable state.
- Use `computed()` for derived state only.
- Use `effect()` only for side effects, not derived state.
- Prefer immutable updates.
- Keep writable signals private unless they must be consumed externally.

## Good patterns

```ts
readonly recipes = signal<Recipe[]>([]);
readonly featuredRecipes = computed(() => this.recipes().filter(recipe => recipe.featured));
```

## Avoid

- mutating signal values in place
- using signals to hide side effects
- creating a signal for state that never changes
