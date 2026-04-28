/** FLOW — FlowMultiSelect (L4 Pattern) */
import "../css/MultiSelect.css";
import React, {
  type CSSProperties,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  FlowIcon,
  GrowthObserver,
  Inline,
  stateAttrs,
  Text,
  useFlowDefaultSize,
} from "@flow/primitives";
import {
  FlowButton,
  FlowCheckbox,
  FlowChip,
  FlowIconButton,
  FlowTextInput,
} from "@flow/components";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § 1. FlowMultiSelect
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface MultiSelectOption {
  /** Option value */
  value: string;
  /** Display label */
  label: string;
  /** Optional icon name */
  icon?: string;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Group name for categorized options */
  group?: string;
}

/** Props for FlowMultiSelect — dropdown select that supports choosing multiple options with chip display. */
export interface MultiSelectProps {
  /** Floating label text */
  label: string;
  /** Available options */
  options: MultiSelectOption[];
  /** Controlled selected values */
  value?: string[];
  /** Default selected values (uncontrolled) */
  defaultValue?: string[];
  /** Callback fired when selection changes */
  onChange?: (values: string[], options: MultiSelectOption[]) => void;
  /** Placeholder text when no items are selected */
  placeholder?: string;
  /** Helper text below the input */
  hint?: string;
  /** Error message — triggers error state */
  error?: string;
  /** Success indicator */
  success?: boolean;
  /** Loading state — shows spinner */
  loading?: boolean;
  /** Control size variant */
  size?: "sm" | "md" | "lg" | "xl";
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the select is read-only */
  readOnly?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the dropdown includes a search input */
  searchable?: boolean;
  /** Show select-all option */
  selectAll?: boolean;
  /** Maximum number of chips visible before collapsing */
  maxDisplayChips?: number;
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

export const FlowMultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  function FlowMultiSelect(
    {
      label,
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = "Select options...",
      hint,
      error,
      success,
      loading,
      size,
      disabled = false,
      readOnly = false,
      required = false,
      searchable = true,
      maxDisplayChips = 3,
      name,
      id: externalId,
      className = "",
      style,
      "aria-label": ariaLabel,
      ...rest
    },
    ref,
  ) {
    const resolvedSize = useFlowDefaultSize(size) as "sm" | "md" | "lg" | "xl";
    const iconSize = ({ sm: "sm", md: "sm", lg: "md", xl: "lg" } as const)[resolvedSize];
    const generatedId = useId();
    const selectId = externalId || generatedId;
    const hintId = `${selectId}-hint`;
    const listboxId = `${selectId}-listbox`;
    const searchInputId = `${selectId}-search`;

    const containerRef = useRef<HTMLDivElement>(null);
    const setRootRef = useCallback(
      (node: HTMLDivElement | null) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );
    const triggerRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [highlightIndex, setHighlightIndex] = useState(-1);

    // Value management
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue ?? []);
    const currentValues = isControlled ? controlledValue : internalValue;

    const selectedOptions = useMemo(
      () => options.filter((o) => currentValues.includes(o.value)),
      [options, currentValues],
    );

    const filteredOptions = useMemo(() => {
      if (!searchText.trim()) return options;
      const q = searchText.toLowerCase();
      return options.filter(
        (o) =>
          o.label.toLowerCase().includes(q) ||
          o.value.toLowerCase().includes(q) ||
          (o.group && o.group.toLowerCase().includes(q)),
      );
    }, [options, searchText]);

    const enabledFiltered = useMemo(
      () => filteredOptions.filter((o) => !o.disabled),
      [filteredOptions],
    );

    const toggleOption = useCallback(
      (option: MultiSelectOption) => {
        if (option.disabled || disabled || readOnly) return;
        const isSelected = currentValues.includes(option.value);
        const next = isSelected
          ? currentValues.filter((v) => v !== option.value)
          : [...currentValues, option.value];

        if (!isControlled) setInternalValue(next);
        onChange?.(
          next,
          options.filter((o) => next.includes(o.value)),
        );
      },
      [currentValues, isControlled, onChange, options, disabled, readOnly],
    );

    const removeValue = useCallback(
      (val: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (disabled || readOnly) return;
        const next = currentValues.filter((v) => v !== val);
        if (!isControlled) setInternalValue(next);
        onChange?.(
          next,
          options.filter((o) => next.includes(o.value)),
        );
      },
      [currentValues, isControlled, onChange, options, disabled, readOnly],
    );

    const clearAll = useCallback(
      (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (disabled || readOnly) return;
        if (!isControlled) setInternalValue([]);
        onChange?.([], []);
      },
      [isControlled, onChange, disabled, readOnly],
    );

    const selectAll = useCallback(() => {
      if (disabled || readOnly) return;
      const allVals = options.filter((o) => !o.disabled).map((o) => o.value);
      if (!isControlled) setInternalValue(allVals);
      onChange?.(
        allVals,
        options.filter((o) => !o.disabled),
      );
    }, [options, isControlled, onChange, disabled, readOnly]);

    const openDropdown = useCallback(() => {
      if (disabled || readOnly) return;
      setOpen(true);
      setSearchText("");
      setHighlightIndex(-1);
      requestAnimationFrame(() => searchRef.current?.focus());
    }, [disabled, readOnly]);

    const closeDropdown = useCallback(() => {
      setOpen(false);
      setSearchText("");
      setHighlightIndex(-1);
    }, []);

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled || readOnly) return;

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            if (!open) {
              openDropdown();
            } else {
              setHighlightIndex((prev) => Math.min(prev + 1, enabledFiltered.length - 1));
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
            if (open && highlightIndex >= 0 && highlightIndex < enabledFiltered.length) {
              e.preventDefault();
              toggleOption(enabledFiltered[highlightIndex]);
            } else if (!open && e.key === " ") {
              e.preventDefault();
              openDropdown();
            }
            break;
          case "Escape":
            e.preventDefault();
            closeDropdown();
            triggerRef.current?.focus();
            break;
          case "Backspace":
            if (searchText === "" && currentValues.length > 0) {
              removeValue(currentValues[currentValues.length - 1]);
            }
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
              setHighlightIndex(enabledFiltered.length - 1);
            }
            break;
        }
      },
      [
        disabled,
        readOnly,
        open,
        highlightIndex,
        enabledFiltered,
        openDropdown,
        closeDropdown,
        toggleOption,
        searchText,
        currentValues,
        removeValue,
      ],
    );

    // Close on outside click
    useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) closeDropdown();
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open, closeDropdown]);

    // Scroll highlighted item into view
    useEffect(() => {
      if (!open || highlightIndex < 0 || !listRef.current) return;
      const items = listRef.current.querySelectorAll("[role='option']:not([aria-disabled='true'])");
      items[highlightIndex]?.scrollIntoView({ block: "nearest" });
    }, [open, highlightIndex]);

    const isError = !!error;
    const isSuccess = !!success && !isError;
    const isLoading = !!loading && !isError;
    const showHint = !!(hint || error || isSuccess);
    const hasValue = currentValues.length > 0;

    // Group options for rendering
    const groupedOptions = useMemo(() => {
      const groups = new Map<string, MultiSelectOption[]>();
      for (const opt of filteredOptions) {
        const g = opt.group || "";
        if (!groups.has(g)) groups.set(g, []);
        groups.get(g)!.push(opt);
      }
      return groups;
    }, [filteredOptions]);

    const renderOptions = (opts: MultiSelectOption[]) =>
      opts.map((option) => {
        const enabledIdx = enabledFiltered.indexOf(option);
        const isHighlighted = enabledIdx === highlightIndex;
        const isSelected = currentValues.includes(option.value);

        return (
          <div
            key={option.value}
            role="option"
            aria-selected={isSelected}
            aria-disabled={option.disabled || undefined}
            data-highlighted={isHighlighted || undefined}
            className="flow-multi-select-option"
            tabIndex={-1}
            onClick={() => toggleOption(option)}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleOption(option);
              }
            }}
            onMouseEnter={() => {
              if (!option.disabled) setHighlightIndex(enabledIdx);
            }}
          >
            {/* Checkbox indicator — decorative, option div handles interaction */}
            <span aria-hidden="true" onClick={(e) => e.stopPropagation()}>
              <FlowCheckbox checked={isSelected} size="sm" disabled tabIndex={-1} />
            </span>
            {option.icon && <FlowIcon name={option.icon} size="sm" />}
            <Text
              variant="paragraph-s"
              color="inherit"
              style={{
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {option.label}
            </Text>
          </div>
        );
      });

    return (
      <GrowthObserver
        event="flow.multi-select.impression"
        properties={{ size: resolvedSize }}
        inline
      >
        <div
          ref={setRootRef}
          className={`flow-multi-select ${className}`}
          style={style}
          data-size={size}
          {...rest}
          {...stateAttrs({ disabled, error: isError, success: isSuccess, loading: isLoading })}
        >
          {/* External label — matches FlowAutocomplete / FlowDatePicker */}
          {label && (
            <label className="flow-multi-select-label">
              {label}
              {required && " *"}
            </label>
          )}

          {/* Trigger area */}
          <div
            ref={triggerRef}
            className="flow-input-surface flow-focusable flow-multi-select-trigger"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={open ? listboxId : undefined}
            aria-label={ariaLabel || label}
            aria-invalid={isError || undefined}
            aria-describedby={showHint ? hintId : undefined}
            aria-required={required || undefined}
            tabIndex={disabled ? -1 : 0}
            onClick={() => (open ? closeDropdown() : openDropdown())}
            onKeyDown={handleKeyDown}
            data-has-value={hasValue || undefined}
            data-open={open || undefined}
          >
            {/* Selected chips — uses FlowChip for visual consistency */}
            {selectedOptions.slice(0, maxDisplayChips).map((opt) => (
              <FlowChip
                key={opt.value}
                size="sm"
                removable={!disabled && !readOnly}
                onRemove={() => removeValue(opt.value)}
              >
                {opt.label}
              </FlowChip>
            ))}
            {selectedOptions.length > maxDisplayChips && (
              <FlowChip size="sm" variant="tonal">
                +{selectedOptions.length - maxDisplayChips} more
              </FlowChip>
            )}

            {/* Placeholder — stays visible when open (search is in dropdown) */}
            {!hasValue && (
              <Text variant="label-m" className="flow-multi-select-placeholder">
                {placeholder}
              </Text>
            )}

            {/* Spacer + controls */}
            <span style={{ flex: 1, minWidth: "var(--ref-frame-space-4)" }} />

            {isLoading && (
              <span className="flow-loading-dots" aria-hidden="true" style={{ flexShrink: 0 }}>
                <span />
                <span />
                <span />
              </span>
            )}
            {hasValue && !disabled && !readOnly && !isLoading && (
              <FlowIconButton
                icon="x"
                size="sm"
                variant="ghost"
                aria-label="Clear all"
                onClick={() => clearAll()}
              />
            )}
            {/* Chevron — matches FlowSelect (size-aware via controlIconSizeMap) */}
            {!isLoading && (
              <FlowIcon
                name="chevron-down"
                className="flow-select-chevron"
                size={iconSize}
                style={open ? { transform: "rotate(180deg)" } : undefined}
              />
            )}

            {/* Hidden inputs for form submission */}
            {name &&
              currentValues.map((v) => <input key={v} type="hidden" name={name} value={v} />)}
          </div>

          {/* Dropdown */}
          {open && (
            <div
              ref={listRef}
              id={listboxId}
              aria-label={label}
              className="flow-multi-select-dropdown"
              style={{
                maxHeight: "var(--comp-multi-select-dropdown-max-height)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Search input */}
              {searchable && (
                <div
                  role="search"
                  onKeyDown={handleKeyDown}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--ref-frame-space-2)",
                    padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
                    borderBottom:
                      "var(--sys-frame-border-thin) solid var(--sys-energy-border-subtle)",
                  }}
                >
                  <FlowIcon
                    name="search"
                    size="sm"
                    style={{ color: "var(--sys-energy-text-tertiary)", flexShrink: 0 }}
                  />
                  <FlowTextInput
                    ref={searchRef}
                    id={searchInputId}
                    className="flow-multi-select-search"
                    value={searchText}
                    onChange={(val) => {
                      setSearchText(val);
                      setHighlightIndex(0);
                    }}
                    placeholder="Search..."
                    size="sm"
                    style={{ border: "none", flex: 1 }}
                  />
                  {searchText && (
                    <FlowIconButton
                      icon="x"
                      size="sm"
                      variant="ghost"
                      aria-label="Clear search"
                      onClick={() => {
                        setSearchText("");
                        searchRef.current?.focus();
                      }}
                    />
                  )}
                </div>
              )}

              {/* Select all / Clear all toolbar */}
              <Inline className="flow-multi-select-actions" justify="between">
                <FlowButton variant="ghost" size="sm" onClick={selectAll}>
                  Select all
                </FlowButton>
                <FlowButton variant="ghost" size="sm" onClick={() => clearAll()}>
                  Clear all
                </FlowButton>
              </Inline>

              {/* Options list */}
              <div
                role="listbox"
                aria-multiselectable="true"
                aria-label={label}
                tabIndex={0}
                style={{ overflowY: "auto", flex: 1 }}
              >
                {filteredOptions.length === 0 ? (
                  <div
                    role="option"
                    aria-disabled="true"
                    aria-selected={false}
                    className="flow-multi-select-placeholder"
                    style={{ padding: "var(--sys-frame-padding-control)", textAlign: "center" }}
                  >
                    No options found
                  </div>
                ) : (
                  Array.from(groupedOptions.entries()).map(([group, opts]) => (
                    <React.Fragment key={group || "__ungrouped"}>
                      {group ? (
                        <div role="group" aria-label={group}>
                          <div aria-hidden="true" className="flow-multi-select-group-label">
                            {group}
                          </div>
                          {renderOptions(opts)}
                        </div>
                      ) : (
                        renderOptions(opts)
                      )}
                    </React.Fragment>
                  ))
                )}
              </div>

              {/* Footer with count */}
              <div
                style={{
                  padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
                  borderTop: "var(--sys-frame-border-thin) solid var(--sys-energy-border-subtle)",
                  textAlign: "center",
                }}
              >
                <Text variant="caption" color="secondary">
                  {currentValues.length} of {options.filter((o) => !o.disabled).length} selected
                </Text>
              </div>
            </div>
          )}

          {/* Hint / error / success */}
          {showHint && (
            <div
              id={hintId}
              className="flow-select-hint"
              data-state={isError ? "error" : isSuccess ? "success" : undefined}
              role={isError ? "alert" : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--ref-frame-space-1)",
                marginTop: "var(--ref-frame-space-1)",
                fontSize: "var(--sys-voice-caption-size)",
                fontFamily: "var(--ref-voice-family-sans)",
                color: isError
                  ? "var(--sys-energy-status-error)"
                  : isSuccess
                    ? "var(--sys-energy-status-success)"
                    : "var(--sys-energy-text-tertiary)",
              }}
            >
              {isError && <FlowIcon name="warning" size="sm" />}
              {isSuccess && <FlowIcon name="check" size="sm" />}
              {error || hint || (isSuccess && "Valid")}
            </div>
          )}
        </div>
      </GrowthObserver>
    );
  },
);
FlowMultiSelect.displayName = "FlowMultiSelect";
