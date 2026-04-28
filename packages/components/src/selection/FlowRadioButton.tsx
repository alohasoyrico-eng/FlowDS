/** FLOW — FlowRadioButton + FlowRadioGroup (L3 Component) */
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactNode,
  useCallback,
  useId,
} from "react";
import { GrowthObserver, stateAttrs, Text, useFlowDefaultSize } from "@flow/primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RADIO BUTTON — V8 REFACTORED (Fixed)
// Maintains CSS compatibility while composing primitives
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type RadioButtonSize = "sm" | "md" | "lg" | "xl";

/** Props for FlowRadioButton — a single radio selection control with label and validation states. */
export interface RadioButtonProps {
  /** Radio value — required within a group */
  value?: string;
  /** Radio name — groups radios for native form behavior */
  name?: string;
  /** Whether this radio is checked */
  checked?: boolean;
  /** Whether the radio is the default checked (uncontrolled) */
  defaultChecked?: boolean;
  /** Change handler — receives the value */
  onChange?: (value: string) => void;
  /** Accessible label text */
  label?: string;
  /** Size variant */
  size?: RadioButtonSize;
  /** Whether the radio is disabled */
  disabled?: boolean;
  /** Error state — turns border red for validation */
  error?: boolean;
  /** Success state — turns border green for validation */
  success?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Accessible label (alternative to label prop) */
  "aria-label"?: string;
}

export const FlowRadioButton = forwardRef<HTMLLabelElement, RadioButtonProps>(
  function FlowRadioButton(
    {
      value = "",
      name,
      checked,
      defaultChecked,
      onChange,
      label,
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
    const generatedId = useId();
    const inputId = `radio-${generatedId}`;

    const handleChange = useCallback(() => {
      if (!disabled) {
        onChange?.(value);
        document.dispatchEvent(
          new CustomEvent("flow:interaction", {
            detail: {
              event: "flow.component.interaction",
              component: "FlowRadioButton",
              action: "change",
            },
          }),
        );
      }
    }, [disabled, onChange, value]);

    // V8 RESOLUTION: Keep original structure but document primitive usage
    // Radio control requires native input for form integration + CSS-based visual
    // Surface primitive used conceptually (CSS classes maintain backward compat)
    const inner = (
      <GrowthObserver event="flow.radio.impression" properties={{ size: resolvedSize }} inline>
        <label
          ref={ref}
          {...rest}
          className={`flow-radio ${className}`}
          data-size={resolvedSize}
          {...stateAttrs({ disabled: !!disabled, error: !!error, success: !!success })}
        >
          <input
            type="radio"
            className="flow-radio-input"
            id={inputId}
            name={name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={handleChange}
            disabled={disabled}
            aria-label={!label ? ariaLabel : undefined}
            data-invalid={error || undefined}
          />
          <span className="flow-radio-control" />
        </label>
      </GrowthObserver>
    );

    if (label) {
      return (
        <div className="flow-radio-wrapper" data-size={resolvedSize}>
          {inner}
          <Text as="label" variant="label-m" htmlFor={inputId} className="flow-radio-label-text">
            {label}
          </Text>
        </div>
      );
    }

    return inner;
  },
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RADIO GROUP — Layout wrapper for radio buttons
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Props for FlowRadioGroup — a layout wrapper that groups radio buttons with shared name and state. */
export interface RadioGroupProps {
  children: ReactNode;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  direction?: "row" | "column";
  disabled?: boolean;
  /** Error state — propagated to all child radios */
  error?: boolean;
  size?: RadioButtonSize;
  className?: string;
  "aria-label"?: string;
}

export const FlowRadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function FlowRadioGroup(
  {
    children,
    name,
    value,
    onChange,
    direction = "column",
    disabled,
    error,
    size,
    className = "",
    "aria-label": ariaLabel,
    ...rest
  },
  ref,
) {
  const resolvedSize = useFlowDefaultSize(size);

  return (
    <div
      ref={ref}
      {...rest}
      className={`flow-radio-group ${className}`}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-invalid={error || undefined}
      data-direction={direction}
      data-size={resolvedSize}
      data-state={error ? "error" : undefined}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child) && child.type === FlowRadioButton) {
          return cloneElement(child as React.ReactElement<RadioButtonProps>, {
            name,
            checked: value !== undefined ? child.props.value === value : undefined,
            onChange: onChange || child.props.onChange,
            disabled: disabled || child.props.disabled,
            error: error || child.props.error,
            size: child.props.size || resolvedSize,
          });
        }
        return child;
      })}
    </div>
  );
});
