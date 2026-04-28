/** FLOW — FlowKPICard (L4 Pattern) */
import "../css/KPICard.css";
import { type CSSProperties, forwardRef } from "react";

import { FlowSkeleton } from "@flow/components";
import {
  FlowIcon,
  GrowthObserver,
  Inline,
  Stack,
  Surface,
  Text,
  type Tone,
  useFlowDefaultSize,
} from "@flow/primitives";
// L4 composes: FlowCard (L3 display), FlowSkeleton (L3 feedback)

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// KPI CARD — Key Performance Indicator display
// Shows metric value + label + trend indicator
// CSS: .flow-kpi-card
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type KPITrend = "up" | "down" | "neutral";
type KPISize = "sm" | "md" | "lg";

/** Props for FlowKPICard — key performance indicator card showing a metric value, label, and trend. */
export interface KPICardProps {
  /** Main metric value */
  value: string | number;
  /** Metric label */
  label: string;
  /** Optional description / subtitle */
  description?: string;
  /** Trend direction */
  trend?: KPITrend;
  /** Trend value text (e.g. "+12.5%") */
  trendValue?: string;
  /** Whether "up" trend is positive (green) or negative (red). Default: true */
  upIsGood?: boolean;
  /** Leading icon name */
  icon?: string;
  /** Size variant */
  size?: KPISize;
  /** Loading state — shows skeleton */
  loading?: boolean;
  /** Error state */
  error?: boolean;
  /** Click handler — makes card interactive */
  onClick?: () => void;
  /** Tone variant */
  tone?: Tone;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowKPICard = forwardRef<HTMLDivElement, KPICardProps>(function FlowKPICard(
  {
    value,
    label,
    description,
    trend,
    trendValue,
    upIsGood = true,
    icon,
    size = "md",
    loading = false,
    error = false,
    onClick,
    tone,
    className = "",
    style,
    ...rest
  },
  ref,
) {
  const resolvedSize = useFlowDefaultSize(size);
  const isPositive = trend === "up" ? upIsGood : trend === "down" ? !upIsGood : true;
  const trendColor =
    trend === "neutral" || !trend
      ? "var(--sys-energy-text-secondary)"
      : isPositive
        ? "var(--sys-energy-status-success)"
        : "var(--sys-energy-status-error)";

  const trendIcon = trend === "up" ? "trending-up" : trend === "down" ? "trending-down" : "minus";

  const valueFontSize =
    resolvedSize === "sm"
      ? "var(--sys-voice-heading-m-size)"
      : resolvedSize === "lg"
        ? "var(--sys-voice-display-s-size)"
        : "var(--sys-voice-display-xs-size)";
  const padding =
    resolvedSize === "sm"
      ? "var(--sys-frame-padding-control)"
      : resolvedSize === "lg"
        ? "var(--sys-frame-padding-surface)"
        : "var(--sys-frame-padding-container)";

  if (loading) {
    return (
      <Surface
        ref={ref}
        {...rest}
        radius="container"
        border
        className={`flow-kpi-card flow-kpi-card-loading ${className}`}
        style={{ padding, ...style }}
        data-tone={tone}
      >
        <Stack gap={3}>
          <FlowSkeleton variant="text" width="60%" height="var(--comp-kpi-skeleton-label-height)" />
          <FlowSkeleton variant="text" width="40%" height={valueFontSize} />
          <FlowSkeleton variant="text" width="30%" height="var(--comp-kpi-skeleton-trend-height)" />
        </Stack>
      </Surface>
    );
  }

  return (
    <GrowthObserver event="flow.kpi-card.impression" properties={{ size: resolvedSize }} inline>
      <Surface
        ref={ref}
        {...rest}
        radius="container"
        border
        className={`flow-kpi-card ${className}`}
        style={{
          padding,
          cursor: onClick ? "pointer" : undefined,
          transition:
            "box-shadow var(--sys-momentum-duration-fast) var(--sys-momentum-easing-standard), border-color var(--sys-momentum-duration-fast) var(--sys-momentum-easing-standard)",
          ...style,
        }}
        onClick={onClick}
        data-tone={tone}
        data-state={error ? "error" : undefined}
        aria-invalid={error || undefined}
      >
        <Stack gap={2}>
          {/* Header: icon + label */}
          <Inline gap={2} style={{ alignItems: "center" }}>
            {icon && <FlowIcon name={icon} size="sm" color="var(--sys-energy-text-accent)" />}
            <Text variant="overline" color="secondary" tone={tone}>
              {label}
            </Text>
          </Inline>

          {/* Value */}
          <Text
            variant="heading-l"
            tone={tone}
            style={{
              fontSize: valueFontSize,
              fontWeight: "var(--ref-voice-weight-bold)",
              lineHeight: "var(--ref-voice-line-height-tight)",
              letterSpacing: "var(--ref-voice-letter-spacing-tighter)",
            }}
          >
            {value}
          </Text>

          {/* Trend + description */}
          <Inline gap={2} style={{ alignItems: "center" }}>
            {trend && (
              <Inline gap={1} style={{ alignItems: "center", color: trendColor }}>
                <FlowIcon
                  name={trendIcon}
                  size="sm"
                  style={{
                    width: "var(--comp-kpi-trend-indicator-icon-size)",
                    height: "var(--comp-kpi-trend-indicator-icon-size)",
                  }}
                />
                {trendValue && (
                  <Text
                    variant="caption"
                    tone={tone}
                    style={{
                      fontWeight: "var(--ref-voice-weight-medium)",
                      color: trendColor,
                    }}
                  >
                    {trendValue}
                  </Text>
                )}
              </Inline>
            )}
            {description && (
              <Text variant="paragraph-s" color="secondary" tone={tone}>
                {description}
              </Text>
            )}
          </Inline>
        </Stack>
      </Surface>
    </GrowthObserver>
  );
});
FlowKPICard.displayName = "FlowKPICard";
