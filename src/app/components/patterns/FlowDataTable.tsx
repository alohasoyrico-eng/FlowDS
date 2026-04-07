/**
 * FLOW Design System — FlowDataTable (Layer 4 Pattern)
 * ──────────────────────────────────────────────────────
 * Advanced table with sorting, filtering, pagination, row selection.
 * Composes L2 primitives: Surface, Text, Inline.
 * CSS-driven via .flow-table + .flow-data-table classes.
 *
 * Consumes: sys.energy.*, ref.voice.*, ref.frame.*
 * L4 DataLoadingPattern can wrap this for server-side data.
 */
import { type CSSProperties, type ReactNode, useCallback, useId, useMemo, useState } from "react";

import { FlowIcon, Inline, Surface, Text } from "../../primitives";
import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";
import type { FlowTableColumn } from "../display/FlowTable";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface DataTableColumn<T> extends FlowTableColumn<T> {
  /** Enable sorting on this column */
  sortable?: boolean;
  /** Custom sort comparator. Default: locale-aware string compare on row[key]. */
  sortFn?: (a: T, b: T) => number;
  /** Enable filtering on this column */
  filterable?: boolean;
}

type SortDirection = "asc" | "desc" | null;

interface SortState {
  key: string;
  direction: SortDirection;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  /** Unique key extractor. Default: row.id ?? index */
  rowKey?: (row: T, index: number) => string;
  /** Enable row selection (checkbox column) */
  selectable?: boolean;
  /** Controlled selection — set of selected row keys */
  selectedKeys?: Set<string>;
  /** Selection change handler */
  onSelectionChange?: (keys: Set<string> | string[]) => void;
  /** Page size. 0 = no pagination */
  pageSize?: number;
  /** Page size options shown in selector */
  pageSizeOptions?: number[];
  /** Enable global text filter */
  searchable?: boolean;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg" | "xl";
  /** Striped rows */
  striped?: boolean;
  /** Hoverable rows */
  hoverable?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Error state — shows error overlay */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Empty state message */
  emptyMessage?: string;
  /** Caption */
  caption?: string;
  /** Sort change handler */
  onSort?: (key: string, direction: "asc" | "desc") => void;
  /** Row action handler */
  onRowAction?: (rowId: string, action: string) => void;
  /** Toolbar actions (rendered above table, right side) */
  toolbarActions?: ReactNode;
  /** Accessible label */
  "aria-label"?: string;
  className?: string;
  style?: CSSProperties;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowDataTable<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey = ((row: T, index: number) =>
    (row as Record<string, unknown>).id != null
      ? String((row as Record<string, unknown>).id)
      : String(index)) as (row: T, index: number) => string,
  selectable = false,
  selectedKeys: controlledSelected,
  onSelectionChange,
  onSort: _onSort,
  onRowAction: _onRowAction,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [5, 10, 25, 50],
  searchable = false,
  searchPlaceholder = "Filter...",
  size = "md",
  striped = false,
  hoverable = true,
  loading = false,
  error = false,
  errorMessage: errorMsg = "An error occurred loading data",
  emptyMessage = "No data",
  caption,
  toolbarActions,
  "aria-label": ariaLabel,
  className = "",
  style,
}: DataTableProps<T>) {
  const resolvedSize = useFlowDefaultSize(size);
  const _idPrefix = useId();

  // ── Search ──
  const [searchText, setSearchText] = useState("");

  // ── Sort ──
  const [sort, setSort] = useState<SortState>({ key: "", direction: null });

  // ── Pagination ──
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

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

  // ── Filtered data ──
  const filtered = useMemo(() => {
    if (!searchText.trim()) return data;
    const q = searchText.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.key];
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
      const aVal = String(a[sort.key] ?? "");
      const bVal = String(b[sort.key] ?? "");
      return aVal.localeCompare(bVal) * dir;
    });
  }, [filtered, sort, columns]);

  // ── Paginated data ──
  const totalPages = pageSize > 0 ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const safePage = Math.min(currentPage, totalPages);
  const paginated =
    pageSize > 0 ? sorted.slice((safePage - 1) * pageSize, safePage * pageSize) : sorted;

  // Reset page when filter/data changes
  const [prevSearchText, setPrevSearchText] = useState(searchText);
  const [prevDataLength, setPrevDataLength] = useState(data.length);
  if (searchText !== prevSearchText || data.length !== prevDataLength) {
    setPrevSearchText(searchText);
    setPrevDataLength(data.length);
    setCurrentPage(1);
  }

  // ── Sort toggle ──
  const toggleSort = useCallback((key: string) => {
    setSort((prev) => {
      if (prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return { key: "", direction: null };
    });
  }, []);

  // ── Selection helpers ──
  const allPageKeys = paginated.map((row, idx) => rowKey(row, idx));
  const allSelected = allPageKeys.length > 0 && allPageKeys.every((k) => selected.has(k));
  const someSelected = allPageKeys.some((k) => selected.has(k));

  const toggleSelectAll = useCallback(() => {
    if (allSelected) {
      const next = new Set(selected);
      allPageKeys.forEach((k) => next.delete(k));
      setSelected(next);
    } else {
      const next = new Set(selected);
      allPageKeys.forEach((k) => next.add(k));
      setSelected(next);
    }
  }, [allSelected, allPageKeys, selected, setSelected]);

  const toggleSelectRow = useCallback(
    (key: string) => {
      const next = new Set(selected);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      setSelected(next);
    },
    [selected, setSelected],
  );

  // ── Render ──
  const showToolbar = searchable || toolbarActions || selectable;
  const showPagination = pageSize > 0 && sorted.length > 0;

  return (
    <Surface
      radius="container"
      border
      padding={0}
      className={`flow-table-wrapper flow-data-table ${className}`}
      style={{ overflow: "hidden", ...style }}
      data-state={error ? "error" : loading ? "loading" : undefined}
      aria-invalid={error || undefined}
      aria-busy={loading || undefined}
    >
      {/* ── TOOLBAR ── */}
      {showToolbar && (
        <div
          className="flow-data-table-toolbar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--ref-frame-space-3)",
            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
            borderBottom: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
          }}
        >
          {/* Selection count */}
          {selectable && selected.size > 0 && (
            <Text role="paragraph-s" color="accent" style={{ whiteSpace: "nowrap" }}>
              {selected.size} selected
            </Text>
          )}

          {/* Search */}
          {searchable && (
            <div
              className="flow-data-table-search"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--ref-frame-space-2)",
                flex: "1",
                maxWidth: "var(--ref-frame-content-compact)",
                padding: "var(--ref-frame-space-1) var(--ref-frame-space-3)",
                borderRadius: "var(--ref-frame-radius-full)",
                border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
                background: "var(--sys-energy-surface-secondary)",
              }}
            >
              <FlowIcon name="search" size="sm" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label="Filter table"
                style={{
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  flex: 1,
                  fontSize: "var(--sys-size-voice-body)",
                  fontFamily: "var(--ref-voice-family-sans)",
                  color: "var(--sys-energy-text-primary)",
                }}
              />
              {searchText && (
                <button
                  type="button"
                  onClick={() => setSearchText("")}
                  aria-label="Clear filter"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    color: "var(--sys-energy-text-tertiary)",
                    display: "flex",
                  }}
                >
                  <FlowIcon name="x" size="sm" />
                </button>
              )}
            </div>
          )}

          <div style={{ flex: 1 }} />

          {/* Toolbar actions */}
          {toolbarActions}
        </div>
      )}

      {/* ── TABLE ── */}
      <div style={{ overflow: "auto", position: "relative" }}>
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
              zIndex: 2,
            }}
          >
            <span className="flow-loading-dots" aria-label="Loading">
              <span />
              <span />
              <span />
            </span>
          </div>
        )}

        {/* Error overlay */}
        {error && !loading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--sys-depth-scrim)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              color: "var(--sys-energy-status-error)",
            }}
            role="alert"
          >
            <Inline gap={2}>
              <FlowIcon name="alert-circle" size="sm" />
              <Text role="paragraph-s" color="danger">{errorMsg}</Text>
            </Inline>
          </div>
        )}

        <table
          className="flow-table"
          data-size={resolvedSize}
          data-striped={striped || undefined}
          data-hoverable={hoverable || undefined}
          aria-label={ariaLabel}
        >
          {caption && (
            <caption className="flow-table-caption">
              <Text role="paragraph-s">{caption}</Text>
            </caption>
          )}

          <thead className="flow-table-head">
            <tr className="flow-table-head-row">
              {/* Selection checkbox header */}
              {selectable && (
                <th className="flow-table-th" style={{ width: "var(--ref-frame-space-12)", textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected && !allSelected;
                    }}
                    onChange={toggleSelectAll}
                    aria-label="Select all rows"
                    style={{ cursor: "pointer" }}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="flow-table-th"
                  style={{
                    textAlign: col.align ?? "left",
                    width: col.width,
                    cursor: col.sortable ? "pointer" : undefined,
                    userSelect: col.sortable ? "none" : undefined,
                  }}
                  onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                  aria-sort={
                    sort.key === col.key && sort.direction
                      ? sort.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "var(--ref-frame-space-1)",
                    }}
                  >
                    {col.header}
                    {col.sortable && (
                      <span
                        className="flow-data-table-sort-icon"
                        style={{
                          display: "inline-flex",
                          flexDirection: "column",
                          opacity: sort.key === col.key ? 1 : 0.3,
                          fontSize: "var(--ref-voice-size-1)",
                          lineHeight: 1,
                        }}
                      >
                        <FlowIcon
                          name="chevron-up"
                          size="sm"
                          style={{
                            width: "var(--ref-frame-space-3)",
                            height: "var(--ref-frame-space-3)",
                            opacity: sort.key === col.key && sort.direction === "asc" ? 1 : 0.3,
                          }}
                        />
                        <FlowIcon
                          name="chevron-down"
                          size="sm"
                          style={{
                            width: "var(--ref-frame-space-3)",
                            height: "var(--ref-frame-space-3)",
                            marginTop: "calc(-1 * var(--ref-frame-space-1))",
                            opacity: sort.key === col.key && sort.direction === "desc" ? 1 : 0.3,
                          }}
                        />
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="flow-table-body">
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  style={{
                    textAlign: "center",
                    padding: "var(--ref-frame-space-8)",
                    color: "var(--sys-energy-text-tertiary)",
                  }}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginated.map((row, idx) => {
                const key = rowKey(row, idx);
                const isSelected = selected.has(key);
                return (
                  <tr
                    key={key}
                    className="flow-table-row"
                    data-selected={isSelected || undefined}
                    style={{
                      background: isSelected ? "var(--sys-energy-surface-interactive)" : undefined,
                    }}
                  >
                    {selectable && (
                      <td className="flow-table-td" style={{ textAlign: "center" }}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectRow(key)}
                          aria-label={`Select row ${key}`}
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="flow-table-td"
                        data-cell-role={col.cellRole || undefined}
                        style={{ textAlign: col.align ?? "left" }}
                      >
                        {col.render ? col.render(row, idx) : String(row[col.key] ?? "")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── PAGINATION ── */}
      {showPagination && (
        <div
          className="flow-data-table-pagination"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
            borderTop: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
            fontSize: "var(--sys-size-voice-body)",
            fontFamily: "var(--ref-voice-family-sans)",
          }}
        >
          {/* Left: info */}
          <Text role="caption" color="secondary">
            {sorted.length === 0
              ? "No results"
              : `Showing ${(safePage - 1) * pageSize + 1}–${Math.min(
                  safePage * pageSize,
                  sorted.length,
                )} of ${sorted.length}`}
          </Text>

          {/* Center: page buttons */}
          <Inline gap={1}>
            <PaginationButton
              disabled={safePage <= 1}
              onClick={() => setCurrentPage(1)}
              aria-label="First page"
            >
              <FlowIcon name="chevrons-left" size="sm" />
            </PaginationButton>
            <PaginationButton
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
            >
              <FlowIcon name="chevron-left" size="sm" />
            </PaginationButton>

            {/* Page numbers */}
            {getPageNumbers(safePage, totalPages).map((p, i) =>
              p === "..." ? (
                <span
                  key={`ellipsis-${i}`}
                  style={{
                    padding: "0 var(--ref-frame-space-1)",
                    color: "var(--sys-energy-text-tertiary)",
                  }}
                >
                  …
                </span>
              ) : (
                <PaginationButton
                  key={p}
                  active={p === safePage}
                  onClick={() => setCurrentPage(p as number)}
                  aria-label={`Page ${p}`}
                  aria-current={p === safePage ? "page" : undefined}
                >
                  {p}
                </PaginationButton>
              ),
            )}

            <PaginationButton
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Next page"
            >
              <FlowIcon name="chevron-right" size="sm" />
            </PaginationButton>
            <PaginationButton
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage(totalPages)}
              aria-label="Last page"
            >
              <FlowIcon name="chevrons-right" size="sm" />
            </PaginationButton>
          </Inline>

          {/* Right: page size selector */}
          <Inline gap={2}>
            <Text role="caption" color="secondary">
              Rows:
            </Text>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              aria-label="Rows per page"
              style={{
                border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
                borderRadius: "var(--ref-frame-radius-1)",
                padding: "var(--ref-frame-space-1) var(--ref-frame-space-2)",
                fontSize: "var(--ref-voice-size-3)",
                fontFamily: "var(--ref-voice-family-sans)",
                background: "var(--sys-energy-surface-primary)",
                color: "var(--sys-energy-text-primary)",
                cursor: "pointer",
              }}
            >
              {pageSizeOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Inline>
        </div>
      )}
    </Surface>
  );
}

// ── Pagination Button ──
function PaginationButton({
  children,
  active,
  disabled,
  onClick,
  "aria-label": ariaLabel,
  "aria-current": ariaCurrent,
}: {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
  "aria-current"?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={ariaCurrent as "page" | undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "var(--ref-frame-space-8)",
        height: "var(--ref-frame-space-8)",
        padding: "0 var(--ref-frame-space-2)",
        borderRadius: "var(--ref-frame-radius-2)",
        border: active
          ? "var(--sys-frame-border-thin) solid var(--sys-energy-border-focus)"
          : "var(--sys-frame-border-thin) solid transparent",
        background: active ? "var(--sys-energy-surface-interactive)" : "transparent",
        color: disabled
          ? "var(--sys-energy-text-tertiary)"
          : active
            ? "var(--sys-energy-text-accent)"
            : "var(--sys-energy-text-primary)",
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "var(--ref-voice-family-sans)",
        fontSize: "var(--ref-voice-size-3)",
        fontWeight: active ? "var(--ref-voice-weight-semibold)" : "var(--ref-voice-weight-regular)",
        transition:
          "background var(--sys-momentum-duration-fast) var(--sys-momentum-easing-standard), border-color var(--sys-momentum-duration-fast) var(--sys-momentum-easing-standard)",
      }}
    >
      {children}
    </button>
  );
}

// ── Page number generator with ellipsis ──
function getPageNumbers(current: number, total: number, siblings: number = 1): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [];
  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);

  pages.push(1);
  if (left > 2) pages.push("...");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("...");
  pages.push(total);

  return pages;
}
