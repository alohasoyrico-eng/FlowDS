/**
 * FLOW Domain: Display (L3)
 * Visual presentation components: cards, chips, avatars, badges, lists, tables, trees.
 * Compound display patterns (HoverCard, AvatarGroup) promoted to '../patterns' (L4).
 *
 * @domain display
 * @layer L3
 * @since FLOW v2.2 — L3/L4 separation
 */

// ── Card ──
/** @platform shared */
export { FlowCard } from "./FlowCard";
export type { CardProps } from "./FlowCard";

// ── Chip / Tag / Badge ──
/** @platform shared */
export { FlowChip } from "./FlowChip";
export type { ChipProps } from "./FlowChip";
/** @platform shared */
export { FlowTag } from "./FlowTag";
export type { TagProps } from "./FlowTag";
/** @platform shared */
export { FlowBadge } from "./FlowBadge";
export type { BadgeProps } from "./FlowBadge";

// ── Avatar ──
/** @platform shared */
export { FlowAvatar } from "./FlowAvatar";
export type { AvatarProps } from "./FlowAvatar";

// ── List ──
/** @platform shared */
export { FlowList, FlowListItem } from "./FlowList";
export type { ListProps, ListItemProps } from "./FlowList";

// ── Table (L3 — pure presentational, no sort/filter/pagination) ──
/** @platform shared */
export { FlowTable } from "./FlowTable";
export type { FlowTableColumn } from "./FlowTable";

// ── KPI Trend ──
/** @platform shared */
export { FlowKPITrendIndicator } from "./FlowKPITrendIndicator";
export type { KPITrendIndicatorProps } from "./FlowKPITrendIndicator";

// ── Tree ──
/** @platform desktop */
export { FlowTreeView } from "./FlowTreeView";
export type { TreeNode, TreeViewProps } from "./FlowTreeView";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Deprecated aliases — promoted to patterns/ (L4)
// Will be removed after Q4 2026
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** @deprecated Since FLOW v2.2 — Import from '../patterns' instead */
export { FlowAvatarGroup } from "./FlowAvatarGroup";
