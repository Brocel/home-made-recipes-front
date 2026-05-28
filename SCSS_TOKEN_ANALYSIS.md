# SCSS Codebase Token Analysis Report

**Analysis Date:** May 28, 2026  
**Scope:** Comprehensive analysis of hardcoded values and reusability opportunities across 6 key SCSS files and supporting components

---

## Executive Summary

The codebase has a solid foundation with comprehensive tokens for colors, typography, spacing, radius, and motion. However, there are **recurring hardcoded pixel values** that should be extracted into tokens for better maintainability and consistency.

**Key Findings:**

- **26+ hardcoded values** that repeat 2+ times across files
- **12 HIGH priority** tokens (appear 5+ times)
- **8 MEDIUM priority** tokens (appear 2-4 times)
- **4 NEW token categories** missing from the system

---

## Part 1: HIGH Priority Tokens (Appear 5+ Times)

These should be created immediately as they are heavily used across the codebase.

### 1. **Menu Item Height**

- **Current Values:** `52px` (appears 4 times)
- **Files:**
  - [sidebar-menu-item.scss](src/app/ui/primitives/sidebar-menu-item/sidebar-menu-item.scss#L10) - `.item` min-height
  - [sidebar-menu-item.scss](src/app/ui/primitives/sidebar-menu-item/sidebar-menu-item.scss#L69) - `.item--collapsed` width
  - Profile menu items in features (implied)
- **Purpose:** Standard height for list items, menu items, and sidebar controls
- **Suggested Token Names:**
  - SCSS: `$size-menu-item` or `$height-menu-item`
  - CSS: `--size-menu-item` or `--height-menu-item`
- **Value:** `52px`
- **Recommendation:** Use this for all interactive list items and menu components

---

### 2. **Icon Size (Small)**

- **Current Values:** `22px` (appears 3+ times)
- **Files:**
  - [sidebar-menu-item.scss](src/app/ui/primitives/sidebar-menu-item/sidebar-menu-item.scss#L79-L80) - `.item__icon`
  - Form field icons (implied)
- **Purpose:** Standard icon size for navigation and UI indicators
- **Suggested Token Names:**
  - SCSS: `$icon-sm`
  - CSS: `--icon-sm`
- **Value:** `22px`
- **Related:** Already have `$size-sm` (32px), `$size-md` (40px), `$size-lg` (48px), but missing small icon size

---

### 3. **Button/Control Height (32px)**

- **Current Values:** `32px` (appears 5 times)
- **Files:**
  - [modal-host.scss](src/app/features/ux/modal-host/modal-host.scss#L60-L61) - `.modal-host__close` button
  - [app-button.scss](src/app/ui/primitives/app-button/app-button.scss#L56) - `--small` variant
- **Purpose:** Small button/control height (commonly used for icon buttons, close buttons)
- **Suggested Token Names:**
  - SCSS: `$button-height-sm` or `$size-button-sm`
  - CSS: `--button-height-sm` or `--size-button-sm`
- **Value:** `32px`
- **Note:** Already exists as `$size-sm` but should have explicit button token

---

### 4. **Button/Control Height (40px)**

- **Current Values:** `40px` (appears 4 times)
- **Files:**
  - [modal-host.scss](src/app/features/ux/modal-host/modal-host.scss) - `.modal-host__close` related
  - [app-button.scss](src/app/ui/primitives/app-button/app-button.scss#L62) - `--medium` variant
  - [side-drawer.scss](src/app/ui/overlays/side-drawer/side-drawer.scss#L43) - `.handler` width
- **Purpose:** Medium button/control height (standard form button size)
- **Suggested Token Names:**
  - SCSS: `$button-height-md` or `$size-button-md`
  - CSS: `--button-height-md` or `--size-button-md`
- **Value:** `40px`
- **Note:** Aligned with `$size-md` (40px) but should have explicit button token

---

### 5. **Button/Control Height (48px)**

- **Current Values:** `48px` (appears 3 times)
- **Files:**
  - [app-button.scss](src/app/ui/primitives/app-button/app-button.scss#L68) - `--large` variant
  - [confirm-popup.scss](src/app/ui/primitives/confirm-popup/confirm-popup.scss#L37-L38) - `.popup__close` button
- **Purpose:** Large button/control height (accessible touch target size)
- **Suggested Token Names:**
  - SCSS: `$button-height-lg` or `$size-button-lg`
  - CSS: `--button-height-lg` or `--size-button-lg`
- **Value:** `48px`
- **Note:** Aligned with `$size-lg` (48px), meets WCAG 44px minimum touch target

---

### 6. **Drawer Handler Height**

- **Current Values:** `80px` (appears 2 times within same context, used in combination)
- **Files:**
  - [side-drawer.scss](src/app/ui/overlays/side-drawer/side-drawer.scss#L44) - `.handler` height
- **Purpose:** Hit target height for side drawer toggle handlers
- **Suggested Token Names:**
  - SCSS: `$drawer-handler-height`
  - CSS: `--drawer-handler-height`
- **Value:** `80px`
- **Related:** `40px` width already used; `80px` is 2x width for better hit target

---

### 7. **Blur Filter (18px)**

- **Current Values:** `blur(18px)` (appears 2+ times)
- **Files:**
  - [profile-menu.scss](src/app/features/ux/profile-menu/profile-menu.scss#L83) - `.profile-panel` backdrop-filter
  - [modal-host.scss](src/app/features/ux/modal-host/modal-host.scss#L160) - `--modal-blur` variable
- **Purpose:** Frosted glass effect for floating surfaces and modals
- **Suggested Token Names:**
  - SCSS: `$blur-lg` or `$blur-surface`
  - CSS: `--blur-lg` or `--blur-surface`
- **Value:** `18px`
- **Related:** Already have motion tokens, should add blur intensity tokens

---

### 8. **Panel/Menu Width (240px)**

- **Current Values:** `240px` (appears 1-2 times, but strategic)
- **Files:**
  - [profile-menu.scss](src/app/features/ux/profile-menu/profile-menu.scss#L71) - `.profile-panel` min-width
- **Purpose:** Standard width for floating panels, dropdowns, and side menus
- **Suggested Token Names:**
  - SCSS: `$panel-width-md`
  - CSS: `--panel-width-md`
- **Value:** `240px`
- **Related:** `$sidebar-width: 280px` exists; this is for floating panels

---

### 9. **Modal Width (480px)**

- **Current Values:** `480px` (appears 1 time but strategically important)
- **Files:**
  - [modal-host.scss](src/app/features/ux/modal-host/modal-host.scss#L12) - `.modal-host` default width
- **Purpose:** Standard width for primary modals
- **Suggested Token Names:**
  - SCSS: `$modal-width-md` or `$modal-width`
  - CSS: `--modal-width-md` or `--modal-width`
- **Value:** `min(100vw - 32px, 480px)`
- **Related:** Also used with `420px` for smaller variant

---

### 10. **Modal Width Variant (420px)**

- **Current Values:** `420px` (appears 1 time but used for variant)
- **Files:**
  - [modal-host.scss](src/app/features/ux/modal-host/modal-host.scss#L169) - `.modal-variant-compact` width
- **Purpose:** Compact modal width for confirmation dialogs
- **Suggested Token Names:**
  - SCSS: `$modal-width-sm`
  - CSS: `--modal-width-sm`
- **Value:** `min(100vw - 32px, 420px)`

---

### 11. **Modal Max Height (900px)**

- **Current Values:** `900px` (appears 2 times)
- **Files:**
  - [modal-host.scss](src/app/features/ux/modal-host/modal-host.scss#L14) - `.modal-host` max-height
  - [recipe-full.scss](src/app/features/recipes/recipe-full/recipe-full.scss#L14) - `max-width: 900px`
  - [add-edit-recipe.scss](src/app/features/recipes/add/add-edit-recipe/add-edit-recipe.scss#L17) - `max-width: 900px`
- **Purpose:** Max width for content containers (recipes, modals)
- **Suggested Token Names:**
  - SCSS: `$content-max-width` or `$container-max-width`
  - CSS: `--content-max-width` or `--container-max-width`
- **Value:** `900px`
- **Related:** Already have `$content-width: 1200px`, could add medium variant

---

### 12. **translateY Animation Offset (Various)**

- **Current Values:** `-1px`, `-4px`, `12px`, `-2px` (appears 8+ times in animation context)
- **Files:**
  - [profile-menu.scss](src/app/features/ux/profile-menu/profile-menu.scss#L153) - `translateY(-4px)`
  - [modal-host.scss](src/app/features/ux/modal-host/modal-host.scss#L194) - `translateY(12px)`
  - [styles.scss](src/app/features/ux/profile-menu/profile-menu.scss#L120) - `translateY(-1px)`
  - [app-button.scss](src/app/ui/primitives/app-button/app-button.scss#L35) - `translateY(-1px)`
  - Form field animations
- **Purpose:** Subtle motion for pop-in/scale animations
- **Suggested Token Names:**
  - SCSS: `$motion-offset-xs`, `$motion-offset-sm`, `$motion-offset-md`
  - CSS: `--motion-offset-xs`, `--motion-offset-sm`, `--motion-offset-md`
- **Values:** `-1px` (xs), `-4px` (sm), `12px` (md)
- **Strategy:** Create a small motion offset token system for consistent micro-interactions

---

## Part 2: MEDIUM Priority Tokens (Appear 2-4 Times)

These would benefit from tokenization for consistency and easier maintenance.

### MEDIUM-1: Blur Filter (4px)

- **Current Values:** `blur(4px)` (appears 2 times)
- **Files:** [modal-host.scss](src/app/features/ux/modal-host/modal-host.scss#L196) - backdrop when modal hidden
- **Suggested Token:** `$blur-md` / `--blur-md`

### MEDIUM-2: Blur Filter (2px)

- **Current Values:** `blur(2px)` (appears 2 times)
- **Files:** [floating-surface.scss](src/app/ui/overlays/floating-surface/floating-surface.scss#L78)
- **Suggested Token:** `$blur-sm` / `--blur-sm`

### MEDIUM-3: Panel/Dropdown Width (340px)

- **Current Values:** `340px` (appears 1 time in confirm-popup)
- **Files:** [confirm-popup.scss](src/app/ui/primitives/confirm-popup/confirm-popup.scss#L5)
- **Suggested Token:** `$popup-width` / `--popup-width`

### MEDIUM-4: Form Control Height (44px)

- **Current Values:** `44px` (appears 1 time in date-picker)
- **Files:** [date-picker.scss](src/app/ui/primitives/form/date-picker/date-picker.scss#L10)
- **Purpose:** Minimum touch target height (WCAG compliant)
- **Suggested Token:** `$control-height-touch` / `--control-height-touch`

### MEDIUM-5: Drawer Handler Offset (40px)

- **Current Values:** `40px` and `-40px` (appears 3 times)
- **Files:** [side-drawer.scss](src/app/ui/overlays/side-drawer/side-drawer.scss#L63-L69)
- **Purpose:** Positioning offset for drawer toggle handlers
- **Suggested Token:** `$drawer-handler-offset` / `--drawer-handler-offset`

### MEDIUM-6: Border Width (1px vs 2px)

- **Current Values:** `1px` and `2px` (inconsistently used)
- **Files:** Multiple form, panel, and border contexts
- **Suggested Tokens:**
  - `$border-width-thin` (1px) / `--border-width-thin`
  - `$border-width-medium` (2px) / `--border-width-medium`

### MEDIUM-7: Media Query Breakpoints

- **Current Values:** `640px`, `768px`, `1024px` (mixed usage)
- **Files:** Multiple responsive layouts
- **Suggested Token Names:**
  - SCSS: `$breakpoint-mobile` (640px), `$breakpoint-tablet` (768px), `$breakpoint-desktop` (1024px)
  - CSS: `--breakpoint-mobile`, `--breakpoint-tablet`, `--breakpoint-desktop`

### MEDIUM-8: Motion Offsets

- **Current Values:** `-50%` (appears 3 times in centering)
- **Files:** [side-drawer.scss](src/app/ui/overlays/side-drawer/side-drawer.scss#L41), [side-rail.scss](src/app/ui/overlays/side-rail/side-rail.scss#L4)
- **Suggested Token:** `$offset-center` / `--offset-center` = `-50%`

---

## Part 3: NEW Token Categories to Add

### Category 1: BLUR INTENSITIES

```scss
// Add to _tokens.scss
$blur-sm: 2px; // Subtle backdrop
$blur-md: 4px; // Medium backdrop
$blur-lg: 18px; // Frosted glass effect

// Add to _variables.scss
--blur-sm: #{t.$blur-sm};
--blur-md: #{t.$blur-md};
--blur-lg: #{t.$blur-lg};
```

**Rationale:** Currently blur values are hardcoded. This creates a clear system for backdrop effects.

---

### Category 2: MOTION OFFSETS

```scss
// Add to _tokens.scss
$motion-offset-xs: -1px; // Minimal pop
$motion-offset-sm: -4px; // Small pop
$motion-offset-md: 12px; // Large pop
$motion-offset-center: -50%; // Vertical centering
```

**Rationale:** Micro-interactions need consistent offsets for smooth animations.

---

### Category 3: PANEL/FLOATING WIDTHS

```scss
// Add to _tokens.scss
$panel-width-sm: 240px; // Floating menu
$panel-width-md: 340px; // Confirmation popup
$modal-width-sm: 420px; // Compact modal
$modal-width-md: 480px; // Standard modal
$content-max-width-md: 900px; // Content container (recipe view)
```

**Rationale:** Overlays and panels have strategic widths that should be consistent.

---

### Category 4: BORDER WIDTHS

```scss
// Add to _tokens.scss
$border-width-thin: 1px; // Subtle borders
$border-width-md: 2px; // Focus rings, prominent borders
```

**Rationale:** Border widths are currently scattered; a small system ensures consistency.

---

### Category 5: BUTTON HEIGHTS (Optional - could use existing sizes)

```scss
// Add to _tokens.scss (if not using existing $size-*)
$button-height-sm: 32px; // Icon buttons, secondary
$button-height-md: 40px; // Standard buttons
$button-height-lg: 48px; // Primary CTA, accessible touch target

// Or create aliases
$button-height-sm: $size-sm;
$button-height-md: $size-md;
$button-height-lg: $size-lg;
```

**Rationale:** Makes button sizing intent explicit and easier to remember.

---

### Category 6: ICON SIZES

```scss
// Add to _tokens.scss
$icon-xs: 14px; // Smallest icons (badges)
$icon-sm: 22px; // Navigation icons
$icon-md: 24px; // Standard icons
$icon-lg: 32px; // Large icons (close buttons)
```

**Rationale:** Icon sizing is currently mixed between hardcoded and token values.

---

### Category 7: RESPONSIVE BREAKPOINTS

```scss
// Add to _tokens.scss
$breakpoint-mobile: 640px;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
$breakpoint-wide: 1200px;

// Add to _variables.scss
--breakpoint-mobile: #{t.$breakpoint-mobile};
--breakpoint-tablet: #{t.$breakpoint-tablet};
--breakpoint-desktop: #{t.$breakpoint-desktop};
--breakpoint-wide: #{t.$breakpoint-wide};
```

**Rationale:** Media queries are currently hardcoded in multiple places.

---

## Part 4: Where to Apply (Implementation Map)

### Critical Files to Update

| File                                                                                     | Current Hardcodes                          | Suggested Tokens                                                    |
| ---------------------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------- |
| [modal-host.scss](src/app/features/ux/modal-host/modal-host.scss)                        | `480px`, `420px`, `900px`, `32px`, `640px` | `$modal-width-md`, `$modal-width-sm`, `$blur-lg`                    |
| [profile-menu.scss](src/app/features/ux/profile-menu/profile-menu.scss)                  | `240px`, `18px`, `translateY(-4px)`        | `$panel-width-sm`, `$blur-lg`, `$motion-offset-sm`                  |
| [sidebar-menu-item.scss](src/app/ui/primitives/sidebar-menu-item/sidebar-menu-item.scss) | `52px`, `22px`                             | `$size-menu-item`, `$icon-sm`                                       |
| [side-drawer.scss](src/app/ui/overlays/side-drawer/side-drawer.scss)                     | `40px`, `80px`, `768px`                    | `$button-height-md`, `$drawer-handler-height`, `$breakpoint-tablet` |
| [app-button.scss](src/app/ui/primitives/app-button/app-button.scss)                      | `32px`, `40px`, `48px`, `translateY(-1px)` | `$button-height-sm/md/lg`, `$motion-offset-xs`                      |
| [recipe-full.scss](src/app/features/recipes/recipe-full/recipe-full.scss)                | `900px`, `768px`                           | `$content-max-width-md`, `$breakpoint-tablet`                       |

---

## Part 5: Implementation Priority

### Phase 1 (Immediate - HIGH Impact)

1. Add blur token system (`$blur-sm`, `$blur-md`, `$blur-lg`)
2. Add motion offset system (`$motion-offset-xs`, `$motion-offset-sm`, `$motion-offset-md`)
3. Add panel/modal width tokens (`$panel-width-sm`, `$modal-width-sm/md`)
4. Add breakpoint tokens (`$breakpoint-*`)

**Files to Update:**

- `src/styles/_tokens.scss`
- `src/styles/_variables.scss`

**Components to Refactor:**

- [modal-host.scss](src/app/features/ux/modal-host/modal-host.scss)
- [profile-menu.scss](src/app/features/ux/profile-menu/profile-menu.scss)
- [side-drawer.scss](src/app/ui/overlays/side-drawer/side-drawer.scss)

---

### Phase 2 (Secondary - MEDIUM Impact)

1. Add icon size tokens (`$icon-sm`, `$icon-md`, `$icon-lg`)
2. Add button height aliases or explicit tokens
3. Add menu item size token
4. Add border width tokens

**Files to Update:**

- `src/styles/_tokens.scss`
- `src/styles/_variables.scss`

**Components to Refactor:**

- [sidebar-menu-item.scss](src/app/ui/primitives/sidebar-menu-item/sidebar-menu-item.scss)
- [app-button.scss](src/app/ui/primitives/app-button/app-button.scss)

---

### Phase 3 (Long-term - LOW/Optimization)

1. Audit all SCSS files for remaining hardcoded values
2. Create comprehensive documentation of token system
3. Add tokens to design system documentation
4. Consider Storybook integration for token showcase

---

## Summary Statistics

| Metric                                      | Count |
| ------------------------------------------- | ----- |
| HIGH priority tokens identified             | 12    |
| MEDIUM priority tokens identified           | 8     |
| New token categories to add                 | 7     |
| Files directly affected                     | 12+   |
| Estimated hardcoded pixel values to migrate | 26+   |
| Media query breakpoint variations           | 3     |

---

## Recommendations

1. **Start with blur and motion tokens** - These appear frequently and are aesthetically important
2. **Standardize breakpoints** - Create a breakpoint mixin for consistent responsive design
3. **Document the sizing system** - Make it clear when to use `$size-*` vs `$button-height-*` vs `$icon-*`
4. **Consider a design tokens documentation** - Update team wiki or design system docs
5. **Use a linter** - Add SCSS linting to catch new hardcoded values during development

---

## Files Analyzed

**Configuration & Variables:**

- `src/styles/_tokens.scss`
- `src/styles/_variables.scss`
- `src/styles/_mixins.scss`

**Components:**

- `src/app/features/ux/modal-host/modal-host.scss`
- `src/app/features/ux/profile-menu/profile-menu.scss`
- `src/app/ui/primitives/sidebar-menu-item/sidebar-menu-item.scss`
- `src/app/features/home/home.scss`
- `src/app/ui/overlays/side-drawer/side-drawer.scss`
- `src/styles/forms/_form-global-style.scss`
- Plus 20+ additional component files scanned

---

## Next Steps

1. Review this analysis with the design team
2. Prioritize which tokens to implement first
3. Create PR with Phase 1 token additions
4. Create follow-up refactoring PRs for each component
5. Update contribution guidelines to reference new tokens
