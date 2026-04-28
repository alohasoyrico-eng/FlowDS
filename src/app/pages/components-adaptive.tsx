import { useState } from "react";

import {
  ActionSurface,
  FlowChip,
  Grid,
  Inline,
  MotionContainer,
  Stack,
  Surface,
  Text,
} from "@flow/design-system";
import { FlowIcon } from "@flow/primitives";
import { Callout, DocList, PAGE_GAP, PageHeader } from "../components/doc-primitives";
import { LayoutGrid } from "../components/layout-grid";

const adaptiveComponents = [
  {
    name: "Tabs",
    purpose:
      "Organizes content into switchable panels. Adapts between scrollable tab bar (mobile) and full-width or auto tabs (desktop). Selection is immediate — no submit required.",
    anatomy: [
      "Tab bar container (Surface, horizontal)",
      "Tab items (ActionSurface: icon + label)",
      "Active indicator (animated underline or background)",
      "Tab panels (content areas, one visible at a time)",
      "Scroll indicators (mobile: fade edges + arrows)",
    ],
    variants: {
      shared: [
        "Text-only tabs",
        "Icon + text tabs",
        "Icon-only tabs",
        "With badge — notification count on tab",
      ],
      desktop: [
        "Full-width — tabs stretch to fill container",
        "Auto-width — tabs sized to content",
        "Contained — background fill on active tab (SegmentedControl-like)",
      ],
      mobile: [
        "Scrollable — horizontal scroll for many tabs",
        "Fixed — equal-width tabs for 2-4 items",
        "Bottom tabs — used in BottomNav context",
      ],
    },
    states: ["default", "hover (web)", "focus-visible", "pressed", "selected", "disabled"],
    tokens: [
      "comp.tabs.bar.*",
      "comp.tabs.item.*",
      "comp.tabs.indicator.*",
      "comp.tabs.panel.padding",
    ],
    accessibility: [
      "role='tablist' on bar",
      "role='tab' on items",
      "role='tabpanel' on panels",
      "aria-selected on active tab",
      "aria-controls links tab to panel",
      "Arrow keys navigate tabs, Enter/Space activates",
    ],
    platformBehavior: {
      desktop:
        "Hover state on tabs. Full-width layout. Indicator slides with eased transition. Keyboard arrows cycle through tabs.",
      mobile:
        "Scrollable tab bar with momentum scroll. Swipe gestures switch panels (optional). Active indicator uses spring animation. Touch target minimum 44px.",
    },
  },
  {
    name: "Menu",
    purpose:
      "A list of actions or options presented contextually. Adapts between a dropdown (desktop) and a bottom sheet (mobile).",
    anatomy: [
      "Trigger element (ActionSurface)",
      "Menu surface (adaptive container)",
      "Menu items (ActionSurface: icon + label + shortcut)",
      "Separators between groups",
      "Sub-menu indicators (desktop only)",
      "Section headers",
    ],
    variants: {
      shared: [
        "Single-select — pick one option",
        "Multi-select — checkboxes on items",
        "With icons — leading icons",
        "Grouped — sections with headers",
      ],
      desktop: [
        "Dropdown — anchored below trigger",
        "Nested — sub-menus open on hover/arrow",
        "With keyboard shortcuts — shortcut hints per item",
      ],
      mobile: [
        "Bottom sheet — menu items in a BottomSheet",
        "Action sheet — iOS-style action list",
        "Full-screen — for very long option lists",
      ],
    },
    states: [
      "closed",
      "open",
      "item-hover (web)",
      "item-focus",
      "item-pressed",
      "item-selected",
      "item-disabled",
    ],
    tokens: [
      "comp.menu.trigger.*",
      "comp.menu.surface.*",
      "comp.menu.item.*",
      "comp.menu.separator.*",
      "comp.menu.section.*",
    ],
    accessibility: [
      "role='menu' on container",
      "role='menuitem' (or 'menuitemcheckbox'/'menuitemradio')",
      "aria-expanded on trigger",
      "Keyboard: arrows navigate, Enter activates, Escape closes",
    ],
    platformBehavior: {
      desktop:
        "Dropdown rendered via Portal. Positioned using Popover logic. Sub-menus open on hover with delay. Keyboard arrows navigate, right arrow opens sub-menu.",
      mobile:
        "Opens as BottomSheet with list of items. No sub-menus (flatten hierarchy). Larger touch targets. Drag-to-dismiss on sheet.",
    },
  },
  {
    name: "DrawerAdapter",
    purpose:
      "A panel that slides in from the edge of the screen for secondary content or navigation. Adapts between a side drawer (desktop) and a bottom sheet (mobile).",
    anatomy: [
      "Overlay backdrop (optional, modal mode)",
      "Drawer surface (Surface, elevated)",
      "Header (title + close button)",
      "Content area (scrollable)",
      "Footer (optional actions)",
      "Resize handle (desktop, for resizable drawers)",
    ],
    variants: {
      shared: [
        "Modal — with overlay, blocks interaction behind",
        "Non-modal — no overlay, content behind remains interactive",
      ],
      desktop: [
        "Left drawer — navigation or filter panels",
        "Right drawer — detail panels, property editors",
        "Resizable — user can drag to resize width",
        "Persistent — always visible, collapses to icon rail",
      ],
      mobile: [
        "Bottom sheet — slides up from bottom",
        "Full-screen sheet — for complex content",
        "Peek — partially visible with drag to expand",
      ],
    },
    states: ["closed", "opening", "open", "closing"],
    tokens: [
      "comp.drawer.bg",
      "comp.drawer.elevation",
      "comp.drawer.width.*",
      "comp.drawer.radius.*",
      "comp.drawer.overlay.*",
      "comp.drawer.handle.*",
    ],
    accessibility: [
      "role='dialog' when modal, role='complementary' when non-modal",
      "aria-label describing drawer content",
      "Focus trapped when modal",
      "Escape closes",
      "Close button accessible",
    ],
    platformBehavior: {
      desktop:
        "Slides from left or right edge. CSS transition with Momentum easing. Resizable variant uses drag handle. Persistent variant can be toggled via sidebar collapse.",
      mobile:
        "Always renders as BottomSheet with appropriate snap points. Spring-based drag physics. Gesture velocity determines snap target. Edge-swipe-in gesture can open (platform dependent).",
    },
  },
];

export function ComponentsAdaptivePage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <LayoutGrid>
      <LayoutGrid.Item span={12} className="component-detail-surface-wrapper">
        <Surface variant="secondary" radius="surface" className="component-detail-surface">
          <Stack gap={PAGE_GAP}>
            <PageHeader chapter="Chapter 05 — Adaptive" title="Adaptive Components">
              Adaptive components share the same semantic API across platforms but fundamentally
              change their rendering and interaction model based on the platform and viewport. They
              are the bridge between desktop and mobile paradigms.
            </PageHeader>

            <Callout>
              <Text variant="paragraph-s" color="accent">
                <strong>Key principle:</strong> Adaptive components maintain semantic parity (same
                data model, same events, same accessibility contract) while diverging in
                presentation and interaction. A Menu that opens as a dropdown on desktop and a
                bottom sheet on mobile is the <em>same component</em> to the consuming developer.
              </Text>
            </Callout>

            {adaptiveComponents.map((c) => {
              const isExpanded = expanded === c.name;
              return (
                <Stack key={c.name} gap={0}>
                  <ActionSurface
                    onPress={() => setExpanded(isExpanded ? null : c.name)}
                    aria-label={`${isExpanded ? "Collapse" : "Expand"} ${c.name}`}
                    aria-expanded={isExpanded}
                    style={{
                      background: "var(--sys-energy-surface-primary)",
                      border: "1px solid var(--sys-energy-status-info-muted)",
                      borderRadius: isExpanded
                        ? "var(--ref-frame-radius-2) var(--ref-frame-radius-2) 0 0"
                        : "var(--ref-frame-radius-2)",
                      padding: "var(--ref-frame-space-4) var(--ref-frame-space-5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Inline gap={3}>
                      <FlowChip variant="filled" status="info">
                        ADAPTIVE
                      </FlowChip>
                      <Text variant="heading-m">{c.name}</Text>
                    </Inline>
                    <FlowIcon
                      name="chevron-down"
                      size="sm"
                      color="var(--sys-energy-text-tertiary)"
                      style={{
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        transition: `transform var(--sys-momentum-transition-default)`,
                      }}
                    />
                  </ActionSurface>

                  <MotionContainer visible={isExpanded}>
                    <Surface
                      radius="none"
                      padding="container"
                      style={{
                        borderLeft: "1px solid var(--sys-energy-status-info-muted)",
                        borderRight: "1px solid var(--sys-energy-status-info-muted)",
                        borderBottom: "1px solid var(--sys-energy-status-info-muted)",
                        borderRadius: "0 0 var(--ref-frame-radius-2) var(--ref-frame-radius-2)",
                        borderTop: "none",
                      }}
                    >
                      <Stack gap="component">
                        <Text>{c.purpose}</Text>
                        <Stack gap={2}>
                          <Text variant="overline">Anatomy</Text>
                          <Inline gap={2} wrap>
                            {c.anatomy.map((a, i) => (
                              <FlowChip key={i}>{a}</FlowChip>
                            ))}
                          </Inline>
                        </Stack>
                        <Stack gap={2}>
                          <Text variant="overline">Variants</Text>
                          <Grid minItemWidth="180px" gap={3}>
                            <Surface padding="control">
                              <Stack gap={2}>
                                <Text variant="caption" color="success">
                                  Shared
                                </Text>
                                <DocList items={c.variants.shared} />
                              </Stack>
                            </Surface>
                            <Surface padding="control">
                              <Stack gap={2}>
                                <Text variant="caption">Desktop</Text>
                                <DocList items={c.variants.desktop} />
                              </Stack>
                            </Surface>
                            <Surface padding="control">
                              <Stack gap={2}>
                                <Text variant="caption">Mobile</Text>
                                <DocList items={c.variants.mobile} />
                              </Stack>
                            </Surface>
                          </Grid>
                        </Stack>
                        <Grid minItemWidth="280px" gap={3}>
                          <Surface padding="control">
                            <Stack gap={2}>
                              <Text variant="overline">States</Text>
                              <Inline gap={1} wrap>
                                {c.states.map((s) => (
                                  <FlowChip key={s}>{s}</FlowChip>
                                ))}
                              </Inline>
                            </Stack>
                          </Surface>
                          <Surface padding="control">
                            <Stack gap={2}>
                              <Text variant="overline">Tokens</Text>
                              <Inline gap={1} wrap>
                                {c.tokens.map((t) => (
                                  <code key={t} className="flow-inline-code-xs">
                                    {t}
                                  </code>
                                ))}
                              </Inline>
                            </Stack>
                          </Surface>
                        </Grid>
                        <Surface padding="control">
                          <Stack gap={2}>
                            <Text variant="overline">Accessibility (Shared Contract)</Text>
                            <DocList items={c.accessibility} />
                          </Stack>
                        </Surface>
                        <Stack gap={2}>
                          <Text variant="overline">Platform Behavior</Text>
                          <Grid minItemWidth="280px" gap={3}>
                            <Surface padding="control">
                              <Stack gap={2}>
                                <Text variant="overline">Desktop Behavior</Text>
                                <Text variant="paragraph-s">{c.platformBehavior.desktop}</Text>
                              </Stack>
                            </Surface>
                            <Surface padding="control" className="flow-doc-accent">
                              <Stack gap={2}>
                                <Text variant="overline">Mobile Behavior</Text>
                                <Text variant="paragraph-s">{c.platformBehavior.mobile}</Text>
                              </Stack>
                            </Surface>
                          </Grid>
                        </Stack>
                      </Stack>
                    </Surface>
                  </MotionContainer>
                </Stack>
              );
            })}
          </Stack>
        </Surface>
      </LayoutGrid.Item>
    </LayoutGrid>
  );
}
