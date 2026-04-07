/**
 * FLOW useFlowDensity — Density Zone Context
 * ────────────────────────────────────────────
 * Provides and reads the active density tier from React context.
 * FlowDensityProvider (in primitives.tsx) sets the context value
 * and renders a `data-density` wrapper so the CSS token cascade applies.
 *
 * Size and density are independent axes in FLOW:
 *   - Size determines the component's frame tier (sm/md/lg/xl)
 *   - Density scales tokens (spacing, height, radius) within that tier
 */
import { createContext, useContext } from "react";

export type FlowDensity = "compact" | "default" | "comfortable";

export const FlowDensityContext = createContext<FlowDensity>("default");

/** Read the nearest density zone from context. Falls back to "default". */
export function useFlowDensity(): FlowDensity {
  return useContext(FlowDensityContext);
}
