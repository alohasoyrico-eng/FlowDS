/**
 * FLOW Design System — Primitive Types & Token Maps
 * ──────────────────────────────────────────────────
 * Pure TypeScript: state resolution, token types, token maps, resolve helpers.
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// State Precedence Resolver
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
    // aria-selected intentionally omitted — only valid on option/tab/treeitem/gridcell roles.
    // Components that need it must add it explicitly with the correct role context.
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
export function resolveRadius(r: RadiusValue): string {
  if (typeof r === "number") return `${r}px`;
  if (r in semanticRadiusMap) return semanticRadiusMap[r as SemanticRadius];
  if (r in radiusMap) return radiusMap[r as RadiusToken];
  return r; // passthrough for "card", "layout", or unknown strings
}

/** Resolve a PaddingValue to a CSS var string */
export function resolvePadding(p: PaddingValue): string {
  if (typeof p === "string") {
    if (p in semanticPaddingMap) return semanticPaddingMap[p as SemanticPadding];
    return p; // passthrough for "layout" or unknown strings
  }
  return spaceMap[p];
}

/** Resolve a GapValue to a CSS var string */
export function resolveGap(g: GapValue): string {
  if (typeof g === "string") return semanticGapMap[g as SemanticGap];
  return spaceMap[g];
}

export { radiusMap, spaceMap };
