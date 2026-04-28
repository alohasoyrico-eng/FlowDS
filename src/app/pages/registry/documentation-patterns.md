# FLOW Design System — Documentation Patterns

**Author:** FLOW Architecture Team  
**Last Updated:** 2026-03-13  
**Purpose:** Codified patterns for component documentation structure, demo sections, and reusable helpers.

---

## Overview

Component documentation in FLOW follows a **5-layer template architecture** (L5 — Templates) that ensures consistency across all domains (Controls, Inputs, Selection, Display, etc.). Each component's documentation is composed of:

1. **ComponentEntry** in `/src/app/pages/registry/{domain}/registry.tsx` — metadata, spec, props, guidelines
2. **Demo Functions** in `/src/app/pages/registry/{domain}/demos.tsx` — interactive visual examples
3. **Reusable Helpers** — `<DemoSection>`, `<DemoGroup>`, `<DemoCell>`, `<EmphasisMatrix>`, `useDemoSize()`

This document codifies the **canonical patterns** derived from FlowButton documentation (established 2026-03-13 after standardization).

---

## Documentation Architecture

### File Structure

```
/src/app/pages/registry/{domain}/
├── registry.tsx      # ComponentEntry metadata (spec, props, guidelines, developer docs)
├── demos.tsx         # Demo functions (Overview, Variants, Accessibility, etc.)
└── types.tsx         # Shared type constants (SIZES, EMPHASIS, etc.)
```

### ComponentEntry Structure

```typescript
export const {DOMAIN}_REGISTRY: Record<string, ComponentEntry> = {
  "{domain}/{component-slug}": {
    domain: "Domain Name",
    spec: {
      name: "ComponentName",
      purpose: "Single-sentence purpose + anatomy summary",
      platform: "shared" | "web" | "mobile",
      anatomy: [
        { part: "Part name", description: "Description + role", tokens: ["token.name"] }
      ],
      variants: ["Variant1", "Variant2"],
      states: ["default", "hover", "focus-visible", "pressed", "disabled"],
      accessibility: {
        handled: ["What the component handles automatically"],
        required: ["What developers MUST provide"],
        keyboard: ["Keyboard interactions"]
      }
    },
    demos: {
      overview: () => <ComponentOverview />,
      variants: () => <ComponentVariants />,
      // Optional: accessibility, patterns, responsive, etc.
    },
    developer: {
      reactImport: `import { Component } from "../components/{domain}";`,
      reactUsage: `// Code examples...`,
      flutterImport: `import 'package:flow_ds/{domain}.dart';`,
      flutterUsage: `// Flutter examples...`,
      notes: "Architecture notes, best practices, warnings",
      props: [
        { name: "propName", type: "TypeScript type", default: "default value", description: "Prop description", required: true/false }
      ],
      guidelines: [
        { intent: "do", text: "Best practice guidance" },
        { intent: "dont", text: "Anti-patterns to avoid" },
        { intent: "info", text: "Technical detail or context" }
      ]
    }
  }
};
```

---

## Demo Patterns

### Demo Function Structure

Each component has **2 demo functions** (minimum):

1. **`ComponentOverview()`** — States, Sizes, basic usage
2. **`ComponentVariants()`** — Emphasis variants, matrices, advanced patterns

Optional: `ComponentAccessibility()`, `ComponentPatterns()`, `ComponentResponsive()`

### Standard Demo Sections

#### 1. **Sizes Section**

**Pattern:** Show all size variants explicitly (sm, md, lg, xl) — **never use `useDemoSize()`**

```tsx
<DemoSection
  title="Sizes"
  description="Four size variants: sm, md (default), lg, xl. Controls height, padding, font size, and icon size."
>
  <DemoGroup>
    <LayoutGrid fullBleed>
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <LayoutGrid.Item key={size} span={3}>
          <DemoCell label={size}>
            <Component size={size} />
          </DemoCell>
        </LayoutGrid.Item>
      ))}
    </LayoutGrid>
  </DemoGroup>
</DemoSection>
```

**Layout:** `4 × span{3}` (4 columns at desktop, responsive wrapping)

---

#### 2. **States Section**

**Pattern:** Show all interactive states at **responsive size** using `useDemoSize()`

```tsx
const demoSize = useDemoSize();

<DemoSection
  title="States"
  description={`Default, hover, focus-visible, pressed, disabled, and loading. Shown at size="${demoSize}" (matches current viewport density).`}
>
  <DemoGroup>
    <div style={statesGridStyle(demoSize)}>
      <DemoCell label="Default">
        <Component size={demoSize}>Default</Component>
      </DemoCell>
      <DemoCell label="Hover">
        <Component size={demoSize} data-demo-state="hover">Hover</Component>
      </DemoCell>
      <DemoCell label="Focus">
        <Component size={demoSize} data-demo-state="focus">Focus</Component>
      </DemoCell>
      <DemoCell label="Pressed">
        <Component size={demoSize} data-demo-state="pressed">Pressed</Component>
      </DemoCell>
      <DemoCell label="Disabled">
        <Component size={demoSize} disabled>Disabled</Component>
      </DemoCell>
      <DemoCell label="Loading">
        <Component size={demoSize} loading={loading}>Loading</Component>
      </DemoCell>
    </div>
  </DemoGroup>
</DemoSection>
```

**Layout:** `display: grid` with `auto-fill`, responsive minmax based on `demoSize`

**Why responsive?** States should demonstrate the component at a **density matching the viewport**, so mobile users see sm/md, desktop users see lg/xl.

---

#### 3. **Variants Section**

**Pattern:** Show all 7 variant levels at **responsive size**

```tsx
const demoSize = useDemoSize();

<DemoSection
  title="Variants"
  description={`Seven variant levels. Shown at size="${demoSize}" (matches current viewport density).`}
>
  <DemoGroup>
    <LayoutGrid fullBleed>
      {(["high", "medium", "low", "outline", "danger", "warning", "ghost"] as const).map((variant) => (
        <LayoutGrid.Item key={variant} span={4}>
          <DemoCell label={variant}>
            <Component variant={variant} size={demoSize} />
          </DemoCell>
        </LayoutGrid.Item>
      ))}
    </LayoutGrid>
  </DemoGroup>
</DemoSection>
```

**Layout:** `6 × span{4}` (3 columns at desktop, 2 at tablet, 1 at mobile)

---

#### 4. **Emphasis × Size Matrix**

**Pattern:** Show **all** combinations using `<EmphasisMatrix>` helper

```tsx
<DemoSection
  title="All Emphasis × Size Combinations"
  description="Complete matrix of variant and size variants."
>
  <DemoGroup>
    <EmphasisMatrix sizes={["sm", "md", "lg", "xl"] as const}>
      {(variant, size) => (
        <Component variant={variant} size={size as "sm" | "md" | "lg" | "xl"}>
          {size.toUpperCase()}
        </Component>
      )}
    </EmphasisMatrix>
  </DemoGroup>
</DemoSection>
```

**Layout:** CSS Grid with fixed label column + 1fr data columns

**Responsive Behavior:**
- **Mobile (< 576px):** Shows 2 sizes (first + last, e.g., sm + xl) to prevent horizontal overflow
- **Phablet (< 768px):** Shows 3 sizes (sm + md + xl)
- **Tablet+ (≥ 768px):** Shows all 4 sizes (sm + md + lg + xl)

**Why responsive?** Prevents horizontal scroll on narrow viewports while maintaining matrix utility.

---

#### 5. **Full Width Section** (for components with `fullWidth` prop)

**Pattern:** Show 3 subsections with `<Text variant="overline">`

```tsx
<DemoSection
  title="Full Width"
  description="fullWidth makes button stretch to 100% of container width — useful for mobile UIs and call-to-action buttons."
>
  <DemoGroup>
    <Stack gap={4}>
      <Text variant="overline">Without fullWidth (natural width)</Text>
      <LayoutGrid fullBleed>
        <LayoutGrid.Item span={12}>
          <Stack gap={2}>
            <Component>Button 1</Component>
            <Component>Button 2</Component>
          </Stack>
        </LayoutGrid.Item>
      </LayoutGrid>

      <Text variant="overline">With fullWidth — all variant variants</Text>
      <LayoutGrid fullBleed>
        <LayoutGrid.Item span={12}>
          <Stack gap={2}>
            {EMPHASIS.map((variant) => (
              <Component key={variant} fullWidth variant={variant}>
                {variant}
              </Component>
            ))}
          </Stack>
        </LayoutGrid.Item>
      </LayoutGrid>

      <Text variant="overline">Responsive containers — adapts to parent width</Text>
      <LayoutGrid fullBleed>
        <LayoutGrid.Item span={12}>
          <Text variant="label-s" color="tertiary" style={{ marginBottom: "0.5rem" }}>12 columns (full width)</Text>
          <Component fullWidth variant="high">Full Width</Component>
        </LayoutGrid.Item>
        <LayoutGrid.Item span={8}>
          <Text variant="label-s" color="tertiary" style={{ marginBottom: "0.5rem" }}>8 columns</Text>
          <Component fullWidth variant="medium">8 columns</Component>
        </LayoutGrid.Item>
        <LayoutGrid.Item span={6}>
          <Text variant="label-s" color="tertiary" style={{ marginBottom: "0.5rem" }}>6 columns</Text>
          <Component fullWidth variant="outline">6 columns</Component>
        </LayoutGrid.Item>
        <LayoutGrid.Item span={4}>
          <Text variant="label-s" color="tertiary" style={{ marginBottom: "0.5rem" }}>4 columns</Text>
          <Component fullWidth variant="low">4 columns</Component>
        </LayoutGrid.Item>
      </LayoutGrid>
    </Stack>
  </DemoGroup>
</DemoSection>
```

**Layout:** `span={12}` for subsections, then varying spans (12, 8, 6, 4) for responsive demo

---

#### 6. **Responsive Grid Layout** (for layout demonstrations)

**Pattern:** Show real-world grid compositions with `<Text variant="overline">` subsections

```tsx
<DemoSection
  title="Responsive Grid Layout"
  description="FlowButton in LayoutGrid — 12-column system (≥ 992px), 6-column tablet (≥ 576px), 1-column mobile. Toggle the Grid overlay (top-right of the page) to see column alignment."
>
  <DemoGroup>
    <Stack gap={4}>
      <Text variant="overline">Action row — span 4 + 4 + 4</Text>
      <LayoutGrid fullBleed>
        <LayoutGrid.Item span={4}>
          <Component fullWidth variant="high">Create New</Component>
        </LayoutGrid.Item>
        <LayoutGrid.Item span={4}>
          <Component fullWidth variant="outline">Download</Component>
        </LayoutGrid.Item>
        <LayoutGrid.Item span={4}>
          <Component fullWidth variant="ghost">Cancel</Component>
        </LayoutGrid.Item>
      </LayoutGrid>

      <Text variant="overline">Primary + secondary — span 8 + 4</Text>
      <LayoutGrid fullBleed>
        <LayoutGrid.Item span={8}>
          <Component fullWidth variant="high">Confirm & Submit</Component>
        </LayoutGrid.Item>
        <LayoutGrid.Item span={4}>
          <Component fullWidth variant="outline">Cancel</Component>
        </LayoutGrid.Item>
      </LayoutGrid>

      <Text variant="overline">Danger zone — span 6 + 6</Text>
      <LayoutGrid fullBleed>
        <LayoutGrid.Item span={6}>
          <Component fullWidth variant="danger">Delete Account</Component>
        </LayoutGrid.Item>
        <LayoutGrid.Item span={6}>
          <Component fullWidth variant="medium">Keep Account</Component>
        </LayoutGrid.Item>
      </LayoutGrid>
    </Stack>
  </DemoGroup>
</DemoSection>
```

---

## Typography Roles

### Semantic Typography Hierarchy

| Role | Use Case | Example |
|------|----------|---------|
| `<Text variant="overline">` | Subsection separators within `<DemoSection>` | "Without fullWidth", "Action row — span 4 + 4 + 4" |
| `<Text variant="label-s" color="tertiary">` | Individual element labels | "sm", "md", "12 columns", "high" |
| `<Text variant="label-m" color="secondary">` | Matrix row labels | "Unselected", "Selected", "primary", "medium" |

**Rule:** `overline` creates **narrative flow** between subsections. `label-s tertiary` describes **individual items**. `label-m secondary` labels **rows in data grids**.

---

## Reusable Helpers

### 1. `useDemoSize()` and `useFabDemoSize()`

```tsx
function useDemoSize(): "sm" | "md" | "lg" | "xl" {
  const { breakpoint } = useFlowTheme();
  return breakpoint.size as "sm" | "md" | "lg" | "xl";
}

function useFabDemoSize(): "sm" | "md" | "lg" {
  const size = useDemoSize();
  return size === "xl" ? "lg" : size;
}
```

**When to use:**
- **States section** — Show component at density matching viewport
- **Emphasis variants section** — Show component at responsive size
- **Tooltips/single-instance demos** — Show one representative size

**When NOT to use:**
- **Sizes section** — Always show all sizes explicitly
- **Matrices** — Always show all combinations

---

### 2. `<DemoCell>`

```tsx
function DemoCell({
  label,
  children,
  align = "center",
}: {
  label?: string;
  children: React.ReactNode;
  align?: "center" | "start";
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        gap: "var(--sys-frame-gap-component)",
        padding: "var(--sys-frame-padding-inset-s, 0.5rem) 0",
      }}
    >
      {children}
      {label && (
        <Text variant="label-s" color="tertiary" style={{ textAlign: align === "center" ? "center" : "left" }}>
          {label}
        </Text>
      )}
    </div>
  );
}
```

**Purpose:** Wraps a component with optional label below (centered or left-aligned)

---

### 3. `<EmphasisMatrix>`

```tsx
function EmphasisMatrix({
  sizes,
  children,
}: {
  sizes: readonly string[];
  children: (variant: string, size: string) => React.ReactNode;
}) {
  const matrixStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `auto repeat(${sizes.length}, 1fr)`,
    alignItems: "center",
    gap: "0.5rem 0.75rem",
  };

  return (
    <div style={matrixStyle}>
      {/* Header row */}
      <div />
      {sizes.map((size) => (
        <div key={size} style={{ display: "flex", justifyContent: "center", paddingBottom: "0.25rem" }}>
          <Text variant="label-s" color="tertiary">{size}</Text>
        </div>
      ))}
      {/* Data rows */}
      {EMPHASIS.map((variant) => (
        <div key={variant} style={{ display: "contents" }}>
          <div style={MATRIX_LABEL_STYLE}>
            <Text variant="label-m" color="secondary" style={{ textTransform: "capitalize" }}>
              {variant}
            </Text>
          </div>
          {sizes.map((size) => (
            <div key={size} style={MATRIX_CELL_STYLE}>
              {children(variant, size)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

**Purpose:** Renders variant × size matrix with CSS Grid (uses `display: contents`)

---

### 4. `statesGridStyle(demoSize)`

```tsx
const STATES_MIN: Record<"sm" | "md" | "lg" | "xl", string> = {
  sm:  "80px",
  md:  "95px",
  lg: "115px",
  xl: "135px",
};

function statesGridStyle(demoSize: "sm" | "md" | "lg" | "xl"): React.CSSProperties {
  return {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fill, minmax(min(${STATES_MIN[demoSize]}, 100%), 1fr))`,
    gap: "var(--sys-frame-gap-component, 0.5rem)",
  };
}
```

**Purpose:** Creates responsive grid for States section with size-aware minimum widths

---

## When to Use Each Pattern

### Sections Every Component Should Have

| Section | Required | Notes |
|---------|----------|-------|
| **Sizes** | ✅ Yes | Always show all sizes explicitly |
| **States** | ✅ Yes | Use `useDemoSize()`, show all states |
| **Emphasis Variants** | ✅ Yes (if applicable) | Use `useDemoSize()`, show all 7 |
| **Emphasis × Size Matrix** | ⚠️ Optional | For completeness, always show all |

### Sections Some Components Have

| Section | When to Include |
|---------|-----------------|
| **Full Width** | If component has `fullWidth` prop |
| **Responsive Grid Layout** | If component benefits from layout context |
| **Selected vs Unselected** | If component has `selected` state (toggles) |
| **With Icons** | If component has icon props |
| **Tooltips** | If component has tooltip support |
| **Accessibility** | For complex a11y patterns (separate demo function) |

---

## Layout Grid Rules

### For Page Layout

**Use `<LayoutGrid>` + `<LayoutGrid.Item span={N}>`:**
- Demo sections
- Subsections with multiple components
- Responsive layouts
- Any UI composition

### For Data Grids

**Use native CSS Grid:**
- Matrices (variant × size)
- Tabular data
- Fixed-column layouts with `auto repeat(N, 1fr)`
- **Always use `display: contents`** instead of `<Fragment>` to avoid Figma inspector issues

---

## Anti-Patterns (Don't Do This)

❌ **Don't use `useDemoSize()` in Sizes section** — always show all sizes explicitly  
❌ **Don't use `<Fragment>` in CSS grids** — use `<div style={{ display: "contents" }}>` instead  
❌ **Don't mix `label-m` and `overline` inconsistently** — follow the semantic hierarchy  
❌ **Don't skip matrix headers** — always include size/variant labels  
❌ **Don't use `span={6}` for fullWidth demos** — use `span={12}` to show true fullWidth behavior  
❌ **Don't create new typography roles** — stick to `overline`, `label-s tertiary`, `label-m secondary`

---

## Summary

**FlowButton documentation (as of 2026-03-13) is the canonical reference** for all component docs. It establishes:

1. **6 standard demo sections** (Sizes, States, Emphasis, Matrix, Full Width, Responsive Grid)
2. **3 typography roles** (overline, label-s tertiary, label-m secondary)
3. **4 reusable helpers** (useDemoSize, DemoCell, EmphasisMatrix, statesGridStyle)
4. **Layout rules** (LayoutGrid for pages, CSS Grid for data, `display: contents`)

**Next step:** Extract this into a **ComponentDocTemplate (L5)** that other components can inherit from.

---

**End of Documentation Patterns**