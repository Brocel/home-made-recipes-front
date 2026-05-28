# SCSS Tokens Implementation Quick Reference

**Quick Start Guide for Adding New Design Tokens**

---

## Phase 1: Immediate Implementation (Do This First)

Add these to `src/styles/_tokens.scss`:

```scss
// ======================================================
// BLUR INTENSITIES
// ======================================================
$blur-sm: 2px; // Subtle backdrop effects
$blur-md: 4px; // Medium backdrop effects
$blur-lg: 18px; // Frosted glass effect

// ======================================================
// MOTION OFFSETS
// ======================================================
$motion-offset-xs: -1px; // Minimal pop animation
$motion-offset-sm: -4px; // Small pop animation
$motion-offset-md: 12px; // Large pop animation
$motion-offset-center: -50%; // Vertical centering

// ======================================================
// PANEL & MODAL WIDTHS
// ======================================================
$panel-width-sm: 240px; // Floating menus/dropdowns
$panel-width-md: 340px; // Confirmation popups
$modal-width-sm: 420px; // Compact modals
$modal-width-md: 480px; // Standard modals
$content-max-width-md: 900px; // Content containers (recipes)

// ======================================================
// RESPONSIVE BREAKPOINTS
// ======================================================
$breakpoint-mobile: 640px;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
$breakpoint-wide: 1200px;
```

Add these to `src/styles/_variables.scss` (in the `:root` section):

```scss
// ======================================================
// BLUR
// ======================================================
--blur-sm: #{t.$blur-sm};
--blur-md: #{t.$blur-md};
--blur-lg: #{t.$blur-lg};

// ======================================================
// MOTION OFFSETS
// ======================================================
--motion-offset-xs: #{t.$motion-offset-xs};
--motion-offset-sm: #{t.$motion-offset-sm};
--motion-offset-md: #{t.$motion-offset-md};
--motion-offset-center: #{t.$motion-offset-center};

// ======================================================
// PANEL & MODAL WIDTHS
// ======================================================
--panel-width-sm: #{t.$panel-width-sm};
--panel-width-md: #{t.$panel-width-md};
--modal-width-sm: #{t.$modal-width-sm};
--modal-width-md: #{t.$modal-width-md};
--content-max-width-md: #{t.$content-max-width-md};

// ======================================================
// RESPONSIVE BREAKPOINTS
// ======================================================
--breakpoint-mobile: #{t.$breakpoint-mobile};
--breakpoint-tablet: #{t.$breakpoint-tablet};
--breakpoint-desktop: #{t.$breakpoint-desktop};
--breakpoint-wide: #{t.$breakpoint-wide};
```

---

## Phase 1: Refactoring Target Files

### 1. [modal-host.scss](src/app/features/ux/modal-host/modal-host.scss)

**Current:**

```scss
width: min(100vw - 32px, 480px);
width: min(100vw - 32px, 420px);
max-height: min(90vh, 900px);
backdrop-filter: var(--modal-blur); // was blur(18px)
@media (max-width: 640px) {
```

**After:**

```scss
width: min(100vw - var(--space-md), var(--modal-width-md));
width: min(100vw - var(--space-md), var(--modal-width-sm));
max-height: min(90vh, var(--content-max-width-md));
backdrop-filter: var(--blur-lg);
@media (max-width: var(--breakpoint-mobile)) {
```

---

### 2. [profile-menu.scss](src/app/features/ux/profile-menu/profile-menu.scss)

**Current:**

```scss
min-width: 240px;
backdrop-filter: blur(18px);
transform: translateY(-4px) scale(0.98);
```

**After:**

```scss
min-width: var(--panel-width-sm);
backdrop-filter: blur(var(--blur-lg));
transform: translateY(var(--motion-offset-sm)) scale(0.98);
```

---

### 3. [side-drawer.scss](src/app/ui/overlays/side-drawer/side-drawer.scss)

**Current:**

```scss
@media (max-width: 768px) {
  width: 40px;
  height: 80px;
  right: -40px;
  left: -40px;
  border-radius: 0 40px 40px 0;
  border-radius: 40px 0 0 40px;
}
```

**After:**

```scss
@media (max-width: var(--breakpoint-tablet)) {
  width: var(--button-height-md);
  height: 80px; // Consider: $drawer-handler-height
  right: -40px; // Consider: $drawer-handler-offset
  left: -40px; // Consider: negative offset
  border-radius: 0 var(--button-height-md) var(--button-height-md) 0;
  border-radius: var(--button-height-md) 0 0 var(--button-height-md);
}
```

---

### 4. [app-button.scss](src/app/ui/primitives/app-button/app-button.scss)

**Current:**

```scss
&--small {
  height: 32px;
}
&--medium {
  height: 40px;
}
&--large {
  height: 48px;
}
&:active {
  transform: translateY(-1px);
}
```

**After:**

```scss
&--small {
  height: var(--size-sm);
}
&--medium {
  height: var(--size-md);
}
&--large {
  height: var(--size-lg);
}
&:active {
  transform: translateY(var(--motion-offset-xs));
}
```

---

## Phase 2: Secondary Implementation

Add to `src/styles/_tokens.scss`:

```scss
// ======================================================
// ICON SIZES
// ======================================================
$icon-xs: 14px; // Badges, small indicators
$icon-sm: 22px; // Navigation icons
$icon-md: 24px; // Standard icons
$icon-lg: 32px; // Large icons, close buttons

// ======================================================
// MENU ITEM SIZING
// ======================================================
$menu-item-height: 52px; // Standard list/menu item height
$menu-item-height-collapsed: 52px; // Square for collapsed sidebar

// ======================================================
// BORDER WIDTHS
// ======================================================
$border-width-thin: 1px; // Subtle borders
$border-width-md: 2px; // Focus rings, prominent borders
```

Add to `src/styles/_variables.scss`:

```scss
// ======================================================
// ICON SIZES
// ======================================================
--icon-xs: #{t.$icon-xs};
--icon-sm: #{t.$icon-sm};
--icon-md: #{t.$icon-md};
--icon-lg: #{t.$icon-lg};

// ======================================================
// MENU ITEM SIZING
// ======================================================
--menu-item-height: #{t.$menu-item-height};
--menu-item-height-collapsed: #{t.$menu-item-height-collapsed};

// ======================================================
// BORDER WIDTHS
// ======================================================
--border-width-thin: #{t.$border-width-thin};
--border-width-md: #{t.$border-width-md};
```

---

### Phase 2 Refactoring

#### [sidebar-menu-item.scss](src/app/ui/primitives/sidebar-menu-item/sidebar-menu-item.scss)

```scss
// Current
.item {
  min-height: 52px;
}

.item--collapsed {
  width: 52px;
}

.item__icon {
  width: 22px;
  height: 22px;
}

// After
.item {
  min-height: var(--menu-item-height);
}

.item--collapsed {
  width: var(--menu-item-height);
}

.item__icon {
  width: var(--icon-sm);
  height: var(--icon-sm);
}
```

---

## Testing Checklist

After implementing tokens:

- [ ] All SCSS files compile without errors
- [ ] No CSS variable references are broken
- [ ] Run `npm run lint` - passes
- [ ] Run `npm run test` - passes
- [ ] Visual regression testing for affected components
- [ ] Check responsive design at breakpoints (640px, 768px, 1024px)
- [ ] Verify animations are smooth with new motion offsets

---

## Usage Guidelines

### When to Use Each Token Category

| Need                  | Token                             | Example                      |
| --------------------- | --------------------------------- | ---------------------------- |
| Button height         | `var(--size-sm/md/lg)`            | Close button, form button    |
| Icon size             | `var(--icon-sm/md/lg)`            | Navigation icon, action icon |
| Menu item height      | `var(--menu-item-height)`         | Sidebar items, list items    |
| Floating panel width  | `var(--panel-width-sm/md)`        | Dropdown menu, popup         |
| Modal width           | `var(--modal-width-sm/md)`        | Dialog, form modal           |
| Content width limit   | `var(--content-max-width-md)`     | Recipe view, article         |
| Backdrop effect       | `var(--blur-lg/md/sm)`            | Modal backdrop, menu panel   |
| Animation offset      | `var(--motion-offset-xs/sm/md)`   | Pop animation, slide in      |
| Responsive breakpoint | `var(--breakpoint-mobile/tablet)` | Media query, fluid layout    |
| Border                | `var(--border-width-thin/md)`     | Focus ring, panel border     |

---

## Common Patterns

### Responsive Modal

```scss
.modal {
  width: min(100vw - var(--space-md), var(--modal-width-md));

  @media (max-width: var(--breakpoint-tablet)) {
    width: min(100vw - var(--space-md), var(--modal-width-sm));
  }
}
```

### Floating Panel with Backdrop

```scss
.panel {
  min-width: var(--panel-width-sm);
  backdrop-filter: blur(var(--blur-lg));
  animation: panel-enter var(--transition-base);
}
```

### Pop-in Animation

```scss
.item {
  animation: pop-enter var(--transition-base);

  @keyframes pop-enter {
    from {
      opacity: 0;
      transform: translateY(var(--motion-offset-md)) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
}
```

---

## Troubleshooting

**Issue:** CSS variables are not applied  
**Solution:** Ensure `_variables.scss` is imported in your component SCSS via `@use`

**Issue:** SCSS variables not recognized  
**Solution:** Add `@use 'tokens' as t;` at the top of files using SCSS tokens directly

**Issue:** Breakpoint tokens not working in media queries  
**Solution:** CSS variables cannot be used in media queries; use SCSS tokens: `@media (max-width: t.$breakpoint-tablet)`

---

## See Full Analysis

For detailed findings, rationale, and implementation strategy, see [SCSS_TOKEN_ANALYSIS.md](SCSS_TOKEN_ANALYSIS.md)
