/** FLOW — FlowCalendarView (L4 Pattern) */
import { type CSSProperties, forwardRef, useMemo, useState } from "react";

import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";
import { Inline, Stack, Text } from "../../primitives";
import { FlowButton } from "../controls/FlowButton";
import { FlowIconButton } from "../controls/FlowIconButton";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CALENDAR VIEW — Month calendar with events
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface CalendarEvent {
  /** Unique event identifier */
  id: string;
  /** Event title text */
  title: string;
  /** Event date in ISO format (YYYY-MM-DD) */
  date: string;
  /** Event dot color */
  color?: string;
  /** Event time label */
  time?: string;
}

/** Props for FlowCalendarView — month calendar grid with event markers and date selection. */
export interface CalendarViewProps {
  /** Calendar events to display */
  events?: CalendarEvent[];
  /** Currently selected date (ISO YYYY-MM-DD) */
  selectedDate?: string | null;
  /** Callback fired when a date is selected */
  onSelectDate?: (date: string) => void;
  /** Callback fired when an event is clicked */
  onEventClick?: (event: CalendarEvent) => void;
  /** Initial month to display (YYYY-MM) */
  defaultMonth?: string;
  /** Calendar size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

const CAL_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CAL_MONTHS = [
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

export const FlowCalendarView = forwardRef<HTMLDivElement, CalendarViewProps>(
  function FlowCalendarView({
  events = [],
  selectedDate,
  onSelectDate,
  onEventClick,
  defaultMonth,
  size = "md",
  className = "",
  style,
  ...rest
}, ref) {
  const resolvedSize = useFlowDefaultSize(size);
  const today = new Date();
  const [viewYear, setViewYear] = useState(() => {
    if (defaultMonth) return parseInt(defaultMonth.split("-")[0]);
    return today.getFullYear();
  });
  const [viewMonth, setViewMonth] = useState(() => {
    if (defaultMonth) return parseInt(defaultMonth.split("-")[1]) - 1;
    return today.getMonth();
  });

  const firstDay = new Date(viewYear, viewMonth, 1);
  const startDow = firstDay.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

  const todayISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const ev of events) {
      if (!map.has(ev.date)) map.set(ev.date, []);
      map.get(ev.date)!.push(ev);
    }
    return map;
  }, [events]);

  const goPrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const goNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };
  const goToday = () => {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
  };

  const cellSize = resolvedSize === "sm" ? 32 : resolvedSize === "lg" ? 56 : 44;
  const cells: { day: number; month: number; year: number; isCurrentMonth: boolean }[] = [];

  // Previous month overflow
  for (let i = startDow - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const m = viewMonth === 0 ? 11 : viewMonth - 1;
    const y = viewMonth === 0 ? viewYear - 1 : viewYear;
    cells.push({ day: d, month: m, year: y, isCurrentMonth: false });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, month: viewMonth, year: viewYear, isCurrentMonth: true });
  }
  // Next month overflow to fill 6 rows
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const m = viewMonth === 11 ? 0 : viewMonth + 1;
    const y = viewMonth === 11 ? viewYear + 1 : viewYear;
    cells.push({ day: d, month: m, year: y, isCurrentMonth: false });
  }

  return (
    <div ref={ref} {...rest} className={className} data-size={resolvedSize} style={style}>
    <Stack gap={2}>
      {/* Header */}
      <Inline align="center" justify="between" style={{ padding: "var(--ref-frame-space-1) 0" }}>
        <Inline gap={2} align="center">
          <FlowIconButton
            icon="chevron-left"
            size="sm"
            variant="ghost"
            onClick={goPrev}
            aria-label="Previous month"
          />
          <Text role="paragraph-s">
            <strong>
              {CAL_MONTHS[viewMonth]} {viewYear}
            </strong>
          </Text>
          <FlowIconButton
            icon="chevron-right"
            size="sm"
            variant="ghost"
            onClick={goNext}
            aria-label="Next month"
          />
        </Inline>
        <FlowButton variant="ghost" size="sm" onClick={goToday}>
          Today
        </FlowButton>
      </Inline>

      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center" }}>
        {CAL_DAYS.map((d) => (
          <Text
            key={d}
            role="caption"
            color="tertiary"
            as="div"
            style={{ padding: "var(--ref-frame-space-1)" }}
          >
            {d}
          </Text>
        ))}
      </div>

      {/* Calendar grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-subtle)",
          borderRadius: "var(--sys-frame-radius-sm)",
          overflow: "hidden",
        }}
      >
        {cells.map((cell, idx) => {
          const iso = `${cell.year}-${String(cell.month + 1).padStart(2, "0")}-${String(cell.day).padStart(2, "0")}`;
          const isToday = iso === todayISO;
          const isSelected = iso === selectedDate;
          const dayEvents = eventsByDate.get(iso) ?? [];

          return (
            <button
              type="button"
              key={idx}
              onClick={() => onSelectDate?.(iso)}
              style={{
                minHeight: cellSize,
                padding: "var(--ref-frame-space-micro)",
                borderRight:
                  (idx + 1) % 7 !== 0
                    ? "var(--sys-frame-border-thin) solid var(--sys-energy-border-subtle)"
                    : undefined,
                borderBottom:
                  idx < 35
                    ? "var(--sys-frame-border-thin) solid var(--sys-energy-border-subtle)"
                    : undefined,
                borderTop: "none",
                borderLeft: "none",
                background: isSelected ? "var(--sys-energy-surface-accent-subtle)" : "transparent",
                cursor: "pointer",
                transition: "background var(--sys-momentum-transition-fast)",
                font: "inherit",
                textAlign: "inherit",
              }}
              onMouseEnter={(e) => {
                if (!isSelected)
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--sys-energy-state-hover)";
              }}
              onMouseLeave={(e) => {
                if (!isSelected) (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "var(--ref-icon-size-lg)",
                  height: "var(--ref-icon-size-lg)",
                  margin: "0 auto",
                  borderRadius: "50%",
                  background: isToday ? "var(--sys-energy-status-info)" : "transparent",
                  color: isToday
                    ? "var(--sys-energy-text-inverse)"
                    : !cell.isCurrentMonth
                      ? "var(--sys-energy-text-disabled)"
                      : "var(--sys-energy-text-primary)",
                  fontSize: "var(--sys-voice-caption-size)",
                }}
              >
                {cell.day}
              </div>
              {dayEvents.length > 0 && (
                <Stack gap={0} style={{ marginTop: "var(--ref-frame-space-micro)" }}>
                  {dayEvents.slice(0, 2).map((ev) => (
                    <div
                      key={ev.id}
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick?.(ev);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          onEventClick?.(ev);
                        }
                      }}
                      style={{
                        fontSize: "var(--sys-voice-overline-size)",
                        lineHeight: "14px",
                        padding: "0 var(--ref-frame-space-1)",
                        borderRadius: "var(--ref-frame-space-micro)",
                        background: ev.color ?? "var(--sys-energy-status-info)",
                        color: "var(--sys-energy-text-inverse)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {ev.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <Text role="overline" color="tertiary" style={{ textAlign: "center" }}>
                      +{dayEvents.length - 2} more
                    </Text>
                  )}
                </Stack>
              )}
            </button>
          );
        })}
      </div>
    </Stack>
    </div>
  );
});
FlowCalendarView.displayName = "FlowCalendarView";
