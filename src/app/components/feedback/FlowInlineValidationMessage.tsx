/** FLOW — FlowInlineValidationMessage (L3 Feedback) */
import { type CSSProperties, forwardRef, memo } from "react";

import { FlowIcon, Text } from "../../primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INLINE VALIDATION MESSAGE — error/success/info helper
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type ValidationVariant = "error" | "success" | "warning" | "info";

/** Props for FlowInlineValidationMessage — an inline validation message for error, success, warning, and info feedback. */
export interface InlineValidationMessageProps {
  message: string;
  variant?: ValidationVariant;
  icon?: boolean;
  className?: string;
  style?: CSSProperties;
}

const validationIcons: Record<ValidationVariant, string> = {
  error: "alert-circle",
  success: "check-circle",
  warning: "alert-triangle",
  info: "info",
};

const validationColors: Record<ValidationVariant, string> = {
  error: "var(--sys-energy-status-error)",
  success: "var(--sys-energy-status-success)",
  warning: "var(--sys-energy-status-warning)",
  info: "var(--sys-energy-status-info)",
};

export const FlowInlineValidationMessage = memo(forwardRef<HTMLSpanElement, InlineValidationMessageProps>(
  function FlowInlineValidationMessage({
    message,
    variant = "error",
    icon = true,
    className = "",
    style,
    ...rest
  }, ref) {
  return (
    <span
      ref={ref}
      {...rest}
      className={`flow-inline-validation ${className}`}
      role={variant === "error" ? "alert" : "status"}
      style={{
        color: validationColors[variant],
        ...style,
      }}
    >
      {icon && (
        <FlowIcon
          name={validationIcons[variant]}
          size="sm"
          style={{
            width: "var(--comp-inline-validation-icon-size)",
            height: "var(--comp-inline-validation-icon-size)",
          }}
        />
      )}
      <Text as="span" role="caption" color="inherit">{message}</Text>
    </span>
  );
  }
));
