/**
 * FLOW Domain: Data (L3)
 * Lightweight data display and sort controls.
 * Most data-heavy patterns (tables, filters, transfer lists) moved to '../patterns'.
 *
 * @domain data
 * @layer L3
 * @since FLOW v2.2 — domain reorganization
 */

// ── Sort Control ──
/** @platform shared */
export { FlowSortControl } from "./FlowSortControl";
export type { SortControlProps, SortOption } from "./FlowSortControl";

// ── Chart Legend ──
/** @platform shared */
export { FlowChartLegendItem } from "./FlowChartLegendItem";
export type { ChartLegendItemProps } from "./FlowChartLegendItem";

