/** FLOW — FlowKPITrendIndicator (L3 Component) */
import "../../css/display/KPITrend.css";
import { type CSSProperties, forwardRef, memo } from "react";

import { FlowIcon, Text } from "@flow/primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// KPI TREND INDICATOR — Inline trend display
// Compact version of KPICard trend section
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type TrendDirection = "up" | "down" | "neutral";

/** Props for FlowKPITrendIndicator — compact inline trend indicator showing directional value change with color-coded semantics. */
export interface KPITrendIndicatorProps {
  value: string;
  direction?: TrendDirection;
  upIsGood?: boolean;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export const FlowKPITrendIndicator = memo(
  forwardRef<HTMLSpanElement, KPITrendIndicatorProps>(function FlowKPITrendIndicator(
    { value, direction = "neutral", upIsGood = true, label, className = "", style, ...rest },
    ref,
  ) {
    const isPositive = direction === "up" ? upIsGood : direction === "down" ? !upIsGood : true;
    const color =
      direction === "neutral"
        ? "var(--sys-energy-text-secondary)"
        : isPositive
          ? "var(--sys-energy-status-success)"
          : "var(--sys-energy-status-error)";

    const iconName =
      direction === "up" ? "trending-up" : direction === "down" ? "trending-down" : "minus";

    return (
      <span
        ref={ref}
        {...rest}
        className={`flow-kpi-trend ${className}`}
        style={{ color, ...style }}
      >
        <FlowIcon name={iconName} size="sm" />
        <Text variant="caption" color="inherit">
          {value}
        </Text>
        {label && (
          <Text variant="caption" color="tertiary">
            {label}
          </Text>
        )}
      </span>
    );
  }),
);
