/** FLOW — FlowBadge (L3 Component) */
import { type CSSProperties, forwardRef, memo, type ReactNode } from "react";

import { GrowthObserver, Text } from "../../primitives";

type BadgeVariant = "dot" | "count" | "label";
type BadgeColor = "default" | "secondary" | "accent" | "success" | "warning" | "error" | "danger";

/** Props for FlowBadge — notification badge rendered as a dot, count, or label anchored to a child element. */
export interface BadgeProps {
  /** Element the badge is anchored to */
  children?: ReactNode;
  /** What to display in the badge (ignored for dot variant) */
  content?: number | string;
  /** Variant — dot (no content), count (number), label (text) */
  variant?: BadgeVariant;
  /** Color theme */
  color?: BadgeColor;
  /** Max count — shows "99+" when exceeded */
  max?: number;
  /** Whether to hide the badge */
  hidden?: boolean;
  /** Whether to show as standalone (no positioning wrapper) */
  standalone?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowBadge = memo(forwardRef<HTMLSpanElement, BadgeProps>(
  function FlowBadge({
    children,
    content,
    variant = "count",
    color = "default",
    max = 99,
    hidden = false,
    standalone = false,
    className = "",
    style,
    ...rest
  }, ref) {
  const displayContent =
    variant === "dot" ? null : typeof content === "number" && content > max ? `${max}+` : content;

  const badge = (
    <GrowthObserver event="flow.badge.impression" properties={{ variant, color }} inline>
    <span
      ref={ref}
      {...rest}
      className={`flow-badge ${standalone ? "flow-badge-standalone" : ""} ${className}`}
      data-variant={variant}
      data-color={color !== "default" ? color : undefined}
      data-hidden={hidden || undefined}
      style={style}
    >
      {displayContent != null && <Text as="span" role="caption" color="inherit">{displayContent}</Text>}
    </span>
    </GrowthObserver>
  );

  if (standalone || !children) return badge;

  return (
    <span className="flow-badge-wrapper">
      {children}
      {badge}
    </span>
  );
}
));
