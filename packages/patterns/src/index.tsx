/**
 * FLOW Domain: Patterns (L4)
 * Behavioral compositions that orchestrate multiple L3 components
 * into higher-order workflows. Patterns own logic, not visuals.
 *
 * @domain patterns
 * @layer L4
 * @since FLOW v2.2 — L3/L4 separation
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Input Patterns (compound data-entry)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** @platform shared — composes TextInput + listbox + filter logic */
export { FlowSearch } from "./FlowSearch";
export type { SearchProps } from "./FlowSearch";
/** @platform shared — composes TextInput + listbox + async filter */
export { FlowAutocomplete } from "./FlowAutocomplete";
export type { AutocompleteProps } from "./FlowAutocomplete";
/** @platform shared — composes Select + Chip list + select-all */
export { FlowMultiSelect } from "./FlowMultiSelect";
export type { MultiSelectOption, MultiSelectProps } from "./FlowMultiSelect";
/** @platform shared — composes Calendar grid + TextInput + overlay */
export { FlowDatePicker } from "./FlowDatePicker";
export type { DatePickerProps } from "./FlowDatePicker";
/** @platform shared — composes dual Calendar + range logic + TextInput */
export { FlowDateRangePicker } from "./FlowDateRangePicker";
export type { DateRange, DateRangePreset, DateRangePickerProps } from "./FlowDateRangePicker";
/** @platform shared — composes spectrum + swatches + hex input */
export { FlowColorPicker } from "./FlowColorPicker";
export type { ColorPickerProps } from "./FlowColorPicker";
/** @platform shared — composes display mode + TextInput + save/cancel */
export { FlowInlineEditable } from "./FlowInlineEditable";
export type { InlineEditableProps } from "./FlowInlineEditable";
/** @platform shared — composes Toolbar + TextArea + formatting engine */
export { FlowRichTextEditor } from "./FlowRichTextEditor";
export type { RichTextEditorProps } from "./FlowRichTextEditor";
/** @platform shared — composes drag zone + progress + file list */
export { FlowFileUpload } from "./FlowFileUpload";
export type { FileUploadProps } from "./FlowFileUpload";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Feedback Patterns
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** @platform shared — composes toast queue + auto-dismiss + stacking */
export { FlowSnackbarProvider, useSnackbar } from "./FlowSnackbar";
/** @platform shared */
export { FlowEmptyState } from "./FlowEmptyState";
export type { EmptyStateProps } from "./FlowEmptyState";
/** @platform shared */
export { FlowNotificationPanel } from "./FlowNotificationPanel";
export type { NotificationItem, NotificationPanelProps } from "./FlowNotificationPanel";
/** @platform mobile — composes gesture handler + spinner + state machine */
export { FlowPullToRefresh } from "./FlowPullToRefresh";
export type { PullToRefreshProps } from "./FlowPullToRefresh";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Content Patterns
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** @platform shared */
export { FlowFilterChipGroup } from "./FlowFilterChipGroup";
export type { FilterChipGroupProps } from "./FlowFilterChipGroup";
/** @platform shared */
export { FlowTimeline } from "./FlowTimeline";
export type { TimelineProps } from "./FlowTimeline";
/** @platform shared */
export { FlowSectionHeader } from "./FlowSectionHeader";
export type { SectionHeaderProps } from "./FlowSectionHeader";
/** @platform shared */
export { FlowKPICard } from "./FlowKPICard";
export type { KPICardProps } from "./FlowKPICard";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Display Patterns (compound visual compositions)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** @platform desktop — composes Popover + rich content + hover delay */
export { FlowHoverCard } from "./FlowHoverCard";
export type { HoverCardProps } from "./FlowHoverCard";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Overlay Patterns
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** @platform shared — composes Dialog + actions with confirm/cancel logic */
export { FlowConfirmationDialog } from "./FlowConfirmationDialog";
export type { ConfirmationDialogProps } from "./FlowConfirmationDialog";
/** @platform desktop — composes Dialog + Search + keyboard nav */
export { FlowCommandPalette } from "./FlowCommandPalette";
export type { CommandItem, CommandPaletteProps } from "./FlowCommandPalette";
/** @platform mobile — composes BottomSheet + action list */
export { FlowQuickActions as FlowActionSheet } from "./FlowQuickActions";
export type { QuickActionsProps } from "./FlowQuickActions";
/** @platform mobile — composes Dialog fullscreen + nav bar + transitions */
export { FlowFullscreenSheet } from "./FlowFullscreenSheet";
export type { FullscreenSheetProps } from "./FlowFullscreenSheet";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Layout Patterns
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** @platform shared — composes Fieldset + inputs + section logic */
export { FlowFormSection } from "./FlowFormSection";
export type { FormSectionProps } from "./FlowFormSection";
/** @platform desktop — composes Buttons + Toggles + Dividers + overflow menu */
export {
  FlowToolbar,
  FlowToolbarDivider,
  FlowToolbarGroup,
  FlowToolbarSpacer,
} from "./FlowToolbar";
export type { ToolbarProps } from "./FlowToolbar";
/** @platform mobile — composes gesture handler + action buttons reveal */
export { FlowSwipeActions } from "./FlowSwipeActions";
export type { SwipeActionsProps } from "./FlowSwipeActions";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Navigation Patterns
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** @platform desktop */
export { FlowTopbar } from "./FlowTopbar";
export type { TopbarProps } from "./FlowTopbar";
/** @platform shared — adaptive: Sidebar (desktop) ↔ BottomSheet (mobile) */
export { FlowDrawerAdapter } from "./FlowDrawerAdapter";
export type { DrawerAdapterProps } from "./FlowDrawerAdapter";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Data Patterns
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** @platform desktop */
export { FlowDataTable } from "./FlowDataTable";
/** @platform desktop */
export { FlowVirtualDataTable } from "./FlowVirtualDataTable";
export type { VirtualDataTableColumn, VirtualDataTableProps } from "./FlowVirtualDataTable";
/** @platform shared */
export { FlowTransferList } from "./FlowTransferList";
export type { TransferItem, TransferListProps } from "./FlowTransferList";
/** @platform shared */
export { FlowDragSortableList } from "./FlowDragSortableList";
export type { SortableItem, DragSortableListProps } from "./FlowDragSortableList";
/** @platform desktop */
export { FlowAdvancedFilters } from "./FlowAdvancedFilters";
export type { AdvancedFiltersProps, FilterField } from "./FlowAdvancedFilters";
/** @platform desktop */
export { FlowColumnConfigurator } from "./FlowColumnConfigurator";
export type { ColumnConfiguratorProps } from "./FlowColumnConfigurator";
/** @platform shared */
export { FlowCalendarView } from "./FlowCalendarView";
export type { CalendarEvent, CalendarViewProps } from "./FlowCalendarView";
/** @platform shared */
export { FlowChartWrapper } from "./FlowChartWrapper";
export type { ChartWrapperProps } from "./FlowChartWrapper";
