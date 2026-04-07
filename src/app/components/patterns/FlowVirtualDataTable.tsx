/** FLOW — FlowVirtualDataTable (L4 Pattern) */
import React, {
  type CSSProperties,
  forwardRef,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";
import { FlowIcon, Inline, stateAttrs, Surface, Text } from "../../primitives";
import { FlowTextInput } from "../inputs/FlowTextInput";
import { FlowIconButton } from "../controls/FlowIconButton";
import { FlowCheckbox } from "../selection/FlowCheckbox";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § 3. FlowVirtualDataTable
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface VirtualDataTableColumn<T> {
  /** Unique column identifier */
  key: string;
  /** Column header content */
  header: ReactNode;
  /** Fixed column width (CSS value) */
  width?: string;
  /** Minimum column width (CSS value) */
  minWidth?: string;
  /** Cell content alignment */
  align?: "left" | "center" | "right";
  /** Whether the column is sortable */
  sortable?: boolean;
  /** Custom sort comparison function */
  sortFn?: (a: T, b: T) => number;
  /** Whether the column is filterable */
  filterable?: boolean;
  /** Custom cell renderer */
  render?: (row: T, index: number) => ReactNode;
  /** ARIA role for cells in this column */
  cellRole?: string;
}

type VSortDirection = "asc" | "desc" | null;

interface VSortState {
  key: string;
  direction: VSortDirection;
}

/** Props for FlowVirtualDataTable — virtualized data table with sorting, filtering, and row selection. */
export interface VirtualDataTableProps<T> {
  /** Column definitions */
  columns: VirtualDataTableColumn<T>[];
  /** Row data array */
  data: T[];
  /** Function to derive a unique key per row */
  rowKey: (row: T, index: number) => string;
  /** Row height in px — must be fixed for virtual scrolling */
  rowHeight?: number;
  /** Visible height of the scroll container */
  height?: number;
  /** Number of extra rows rendered above/below viewport as buffer */
  overscan?: number;
  /** Whether rows can be selected via checkboxes */
  selectable?: boolean;
  /** Controlled set of selected row keys */
  selectedKeys?: Set<string>;
  /** Callback fired when selection changes */
  onSelectionChange?: (keys: Set<string>) => void;
  /** Whether to show a search/filter input */
  searchable?: boolean;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Table size variant */
  size?: "sm" | "md" | "lg" | "xl";
  /** Whether to show alternating row backgrounds */
  striped?: boolean;
  /** Whether rows highlight on hover */
  hoverable?: boolean;
  /** Whether the table is in a loading state */
  loading?: boolean;
  /** Message shown when data is empty */
  emptyMessage?: string;
  /** Table caption for accessibility */
  caption?: string;
  /** Additional toolbar actions */
  toolbarActions?: ReactNode;
  /** Accessible label for the table */
  "aria-label"?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

const ROW_SIZE_MAP: Record<string, number> = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

function FlowVirtualDataTableInner<T extends object>({
  columns,
  data,
  rowKey,
  rowHeight: rowHeightProp,
  height = 480,
  overscan = 5,
  selectable = false,
  selectedKeys: controlledSelected,
  onSelectionChange,
  searchable = false,
  searchPlaceholder = "Filter...",
  size = "md",
  striped = false,
  hoverable = true,
  loading = false,
  emptyMessage = "No data",
  caption,
  toolbarActions,
  "aria-label": ariaLabel,
  className = "",
  style,
  ...rest
}: VirtualDataTableProps<T>, ref: React.ForwardedRef<HTMLDivElement>) {
  const resolvedSize = useFlowDefaultSize(size);
  const _idPrefix = useId();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const rowHeight = rowHeightProp ?? ROW_SIZE_MAP[resolvedSize] ?? 40;

  // ── Search ──
  const [searchText, setSearchText] = useState("");

  // ── Sort ──
  const [sort, setSort] = useState<VSortState>({ key: "", direction: null });

  // ── Selection (uncontrolled fallback) ──
  const [internalSelected, setInternalSelected] = useState<Set<string>>(new Set());
  const selected = controlledSelected ?? internalSelected;
  const setSelected = useCallback(
    (keys: Set<string>) => {
      if (onSelectionChange) onSelectionChange(keys);
      else setInternalSelected(keys);
    },
    [onSelectionChange],
  );

  // ── Scroll state ──
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      setScrollTop(scrollContainerRef.current.scrollTop);
    }
  }, []);

  // ── Filtered data ──
  const filtered = useMemo(() => {
    if (!searchText.trim()) return data;
    const q = searchText.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const val = (row as Record<string, unknown>)[col.key];
        return val !== null && val !== undefined && String(val).toLowerCase().includes(q);
      }),
    );
  }, [data, searchText, columns]);

  // ── Sorted data ──
  const sorted = useMemo(() => {
    if (!sort.key || !sort.direction) return filtered;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return filtered;
    const dir = sort.direction === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      if (col.sortFn) return col.sortFn(a, b) * dir;
      const aVal = String((a as Record<string, unknown>)[sort.key] ?? "");
      const bVal = String((b as Record<string, unknown>)[sort.key] ?? "");
      return aVal.localeCompare(bVal) * dir;
    });
  }, [filtered, sort, columns]);

  // Reset scroll on filter/data change — DOM reset triggers onScroll → setScrollTop
  useEffect(() => {
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
  }, [searchText, data.length]);

  // ── Sort toggle ──
  const toggleSort = useCallback((key: string) => {
    setSort((prev) => {
      if (prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return { key: "", direction: null };
    });
  }, []);

  // ── Selection helpers ──
  const allKeys = useMemo(() => sorted.map((row, idx) => rowKey(row, idx)), [sorted, rowKey]);
  const allSelected = allKeys.length > 0 && allKeys.every((k) => selected.has(k));
  const someSelected = allKeys.some((k) => selected.has(k));

  const toggleSelectAll = useCallback(() => {
    if (allSelected) {
      const next = new Set(selected);
      allKeys.forEach((k) => next.delete(k));
      setSelected(next);
    } else {
      const next = new Set(selected);
      allKeys.forEach((k) => next.add(k));
      setSelected(next);
    }
  }, [allSelected, allKeys, selected, setSelected]);

  const toggleSelectRow = useCallback(
    (key: string) => {
      const next = new Set(selected);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      setSelected(next);
    },
    [selected, setSelected],
  );

  // ── Virtual window calculation ──
  const totalHeight = sorted.length * rowHeight;
  const visibleCount = Math.ceil(height / rowHeight);
  const startIdx = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const endIdx = Math.min(
    sorted.length,
    Math.floor(scrollTop / rowHeight) + visibleCount + overscan,
  );
  const visibleRows = sorted.slice(startIdx, endIdx);
  const offsetY = startIdx * rowHeight;

  // ── Render ──
  const showToolbar = searchable || toolbarActions || selectable;
  const checkboxColWidth = "var(--ref-frame-space-12)"; /* 48px via token */
  const selColCount = selectable ? 1 : 0;

  const stateProps = stateAttrs({ loading });

  return (
    <div
      ref={ref}
      {...rest}
      role="table"
      aria-label={ariaLabel || caption || "Data table"}
      aria-rowcount={sorted.length + 1}
      aria-colcount={columns.length + selColCount}
      data-size={resolvedSize}
      {...stateProps}
    >
      <Surface
        radius="container"
        border
        padding={0}
        className={`flow-table-wrapper flow-data-table flow-virtual-data-table ${className}`}
        style={{ overflow: "hidden", ...style }}
      >
        {/* ── TOOLBAR ── */}
        {showToolbar && (
          <Inline
            className="flow-data-table-toolbar"
            align="center"
            gap={3}
            style={{
              padding: "var(--ref-frame-space-3) var(--sys-frame-padding-control)",
              borderBottom: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
            }}
          >
            {selectable && selected.size > 0 && (
              <Text role="paragraph-s" color="accent" style={{ whiteSpace: "nowrap" }}>
                {selected.size} selected
              </Text>
            )}

            {searchable && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--ref-frame-space-2)",
                  flex: "1",
                  maxWidth: "calc(var(--ref-frame-space-20) * 4)",
                  padding: "var(--ref-frame-space-1) var(--ref-frame-space-3)",
                  borderRadius: "var(--sys-frame-radius-full)",
                  border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
                  background: "var(--sys-energy-surface-secondary)",
                }}
              >
                <FlowIcon name="search" size="sm" />
                <FlowTextInput
                  value={searchText}
                  onChange={(val) => setSearchText(val)}
                  placeholder={searchPlaceholder}
                  size="sm"
                  aria-label="Filter table"
                />
                {searchText && (
                  <FlowIconButton icon="x" size="sm" variant="ghost" aria-label="Clear filter" onClick={() => setSearchText("")} />
                )}
              </div>
            )}

            <div style={{ flex: 1 }} />
            {toolbarActions}
          </Inline>
        )}

        {/* ── VIRTUAL SCROLL TABLE ── */}
        <div style={{ position: "relative" }}>
          {/* Loading overlay */}
          {loading && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "var(--sys-depth-scrim)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: "var(--comp-virtual-table-overlay-z)" as unknown as number,
              }}
            >
              <span className="flow-loading-dots" aria-label="Loading">
                <span />
                <span />
                <span />
              </span>
            </div>
          )}

          {/* Sticky header */}
          <div
            style={{
              display: "flex",
              borderBottom: "var(--sys-frame-border-medium) solid var(--sys-energy-border-default)",
              background: "var(--sys-energy-surface-secondary)",
              position: "sticky",
              top: 0,
              zIndex: "var(--comp-virtual-table-header-z)" as unknown as number,
            }}
            role="row"
          >
            {selectable && (
              <div
                role="columnheader"
                style={{
                  width: checkboxColWidth,
                  minWidth: checkboxColWidth,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "var(--comp-virtual-table-header-height)",
                }}
              >
                <FlowCheckbox
                  checked={allSelected}
                  indeterminate={someSelected && !allSelected}
                  onChange={() => toggleSelectAll()}
                  aria-label="Select all rows"
                />
              </div>
            )}
            {columns.map((col) => (
              <div
                key={col.key}
                role="columnheader"
                tabIndex={col.sortable ? 0 : undefined}
                className={col.sortable ? "flow-focusable" : undefined}
                onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                onKeyDown={
                  col.sortable
                    ? (e: React.KeyboardEvent) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleSort(col.key);
                        }
                      }
                    : undefined
                }
                aria-sort={
                  sort.key === col.key && sort.direction
                    ? sort.direction === "asc"
                      ? "ascending"
                      : "descending"
                    : undefined
                }
                style={{
                  flex: col.width ? `0 0 ${col.width}` : 1,
                  minWidth: col.minWidth ?? "var(--ref-frame-space-20)",
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--ref-frame-space-1)",
                  height: "var(--comp-virtual-table-header-height)",
                  padding: "0 var(--ref-frame-space-3)",
                  fontSize: "var(--sys-voice-caption-size)",
                  fontFamily: "var(--ref-voice-family-sans)",
                  fontWeight: "var(--ref-voice-weight-semibold)",
                  color: "var(--sys-energy-text-secondary)",
                  cursor: col.sortable ? "pointer" : "default",
                  userSelect: col.sortable ? "none" : undefined,
                  textAlign: col.align ?? "left",
                }}
              >
                <Text role="caption" color="inherit" style={{ flex: 1 }}>
                  {col.header}
                </Text>
                {col.sortable && (
                  <span
                    style={{
                      display: "inline-flex",
                      flexDirection: "column",
                      opacity: sort.key === col.key ? 1 : "var(--ref-state-opacity-faint)",
                      lineHeight: "var(--ref-voice-line-height-none)",
                    }}
                  >
                    <FlowIcon
                      name="chevron-up"
                      size="sm"
                      style={{
                        width: "var(--ref-frame-space-3)",
                        height: "var(--ref-frame-space-3)",
                        opacity: sort.key === col.key && sort.direction === "asc" ? 1 : "var(--ref-state-opacity-faint)",
                      }}
                    />
                    <FlowIcon
                      name="chevron-down"
                      size="sm"
                      style={{
                        width: "var(--ref-frame-space-3)",
                        height: "var(--ref-frame-space-3)",
                        marginTop: "calc(-1 * var(--ref-frame-space-1))",
                        opacity: sort.key === col.key && sort.direction === "desc" ? 1 : "var(--ref-state-opacity-faint)",
                      }}
                    />
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Scrollable virtual body */}
          { }
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            role="grid"
            tabIndex={0}
            style={{
              height: `${height}px`,
              overflowY: "auto",
              overflowX: "hidden",
              position: "relative",
            }}
          >
            {sorted.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "var(--sys-energy-text-tertiary)",
                  fontFamily: "var(--ref-voice-family-sans)",
                  fontSize: "var(--sys-size-voice-body)",
                }}
              >
                {emptyMessage}
              </div>
            ) : (
              <>
                {/* Total height spacer */}
                <div style={{ height: `${totalHeight}px`, position: "relative" }}>
                  {/* Positioned visible rows */}
                  <div style={{ position: "absolute", top: `${offsetY}px`, left: 0, right: 0 }}>
                    {visibleRows.map((row, localIdx) => {
                      const globalIdx = startIdx + localIdx;
                      const key = rowKey(row, globalIdx);
                      const isSelected = selected.has(key);
                      const isStriped = striped && globalIdx % 2 === 1;

                      return (
                        <div
                          key={key}
                          role="row"
                          aria-rowindex={globalIdx + 2}
                          aria-selected={selectable ? isSelected : undefined}
                          data-selected={isSelected || undefined}
                          style={{
                            display: "flex",
                            height: `${rowHeight}px`,
                            alignItems: "center",
                            borderBottom:
                              "var(--sys-frame-border-thin) solid var(--sys-energy-border-subtle)",
                            background: isSelected
                              ? "var(--sys-energy-surface-interactive)"
                              : isStriped
                                ? "var(--sys-energy-surface-secondary)"
                                : "transparent",
                            transition: hoverable
                              ? "background var(--sys-momentum-duration-fast) var(--sys-momentum-easing-standard)"
                              : undefined,
                            cursor: selectable ? "pointer" : "default",
                          }}
                          tabIndex={-1}
                          onClick={selectable ? () => toggleSelectRow(key) : undefined}
                          onKeyDown={selectable ? (e: React.KeyboardEvent) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              toggleSelectRow(key);
                            }
                          } : undefined}
                          onMouseEnter={
                            hoverable
                              ? (e) => {
                                  if (!isSelected)
                                    (e.currentTarget as HTMLElement).style.background =
                                      "var(--sys-energy-surface-secondary)";
                                }
                              : undefined
                          }
                          onMouseLeave={
                            hoverable
                              ? (e) => {
                                  if (!isSelected) {
                                    (e.currentTarget as HTMLElement).style.background = isStriped
                                      ? "var(--sys-energy-surface-secondary)"
                                      : "transparent";
                                  }
                                }
                              : undefined
                          }
                        >
                          {selectable && (
                            <div
                              role="presentation"
                              style={{
                                width: checkboxColWidth,
                                minWidth: checkboxColWidth,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FlowCheckbox
                                checked={isSelected}
                                onChange={() => toggleSelectRow(key)}
                                aria-label={`Select row ${key}`}
                              />
                            </div>
                          )}
                          {columns.map((col) => (
                            <div
                              key={col.key}
                              role="cell"
                              style={{
                                flex: col.width ? `0 0 ${col.width}` : 1,
                                minWidth: col.minWidth ?? "var(--ref-frame-space-20)",
                                padding: "0 var(--ref-frame-space-3)",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                fontFamily: "var(--ref-voice-family-sans)",
                                fontSize: "var(--sys-size-voice-body)",
                                color: "var(--sys-energy-text-primary)",
                                textAlign: col.align ?? "left",
                              }}
                            >
                              {col.render
                                ? col.render(row, globalIdx)
                                : String((row as Record<string, unknown>)[col.key] ?? "")}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <Inline
          className="flow-data-table-footer"
          align="center"
          justify="between"
          style={{
            padding: "var(--ref-frame-space-2) var(--sys-frame-padding-control)",
            borderTop: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
          }}
        >
          <Text role="caption" color="secondary">
            {sorted.length === 0
              ? "No results"
              : `${sorted.length.toLocaleString()} row${sorted.length !== 1 ? "s" : ""}`}
            {searchText && ` (filtered from ${data.length.toLocaleString()})`}
          </Text>
          <Text role="caption" color="tertiary">
            Virtual scroll active
          </Text>
        </Inline>
      </Surface>
    </div>
  );
}

export const FlowVirtualDataTable = forwardRef(FlowVirtualDataTableInner) as <T extends object>(
  props: VirtualDataTableProps<T> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement | null;
(FlowVirtualDataTable as { displayName?: string }).displayName = "FlowVirtualDataTable";
