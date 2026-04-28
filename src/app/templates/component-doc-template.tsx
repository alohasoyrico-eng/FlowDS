/**
 * FLOW Design System — L5 Component Documentation Template
 *
 * Base template for component documentation pages.
 * Provides standardized sections, helpers, and patterns derived from FlowButton docs.
 *
 * @layer L5 — Templates
 * @reference /src/app/pages/registry/documentation-patterns.md
 * @canonical FlowButton documentation (established 2026-03-13)
 */

import React from "react";

import { Stack, Text, useFlowTheme } from "@flow/primitives";
import { DemoGroup, DemoSection } from "../components/demo-helpers";
import { LayoutGrid } from "../components/layout-grid";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RESPONSIVE DEMO SIZE HOOKS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Returns component size matching current viewport density.
 *
 * **Usage:**
 * - States section (single-size demo at viewport density)
 * - Variant levels section (single-size demo)
 * - Single-instance demos (tooltips, interactions)
 *
 * **DO NOT use for:**
 * - Sizes section (always show all sizes explicitly)
 * - Matrices (always show all combinations)
 *
 * @returns "sm" | "md" | "lg" | "xl" based on breakpoint
 */
export function useDemoSize(): "sm" | "md" | "lg" | "xl" {
  const { breakpoint } = useFlowTheme();
  return breakpoint.size as "sm" | "md" | "lg" | "xl";
}

/**
 * FlowFAB-specific hook (clamps xl → lg since FAB only has sm/md/lg)
 */
export function useFabDemoSize(): "sm" | "md" | "lg" {
  const size = useDemoSize();
  return size === "xl" ? "lg" : size;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DEMO CELL WRAPPER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Wraps a component with optional label below.
 *
 * **Usage:**
 * ```tsx
 * <DemoCell label="sm">
 *   <FlowButton size="sm">Button</FlowButton>
 * </DemoCell>
 * ```
 *
 * @param label - Optional Text role="label-s" tertiary below component
 * @param align - "center" (default) or "start" for left-alignment
 */
export function DemoCell({
  label,
  children,
  align = "center",
}: {
  label?: string;
  children: React.ReactNode;
  align?: "center" | "start";
}) {
  return (
    <div className={`flow-demo-cell${align === "start" ? " flow-demo-cell--start" : ""}`}>
      {children}
      {label && (
        <Text variant="label-s" color="tertiary" className="flow-demo-cell__label">
          {label}
        </Text>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VARIANT × SIZE MATRIX
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Renders variant × size matrix using CSS Grid.
 *
 * **Layout:**
 * - Column 1: Row labels (variant names)
 * - Columns 2-N: Data cells (1fr each)
 * - Uses `display: contents` for rows (avoids Fragment issues)
 * - **Responsive:** Shows fewer columns on mobile to prevent horizontal scroll
 *
 * **Usage:**
 * ```tsx
 * <VariantMatrix sizes={["sm", "md", "lg", "xl"] as const}>
 *   {(variant, size) => (
 *     <FlowButton variant={variant} size={size}>
 *       {size.toUpperCase()}
 *     </FlowButton>
 *   )}
 * </VariantMatrix>
 * ```
 *
 * @param sizes - Array of size variant strings (e.g., ["sm", "md", "lg", "xl"])
 * @param children - Render function: (variant, size) => ReactNode
 */
export function VariantMatrix({
  sizes,
  variantLevels = ["primary", "secondary", "tertiary", "outlined", "ghost"],
  children,
}: {
  sizes: readonly string[];
  variantLevels?: readonly string[];
  children: (variant: string, size: string) => React.ReactNode;
}) {
  const { breakpoint } = useFlowTheme();

  const visibleSizes = React.useMemo(() => {
    const sizeArray = Array.from(sizes);

    if (sizeArray.length < 2) return sizeArray;

    if (breakpoint.isMobile) {
      return [sizeArray[0], sizeArray[sizeArray.length - 1]];
    } else if (breakpoint.isPhablet) {
      if (sizeArray.length === 4) {
        return [sizeArray[0], sizeArray[1], sizeArray[3]];
      }
      if (sizeArray.length <= 3) return sizeArray;
      return sizeArray.slice(0, 3);
    }
    return sizeArray;
  }, [sizes, breakpoint.isMobile, breakpoint.isPhablet]);

  return (
    <div
      className="flow-variant-matrix"
      style={
        { "--flow-matrix-cols": `auto repeat(${visibleSizes.length}, 1fr)` } as React.CSSProperties
      }
    >
      {/* Header row */}
      <div />
      {visibleSizes.map((size) => (
        <div key={size} className="flow-matrix-header-cell">
          <Text variant="label-s" color="tertiary">
            {size}
          </Text>
        </div>
      ))}

      {/* Data rows — uses display: contents to flatten grid */}
      {variantLevels.map((variant) => (
        <div key={variant} className="flow-matrix-row">
          <div className="flow-matrix-label-cell">
            <Text variant="label-m" color="secondary" className="flow-matrix-label-text">
              {variant}
            </Text>
          </div>
          {visibleSizes.map((size) => (
            <div key={size} className="flow-matrix-data-cell">
              {children(variant, size)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STATES GRID HELPER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Minimum widths for States grid based on component size.
 * Prevents button text overflow while allowing responsive wrapping.
 *
 * Formula: (padding × 2) + (approx text width for "Disabled" label)
 * - sm:  24px padding +  52px text =  76px → min  80px
 * - md:  32px padding +  60px text =  92px → min  95px
 * - lg:  40px padding +  72px text = 112px → min 115px
 * - xl:  48px padding +  80px text = 128px → min 135px
 *
 * Implemented via `.flow-states-grid[data-size]` CSS classes in flow.css.
 */

/**
 * Returns className + data-size attribute props for the States section grid.
 * Uses `.flow-states-grid[data-size]` CSS classes — no inline styles.
 *
 * **Usage:**
 * ```tsx
 * const demoSize = useDemoSize();
 *
 * <div {...statesGridProps(demoSize)}>
 *   <DemoCell label="Default">...</DemoCell>
 *   <DemoCell label="Hover">...</DemoCell>
 *   ...
 * </div>
 * ```
 */
export function statesGridProps(demoSize: "sm" | "md" | "lg" | "xl"): {
  className: string;
  "data-size": string;
} {
  return { className: "flow-states-grid", "data-size": demoSize };
}

/** @deprecated Use statesGridProps() instead — returns className/data-size, no inline styles. */
export function statesGridStyle(demoSize: "sm" | "md" | "lg" | "xl"): React.CSSProperties {
  return statesGridProps(demoSize) as unknown as React.CSSProperties;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION TEMPLATES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Template for "Sizes" section.
 *
 * **Pattern:**
 * - Always shows ALL size variants explicitly (never uses useDemoSize)
 * - Layout: 4 × span{3} for 4 sizes (sm, md, lg, xl)
 * - Each size in a DemoCell with label
 *
 * **Usage:**
 * ```tsx
 * <SizesSection
 *   sizes={["sm", "md", "lg", "xl"]}
 *   render={(size) => <FlowButton size={size}>Button</FlowButton>}
 * />
 * ```
 */
export function SizesSection({
  sizes,
  render,
  description = "Four size variants: sm, md (default), lg, xl. Controls height, padding, font size, and icon size.",
}: {
  sizes: readonly string[];
  render: (size: string) => React.ReactNode;
  description?: string;
}) {
  const spanPerSize = Math.floor(12 / sizes.length);

  return (
    <DemoSection title="Sizes" description={description}>
      <DemoGroup>
        <LayoutGrid fullBleed>
          {sizes.map((size) => (
            <LayoutGrid.Item key={size} span={spanPerSize as 3 | 4 | 6 | 12}>
              <DemoCell label={size}>{render(size)}</DemoCell>
            </LayoutGrid.Item>
          ))}
        </LayoutGrid>
      </DemoGroup>
    </DemoSection>
  );
}

/**
 * Template for "States" section.
 *
 * **Pattern:**
 * - Shows component at responsive size using useDemoSize()
 * - Displays all interactive states: default, hover, focus, pressed, disabled, loading
 * - Uses statesGridProps for responsive layout
 *
 * **Usage:**
 * ```tsx
 * <StatesSection
 *   states={[
 *     { label: "Default", render: (size) => <Component size={size}>Default</Component> },
 *     { label: "Hover", render: (size) => <Component size={size} data-demo-state="hover">Hover</Component> },
 *     // ... etc
 *   ]}
 * />
 * ```
 */
export function StatesSection({
  states,
  description,
}: {
  states: Array<{
    label: string;
    render: (size: "sm" | "md" | "lg" | "xl") => React.ReactNode;
  }>;
  description?: string;
}) {
  const demoSize = useDemoSize();

  return (
    <DemoSection
      title="States"
      description={
        description ||
        `Default, hover, focus-visible, pressed, disabled, and loading. Shown at size="${demoSize}" (matches current viewport density).`
      }
    >
      <DemoGroup>
        <div {...statesGridProps(demoSize)}>
          {states.map(({ label, render }) => (
            <DemoCell key={label} label={label}>
              {render(demoSize)}
            </DemoCell>
          ))}
        </div>
      </DemoGroup>
    </DemoSection>
  );
}

/**
 * Template for "Variant Levels" section.
 *
 * **Pattern:**
 * - Shows all 7 variant levels at responsive size (useDemoSize)
 * - Layout: 7 × span for variant levels
 * - Each variant in a DemoCell with label
 *
 * **Usage:**
 * ```tsx
 * <VariantLevelsSection
 *   variantLevels={["primary", "secondary", "tertiary", "outlined", "ghost"]}
 *   render={(variant, size) => (
 *     <FlowButton variant={variant} size={size}>Button</FlowButton>
 *   )}
 * />
 * ```
 */
export function VariantLevelsSection({
  variantLevels = ["primary", "secondary", "tertiary", "outlined", "ghost"],
  render,
  description,
}: {
  variantLevels?: readonly string[];
  render: (variant: string, size: "sm" | "md" | "lg" | "xl") => React.ReactNode;
  description?: string;
}) {
  const demoSize = useDemoSize();
  const spanPerVariant = Math.floor(12 / variantLevels.length);

  return (
    <DemoSection
      title="Variant Levels"
      description={
        description ||
        `Seven variant levels. Shown at size="${demoSize}" (matches current viewport density).`
      }
    >
      <DemoGroup>
        <LayoutGrid fullBleed>
          {variantLevels.map((variant) => (
            <LayoutGrid.Item key={variant} span={spanPerVariant as 2 | 3 | 4 | 6}>
              <DemoCell label={variant}>{render(variant, demoSize)}</DemoCell>
            </LayoutGrid.Item>
          ))}
        </LayoutGrid>
      </DemoGroup>
    </DemoSection>
  );
}

/**
 * Template for "All Variant × Size Combinations" matrix.
 *
 * **Pattern:**
 * - Shows complete matrix using VariantMatrix helper
 * - Always displays all combinations (no responsive sizing)
 *
 * **Usage:**
 * ```tsx
 * <VariantSizeMatrixSection
 *   sizes={["sm", "md", "lg", "xl"]}
 *   render={(variant, size) => (
 *     <FlowButton variant={variant} size={size}>
 *       {size.toUpperCase()}
 *     </FlowButton>
 *   )}
 * />
 * ```
 */
export function VariantSizeMatrixSection({
  sizes,
  variantLevels,
  render,
}: {
  sizes: readonly string[];
  variantLevels?: readonly string[];
  render: (variant: string, size: string) => React.ReactNode;
}) {
  return (
    <DemoSection
      title="All Variant × Size Combinations"
      description="Complete matrix of variant and size combinations."
    >
      <DemoGroup>
        <VariantMatrix sizes={sizes} variantLevels={variantLevels}>
          {render}
        </VariantMatrix>
      </DemoGroup>
    </DemoSection>
  );
}

/**
 * Template for "Full Width" section.
 *
 * **Pattern:**
 * - 3 subsections with <Text variant="overline"> separators
 * - Shows comparison: without fullWidth vs with fullWidth
 * - Demonstrates responsive container behavior (12, 8, 6, 4 columns)
 *
 * **Usage:**
 * ```tsx
 * <FullWidthSection
 *   variantLevels={["primary", "secondary", "tertiary", "outlined", "ghost"]}
 *   renderNormal={(variant) => <Component variant={variant}>Normal</Component>}
 *   renderFullWidth={(variant) => <Component fullWidth variant={variant}>Full</Component>}
 *   renderResponsive={(variant, span) => <Component fullWidth variant={variant}>Span {span}</Component>}
 * />
 * ```
 */
export function FullWidthSection({
  variantLevels = ["primary", "secondary", "tertiary", "outlined", "ghost"],
  renderNormal,
  renderFullWidth,
  renderResponsive,
}: {
  variantLevels?: readonly string[];
  renderNormal: (variant: string) => React.ReactNode;
  renderFullWidth: (variant: string) => React.ReactNode;
  renderResponsive: (variant: string, span: number) => React.ReactNode;
}) {
  return (
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
                {renderNormal(variantLevels[0] as string)}
                {renderNormal(variantLevels[3] as string)}
              </Stack>
            </LayoutGrid.Item>
          </LayoutGrid>

          <Text variant="overline">With fullWidth — all variants</Text>
          <LayoutGrid fullBleed>
            <LayoutGrid.Item span={12}>
              <Stack gap={2}>
                {variantLevels.map((variant) => (
                  <div key={variant}>{renderFullWidth(variant)}</div>
                ))}
              </Stack>
            </LayoutGrid.Item>
          </LayoutGrid>

          <Text variant="overline">Responsive containers — adapts to parent width</Text>
          <LayoutGrid fullBleed>
            <LayoutGrid.Item span={12}>
              <Text variant="label-s" color="tertiary" className="flow-fullwidth-col-label">
                12 columns (full width)
              </Text>
              {renderResponsive(variantLevels[0] as string, 12)}
            </LayoutGrid.Item>
            <LayoutGrid.Item span={8}>
              <Text variant="label-s" color="tertiary" className="flow-fullwidth-col-label">
                8 columns
              </Text>
              {renderResponsive(variantLevels[1] as string, 8)}
            </LayoutGrid.Item>
            <LayoutGrid.Item span={6}>
              <Text variant="label-s" color="tertiary" className="flow-fullwidth-col-label">
                6 columns
              </Text>
              {renderResponsive(variantLevels[3] as string, 6)}
            </LayoutGrid.Item>
            <LayoutGrid.Item span={4}>
              <Text variant="label-s" color="tertiary" className="flow-fullwidth-col-label">
                4 columns
              </Text>
              {renderResponsive(variantLevels[2] as string, 4)}
            </LayoutGrid.Item>
          </LayoutGrid>
        </Stack>
      </DemoGroup>
    </DemoSection>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TYPOGRAPHY ROLES REFERENCE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Typography semantic roles for component documentation:
 *
 * 1. <Text variant="overline">
 *    - Subsection separators within DemoSection
 *    - Creates narrative flow between subsections
 *    - Example: "Without fullWidth (natural width)", "Action row — span 4 + 4 + 4"
 *
 * 2. <Text variant="label-s" color="tertiary">
 *    - Individual element labels
 *    - Describes single items in grids
 *    - Example: "sm", "md", "12 columns", "high"
 *
 * 3. <Text variant="label-m" color="secondary">
 *    - Matrix row labels
 *    - Headers for data grid rows
 *    - Example: "Unselected", "Selected", "primary", "medium"
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPORTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export // Hooks
// (already exported above)
// Helpers
// (already exported above)
// Section Templates
// (already exported above)
 {};
