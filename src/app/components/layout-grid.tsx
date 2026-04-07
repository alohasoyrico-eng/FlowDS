/**
 * FLOW LayoutGrid — Responsive Column System (L4 Pattern)
 * ────────────────────────────────────────────────────────
 * Orchestrates the Grid primitive (L2) into a responsive
 * page-level layout grid matching the Edenred spec.
 *
 * Token chain (ref→sys→comp):
 *   ref.frame.grid.{lg,md,sm}  →  sys.frame.grid.*  →  comp.layoutGrid.*
 *   Density overrides sys.frame.grid gutter/margin via [data-density].
 *   Depth: z-index from comp.layoutGrid.zIndex → sys.depth.layer.content.
 *
 * Tiers (default density):
 *   Desktop (>= 992px): 12 columns, 32px gutter, 48px margin, max 1440px
 *   Tablet  (>= 576px):  6 columns, 24px gutter, 24px margin
 *   Mobile  (<  576px):   1 column,   0px gutter, 16px margin
 *
 * Density modes — ×1.2 ratio (same as control heights), snapped to space scale:
 *   compact:     lg 24px gutter / 40px margin, md 20/20, sm 0/12
 *   default:     lg 32px gutter / 48px margin, md 24/24, sm 0/16
 *   comfortable: lg 40px gutter / 64px margin, md 28/28, sm 0/20
 *
 * CSS-driven via .flow-layout-grid (defined in flow.css).
 * All values consumed from --comp-layout-grid-* custom properties.
 *
 * Usage:
 *   <LayoutGrid>
 *     <LayoutGrid.Item span={6}>Left half</LayoutGrid.Item>
 *     <LayoutGrid.Item span={6}>Right half</LayoutGrid.Item>
 *   </LayoutGrid>
 *
 *   <LayoutGrid density="compact">
 *     <LayoutGrid.Item span={4}>Tighter 1/3</LayoutGrid.Item>
 *     <LayoutGrid.Item span={4}>Tighter 1/3</LayoutGrid.Item>
 *     <LayoutGrid.Item span={4}>Tighter 1/3</LayoutGrid.Item>
 *   </LayoutGrid>
 */

import { type CSSProperties, type ReactNode } from "react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LayoutGrid (container)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
type Density = "compact" | "default" | "comfortable";

interface LayoutGridProps {
  /** Extra CSS class names */
  className?: string;
  /** Inline style overrides */
  style?: CSSProperties;
  /** Whether to disable the max-width constraint (full-bleed) */
  fullBleed?: boolean;
  /** Density mode - controls gutter/margin spacing via sys.frame.grid tokens */
  density?: Density;
  /** Forces 12-column desktop layout at any viewport — for documentation demos only */
  demoFixed?: boolean;
  /** Content */
  children: ReactNode;
}

// Define the component with Item property
interface LayoutGridComponent {
  (props: LayoutGridProps): JSX.Element;
  Item: typeof LayoutGridItem;
}

export const LayoutGrid: LayoutGridComponent = Object.assign(
  ({
    className = "",
    style,
    fullBleed = false,
    density,
    demoFixed = false,
    children,
  }: LayoutGridProps) => {
    // Only set data-density for non-default modes (default is the CSS baseline)
    const densityAttr = density && density !== "default" ? density : undefined;

    return (
      <div
        className={`flow-layout-grid ${className}`.trim()}
        data-density={densityAttr}
        data-demo-fixed={demoFixed || undefined}
        style={{
          ...(fullBleed ? { maxWidth: "none", paddingLeft: 0, paddingRight: 0 } : {}),
          ...style,
        }}
      >
        {children}
      </div>
    );
  },
  { Item: null as unknown as typeof LayoutGridItem }, // Will be assigned below
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LayoutGrid.Item (child)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface LayoutGridItemProps {
  /** How many columns this item spans (1-12 or "full") */
  span?: ColSpan;
  /** Column start position (1-based, optional) */
  start?: number;
  /** Extra CSS class names */
  className?: string;
  /** Inline style overrides */
  style?: CSSProperties;
  /** Content */
  children: ReactNode;
}

function LayoutGridItem({
  span = 12,
  start,
  className = "",
  style,
  children,
}: LayoutGridItemProps) {
  const spanClass = span === "full" ? "flow-col-span-full" : `flow-col-span-${span}`;

  // If start is provided, use inline grid-column instead of class + inline start
  // to avoid CSS specificity conflicts
  const gridColumnStyle = start
    ? { gridColumn: `${start} / span ${span === "full" ? 12 : span}` }
    : {};

  return (
    <div
      className={start ? className : `${spanClass} ${className}`.trim()}
      style={{
        ...gridColumnStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Attach Item as a property
LayoutGrid.Item = LayoutGridItem;
