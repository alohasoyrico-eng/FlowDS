/** FLOW — FlowToggleButton, FlowToggleButtonGroup (L3 Component) */
import { type CSSProperties, forwardRef, type ReactNode, useState } from "react";

import { ActionSurface, FlowIcon, GrowthObserver } from "../../primitives";
import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";

type ToggleButtonSize = "sm" | "md" | "lg" | "xl";

/** Props for FlowToggleButton — a pressable toggle button with optional icon and controlled/uncontrolled state. */
export interface ToggleButtonProps {
  /** Pressed state (omit for uncontrolled) */
  pressed?: boolean;
  /** Default pressed state for uncontrolled usage */
  defaultPressed?: boolean;
  /** Change handler */
  onChange?: (pressed: boolean) => void;
  /** Button content */
  children: ReactNode;
  /** Optional icon */
  icon?: string;
  /** Size */
  size?: ToggleButtonSize;
  /** Disabled */
  disabled?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  function FlowToggleButton({
    pressed: pressedProp,
    defaultPressed = false,
    onChange,
    children,
    icon,
    size = "md",
    disabled = false,
    "aria-label": ariaLabel,
    className = "",
    style,
    ...rest
  }, ref) {
  const resolvedSize = useFlowDefaultSize(size);
  const [internalPressed, setInternalPressed] = useState(defaultPressed);
  const isControlled = pressedProp !== undefined;
  const pressed = isControlled ? pressedProp! : internalPressed;
  const iconSize = resolvedSize === "sm" ? "sm" : resolvedSize === "xl" ? "lg" : "md";

  return (
    <GrowthObserver event="flow.toggle-button.impression" properties={{ size: resolvedSize }} inline>
    <ActionSurface
      ref={ref}
      {...rest}
      className={`flow-toggle-button ${className}`}
      data-size={resolvedSize}
      aria-pressed={pressed}
      aria-label={ariaLabel}
      disabled={disabled}
      onPress={() => {
        const next = !pressed;
        if (!isControlled) setInternalPressed(next);
        onChange?.(next);
      }}
      style={style}
    >
      {icon && <FlowIcon name={icon} size={iconSize} />}
      {children}
    </ActionSurface>
    </GrowthObserver>
  );
}
);

/** Props for FlowToggleButtonGroup — a layout wrapper that visually groups toggle buttons in a row. */
export interface ToggleButtonGroupProps {
  /** Group children (FlowToggleButton elements) */
  children: ReactNode;
  /** Accessible label */
  "aria-label"?: string;
  className?: string;
  style?: CSSProperties;
}

export const FlowToggleButtonGroup = forwardRef<HTMLDivElement, ToggleButtonGroupProps>(
  function FlowToggleButtonGroup({
    children,
    "aria-label": ariaLabel = "Toggle group",
    className = "",
    style,
    ...rest
  }, ref) {
  return (
    <div
      ref={ref}
      {...rest}
      className={`flow-toggle-button-group ${className}`}
      role="group"
      aria-label={ariaLabel}
      style={style}
    >
      {children}
    </div>
  );
}
);
