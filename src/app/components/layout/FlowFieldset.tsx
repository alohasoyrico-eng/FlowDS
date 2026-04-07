/** FLOW — FlowFieldset (L3 Layout) */
import { type CSSProperties, forwardRef, type ReactNode } from "react";

import { Stack, stateAttrs, Text } from "../../primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FIELDSET — Grouped form controls with legend
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Props for FlowFieldset — groups related form controls under a legend with optional description. */
export interface FieldsetProps {
  /** Fieldset legend text */
  legend: string;
  /** Helper text displayed below the legend */
  description?: string;
  /** Form controls rendered inside the fieldset */
  children: ReactNode;
  /** Whether all child controls are disabled */
  disabled?: boolean;
  /** Whether the fieldset is in an error state */
  error?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowFieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  function FlowFieldset(
    {
      legend,
      description,
      children,
      disabled,
      error,
      className = "",
      style,
      ...rest
    },
    ref,
  ) {
    return (
      <fieldset
        ref={ref}
        {...rest}
        disabled={disabled}
        className={`flow-fieldset ${className}`}
        {...stateAttrs({ disabled: !!disabled, error: !!error })}
        style={{
          border: `var(--sys-frame-border-thin) solid ${error ? "var(--sys-energy-status-error)" : "var(--sys-energy-border-default)"}`,
          borderRadius: "var(--sys-frame-radius-container)",
          padding: "var(--sys-frame-padding-control)",
          margin: 0,
          opacity: disabled ? "var(--sys-state-opacity-disabled)" : 1,
          ...style,
        }}
      >
        <legend
          style={{
            padding: "0 var(--ref-frame-space-2)",
            fontFamily: "var(--ref-voice-family-sans)",
            fontSize: "var(--sys-size-voice-label)",
            fontWeight: "var(--ref-voice-weight-semibold)",
            color: error ? "var(--sys-energy-status-error)" : "var(--sys-energy-text-primary)",
          }}
        >
          {legend}
        </legend>
        {description && (
          <Text role="caption" color="secondary" style={{ marginBottom: "var(--ref-frame-space-3)" }}>
            {description}
          </Text>
        )}
        <Stack gap={3}>{children}</Stack>
      </fieldset>
    );
  },
);
