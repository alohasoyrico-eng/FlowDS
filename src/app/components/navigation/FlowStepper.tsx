/** FLOW — FlowStepper (L3 Component) */
import { type CSSProperties, forwardRef } from "react";

import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";
import { FlowIcon, GrowthObserver, Text } from "../../primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEPPER — Multi-step wizard navigation
// Implements WAI-ARIA step indicator pattern.
// CSS: .flow-stepper + .flow-stepper-step
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type StepperSize = "sm" | "md" | "lg" | "xl";
type StepStatus = "complete" | "current" | "upcoming" | "error";
type StepperOrientation = "horizontal" | "vertical";

export interface StepperStep {
  /** Unique key */
  key: string;
  /** Step label */
  label: string;
  /** Optional description */
  description?: string;
  /** Optional icon override (defaults to step number) */
  icon?: string;
  /** Force error state */
  error?: boolean;
}

/** Props for FlowStepper — multi-step wizard progress indicator with clickable completed steps. */
export interface StepperProps {
  /** Steps definition */
  steps: StepperStep[];
  /** Current active step index (0-based) */
  activeStep: number;
  /** Step click handler (for non-linear steppers) */
  onStepClick?: (index: number) => void;
  /** Allow clicking on completed steps */
  clickable?: boolean;
  /** Orientation */
  orientation?: StepperOrientation;
  /** Size variant */
  size?: StepperSize;
  /** Disabled state — prevents all step interaction */
  disabled?: boolean;
  /** Loading state — shows indicator, prevents interaction */
  loading?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowStepper = forwardRef<HTMLElement, StepperProps>(
  function FlowStepper({
    steps,
    activeStep,
    onStepClick,
    clickable = false,
    orientation = "horizontal",
    size = "md",
    disabled = false,
    loading = false,
    "aria-label": ariaLabel = "Progress",
    className = "",
    style,
    ...rest
  }, ref) {
  const resolvedSize = useFlowDefaultSize(size);

  const getStatus = (index: number, step: StepperStep): StepStatus => {
    if (step.error) return "error";
    if (index < activeStep) return "complete";
    if (index === activeStep) return "current";
    return "upcoming";
  };

  return (
    <GrowthObserver event="flow.stepper.impression" properties={{ orientation, size: resolvedSize }} inline>
    <nav
      ref={ref}
      {...rest}
      className={`flow-stepper ${className}`}
      data-orientation={orientation}
      data-size={resolvedSize}
      data-state={disabled ? "disabled" : loading ? "loading" : undefined}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      style={style}
    >
      <ol className="flow-stepper-list">
        {steps.map((step, index) => {
          const status = getStatus(index, step);
          const isClickable = clickable && status === "complete" && onStepClick && !disabled && !loading;
          const isLast = index === steps.length - 1;

          return (
            <li
              key={step.key ?? `step-${index}`}
              className="flow-stepper-step"
              data-status={status}
              data-last={isLast || undefined}
              aria-current={status === "current" ? "step" : undefined}
            >
              <button
                type="button"
                className="flow-stepper-indicator flow-focusable"
                data-status={status}
                disabled={!isClickable || disabled || loading}
                onClick={() => isClickable && onStepClick!(index)}
                tabIndex={isClickable ? 0 : -1}
                aria-label={`Step ${index + 1}: ${step.label}${status === "complete" ? " (completed)" : status === "error" ? " (error)" : ""}`}
              >
                {status === "complete" ? (
                  <FlowIcon name="check" size="sm" />
                ) : status === "error" ? (
                  <FlowIcon name="alert-triangle" size="sm" />
                ) : step.icon ? (
                  <FlowIcon name={step.icon} size="sm" />
                ) : (
                  <span className="flow-stepper-number">{index + 1}</span>
                )}
              </button>

              <div className="flow-stepper-content">
                <Text as="span" role="label-m" className="flow-stepper-label" data-status={status}>
                  {step.label}
                </Text>
                {step.description && (
                  <Text as="span" role="paragraph-s" color="secondary" className="flow-stepper-description">{step.description}</Text>
                )}
              </div>

              {!isLast && (
                <div
                  className="flow-stepper-connector"
                  data-status={status === "complete" ? "complete" : "upcoming"}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
      {loading && (
        <div className="flow-stepper-loading" aria-hidden="true">
          <FlowIcon name="loader" size="sm" />
        </div>
      )}
    </nav>
    </GrowthObserver>
  );
  }
);
