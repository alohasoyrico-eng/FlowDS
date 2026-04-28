/** FLOW — FlowButton (L3 Component) */
import "../../css/controls/Button.css";
import { forwardRef, type ReactNode } from "react";

import { FlowCircularProgress } from "../feedback/FlowCircularProgress";
import { ActionSurface, FlowIcon, GrowthObserver, useFlowDefaultSize } from "@flow/primitives";

// ── Shared size maps for child FlowIcon inside controls ──
type ControlSize = "sm" | "md" | "lg" | "xl";
const controlIconSizeMap: Record<ControlSize, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "sm",
  lg: "md",
  xl: "lg",
};
const spinnerSizeMap: Record<ControlSize, "sm" | "md"> = { sm: "sm", md: "sm", lg: "md", xl: "md" };

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BUTTON — composes ActionSurface (L2 primitive)
// ActionSurface provides: resolveState, data-state, disabled/loading
// handling, aria attributes, and the .flow-action-surface CSS reset.
// .flow-btn-v2 CSS drives emphasis variants via [data-variant].
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━

type ButtonVariant = "primary" | "secondary" | "tertiary" | "outlined" | "ghost";
type ButtonIntent = "default" | "danger" | "warning";
type ButtonSize = "sm" | "md" | "lg" | "xl";

/** Props for FlowButton — a multi-variant action button with loading, icon, and full-width support. */
export interface ButtonProps {
  /** Visual variant controlling emphasis level */
  variant?: ButtonVariant;
  /** Semantic intent — danger or warning override variant colors */
  intent?: ButtonIntent;
  /** Button size variant */
  size?: ButtonSize;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Optional label to show during loading state. If omitted, maintains original children text. */
  loadingLabel?: ReactNode;
  /** Whether the button spans the full width of its container */
  fullWidth?: boolean;
  /** Button content (label text or elements) */
  children: ReactNode;
  /** Callback fired when the button is clicked */
  onClick?: () => void;
  /** HTML button type attribute */
  type?: "button" | "submit" | "reset";
  /** Additional CSS class names */
  className?: string;
  /** Icon name displayed before the label */
  leadingIcon?: string;
  /** Demo-only attribute to force a visual state */
  "data-demo-state"?: string;
}

export const FlowButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      intent,
      size,
      disabled,
      loading,
      loadingLabel,
      fullWidth,
      children,
      onClick,
      type = "button",
      className = "",
      leadingIcon,
      "data-demo-state": demoState,
      ...rest
    },
    ref,
  ) => {
    const resolvedSize = useFlowDefaultSize(size);
    const displayText = loading && loadingLabel ? loadingLabel : children;
    const ariaLabelText = loading
      ? typeof loadingLabel === "string"
        ? loadingLabel
        : typeof children === "string"
          ? children
          : "Loading..."
      : undefined;

    return (
      <GrowthObserver event="flow.button.impression" properties={{ size: resolvedSize }} inline>
        <ActionSurface
          ref={ref}
          type={type}
          disabled={disabled}
          loading={loading}
          onPress={() => {
            onClick?.();
            document.dispatchEvent(
              new CustomEvent("flow:interaction", {
                detail: {
                  event: "flow.component.interaction",
                  component: "FlowButton",
                  action: "click",
                },
              }),
            );
          }}
          aria-label={ariaLabelText}
          className={`flow-btn-v2 flow-button ${className}`}
          data-variant={variant}
          data-intent={intent && intent !== "default" ? intent : undefined}
          data-size={resolvedSize}
          {...(fullWidth ? { "data-full-width": "" } : {})}
          {...(demoState ? { "data-demo-state": demoState } : {})}
          {...rest}
        >
          {loading ? (
            <FlowCircularProgress
              size={spinnerSizeMap[resolvedSize]}
              aria-label="Loading"
              style={{ flexShrink: 0 }}
            />
          ) : (
            leadingIcon && <FlowIcon name={leadingIcon} size={controlIconSizeMap[resolvedSize]} />
          )}
          <span className="flow-btn-label">{displayText}</span>
        </ActionSurface>
      </GrowthObserver>
    );
  },
);
FlowButton.displayName = "FlowButton";
