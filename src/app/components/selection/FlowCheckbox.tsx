/** FLOW — FlowCheckbox + FlowCheckboxGroup (L3 Component) */
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react";

import { GrowthObserver, stateAttrs, Text } from "../../primitives";
import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECKBOX — Pure CSS selection control with 3 states
// Structure: label.flow-checkbox > input(sr-only) + span.flow-checkbox-control > svg
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type CheckboxSize = "sm" | "md" | "lg" | "xl";

/** Props for FlowCheckbox — a tri-state checkbox control with label, validation, and indeterminate support. */
export interface CheckboxProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Uncontrolled default checked */
  defaultChecked?: boolean;
  /** Indeterminate state (parent checkbox pattern) */
  indeterminate?: boolean;
  /** Change handler — receives boolean checked state */
  onChange?: (checked: boolean) => void;
  /** Accessible label text */
  label?: string;
  /** Size variant */
  size?: CheckboxSize;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Error state — turns border/control red for validation */
  error?: boolean;
  /** Success state — turns border/control green for validation */
  success?: boolean;
  /** Loading state — shows spinner instead of check icon */
  loading?: boolean;
  /** Required indicator */
  required?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Accessible label (alternative to label prop) */
  "aria-label"?: string;
}

export const FlowCheckbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  function FlowCheckbox({
    checked,
    defaultChecked,
    indeterminate,
    onChange,
    label,
    size,
    disabled,
    error,
    success,
    loading,
    required,
    className = "",
    "aria-label": ariaLabel,
    ...rest
  }, ref) {
  const resolvedSize = useFlowDefaultSize(size);
  const generatedId = useId();
  const inputId = `checkbox-${generatedId}`;
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync indeterminate property (not possible via JSX attribute)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked);
      window.flowAnalytics?.track?.("flow.component.interaction", {
        component: "FlowCheckbox",
        action: "change",
      });
    },
    [onChange],
  );

  const inner = (
    <GrowthObserver event="flow.checkbox.impression" properties={{ size: resolvedSize }} inline>
    <label
      ref={ref}
      {...rest}
      className={`flow-checkbox ${className}`}
      data-size={resolvedSize}
      {...stateAttrs({
        disabled: !!(disabled || loading),
        error: !!error,
        success: !!success,
        loading: !!loading,
      })}
    >
      <input
        ref={inputRef}
        type="checkbox"
        className="flow-checkbox-input"
        id={inputId}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        disabled={disabled || loading}
        required={required}
        aria-required={required || undefined}
        data-indeterminate={indeterminate || undefined}
        aria-label={!label ? ariaLabel : undefined}
        aria-invalid={error || undefined}
      />
      <span className="flow-checkbox-control">
        {/* Check icon */}
        <svg className="flow-checkbox-icon flow-checkbox-icon-check" viewBox="0 0 16 16">
          <polyline points="3.5 8 6.5 11 12.5 5" />
        </svg>
        {/* Dash icon (indeterminate) */}
        <svg className="flow-checkbox-icon flow-checkbox-icon-dash" viewBox="0 0 16 16">
          <line x1="4" y1="8" x2="12" y2="8" />
        </svg>
      </span>
    </label>
    </GrowthObserver>
  );

  if (label) {
    return (
      <div className="flow-checkbox-wrapper" data-size={resolvedSize}>
        {inner}
        <Text as="label" role="label-m" htmlFor={inputId} className="flow-checkbox-label-text">{label}</Text>
      </div>
    );
  }

  return inner;
}
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECKBOX GROUP — Layout wrapper for checkboxes
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Props for FlowCheckboxGroup — a layout wrapper that groups checkbox children with shared direction and size. */
export interface CheckboxGroupProps {
  children: ReactNode;
  direction?: "row" | "column";
  disabled?: boolean;
  size?: CheckboxSize;
  className?: string;
  "aria-label"?: string;
}

export const FlowCheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  function FlowCheckboxGroup({
    children,
    direction = "column",
    disabled,
    size,
    className = "",
    "aria-label": ariaLabel,
    ...rest
  }, ref) {
  const resolvedSize = useFlowDefaultSize(size);

  return (
    <div
      ref={ref}
      {...rest}
      className={`flow-checkbox-group ${className}`}
      role="group"
      aria-label={ariaLabel}
      data-direction={direction}
      data-size={resolvedSize}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child) && child.type === FlowCheckbox) {
          return cloneElement(child as React.ReactElement<CheckboxProps>, {
            disabled: disabled || child.props.disabled,
            size: child.props.size || resolvedSize,
          });
        }
        return child;
      })}
    </div>
  );
}
);
