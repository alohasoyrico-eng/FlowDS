/**
 * FLOW Design System — Provider Primitives
 * ─────────────────────────────────────────
 * ThemeProvider, SizeProvider, DensityProvider, ThemeToggle.
 */
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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
        <FlowSizeContext.Provider value={breakpoint.size}>{children}</FlowSizeContext.Provider>
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
