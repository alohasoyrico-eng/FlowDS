/** FLOW — FlowCircularProgress (L3 Component) */
import "../../css/feedback/CircularProgress.css";
import { type CSSProperties, forwardRef, memo } from "react";
import { GrowthObserver, Text, useFlowDefaultSize } from "@flow/primitives";

type CircularProgressSize = "sm" | "md" | "lg" | "xl" | number;
type CircularProgressStatus = "neutral" | "info" | "success" | "warning" | "error";

/** Props for FlowCircularProgress — a circular progress indicator supporting determinate and indeterminate modes. */
export interface CircularProgressProps {
  /** Current value (0-100). Omit for indeterminate. */
  value?: number;
  /** Maximum value */
  max?: number;
  /** Force indeterminate mode */
  indeterminate?: boolean;
  /** Size */
  size?: CircularProgressSize;
  /** Semantic status color */
  status?: CircularProgressStatus;
  /** Show percentage label (only for determinate, md+ sizes) */
  showLabel?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  className?: string;
  style?: CSSProperties;
}

export const FlowCircularProgress = memo(
  forwardRef<HTMLSpanElement, CircularProgressProps>(function FlowCircularProgress(
    {
      value,
      max = 100,
      size = "md",
      status,
      showLabel = false,
      "aria-label": ariaLabel = "Progress",
      className = "",
      style,
      ...rest
    },
    ref,
  ) {
    const hookSize = useFlowDefaultSize(typeof size === "number" ? "md" : size);
    const resolvedSize = typeof size === "number" ? size : hookSize;
    const isIndeterminate = value === undefined;
    const percentage = isIndeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100));

    // SVG circle math
    const viewBox = 44; // viewBox size
    const center = viewBox / 2;
    const strokeWidth = 4;
    const radius = (viewBox - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = isIndeterminate ? 0 : circumference * (1 - percentage / 100);

    return (
      <GrowthObserver event="flow.circular-progress.impression" properties={{ status }} inline>
        <span
          ref={ref}
          {...rest}
          className={`flow-circular-progress ${className}`}
          data-size={resolvedSize}
          data-indeterminate={isIndeterminate || undefined}
          role="progressbar"
          aria-valuenow={isIndeterminate ? undefined : Math.round(percentage)}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={ariaLabel}
          style={style}
        >
          <svg className="flow-circular-progress-svg" viewBox={`0 0 ${viewBox} ${viewBox}`}>
            <circle className="flow-circular-progress-track" cx={center} cy={center} r={radius} />
            <circle
              className="flow-circular-progress-fill"
              cx={center}
              cy={center}
              r={radius}
              data-status={status || undefined}
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
            />
          </svg>
          {showLabel && !isIndeterminate && resolvedSize !== "sm" && (
            <Text as="span" variant="caption" className="flow-circular-progress-label">
              {Math.round(percentage)}%
            </Text>
          )}
        </span>
      </GrowthObserver>
    );
  }),
);
