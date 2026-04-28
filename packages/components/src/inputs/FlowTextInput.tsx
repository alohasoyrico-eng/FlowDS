/** FLOW — FlowTextInput (L3 Component) */
import {
  type CSSProperties,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { FlowCircularProgress } from "../feedback/FlowCircularProgress";
import {
  ActionSurface,
  FlowIcon,
  GrowthObserver,
  stateAttrs,
  Text,
  useFlowDefaultSize,
} from "@flow/primitives";

// ── Shared size maps for child FlowIcon inside controls ──
type ControlSize = "sm" | "md" | "lg" | "xl";
const controlIconSizeMap: Record<ControlSize, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "sm",
  lg: "md",
  xl: "lg",
};
const hintIconSizeMap: Record<ControlSize, "xs" | "sm" | "md"> = {
  sm: "sm",
  md: "sm",
  lg: "sm",
  xl: "md",
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEXT INPUT — Figma Edenred floating-label input
// Tall (64px) with animated floating label, progressive border-width,
// optional clear button, and hint/error text. CSS-driven states via
// data-attributes; zero inline styles for state changes.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type TextInputSize = "sm" | "md" | "lg" | "xl";

/** Props for FlowTextInput — a single-line floating-label text input with validation and clearable support. */
export interface TextInputProps {
  /** Floating label text — recommended for accessibility; omit only when aria-label or placeholder provides context */
  label?: string;
  /** Helper/hint text below the input */
  hint?: string;
  /** Error message — triggers error state + replaces hint */
  error?: string;
  /** Success indicator — green border + optional check icon in hint */
  success?: boolean;
  /** Loading indicator — shows spinner in trailing position */
  loading?: boolean;
  /** Control size — sm/md/lg/xl. Omit to inherit from parent [data-size] (e.g. FlowDialog). Standalone defaults to xl via :root tokens. */
  size?: TextInputSize;
  /** Input type — text, email, password, tel, url, search, number */
  type?: string;
  /** Controlled value */
  value?: string;
  /** Uncontrolled default value */
  defaultValue?: string;
  /** Change handler — receives string value */
  onChange?: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
  /** Show clear button (×) when input has value */
  clearable?: boolean;
  /** Callback when clear button is pressed */
  onClear?: () => void;
  /** Leading icon — lucide-react icon name (e.g. "search", "mail") */
  leadingIcon?: string;
  /** Trailing icon — lucide-react icon name (e.g. "eye", "calendar") */
  trailingIcon?: string;
  /** Static prefix text (e.g. "$", "https://") — shown before input value */
  prefix?: string;
  /** Static suffix text (e.g. "USD", "kg") — shown after input value */
  suffix?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Placeholder text shown when empty */
  placeholder?: string;
  /** Form field name */
  name?: string;
  /** HTML id attribute (auto-generated if omitted) */
  id?: string;
  /** Whether to focus the input on mount */
  autoFocus?: boolean;
  /** Accessible label — use when no visible label is provided */
  "aria-label"?: string;
  /** Render as textarea for multi-line input */
  multiline?: boolean;
  /** Number of rows for textarea */
  rows?: number;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowTextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      hint,
      error,
      success,
      loading,
      size,
      type = "text",
      value: controlledValue,
      defaultValue,
      onChange,
      clearable = false,
      onClear,
      leadingIcon,
      trailingIcon,
      prefix,
      suffix,
      disabled = false,
      readOnly = false,
      required,
      placeholder,
      name,
      id: externalId,
      autoFocus,
      "aria-label": ariaLabel,
      className = "",
      style,
      ...rest
    },
    ref,
  ) => {
    const resolvedSize = useFlowDefaultSize(size);
    const generatedId = useId();
    const inputId = externalId || generatedId;
    const hintId = `${inputId}-hint`;

    const innerRef = useRef<HTMLInputElement>(null);
    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        (innerRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      },
      [ref],
    );

    // Controlled / uncontrolled value management
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const currentValue = isControlled ? controlledValue : internalValue;
    const hasValue = currentValue.length > 0;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        if (!isControlled) setInternalValue(newVal);
        onChange?.(newVal, e);
        e.currentTarget.dispatchEvent(
          new CustomEvent("flow:interaction", {
            bubbles: true,
            detail: {
              event: "flow.component.interaction",
              component: "FlowTextInput",
              action: "change",
            },
          }),
        );
      },
      [isControlled, onChange],
    );

    const handleClear = useCallback(() => {
      if (!isControlled) setInternalValue("");
      onClear?.();
      onChange?.("", undefined);
      innerRef.current?.focus();
    }, [isControlled, onClear, onChange]);

    const handleContainerClick = useCallback(() => {
      if (!disabled) innerRef.current?.focus();
    }, [disabled]);

    // Focus on mount when autoFocus is requested (avoids native autoFocus a11y warning)
    useEffect(() => {
      if (autoFocus) {
        innerRef.current?.focus();
      }
    }, [autoFocus]);

    const showHint = !!(hint || error);
    const isError = !!error;
    const isSuccess = !!success && !isError;
    const isLoading = !!loading && !isError;

    return (
      <GrowthObserver event="flow.text-input.impression" properties={{ size: resolvedSize }} inline>
        <div
          className={`flow-text-input ${className}`}
          style={style}
          data-size={resolvedSize}
          {...rest}
          {...stateAttrs({
            disabled,
            error: isError,
            success: isSuccess,
            loading: isLoading,
            readonly: readOnly,
          })}
        >
          {/* Container — the bordered box */}
          <div
            role="presentation"
            className="flow-input-surface flow-text-input-container"
            onClick={handleContainerClick}
            data-has-value={hasValue || undefined}
            data-state={
              disabled
                ? "disabled"
                : isLoading
                  ? "loading"
                  : isError
                    ? "error"
                    : isSuccess
                      ? "success"
                      : undefined
            }
            data-clearable={clearable || undefined}
          >
            {/* Leading icon */}
            {leadingIcon && (
              <span className="flow-text-input-leading-icon" aria-hidden="true">
                <FlowIcon name={leadingIcon} size={controlIconSizeMap[resolvedSize]} />
              </span>
            )}

            {/* Prefix text */}
            {prefix && (
              <span className="flow-text-input-prefix" aria-hidden="true">
                {prefix}
              </span>
            )}

            {/* Body — wraps label + input so label aligns with field text */}
            <div className="flow-text-input-body">
              {/* Floating label */}
              {label && (
                <label className="flow-input-surface-label flow-text-input-label" htmlFor={inputId}>
                  {label}
                </label>
              )}

              {/* Native input */}
              <input
                ref={setRefs}
                id={inputId}
                className="flow-input-surface-field flow-text-input-field"
                type={type}
                name={name}
                value={currentValue}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                aria-required={required || undefined}
                aria-invalid={isError || undefined}
                aria-describedby={showHint ? hintId : undefined}
                aria-label={!label ? ariaLabel : undefined}
                onChange={handleChange}
              />
            </div>

            {/* Suffix text */}
            {suffix && (
              <span className="flow-text-input-suffix" aria-hidden="true">
                {suffix}
              </span>
            )}

            {/* Trailing icon */}
            {trailingIcon && !isLoading && (
              <span className="flow-text-input-trailing-icon" aria-hidden="true">
                <FlowIcon name={trailingIcon} size={controlIconSizeMap[resolvedSize]} />
              </span>
            )}

            {/* Clear button — always rendered when clearable + not disabled
              so flex layout reserves space. Hidden via CSS opacity/pointer-events
              until container has value + hover/focus. */}
            {clearable && !disabled && (
              <ActionSurface
                className="flow-text-input-clear"
                onPress={() => handleClear()}
                aria-label="Clear"
                tabIndex={hasValue ? 0 : -1}
                aria-hidden={!hasValue || undefined}
              >
                <FlowIcon name="close" size={controlIconSizeMap[resolvedSize]} />
              </ActionSurface>
            )}

            {/* Loading spinner */}
            {isLoading && (
              <span className="flow-text-input-loading" aria-hidden="true">
                <FlowCircularProgress size="sm" aria-label="Loading" />
              </span>
            )}
          </div>

          {/* Hint / error text */}
          {showHint && (
            <div
              id={hintId}
              className="flow-input-surface-hint flow-text-input-hint"
              data-state={isError ? "error" : isSuccess ? "success" : undefined}
              role={isError ? "alert" : undefined}
            >
              {isError && <FlowIcon name="warning" size={hintIconSizeMap[resolvedSize]} />}
              {isSuccess && <FlowIcon name="check" size={hintIconSizeMap[resolvedSize]} />}
              <Text
                as="span"
                variant="caption"
                color={isError ? "danger" : isSuccess ? "success" : "secondary"}
              >
                {error || hint}
              </Text>
            </div>
          )}
        </div>
      </GrowthObserver>
    );
  },
);
FlowTextInput.displayName = "FlowTextInput";
