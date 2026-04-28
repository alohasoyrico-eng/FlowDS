/** FLOW — FlowSwitch (L3 Component) */
import { forwardRef, useCallback, useId, useState } from "react";
import { GrowthObserver, stateAttrs, Text, useFlowDefaultSize } from "@flow/primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SWITCH — Toggle control with sliding thumb
// Structure: button[role=switch] > span.track > span.thumb > svg
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type SwitchSize = "sm" | "md" | "lg" | "xl";

/** Props for FlowSwitch — a toggle switch control with sliding thumb and optional label. */
export interface SwitchProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Change handler — receives boolean state */
  onChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Label position relative to switch */
  labelPosition?: "start" | "end";
  /** Size variant */
  size?: SwitchSize;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Error state — turns track/border red for validation */
  error?: boolean;
  /** Success state — turns track green for validation */
  success?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Accessible label */
  "aria-label"?: string;
}

export const FlowSwitch = forwardRef<HTMLButtonElement, SwitchProps>(function FlowSwitch(
  {
    checked: controlledChecked,
    onChange,
    label,
    labelPosition = "end",
    size,
    disabled,
    error,
    success,
    className = "",
    "aria-label": ariaLabel,
    ...rest
  },
  ref,
) {
  const resolvedSize = useFlowDefaultSize(size);
  const labelId = useId();
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const handleToggle = useCallback(() => {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
    document.dispatchEvent(
      new CustomEvent("flow:interaction", {
        detail: { event: "flow.component.interaction", component: "FlowSwitch", action: "toggle" },
      }),
    );
  }, [disabled, isChecked, isControlled, onChange]);

  const switchButton = (
    <GrowthObserver event="flow.switch.impression" properties={{ size: resolvedSize }} inline>
      <button
        ref={ref}
        {...rest}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-label={!label ? ariaLabel || "Toggle" : undefined}
        aria-labelledby={label ? labelId : undefined}
        className={`flow-switch flow-focusable ${className}`}
        disabled={disabled}
        onClick={handleToggle}
        data-size={resolvedSize}
        {...stateAttrs({ disabled: !!disabled, error: !!error, success: !!success })}
      >
        <span className="flow-switch-track">
          <span className="flow-switch-thumb">
            {/* Off icon (x) */}
            <svg className="flow-switch-icon flow-switch-icon-off" viewBox="0 0 16 16">
              <line x1="4" y1="4" x2="12" y2="12" />
              <line x1="12" y1="4" x2="4" y2="12" />
            </svg>
            {/* On icon */}
            <svg className="flow-switch-icon flow-switch-icon-on" viewBox="0 0 16 16">
              <polyline points="3.5 8 6.5 11 12.5 5" />
            </svg>
          </span>
        </span>
      </button>
    </GrowthObserver>
  );

  if (label) {
    return (
      <div
        className="flow-switch-wrapper"
        data-size={resolvedSize}
        style={{
          flexDirection: labelPosition === "start" ? "row-reverse" : "row",
        }}
      >
        {switchButton}
        <Text
          as="span"
          variant="label-m"
          id={labelId}
          className="flow-switch-label-text"
          onClick={disabled ? undefined : handleToggle}
        >
          {label}
        </Text>
      </div>
    );
  }

  return switchButton;
});
