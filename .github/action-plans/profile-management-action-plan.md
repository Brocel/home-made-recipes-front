# 📋 Action Plan: Profile Management Feature

**Feature:** User profile viewing & editing  
**Status:** Ready for implementation  
**Date:** June 1, 2026  
**Duration:** 8-10 days (1.5-2 weeks)

---

## 🎯 Feature Overview

**Scope:**

- Current user can view and edit their own profile (bio, avatar selection, password)
- Any user can view restricted author profiles (name, avatar, join date, recipe count)
- Avatar selection: choose from predefined avatars in `assets/avatars/` or display initials (with default avatar fallback)
- No email editing in profile (email uniqueness checked during registration only)
- Confirm password field reuses existing registration pattern

**Out of Scope:**

- Avatar uploads (not needed)
- Social features (follow/unfollow)
- Account deletion handling (defer for implementation phase)
- GDPR data export
- Profile verification badges

---

## 📅 Phase Breakdown

### **Phase 1: Discovery & Setup** (1 day)

**Goal:** Define data contracts and design

#### Task 1.1: Finalize API contract with backend

- **What:** Confirm `/api/user/me` (GET, PUT) and `/api/user/:id` (GET) contracts
- **Deliverable:** API spec document (mock endpoints ready for frontend)
- **Assignee:** Tech Lead + Backend Engineer
- **Timeline:** 1 day
- **Notes:** Backend team will develop before frontend implementation per PM

#### Task 1.2: Design profile modal layout

- **What:**
  - Profile edit form: bio (textarea), avatar selector (dropdown/preview), password, confirm password
  - Author profile view: name, avatar, join date, recipe count
  - All fields with labels and i18n placeholders
- **Deliverable:** Wireframes or component spec
- **Assignee:** Designer + Product Owner
- **Timeline:** 1 day

#### Task 1.3: Review accessibility requirements

- **What:**
  - Modal focus management (use existing modal system)
  - Form label associations
  - Keyboard navigation (Tab, Enter, Escape)
- **Deliverable:** A11y checklist (WCAG 2.1 AA)
- **Assignee:** QA/A11y Lead
- **Timeline:** 0.5 day

---

### **Phase 2: Data Layer** (2-3 days)

**Goal:** Create API services and data models

#### Task 2.1: Create UserApi service

- **What:**
  - `GET /api/user/me` — fetch current user profile + extended details
  - `PUT /api/user/me` — update current user profile (bio, avatar selection, password)
  - `GET /api/user/:id` — fetch public user profile (name, avatar, join date, recipe count only)
  - Error handling: network, 400, 401, 403, 500
- **File:** `src/app/core/api/user.api.ts`
- **Assignee:** Fullstack Engineer
- **Timeline:** 2 days
- **Depends on:** Task 1.1
- **Notes:**
  - Follow RecipesApi/ProductApi patterns
  - No multipart form handling (avatars are predefined, not uploaded)

#### Task 2.2: Create UserProfile models & mappers

- **What:**
  - `UserProfileResponse` (API DTO — all fields from backend)
  - `UserProfile` (UI model — restricted fields, no sensitive data)
  - `UserProfileFormModel` (form-friendly shape)
  - Mapper: strip PII (no email, no private settings)
- **File:** `src/app/shared/models/user-profile.model.ts`
- **Assignee:** Fullstack Engineer
- **Timeline:** 1 day
- **Depends on:** Task 2.1
- **Notes:**
  - Public profile: name, avatar, joinDate, recipeCount only
  - Own profile: name, avatar, joinDate, recipeCount, bio

#### Task 2.3: Integrate UserApi into DI & AuthStore

- **What:**
  - Provide `UserApi` in `app.config.ts`
  - Add method to `AuthStore` to update `profileDetails` signal after edit
  - Export from DI for component injection
- **File:** `src/app/app.config.ts`, `src/app/core/store/auth.store.ts`
- **Assignee:** Fullstack Engineer
- **Timeline:** 0.5 day
- **Depends on:** Task 2.1

---

### **Phase 3: Forms & Validation** (2-3 days)

**Goal:** Build reusable form validators and factory

#### Task 3.1: Create profile form validators

- **What:**
  - `bioBioValidator`: max length (250 chars), trim whitespace, no spam patterns
  - Reuse existing `passwordMatch` validator for confirm password
  - Password strength: reuse registration pattern (already exists)
- **File:** `src/app/features/user/validators/profile.validators.ts`
- **Assignee:** Fullstack Engineer
- **Timeline:** 1 day
- **Depends on:** Task 1.2
- **Notes:**
  - Email uniqueness check NOT needed (only for registration)
  - Confirm password pattern already exists in RegisterForm

#### Task 3.2: Create profile form factory

- **What:**
  - `createProfileForm(profile: UserProfile): FormGroup<ProfileFormModel>`
  - Pre-populate form with current user data
  - Wire up validators
  - Add form reset logic for cancel/close
- **File:** `src/app/features/user/profile/profile-form.factory.ts`
- **Assignee:** Fullstack Engineer
- **Timeline:** 1 day
- **Depends on:** Task 3.1, Task 2.2
- **Notes:**
  - Use `FormArray` for avatar selector (list of available avatars)

#### Task 3.3: Create avatar selector utility

- **What:**
  - Load available avatars from `assets/avatars/`
  - Generate initials from name fallback
  - Return default avatar if neither available
  - Map avatar filename to display (for form control)
- **File:** `src/app/features/user/utils/avatar.util.ts`
- **Assignee:** Fullstack Engineer
- **Timeline:** 0.5 day
- **Depends on:** Task 1.2
- **Notes:**
  - List avatars: `['avatar-1.png', 'avatar-2.png', ...]`
  - Initials generator: extract first letters from name
  - Default fallback: `assets/avatars/default-avatar.png`

---

### **Phase 4: Components** (3-4 days)

**Goal:** Build smart (edit) and dumb (form, view) components

#### Task 4.1: Build ProfileEditContainer (SMART modal component)

- **What:**
  - Inject: `AuthStore`, `UserApi`, `ModalService`, `NotificationService`, `FormBuilder`
  - Load current profile from `AuthStore.profileDetails()`
  - Handle form submission → `UserApi.updateProfile()`
  - Show loading state during submit (`isSubmitting` signal)
  - Handle errors gracefully (validation, network, permission)
  - Update `AuthStore.profileDetails` on success
  - Emit success event to close modal via `ModalService`
  - Display success toast (use existing toast system)
- **File:** `src/app/features/user/profile/profile-edit.component.ts`
- **Assignee:** Fullstack Engineer
- **Timeline:** 1.5 days
- **Depends on:** Task 3.2, Task 2.3
- **Notes:**
  - Smart component: no @Input/@Output (modal lifecycle handled by ModalService)
  - Use signals for local state: form, isSubmitting
  - Use `takeUntilDestroyed()` for RxJS cleanup

#### Task 4.2: Build ProfileEditForm (DUMB modal component)

- **What:**
  - @Input() `form: FormGroup<ProfileFormModel>`
  - @Input() `isSubmitting: boolean`
  - @Output() `save: EventEmitter<ProfileFormValue>`
  - Form controls:
    - Bio textarea (max 250 chars, show counter)
    - Avatar selector (dropdown with preview thumbnail, initials fallback)
    - Password input (hidden)
    - Confirm password input (hidden)
  - Validation error display (inline under each control)
  - Submit button (disabled while submitting)
  - Cancel button (emit cancel event)
  - All labels + error messages i18n'd
- **File:** `src/app/features/user/profile/profile-edit-form.component.ts` + `.html` + `.scss`
- **Assignee:** Fullstack Engineer
- **Timeline:** 1.5 days
- **Depends on:** Task 4.1
- **Notes:**
  - Dumb component: only renders form, emits events
  - Avatar preview: show selected avatar or initials
  - Error display: `aria-describedby` linked to error element
  - i18n keys: `profile.form.bio.label`, `profile.form.password.error.mismatch`, etc.

#### Task 4.3: Build ProfileEditTemplate (DUMB component)

- **What:** Reusable profile edit form template (can be used in modal or page)
- **File:** `src/app/features/user/profile/profile-edit.template.html`
- **Assignee:** Fullstack Engineer
- **Timeline:** 0.5 day
- **Depends on:** Task 4.2
- **Notes:** Shared template for form controls + validation display

#### Task 4.4: Build AuthorProfileView (DUMB component)

- **What:**
  - @Input() `profile: UserProfile`
  - Display:
    - Avatar (image or initials)
    - Name
    - Join date (formatted)
    - Recipe count
  - NO edit controls (read-only)
  - Semantic HTML, alt text on avatar
  - i18n all labels
- **File:** `src/app/features/user/profile/author-profile.component.ts` + `.html` + `.scss`
- **Assignee:** Fullstack Engineer
- **Timeline:** 1 day
- **Depends on:** Task 2.2
- **Notes:**
  - Dumb component: only receives @Input
  - Used in modal OR embedded in recipe view
  - Accessibility: image alt text, semantic heading levels

---

### **Phase 5: Modal Integration** (1-2 days)

**Goal:** Wire profile components into existing modal system

#### Task 5.1: Integrate ProfileEditContainer into modal system

- **What:**
  - Add `ProfileModalConfig` to modal discriminated union
  - Create `buildProfileConfig()` builder function (follows existing pattern)
  - Register in `ModalOrchestratorService` if needed
  - Export from modal service for use in components
- **File:** `src/app/ui/overlays/modal/modal-config.union.ts`, `src/app/ui/overlays/modal/builders/profile-modal.builder.ts`
- **Assignee:** Fullstack Engineer
- **Timeline:** 0.5 day
- **Depends on:** Task 4.1
- **Notes:**
  - Follow existing modal patterns (LoginModalConfig, RegisterModalConfig)
  - Modal handles focus management (already implemented)

#### Task 5.2: Wire profile link in navbar/profile menu

- **What:**
  - Add click handler on profile menu → open profile edit modal
  - Test: click profile menu → modal opens with current user data
  - Verify: after save, modal closes and AuthStore updates
- **File:** `src/app/features/ux/profile-menu/profile-menu.component.ts`
- **Assignee:** Fullstack Engineer
- **Timeline:** 0.5 day
- **Depends on:** Task 5.1
- **Notes:**
  - Use existing ProfileMenu component

#### Task 5.3: Wire author profile view in recipe detail

- **What:**
  - Add click handler on author name in RecipeView → open author profile modal
  - Load author profile via `UserApi.getPublicProfile(userId)`
  - Display in modal using `AuthorProfileView` component
  - Test: click author → AuthorProfileView opens with read-only data
- **File:** `src/app/features/recipes/recipe-full/recipe-full.component.ts`
- **Assignee:** Fullstack Engineer
- **Timeline:** 1 day
- **Depends on:** Task 5.1, Task 4.4
- **Notes:**
  - Use ModalService to open author profile modal
  - Add new modal config type for author profile view

---

### **Phase 6: Testing & QA** (2-3 days)

**Goal:** Ensure code quality, accessibility, and security

#### Task 6.1: Unit tests for validators

- **What:**
  - `bioValidator`: valid bio, invalid (too long), trim whitespace
  - `passwordMatch`: confirm password matches original, doesn't match
  - Reuse existing password strength validator tests
- **File:** `src/app/features/user/validators/profile.validators.spec.ts`
- **Assignee:** QA/Engineer
- **Timeline:** 0.5 day
- **Depends on:** Task 3.1
- **Coverage:** 100% of validator logic

#### Task 6.2: Unit tests for UserApi & mappers

- **What:**
  - `UserApi.getProfile()`: success, network error, 401, 403, 500
  - `UserApi.updateProfile()`: success, validation error (409), network error
  - Mapper: verify PII stripped correctly, public profile has no email/settings
  - Avatar utility: initials generation, default fallback
- **File:** `src/app/core/api/user.api.spec.ts`, `src/app/shared/models/user-profile.model.spec.ts`
- **Assignee:** QA/Engineer
- **Timeline:** 1 day
- **Depends on:** Task 2.1, Task 2.2, Task 3.3
- **Coverage:** 80%+ of API & mapper logic

#### Task 6.3: Integration tests for ProfileEditContainer

- **What:**
  - Form submission happy path: fill form → submit → API call → AuthStore update → toast
  - Form submission error path: API returns 400 → show validation errors
  - Form submission error path: API timeout → show error toast
  - Load existing profile data into form
  - Form reset on cancel
- **File:** `src/app/features/user/profile/profile-edit.component.spec.ts`
- **Assignee:** QA/Engineer
- **Timeline:** 1 day
- **Depends on:** Task 4.1, Task 4.2
- **Coverage:** 80%+ of component logic
- **Notes:** Use mock UserApi, mock AuthStore, mock ModalService

#### Task 6.4: E2E tests (full user flow)

- **What:**
  - User login → navbar profile menu → click edit profile → fill form → save → toast → reload page → verify data persisted
  - User A views User B's profile (click author name) → AuthorProfileView shows only public data (no email, no settings)
  - Error scenarios: network timeout, server error (500), permission denied (403)
  - Avatar selection: choose avatar → preview updates → submit
- **File:** E2E test files (Cypress or similar)
- **Assignee:** QA
- **Timeline:** 1.5 days
- **Depends on:** Task 5.2, Task 5.3
- **Notes:** Use mock backend or staging environment (per PM: mock for dev, real user for recette)

#### Task 6.5: Accessibility audit

- **What:**
  - Modal focus management: focus trap works, focus returns to trigger button on close
  - Form labels: all inputs have associated labels
  - Error association: error messages linked to inputs via `aria-describedby`
  - Keyboard navigation: Tab, Shift+Tab, Enter (submit), Escape (close modal)
  - Screen reader test: NVDA/JAWS reads form controls, error messages, buttons correctly
  - Color contrast: error text, button states
  - Avatar preview: alt text on avatar image or aria-label on initials element
- **File:** Accessibility audit report + test checklist
- **Assignee:** QA/A11y Lead
- **Timeline:** 1 day
- **Depends on:** Task 4.1, Task 4.2, Task 5.1
- **Notes:** Use Chrome DevTools A11y panel, axe DevTools, manual testing

#### Task 6.6: Security review

- **What:**
  - Verify PII not leaked in API responses (email, password hash, private settings never in response)
  - Test authorization: verify user cannot edit another user's profile (API should return 403)
  - Test CSRF protection: verify CSRF token handling
  - Test XSS prevention: user bio sanitized before display (Angular automatic)
  - Verify password hashed on backend (not frontend responsibility, but verify in flow)
- **File:** Security audit report
- **Assignee:** Security Engineer / Tech Lead
- **Timeline:** 0.5 day
- **Depends on:** Task 5.3
- **Notes:** Use Burp Suite or similar for request inspection

---

### **Phase 7: Internationalization & Documentation** (1 day)

**Goal:** Add translations and document patterns

#### Task 7.1: Add i18n translations

- **What:**
  - Extract all labels, placeholders, error messages
  - Create i18n keys following existing convention (e.g., `profile.form.bio.label`, `profile.form.password.error.required`)
  - Add keys to `assets/i18n/fr.json` (French)
  - Add keys to `assets/i18n/pt-BR.json` (Brazilian Portuguese)
  - Verify no hardcoded strings in templates or components
  - Use `transloco` for dynamic messages (if needed)
- **File:** `assets/i18n/fr.json`, `assets/i18n/pt-BR.json`
- **Assignee:** Fullstack Engineer
- **Timeline:** 1 day
- **Depends on:** Task 4.2, Task 4.4
- **i18n Keys:**
  ```
  profile.form.bio.label
  profile.form.bio.placeholder
  profile.form.bio.error.maxLength
  profile.form.password.label
  profile.form.password.placeholder
  profile.form.passwordConfirm.label
  profile.form.passwordConfirm.placeholder
  profile.form.passwordConfirm.error.mismatch
  profile.form.avatar.label
  profile.form.submit.label
  profile.form.cancel.label
  profile.view.author.joinDate
  profile.view.author.recipeCount
  profile.modal.title.edit
  profile.modal.title.view
  profile.toast.success
  profile.toast.error
  ```
- **Notes:**
  - Translations must be reviewed by native speakers or language team
  - Use existing translation patterns from Register/Login forms

#### Task 7.2: Document UserApi & profile patterns

- **What:**
  - Add usage documentation in README or project wiki
  - Document smart/dumb component split with code examples
  - Document form factory pattern + validators
  - Document avatar utility (how to add new avatars)
  - Comment complex logic (async validators, mappers, focus management)
  - Link to existing patterns (RecipesApi, LoginForm, etc.) for reference
- **File:** `README.md` or `docs/PROFILE_FEATURE.md`
- **Assignee:** Tech Lead
- **Timeline:** 0.5 day
- **Depends on:** Task 5.3

---

### **Phase 8: Code Review & Merge** (0.5 day)

**Goal:** Ensure code quality gates pass before merge

#### Task 8.1: Code review & quality checks

- **What:**
  - Lint passes: `npm run lint` ✅
  - Tests pass: `npm run test` ✅ (80%+ coverage)
  - Build passes: `npm run build` ✅
  - Accessibility audit passed ✅
  - Security review passed ✅
  - No unused imports or dead code ✅
  - No `any` types (use proper TypeScript) ✅
  - Follows existing patterns (smart/dumb, modal, forms, API services) ✅
  - PR checklist completed (per definition-of-done.instructions.md)
- **Assignee:** Tech Lead
- **Timeline:** 0.5 day
- **Depends on:** Task 7.2
- **Checklist:**
  - [ ] Lint passes
  - [ ] Tests pass
  - [ ] Build passes
  - [ ] A11y audit passed
  - [ ] Security review passed
  - [ ] No unused code
  - [ ] No `any` types
  - [ ] Follows patterns
  - [ ] PR description complete
  - [ ] No commits made (let developer do it)

#### Task 8.2: Merge to main & deploy

- **What:**
  - All checks green
  - Get approval from Tech Lead
  - Merge PR
  - Verify deployed to staging environment
  - Final verification on staging (profile edit & view workflows)
- **Assignee:** Fullstack Engineer (with Tech Lead approval)
- **Owner:** Project Manager (coordination)
- **Timeline:** Same day
- **Depends on:** Task 8.1
- **Notes:**
  - Do not commit anything (developer responsibility)
  - Let developer handle git flow actions

---

## 📊 Timeline Summary

```
Total Estimated Duration: 8-10 days (1.5-2 weeks)

Phase 1: 1 day    (Discovery & Setup)
Phase 2: 2-3 days (Data Layer)
Phase 3: 2-3 days (Forms & Validation)
Phase 4: 3-4 days (Components) — can overlap with Phase 3
Phase 5: 1-2 days (Modal Integration)
Phase 6: 2-3 days (Testing & QA) — can overlap with Phases 4-5
Phase 7: 1 day    (i18n & Documentation)
Phase 8: 0.5 day  (Code Review & Merge)
```

**Parallelization:** Phases 2-3 can overlap. Phases 4-5 can overlap. Phase 6 can start once Phase 4 begins (unit tests first, then integration).

---

## 👥 Resource Allocation

| Role                         | Effort        | Timeline                                        |
| ---------------------------- | ------------- | ----------------------------------------------- |
| Tech Lead                    | 5-10% ongoing | Oversight, architecture decisions, code reviews |
| Fullstack Engineer (Primary) | 80% of time   | Phases 2-5 implementation, Phase 7 docs         |
| QA/A11y Lead                 | 40% of time   | Phase 6 testing & accessibility audit           |
| Backend Engineer             | 20% of time   | Phase 1 API contract definition                 |
| Designer                     | 10% of time   | Phase 1 UX review only                          |
| Project Manager              | 10% of time   | Coordination, tracking, stakeholder updates     |

---

## 🔑 Key Implementation Notes

### Avatar Selection

- Load available avatars from `assets/avatars/` directory
- Provide avatar options as dropdown/selector in form
- Show thumbnail preview of selected avatar
- Generate initials from user's name as fallback
- Use default avatar if neither exists
- Store avatar filename (not blob) in profile

### Form Validation

- Bio: max 250 characters, trim whitespace, no spam patterns
- Password: reuse existing registration password strength validator
- Confirm password: reuse existing `passwordMatch` validator (already in RegisterForm)
- Email: NOT editable in profile (only during registration)
- No async email uniqueness check needed (only for registration)

### State Updates

- After profile edit success, update `AuthStore.profileDetails` signal
- Display success toast (use existing toast system)
- Modal closes automatically via ModalService
- On page reload, profile data persists (stored in AuthStore from `/api/user/me`)

### Error Handling

- Network error → show error toast "Unable to save profile"
- Validation error (400) → show field-level errors
- Permission error (403) → show error toast "You don't have permission to edit this profile"
- Server error (500) → show error toast "Server error, please try again"

### Accessibility

- Use existing modal system (focus management already implemented)
- All form inputs must have associated labels
- Error messages linked to inputs via `aria-describedby`
- Use semantic HTML (form, label, input, button, fieldset)
- Keyboard navigation: Tab, Shift+Tab, Enter (submit), Escape (close modal)
- Avatar image or initials element must have alt text or aria-label

### Security

- Never include email or private settings in public author profile response
- Backend must validate authorization (403 if user tries to edit another's profile)
- User bio sanitized by Angular (automatic)
- CSRF token handled by existing interceptor
- No password logging or exposure in frontend

---

## 📂 File Structure

```
src/app/
├── core/
│   └── api/
│       ├── user.api.ts (NEW)
│       └── user.api.spec.ts (NEW)
├── features/
│   └── user/
│       ├── profile/
│       │   ├── profile-edit.component.ts (SMART, NEW)
│       │   ├── profile-edit.component.html (NEW)
│       │   ├── profile-edit.component.scss (NEW)
│       │   ├── profile-edit.component.spec.ts (NEW)
│       │   ├── profile-edit-form.component.ts (DUMB, NEW)
│       │   ├── profile-edit-form.component.html (NEW)
│       │   ├── profile-edit-form.component.scss (NEW)
│       │   ├── profile-edit-form.component.spec.ts (NEW)
│       │   ├── author-profile.component.ts (DUMB, NEW)
│       │   ├── author-profile.component.html (NEW)
│       │   ├── author-profile.component.scss (NEW)
│       │   ├── author-profile.component.spec.ts (NEW)
│       │   └── profile-edit.template.html (NEW)
│       ├── validators/
│       │   ├── profile.validators.ts (NEW)
│       │   └── profile.validators.spec.ts (NEW)
│       └── utils/
│           ├── avatar.util.ts (NEW)
│           └── avatar.util.spec.ts (NEW)
│       └── profile-form.factory.ts (NEW)
├── shared/
│   └── models/
│       ├── user-profile.model.ts (NEW)
│       └── user-profile.model.spec.ts (NEW)
└── ui/
    └── overlays/
        └── modal/
            ├── modal-config.union.ts (UPDATE)
            └── builders/
                └── profile-modal.builder.ts (NEW)
```

---

## ✅ Definition of Done

A change is complete when:

- ✅ Code compiles without errors
- ✅ `npm run lint` passes
- ✅ `npm run test` passes (80%+ coverage)
- ✅ `npm run build` succeeds
- ✅ Accessibility audit passed (WCAG 2.1 AA)
- ✅ Security review passed
- ✅ All translations added (FR + PT-BR)
- ✅ No unused imports or dead code
- ✅ No `any` types
- ✅ Loading, error, and empty states handled
- ✅ Follows existing patterns (smart/dumb, modal, forms, API services)
- ✅ All open questions answered and incorporated
- ✅ PR approved by Tech Lead
- ✅ Deployed to staging and verified

---

## 🚀 Getting Started

1. **Start with Phase 1:** Confirm API contract with backend, finalize designs
2. **Proceed to Phase 2:** Create UserApi service and data models
3. **Parallelize Phase 3:** Build form validators while backend develops API
4. **Parallelize Phase 4:** Build components once Phase 3 is ready
5. **Execute Phase 5:** Wire into modal system once components are done
6. **Parallelize Phase 6:** Run unit tests during Phase 4, integration tests during Phase 5
7. **Finalize Phase 7:** Add translations and documentation
8. **Complete Phase 8:** Code review, quality gates, merge

---

**Ready to implement!** ✅
