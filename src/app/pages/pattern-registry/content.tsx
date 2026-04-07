

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
  FlowButton,
  FlowFilterChipGroup,
  FlowKPICard,
  FlowSectionHeader,
  FlowTimeline,
  Grid,
  Stack,
  Surface,
  Text,
} from "../../../lib";
import { DemoGroup, DemoSection } from "../../components/demo-helpers";
export type { PropEntry, GuidelineEntry } from "../../components/doc-primitives";

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
// CONTENT PATTERNS REGISTRY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── FlowFilterChipGroup ──

function FilterChipGroupOverviewDemo() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["design"]));
  const [exclusiveSelected, setExclusiveSelected] = useState<Set<string>>(new Set(["all"]));
  const chips = [
    { id: "all", label: "All", count: 42 },
    { id: "design", label: "Design", count: 18 },
    { id: "engineering", label: "Engineering", count: 12 },
    { id: "product", label: "Product", count: 8 },
    { id: "marketing", label: "Marketing", count: 4 },
  ];
  return (
    <Stack gap={6}>
      <DemoSection
        title="Multi-select"
        description="Toggle multiple filter chips simultaneously. Selected chips show a check icon and accent styling."
      >
        <DemoGroup>
          <Stack gap={3}>
            <FlowFilterChipGroup
              chips={chips}
              selected={selected}
              onSelectionChange={setSelected}
            />
            <Text role="caption" color="secondary">
              Selected: {Array.from(selected).join(", ") || "none"}
            </Text>
          </Stack>
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="Exclusive (single-select)"
        description="Only one chip can be active at a time — behaves like a radio group."
      >
        <DemoGroup>
          <Stack gap={3}>
            <FlowFilterChipGroup
              chips={chips}
              selected={exclusiveSelected}
              onSelectionChange={setExclusiveSelected}
              exclusive
            />
            <Text role="caption" color="secondary">
              Selected: {Array.from(exclusiveSelected).join(", ") || "none"}
            </Text>
          </Stack>
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="With counts"
        description="Each chip can display an optional count badge for the number of items matching that filter."
      >
        <DemoGroup>
          <FlowFilterChipGroup
            chips={chips}
            selected={new Set(["design", "engineering"])}
            onSelectionChange={() => {}}
          />
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

function FilterChipGroupUseCasesDemo() {
  const [tableFilters, setTableFilters] = useState<Set<string>>(new Set());
  const statusChips = [
    { id: "active", label: "Active", count: 24 },
    { id: "pending", label: "Pending", count: 8 },
    { id: "archived", label: "Archived", count: 10 },
  ];
  return (
    <Stack gap={6}>
      <DemoSection
        title="Table filter bar"
        description="Common pattern: filter chips above a data table to narrow results by status."
      >
        <DemoGroup>
          <Stack gap={3}>
            <FlowSectionHeader
              title="Users"
              subtitle="Manage team members"
              action={
                <FlowButton variant="high" size="sm">
                  Add user
                </FlowButton>
              }
            />
            <FlowFilterChipGroup
              chips={statusChips}
              selected={tableFilters}
              onSelectionChange={setTableFilters}
            />
            <Surface
              variant="secondary"
              radius="container"
              padding={8}
              style={{ textAlign: "center" }}
            >
              <Text role="caption" color="secondary">
                Table content filtered by: {Array.from(tableFilters).join(", ") || "all"}
              </Text>
            </Surface>
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

const filterChipGroupEntry: PatternEntry = {
  category: "content",
  spec: {
    name: "Filter Chip Group",
    purpose:
      "Orchestrates a set of toggleable filter chips with multi-select or exclusive (single-select) mode, optional per-chip counts, and check-icon selected state.",
    platform: "shared",
    composesL3: ["FlowIcon", "Inline"],
    orchestrates: [
      "Multi-select / exclusive toggle logic",
      "Selected state visual feedback (check icon + accent color)",
      "Per-chip count display",
      "Filter change event aggregation via onSelectionChange",
    ],
    doesNotOwn: [
      "Filtered data rendering — consumer owns the list/table",
      "Clear-all button — consumer composes externally if needed",
    ],
    anatomy: [
      {
        part: "Group container",
        description: "Flex-wrap row with role='group'. Wraps chips and manages gap spacing.",
        tokens: ["ref.frame.space-2"],
      },
      {
        part: "Chip button",
        description:
          "Individual toggle button with role='checkbox' + aria-checked. Shows label, optional count, and check icon when selected.",
        tokens: [
          "sys.energy.surface-interactive",
          "sys.energy.text-accent",
          "sys.energy.border-focus",
        ],
      },
      {
        part: "Check icon",
        description:
          "Leading FlowIcon ('check') rendered only when chip is selected — provides visual confirmation.",
        tokens: ["comp.filter-chip.icon-size"],
      },
      {
        part: "Count badge",
        description:
          "Optional trailing count displayed at reduced opacity. Shows number of items matching this filter.",
        tokens: ["ref.voice.size-2"],
      },
    ],
    variants: [
      "Multi-select (default)",
      "Exclusive (single-select)",
      "With counts",
      "Without counts",
    ],
    states: ["default", "selected", "hover", "focus"],
    accessibility: {
      handled: [
        "Container has role='group'",
        "Each chip has role='checkbox' with aria-checked",
        "Focus ring via .flow-focusable utility class",
      ],
      required: ["Provide meaningful chip labels describing each filter option"],
      keyboard: ["Tab to focus chips", "Space/Enter to toggle selection"],
    },
  },
  composition: [
    {
      component: "FlowIcon",
      role: "Check icon for selected state feedback",
      tokens: ["comp.filter-chip.icon-size"],
    },
    {
      component: "Inline (CSS)",
      role: "Flex-wrap row layout with gap",
      tokens: ["ref.frame.space-2"],
    },
  ],
  demos: {
    overview: FilterChipGroupOverviewDemo,
    useCases: FilterChipGroupUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowFilterChipGroup } from "@flow/design-system";`,
    reactUsage: `const [selected, setSelected] = useState<Set<string>>(new Set());

const chips = [
  { id: "active", label: "Active", count: 24 },
  { id: "pending", label: "Pending", count: 8 },
  { id: "archived", label: "Archived", count: 10 },
];

// Multi-select (default)
<FlowFilterChipGroup
  chips={chips}
  selected={selected}
  onSelectionChange={setSelected}
/>

// Exclusive (single-select)
<FlowFilterChipGroup
  chips={chips}
  selected={selected}
  onSelectionChange={setSelected}
  exclusive
/>`,
    flutterImport: `import 'package:flow/patterns/filter_chip_group.dart';`,
    flutterUsage: `FlowFilterChipGroup(
  chips: [
    FilterChip(id: 'active', label: 'Active', count: 24),
    FilterChip(id: 'pending', label: 'Pending', count: 8),
  ],
  selected: selectedSet,
  onSelectionChange: (s) => setState(() => selected = s),
  exclusive: false,
)`,
    props: [
      {
        name: "chips",
        type: "FilterChip[]",
        required: true,
        description: "Array of chip definitions: { id: string; label: string; count?: number }.",
      },
      {
        name: "selected",
        type: "Set<string>",
        required: true,
        description: "Controlled set of selected chip IDs.",
      },
      {
        name: "onSelectionChange",
        type: "(selected: Set<string>) => void",
        required: true,
        description: "Called when selection changes with the updated Set.",
      },
      {
        name: "exclusive",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "When true, only one chip can be selected at a time (radio-like behavior).",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes on the group container.",
      },
      {
        name: "style",
        type: "CSSProperties",
        required: false,
        description: "Inline styles on the group container.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use for discrete filter sets with 2-8 options that can be toggled." },
      { type: "do", text: "Include counts when they help users estimate results before clicking." },
      {
        type: "dont",
        text: "Don't use for more than 10 options — use FlowMultiSelect dropdown instead.",
      },
      { type: "dont", text: "Don't mix multi-select and exclusive chips in the same group." },
      {
        type: "info",
        text: "Exclusive mode deselects the current chip when a new one is picked. Clicking the active chip deselects all.",
      },
    ],
  },
};

// ── FlowTimeline ──

function TimelineOverviewDemo() {
  const items = [
    {
      id: "1",
      title: "Order placed",
      description: "Order #12345 was confirmed",
      timestamp: "Mar 19, 2026 · 09:00",
      variant: "success" as const,
    },
    {
      id: "2",
      title: "Payment processed",
      description: "Visa ending in 4242",
      timestamp: "Mar 19, 2026 · 09:01",
      variant: "success" as const,
    },
    {
      id: "3",
      title: "Shipped",
      description: "Tracking: FLOW-789456",
      timestamp: "Mar 19, 2026 · 14:30",
      variant: "info" as const,
    },
    {
      id: "4",
      title: "Delivery attempt failed",
      description: "No one available to receive",
      timestamp: "Mar 20, 2026 · 11:15",
      variant: "warning" as const,
    },
    {
      id: "5",
      title: "Out for delivery",
      description: "Second attempt scheduled",
      timestamp: "Mar 21, 2026 · 08:00",
      variant: "default" as const,
    },
  ];
  return (
    <Stack gap={6}>
      <DemoSection
        title="Order tracking"
        description="Vertical timeline with mixed status variants — success, info, warning, default — and timestamps in mono font."
      >
        <DemoGroup>
          <Stack style={{ maxWidth: 480 }}>
            <FlowTimeline items={items} />
          </Stack>
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="Status variants"
        description="Each timeline item can use a variant to color-code its status dot."
      >
        <DemoGroup>
          <Stack style={{ maxWidth: 480 }}>
            <FlowTimeline
              items={[
                {
                  id: "s",
                  title: "Success",
                  description: "Operation completed",
                  variant: "success",
                },
                { id: "i", title: "Info", description: "Informational event", variant: "info" },
                { id: "w", title: "Warning", description: "Needs attention", variant: "warning" },
                { id: "e", title: "Error", description: "Something went wrong", variant: "error" },
                { id: "d", title: "Default", description: "Neutral event", variant: "default" },
              ]}
            />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

function TimelineUseCasesDemo() {
  return (
    <Stack gap={6}>
      <DemoSection
        title="Activity log"
        description="Track user actions chronologically within a project or resource."
      >
        <DemoGroup>
          <Stack style={{ maxWidth: 480 }}>
            <FlowTimeline
              items={[
                {
                  id: "1",
                  title: "Document created",
                  description: "Ricardo created 'Q1 Report'",
                  timestamp: "Today · 10:30",
                  variant: "success",
                },
                {
                  id: "2",
                  title: "Collaborator added",
                  description: "Ana was invited to edit",
                  timestamp: "Today · 11:00",
                  variant: "info",
                },
                {
                  id: "3",
                  title: "Comment added",
                  description: "Ana left feedback on section 3",
                  timestamp: "Today · 14:15",
                  variant: "default",
                },
                {
                  id: "4",
                  title: "Version published",
                  description: "v2.1 is now live",
                  timestamp: "Today · 16:45",
                  variant: "success",
                },
              ]}
            />
          </Stack>
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="Deployment history"
        description="Show CI/CD pipeline stages with error tracking."
      >
        <DemoGroup>
          <Stack style={{ maxWidth: 480 }}>
            <FlowTimeline
              items={[
                { id: "1", title: "Build started", timestamp: "12:00:00", variant: "info" },
                {
                  id: "2",
                  title: "Tests passed",
                  description: "142 tests, 0 failures",
                  timestamp: "12:02:34",
                  variant: "success",
                },
                { id: "3", title: "Deploy to staging", timestamp: "12:03:10", variant: "success" },
                {
                  id: "4",
                  title: "E2E tests failed",
                  description: "3 failures in checkout flow",
                  timestamp: "12:05:45",
                  variant: "error",
                },
              ]}
            />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

const timelineEntry: PatternEntry = {
  category: "content",
  spec: {
    name: "Timeline",
    purpose:
      "Chronological event display with vertical connecting line, color-coded status dots, and content blocks for title, description, and timestamp.",
    platform: "shared",
    composesL3: ["Stack", "Text"],
    orchestrates: [
      "Chronological vertical layout with connecting line",
      "Status-based dot color selection (success, warning, error, info, default)",
      "Timestamp rendering in monospace font",
      "Last-item detection to hide trailing line segment",
    ],
    doesNotOwn: [
      "Event data fetching or sorting",
      "Load-more pagination — consumer manages item array",
      "Expandable detail sections (future enhancement)",
    ],
    anatomy: [
      {
        part: "Timeline container",
        description: "Root div with .flow-timeline class. Vertical stack of event rows.",
        tokens: [],
      },
      {
        part: "Event row",
        description:
          "Horizontal flex: gutter column (dot + line) + content column. Padding-bottom creates spacing between events.",
        tokens: ["ref.frame.space-3", "ref.frame.space-5"],
      },
      {
        part: "Status dot",
        description:
          "Colored circle indicating event variant. Uses semantic status tokens for color.",
        tokens: ["comp.timeline.dot-size", "sys.energy.status-*"],
      },
      {
        part: "Connecting line",
        description:
          "Vertical line between dots. Hidden on the last item. Uses default border color.",
        tokens: ["comp.timeline.line-width", "sys.energy.border-default"],
      },
      {
        part: "Content block",
        description:
          "Stack with title (paragraph-s, medium weight), optional description (caption), and optional timestamp (caption, mono font).",
        tokens: ["ref.voice.size-*", "ref.voice.weight-medium", "ref.voice.family-mono"],
      },
    ],
    variants: ["Default", "Success", "Warning", "Error", "Info"],
    states: ["default"],
    accessibility: {
      handled: ["Semantic structure with title, description, and time elements"],
      required: [
        "Provide meaningful title for each timeline item",
        "Use timestamp for chronological context",
      ],
      keyboard: [],
    },
  },
  composition: [
    {
      component: "Stack",
      role: "Content block vertical layout (title → description → timestamp)",
      tokens: ["ref.frame.space-1"],
    },
    {
      component: "Text",
      role: "Title, description, and timestamp rendering with role-based typography",
      tokens: ["ref.voice.*"],
    },
  ],
  demos: {
    overview: TimelineOverviewDemo,
    useCases: TimelineUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowTimeline } from "@flow/design-system";`,
    reactUsage: `const events = [
  {
    id: "1",
    title: "Order placed",
    description: "Order #12345 confirmed",
    timestamp: "Mar 19 · 09:00",
    variant: "success",
  },
  {
    id: "2",
    title: "Shipped",
    description: "Tracking: FLOW-789",
    timestamp: "Mar 19 · 14:30",
    variant: "info",
  },
];

<FlowTimeline items={events} />`,
    flutterImport: `import 'package:flow/patterns/timeline.dart';`,
    flutterUsage: `FlowTimeline(
  items: [
    TimelineItem(
      id: '1',
      title: 'Order placed',
      description: 'Order #12345',
      timestamp: 'Mar 19 · 09:00',
      variant: TimelineVariant.success,
    ),
  ],
)`,
    props: [
      {
        name: "items",
        type: "TimelineItem[]",
        required: true,
        description: "Array of events: { id, title, description?, timestamp?, icon?, variant? }.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes on the timeline container.",
      },
      {
        name: "style",
        type: "CSSProperties",
        required: false,
        description: "Inline styles on the timeline container.",
      },
    ],
    guidelines: [
      {
        type: "do",
        text: "Use variant to color-code events by status — success for completed, error for failures.",
      },
      { type: "do", text: "Include timestamps for chronological context — format consistently." },
      {
        type: "dont",
        text: "Don't render more than 20 items without pagination — use load-more pattern.",
      },
      {
        type: "info",
        text: "Timestamps render in monospace font for visual alignment. The connecting line hides on the last item.",
      },
    ],
  },
};

// ── FlowSectionHeader ──

function SectionHeaderOverviewDemo() {
  return (
    <Stack gap={6}>
      <DemoSection title="Basic" description="Section header with just a title and divider.">
        <DemoGroup>
          <Stack style={{ maxWidth: 600 }}>
            <FlowSectionHeader title="Team Members" />
          </Stack>
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="With subtitle"
        description="Add context below the title for section descriptions."
      >
        <DemoGroup>
          <Stack style={{ maxWidth: 600 }}>
            <FlowSectionHeader
              title="Billing"
              subtitle="Manage your payment methods and invoices"
            />
          </Stack>
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="With action"
        description="Place a button or any ReactNode in the trailing action slot."
      >
        <DemoGroup>
          <Stack style={{ maxWidth: 600 }}>
            <FlowSectionHeader
              title="Projects"
              subtitle="Your active and archived projects"
              action={
                <FlowButton variant="high" size="sm">
                  New project
                </FlowButton>
              }
            />
          </Stack>
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="Without divider"
        description="Set divider={false} when the section boundary is implicit."
      >
        <DemoGroup>
          <Stack style={{ maxWidth: 600 }}>
            <FlowSectionHeader
              title="Notifications"
              subtitle="Configure alert preferences"
              divider={false}
            />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

function SectionHeaderUseCasesDemo() {
  return (
    <Stack gap={6}>
      <DemoSection
        title="Settings page"
        description="Section headers organize settings into logical groups."
      >
        <DemoGroup>
          <Stack gap={5} style={{ maxWidth: 600 }}>
            <FlowSectionHeader
              title="Profile"
              subtitle="Your personal information"
              action={
                <FlowButton variant="medium" size="sm">
                  Edit
                </FlowButton>
              }
            />
            <Surface variant="secondary" radius="container" padding={6}>
              <Text role="caption" color="secondary">
                Profile fields go here...
              </Text>
            </Surface>
            <FlowSectionHeader
              title="Security"
              subtitle="Password and two-factor authentication"
              action={
                <FlowButton variant="medium" size="sm">
                  Change password
                </FlowButton>
              }
            />
            <Surface variant="secondary" radius="container" padding={6}>
              <Text role="caption" color="secondary">
                Security settings go here...
              </Text>
            </Surface>
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

const sectionHeaderEntry: PatternEntry = {
  category: "content",
  spec: {
    name: "Section Header",
    purpose:
      "Page section header composing title, optional subtitle, trailing action slot, and optional divider. Provides consistent section boundaries across settings pages, dashboards, and forms.",
    platform: "shared",
    composesL3: ["Text", "Inline", "Stack", "Divider"],
    orchestrates: [
      "Title + subtitle vertical layout",
      "Trailing action slot alignment (flex space-between)",
      "Optional bottom divider with controlled spacing",
    ],
    doesNotOwn: ["Section content below the header", "Action button emphasis or behavior"],
    anatomy: [
      {
        part: "Root container",
        description: "Wrapping div with .flow-section-header class.",
        tokens: [],
      },
      {
        part: "Title row",
        description:
          "Inline with space-between: title/subtitle stack on left, action slot on right.",
        tokens: ["ref.frame.space-2"],
      },
      {
        part: "Title",
        description: "Text with role='heading-m' — primary section label.",
        tokens: ["ref.voice.*"],
      },
      {
        part: "Subtitle",
        description: "Optional Text with role='caption' color='secondary' — section description.",
        tokens: ["ref.voice.*"],
      },
      {
        part: "Action slot",
        description: "ReactNode rendered at trailing edge — typically a FlowButton.",
        tokens: [],
      },
      {
        part: "Divider",
        description: "Optional Divider component with spacing={2}. Shown by default.",
        tokens: ["sys.energy.border-default"],
      },
    ],
    variants: ["Title only", "With subtitle", "With action", "Without divider"],
    states: ["default"],
    accessibility: {
      handled: ["Title uses heading-m semantic role"],
      required: ["Provide descriptive title text"],
      keyboard: [],
    },
  },
  composition: [
    { component: "Text", role: "Title and subtitle rendering", tokens: ["ref.voice.*"] },
    {
      component: "Inline",
      role: "Horizontal layout with space-between for title/action",
      tokens: ["ref.frame.space-2"],
    },
    {
      component: "Stack",
      role: "Vertical grouping of title + subtitle",
      tokens: ["ref.frame.space-1"],
    },
    {
      component: "Divider",
      role: "Visual section boundary",
      tokens: ["sys.energy.border-default"],
    },
  ],
  demos: {
    overview: SectionHeaderOverviewDemo,
    useCases: SectionHeaderUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowSectionHeader } from "@flow/design-system";`,
    reactUsage: `// Basic
<FlowSectionHeader title="Team Members" />

// With subtitle
<FlowSectionHeader
  title="Billing"
  subtitle="Manage payment methods and invoices"
/>

// With action button
<FlowSectionHeader
  title="Projects"
  subtitle="Active and archived projects"
  action={<FlowButton variant="high" size="sm">New project</FlowButton>}
/>

// Without divider
<FlowSectionHeader
  title="Notifications"
  divider={false}
/>`,
    flutterImport: `import 'package:flow/patterns/section_header.dart';`,
    flutterUsage: `FlowSectionHeader(
  title: 'Team Members',
  subtitle: 'Manage your team',
  action: FlowButton(
    emphasis: FlowEmphasis.high,
    size: FlowSize.sm,
    child: Text('Add member'),
  ),
)`,
    props: [
      {
        name: "title",
        type: "string",
        required: true,
        description: "Primary heading text for the section.",
      },
      {
        name: "subtitle",
        type: "string",
        required: false,
        description: "Secondary description text below the title.",
      },
      {
        name: "action",
        type: "ReactNode",
        required: false,
        description: "Trailing action slot — typically a FlowButton.",
      },
      {
        name: "divider",
        type: "boolean",
        required: false,
        defaultValue: "true",
        description: "Show bottom divider to separate from section content.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes.",
      },
      {
        name: "style",
        type: "CSSProperties",
        required: false,
        description: "Inline styles on root.",
      },
    ],
    guidelines: [
      {
        type: "do",
        text: "Use to organize page content into logical sections (settings, forms, dashboards).",
      },
      {
        type: "do",
        text: "Place primary actions in the action slot — not inline with the title text.",
      },
      { type: "dont", text: "Don't nest section headers — use one level of hierarchy per page." },
      {
        type: "info",
        text: "Divider uses the FLOW Divider primitive with spacing={2} for consistent rhythm.",
      },
    ],
  },
};

// ── FlowKPICard ──

function KPICardOverviewDemo() {
  return (
    <Stack gap={6}>
      <DemoSection
        title="KPI grid"
        description="Typical dashboard layout — multiple KPI cards in a responsive grid showing key metrics with trends."
      >
        <DemoGroup>
          <Grid columns={2} gap={4}>
            <FlowKPICard
              label="Revenue"
              value="$48,250"
              trend="up"
              trendValue="+12.5%"
              description="vs last month"
              icon="dollar-sign"
            />
            <FlowKPICard
              label="Churn Rate"
              value="2.4%"
              trend="down"
              trendValue="-0.8%"
              description="vs last month"
              upIsGood={false}
              icon="users"
            />
            <FlowKPICard
              label="Active Users"
              value="1,847"
              trend="up"
              trendValue="+5.2%"
              description="daily average"
              icon="activity"
            />
            <FlowKPICard
              label="Response Time"
              value="142ms"
              trend="neutral"
              trendValue="—"
              description="p95 latency"
              icon="clock"
            />
          </Grid>
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="Sizes"
        description="Three size variants control padding, value font size, and overall card density."
      >
        <DemoGroup>
          <Stack gap={4} style={{ maxWidth: 300 }}>
            <FlowKPICard label="Small" value="$1,200" trend="up" trendValue="+8%" size="sm" />
            <FlowKPICard
              label="Medium (default)"
              value="$1,200"
              trend="up"
              trendValue="+8%"
              size="md"
            />
            <FlowKPICard label="Large" value="$1,200" trend="up" trendValue="+8%" size="lg" />
          </Stack>
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="Loading state"
        description="Skeleton animation while data is being fetched."
      >
        <DemoGroup>
          <Grid columns={2} gap={4}>
            <FlowKPICard label="" value="" loading />
            <FlowKPICard label="" value="" loading size="lg" />
          </Grid>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

function KPICardUseCasesDemo() {
  return (
    <Stack gap={6}>
      <DemoSection
        title="upIsGood semantics"
        description="Control whether 'up' trend is green (positive) or red (negative). Crucial for metrics like churn or error rate where 'up' is bad."
      >
        <DemoGroup>
          <Grid columns={2} gap={4}>
            <FlowKPICard
              label="Revenue (up = good)"
              value="$48K"
              trend="up"
              trendValue="+12%"
              upIsGood={true}
              icon="trending-up"
            />
            <FlowKPICard
              label="Error Rate (up = bad)"
              value="3.2%"
              trend="up"
              trendValue="+1.1%"
              upIsGood={false}
              icon="alert-triangle"
            />
          </Grid>
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="Interactive card"
        description="Add onClick to make the card clickable — cursor changes and hover elevation increases."
      >
        <DemoGroup>
          <Stack style={{ maxWidth: 300 }}>
            <FlowKPICard
              label="Click me"
              value="$2,400"
              trend="up"
              trendValue="+4%"
              icon="external-link"
              onClick={() => {}}
            />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

const kpiCardEntry: PatternEntry = {
  category: "content",
  spec: {
    name: "KPI Card",
    purpose:
      "Specialized card composing metric value, trend indicator with smart color semantics (upIsGood), label, optional description, and loading skeleton into a cohesive KPI display for dashboards.",
    platform: "shared",
    composesL3: ["Surface", "Text", "FlowIcon", "Stack", "Inline"],
    orchestrates: [
      "Metric value display with size-scaled typography",
      "Trend direction color logic via upIsGood flag",
      "Loading skeleton with pulse animation",
      "Interactive card mode (button semantics when onClick provided)",
      "Icon + label header layout",
    ],
    doesNotOwn: [
      "Metric data fetching or calculation",
      "Sparkline rendering (future enhancement)",
      "Dashboard grid layout — consumer handles placement",
    ],
    anatomy: [
      {
        part: "Card surface",
        description:
          "Surface with radius='container' and border. Padding scales per size (sm/md/lg).",
        tokens: ["ref.frame.space-4/6/8"],
      },
      {
        part: "Header row",
        description: "Inline: optional icon (accent color, sm) + label (overline, secondary).",
        tokens: ["sys.energy.text-accent", "ref.voice.*"],
      },
      {
        part: "Metric value",
        description:
          "Large bold text — font size scales per size variant (size-8/10/11). Tight line-height and letter-spacing.",
        tokens: ["ref.voice.size-8/10/11", "ref.voice.weight-bold"],
      },
      {
        part: "Trend indicator",
        description:
          "Inline: directional icon (trending-up/down/minus) + optional trend value text. Color determined by trend direction × upIsGood.",
        tokens: [
          "sys.energy.status-success",
          "sys.energy.status-error",
          "sys.energy.text-secondary",
        ],
      },
      {
        part: "Description",
        description:
          "Optional secondary text (paragraph-s) — typically comparison period ('vs last month').",
        tokens: ["ref.voice.*"],
      },
      {
        part: "Loading skeleton",
        description:
          "Three pulsing bars simulating label, value, and trend. Uses flow-skeleton-pulse animation.",
        tokens: ["sys.energy.surface-tertiary"],
      },
    ],
    variants: [
      "Small",
      "Medium (default)",
      "Large",
      "With trend",
      "With icon",
      "Loading",
      "Interactive",
    ],
    states: ["default", "loading", "interactive (hover)"],
    accessibility: {
      handled: [
        "Interactive card uses button semantics when onClick provided",
        "Icon has aria-hidden for decorative use",
      ],
      required: ["Provide meaningful label describing the metric"],
      keyboard: ["Tab to focus (when interactive)", "Enter/Space to activate (when interactive)"],
    },
  },
  composition: [
    {
      component: "Surface",
      role: "Card container with border and radius",
      tokens: ["sys.energy.surface-primary", "sys.energy.border-default"],
    },
    {
      component: "Stack",
      role: "Vertical layout: header → value → trend",
      tokens: ["ref.frame.space-2"],
    },
    {
      component: "Inline",
      role: "Horizontal layout for header (icon + label) and trend (icon + value)",
      tokens: ["ref.frame.space-2"],
    },
    {
      component: "FlowIcon",
      role: "Leading icon, trend direction icon",
      tokens: ["sys.energy.text-accent", "sys.energy.status-*"],
    },
    {
      component: "Text",
      role: "Label (overline), description (paragraph-s)",
      tokens: ["ref.voice.*"],
    },
  ],
  demos: {
    overview: KPICardOverviewDemo,
    useCases: KPICardUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowKPICard } from "@flow/design-system";`,
    reactUsage: `// Basic KPI
<FlowKPICard
  label="Revenue"
  value="$48,250"
  trend="up"
  trendValue="+12.5%"
  description="vs last month"
  icon="dollar-sign"
/>

// Inverted semantics (up = bad)
<FlowKPICard
  label="Error Rate"
  value="3.2%"
  trend="up"
  trendValue="+1.1%"
  upIsGood={false}
  icon="alert-triangle"
/>

// Loading state
<FlowKPICard label="" value="" loading />

// Interactive
<FlowKPICard
  label="Revenue"
  value="$48K"
  onClick={() => navigate('/revenue')}
/>`,
    flutterImport: `import 'package:flow/patterns/kpi_card.dart';`,
    flutterUsage: `FlowKPICard(
  label: 'Revenue',
  value: '$48,250',
  trend: KPITrend.up,
  trendValue: '+12.5%',
  description: 'vs last month',
  icon: 'dollar-sign',
)`,
    props: [
      {
        name: "value",
        type: "string | number",
        required: true,
        description: "Main metric value to display.",
      },
      {
        name: "label",
        type: "string",
        required: true,
        description: "Metric label displayed above the value.",
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "Secondary text — typically comparison period.",
      },
      {
        name: "trend",
        type: "'up' | 'down' | 'neutral'",
        required: false,
        description: "Trend direction — controls icon and color.",
      },
      {
        name: "trendValue",
        type: "string",
        required: false,
        description: "Trend value text (e.g. '+12.5%').",
      },
      {
        name: "upIsGood",
        type: "boolean",
        required: false,
        defaultValue: "true",
        description:
          "Whether 'up' trend is positive (green). Set false for metrics like error rate or churn.",
      },
      {
        name: "icon",
        type: "string",
        required: false,
        description: "Lucide icon name for the header.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        required: false,
        defaultValue: "'md'",
        description: "Size variant — controls padding and value font size.",
      },
      {
        name: "loading",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Show skeleton loading state.",
      },
      {
        name: "onClick",
        type: "() => void",
        required: false,
        description: "Click handler — makes card interactive with button semantics.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes.",
      },
      { name: "style", type: "CSSProperties", required: false, description: "Inline styles." },
    ],
    guidelines: [
      {
        type: "do",
        text: "Use upIsGood={false} for metrics where increase is negative (churn, errors, latency).",
      },
      {
        type: "do",
        text: "Include description for comparison context ('vs last month', 'daily average').",
      },
      {
        type: "dont",
        text: "Don't hardcode trend colors — let the upIsGood flag control semantics.",
      },
      { type: "dont", text: "Don't use onClick for navigation-only — wrap in a Link if routing." },
      {
        type: "info",
        text: "Loading skeleton shows three pulsing bars matching the layout of label, value, and trend.",
      },
    ],
  },
};

// ── Exported registry slice ──
export const contentPatterns: Record<string, PatternEntry> = {
  "content/filter-chip-group": filterChipGroupEntry,
  "content/timeline": timelineEntry,
  "content/section-header": sectionHeaderEntry,
  "content/kpi-card": kpiCardEntry,
};
