/** FLOW — FlowCountrySelect (L3 Component) */
import { type CSSProperties, forwardRef, useCallback, useId, useRef } from "react";

import { type FlagEntry } from "@flow/flags";
import { CountryDropdownPanel, useCountryPicker } from "../inputs/_internal/country-picker";
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
// COUNTRY SELECT — Combobox country picker
// Combines floating label + flag prefix + inline search + dropdown
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type CountrySelectSize = "sm" | "md" | "lg" | "xl";

/** Props for FlowCountrySelect — combobox country picker with flag prefix and inline search dropdown. */
export interface CountrySelectProps {
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
  size?: CountrySelectSize;
  /** Controlled ISO country code */
  value?: string;
  /** Default country code (uncontrolled) */
  defaultValue?: string;
  /** Callback fired when a country is selected */
  onChange?: (entry: FlagEntry) => void;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the select is read-only */
  readOnly?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Form field name */
  name?: string;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowCountrySelect = forwardRef<HTMLInputElement, CountrySelectProps>(
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
      disabled = false,
      readOnly = false,
      required = false,
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
    const inputRef = useRef<HTMLInputElement>(null);

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      },
      [ref],
    );

    const picker = useCountryPicker({
      controlledCountry: controlledValue,
      defaultCountry: defaultValue || "FR",
      disabled,
      readOnly,
      onCountryChange: onChange,
      containerRef: containerRef as React.RefObject<HTMLElement>,
      focusOnClose: inputRef as React.RefObject<HTMLElement>,
    });

    const hasValue = !!picker.currentCountry;

    const showHint = !!(hint || error);
    const isError = !!error;
    const isSuccess = !!success && !isError;
    const isLoading = !!loading && !isError;

    // When dropdown is open, the input shows search text; when closed, shows country name
    const displayValue = picker.dropdownOpen ? picker.search : picker.currentCountry?.name || "";

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        picker.setSearch(e.target.value);
        if (!picker.dropdownOpen) {
          picker.openDropdown();
        }
      },
      [picker],
    );

    const handleInputFocus = useCallback(() => {
      picker.openDropdown();
    }, [picker]);

    return (
      <div
        className={`flow-country-select ${className}`}
        style={style}
        ref={containerRef}
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
        {/* Container */}
        <div
          className="flow-input-surface flow-country-select-container"
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
          data-open={picker.dropdownOpen || undefined}
        >
          {/* Flag prefix */}
          <div className="flow-country-select-flag">
            <FlowFlag code={picker.currentCode} size={controlFlagSizeMap[resolvedSize]} />
          </div>

          {/* Input body */}
          <div className="flow-country-select-body">
            <label className="flow-input-surface-label flow-country-select-label" htmlFor={inputId}>
              {label}
              {required && " *"}
            </label>
            <input
              ref={setRefs}
              id={inputId}
              className="flow-input-surface-field flow-country-select-field"
              type="text"
              name={name}
              value={displayValue}
              placeholder={picker.dropdownOpen ? "Search countries..." : undefined}
              disabled={disabled}
              readOnly={readOnly}
              aria-invalid={isError || undefined}
              aria-describedby={showHint ? hintId : undefined}
              aria-required={required || undefined}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onKeyDown={picker.dropdownOpen ? picker.handleSearchKeyDown : undefined}
            />
          </div>

          {/* Loading or chevron */}
          {isLoading ? (
            <span className="flow-country-select-loading" aria-hidden="true">
              <FlowCircularProgress size="sm" aria-label="Loading" />
            </span>
          ) : (
            <button
              type="button"
              className="flow-country-select-chevron-btn"
              onClick={picker.toggleDropdown}
              disabled={disabled}
              tabIndex={-1}
              aria-hidden="true"
            >
              <FlowIcon
                name="chevron-down"
                size={controlIconSizeMap[resolvedSize]}
                className="flow-country-select-chevron"
              />
            </button>
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
              showDial={false}
              showSearch={false}
              ariaLabel="Select country"
            />
          )}
        </div>

        {/* Hint / error */}
        {showHint && (
          <div
            id={hintId}
            className="flow-input-surface-hint flow-country-select-hint"
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
FlowCountrySelect.displayName = "FlowCountrySelect";
