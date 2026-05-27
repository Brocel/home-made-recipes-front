---
applyTo: "src/app/**/*.ts"
---

# RxJS guidelines

## Rules

- Use observables for remote data streams and asynchronous events.
- Keep subscriptions managed and deliberate.
- Prefer template or signal-based consumption where it simplifies the code.

## Avoid

- using RxJS for simple synchronous UI state
- nested observable chains when a clearer mapping exists
- manual subscriptions without cleanup
