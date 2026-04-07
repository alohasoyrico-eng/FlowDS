

/**
 * FLOW — Pattern Registry
 * Per-pattern data + composition demos + usage examples.
 *
 * Key format: "category/pattern-slug"
 *   e.g. "feedback/empty-state"
 *
 * Each entry owns: spec metadata, composition breakdown, usage demos, and API documentation.
 * Patterns are L4 — they orchestrate multiple L3 components.
 */
import { type ReactNode, useState } from "react";

import {
  FlowAvatar,
  FlowButton,
  FlowChip,
  FlowIconButton,
  FlowList,
  FlowListItem,
  FlowTextInput,
  FlowToolbarSpacer,
  Inline,
  Stack,
  Surface,
  Text,
} from "../../../lib";
import { DemoGroup, DemoSection } from "../../components/demo-helpers";
export type { PropEntry, GuidelineEntry } from "../../components/doc-primitives";
import { DocList } from "../../components/doc-primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface AnatomyEntry {
  part: string;
  description: string;
  tokens: string[];
  note?: string;
}

export interface AccessibilitySpec {
  /** What FLOW handles automatically — the consumer gets this for free */
  handled: string[];
  /** What the consumer must provide for the component to be accessible */
  required?: string[];
  /** Keyboard interaction patterns */
  keyboard?: string[];
}

export interface PatternSpec {
  name: string;
  purpose: string;
  platform: "shared" | "desktop" | "mobile";
  /** L3 components this pattern composes/orchestrates */
  composesL3: string[];
  /** Behavioral orchestrations this pattern owns */
  orchestrates: string[];
  /** What this pattern delegates to lower layers */
  doesNotOwn?: string[];
  /** Anatomy breakdown (optional, gold standard) */
  anatomy?: AnatomyEntry[];
  /** Variant descriptions (optional, gold standard) */
  variants?: string[];
  /** State list (optional, gold standard) */
  states?: string[];
  /** Accessibility spec (optional, gold standard) */
  accessibility?: AccessibilitySpec;
  /** Source file (deprecated field, kept for migration) */
  source?: string;
}

export interface CompositionEntry {
  component: string;
  role: string;
  tokens?: string[];
}

export interface PatternDeveloperGuide {
  reactImport: string;
  reactUsage: string;
  flutterImport: string;
  flutterUsage: string;
  /** Structured props/API reference table */
  props?: PropEntry[];
  /** Structured guidelines — rendered as bullet list with intent icons */
  guidelines?: GuidelineEntry[];
}

export interface PatternEntry {
  category: string;
  spec: PatternSpec;
  /** Visual composition breakdown */
  composition?: CompositionEntry[];
  demos: {
    overview?: (ctx?: { patternName: string }) => ReactNode;
    variants?: (ctx?: { patternName: string }) => ReactNode;
    useCases?: (ctx?: { patternName: string }) => ReactNode;
  };
  developer: PatternDeveloperGuide;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Helper imports for prop table types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import type { GuidelineEntry, PropEntry } from "../../components/doc-primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NAVIGATION PATTERNS — Demo Functions
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function TopbarOverviewDemo() {
  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Topbar"
        description="Desktop application header composing title, breadcrumbs, search, and global actions."
      >
        <DemoGroup>
          <Stack gap={4} style={{ width: "100%" }}>
            {/* Topbar with menu button + title + search + actions */}
            <Surface variant="primary" padding="compact">
              <Inline gap={4} align="center">
                <FlowIconButton icon="menu" />
                <Text role="label-m" style={{ flex: 1 }}>
                  Dashboard
                </Text>
                <FlowTextInput placeholder="Search..." style={{ maxWidth: "200px" }} />
                <FlowIconButton icon="bell" />
                <FlowIconButton icon="settings" />
                <FlowAvatar initials="JD" size="sm" />
              </Inline>
            </Surface>

            {/* Topbar with breadcrumbs */}
            <Surface variant="primary" padding="compact">
              <Inline gap={4} align="center">
                <FlowIconButton icon="menu" />
                <Inline gap={1} align="center">
                  <Text role="caption">Dashboard</Text>
                  <Text role="caption" color="secondary">
                    /
                  </Text>
                  <Text role="caption">Analytics</Text>
                </Inline>
                <FlowToolbarSpacer />
                <FlowIconButton icon="info" />
                <FlowAvatar initials="JD" size="sm" />
              </Inline>
            </Surface>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Topbar Composition"
        description="A topbar typically includes: menu trigger (leading), page title or breadcrumbs, flexible spacer, and global actions."
      >
        <DemoGroup>
          <Stack gap={2}>
            <Text role="caption" color="secondary">
              Left to right: Menu button → Title → (optional: breadcrumbs) → Spacer → Search →
              Notifications → Settings → User menu
            </Text>
            <Surface variant="secondary" padding="container">
              <Stack gap={2}>
                <Text role="label-s">Key Features:</Text>
                <DocList
                  items={[
                    "Sticky positioning - stays visible while scrolling",
                    "Breadcrumbs - deep navigation context",
                    "Global search - accessible from any page",
                    "Action buttons - global commands",
                    "User menu - profile/settings access",
                  ]}
                />
              </Stack>
            </Surface>
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

function TopbarUseCasesDemo() {
  const [activeCase, setActiveCase] = useState<string>("admin");

  const cases: Record<string, { title: string; breadcrumbs: string[]; actions: string[] }> = {
    admin: {
      title: "Admin Dashboard",
      breadcrumbs: ["Dashboard", "Users", "Management"],
      actions: ["export", "settings"],
    },
    editor: {
      title: "Document Editor",
      breadcrumbs: ["Projects", "Flow Design System"],
      actions: ["save", "share", "history"],
    },
    analytics: {
      title: "Analytics Console",
      breadcrumbs: ["Analytics", "Monthly Report"],
      actions: ["download", "refresh"],
    },
  };

  const currentCase = cases[activeCase];

  return (
    <Stack gap={4}>
      <Inline gap={2} wrap>
        {Object.keys(cases).map((key) => (
          <FlowChip
            key={key}
            variant={activeCase === key ? "accent" : "default"}
            onClick={() => setActiveCase(key)}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </FlowChip>
        ))}
      </Inline>

      <DemoSection
        title={currentCase.title}
        description={`Topbar for ${activeCase} context with relevant breadcrumbs and actions.`}
      >
        <DemoGroup>
          <Surface variant="primary" padding="compact" style={{ width: "100%" }}>
            <Inline gap={4} align="center">
              <FlowIconButton icon="menu" />
              <Inline gap={1} align="center">
                {currentCase.breadcrumbs.map((crumb, idx) => (
                  <Inline key={idx} gap={2} align="center">
                    <Text role="caption">{crumb}</Text>
                    {idx < currentCase.breadcrumbs.length - 1 && (
                      <Text role="caption" color="secondary">
                        /
                      </Text>
                    )}
                  </Inline>
                ))}
              </Inline>
              <FlowToolbarSpacer />
              {currentCase.actions.map((action) => (
                <FlowIconButton
                  key={action}
                  icon={action === "export" ? "download" : action === "share" ? "share-2" : action}
                  aria-label={action.charAt(0).toUpperCase() + action.slice(1)}
                />
              ))}
              <FlowAvatar initials="JD" size="sm" />
            </Inline>
          </Surface>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

function DrawerAdapterOverviewDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Stack gap={6}>
      <DemoSection
        title="Responsive Drawer"
        description="Toggle to see drawer behavior. On desktop (> 768px): inline sidebar. On mobile (< 768px): overlay sheet."
      >
        <DemoGroup>
          <Stack gap={3}>
            <FlowButton
              variant={isOpen ? "medium" : "high"}
              onClick={() => setIsOpen(!isOpen)}
              size="md"
            >
              {isOpen ? "Close Drawer" : "Open Drawer"}
            </FlowButton>

            <Inline gap={4} style={{ minHeight: "300px" }}>
              {/* Desktop drawer (inline sidebar) */}
              {isOpen && (
                <Surface
                  variant="primary"
                  padding="container"
                  style={{ width: "260px", minWidth: "260px" }}
                >
                  <Stack gap={4}>
                    <Inline
                      align="center"
                      justify="between"
                      style={{
                        paddingBottom: "var(--sys-frame-padding-control)",
                        borderBottom:
                          "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
                      }}
                    >
                      <Text role="label-s">Navigation</Text>
                      <FlowIconButton icon="x" onClick={() => setIsOpen(false)} />
                    </Inline>
                    <FlowList>
                      {["Dashboard", "Analytics", "Reports", "Settings", "Help"].map((item) => (
                        <FlowListItem key={item} primary={item} />
                      ))}
                    </FlowList>
                  </Stack>
                </Surface>
              )}

              {/* Main content area */}
              <Surface variant="secondary" padding="container" style={{ flex: 1 }}>
                <Stack gap={3}>
                  <Text role="label-m">Content Area</Text>
                  <Text role="paragraph-s" color="secondary">
                    {isOpen
                      ? "Drawer is visible on the left. Desktop: sidebar inline. Mobile: overlay."
                      : "Click 'Open Drawer' to show navigation."}
                  </Text>
                </Stack>
              </Surface>
            </Inline>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Drawer Features"
        description="Responsive behavior adapts to screen size with smooth transitions."
      >
        <DemoGroup>
          <Stack gap={2}>
            <Surface variant="secondary" padding="container">
              <Stack gap={2}>
                <Text role="label-s">Responsive Breakpoint (768px):</Text>
                <DocList
                  items={[
                    "Desktop (≥768px) - Inline sidebar panel",
                    "Mobile (<768px) - Overlay sheet with backdrop",
                    "Smooth transition between modes",
                    "Escape key closes mobile overlay",
                    "Click backdrop dismisses mobile overlay",
                  ]}
                />
              </Stack>
            </Surface>
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

function DrawerAdapterUseCasesDemo() {
  const [activeCase, setActiveCase] = useState<string>("sidebar");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const cases: Record<string, { title: string; description: string; width: string }> = {
    sidebar: {
      title: "Desktop Sidebar",
      description: "Inline navigation panel (desktop > 768px)",
      width: "260px",
    },
    wide: {
      title: "Wide Panel",
      description: "Larger sidebar for detailed navigation (desktop > 768px)",
      width: "340px",
    },
    compact: {
      title: "Compact Panel",
      description: "Minimal sidebar for space-constrained layouts (desktop > 768px)",
      width: "200px",
    },
  };

  const currentCase = cases[activeCase];

  return (
    <Stack gap={4}>
      <Inline gap={2} wrap>
        {Object.keys(cases).map((key) => (
          <FlowChip
            key={key}
            variant={activeCase === key ? "accent" : "default"}
            onClick={() => setActiveCase(key)}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </FlowChip>
        ))}
      </Inline>

      <DemoSection title={currentCase.title} description={currentCase.description}>
        <DemoGroup>
          <Stack gap={3}>
            <FlowButton
              variant={drawerOpen ? "medium" : "high"}
              onClick={() => setDrawerOpen(!drawerOpen)}
              size="md"
            >
              {drawerOpen ? "Close Drawer" : "Open Drawer"}
            </FlowButton>

            <Inline gap={4} style={{ minHeight: "300px" }}>
              {/* Drawer with dynamic width */}
              {drawerOpen && (
                <Surface
                  variant="primary"
                  padding="container"
                  style={{ width: currentCase.width, minWidth: currentCase.width }}
                >
                  <Stack gap={4}>
                    <Inline
                      align="center"
                      justify="between"
                      style={{
                        paddingBottom: "var(--sys-frame-padding-control)",
                        borderBottom:
                          "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
                      }}
                    >
                      <Text role="label-s">
                        {activeCase === "sidebar"
                          ? "Primary"
                          : activeCase === "wide"
                            ? "Details"
                            : "Quick"}
                      </Text>
                      <FlowIconButton icon="x" onClick={() => setDrawerOpen(false)} />
                    </Inline>
                    <FlowList>
                      {["Navigation", "Settings", "Help", "About", "Feedback"].map((item) => (
                        <FlowListItem key={item} primary={item} />
                      ))}
                    </FlowList>
                  </Stack>
                </Surface>
              )}

              {/* Content area */}
              <Surface variant="secondary" padding="container" style={{ flex: 1 }}>
                <Stack gap={3}>
                  <Text role="label-m">{currentCase.title}</Text>
                  <Text role="paragraph-s" color="secondary">
                    Width: {currentCase.width} •{" "}
                    {drawerOpen ? "Drawer visible" : "Click button to show"}
                  </Text>
                </Stack>
              </Surface>
            </Inline>
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NAVIGATION PATTERNS REGISTRY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── FlowTopbar ──

const topbarEntry: PatternEntry = {
  category: "navigation-patterns",
  spec: {
    name: "Topbar",
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
  },
  composition: [
    {
      component: "Surface",
      role: "Header bar container",
      tokens: ["--sys-energy-surface-primary", "--sys-depth-elevation-light"],
    },
    { component: "FlowBreadcrumbs", role: "Navigation breadcrumbs", tokens: [] },
    { component: "FlowSearch", role: "Global search input", tokens: [] },
    { component: "FlowIconButton", role: "Action buttons", tokens: [] },
    { component: "FlowAvatar", role: "User menu trigger", tokens: [] },
    { component: "Text", role: "Page title", tokens: ["--sys-voice-heading-m-size"] },
  ],
  demos: {
    overview: TopbarOverviewDemo,
    useCases: TopbarUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowTopbar } from "@flow/design-system";`,
    reactUsage: `<FlowTopbar
  title="Dashboard"
  breadcrumbs={breadcrumbs}
  actions={actions}
  user={user}
/>`,
    flutterImport: `import 'package:flow/patterns/topbar.dart';`,
    flutterUsage: `FlowTopbar(
  title: 'Dashboard',
  breadcrumbs: breadcrumbs,
  actions: actions,
  user: user,
)`,
    props: [
      { name: "title", type: "string", required: true, description: "Page title." },
      {
        name: "breadcrumbs",
        type: "Breadcrumb[]",
        required: false,
        description: "Breadcrumb navigation items.",
      },
      { name: "actions", type: "Action[]", required: false, description: "Global action buttons." },
      { name: "user", type: "User", required: false, description: "Current user for avatar menu." },
    ],
    guidelines: [
      { type: "do", text: "Use for desktop application headers." },
      { type: "do", text: "Include breadcrumbs for deep navigation." },
      { type: "dont", text: "Don't use on mobile." },
    ],
  },
};

// ── FlowDrawerAdapter ──

const drawerAdapterEntry: PatternEntry = {
  category: "navigation-patterns",
  spec: {
    name: "Drawer Adapter",
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
  },
  composition: [
    { component: "FlowSidebar", role: "Desktop navigation sidebar", tokens: [] },
    { component: "FlowBottomSheet", role: "Mobile navigation sheet", tokens: [] },
    {
      component: "Surface",
      role: "Navigation content container",
      tokens: ["--sys-energy-surface-primary"],
    },
  ],
  demos: {
    overview: DrawerAdapterOverviewDemo,
    useCases: DrawerAdapterUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowDrawerAdapter } from "@flow/design-system";`,
    reactUsage: `<FlowDrawerAdapter
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Navigation"
  side="left"
  width="260px"
>
  <NavigationContent />
</FlowDrawerAdapter>`,
    flutterImport: `import 'package:flow/patterns/drawer_adapter.dart';`,
    flutterUsage: `FlowDrawerAdapter(
  open: isOpen,
  onClose: () => setIsOpen(false),
  title: 'Navigation',
  side: 'left',
  width: '260px',
  child: NavigationContent(),
)`,
    props: [
      { name: "open", type: "boolean", required: true, description: "Whether drawer is open." },
      { name: "onClose", type: "() => void", required: true, description: "Close handler." },
      { name: "children", type: "ReactNode", required: true, description: "Navigation content." },
      { name: "title", type: "string", required: false, description: "Drawer header title." },
      {
        name: "side",
        type: "'left' | 'right'",
        required: false,
        description: "Side of screen (default: 'left').",
      },
      {
        name: "width",
        type: "string",
        required: false,
        description: "Desktop sidebar width (default: '260px').",
      },
      {
        name: "breakpoint",
        type: "number",
        required: false,
        description: "Responsive breakpoint in px (default: 768).",
      },
    ],
    guidelines: [
      { type: "do", text: "Use for responsive navigation across all breakpoints." },
      { type: "do", text: "Provide clear close button and escape key handling." },
      { type: "dont", text: "Don't hardcode breakpoint values in component usage." },
    ],
  },
};

// ── Exported registry slice ──
export const navigationPatterns: Record<string, PatternEntry> = {
  "navigation-patterns/topbar": topbarEntry,
  "navigation-patterns/drawer-adapter": drawerAdapterEntry,
};
