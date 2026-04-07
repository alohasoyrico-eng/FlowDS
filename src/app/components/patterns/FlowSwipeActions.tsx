/** FLOW — FlowSwipeActions (L4 Pattern) */
import React, { type CSSProperties, forwardRef, type ReactNode, useCallback, useRef, useState } from "react";

import { FlowIcon } from "../../primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SWIPE ACTIONS — Swipeable list item with reveal actions
// Touch-driven swipe to reveal action buttons on either side.
// CSS: .flow-swipe-actions
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type SwipeActionVariant = "danger" | "success" | "warning" | "default";

export interface SwipeAction {
  /** Unique key */
  key?: string;
  /** Label */
  label: string;
  /** Icon name */
  icon?: string;
  /** Color variant */
  variant?: SwipeActionVariant;
  /** Click handler */
  onAction?: () => void;
  /** Alias for onAction */
  onClick?: () => void;
}

/** Props for FlowSwipeActions — swipeable list item that reveals action buttons on left or right swipe. */
export interface SwipeActionsProps {
  /** Content to swipe */
  children: ReactNode;
  /** Actions revealed on swipe left (right side) */
  leftActions?: SwipeAction[];
  /** Actions revealed on swipe right (left side) */
  rightActions?: SwipeAction[];
  /** Swipe threshold before snapping open */
  threshold?: number;
  /** Disabled */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowSwipeActions = forwardRef<HTMLDivElement, SwipeActionsProps>(
  function FlowSwipeActions({
  children,
  leftActions = [],
  rightActions = [],
  threshold = 80,
  disabled = false,
  className = "",
  style,
  ...rest
}, ref) {
  const [offsetX, setOffsetX] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [_snapped, setSnapped] = useState<"left" | "right" | null>(null);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const isDragging = useRef(false);

  const maxLeft = rightActions.length * 72;
  const maxRight = leftActions.length * 72;

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      isDragging.current = true;
      startX.current = e.clientX;
      startOffset.current = offsetX;
      setSwiping(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [disabled, offsetX],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - startX.current + startOffset.current;
      // Clamp: negative = swipe left (reveal right actions), positive = swipe right (reveal left actions)
      const clamped = Math.max(-maxLeft, Math.min(maxRight, dx));
      setOffsetX(clamped);
    },
    [maxLeft, maxRight],
  );

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
    setSwiping(false);

    if (offsetX < -threshold && rightActions.length > 0) {
      setOffsetX(-maxLeft);
      setSnapped("right");
    } else if (offsetX > threshold && leftActions.length > 0) {
      setOffsetX(maxRight);
      setSnapped("left");
    } else {
      setOffsetX(0);
      setSnapped(null);
    }
  }, [offsetX, threshold, rightActions.length, leftActions.length, maxLeft, maxRight]);

  const close = useCallback(() => {
    setOffsetX(0);
    setSnapped(null);
  }, []);

  // NOTE: Swipe action buttons intentionally use raw <button> elements rather than
  // FlowButton because their CSS (.flow-swipe-action-btn[data-variant]) is tightly
  // coupled to this specific DOM structure and variant data-attribute. Composing
  // FlowButton would introduce conflicting styles from .flow-btn-v2 and require
  // CSS changes (swipe-action variants vs FlowButton data-variant), which is outside the scope of
  // this refactor. Migrate when swipe-action CSS is reconciled with FlowButton tokens.
  const renderActions = (actions: SwipeAction[], side: "left" | "right") => (
    <div className="flow-swipe-actions-panel" data-side={side}>
      {actions.map((action) => (
        <button
          key={action.key}
          type="button"
          className="flow-swipe-action-btn flow-focusable"
          data-variant={action.variant || "default"}
          aria-label={action.label}
          onClick={() => {
            action.onAction?.();
            close();
          }}
        >
          {action.icon && <FlowIcon name={action.icon} size="sm" />}
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div ref={ref} {...rest} className={`flow-swipe-actions ${className}`} style={style}>
      {leftActions.length > 0 && renderActions(leftActions, "left")}
      {rightActions.length > 0 && renderActions(rightActions, "right")}
      <div
        className="flow-swipe-actions-content"
        data-swiping={swiping || undefined}
        style={{ transform: `translateX(${offsetX}px)` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {children}
      </div>
    </div>
  );
});
FlowSwipeActions.displayName = "FlowSwipeActions";
