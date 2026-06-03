# 📋 Action Plan: User Preferences & Dietary Restrictions Feature

**Feature:** User dietary preferences (diet group, intolerances, allergies) with recipe matching & allergen warnings  
**Status:** Ready for implementation  
**Date:** June 1, 2026  
**Duration:** 2-3 weeks MVP (10-15 days active development)

---

## 🎯 Feature Overview

**MVP Scope:**

- User can edit dietary preferences: language, diet group (9 types), intolerances (9 types), custom allergies
- Recipe diet labels: auto-computed from ingredients with author override
- Allergen warnings: shown in ingredient list header (always visible)
- Preference warnings: shown above recipe (connected users only)
  - **Green banner:** "✓ Matches your diet preference (Vegan)"
  - **Orange banner:** "⚠️ Recipe is not Vegan (your preference)"
  - **Red banner:** "⚠️ Contains lactose (your intolerance)"
- User can control visibility of dietary preferences (show/hide from profile)
- Recipes shown with appropriate warning banners (no filtering yet—Phase 2)

**Out of Scope (Phase 2+):**

- Recipe filtering/search by preference
- Nutrition API integration
- Recipe recommendations
- Profile visibility control in detail view

---

## 🔌 CRITICAL DECISION: External API Integration Strategy

### Context

We need allergen data for products. Options:

1. **Frontend calls external API directly** ❌ Not recommended
   - Exposes API to frontend
   - No caching, poor performance
   - Privacy risk (send user data to external service)

2. **Backend enriches products on creation** ✅ RECOMMENDED
   - Backend calls external API when product added
   - Stores allergen data in Product table
   - Frontend reads from Product (no external calls)
   - Better performance, centralized, auditable
   - Supports both manual entry and API enrichment

3. **Backend calls external API per recipe** ❌ Not recommended
   - Too many API calls
   - Slow recipe load times
   - Wasteful

4. **Manual curation + optional API** ⚠️ Hybrid approach
   - Start with hardcoded common allergens
   - Backend can later enrich via API
   - Reduces dependencies initially

### **RECOMMENDATION: Option 2 (Backend Enriches on Creation)**

**Implementation:**

- Backend creates Product with initial data
- On creation, backend calls external allergen API (async job or sync request)
- Stores allergen list in Product.allergenNames: string[]
- Frontend displays allergen data from Product (no external calls)
- Later: batch update existing products via admin task

**Benefits:**

- ✅ Centralized allergen management
- ✅ No external API calls from frontend
- ✅ Better performance (data already in Product)
- ✅ Audit trail (when allergies added)
- ✅ Can fallback if API fails (manual data entry)

**Frontend Impact:**

- Product model gains: allergenNames: string[]
- Recipe warnings compare user.intolerances + user.allergyProductNames against recipe.ingredients.product.allergenNames
- No external API calls needed in frontend

---

## 📅 Phase Breakdown

### **Phase 1a: Data Models & Constants** (3-4 days)

**Goal:** Define all data structures, enums, constants

#### Task 1a.1: Define dietary enums & constants

- **What:**
  - DietGroup enum: OMNIVORE, FLEXITARIAN, PESCATARIAN, POLLOTARIAN, VEGETARIAN, VEGAN, FRUITARIAN, CARNIVORE, MEDITERRANEAN
  - Intolerance constants: LACTOSE, FRUCTOSE, SORBITOL, FODMAP, GLUTEN, HISTAMINE, SALICYLATE, SULFITE, ALCOHOL
  - Helper functions: `isVeganProduct()`, `isVegetarianProduct()`, etc.
  - i18n mapping: diet group → translation key, intolerance → translation key
- **File:**
  - `src/app/shared/models/dietary/diet-group.enum.ts`
  - `src/app/shared/models/dietary/intolerance.const.ts`
  - `src/app/shared/models/dietary/dietary.utils.ts`
- **Assignee:** Fullstack Engineer
- **Timeline:** 1 day
- **Notes:**
  - Use PascalCase for enums
  - Export i18n key mapping for components
  - DietGroup → `diet.omnivore`, `diet.vegan`, etc.
  - Intolerance → `intolerance.lactose`, `intolerance.gluten`, etc.

#### Task 1a.2: Create UserPreferences model

- **What:**
  ```typescript
  interface UserPreferences {
    lang: 'fr' | 'pt-BR';
    dietGroup: DietGroup;
    intolerances: string[]; // intolerance IDs or names
    allergyProductNames: string[]; // free-text user allergies
    isPublic: boolean; // user can hide their preferences (default: false)
  }
  ```
- **File:** `src/app/shared/models/user/user-preferences.model.ts`
- **Assignee:** Fullstack Engineer
- **Timeline:** 0.5 day
- **Notes:**
  - Add to UserProfile model: `preferences?: UserPreferences`
  - Make optional initially (backward compatible)
  - isPublic default: false (privacy-first)

#### Task 1a.3: Extend Product model with allergen data

- **What:**
  ```typescript
  interface Product {
    // ...existing fields...
    allergenNames?: string[]; // ['nuts', 'shellfish', 'dairy'] - from backend API or manual entry
    isAllergen: boolean; // flag: this product is a known allergen
  }
  ```
- **File:** `src/app/shared/models/recipes/product.model.ts` (UPDATE)
- **Assignee:** Fullstack Engineer
- **Timeline:** 0.5 day
- **Notes:**
  - Backend enriches allergenNames via external API
  - Backward compatible: nullable field
  - isAllergen: boolean for simple flag

#### Task 1a.4: Extend Recipe model with diet markers

- **What:**

  ```typescript
  interface DietMarker {
    computedDietGroup?: DietGroup; // derived from ingredients
    userOverrideTags?: DietGroup[]; // manual tags by author (future)
  }

  interface Recipe {
    // ...existing fields...
    dietMarkers?: DietMarker; // can be computed at creation
  }
  ```

- **File:** `src/app/shared/models/recipes/recipe.model.ts` (UPDATE)
- **Assignee:** Fullstack Engineer
- **Timeline:** 0.5 day
- **Notes:**
  - Computed from ingredients at recipe creation
  - Author can override (Phase 2)
  - Nullable field (backward compatible)

#### Task 1a.5: Create Intolerance model & API

- **What:**
  ```typescript
  interface Intolerance {
    id: string; // 'gluten', 'lactose'
    nameI18nKey: string; // 'intolerance.gluten'
    productNames?: string[]; // products containing this intolerance (optional)
  }
  ```
- **File:** `src/app/shared/models/dietary/intolerance.model.ts`
- **Assignee:** Fullstack Engineer
- **Timeline:** 0.5 day
- **Notes:**
  - Simple entity for list of known intolerances
  - Optional productNames (enriched later)
  - Provides frontend list of intolerance options for form

---

### **Phase 1b: Forms & Validation** (2-3 days)

**Goal:** Build preference edit form with validators

#### Task 1b.1: Create preference form factory

- **What:**
  - `createPreferencesForm(prefs: UserPreferences): FormGroup<PreferencesFormModel>`
  - Controls: lang (select), dietGroup (select), intolerances (checkboxes), allergyProductNames (FormArray), isPublic (toggle)
  - Pre-populate form with current user data
  - Reset logic on cancel
- **File:** `src/app/features/user/preferences/preferences-form.factory.ts`
- **Assignee:** Fullstack Engineer
- **Timeline:** 1 day
- **Depends on:** Task 1a.2
- **Notes:**
  - Follow existing form factory patterns (RecipeFormService)
  - Strongly typed FormGroup
  - Intolerances: checkboxes (load from IntToleranceApi)
  - Allergies: FormArray with add/remove buttons

#### Task 1b.2: Create preference form validators

- **What:**
  - `allergyProductNameValidator`: validate product names exist or warn user
  - `intolerationSelectionValidator`: optional validation
  - Reuse existing validators (required, pattern, etc.)
- **File:** `src/app/features/user/preferences/validators/preferences.validators.ts`
- **Assignee:** Fullstack Engineer
- **Timeline:** 1 day
- **Depends on:** Task 1b.1
- **Notes:**
  - Allergy product names: case-insensitive search (warn if not found)
  - Intolerances: no minimum required
  - Lang + dietGroup: required

#### Task 1b.3: Create product search utility

- **What:**
  - Service to search products by name (for allergy typeahead)
  - `searchProductsByName(query: string): Observable<Product[]>`
  - Case-insensitive matching
  - Debounced to prevent excessive searches
- **File:** `src/app/shared/services/product-search.service.ts`
- **Assignee:** Fullstack Engineer
- **Timeline:** 0.5 day
- **Depends on:** Task 1a.3
- **Notes:**
  - Use RxJS debounceTime + distinctUntilChanged
  - Max 20 results
  - Used by allergy FormArray for typeahead

#### Task 1b.4: Create preference form components (DUMB)

- **What:**
  - `PreferencesFormComponent`: renders full form (lang, diet group, intolerances, allergies, visibility toggle)
  - `IntoleranceChecklistComponent`: checkboxes for intolerances (receives FormArray)
  - `AllergySearchComponent`: typeahead input for custom allergies
  - All with labels, error display, i18n
- **File:**
  - `src/app/features/user/preferences/preferences-form.component.ts` + `.html` + `.scss`
  - `src/app/features/user/preferences/intolerance-checklist.component.ts`
  - `src/app/features/user/preferences/allergy-search.component.ts`
- **Assignee:** Fullstack Engineer
- **Timeline:** 1.5 days
- **Depends on:** Task 1b.3
- **Notes:**
  - DUMB components: receive @Input() form, emit @Output() save/cancel
  - Show character counter for allergy descriptions
  - Accessibility: all inputs labeled, error messages linked via aria-describedby

---

### **Phase 1c: Preference Edit Integration** (1-2 days)

**Goal:** Wire preferences into profile edit modal

#### Task 1c.1: Create IntToleranceApi service

- **What:**
  - `GET /api/intolerances` → fetch list of available intolerances
  - Cache result in service (fetch once, reuse)
  - Error handling (fallback to hardcoded list)
- **File:** `src/app/core/api/intolerance.api.ts`
- **Assignee:** Fullstack Engineer
- **Timeline:** 0.5 day
- **Depends on:** Task 1a.5
- **Notes:**
  - Provides options for intolerance checkboxes
  - Cached via signal or ReplaySubject (load once)

#### Task 1c.2: Update UserApi for preferences

- **What:**
  - `saveUserPreferences(prefs: UserPreferences): Observable<User>`
  - Update existing `updateProfile()` or create separate endpoint
  - Error handling for invalid intolerance IDs
- **File:** `src/app/core/api/user.api.ts` (UPDATE)
- **Assignee:** Fullstack Engineer
- **Timeline:** 0.5 day
- **Depends on:** Task 1a.2
- **Notes:**
  - Validate allergyProductNames exist (optional)
  - Backend returns updated User object

#### Task 1c.3: Update AuthStore to persist preferences

- **What:**
  - Add `userPreferences()` signal to AuthStore
  - Add method to update preferences after save
  - Emit preference change event (for recipe re-evaluation)
- **File:** `src/app/core/store/auth.store.ts` (UPDATE)
- **Assignee:** Fullstack Engineer
- **Timeline:** 0.5 day
- **Depends on:** Task 1c.2
- **Notes:**
  - Preferences loaded from `/api/user/me` or on demand
  - Signal updates trigger recipe warnings re-compute

#### Task 1c.4: Create PreferenceEditContainer (SMART)

- **What:**
  - SMART component that manages preference edit modal
  - Inject: AuthStore, UserApi, IntToleranceApi, ModalService, NotificationService, FormBuilder
  - Load current preferences from AuthStore
  - Handle form submission → UserApi.saveUserPreferences()
  - Show loading state during submit
  - Handle errors gracefully
  - Update AuthStore on success
  - Close modal on success
- **File:** `src/app/features/user/preferences/preference-edit.component.ts`
- **Assignee:** Fullstack Engineer
- **Timeline:** 1 day
- **Depends on:** Task 1c.3, Task 1b.4
- **Notes:**
  - Smart component: no @Input/@Output (modal lifecycle via ModalService)
  - Load intolerance list on init (from cache)
  - Use signals for local state: form, isSubmitting
  - Emit success event to trigger recipe warning updates

#### Task 1c.5: Integrate preference form into profile edit modal

- **What:**
  - Add PreferencesFormComponent to ProfileEditContainer modal
  - Wire form submission to PreferenceEditContainer
  - Show preference editor as section in profile modal (or separate tab)
  - Test: open profile → edit preferences → save
- **File:** `src/app/features/user/profile/profile-edit.component.ts` (UPDATE)
- **Assignee:** Fullstack Engineer
- **Timeline:** 1 day
- **Depends on:** Task 1c.4
- **Notes:**
  - Preferences saved together with profile (or separate call)
  - Display success/error toasts

---

### **Phase 1d: Diet Matching Logic** (1-2 days)

**Goal:** Create pure functions for recipe-preference matching

#### Task 1d.1: Create diet matching utility functions

- **What:**
  - `computeRecipeDietGroup(recipe: Recipe): DietGroup | null`
    - Analyze ingredients
    - Return inferred diet group (VEGAN if no animal products, etc.)
  - `matchRecipeToPreferences(recipe: Recipe, prefs: UserPreferences): MatchResult`
    ```typescript
    interface MatchResult {
      status: 'match' | 'mismatch' | 'warn'; // match=green, mismatch=orange, warn=red
      reason: string; // "Matches your vegan diet"
      allergens: string[]; // allergens found in recipe
    }
    ```
  - `hasAllergens(recipe: Recipe, prefs: UserPreferences): string[]`
    - Return list of allergen products in recipe matching user intolerances/allergies
- **File:** `src/app/features/recipes/utils/diet-matching.util.ts`
- **Assignee:** Fullstack Engineer
- **Timeline:** 1 day
- **Depends on:** Task 1a.4
- **Notes:**
  - Pure functions: no dependencies, fully testable
  - Handle missing data gracefully (unknown products → treat as safe)
  - Case-insensitive allergen matching
  - 100% unit test coverage

#### Task 1d.2: Create product helper functions

- **What:**
  - `isVeganProduct(product: Product): boolean`
  - `isVegetarianProduct(product: Product): boolean`
  - `isPescatarianProduct(product: Product): boolean`
  - etc. for other diet groups
  - Check IngredientType or allergenNames
- **File:** `src/app/shared/models/dietary/dietary.utils.ts` (UPDATE)
- **Assignee:** Fullstack Engineer
- **Timeline:** 0.5 day
- **Depends on:** Task 1a.1, Task 1a.3
- **Notes:**
  - Based on IngredientType categorization
  - Extensible for future product enrichment
  - Used by diet matching functions

---

### **Phase 1e: Recipe UI Components** (2-3 days)

**Goal:** Build components for displaying diet info & warnings

#### Task 1e.1: Create DietBadgeComponent (DUMB)

- **What:**
  - Display diet group as icon + label
  - @Input() dietGroup: DietGroup
  - @Input() size: 'sm' | 'md' | 'lg' (default: md)
  - Render icon (🌱 vegan, 🥬 vegetarian, etc.)
  - Tooltip with full label
  - i18n label text
- **File:**
  - `src/app/features/recipes/components/diet-badge.component.ts` + `.html` + `.scss`
- **Assignee:** Fullstack Engineer
- **Timeline:** 0.5 day
- **Depends on:** Task 1a.1
- **Notes:**
  - DUMB: only receives input, renders
  - Accessibility: aria-label on icon, title attribute
  - Multiple badges in row for multiple diet groups

#### Task 1e.2: Create AllergenWarningComponent (DUMB)

- **What:**
  - Display allergen warning banner
  - @Input() allergens: string[]
  - @Input() intolerances: string[]
  - Show banner: "⚠️ Contains allergens: nuts, shellfish"
  - Dismissible (user can close)
  - Yellow background, bold text
- **File:**
  - `src/app/features/recipes/components/allergen-warning.component.ts` + `.html` + `.scss`
- **Assignee:** Fullstack Engineer
- **Timeline:** 0.5 day
- **Depends on:** Task 1d.1
- **Notes:**
  - Shows in ingredient list header
  - role="alert" for screen readers
  - Dismissible state in parent component
  - i18n banner text

#### Task 1e.3: Create PreferenceWarningComponent (DUMB)

- **What:**
  - Display preference match banner (green/orange/red)
  - @Input() matchResult: MatchResult (from diet-matching util)
  - Show:
    - GREEN: "✓ Matches your vegan diet"
    - ORANGE: "⚠️ Recipe is not vegan (your preference)"
    - RED: "⚠️ Contains lactose (your intolerance)"
  - Show above recipe detail, before content
  - User can dismiss
- **File:**
  - `src/app/features/recipes/components/preference-warning.component.ts` + `.html` + `.scss`
- **Assignee:** Fullstack Engineer
- **Timeline:** 0.75 day
- **Depends on:** Task 1d.1
- **Notes:**
  - DUMB component
  - Color-coded: green, orange, red
  - role="alert" for screen readers
  - Dismissible via parent state
  - i18n message text

#### Task 1e.4: Create DietIconsComponent (DUMB)

- **What:**
  - Display multiple diet badges in a row
  - @Input() dietMarkers: DietMarker
  - Renders badges for all applicable diet groups
  - Compact layout (inline, small icons)
- **File:**
  - `src/app/features/recipes/components/diet-icons.component.ts` + `.html` + `.scss`
- **Assignee:** Fullstack Engineer
- **Timeline:** 0.5 day
- **Depends on:** Task 1e.1
- **Notes:**
  - Wrapper around DietBadgeComponent
  - Used in recipe header + recipe list items

---

### **Phase 1f: Recipe Detail Integration** (1-2 days)

**Goal:** Wire components into RecipeFull & recipe lists

#### Task 1f.1: Update RecipeFull component

- **What:**
  - Add DietIconsComponent to recipe header (next to recipe type, prep time)
  - Add PreferenceWarningComponent above recipe content (if user connected)
  - Add AllergenWarningComponent in ingredient list header
  - Wire matchResult computation: `matchResult = computed(() => ...)`
  - Track ingredient dismiss state (dismissable warnings)
- **File:** `src/app/features/recipes/recipe-full/recipe-full.component.ts` + `.html` (UPDATE)
- **Assignee:** Fullstack Engineer
- **Timeline:** 1 day
- **Depends on:** Task 1e.1, Task 1e.3, Task 1e.4
- **Notes:**
  - Inject AuthStore to access user preferences
  - Compute match result using diet-matching util
  - Show warnings only if not dismissed
  - Recipe loads: ingredients → diet match computed → warnings rendered

#### Task 1f.2: Update RecipeMini & RecipeList components

- **What:**
  - Add DietIconsComponent to recipe card
  - Show compact diet badges (small icons)
  - Optional: show allergen indicator if connected user has intolerances
- **File:**
  - `src/app/features/recipes/recipe-mini/recipe-mini.component.ts` + `.html` (UPDATE)
  - `src/app/features/recipes/recipe-list/recipe-list.component.ts` (UPDATE)
- **Assignee:** Fullstack Engineer
- **Timeline:** 0.75 day
- **Depends on:** Task 1e.4
- **Notes:**
  - Compact layout: show 2-3 top diet groups
  - No preference warnings in list view (too noisy)
  - Just visual indicators

---

### **Phase 1g: Testing & QA** (2-3 days)

**Goal:** Ensure code quality, accuracy, accessibility

#### Task 1g.1: Unit tests for diet matching logic

- **What:**
  - `computeRecipeDietGroup()`: test various ingredient combinations
    - All vegan ingredients → VEGAN
    - Has meat → not VEGAN
    - Mix of vegetarian + dairy → VEGETARIAN
  - `matchRecipeToPreferences()`: test all combinations
    - Vegan user + vegan recipe → match (green)
    - Vegan user + vegetarian recipe → mismatch (orange)
    - User with lactose intolerance + recipe with milk → warn (red)
  - `hasAllergens()`: test allergen detection
    - No allergens → empty array
    - Has matching allergens → detected
    - Case-insensitive matching
  - `isVeganProduct()`, `isVegetarianProduct()`, etc.
- **File:** `src/app/features/recipes/utils/diet-matching.util.spec.ts`
- **Assignee:** QA/Engineer
- **Timeline:** 1 day
- **Depends on:** Task 1d.1, Task 1d.2
- **Coverage:** 100% of matching logic

#### Task 1g.2: Unit tests for preference form validators

- **What:**
  - `allergyProductNameValidator`: valid names, invalid names, warn user
  - Form submission: valid data, invalid data, error handling
  - Form reset/cancel
- **File:** `src/app/features/user/preferences/preferences-form.factory.spec.ts`
- **Assignee:** QA/Engineer
- **Timeline:** 0.5 day
- **Depends on:** Task 1b.1, Task 1b.2
- **Coverage:** 80%+ of form logic

#### Task 1g.3: Unit tests for API services

- **What:**
  - `IntToleranceApi.getIntolerances()`: success, error, caching
  - `UserApi.saveUserPreferences()`: success, validation error (400), permission error (403)
  - Proper error handling and logging
- **File:**
  - `src/app/core/api/intolerance.api.spec.ts`
  - `src/app/core/api/user.api.spec.ts` (UPDATE)
- **Assignee:** QA/Engineer
- **Timeline:** 0.5 day
- **Depends on:** Task 1c.1, Task 1c.2
- **Coverage:** 80%+

#### Task 1g.4: Integration tests for preference workflow

- **What:**
  - Preference form submission → API call → AuthStore update
  - Recipe load → match result computed → warnings displayed
  - Toggle preferences (public/private) → UI updates
  - Multiple recipes with different diet groups → all icons displayed correctly
- **File:** Integration test file (framework-specific)
- **Assignee:** QA/Engineer
- **Timeline:** 1 day
- **Depends on:** Task 1f.1, Task 1f.2
- **Coverage:** 80%+

#### Task 1g.5: E2E tests (full user flow)

- **What:**
  - User login → view profile → edit preferences (set vegan + lactose intolerance)
  - View recipe 1 (vegan) → see green banner + vegan badge
  - View recipe 2 (has milk) → see red banner + allergen warning
  - View recipe 3 (has meat) → see orange banner + non-vegan badge
  - Toggle preference visibility → profile preference hidden/shown
  - Search recipes → see all with appropriate badges/warnings
- **File:** E2E test (Cypress or similar)
- **Assignee:** QA
- **Timeline:** 1 day
- **Depends on:** Task 1f.1, Task 1f.2
- **Notes:** Use mock backend or staging environment

#### Task 1g.6: Allergen data accuracy audit

- **What:**
  - QA manually verifies allergen database accuracy
  - Check: products correctly categorized
  - Check: no missing common allergens
  - Check: no false positives
  - Create audit checklist (20-30 key products)
  - Document findings + corrections needed
- **File:** QA audit report
- **Assignee:** QA Lead + Domain Expert (if available)
- **Timeline:** 1 day
- **Depends on:** Task 1a.3 (product data ready)
- **Notes:** CRITICAL for safety

#### Task 1g.7: Accessibility audit

- **What:**
  - Modal focus management (preference editor)
  - Form labels: all inputs have associated labels
  - Error association: errors linked via aria-describedby
  - Keyboard navigation: Tab, Shift+Tab, Enter (submit), Escape (close)
  - Screen reader test: NVDA/JAWS reads form, banners, icons correctly
  - Banners: role="alert" properly announces warnings
  - Icons: aria-label or title explains diet types
  - Color contrast: warning banners have sufficient contrast
- **File:** A11y audit report + checklist
- **Assignee:** QA/A11y Lead
- **Timeline:** 1 day
- **Depends on:** Task 1e.1, Task 1e.2, Task 1e.3, Task 1f.1
- **WCAG 2.1 AA:** All checks must pass

#### Task 1g.8: Security review

- **What:**
  - Verify user preferences NOT exposed to other users (API security)
  - Verify preference visibility toggle works (isPublic field honored)
  - Verify XSS prevention: allergen product names sanitized
  - Verify SQL injection prevention (backend responsibility)
  - Test CSRF protection on preference save
- **File:** Security audit report
- **Assignee:** Security Engineer / Tech Lead
- **Timeline:** 0.5 day
- **Depends on:** Task 1c.2

#### Task 1g.9: Performance testing

- **What:**
  - Recipe detail load: diet matching < 50ms
  - Recipe list render: diet badges render < 100ms per recipe
  - Search with 50+ results: no UI lag
  - Preference form load: intolerances fetched + cached quickly
- **File:** Performance report
- **Assignee:** QA/Engineer
- **Timeline:** 0.5 day
- **Depends on:** Task 1f.1, Task 1f.2
- **Notes:** Monitor with dev tools + lighthouse

---

### **Phase 1h: i18n & Documentation** (1 day)

**Goal:** Add translations and document the feature

#### Task 1h.1: Add i18n translations

- **What:**
  - Diet group labels: `diet.omnivore`, `diet.flexitarian`, etc. (9 keys)
  - Intolerance labels: `intolerance.lactose`, `intolerance.gluten`, etc. (9 keys)
  - Form labels: `preferences.form.dietGroup`, `preferences.form.intolerances.label`, etc.
  - Warning banner text:
    - `warning.preference.match`: "✓ Matches your {{diet}} diet"
    - `warning.preference.mismatch`: "⚠️ Recipe is not {{diet}} (your preference)"
    - `warning.allergen`: "⚠️ Contains allergens: {{allergens}}"
  - Component labels: `diet.badge.vegan`, `diet.badge.vegetarian`, etc.
  - Button labels: `button.save`, `button.cancel`, `button.dismiss`
  - Error messages: various validation errors
- **Add to:**
  - `assets/i18n/fr.json` (French)
  - `assets/i18n/pt-BR.json` (Brazilian Portuguese)
- **Assignee:** Fullstack Engineer
- **Timeline:** 1 day
- **Depends on:** All phase 1 tasks (forms, components, etc.)
- **Validation:** Run i18n comparison script (if available) to catch missing keys

#### Task 1h.2: Document dietary preferences system

- **What:**
  - Add section to README explaining:
    - How user preferences work
    - How recipe diet matching works
    - How allergen warnings are triggered
    - Data structures (models, enums)
    - API endpoints used
  - Document diet-matching util functions + examples
  - Document component hierarchy
  - Link to external API strategy decision (if using API)
  - Add troubleshooting guide
- **File:** `README.md` or `docs/DIETARY_PREFERENCES.md`
- **Assignee:** Tech Lead
- **Timeline:** 0.5 day
- **Depends on:** Phase 1 complete
- **Notes:** Code comments on complex logic (diet matching, form validators)

---

### **Phase 1i: Code Review & Merge** (0.5 day)

**Goal:** Quality gates & deployment

#### Task 1i.1: Code review & quality checks

- **What:**
  - ✅ Lint passes: `npm run lint`
  - ✅ Tests pass: `npm run test` (80%+ coverage)
  - ✅ Build passes: `npm run build`
  - ✅ Accessibility audit passed (WCAG 2.1 AA)
  - ✅ Security review passed
  - ✅ No unused imports or dead code
  - ✅ No `any` types
  - ✅ All i18n keys present (FR + PT-BR)
  - ✅ Follows existing patterns (smart/dumb, reactive forms, API services)
  - ✅ PR description complete
  - ✅ All tests reviewed for accuracy (especially allergen data)
- **Assignee:** Tech Lead
- **Timeline:** 0.5 day
- **Depends on:** Phase 1h complete
- **Checklist:**
  - [ ] Lint passes
  - [ ] Tests pass (80%+ coverage)
  - [ ] Build passes
  - [ ] A11y audit passed
  - [ ] Security review passed
  - [ ] Allergen data verified
  - [ ] No unused code
  - [ ] No `any` types
  - [ ] All i18n keys present
  - [ ] Follows patterns
  - [ ] PR description complete
  - [ ] No commits made (developer responsibility)

#### Task 1i.2: Merge & deploy

- **What:**
  - All checks green
  - Get approval from Tech Lead
  - Merge PR
  - Deploy to staging
  - Final verification on staging (preference edit + recipe warnings)
- **Assignee:** Fullstack Engineer (with Tech Lead approval)
- **Owner:** Project Manager (coordination)
- **Timeline:** Same day
- **Depends on:** Task 1i.1
- **Notes:**
  - Do not commit anything (developer responsibility)
  - Staging smoke test: set preferences, view recipes, see warnings

---

## 📊 Timeline Summary

```
Total Estimated Duration: 2-3 weeks (10-15 days active development)

Phase 1a: 3-4 days (Models & Constants)
Phase 1b: 2-3 days (Forms & Validation)
Phase 1c: 1-2 days (Preference Integration)
Phase 1d: 1-2 days (Diet Matching Logic)
Phase 1e: 2-3 days (Recipe UI Components)
Phase 1f: 1-2 days (Recipe Integration)
Phase 1g: 2-3 days (Testing & QA) — can overlap with 1e-1f
Phase 1h: 1 day (i18n & Documentation)
Phase 1i: 0.5 day (Code Review & Merge)
```

**Parallelization Opportunities:**

- Phases 1b-1c can start while 1a finishes
- Phases 1d-1e can start once 1a finishes
- Phase 1g testing can start during 1e-1f
- Phase 1h can start during 1g (translations don't block testing)

---

## 👥 Resource Allocation

| Role                         | Effort      | Timeline                                                        |
| ---------------------------- | ----------- | --------------------------------------------------------------- |
| Tech Lead                    | 10% ongoing | Architecture reviews, decision making, code reviews             |
| Fullstack Engineer (Primary) | 80% of time | Phases 1a-1h implementation                                     |
| QA/A11y Lead                 | 30% of time | Testing, allergen audit, accessibility audit                    |
| Backend Engineer             | 20% of time | API contracts, UserPreferences schema, allergen data enrichment |
| Database Admin               | 10% of time | Migration planning (new columns), Intolerance table             |
| Domain Expert (Optional)     | 5% of time  | Validate diet groups & intolerances if available                |

---

## 🔑 Key Implementation Notes

### UserPreferences Model

- Located in user profile
- Fields: lang, dietGroup, intolerances[], allergyProductNames[], isPublic
- Loaded from `/api/user/me`
- Updated via profile edit modal
- Changes trigger recipe warning re-computation

### Diet Group Labels

- Auto-generated from DietGroup enum
- Icons + labels displayed in recipe headers
- Multiple badges if recipe matches multiple diet groups
- Tooltips explain each badge
- i18n: `diet.vegan`, `diet.vegetarian`, etc.

### Allergen Detection

- Product model extended: allergenNames: string[]
- Backend enriches via external API or manual entry
- Frontend matches against user.intolerances + user.allergyProductNames
- Case-insensitive matching
- Unknown products treated as safe (no false positives)

### Warning Banners

- **Allergen banner (always visible):**
  - Shows in ingredient list header
  - "⚠️ Contains: nuts, dairy"
  - Dismissible (state in parent)

- **Preference banners (connected users only):**
  - GREEN: "✓ Matches your vegan diet"
  - ORANGE: "⚠️ Recipe is not vegan (your preference)"
  - RED: "⚠️ Contains lactose (your intolerance)"
  - Above recipe content, before ingredients
  - Dismissible

### Form Validation

- Diet group: required
- Intolerances: optional (no minimum)
- Allergies: optional, case-insensitive product search
- Visibility toggle: default false (privacy-first)
- Error messages i18n'd

### Accessibility

- Form labels: all inputs associated
- Error messages: linked via aria-describedby
- Icons: aria-label or title attribute
- Banners: role="alert" for screen reader announcement
- Keyboard: Tab/Shift+Tab, Enter (submit), Escape (close modal)
- Focus management: modal focus trap, restore focus on close
- Color contrast: WCAG AA for all text
- No reliance on color alone (use text + icons)

### Security

- User preferences NEVER exposed to other users (API enforces)
- Preference visibility toggle: controls if profile shows diet
- Allergen product names: sanitized (Angular automatic)
- CSRF protection: handled by existing interceptor
- No logging of preference data (privacy risk)

### Performance

- Diet matching: pure function, < 50ms per recipe
- Form intolerances: cached after first fetch
- Recipe list: diet badges render quickly (simple icons)
- No external API calls from frontend (backend enriches Product data)
- Recipe load: includes diet markers, no extra queries

### Backwards Compatibility

- All new fields nullable/optional
- Existing recipes work without diet markers (computed on demand)
- Existing products work without allergen data (treated as unknown)
- Existing users work without preferences (defaults applied)
- No breaking changes to API contracts

---

## 📂 File Structure (New & Updated)

```
src/app/
├── core/
│   ├── api/
│   │   ├── intolerance.api.ts (NEW)
│   │   ├── intolerance.api.spec.ts (NEW)
│   │   └── user.api.ts (UPDATE - add preferences endpoints)
│   └── store/
│       └── auth.store.ts (UPDATE - add userPreferences signal)
├── features/
│   ├── user/
│   │   ├── preferences/ (NEW folder)
│   │   │   ├── models/
│   │   │   │   └── preferences-form.model.ts (NEW)
│   │   │   ├── validators/
│   │   │   │   ├── preferences.validators.ts (NEW)
│   │   │   │   └── preferences.validators.spec.ts (NEW)
│   │   │   ├── preference-edit.component.ts (NEW - SMART)
│   │   │   ├── preference-edit.component.html (NEW)
│   │   │   ├── preference-edit.component.spec.ts (NEW)
│   │   │   ├── preferences-form.component.ts (NEW - DUMB)
│   │   │   ├── preferences-form.component.html (NEW)
│   │   │   ├── preferences-form.component.scss (NEW)
│   │   │   ├── intolerance-checklist.component.ts (NEW - DUMB)
│   │   │   ├── intolerance-checklist.component.html (NEW)
│   │   │   ├── allergy-search.component.ts (NEW - DUMB)
│   │   │   ├── allergy-search.component.html (NEW)
│   │   │   ├── preferences-form.factory.ts (NEW)
│   │   │   └── preferences-form.factory.spec.ts (NEW)
│   │   ├── profile/ (UPDATE)
│   │   │   └── profile-edit.component.ts (UPDATE - add preference form)
│   └── recipes/
│       ├── utils/
│       │   ├── diet-matching.util.ts (NEW)
│       │   └── diet-matching.util.spec.ts (NEW)
│       ├── components/
│       │   ├── diet-badge.component.ts (NEW - DUMB)
│       │   ├── diet-badge.component.html (NEW)
│       │   ├── diet-badge.component.scss (NEW)
│       │   ├── diet-icons.component.ts (NEW - DUMB)
│       │   ├── diet-icons.component.html (NEW)
│       │   ├── allergen-warning.component.ts (NEW - DUMB)
│       │   ├── allergen-warning.component.html (NEW)
│       │   ├── allergen-warning.component.scss (NEW)
│       │   ├── preference-warning.component.ts (NEW - DUMB)
│       │   ├── preference-warning.component.html (NEW)
│       │   ├── preference-warning.component.scss (NEW)
│       │   └── preference-warning.component.spec.ts (NEW)
│       ├── recipe-full/
│       │   └── recipe-full.component.ts (UPDATE - add warnings)
│       ├── recipe-mini/
│       │   └── recipe-mini.component.ts (UPDATE - add diet badges)
│       └── recipe-list/
│           └── recipe-list.component.ts (UPDATE - add diet badges)
├── shared/
│   ├── models/
│   │   ├── user/ (UPDATE)
│   │   │   ├── user-preferences.model.ts (NEW)
│   │   │   └── user-profile.model.ts (UPDATE - add preferences)
│   │   ├── dietary/ (NEW folder)
│   │   │   ├── diet-group.enum.ts (NEW)
│   │   │   ├── intolerance.const.ts (NEW)
│   │   │   ├── intolerance.model.ts (NEW)
│   │   │   ├── diet-marker.model.ts (NEW)
│   │   │   └── dietary.utils.ts (NEW)
│   │   └── recipes/ (UPDATE)
│   │       ├── product.model.ts (UPDATE - add allergenNames, isAllergen)
│   │       ├── recipe.model.ts (UPDATE - add dietMarkers)
│   │       └── dietary.model.ts (NEW - shared types)
│   ├── services/
│   │   └── product-search.service.ts (NEW)
│   └── ui/
│       └── components/ (UPDATE if needed)
├── styles/ (UPDATE)
│   └── Add color variables for warning banners (green, orange, red)
└── app.config.ts (UPDATE - provide IntToleranceApi)
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
- ✅ Allergen database verified for accuracy (CRITICAL)
- ✅ Loading, error, and empty states handled
- ✅ Follows existing patterns (smart/dumb, reactive forms, API services)
- ✅ All open questions answered and incorporated
- ✅ PR approved by Tech Lead
- ✅ Deployed to staging and verified

---

## 🚀 Getting Started

### Week 1 (Backend Coordination + Design)

1. **Backend team:** Define API contracts
   - POST/PUT `/api/user/preferences`
   - GET `/api/intolerances`
   - Extend Product model (allergenNames field)
   - Extend Recipe model (dietMarkers field)
   - Schema migration plan
   - External API integration strategy (Option 2 recommended)

2. **Frontend team:** Phase 1a tasks
   - Define enums & constants
   - Create models
   - Design preference form layout

3. **QA:** Prepare allergen data audit checklist

### Week 2 (Implementation)

1. Phases 1a-1d: Models, forms, matching logic
2. Phases 1e-1f: UI components, recipe integration
3. Parallel: Phase 1g testing

### Week 3 (Testing & Polish)

1. Phase 1g: Complete testing, allergen audit
2. Phase 1h: i18n & documentation
3. Phase 1i: Code review & merge

---

## 🔗 Dependencies

### Backend Dependencies

- ✅ UserPreferences API endpoints
- ✅ Intolerance database table + API
- ✅ Product model extended
- ✅ Recipe model extended
- ✅ External API selection + integration (Option 2 recommended)
- ✅ Data migration plan

### Frontend Dependencies

- ✅ Profile feature (already in progress)
- ✅ Modal system (already exists)
- ✅ Form patterns (already established)
- ✅ i18n system (already in use)

---

## 🎯 Success Criteria

- ✅ Users can set dietary preferences
- ✅ Preferences persist after save
- ✅ Allergen warnings display correctly (100% accuracy required)
- ✅ Diet badges show on recipes
- ✅ Preference warnings show for connected users
- ✅ All warnings dismissible
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ No performance degradation (< 50ms diet matching)
- ✅ User adoption: 40%+ of users set preferences (goal)
- ✅ Zero false positives in allergen detection

---

**Ready to implement!** ✅

Next steps:

1. Get backend API contracts (week 1)
2. Finalize external API strategy (Option 2 recommended)
3. Start Phase 1a (models + constants)
4. Run in parallel with backend development
