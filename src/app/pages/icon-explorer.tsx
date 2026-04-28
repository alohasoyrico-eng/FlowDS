/**
 * FlowIcon Explorer — Dedicated Page
 * ─────────────────────────────────────────────────
 * 76 SVG icons across 5 categories (navigation, action, status, object, toggle),
 * rendered via the FlowIcon primitive. Interactive search, category filter, and size selector.
 */

import { useState } from "react";

import { flowIcons, FlowTextInput, Inline, Stack, Surface, Text } from "@flow/design-system";
import { FlowIcon } from "@flow/primitives";
import { LayoutGrid } from "../components/layout-grid";
import { PAGE_GAP, PageHeader, Section } from "../components/doc-primitives";

type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

const CATEGORIES = ["all", "navigation", "action", "status", "object", "toggle"] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

const iconList = Object.values(flowIcons);

export function IconExplorerPage() {
  const [selectedSize, setSelectedSize] = useState<IconSize>("xl");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const sizes: IconSize[] = ["xs", "sm", "md", "lg", "xl"];

  const filtered = iconList.filter((icon) => {
    const matchesCategory = category === "all" || icon.category === category;
    const matchesSearch =
      !search ||
      icon.name.toLowerCase().includes(search.toLowerCase()) ||
      icon.label.toLowerCase().includes(search.toLowerCase()) ||
      icon.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <LayoutGrid>
      <LayoutGrid.Item span={12} className="component-detail-surface-wrapper">
        <Surface variant="secondary" radius="surface" className="component-detail-surface">
          <Stack gap={PAGE_GAP}>
            <PageHeader chapter="L1 Asset Library" title="FlowIcon — Icon Explorer">
              {iconList.length} SVG icons across 5 categories. Grid: 24x24, 2px padding, 1.5px
              stroke, round caps/joins. Each icon has a semantic label for accessibility.
            </PageHeader>

            {/* Controls */}
            <Section title="Search & Filter">
              <Inline gap="component" align="center" wrap>
                <FlowTextInput
                  label="Search icons"
                  hint="By name, label, or category"
                  value={search}
                  onChange={setSearch}
                  clearable
                  onClear={() => setSearch("")}
                  style={{ maxWidth: 300 }}
                />
                <Stack gap={1}>
                  <Text variant="caption" color="secondary">
                    Category
                  </Text>
                  <Inline gap={1}>
                    {CATEGORIES.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCategory(c)}
                        style={{
                          padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
                          borderRadius: "var(--ref-frame-radius-2)",
                          border:
                            category === c
                              ? "2px solid var(--sys-energy-action-primary)"
                              : "1px solid var(--sys-energy-border-default)",
                          background:
                            category === c
                              ? "var(--sys-energy-status-info-subtle)"
                              : "var(--sys-energy-surface-primary)",
                          fontFamily: "var(--ref-voice-family-mono)",
                          fontSize: "var(--ref-voice-size-3)",
                          cursor: "pointer",
                          color: "var(--sys-energy-text-primary)",
                          textTransform: "capitalize",
                        }}
                      >
                        {c}
                      </button>
                    ))}
                  </Inline>
                </Stack>
                <Stack gap={1}>
                  <Text variant="caption" color="secondary">
                    Size
                  </Text>
                  <Inline gap={1}>
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        style={{
                          padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
                          borderRadius: "var(--ref-frame-radius-2)",
                          border:
                            selectedSize === s
                              ? "2px solid var(--sys-energy-action-primary)"
                              : "1px solid var(--sys-energy-border-default)",
                          background:
                            selectedSize === s
                              ? "var(--sys-energy-status-info-subtle)"
                              : "var(--sys-energy-surface-primary)",
                          fontFamily: "var(--ref-voice-family-mono)",
                          fontSize: "var(--ref-voice-size-3)",
                          cursor: "pointer",
                          color: "var(--sys-energy-text-primary)",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </Inline>
                </Stack>
                <Text variant="caption" color="tertiary">
                  {filtered.length} / {iconList.length} icons
                </Text>
              </Inline>
            </Section>

            {/* Icon grid */}
            <Section title="Icon Library">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                  gap: "var(--ref-frame-space-4)",
                }}
              >
                {filtered.map((icon) => (
                  <Surface key={icon.name} padding="control" border>
                    <Stack gap={1} style={{ alignItems: "center" }}>
                      <FlowIcon name={icon.name} size={selectedSize} />
                      <Text
                        variant="label-m"
                        style={{ fontFamily: "var(--ref-voice-family-mono)" }}
                      >
                        {icon.name}
                      </Text>
                      <Text variant="caption" color="secondary" style={{ textAlign: "center" }}>
                        {icon.label}
                      </Text>
                      <Text
                        variant="caption"
                        color="tertiary"
                        style={{ fontFamily: "var(--ref-voice-family-mono)" }}
                      >
                        {icon.category}
                      </Text>
                    </Stack>
                  </Surface>
                ))}
              </div>
            </Section>

            {/* Size comparison strip */}
            <Section title="Size Comparison — All Presets">
              <Inline gap="component" align="center">
                {sizes.map((s) => (
                  <Stack key={s} gap={1} style={{ alignItems: "center" }}>
                    <FlowIcon name="star" size={s} />
                    <Text variant="caption" color="tertiary">
                      {s}
                    </Text>
                  </Stack>
                ))}
              </Inline>
            </Section>

            {/* Inline usage demo */}
            <Section title="Inline Usage — Common Patterns">
              <Stack gap={3}>
                <Inline gap={3} align="center">
                  <Inline gap={2} align="center">
                    <FlowIcon name="home" size="sm" />
                    <Text variant="paragraph-s">Home</Text>
                  </Inline>
                  <Inline gap={2} align="center">
                    <FlowIcon name="settings" size="sm" />
                    <Text variant="paragraph-s">Settings</Text>
                  </Inline>
                  <Inline gap={2} align="center">
                    <FlowIcon name="bell" size="sm" />
                    <Text variant="paragraph-s">Notifications</Text>
                  </Inline>
                  <Inline gap={2} align="center">
                    <FlowIcon name="user" size="sm" />
                    <Text variant="paragraph-s">Profile</Text>
                  </Inline>
                </Inline>
                <Inline gap={3} align="center">
                  <Inline gap={2} align="center">
                    <FlowIcon name="search" size="sm" />
                    <Text variant="paragraph-s">Search</Text>
                  </Inline>
                  <Inline gap={2} align="center">
                    <FlowIcon name="edit" size="sm" />
                    <Text variant="paragraph-s">Edit</Text>
                  </Inline>
                  <Inline gap={2} align="center">
                    <FlowIcon name="trash" size="sm" />
                    <Text variant="paragraph-s">Delete</Text>
                  </Inline>
                  <Inline gap={2} align="center">
                    <FlowIcon name="download" size="sm" />
                    <Text variant="paragraph-s">Download</Text>
                  </Inline>
                </Inline>
              </Stack>
            </Section>
          </Stack>
        </Surface>
      </LayoutGrid.Item>
    </LayoutGrid>
  );
}
