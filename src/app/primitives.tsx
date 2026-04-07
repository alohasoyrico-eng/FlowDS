/**
 * FLOW Design System — Primitive Components (Layer 2)
 * ─────────────────────────────────────────────────────
 * Primitives sit between Foundations and Components.
 * They consume tokens only. They enforce constraints.
 * They are the structural building blocks that L3 components MUST compose.
 *
 * Complete inventory:
 *   FlowThemeProvider, FlowSizeProvider, FlowDensityProvider, Surface, Text, Stack, Inline, Grid, Grid.Item,
 *   ActionSurface, Divider, MotionContainer, Overlay,
 *   FormField, FlowIcon, FlowFlag, GrowthObserver, FocusRing, StateLayer,
 *   resolveStateClass (state precedence utility)
 */
import React, {
  createContext,
  type CSSProperties,
  type ElementType,
  forwardRef,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { type FlowIcon as FlowIconDef, flowIcons } from "./icons";
import { FLAG_CELL_SIZE, flagByCode, type FlagSize, flagSizeMap } from "./flags";
import { type FlowBreakpoint, useFlowBreakpoint } from "./hooks/use-flow-breakpoint";
import type { FlowSize } from "./hooks/use-flow-breakpoint";
import { FlowSizeContext } from "./hooks/use-flow-default-size";
import { FlowDensityContext } from "./hooks/use-flow-density";
export type { FlowDensity } from "./hooks/use-flow-density";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Theme Context
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type FlowTheme = "light" | "dark";
const ThemeContext = createContext<{
  theme: FlowTheme;
  toggle: () => void;
  breakpoint: FlowBreakpoint;
}>({
  theme: "light",
  toggle: () => {},
  breakpoint: {
    size: "md",
    density: "default",
    isMobile: false,
    isPhablet: false,
    isTablet: false,
    isDesktop: true,
  },
});

export function FlowThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<FlowTheme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("flow-theme") as FlowTheme) || "light";
    }
    return "light";
  });

  const breakpoint = useFlowBreakpoint();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("flow-theme", theme);
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === "light" ? "dark" : "light")), []);

  const ctxValue = useMemo(() => ({ theme, toggle, breakpoint }), [theme, toggle, breakpoint]);

  return (
    <ThemeContext.Provider value={ctxValue}>
      <FlowDensityContext.Provider value={breakpoint.density}>
        <FlowSizeContext.Provider value={breakpoint.size}>
          {children}
        </FlowSizeContext.Provider>
      </FlowDensityContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useFlowTheme() {
  return useContext(ThemeContext);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Size Zone Provider
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * FlowSizeProvider — creates a local "size zone" in the React tree.
 * All descendant components that call `useFlowDefaultSize()` without an
 * explicit `size` prop will inherit this zone's size instead of the
 * viewport-derived default.
 *
 * Works like density zones (`data-density`): contextual, cascading, nestable.
 *
 * Usage:
 *   <FlowSizeProvider size="sm">
 *     <FlowButton label="Small" />        ← gets size="sm" from context
 *     <FlowButton label="Large" size="lg" /> ← explicit prop wins
 *   </FlowSizeProvider>
 */
export function FlowSizeProvider({ size, children }: { size: FlowSize; children: ReactNode }) {
  return (
    <FlowSizeContext.Provider value={size}>
      <div data-size={size} style={{ display: "contents" }}>
        {children}
      </div>
    </FlowSizeContext.Provider>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Density Zone Provider
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * FlowDensityProvider — creates a local density zone in the React tree.
 * Renders a `<div data-density={density}>` wrapper (display:contents) so the
 * CSS token cascade applies to all descendants automatically.
 *
 * When density="default" no wrapper is rendered (it's the CSS baseline).
 *
 * Usage:
 *   <FlowDensityProvider density="compact">
 *     <FlowCard ... />
 *   </FlowDensityProvider>
 */
export function FlowDensityProvider({
  density,
  children,
}: {
  density: "compact" | "default" | "comfortable";
  children: ReactNode;
}) {
  return (
    <FlowDensityContext.Provider value={density}>
      {density === "default" ? (
        children
      ) : (
        <div data-density={density} style={{ display: "contents" }}>
          {children}
        </div>
      )}
    </FlowDensityContext.Provider>
  );
}

// Re-export for convenience
export { useFlowBreakpoint };
export type { FlowBreakpoint };

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// State Precedence Resolver
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type FlowState =
  | "default"
  | "hover"
  | "focus-visible"
  | "pressed"
  | "selected"
  | "disabled"
  | "loading"
  | "error"
  | "success"
  | "readonly"
  | "dragging";

const STATE_PRIORITY: Record<FlowState, number> = {
  default: 0,
  hover: 1,
  "focus-visible": 2,
  pressed: 3,
  selected: 4,
  dragging: 5,
  readonly: 6,
  success: 7,
  error: 8,
  loading: 9,
  disabled: 10,
};

/**
 * Given a set of active states, returns the highest-priority state.
 * disabled > loading > error > success > readonly > dragging >
 * selected > pressed > focus-visible > hover > default
 */
export function resolveState(activeStates: Partial<Record<FlowState, boolean>>): FlowState {
  let highest: FlowState = "default";
  let highestPrio = -1;
  for (const [state, active] of Object.entries(activeStates) as [FlowState, boolean][]) {
    if (active && STATE_PRIORITY[state] > highestPrio) {
      highest = state;
      highestPrio = STATE_PRIORITY[state];
    }
  }
  return highest;
}

/** Returns data attributes for the resolved state, consumable by CSS StateLayer. */
export function stateAttrs(
  states: Partial<Record<FlowState, boolean>>,
): Record<string, string | boolean | undefined> {
  const resolved = resolveState(states);
  return {
    "data-state": resolved,
    "aria-disabled": states.disabled || undefined,
    "aria-busy": states.loading || undefined,
    "aria-invalid": states.error || undefined,
    "aria-selected": states.selected || undefined,
    "aria-readonly": states.readonly || undefined,
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Token maps (shared by primitives)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type RadiusToken = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type SpaceToken = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20;

/** Semantic radius roles — route through sys layer, density-responsive & viewport-responsive */
export type SemanticRadius = "control" | "container" | "surface";
/** Extended radius: legacy ref-level tokens + semantic sys-level roles */
export type RadiusValue = RadiusToken | SemanticRadius | "card" | "layout" | number;

/** Semantic padding roles — route through sys layer, density-responsive */
export type SemanticPadding = "none" | "compact" | "control" | "container" | "surface";
/** Extended padding: numeric ref-level tokens + semantic sys-level roles */
export type PaddingValue = SpaceToken | SemanticPadding | "layout";

/** Semantic gap roles — route through sys layer, density-responsive */
export type SemanticGap =
  | "control"
  | "component"
  | "component-lg"
  | "subsection"
  | "section"
  | "page";
/** Extended gap: numeric ref-level tokens + semantic sys-level roles */
export type GapValue = SpaceToken | SemanticGap;

const radiusMap: Record<RadiusToken, string> = {
  none: "var(--ref-frame-radius-0)",
  sm: "var(--ref-frame-radius-1)",
  md: "var(--ref-frame-radius-2)",
  lg: "var(--ref-frame-radius-3)",
  xl: "var(--ref-frame-radius-4)",
  full: "var(--ref-frame-radius-full)",
};

const semanticRadiusMap: Record<SemanticRadius, string> = {
  control: "var(--sys-frame-radius-control)",
  container: "var(--sys-frame-radius-container)",
  surface: "var(--sys-frame-radius-surface)",
};

const spaceMap: Record<SpaceToken, string> = {
  0: "0",
  1: "var(--ref-frame-space-1)",
  2: "var(--ref-frame-space-2)",
  3: "var(--ref-frame-space-3)",
  4: "var(--ref-frame-space-4)",
  5: "var(--ref-frame-space-5)",
  6: "var(--ref-frame-space-6)",
  8: "var(--ref-frame-space-8)",
  10: "var(--ref-frame-space-10)",
  12: "var(--ref-frame-space-12)",
  16: "var(--ref-frame-space-16)",
  20: "var(--ref-frame-space-20)",
};

const semanticPaddingMap: Record<SemanticPadding, string> = {
  none: "0",
  compact: "var(--sys-frame-padding-control)",
  control: "var(--sys-frame-padding-control)",
  container: "var(--sys-frame-padding-container)",
  surface: "var(--sys-frame-padding-surface)",
};

const semanticGapMap: Record<SemanticGap, string> = {
  control: "var(--sys-frame-gap-component)",
  component: "var(--sys-frame-gap-component)",
  "component-lg": "var(--sys-frame-gap-component-lg)",
  subsection: "var(--sys-frame-gap-subsection)",
  section: "var(--sys-frame-gap-section)",
  page: "var(--sys-frame-gap-page)",
};

/** Resolve a RadiusValue to a CSS var string */
function resolveRadius(r: RadiusValue): string {
  if (typeof r === "number") return `${r}px`;
  if (r in semanticRadiusMap) return semanticRadiusMap[r as SemanticRadius];
  if (r in radiusMap) return radiusMap[r as RadiusToken];
  return r; // passthrough for "card", "layout", or unknown strings
}

/** Resolve a PaddingValue to a CSS var string */
function resolvePadding(p: PaddingValue): string {
  if (typeof p === "string") {
    if (p in semanticPaddingMap) return semanticPaddingMap[p as SemanticPadding];
    return p; // passthrough for "layout" or unknown strings
  }
  return spaceMap[p];
}

/** Resolve a GapValue to a CSS var string */
function resolveGap(g: GapValue): string {
  if (typeof g === "string") return semanticGapMap[g as SemanticGap];
  return spaceMap[g];
}

export { radiusMap, spaceMap };

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Surface
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type Elevation = 0 | 1 | 2 | 3 | 4;
type SurfaceVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "sunken"
  | "inverse"
  | "accent"
  | "filled"
  | "outlined";

interface SurfaceProps {
  elevation?: Elevation;
  variant?: SurfaceVariant;
  radius?: RadiusValue;
  border?: boolean;
  padding?: PaddingValue;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  id?: string;
  role?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-modal"?: boolean | "true" | "false";
  tabIndex?: number;
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  [key: `data-${string}`]: unknown;
}

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  (
    {
      elevation = 0,
      variant = "primary",
      radius = "container",
      border = true,
      padding = "container",
      children,
      className = "",
      style,
      as: Tag = "div",
      ...rest
    },
    ref,
  ) => {
    // Filter out non-HTML props that may come from parent components
    const {
      onPress: _onPress,
      disabled: _disabled,
      loading: _loading,
      selected: _selected,
      ...htmlProps
    } = rest as Record<string, unknown>;

    return (
      <Tag
        ref={ref}
        className={`flow-surface ${className}`.trim()}
        data-border={border || undefined}
        data-elevation={elevation > 0 ? elevation : undefined}
        style={
          {
            "--_surface-bg": `var(--sys-energy-surface-${variant})`,
            "--_surface-radius": resolveRadius(radius),
            "--_surface-padding": resolvePadding(padding),
            ...style,
          } as CSSProperties
        }
        {...htmlProps}
      >
        {children}
      </Tag>
    );
  },
);
Surface.displayName = "Surface";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Text (Typography primitive)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type TextRole =
  | "display-xl"
  | "display-l"
  | "display-m"
  | "display-s"
  | "heading-xl"
  | "heading-l"
  | "heading-m"
  | "heading-s"
  | "label-xl"
  | "label-l"
  | "label-m"
  | "label-s"
  | "paragraph-xl"
  | "paragraph-l"
  | "paragraph-m"
  | "paragraph-s"
  | "caption"
  | "overline"
  | "code"
  // HTML heading aliases
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  // Legacy aliases (deprecated — use paragraph-* instead)
  | "body-m"
  | "body-s";
type TextColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "inverse"
  | "accent"
  | "danger"
  | "success"
  | "warning"
  | "link"
  | "onAction"
  | "inherit";
export type Tone = "neutral" | "brand" | "marketing" | "system";

/* colorMap and toneMap moved to CSS: .flow-text[data-color] and .flow-text[data-tone] in flow.css */

const textRoleToClass: Partial<Record<TextRole, string>> & Record<string, string> = {
  // PHASE A: 4×4 grid — Display (brand font, 4 levels)
  "display-xl": "flow-display-xl",
  "display-l": "flow-display-l",
  "display-m": "flow-display-m",
  "display-s": "flow-display-s",
  // PHASE A: 4×4 grid — Heading (brand font, 4 levels)
  "heading-xl": "flow-heading-xl",
  "heading-l": "flow-heading-l",
  "heading-m": "flow-heading-m",
  "heading-s": "flow-heading-s",
  // PHASE A: 4×4 grid — Label (sans font, 4 levels)
  "label-xl": "flow-label-xl",
  "label-l": "flow-label-l",
  "label-m": "flow-label-m",
  "label-s": "flow-label-s",
  // PHASE A: 4×4 grid — Paragraph (sans font, 4 levels)
  "paragraph-xl": "flow-paragraph-xl",
  "paragraph-l": "flow-paragraph-l",
  "paragraph-m": "flow-paragraph-m",
  "paragraph-s": "flow-paragraph-s",
  // Utility roles (density-responsive)
  caption: "flow-caption",
  overline: "flow-section-label",
  code: "flow-inline-code",
  // HTML heading aliases → map to heading equivalents
  h1: "flow-display-xl",
  h2: "flow-heading-xl",
  h3: "flow-heading-l",
  h4: "flow-heading-m",
  h5: "flow-heading-s",
  h6: "flow-heading-s",
  // Legacy aliases → map to paragraph equivalents
  "body-m": "flow-paragraph-m",
  "body-s": "flow-paragraph-s",
};

const textRoleToTag: Partial<Record<TextRole, string>> & Record<string, string> = {
  "display-xl": "h1",
  "display-l": "h1",
  "display-m": "h1",
  "display-s": "h1",
  "heading-xl": "h2",
  "heading-l": "h3",
  "heading-m": "h4",
  "heading-s": "h5",
  "label-xl": "span",
  "label-l": "span",
  "label-m": "span",
  "label-s": "span",
  "paragraph-xl": "p",
  "paragraph-l": "p",
  "paragraph-m": "p",
  "paragraph-s": "p",
  caption: "span",
  overline: "span",
  code: "code",
  // HTML heading aliases → use the tag directly
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  // Legacy aliases
  "body-m": "p",
  "body-s": "p",
};

interface TextProps {
  role?: TextRole;
  color?: TextColor;
  tone?: Tone;
  as?: ElementType;
  truncate?: boolean | number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
  htmlFor?: string;
  onClick?: React.MouseEventHandler;
  "aria-label"?: string;
}

export function Text({
  role = "paragraph-m",
  color,
  tone,
  as,
  truncate,
  children,
  className = "",
  style,
  id,
  htmlFor,
  onClick,
  "aria-label": ariaLabel,
}: TextProps) {
  const Tag = (as || textRoleToTag[role] || "span") as ElementType;
  const cls = textRoleToClass[role] || "flow-paragraph-m";

  const lineCount = typeof truncate === "number" ? truncate : 1;
  const truncateStyle: CSSProperties = truncate
    ? {
        overflow: "hidden",
        textOverflow: "ellipsis",
        ...(truncate === true || truncate === 1
          ? { whiteSpace: "nowrap" as const }
          : {
              display: "-webkit-box",
              WebkitLineClamp: lineCount,
              WebkitBoxOrient: "vertical" as const,
              // Firefox fallback: approximate max-height from line-height
              maxHeight: `${lineCount * 1.5}em`,
            }),
      }
    : {};

  return (
    <Tag
      id={id}
      htmlFor={htmlFor}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${cls} flow-text ${className}`.trim()}
      data-color={!tone && color ? color : undefined}
      data-tone={tone || undefined}
      style={{
        ...truncateStyle,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ActionSurface (interactive primitive)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface ActionSurfaceProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "type"
> {
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  selected?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
}

export const ActionSurface = forwardRef<HTMLButtonElement, ActionSurfaceProps>(
  (
    {
      onPress,
      disabled,
      loading,
      selected,
      children,
      className = "",
      style,
      type = "button",
      ...rest
    },
    ref,
  ) => {
    const resolved = resolveState({ disabled, loading, selected });
    const isInert = resolved === "disabled" || resolved === "loading";

    // Modularity: only force data-state when ActionSurface controls behavior (disabled/loading).
    // Otherwise, let consumer's data-state (e.g. from stateAttrs with error/success) pass through via rest.
    // If consumer didn't set one, fall back to ActionSurface's resolved state.
    const consumerState = (rest as Record<string, unknown>)["data-state"];
    const dataState = isInert ? resolved : (consumerState as string | undefined) ?? resolved;

    return (
      <button
        ref={ref}
        {...rest}
        type={type}
        onClick={isInert ? undefined : onPress}
        disabled={isInert}
        data-state={dataState}
        className={`flow-action-surface flow-focusable ${className}`.trim()}
        style={style}
      >
        {children}
      </button>
    );
  },
);
ActionSurface.displayName = "ActionSurface";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Overlay (modal dimming primitive)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface OverlayProps {
  visible: boolean;
  onDismiss?: () => void;
  dismissible?: boolean;
  children?: ReactNode;
}

export function Overlay({ visible, onDismiss, dismissible = true, children }: OverlayProps) {
  if (!visible) return null;

  return (
    <div className="flow-overlay" onClick={dismissible ? onDismiss : undefined} aria-hidden="true">
      {children}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FormField (form layout primitive)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function FormField({
  label,
  htmlFor,
  helperText,
  error,
  success,
  required,
  fullWidth,
  children,
  className = "",
  style,
}: FormFieldProps) {
  const autoId = useId();
  const fieldId = htmlFor || autoId;
  const helperId = `${fieldId}-helper`;
  const hasMessage = !!(error || helperText);

  return (
    <div
      className={`flow-form-field ${className}`.trim()}
      data-full-width={fullWidth || undefined}
      style={style}
    >
      {label && (
        <label htmlFor={fieldId} className="flow-label-l flow-text">
          {label}
          {required && (
            <span className="flow-form-field-required" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {hasMessage && (
        <span
          id={helperId}
          className="flow-caption flow-form-field-message"
          role={error ? "alert" : undefined}
          data-error={error ? "" : undefined}
          data-success={!error && success ? "" : undefined}
        >
          {error || helperText}
        </span>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowIcon (Iconography primitive)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
/* iconSizeMap moved to CSS: .flow-icon[data-size] in flow.css */

interface FlowIconProps {
  name: string;
  size?: IconSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function FlowIcon({
  name,
  size = "md",
  color = "currentColor",
  className = "",
  style,
}: FlowIconProps) {
  const icon: FlowIconDef | undefined = flowIcons[name];
  if (!icon) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[FlowIcon] Unknown icon name: "${name}"`);
    }
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        aria-label={`Missing icon: ${name}`}
        role="img"
        className={`flow-icon ${className}`.trim()}
        data-size={size}
        style={style}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="4 2" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="12" y1="8" x2="12" y2="16" />
      </svg>
    );
  }

  return (
    <svg
      viewBox={icon.viewBox}
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label={icon.label}
      role="img"
      className={`flow-icon ${className}`.trim()}
      data-size={size}
      style={style}
    >
      <path d={icon.path} />
    </svg>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowFlag (Flag primitive — sprite-clip model)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Renders a single country flag from the Figma Edenred flag sprite (Frame8).
 * Uses the sprite-clip technique: renders the full Frame8 inside a circular
 * overflow:hidden container, positioning it so only the target flag is visible.
 *
 * Sizes: xs=16, sm=20, md=24, lg=32, xl=40 (native sprite resolution).
 *
 * NOTE: Each FlowFlag instance renders the full Frame8 sprite (~300 SVG paths).
 * This is fine for production use (1-5 flags visible at a time) but can be heavy
 * when rendering all 48 simultaneously (explorer page). Future optimization:
 * extract individual flag SVGs into standalone entries (like icons.ts does).
 */

// Lazy import — Frame8 is only loaded when the first FlowFlag renders
let Frame8Component: (() => JSX.Element) | null = null;
let frame8Promise: Promise<void> | null = null;

function useFrame8() {
  const [ready, setReady] = useState(Frame8Component !== null);

  useEffect(() => {
    if (Frame8Component) {
      setReady(true);
      return;
    }
    if (!frame8Promise) {
      frame8Promise = import("../imports/Frame8").then((mod) => {
        Frame8Component = mod.default;
      });
    }
    frame8Promise.then(() => setReady(true));
  }, []);

  return ready;
}

interface FlowFlagProps {
  /** ISO 3166-1 alpha-2 code (uppercase), e.g. "FR", "BR", "BE" */
  code: string;
  /** Display size preset */
  size?: FlagSize;
  /** Additional className */
  className?: string;
  /** Additional style */
  style?: CSSProperties;
}

export function FlowFlag({ code, size = "md", className = "", style }: FlowFlagProps) {
  const entry = flagByCode[code];
  const frame8Ready = useFrame8();

  if (!entry || !frame8Ready || !Frame8Component) return null;

  const dim = flagSizeMap[size];
  const scale = dim / FLAG_CELL_SIZE; // native=40px

  return (
    <div
      className={className}
      role="img"
      aria-label={`${entry.name} flag`}
      style={{
        width: dim,
        height: dim,
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
        position: "relative",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -entry.x * scale,
          top: -entry.y * scale,
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
          width: 1400, // wider than sprite to avoid clipping
          height: 250,
          pointerEvents: "none",
        }}
      >
        <Frame8Component />
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Divider
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━��━━━

export function Divider({
  spacing = 10,
  orientation,
  style,
}: {
  spacing?: SpaceToken;
  orientation?: "horizontal" | "vertical";
  style?: React.CSSProperties;
}) {
  return (
    <hr
      className="flow-divider"
      data-orientation={orientation}
      style={{
        ...(spacing > 0 ? ({ "--_spacing": spaceMap[spacing] } as CSSProperties) : {}),
        ...style,
      }}
    />
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Code (inline) & CodeBlock
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function Code({ children }: { children: ReactNode }) {
  return <code className="flow-inline-code">{children}</code>;
}

export function CodeBlock({ children }: { children: ReactNode }) {
  return <pre className="flow-code">{children}</pre>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MotionContainer
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface MotionContainerProps {
  visible: boolean;
  children: ReactNode;
  className?: string;
}

export function MotionContainer({ visible, children, className = "" }: MotionContainerProps) {
  const [shouldRender, setShouldRender] = useState(visible);

  // Sync render lifecycle with visible prop (setState during render on prop change)
  const [prevVisible, setPrevVisible] = useState(visible);
  if (visible !== prevVisible) {
    setPrevVisible(visible);
    if (visible) setShouldRender(true);
  }

  const handleAnimEnd = useCallback(() => {
    if (!visible) setShouldRender(false);
  }, [visible]);

  if (!shouldRender) return null;

  return (
    <div
      className={`${visible ? "flow-collapse-enter" : "flow-collapse-exit"} ${className}`.trim()}
      onAnimationEnd={handleAnimEnd}
    >
      {children}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GrowthObserver (instrumentation)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface GrowthObserverProps {
  event: string;
  properties?: Record<string, unknown>;
  onVisible?: () => void;
  inline?: boolean;
  children: ReactNode;
}

export function GrowthObserver({ event, properties, onVisible, inline, children }: GrowthObserverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const emitted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !emitted.current) {
          emitted.current = true;
          onVisible?.();
          if (import.meta.env.DEV) {
             
            console.debug("[Flow.Growth]", event, properties);
          }
          // Production: emit to analytics pipeline
          // window.flowAnalytics?.track(event, { ...properties, timestamp: Date.now() });
        }
      },
      { threshold: 0.5 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [event, properties, onVisible]);

  return (
    <div ref={ref} data-flow-growth={event} style={inline ? { display: "contents" } : undefined}>
      {children}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FocusRing (utility component)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface FocusRingProps {
  /** Color token for the ring. Defaults to sys focus ring color. */
  color?: string;
  /** Ring width. Defaults to sys focus ring width. */
  width?: string;
  /** Ring offset from element edge. Defaults to sys focus ring offset. */
  offset?: string;
  /** Whether the ring is currently visible (e.g. :focus-visible triggered). */
  visible?: boolean;
  /** Render as inset ring instead of outline offset */
  inset?: boolean;
  children: ReactNode;
}

/**
 * FocusRing — renders a visible focus indicator around its child.
 * Consumes sys.state.focusRing tokens for width, offset, and color.
 * When `visible` is undefined, defers to CSS :focus-visible.
 * When `visible` is explicitly true/false, controls ring programmatically.
 */
export function FocusRing({
  color: _color = "var(--sys-state-focus-ring-color)",
  width: _width = "var(--sys-state-focus-ring-width)",
  offset: _offset = "var(--sys-state-focus-ring-offset)",
  visible,
  inset = false,
  children,
}: FocusRingProps) {
  return (
    <div className="flow-focus-ring-container" data-focus-visible={visible}>
      <div
        className={`flow-focus-ring${visible === true ? " flow-focus-ring--active" : ""}`}
        data-inset={inset || undefined}
      >
        {children}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// StateLayer (utility component)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type StateLayerState = "idle" | "hover" | "pressed" | "selected" | "dragging";

interface StateLayerProps {
  /** Current interaction state. Controls overlay opacity/color. */
  state?: StateLayerState;
  /** Custom overlay color. Defaults to sys.state hover/pressed overlays. */
  color?: string;
  /** Whether the layer is disabled (renders at disabled opacity). */
  disabled?: boolean;
  /** Whether to clip the overlay to parent's border-radius. */
  clip?: boolean;
  children: ReactNode;
}

const stateLayerOverlayMap: Record<StateLayerState, { bg: string; opacity: number }> = {
  idle: { bg: "transparent", opacity: 0 },
  hover: { bg: "var(--sys-state-hover-overlay)", opacity: 1 },
  pressed: { bg: "var(--sys-state-pressed-overlay)", opacity: 1 },
  selected: { bg: "var(--sys-state-selected-overlay)", opacity: 1 },
  dragging: { bg: "var(--sys-state-selected-overlay)", opacity: 0.6 },
};

/**
 * StateLayer — renders a semi-transparent overlay inside its child to communicate
 * interaction state (hover, pressed, selected, dragging).
 * Consumes sys.state.* overlay tokens. The overlay is positioned absolute, inset: 0,
 * pointer-events: none, and transitions using Momentum tokens.
 */
export function StateLayer({
  state = "idle",
  color,
  disabled = false,
  clip = true,
  children,
}: StateLayerProps) {
  const overlay = stateLayerOverlayMap[state];

  return (
    <div
      className="flow-state-layer-container"
      data-clip={clip || undefined}
      data-disabled={disabled || undefined}
    >
      {children}
      <div
        className="flow-state-layer"
        aria-hidden="true"
        data-state-layer={state}
        style={
          {
            "--_state-layer-bg": color || overlay.bg,
            "--_state-layer-opacity": color ? (state === "idle" ? 0 : 1) : overlay.opacity,
          } as CSSProperties
        }
      />
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ThemeToggle (re-exported for backward compat)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function ThemeToggle() {
  const { theme, toggle } = useFlowTheme();
  return (
    <button
      onClick={toggle}
      className="flow-theme-toggle flow-focusable"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? "\u25D0" : "\u25D1"}
    </button>
  );
}
