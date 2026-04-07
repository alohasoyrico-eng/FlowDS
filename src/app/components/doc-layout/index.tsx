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
} from "../../primitives";
import { GridOverlay } from "../grid-overlay";
import flowLogoPaths from "../../../imports/svg-u72vgquk7t";
import { DocSearch } from "../doc-search";
import { NAV_SECTIONS } from "./nav-data";
import { SidebarFooter } from "./SidebarFooter";

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
        <SidebarFooter
          collapsed={collapsed}
          theme={theme}
          onToggleTheme={toggle}
          showGrid={showGrid}
          onToggleGrid={() => setShowGrid((v) => !v)}
          tierLabel={tierLabel}
        />

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
