# FlowButton as Canonical Reference

**Date:** 2026-03-13  
**Status:** ✅ Established  
**Purpose:** Document how FlowButton serves as the canonical reference for all component documentation

---

## Why FlowButton?

FlowButton documentation was chosen as the **canonical reference** for FLOW component documentation because:

1. **Comprehensive Coverage** — Contains all standard sections (Sizes, States, Emphasis, Matrices, Full Width, Responsive Grid)
2. **Mature Implementation** — Underwent iterative refinement to establish best practices
3. **Representative Complexity** — Demonstrates patterns applicable to most components
4. **Well-Documented** — Clear comments explaining rationale for each pattern
5. **Production-Ready** — Successfully deployed and validated

---

## FlowButton Documentation Structure

### File: `/src/app/pages/registry/controls/demos.tsx`

```tsx
import {
  useDemoSize,
  useFabDemoSize,
  DemoCell,
  EmphasisMatrix,
  statesGridStyle,
} from "../../../templates/component-doc-template";
```

### Demo Functions

1. **`FlowButtonOverview()`** — Core functionality
   - Sizes section (4 × span{3})
   - States section (responsive grid with useDemoSize)

2. **`FlowButtonVariants()`** — Variations and patterns
   - Emphasis Variants section (7 × span)
   - Emphasis × Size Matrix (complete grid)
   - With Icons section (6 × span{4})
   - Full Width section (3 subsections with overline)
   - Responsive Grid Layout (real-world patterns)

---

## Standard Sections (in order)

### 1. Sizes

**Always shows ALL sizes explicitly** (never uses `useDemoSize`)

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
            <FlowButton size={size}>Button</FlowButton>
          </DemoCell>
        </LayoutGrid.Item>
      ))}
    </LayoutGrid>
  </DemoGroup>
</DemoSection>
```

**Layout:** `4 × span{3}` — 4 columns at desktop, wraps at tablet/mobile

---

### 2. States

**Uses responsive size** with `useDemoSize()` hook

```tsx
const demoSize = useDemoSize();

<DemoSection
  title="States"
  description={`Default, hover, focus-visible, pressed, disabled, and loading. Shown at size="${demoSize}" (matches current viewport density).`}
>
  <DemoGroup>
    <div style={statesGridStyle(demoSize)}>
      <DemoCell label="Default">
        <FlowButton size={demoSize}>Default</FlowButton>
      </DemoCell>
      <DemoCell label="Hover">
        <FlowButton size={demoSize} data-demo-state="hover">Hover</FlowButton>
      </DemoCell>
      {/* ... more states */}
    </div>
  </DemoGroup>
</DemoSection>
```

**Layout:** Responsive CSS Grid with size-aware minmax  
**Why responsive?** Shows component at density matching viewport

---

### 3. Emphasis Variants

**Uses responsive size** with `useDemoSize()` hook

```tsx
<DemoSection
  title="Emphasis Variants"
  description={`Seven emphasis levels. Shown at size="${demoSize}" (matches current viewport density).`}
>
  <DemoGroup>
    <LayoutGrid fullBleed>
      {(["high", "medium", "low", "outline", "danger", "warning", "ghost"] as const).map((emphasis) => (
        <LayoutGrid.Item key={emphasis} span={4}>
          <DemoCell label={emphasis}>
            <FlowButton emphasis={emphasis} size={demoSize}>Button</FlowButton>
          </DemoCell>
        </LayoutGrid.Item>
      ))}
    </LayoutGrid>
  </DemoGroup>
</DemoSection>
```

**Layout:** `6 × span{4}` — 3 columns at desktop, 2 at tablet, 1 at mobile

---

### 4. All Emphasis × Size Combinations

**Always shows ALL combinations** (complete matrix)

```tsx
<DemoSection
  title="All Emphasis × Size Combinations"
  description="Complete matrix of emphasis and size variants."
>
  <DemoGroup>
    <EmphasisMatrix sizes={["sm", "md", "lg", "xl"] as const}>
      {(emphasis, size) => (
        <FlowButton emphasis={emphasis} size={size as "sm" | "md" | "lg" | "xl"}>
          {size.toUpperCase()}
        </FlowButton>
      )}
    </EmphasisMatrix>
  </DemoGroup>
</DemoSection>
```

**Layout:** CSS Grid with fixed label column + 4 × 1fr data columns

---

### 5. With Icons (if applicable)

**Uses responsive size** with `useDemoSize()` hook

```tsx
<DemoSection
  title="With Icons"
  description="Leading icons provide visual context. Icon size automatically matches button size."
>
  <DemoGroup>
    <LayoutGrid fullBleed>
      <LayoutGrid.Item span={4}>
        <DemoCell label="high">
          <FlowButton emphasis="high" size={demoSize} leadingIcon="check">High</FlowButton>
        </DemoCell>
      </LayoutGrid.Item>
      {/* ... more variants */}
    </LayoutGrid>
  </DemoGroup>
</DemoSection>
```

**Layout:** `7 × span` — same as Emphasis Variants

---

### 6. Full Width (if component has `fullWidth` prop)

**3 subsections with `<Text variant="overline">`**

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
            <FlowButton emphasis="high" leadingIcon="check">Confirm</FlowButton>
            <FlowButton emphasis="outline" leadingIcon="download">Download</FlowButton>
          </Stack>
        </LayoutGrid.Item>
      </LayoutGrid>

      <Text variant="overline">With fullWidth — all emphasis variants</Text>
      <LayoutGrid fullBleed>
        <LayoutGrid.Item span={12}>
          <Stack gap={2}>
            {/* All 7 emphasis variants with fullWidth */}
          </Stack>
        </LayoutGrid.Item>
      </LayoutGrid>

      <Text variant="overline">Responsive containers — adapts to parent width</Text>
      <LayoutGrid fullBleed>
        <LayoutGrid.Item span={12}>
          <Text variant="label-s" color="tertiary" style={{ marginBottom: "0.5rem" }}>
            12 columns (full width)
          </Text>
          <FlowButton fullWidth emphasis="high" leadingIcon="plus">Create New Project</FlowButton>
        </LayoutGrid.Item>
        {/* 8, 6, 4 column demos */}
      </LayoutGrid>
    </Stack>
  </DemoGroup>
</DemoSection>
```

**Layout:** `span={12}` for subsections, varying spans (12, 8, 6, 4) for responsive demo

---

### 7. Responsive Grid Layout (for layout demonstrations)

**Real-world compositions with `<Text variant="overline">`**

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
          <FlowButton fullWidth emphasis="high" leadingIcon="plus">Create New</FlowButton>
        </LayoutGrid.Item>
        {/* ... more buttons */}
      </LayoutGrid>

      <Text variant="overline">Primary + secondary — span 8 + 4</Text>
      {/* ... */}

      <Text variant="overline">Danger zone — span 6 + 6</Text>
      {/* ... */}
    </Stack>
  </DemoGroup>
</DemoSection>
```

---

## Typography Hierarchy

FlowButton establishes the semantic typography pattern:

| Role | Use Case | Example from FlowButton |
|------|----------|-------------------------|
| `<Text variant="overline">` | Subsection separators | "Without fullWidth (natural width)", "Action row — span 4 + 4 + 4" |
| `<Text variant="label-s" color="tertiary">` | Individual element labels | "sm", "md", "12 columns (full width)" |
| `<Text variant="label-m" color="secondary">` | Matrix row labels | "high", "medium", "low" (in EmphasisMatrix) |

**Rule:** Use `overline` to create **narrative flow** between subsections, not as a replacement for section titles.

---

## Layout Patterns

### LayoutGrid (Page Layout)

**Used for:**
- Demo sections
- Subsections with multiple components
- Responsive layouts
- UI composition

**Pattern:**
```tsx
<LayoutGrid fullBleed>
  <LayoutGrid.Item span={3}>
    <DemoCell label="sm">
      <FlowButton size="sm">Button</FlowButton>
    </DemoCell>
  </LayoutGrid.Item>
  {/* ... */}
</LayoutGrid>
```

---

### CSS Grid (Tabular Data)

**Used for:**
- Matrices (emphasis × size)
- States grid
- Tabular data with fixed columns

**Pattern:**
```tsx
<div style={{
  display: "grid",
  gridTemplateColumns: "auto repeat(4, 1fr)",
  gap: "0.5rem 0.75rem",
}}>
  {/* Header row */}
  <div />
  {sizes.map((size) => (
    <div key={size}>
      <Text variant="label-s" color="tertiary">{size}</Text>
    </div>
  ))}
  
  {/* Data rows with display: contents */}
  {emphasisLevels.map((emphasis) => (
    <div key={emphasis} style={{ display: "contents" }}>
      <div>
        <Text variant="label-m" color="secondary">{emphasis}</Text>
      </div>
      {sizes.map((size) => (
        <div key={size}>
          {/* Component */}
        </div>
      ))}
    </div>
  ))}
</div>
```

**Critical:** Always use `display: contents` instead of `<Fragment>` to avoid Figma inspector issues.

---

## Responsive Sizing Strategy

### When to Use `useDemoSize()`

✅ **Use for:**
- States section (single representative size)
- Emphasis Variants section (single representative size)
- With Icons section (single representative size)
- Tooltips section (single representative size)
- Any section showing ONE instance of component

### When NOT to Use `useDemoSize()`

❌ **Don't use for:**
- Sizes section (always show all sizes explicitly)
- Matrices (always show all combinations)
- Any section where the purpose is to compare different sizes

---

## Anti-Patterns Avoided

FlowButton documentation explicitly avoids these mistakes:

❌ **Using `useDemoSize()` in Sizes section**  
→ Sizes section must always show all sizes for comparison

❌ **Using `<Fragment>` in CSS grids**  
→ Causes Figma inspector to inject `data-fg-*` attributes (unsupported)

❌ **Mixing `label-m` and `overline` inconsistently**  
→ Each has a specific semantic purpose

❌ **Using `span={6}` for fullWidth demos**  
→ fullWidth should demonstrate 100% width, so use `span={12}`

❌ **Skipping matrix headers**  
→ Always include size/variant labels for clarity

---

## What Makes FlowButton Canonical

1. **Complete Pattern Coverage** — All standard sections demonstrated
2. **Consistent Typography** — Semantic roles used correctly throughout
3. **Responsive Behavior** — `useDemoSize()` used appropriately
4. **Layout Precision** — LayoutGrid and CSS Grid used correctly
5. **Anti-Pattern Awareness** — Explicitly avoids common mistakes
6. **Production Validation** — Deployed and tested in real documentation

---

## How to Reference FlowButton

When documenting a new component:

1. **Open** `/src/app/pages/registry/controls/demos.tsx`
2. **Identify** which sections apply to your component
3. **Copy** the section structure (not just the code)
4. **Adapt** the content to your component's specific props/behavior
5. **Verify** typography roles match FlowButton's usage
6. **Check** layout patterns (LayoutGrid vs CSS Grid)

---

## Migration Path

To align existing component docs with FlowButton standard:

1. Compare existing sections to FlowButton structure
2. Identify missing sections (Sizes, States, Emphasis, etc.)
3. Import helpers from `component-doc-template.tsx`
4. Replace local implementations with template helpers
5. Update typography roles to match FlowButton
6. Verify layout patterns (LayoutGrid spans, CSS Grid structure)
7. Add `<Text variant="overline">` for subsections where appropriate

**Use the checklist in `/src/app/templates/README.md`**

---

## Conclusion

FlowButton documentation is the **single source of truth** for FLOW component documentation patterns. All future components should follow this structure, and all existing components should be migrated to match it.

**When in doubt, reference FlowButton.**

---

**End of FlowButton Reference Documentation**
