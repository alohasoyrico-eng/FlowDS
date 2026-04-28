/**
 * FLOW - Display Domain Registry
 * Component metadata, demos, and developer guides for display components.
 */
import React from "react";
import {
  FlowAvatar,
  FlowBadge,
  FlowCard,
  FlowChip,
  FlowKPITrendIndicator,
  FlowList,
  FlowListItem,
  FlowTag,
} from "@flow/design-system";
import type { ComponentEntry } from "../types";
import {
  FlowAvatarOverview,
  FlowAvatarVariants,
  FlowBadgeOverview,
  FlowBadgeVariants,
  FlowCardOverview,
  FlowCardVariants,
  FlowChipOverview,
  FlowChipVariants,
  FlowKPITrendIndicatorOverview,
  FlowKPITrendIndicatorVariants,
  FlowListOverview,
  FlowListVariants,
  FlowTableOverview,
  FlowTableVariants,
  FlowTagOverview,
  FlowTagVariants,
  FlowTreeViewOverview,
  FlowTreeViewVariants,
} from "./demos";

export const DISPLAY_REGISTRY: Record<string, ComponentEntry> = {
  // ─── FlowList ───
  "display/flow-list": {
    domain: "Display",
    spec: {
      name: "FlowList",
      purpose:
        "Semantic list container with optional dividers. Composes FlowListItem children to create structured vertical lists with support for multi-line text, leading/trailing elements, and interactive selection. Uses semantic <ul> and <li> for accessibility.",
      platform: "shared",
      anatomy: [
        {
          part: "List container",
          description: "Semantic <ul> element with role='list' and optional aria-label",
          tokens: ["comp.list.padding", "comp.list.gap"],
        },
        {
          part: "List items",
          description: "FlowListItem children — can be static or interactive",
          tokens: [],
        },
        {
          part: "Dividers (optional)",
          description: "Horizontal lines between list items",
          tokens: ["comp.list.divider-color", "comp.list.divider-width"],
        },
      ],
      variants: ["Without dividers", "With dividers"],
      states: ["default"],
      accessibility: {
        handled: [
          "Semantic <ul> element with role='list'",
          "Optional aria-label for screen reader context",
          "FlowListItem provides interactive states and keyboard support",
        ],
        required: ["Provide aria-label when list purpose is not obvious from surrounding context"],
        keyboard: [
          { key: "Tab", action: "Navigate between interactive list items" },
          { key: "Enter / Space", action: "Activate selected item" },
        ],
        wcag: ["2.1.1", "4.1.2"],
      },
    },
    demos: {
      overview: () => <FlowListOverview />,
      variants: () => <FlowListVariants />,
    },
    developer: {
      reactImport: `import { FlowList, FlowListItem } from "@flow/design-system";`,
      reactUsage: `// Basic list
<FlowList>
  <FlowListItem primary="Home" />
  <FlowListItem primary="Settings" />
  <FlowListItem primary="Profile" />
</FlowList>

// With dividers
<FlowList dividers>
  <FlowListItem primary="Inbox" />
  <FlowListItem primary="Drafts" />
  <FlowListItem primary="Sent" />
</FlowList>

// Multi-line items
<FlowList dividers>
  <FlowListItem
    primary="Jane Cooper"
    secondary="Product Designer"
    tertiary="San Francisco, CA"
  />
  <FlowListItem
    primary="Wade Warren"
    secondary="Software Engineer"
  />
</FlowList>

// With leading elements
<FlowList dividers>
  <FlowListItem
    leading={<FlowIcon name="home" />}
    primary="Home"
    secondary="Main dashboard"
  />
  <FlowListItem
    leading={<FlowIcon name="settings" />}
    primary="Settings"
  />
</FlowList>

// Interactive list
const [selected, setSelected] = useState(null);

<FlowList dividers>
  {items.map((item) => (
    <FlowListItem
      key={item.id}
      primary={item.name}
      secondary={item.description}
      interactive
      selected={selected === item.id}
      onClick={() => setSelected(item.id)}
    />
  ))}
</FlowList>

// With trailing elements
<FlowList dividers>
  <FlowListItem
    primary="Storage"
    secondary="8.3 GB of 15 GB used"
    trailing={<Text>55%</Text>}
  />
  <FlowListItem
    primary="Updates"
    trailing={<FlowIcon name="chevron-right" />}
  />
</FlowList>`,
      flutterImport: `import 'package:flow_ds/display.dart';`,
      flutterUsage: `FlowList(
  dividers: true,
  children: [
    FlowListItem(
      primary: Text('Home'),
      secondary: Text('Main dashboard'),
    ),
    FlowListItem(
      primary: Text('Settings'),
    ),
  ],
)

// Interactive list
FlowList(
  children: items.map((item) => FlowListItem(
    primary: Text(item.name),
    interactive: true,
    selected: selected == item.id,
    onTap: () => setState(() => selected = item.id),
  )).toList(),
)`,
      notes:
        "FlowList is a semantic list container that composes FlowListItem children. Use dividers for visual separation between items. FlowListItem supports up to 3 lines of text (primary, secondary, tertiary) plus leading and trailing elements. Interactive lists support selection, hover, and keyboard navigation. Always provide descriptive primary text for accessibility.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          description: "FlowListItem children (or any ReactNode).",
          required: true,
        },
        {
          name: "dividers",
          type: "boolean",
          default: "false",
          description: "Shows horizontal dividers between list items.",
        },
        {
          name: "aria-label",
          type: "string",
          description:
            "Accessible label for the list. Recommended when list purpose is not obvious.",
          required: false,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes on <ul>.",
          required: false,
        },
        {
          name: "style",
          type: "CSSProperties",
          description: "Inline styles on <ul>.",
          required: false,
        },
      ],
      guidelines: [
        { intent: "do", text: "Use FlowList for structured vertical lists of items." },
        { intent: "do", text: "Use dividers when items need clear visual separation." },
        { intent: "do", text: "Provide aria-label when list purpose is not obvious from context." },
        {
          intent: "dont",
          text: "Don't use FlowList for navigation menus — use FlowNavigationMenu instead.",
        },
        {
          intent: "dont",
          text: "Don't nest lists deeply — it creates confusing UX and screen reader navigation.",
        },
        {
          intent: "info",
          text: "FlowList uses semantic <ul> and FlowListItem uses <li> for proper HTML structure.",
        },
        {
          intent: "info",
          text: "Dividers are inserted as <li> elements with role='none' to maintain semantic structure.",
        },
        {
          intent: "info",
          text: "FlowListItem handles interactive states, selection, and keyboard navigation independently.",
        },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(
          FlowList,
          { dividers: !!props.dividers } as React.ComponentProps<typeof FlowList>,
          React.createElement(FlowListItem, { primary: "Inbox", secondary: "12 unread messages" }),
          React.createElement(FlowListItem, { primary: "Drafts", secondary: "3 drafts" }),
          React.createElement(FlowListItem, { primary: "Sent", secondary: "Last sent today" }),
        ),
      defaults: { dividers: true },
      excludeControls: ["children", "aria-label", "className", "style"],
    },
  },

  // ─── FlowChip ───
  "display/flow-chip": {
    domain: "Display",
    spec: {
      name: "FlowChip",
      purpose:
        "Pill-shaped interactive label for filters, tags, and selections. Supports seven visual variants, four sizes, removable (×) button, selected state, and disabled state. Renders as <button> when interactive (onClick provided), otherwise <span>.",
      platform: "shared",
      anatomy: [
        {
          part: "Chip container",
          description: "Pill-shaped wrapper — <button> if interactive, <span> otherwise",
          tokens: [
            "comp.chip.bg",
            "comp.chip.text",
            "comp.chip.border",
            "comp.chip.radius",
            "comp.chip.padding",
            "comp.chip.height",
          ],
        },
        {
          part: "Chip label",
          description: "Text content — inherits font size and color from container",
          tokens: ["comp.chip.font-size", "comp.chip.font-weight"],
        },
        {
          part: "Remove button",
          description: "Optional × button shown when removable={true}",
          tokens: ["comp.chip.remove-size", "comp.chip.remove-gap"],
        },
      ],
      variants: ["Default", "Accent", "Success", "Warning", "Danger", "Outlined", "Tonal"],
      states: ["default", "hover", "focus-visible", "pressed", "selected", "disabled"],
      accessibility: {
        handled: [
          "Renders <button> when interactive (onClick provided)",
          "Renders <span> when non-interactive",
          "Selected state adds aria-selected='true'",
          "Remove button includes aria-label='Remove'",
          "Focus ring for keyboard navigation",
        ],
        required: ["Provide descriptive children text for chip label"],
        keyboard: [
          { key: "Tab", action: "Focus interactive chip" },
          { key: "Enter / Space", action: "Activate" },
          { key: "Tab", action: "Focus remove button" },
          { key: "Enter / Space", action: "Remove" },
        ],
        wcag: ["2.1.1", "4.1.2"],
      },
    },
    demos: {
      overview: () => <FlowChipOverview />,
      variants: () => <FlowChipVariants />,
    },
    developer: {
      reactImport: `import { FlowChip } from "@flow/design-system";`,
      reactUsage: `// Basic chip (non-interactive)
<FlowChip>Label</FlowChip>

// All variants
<FlowChip variant="filled">Default</FlowChip>
<FlowChip variant="filled" status="info">Accent</FlowChip>
<FlowChip variant="filled" status="success">Success</FlowChip>
<FlowChip variant="filled" status="warning">Warning</FlowChip>
<FlowChip variant="filled" status="error">Danger</FlowChip>
<FlowChip variant="outlined">Outlined</FlowChip>
<FlowChip variant="tonal">Tonal</FlowChip>

// All sizes
<FlowChip size="sm">Small</FlowChip>
<FlowChip size="md">Medium</FlowChip>
<FlowChip size="lg">Large</FlowChip>
<FlowChip size="xl">Extra Large</FlowChip>

// Interactive (filter pattern)
const [selected, setSelected] = useState("all");

<Inline gap={2}>
  {["All", "Active", "Pending"].map((filter) => (
    <FlowChip
      key={filter}
      onClick={() => setSelected(filter)}
      selected={selected === filter}
    >
      {filter}
    </FlowChip>
  ))}
</Inline>

// Removable chips (tag pattern)
const [tags, setTags] = useState(["React", "TypeScript", "CSS"]);

<Inline gap={2}>
  {tags.map((tag) => (
    <FlowChip
      key={tag}
      variant="tonal"
      removable
      onRemove={() => setTags(tags.filter((t) => t !== tag))}
    >
      {tag}
    </FlowChip>
  ))}
</Inline>

// Disabled
<FlowChip disabled>Disabled</FlowChip>`,
      flutterImport: `import 'package:flow_ds/display.dart';`,
      flutterUsage: `FlowChip(
  label: 'Label',
  variant: ChipVariant.accent,
)

// Interactive
FlowChip(
  label: 'Filter',
  selected: selected == 'filter',
  onPressed: () => setState(() => selected = 'filter'),
)

// Removable
FlowChip(
  label: 'Tag',
  removable: true,
  onRemove: () => removeTag(),
)`,
      notes:
        "FlowChip is versatile — use for filters (selected state), dismissible tags (removable), or static labels (no interaction). Interactive chips render as <button> for accessibility. The selected state shows filled background. Removable chips show × button on hover/focus. Variant colors convey semantic meaning: success for positive, danger for negative, warning for caution.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          description: "Chip label text. Required for accessibility and UX.",
          required: true,
        },
        {
          name: "variant",
          type: '"default" | "accent" | "success" | "warning" | "danger" | "outlined" | "tonal"',
          default: '"default"',
          description: "Visual variant — controls background and text color.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"md" (density-aware)',
          description: "Size variant — controls height, padding, and font size.",
        },
        {
          name: "onClick",
          type: "() => void",
          description: "Click handler. Makes chip interactive (renders as <button>).",
          required: false,
        },
        {
          name: "selected",
          type: "boolean",
          default: "false",
          description: "Selected state — shows filled background and adds aria-selected.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables interaction and reduces opacity.",
        },
        {
          name: "removable",
          type: "boolean",
          default: "false",
          description: "Shows × remove button on hover/focus when not disabled.",
        },
        {
          name: "onRemove",
          type: "() => void",
          description: "Callback when remove button is clicked. Only works if removable={true}.",
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
        { intent: "do", text: "Use chips for filters, tags, and multi-select inputs." },
        {
          intent: "do",
          text: "Use variant colors to convey semantic meaning (success, warning, danger).",
        },
        { intent: "do", text: "Use removable chips for dismissible tags or filters." },
        { intent: "do", text: "Keep chip labels concise (1-3 words max)." },
        { intent: "dont", text: "Don't use chips for primary actions — use FlowButton instead." },
        {
          intent: "dont",
          text: "Don't use too many variant colors in one group — it creates visual noise.",
        },
        {
          intent: "info",
          text: "Interactive chips (with onClick) render as <button> for accessibility.",
        },
        { intent: "info", text: "Selected state uses aria-selected for screen readers." },
        {
          intent: "info",
          text: "Removable chips show × button only when hovered/focused and not disabled.",
        },
        {
          intent: "info",
          text: "Density-aware: height (24/32/40px), padding, font size shift ±1 step in compact/comfortable.",
        },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(
          FlowChip,
          {
            variant: props.variant,
            size: props.size,
            removable: !!props.removable,
          } as React.ComponentProps<typeof FlowChip>,
          String(props.children ?? "Chip label"),
        ),
      defaults: { children: "Chip label", variant: "default", size: "md", removable: false },
    },
  },

  // ─── FlowTag ───
  "display/flow-tag": {
    domain: "Display",
    spec: {
      name: "FlowTag",
      purpose:
        "Non-interactive semantic label with two-axis API: variant (label | code) controls typography and shape, status (neutral | info | success | warning | error) controls semantic color. Purely presentational <span>. Use FlowChip for interactive labels and filters.",
      platform: "shared",
      anatomy: [
        {
          part: "Tag container",
          description: "Inline <span> element with background, border, and radius",
          tokens: [
            "comp.tag.bg",
            "comp.tag.text",
            "comp.tag.border",
            "comp.tag.radius",
            "comp.tag.padding",
            "comp.tag.height",
          ],
        },
        {
          part: "Tag text",
          description: "Text content — inherits font size and weight from container",
          tokens: ["comp.tag.font-size", "comp.tag.font-weight"],
        },
      ],
      variants: ["Label (sans-serif, default)", "Code (monospace)"],
      states: ["neutral", "info", "success", "warning", "error"],
      accessibility: {
        handled: ["Semantic <span> element", "Text content readable by screen readers"],
        required: [
          "Ensure tag meaning is clear from text content",
          "Don't rely solely on color to convey meaning",
        ],
        keyboard: [],
        wcag: ["2.1.1", "4.1.2"],
      },
    },
    demos: {
      overview: () => <FlowTagOverview />,
      variants: () => <FlowTagVariants />,
    },
    developer: {
      reactImport: `import { FlowTag } from "@flow/design-system";`,
      reactUsage: `// Basic tag (label variant, neutral status)
<FlowTag>Label</FlowTag>

// Variant × Status matrix
<FlowTag status="info">Info</FlowTag>
<FlowTag status="success">Active</FlowTag>
<FlowTag status="warning">Pending</FlowTag>
<FlowTag status="error">Failed</FlowTag>

// Code variant
<FlowTag variant="code">npm install</FlowTag>

// Code × Status — semantic code labels
<FlowTag variant="code" status="success">200 OK</FlowTag>
<FlowTag variant="code" status="error">500 Error</FlowTag>

// All sizes
<FlowTag size="sm">Small</FlowTag>
<FlowTag size="md">Medium</FlowTag>
<FlowTag size="lg">Large</FlowTag>
<FlowTag size="xl">Extra Large</FlowTag>

// In context
<Text>
  Status: <FlowTag status="success">Deployed</FlowTag>
</Text>`,
      flutterImport: `import 'package:flow_ds/display.dart';`,
      flutterUsage: `FlowTag(
  label: 'Active',
  status: TagStatus.success,
)

FlowTag(
  label: 'npm install',
  variant: TagVariant.code,
  status: TagStatus.error,
  size: TagSize.sm,
)`,
      notes:
        "FlowTag uses a two-axis model: variant controls shape/typography (label = sans-serif, code = monospace), status controls semantic color (neutral, info, success, warning, error). Both axes are independent — code tags can have status colors too. No hover, focus, or click behavior. For interactive labels, use FlowChip.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          description: "Tag label text. Required for display.",
          required: true,
        },
        {
          name: "variant",
          type: '"label" | "code"',
          default: '"label"',
          description: "Structural variant — label (sans-serif) or code (monospace).",
        },
        {
          name: "status",
          type: '"neutral" | "info" | "success" | "warning" | "error"',
          default: '"neutral"',
          description: "Semantic status color. Independent of variant.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"md" (density-aware)',
          description: "Size variant — controls height, padding, and font size.",
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
        { intent: "do", text: "Use tags for static labels like status, categories, and metadata." },
        {
          intent: "do",
          text: "Use variant colors to convey semantic meaning (success, warning, danger).",
        },
        { intent: "do", text: "Use 'code' variant for inline code snippets or technical labels." },
        { intent: "do", text: "Keep tag text concise (1-2 words max)." },
        { intent: "dont", text: "Don't use tags for interactive elements — use FlowChip instead." },
        {
          intent: "dont",
          text: "Don't rely solely on color to convey meaning — use descriptive text.",
        },
        { intent: "info", text: "FlowTag is a semantic <span> with no interaction states." },
        { intent: "info", text: "The 'code' variant uses monospace font family." },
        { intent: "info", text: "Tags are inline elements — they flow with surrounding text." },
        {
          intent: "info",
          text: "Density-aware: height (18/24/30px), padding, font size shift ±1 step in compact/comfortable.",
        },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(FlowTag, {
          status: props.status,
          size: props.size,
          variant: props.variant,
          children: props.children ?? "Tag Label",
        } as React.ComponentProps<typeof FlowTag>),
      defaults: {
        children: "Tag Label",
        status: "info",
        size: "md",
        variant: "label",
      },
    },
  },

  // ─── FlowBadge ───
  "display/flow-badge": {
    domain: "Display",
    spec: {
      name: "FlowBadge",
      purpose:
        "Notification indicator that overlays a parent element (icon, button, avatar). Shows counts, status dots, or custom content. Automatically positions in top-right corner or can be used standalone. Supports max count (99+), five color variants, and hidden state.",
      platform: "shared",
      anatomy: [
        {
          part: "Badge wrapper (optional)",
          description: "Relative positioning wrapper for parent element + badge",
          tokens: [],
        },
        {
          part: "Badge container",
          description: "Absolute-positioned badge — circular for dot, rounded for count",
          tokens: [
            "comp.badge.bg",
            "comp.badge.text",
            "comp.badge.radius",
            "comp.badge.padding",
            "comp.badge.size",
          ],
        },
        {
          part: "Badge content",
          description: "Number, text, or empty (for dot variant)",
          tokens: ["comp.badge.font-size", "comp.badge.font-weight"],
        },
      ],
      variants: ["Count", "Dot"],
      states: ["visible", "hidden"],
      accessibility: {
        handled: [
          "Badge content is readable by screen readers",
          "Hidden badges use data-hidden for CSS hiding",
        ],
        required: [
          "Ensure parent element (button, icon) has descriptive aria-label including badge content",
          "Don't rely solely on badge for critical information",
        ],
        keyboard: [],
        wcag: ["1.1.1"],
      },
    },
    demos: {
      overview: () => <FlowBadgeOverview />,
      variants: () => <FlowBadgeVariants />,
    },
    developer: {
      reactImport: `import { FlowBadge } from "@flow/design-system";`,
      reactUsage: `// Basic badge
<FlowBadge content={5}>
  <FlowIcon name="bell" />
</FlowBadge>

// Dot variant
<FlowBadge variant="dot">
  <FlowIcon name="mail" />
</FlowBadge>

// All colors
<FlowBadge content={3} status="neutral"><FlowIcon name="bell" /></FlowBadge>
<FlowBadge content={3} status="info"><FlowIcon name="bell" /></FlowBadge>
<FlowBadge content={3} status="success"><FlowIcon name="bell" /></FlowBadge>
<FlowBadge content={3} status="warning"><FlowIcon name="bell" /></FlowBadge>
<FlowBadge content={3} status="error"><FlowIcon name="bell" /></FlowBadge>

// Max count (shows "99+" when exceeded)
<FlowBadge content={150}>
  <FlowIcon name="message-circle" />
</FlowBadge>

// Custom max
<FlowBadge content={1000} max={999}>
  <FlowIcon name="star" />
</FlowBadge>

// Hidden (auto-hides when content is 0 or via hidden prop)
<FlowBadge content={0}>
  <FlowIcon name="bell" />
</FlowBadge>

<FlowBadge content={5} hidden>
  <FlowIcon name="bell" />
</FlowBadge>

// Standalone (no wrapper, no positioning)
<FlowBadge content={12} standalone />
<FlowBadge variant="dot" status="success" standalone />

// With button (ensure aria-label includes count)
<button aria-label="Notifications, 5 unread">
  <FlowBadge content={5} status="error">
    <FlowIcon name="bell" />
  </FlowBadge>
</button>`,
      flutterImport: `import 'package:flow_ds/display.dart';`,
      flutterUsage: `FlowBadge(
  content: 5,
  child: Icon(Icons.notifications),
)

// Dot variant
FlowBadge(
  variant: BadgeVariant.dot,
  color: BadgeColor.success,
  child: Icon(Icons.mail),
)

// With max count
FlowBadge(
  content: 150,
  max: 99,
  child: Icon(Icons.message),
)

// Standalone
FlowBadge(
  content: 12,
  standalone: true,
)`,
      notes:
        "FlowBadge overlays a parent element (icon, button, avatar) to show notifications, status, or counts. Use 'count' variant for numeric indicators, 'dot' for simple presence indicators. The badge automatically hides when content is 0. Max count defaults to 99 (shows '99+' when exceeded). Always include badge information in parent element's aria-label for accessibility. Standalone badges can be used without a wrapper for inline display.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          description:
            "Parent element to overlay badge on (icon, button, avatar). Omit for standalone.",
          required: false,
        },
        {
          name: "content",
          type: "ReactNode",
          description:
            "Badge content — number, text, or custom ReactNode. Ignored for dot variant.",
          required: false,
        },
        {
          name: "variant",
          type: '"count" | "dot"',
          default: '"count"',
          description: "Badge type — count shows content, dot shows small indicator.",
        },
        {
          name: "color",
          type: '"default" | "accent" | "success" | "warning" | "danger"',
          default: '"default"',
          description: "Color variant — controls background color.",
        },
        {
          name: "max",
          type: "number",
          default: "99",
          description: "Max count — shows '{max}+' when content exceeds this value.",
        },
        {
          name: "hidden",
          type: "boolean",
          default: "false",
          description: "Hides badge via CSS. Badge also auto-hides when content is 0.",
        },
        {
          name: "standalone",
          type: "boolean",
          default: "false",
          description: "Renders badge without wrapper — no absolute positioning.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes on badge.",
          required: false,
        },
        {
          name: "style",
          type: "CSSProperties",
          description: "Inline styles on badge.",
          required: false,
        },
      ],
      guidelines: [
        {
          intent: "do",
          text: "Use badges for notification counts, status indicators, and presence dots.",
        },
        {
          intent: "do",
          text: "Include badge content in parent element's aria-label (e.g., 'Notifications, 5 unread').",
        },
        {
          intent: "do",
          text: "Use color variants to convey semantic meaning (danger for alerts, success for completed).",
        },
        {
          intent: "do",
          text: "Use dot variant for simple presence indicators (online status, new items).",
        },
        {
          intent: "dont",
          text: "Don't use badges for critical information — they're easy to miss.",
        },
        {
          intent: "dont",
          text: "Don't use badges on small elements where they might overlap content.",
        },
        { intent: "dont", text: "Don't use standalone badges as replacements for chips or tags." },
        { intent: "info", text: "Badges use absolute positioning within a relative wrapper." },
        {
          intent: "info",
          text: "Badges auto-hide when content is 0 (unless hidden={false} is explicit).",
        },
        {
          intent: "info",
          text: "Max count defaults to 99 — customize with max prop for different thresholds.",
        },
        { intent: "info", text: "Standalone badges render inline without positioning wrapper." },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(FlowBadge, {
          content: props.count || 5,
          variant: props.variant,
          size: props.size,
          max: props.max,
          standalone: true,
        } as unknown as React.ComponentProps<typeof FlowBadge>),
      defaults: { count: 5, variant: "count", size: "md" },
    },
  },

  // ─── FlowCard ───
  "display/flow-card": {
    domain: "Display",
    spec: {
      name: "FlowCard",
      purpose:
        "Contained surface for grouping related content. Establishes hierarchy through elevation, can be interactive (clickable) or static (informational). Supports three visual variants (elevated, outlined, filled) and optional hover/press states when interactive.",
      platform: "shared",
      anatomy: [
        {
          part: "Card surface",
          description: "Container with background, border, radius, and optional shadow",
          tokens: [
            "comp.card.bg",
            "comp.card.border",
            "comp.card.radius",
            "comp.card.shadow",
            "comp.card.padding",
          ],
        },
        {
          part: "Content wrapper",
          description: "Children rendered within card — can be any ReactNode",
          tokens: [],
        },
      ],
      variants: [
        "Elevated (with shadow)",
        "Outlined (with border)",
        "Filled (solid background)",
        "Interactive (clickable)",
      ],
      states: ["default", "hover", "focus-visible", "pressed", "selected", "disabled"],
      accessibility: {
        handled: [
          "Interactive cards render as <button> or <a> for proper semantics",
          "Static cards use <div> with appropriate ARIA role",
          "Focus ring visible for keyboard navigation",
          "aria-pressed for toggle states",
        ],
        required: [
          "Provide aria-label for interactive cards without visible text",
          "Use semantic HTML (article, section) when appropriate",
        ],
        keyboard: [
          { key: "Tab", action: "Focus interactive card" },
          { key: "Enter / Space", action: "Activate" },
        ],
        wcag: ["2.1.1", "4.1.2"],
      },
    },
    demos: {
      overview: () => <FlowCardOverview />,
      variants: () => <FlowCardVariants />,
    },
    developer: {
      reactImport: `import { FlowCard } from "@flow/design-system";`,
      reactUsage: `// Basic card
<FlowCard>
  <Text>Card content goes here</Text>
</FlowCard>

// Elevated (default)
<FlowCard variant="elevated">
  <Stack gap={2}>
    <Text variant="h3">Card Title</Text>
    <Text>Card description</Text>
  </Stack>
</FlowCard>

// Outlined
<FlowCard variant="outlined">
  <Text>Outlined card with border</Text>
</FlowCard>

// Filled
<FlowCard variant="filled">
  <Text>Filled card with solid background</Text>
</FlowCard>

// Interactive (clickable)
<FlowCard interactive onClick={() => console.log('clicked')}>
  <Stack gap={2}>
    <Text variant="h3">Clickable Card</Text>
    <Text>Click anywhere on this card</Text>
  </Stack>
</FlowCard>

// Selected state
<FlowCard interactive selected>
  <Text>Selected card</Text>
</FlowCard>

// With custom padding
<FlowCard padding="lg">
  <Text>Card with large padding</Text>
</FlowCard>`,
      flutterImport: `import 'package:flow_ds/display.dart';`,
      flutterUsage: `FlowCard(
  child: Text('Card content'),
)

// Interactive
FlowCard(
  interactive: true,
  onTap: () => print('tapped'),
  child: Text('Clickable card'),
)`,
      notes:
        "FlowCard provides elevation hierarchy through three visual variants. Use elevated for primary content cards, outlined for secondary/subtle cards, filled for background-colored cards. Interactive cards show hover/press states and render as semantic buttons or links. Padding can be customized via size prop (sm, md, lg, xl) for different content densities.",
      props: [
        { name: "children", type: "ReactNode", description: "Card content.", required: true },
        {
          name: "variant",
          type: '"elevated" | "outlined" | "filled"',
          default: '"elevated"',
          description:
            "Visual style — elevated has shadow, outlined has border, filled has solid bg.",
        },
        {
          name: "interactive",
          type: "boolean",
          default: "false",
          description: "Makes card clickable with hover/press states. Renders as <button> or <a>.",
        },
        {
          name: "onClick",
          type: "() => void",
          description: "Click handler. Sets interactive={true} automatically.",
          required: false,
        },
        {
          name: "href",
          type: "string",
          description: "Link URL. Renders card as <a> tag.",
          required: false,
        },
        {
          name: "selected",
          type: "boolean",
          default: "false",
          description: "Selected state for interactive cards.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables interaction (only for interactive cards).",
        },
        {
          name: "padding",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description: "Inner padding size.",
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
        {
          intent: "do",
          text: "Use cards to group related content (user profiles, product listings, articles).",
        },
        {
          intent: "do",
          text: "Use elevated variant for primary content, outlined for secondary content.",
        },
        {
          intent: "do",
          text: "Make entire card interactive if the whole card is clickable — not just a button inside.",
        },
        {
          intent: "dont",
          text: "Don't nest interactive cards — it creates confusing focus/click targets.",
        },
        {
          intent: "dont",
          text: "Don't use cards for simple text content — use Stack or Box instead.",
        },
        {
          intent: "info",
          text: "Interactive cards use ActionSurface for consistent state handling.",
        },
        {
          intent: "info",
          text: "Cards use semantic HTML: <article> for content cards, <button>/<a> for interactive.",
        },
        {
          intent: "info",
          text: "Density-aware: padding shifts ±4-8px in compact/comfortable modes.",
        },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(FlowCard, {
          elevation: props.elevation,
          padding: props.padding,
          children: React.createElement(
            "div",
            { style: { padding: "16px" } },
            String(props.children ?? "Card content"),
          ),
        } as React.ComponentProps<typeof FlowCard>),
      defaults: { children: "Card content", elevation: 1 },
    },
  },

  // ─── FlowAvatar ───
  "display/flow-avatar": {
    domain: "Display",
    spec: {
      name: "FlowAvatar",
      purpose:
        "Represents user or entity with image, initials, or placeholder icon. Single identity unit. Supports four sizes, three visual variants (image, initials, icon), optional status badge, and loading skeleton state.",
      platform: "shared",
      anatomy: [
        {
          part: "Avatar container",
          description: "Circular wrapper with background and overflow hidden",
          tokens: ["comp.avatar.size", "comp.avatar.bg", "comp.avatar.text"],
        },
        {
          part: "Image/Initials/Icon",
          description: "Visual content — img tag, text, or icon component",
          tokens: ["comp.avatar.font-size"],
        },
        {
          part: "Status badge (optional)",
          description: "Small indicator dot for online/offline/busy status",
          tokens: ["comp.avatar.badge-size", "comp.avatar.badge-color"],
        },
      ],
      variants: ["Image", "Initials", "Placeholder icon"],
      states: ["default", "loading (skeleton)"],
      accessibility: {
        handled: [
          "img tags have alt text describing user",
          "Initials have aria-label with full name",
          "Status badge has aria-label describing status",
        ],
        required: ["Provide alt text for images", "Provide full name for initials variant"],
        keyboard: [],
        wcag: ["1.1.1"],
      },
    },
    demos: {
      overview: () => <FlowAvatarOverview />,
      variants: () => <FlowAvatarVariants />,
    },
    developer: {
      reactImport: `import { FlowAvatar } from "@flow/design-system";`,
      reactUsage: `// Image avatar
<FlowAvatar src="/user.jpg" alt="John Doe" />

// Initials
<FlowAvatar initials="JD" alt="John Doe" />

// Placeholder icon
<FlowAvatar />

// All sizes
<FlowAvatar size="sm" initials="JD" />
<FlowAvatar size="md" initials="JD" />
<FlowAvatar size="lg" initials="JD" />
<FlowAvatar size="xl" initials="JD" />

// With status badge
<FlowAvatar
  src="/user.jpg"
  alt="John Doe"
  status="online"
/>

// Loading state
<FlowAvatar loading />`,
      flutterImport: `import 'package:flow_ds/display.dart';`,
      flutterUsage: `FlowAvatar(
  imageUrl: '/user.jpg',
  alt: 'John Doe',
)

// Initials
FlowAvatar(
  initials: 'JD',
  alt: 'John Doe',
)`,
      notes:
        "FlowAvatar shows user identity in a consistent circular format. Image variant is preferred when available, initials as fallback, icon as last resort. Status badges show presence (online/offline/busy). The component handles image loading states automatically with skeleton placeholder.",
      props: [
        {
          name: "src",
          type: "string",
          description: "Image URL. Takes priority over initials/icon.",
          required: false,
        },
        {
          name: "alt",
          type: "string",
          description: "Alt text for image or full name for initials. Required for accessibility.",
          required: true,
        },
        {
          name: "initials",
          type: "string",
          description: "1-2 character initials (e.g., 'JD'). Used if no src provided.",
          required: false,
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description: "Avatar size (32/40/48/64px).",
        },
        {
          name: "status",
          type: '"online" | "offline" | "busy" | "away"',
          description: "Status badge indicator.",
          required: false,
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          description: "Shows skeleton loading state.",
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
        { intent: "do", text: "Always provide alt text for accessibility." },
        { intent: "do", text: "Use image > initials > icon priority for best UX." },
        {
          intent: "do",
          text: "Use status badges for presence indicators (chat, collaboration tools).",
        },
        {
          intent: "dont",
          text: "Don't use more than 2 characters for initials — it breaks the circular layout.",
        },
        { intent: "dont", text: "Don't use avatars smaller than 24px — they become hard to see." },
        {
          intent: "info",
          text: "Avatar automatically handles image loading states with skeleton.",
        },
        { intent: "info", text: "Initials are capitalized and centered automatically." },
        {
          intent: "info",
          text: "Status badge uses semantic colors: green (online), red (busy), gray (offline), yellow (away).",
        },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(FlowAvatar, {
          name: (props.name as string) || "Jane Doe",
          size: props.size,
          status: props.status,
        } as React.ComponentProps<typeof FlowAvatar>),
      defaults: {
        name: "Jane Doe",
        size: "md",
        status: "online",
      },
    },
  },

  // ─── FlowTable ───
  "display/flow-table": {
    domain: "Display",
    spec: {
      name: "FlowTable",
      purpose:
        "Pure presentational table — renders data in rows/columns with no interactivity. L3 base for DataTable patterns. Supports striped rows, hoverable rows, and caption for accessibility. Semantic HTML with proper ARIA roles.",
      platform: "shared",
      anatomy: [
        {
          part: "Table container",
          description: "Wrapper div for horizontal scroll on small screens",
          tokens: [],
        },
        {
          part: "Table element",
          description: "Semantic <table> with proper structure",
          tokens: ["comp.table.bg", "comp.table.border", "comp.table.cell-padding"],
        },
        {
          part: "Table header",
          description: "<thead> with column headers",
          tokens: ["comp.table.header-bg", "comp.table.header-text"],
        },
        {
          part: "Table body",
          description: "<tbody> with data rows",
          tokens: ["comp.table.row-hover", "comp.table.stripe-bg"],
        },
        {
          part: "Caption (optional)",
          description: "<caption> for table description",
          tokens: ["comp.table.caption"],
        },
      ],
      variants: ["Default", "Striped rows", "Hoverable rows", "With caption"],
      states: ["default", "hover (per row)"],
      accessibility: {
        handled: [
          "Semantic <table>, <thead>, <tbody>, <tr>, <th>, <td> structure",
          "role='table' for ARIA support",
          "Column headers use <th> with scope='col'",
          "Row headers use <th> with scope='row'",
          "Caption provides table summary for screen readers",
        ],
        required: [
          "Provide <caption> or aria-label for table description",
          "Use <th> for column headers with scope='col'",
        ],
        keyboard: [],
        wcag: ["2.1.1", "4.1.2"],
      },
    },
    demos: {
      overview: () => <FlowTableOverview />,
      variants: () => <FlowTableVariants />,
    },
    developer: {
      reactImport: `import { FlowTable } from "@flow/design-system";`,
      reactUsage: `// Basic table
<FlowTable>
  <caption>User List</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>john@example.com</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td>Jane Smith</td>
      <td>jane@example.com</td>
      <td>User</td>
    </tr>
  </tbody>
</FlowTable>

// Striped rows
<FlowTable striped>
  {/* ... */}
</FlowTable>

// Hoverable rows
<FlowTable hoverable>
  {/* ... */}
</FlowTable>

// Responsive (horizontal scroll)
<FlowTable responsive>
  {/* ... */}
</FlowTable>`,
      flutterImport: `import 'package:flow_ds/display.dart';`,
      flutterUsage: `FlowTable(
  columns: ['Name', 'Email', 'Role'],
  rows: [
    ['John Doe', 'john@example.com', 'Admin'],
    ['Jane Smith', 'jane@example.com', 'User'],
  ],
)`,
      notes:
        "FlowTable is a presentational component — no sorting, filtering, or pagination. Use DataTable pattern (L4) for interactive tables. FlowTable handles responsive layout via horizontal scroll on small screens. Always include <caption> or aria-label for accessibility.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          description: "Table content — <caption>, <thead>, <tbody>, etc.",
          required: true,
        },
        {
          name: "striped",
          type: "boolean",
          default: "false",
          description: "Alternating row background colors for easier scanning.",
        },
        {
          name: "hoverable",
          type: "boolean",
          default: "false",
          description: "Highlight rows on hover.",
        },
        {
          name: "responsive",
          type: "boolean",
          default: "true",
          description: "Enables horizontal scroll on small screens.",
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
        { intent: "do", text: "Use semantic HTML: <table>, <thead>, <tbody>, <tr>, <th>, <td>." },
        { intent: "do", text: "Provide <caption> or aria-label describing table purpose." },
        { intent: "do", text: "Use <th> for column headers with scope='col'." },
        {
          intent: "do",
          text: "Use striped or hoverable for tables with many rows (easier scanning).",
        },
        { intent: "dont", text: "Don't use tables for layout — use Stack/Inline/Grid instead." },
        {
          intent: "dont",
          text: "Don't use FlowTable for interactive tables — use DataTable (L4) pattern instead.",
        },
        {
          intent: "info",
          text: "Responsive tables wrap in scrollable container on small screens.",
        },
        { intent: "info", text: "Striped rows use subtle background color for visual separation." },
        { intent: "info", text: "Hoverable rows help users track across wide tables." },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(
          "table",
          {
            className: "flow-table",
            "data-striped": !!props.striped || undefined,
            "data-hoverable": !!props.hoverable || undefined,
            style: { width: "100%" },
          },
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement("th", { scope: "col" }, "Name"),
              React.createElement("th", { scope: "col" }, "Role"),
              React.createElement("th", { scope: "col" }, "Status"),
            ),
          ),
          React.createElement(
            "tbody",
            null,
            React.createElement("tr", null, React.createElement("td", null, "Alice"), React.createElement("td", null, "Engineer"), React.createElement("td", null, "Active")),
            React.createElement("tr", null, React.createElement("td", null, "Bob"), React.createElement("td", null, "Designer"), React.createElement("td", null, "Away")),
            React.createElement("tr", null, React.createElement("td", null, "Carol"), React.createElement("td", null, "PM"), React.createElement("td", null, "Active")),
          ),
        ),
      defaults: { striped: false, hoverable: true },
      excludeControls: ["children", "responsive", "className", "style"],
    },
  },

  // ─── FlowKPITrendIndicator ───
  "display/flow-kpi-trend-indicator": {
    domain: "Display",
    spec: {
      name: "FlowKPITrendIndicator",
      purpose:
        "Compact trend direction display: up/down arrow with percentage change and semantic coloring (green for positive, red for negative). Used in dashboards, analytics, and KPI cards to show metric changes over time.",
      platform: "shared",
      anatomy: [
        {
          part: "Trend icon",
          description: "Arrow pointing up or down",
          tokens: ["comp.kpitrend.icon-size"],
        },
        {
          part: "Percentage text",
          description: "Numeric change value (e.g., +12.5%)",
          tokens: [
            "comp.kpitrend.text-size",
            "comp.kpitrend.color-positive",
            "comp.kpitrend.color-negative",
          ],
        },
        {
          part: "Period label (optional)",
          description: "Time period for trend (e.g., 'vs last month')",
          tokens: ["comp.kpitrend.label-size"],
        },
      ],
      variants: ["Positive (green up)", "Negative (red down)", "Neutral", "With period label"],
      states: ["default"],
      accessibility: {
        handled: [
          "aria-label includes direction and value for screen readers",
          "Color + icon + text convey trend (not color alone)",
        ],
        required: ["Provide descriptive aria-label (e.g., 'Up 12.5% from last month')"],
        keyboard: [],
        wcag: ["1.1.1"],
      },
    },
    demos: {
      overview: () => <FlowKPITrendIndicatorOverview />,
      variants: () => <FlowKPITrendIndicatorVariants />,
    },
    developer: {
      reactImport: `import { FlowKPITrendIndicator } from "@flow/design-system";`,
      reactUsage: `// Positive trend
<FlowKPITrendIndicator value={12.5} />

// Negative trend
<FlowKPITrendIndicator value={-8.2} />

// Neutral (zero change)
<FlowKPITrendIndicator value={0} />

// With period label
<FlowKPITrendIndicator
  value={15.3}
  period="vs last month"
/>

// Custom format
<FlowKPITrendIndicator
  value={245}
  format="number"
  label="+245 users"
/>

// In KPI card
<FlowCard>
  <Stack gap={1}>
    <Text variant="caption" color="secondary">Revenue</Text>
    <Text variant="h2">$45,230</Text>
    <FlowKPITrendIndicator value={12.5} period="vs last month" />
  </Stack>
</FlowCard>`,
      flutterImport: `import 'package:flow_ds/display.dart';`,
      flutterUsage: `FlowKPITrendIndicator(
  value: 12.5,
)

// With period
FlowKPITrendIndicator(
  value: -8.2,
  period: 'vs last month',
)`,
      notes:
        "FlowKPITrendIndicator uses semantic colors: green for positive trends, red for negative trends, neutral for zero change. The direction (up/down arrow) reinforces the trend visually. Use in dashboards, analytics, and KPI cards to show metric changes. Always include period context (vs last week/month/year) for clarity.",
      props: [
        {
          name: "value",
          type: "number",
          description: "Trend value. Positive = up/green, negative = down/red, zero = neutral.",
          required: true,
        },
        {
          name: "format",
          type: '"percentage" | "number"',
          default: '"percentage"',
          description: "Display format — percentage adds %, number shows raw value.",
        },
        {
          name: "period",
          type: "string",
          description: "Time period label (e.g., 'vs last month').",
          required: false,
        },
        {
          name: "invertColors",
          type: "boolean",
          default: "false",
          description: "Inverts semantic colors (e.g., red for positive when showing costs).",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: "Size variant — controls icon and text size.",
        },
        {
          name: "aria-label",
          type: "string",
          description: "Accessible label. Auto-generated if not provided.",
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
        { intent: "do", text: "Use in KPI cards and dashboards to show metric changes." },
        { intent: "do", text: "Include period context (vs last week/month/year) for clarity." },
        {
          intent: "do",
          text: "Use invertColors for metrics where decrease is positive (costs, errors).",
        },
        { intent: "dont", text: "Don't use for non-numeric or non-comparative data." },
        {
          intent: "dont",
          text: "Don't omit period context — trends are meaningless without timeframe.",
        },
        { intent: "info", text: "Positive trends use green color and up arrow by default." },
        { intent: "info", text: "Negative trends use red color and down arrow by default." },
        { intent: "info", text: "Zero change shows neutral color with no arrow." },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(FlowKPITrendIndicator, {
          value: (props.value as string) ?? "+12.5%",
          direction: props.direction as "up" | "down" | "neutral" | undefined,
          upIsGood: props.upIsGood !== false,
          label: props.label as string | undefined,
        } as React.ComponentProps<typeof FlowKPITrendIndicator>),
      defaults: { value: "+12.5%", direction: "up", upIsGood: true, label: "vs last month" },
      excludeControls: ["aria-label", "className", "style"],
    },
  },

  // ─── FlowTreeView ───
  "display/flow-tree-view": {
    domain: "Display",
    spec: {
      name: "FlowTreeView",
      purpose:
        "Hierarchical tree navigation for deep structures (file systems, org charts, nested categories). Supports single-select, multi-select (checkboxes), expandable/collapsible nodes, lazy-loading children, and keyboard navigation. Desktop-only component.",
      platform: "desktop",
      anatomy: [
        {
          part: "Tree container",
          description: "Wrapper with role='tree' for ARIA",
          tokens: ["comp.treeview.padding"],
        },
        {
          part: "Tree node",
          description: "Individual item with expand/collapse button, icon, label",
          tokens: [
            "comp.treeview.node-height",
            "comp.treeview.node-padding",
            "comp.treeview.indent",
          ],
        },
        {
          part: "Expand/collapse icon",
          description: "Chevron icon indicating expandable state",
          tokens: ["comp.treeview.chevron-size"],
        },
        {
          part: "Node icon (optional)",
          description: "Leading icon for file/folder/item type",
          tokens: ["comp.treeview.icon-size"],
        },
        {
          part: "Checkbox (optional)",
          description: "Multi-select checkbox for each node",
          tokens: [],
        },
      ],
      variants: [
        "Single-select",
        "Multi-select (checkboxes)",
        "With icons",
        "Lazy-loading children",
      ],
      states: ["default", "expanded", "selected", "loading-children"],
      accessibility: {
        handled: [
          "role='tree' on container",
          "role='treeitem' on nodes",
          "aria-expanded on expandable nodes",
          "aria-selected on selected nodes",
          "Arrow keys navigate tree structure",
        ],
        required: [
          "Provide descriptive labels for each tree node",
          "Ensure keyboard navigation works for all interactions",
        ],
        keyboard: [
          { key: "↑ ↓ Arrow keys", action: "Navigate between nodes" },
          { key: "→ Arrow Right", action: "Expand node (if collapsed)" },
          { key: "← Arrow Left", action: "Collapse node (if expanded) or move to parent" },
          { key: "Enter / Space", action: "Select node" },
          { key: "Home / End", action: "Jump to first/last node" },
        ],
        wcag: ["2.1.1", "4.1.2"],
      },
    },
    demos: {
      overview: () => <FlowTreeViewOverview />,
      variants: () => <FlowTreeViewVariants />,
    },
    developer: {
      reactImport: `import { FlowTreeView } from "@flow/design-system";`,
      reactUsage: `// Basic tree
const treeData = [
  {
    id: '1',
    label: 'Documents',
    children: [
      { id: '1-1', label: 'Work' },
      { id: '1-2', label: 'Personal' },
    ],
  },
  {
    id: '2',
    label: 'Photos',
    children: [
      { id: '2-1', label: '2023' },
      { id: '2-2', label: '2024' },
    ],
  },
];

<FlowTreeView
  data={treeData}
  onSelect={(nodeId) => console.log('Selected:', nodeId)}
/>

// Multi-select with checkboxes
<FlowTreeView
  data={treeData}
  multiSelect
  selectedIds={selectedIds}
  onSelectionChange={setSelectedIds}
/>

// With icons
const treeWithIcons = [
  {
    id: '1',
    label: 'Documents',
    icon: 'folder',
    children: [
      { id: '1-1', label: 'Work', icon: 'folder' },
      { id: '1-2', label: 'Report.pdf', icon: 'file-text' },
    ],
  },
];

<FlowTreeView data={treeWithIcons} showIcons />

// Lazy-loading children
<FlowTreeView
  data={rootNodes}
  onExpand={(nodeId) => loadChildren(nodeId)}
  loadChildren={async (nodeId) => await fetchChildren(nodeId)}
/>`,
      flutterImport: `import 'package:flow_ds/display.dart';`,
      flutterUsage: `FlowTreeView(
  data: treeData,
  onSelect: (nodeId) => print('Selected: $nodeId'),
)

// Multi-select
FlowTreeView(
  data: treeData,
  multiSelect: true,
  selectedIds: selectedIds,
  onSelectionChange: (ids) => setState(() => selectedIds = ids),
)`,
      notes:
        "FlowTreeView is desktop-only — use FlowList or FlowAccordion for mobile hierarchies. Supports single-select (default) or multi-select with checkboxes. Lazy-loading enables efficient rendering of large hierarchies. Keyboard navigation matches OS file browser conventions (arrows expand/collapse/navigate).",
      props: [
        {
          name: "data",
          type: "TreeNode[]",
          description: "Tree structure with id, label, children.",
          required: true,
        },
        {
          name: "multiSelect",
          type: "boolean",
          default: "false",
          description: "Enables multi-select with checkboxes.",
        },
        {
          name: "selectedIds",
          type: "string[]",
          description: "Controlled selected node IDs. Required for multi-select.",
          required: false,
        },
        {
          name: "onSelect",
          type: "(nodeId: string) => void",
          description: "Callback when node is selected (single-select mode).",
          required: false,
        },
        {
          name: "onSelectionChange",
          type: "(nodeIds: string[]) => void",
          description: "Callback when selection changes (multi-select mode).",
          required: false,
        },
        {
          name: "defaultExpandedIds",
          type: "string[]",
          description: "Initially expanded node IDs.",
          required: false,
        },
        {
          name: "showIcons",
          type: "boolean",
          default: "false",
          description: "Shows node icons if provided in data.",
        },
        {
          name: "loadChildren",
          type: "(nodeId: string) => Promise<TreeNode[]>",
          description: "Async function to load children on expand (lazy-loading).",
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
        {
          intent: "do",
          text: "Use for deep hierarchies (file systems, org charts, category trees).",
        },
        { intent: "do", text: "Use lazy-loading for large trees (hundreds+ nodes)." },
        { intent: "do", text: "Provide keyboard navigation for power users." },
        { intent: "dont", text: "Don't use on mobile — tree views are desktop-centric UX." },
        {
          intent: "dont",
          text: "Don't make trees more than 5-7 levels deep — it becomes hard to navigate.",
        },
        { intent: "info", text: "TreeView uses ARIA tree role for screen reader compatibility." },
        {
          intent: "info",
          text: "Keyboard navigation matches OS file browser (arrows, Enter, Space).",
        },
        {
          intent: "info",
          text: "Multi-select checkboxes support indeterminate state for partial selection.",
        },
      ],
    },
    playground: {
      renderPreview: (_props: Record<string, unknown>) =>
        React.createElement("div", {
          style: { textAlign: "left" as const, width: "100%" },
        }, "TreeView preview requires interactive state — see Overview demo above."),
      defaults: { multiSelect: false, showIcons: true },
      excludeControls: ["data", "selectedIds", "onSelect", "onSelectionChange", "defaultExpandedIds", "loadChildren", "className", "style"],
    },
  },
};
