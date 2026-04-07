/** FLOW — FlowPopover (L3 Component) */
import {
  type CSSProperties,
  forwardRef,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { useFlowFocusTrap } from "../../hooks/use-flow-focus-trap";
import { ActionSurface, GrowthObserver, Surface } from "../../primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POPOVER — Floating positioned content
// Renders content in a floating panel anchored to a trigger.
// Uses CSS anchor positioning fallback with JS-based positioning.
// CSS: .flow-popover + .flow-popover-content
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type PopoverPlacement = "top" | "bottom" | "left" | "right";
type PopoverAlign = "start" | "center" | "end";

/** Props for FlowPopover — floating content panel anchored to a trigger element with configurable placement. */
export interface PopoverProps {
  /** Trigger element — must be a single element */
  trigger: ReactNode;
  /** Popover content */
  children?: ReactNode;
  /** Placement relative to trigger */
  placement?: PopoverPlacement;
  /** Alignment along the placement axis */
  align?: PopoverAlign;
  /** Controlled open state */
  open?: boolean;
  /** Uncontrolled default open */
  defaultOpen?: boolean;
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;
  /** Close on outside click */
  closeOnOutsideClick?: boolean;
  /** Close on Escape */
  closeOnEscape?: boolean;
  /** Offset from trigger in px */
  offset?: number;
  className?: string;
  style?: CSSProperties;
}

export const FlowPopover = forwardRef<HTMLDivElement, PopoverProps>(
  function FlowPopover(
    {
      trigger,
      children,
      placement = "bottom",
      align = "center",
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      closeOnOutsideClick = true,
      closeOnEscape = true,
      offset = 8,
      className = "",
      style,
      ...rest
    },
    ref,
  ) {
    const isControlled = controlledOpen !== undefined;
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const idPrefix = useId();
    const contentId = `${idPrefix}-popover`;

    const setOpen = useCallback(
      (val: boolean) => {
        if (!isControlled) setInternalOpen(val);
        onOpenChange?.(val);
      },
      [isControlled, onOpenChange],
    );

    const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);
    const close = useCallback(() => setOpen(false), [setOpen]);

    useFlowFocusTrap(contentRef, isOpen, close, { closeOnEscape });

    // Position calculation
    const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    const updatePosition = useCallback(() => {
      if (!triggerRef.current || !contentRef.current) return;
      const tRect = triggerRef.current.getBoundingClientRect();
      const cRect = contentRef.current.getBoundingClientRect();
      let top = 0;
      let left = 0;

      // Primary axis
      switch (placement) {
        case "top":
          top = tRect.top - cRect.height - offset;
          break;
        case "bottom":
          top = tRect.bottom + offset;
          break;
        case "left":
          left = tRect.left - cRect.width - offset;
          break;
        case "right":
          left = tRect.right + offset;
          break;
      }

      // Cross axis alignment
      if (placement === "top" || placement === "bottom") {
        switch (align) {
          case "start":
            left = tRect.left;
            break;
          case "center":
            left = tRect.left + tRect.width / 2 - cRect.width / 2;
            break;
          case "end":
            left = tRect.right - cRect.width;
            break;
        }
      } else {
        switch (align) {
          case "start":
            top = tRect.top;
            break;
          case "center":
            top = tRect.top + tRect.height / 2 - cRect.height / 2;
            break;
          case "end":
            top = tRect.bottom - cRect.height;
            break;
        }
      }

      // Viewport clamping
      top = Math.max(8, Math.min(top, window.innerHeight - cRect.height - 8));
      left = Math.max(8, Math.min(left, window.innerWidth - cRect.width - 8));

      setPos({ top, left });
    }, [placement, align, offset]);

    useEffect(() => {
      if (isOpen) {
        // Use rAF for initial positioning after content renders
        const frame = requestAnimationFrame(updatePosition);
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);
        return () => {
          cancelAnimationFrame(frame);
          window.removeEventListener("scroll", updatePosition, true);
          window.removeEventListener("resize", updatePosition);
        };
      }
    }, [isOpen, updatePosition]);

    // Close on outside click
    useEffect(() => {
      if (!isOpen || !closeOnOutsideClick) return;
      const handler = (e: MouseEvent) => {
        if (
          triggerRef.current?.contains(e.target as Node) ||
          contentRef.current?.contains(e.target as Node)
        )
          return;
        setOpen(false);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [isOpen, closeOnOutsideClick, setOpen]);

    return (
      <GrowthObserver event="flow.popover.impression" properties={{ placement }} inline>
      <div ref={ref} {...rest}>
        { }
        <ActionSurface
          ref={triggerRef}
          className="flow-popover-trigger"
          onPress={toggle}
          aria-expanded={isOpen}
          aria-controls={isOpen ? contentId : undefined}
          aria-haspopup="dialog"
        >
          {trigger}
        </ActionSurface>
        {isOpen && (
          <Surface
            ref={contentRef}
            id={contentId}
            className={`flow-popover-content ${className}`}
            role="dialog"
            tabIndex={-1}
            elevation={2}
            radius="surface"
            padding="container"
            border
            data-placement={placement}
            style={{
              ...style,
              position: "fixed",
              top: pos.top,
              left: pos.left,
              zIndex: "var(--sys-depth-layer-popover, 1000)" as unknown as number,
            }}
          >
            {children}
          </Surface>
        )}
      </div>
      </GrowthObserver>
    );
  },
);
