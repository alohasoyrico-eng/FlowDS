import { FlowChip, Inline, Stack } from "../../lib";
import { ComponentSpecAccordion } from "../components/component-accordion";
import { PAGE_GAP, PageHeader } from "../components/doc-primitives";

const desktopComponents: {
  name: string;
  purpose: string;
  anatomy: string[];
  variants: string[];
  states: string[];
  statePrecedence: string;
  tokens: string[];
  accessibility: string[];
  tone: string;
  growth: string;
  platform: string;
}[] = [
  {
    name: "Sidebar",
    purpose:
      "Persistent vertical navigation for desktop applications. Contains primary navigation items, collapsible sections, and user context.",
    anatomy: [
      "Container (Surface, full-height, border-right)",
      "Logo/brand area",
      "Navigation groups (sections with labels)",
      "Nav items (ActionSurface: icon + label)",
      "Active indicator (background fill or leading bar)",
      "Collapse toggle",
      "User area (avatar + name, bottom-pinned)",
    ],
    variants: [
      "Expanded — full width with labels (~280px)",
      "Collapsed — icon-only (~56px)",
      "With sub-navigation — expandable tree items",
      "Floating — overlay on smaller desktop viewports",
    ],
    states: [
      "default",
      "hover (per item)",
      "focus-visible (per item)",
      "pressed (per item)",
      "selected (active item)",
      "disabled (locked item)",
      "collapsed (global)",
    ],
    statePrecedence:
      "selected + hover: both render (selected bg + hover overlay). disabled item: opacity reduced, no hover. collapsed: icon-only mode, tooltip on hover.",
    tokens: [
      "comp.sidebar.bg",
      "comp.sidebar.width.*",
      "comp.sidebar.item.*",
      "comp.sidebar.section.*",
      "comp.sidebar.border",
      "comp.sidebar.logo.*",
    ],
    accessibility: [
      "role='navigation' with aria-label='Main navigation'",
      "Collapse button: aria-expanded",
      "Active item: aria-current='page'",
      "Keyboard: Tab navigates items, Enter activates",
      "Sub-nav: aria-expanded on parent, tree pattern",
    ],
    tone: "Section labels use sentence case, not ALL CAPS. Item labels are concise (1-2 words). Tooltip on collapsed items matches full label exactly — no abbreviation.",
    growth:
      "Tracks: navigation item click distribution, collapse toggle frequency, time between navigations, sub-nav expansion rate. High collapse rate may indicate sidebar is too wide.",
    platform:
      "Desktop only. On tablet: auto-collapses. On mobile: replaced by BottomNav (NavigationShellPattern manages the switch). Flutter equivalent: NavigationRail.",
  },
  {
    name: "Topbar",
    purpose:
      "Horizontal bar at the top of the viewport containing page title, breadcrumbs, global actions, search, and user menu.",
    anatomy: [
      "Container (Surface, full-width, border-bottom)",
      "Leading area (breadcrumbs or back button)",
      "Title area (page title)",
      "Trailing area (search, notifications, user avatar)",
    ],
    variants: [
      "Standard — breadcrumbs + title + actions",
      "Compact — title only (mobile-like)",
      "With tabs — tab navigation integrated below title",
      "Transparent — overlays hero content",
    ],
    states: [
      "default",
      "hover (action items)",
      "focus-visible (action items)",
      "scrolled (adds shadow on scroll)",
    ],
    statePrecedence:
      "scrolled: adds sys.depth.elevation.1 shadow. This is a contextual state, not a precedence state — it coexists with all item states.",
    tokens: [
      "comp.topbar.bg",
      "comp.topbar.height",
      "comp.topbar.padding.*",
      "comp.topbar.border",
      "comp.topbar.title.*",
      "comp.topbar.action.*",
    ],
    accessibility: [
      "role='banner'",
      "Page title: role='heading' level 1",
      "Action buttons accessible with labels",
      "Search: role='search'",
    ],
    tone: "Page title matches the navigation item label. Breadcrumbs use the same labels as the navigation hierarchy — no creative rewriting.",
    growth:
      "Tracks: search activation rate, notification bell click rate, user menu open frequency. Low search usage may indicate poor discoverability.",
    platform:
      "Desktop + tablet. On mobile: simplified to back button + title + single action. Flutter equivalent: AppBar with sliver behavior.",
  },
  {
    name: "Search",
    purpose:
      "A global search interface for finding content across the application. Can be triggered from Topbar or via keyboard shortcut.",
    anatomy: [
      "Search trigger (in Topbar, shows shortcut hint)",
      "Search overlay (centered modal with input)",
      "Input field with magnifier icon",
      "Results list (grouped by category)",
      "Recent searches (when empty)",
      "Keyboard navigation hints",
    ],
    variants: [
      "Inline — search bar visible in Topbar",
      "Command palette — modal overlay pattern",
      "Contextual — searches within current view only",
      "With filters — category tabs or filter chips",
    ],
    states: [
      "default (trigger idle)",
      "hover (trigger)",
      "focus (input active)",
      "loading (searching)",
      "empty (no results)",
      "populated (results shown)",
    ],
    statePrecedence:
      "loading > populated: shows skeleton in results area. empty state shows EmptyState component with Tone-compliant message.",
    tokens: [
      "comp.search.trigger.*",
      "comp.search.overlay.*",
      "comp.search.input.*",
      "comp.search.results.*",
      "comp.search.category.*",
    ],
    accessibility: [
      "role='search' on container",
      "role='combobox' on input",
      "Results: role='listbox'",
      "Keyboard: shortcut opens, arrows navigate results, Enter selects, Escape closes",
    ],
    tone: "Placeholder: 'Search...' (not 'Type to search' — users know). Empty state: 'No results for [query]. Try different keywords.' — never 'Nothing found!'",
    growth:
      "Tracks: search activation method (click vs keyboard shortcut), query length, result click-through rate, zero-result rate. High zero-result rate indicates content gap.",
    platform:
      "Desktop: command palette overlay. Mobile: fullscreen search sheet. Flutter equivalent: SearchDelegate with showSearch().",
  },
  {
    name: "DataTable",
    purpose:
      "A structured table for displaying and interacting with tabular data. Supports sorting, filtering, selection, pagination, and inline actions.",
    anatomy: [
      "Table container (Surface, scrollable)",
      "Header row (column titles, sort indicators)",
      "Data rows (cells with various content types)",
      "Selection column (checkboxes)",
      "Row actions (contextual menu)",
      "Footer (pagination, row count)",
      "Toolbar (filters, bulk actions, search)",
    ],
    variants: [
      "Basic — read-only, no interaction",
      "Sortable — click headers to sort",
      "Selectable — row checkboxes, bulk actions",
      "Expandable — rows expand to show detail",
      "Editable — inline cell editing",
      "Virtual — virtualized rows for large datasets",
    ],
    states: [
      "default",
      "hover (per row)",
      "selected (per row)",
      "expanded (per row)",
      "loading (skeleton rows)",
      "error (data fetch failed)",
      "empty (no data)",
      "sorting (column sort active)",
      "dragging (row reorder)",
    ],
    statePrecedence:
      "selected + hover: additive (selected bg + hover overlay). expanded + selected: both render. loading: skeleton replaces all rows. empty: EmptyState replaces table body.",
    tokens: [
      "comp.datatable.header.*",
      "comp.datatable.row.*",
      "comp.datatable.cell.*",
      "comp.datatable.border.*",
      "comp.datatable.selection.*",
      "comp.datatable.sort.*",
      "comp.datatable.stripe.*",
    ],
    accessibility: [
      "role='table' with aria-label",
      "Column headers: role='columnheader' with aria-sort",
      "Selectable: aria-selected on rows",
      "Keyboard: arrows navigate cells, Space selects, Enter activates row action",
    ],
    tone: "Empty state: varies by context (first-use: 'No [items] yet. Create your first [item].' vs no-results: 'No [items] match your filters.'). Column headers: concise nouns, not sentences.",
    growth:
      "Tracks: sort column distribution, filter usage, selection size distribution, pagination vs infinite scroll preference, row expansion rate, inline edit frequency.",
    platform:
      "Desktop: full table. Tablet: horizontal scroll for wide tables. Mobile: replaced by card list (Adaptive). Flutter equivalent: DataTable widget with custom delegate.",
  },
  {
    name: "Pagination",
    purpose:
      "Navigation control for paging through multi-page data sets (used with DataTable or lists).",
    anatomy: [
      "Container",
      "Page number buttons",
      "Previous/Next arrows",
      "First/Last jumps (optional)",
      "Items-per-page selector",
      "Total count display",
    ],
    variants: [
      "Numbered — shows page numbers",
      "Simple — previous/next only",
      "Infinite scroll trigger — loads more on scroll",
      "With items-per-page — dropdown to change page size",
    ],
    states: [
      "default",
      "hover (per button)",
      "focus-visible",
      "pressed",
      "selected (current page)",
      "disabled (first/last page reached)",
    ],
    statePrecedence:
      "selected (current page) is non-interactive. disabled first/prev when on page 1. disabled last/next when on final page.",
    tokens: [
      "comp.pagination.button.*",
      "comp.pagination.active.*",
      "comp.pagination.text.*",
      "comp.pagination.gap",
    ],
    accessibility: [
      "role='navigation' with aria-label='Pagination'",
      "Current page: aria-current='page'",
      "Disabled buttons: aria-disabled",
      "Keyboard: Tab to navigate, Enter to select page",
    ],
    tone: "Display format: 'Page X of Y' or 'Showing X-Y of Z items'. Never 'Results: X'. Items-per-page label: 'Rows per page' (not 'Show').",
    growth:
      "Tracks: page jump distance (1 page vs far jumps), items-per-page changes, pagination vs infinite scroll engagement.",
    platform:
      "Desktop: full numbered. Mobile: simplified to prev/next or infinite scroll. Flutter equivalent: custom PaginationWidget.",
  },
  {
    name: "Toolbar",
    purpose:
      "A horizontal bar of actions contextual to the current view or selection. Contains buttons, toggles, dropdowns, and search.",
    anatomy: [
      "Container (Surface, border)",
      "Action groups (separated by dividers)",
      "Individual actions (IconButton, Button, Select)",
      "Selection context (count + bulk actions, visible when items selected)",
    ],
    variants: [
      "Standard — always visible",
      "Contextual — appears on selection",
      "Floating — positioned near selected content",
      "Responsive — collapses overflow into 'more' menu",
    ],
    states: [
      "default",
      "with-selection (shows bulk actions)",
      "overflow (items collapsed to menu)",
    ],
    statePrecedence:
      "with-selection overrides standard actions. When selection count > 0, bulk action toolbar replaces or augments standard toolbar.",
    tokens: [
      "comp.toolbar.bg",
      "comp.toolbar.height",
      "comp.toolbar.padding.*",
      "comp.toolbar.border",
      "comp.toolbar.divider.*",
      "comp.toolbar.group.gap",
    ],
    accessibility: [
      "role='toolbar'",
      "aria-label describing context",
      "Arrow keys navigate between actions",
      "Home/End jump to first/last action",
    ],
    tone: "Bulk action labels include count: 'Delete 3 items' (not 'Delete selected'). Action labels are verbs: 'Export', 'Archive', 'Assign'.",
    growth:
      "Tracks: action usage distribution, bulk vs individual action ratio, overflow menu open rate (high = too many toolbar items).",
    platform:
      "Desktop: horizontal bar. Mobile: bottom action bar or FAB menu. Flutter equivalent: custom ToolbarWidget or BottomAppBar.",
  },
  {
    name: "AdvancedFilters",
    purpose:
      "A complex filtering interface for data-heavy views. Supports multiple filter conditions with logic operators (AND/OR).",
    anatomy: [
      "Filter bar (collapsed: active filter chips)",
      "Filter panel (expanded: condition builder)",
      "Condition row (field selector + operator + value input)",
      "Logic operator (AND/OR toggle between conditions)",
      "Add condition button",
      "Reset/Apply actions",
    ],
    variants: [
      "Chip bar — shows active filters as chips, click to edit",
      "Panel — full filter builder always visible",
      "Saved filters — user can save and load filter presets",
      "Quick filters — predefined common filter combinations",
    ],
    states: [
      "default (no filters)",
      "active (filters applied)",
      "editing (panel open)",
      "loading (applying filters)",
      "error (invalid condition)",
    ],
    statePrecedence:
      "error on a condition row highlights that row. loading during apply shows subtle progress on apply button. active displays count badge on trigger.",
    tokens: [
      "comp.filters.chip.*",
      "comp.filters.panel.*",
      "comp.filters.condition.*",
      "comp.filters.operator.*",
      "comp.filters.action.*",
    ],
    accessibility: [
      "Filter chips: role='group' with aria-label='Active filters'",
      "Each chip: aria-label describing the filter condition",
      "Condition builder: labels for each selector",
      "Apply button: aria-label='Apply filters'",
    ],
    tone: "Chip text: '{field} {operator} {value}' — e.g., 'Status is Active'. Reset button: 'Clear all filters' (not 'Reset'). Saved filters: user-named.",
    growth:
      "Tracks: filter field usage distribution, condition count per query, saved filter creation/usage ratio, quick filter vs custom filter preference.",
    platform:
      "Desktop: panel or chip bar. Mobile: opens in BottomSheet. Flutter equivalent: custom FilterSheet.",
  },
  {
    name: "Popover",
    purpose:
      "A floating panel anchored to a trigger element. Used for contextual content, forms, or supplementary information that doesn't warrant a Dialog.",
    anatomy: [
      "Trigger element",
      "Popover surface (Surface, elevated)",
      "Arrow (optional, pointing to trigger)",
      "Content area",
      "Close button (optional)",
    ],
    variants: [
      "Content — displays information",
      "Form — contains input fields",
      "Menu-like — list of actions (prefer Menu component)",
      "Wide — multi-column layout for complex content",
    ],
    states: ["closed", "open", "focus-within (keeps open)", "hover (trigger)"],
    statePrecedence:
      "focus-within > click-away: popover stays open while any child has focus. Escape always closes regardless of focus.",
    tokens: [
      "comp.popover.bg",
      "comp.popover.elevation",
      "comp.popover.radius",
      "comp.popover.padding.*",
      "comp.popover.maxWidth",
      "comp.popover.arrow.*",
    ],
    accessibility: [
      "aria-haspopup on trigger",
      "aria-expanded on trigger",
      "Popover: role='dialog' if interactive, no role if informational",
      "Focus moves to popover on open",
      "Escape closes, returns focus to trigger",
    ],
    tone: "Popover title (optional): descriptive, not generic. Content should be scannable — if it needs a scroll bar, consider Dialog instead.",
    growth:
      "Tracks: popover open rate per trigger, time spent in popover, action completion rate within popover form.",
    platform:
      "Desktop: floating anchored panel. Mobile: replaced by BottomSheet (Adaptive). Flutter equivalent: OverlayEntry with CompositedTransformFollower.",
  },
  {
    name: "ContextMenu",
    purpose:
      "A right-click menu providing contextual actions for the clicked element. Desktop-only interaction pattern.",
    anatomy: [
      "Menu surface (Surface, elevated)",
      "Menu items (ActionSurface: icon + label + shortcut)",
      "Separators",
      "Sub-menus (nested)",
      "Disabled items (grayed out)",
    ],
    variants: [
      "Standard — flat list of actions",
      "With sub-menus — expandable nested menus",
      "With icons — leading icons on items",
      "With shortcuts — keyboard shortcut hints",
    ],
    states: [
      "closed",
      "open",
      "hover (per item)",
      "focus-visible (per item)",
      "disabled (per item)",
    ],
    statePrecedence:
      "disabled items: opacity reduced, no hover. Sub-menu hover: opens sub-menu after brief delay (200ms).",
    tokens: [
      "comp.contextmenu.bg",
      "comp.contextmenu.elevation",
      "comp.contextmenu.item.*",
      "comp.contextmenu.separator.*",
      "comp.contextmenu.shortcut.*",
      "comp.contextmenu.radius",
    ],
    accessibility: [
      "role='menu' on container",
      "role='menuitem' on items",
      "Sub-menus: aria-haspopup, aria-expanded",
      "Keyboard: arrows navigate, Enter activates, right arrow opens sub-menu, Escape closes",
    ],
    tone: "Action labels are verbs: 'Copy', 'Delete', 'Open in new tab'. Destructive actions are last, separated by divider. Shortcut hints right-aligned.",
    growth:
      "Tracks: context menu trigger rate, action usage per item, keyboard shortcut usage vs menu usage.",
    platform:
      "Desktop only — no mobile equivalent (long-press menus are a different pattern handled by BottomSheet). Flutter: no equivalent; use PopupMenuButton.",
  },
  {
    name: "Breadcrumbs",
    purpose:
      "A horizontal trail showing the user's location within a hierarchical structure. Enables navigation back to parent levels.",
    anatomy: [
      "Container (horizontal inline)",
      "Breadcrumb items (links)",
      "Separator icons (chevron or slash)",
      "Current page (non-interactive, last item)",
      "Overflow (collapsed middle items into '...' when too many)",
    ],
    variants: [
      "Standard — all items visible",
      "Collapsed — middle items hidden behind overflow menu",
      "With icons — leading icons on items",
      "Auto-truncating — adapts to available width",
    ],
    states: [
      "default",
      "hover (per item link)",
      "focus-visible (per item)",
      "overflow (middle items collapsed)",
    ],
    statePrecedence:
      "Current page (last item) is non-interactive: no hover, no focus. Overflow menu uses Popover interaction states.",
    tokens: [
      "comp.breadcrumbs.text.*",
      "comp.breadcrumbs.separator.*",
      "comp.breadcrumbs.current.*",
      "comp.breadcrumbs.overflow.*",
      "comp.breadcrumbs.gap",
    ],
    accessibility: [
      "role='navigation' with aria-label='Breadcrumb'",
      "Ordered list: role='list'",
      "Current page: aria-current='page'",
      "Separator: aria-hidden (decorative)",
    ],
    tone: "Labels match navigation hierarchy exactly. No abbreviation. Overflow '...' expands to show full trail — never hides the current page or root.",
    growth:
      "Tracks: breadcrumb click distribution (which level do users navigate to most), overflow expansion rate.",
    platform:
      "Desktop + tablet. On mobile: replaced by back button + page title. Flutter equivalent: custom BreadcrumbWidget.",
  },
];

export function ComponentsDesktopPage() {
  // Map `platform` field to `platformNotes` for ComponentSpecAccordion
  const items = desktopComponents.map((c) => ({
    ...c,
    platformNotes: c.platform,
  }));

  return (
    <Stack gap={PAGE_GAP}>
      <PageHeader chapter="Chapter 05 — Desktop" title="Desktop-First Components">
        Desktop-first components leverage pointer precision, keyboard interaction, and larger
        viewports. They typically have no mobile equivalent or are replaced by different patterns on
        mobile (e.g., Sidebar becomes BottomNav).
      </PageHeader>

      <Inline gap={2} wrap>
        {desktopComponents.map((c) => (
          <FlowChip key={c.name}>{c.name}</FlowChip>
        ))}
      </Inline>

      <ComponentSpecAccordion items={items} badge="DESKTOP" layout="full" />
    </Stack>
  );
}
