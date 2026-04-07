/**
 * FLOW Design System — Country Picker Shared Infrastructure
 * ──────────────────────────────────────────────────────────
 * Hook + dropdown panel consumed by FlowPhoneInput & FlowCountrySelect.
 * NOT an L3 component — internal shared code.
 */
import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

import { FlowFlag, FlowIcon } from "../../../primitives";
import { flagByCode, type FlagEntry, flagRegistry } from "../../../flags";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// useCountryPicker — shared state hook
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface UseCountryPickerOptions {
  /** ISO code (uppercase), e.g. "FR" */
  controlledCountry?: string;
  /** Default country when uncontrolled */
  defaultCountry?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onCountryChange?: (entry: FlagEntry) => void;
  /** Ref to the container element for click-outside detection */
  containerRef: RefObject<HTMLElement | null>;
  /** Ref/callback to focus when dropdown closes */
  focusOnClose?: RefObject<HTMLElement | null>;
}

export function useCountryPicker({
  controlledCountry,
  defaultCountry = "FR",
  disabled = false,
  readOnly = false,
  onCountryChange,
  containerRef,
  focusOnClose,
}: UseCountryPickerOptions) {
  const isControlled = controlledCountry !== undefined;
  const [internalCountry, setInternalCountry] = useState(controlledCountry || defaultCountry);
  const rawCode = isControlled ? controlledCountry : internalCountry;
  // Resolve to fallback if code is not in registry (prevents FlowFlag returning null)
  const currentCountry = flagByCode[rawCode] || flagByCode[defaultCountry] || flagByCode["FR"]!;
  const currentCode = currentCountry.code;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filtered countries
  const filteredCountries = search
    ? flagRegistry.filter(
        (f) =>
          f.name.toLowerCase().includes(search.toLowerCase()) ||
          f.code.toLowerCase().includes(search.toLowerCase()) ||
          f.dial.includes(search),
      )
    : flagRegistry;

  // Select a country
  const selectCountry = (entry: FlagEntry) => {
    if (!isControlled) setInternalCountry(entry.code);
    onCountryChange?.(entry);
    setDropdownOpen(false);
    setSearch("");
    setHighlightIndex(-1);
    requestAnimationFrame(() => focusOnClose?.current?.focus());
  };

  // Toggle dropdown
  const toggleDropdown = useCallback(() => {
    if (disabled || readOnly) return;
    setDropdownOpen((prev) => {
      if (!prev) {
        setHighlightIndex(-1);
        requestAnimationFrame(() => searchRef.current?.focus());
      }
      return !prev;
    });
    setSearch("");
  }, [disabled, readOnly]);

  // Open dropdown (explicit)
  const openDropdown = useCallback(() => {
    if (disabled || readOnly || dropdownOpen) return;
    setDropdownOpen(true);
    setSearch("");
    setHighlightIndex(-1);
    requestAnimationFrame(() => searchRef.current?.focus());
  }, [disabled, readOnly, dropdownOpen]);

  // Close dropdown on outside click / Escape
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setSearch("");
        setHighlightIndex(-1);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setSearch("");
        setHighlightIndex(-1);
        focusOnClose?.current?.focus();
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [dropdownOpen, containerRef, focusOnClose]);

  // Keyboard navigation in dropdown
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    const len = filteredCountries.length;
    if (len === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => {
        const next = prev < len - 1 ? prev + 1 : 0;
        scrollItemIntoView(listRef.current, next);
        return next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => {
        const next = prev > 0 ? prev - 1 : len - 1;
        scrollItemIntoView(listRef.current, next);
        return next;
      });
    } else if (e.key === "Enter" && highlightIndex >= 0 && highlightIndex < len) {
      e.preventDefault();
      selectCountry(filteredCountries[highlightIndex]);
    }
  };

  // Scroll-into-view on open for current selection
  useEffect(() => {
    if (dropdownOpen && listRef.current) {
      requestAnimationFrame(() => {
        const selectedEl = listRef.current?.querySelector("[data-selected]") as HTMLElement | null;
        if (selectedEl) {
          selectedEl.scrollIntoView({ block: "nearest" });
        }
      });
    }
  }, [dropdownOpen]);

  return {
    currentCountry,
    currentCode,
    dropdownOpen,
    search,
    setSearch,
    filteredCountries,
    highlightIndex,
    selectCountry,
    toggleDropdown,
    openDropdown,
    searchRef,
    listRef,
    handleSearchKeyDown,
  };
}

/** Scroll a child into view by index */
function scrollItemIntoView(listEl: HTMLElement | null, index: number) {
  if (!listEl) return;
  const items = listEl.querySelectorAll("[role='option']");
  if (items[index]) {
    (items[index] as HTMLElement).scrollIntoView({ block: "nearest" });
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CountryDropdownPanel — shared UI
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface CountryDropdownPanelProps {
  search: string;
  onSearchChange: (value: string) => void;
  filteredCountries: FlagEntry[];
  currentCode: string;
  highlightIndex: number;
  onSelect: (entry: FlagEntry) => void;
  searchRef: RefObject<HTMLInputElement>;
  listRef: RefObject<HTMLDivElement>;
  onSearchKeyDown: (e: React.KeyboardEvent) => void;
  /** Show dial code in each row (for PhoneInput) */
  showDial?: boolean;
  /** Show the search bar inside the dropdown (false for combobox mode) */
  showSearch?: boolean;
  /** Label for accessibility */
  ariaLabel?: string;
}

export function CountryDropdownPanel({
  search,
  onSearchChange,
  filteredCountries,
  currentCode,
  highlightIndex,
  onSelect,
  searchRef,
  listRef,
  onSearchKeyDown,
  showDial = true,
  showSearch = true,
  ariaLabel = "Select country",
}: CountryDropdownPanelProps) {
  return (
    <div className="flow-country-dropdown" role="listbox" aria-label={ariaLabel}>
      {/* Search — hidden in combobox mode (input IS the search) */}
      {showSearch && (
        <div className="flow-country-dropdown-search">
          <FlowIcon name="search" size="sm" color="var(--sys-energy-text-tertiary)" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Search countries..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={onSearchKeyDown}
            aria-label="Search countries"
          />
        </div>
      )}

      {/* List */}
      <div className="flow-country-dropdown-list" ref={listRef}>
        {filteredCountries.length === 0 && (
          <div className="flow-country-dropdown-empty">No countries found</div>
        )}
        {filteredCountries.map((entry, idx) => (
          <button
            key={entry.code}
            type="button"
            className="flow-country-dropdown-item"
            role="option"
            aria-selected={entry.code === currentCode || undefined}
            data-selected={entry.code === currentCode || undefined}
            data-highlighted={idx === highlightIndex || undefined}
            onClick={() => onSelect(entry)}
          >
            <FlowFlag code={entry.code} size="sm" />
            <span className="flow-country-dropdown-item-name">{entry.name}</span>
            <span className="flow-country-dropdown-item-code">{entry.code}</span>
            {showDial && <span className="flow-country-dropdown-item-dial">{entry.dial}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
