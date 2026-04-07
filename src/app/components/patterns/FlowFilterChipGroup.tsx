/** FLOW — FlowFilterChipGroup (L4 Pattern) */
import { type CSSProperties, forwardRef } from "react";

import { FlowIcon, Text } from "../../primitives";
import { FlowChip } from "../display/FlowChip";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILTER CHIP GROUP — Toggleable filter chips
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface FilterChip {
  /** Unique chip identifier */
  id: string;
  /** Chip label text */
  label: string;
  /** Optional count badge */
  count?: number;
}

/** Props for FlowFilterChipGroup — group of toggleable filter chips for multi-select or exclusive filtering. */
export interface FilterChipGroupProps {
  /** Available filter chips */
  chips: FilterChip[];
  /** Currently selected chip IDs */
  selected: Set<string>;
  /** Callback fired when selection changes */
  onSelectionChange: (selected: Set<string>) => void;
  /** Whether only one chip can be selected at a time */
  exclusive?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowFilterChipGroup = forwardRef<HTMLDivElement, FilterChipGroupProps>(
  function FlowFilterChipGroup({
  chips,
  selected,
  onSelectionChange,
  exclusive = false,
  className = "",
  style,
  ...rest
}, ref) {
  // Guard: return null if no chips
  if (!chips || chips.length === 0) {
    return null;
  }

  const toggle = (id: string) => {
    if (exclusive) {
      onSelectionChange(selected.has(id) ? new Set() : new Set([id]));
    } else {
      const next = new Set(selected);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      onSelectionChange(next);
    }
  };

  return (
    <div
      ref={ref}
      {...rest}
      className={`flow-filter-chip-group ${className}`}
      role="group"
      style={{ display: "flex", flexWrap: "wrap", gap: "var(--ref-frame-space-2)", ...style }}
    >
      {chips.map((chip) => {
        const isSelected = selected.has(chip.id);
        return (
          <FlowChip
            key={chip.id}
            variant="filter"
            size="sm"
            selected={isSelected}
            onClick={() => toggle(chip.id)}
            className="flow-focusable"
          >
            {isSelected && (
              <FlowIcon
                name="check"
                size="sm"
                style={{
                  width: "var(--comp-filter-chip-icon-size)",
                  height: "var(--comp-filter-chip-icon-size)",
                }}
              />
            )}
            {chip.label}
            {chip.count !== undefined && (
              <Text role="caption" color="inherit" style={{ opacity: "var(--ref-state-opacity-muted)" }}>
                {chip.count}
              </Text>
            )}
          </FlowChip>
        );
      })}
    </div>
  );
});
FlowFilterChipGroup.displayName = "FlowFilterChipGroup";
