# GitHub Copilot Instructions - Home Made Recipes Application

## Project Overview

This repository contains the front-end application for the Home Made Recipes platform.

The application helps users browse, search, create, edit, share recipes and plan weekly menu. It supports French (FR) and Brazilian Portuguese (BR).

User groups:

- Guest users can browse, search, and view recipes.
- Registered users can manage recipes, products, plans, and profile preferences.

Main features:

- Dashboard: personalized summary, weekly menu, profile shortcuts, and useful insights.
- Recipes: browse, search, filter, view, create, edit, and share recipes.
- Products: browse, search, filter, view, and add ingredients that can be used in recipes.
- Planner: weekly meal planning and shopping list generation.
- Profile: edit profile data, manage preferences, and navigate to the dashboard.
- Login/Registration: user authentication and account management.

## Core Principles

- Favor readability, maintainability, explicitness, and consistency over clever abstractions.
- Preserve accessibility, translations, and existing behavior.
- Prefer small, focused files and clear feature boundaries.
- Keep data flow explicit and avoid hidden side effects.

## Key Architecture Patterns

### Smart / Dumb Component Pattern

- Smart components handle data fetching, orchestration, routing interaction, and page-level state.
- Dumb components render data and emit events only.
- Dumb components must not call HTTP services, router APIs, or feature services directly.
- Dumb components should receive data through `input()` and emit actions through `output()`.

### Feature-Based Organization

- Organize code by business feature instead of technical layer whenever possible.
- Keep unrelated logic out of shared folders.
- Prefer a local feature folder for components, services, models, and validators that belong together.

### State Management Strategy

Use the simplest solution that fits the problem:

1. Local component state
2. Signals
3. Shared services
4. Global state libraries only when genuinely required

- Prefer `signal()` for local mutable state.
- Prefer `computed()` for derived state.
- Use `effect()` only for side effects.
- Avoid unnecessary RxJS complexity for UI-only state.

### Reactive Forms

- Use Reactive Forms for authentication, create/edit flows, search filters with validation, and other complex interactions.
- Strongly type forms whenever practical.
- Keep validation explicit and reusable.
- Avoid template-driven forms absolutely.

### Dependency Injection

- Prefer `inject()` instead of constructor injection unless a framework constraint requires otherwise.

## Development Conventions

- Use strict TypeScript.
- Avoid `any`.
- Prefer readonly properties.
- Use meaningful names and explicit return types for public APIs.
- Keep methods short and focused.
- Use camelCase for variables and functions.
- Use PascalCase for classes and components.
- Use kebab-case for folders and file names.
- Use CSS variables and SCSS for styling.
- Follow BEM-style class naming where it fits the component.
- Use always Angular template control flow (`@if`, `@for`, `@switch`).
- Use import aliases defined in `tsconfig.json`.

## Accessibility Expectations

- Use semantic HTML.
- Associate labels with inputs.
- Preserve keyboard navigation and visible focus states.
- Add accessible names to icon-only controls.
- Do not sacrifice accessibility for visual design.

## Internationalization

- All user-facing text must be translatable.
- Do not hardcode visible strings in templates or components.
- Use the repository translation conventions consistently for FR and BR.
- Use the translation dictionnary for I18n (`assets/i18n`) and avoid ad-hoc translation approaches.
- Preserve existing translations and update them when behavior changes.

## API and Data Handling

- Keep API DTOs isolated from presentation components.
- Map backend DTOs to UI/domain models before using them in the view layer.
- Use `Omit<>` or `Partial<>` to create variations of models when needed instead of creating new ones.
- Keep API services focused on transport and data mapping.
- Do not leak backend response shapes directly into components.

## Testing and Quality

- Update tests whenever behavior changes.
- Add tests for validation, edge cases, loading states, empty states, and error states.
- Keep lint, test, and build scripts green before finishing work.
- Remove dead code and unused imports.

## AI Agent Guidelines

- Generated code must compile and match the repository conventions.
- Do not rewrite unrelated code.
- Do not introduce new dependencies without a clear need.
- Do not make large refactors or architectural changes without explicit instructions.
- Do not commit anything.
- Preserve accessibility, translations, and existing behavior.
- Prefer the smallest change that solves the problem.

## Definition of Done

A change is complete only when:

- the code compiles,
- lint passes,
- tests pass,
- accessibility is preserved,
- translations are updated,
- loading/error/empty states are handled when relevant.
