/** FLOW — FlowSelect (L3 Component) */
import React, { type CSSProperties, forwardRef, useCallback, useEffect, useId, useRef, useState } from "react";

import { FlowIcon, GrowthObserver, stateAttrs, Surface, Text } from "../../primitives";
import { FlowCircularProgress } from "../feedback/FlowCircularProgress";
import { useFlowAnnounce } from "../../hooks/use-flow-announce";
import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";
import { useFlowLocale } from "../../hooks/use-flow-locale";

// ── Shared size maps for child FlowIcon inside input-family controls ──
type InputControlSize = "sm" | "md" | "lg" | "xl";
const hintIconSizeMap: Record<InputControlSize, "xs" | "sm" | "md"> = {
  sm: "sm",
  md: "sm",
  lg: "sm",
  xl: "md",
};
const controlIconSizeMap: Record<InputControlSize, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "sm",
  lg: "md",
  xl: "lg",
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SELECT — Generic dropdown select with floating label
// Shares textInput comp tokens for visual consistency.
// Renders a custom dropdown (not native <select>) for
// cross-platform consistency and rich option rendering.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type SelectSize = "sm" | "md" | "lg" | "xl";

export interface SelectOption {
  /** Unique value identifier */
  value: string;
  /** Display label */
  label: string;
  /** Optional icon name */
  icon?: string;
  /** Whether option is disabled */
  disabled?: boolean;
}

/** Props for FlowSelect — a custom dropdown select with floating label and rich option rendering. */
export interface SelectProps {
  /** Floating label text */
  label: string;
  /** Options to display */
  options: SelectOption[];
  /** Controlled selected value */
  value?: string;
  /** Default value for uncontrolled */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string, option: SelectOption) => void;
  /** Placeholder shown when no value selected */
  placeholder?: string;
  /** Helper/hint text below the select */
  hint?: string;
  /** Error message */
  error?: string;
  /** Success indicator — green border + check icon in hint */
  success?: boolean;
  /** Loading indicator — shows spinner before chevron */
  loading?: boolean;
  /** Control size */
  size?: SelectSize;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the select is read-only */
  readOnly?: boolean;
  /** Required indicator */
  required?: boolean;
  /** Form field name */
  name?: string;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
  /** Accessible label */
  "aria-label"?: string;
}

export const FlowSelect = forwardRef<HTMLDivElement, SelectProps>(
  function FlowSelect({
    label,
    options,
    value: controlledValue,
    defaultValue,
    onChange,
    placeholder,
    hint,
    error,
    success,
    loading,
    size,
    disabled = false,
    readOnly = false,
    required = false,
    name,
    id: externalId,
    className = "",
    style,
    "aria-label": ariaLabel,
    ...rest
  }, ref) {
  const resolvedSize = useFlowDefaultSize(size);
  const announce = useFlowAnnounce();
  const t = useFlowLocale();
  const generatedId = useId();
  const selectId = externalId || generatedId;
  const hintId = `${selectId}-hint`;
  const listboxId = `${selectId}-listbox`;

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  // Value management
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const currentValue = isControlled ? controlledValue : internalValue;

  const selectedOption = options.find((o) => o.value === currentValue);
  const hasValue = !!selectedOption;

  const enabledOptions = options.filter((o) => !o.disabled);

  const selectOption = useCallback(
    (option: SelectOption) => {
      if (option.disabled) return;
      if (!isControlled) setInternalValue(option.value);
      onChange?.(option.value, option);
      announce(t("select.selected", { label: option.label }));
      window.flowAnalytics?.track?.("flow.component.interaction", {
        component: "FlowSelect",
        action: "change",
      });
      setOpen(false);
      setHighlightIndex(-1);
      triggerRef.current?.focus();
    },
    [isControlled, onChange, announce, t],
  );

  const toggleOpen = useCallback(() => {
    if (disabled || readOnly) return;
    setOpen((prev) => {
      if (!prev) {
        // Opening: highlight current value
        const idx = enabledOptions.findIndex((o) => o.value === currentValue);
        setHighlightIndex(idx >= 0 ? idx : 0);
        announce(t("select.optionsAvailable", { count: enabledOptions.length }));
      }
      return !prev;
    });
  }, [disabled, readOnly, currentValue, enabledOptions, announce, t]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled || readOnly) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!open) {
            setOpen(true);
            const idx = enabledOptions.findIndex((o) => o.value === currentValue);
            setHighlightIndex(idx >= 0 ? idx : 0);
          } else {
            setHighlightIndex((prev) => Math.min(prev + 1, enabledOptions.length - 1));
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (open) {
            setHighlightIndex((prev) => Math.max(prev - 1, 0));
          }
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (open && highlightIndex >= 0 && highlightIndex < enabledOptions.length) {
            selectOption(enabledOptions[highlightIndex]);
          } else if (!open) {
            toggleOpen();
          }
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          setHighlightIndex(-1);
          triggerRef.current?.focus();
          break;
        case "Home":
          if (open) {
            e.preventDefault();
            setHighlightIndex(0);
          }
          break;
        case "End":
          if (open) {
            e.preventDefault();
            setHighlightIndex(enabledOptions.length - 1);
          }
          break;
      }
    },
    [
      disabled,
      readOnly,
      open,
      highlightIndex,
      enabledOptions,
      currentValue,
      selectOption,
      toggleOpen,
    ],
  );

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setHighlightIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (!open || highlightIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll("[role='option']:not([aria-disabled='true'])");
    items[highlightIndex]?.scrollIntoView({ block: "nearest" });
  }, [open, highlightIndex]);

  const isError = !!error;
  const isSuccess = !!success && !isError;
  const isLoading = !!loading && !isError;
  const showHint = !!(hint || error || isSuccess);

  const dataState = disabled
    ? "disabled"
    : isLoading
      ? "loading"
      : isError
        ? "error"
        : isSuccess
          ? "success"
          : undefined;

  return (
    <GrowthObserver event="flow.select.impression" properties={{ size: resolvedSize }} inline>
    <div
      {...rest}
      className={`flow-select ${className}`}
      style={style}
      ref={(node) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      data-size={resolvedSize}
      {...stateAttrs({
        disabled,
        error: isError,
        success: isSuccess,
        loading: isLoading,
        readonly: readOnly,
      })}
    >
      <button
        ref={triggerRef}
        type="button"
        id={selectId}
        className="flow-input-surface flow-select-trigger"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listboxId : undefined}
        aria-activedescendant={open && highlightIndex >= 0 ? `${listboxId}-option-${enabledOptions[highlightIndex]?.value}` : undefined}
        aria-label={ariaLabel || label}
        aria-invalid={isError || undefined}
        aria-describedby={showHint ? hintId : undefined}
        aria-required={required || undefined}
        disabled={disabled}
        data-has-value={hasValue || undefined}
        data-open={open || undefined}
        data-state={dataState}
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
      >
        {/* Floating label */}
        <Text as="span" role="label-s" className="flow-input-surface-label flow-select-label">
          {label}
          {required && " *"}
        </Text>

        {/* Selected value or placeholder */}
        <span className="flow-select-value">
          {selectedOption ? (
            <>
              {selectedOption.icon && <FlowIcon name={selectedOption.icon} size="sm" />}
              {selectedOption.label}
            </>
          ) : (
            <Text as="span" role="caption" color="secondary" className="flow-select-placeholder">{placeholder ?? t("select.placeholder")}</Text>
          )}
        </span>

        {/* Chevron */}
        {isLoading && (
          <span className="flow-select-loading" aria-hidden="true">
            <FlowCircularProgress size="sm" aria-label="Loading" />
          </span>
        )}
        {!isLoading && (
          <FlowIcon
            name="chevron-down"
            size={controlIconSizeMap[resolvedSize]}
            className="flow-select-chevron"
          />
        )}

        {/* Hidden native input for form submission */}
        {name && <input type="hidden" name={name} value={currentValue} />}
      </button>

      {/* Dropdown listbox */}
      {open && (
        <Surface
          ref={listRef}
          id={listboxId}
          role="listbox"
          className="flow-select-dropdown"
          aria-label={label}
          border={false}
        >
          {options.map((option, _idx) => {
            const enabledIdx = enabledOptions.indexOf(option);
            const isHighlighted = enabledIdx === highlightIndex;
            const isSelected = option.value === currentValue;

            return (
              <div
                key={option.value}
                id={`${listboxId}-option-${option.value}`}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled || undefined}
                className="flow-select-option"
                data-highlighted={isHighlighted || undefined}
                data-selected={isSelected || undefined}
                data-state={option.disabled ? "disabled" : undefined}
                tabIndex={-1}
                onClick={() => !option.disabled && selectOption(option)}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (!option.disabled) selectOption(option);
                  }
                }}
                onMouseEnter={() => {
                  if (!option.disabled) setHighlightIndex(enabledIdx);
                }}
              >
                {option.icon && <FlowIcon name={option.icon} size="sm" />}
                <Text as="span" role="label-m" className="flow-select-option-label">{option.label}</Text>
                {isSelected && <FlowIcon name="check" size="sm" />}
              </div>
            );
          })}
        </Surface>
      )}

      {/* Hint / error / success */}
      {showHint && (
        <div
          id={hintId}
          className="flow-input-surface-hint flow-select-hint"
          data-state={isError ? "error" : isSuccess ? "success" : undefined}
          role={isError ? "alert" : undefined}
          aria-live={isLoading ? "polite" : undefined}
        >
          {isError && <FlowIcon name="warning" size={hintIconSizeMap[resolvedSize]} />}
          {isSuccess && <FlowIcon name="check" size={hintIconSizeMap[resolvedSize]} />}
          <Text as="span" role="caption" color={isError ? "danger" : isSuccess ? "success" : "secondary"}>{error || hint || (isSuccess && "Valid")}</Text>
        </div>
      )}
    </div>
    </GrowthObserver>
  );
}
);
FlowSelect.displayName = "FlowSelect";
