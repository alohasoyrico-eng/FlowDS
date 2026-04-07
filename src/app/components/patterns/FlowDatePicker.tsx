/** FLOW — FlowDatePicker (L4 Pattern) */
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

import { GrowthObserver, stateAttrs, Text } from "../../primitives";
import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";
import { FlowTextInput } from "../inputs/FlowTextInput";
import { FlowButton } from "../controls/FlowButton";
import { FlowIconButton } from "../controls/FlowIconButton";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATE PICKER — Calendar-based date selection
// Composed with TextInput-like trigger + calendar dropdown
// CSS: .flow-datepicker
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type DatePickerSize = "sm" | "md" | "lg" | "xl";

/** Props for FlowDatePicker — calendar-based single date selection with dropdown and min/max constraints. */
export interface DatePickerProps {
  /** Controlled value (ISO string YYYY-MM-DD) */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (date: string) => void;
  /** Label */
  label?: string;
  /** Placeholder */
  placeholder?: string;
  /** Min selectable date (ISO) */
  min?: string;
  /** Max selectable date (ISO) */
  max?: string;
  /** Disabled dates (ISO array) */
  disabledDates?: string[];
  /** Size */
  size?: DatePickerSize;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Loading state */
  loading?: boolean;
  /** Whether the date picker is disabled */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
  /** Accessible label */
  "aria-label"?: string;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function parseISO(str: string): Date | null {
  if (!str) return null;
  const [y, m, d] = str.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function toISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getCalendarGrid(year: number, month: number): (Date | null)[][] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(year, month);
  const weeks: (Date | null)[][] = [];
  let week: (Date | null)[] = [];

  for (let i = 0; i < firstDay; i++) week.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(new Date(year, month, d));
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

export const FlowDatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  function FlowDatePicker({
  value: controlledValue,
  defaultValue,
  onChange,
  label,
  placeholder = "Select date",
  min,
  max,
  disabledDates = [],
  size,
  error,
  errorMessage,
  loading,
  disabled,
  className = "",
  style,
  "aria-label": ariaLabel,
  ...rest
}, ref) {
  const id = useId();
  const resolvedSize = useFlowDefaultSize(size);
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const value = controlledValue ?? internalValue;
  const selectedDate = parseISO(value);

  const [viewYear, setViewYear] = useState(selectedDate?.getFullYear() ?? new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDate?.getMonth() ?? new Date().getMonth());

  const containerRef = useRef<HTMLDivElement>(null);
  const setRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const skipToggleRef = useRef(false);

  const minDate = min ? parseISO(min) : null;
  const maxDate = max ? parseISO(max) : null;
  const disabledSet = useMemo(() => new Set(disabledDates), [disabledDates]);

  const isDateDisabled = useCallback(
    (d: Date): boolean => {
      if (minDate && d < minDate) return true;
      if (maxDate && d > maxDate) return true;
      if (disabledSet.has(toISO(d))) return true;
      return false;
    },
    [minDate, maxDate, disabledSet],
  );

  const selectDate = useCallback(
    (d: Date) => {
      const iso = toISO(d);
      if (onChange) onChange(iso);
      else setInternalValue(iso);
      setOpen(false);
    },
    [onChange],
  );

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Set aria attributes imperatively — FlowTextInput does not forward them to its <input>
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.setAttribute("aria-expanded", String(open));
    el.setAttribute("aria-haspopup", "dialog");
    if (ariaLabel || label) el.setAttribute("aria-label", ariaLabel || label || "");
  }, [open, ariaLabel, label]);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const weeks = getCalendarGrid(viewYear, viewMonth);
  const displayValue = selectedDate
    ? `${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`
    : "";

  return (
    <GrowthObserver event="flow.date-picker.impression" properties={{ size: resolvedSize }} inline>
    <div
      ref={setRootRef}
      className={`flow-datepicker ${className}`}
      data-size={resolvedSize}
      style={style}
      {...rest}
      {...stateAttrs({ disabled: !!(disabled || loading), error: !!error, loading: !!loading })}
    >
      {/* Label */}
      {label && (
        <label htmlFor={id} className="flow-datepicker-label">
          {label}
        </label>
      )}

      {/* Trigger — composed from FlowTextInput (L3) */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
        if (skipToggleRef.current) { skipToggleRef.current = false; return; }
        if (!disabled && !loading) setOpen(!open);
      }}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (!disabled && !loading) setOpen(!open); } }}
      >
        <FlowTextInput
          ref={inputRef}
          id={id}
          value={displayValue}
          readOnly
          placeholder={placeholder}
          leadingIcon="calendar"
          clearable={!!value && !disabled}
          onClear={() => {
            skipToggleRef.current = true;
            if (onChange) onChange("");
            else setInternalValue("");
          }}
          size={resolvedSize}
          disabled={disabled || loading}
        />
      </div>

      {/* Error message */}
      {error && errorMessage && (
        <Text role="caption" color="danger" style={{ marginTop: "var(--ref-frame-space-1)" }}>
          {errorMessage}
        </Text>
      )}

      {/* Calendar dropdown */}
      {open && (
        <div role="dialog" aria-label="Date picker calendar" className="flow-datepicker-dropdown">
          {/* Month/year nav */}
          <div className="flow-datepicker-nav">
            <FlowIconButton
              icon="chevron-left"
              size="sm"
              variant="ghost"
              onClick={prevMonth}
              aria-label="Previous month"
              className="flow-datepicker-nav-btn"
            />
            <Text role="label-s">
              {MONTHS[viewMonth]} {viewYear}
            </Text>
            <FlowIconButton
              icon="chevron-right"
              size="sm"
              variant="ghost"
              onClick={nextMonth}
              aria-label="Next month"
              className="flow-datepicker-nav-btn"
            />
          </div>

          {/* Day headers */}
          <div
            className="flow-datepicker-grid"
            style={{ marginBottom: "var(--ref-frame-space-1)" }}
          >
            {DAYS.map((d) => (
              <div key={d} className="flow-datepicker-day-header">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div role="grid" aria-label="Calendar">
            {weeks.map((week, wi) => (
              <div key={wi} role="row" className="flow-datepicker-grid">
                {week.map((day, di) => {
                  if (!day) return <div key={di} role="gridcell" />;
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  const isToday = isSameDay(day, new Date());
                  const isDayDisabled = isDateDisabled(day);
                  return (
                    <button
                      key={di}
                      type="button"
                      className="flow-datepicker-day flow-focusable"
                      role="gridcell"
                      disabled={isDayDisabled}
                      onClick={() => !isDayDisabled && selectDate(day)}
                      aria-selected={isSelected || undefined}
                      aria-label={`${MONTHS[day.getMonth()]} ${day.getDate()}, ${day.getFullYear()}`}
                      data-selected={isSelected || undefined}
                      data-today={isToday || undefined}
                      {...stateAttrs({ disabled: !!isDayDisabled })}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Today shortcut */}
          <div style={{ marginTop: "var(--ref-frame-space-2)", textAlign: "center" }}>
            <FlowButton
              variant="ghost"
              size="sm"
              onClick={() => {
                const today = new Date();
                setViewYear(today.getFullYear());
                setViewMonth(today.getMonth());
                selectDate(today);
              }}
            >
              Today
            </FlowButton>
          </div>
        </div>
      )}
    </div>
    </GrowthObserver>
  );
}
);
FlowDatePicker.displayName = "FlowDatePicker";
