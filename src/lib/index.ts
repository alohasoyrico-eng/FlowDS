/**
 * FLOW Design System — Library Entry Point
 * ─────────────────────────────────────────
 * Public API for npm consumers.
 *
 * Usage:
 *   import { FlowButton, FlowTextInput, Surface, Text } from "@flow/design-system";
 *   import "@flow/design-system/css";
 *
 * Deprecated aliases from domain barrels are excluded to avoid conflicts
 * with canonical exports in selection/ and patterns/. Consumers importing
 * from the npm package get the canonical versions only.
 *
 * @package @flow/design-system
 */

// ── CSS side-effect import (extracted by Vite into flow.css) ────────────────
import "./flow.css";

// ── L2 Primitives ──────────────────────────────────────────────────────────────
export * from "../app/primitives";

// ── Hooks ──────────────────────────────────────────────────────────────────────
export { useFlowBreakpoint } from "../app/hooks/use-flow-breakpoint";
export type { FlowBreakpoint, FlowSize, FlowDensity } from "../app/hooks/use-flow-breakpoint";
export { useFlowDefaultSize, resolveFlowSize, FlowSizeContext } from "../app/hooks/use-flow-default-size";
export { useFlowDensity, FlowDensityContext } from "../app/hooks/use-flow-density";
export { useFlowFocusTrap } from "../app/hooks/use-flow-focus-trap";
export { useFlowAnnounce } from "../app/hooks/use-flow-announce";
export { FlowLocaleProvider, useFlowLocale, defaultMessages } from "../app/hooks/use-flow-locale";
export type { FlowMessages, FlowLocaleProviderProps } from "../app/hooks/use-flow-locale";

// ── Tokens ─────────────────────────────────────────────────────────────────────
export { ref, sysLight, sysDark, compLight, compDark, foundationColors } from "../app/tokens";

// ── Icons & Flags ──────────────────────────────────────────────────────────────
export { flowIcons } from "../app/icons";
export type { FlowIcon } from "../app/icons";
export {
  flagRegistry,
  FLAG_COUNT,
  FLAG_CELL_SIZE,
  flagByCode,
  flagCodes,
  flagSizeMap,
} from "../app/flags";
export type { FlagEntry, FlagSize } from "../app/flags";

// ── L3 Controls (canonical only — deprecated aliases in selection/ excluded) ──
export { FlowButton, FlowIconButton } from "../app/components/controls";
export { FlowFAB } from "../app/components/controls";
export type { ButtonProps, IconButtonProps, FABProps } from "../app/components/controls";

// ── L3 Inputs (canonical only — deprecated aliases in selection/ & patterns/ excluded) ──
export { FlowTextInput } from "../app/components/inputs";
export { FlowTextArea } from "../app/components/inputs";
export type { TextInputProps, TextAreaProps } from "../app/components/inputs";

// ── L3 Selection (canonical — full barrel, no conflicts) ───────────────────────
export * from "../app/components/selection";

// ── L3 Display (canonical only — deprecated aliases in patterns/ excluded) ─────
export { FlowCard, FlowChip, FlowTag } from "../app/components/display";
export { FlowBadge, FlowAvatar } from "../app/components/display";
export { FlowList, FlowListItem } from "../app/components/display";
export { FlowTable } from "../app/components/display";
export type { FlowTableColumn } from "../app/components/display";
export { FlowKPITrendIndicator } from "../app/components/display";
export { FlowTreeView } from "../app/components/display";
export type { TreeNode } from "../app/components/display";
export type {
  CardProps,
  ChipProps,
  TagProps,
  BadgeProps,
  AvatarProps,
  ListProps,
  ListItemProps,
  KPITrendIndicatorProps,
  TreeViewProps,
} from "../app/components/display";

// ── L3 Feedback (canonical only — deprecated aliases in patterns/ excluded) ────
export { FlowSkeleton, FlowProgressBar } from "../app/components/feedback";
export { FlowCircularProgress } from "../app/components/feedback";
export { FlowInlineValidationMessage } from "../app/components/feedback";
export type {
  SkeletonProps,
  ProgressBarProps,
  CircularProgressProps,
  InlineValidationMessageProps,
} from "../app/components/feedback";

// ── L3 Overlays (canonical only — deprecated aliases in patterns/ excluded) ────
export { FlowDialog } from "../app/components/overlays";
export { FlowBottomSheet } from "../app/components/overlays";
export { FlowContextMenu, FlowMenu } from "../app/components/overlays";
export { FlowPopover } from "../app/components/overlays";
export { FlowTooltip } from "../app/components/overlays";
export type {
  DialogProps,
  BottomSheetProps,
  ContextMenuProps,
  ContextMenuItem,
  MenuProps,
  MenuItem,
  PopoverProps,
  TooltipProps,
} from "../app/components/overlays";

// ── L3 Navigation (canonical only — deprecated aliases in patterns/ excluded) ──
export { FlowTabs } from "../app/components/navigation";
export { FlowBreadcrumbs } from "../app/components/navigation";
export { FlowPagination } from "../app/components/navigation";
export { FlowStepper } from "../app/components/navigation";
export { FlowBottomNav } from "../app/components/navigation";
export { FlowSidebar } from "../app/components/navigation";
export type {
  TabsProps,
  TabItem,
  BreadcrumbsProps,
  BreadcrumbItem,
  PaginationProps,
  StepperProps,
  StepperStep,
  BottomNavProps,
  BottomNavItem,
  SidebarProps,
  SidebarItem,
  SidebarGroup,
} from "../app/components/navigation";

// ── L3 Layout (canonical only — deprecated aliases in patterns/ excluded) ──────
export { FlowAccordion } from "../app/components/layout";
export { FlowSplitPane } from "../app/components/layout";
export { FlowFieldset } from "../app/components/layout";
export { FlowShortcutGrid } from "../app/components/layout";
export type {
  AccordionProps,
  AccordionItem,
  SplitPaneProps,
  FieldsetProps,
  ShortcutGridProps,
} from "../app/components/layout";

// ── L3 Data (canonical only — deprecated aliases in patterns/ excluded) ────────
export { FlowSortControl } from "../app/components/data";
export { FlowChartLegendItem } from "../app/components/data";
export type {
  SortControlProps,
  SortOption,
  ChartLegendItemProps,
} from "../app/components/data";

// ── L4 Patterns (canonical — full barrel) ──────────────────────────────────────
export * from "../app/components/patterns";
