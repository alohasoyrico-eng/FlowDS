/** FLOW — FlowAdvancedFilters (L4 Pattern) */
import { type CSSProperties, forwardRef } from "react";

import { FlowIcon, GrowthObserver, Inline, Stack, Surface, Text } from "@flow/primitives";
import { FlowButton, FlowIconButton, FlowSelect, FlowTextInput } from "@flow/components";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ADVANCED FILTERS — Desktop filter panel
// Multi-criteria filtering with add/remove filter rows
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface FilterField {
  /** Unique field identifier */
  key: string;
  /** Display label for the field */
  label: string;
  /** Input type used for the filter value */
  type: "text" | "number" | "select" | "date";
  /** Selectable options (required for select type) */
  options?: { value: string; label: string }[];
}

export interface FilterRow {
  /** Unique row identifier */
  id: string;
  /** Selected field key */
  field: string;
  /** Selected operator */
  operator: string;
  /** Filter value */
  value: string;
}

/** Props for FlowAdvancedFilters — multi-criteria filter panel with dynamically added/removed filter rows. */
export interface AdvancedFiltersProps {
  /** Available filter fields */
  fields: FilterField[];
  /** Current active filter rows */
  filters: FilterRow[];
  /** Callback fired when filters change */
  onFiltersChange: (filters: FilterRow[]) => void;
  /** Callback fired when filters are applied */
  onApply?: () => void;
  /** Callback fired when all filters are cleared */
  onClear?: () => void;
  /** Maximum number of filter rows allowed */
  maxFilters?: number;
  /** Loading state */
  loading?: boolean;
  /** Error state */
  error?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

const OPERATORS: Record<string, { value: string; label: string }[]> = {
  text: [
    { value: "contains", label: "contains" },
    { value: "equals", label: "equals" },
    { value: "starts_with", label: "starts with" },
    { value: "ends_with", label: "ends with" },
    { value: "not_contains", label: "not contains" },
  ],
  number: [
    { value: "eq", label: "=" },
    { value: "neq", label: "≠" },
    { value: "gt", label: ">" },
    { value: "gte", label: "≥" },
    { value: "lt", label: "<" },
    { value: "lte", label: "≤" },
  ],
  select: [
    { value: "is", label: "is" },
    { value: "is_not", label: "is not" },
  ],
  date: [
    { value: "is", label: "is" },
    { value: "before", label: "before" },
    { value: "after", label: "after" },
  ],
};

let _filterId = 0;
function newFilterId() {
  return `f-${++_filterId}`;
}

export const FlowAdvancedFilters = forwardRef<HTMLDivElement, AdvancedFiltersProps>(
  function FlowAdvancedFilters(
    {
      fields,
      filters,
      onFiltersChange,
      onApply,
      onClear,
      maxFilters = 10,
      loading = false,
      error = false,
      className = "",
      style,
      ...rest
    },
    ref,
  ) {
    const addFilter = () => {
      if (filters.length >= maxFilters) return;
      const firstField = fields[0];
      const type = firstField?.type || "text";
      const ops = OPERATORS[type] || OPERATORS.text;
      onFiltersChange([
        ...filters,
        {
          id: newFilterId(),
          field: firstField?.key || "",
          operator: ops[0]?.value || "contains",
          value: "",
        },
      ]);
    };

    const removeFilter = (id: string) => {
      onFiltersChange(filters.filter((f) => f.id !== id));
    };

    const updateFilter = (id: string, updates: Partial<FilterRow>) => {
      onFiltersChange(filters.map((f) => (f.id === id ? { ...f, ...updates } : f)));
    };

    const clearAll = () => {
      onFiltersChange([]);
      onClear?.();
    };

    return (
      <GrowthObserver event="flow.advanced-filters.impression">
        <Surface
          ref={ref}
          {...rest}
          radius="container"
          border
          padding="control"
          className={`flow-advanced-filters ${className}`}
          style={style}
          data-state={error ? "error" : loading ? "loading" : undefined}
          aria-invalid={error || undefined}
          aria-busy={loading || undefined}
        >
          <Stack gap="component">
            <Inline gap={2} justify="between">
              <Inline gap={2}>
                <FlowIcon name="filter" size="sm" />
                <Text variant="label-m">Filters {filters.length > 0 && `(${filters.length})`}</Text>
              </Inline>
              <Inline gap={2}>
                {filters.length > 0 && (
                  <FlowButton variant="ghost" size="sm" onClick={clearAll}>
                    Clear all
                  </FlowButton>
                )}
                <FlowButton
                  variant="outlined"
                  size="sm"
                  leadingIcon="plus"
                  onClick={addFilter}
                  disabled={filters.length >= maxFilters}
                >
                  Add filter
                </FlowButton>
              </Inline>
            </Inline>

            {/* Filter rows */}
            {filters.map((filter, i) => {
              const fieldDef = fields.find((f) => f.key === filter.field);
              const type = fieldDef?.type || "text";
              const ops = OPERATORS[type] || OPERATORS.text;

              return (
                <div
                  key={filter.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--ref-frame-space-2)",
                  }}
                >
                  {/* Where / And */}
                  <span
                    style={{
                      flex: "0 0 var(--comp-advanced-filters-label-width)",
                      fontSize: "var(--sys-voice-caption-size)",
                      fontFamily: "var(--ref-voice-family-sans)",
                      color: "var(--sys-energy-text-tertiary)",
                      textAlign: "right",
                      paddingRight: "var(--ref-frame-space-1)",
                    }}
                  >
                    {i === 0 ? "Where" : "And"}
                  </span>

                  {/* Field select */}
                  <FlowSelect
                    label="Field"
                    options={fields.map((f) => ({ value: f.key, label: f.label }))}
                    value={filter.field}
                    onChange={(val) => {
                      const newField = fields.find((f) => f.key === val);
                      const newType = newField?.type || "text";
                      const newOps = OPERATORS[newType] || OPERATORS.text;
                      updateFilter(filter.id, {
                        field: val,
                        operator: newOps[0]?.value || "contains",
                        value: "",
                      });
                    }}
                    size="sm"
                    style={{
                      flex: "0 0 auto",
                      minWidth: "var(--comp-advanced-filters-field-min-width)",
                    }}
                  />

                  {/* Operator select */}
                  <FlowSelect
                    label="Operator"
                    options={ops}
                    value={filter.operator}
                    onChange={(val) => updateFilter(filter.id, { operator: val })}
                    size="sm"
                    style={{
                      flex: "0 0 auto",
                      minWidth: "var(--comp-advanced-filters-operator-min-width)",
                    }}
                  />

                  {/* Value input */}
                  {fieldDef?.type === "select" ? (
                    <FlowSelect
                      label="Value"
                      options={fieldDef.options || []}
                      value={filter.value}
                      onChange={(val) => updateFilter(filter.id, { value: val })}
                      placeholder="Select..."
                      size="sm"
                      style={{ flex: 1, minWidth: 0 }}
                    />
                  ) : (
                    <FlowTextInput
                      type={
                        fieldDef?.type === "number"
                          ? "number"
                          : fieldDef?.type === "date"
                            ? "date"
                            : "text"
                      }
                      value={filter.value}
                      onChange={(val) => updateFilter(filter.id, { value: val })}
                      placeholder="Value..."
                      size="sm"
                      style={{ flex: 1, minWidth: 0 }}
                    />
                  )}

                  {/* Remove */}
                  <FlowIconButton
                    icon="x"
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFilter(filter.id)}
                    aria-label="Remove filter"
                  />
                </div>
              );
            })}

            {/* Apply button */}
            {filters.length > 0 && onApply && (
              <Inline justify="end">
                <FlowButton variant="primary" onClick={onApply}>
                  Apply Filters
                </FlowButton>
              </Inline>
            )}
          </Stack>
        </Surface>
      </GrowthObserver>
    );
  },
);
FlowAdvancedFilters.displayName = "FlowAdvancedFilters";
