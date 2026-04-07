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

// ── Types & State ──────────────────────────────────────────────────────────────
export {
  resolveState,
  stateAttrs,
  radiusMap,
  spaceMap,
} from "./types";
export type {
  FlowState,
  RadiusToken,
  SpaceToken,
  SemanticRadius,
  RadiusValue,
  SemanticPadding,
  PaddingValue,
  SemanticGap,
  GapValue,
} from "./types";

// ── Providers ──────────────────────────────────────────────────────────────────
export {
  FlowThemeProvider,
  useFlowTheme,
  FlowSizeProvider,
  FlowDensityProvider,
  useFlowBreakpoint,
  ThemeToggle,
} from "./providers";
export type { FlowBreakpoint } from "./providers";
export type { FlowDensity } from "./providers";

// ── Surfaces ───────────────────────────────────────────────────────────────────
export { Surface, ActionSurface, Overlay } from "./surfaces";

// ── Typography ─────────────────────────────────────────────────────────────────
export { Text } from "./typography";
export type { Tone } from "./typography";

// ── Layout ─────────────────────────────────────────────────────────────────────
export { Stack, Inline, Grid } from "./layout";

// ── Form ───────────────────────────────────────────────────────────────────────
export { FormField, FocusRing, StateLayer } from "./form";

// ── Media ──────────────────────────────────────────────────────────────────────
export { FlowIcon, FlowFlag, Divider } from "./media";

// ── Utilities ──────────────────────────────────────────────────────────────────
export { Code, CodeBlock, MotionContainer, GrowthObserver } from "./utilities";
