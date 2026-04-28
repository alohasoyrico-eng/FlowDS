/** FLOW — FlowFAB (L3 Component) */
import "../../css/controls/FAB.css";
import { type CSSProperties, forwardRef, memo } from "react";

import { FlowCircularProgress } from "../feedback/FlowCircularProgress";
import { ActionSurface, FlowIcon, GrowthObserver, useFlowDefaultSize } from "@flow/primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FAB — Floating Action Button
// Primary action for mobile screens. Supports extended variant.
// Composes ActionSurface (L2 primitive) for state resolution,
// aria, disabled/loading handling, and focus ring.
// CSS: .flow-fab
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type FABSize = "sm" | "md" | "lg" | "small" | "standard";
type FABVariant = "primary" | "secondary" | "tertiary";

/** Props for FlowFAB — a floating action button for primary screen actions with extended label variant. */
export interface FABProps {
  /** Icon name */
  icon: string;
  /** Extended label (makes FAB pill-shaped with text) */
  label?: string;
  /** Size variant */
  size?: FABSize;
  /** Color variant */
  variant?: FABVariant;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state — shows spinner and prevents interaction */
  loading?: boolean;
  /** Position: fixed to viewport corner */
  position?: "bottom-right" | "bottom-left" | "bottom-center" | "none";
  /** Accessible label (required when no label prop) */
  "aria-label"?: string;
  /** Button type */
  type?: "button" | "submit" | "reset";
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
  contained?: boolean;
  /** @internal Demo-only: force visual state */
  "data-demo-state"?: "hover" | "focus" | "pressed";
}

const fabIconSize: Record<string, "sm" | "md" | "lg"> = {
  sm: "sm",
  small: "sm",
  md: "md",
  standard: "md",
  lg: "lg",
};

const fabSpinnerSize: Record<string, "sm" | "md"> = {
  sm: "sm",
  small: "sm",
  md: "sm",
  standard: "sm",
  lg: "md",
};

export const FlowFAB = memo(
  forwardRef<HTMLButtonElement, FABProps>(
    (
      {
        icon,
        label,
        size = "md",
        variant = "primary",
        onClick,
        disabled = false,
        loading = false,
        position = "bottom-right",
        "aria-label": ariaLabel,
        type = "button",
        className = "",
        style,
        "data-demo-state": demoState,
        ...rest
      },
      ref,
    ) => {
      // Normalize legacy size aliases before viewport resolution
      const normalizedSize = size === "small" ? "sm" : size === "standard" ? "md" : size;
      const resolvedSize = useFlowDefaultSize(normalizedSize);

      return (
        <GrowthObserver
          event="flow.fab.impression"
          properties={{ size: resolvedSize, variant }}
          inline
        >
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
                    component: "FlowFAB",
                    action: "click",
                  },
                }),
              );
            }}
            aria-label={loading ? "Loading..." : ariaLabel || label || icon}
            className={`flow-fab ${className}`}
            data-size={resolvedSize}
            data-variant={variant}
            data-extended={label ? "" : undefined}
            data-position={position !== "none" ? position : undefined}
            aria-busy={loading || undefined}
            {...(demoState ? { "data-demo-state": demoState } : {})}
            {...rest}
            style={style}
          >
            {loading ? (
              <FlowCircularProgress
                size={fabSpinnerSize[resolvedSize]}
                aria-label="Loading"
                style={{ flexShrink: 0 }}
              />
            ) : (
              <FlowIcon name={icon} size={fabIconSize[resolvedSize]} />
            )}
            {label && !loading && <span className="flow-fab-label">{label}</span>}
          </ActionSurface>
        </GrowthObserver>
      );
    },
  ),
);
FlowFAB.displayName = "FlowFAB";
