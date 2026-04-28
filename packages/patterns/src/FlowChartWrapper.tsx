/** FLOW — FlowChartWrapper (L4 Pattern) */
import { type CSSProperties, forwardRef, type ReactNode } from "react";

import { GrowthObserver, Inline, Stack, Surface, Text } from "@flow/primitives";
import { FlowCircularProgress } from "@flow/components";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHART WRAPPER — Container for chart libraries
// Provides consistent framing, title, legend area
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Props for FlowChartWrapper — container for chart libraries providing title, legend, and loading/error/empty states. */
export interface ChartWrapperProps {
  /** Chart title text */
  title?: string;
  /** Subtitle below the title */
  subtitle?: string;
  /** Legend content rendered below the chart */
  legend?: ReactNode;
  /** Action elements rendered in the header */
  actions?: ReactNode;
  /** Chart content (chart library output) */
  children?: ReactNode;
  /** Chart area height (number for px, string for CSS value) */
  height?: number | string;
  /** Whether the chart is loading */
  loading?: boolean;
  /** Error state — shows error message in chart area */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Whether the chart has no data */
  empty?: boolean;
  /** Message shown when chart is empty */
  emptyMessage?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowChartWrapper = forwardRef<HTMLDivElement, ChartWrapperProps>(
  function FlowChartWrapper(
    {
      title,
      subtitle,
      legend,
      actions,
      children,
      height = 300,
      loading = false,
      error = false,
      errorMessage: errorMsg = "Failed to load chart",
      empty = false,
      emptyMessage = "No data available",
      className = "",
      style,
      ...rest
    },
    ref,
  ) {
    return (
      <GrowthObserver event="flow.chart-wrapper.impression">
        <Surface
          ref={ref}
          {...rest}
          radius="container"
          border
          padding="control"
          className={`flow-chart-wrapper ${className}`}
          style={style}
          data-state={error ? "error" : loading ? "loading" : undefined}
          aria-invalid={error || undefined}
        >
          <Stack gap="component">
            {/* Header */}
            {(title || actions) && (
              <Inline gap={2} justify="between" align="start">
                <Stack gap={1}>
                  {title && <Text variant="label-m">{title}</Text>}
                  {subtitle && (
                    <Text variant="caption" color="secondary">
                      {subtitle}
                    </Text>
                  )}
                </Stack>
                {actions}
              </Inline>
            )}

            {/* Chart area */}
            <div
              style={{
                position: "relative",
                height: typeof height === "number" ? `${height}px` : height,
                minHeight: 0,
              }}
            >
              {loading ? (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--sys-energy-surface-secondary)",
                    borderRadius: "var(--sys-frame-radius-sm)",
                  }}
                >
                  <FlowCircularProgress size="sm" aria-label="Loading chart" />
                </div>
              ) : error ? (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--sys-energy-surface-secondary)",
                    borderRadius: "var(--sys-frame-radius-sm)",
                  }}
                  role="alert"
                >
                  <Text variant="paragraph-m" color="danger">
                    {errorMsg}
                  </Text>
                </div>
              ) : empty ? (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text variant="paragraph-m" color="tertiary">
                    {emptyMessage}
                  </Text>
                </div>
              ) : (
                children
              )}
            </div>

            {/* Legend */}
            {legend && (
              <Inline gap={3} wrap justify="center">
                {legend}
              </Inline>
            )}
          </Stack>
        </Surface>
      </GrowthObserver>
    );
  },
);
FlowChartWrapper.displayName = "FlowChartWrapper";
