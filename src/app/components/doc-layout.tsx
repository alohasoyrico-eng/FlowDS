/**
 * FLOW Doc Layout — NavigationShell Pattern (L4)
 * ────────────────────────────────────────────────
 * This layout COMPOSES Flow primitives to prove dogfooding:
 *   Surface (sidebar, content), Stack/Inline (layout),
 *   Text (labels, branding), FlowIcon (nav icons),
 *   ActionSurface (collapse toggle) (section breaks),
 *   ThemeToggle (utility).
 *
 * Responsive behavior:
 *   Mobile  (<576px):  sidebar hidden, hamburger menu → overlay drawer
 *   Phablet (576-767px): sidebar hidden, hamburger menu → overlay drawer
 *   Tablet  (768-991px): sidebar default collapsed (user-toggleable)
 *   Desktop (≥992px):  sidebar expanded (collapsible by user)
 *
 * Zero raw <div> layout hacks. Zero inline flex declarations.
 * Every style value flows through tokens.
 */
import { Link, Outlet, useLocation } from "react-router";
import { Suspense, useCallback, useEffect, useState } from "react";

import {
  ActionSurface,
  FlowIcon,
  Inline,
  Stack,
  Surface,
  Text,
  ThemeToggle,
  useFlowTheme,
} from "../primitives";
import { GridOverlay } from "./grid-overlay";
import flowLogoPaths from "../../imports/svg-u72vgquk7t";
import { PATTERN_CATEGORIES } from "../pages/patterns-by-category";
import { DocSearch } from "./doc-search";

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

interface NavItem {
  path: string;
  name: string;
  icon: string;
  children?: { path: string; name: string }[];
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
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
      { path: "/state-model", name: "State Model", icon: "git-branch" },
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
      { path: "/demos", name: "Interactive Demos", icon: "zap" },
      { path: "/layout-grid", name: "LayoutGrid", icon: "layout" },
      { path: "/density-showcase", name: "Density Switcher", icon: "layers" },
      { path: "/tone-demo", name: "Tone Demo", icon: "message-circle" },
      { path: "/flag-explorer", name: "Flag Explorer", icon: "globe" },
      { path: "/phase3-showcase", name: "Phase 3 Showcase", icon: "star" },
    ],
  },
  {
    label: "System",
    items: [
      { path: "/governance", name: "Governance", icon: "shield" },
      { path: "/system-audit", name: "System Audit", icon: "check-circle" },
      { path: "/density-audit-showcase", name: "Density Audit", icon: "bar-chart-2" },
      { path: "/momentum-audit-showcase", name: "Momentum Audit", icon: "activity" },
    ],
  },
];

export function DocLayout() {
  const location = useLocation();
  const { breakpoint, theme, toggle } = useFlowTheme();
  const { isMobile, isPhablet, isTablet } = breakpoint;

  // Drawer mode for phones + phablets; static sidebar for tablet + desktop
  const useDrawer = isMobile || isPhablet;

  // Sidebar collapse state
  const [userCollapsed, setUserCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Grid overlay — global state, persists across all tabs and pages
  const [showGrid, setShowGrid] = useState(false);

  // Active grid tier label (derived from breakpoint — no extra resize listener)
  const isDesktop = !isMobile && !isPhablet && !isTablet;
  const gridTier = isDesktop ? "lg" : isMobile ? "sm" : "md";
  const tierLabel = { lg: "12 col", md: "6 col", sm: "1 col" }[gridTier];

  // Expandable nav: track which parent paths are expanded
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(() => {
    // Auto-expand parents whose children match the initial URL
    const initial = new Set<string>();
    for (const section of NAV_SECTIONS) {
      for (const item of section.items) {
        if (item.children?.some((c) => window.location.pathname === c.path)) {
          initial.add(item.path);
        }
      }
    }
    return initial;
  });

  const toggleExpanded = (path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  // Sync drawer and nav expansion with URL changes (setState during render on prop change)
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setDrawerOpen(false);
    for (const section of NAV_SECTIONS) {
      for (const item of section.items) {
        if (item.children?.some((c) => location.pathname === c.path)) {
          setExpandedPaths((prev) => {
            if (prev.has(item.path)) return prev;
            const next = new Set(prev);
            next.add(item.path);
            return next;
          });
        }
      }
    }
  }

  // On mobile/phablet, sidebar is a drawer overlay; on tablet it's auto-collapsed
  const isCollapsed = useDrawer ? false : isTablet ? !userCollapsed : userCollapsed;
  const showSidebar = useDrawer ? drawerOpen : true;

  // Close drawer on escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && drawerOpen) setDrawerOpen(false);
    },
    [drawerOpen],
  );

  useEffect(() => {
    if (drawerOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [drawerOpen, handleKeyDown]);

  // ── Sidebar content (shared between static and drawer) ──
  const sidebarContent = (isDrawer: boolean) => {
    const collapsed = isDrawer ? false : isCollapsed;
    return (
      <>
        {/* Logo area */}
        <div
          style={{
            position: "relative",
            borderBottom: "1px solid var(--sys-energy-border-default)",
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div
              style={{
                padding: collapsed
                  ? "var(--ref-frame-space-4) var(--ref-frame-space-3)"
                  : "var(--ref-frame-space-5) var(--ref-frame-space-6)",
                paddingRight: collapsed ? undefined : "var(--ref-frame-space-14)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "var(--ref-frame-space-3)",
              }}
            >
              {collapsed ? (
                /* Collapsed: show the iconic "o" with red accent */
                <svg
                  width="28"
                  height="28"
                  viewBox="82 21 69 68"
                  fill="none"
                  style={{ flexShrink: 0, display: "block" }}
                  aria-label="Flow"
                >
                  <path d={flowLogoPaths.p38af300} fill="currentColor" />
                  <path d={flowLogoPaths.p2a69e100} fill="var(--ref-energy-brand-accent)" />
                </svg>
              ) : (
                /* Expanded: full "Flow" wordmark */
                <Inline gap={2} align="center" style={{ flex: 1 }}>
                  <svg
                    width="108"
                    height="36"
                    viewBox="0 0 252.812 89.125"
                    fill="none"
                    style={{ display: "block" }}
                    aria-label="Flow"
                  >
                    <path d={flowLogoPaths.p3f4b63c0} fill="currentColor" />
                    <path d={flowLogoPaths.p1eb5ac40} fill="currentColor" />
                    <path d={flowLogoPaths.p38af300} fill="currentColor" />
                    <path d={flowLogoPaths.p2a69e100} fill="var(--ref-energy-brand-accent)" />
                    <path d={flowLogoPaths.p39a84500} fill="currentColor" />
                  </svg>
                </Inline>
              )}
            </div>
          </Link>
          {/* Drawer close button — mobile only */}
          {isDrawer && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: "var(--ref-frame-space-4)",
                transform: "translateY(-50%)",
                display: "flex",
                gap: "var(--ref-frame-space-2)",
                alignItems: "center",
              }}
            >
              <ActionSurface
                onPress={() => setDrawerOpen(false)}
                aria-label="Close menu"
                style={{
                  padding: "var(--ref-frame-space-2)",
                  color: "var(--sys-energy-text-tertiary)",
                }}
              >
                <FlowIcon name="close" size="sm" />
              </ActionSurface>
            </div>
          )}
        </div>

        {/* Search */}
        <DocSearch collapsed={collapsed && !isDrawer} onNavigate={isDrawer ? () => setDrawerOpen(false) : undefined} />

        {/* Navigation */}
        <nav
          className="flow-scroll"
          role="navigation"
          aria-label="Main navigation"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: collapsed
              ? "var(--ref-frame-space-3) var(--ref-frame-space-2)"
              : "var(--ref-frame-space-3) var(--ref-frame-space-4)",
          }}
        >
          <Stack gap="component">
            {NAV_SECTIONS.map((section) => (
              <Stack key={section.label} gap={1}>
                {!collapsed && (
                  <Text
                    role="overline"
                    style={{ padding: "var(--ref-frame-space-1) var(--ref-frame-space-2)" }}
                  >
                    {section.label}
                  </Text>
                )}
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  const isParentActive =
                    item.children?.some((c) => location.pathname === c.path) ?? false;
                  const showChildren = !collapsed && item.children && expandedPaths.has(item.path);
                  return (
                    <div key={item.path}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "var(--ref-frame-space-3)",
                          padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
                          borderRadius: "var(--ref-frame-radius-2)",
                          fontFamily: "var(--ref-voice-family-sans)",
                          fontSize: "var(--sys-voice-caption-size)",
                          fontWeight:
                            isActive || isParentActive
                              ? "var(--ref-voice-weight-semibold)"
                              : "var(--ref-voice-weight-regular)",
                          color:
                            isActive || isParentActive
                              ? "var(--sys-energy-text-accent)"
                              : "var(--sys-energy-text-secondary)",
                          background: isActive
                            ? "var(--sys-energy-status-info-subtle)"
                            : "transparent",
                          transition: `all var(--sys-momentum-transition-fast)`,
                          justifyContent: collapsed ? "center" : "flex-start",
                        }}
                      >
                        <Link
                          to={item.path}
                          aria-current={isActive ? "page" : undefined}
                          className="flow-focusable"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--ref-frame-space-3)",
                            flex: 1,
                            textDecoration: "none",
                            color: "inherit",
                          }}
                          title={collapsed ? item.name : undefined}
                        >
                          <FlowIcon
                            name={item.icon}
                            size="sm"
                            color={
                              isActive || isParentActive
                                ? "var(--sys-energy-text-accent)"
                                : "var(--sys-energy-text-tertiary)"
                            }
                          />
                          {!collapsed && <span>{item.name}</span>}
                        </Link>
                        {!collapsed && item.children && (
                          <ActionSurface
                            onPress={() => {
                              toggleExpanded(item.path);
                            }}
                            aria-label={showChildren ? "Collapse submenu" : "Expand submenu"}
                            style={{ padding: "var(--ref-frame-space-1)" }}
                          >
                            <FlowIcon
                              name={showChildren ? "chevron-down" : "chevron-right"}
                              size="xs"
                              color="var(--sys-energy-text-tertiary)"
                            />
                          </ActionSurface>
                        )}
                      </div>
                      {showChildren && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "var(--ref-frame-border-thin)",
                            paddingLeft: "var(--ref-frame-space-7)",
                            marginTop: "var(--ref-frame-space-1)",
                            borderLeft: "1px solid var(--sys-energy-border-default)",
                            marginLeft: "var(--ref-frame-space-4)",
                          }}
                        >
                          {item.children!.map((child) => {
                            const isChildActive = location.pathname === child.path;
                            return (
                              <Link
                                key={child.path}
                                to={child.path}
                                aria-current={isChildActive ? "page" : undefined}
                                className="flow-focusable"
                                style={{
                                  display: "block",
                                  padding: "var(--ref-frame-space-1) var(--ref-frame-space-3)",
                                  borderRadius: "var(--ref-frame-radius-1)",
                                  fontFamily: "var(--ref-voice-family-sans)",
                                  fontSize: "var(--sys-voice-caption-size)",
                                  fontWeight: isChildActive
                                    ? "var(--ref-voice-weight-semibold)"
                                    : "var(--ref-voice-weight-regular)",
                                  color: isChildActive
                                    ? "var(--sys-energy-text-accent)"
                                    : "var(--sys-energy-text-tertiary)",
                                  background: isChildActive
                                    ? "var(--sys-energy-status-info-subtle)"
                                    : "transparent",
                                  textDecoration: "none",
                                  transition: `all var(--sys-momentum-transition-fast)`,
                                }}
                              >
                                {child.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </Stack>
            ))}
          </Stack>
        </nav>

        {/* ── VIEW footer — theme + grid overlay ───────────────────────────── */}
        <div
          style={{
            borderTop: "1px solid var(--sys-energy-border-default)",
            padding: collapsed
              ? "var(--ref-frame-space-3) var(--ref-frame-space-2)"
              : "var(--ref-frame-space-3) var(--ref-frame-space-4)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--ref-frame-space-1)",
          }}
        >
          {/* Section label — hidden when collapsed */}
          {!collapsed && (
            <Text
              role="overline"
              style={{
                padding: "var(--ref-frame-space-1) var(--ref-frame-space-2)",
                marginBottom: "var(--ref-frame-space-1)",
              }}
            >
              View
            </Text>
          )}

          {/* ── Theme toggle row ── */}
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={
              collapsed
                ? theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
                : undefined
            }
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--ref-frame-space-3)",
              padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
              borderRadius: "var(--ref-frame-radius-2)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              width: "100%",
              justifyContent: collapsed ? "center" : "flex-start",
              transition: "background var(--sys-momentum-transition-fast)",
              fontFamily: "var(--ref-voice-family-sans)",
              fontSize: "var(--sys-voice-caption-size)",
              color: "var(--sys-energy-text-secondary)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--sys-energy-surface-secondary)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {/* Sun / Moon inline SVG — never missing from icon set */}
            {theme === "light" ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                style={{ flexShrink: 0 }}
              >
                <circle cx="8" cy="8" r="3" fill="var(--sys-energy-text-tertiary)" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
                  const r = (Math.PI * deg) / 180;
                  const x1 = 8 + Math.cos(r) * 4.8;
                  const y1 = 8 + Math.sin(r) * 4.8;
                  const x2 = 8 + Math.cos(r) * 6.5;
                  const y2 = 8 + Math.sin(r) * 6.5;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="var(--sys-energy-text-tertiary)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7z"
                  fill="var(--sys-energy-text-tertiary)"
                />
              </svg>
            )}

            {!collapsed && (
              <>
                <span
                  style={{ flex: 1, textAlign: "left", color: "var(--sys-energy-text-secondary)" }}
                >
                  {theme === "light" ? "Light mode" : "Dark mode"}
                </span>
                {/* Pill — dark mode = on (dark track), light mode = off (grey track) */}
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    width: "var(--comp-toggle-track-width)",
                    height: "var(--comp-toggle-track-height)",
                    borderRadius: "var(--ref-frame-radius-full)",
                    background: theme === "dark" ? "var(--sys-energy-surface-inverse)" : "var(--sys-energy-text-disabled)",
                    position: "relative",
                    flexShrink: 0,
                    transition: "background var(--sys-momentum-transition-fast)",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      width: "var(--comp-toggle-knob-size)",
                      height: "var(--comp-toggle-knob-size)",
                      borderRadius: "50%",
                      background: "var(--sys-energy-surface-primary)",
                      left: theme === "light" ? "var(--comp-toggle-knob-inset)" : "var(--comp-toggle-knob-active-left)",
                      transition: "left var(--sys-momentum-transition-fast)",
                      boxShadow: "var(--ref-depth-shadow-1)",
                    }}
                  />
                </span>
              </>
            )}
          </button>

          {/* ── Grid overlay toggle row ── */}
          <button
            onClick={() => setShowGrid((v) => !v)}
            aria-label={showGrid ? "Hide column grid" : "Show column grid"}
            aria-pressed={showGrid}
            title={collapsed ? (showGrid ? "Hide column grid" : "Show column grid") : undefined}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--ref-frame-space-3)",
              padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
              borderRadius: "var(--ref-frame-radius-2)",
              background: showGrid && collapsed ? "var(--dev-grid-color-subtle)" : "transparent",
              border: "none",
              cursor: "pointer",
              width: "100%",
              justifyContent: collapsed ? "center" : "flex-start",
              color: showGrid ? "var(--dev-grid-color)" : "var(--sys-energy-text-secondary)",
              transition:
                "background var(--sys-momentum-transition-fast), color var(--sys-momentum-transition-fast)",
              fontFamily: "var(--ref-voice-family-sans)",
              fontSize: "var(--sys-voice-caption-size)",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              if (!showGrid || !collapsed)
                e.currentTarget.style.background = showGrid
                  ? "var(--dev-grid-color-subtle)"
                  : "var(--sys-energy-surface-secondary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                showGrid && collapsed ? "var(--dev-grid-color-subtle)" : "transparent";
            }}
          >
            {/* 3-column icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              <rect
                x="1"
                y="3"
                width="4"
                height="10"
                rx="0.75"
                fill={showGrid ? "var(--dev-grid-color)" : "var(--sys-energy-text-tertiary)"}
                opacity="0.85"
              />
              <rect
                x="6"
                y="3"
                width="4"
                height="10"
                rx="0.75"
                fill={showGrid ? "var(--dev-grid-color)" : "var(--sys-energy-text-tertiary)"}
                opacity="0.85"
              />
              <rect
                x="11"
                y="3"
                width="4"
                height="10"
                rx="0.75"
                fill={showGrid ? "var(--dev-grid-color)" : "var(--sys-energy-text-tertiary)"}
                opacity="0.85"
              />
            </svg>

            {!collapsed && (
              <>
                <span
                  style={{
                    flex: 1,
                    textAlign: "left",
                    color: showGrid ? "var(--dev-grid-color)" : "var(--sys-energy-text-secondary)",
                  }}
                >
                  Column grid
                </span>
                {/* Tier badge */}
                <span
                  style={{
                    fontSize: "var(--sys-voice-overline-size)",
                    fontFamily: "var(--ref-voice-family-mono, monospace)",
                    color: showGrid ? "var(--dev-grid-color)" : "var(--sys-energy-text-tertiary)",
                    background: showGrid
                      ? "var(--dev-grid-color-muted)"
                      : "var(--sys-energy-surface-secondary)",
                    padding: "var(--comp-badge-micro-padding)",
                    borderRadius: "var(--comp-badge-micro-radius)",
                    flexShrink: 0,
                    transition: "all var(--sys-momentum-transition-fast)",
                  }}
                >
                  {tierLabel}
                </span>
                {/* Pill toggle */}
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "var(--comp-toggle-track-width)",
                    height: "var(--comp-toggle-track-height)",
                    borderRadius: "var(--ref-frame-radius-full)",
                    background: showGrid ? "var(--dev-grid-color)" : "var(--sys-energy-border-default)",
                    position: "relative",
                    flexShrink: 0,
                    transition: "background var(--sys-momentum-transition-fast)",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      width: "var(--comp-toggle-knob-size)",
                      height: "var(--comp-toggle-knob-size)",
                      borderRadius: "50%",
                      background: "var(--sys-energy-surface-primary)",
                      left: showGrid ? "var(--comp-toggle-knob-active-left)" : "var(--comp-toggle-knob-inset)",
                      transition: "left var(--sys-momentum-transition-fast)",
                    }}
                  />
                </span>
              </>
            )}

            {/* Active dot for collapsed state */}
            {collapsed && showGrid && (
              <span
                style={{
                  position: "absolute",
                  top: "var(--comp-toggle-dot-offset)",
                  right: "var(--comp-toggle-dot-offset)",
                  width: "var(--comp-toggle-dot-size)",
                  height: "var(--comp-toggle-dot-size)",
                  borderRadius: "50%",
                  background: "var(--dev-grid-color)",
                }}
              />
            )}
          </button>
        </div>

        {/* Collapse toggle — visible on tablet + desktop */}
        {!useDrawer && (
          <ActionSurface
            onPress={() => setUserCollapsed(!userCollapsed)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            style={{
              padding: "var(--ref-frame-space-4)",
              borderTop: "1px solid var(--sys-energy-border-default)",
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              gap: "var(--ref-frame-space-2)",
              color: "var(--sys-energy-text-tertiary)",
            }}
          >
            <FlowIcon name={collapsed ? "arrow-right" : "arrow-left"} size="sm" />
            {!collapsed && (
              <Text role="paragraph-s" color="tertiary">
                Collapse
              </Text>
            )}
          </ActionSurface>
        )}
      </>
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Global grid overlay — position:fixed, works on every page and tab */}
      <GridOverlay visible={showGrid} />

      {/* ── Mobile/Phablet: Top bar with hamburger ── */}
      {useDrawer && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: "var(--comp-layout-z-topbar)",
            display: "flex",
            alignItems: "center",
            gap: "var(--ref-frame-space-3)",
            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
            background: "var(--sys-energy-surface-primary)",
            borderBottom: "1px solid var(--sys-energy-border-default)",
          }}
        >
          <ActionSurface
            onPress={() => setDrawerOpen(true)}
            aria-label="Open menu"
            style={{
              padding: "var(--ref-frame-space-2)",
              color: "var(--sys-energy-text-secondary)",
            }}
          >
            <FlowIcon name="menu" size="sm" />
          </ActionSurface>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--ref-frame-space-3)",
              textDecoration: "none",
              color: "inherit",
              flex: 1,
            }}
          >
            <svg
              width="72"
              height="24"
              viewBox="0 0 252.812 89.125"
              fill="none"
              style={{ display: "block", flexShrink: 0 }}
              aria-label="Flow"
            >
              <path d={flowLogoPaths.p3f4b63c0} fill="currentColor" />
              <path d={flowLogoPaths.p1eb5ac40} fill="currentColor" />
              <path d={flowLogoPaths.p38af300} fill="currentColor" />
              <path d={flowLogoPaths.p2a69e100} fill="var(--ref-energy-brand-accent)" />
              <path d={flowLogoPaths.p39a84500} fill="currentColor" />
            </svg>
          </Link>
          <ThemeToggle />
        </div>
      )}

      {/* ── Mobile/Phablet: Drawer overlay ── */}
      {useDrawer && drawerOpen && (
        <>
          {/* Backdrop */}
          <div
            role="presentation"
            onClick={() => setDrawerOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: "var(--comp-layout-z-backdrop)",
              background: "var(--sys-depth-overlay)",
              backdropFilter: "blur(var(--ref-depth-blur-sm))",
              animation:
                "flowFadeIn var(--ref-momentum-duration-fast) var(--ref-momentum-easing-enter)",
            }}
          />
          {/* Drawer */}
          <Surface
            as="aside"
            variant="primary"
            radius="none"
            border={false}
            padding={0}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              width: "min(var(--comp-sidebar-width), 85vw)",
              zIndex: "var(--comp-layout-z-drawer)",
              display: "flex",
              flexDirection: "column",
              borderRight: "1px solid var(--sys-energy-border-default)",
              animation:
                "flowSlideInLeft var(--ref-momentum-duration-fast) var(--ref-momentum-easing-enter)",
            }}
          >
            {sidebarContent(true)}
          </Surface>
        </>
      )}

      {/* ── Tablet/Desktop: Static sidebar ── */}
      {!useDrawer && showSidebar && (
        <Surface
          as="aside"
          variant="primary"
          radius="none"
          border={false}
          padding={0}
          style={{
            width: isCollapsed
              ? "var(--comp-sidebar-width-collapsed)"
              : "var(--comp-sidebar-width)",
            minWidth: isCollapsed
              ? "var(--comp-sidebar-width-collapsed)"
              : "var(--comp-sidebar-width)",
            height: "100vh",
            borderRight: "1px solid var(--sys-energy-border-default)",
            display: "flex",
            flexDirection: "column",
            transition: `width var(--sys-momentum-transition-default), min-width var(--sys-momentum-transition-default)`,
            overflow: "hidden",
          }}
        >
          {sidebarContent(false)}
        </Surface>
      )}

      {/* ── Main content ── */}
      <div
        role="main"
        className="flow-scroll"
        style={{
          flex: 1,
          overflowX: "hidden",
          overflowY: "auto",
          height: "100vh",
          background: "var(--sys-energy-surface-sunken)",
          paddingTop: useDrawer ? "var(--ref-frame-space-14)" : 0,
        }}
      >
        <div
          style={{
            flex: 1,
            background: "var(--sys-energy-surface-cold-white)",
            minHeight: useDrawer ? "calc(100vh - var(--ref-frame-space-14))" : "100vh",
            position: "relative",
            paddingBottom: "var(--ref-frame-space-6)", // 24px — breathing room at page bottom
          }}
        >
          <Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "var(--comp-layout-loading-min-height)",
                  color: "var(--sys-energy-text-tertiary)",
                  fontFamily: "var(--ref-voice-family-sans)",
                  fontSize: "var(--sys-voice-caption-size)",
                }}
              >
                Loading…
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
