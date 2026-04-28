/**
 * FLOW - Data Domain Registry
 * Component metadata, demos, and developer guides for data components.
 */
import React from "react";
import type { ComponentEntry } from "../types";
import { FlowChartLegendItem, FlowSortControl } from "@flow/design-system";
import {
  FlowChartLegendItemOverview,
  FlowChartLegendItemVariants,
  FlowSortControlOverview,
  FlowSortControlVariants,
} from "./demos";

export const DATA_REGISTRY: Record<string, ComponentEntry> = {
  // ─── FlowSortControl ───
  "data/flow-sort-control": {
    domain: "Data",
    spec: {
      name: "FlowSortControl",
      purpose:
        "Simple sort direction toggle: ascending, descending, or unsorted. Used alongside column headers or filter bars. Three-state cycle (null → asc → desc → null) matches user expectations for sortable tables.",
      platform: "shared",
      anatomy: [
        {
          part: "Button wrapper",
          description: "Interactive button element with focus ring",
          tokens: ["comp.sortcontrol.size"],
        },
        {
          part: "Sort icon",
          description: "Arrow icon indicating direction (up/down/both)",
          tokens: ["comp.sortcontrol.icon"],
        },
        {
          part: "Label (optional)",
          description: "Text label showing column name",
          tokens: ["comp.sortcontrol.label-size"],
        },
      ],
      variants: ["Icon-only (arrow)", "With label", "Three-state (asc/desc/none)"],
      states: ["unsorted", "ascending", "descending", "disabled"],
      accessibility: {
        handled: [
          "role='button' on interactive element",
          "aria-label describes current sort direction",
          "aria-sort on associated column header",
          "Keyboard: Space/Enter to toggle",
        ],
        required: [
          "Provide aria-label describing column and direction",
          "Update aria-sort on table column when direction changes",
        ],
        keyboard: [
          { key: "Tab", action: "Focus sort control" },
          { key: "Space / Enter", action: "Cycle through sort states" },
        ],
        wcag: ["2.1.1", "4.1.2"],
      },
    },
    demos: {
      overview: () => <FlowSortControlOverview />,
      variants: () => <FlowSortControlVariants />,
    },
    developer: {
      reactImport: `import { FlowSortControl } from "@flow/design-system";`,
      reactUsage: `// Basic sort control
const [sort, setSort] = useState<"asc" | "desc" | null>(null);

<FlowSortControl
  direction={sort}
  onChange={setSort}
  aria-label="Sort by name"
/>

// With label
<FlowSortControl
  direction={sort}
  onChange={setSort}
  label="Price"
/>

// In table header
<th aria-sort={sort === "asc" ? "ascending" : sort === "desc" ? "descending" : "none"}>
  <Inline gap={1}>
    <span>Column Name</span>
    <FlowSortControl
      direction={sort}
      onChange={setSort}
      aria-label="Sort by column name"
    />
  </Inline>
</th>

// Disabled
<FlowSortControl
  direction="asc"
  onChange={() => {}}
  disabled
  label="Locked Column"
/>`,
      flutterImport: `import 'package:flow_ds/data.dart';`,
      flutterUsage: `FlowSortControl(
  direction: sortDirection,
  onChanged: (direction) => setState(() => sortDirection = direction),
)

// With label
FlowSortControl(
  direction: sortDirection,
  onChanged: (direction) => setState(() => sortDirection = direction),
  label: 'Price',
)`,
      notes:
        "FlowSortControl cycles through three states: null (unsorted) → ascending → descending → null. This matches user expectations for sortable columns. Always update the associated table column's aria-sort attribute when sort direction changes. Use icon-only variant for compact tables, with-label variant for filter bars or standalone controls.",
      props: [
        {
          name: "direction",
          type: '"asc" | "desc" | null',
          description: "Current sort direction. null = unsorted.",
          required: true,
        },
        {
          name: "onChange",
          type: '(direction: "asc" | "desc" | null) => void',
          description: "Callback when sort direction changes.",
          required: true,
        },
        {
          name: "label",
          type: "string",
          description: "Optional text label showing column name.",
          required: false,
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables interaction.",
        },
        {
          name: "aria-label",
          type: "string",
          description: "Accessible label for screen readers. Required if no label prop.",
          required: false,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
          required: false,
        },
        { name: "style", type: "CSSProperties", description: "Inline styles.", required: false },
      ],
      guidelines: [
        { intent: "do", text: "Use sort controls for table columns and filterable lists." },
        { intent: "do", text: "Update table column aria-sort attribute when direction changes." },
        { intent: "do", text: "Provide clear aria-label describing column and current direction." },
        {
          intent: "dont",
          text: "Don't allow sorting on non-sortable columns (hide or disable control).",
        },
        {
          intent: "dont",
          text: "Don't skip states in the cycle — always go null → asc → desc → null.",
        },
        {
          intent: "info",
          text: "Icon changes based on state: both arrows (null), up (asc), down (desc).",
        },
        { intent: "info", text: "Clicking cycles to next state in sequence automatically." },
        { intent: "info", text: "Use with FlowTable or data-heavy patterns for best UX." },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(FlowSortControl, {
          options: props.options,
          sortKey: (props.sortKey as string | null) ?? "name",
          sortDirection: (props.sortDirection as "asc" | "desc" | null) ?? null,
          onSortChange: () => {},
        } as React.ComponentProps<typeof FlowSortControl>),
      defaults: { sortKey: "name", sortDirection: null },
      fixtures: {
        options: [
          { key: "name", label: "Name" },
          { key: "date", label: "Date" },
          { key: "price", label: "Price" },
        ],
      },
      excludeControls: ["onSortChange", "options", "aria-label", "className", "style"],
    },
  },

  // ─── FlowChartLegendItem ───
  "data/flow-chart-legend-item": {
    domain: "Data",
    spec: {
      name: "FlowChartLegendItem",
      purpose:
        "Single legend entry for chart visualizations: color swatch + label + optional value. Supports toggleable variant where clicking hides/shows the associated data series. Used with charts, graphs, and data visualizations.",
      platform: "shared",
      anatomy: [
        {
          part: "Color swatch",
          description: "Small square or circle showing series color",
          tokens: ["comp.chartlegend.swatch-size", "comp.chartlegend.swatch-radius"],
        },
        {
          part: "Label text",
          description: "Series name or category label",
          tokens: ["comp.chartlegend.label-size"],
        },
        {
          part: "Value (optional)",
          description: "Current value, percentage, or metric",
          tokens: ["comp.chartlegend.value-size"],
        },
        {
          part: "Toggle indicator (optional)",
          description: "Shows hidden state when toggleable",
          tokens: ["comp.chartlegend.hidden-opacity"],
        },
      ],
      variants: [
        "Default (swatch + label)",
        "With value",
        "Toggleable (click to hide series)",
        "Horizontal/vertical layout",
      ],
      states: ["default", "hover", "hidden (series toggled off)"],
      accessibility: {
        handled: [
          "role='checkbox' when toggleable (aria-checked for visibility)",
          "Semantic HTML when non-toggleable (div/span)",
          "Color + text label convey meaning (not color alone)",
        ],
        required: [
          "Provide descriptive label text",
          "Don't rely solely on color to convey series identity",
        ],
        keyboard: [
          { key: "Tab", action: "Focus toggleable legend items" },
          { key: "Space / Enter", action: "Toggle visibility" },
        ],
        wcag: ["2.1.1", "4.1.2"],
      },
    },
    demos: {
      overview: () => <FlowChartLegendItemOverview />,
      variants: () => <FlowChartLegendItemVariants />,
    },
    developer: {
      reactImport: `import { FlowChartLegendItem } from "@flow/design-system";`,
      reactUsage: `// Basic legend item
<FlowChartLegendItem
  color="var(--sys-energy-accent)"
  label="Revenue"
/>

// With value
<FlowChartLegendItem
  color="var(--sys-energy-status-success)"
  label="Profit"
  value="$12,450"
/>

// Toggleable (hide/show series)
const [hidden, setHidden] = useState(new Set<string>());

<FlowChartLegendItem
  color="var(--sys-energy-accent)"
  label="Series A"
  value="45%"
  toggleable
  hidden={hidden.has("seriesA")}
  onToggle={() => {
    const next = new Set(hidden);
    if (next.has("seriesA")) next.delete("seriesA");
    else next.add("seriesA");
    setHidden(next);
  }}
/>

// Horizontal layout
<Inline gap={4}>
  <FlowChartLegendItem color="#FF6B6B" label="Desktop" value="60%" />
  <FlowChartLegendItem color="#4ECDC4" label="Mobile" value="35%" />
  <FlowChartLegendItem color="#FFE66D" label="Tablet" value="5%" />
</Inline>

// Vertical layout (default)
<Stack gap={2}>
  <FlowChartLegendItem color="#FF6B6B" label="Q1" value="$25k" />
  <FlowChartLegendItem color="#4ECDC4" label="Q2" value="$30k" />
  <FlowChartLegendItem color="#FFE66D" label="Q3" value="$28k" />
</Stack>`,
      flutterImport: `import 'package:flow_ds/data.dart';`,
      flutterUsage: `FlowChartLegendItem(
  color: Colors.blue,
  label: 'Revenue',
)

// With value
FlowChartLegendItem(
  color: Colors.green,
  label: 'Profit',
  value: '$12,450',
)

// Toggleable
FlowChartLegendItem(
  color: Colors.blue,
  label: 'Series A',
  value: '45%',
  toggleable: true,
  hidden: hiddenSeries.contains('A'),
  onToggle: () => toggleSeries('A'),
)`,
      notes:
        "FlowChartLegendItem provides a consistent legend UI for charts and graphs. Use the basic variant for static legends, toggleable variant for interactive charts where users can hide/show series. The color swatch uses the exact color from your chart data. Always include descriptive labels — don't rely on color alone. Horizontal layout works best for 3-5 items, vertical for 5+ items.",
      props: [
        {
          name: "color",
          type: "string",
          description: "CSS color value for swatch (matches chart series color).",
          required: true,
        },
        {
          name: "label",
          type: "string",
          description: "Series name or category label.",
          required: true,
        },
        {
          name: "value",
          type: "string",
          description: "Optional value, percentage, or metric to display.",
          required: false,
        },
        {
          name: "toggleable",
          type: "boolean",
          default: "false",
          description: "Makes item clickable to hide/show series.",
        },
        {
          name: "hidden",
          type: "boolean",
          default: "false",
          description: "Whether series is currently hidden. Only works if toggleable={true}.",
        },
        {
          name: "onToggle",
          type: "() => void",
          description: "Callback when toggle is clicked. Required if toggleable={true}.",
          required: false,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
          required: false,
        },
        { name: "style", type: "CSSProperties", description: "Inline styles.", required: false },
      ],
      guidelines: [
        { intent: "do", text: "Match swatch color exactly to chart series color." },
        { intent: "do", text: "Use descriptive labels that clearly identify each series." },
        {
          intent: "do",
          text: "Use toggleable variant for interactive charts where hiding series is useful.",
        },
        { intent: "do", text: "Show current values or percentages when space permits." },
        {
          intent: "dont",
          text: "Don't rely solely on color to convey meaning — always include text labels.",
        },
        {
          intent: "dont",
          text: "Don't make legends too long — consolidate similar series or use progressive disclosure.",
        },
        {
          intent: "info",
          text: "Toggleable legend items use role='checkbox' with aria-checked for accessibility.",
        },
        { intent: "info", text: "Hidden state reduces opacity and adds strikethrough to label." },
        {
          intent: "info",
          text: "Swatch can be square or circular based on chart type preference.",
        },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(FlowChartLegendItem, {
          label: (props.label as string) || "Revenue",
          color: (props.color as string) || "var(--sys-energy-accent)",
          size: props.size,
        } as React.ComponentProps<typeof FlowChartLegendItem>),
      defaults: {
        label: "Revenue",
        color: "var(--sys-energy-accent)",
        size: "md",
      },
    },
  },
};
