/**
 * FLOW Components by Domain — Parametric page
 * Route: /components/:domain
 * Renders component specs organized by domain barrel with platform tags.
 */
import { Link, Navigate, useParams } from "react-router";

import { Divider, Inline, Stack, Surface, Text } from "@flow/design-system";
import { type ComponentSpec, ComponentSpecAccordion } from "../components/component-accordion";
import { Callout, PAGE_GAP, PageHeader, Section } from "../components/doc-primitives";
import { LayoutGrid } from "../components/layout-grid";
import { COMPONENT_REGISTRY } from "./component-registry";

// ── Platform badge ──
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
        gap: "var(--ref-frame-space-1)",
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

// ── Extended spec with platform ──
interface DomainComponentSpec extends ComponentSpec {
  platform: Platform;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENT REGISTRY BY DOMAIN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const DOMAIN_SPECS: Record<
  string,
  {
    title: string;
    description: string;
    icon: string;
    layer: string;
    exportCount: number;
    importPath: string;
    components: DomainComponentSpec[];
  }
> = {
  controls: {
    title: "Controls",
    description:
      "Pure action triggers — fire-and-forget interactions. Buttons that do something when pressed. Selection controls (Radio, Checkbox, Switch, etc.) have moved to the Selection domain.",
    icon: "pointer",
    layer: "L3",
    exportCount: 3,
    importPath: "../components/controls",
    components: [
      {
        name: "FlowButton",
        purpose:
          "Primary action trigger. Communicates hierarchy through emphasis levels (high, medium, low, outline, danger) and conveys loading/disabled states.",
        platform: "shared",
        anatomy: [
          "Container (ActionSurface)",
          "StateLayer",
          "Leading icon (opt)",
          "Label (Text)",
          "Trailing icon (opt)",
          "Loading spinner",
        ],
        variants: [
          "High — filled, primary actions",
          "Medium — outlined, secondary actions",
          "Outline — transparent bg, accent text, strong border",
          "Low — link-style, tertiary actions",
          "Danger — subtle-to-filled, destructive actions",
        ],
        states: ["default", "hover", "focus-visible", "pressed", "disabled", "loading"],
        tokens: [
          "comp.button.bg.*",
          "comp.button.text.*",
          "comp.button.border.*",
          "comp.button.height.*",
        ],
        accessibility: [
          "role='button'",
          "aria-disabled",
          "aria-busy when loading",
          "Min 44px touch target mobile",
        ],
      },
      {
        name: "FlowIconButton",
        purpose:
          "Compact action trigger using only an icon. Always requires tooltip and accessible label.",
        platform: "shared",
        anatomy: ["Container (square)", "StateLayer", "Icon (FlowIcon)", "Tooltip (CSS ::after)"],
        variants: ["High", "Medium", "Outline", "Low", "Danger"],
        states: ["default", "hover", "focus-visible", "pressed", "disabled", "loading"],
        tokens: ["comp.iconButton.bg.*", "comp.iconButton.icon.*", "comp.iconButton.size.*"],
        accessibility: ["aria-label required", "Tooltip via data-tooltip + CSS ::after"],
      },
      {
        name: "FlowFAB",
        purpose:
          "Floating Action Button. Prominent circular button for the primary action on a screen. One per screen maximum.",
        platform: "mobile",
        anatomy: ["Circular container (Surface, elevated)", "Icon", "Extended label (opt)"],
        variants: ["sm — 40px", "md — 56px (default)", "lg — 72px", "Extended — icon + label pill"],
        states: ["default", "hover", "focus-visible", "pressed"],
        tokens: ["comp.fab.size.*", "comp.fab.bg", "comp.fab.elevation"],
        accessibility: ["aria-label required", "Keyboard reachable"],
      },
    ],
  },

  selection: {
    title: "Selection",
    description:
      "Components where the user chooses from predefined options or toggles states. Distinct from Controls (fire-and-forget triggers) and Inputs (free-form data entry).",
    icon: "check-square",
    layer: "L3",
    exportCount: 10,
    importPath: "../components/selection",
    components: [
      {
        name: "FlowSegmentedControl",
        purpose:
          "Horizontal set of mutually exclusive options (2-5). Selection is immediate, no submit needed.",
        platform: "shared",
        anatomy: [
          "Container (Surface)",
          "Segments (ActionSurface)",
          "Selected indicator (sliding bg)",
          "Labels/icons",
        ],
        variants: ["Text-only", "Icon-only", "Icon + text", "Full-width vs auto-width"],
        states: ["default", "hover", "focus-visible", "pressed", "selected", "disabled"],
        tokens: ["comp.segmented.bg.*", "comp.segmented.indicator.*", "comp.segmented.text.*"],
        accessibility: ["role='radiogroup'", "role='radio' per segment", "Arrow keys navigate"],
      },
      {
        name: "FlowRadioButton / FlowRadioGroup",
        purpose:
          "Single selection from mutually exclusive group. All options visible simultaneously.",
        platform: "shared",
        variants: ["Default", "Card variant", "Horizontal layout"],
        states: ["default", "hover", "focus-visible", "selected", "error", "disabled"],
        tokens: ["comp.radio.*"],
        accessibility: ["role='radiogroup'", "role='radio'", "Arrow keys within group"],
      },
      {
        name: "FlowCheckbox / FlowCheckboxGroup",
        purpose: "Binary or indeterminate selection control for multiple selections.",
        platform: "shared",
        variants: ["Default", "Indeterminate", "Error"],
        states: [
          "default",
          "hover",
          "focus-visible",
          "checked",
          "indeterminate",
          "error",
          "disabled",
        ],
        tokens: ["comp.checkbox.*"],
        accessibility: ["role='checkbox'", "aria-checked='true'/'false'/'mixed'"],
      },
      {
        name: "FlowSwitch",
        purpose:
          "Immediate toggle for binary settings. Takes effect immediately (no form submission).",
        platform: "shared",
        variants: ["Default", "With icons", "Compact"],
        states: ["default", "hover", "focus-visible", "checked", "disabled"],
        tokens: ["comp.switch.*"],
        accessibility: ["role='switch'", "aria-checked"],
      },
      {
        name: "FlowToggleButton",
        purpose:
          "Button that toggles between on/off states. Used for binary settings inline (e.g., bold/italic in toolbar).",
        platform: "shared",
        anatomy: ["Container (ActionSurface)", "StateLayer", "Icon or label", "Selected indicator"],
        variants: ["Icon toggle", "Label toggle"],
        states: ["default", "hover", "focus-visible", "pressed", "selected", "disabled"],
        tokens: ["comp.toggle.bg.*", "comp.toggle.border.*", "comp.toggle.selected.*"],
        accessibility: ["aria-pressed='true'/'false'", "Space/Enter toggles"],
      },
      {
        name: "FlowToggleButtonGroup",
        purpose:
          "Groups multiple ToggleButtons for related binary options (toolbar formatting, view switches).",
        platform: "shared",
        anatomy: ["Container (Inline)", "ToggleButton children", "Dividers (optional)"],
        variants: ["Single-select mode", "Multi-select mode"],
        states: ["default", "disabled (group-wide)"],
        tokens: ["comp.toggleGroup.gap", "comp.toggleGroup.border.*"],
        accessibility: ["role='group'", "aria-label describing purpose"],
      },
      {
        name: "FlowSelect",
        purpose:
          "Dropdown for choosing one option from a list. Used when options > 5 or space is constrained.",
        platform: "shared",
        variants: ["Default", "Searchable", "Grouped", "With icons"],
        states: ["default", "hover", "focus-visible", "open", "error", "disabled"],
        tokens: ["comp.select.*"],
        accessibility: ["role='combobox'", "role='listbox'", "Arrow keys navigate"],
      },
      {
        name: "FlowSlider",
        purpose: "Control for selecting a value or range within a continuous or stepped scale.",
        platform: "shared",
        variants: ["Continuous", "Stepped", "Range (two thumbs)", "With value label"],
        states: ["default", "hover", "focus-visible", "dragging", "disabled"],
        tokens: ["comp.slider.*"],
        accessibility: ["role='slider'", "aria-valuenow/min/max"],
      },
    ],
  },

  inputs: {
    title: "Inputs",
    description:
      "Free-form data entry — the user types, writes, or provides content. Compound input patterns (Search, DatePicker, RichTextEditor, etc.) have been promoted to Patterns (L4).",
    icon: "edit",
    layer: "L3",
    exportCount: 2,
    importPath: "../components/inputs",
    components: [
      {
        name: "FlowTextInput",
        purpose:
          "Tall (64px) floating-label input. Progressive border-width, animated floating label, conditional clear button, hint/error text.",
        platform: "shared",
        variants: ["Default", "With hint", "With error", "Clearable", "Disabled"],
        states: ["default", "hover", "focus", "filled", "error", "disabled"],
        tokens: ["comp.textinput.*"],
        accessibility: [
          "label linked via htmlFor/id",
          "aria-invalid on error",
          "aria-describedby for hint/error",
        ],
      },
      {
        name: "FlowTextArea",
        purpose: "Multi-line text input for comments, descriptions, longer content.",
        platform: "shared",
        variants: ["Fixed height", "Auto-growing", "With character limit"],
        states: ["default", "hover", "focus", "filled", "error", "disabled"],
        tokens: ["comp.textarea.*"],
        accessibility: ["aria-live for character count"],
      },
    ],
  },

  feedback: {
    title: "Feedback",
    description:
      "Atomic progress indicators, loading placeholders, and validation messages. Compound feedback patterns (SnackbarProvider, PullToRefresh) promoted to Patterns (L4).",
    icon: "bell",
    layer: "L3",
    exportCount: 4,
    importPath: "../components/feedback",
    components: [
      {
        name: "FlowSkeleton",
        purpose:
          "Placeholder loading state that mimics content layout. Prevents layout shift during data loading.",
        platform: "shared",
        variants: ["Text (single line)", "Circular (avatar)", "Rectangular (card)", "Custom shape"],
        states: ["animating (pulse shimmer)"],
        tokens: ["comp.skeleton.*"],
        accessibility: ["aria-busy='true' on parent", "aria-hidden on skeleton itself"],
      },
      {
        name: "FlowProgressBar",
        purpose: "Horizontal progress indicator for determinate or indeterminate loading.",
        platform: "shared",
        variants: ["Determinate (0-100%)", "Indeterminate (looping)", "With label", "Segmented"],
        states: ["idle", "loading", "complete", "error"],
        tokens: ["comp.progressbar.*"],
        accessibility: ["role='progressbar'", "aria-valuenow/min/max"],
      },
      {
        name: "FlowCircularProgress",
        purpose: "Circular progress indicator for inline loading or completion percentage.",
        platform: "shared",
        variants: ["Determinate", "Indeterminate (spinning)", "With center label"],
        states: ["spinning", "complete"],
        tokens: ["comp.circularprogress.*"],
        accessibility: ["role='progressbar'", "aria-valuenow"],
      },
      {
        name: "FlowInlineValidationMessage",
        purpose:
          "Inline validation feedback shown below form fields. Communicates errors, warnings, and success states.",
        platform: "shared",
        variants: ["Error", "Warning", "Success", "Info"],
        states: ["visible", "hidden"],
        tokens: ["comp.validation.*"],
        accessibility: ["role='alert' for errors", "aria-live='polite' for warnings"],
      },
    ],
  },

  display: {
    title: "Display",
    description:
      "Atomic visual presentation: cards, chips, tags, badges, avatars, lists, tables, trees. Compound display patterns (AvatarGroup, HoverCard) promoted to Patterns (L4).",
    icon: "eye",
    layer: "L3",
    exportCount: 10,
    importPath: "../components/display",
    components: [
      {
        name: "FlowCard",
        purpose:
          "Contained surface for grouping related content. Establishes hierarchy through elevation, can be interactive or static.",
        platform: "shared",
        variants: ["Elevated", "Outlined", "Filled", "Interactive (clickable)"],
        states: ["default", "hover", "focus-visible", "pressed", "selected", "disabled"],
        tokens: ["comp.card.*"],
        accessibility: ["Interactive: role='article' or role='link'", "Focus ring on keyboard"],
      },
      {
        name: "FlowChip",
        purpose:
          "Compact interactive element for selections, filters, or status display. Can be dismissible, selectable, or informational.",
        platform: "shared",
        variants: [
          "Base (static)",
          "Filter (toggleable)",
          "Status (semantic color)",
          "Input (removable)",
        ],
        states: ["default", "hover", "focus-visible", "selected", "disabled"],
        tokens: ["comp.chip.*"],
        accessibility: [
          "Filter: role='checkbox' aria-checked",
          "Dismiss: aria-label='Remove {label}'",
        ],
      },
      {
        name: "FlowTag",
        purpose:
          "Non-interactive semantic label with two-axis API: variant (label | code) controls typography, status (neutral | info | success | warning | error) controls semantic color. Purely presentational.",
        platform: "shared",
        variants: ["Label (sans-serif)", "Code (monospace)"],
        states: ["neutral", "info", "success", "warning", "error"],
        tokens: ["comp.tag.*"],
        accessibility: ["Purely decorative — no ARIA roles"],
      },
      {
        name: "FlowBadge",
        purpose:
          "Small visual indicator attached to another element showing count, status, or attention signal.",
        platform: "shared",
        variants: ["Dot", "Count", "Max (99+)", "Status"],
        states: ["default", "hidden (count=0)"],
        tokens: ["comp.badge.*"],
        accessibility: ["aria-label with full count text"],
      },
      {
        name: "FlowAvatar",
        purpose:
          "Represents user or entity with image, initials, or placeholder. Single identity unit.",
        platform: "shared",
        variants: ["Image", "Initials", "Placeholder icon"],
        states: ["default", "loading (skeleton)"],
        tokens: ["comp.avatar.*"],
        accessibility: ["alt text for images", "Status badge: aria-label"],
      },
      {
        name: "FlowList / FlowListItem",
        purpose:
          "Structured vertical collection. Items can be interactive (navigational, selectable) or informational.",
        platform: "shared",
        variants: [
          "Single-line",
          "Two-line",
          "Three-line",
          "Interactive (with chevron)",
          "Selectable",
        ],
        states: ["default", "hover", "focus-visible", "pressed", "selected", "disabled"],
        tokens: ["comp.list.*"],
        accessibility: ["role='list'/'listitem'", "Selectable: role='listbox'/'option'"],
      },
      {
        name: "FlowTable",
        purpose:
          "Pure presentational table — renders data in rows/columns with no interactivity. L3 base for DataTable patterns.",
        platform: "shared",
        variants: ["Default", "Striped rows", "Hoverable rows", "With caption"],
        states: ["default", "hover (per row)"],
        tokens: ["comp.table.*"],
        accessibility: ["role='table'", "Column headers: role='columnheader'"],
      },
      {
        name: "FlowKPITrendIndicator",
        purpose:
          "Compact trend direction display: up/down arrow with percentage change and semantic coloring.",
        platform: "shared",
        variants: ["Positive (green up)", "Negative (red down)", "Neutral", "With period label"],
        states: ["default"],
        tokens: ["comp.kpitrend.*"],
        accessibility: ["aria-label includes direction and value"],
      },
      {
        name: "FlowTreeView",
        purpose:
          "Hierarchical tree navigation for deep structures (file systems, org charts, nested categories).",
        platform: "desktop",
        variants: [
          "Single-select",
          "Multi-select (checkboxes)",
          "With icons",
          "Lazy-loading children",
        ],
        states: ["default", "expanded", "selected", "loading-children"],
        tokens: ["comp.treeview.*"],
        accessibility: ["role='tree'/'treeitem'", "aria-expanded", "Arrow keys navigate"],
      },
    ],
  },

  navigation: {
    title: "Navigation",
    description:
      "Atomic navigation primitives: tabs, breadcrumbs, pagination, steppers, nav bars, sidebars. Adaptive patterns (DrawerAdapter) promoted to Patterns (L4).",
    icon: "compass",
    layer: "L3",
    exportCount: 6,
    importPath: "../components/navigation",
    components: [
      {
        name: "FlowTabs",
        purpose:
          "Horizontal tab bar for switching between views within the same context. Supports icons, badges, and scrollable overflow.",
        platform: "shared",
        variants: [
          "Text-only",
          "Icon + text",
          "Scrollable (overflow)",
          "Pill style",
          "With badges",
        ],
        states: ["default", "hover", "focus-visible", "selected", "disabled"],
        tokens: ["comp.tabs.*"],
        accessibility: ["role='tablist'/'tab'/'tabpanel'", "Arrow keys navigate tabs"],
      },
      {
        name: "FlowBreadcrumbs",
        purpose:
          "Shows current location within navigation hierarchy. Allows jumping to parent levels.",
        platform: "desktop",
        variants: ["Standard (> separator)", "With icons", "Collapsible (ellipsis for deep paths)"],
        states: ["default", "hover (per crumb)", "current (last item)"],
        tokens: ["comp.breadcrumbs.*"],
        accessibility: ["nav aria-label='Breadcrumb'", "aria-current='page' on last"],
      },
      {
        name: "FlowPagination",
        purpose: "Navigation for multi-page data sets. Used with DataTable or lists.",
        platform: "desktop",
        variants: [
          "Numbered pages",
          "Simple prev/next",
          "With items-per-page selector",
          "Compact (mobile)",
        ],
        states: ["default", "hover", "selected (current)", "disabled (first/last)"],
        tokens: ["comp.pagination.*"],
        accessibility: ["nav aria-label='Pagination'", "aria-current='page'"],
      },
      {
        name: "FlowStepper",
        purpose:
          "Progress indicator for multi-step workflows. Shows current step, completed steps, and remaining steps.",
        platform: "shared",
        variants: [
          "Horizontal",
          "Vertical",
          "Clickable (can jump back)",
          "With descriptions",
          "Error state per step",
        ],
        states: ["default", "active", "completed", "error", "disabled"],
        tokens: ["comp.stepper.*"],
        accessibility: ["role='list'", "aria-current='step'", "Completed steps announced"],
      },
      {
        name: "FlowBottomNav",
        purpose: "Primary navigation for mobile apps. Bottom tab bar with 3-5 destinations.",
        platform: "mobile",
        variants: ["Labeled", "Icon-only", "With badge", "With FAB cutout"],
        states: ["default", "active", "hover (web)", "pressed"],
        tokens: ["comp.bottomnav.*"],
        accessibility: ["role='navigation'", "aria-current='page'"],
      },
      {
        name: "FlowSidebar",
        purpose:
          "Persistent vertical navigation for desktop apps. Collapsible groups, icon-only mode, header/footer slots.",
        platform: "desktop",
        variants: [
          "Expanded (~280px)",
          "Collapsed (icon-only ~56px)",
          "With sub-nav groups",
          "Floating overlay (smaller desktops)",
        ],
        states: ["default", "hover (per item)", "active (selected)", "collapsed (global)"],
        tokens: ["comp.sidebar.*"],
        accessibility: ["role='navigation'", "aria-current='page'", "Collapse: aria-expanded"],
      },
    ],
  },

  overlays: {
    title: "Overlays",
    description:
      "Atomic floating layers: dialogs, sheets, menus, popovers, tooltips. Compound overlay patterns (FullscreenSheet, ConfirmationDialog) promoted to Patterns (L4).",
    icon: "layers",
    layer: "L3",
    exportCount: 6,
    importPath: "../components/overlays",
    components: [
      {
        name: "FlowDialog",
        purpose:
          "Modal dialog for focused tasks requiring user attention. Traps focus and blocks interaction with background content.",
        platform: "shared",
        variants: [
          "Alert (message + actions)",
          "Form (contains form fields)",
          "Fullscreen (mobile)",
          "Non-dismissible (no backdrop click)",
        ],
        states: ["closed", "opening", "open", "closing"],
        tokens: ["comp.dialog.*"],
        accessibility: ["role='dialog'", "aria-modal='true'", "Focus trapped", "Escape closes"],
      },
      {
        name: "FlowBottomSheet",
        purpose:
          "Panel that slides up from bottom for contextual content/actions without leaving current view.",
        platform: "mobile",
        variants: ["Peek (partial)", "Modal (full overlay)", "Expandable (snap points)"],
        states: ["closed", "peeking", "half-expanded", "fully-expanded"],
        tokens: ["comp.bottomsheet.*"],
        accessibility: ["role='dialog' when modal", "Drag handle: role='slider'"],
      },
      {
        name: "FlowContextMenu",
        purpose:
          "Right-click triggered context menu with actions, icons, shortcuts, and separators.",
        platform: "desktop",
        variants: [
          "Simple (items only)",
          "With icons",
          "With shortcuts",
          "With separators",
          "Nested (sub-menus)",
        ],
        states: ["closed", "open", "hover (per item)", "disabled (per item)"],
        tokens: ["comp.contextmenu.*"],
        accessibility: ["role='menu'/'menuitem'", "Arrow keys navigate", "Escape closes"],
      },
      {
        name: "FlowMenu",
        purpose:
          "Click-triggered dropdown menu with trigger element, placement control, and keyboard navigation.",
        platform: "shared",
        variants: [
          "Bottom-start",
          "Bottom-end",
          "Top-start",
          "With checkmarks",
          "With danger items",
        ],
        states: ["closed", "open", "hover (per item)", "disabled (per item)"],
        tokens: ["comp.menu.*"],
        accessibility: ["role='menu'", "aria-expanded on trigger", "Arrow keys navigate"],
      },
      {
        name: "FlowPopover",
        purpose:
          "Click-triggered floating content panel with arbitrary children. Used for rich inline content.",
        platform: "shared",
        variants: ["Bottom", "Top", "Left", "Right", "With arrow"],
        states: ["closed", "open"],
        tokens: ["comp.popover.*"],
        accessibility: ["aria-expanded on trigger", "Focus management", "Escape closes"],
      },
      {
        name: "FlowTooltip",
        purpose:
          "Hover-triggered simple text hint. Shows on hover/focus, auto-dismisses on mouse leave.",
        platform: "desktop",
        variants: ["Top", "Bottom", "Left", "Right", "Multi-line"],
        states: ["hidden", "visible"],
        tokens: ["comp.tooltip.*"],
        accessibility: ["role='tooltip'", "aria-describedby on trigger", "Focus also triggers"],
      },
    ],
  },

  layout: {
    title: "Layout",
    description:
      "Atomic structural composition: accordions, split panes, fieldsets. Compound layout patterns (Toolbar, SwipeActions, QuickActions) promoted to Patterns (L4).",
    icon: "grid",
    layer: "L3",
    exportCount: 3,
    importPath: "../components/layout",
    components: [
      {
        name: "FlowAccordion",
        purpose: "Expandable/collapsible content sections. Can be single-open or multi-open.",
        platform: "shared",
        variants: ["Single-open (exclusive)", "Multi-open", "With icons", "Flush (no borders)"],
        states: ["default", "expanded", "hover (header)", "focus-visible (header)", "disabled"],
        tokens: ["comp.accordion.*"],
        accessibility: ["aria-expanded on trigger", "aria-controls linking", "Enter/Space toggles"],
      },
      {
        name: "FlowSplitPane",
        purpose: "Resizable split panels with drag handle. For side-by-side content on desktop.",
        platform: "desktop",
        variants: [
          "Horizontal split",
          "Vertical split",
          "With min/max constraints",
          "Collapsible panel",
        ],
        states: ["default", "dragging (resize handle)", "collapsed (one panel hidden)"],
        tokens: ["comp.splitpane.*"],
        accessibility: [
          "Drag handle: role='separator' aria-orientation",
          "Keyboard: arrows resize",
        ],
      },
      {
        name: "FlowFieldset",
        purpose:
          "Form field wrapper that provides label, helper text, and error state container for any input.",
        platform: "shared",
        variants: ["With label", "With helper", "With error", "Required indicator"],
        states: ["default", "error", "disabled"],
        tokens: ["comp.fieldset.*"],
        accessibility: ["fieldset + legend pattern", "aria-describedby for helper/error"],
      },
    ],
  },

  data: {
    title: "Data",
    description:
      "Lightweight data display and sort controls. Complex data patterns (tables, filters, transfer lists) have been promoted to the Patterns layer (L4).",
    icon: "database",
    layer: "L3",
    exportCount: 2,
    importPath: "../components/data",
    components: [
      {
        name: "FlowSortControl",
        purpose:
          "Simple sort direction toggle: ascending, descending, or unsorted. Used alongside column headers or filter bars.",
        platform: "shared",
        variants: ["Icon-only (arrow)", "With label", "Three-state (asc/desc/none)"],
        states: ["unsorted", "ascending", "descending", "disabled"],
        tokens: ["comp.sortcontrol.*"],
        accessibility: ["aria-sort on associated column", "Button: aria-label describes direction"],
      },
      {
        name: "FlowChartLegendItem",
        purpose:
          "Single legend entry for chart visualizations: color swatch + label + optional value.",
        platform: "shared",
        variants: [
          "Default (swatch + label)",
          "With value",
          "Toggleable (click to hide series)",
          "Horizontal/vertical layout",
        ],
        states: ["default", "hover", "hidden (series toggled off)"],
        tokens: ["comp.chartlegend.*"],
        accessibility: ["role='checkbox' when toggleable", "aria-checked for series visibility"],
      },
    ],
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PAGE COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function ComponentsByDomainPage() {
  const { domain } = useParams<{ domain: string }>();

  if (!domain || !DOMAIN_SPECS[domain]) {
    return <Navigate to="/components/controls" replace />;
  }

  const spec = DOMAIN_SPECS[domain];
  const sharedCount = spec.components.filter((c) => c.platform === "shared").length;
  const desktopCount = spec.components.filter((c) => c.platform === "desktop").length;
  const mobileCount = spec.components.filter((c) => c.platform === "mobile").length;

  return (
    <LayoutGrid>
      <LayoutGrid.Item span={12} className="component-detail-surface-wrapper">
        <Surface variant="secondary" radius="surface" className="component-detail-surface">
          <Stack gap={PAGE_GAP}>
            <PageHeader chapter={`Layer 3 — ${spec.layer} Components`} title={spec.title}>
              {spec.description}
            </PageHeader>

            {/* Summary bar */}
            <Inline gap={3} wrap>
              <Surface padding="control" style={{ flex: 1, minWidth: 120 }}>
                <Stack gap={1}>
                  <Text variant="overline">Total</Text>
                  <Text variant="heading-l">{spec.components.length}</Text>
                </Stack>
              </Surface>
              {sharedCount > 0 && (
                <Surface
                  padding="control"
                  style={{
                    flex: 1,
                    minWidth: 120,
                    borderLeft: `3px solid ${platformColors.shared}`,
                  }}
                >
                  <Stack gap={1}>
                    <Text variant="overline">Shared</Text>
                    <Text variant="heading-l">{sharedCount}</Text>
                  </Stack>
                </Surface>
              )}
              {desktopCount > 0 && (
                <Surface
                  padding="control"
                  style={{
                    flex: 1,
                    minWidth: 120,
                    borderLeft: `3px solid ${platformColors.desktop}`,
                  }}
                >
                  <Stack gap={1}>
                    <Text variant="overline">Desktop</Text>
                    <Text variant="heading-l">{desktopCount}</Text>
                  </Stack>
                </Surface>
              )}
              {mobileCount > 0 && (
                <Surface
                  padding="control"
                  style={{
                    flex: 1,
                    minWidth: 120,
                    borderLeft: `3px solid ${platformColors.mobile}`,
                  }}
                >
                  <Stack gap={1}>
                    <Text variant="overline">Mobile</Text>
                    <Text variant="heading-l">{mobileCount}</Text>
                  </Stack>
                </Surface>
              )}
            </Inline>

            <Callout>
              <Text variant="paragraph-s" color="accent">
                <strong>Import:</strong>{" "}
                <code style={{ fontFamily: "var(--ref-voice-family-mono)" }}>
                  import {"{ ... }"} from &quot;{spec.importPath}&quot;;
                </code>
              </Text>
            </Callout>

            {/* Component list with platform badges */}
            <Section title="Components">
              <Stack gap={2}>
                {spec.components.map((c) => {
                  const slug = toSlug(c.name);
                  const hasDetail = !!COMPONENT_REGISTRY[`${domain}/${slug}`];
                  return (
                    <Link
                      key={c.name}
                      to={hasDetail ? `/components/${domain}/${slug}` : "#"}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Surface
                        padding="control"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "var(--ref-frame-space-3)",
                          cursor: hasDetail ? "pointer" : "default",
                          opacity: hasDetail ? 1 : 0.7,
                          transition: "background var(--sys-momentum-transition-default)",
                        }}
                      >
                        <PlatformBadge platform={c.platform} />
                        <Stack gap={1} style={{ flex: 1, minWidth: 0 }}>
                          <Text
                            variant="label-m"
                            style={{
                              color: hasDetail ? "var(--sys-energy-text-accent)" : undefined,
                            }}
                          >
                            {c.name}
                          </Text>
                          <Text
                            variant="paragraph-s"
                            color="tertiary"
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {c.purpose}
                          </Text>
                        </Stack>
                        {hasDetail && (
                          <Text variant="caption" color="tertiary" style={{ flexShrink: 0 }}>
                            →
                          </Text>
                        )}
                      </Surface>
                    </Link>
                  );
                })}
              </Stack>
            </Section>

            <Divider spacing={2} />

            {/* Detailed specs */}
            <Section title="Specifications">
              <ComponentSpecAccordion
                items={spec.components.map((c) => ({
                  ...c,
                  extra: (
                    <Inline gap={2} style={{ marginTop: "var(--ref-frame-space-2)" }}>
                      <PlatformBadge platform={c.platform} />
                    </Inline>
                  ),
                }))}
                accentColor={domain === "data" ? "var(--sys-energy-status-info)" : undefined}
              />
            </Section>
          </Stack>
        </Surface>
      </LayoutGrid.Item>
    </LayoutGrid>
  );
}

export default ComponentsByDomainPage;

/** Convert component name to URL slug: FlowButton → flow-button */
function toSlug(name: string): string {
  return name
    .replace(/^Flow/, "flow-")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+\/\s+/g, "-")
    .replace(/\s+/g, "-")
    .toLowerCase();
}
