/**
 * FLOW - Data Domain Demos
 * Demo functions for data components
 */
import { useState } from "react";

import { FlowChartLegendItem, FlowSortControl, Inline, Stack, Text } from "../../../../lib";
import { DemoGroup, DemoSection } from "../../../components/demo-helpers";
import { Callout } from "../../../components/doc-primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSortControl Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowSortControlOverview() {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc" | null>(null);

  const handleSort = (key: string, dir: "asc" | "desc" | null) => {
    setSortKey(dir ? key : null);
    setSortDir(dir);
  };

  return (
    <Stack gap="section">
      <DemoSection
        title="Basic Usage"
        description="Multi-option sort bar: click to cycle through ascending, descending, and unsorted."
      >
        <DemoGroup>
          <Stack gap="subsection" style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
            <FlowSortControl
              options={[
                { key: "name", label: "Name" },
                { key: "date", label: "Date" },
                { key: "price", label: "Price" },
              ]}
              sortKey={sortKey}
              sortDirection={sortDir}
              onSortChange={handleSort}
            />
            <Text role="caption" color="secondary">
              Current: {sortKey ? `${sortKey} ${sortDir}` : "unsorted"}
            </Text>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Pre-sorted"
        description="Initialize with an active sort key and direction."
      >
        <DemoGroup>
          <Stack gap="subsection" style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
            <FlowSortControl
              options={[
                { key: "rating", label: "Rating" },
                { key: "popularity", label: "Popularity" },
              ]}
              sortKey="rating"
              sortDirection="asc"
              onSortChange={() => {}}
            />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Three-State Cycle"
        description="Click cycles through: null -> asc -> desc -> null."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowSortControl cycles through three states: unsorted (null) → ascending → descending →
            unsorted. This matches user expectations for sortable columns.
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowSortControlVariants() {
  return (
    <Stack gap="section">
      <DemoSection title="All States" description="Sort direction states for each option.">
        <DemoGroup>
          <Stack gap="subsection" style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
            <Text role="caption" color="secondary">
              Unsorted (no active key):
            </Text>
            <FlowSortControl
              options={[
                { key: "name", label: "Name" },
                { key: "date", label: "Date" },
              ]}
              sortKey={null}
              sortDirection={null}
              onSortChange={() => {}}
            />
            <Text role="caption" color="secondary">
              Ascending (name active):
            </Text>
            <FlowSortControl
              options={[
                { key: "name", label: "Name" },
                { key: "date", label: "Date" },
              ]}
              sortKey="name"
              sortDirection="asc"
              onSortChange={() => {}}
            />
            <Text
              role="caption"
              color="secondary"
              style={{ marginTop: "var(--sys-frame-space-3)" }}
            >
              Descending (date active):
            </Text>
            <FlowSortControl
              options={[
                { key: "name", label: "Name" },
                { key: "date", label: "Date" },
              ]}
              sortKey="date"
              sortDirection="desc"
              onSortChange={() => {}}
            />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowChartLegendItem Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowChartLegendItemOverview() {
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const next = new Set(hidden);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setHidden(next);
  };

  return (
    <Stack gap="subsection">
      <DemoSection
        title="Basic Usage"
        description="Single legend entry for chart visualizations: color swatch + label + optional value."
      >
        <DemoGroup>
          <Stack gap="component">
            <FlowChartLegendItem color="var(--sys-energy-accent)" label="Revenue" />
            <FlowChartLegendItem
              color="var(--sys-energy-status-success)"
              label="Profit"
              value="$12,450"
            />
            <FlowChartLegendItem
              color="var(--sys-energy-status-warning)"
              label="Expenses"
              value="$8,200"
            />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Toggleable" description="Click to hide/show series in chart.">
        <DemoGroup>
          <Stack gap="component">
            <FlowChartLegendItem
              color="var(--sys-energy-accent)"
              label="Series A"
              value="45%"
              toggleable
              hidden={hidden.has("a")}
              onToggle={() => toggle("a")}
            />
            <FlowChartLegendItem
              color="var(--sys-energy-status-success)"
              label="Series B"
              value="30%"
              toggleable
              hidden={hidden.has("b")}
              onToggle={() => toggle("b")}
            />
            <FlowChartLegendItem
              color="var(--sys-energy-status-warning)"
              label="Series C"
              value="25%"
              toggleable
              hidden={hidden.has("c")}
              onToggle={() => toggle("c")}
            />
          </Stack>
          <Text role="caption" color="secondary" style={{ marginTop: "var(--sys-frame-space-3)" }}>
            Hidden: {Array.from(hidden).join(", ") || "none"}
          </Text>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Horizontal Layout"
        description="Side-by-side legend items for space efficiency."
      >
        <DemoGroup>
          <Inline gap="component-lg">
            <FlowChartLegendItem color="var(--sys-energy-accent)" label="Desktop" value="60%" />
            <FlowChartLegendItem color="var(--sys-energy-status-info)" label="Mobile" value="35%" />
            <FlowChartLegendItem
              color="var(--sys-energy-status-warning)"
              label="Tablet"
              value="5%"
            />
          </Inline>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowChartLegendItemVariants() {
  return (
    <Stack gap="component-lg">
      <DemoSection title="With/Without Values" description="Legend items can show or hide values.">
        <DemoGroup>
          <Stack gap="component">
            <FlowChartLegendItem color="var(--sys-energy-accent)" label="Label only" />
            <FlowChartLegendItem
              color="var(--sys-energy-status-success)"
              label="With value"
              value="$1,234"
            />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}
