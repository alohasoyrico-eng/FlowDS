/** FLOW — FlowTopbar (L4 Pattern) */
import "../css/Topbar.css";
import { type CSSProperties, forwardRef, type ReactNode } from "react";

import { GrowthObserver, Inline } from "@flow/primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TOPBAR — Desktop application top bar
// Horizontal bar with title, sections, and action slots.
// CSS: .flow-topbar
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Props for FlowTopbar — application top bar with title, leading section, and trailing actions. */
export interface TopbarProps {
  /** Title text */
  title?: ReactNode;
  /** Leading section (e.g. hamburger, logo) */
  leading?: ReactNode;
  /** Trailing actions section */
  actions?: ReactNode;
  /** Additional sections */
  children?: ReactNode;
  /** Sticky positioning */
  sticky?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowTopbar = forwardRef<HTMLElement, TopbarProps>(function FlowTopbar(
  {
    title,
    leading,
    actions,
    children,
    sticky = false,
    loading = false,
    "aria-label": ariaLabel = "Application top bar",
    className = "",
    style,
    ...rest
  },
  ref,
) {
  return (
    <GrowthObserver event="flow.topbar.impression">
      <header
        ref={ref}
        {...rest}
        className={`flow-topbar ${className}`}
        role="banner"
        aria-label={ariaLabel}
        data-state={loading ? "loading" : undefined}
        aria-busy={loading || undefined}
        style={{
          ...style,
          position: sticky ? "sticky" : undefined,
          top: sticky ? 0 : undefined,
        }}
      >
        {leading && <Inline className="flow-topbar-section">{leading}</Inline>}
        {title && <div className="flow-topbar-title">{title}</div>}
        {children}
        <div className="flow-topbar-spacer" />
        {actions && <Inline className="flow-topbar-actions">{actions}</Inline>}
      </header>
    </GrowthObserver>
  );
});
FlowTopbar.displayName = "FlowTopbar";
