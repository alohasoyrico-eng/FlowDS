# FLOW Design System — L5 Templates

**Layer 5: Templates** — Reusable page-level patterns and component documentation templates.

---

## Overview

Templates are the highest abstraction layer in FLOW's 5-layer architecture. They combine components (L4), patterns (L3), primitives (L2), and tokens (L1) into reusable page structures.

```
┌─────────────────────────────────────────────────────────────┐
│ L5: Templates                                               │
│ • component-doc-template.tsx                                │
│ • Reusable page patterns                                    │
└─────────────────────────────────────────────────────────────┘
                            ↓ uses
┌─────────────────────────────────────────────────────────────┐
│ L4: Components                                              │
│ • DemoSection, DemoGroup, LayoutGrid                        │
└───────────────────────────────────────────────────────────��─┘
                            ↓ uses
┌─────────────────────────────────────────────────────────────┐
│ L3: Patterns                                                │
│ • Typography roles (overline, label-s, label-m)             │
│ • Grid patterns (CSS Grid, LayoutGrid)                      │
└─────────────────────────────────────────────────────────────┘
                            ↓ uses
┌─────────────────────────────────────────────────────────────┐
│ L2: Primitives                                              │
│ • Stack, Text, useFlowTheme                                 │
└─────────────────────────────────────────────────────────────┘
                            ↓ uses
┌─────────────────────────────────────────────────────────────┐
│ L1: Tokens                                                  │
│ • --sys-frame-gap-component                                 │
│ • --sys-color-text-tertiary                                 │
└─────────────────────────────────────────────────────────────┘
```

**Current Templates:**

1. **`component-doc-template.tsx`** — Standard documentation patterns for component pages

---

## Component Documentation Template

### Purpose

Provides reusable helpers and section templates for documenting components consistently across all domains (Controls, Inputs, Selection, Display, etc.).

**Canonical Reference:** FlowButton documentation (established 2026-03-13)  
**Pattern Documentation:** `/src/app/pages/registry/documentation-patterns.md`

---

### Exports

#### Hooks

- **`useDemoSize()`** — Returns component size matching viewport density
- **`useFabDemoSize()`** — Returns FAB size (clamps xl → lg)

#### Helpers

- **`DemoCell`** — Wraps component with optional label below
- **`EmphasisMatrix`** — Renders emphasis × size matrix with CSS Grid
- **`statesGridStyle(demoSize)`** — Returns CSS Grid style for States section

#### Section Templates

- **`SizesSection`** — Renders "Sizes" section (always shows all sizes)
- **`StatesSection`** — Renders "States" section (responsive size)
- **`EmphasisVariantsSection`** — Renders "Emphasis Variants" section
- **`EmphasisSizeMatrixSection`** — Renders complete matrix
- **`FullWidthSection`** — Renders "Full Width" section with subsections

---

### Usage Example

#### Import the template helpers

```tsx
import {
  useDemoSize,
  DemoCell,
  EmphasisMatrix,
  statesGridStyle,
} from "../../../templates/component-doc-template";
```

#### Use in demo functions

```tsx
export function MyComponentOverview() {
  const demoSize = useDemoSize();

  return (
    <Stack gap={6}>
      {/* Sizes Section — always shows all sizes */}
      <DemoSection
        title="Sizes"
        description="Four size variants: sm, md (default), lg, xl."
      >
        <DemoGroup>
          <LayoutGrid fullBleed>
            {(["sm", "md", "lg", "xl"] as const).map((size) => (
              <LayoutGrid.Item key={size} span={3}>
                <DemoCell label={size}>
                  <MyComponent size={size} />
                </DemoCell>
              </LayoutGrid.Item>
            ))}
          </LayoutGrid>
        </DemoGroup>
      </DemoSection>

      {/* States Section — uses responsive size */}
      <DemoSection
        title="States"
        description={`Shown at size="${demoSize}" (matches viewport density).`}
      >
        <DemoGroup>
          <div style={statesGridStyle(demoSize)}>
            <DemoCell label="Default">
              <MyComponent size={demoSize}>Default</MyComponent>
            </DemoCell>
            <DemoCell label="Hover">
              <MyComponent size={demoSize} data-demo-state="hover">
                Hover
              </MyComponent>
            </DemoCell>
            {/* ... more states */}
          </div>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}
```

#### Use EmphasisMatrix

```tsx
export function MyComponentVariants() {
  return (
    <Stack gap={6}>
      <DemoSection
        title="All Emphasis × Size Combinations"
        description="Complete matrix of emphasis and size variants."
      >
        <DemoGroup>
          <EmphasisMatrix sizes={["sm", "md", "lg", "xl"] as const}>
            {(emphasis, size) => (
              <MyComponent emphasis={emphasis} size={size}>
                {size.toUpperCase()}
              </MyComponent>
            )}
          </EmphasisMatrix>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}
```

---

### Typography Roles

Use these semantic roles consistently:

| Role | Use Case | Example |
|------|----------|---------|
| `<Text variant="overline">` | Subsection separators | "Without fullWidth", "Action row" |
| `<Text variant="label-s" color="tertiary">` | Individual element labels | "sm", "12 columns" |
| `<Text variant="label-m" color="secondary">` | Matrix row labels | "Unselected", "primary" |

---

### Standard Sections

Every component documentation should have:

1. **Sizes** — Always shows all size variants explicitly
2. **States** — Shows all interactive states at responsive size
3. **Emphasis Variants** — Shows all 7 emphasis levels at responsive size
4. **Emphasis × Size Matrix** — Shows complete matrix (optional but recommended)

Optional sections:

- **Full Width** — If component has `fullWidth` prop
- **With Icons** — If component has icon props
- **Selected vs Unselected** — If component has `selected` state
- **Tooltips** — If component has tooltip support
- **Responsive Grid Layout** — For layout demonstrations

---

### Best Practices

✅ **DO:**
- Use `useDemoSize()` for States, Emphasis, and single-instance demos
- Always show all sizes explicitly in "Sizes" section
- Use `<Text variant="overline">` for subsection separators
- Use `display: contents` in CSS Grids (not `<Fragment>`)
- Follow the canonical FlowButton documentation structure

❌ **DON'T:**
- Use `useDemoSize()` in "Sizes" section
- Mix `label-m` and `overline` inconsistently
- Use `<Fragment>` in CSS grids (causes Figma inspector issues)
- Skip matrix headers or labels
- Create new typography roles

---

### Migration Checklist

When refactoring existing component docs to use the template:

- [ ] Replace local `useDemoSize` with template import
- [ ] Replace local `DemoCell` with template import
- [ ] Replace local `EmphasisMatrix` with template import
- [ ] Replace local `statesGridStyle` with template import
- [ ] Update "Sizes" section to use explicit size loop (not `useDemoSize`)
- [ ] Ensure "States" section uses `useDemoSize()`
- [ ] Add `<Text variant="overline">` for subsections where appropriate
- [ ] Verify `label-s tertiary` for individual labels
- [ ] Verify `label-m secondary` for matrix row labels
- [ ] Remove any custom grid implementations (use template helpers)

---

## Future Templates

Planned templates for future implementation:

1. **App Layout Template** — Standard application shell with navigation
2. **Dashboard Template** — Analytics and metrics layouts
3. **Form Template** — Multi-step form patterns
4. **Table Template** — Data table with filtering/sorting
5. **Modal Template** — Standard modal/dialog patterns

---

**End of Templates Documentation**