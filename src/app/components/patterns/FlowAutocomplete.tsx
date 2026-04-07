/** FLOW — FlowAutocomplete (L4 Pattern) */
import {
  type CSSProperties,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { GrowthObserver } from "../../primitives";
import { useFlowAnnounce } from "../../hooks/use-flow-announce";
import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";
import { FlowTextInput } from "../inputs/FlowTextInput";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AUTOCOMPLETE — Search input with suggestions dropdown
// Filterable combobox with keyboard navigation and highlight matching.
// CSS: .flow-autocomplete
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type AutocompleteSize = "sm" | "md" | "lg";

export interface AutocompleteOptionObject {
  /** Unique value */
  value: string;
  /** Display label */
  label: string;
  /** Optional secondary text */
  secondary?: string;
  /** Disabled */
  disabled?: boolean;
}
export type AutocompleteOption = AutocompleteOptionObject | string;

/** Props for FlowAutocomplete — search input with filterable suggestions dropdown and keyboard navigation. */
export interface AutocompleteProps {
  /** Options list */
  options: AutocompleteOption[];
  /** Currently selected value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Value change handler */
  onChange?: (value: string) => void;
  /** hint/helper text */
  hint?: string;
  /** Success state */
  success?: boolean;
  /** Input text change (for custom filtering) */
  onInputChange?: (text: string) => void;
  /** Label */
  label?: string;
  /** Placeholder */
  placeholder?: string;
  /** Size variant */
  size?: AutocompleteSize;
  /** Error state (boolean or error message string) */
  error?: boolean | string;
  /** Loading state (shows spinner, for async search) */
  loading?: boolean;
  /** Show leading search icon */
  showIcon?: boolean;
  /** Show clear button */
  clearable?: boolean;
  /** Custom filter function. Return true to include option. */
  filterFn?: (option: AutocompleteOptionObject, inputValue: string) => boolean;
  /** Empty state text */
  emptyText?: string;
  /** Highlight matching text in options */
  highlightMatch?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  /** Disabled */
  disabled?: boolean;
  /** Allow any input value, not just options from the list */
  freeSolo?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

function defaultFilter(option: AutocompleteOptionObject, input: string): boolean {
  return option.label.toLowerCase().includes(input.toLowerCase());
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="flow-autocomplete-highlight">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

function normalizeOption(opt: AutocompleteOption): AutocompleteOptionObject {
  return typeof opt === "string" ? { value: opt, label: opt } : opt;
}

export const FlowAutocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      options: optionsProp,
      value: valueProp,
      defaultValue = "",
      onChange,
      onInputChange,
      label,
      placeholder = "Type to search...",
      size,
      hint: _hint,
      success: _success,
      error: _error = false,
      loading = false,
      showIcon = true,
      clearable = true,
      filterFn = defaultFilter,
      emptyText = "No results found",
      highlightMatch = true,
      "aria-label": ariaLabel,
      disabled = false,
      className = "",
      style,
      ...rest
    },
    ref,
  ) => {
    const resolvedSize = useFlowDefaultSize(size);
    const announce = useFlowAnnounce();
    const idPrefix = useId();
    const listboxId = `${idPrefix}-listbox`;
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // Normalize options to object form
    const options = useMemo(() => optionsProp.map(normalizeOption), [optionsProp]);
    // Handle controlled vs uncontrolled value
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const isControlled = valueProp !== undefined;
    const value = isControlled ? (valueProp ?? "") : internalValue;
    const handleChange = useCallback((v: string) => {
      if (!isControlled) setInternalValue(v);
      onChange?.(v);
    }, [isControlled, onChange]);

    // Merge refs
    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      },
      [ref],
    );

    const selectedOption = options.find((o) => o.value === value);
    const [inputText, setInputText] = useState(() => selectedOption?.label ?? "");
    const [prevValue, setPrevValue] = useState(value);
    const [prevOptions, setPrevOptions] = useState(options);
    if (value !== prevValue || options !== prevOptions) {
      setPrevValue(value);
      setPrevOptions(options);
      const opt = options.find((o) => o.value === value);
      if (opt) setInputText(opt.label);
      else setInputText("");
    }
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIdx, setHighlightedIdx] = useState(-1);

    const filtered = useMemo(() => {
      if (!inputText && !isOpen) return options;
      return options.filter((o) => filterFn(o, inputText));
    }, [options, inputText, isOpen, filterFn]);

    // Announce filtered result count to screen readers
    useEffect(() => {
      if (isOpen) {
        announce(`${filtered.length} result${filtered.length === 1 ? "" : "s"}`);
      }
    }, [filtered.length, isOpen, announce]);

    const handleInputChange = useCallback(
      (val: string) => {
        setInputText(val);
        onInputChange?.(val);
        setIsOpen(true);
        setHighlightedIdx(-1);
      },
      [onInputChange],
    );

    const selectOption = useCallback(
      (opt: AutocompleteOptionObject) => {
        handleChange(opt.value);
        setInputText(opt.label);
        setIsOpen(false);
        setHighlightedIdx(-1);
        inputRef.current?.blur();
         
      },
      [handleChange],
    );

    const handleClear = useCallback(() => {
      handleChange("");
    }, [handleChange]);

    const handleFocus = useCallback(() => {
      setIsOpen(true);
    }, []);

    // Close on outside click
    const wrapRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        if (wrapRef.current?.contains(e.target as Node)) return;
        setIsOpen(false);
        // Reset input to selected label if user didn't pick
        const opt = options.find((o) => o.value === value);
        if (opt) setInputText(opt.label);
        else setInputText("");
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [isOpen, options, value]);

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (!isOpen) {
          if (e.key === "ArrowDown" || e.key === "Enter") {
            setIsOpen(true);
            return;
          }
        }

        const enabledItems = filtered.filter((o) => !o.disabled);

        if (e.key === "ArrowDown") {
          e.preventDefault();
          setHighlightedIdx((prev) => {
            const next = prev + 1;
            return next >= enabledItems.length ? 0 : next;
          });
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setHighlightedIdx((prev) => {
            return prev <= 0 ? enabledItems.length - 1 : prev - 1;
          });
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (highlightedIdx >= 0 && highlightedIdx < enabledItems.length) {
            selectOption(enabledItems[highlightedIdx]);
          }
        } else if (e.key === "Escape") {
          setIsOpen(false);
          const opt = options.find((o) => o.value === value);
          if (opt) setInputText(opt.label);
        } else if (e.key === "Home") {
          e.preventDefault();
          setHighlightedIdx(0);
        } else if (e.key === "End") {
          e.preventDefault();
          setHighlightedIdx(enabledItems.length - 1);
        }
      },
      [isOpen, filtered, highlightedIdx, selectOption, options, value],
    );

    // Scroll highlighted item into view
    useEffect(() => {
      if (highlightedIdx < 0 || !listRef.current) return;
      const items = listRef.current.querySelectorAll(
        "[role='option']:not([data-state='disabled'])",
      );
      items[highlightedIdx]?.scrollIntoView({ block: "nearest" });
    }, [highlightedIdx]);

    // Stable refs for imperative event handlers
    const handleFocusRef = useRef(handleFocus);
    const handleKeyDownRef = useRef(handleKeyDown);
    useEffect(() => {
      handleFocusRef.current = handleFocus;
      handleKeyDownRef.current = handleKeyDown;
    });

    // Imperative ARIA attributes on inner <input> (FlowTextInput doesn't expose role/aria-*)
    useEffect(() => {
      const el = inputRef.current;
      if (!el) return;
      el.setAttribute("role", "combobox");
      el.setAttribute("aria-expanded", String(isOpen));
      el.setAttribute("aria-controls", listboxId);
      el.setAttribute("aria-autocomplete", "list");
      const a11yLabel = ariaLabel || label;
      if (a11yLabel) el.setAttribute("aria-label", a11yLabel);
      else el.removeAttribute("aria-label");
      if (highlightedIdx >= 0) {
        el.setAttribute("aria-activedescendant", `${idPrefix}-opt-${highlightedIdx}`);
      } else {
        el.removeAttribute("aria-activedescendant");
      }
      el.setAttribute("autocomplete", "off");
    }, [isOpen, listboxId, ariaLabel, label, highlightedIdx, idPrefix]);

    // Imperative focus/keydown listeners (stable — handlers accessed via refs)
    useEffect(() => {
      const el = inputRef.current;
      if (!el) return;
      const onFocusHandler = () => handleFocusRef.current();
      const onKeyDownHandler = (e: Event) =>
        handleKeyDownRef.current(e as unknown as React.KeyboardEvent);
      el.addEventListener("focus", onFocusHandler);
      el.addEventListener("keydown", onKeyDownHandler);
      return () => {
        el.removeEventListener("focus", onFocusHandler);
        el.removeEventListener("keydown", onKeyDownHandler);
      };
    }, []);

    const _enabledFiltered = filtered.filter((o) => !o.disabled);
    let enabledIdx = -1;

    return (
      <GrowthObserver event="flow.autocomplete.impression" properties={{ size: resolvedSize }} inline>
      <div
        ref={wrapRef}
        className={`flow-autocomplete ${className}`}
        data-size={resolvedSize}
        style={style}
        {...rest}
      >
        {label && (
          <label className="flow-autocomplete-label" htmlFor={`${idPrefix}-input`}>
            {label}
          </label>
        )}
        <FlowTextInput
          ref={setRefs}
          id={`${idPrefix}-input`}
          className="flow-autocomplete-input-wrap"
          value={inputText}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          leadingIcon={showIcon ? "search" : undefined}
          clearable={clearable}
          onClear={handleClear}
          loading={loading}
          size={resolvedSize}
        />

        {isOpen && (
          <div ref={listRef} id={listboxId} className="flow-autocomplete-dropdown" role="listbox">
            {filtered.length === 0 ? (
              <div className="flow-autocomplete-empty">{emptyText}</div>
            ) : (
              filtered.map((opt) => {
                const isDisabled = !!opt.disabled;
                if (!isDisabled) enabledIdx++;
                const isHighlighted = !isDisabled && enabledIdx === highlightedIdx;
                const isSelected = opt.value === value;

                return (
                  <div
                    key={opt.value}
                    id={!isDisabled ? `${idPrefix}-opt-${enabledIdx}` : undefined}
                    className="flow-autocomplete-item"
                    role="option"
                    aria-selected={isSelected}
                    data-highlighted={isHighlighted || undefined}
                    data-selected={isSelected || undefined}
                    data-state={isDisabled ? "disabled" : undefined}
                    tabIndex={-1}
                    onClick={() => {
                      if (!isDisabled) selectOption(opt);
                    }}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if ((e.key === "Enter" || e.key === " ") && !isDisabled) {
                        e.preventDefault();
                        selectOption(opt);
                      }
                    }}
                  >
                    <span>
                      {highlightMatch ? (
                        <HighlightMatch text={opt.label} query={inputText} />
                      ) : (
                        opt.label
                      )}
                    </span>
                    {opt.secondary && (
                      <span className="flow-autocomplete-item-secondary">{opt.secondary}</span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
      </GrowthObserver>
    );
  },
);
FlowAutocomplete.displayName = "FlowAutocomplete";
