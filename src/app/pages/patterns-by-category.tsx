/**
 * FLOW Patterns by Category — Parametric page
 * Route: /patterns/:category
 * Renders pattern specs organized by sub-category with composed-components info.
 */
import { Link, Navigate, useParams } from "react-router";

import {
  Divider,
  FlowButton,
  FlowChip,
  Grid,
  Inline,
  Stack,
  Surface,
  Text,
} from "@flow/design-system";
import { Callout, PAGE_GAP, PageHeader, Section } from "../components/doc-primitives";
import { LayoutGrid } from "../components/layout-grid";

type Platform = "shared" | "desktop" | "mobile";

const platformColors: Record<Platform, string> = {
  shared: "var(--sys-energy-status-success)",
  desktop: "var(--sys-energy-status-info)",
  mobile: "var(--sys-energy-status-warning)",
};

function PlatformBadge({ platform }: { platform: Platform }) {
  const label = platform === "shared" ? "Shared" : platform === "desktop" ? "Desktop" : "Mobile";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "var(--ref-frame-space-1) var(--ref-frame-space-2)",
        borderRadius: "var(--ref-frame-radius-1)",
        background: `color-mix(in srgb, ${platformColors[platform]} 15%, transparent)`,
        color: platformColors[platform],
        fontFamily: "var(--ref-voice-family-mono)",
        fontSize: "var(--ref-voice-size-xs)",
      }}
    >
      {label}
    </span>
  );
}

// ── Pattern spec ──
interface PatternSpec {
  name: string;
  exportName: string;
  purpose: string;
  platform: Platform;
  composesL3: string[];
  orchestrates: string[];
  apiHint?: string;
  source: string;
  redundancyNote?: string;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PATTERN REGISTRY BY CATEGORY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const PATTERN_CATEGORIES: Record<
  string,
  {
    title: string;
    description: string;
    icon: string;
    patterns: PatternSpec[];
  }
> = {
  "input-patterns": {
    title: "Input Patterns",
    description:
      "Compound data-entry patterns that compose multiple L3 components. Each pattern orchestrates text inputs, selectors, overlays, and validation into a cohesive entry experience.",
    icon: "edit",
    patterns: [
      {
        name: "Phone Input",
        exportName: "FlowPhoneInput",
        purpose:
          "Phone number input with country code selection, flag display, and international formatting.",
        platform: "shared",
        composesL3: ["FlowTextInput", "FlowSelect", "FlowIcon"],
        orchestrates: [
          "Country selection with flag + dial code",
          "Phone number formatting per country",
          "Paste handling + validation",
        ],
        source: "flow-components",
      },
      {
        name: "Search",
        exportName: "FlowSearch",
        purpose:
          "Search input with suggestion dropdown, keyboard shortcuts, and categorized results.",
        platform: "shared",
        composesL3: ["FlowTextInput", "FlowList", "FlowListItem", "FlowIcon"],
        orchestrates: [
          "Debounced query",
          "Categorized results dropdown",
          "Keyboard shortcut hints",
          "Recent searches",
        ],
        source: "flow-components-p5",
      },
      {
        name: "Autocomplete",
        exportName: "FlowAutocomplete",
        purpose:
          "Text input with suggestion dropdown. Supports free-text, option selection, and async loading.",
        platform: "shared",
        composesL3: ["FlowTextInput", "FlowList", "FlowListItem", "FlowCircularProgress"],
        orchestrates: [
          "Async option fetching",
          "Filter/highlight matching",
          "Free-text + selection modes",
          "Creatable new options",
        ],
        source: "flow-components-p6",
      },
      {
        name: "Multi Select",
        exportName: "FlowMultiSelect",
        purpose: "Multi-selection with chip display, searchable dropdown, and select-all.",
        platform: "shared",
        composesL3: ["FlowSelect", "FlowChip", "FlowCheckbox", "FlowTextInput"],
        orchestrates: [
          "Chip list management",
          "Search within options",
          "Select-all / deselect-all",
          "Overflow indicator",
        ],
        source: "flow-components-p11",
      },
      {
        name: "Date Picker",
        exportName: "FlowDatePicker",
        purpose: "Date selection with calendar grid, month/year navigation, and text input.",
        platform: "shared",
        composesL3: ["FlowTextInput", "FlowPopover", "FlowIconButton", "Surface"],
        orchestrates: [
          "Calendar grid rendering",
          "Month/year navigation",
          "Date parsing from text",
          "Min/max date constraints",
        ],
        source: "flow-components-p8",
      },
      {
        name: "Date Range Picker",
        exportName: "FlowDateRangePicker",
        purpose: "Start/end date range selection with dual calendar and preset ranges.",
        platform: "shared",
        composesL3: ["FlowTextInput", "FlowPopover", "FlowButton", "Surface"],
        orchestrates: [
          "Dual calendar synchronization",
          "Range highlight between dates",
          "Preset ranges (last 7 days, etc.)",
          "Start/end validation",
        ],
        source: "flow-components-p11",
      },
      {
        name: "Color Picker",
        exportName: "FlowColorPicker",
        purpose: "Color selection with spectrum, swatches, and hex/rgb input.",
        platform: "shared",
        composesL3: ["FlowTextInput", "FlowPopover", "Surface"],
        orchestrates: [
          "HSL spectrum interaction",
          "Swatch palette selection",
          "Hex/RGB input parsing",
          "Color format conversion",
        ],
        source: "flow-components-p12",
      },
      {
        name: "OTP Input",
        exportName: "FlowOTPInput",
        purpose: "One-time password input with individual digit cells and auto-advance.",
        platform: "mobile",
        composesL3: ["FlowTextInput"],
        orchestrates: [
          "Multi-cell auto-advance",
          "Paste distribution across cells",
          "Backspace navigation",
          "Completion callback",
        ],
        source: "flow-components-p8",
      },
      {
        name: "Inline Editable",
        exportName: "FlowInlineEditable",
        purpose:
          "Click-to-edit inline text. Shows text normally, transforms to input on interaction.",
        platform: "shared",
        composesL3: ["FlowTextInput", "FlowIconButton", "Text"],
        orchestrates: [
          "Read/edit mode switching",
          "Save/cancel actions",
          "Escape to cancel",
          "Click-outside behavior",
        ],
        source: "flow-components-p10",
      },
      {
        name: "Rich Text Editor",
        exportName: "FlowRichTextEditor",
        purpose: "WYSIWYG rich text editor with formatting toolbar.",
        platform: "shared",
        composesL3: ["FlowToolbar", "FlowToggleButton", "FlowMenu", "Surface"],
        orchestrates: [
          "Formatting commands",
          "Toolbar state sync",
          "Content serialization",
          "Keyboard shortcuts",
        ],
        source: "flow-components-p12",
      },
      {
        name: "File Upload",
        exportName: "FlowFileUpload",
        purpose: "File upload with drag-and-drop, progress tracking, and file list.",
        platform: "shared",
        composesL3: ["FlowButton", "FlowProgressBar", "FlowList", "FlowIconButton", "Surface"],
        orchestrates: [
          "Drag-and-drop zone",
          "Upload progress tracking",
          "File type validation",
          "Multi-file queue management",
        ],
        source: "flow-components-p12",
      },
    ],
  },

  feedback: {
    title: "Feedback Patterns",
    description:
      "Patterns that orchestrate user feedback: empty states with contextual messaging and actionable CTAs, notification panels with grouping and mark-as-read logic.",
    icon: "message-circle",
    patterns: [
      {
        name: "Empty State",
        exportName: "FlowEmptyState",
        purpose:
          "Contextual empty state with illustration, message, and actionable CTA. Selects variant based on context: first-use, no-results, error, or offline.",
        platform: "shared",
        composesL3: ["Surface", "Text", "FlowButton", "FlowIcon"],
        orchestrates: [
          "Variant selection (first-use vs no-results vs error)",
          "Illustration selection from Illustration foundation",
          "CTA action binding",
          "Tone-compliant messaging",
        ],
        source: "flow-components-p1",
      },
      {
        name: "Notification Panel",
        exportName: "FlowNotificationPanel",
        purpose:
          "Grouped notification list with read/unread state, mark-all-as-read, dismiss actions, and time-relative formatting.",
        platform: "shared",
        composesL3: ["FlowList", "FlowListItem", "FlowBadge", "FlowAvatar", "FlowIconButton"],
        orchestrates: [
          "Read/unread state management",
          "Grouping by time period (today, yesterday, earlier)",
          "Mark-all-as-read batch action",
          "Individual dismiss with undo",
          "Empty state when no notifications",
        ],
        source: "flow-components-p12",
      },
      {
        name: "Snackbar Provider",
        exportName: "FlowSnackbarProvider",
        purpose:
          "Toast notification system with queue management, stacking, auto-dismiss, and action buttons.",
        platform: "shared",
        composesL3: ["Surface", "Text", "FlowButton", "FlowIconButton"],
        orchestrates: [
          "Toast queue with max-visible limit",
          "Auto-dismiss timers",
          "Stacking animation",
          "Action button binding",
          "Variant-based semantic styling",
        ],
        source: "flow-components-p1",
      },
      {
        name: "Pull to Refresh",
        exportName: "FlowPullToRefresh",
        purpose:
          "Gesture-driven refresh indicator for mobile. Composes pull gesture handler with spinner and state machine.",
        platform: "mobile",
        composesL3: ["FlowCircularProgress", "Text", "Surface"],
        orchestrates: [
          "Pull gesture detection with threshold",
          "State machine (idle → pulling → triggered → refreshing → complete)",
          "Spinner animation during refresh",
          "Manual refresh button fallback",
        ],
        source: "flow-components-p6",
      },
    ],
  },

  content: {
    title: "Content Patterns",
    description:
      "Patterns that compose L3 components into content-rich displays: filter chip groups, timelines, section headers, and KPI cards with trend analysis.",
    icon: "file-text",
    patterns: [
      {
        name: "Filter Chip Group",
        exportName: "FlowFilterChipGroup",
        purpose:
          "Orchestrates a set of filter chips with multi-select logic, clear-all action, and filter count display.",
        platform: "shared",
        composesL3: ["FlowChip", "Inline", "FlowButton"],
        orchestrates: [
          "Multi-select/single-select mode switching",
          "Clear-all action logic",
          "Active filter count display",
          "Filter change event aggregation",
        ],
        source: "flow-components-p10",
      },
      {
        name: "Timeline",
        exportName: "FlowTimeline",
        purpose:
          "Chronological event display with connecting line, status icons, and expandable detail sections.",
        platform: "shared",
        composesL3: ["Stack", "FlowIcon", "Text", "Surface"],
        orchestrates: [
          "Chronological ordering",
          "Status-based icon/color selection",
          "Expandable detail sections",
          "Load-more pagination for long timelines",
        ],
        source: "flow-components-p10",
      },
      {
        name: "Section Header",
        exportName: "FlowSectionHeader",
        purpose:
          "Page section header with title, description, action slot, and optional counter badge.",
        platform: "shared",
        composesL3: ["Text", "Inline", "FlowButton", "FlowBadge"],
        orchestrates: [
          "Title + description layout",
          "Action button alignment",
          "Counter badge display logic",
        ],
        source: "flow-components-p10",
      },
      {
        name: "KPI Card",
        exportName: "FlowKPICard",
        purpose:
          "Specialized card composing metric value, trend indicator, comparison period, and optional sparkline into a cohesive KPI display.",
        platform: "shared",
        composesL3: ["FlowCard", "FlowKPITrendIndicator", "Text", "Surface"],
        orchestrates: [
          "Metric formatting (currency, percentage, number)",
          "Trend direction calculation",
          "Comparison period logic",
          "Alert threshold evaluation",
          "Sparkline data processing",
        ],
        source: "flow-components-p8",
      },
    ],
  },

  "display-patterns": {
    title: "Display Patterns",
    description:
      "Compound visual compositions that orchestrate multiple L3 display components into richer experiences: avatar groups with overflow, hover cards with delayed preview.",
    icon: "eye",
    patterns: [
      {
        name: "Avatar Group",
        exportName: "FlowAvatarGroup",
        purpose:
          "Overlapping avatar stack with overflow indicator (+N more). Composes N Avatars with layout logic.",
        platform: "shared",
        composesL3: ["FlowAvatar", "Surface", "Text"],
        orchestrates: [
          "Max-visible calculation",
          "Overlap positioning",
          "Overflow count badge",
          "Tooltip on overflow hover",
        ],
        source: "flow-components-p2",
      },
      {
        name: "Hover Card",
        exportName: "FlowHoverCard",
        purpose:
          "Rich content preview triggered by hover. Shows additional details without navigating away.",
        platform: "desktop",
        composesL3: ["FlowPopover", "Surface", "FlowAvatar", "Text"],
        orchestrates: [
          "Hover-in delay (prevent flash)",
          "Hover-out delay (prevent premature close)",
          "Focus-triggered for keyboard",
          "Content positioning",
        ],
        source: "flow-components-p10",
      },
    ],
  },

  overlay: {
    title: "Overlay Patterns",
    description:
      "Patterns that orchestrate overlay behaviors: confirmation dialogs with destructive-action gating, command palettes with fuzzy search, and action sheets for mobile.",
    icon: "maximize-2",
    patterns: [
      {
        name: "Confirmation Dialog",
        exportName: "FlowConfirmationDialog",
        purpose:
          "Pre-composed dialog pattern for destructive/irreversible action confirmation. Ensures actions pass through confirmation gate with Tone-compliant messaging.",
        platform: "shared",
        composesL3: ["FlowDialog", "FlowButton", "Text", "Stack"],
        orchestrates: [
          "Confirmation lifecycle (open -> pending -> resolved)",
          "Destructive action gating",
          "Loading state during async operation",
          "Success/error result handling",
          "Tone-compliant message generation",
        ],
        source: "flow-components-p10",
      },
      {
        name: "Command Palette",
        exportName: "FlowCommandPalette",
        purpose:
          "Keyboard-driven command palette (Cmd+K / Ctrl+K) with fuzzy search, categorized results, and recent commands.",
        platform: "desktop",
        composesL3: ["FlowDialog", "FlowSearch", "FlowList", "FlowListItem", "FlowIcon"],
        orchestrates: [
          "Keyboard shortcut registration (Cmd+K)",
          "Fuzzy search across commands",
          "Category-based result grouping",
          "Recent commands tracking",
          "Keyboard navigation through results",
        ],
        source: "flow-components-p12",
      },
      {
        name: "Action Sheet",
        exportName: "FlowActionSheet",
        purpose:
          "iOS-style bottom action sheet with grouped actions and cancel button. Renamed from FlowQuickActions (P9) to resolve naming collision with the mobile grid shortcuts component.",
        platform: "mobile",
        composesL3: ["Surface", "FlowButton", "Text", "Stack"],
        orchestrates: [
          "Modal overlay lifecycle",
          "Action grouping with separators",
          "Cancel action handling",
          "Danger action highlighting",
          "Slide-up animation",
        ],
        source: "flow-components-p9",
        redundancyNote:
          "R-002: Renamed from FlowQuickActions to resolve collision with the mobile shortcut grid component of the same name. Previously both exported as FlowQuickActions from different files.",
      },
      {
        name: "Fullscreen Sheet",
        exportName: "FlowFullscreenSheet",
        purpose:
          "Full-viewport modal for complex tasks on mobile. Composes Dialog fullscreen with nav bar and step transitions.",
        platform: "mobile",
        composesL3: ["FlowDialog", "FlowButton", "FlowIconButton", "Surface", "Text"],
        orchestrates: [
          "Full-viewport takeover",
          "Multi-step navigation",
          "Back gesture handling",
          "Focus trap management",
          "Entry/exit transitions",
        ],
        source: "flow-components-p7",
      },
    ],
  },

  "layout-patterns": {
    title: "Layout Patterns",
    description:
      "Patterns that orchestrate structural layout: toolbars with action grouping, form sections, and mobile gesture-based layouts.",
    icon: "grid",
    patterns: [
      {
        name: "Form Section",
        exportName: "FlowFormSection",
        purpose:
          "Groups related form fields under a section title with description and collapsible behavior.",
        platform: "shared",
        composesL3: ["FlowFieldset", "FlowAccordion", "Text", "Stack"],
        orchestrates: [
          "Section collapse/expand logic",
          "Related field grouping",
          "Section-level validation summary",
          "Progressive disclosure of optional fields",
        ],
        source: "flow-components-p10",
      },
      {
        name: "Toolbar",
        exportName: "FlowToolbar",
        purpose:
          "Horizontal bar of contextual actions. Composes buttons, toggles, dividers, and overflow menus into an opinioned action bar.",
        platform: "desktop",
        composesL3: ["FlowButton", "FlowIconButton", "FlowToggleButton", "FlowMenu", "Divider"],
        orchestrates: [
          "Action grouping (FlowToolbarGroup)",
          "Visual separation (FlowToolbarDivider)",
          "Trailing alignment (FlowToolbarSpacer)",
          "Overflow menu for excess actions",
          "Contextual mode on selection",
        ],
        source: "flow-components-p4",
      },
      {
        name: "Swipe Actions",
        exportName: "FlowSwipeActions",
        purpose:
          "Swipe-to-reveal actions on list items. Reveals action buttons behind content on horizontal swipe gesture.",
        platform: "mobile",
        composesL3: ["FlowButton", "Surface"],
        orchestrates: [
          "Horizontal swipe gesture detection",
          "Left/right action reveal",
          "Full swipe to action trigger",
          "Snap-back animation",
          "Keyboard alternative",
        ],
        source: "flow-components-p6",
      },
      {
        name: "Quick Actions Grid",
        exportName: "FlowQuickActions",
        purpose:
          "Mobile shortcut grid with large touch targets. Displays icon + label action buttons for home screens.",
        platform: "mobile",
        composesL3: ["FlowButton", "FlowIcon", "Surface", "Grid"],
        orchestrates: [
          "Grid layout calculation (3-4 columns)",
          "Min 44px touch targets",
          "Press feedback animation",
          "Per-action disable state",
        ],
        source: "flow-components-mobile",
      },
    ],
  },

  "navigation-patterns": {
    title: "Navigation Patterns",
    description:
      "Patterns that orchestrate navigation structures: top bars and responsive drawer adapters.",
    icon: "compass",
    patterns: [
      {
        name: "Topbar",
        exportName: "FlowTopbar",
        purpose:
          "Desktop application top bar composing page title, breadcrumbs, global actions, search, and user menu into a cohesive header.",
        platform: "desktop",
        composesL3: [
          "Surface",
          "FlowBreadcrumbs",
          "FlowSearch",
          "FlowIconButton",
          "FlowAvatar",
          "Text",
        ],
        orchestrates: [
          "Sticky positioning with scroll shadow",
          "Breadcrumb generation from route",
          "Search integration",
          "User menu trigger",
          "Responsive compaction on smaller desktops",
        ],
        source: "flow-components-p6",
      },
      {
        name: "Drawer Adapter",
        exportName: "FlowDrawerAdapter",
        purpose:
          "Responsive navigation that morphs across breakpoints. Desktop: inline sidebar panel. Mobile: bottom sheet overlay.",
        platform: "shared",
        composesL3: ["FlowSidebar", "FlowBottomSheet", "Surface"],
        orchestrates: [
          "Breakpoint detection",
          "Desktop ↔ mobile mode switching",
          "Open/close state management",
          "Escape key handling",
          "Backdrop click dismiss",
        ],
        source: "flow-components-p7",
      },
    ],
  },

  "data-patterns": {
    title: "Data Patterns",
    description:
      "The largest pattern category. Orchestrates complex data workflows: tables with sort/filter/pagination, virtual scroll tables, transfer lists, sortable lists, filter builders, column configurators, calendar views, and chart wrappers.",
    icon: "database",
    patterns: [
      {
        name: "Data Table",
        exportName: "FlowDataTable",
        purpose:
          "Full-featured data table with sorting, filtering, pagination, row selection, search, and toolbar actions. Composes FlowTable (L3) with interactive behaviors.",
        platform: "desktop",
        composesL3: [
          "FlowTable",
          "FlowSortControl",
          "FlowSearch",
          "FlowPagination",
          "FlowCheckbox",
          "FlowToolbar",
        ],
        orchestrates: [
          "Client-side sort with custom comparators",
          "Column-level filtering",
          "Pagination state management",
          "Row selection (single/multi/range)",
          "Global text search across all columns",
          "Toolbar action context based on selection",
        ],
        source: "flow-data-table",
        redundancyNote:
          "R-003: This is the full-featured version from flow-data-table.tsx. The previous simple version from flow-components-desktop.tsx has been deprecated.",
      },
      {
        name: "Virtual Data Table",
        exportName: "FlowVirtualDataTable",
        purpose:
          "High-performance data table with virtualized scrolling for large datasets (10K+ rows). Same features as DataTable but renders only visible rows.",
        platform: "desktop",
        composesL3: ["FlowTable", "FlowSortControl", "FlowSearch", "FlowCheckbox"],
        orchestrates: [
          "Virtual scroll with overscan buffer",
          "Row height calculation per size variant",
          "Visible range computation from scroll position",
          "All DataTable features (sort, select, search)",
        ],
        source: "flow-components-p11",
      },
      {
        name: "Transfer List",
        exportName: "FlowTransferList",
        purpose:
          "Dual-list pattern for moving items between 'available' and 'selected' lists with search and bulk actions.",
        platform: "shared",
        composesL3: ["FlowList", "FlowSearch", "FlowButton", "FlowCheckbox"],
        orchestrates: [
          "Dual-list state management",
          "Item transfer (single, bulk, all)",
          "Search filtering per list",
          "Selection state across lists",
        ],
        source: "flow-components-p12",
      },
      {
        name: "Drag Sortable List",
        exportName: "FlowDragSortableList",
        purpose:
          "List with drag-and-drop reordering. Items can be rearranged via drag handle or keyboard shortcuts.",
        platform: "shared",
        composesL3: ["FlowList", "FlowListItem", "FlowIcon"],
        orchestrates: [
          "Drag-and-drop reorder logic",
          "Drop zone calculation",
          "Keyboard reorder (Alt+Arrow)",
          "Animation during drag",
        ],
        source: "flow-components-p12",
      },
      {
        name: "Advanced Filters",
        exportName: "FlowAdvancedFilters",
        purpose:
          "Complex filter builder with multiple conditions, operators, and grouping. Used alongside DataTable for server-side filtering.",
        platform: "desktop",
        composesL3: ["FlowSelect", "FlowTextInput", "FlowButton", "FlowIconButton", "Stack"],
        orchestrates: [
          "Filter condition CRUD",
          "Operator selection per field type",
          "AND/OR grouping logic",
          "Filter serialization for API calls",
          "Preset filter management",
        ],
        source: "flow-components-p9",
      },
      {
        name: "Column Configurator",
        exportName: "FlowColumnConfigurator",
        purpose:
          "Column visibility and order management for DataTable. Drag to reorder, toggle to show/hide columns.",
        platform: "desktop",
        composesL3: ["FlowDragSortableList", "FlowSwitch", "FlowDialog", "FlowButton"],
        orchestrates: [
          "Column visibility toggling",
          "Column order drag-and-drop",
          "Reset to defaults",
          "Persistence of configuration",
        ],
        source: "flow-components-p10",
      },
      {
        name: "Calendar View",
        exportName: "FlowCalendarView",
        purpose:
          "Calendar-based event display with month/week/day views, event creation, and drag-to-reschedule.",
        platform: "shared",
        composesL3: ["Surface", "FlowButton", "FlowIconButton", "FlowPopover", "Text"],
        orchestrates: [
          "View mode switching (month/week/day)",
          "Event positioning in grid",
          "Event creation via click/drag",
          "Event detail popover",
          "Navigation between periods",
        ],
        source: "flow-components-p12",
      },
      {
        name: "Chart Wrapper",
        exportName: "FlowChartWrapper",
        purpose:
          "Standardized chart container with title, legend, loading state, empty state, and export actions.",
        platform: "shared",
        composesL3: [
          "FlowCard",
          "FlowChartLegendItem",
          "FlowSkeleton",
          "FlowEmptyState",
          "FlowMenu",
        ],
        orchestrates: [
          "Chart lifecycle (loading -> data -> error -> empty)",
          "Legend interaction (toggle series)",
          "Export actions (PNG, CSV)",
          "Responsive chart sizing",
          "Title and subtitle layout",
        ],
        source: "flow-components-p9",
      },
    ],
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PAGE COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function PatternsByCategoryPage() {
  const { category } = useParams<{ category: string }>();

  if (!category || !PATTERN_CATEGORIES[category]) {
    return <Navigate to="/patterns/feedback" replace />;
  }

  const cat = PATTERN_CATEGORIES[category];

  return (
    <LayoutGrid>
      <LayoutGrid.Item span={12} className="component-detail-surface-wrapper">
        <Surface variant="secondary" radius="surface" className="component-detail-surface">
          <Stack gap={PAGE_GAP}>
            <PageHeader chapter="Layer 4 — Patterns" title={cat.title}>
              {cat.description}
            </PageHeader>

            <Callout>
              <Text variant="paragraph-s" color="accent">
                <strong>Import:</strong>{" "}
                <code style={{ fontFamily: "var(--ref-voice-family-mono)" }}>
                  import {"{ ... }"} from &quot;../components/patterns&quot;;
                </code>
              </Text>
            </Callout>

            {/* Pattern list */}
            <Stack gap={2}>
              {cat.patterns.map((p) => (
                <Inline key={p.exportName} gap={2} align="center">
                  <PlatformBadge platform={p.platform} />
                  <Text variant="label-m">{p.exportName}</Text>
                  <Text variant="caption" color="tertiary">
                    {p.name}
                  </Text>
                </Inline>
              ))}
            </Stack>

            <Divider spacing={2} />

            {/* Detailed pattern specs */}
            {cat.patterns.map((p, idx) => (
              <Stack key={p.exportName} gap={3}>
                <Inline gap={3} align="center">
                  <Inline
                    gap={0}
                    justify="center"
                    style={{
                      width: "var(--ref-frame-doc-badge-sm)",
                      height: "var(--ref-frame-doc-badge-sm)",
                      borderRadius: "var(--ref-frame-radius-2)",
                      background: "var(--sys-energy-surface-sunken)",
                    }}
                  >
                    <Text variant="heading-m" color="tertiary">
                      &#11042;
                    </Text>
                  </Inline>
                  <Stack gap={1}>
                    <Inline gap={2} align="center">
                      <Text variant="heading-l">{p.name}</Text>
                      <PlatformBadge platform={p.platform} />
                    </Inline>
                    <Inline gap={2}>
                      <FlowChip variant="filled" status="info" size="sm">
                        PATTERN
                      </FlowChip>
                      <Text variant="code">{p.exportName}</Text>
                    </Inline>
                  </Stack>
                </Inline>

                {/* Purpose */}
                <Surface padding="control" className="flow-doc-accent">
                  <Stack gap={2}>
                    <Text variant="overline">Purpose</Text>
                    <Text variant="paragraph-s">{p.purpose}</Text>
                  </Stack>
                </Surface>

                {/* View Details Button */}
                <Link
                  to={`/patterns/${category}/${p.exportName
                    .replace(/^Flow/, "")
                    .replace(/([a-z])([A-Z])/g, "$1-$2")
                    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
                    .toLowerCase()}`}
                >
                  <FlowButton variant="outlined" size="sm">
                    View Documentation & Demos
                  </FlowButton>
                </Link>

                {/* Composes + Orchestrates */}
                <Grid minItemWidth="280px" gap={3}>
                  <Surface padding="control">
                    <Stack gap={2}>
                      <Text variant="overline" color="accent">
                        Composes (L3)
                      </Text>
                      <Inline gap={2} wrap>
                        {p.composesL3.map((c) => (
                          <FlowChip key={c} size="sm">
                            {c}
                          </FlowChip>
                        ))}
                      </Inline>
                    </Stack>
                  </Surface>
                  <Surface padding="control">
                    <Stack gap={2}>
                      <Text variant="overline" color="success">
                        Orchestrates
                      </Text>
                      <ul style={{ margin: 0, padding: "0 0 0 var(--ref-frame-space-4)" }}>
                        {p.orchestrates.map((o, i) => (
                          <li key={i}>
                            <Text variant="paragraph-s" as="span">
                              {o}
                            </Text>
                          </li>
                        ))}
                      </ul>
                    </Stack>
                  </Surface>
                </Grid>

                {/* Source + Redundancy */}
                <Inline gap={3} wrap>
                  <Surface padding="control" style={{ flex: 1 }}>
                    <Stack gap={2}>
                      <Text variant="overline">Source</Text>
                      <Text variant="code">{p.source}</Text>
                    </Stack>
                  </Surface>
                  {p.redundancyNote && (
                    <Surface
                      padding="control"
                      className="flow-doc-accent flow-doc-accent--warning"
                      style={{ flex: 2 }}
                    >
                      <Stack gap={2}>
                        <Text variant="overline" color="warning">
                          Redundancy Resolution
                        </Text>
                        <Text variant="paragraph-s">{p.redundancyNote}</Text>
                      </Stack>
                    </Surface>
                  )}
                </Inline>

                {idx < cat.patterns.length - 1 && <Divider spacing={2} />}
              </Stack>
            ))}

            {/* Back to Patterns */}
            <Link to="/patterns">
              <FlowButton variant="ghost" size="sm">
                <Text variant="label-m">Back to Patterns</Text>
              </FlowButton>
            </Link>
          </Stack>
        </Surface>
      </LayoutGrid.Item>
    </LayoutGrid>
  );
}

export default PatternsByCategoryPage;
