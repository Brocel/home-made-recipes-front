# Token System Gap Analysis

## Current Token System (Existing)

### ✅ Well-Covered Areas

| Category       | Tokens                                      | Coverage               |
| -------------- | ------------------------------------------- | ---------------------- |
| **Colors**     | Brand, Semantic, State                      | Complete               |
| **Typography** | Font sizes (xs-3xl), line heights           | Complete               |
| **Spacing**    | xs, sm, md, lg, xl (4-32px)                 | Complete               |
| **Sizing**     | sm (32px), md (40px), lg (48px)             | Partial - only 3 sizes |
| **Radius**     | xs, sm, md, lg, pill                        | Complete               |
| **Shadows**    | sm, md, lg                                  | Complete               |
| **Motion**     | fast, base, slow                            | Complete               |
| **Z-Index**    | base through toast                          | Complete               |
| **Layout**     | content-width, sidebar-width, navbar-height | Partial                |

**Total Existing Tokens:** ~65 SCSS variables + CSS equivalents

---

## Current Token System (Existing - Continued)

### ✅ Form Control Tokens

| Token                     | Value             | Purpose         |
| ------------------------- | ----------------- | --------------- |
| `--control-height-sm`     | calc(24px × 1.75) | Small controls  |
| `--control-height-md`     | calc(32px × 1.75) | Medium controls |
| `--control-height-lg`     | calc(32px × 2.25) | Large controls  |
| `--control-width-sm`      | 12rem             | Small field     |
| `--control-width-md`      | 18rem             | Medium field    |
| `--control-width-lg`      | 24rem             | Large field     |
| `--control-choice-size-*` | Variable          | Checkbox/radio  |

---

## Missing Token System (Gaps Identified)

### ❌ Critical Gaps (HIGH Priority)

| Category                   | Missing Tokens                   | Occurrences               | Impact                 |
| -------------------------- | -------------------------------- | ------------------------- | ---------------------- |
| **Blur Effects**           | `blur-sm`, `blur-md`, `blur-lg`  | 6 hardcoded instances     | UI Consistency         |
| **Motion Offsets**         | `motion-offset-xs/sm/md`         | 16 hardcoded instances    | Animation Consistency  |
| **Modal/Panel Widths**     | `modal-width-*`, `panel-width-*` | 9 hardcoded instances     | Layout Consistency     |
| **Responsive Breakpoints** | `breakpoint-*`                   | 5 hardcoded media queries | Responsive Consistency |
| **Icon Sizes**             | `icon-sm`, `icon-md`, `icon-lg`  | 3+ hardcoded instances    | Icon Consistency       |
| **Menu Item Heights**      | `menu-item-height`               | 2-3 hardcoded instances   | Component Sizing       |

**Total New Tokens Needed:** ~24 tokens across 6 categories

---

## Detailed Gap Analysis by Category

### 1. BLUR EFFECTS

**Status:** ❌ MISSING  
**Priority:** HIGH

**Current State:**

```scss
// Hardcoded across files
backdrop-filter: blur(18px);
filter: blur(4px);
filter: blur(2px);
```

**Proposed Tokens:**

```scss
$blur-sm: 2px;
$blur-md: 4px;
$blur-lg: 18px;

--blur-sm: var(--blur-sm);
--blur-md: var(--blur-md);
--blur-lg: var(--blur-lg);
```

**Where Used:**

- profile-menu.scss: `blur(18px)` (frosted glass)
- modal-host.scss: `blur(18px)`, `blur(4px)` (backdrop effects)
- floating-surface.scss: `blur(2px)` (subtle overlay)

**Files Affected:** 3+  
**Estimated Instances:** 6

---

### 2. MOTION OFFSETS

**Status:** ❌ MISSING  
**Priority:** HIGH

**Current State:**

```scss
// Hardcoded across animation files
transform: translateY(-4px) scale(0.98);
transform: translateY(12px) scale(0.98);
transform: translateY(-1px);
transform: translateY(-50%);
```

**Proposed Tokens:**

```scss
$motion-offset-xs: -1px;
$motion-offset-sm: -4px;
$motion-offset-md: 12px;
$motion-offset-center: -50%;

--motion-offset-xs: #{t.$motion-offset-xs};
--motion-offset-sm: #{t.$motion-offset-sm};
--motion-offset-md: #{t.$motion-offset-md};
--motion-offset-center: #{t.$motion-offset-center};
```

**Where Used:**

- profile-menu.scss: `-4px` pop animation
- modal-host.scss: `12px` pop animation
- app-button.scss: `-1px` press effect
- Various centering: `-50%` for vertical alignment

**Files Affected:** 8+  
**Estimated Instances:** 16

---

### 3. MODAL & PANEL WIDTHS

**Status:** ❌ MISSING  
**Priority:** HIGH

**Current State:**

```scss
width: min(100vw - 32px, 480px); // Standard modal
width: min(100vw - 32px, 420px); // Compact modal
min-width: 240px; // Floating menu
min-width: 340px; // Popup
max-width: 900px; // Content container
```

**Proposed Tokens:**

```scss
$panel-width-sm: 240px;
$panel-width-md: 340px;
$modal-width-sm: 420px;
$modal-width-md: 480px;
$content-max-width-md: 900px;

--panel-width-sm: #{t.$panel-width-sm};
--panel-width-md: #{t.$panel-width-md};
--modal-width-sm: #{t.$modal-width-sm};
--modal-width-md: #{t.$modal-width-md};
--content-max-width-md: #{t.$content-max-width-md};
```

**Where Used:**

- modal-host.scss: `480px`, `420px`, `900px`
- profile-menu.scss: `240px`
- confirm-popup.scss: `340px`
- recipe-full.scss: `900px`
- add-edit-recipe.scss: `900px`

**Files Affected:** 5+  
**Estimated Instances:** 9

---

### 4. RESPONSIVE BREAKPOINTS

**Status:** ❌ MISSING  
**Priority:** HIGH

**Current State:**

```scss
@media (max-width: 640px) {
}
@media (max-width: 768px) {
}
@media (max-width: 1024px) {
}
```

**Proposed Tokens:**

```scss
$breakpoint-mobile: 640px;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
$breakpoint-wide: 1200px;

--breakpoint-mobile: #{t.$breakpoint-mobile};
--breakpoint-tablet: #{t.$breakpoint-tablet};
--breakpoint-desktop: #{t.$breakpoint-desktop};
--breakpoint-wide: #{t.$breakpoint-wide};
```

**Where Used:**

- modal-host.scss: `640px`
- home.scss: `768px`, `1024px`
- side-drawer.scss: `768px`
- recipe-full.scss: `768px`

**Files Affected:** 5+  
**Estimated Instances:** 5

**Note:** CSS variables cannot be used in media queries; use SCSS tokens via mixin

---

### 5. ICON SIZES

**Status:** ⚠️ PARTIAL  
**Priority:** MEDIUM

**Current State:**

```scss
// Mixed token and hardcoded usage
width: 22px; // Hardcoded in sidebar-menu-item.scss
width: 14px; // Hardcoded in app-button.scss
// Exist as size tokens: $size-sm (32px), $size-md (40px), etc.
```

**Proposed Tokens:**

```scss
$icon-xs: 14px; // Badges
$icon-sm: 22px; // Nav icons
$icon-md: 24px; // Standard icons
$icon-lg: 32px; // Large icons

--icon-xs: #{t.$icon-xs};
--icon-sm: #{t.$icon-sm};
--icon-md: #{t.$icon-md};
--icon-lg: #{t.$icon-lg};
```

**Where Used:**

- sidebar-menu-item.scss: `22px`
- app-button.scss: `14px`
- Various icon components

**Files Affected:** 3+  
**Estimated Instances:** 5

---

### 6. MENU ITEM SIZING

**Status:** ❌ MISSING  
**Priority:** MEDIUM

**Current State:**

```scss
// Hardcoded in multiple places
min-height: 52px; // Menu items
width: 52px; // Collapsed sidebar
```

**Proposed Tokens:**

```scss
$menu-item-height: 52px;

--menu-item-height: #{t.$menu-item-height};
```

**Where Used:**

- sidebar-menu-item.scss: `52px` (appears 2 times in same file)

**Files Affected:** 1-2  
**Estimated Instances:** 3

---

### 7. BORDER WIDTHS

**Status:** ⚠️ PARTIAL  
**Priority:** MEDIUM

**Current State:**

```scss
// Hardcoded border widths
border: 1px solid ...      // Most borders
outline: 2px solid ...     // Focus rings
border-top-width: 3px;     // Recipe dividers
```

**Proposed Tokens:**

```scss
$border-width-thin: 1px;
$border-width-md: 2px;
$border-width-thick: 3px;

--border-width-thin: #{t.$border-width-thin};
--border-width-md: #{t.$border-width-md};
--border-width-thick: #{t.$border-width-thick};
```

**Where Used:**

- Modal borders: `1px`
- Focus rings: `2px`
- Dividers: `3px`

**Files Affected:** 4+  
**Estimated Instances:** 6

---

### 8. LAYOUT-SPECIFIC TOKENS

**Status:** ⚠️ PARTIAL  
**Priority:** LOW

**Current State:**

```scss
// Drawer specific
width: 40px; // Handler width
height: 80px; // Handler height
right: -40px; // Handler offset
```

**Proposed Tokens:**

```scss
$drawer-handler-width: 40px;
$drawer-handler-height: 80px;
$drawer-handler-offset: -40px;
```

**Files Affected:** 1-2  
**Estimated Instances:** 3

---

## Existing vs Proposed Comparison Matrix

| Need                 | Existing Token    | Proposed Token                  | Best Practice |
| -------------------- | ----------------- | ------------------------------- | ------------- |
| Small button         | `$size-sm` (32px) | Use `$size-sm` or alias         | Use existing  |
| Medium button        | `$size-md` (40px) | Use `$size-md` or alias         | Use existing  |
| Large button         | `$size-lg` (48px) | Use `$size-lg` or alias         | Use existing  |
| Small icon           | ❌ None           | `$icon-sm` (22px)               | Create new    |
| Navigation icon      | ❌ None           | `$icon-sm` (22px)               | Create new    |
| Menu item height     | ❌ None           | `$menu-item-height` (52px)      | Create new    |
| Small blur           | ❌ None           | `$blur-sm` (2px)                | Create new    |
| Medium blur          | ❌ None           | `$blur-md` (4px)                | Create new    |
| Large blur           | ❌ None           | `$blur-lg` (18px)               | Create new    |
| Small modal width    | ❌ None           | `$modal-width-sm` (420px)       | Create new    |
| Standard modal width | ❌ None           | `$modal-width-md` (480px)       | Create new    |
| Menu panel width     | ❌ None           | `$panel-width-sm` (240px)       | Create new    |
| Content max-width    | ❌ None           | `$content-max-width-md` (900px) | Create new    |
| Mobile breakpoint    | ❌ None           | `$breakpoint-mobile` (640px)    | Create new    |
| Tablet breakpoint    | ❌ None           | `$breakpoint-tablet` (768px)    | Create new    |
| Pop animation offset | ❌ None           | `$motion-offset-*`              | Create new    |

---

## Implementation Roadmap

### Timeline Estimate

| Phase       | Tokens                            | Refactoring | Effort | Duration  |
| ----------- | --------------------------------- | ----------- | ------ | --------- |
| **Phase 1** | Blur, Motion, Widths, Breakpoints | 3-4 files   | High   | 2-3 hours |
| **Phase 2** | Icons, Menu items, Borders        | 2-3 files   | Medium | 1-2 hours |
| **Phase 3** | Layout-specific tokens            | 1-2 files   | Low    | 30-45 min |
| **Phase 4** | Audit & Documentation             | N/A         | Low    | 1 hour    |

**Total Estimated Effort:** 4-7 hours including testing

---

## Impact Assessment

### By File

| File                   | Hardcoded Values | Token Opportunities | Priority  |
| ---------------------- | ---------------- | ------------------- | --------- |
| modal-host.scss        | 6                | 6                   | 🔴 HIGH   |
| profile-menu.scss      | 3                | 3                   | 🔴 HIGH   |
| side-drawer.scss       | 4                | 4                   | 🔴 HIGH   |
| app-button.scss        | 4                | 4                   | 🔴 HIGH   |
| sidebar-menu-item.scss | 2                | 2                   | 🟡 MEDIUM |
| recipe-full.scss       | 2                | 2                   | 🟡 MEDIUM |
| home.scss              | 2                | 2                   | 🟡 MEDIUM |
| Other components       | 3+               | 3+                  | 🟢 LOW    |

### By Category

| Category       | Coverage | Recommendation               |
| -------------- | -------- | ---------------------------- |
| Colors         | ✅ 100%  | Complete - no changes needed |
| Typography     | ✅ 100%  | Complete - no changes needed |
| Spacing        | ✅ 100%  | Complete - no changes needed |
| Sizing         | ⚠️ 60%   | Add icon-specific sizes      |
| Radius         | ✅ 100%  | Complete - no changes needed |
| Shadows        | ✅ 100%  | Complete - no changes needed |
| Motion         | ⚠️ 50%   | Add offset tokens            |
| Z-Index        | ✅ 100%  | Complete - no changes needed |
| Layout         | ⚠️ 40%   | Add widths, breakpoints      |
| Effects (Blur) | ❌ 0%    | Add blur intensity tokens    |

---

## Key Metrics

| Metric                      | Value         |
| --------------------------- | ------------- |
| Existing SCSS tokens        | 65+           |
| Existing CSS variables      | 100+          |
| Proposed new tokens         | 24            |
| Files requiring refactoring | 5-8 (Phase 1) |
| Hardcoded values to migrate | 35+           |
| Estimated code reduction    | 50+ lines     |
| Reusability improvement     | 40-50%        |

---

## Success Criteria

After implementation, the codebase will have:

- ✅ No hardcoded blur values (all use `$blur-*` tokens)
- ✅ No hardcoded motion offsets (all use `$motion-offset-*` tokens)
- ✅ No hardcoded modal/panel widths (all use `$modal-width-*`, `$panel-width-*`)
- ✅ Consistent responsive breakpoints via `$breakpoint-*`
- ✅ Standardized icon sizing via `$icon-*`
- ✅ Unified menu item sizing via `$menu-item-height`
- ✅ ~24 new tokens added to the design system
- ✅ Full CSS variable coverage for all new tokens
- ✅ Dark theme support extended to new tokens (if needed)

---

## Maintenance Notes

### Adding Future Tokens

**Guideline:** Add tokens when a value appears 2+ times across different components

**Process:**

1. Create SCSS token in `_tokens.scss`
2. Create CSS variable in `_variables.scss` (in `:root`)
3. Add to dark theme variant (if color-related)
4. Update this document
5. Refactor components to use token

### Documentation

- Keep this analysis updated quarterly
- Add new tokens to team design system docs
- Include examples in contribution guidelines

---

## Related Documentation

- Full analysis: [SCSS_TOKEN_ANALYSIS.md](SCSS_TOKEN_ANALYSIS.md)
- Quick reference: [SCSS_TOKENS_QUICK_REFERENCE.md](SCSS_TOKENS_QUICK_REFERENCE.md)
