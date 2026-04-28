/**
 * FLOW useFlowDefaultSize — Context-Aware Default Size
 * ─────────────────────────────────────────────────────
 * Returns the size tier for a component based on priority:
 *   1. Explicit `size` prop (component-level override)
 *   2. Nearest FlowSizeContext ancestor (zone-level context)
 *   3. Viewport-derived size from useFlowBreakpoint (global default)
 *
 * This makes size work like density — contextual, not global.
 * Developers can create "size zones" with FlowSizeProvider.
 *
 * Size and density are independent axes in FLOW:
 *   - Size determines the component's frame tier
 *   - Density scales tokens (spacing, height, radius) within that tier
 * Touch-target minimums are guaranteed at the ref-token level,
 * not by remapping size tiers.
 *
 * Also exports `resolveFlowSize` for non-hook contexts (e.g.
 * forwardRef render functions that already have viewport size).
 *
 * Also exports `FlowSizeContext` — the React context consumed by
 * FlowSizeProvider (in primitives) and FlowThemeProvider. Defined
 * here (not in primitives) to avoid circular imports.
 *
 * @since FLOW v2.3 — viewport-aligned defaults (replaces density mapping)
 * @since FLOW v2.4 — context-driven cascading (size zones)
 */
import { createContext, useContext } from "react";

import type { FlowSize } from "./use-flow-breakpoint";
import { useFlowBreakpoint } from "./use-flow-breakpoint";

/** Context for size zone cascading. Provided by FlowSizeProvider and FlowThemeProvider. */
export const FlowSizeContext = createContext<FlowSize | undefined>(undefined);

/** Pure resolution — explicit > context > viewport. */
export function resolveFlowSize(
  explicit: FlowSize | undefined,
  contextSize: FlowSize | undefined,
  viewportSize: FlowSize,
): FlowSize {
  return explicit ?? contextSize ?? viewportSize;
}

/** Hook — reads size from context cascade, falls back to viewport. */
export function useFlowDefaultSize(explicit?: FlowSize): FlowSize {
  const contextSize = useContext(FlowSizeContext);
  const { size: viewportSize } = useFlowBreakpoint();
  return resolveFlowSize(explicit, contextSize, viewportSize);
}
