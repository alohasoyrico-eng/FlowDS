/** FLOW — FlowSortControl (L3 Data) */
import { type CSSProperties, memo } from "react";

import { FlowIcon, Inline, Text } from "@flow/primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SORT CONTROL — Column sort toggle
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type SortDirection = "asc" | "desc" | null;

export interface SortOption {
  /** Unique key identifying the sortable field */
  key: string;
  /** Display label for the sort option */
  label: string;
}

/** Props for FlowSortControl — inline sort toggle buttons that cycle through ascending, descending, and unsorted states. */
export interface SortControlProps {
  /** Available sort options */
  options: SortOption[];
  /** Currently active sort key (null if unsorted) */
  sortKey: string | null;
  /** Current sort direction */
  sortDirection: SortDirection;
  /** Callback fired when sort changes */
  onSortChange: (key: string, direction: SortDirection) => void;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowSortControl = memo(function FlowSortControl({
  options,
  sortKey,
  sortDirection,
  onSortChange,
  className = "",
  style,
}: SortControlProps) {
  const cycle = (key: string) => {
    if (sortKey !== key) onSortChange(key, "asc");
    else if (sortDirection === "asc") onSortChange(key, "desc");
    else onSortChange(key, null);
  };

  return (
    <Inline gap={1} className={`flow-sort-control ${className}`} style={style}>
      <Text variant="caption" color="secondary" style={{ whiteSpace: "nowrap" }}>
        Sort by:
      </Text>
      {options.map((opt) => {
        const isActive = sortKey === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            className="flow-focusable"
            onClick={() => cycle(opt.key)}
            aria-label={`Sort by ${opt.label}${isActive && sortDirection ? (sortDirection === "asc" ? ", ascending" : ", descending") : ""}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--comp-sort-control-gap)",
              padding: "var(--ref-frame-space-1) var(--ref-frame-space-2)",
              borderRadius: "var(--sys-frame-radius-sm)",
              border: "none",
              background: isActive ? "var(--sys-energy-surface-interactive)" : "transparent",
              color: isActive
                ? "var(--sys-energy-text-accent)"
                : "var(--sys-energy-text-secondary)",
              fontFamily: "var(--ref-voice-family-sans)",
              fontSize: "var(--sys-voice-caption-size)",
              fontWeight: isActive
                ? "var(--ref-voice-weight-medium)"
                : "var(--ref-voice-weight-regular)",
              cursor: "pointer",
            }}
          >
            {opt.label}
            {isActive && sortDirection && (
              <FlowIcon
                name={sortDirection === "asc" ? "arrow-up" : "arrow-down"}
                size="sm"
                style={{
                  width: "var(--comp-sort-control-icon-size)",
                  height: "var(--comp-sort-control-icon-size)",
                }}
              />
            )}
          </button>
        );
      })}
    </Inline>
  );
});
