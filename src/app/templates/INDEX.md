# FLOW Design System — L5 Templates Index

**Layer 5: Templates** — Reusable page-level patterns and component documentation templates.

---

## Directory Structure

```
/src/app/templates/
├── component-doc-template.tsx    # L5 Template implementation (reusable helpers)
├── index.ts                      # Barrel export for all template helpers
│
├── README.md                     # Usage guide and best practices
├── IMPLEMENTATION-SUMMARY.md     # Executive summary of template creation
├── FLOWBUTTON-REFERENCE.md       # FlowButton as canonical reference
├── RESPONSIVE-MATRIX.md          # EmphasisMatrix responsive behavior
└── INDEX.md                      # This file
```

---

## Quick Reference

### Core Template (`component-doc-template.tsx`)

**Exports:**

| Export | Type | Purpose |
|--------|------|---------|
| `useDemoSize()` | Hook | Returns size matching viewport density (sm/md/lg/xl) |
| `useFabDemoSize()` | Hook | Returns FAB size (clamps xl → lg) |
| `DemoCell` | Component | Wraps component with optional label below |
| `EmphasisMatrix` | Component | Renders emphasis × size matrix with CSS Grid |
| `statesGridStyle()` | Function | Returns CSS Grid style for States section |
| `SizesSection` | Component | Template for "Sizes" section |
| `StatesSection` | Component | Template for "States" section |
| `EmphasisVariantsSection` | Component | Template for "Emphasis Variants" section |
| `EmphasisSizeMatrixSection` | Component | Template for complete matrix |
| `FullWidthSection` | Component | Template for "Full Width" section |

---

### Documentation Files

#### 1. **README.md** — Primary Usage Guide

**Purpose:** How to use the template in component documentation

**Contents:**
- Export reference (hooks, helpers, section templates)
- Usage examples (import → implementation)
- Typography roles reference
- Standard sections checklist
- Best practices (DOs and DON'Ts)
- Migration checklist for existing docs

**Target Audience:** Developers documenting new components

---

#### 2. **IMPLEMENTATION-SUMMARY.md** — Executive Summary

**Purpose:** High-level overview of template creation and impact

**Contents:**
- What was done (4 main deliverables)
- Architecture impact (before/after)
- Canonical pattern established
- Files created/modified
- Next steps and success metrics

**Target Audience:** Project leads, architects reviewing the work

---

#### 3. **FLOWBUTTON-REFERENCE.md** — Canonical Reference

**Purpose:** FlowButton as the gold standard for component documentation

**Contents:**
- Why FlowButton was chosen
- FlowButton documentation structure
- Detailed breakdown of all 7 standard sections
- Typography hierarchy with examples
- Layout patterns (LayoutGrid vs CSS Grid)
- Responsive sizing strategy
- Anti-patterns avoided

**Target Audience:** Developers looking for concrete examples

---

#### 4. **RESPONSIVE-MATRIX.md** — EmphasisMatrix Details

**Purpose:** Explains responsive behavior of matrix component

**Contents:**
- Problem statement (horizontal overflow on mobile)
- Solution (adaptive column visibility)
- Breakpoint strategy:
  - Mobile (< 576px): 2 sizes (sm + xl)
  - Phablet (576-768px): 3 sizes (sm + md + xl)
  - Tablet+ (≥ 768px): All 4 sizes
- Implementation details
- Benefits and tradeoffs
- Alternative approaches considered

**Target Audience:** Developers debugging matrix issues or curious about responsive behavior

---

#### 5. **INDEX.md** — This File

**Purpose:** Directory map and quick navigation

**Contents:**
- File structure overview
- Quick reference table
- Guide to which file to read for what purpose

**Target Audience:** First-time visitors to `/templates/`

---

## When to Read Which File

### "I want to use the template in my component docs"
→ **Read:** `README.md`

### "I need to see a real example"
→ **Read:** `FLOWBUTTON-REFERENCE.md`  
→ **Or view:** `/src/app/pages/registry/controls/demos.tsx`

### "Why are some sizes missing in the matrix on mobile?"
→ **Read:** `RESPONSIVE-MATRIX.md`

### "What's the high-level impact of this template?"
→ **Read:** `IMPLEMENTATION-SUMMARY.md`

### "I want to import a helper function"
→ **Use:** `import { useDemoSize } from "../../../templates/component-doc-template"`  
→ **Or use:** `import { useDemoSize } from "../../../templates"` (barrel export)

---

## Standard Documentation Pattern

Every component documentation should follow this structure:

### Demo Functions

1. **`ComponentOverview()`** — Basic functionality
   - Sizes section (always show all 4 sizes)
   - States section (responsive with `useDemoSize()`)

2. **`ComponentVariants()`** — Advanced patterns
   - Emphasis Variants section (responsive with `useDemoSize()`)
   - Emphasis × Size Matrix (responsive, auto-adapts columns)
   - Optional: With Icons, Full Width, Responsive Grid Layout

### Typography Roles

| Role | Use Case |
|------|----------|
| `<Text variant="overline">` | Subsection separators |
| `<Text variant="label-s" color="tertiary">` | Individual element labels |
| `<Text variant="label-m" color="secondary">` | Matrix row labels |

### Layout Rules

- **LayoutGrid** → Page-level layout (demo sections, responsive compositions)
- **CSS Grid** → Tabular data (matrices, fixed-column layouts)
- **`display: contents`** → Row wrappers in CSS grids (not `<Fragment>`)

---

## Importing from Template

### Barrel Export (Recommended)

```tsx
import {
  useDemoSize,
  DemoCell,
  EmphasisMatrix,
  statesGridStyle,
} from "../../../templates";
```

### Direct Import (Specific)

```tsx
import {
  useDemoSize,
  DemoCell,
  EmphasisMatrix,
  statesGridStyle,
} from "../../../templates/component-doc-template";
```

Both work identically — use whichever feels cleaner.

---

## Migration Workflow

To align existing component docs with the template:

1. ✅ Read `README.md` → Understand pattern
2. ✅ Read `FLOWBUTTON-REFERENCE.md` → See concrete examples
3. ✅ Import helpers from `component-doc-template.tsx`
4. ✅ Replace local implementations (useDemoSize, DemoCell, etc.)
5. ✅ Update sections to match canonical structure
6. ✅ Verify typography roles (overline, label-s, label-m)
7. ✅ Test responsive behavior at all breakpoints

**Use the checklist in `README.md`** for step-by-step guidance.

---

## Contributing

### Adding New Helpers

1. Implement in `component-doc-template.tsx`
2. Export from `index.ts`
3. Document in `README.md`
4. Add example to `FLOWBUTTON-REFERENCE.md` (if applicable)

### Adding New Section Templates

1. Implement in `component-doc-template.tsx`
2. Follow existing pattern (use `DemoSection`, `DemoGroup`, `LayoutGrid`)
3. Export from `index.ts`
4. Document usage in `README.md`
5. Add to standard sections list in `FLOWBUTTON-REFERENCE.md`

### Updating Responsive Behavior

1. Modify logic in `component-doc-template.tsx`
2. Update `RESPONSIVE-MATRIX.md` with new breakpoint strategy
3. Update `README.md` if API changes
4. Test at all breakpoints (mobile, phablet, tablet, desktop, wide)

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2026-03-13 | 1.0.0 | Initial template creation from FlowButton patterns |
| 2026-03-13 | 1.1.0 | Added responsive behavior to EmphasisMatrix (mobile overflow fix) |

---

## Related Files

- **Pattern Source:** `/src/app/pages/registry/controls/demos.tsx` (FlowButton demos)
- **Registry Patterns:** `/src/app/pages/registry/documentation-patterns.md`
- **Component Helpers:** `/src/app/components/demo-helpers.tsx`
- **Doc Primitives:** `/src/app/components/doc-primitives.tsx`
- **Layout System:** `/src/app/components/layout-grid.tsx`

---

## Summary

The **L5 Component Documentation Template** provides a complete, production-ready system for documenting FLOW components consistently. FlowButton serves as the canonical reference, and all future components should follow this pattern.

**Start here:** `README.md` → Learn the pattern  
**See examples:** `FLOWBUTTON-REFERENCE.md` → Understand implementation  
**Deep dive:** `RESPONSIVE-MATRIX.md` → Understand responsive behavior  

---

**End of Index**
