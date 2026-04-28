/**
 * FLOW Design System — Layout Primitives
 * ───────────────────────────────────────
 * Stack, Inline, Grid + Grid.Item.
 */
import React, { type CSSProperties, type ElementType, type ReactNode } from "react";

import { resolveGap, resolvePadding } from "./types";
import type { GapValue, PaddingValue } from "./types";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Stack (vertical layout)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface StackProps {
  gap?: GapValue;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  padding?: PaddingValue;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}

const stackJustifyMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
};

export function Stack({
  gap = 3,
  align = "stretch",
  justify,
  padding,
  children,
  className = "",
  style,
  as: Tag = "div",
}: StackProps) {
  return (
    <Tag
      className={`flow-stack ${className}`.trim()}
      style={
        {
          "--_gap": resolveGap(gap),
          "--_align": align,
          ...(justify ? { justifyContent: stackJustifyMap[justify] } : {}),
          ...(padding !== undefined ? { padding: resolvePadding(padding) } : {}),
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Inline (horizontal layout)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface InlineProps {
  gap?: GapValue;
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  /** Alias for align */
  alignItems?: "start" | "center" | "end" | "baseline" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
  padding?: PaddingValue;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  role?: string;
  onClick?: React.MouseEventHandler;
  "aria-label"?: string;
}

const justifyMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
};

export function Inline({
  gap = 3,
  align,
  alignItems,
  justify = "start",
  wrap = false,
  padding,
  children,
  className = "",
  style,
  as: Tag = "div",
  role,
  onClick,
  "aria-label": ariaLabel,
}: InlineProps) {
  const resolvedAlign = align ?? alignItems ?? "center";
  return (
    <Tag
      className={`flow-inline ${className}`.trim()}
      data-wrap={wrap || undefined}
      role={role}
      onClick={onClick}
      aria-label={ariaLabel}
      style={
        {
          "--_gap": resolveGap(gap),
          "--_align": resolvedAlign,
          "--_justify": justifyMap[justify],
          ...(padding !== undefined ? { padding: resolvePadding(padding) } : {}),
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Grid
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface GridProps {
  /** Fixed column count, CSS template string, or auto-fit with minItemWidth */
  columns?: number | string;
  /** Alias for columns */
  cols?: number | string;
  /** Minimum item width for auto-fit responsive columns (e.g. "200px"). Overrides columns. */
  minItemWidth?: string;
  gap?: GapValue;
  padding?: PaddingValue;
  /** Cross-axis alignment of grid items */
  align?: "start" | "center" | "end" | "stretch";
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}

export function Grid({
  columns,
  cols: colsAlias,
  minItemWidth,
  gap = 4,
  padding,
  align,
  children,
  className = "",
  style,
  as: Tag = "div",
}: GridProps) {
  const effectiveCols = columns ?? colsAlias ?? 2;
  const cols = minItemWidth
    ? `repeat(auto-fit, minmax(min(${minItemWidth}, 100%), 1fr))`
    : typeof effectiveCols === "number"
      ? `repeat(${effectiveCols}, 1fr)`
      : effectiveCols;
  return (
    <Tag
      className={`flow-grid flow-grid-v2 ${className}`.trim()}
      data-align={align || undefined}
      style={
        {
          "--_grid-cols": cols,
          "--_gap": resolveGap(gap),
          ...(padding !== undefined ? { padding: resolvePadding(padding) } : {}),
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

/** Grid.Item — optional child for span/start control within a Grid */
interface GridItemProps {
  /** How many columns this item spans */
  span?: number;
  /** Column start position (1-based) */
  start?: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function GridItem({ span, start, children, className = "", style }: GridItemProps) {
  const gridStyle: CSSProperties = {};
  if (span && start) {
    gridStyle.gridColumn = `${start} / span ${span}`;
  } else if (span) {
    gridStyle.gridColumn = `span ${span}`;
  } else if (start) {
    gridStyle.gridColumnStart = start;
  }
  return (
    <div className={className} style={{ ...gridStyle, ...style }}>
      {children}
    </div>
  );
}

Grid.Item = GridItem;
