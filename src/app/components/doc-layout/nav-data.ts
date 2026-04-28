/**
 * FLOW Doc Layout — Navigation data
 * ──────────────────────────────────
 * Pure data: types, helpers, and the NAV_SECTIONS constant
 * that drives the sidebar navigation tree.
 */
import { PATTERN_CATEGORIES } from "../../pages/patterns-by-category";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildPatternNavItems() {
  const categories = Object.entries(PATTERN_CATEGORIES).map(([category, meta]) => ({
    path: `/patterns/${category}`,
    name: meta.title.replace(/ Patterns?$/, ""),
    icon: meta.icon,
    children: meta.patterns.map((p) => ({
      path: `/patterns/${category}/${slugify(p.name)}`,
      name: p.name,
    })),
  }));

  return categories;
}

export interface NavItem {
  path: string;
  name: string;
  icon: string;
  children?: { path: string; name: string }[];
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    label: "Get Started",
    items: [
      { path: "/installation", name: "Installation", icon: "download" },
      { path: "/changelog", name: "Changelog", icon: "clock" },
    ],
  },
  {
    label: "Foundations",
    items: [
      { path: "/foundations/energy", name: "Energy (Color)", icon: "palette" },
      { path: "/foundations/voice", name: "Voice (Typography)", icon: "type" },
      { path: "/foundations/frame", name: "Frame (Layout)", icon: "layout" },
      { path: "/foundations/depth", name: "Depth (Surfaces)", icon: "layers" },
      { path: "/foundations/momentum", name: "Momentum (Motion)", icon: "zap" },
      { path: "/foundations/state", name: "State (Interaction)", icon: "pointer" },
      { path: "/foundations/tone", name: "Tone (Language)", icon: "message" },
      { path: "/foundations/growth", name: "Growth (Signals)", icon: "bar-chart" },
      { path: "/foundations/symbol", name: "Symbol (Visuals)", icon: "image" },
    ],
  },
  {
    label: "Architecture",
    items: [
      { path: "/tokens", name: "Token Architecture", icon: "code" },
      { path: "/primitives", name: "Primitives", icon: "shapes" },
      { path: "/governance", name: "Governance", icon: "shield" },
    ],
  },
  {
    label: "Components (L3)",
    items: [
      {
        path: "/components/controls",
        name: "Controls",
        icon: "zap",
        children: [
          { path: "/components/controls/flow-button", name: "FlowButton" },
          { path: "/components/controls/flow-icon-button", name: "FlowIconButton" },
          { path: "/components/controls/flow-fab", name: "FlowFAB" },
        ],
      },
      {
        path: "/components/selection",
        name: "Selection",
        icon: "check-square",
        children: [
          { path: "/components/selection/flow-segmented-control", name: "SegmentedControl" },
          { path: "/components/selection/flow-radio-button", name: "FlowRadioButton" },
          { path: "/components/selection/flow-radio-group", name: "FlowRadioGroup" },
          { path: "/components/selection/flow-checkbox", name: "FlowCheckbox" },
          { path: "/components/selection/flow-checkbox-group", name: "FlowCheckboxGroup" },
          { path: "/components/selection/flow-switch", name: "FlowSwitch" },
          { path: "/components/selection/flow-toggle-button", name: "ToggleButton" },
          { path: "/components/selection/flow-toggle-button-group", name: "ToggleButtonGroup" },
          { path: "/components/selection/flow-select", name: "FlowSelect" },
          { path: "/components/selection/flow-slider", name: "FlowSlider" },
        ],
      },
      {
        path: "/components/inputs",
        name: "Inputs",
        icon: "edit",
        children: [
          { path: "/components/inputs/flow-text-input", name: "FlowTextInput" },
          { path: "/components/inputs/flow-text-area", name: "FlowTextArea" },
          { path: "/components/inputs/flow-phone-input", name: "FlowPhoneInput" },
          { path: "/components/inputs/flow-country-select", name: "FlowCountrySelect" },
        ],
      },
      {
        path: "/components/display",
        name: "Display",
        icon: "eye",
        children: [
          { path: "/components/display/flow-list", name: "FlowList" },
          { path: "/components/display/flow-chip", name: "FlowChip" },
          { path: "/components/display/flow-tag", name: "FlowTag" },
          { path: "/components/display/flow-badge", name: "FlowBadge" },
          { path: "/components/display/flow-card", name: "FlowCard" },
          { path: "/components/display/flow-avatar", name: "FlowAvatar" },
          { path: "/components/display/flow-table", name: "FlowTable" },
          { path: "/components/display/flow-kpi-trend-indicator", name: "FlowKPITrendIndicator" },
          { path: "/components/display/flow-tree-view", name: "FlowTreeView" },
        ],
      },
      {
        path: "/components/navigation",
        name: "Navigation",
        icon: "compass",
        children: [
          { path: "/components/navigation/flow-breadcrumbs", name: "FlowBreadcrumbs" },
          { path: "/components/navigation/flow-tabs", name: "FlowTabs" },
          { path: "/components/navigation/flow-pagination", name: "FlowPagination" },
          { path: "/components/navigation/flow-stepper", name: "FlowStepper" },
          { path: "/components/navigation/flow-bottom-nav", name: "FlowBottomNav" },
          { path: "/components/navigation/flow-sidebar", name: "FlowSidebar" },
        ],
      },
      {
        path: "/components/overlays",
        name: "Overlays",
        icon: "layers",
        children: [
          { path: "/components/overlays/flow-tooltip", name: "FlowTooltip" },
          { path: "/components/overlays/flow-dialog", name: "FlowDialog" },
          { path: "/components/overlays/flow-bottom-sheet", name: "FlowBottomSheet" },
          { path: "/components/overlays/flow-context-menu", name: "FlowContextMenu" },
          { path: "/components/overlays/flow-menu", name: "FlowMenu" },
          { path: "/components/overlays/flow-popover", name: "FlowPopover" },
        ],
      },
      {
        path: "/components/layout",
        name: "Layout",
        icon: "grid",
        children: [{ path: "/components/layout/flow-accordion", name: "FlowAccordion" }],
      },
      {
        path: "/components/data",
        name: "Data",
        icon: "database",
        children: [
          { path: "/components/data/flow-sort-control", name: "FlowSortControl" },
          { path: "/components/data/flow-chart-legend-item", name: "FlowChartLegendItem" },
        ],
      },
      {
        path: "/components/feedback",
        name: "Feedback",
        icon: "message-circle",
        children: [
          { path: "/components/feedback/flow-skeleton", name: "FlowSkeleton" },
          { path: "/components/feedback/flow-progress-bar", name: "FlowProgressBar" },
          { path: "/components/feedback/flow-circular-progress", name: "FlowCircularProgress" },
          {
            path: "/components/feedback/flow-inline-validation-message",
            name: "FlowInlineValidationMessage",
          },
        ],
      },
    ],
  },
  {
    label: "Patterns (L4)",
    items: [{ path: "/patterns", name: "Overview", icon: "hexagon" }, ...buildPatternNavItems()],
  },
  {
    label: "Templates (L5)",
    items: [
      { path: "/templates", name: "Templates", icon: "file" },
      { path: "/components/templates/doc-template", name: "DocTemplate", icon: "book-open" },
    ],
  },
  {
    label: "Showcases",
    items: [
      { path: "/flag-explorer", name: "Flag Explorer", icon: "globe" },
      { path: "/icon-explorer", name: "Icon Explorer", icon: "grid" },
    ],
  },
];
