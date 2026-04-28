/** FLOW — FlowToolbar (L4 Pattern) */
import "../css/Toolbar.css";
import React, { type CSSProperties, forwardRef, type ReactNode } from "react";
import { GrowthObserver, Inline, useFlowDefaultSize } from "@flow/primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TOOLBAR — Horizontal action bar for desktop
// Groups actions and tools in a horizontal strip.
// CSS: .flow-toolbar
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type ToolbarSize = "sm" | "md" | "lg";

/** Props for FlowToolbar — horizontal action bar for grouping buttons, dividers, and tool controls. */
export interface ToolbarProps {
  /** Toolbar content (buttons, dividers, etc.) */
  children?: ReactNode;
  /** Left-aligned actions */
  leftActions?: ReactNode;
  /** Right-aligned actions */
  rightActions?: ReactNode;
  /** Size variant */
  size?: ToolbarSize;
  /** Show border */
  bordered?: boolean;
  /** Disabled state — disables all toolbar children */
  disabled?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowToolbar = forwardRef<HTMLDivElement, ToolbarProps>(function FlowToolbar(
  {
    children,
    leftActions,
    rightActions,
    size = "md",
    bordered = true,
    disabled = false,
    "aria-label": ariaLabel = "Toolbar",
    className = "",
    style,
    ...rest
  },
  ref,
) {
  const resolvedSize = useFlowDefaultSize(size);
  const hasSlots = leftActions !== undefined || rightActions !== undefined;
  return (
    <GrowthObserver event="flow.toolbar.impression">
      <div
        ref={ref}
        className={`flow-toolbar ${className}`}
        data-size={resolvedSize}
        data-bordered={bordered || undefined}
        data-state={disabled ? "disabled" : undefined}
        role="toolbar"
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        {...(disabled ? { inert: "" as unknown as undefined } : {})}
        {...rest}
        style={style}
      >
        {hasSlots ? (
          <>
            {leftActions && <Inline className="flow-toolbar-left">{leftActions}</Inline>}
            {rightActions && <Inline className="flow-toolbar-right">{rightActions}</Inline>}
          </>
        ) : (
          children
        )}
      </div>
    </GrowthObserver>
  );
});
FlowToolbar.displayName = "FlowToolbar";

/** Separator within a toolbar */
export const FlowToolbarDivider = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function FlowToolbarDivider({ ...rest }, ref) {
    return (
      <div
        ref={ref}
        className="flow-toolbar-divider"
        role="separator"
        aria-orientation="vertical"
        {...rest}
      />
    );
  },
);
FlowToolbarDivider.displayName = "FlowToolbarDivider";

/** Group of items within a toolbar */
export const FlowToolbarGroup = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLDivElement>
>(function FlowToolbarGroup({ children, className = "", ...rest }, ref) {
  return (
    <div ref={ref} className={`flow-toolbar-group ${className}`} role="group" {...rest}>
      {children}
    </div>
  );
});
FlowToolbarGroup.displayName = "FlowToolbarGroup";

/** Spacer pushes trailing items to the end */
export const FlowToolbarSpacer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function FlowToolbarSpacer({ ...rest }, ref) {
    return <div ref={ref} className="flow-toolbar-spacer" {...rest} />;
  },
);
FlowToolbarSpacer.displayName = "FlowToolbarSpacer";
