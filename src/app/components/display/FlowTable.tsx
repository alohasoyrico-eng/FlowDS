/**
 * FLOW Design System — FlowTable (Layer 3 Component)
 * ───────────────────────────────────────────────────
 * Composes L2 primitives: Surface (wrapper), Text (caption).
 * CSS-driven via .flow-table classes — zero hardcoded px/hex.
 *
 * Consumes: sys.energy.surface.*, sys.energy.border.*, sys.energy.text.*, ref.voice.*
 * Does NOT own: data fetching, sorting, pagination (those are L4 DataLoadingPattern concerns).
 */
import type { CSSProperties, ReactNode } from "react";

import { Surface, Text } from "../../primitives";
import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";

// ── Column Definition ──

export interface FlowTableColumn<T> {
  key: string;
  header?: string;
  /** Alias for header */
  label?: string;
  /** Optional column width */
  width?: string;
  /** Render the cell. If omitted, renders `row[key]` as string */
  render?: (row: T, index: number) => ReactNode;
  /** Column header alignment */
  align?: "left" | "center" | "right";
  /** Cell text style role */
  cellRole?: "default" | "code" | "caption" | "bold";
}

interface FlowTableProps<T> {
  columns: FlowTableColumn<T>[];
  data: T[];
  /** Unique key extractor. Defaults to index. */
  rowKey?: (row: T, index: number) => string | unknown;
  /** Enable hover highlighting on rows */
  hoverable?: boolean;
  /** Striped rows for readability */
  striped?: boolean;
  /** Compact mode — smaller cell padding */
  compact?: boolean;
  /** Unified size — sm/md/lg/xl, controls cell padding + font scale */
  size?: "sm" | "md" | "lg" | "xl";
  /** Caption below table */
  caption?: string;
  /** Message to show when data is empty */
  emptyMessage?: string;
  style?: CSSProperties;
  className?: string;
}

// ── Component ──

export function FlowTable<T extends object>({
  columns,
  data,
  rowKey,
  hoverable = true,
  striped = false,
  size,
  caption,
  emptyMessage,
  style,
  className = "",
}: FlowTableProps<T>) {
  const resolvedSize = useFlowDefaultSize(size);
  return (
    <Surface
      radius="container"
      border
      padding={0}
      className={`flow-table-wrapper ${className}`}
      style={{ overflow: "hidden", ...style }}
    >
      <table
        className="flow-table"
        data-size={resolvedSize || undefined}
        data-striped={striped || undefined}
        data-hoverable={hoverable || undefined}
      >
        {caption && (
          <caption className="flow-table-caption">
            <Text role="paragraph-s">{caption}</Text>
          </caption>
        )}
        <thead className="flow-table-head">
          <tr className="flow-table-head-row">
            {columns.map((col) => (
              <th
                key={col.key}
                className="flow-table-th"
                style={{
                  textAlign: col.align ?? "left",
                  width: col.width,
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="flow-table-body">
          {data.length === 0 && emptyMessage && (
            <tr>
              <td
                colSpan={columns.length}
                style={{ textAlign: "center", padding: "var(--sys-frame-padding-control)" }}
              >
                {emptyMessage}
              </td>
            </tr>
          )}
          {data.map((row, idx) => (
            <tr key={rowKey ? String(rowKey(row, idx)) : idx} className="flow-table-row">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="flow-table-td"
                  data-cell-role={col.cellRole || undefined}
                  style={{ textAlign: col.align ?? "left" }}
                >
                  {col.render
                    ? col.render(row, idx)
                    : String((row as Record<string, unknown>)[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Surface>
  );
}
