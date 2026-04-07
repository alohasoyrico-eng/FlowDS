/** FLOW — FlowHoverCard (L4 Pattern) */
import React, { type CSSProperties, forwardRef, type ReactNode, useCallback, useRef, useState } from "react";

import { type Tone } from "../../primitives";
import { FlowCard } from "../display/FlowCard";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HOVER CARD — Rich content tooltip on hover
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Props for FlowHoverCard — displays rich content in a tooltip-style popover on hover. */
export interface HoverCardProps {
  /** Trigger element the hover card is anchored to */
  trigger: ReactNode;
  /** Rich content displayed in the hover card */
  children: ReactNode;
  /** Position of the card relative to the trigger */
  side?: "top" | "bottom" | "left" | "right";
  /** Delay in ms before showing the card */
  openDelay?: number;
  /** Delay in ms before hiding the card */
  closeDelay?: number;
  /** Color tone for the card surface */
  tone?: Tone;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowHoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
  function FlowHoverCard({
  trigger,
  children,
  side = "bottom",
  openDelay = 300,
  closeDelay = 200,
  tone,
  className = "",
  style,
  ...rest
}, ref) {
  const [open, setOpen] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout>>();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);

  const setRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  const show = () => {
    clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => setOpen(true), openDelay);
  };

  const hide = () => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), closeDelay);
  };

  const positionStyles: CSSProperties = {
    position: "absolute",
    zIndex: "var(--sys-depth-layer-tooltip)" as unknown as number,
    ...(side === "bottom" && {
      top: "calc(100% + var(--ref-frame-space-2))",
      left: "50%",
      transform: "translateX(-50%)",
    }),
    ...(side === "top" && {
      bottom: "calc(100% + var(--ref-frame-space-2))",
      left: "50%",
      transform: "translateX(-50%)",
    }),
    ...(side === "left" && {
      right: "calc(100% + var(--ref-frame-space-2))",
      top: "50%",
      transform: "translateY(-50%)",
    }),
    ...(side === "right" && {
      left: "calc(100% + var(--ref-frame-space-2))",
      top: "50%",
      transform: "translateY(-50%)",
    }),
  };

  return (
    <div
      ref={setRootRef}
      {...rest}
      className={`flow-hover-card ${className}`}
      data-tone={tone || undefined}
      style={{ position: "relative", display: "inline-block", ...style }}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {trigger}
      {open && (
        <div role="tooltip" onMouseEnter={show} onMouseLeave={hide} style={positionStyles}>
          <FlowCard
            elevation={2}
            padding="container"
            tone={tone}
            style={{
              minWidth: "var(--comp-hover-card-min-width)",
              maxWidth: "var(--comp-hover-card-max-width)",
            }}
          >
            {children}
          </FlowCard>
        </div>
      )}
    </div>
  );
});
FlowHoverCard.displayName = "FlowHoverCard";
