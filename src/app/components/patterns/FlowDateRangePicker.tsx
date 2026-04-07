/** FLOW — FlowDateRangePicker (L4 Pattern) */
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

import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";
import { FlowIcon, Inline, Stack, stateAttrs, Text } from "../../primitives";
import { FlowTextInput } from "../inputs/FlowTextInput";
import { FlowIconButton } from "../controls/FlowIconButton";
import { FlowButton } from "../controls/FlowButton";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § 2. FlowDateRangePicker
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface DateRange {
  /** Start date in ISO format (YYYY-MM-DD) */
  start: string;
  /** End date in ISO format (YYYY-MM-DD) */
  end: string;
}

export interface DateRangePreset {
  /** Preset display label */
  label: string;
  /** Function returning the preset date range */
  getRange: () => DateRange;
}

/** Props for FlowDateRangePicker — two-month calendar for selecting a start and end date range with presets. */
export interface DateRangePickerProps {
  /** Controlled date range value */
  value?: DateRange | null;
  /** Default date range (uncontrolled) */
  defaultValue?: DateRange | null;
  /** Callback fired when the range changes */
  onChange?: (range: DateRange | null) => void;
  /** Floating label text */
  label?: string;
  /** Placeholder for the start date field */
  placeholderStart?: string;
  /** Placeholder for the end date field */
  placeholderEnd?: string;
  /** Minimum selectable date (ISO) */
  min?: string;
  /** Maximum selectable date (ISO) */
  max?: string;
  /** Array of disabled dates (ISO) */
  disabledDates?: string[];
  /** Quick-select date range presets */
  presets?: DateRangePreset[];
  /** Control size variant */
  size?: "sm" | "md" | "lg" | "xl";
  /** Whether the picker is in an error state */
  error?: boolean;
  /** Error message text */
  errorMessage?: string;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
  /** Accessible label */
  "aria-label"?: string;
}

const RANGE_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const RANGE_MONTHS = [
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
const RANGE_MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function rParseISO(str: string): Date | null {
  if (!str) return null;
  const [y, m, d] = str.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function rToISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function rIsSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function rGetCalendarGrid(year: number, month: number): (Date | null)[][] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
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

function getDefaultPresets(): DateRangePreset[] {
  return [
    {
      label: "Today",
      getRange: () => {
        const t = rToISO(new Date());
        return { start: t, end: t };
      },
    },
    {
      label: "Last 7 days",
      getRange: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 6);
        return { start: rToISO(start), end: rToISO(end) };
      },
    },
    {
      label: "Last 30 days",
      getRange: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 29);
        return { start: rToISO(start), end: rToISO(end) };
      },
    },
    {
      label: "This month",
      getRange: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return { start: rToISO(start), end: rToISO(end) };
      },
    },
    {
      label: "Last month",
      getRange: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const end = new Date(now.getFullYear(), now.getMonth(), 0);
        return { start: rToISO(start), end: rToISO(end) };
      },
    },
  ];
}

export const FlowDateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  function FlowDateRangePicker({
  value: controlledValue,
  defaultValue,
  onChange,
  label,
  placeholderStart = "Start date",
  placeholderEnd = "End date",
  min,
  max,
  disabledDates = [],
  presets,
  size = "md",
  error,
  errorMessage,
  disabled,
  className = "",
  style,
  "aria-label": ariaLabel,
  ...rest
}, ref) {
  const resolvedSize = useFlowDefaultSize(size);
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const setRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<DateRange | null>(defaultValue ?? null);
  const currentRange = controlledValue !== undefined ? controlledValue : internalValue;
  const calendarRef = useRef<HTMLDivElement>(null);
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);
  const skipToggleRef = useRef(false);

  // Selection state: picking start or end
  const [pickingStart, setPickingStart] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);

  // Two-month view: left and right
  const startDate = currentRange ? rParseISO(currentRange.start) : null;
  const [leftYear, setLeftYear] = useState(
    () => startDate?.getFullYear() ?? new Date().getFullYear(),
  );
  const [leftMonth, setLeftMonth] = useState(() => startDate?.getMonth() ?? new Date().getMonth());

  const rightYear = leftMonth === 11 ? leftYear + 1 : leftYear;
  const rightMonth = leftMonth === 11 ? 0 : leftMonth + 1;

  const minDate = min ? rParseISO(min) : null;
  const maxDate = max ? rParseISO(max) : null;
  const disabledSet = useMemo(() => new Set(disabledDates), [disabledDates]);

  const isDateDisabled = useCallback(
    (d: Date): boolean => {
      if (minDate && d < minDate) return true;
      if (maxDate && d > maxDate) return true;
      if (disabledSet.has(rToISO(d))) return true;
      return false;
    },
    [minDate, maxDate, disabledSet],
  );

  const actualPresets = presets ?? getDefaultPresets();

  const applyRange = useCallback(
    (range: DateRange | null) => {
      if (onChange) onChange(range);
      else setInternalValue(range);
    },
    [onChange],
  );

  const handleDayClick = useCallback(
    (day: Date) => {
      if (isDateDisabled(day)) return;

      if (!pickingStart) {
        // First click: set start
        setPickingStart(day);
        setHoverDate(null);
      } else {
        // Second click: set range
        let start = pickingStart;
        let end = day;
        if (end < start) {
          const tmp = start;
          start = end;
          end = tmp;
        }
        applyRange({ start: rToISO(start), end: rToISO(end) });
        setPickingStart(null);
        setHoverDate(null);
        setOpen(false);
      }
    },
    [pickingStart, isDateDisabled, applyRange],
  );

  const handlePreset = useCallback(
    (preset: DateRangePreset) => {
      const range = preset.getRange();
      applyRange(range);
      setPickingStart(null);
      setHoverDate(null);
      setOpen(false);
      // Navigate calendar to show start date
      const sd = rParseISO(range.start);
      if (sd) {
        setLeftYear(sd.getFullYear());
        setLeftMonth(sd.getMonth());
      }
    },
    [applyRange],
  );

  const clearRange = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      applyRange(null);
      setPickingStart(null);
    },
    [applyRange],
  );

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setPickingStart(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setPickingStart(null);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Set aria attributes imperatively — FlowTextInput does not forward them to its <input>
  useEffect(() => {
    const startEl = startInputRef.current;
    if (startEl) {
      startEl.setAttribute("aria-expanded", String(open));
      startEl.setAttribute("aria-haspopup", "dialog");
      startEl.setAttribute("aria-label", ariaLabel || label || "Select date range");
    }
    const endEl = endInputRef.current;
    if (endEl) {
      endEl.setAttribute("aria-label", "End date");
    }
  }, [open, ariaLabel, label]);

  const prevMonth = useCallback(() => {
    if (leftMonth === 0) {
      setLeftMonth(11);
      setLeftYear((y) => y - 1);
    } else setLeftMonth((m) => m - 1);
  }, [leftMonth]);
  const nextMonth = useCallback(() => {
    if (leftMonth === 11) {
      setLeftMonth(0);
      setLeftYear((y) => y + 1);
    } else setLeftMonth((m) => m + 1);
  }, [leftMonth]);

  // Render-time detection: reset focused date when calendar opens
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      const initial = currentRange ? rParseISO(currentRange.start) : new Date();
      setFocusedDate(initial || new Date());
    }
  }

  // Auto-focus first day when calendar opens (async DOM work stays in effect)
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        const btn = calendarRef.current?.querySelector<HTMLButtonElement>(
          "button[aria-selected='true'], button[data-today='true'], button:not(:disabled)",
        );
        btn?.focus();
      });
    }
  }, [open]);

  // Arrow key navigation within calendar grid (WAI-ARIA Grid pattern)
  const handleCalendarKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!focusedDate) return;
      let next: Date | null = null;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          next = new Date(
            focusedDate.getFullYear(),
            focusedDate.getMonth(),
            focusedDate.getDate() + 1,
          );
          break;
        case "ArrowLeft":
          e.preventDefault();
          next = new Date(
            focusedDate.getFullYear(),
            focusedDate.getMonth(),
            focusedDate.getDate() - 1,
          );
          break;
        case "ArrowDown":
          e.preventDefault();
          next = new Date(
            focusedDate.getFullYear(),
            focusedDate.getMonth(),
            focusedDate.getDate() + 7,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          next = new Date(
            focusedDate.getFullYear(),
            focusedDate.getMonth(),
            focusedDate.getDate() - 7,
          );
          break;
        case "PageDown":
          e.preventDefault();
          next = new Date(
            focusedDate.getFullYear(),
            focusedDate.getMonth() + 1,
            focusedDate.getDate(),
          );
          break;
        case "PageUp":
          e.preventDefault();
          next = new Date(
            focusedDate.getFullYear(),
            focusedDate.getMonth() - 1,
            focusedDate.getDate(),
          );
          break;
        case "Home":
          e.preventDefault();
          next = new Date(focusedDate.getFullYear(), focusedDate.getMonth(), 1);
          break;
        case "End":
          e.preventDefault();
          next = new Date(focusedDate.getFullYear(), focusedDate.getMonth() + 1, 0);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (!isDateDisabled(focusedDate)) handleDayClick(focusedDate);
          return;
      }

      if (next) {
        if (minDate && next < minDate) return;
        if (maxDate && next > maxDate) return;
        setFocusedDate(next);
        // Navigate calendar view if needed
        if (next.getMonth() < leftMonth || next.getFullYear() < leftYear) prevMonth();
        else if (next.getMonth() > rightMonth || next.getFullYear() > rightYear) nextMonth();
        // Focus the corresponding button
        requestAnimationFrame(() => {
          const iso = rToISO(next!);
          const btn = calendarRef.current?.querySelector<HTMLButtonElement>(
            `button[data-date="${iso}"]`,
          );
          btn?.focus();
        });
      }
    },
    [
      focusedDate,
      isDateDisabled,
      handleDayClick,
      minDate,
      maxDate,
      leftMonth,
      leftYear,
      rightMonth,
      rightYear,
      prevMonth,
      nextMonth,
    ],
  );

  // Format display
  const formatDate = (iso: string) => {
    const d = rParseISO(iso);
    if (!d) return "";
    return `${RANGE_MONTHS_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  const displayStart = currentRange ? formatDate(currentRange.start) : "";
  const displayEnd = currentRange ? formatDate(currentRange.end) : "";
  const _heightVar = "var(--sys-size-control-height)";

  // Determine if a date is in the active/preview range
  const isInRange = useCallback(
    (day: Date): boolean => {
      if (pickingStart && hoverDate) {
        const a = pickingStart < hoverDate ? pickingStart : hoverDate;
        const b = pickingStart < hoverDate ? hoverDate : pickingStart;
        return day >= a && day <= b;
      }
      if (currentRange) {
        const s = rParseISO(currentRange.start);
        const e = rParseISO(currentRange.end);
        if (s && e) return day >= s && day <= e;
      }
      return false;
    },
    [pickingStart, hoverDate, currentRange],
  );

  const isRangeStart = useCallback(
    (day: Date): boolean => {
      if (pickingStart && !hoverDate) return rIsSameDay(day, pickingStart);
      if (pickingStart && hoverDate) {
        const a = pickingStart < hoverDate ? pickingStart : hoverDate;
        return rIsSameDay(day, a);
      }
      if (currentRange) {
        const s = rParseISO(currentRange.start);
        return !!s && rIsSameDay(day, s);
      }
      return false;
    },
    [pickingStart, hoverDate, currentRange],
  );

  const isRangeEnd = useCallback(
    (day: Date): boolean => {
      if (pickingStart && hoverDate) {
        const b = pickingStart < hoverDate ? hoverDate : pickingStart;
        return rIsSameDay(day, b);
      }
      if (currentRange) {
        const e = rParseISO(currentRange.end);
        return !!e && rIsSameDay(day, e);
      }
      return false;
    },
    [pickingStart, hoverDate, currentRange],
  );

  const renderMonth = (year: number, month: number) => {
    const weeks = rGetCalendarGrid(year, month);
    return (
      <Stack gap={0} style={{ flex: 1, minWidth: 0 }}>
        {/* Month title */}
        <Text
          role="label-m"
          style={{
            textAlign: "center",
            marginBottom: "var(--ref-frame-space-2)",
          }}
        >
          {RANGE_MONTHS[month]} {year}
        </Text>

        {/* Day headers */}
        <div className="flow-datepicker-grid">
          {RANGE_DAYS.map((d) => (
            <Text key={d} as="div" role="caption" className="flow-datepicker-day-header">
              {d}
            </Text>
          ))}
        </div>

        {/* Calendar grid */}
        <div role="grid" aria-label={`${RANGE_MONTHS[month]} ${year}`}>
          {weeks.map((week, wi) => (
            <div key={wi} role="row" className="flow-datepicker-grid">
              {week.map((day, di) => {
                if (!day) return <div key={di} role="gridcell" />;
                const isDis = isDateDisabled(day);
                const inRange = isInRange(day);
                const isStart = isRangeStart(day);
                const isEnd = isRangeEnd(day);
                const isEndpoint = isStart || isEnd;
                const isToday = rIsSameDay(day, new Date());

                return (
                  <button
                    key={di}
                    type="button"
                    className="flow-datepicker-day flow-focusable"
                    role="gridcell"
                    disabled={isDis}
                    data-date={rToISO(day)}
                    data-today={isToday || undefined}
                    data-selected={isEndpoint || undefined}
                    data-in-range={(inRange && !isEndpoint) || undefined}
                    data-range-start={isStart || undefined}
                    data-range-end={isEnd || undefined}
                    tabIndex={focusedDate && rIsSameDay(day, focusedDate) ? 0 : -1}
                    onClick={() => handleDayClick(day)}
                    onMouseEnter={() => {
                      if (pickingStart && !isDis) setHoverDate(day);
                    }}
                    aria-selected={isEndpoint || undefined}
                    aria-label={`${RANGE_MONTHS[day.getMonth()]} ${day.getDate()}, ${day.getFullYear()}`}
                    {...stateAttrs({ disabled: !!isDis })}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </Stack>
    );
  };

  return (
    <div
      ref={setRootRef}
      {...rest}
      className={`flow-daterangepicker ${className}`}
      data-size={resolvedSize}
      {...stateAttrs({ disabled: !!disabled, error: !!error })}
      style={style}
    >
      {/* Label */}
      {label && (
        <label htmlFor={id} className="flow-datepicker-label">
          {label}
        </label>
      )}

      {/* Trigger: two date inputs — composed from FlowTextInput (L3) */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
        if (skipToggleRef.current) { skipToggleRef.current = false; return; }
        if (!disabled) setOpen(!open);
      }}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (!disabled) setOpen(!open); } }}
      >
        <Inline gap={2} align="center">
          <FlowTextInput
            ref={startInputRef}
            id={id}
            value={displayStart}
            readOnly
            placeholder={placeholderStart}
            leadingIcon="calendar"
            size={resolvedSize}
            disabled={disabled}
            style={{ flex: 1 }}
          />

          <span style={{ color: "var(--sys-energy-text-tertiary)", flexShrink: 0 }}>
            <FlowIcon name="arrow-right" size="sm" />
          </span>

          <FlowTextInput
            ref={endInputRef}
            value={displayEnd}
            readOnly
            placeholder={placeholderEnd}
            clearable={!!currentRange && !disabled}
            onClear={() => {
              skipToggleRef.current = true;
              clearRange();
            }}
            size={resolvedSize}
            disabled={disabled}
            style={{ flex: 1 }}
          />
        </Inline>
      </div>

      {/* Error message */}
      {error && errorMessage && (
        <Text role="caption" color="danger" style={{ marginTop: "var(--ref-frame-space-1)" }}>
          {errorMessage}
        </Text>
      )}

      {/* Calendar dropdown */}
      {open && (
        <div role="dialog" aria-label="Date range picker" className="flow-daterangepicker-dropdown">
          {/* Presets sidebar */}
          {actualPresets.length > 0 && (
            <div className="flow-daterangepicker-presets">
              <Text
                role="label-s"
                color="tertiary"
                style={{ marginBottom: "var(--ref-frame-space-1)" }}
              >
                Quick select
              </Text>
              {actualPresets.map((preset) => (
                <FlowButton
                  key={preset.label}
                  variant="ghost"
                  size="sm"
                  className="flow-daterangepicker-preset-btn"
                  onClick={() => handlePreset(preset)}
                >
                  {preset.label}
                </FlowButton>
              ))}
            </div>
          )}

          {/* Two month calendars */}
          <div ref={calendarRef} role="grid" aria-label="Date range calendar" tabIndex={-1} onKeyDown={handleCalendarKeyDown}>
            {/* Nav header */}
            <Inline className="flow-datepicker-nav" justify="between" align="center">
              <FlowIconButton
                icon="chevron-left"
                size="sm"
                variant="ghost"
                onClick={prevMonth}
                aria-label="Previous month"
                className="flow-datepicker-nav-btn"
              />
              <FlowIconButton
                icon="chevron-right"
                size="sm"
                variant="ghost"
                onClick={nextMonth}
                aria-label="Next month"
                className="flow-datepicker-nav-btn"
              />
            </Inline>

            {/* Calendars side by side */}
            <Inline className="flow-daterangepicker-calendars">
              {renderMonth(leftYear, leftMonth)}
              {renderMonth(rightYear, rightMonth)}
            </Inline>

            {/* Picking indicator */}
            {pickingStart && (
              <div
                style={{
                  marginTop: "var(--ref-frame-space-2)",
                  textAlign: "center",
                }}
              >
                <Text role="caption" color="accent">
                  Now select the end date
                </Text>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});
FlowDateRangePicker.displayName = "FlowDateRangePicker";

const _rangeNavBtnStyle: CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "var(--ref-frame-space-1)",
  color: "var(--sys-energy-text-secondary)",
  display: "flex",
  alignItems: "center",
  borderRadius: "var(--sys-frame-radius-sm)",
};
