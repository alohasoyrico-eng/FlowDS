/** FLOW — FlowProgressBar (L3 Component) */
import { type CSSProperties, forwardRef, memo } from "react";

import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";
import { GrowthObserver, Text } from "../../primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PROGRESS BAR — Determinate + indeterminate
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type ProgressBarSize = "sm" | "md" | "lg" | "xl";
type ProgressBarVariant = "default" | "success" | "warning" | "error";

/** Props for FlowProgressBar — a horizontal progress bar supporting determinate and indeterminate modes. */
export interface ProgressBarProps {
  /** Current value (0-100). Omit for indeterminate. */
  value?: number;
  /** Maximum value */
  max?: number;
  /** Force indeterminate mode */
  indeterminate?: boolean;
  /** Visible label text */
  label?: string;
  /** Size */
  size?: ProgressBarSize;
  /** Color variant */
  variant?: ProgressBarVariant;
  /** Show percentage label */
  showLabel?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowProgressBar = memo(forwardRef<HTMLDivElement, ProgressBarProps>(
  function FlowProgressBar({
    value,
    max = 100,
    size,
    variant = "default",
    showLabel = false,
    "aria-label": ariaLabel = "Progress",
    className = "",
    style,
    ...rest
  }, ref) {
  const resolvedSize = useFlowDefaultSize(size);
  const isIndeterminate = value === undefined;
  const percentage = isIndeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <GrowthObserver event="flow.progress-bar.impression" properties={{ variant }} inline>
    <div ref={ref} {...rest} className={`flow-progress flow-progress-bar ${className}`} data-size={resolvedSize} style={style}>
      <div
        className="flow-progress-track"
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel}
        data-variant={variant}
        data-indeterminate={isIndeterminate || undefined}
      >
        <div
          className="flow-progress-fill"
          style={isIndeterminate ? undefined : { width: `${percentage}%` }}
        />
      </div>
      {showLabel && !isIndeterminate && (
        <Text as="span" role="caption" className="flow-progress-label">{Math.round(percentage)}%</Text>
      )}
    </div>
    </GrowthObserver>
  );
  }
));
