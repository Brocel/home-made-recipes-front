# SCSS Tokens: Before & After Examples

**Visual Reference Guide for Token Implementation**

---

## Example 1: Modal Component

### ❌ BEFORE (Current - Hardcoded)

```scss
// modal-host.scss - Current implementation
.modal-host {
  width: min(100vw - 32px, 480px); // Hardcoded width
  max-height: min(90vh, 900px); // Hardcoded max-height
  backdrop-filter: blur(18px); // Hardcoded blur
  animation: modal-enter var(--transition-base);

  @media (max-width: 640px) {
    // Hardcoded breakpoint
    width: min(100vw - 32px, 420px); // Different hardcoded width
  }
}

.modal-host__close {
  width: 32px; // Hardcoded
  height: 32px; // Hardcoded
}

.modal--variant-subtle {
  --modal-blur: blur(18px); // Hardcoded blur in variant
}

.modal--backdrop {
  filter: blur(4px); // Hardcoded blur

  &.open {
    filter: blur(0);
  }
}
```

**Problems:**

- ❌ Blur value `18px` appears in 2 places
- ❌ Width `480px` hardcoded without semantic meaning
- ❌ Breakpoint `640px` not reusable
- ❌ Modal sizes scattered (420px vs 480px)
- ❌ Blur values inconsistent (18px vs 4px vs 2px)

### ✅ AFTER (With Tokens - Recommended)

```scss
// modal-host.scss - Refactored with tokens
@use '../../../../styles/tokens' as t;

.modal-host {
  width: min(100vw - var(--space-md), var(--modal-width-md));
  max-height: min(90vh, var(--content-max-width-md));
  backdrop-filter: blur(var(--blur-lg));
  animation: modal-enter var(--transition-base);

  @media (max-width: t.$breakpoint-mobile) {
    // SCSS token in media query
    width: min(100vw - var(--space-md), var(--modal-width-sm));
  }
}

.modal-host__close {
  width: var(--size-sm); // Reuses existing size token
  height: var(--size-sm);
}

.modal--variant-subtle {
  --modal-blur: blur(var(--blur-lg)); // Uses blur token
}

.modal--backdrop {
  filter: blur(var(--blur-md)); // Reuses blur token

  &.open {
    filter: blur(0);
  }
}
```

**Benefits:**

- ✅ Single source of truth for modal widths
- ✅ Blur values managed centrally
- ✅ Breakpoints consistent across codebase
- ✅ Easy to update: change token = applies everywhere
- ✅ Semantic naming makes intent clear

---

## Example 2: Profile Menu / Floating Panel

### ❌ BEFORE (Current - Hardcoded)

```scss
// profile-menu.scss - Current implementation
.profile-panel {
  min-width: 240px; // Hardcoded width
  backdrop-filter: blur(18px); // Hardcoded blur
  animation: profile-menu-enter 140ms ease;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--color-border);
}

.profile-item {
  min-height: var(--size-md); // Mixed approach: token for some things
}

.profile-item__icon {
  width: 22px; // Hardcoded icon size
  height: 22px;
}

@keyframes profile-menu-enter {
  from {
    opacity: 0;
    transform: translateY(-4px) scale(0.98); // Hardcoded motion offset
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

**Problems:**

- ❌ Panel width `240px` not reusable
- ❌ Blur `18px` duplicated (also in modal)
- ❌ Motion offset `-4px` inconsistent with other animations
- ❌ Icon size `22px` hardcoded (not a standard size token)
- ❌ Animation mixing hardcoded offsets with variables

### ✅ AFTER (With Tokens - Recommended)

```scss
// profile-menu.scss - Refactored with tokens
@use '../../../../styles/tokens' as t;

.profile-panel {
  min-width: var(--panel-width-sm); // Token-based width
  backdrop-filter: blur(var(--blur-lg)); // Token-based blur
  animation: profile-menu-enter var(--transition-base);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  border: var(--border-width-thin) solid var(--color-border);
}

.profile-item {
  min-height: var(--menu-item-height); // Token for menu items
}

.profile-item__icon {
  width: var(--icon-sm); // Token-based icon size
  height: var(--icon-sm);
}

@keyframes profile-menu-enter {
  from {
    opacity: 0;
    transform: translateY(var(--motion-offset-sm)) scale(0.98); // Token offset
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

**Benefits:**

- ✅ All hardcoded values now tokens
- ✅ Consistent with other floating surfaces
- ✅ Motion offset matches animation system
- ✅ Border width token for consistency
- ✅ Easy to adjust: change one token = all panels update

---

## Example 3: Sidebar Menu Item

### ❌ BEFORE (Current - Hardcoded)

```scss
// sidebar-menu-item.scss - Current implementation
.item {
  gap: var(--space-md);
  width: 100%;
  min-height: 52px; // Hardcoded
  padding-inline: var(--space-md);
  padding-block: var(--space-sm);

  &:active {
    transform: scale(0.98);
  }
}

.item--collapsed {
  width: 52px; // Hardcoded (same as height!)
  padding: 0;
}

.item__icon {
  width: 22px; // Hardcoded icon size
  height: 22px;
  flex-shrink: 0;
}

.item__label {
  font-size: var(--text-sm);
  font-weight: 500;
}
```

**Problems:**

- ❌ Menu item height `52px` hardcoded in 2 places
- ❌ Icon size `22px` not standardized
- ❌ Same value (52px) used for both width and height without semantics

### ✅ AFTER (With Tokens - Recommended)

```scss
// sidebar-menu-item.scss - Refactored with tokens
@use '../../../../styles/tokens' as t;

.item {
  gap: var(--space-md);
  width: 100%;
  min-height: var(--menu-item-height); // Token-based
  padding-inline: var(--space-md);
  padding-block: var(--space-sm);

  &:active {
    transform: scale(0.98);
  }
}

.item--collapsed {
  width: var(--menu-item-height); // Semantic token
  padding: 0;
}

.item__icon {
  width: var(--icon-sm); // Token-based
  height: var(--icon-sm);
  flex-shrink: 0;
}

.item__label {
  font-size: var(--text-sm);
  font-weight: 500;
}
```

**Benefits:**

- ✅ Menu sizing consistent across app
- ✅ Icon sizes standardized
- ✅ Semantic naming (`menu-item-height` vs just `52px`)
- ✅ Easy to adjust menu height for accessibility
- ✅ Icon size now part of design system

---

## Example 4: Button Component

### ❌ BEFORE (Current - Mixed Approach)

```scss
// app-button.scss - Current implementation
.button {
  transition:
    background-color var(--transition-base),
    color var(--transition-base),
    transform var(--transition-fast);
}

.button--small {
  height: 32px; // Hardcoded
}

.button--medium {
  height: 40px; // Hardcoded
}

.button--large {
  height: 48px; // Hardcoded
}

.button:active {
  transform: translateY(-1px); // Hardcoded motion offset
}

.button__icon {
  width: 14px; // Hardcoded
  height: 14px;
}

@keyframes button-press {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-1px); // Hardcoded offset
  }
  100% {
    transform: translateY(0);
  }
}
```

**Problems:**

- ❌ Button heights could use existing size tokens
- ❌ Motion offset `-1px` scattered
- ❌ Icon size `14px` not standardized
- ❌ Inconsistent with other animated components

### ✅ AFTER (With Tokens - Recommended)

```scss
// app-button.scss - Refactored with tokens
@use '../../../../styles/tokens' as t;

.button {
  transition:
    background-color var(--transition-base),
    color var(--transition-base),
    transform var(--transition-fast);
}

.button--small {
  height: var(--size-sm); // Reuses existing token
}

.button--medium {
  height: var(--size-md); // Reuses existing token
}

.button--large {
  height: var(--size-lg); // Reuses existing token
}

.button:active {
  transform: translateY(var(--motion-offset-xs)); // Token-based motion
}

.button__icon {
  width: var(--icon-xs); // Token-based icon
  height: var(--icon-xs);
}

@keyframes button-press {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(var(--motion-offset-xs)); // Token-based
  }
  100% {
    transform: translateY(0);
  }
}
```

**Benefits:**

- ✅ Leverages existing size tokens
- ✅ Consistent motion offset system
- ✅ Icon size now standardized
- ✅ Animation system unified
- ✅ No new values, just better organization

---

## Example 5: Media Queries & Responsive Layout

### ❌ BEFORE (Current - Scattered Breakpoints)

```scss
// home.scss - Current implementation
.home-container {
  display: flex;
  gap: var(--space-lg);
}

@media (max-width: 1024px) {
  // Hardcoded breakpoint
  .home-container {
    gap: var(--space-md);
  }
}

@media (max-width: 768px) {
  // Hardcoded breakpoint (different from above!)
  .home-container {
    flex-direction: column;
  }
}

// side-drawer.scss - Different file, different breakpoint names
@media (max-width: 768px) {
  // Same value but no connection
  .drawer {
    width: 90vw !important;
  }
}

// modal-host.scss - Yet another breakpoint
@media (max-width: 640px) {
  // Different value entirely
  .modal {
    width: min(100vw - 32px, 420px);
  }
}
```

**Problems:**

- ❌ Three different breakpoints: 640px, 768px, 1024px
- ❌ No semantic naming (is 1024px "tablet" or "desktop"?)
- ❌ No way to globally change breakpoints
- ❌ Developers must remember which breakpoint to use

### ✅ AFTER (With Tokens - Recommended)

```scss
// home.scss - Refactored with breakpoint tokens
@use '../../../../styles/tokens' as t;

.home-container {
  display: flex;
  gap: var(--space-lg);
}

@media (max-width: t.$breakpoint-desktop) {
  // Semantic: "desktop"
  .home-container {
    gap: var(--space-md);
  }
}

@media (max-width: t.$breakpoint-tablet) {
  // Semantic: "tablet"
  .home-container {
    flex-direction: column;
  }
}

// side-drawer.scss - Consistent naming
@media (max-width: t.$breakpoint-tablet) {
  // Same semantic name
  .drawer {
    width: 90vw !important;
  }
}

// modal-host.scss - Clear semantics
@media (max-width: t.$breakpoint-mobile) {
  // Semantic: "mobile"
  .modal {
    width: min(100vw - var(--space-md), var(--modal-width-sm));
  }
}
```

**Benefits:**

- ✅ Semantic breakpoint naming
- ✅ Consistent across entire codebase
- ✅ Single source of truth for breakpoints
- ✅ Easy to adjust all breakpoints at once
- ✅ Developers know which breakpoint to use
- ✅ Setup for Storybook/design system documentation

---

## Example 6: Animation Consistency

### ❌ BEFORE (Current - Scattered Motion Offsets)

```scss
// Different files using inconsistent offsets
.profile-menu__item {
  animation: menu-pop var(--transition-base);
}

@keyframes menu-pop {
  from {
    transform: translateY(-4px) scale(0.98); // -4px
  }
  to {
    transform: translateY(0) scale(1);
  }
}

.modal {
  animation: modal-pop var(--transition-base);
}

@keyframes modal-pop {
  from {
    transform: translateY(12px) scale(0.98); // 12px (different!)
  }
  to {
    transform: translateY(0) scale(1);
  }
}

.button:active {
  transform: translateY(-1px); // -1px (yet another offset!)
}

.form-field__error {
  animation: error-pop var(--transition-base);
}

@keyframes error-pop {
  from {
    transform: translateY(-2px); // -2px (inconsistent!)
  }
  to {
    transform: translateY(0);
  }
}
```

**Problems:**

- ❌ Four different offset values: -1px, -2px, -4px, 12px
- ❌ No clear semantics (why -4px for menu but 12px for modal?)
- ❌ Updating animation speeds requires updating multiple places
- ❌ New developers add their own offsets

### ✅ AFTER (With Tokens - Recommended)

```scss
// Consistent animation system with motion tokens
.profile-menu__item {
  animation: menu-pop var(--transition-base);
}

@keyframes menu-pop {
  from {
    transform: translateY(var(--motion-offset-sm)) scale(0.98);
  }
  to {
    transform: translateY(0) scale(1);
  }
}

.modal {
  animation: modal-pop var(--transition-base);
}

@keyframes modal-pop {
  from {
    transform: translateY(var(--motion-offset-md)) scale(0.98);
  }
  to {
    transform: translateY(0) scale(1);
  }
}

.button:active {
  transform: translateY(var(--motion-offset-xs));
}

.form-field__error {
  animation: error-pop var(--transition-base);
}

@keyframes error-pop {
  from {
    transform: translateY(var(--motion-offset-xs));
  }
  to {
    transform: translateY(0);
  }
}
```

**Benefits:**

- ✅ Systematic motion offsets (xs, sm, md)
- ✅ Clear semantic meaning
- ✅ Consistent feel across animations
- ✅ Update one token = all animations affected
- ✅ New developers know what values to use
- ✅ Easy to create animation guidelines

---

## Token Usage Summary Table

| Before (Hardcoded)            | After (Token)                                    | Benefit                |
| ----------------------------- | ------------------------------------------------ | ---------------------- |
| `width: 480px`                | `var(--modal-width-md)`                          | Semantic, reusable     |
| `width: 420px`                | `var(--modal-width-sm)`                          | Semantic, reusable     |
| `min-width: 240px`            | `var(--panel-width-sm)`                          | Semantic, reusable     |
| `blur(18px)`                  | `blur(var(--blur-lg))`                           | Reusable, consistent   |
| `blur(4px)`                   | `blur(var(--blur-md))`                           | Reusable, consistent   |
| `@media (max-width: 768px)`   | `@media (max-width: t.$breakpoint-tablet)`       | Semantic, maintainable |
| `transform: translateY(-4px)` | `transform: translateY(var(--motion-offset-sm))` | Reusable, consistent   |
| `height: 22px`                | `height: var(--icon-sm)`                         | Standardized, semantic |
| `min-height: 52px`            | `min-height: var(--menu-item-height)`            | Semantic, adjustable   |
| `border: 1px solid`           | `border: var(--border-width-thin) solid`         | Consistent, themeable  |

---

## Implementation Checklist

- [ ] All `blur(Xpx)` → `blur(var(--blur-*))`
- [ ] All fixed modal widths → `var(--modal-width-*)`
- [ ] All panel widths → `var(--panel-width-*)`
- [ ] All media queries → use `t.$breakpoint-*`
- [ ] All `translateY` → `var(--motion-offset-*)`
- [ ] All `22px` icons → `var(--icon-sm)`
- [ ] All `52px` menu items → `var(--menu-item-height)`
- [ ] All `1px` borders → `var(--border-width-thin)`
- [ ] All `2px` borders → `var(--border-width-md)`
- [ ] Tests pass
- [ ] Lint passes
- [ ] Visual regression testing complete

---

## Quick Reference: Token Names

```scss
// Blur Effects
--blur-sm: 2px --blur-md: 4px --blur-lg: 18px // Motion Offsets
  --motion-offset-xs: -1px --motion-offset-sm: -4px --motion-offset-md: 12px
  // Sizes (existing - reuse these)
  --size-sm: 32px (buttons) --size-md: 40px (buttons) --size-lg: 48px (buttons) // New Icon Sizes
  --icon-xs: 14px --icon-sm: 22px --icon-md: 24px --icon-lg: 32px // Width Tokens
  --panel-width-sm: 240px --panel-width-md: 340px --modal-width-sm: 420px --modal-width-md: 480px
  --content-max-width-md: 900px // Menu Items
  --menu-item-height: 52px // Borders
  --border-width-thin: 1px --border-width-md: 2px // Responsive (SCSS only)
  $breakpoint-mobile: 640px $breakpoint-tablet: 768px $breakpoint-desktop: 1024px;
```

---

## More Information

- Full analysis: [SCSS_TOKEN_ANALYSIS.md](SCSS_TOKEN_ANALYSIS.md)
- Quick implementation guide: [SCSS_TOKENS_QUICK_REFERENCE.md](SCSS_TOKENS_QUICK_REFERENCE.md)
- Gap analysis: [SCSS_TOKENS_GAP_ANALYSIS.md](SCSS_TOKENS_GAP_ANALYSIS.md)
- Executive summary: [SCSS_ANALYSIS_EXECUTIVE_SUMMARY.md](SCSS_ANALYSIS_EXECUTIVE_SUMMARY.md)
