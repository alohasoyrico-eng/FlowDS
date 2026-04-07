/** FLOW — FlowIconButton (L3 Component) */
import { forwardRef, memo } from "react";

import { ActionSurface, FlowIcon, GrowthObserver } from "../../primitives";
import { FlowCircularProgress } from "../feedback/FlowCircularProgress";
import { FlowTooltip } from "../overlays/FlowTooltip";
import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";

// ── Shared size maps ──
type ControlSize = "sm" | "md" | "lg" | "xl";
const spinnerSizeMap: Record<ControlSize, "sm" | "md"> = { sm: "sm", md: "sm", lg: "md", xl: "md" };

type IconButtonVariant =
  | "high"
  | "medium"
  | "low"
  | "outline"
  | "danger"
  | "warning"
  | "ghost"
  | (string & NonNullable<unknown>);
type IconButtonSize = "sm" | "md" | "lg" | "xl";

/** Props for FlowIconButton — an icon-only button with tooltip, badge, and variant support. */
export interface IconButtonProps {
  /** Icon name to display */
  icon: string;
  /** Visual variant */
  variant?: IconButtonVariant;
  /** Control size — sm/md/lg/xl. Omit for density-aware default (compact→md, default→lg, comfortable→xl). */
  size?: IconButtonSize;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Toggle selected state — for toolbar/toggle buttons */
  selected?: boolean;
  /** Accessible label for the icon-only button — strongly recommended for a11y */
  "aria-label"?: string;
  /** Optional badge count/dot indicator on the button */
  badge?: number | boolean;
  /** Optional tooltip shown on hover/focus (CSS-only) */
  tooltip?: string;
  /** Callback fired when the button is clicked */
  onClick?: () => void;
  /** HTML button type attribute */
  type?: "button" | "submit" | "reset";
  /** Additional CSS class names */
  className?: string;
  /** Demo-only attribute to force a visual state */
  "data-demo-state"?: "hover" | "focus" | "pressed";
}

const iconBtnIconSizeMap: Record<IconButtonSize, string> = {
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
};

export const FlowIconButton = memo(forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = "low",
      size,
      disabled,
      loading,
      selected,
      "aria-label": ariaLabel,
      tooltip,
      onClick,
      type = "button",
      className = "",
      "data-demo-state": demoState,
      ...rest
    },
    ref,
  ) => {
    const resolvedSize = useFlowDefaultSize(size);

    const button = (
      <GrowthObserver event="flow.icon-button.impression" properties={{ size: resolvedSize }} inline>
      <ActionSurface
        ref={ref}
        type={type}
        disabled={disabled}
        loading={loading}
        selected={selected}
        onPress={() => {
          onClick?.();
          window.flowAnalytics?.track?.("flow.component.interaction", {
            component: "FlowIconButton",
            action: "click",
          });
        }}
        aria-label={loading ? "Loading..." : ariaLabel}
        className={`flow-icon-btn flow-icon-button ${className}`}
        data-variant={variant}
        data-size={resolvedSize}
        data-selected={selected || undefined}
        aria-pressed={selected != null ? selected : undefined}
        aria-busy={loading || undefined}
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
          <FlowIcon
            name={icon}
            size={iconBtnIconSizeMap[resolvedSize] as "sm" | "md" | "lg" | "xl"}
          />
        )}
      </ActionSurface>
      </GrowthObserver>
    );

    if (tooltip && !loading) {
      return (
        <FlowTooltip content={tooltip} position="top">
          {button}
        </FlowTooltip>
      );
    }

    return button;
  },
));
FlowIconButton.displayName = "FlowIconButton";
