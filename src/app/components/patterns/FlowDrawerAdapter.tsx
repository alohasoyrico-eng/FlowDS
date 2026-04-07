/** FLOW — FlowDrawerAdapter (L4 Pattern) */
import React, { type CSSProperties, forwardRef, type ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { useFlowFocusTrap } from "../../hooks/use-flow-focus-trap";
import { Inline, Text } from "../../primitives";
import { FlowIconButton } from "../controls/FlowIconButton";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DRAWER ADAPTER — Responsive navigation that morphs across breakpoints
// Desktop: sidebar panel. Mobile: bottom sheet overlay.
// CSS: .flow-drawer-adapter
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Props for FlowDrawerAdapter — responsive navigation drawer that renders as an inline sidebar on desktop and a bottom-sheet overlay on mobile. */
export interface DrawerAdapterProps {
  /** Whether the drawer is open (mobile: overlay, desktop: inline) */
  open: boolean;
  /** Close handler */
  onClose: () => void;
  /** Breakpoint at which to switch from overlay to inline (px) */
  breakpoint?: number;
  /** Side of the screen the drawer appears on */
  side?: "left" | "right";
  /** Width of the drawer (desktop inline mode) */
  width?: string;
  /** Drawer content */
  children: ReactNode;
  /** Optional title */
  title?: ReactNode;
  /** Show close button */
  showClose?: boolean;
  /** Close on overlay click (mobile only) */
  closeOnOverlay?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowDrawerAdapter = forwardRef<HTMLElement, DrawerAdapterProps>(
  function FlowDrawerAdapter({
  open,
  onClose,
  breakpoint = 768,
  side = "left",
  width = "var(--sys-frame-sidebar-expanded)",
  children,
  title,
  showClose = true,
  closeOnOverlay = true,
  "aria-label": ariaLabel,
  className = "",
  style,
  ...rest
}, ref) {
  const [isMobile, setIsMobile] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);

  const setRootRef = useCallback(
    (node: HTMLElement | null) => {
      (drawerRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    },
    [ref],
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  // Focus trap + escape (mobile overlay only)
  useFlowFocusTrap(drawerRef, open && isMobile, onClose);

  // Desktop inline mode
  if (!isMobile) {
    return (
      <aside
        ref={setRootRef}
        {...rest}
        className={`flow-drawer-adapter flow-drawer-inline ${className}`}
        data-open={open || undefined}
        data-side={side}
        aria-label={ariaLabel}
        style={{
          width: open ? width : "0",
          overflow: "hidden",
          transition:
            "width var(--sys-momentum-duration-normal) var(--sys-momentum-easing-standard)",
          borderRight:
            side === "left"
              ? "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)"
              : undefined,
          borderLeft:
            side === "right"
              ? "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)"
              : undefined,
          ...style,
        }}
      >
        <div style={{ width, minWidth: width }}>
          {title && (
            <Inline
              className="flow-drawer-header"
              align="center"
              justify="between"
              style={{
                padding: "var(--sys-frame-padding-control)",
                borderBottom: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
              }}
            >
              <Text role="heading-m">{title}</Text>
              {showClose && (
                <FlowIconButton
                  icon="x"
                  size="md"
                  variant="ghost"
                  onClick={onClose}
                  aria-label="Close drawer"
                  className="flow-drawer-close"
                />
              )}
            </Inline>
          )}
          <div className="flow-drawer-body" style={{ padding: "var(--sys-frame-padding-control)" }}>
            {children}
          </div>
        </div>
      </aside>
    );
  }

  // Mobile overlay mode
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="flow-drawer-overlay"
        onClick={closeOnOverlay ? onClose : undefined}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--sys-depth-scrim)",
          zIndex: "var(--sys-depth-layer-modal)" as unknown as number,
          opacity: open ? 1 : 0,
          transition:
            "opacity var(--sys-momentum-duration-fast) var(--sys-momentum-easing-standard)",
        }}
      />
      {/* Drawer panel */}
      <aside
        ref={setRootRef}
        {...rest}
        className={`flow-drawer-adapter flow-drawer-overlay-panel ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        data-side={side}
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          [side]: 0,
          width: "min(85vw, var(--comp-drawer-max-width))",
          background: "var(--sys-energy-surface-primary)",
          zIndex: "calc(var(--sys-depth-layer-modal) + 1)" as unknown as number,
          boxShadow: "var(--sys-depth-elevation-high)",
          transform: open ? "translateX(0)" : `translateX(${side === "left" ? "-100%" : "100%"})`,
          transition:
            "transform var(--sys-momentum-duration-normal) var(--sys-momentum-easing-standard)",
          ...style,
        }}
      >
        {title && (
          <Inline
            className="flow-drawer-header"
            align="center"
            justify="between"
            style={{
              padding: "var(--sys-frame-padding-control)",
              borderBottom: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
              minHeight: "var(--comp-drawer-header-height)",
            }}
          >
            <Text role="heading-m">{title}</Text>
            {showClose && (
              <FlowIconButton
                icon="x"
                size="md"
                variant="ghost"
                onClick={onClose}
                aria-label="Close drawer"
                className="flow-drawer-close"
              />
            )}
          </Inline>
        )}
        <div
          className="flow-drawer-body"
          style={{ padding: "var(--sys-frame-padding-control)", overflow: "auto", flex: 1 }}
        >
          {children}
        </div>
      </aside>
    </>
  );
});
FlowDrawerAdapter.displayName = "FlowDrawerAdapter";
