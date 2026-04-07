/** FLOW — FlowPullToRefresh (L4 Pattern) */
import React, {
  type CSSProperties,
  forwardRef,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";

import { Stack, Text } from "../../primitives";
import { FlowCircularProgress } from "../feedback/FlowCircularProgress";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PULL TO REFRESH — Mobile pull-to-refresh gesture
// Touch-driven indicator that triggers refresh on pull-down.
// CSS: .flow-pull-to-refresh
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Props for FlowPullToRefresh — mobile pull-to-refresh gesture container that triggers a refresh callback. */
export interface PullToRefreshProps {
  /** Whether currently refreshing */
  refreshing: boolean;
  /** Called when pull threshold is reached */
  onRefresh: () => void;
  /** Pull threshold in px before triggering refresh */
  threshold?: number;
  /** Custom pulling text */
  pullingText?: string;
  /** Custom refreshing text */
  refreshingText?: string;
  /** Custom release text */
  releaseText?: string;
  /** Children content */
  children: ReactNode;
  /** Disable pull-to-refresh */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowPullToRefresh = forwardRef<HTMLDivElement, PullToRefreshProps>(
  function FlowPullToRefresh({
  refreshing,
  onRefresh,
  threshold = 64,
  pullingText = "Pull to refresh",
  refreshingText = "Refreshing...",
  releaseText = "Release to refresh",
  children,
  disabled = false,
  className = "",
  style,
  ...rest
}, ref) {
  const [pullDistance, setPullDistance] = useState(0);
  const [phase, setPhase] = useState<"idle" | "pulling" | "ready" | "refreshing">("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const pulling = useRef(false);

  const setRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  // Sync phase with refreshing prop (setState during render on prop change)
  const [prevRefreshing, setPrevRefreshing] = useState(refreshing);
  if (refreshing !== prevRefreshing) {
    setPrevRefreshing(refreshing);
    if (refreshing) {
      setPhase("refreshing");
      setPullDistance(threshold);
    } else {
      setPhase("idle");
      setPullDistance(0);
    }
  }

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled || refreshing) return;
      const container = containerRef.current;
      if (!container || container.scrollTop > 0) return;
      startY.current = e.touches[0].clientY;
      pulling.current = true;
    },
    [disabled, refreshing],
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!pulling.current || disabled) return;
      const dy = Math.max(0, (e.touches[0].clientY - startY.current) * 0.5); // damping
      const maxH = 80;
      const clamped = Math.min(dy, maxH);
      setPullDistance(clamped);
      setPhase(clamped >= threshold ? "ready" : "pulling");
    },
    [disabled, threshold],
  );

  const onTouchEnd = useCallback(() => {
    if (!pulling.current) return;
    pulling.current = false;
    if (phase === "ready") {
      onRefresh();
    } else {
      setPullDistance(0);
      setPhase("idle");
    }
  }, [phase, onRefresh]);

  const indicatorText =
    phase === "refreshing" ? refreshingText : phase === "ready" ? releaseText : pullingText;

  return (
    <div
      ref={setRootRef}
      {...rest}
      className={`flow-pull-to-refresh ${className}`}
      style={style}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flow-pull-to-refresh-indicator"
        style={{ height: pullDistance > 0 ? `${pullDistance}px` : "0px" }}
        aria-hidden={pullDistance === 0}
      >
        <Stack gap={1} align="center">
          <FlowCircularProgress
            size="sm"
            value={phase === "refreshing" ? undefined : Math.min(100, (pullDistance / threshold) * 100)}
            aria-label={phase === "refreshing" ? "Refreshing" : "Pull progress"}
            style={{ opacity: pullDistance / threshold }}
          />
          <Text role="caption" className="flow-pull-to-refresh-text">{indicatorText}</Text>
        </Stack>
      </div>
      <div
        className="flow-pull-to-refresh-content"
        role="log"
        aria-live="polite"
        aria-atomic="true"
      >
        {children}
      </div>
    </div>
  );
});
FlowPullToRefresh.displayName = "FlowPullToRefresh";
