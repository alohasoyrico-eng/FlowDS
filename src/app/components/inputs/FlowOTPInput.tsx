/** FLOW — FlowOTPInput (L4 Pattern) */
import React, {
  type CSSProperties,
  forwardRef,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { GrowthObserver, stateAttrs, Text } from "../../primitives";
import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OTP INPUT — Multi-digit code entry
// Follows WAI pattern: group of single-char inputs
// CSS: .flow-otp-input
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type OTPSize = "sm" | "md" | "lg";

/** Props for FlowOTPInput — multi-digit one-time password input with per-character cells. */
export interface OTPInputProps {
  /** Number of digits */
  length?: number;
  /** Controlled value */
  value?: string;
  /** Change handler — receives full string */
  onChange?: (value: string) => void;
  /** Fires when all digits filled */
  onComplete?: (value: string) => void;
  /** Numeric only vs alphanumeric */
  type?: "numeric" | "alphanumeric";
  /** Size variant */
  size?: OTPSize;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Loading state */
  loading?: boolean;
  /** Label */
  label?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Whether the OTP input is disabled */
  disabled?: boolean;
  /** Auto-focus first input on mount */
  autoFocus?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
  /** Accessible label */
  "aria-label"?: string;
}

export const FlowOTPInput = forwardRef<HTMLDivElement, OTPInputProps>(
  function FlowOTPInput({
  length = 6,
  value: controlledValue,
  onChange,
  onComplete,
  type = "numeric",
  size,
  error,
  errorMessage,
  loading,
  label,
  disabled,
  autoFocus = false,
  className = "",
  style,
  "aria-label": ariaLabel,
  ...rest
}, ref) {
  const groupId = useId();
  const resolvedSize = useFlowDefaultSize(size);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [internalValue, setInternalValue] = useState(() =>
    (controlledValue || "").padEnd(length, ""),
  );
  const val = controlledValue !== undefined ? controlledValue.padEnd(length, "") : internalValue;

  const chars = val.split("").slice(0, length);
  while (chars.length < length) chars.push("");

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const isValidChar = useCallback(
    (c: string): boolean => {
      if (type === "numeric") return /^\d$/.test(c);
      return /^[a-zA-Z0-9]$/.test(c);
    },
    [type],
  );

  const updateValue = useCallback(
    (newChars: string[]) => {
      const str = newChars.join("");
      if (onChange) onChange(str.replace(/ /g, ""));
      else setInternalValue(str);
      const trimmed = str.replace(/ /g, "");
      if (trimmed.length === length && onComplete) {
        onComplete(trimmed);
      }
    },
    [onChange, onComplete, length],
  );

  const handleInput = useCallback(
    (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      // Handle paste
      if (raw.length > 1) {
        const pasted = raw.split("").filter(isValidChar).slice(0, length);
        const newChars = [...chars];
        pasted.forEach((c, i) => {
          if (idx + i < length) newChars[idx + i] = c;
        });
        updateValue(newChars);
        const nextIdx = Math.min(idx + pasted.length, length - 1);
        inputRefs.current[nextIdx]?.focus();
        return;
      }
      const c = raw.slice(-1);
      if (!c || !isValidChar(c)) return;
      const newChars = [...chars];
      newChars[idx] = c;
      updateValue(newChars);
      if (idx < length - 1) inputRefs.current[idx + 1]?.focus();
    },
    [chars, length, isValidChar, updateValue],
  );

  const handleKeyDown = useCallback(
    (idx: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const newChars = [...chars];
        if (chars[idx]) {
          newChars[idx] = "";
          updateValue(newChars);
        } else if (idx > 0) {
          newChars[idx - 1] = "";
          updateValue(newChars);
          inputRefs.current[idx - 1]?.focus();
        }
      } else if (e.key === "ArrowLeft" && idx > 0) {
        inputRefs.current[idx - 1]?.focus();
      } else if (e.key === "ArrowRight" && idx < length - 1) {
        inputRefs.current[idx + 1]?.focus();
      }
    },
    [chars, length, updateValue],
  );

  return (
    <GrowthObserver event="flow.otp-input.impression" properties={{ size: resolvedSize }} inline>
    <div
      ref={ref}
      className={`flow-otp-input ${className}`}
      data-size={resolvedSize}
      style={style}
      {...rest}
      {...stateAttrs({ disabled: !!(disabled || loading), error: !!error, loading: !!loading })}
    >
      {label && (
        <label htmlFor={`${groupId}-0`} className="flow-otp-input-label">
          {label}
        </label>
      )}

      <div
        role="group"
        aria-label={ariaLabel || label || "One-time password"}
        className="flow-otp-input-group"
      >
        {chars.map((c, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            id={`${groupId}-${i}`}
            className="flow-otp-input-cell flow-focusable"
            type="text"
            inputMode={type === "numeric" ? "numeric" : "text"}
            pattern={type === "numeric" ? "\\d*" : undefined}
            maxLength={length}
            value={c || ""}
            onChange={(e) => handleInput(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onFocus={(e) => e.target.select()}
            disabled={disabled || loading}
            aria-label={`Digit ${i + 1}`}
            aria-invalid={error || undefined}
            autoComplete="one-time-code"
            data-filled={c ? true : undefined}
            onPaste={(e) => {
              e.preventDefault();
              const pasted = e.clipboardData
                .getData("text")
                .split("")
                .filter(isValidChar)
                .slice(0, length);
              const newChars = [...chars];
              pasted.forEach((pc, pi) => {
                if (i + pi < length) newChars[i + pi] = pc;
              });
              updateValue(newChars);
              const nextIdx = Math.min(i + pasted.length, length - 1);
              inputRefs.current[nextIdx]?.focus();
            }}
          />
        ))}
      </div>

      {error && errorMessage && (
        <Text role="caption" color="danger">
          {errorMessage}
        </Text>
      )}
    </div>
    </GrowthObserver>
  );
}
);
FlowOTPInput.displayName = "FlowOTPInput";
