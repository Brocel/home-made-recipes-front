---
name: api-mapper-generator
description: Generate typed API services and DTO-to-model mappers for the Home Made Recipes application. Use this when working on HTTP services, transformations, or remote data contracts.
---

# API mapper generator

Use this skill when adding or refactoring API services and mapping logic.

## Process

1. Define the DTO shape.
2. Define the UI/domain model.
3. Add mapping functions.
4. Keep HTTP transport in the API service.
5. Keep presentation components free of transport logic.
6. Add tests for mapping and error handling.

## Output expectations

- Keep DTOs isolated from the view layer.
- Use typed models.
- Keep services focused on one responsibility.
- Avoid leaking backend response shapes into components.
