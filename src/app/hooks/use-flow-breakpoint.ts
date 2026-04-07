/**
 * FLOW useFlowBreakpoint — Responsive Breakpoint Hook
 * ─────────────────────────────────────────────────────
 * Reads viewport width via matchMedia listeners and returns
 * the current size tier, density, and boolean flags.
 *
 * Breakpoints (aligned with LayoutGrid + ref.frame.grid):
 *   <576px  → sm  / compact  / isMobile
 *   ≥576px  → md  / default  / isPhablet  (phone-tablet hybrid)
 *   ≥768px  → md  / default  / isTablet
 *   ≥992px  → lg  / default  / isDesktop
 *   ≥1440px → xl  / comfortable / isDesktop
 *
 * Side-effects:
 *   Sets data-size and data-density on <html> so ALL components
 *   in the tree inherit the correct sys token values automatically.
 */
import { useCallback, useEffect, useState } from "react";

import type { FlowDensity } from "./use-flow-density";

export type { FlowDensity };
export type FlowSize = "sm" | "md" | "lg" | "xl";

export interface FlowBreakpoint {
  size: FlowSize;
  density: FlowDensity;
  isMobile: boolean;
  isPhablet: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const BP_SM = 576;
const BP_PH = 768;
const BP_LG = 992;
const BP_XL = 1440;

function resolve(width: number): FlowBreakpoint {
  if (width < BP_SM) {
    return {
      size: "sm",
      density: "compact",
      isMobile: true,
      isPhablet: false,
      isTablet: false,
      isDesktop: false,
    };
  }
  if (width < BP_PH) {
    return {
      size: "md",
      density: "default",
      isMobile: false,
      isPhablet: true,
      isTablet: false,
      isDesktop: false,
    };
  }
  if (width < BP_LG) {
    return {
      size: "md",
      density: "default",
      isMobile: false,
      isPhablet: false,
      isTablet: true,
      isDesktop: false,
    };
  }
  if (width < BP_XL) {
    return {
      size: "lg",
      density: "default",
      isMobile: false,
      isPhablet: false,
      isTablet: false,
      isDesktop: true,
    };
  }
  return {
    size: "xl",
    density: "comfortable",
    isMobile: false,
    isPhablet: false,
    isTablet: false,
    isDesktop: true,
  };
}

export function useFlowBreakpoint(): FlowBreakpoint {
  const [bp, setBp] = useState<FlowBreakpoint>(() =>
    typeof window !== "undefined" ? resolve(window.innerWidth) : resolve(1024),
  );

  const update = useCallback(() => {
    const next = resolve(window.innerWidth);
    setBp((prev) => {
      if (prev.size === next.size && prev.density === next.density) return prev;
      return next;
    });
  }, []);

  useEffect(() => {
    // Sync immediately on mount — covers race conditions where the
    // viewport size changed between useState init and effect setup
    // (common in sandbox/iframe environments like Figma Make).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with external viewport size on mount; matchMedia listeners handle subsequent changes
    update();

    // Use matchMedia for efficient breakpoint listening
    const queries = [
      window.matchMedia(`(min-width: ${BP_XL}px)`),
      window.matchMedia(`(min-width: ${BP_LG}px)`),
      window.matchMedia(`(min-width: ${BP_PH}px)`),
      window.matchMedia(`(min-width: ${BP_SM}px)`),
    ];

    const handler = () => update();
    queries.forEach((mq) => mq.addEventListener("change", handler));

    // Safety net: debounced resize listener catches viewport changes that
    // matchMedia might miss (e.g. iframe resizes, DevTools toggle).
    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handler, 250);
    };
    window.addEventListener("resize", debouncedResize);

    return () => {
      queries.forEach((mq) => mq.removeEventListener("change", handler));
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, [update]);

  // Sync to <html> attributes
  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute("data-size", bp.size);
    if (bp.density !== "default") {
      el.setAttribute("data-density", bp.density);
    } else {
      el.removeAttribute("data-density");
    }
  }, [bp.size, bp.density]);

  return bp;
}
