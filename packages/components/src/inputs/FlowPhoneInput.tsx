/** FLOW — FlowPhoneInput (L3 Component) */
import { type CSSProperties, forwardRef, useCallback, useId, useRef, useState } from "react";

import { type FlagEntry } from "@flow/flags";
import { CountryDropdownPanel, useCountryPicker } from "./_internal/country-picker";
import { FlowCircularProgress } from "../feedback/FlowCircularProgress";
import { FlowFlag, FlowIcon, stateAttrs, useFlowDefaultSize } from "@flow/primitives";

// ── Shared size maps for child FlowIcon / FlowFlag inside controls ──
type ControlSize = "sm" | "md" | "lg" | "xl";
const controlFlagSizeMap: Record<ControlSize, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "sm",
  lg: "md",
  xl: "lg",
};
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
// PHONE INPUT — Phone number with country flag
// Composes FlowTextInput anatomy + FlowFlag prefix
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type PhoneInputSize = "sm" | "md" | "lg" | "xl";

/** Props for FlowPhoneInput — phone number input with country flag selector and dial code prefix. */
export interface PhoneInputProps {
  /** Floating label text */
  label: string;
  /** Helper text below the input */
  hint?: string;
  /** Error message — triggers error state */
  error?: string;
  /** Success indicator */
  success?: boolean;
  /** Loading state — shows spinner */
  loading?: boolean;
  /** Control size variant */
  size?: PhoneInputSize;
  /** Controlled phone number value */
  value?: string;
  /** Default phone number (uncontrolled) */
  defaultValue?: string;
  /** Callback fired when the phone number changes */
  onChange?: (value: string) => void;
  /** ISO country code for the flag prefix */
  country?: string;
  /** Callback fired when the country changes */
  onCountryChange?: (entry: FlagEntry) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Form field name */
  name?: string;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowPhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      label,
      hint,
      error,
      success,
      loading,
      size,
      value: controlledValue,
      defaultValue,
      onChange,
      country: controlledCountry = "FR",
      onCountryChange,
      disabled = false,
      readOnly = false,
      placeholder,
      name,
      id: externalId,
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

    const containerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLInputElement>(null);
    const prefixRef = useRef<HTMLButtonElement>(null);

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        (innerRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      },
      [ref],
    );

    // Value management
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const currentValue = isControlled ? controlledValue : internalValue;
    const hasValue = currentValue.length > 0;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        if (!isControlled) setInternalValue(newVal);
        onChange?.(newVal);
      },
      [isControlled, onChange],
    );

    // Country picker
    const picker = useCountryPicker({
      controlledCountry,
      disabled,
      readOnly,
      onCountryChange,
      containerRef: containerRef as React.RefObject<HTMLElement>,
      focusOnClose: innerRef as React.RefObject<HTMLElement>,
    });

    const showHint = !!(hint || error);
    const isError = !!error;
    const isSuccess = !!success && !isError;
    const isLoading = !!loading && !isError;

    return (
      <div
        className={`flow-phone-input ${className}`}
        style={style}
        ref={containerRef}
        data-size={resolvedSize}
        {...rest}
        {...stateAttrs({ disabled, error: isError, success: isSuccess, loading: isLoading })}
      >
        {/* Container */}
        <div
          className="flow-input-surface flow-phone-input-container"
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
          {/* Country prefix button */}
          <button
            ref={prefixRef}
            type="button"
            className="flow-phone-input-prefix"
            onClick={picker.toggleDropdown}
            disabled={disabled}
            aria-expanded={picker.dropdownOpen}
            aria-label={`Country: ${picker.currentCountry.name}`}
            tabIndex={disabled ? -1 : 0}
          >
            <FlowFlag code={picker.currentCode} size={controlFlagSizeMap[resolvedSize]} />
            <span>{picker.currentCountry.dial}</span>
            <FlowIcon
              name="chevron-down"
              size={controlIconSizeMap[resolvedSize]}
              className="flow-phone-input-chevron"
            />
          </button>

          {/* Vertical divider */}
          <span className="flow-phone-input-divider" />

          {/* Input body */}
          <div className="flow-phone-input-body">
            <label className="flow-input-surface-label flow-phone-input-label" htmlFor={inputId}>
              {label}
            </label>
            <input
              ref={setRefs}
              id={inputId}
              className="flow-input-surface-field flow-phone-input-field"
              type="tel"
              name={name}
              value={currentValue}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              aria-invalid={isError || undefined}
              aria-describedby={showHint ? hintId : undefined}
              onChange={handleChange}
            />
          </div>

          {/* Loading spinner */}
          {isLoading && (
            <span className="flow-phone-input-loading" aria-hidden="true">
              <FlowCircularProgress size="sm" aria-label="Loading" />
            </span>
          )}

          {/* Country dropdown */}
          {picker.dropdownOpen && (
            <CountryDropdownPanel
              search={picker.search}
              onSearchChange={picker.setSearch}
              filteredCountries={picker.filteredCountries}
              currentCode={picker.currentCode}
              highlightIndex={picker.highlightIndex}
              onSelect={picker.selectCountry}
              searchRef={picker.searchRef}
              listRef={picker.listRef}
              onSearchKeyDown={picker.handleSearchKeyDown}
              showDial
            />
          )}
        </div>

        {/* Hint / error */}
        {showHint && (
          <div
            id={hintId}
            className="flow-input-surface-hint flow-phone-input-hint"
            data-state={isError ? "error" : isSuccess ? "success" : undefined}
            role={isError ? "alert" : undefined}
          >
            {isError && <FlowIcon name="warning" size={hintIconSizeMap[resolvedSize]} />}
            {isSuccess && <FlowIcon name="check" size={hintIconSizeMap[resolvedSize]} />}
            {error || hint}
          </div>
        )}
      </div>
    );
  },
);
FlowPhoneInput.displayName = "FlowPhoneInput";
