/** FLOW — FlowTextArea (L3 Component) */
import React, {
  type CSSProperties,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { FlowCircularProgress } from "../feedback/FlowCircularProgress";
import { FlowIcon, GrowthObserver, stateAttrs, Text, useFlowDefaultSize } from "@flow/primitives";

// ── Shared size maps for child FlowIcon inside input-family controls ──
type InputControlSize = "sm" | "md" | "lg" | "xl";
const hintIconSizeMap: Record<InputControlSize, "xs" | "sm" | "md"> = {
  sm: "sm",
  md: "sm",
  lg: "sm",
  xl: "md",
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEXT AREA — Multi-line floating-label input
// Shares textInput comp tokens. Renders <textarea> instead of <input>.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type TextAreaSize = "sm" | "md" | "lg" | "xl";

/** Props for FlowTextArea — a multi-line floating-label textarea with validation and character count. */
export interface TextAreaProps {
  /** Floating label text */
  label: string;
  /** Helper/hint text below the textarea */
  hint?: string;
  /** Error message — triggers error state */
  error?: string;
  /** Success indicator */
  success?: boolean;
  /** Loading indicator — shows spinner */
  loading?: boolean;
  /** Control size (affects padding/typography, not height) */
  size?: TextAreaSize;
  /** Number of visible text rows */
  rows?: number;
  /** Allow vertical resize */
  resize?: "none" | "vertical" | "both";
  /** Controlled value */
  value?: string;
  /** Uncontrolled default value */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Max character count (shows counter) */
  maxLength?: number;
  /** Whether the textarea is disabled */
  disabled?: boolean;
  /** Whether the textarea is read-only */
  readOnly?: boolean;
  /** Placeholder text shown when empty */
  placeholder?: string;
  /** Form field name */
  name?: string;
  /** HTML id attribute (auto-generated if omitted) */
  id?: string;
  /** Whether to focus the textarea on mount */
  autoFocus?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowTextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      hint,
      error,
      success,
      loading,
      size,
      rows = 4,
      resize = "vertical",
      value: controlledValue,
      defaultValue,
      onChange,
      maxLength,
      disabled = false,
      readOnly = false,
      placeholder,
      name,
      id: externalId,
      autoFocus,
      className = "",
      style,
      ...rest
    },
    ref,
  ) => {
    const resolvedSize = useFlowDefaultSize(size);
    const generatedId = useId();
    const textareaId = externalId || generatedId;
    const hintId = `${textareaId}-hint`;

    const innerRef = useRef<HTMLTextAreaElement>(null);
    const setRefs = useCallback(
      (node: HTMLTextAreaElement | null) => {
        (innerRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      },
      [ref],
    );

    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const currentValue = isControlled ? controlledValue : internalValue;
    const hasValue = currentValue.length > 0;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newVal = e.target.value;
        if (!isControlled) setInternalValue(newVal);
        onChange?.(newVal, e);
        e.currentTarget.dispatchEvent(
          new CustomEvent("flow:interaction", {
            bubbles: true,
            detail: {
              event: "flow.component.interaction",
              component: "FlowTextArea",
              action: "change",
            },
          }),
        );
      },
      [isControlled, onChange],
    );

    const handleContainerClick = useCallback(() => {
      if (!disabled) innerRef.current?.focus();
    }, [disabled]);

    // Focus on mount when autoFocus is requested (avoids native autoFocus a11y warning)
    useEffect(() => {
      if (autoFocus) innerRef.current?.focus();
    }, [autoFocus]);

    const showHint = !!(hint || error);
    const isError = !!error;
    const isSuccess = !!success && !isError;
    const isLoading = !!loading && !isError;

    return (
      <GrowthObserver event="flow.text-area.impression" properties={{ size: resolvedSize }} inline>
        <div
          className={`flow-textarea ${className}`}
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
          <div
            role="presentation"
            className="flow-input-surface flow-textarea-container"
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
          >
            <label className="flow-input-surface-label flow-textarea-label" htmlFor={textareaId}>
              {label}
            </label>
            {}
            <textarea
              ref={setRefs}
              id={textareaId}
              className="flow-textarea-field"
              name={name}
              value={currentValue}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              rows={rows}
              maxLength={maxLength}
              aria-invalid={isError || undefined}
              aria-describedby={showHint ? hintId : undefined}
              onChange={handleChange}
              style={{ resize }}
            />
            {/* Loading spinner */}
            {isLoading && (
              <span className="flow-textarea-loading" aria-hidden="true">
                <FlowCircularProgress size="sm" aria-label="Loading" />
              </span>
            )}
          </div>
          {/* Hint / error / counter */}
          <div className="flow-textarea-footer">
            {showHint && (
              <div
                id={hintId}
                className="flow-input-surface-hint flow-textarea-hint"
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
            {maxLength != null && (
              <span
                className="flow-textarea-counter"
                data-over={currentValue.length > maxLength || undefined}
              >
                <Text as="span" variant="caption" color="secondary">
                  {currentValue.length}/{maxLength}
                </Text>
              </span>
            )}
          </div>
        </div>
      </GrowthObserver>
    );
  },
);
FlowTextArea.displayName = "FlowTextArea";
