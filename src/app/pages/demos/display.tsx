/**
 * FLOW Design System — Display Demos
 * FlowCard, FlowChip, FlowTable, FlowDataTable, FlowSkeleton interactive demos.
 */
import { useState } from "react";

import {
  Code,
  FlowCard,
  FlowChip,
  FlowSkeleton,
  FlowTable,
  type FlowTableColumn,
  Grid,
  Inline,
  Stack,
  Surface,
  Text,
} from "../../../lib";
import { FlowDataTable } from "../../components/patterns";
import { DemoGroup, DemoSection, GRID_2_MIN, GRID_3_MIN } from "./helpers";

export function DisplayDemos() {
  // ── FlowCard state ──
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // ── FlowChip state ──
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(["Active", "Energy"]));

  const toggleFilter = (f: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else next.add(f);
      return next;
    });
  };

  // ── FlowTable demo data ──
  const tokenData = [
    {
      name: "comp.button.radius",
      value: "var(--sys-frame-radius-control)",
      layer: "comp",
      usage: "Button corner radius",
    },
    {
      name: "comp.button.height.md",
      value: "var(--sys-frame-height-control-md)",
      layer: "comp",
      usage: "Medium button height (60px default)",
    },
    {
      name: "comp.card.radius",
      value: "var(--sys-frame-radius-container)",
      layer: "comp",
      usage: "Card corner radius",
    },
    {
      name: "sys.energy.text.primary",
      value: "#1E293B",
      layer: "sys",
      usage: "Primary text color (neutral-800)",
    },
    {
      name: "sys.energy.surface.primary",
      value: "#ffffff",
      layer: "sys",
      usage: "Primary surface",
    },
    { name: "ref.frame.space.4", value: "16px", layer: "ref", usage: "Standard spacing unit" },
    { name: "ref.voice.size.5", value: "14px", layer: "ref", usage: "Voice size step 5" },
    {
      name: "sys.momentum.transition.fast",
      value: "100ms ease",
      layer: "sys",
      usage: "Fast UI transitions",
    },
  ];

  const tokenColumns: FlowTableColumn<(typeof tokenData)[number]>[] = [
    { key: "name", header: "Token", cellRole: "code" },
    { key: "value", header: "Value", cellRole: "code" },
    {
      key: "layer",
      header: "Layer",
      render: (row) => (
        <FlowChip
          variant={row.layer === "ref" ? "default" : row.layer === "sys" ? "accent" : "default"}
          size="sm"
        >
          {row.layer}
        </FlowChip>
      ),
    },
    { key: "usage", header: "Usage" },
  ];

  return (
    <>
      <DemoSection
        title="FlowCard"
        description="Static, interactive, and selected states. Click a card to select it. Loading state available for async content."
      >
        <DemoGroup>
          <Text role="overline">Variants — Elevated / Outlined / Interactive</Text>
          <Grid minItemWidth={GRID_3_MIN} gap="component">
            {[
              {
                id: "elevation",
                title: "Elevated Card",
                desc: "Uses shadow-based depth. Default variant for content containers.",
                elevation: 1 as const,
              },
              {
                id: "outlined",
                title: "Outlined Card",
                desc: "Uses border instead of shadow. Lower visual weight.",
                elevation: 0 as const,
              },
              {
                id: "interactive",
                title: "Interactive Card",
                desc: "Clickable with hover/press states. Shows selection state.",
                elevation: 1 as const,
              },
            ].map((card) => (
              <FlowCard
                key={card.id}
                elevation={card.elevation}
                interactive={card.id === "interactive" || undefined}
                selected={selectedCard === card.id}
                onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
                padding="lg"
              >
                <Stack gap={3}>
                  <Text role="heading-m">{card.title}</Text>
                  <Text role="paragraph-s">{card.desc}</Text>
                  <Inline gap={2}>
                    <FlowChip size="sm">{card.id}</FlowChip>
                    {selectedCard === card.id && (
                      <FlowChip variant="accent" size="sm">
                        selected
                      </FlowChip>
                    )}
                  </Inline>
                </Stack>
              </FlowCard>
            ))}
          </Grid>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Size Variants — sm / md / lg / xl</Text>
          <Grid minItemWidth={GRID_2_MIN} gap="component">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <FlowCard key={s} elevation={1} size={s}>
                <Stack gap={1}>
                  <Text role="label-s" color="tertiary">
                    size=&quot;{s}&quot;
                  </Text>
                  <Text role="paragraph-s">Padding and radius scale with size.</Text>
                </Stack>
              </FlowCard>
            ))}
          </Grid>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Text role="caption" color="tertiary">
            All card states — default, interactive, selected, loading
          </Text>
          <Grid minItemWidth={GRID_3_MIN} gap="component">
            <FlowCard elevation={1} padding="lg">
              <Stack gap={2}>
                <Text role="label-m">Default State</Text>
                <Text role="paragraph-s">Standard card appearance with elevation.</Text>
              </Stack>
            </FlowCard>
            <FlowCard elevation={1} padding="lg" interactive>
              <Stack gap={2}>
                <Text role="label-m">Interactive</Text>
                <Text role="paragraph-s">Hover to see interactive state transition.</Text>
              </Stack>
            </FlowCard>
            <FlowCard elevation={1} padding="lg" interactive selected>
              <Stack gap={2}>
                <Text role="label-m">Selected</Text>
                <Text role="paragraph-s">Shows accent border when selected.</Text>
              </Stack>
            </FlowCard>
            <FlowCard elevation={1} padding="lg">
              <Stack gap={2}>
                <FlowSkeleton variant="text" lines={1} />
                <FlowSkeleton variant="text" lines={2} />
              </Stack>
            </FlowCard>
            <FlowCard elevation={0} padding="lg">
              <Stack gap={2}>
                <Text role="label-m">Outlined</Text>
                <Text role="paragraph-s">Uses border instead of shadow (elevation=0).</Text>
              </Stack>
            </FlowCard>
          </Grid>
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="FlowChip"
        description="Interactive filter chips — click to toggle. Demonstrates selectable chip behavior and all visual states."
      >
        <DemoGroup>
          <Text role="overline">Variants — Default / Accent / Tonal</Text>
          <Inline gap={2} wrap>
            <FlowChip variant="default">Default</FlowChip>
            <FlowChip variant="accent">Accent</FlowChip>
            <FlowChip variant="tonal">Tonal</FlowChip>
            <FlowChip variant="default" removable onRemove={() => {}}>
              Removable
            </FlowChip>
            <FlowChip variant="accent" removable onRemove={() => {}}>
              Removable Accent
            </FlowChip>
            <FlowChip variant="tonal" removable onRemove={() => {}}>
              Removable Tonal
            </FlowChip>
          </Inline>
        </DemoGroup>

        {/* State Showcase */}
        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Text role="caption" color="tertiary">
            All interaction states — default, selected, disabled, removable
          </Text>
          <Inline gap="component" align="center" wrap>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowChip variant="default">Default</FlowChip>
              <Text role="caption" color="tertiary">
                Default
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowChip variant="accent">Selected</FlowChip>
              <Text role="caption" color="tertiary">
                Selected
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowChip variant="tonal">Tonal</FlowChip>
              <Text role="caption" color="tertiary">
                Tonal
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowChip variant="default" removable onRemove={() => {}}>
                Removable
              </FlowChip>
              <Text role="caption" color="tertiary">
                Removable
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowChip variant="accent" removable onRemove={() => {}}>
                Rem Accent
              </FlowChip>
              <Text role="caption" color="tertiary">
                Rem Select
              </Text>
            </Stack>
          </Inline>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Interactive Filter Demo</Text>
          <Inline gap={2} wrap>
            {[
              "Energy",
              "Voice",
              "Frame",
              "State",
              "Momentum",
              "Depth",
              "Iconography",
              "Active",
              "Resolved",
            ].map((f) => (
              <FlowChip
                key={f}
                variant={activeFilters.has(f) ? "accent" : "default"}
                onClick={() => toggleFilter(f)}
                style={{ cursor: "pointer" }}
              >
                {activeFilters.has(f) ? `✓ ${f}` : f}
              </FlowChip>
            ))}
          </Inline>
          <Text role="caption" color="tertiary">
            Active filters:{" "}
            {activeFilters.size === 0 ? "none" : Array.from(activeFilters).join(", ")}
          </Text>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Size Variants — sm / md / lg / xl</Text>
          <Inline gap={3} align="center">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <FlowChip key={s} size={s} variant="accent">
                {s.toUpperCase()}
              </FlowChip>
            ))}
          </Inline>
          <Inline gap={3} align="center">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <FlowChip key={s} size={s} variant="tonal">{`Tonal ${s}`}</FlowChip>
            ))}
          </Inline>
          <Inline gap={3} align="center">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <FlowChip key={s} size={s} removable onRemove={() => {}}>{`Remove ${s}`}</FlowChip>
            ))}
          </Inline>
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="FlowTable"
        description={
          <>
            New L3 component replacing <Code>flow-table</Code> CSS class. Data-driven, token-styled,
            with custom cell renderers. Size variants (sm/md/lg/xl) scale cell padding, body font,
            and header font via <Code>--sys-size-table-*</Code> tokens.
          </>
        }
      >
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <FlowTable
            columns={tokenColumns}
            data={tokenData}
            rowKey={(r) => r.name}
            caption="Sample of Flow design tokens across all 3 layers"
          />
        </div>

        {/* Size variants */}
        <DemoGroup>
          <Text role="overline">Size Variants</Text>
          <Grid minItemWidth={GRID_2_MIN} gap="component">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <div key={s}>
                <Text
                  role="label-s"
                  color="tertiary"
                  style={{ marginBottom: "var(--ref-frame-space-2)" }}
                >
                  size=&quot;{s}&quot;
                </Text>
                <FlowTable
                  columns={[
                    { key: "name", header: "State", cellRole: "bold" },
                    { key: "priority", header: "Priority", align: "center" },
                  ]}
                  data={[
                    { name: "default", priority: "0" },
                    { name: "hover", priority: "1" },
                    { name: "disabled", priority: "10" },
                  ]}
                  size={s}
                  hoverable
                  rowKey={(r) => r.name}
                />
              </div>
            ))}
          </Grid>
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="FlowDataTable"
        description="Structured table with sorting, selection, and row actions. Optimized for desktop viewports."
      >
        <DemoGroup>
          <Text role="overline">Sortable & Selectable</Text>
          <FlowDataTable
            columns={[
              { key: "name", label: "Name", sortable: true },
              { key: "email", label: "Email", sortable: true },
              { key: "role", label: "Role", sortable: true },
              { key: "status", label: "Status", sortable: true },
            ]}
            data={[
              { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
              { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
              { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "Inactive" },
              { id: "4", name: "Alice Williams", email: "alice@example.com", role: "Editor", status: "Active" },
              { id: "5", name: "Charlie Brown", email: "charlie@example.com", role: "Viewer", status: "Active" },
            ]}
            selectable
          />
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="FlowSkeleton"
        description="Loading placeholder with pulse animation. 4 variants: text (single/multi-line), circle (avatar), rect (image), card (container). Width/height customizable."
      >
        <DemoGroup>
          <Text role="overline">Variants — Text / Circle / Rect / Card</Text>
          <Grid minItemWidth={GRID_2_MIN} gap="component">
            <Surface padding="control" border>
              <Stack gap={3}>
                <Text role="caption" color="tertiary">
                  Text (3 lines)
                </Text>
                <FlowSkeleton variant="text" lines={3} />
              </Stack>
            </Surface>
            <Surface padding="control" border>
              <Stack gap={3}>
                <Text role="caption" color="tertiary">
                  Circle (Avatar)
                </Text>
                <Inline gap={3} align="center">
                  <FlowSkeleton
                    variant="circle"
                    width="var(--ref-frame-space-12)"
                    height="var(--ref-frame-space-12)"
                  />
                  <Stack gap={1} style={{ flex: 1 }}>
                    <FlowSkeleton variant="text" width="60%" />
                    <FlowSkeleton variant="text" width="40%" />
                  </Stack>
                </Inline>
              </Stack>
            </Surface>
            <Surface padding="control" border>
              <Stack gap={3}>
                <Text role="caption" color="tertiary">
                  Rectangle (Image)
                </Text>
                <FlowSkeleton variant="rect" height="var(--ref-frame-space-24)" />
              </Stack>
            </Surface>
            <Surface padding="control" border>
              <Stack gap={3}>
                <Text role="caption" color="tertiary">
                  Card Skeleton
                </Text>
                <FlowSkeleton variant="card" height="var(--ref-frame-space-24)" />
              </Stack>
            </Surface>
          </Grid>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Composite — Card Loading Pattern</Text>
          <Grid minItemWidth={GRID_3_MIN} gap="component">
            {[0, 1, 2].map((i) => (
              <Surface key={i} padding="control" border>
                <Stack gap={3}>
                  <FlowSkeleton variant="rect" height="var(--ref-frame-space-20)" />
                  <FlowSkeleton variant="text" width="75%" />
                  <FlowSkeleton variant="text" lines={2} />
                  <Inline gap={2}>
                    <FlowSkeleton variant="text" width="var(--ref-frame-space-16)" />
                    <FlowSkeleton variant="text" width="var(--ref-frame-space-12)" />
                  </Inline>
                </Stack>
              </Surface>
            ))}
          </Grid>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Text Size Variants — sm / md / lg / xl</Text>
          <Stack gap={3} style={{ maxWidth: "var(--ref-frame-content-compact)" }}>
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <Inline key={s} gap={3} align="center">
                <Text role="caption" color="tertiary" style={{ width: 24 }}>
                  {s}
                </Text>
                <FlowSkeleton variant="text" size={s} />
              </Inline>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>
    </>
  );
}
