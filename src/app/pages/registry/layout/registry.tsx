/**
 * FLOW - Layout Domain Registry
 * Component metadata, demos, and developer guides for layout components.
 */
import type { ComponentEntry } from "../types";
import {
  FlowAccordionOverview,
  FlowAccordionVariants,
  FlowFieldsetOverview,
  FlowFieldsetVariants,
  FlowSplitPaneOverview,
  FlowSplitPaneVariants,
} from "./demos";

export const LAYOUT_REGISTRY: Record<string, ComponentEntry> = {
  // ─── FlowAccordion ───
  "layout/flow-accordion": {
    domain: "Layout",
    spec: {
      name: "FlowAccordion",
      purpose:
        "Expandable panel with clickable header and collapsible content. Used for FAQs, settings sections, and progressive disclosure patterns. Supports controlled and uncontrolled modes.",
      platform: "shared",
      anatomy: [
        {
          part: "Header button",
          description:
            "Clickable <button> with title text and chevron icon — triggers expand/collapse",
          tokens: [
            "comp.accordion.header-bg",
            "comp.accordion.header-text",
            "comp.accordion.header-padding",
            "comp.accordion.header-height",
            "comp.accordion.radius",
            "comp.accordion.transition",
          ],
        },
        {
          part: "Chevron icon",
          description: "Rotates 180° when expanded — visual indicator of state",
          tokens: ["comp.accordion.icon-size", "comp.accordion.icon-rotation"],
        },
        {
          part: "Content panel",
          description: "Expandable container with overflow animation — shows/hides children",
          tokens: [
            "comp.accordion.content-bg",
            "comp.accordion.content-padding",
            "comp.accordion.content-border",
          ],
        },
      ],
      variants: ["Default (collapsed)", "Expanded", "Disabled"],
      states: ["collapsed", "expanded", "hover", "focus-visible", "disabled"],
      accessibility: {
        handled: [
          "Header is semantic <button> with aria-expanded reflecting state",
          "Content panel gets aria-labelledby linking to header",
          "role='region' on content panel for landmark navigation",
          "Disabled accordions get aria-disabled='true'",
        ],
        required: ["Provide descriptive title prop for screen reader context"],
        keyboard: ["Tab to focus accordion header", "Enter or Space to toggle expansion"],
      },
    },
    demos: {
      overview: () => <FlowAccordionOverview />,
      variants: () => <FlowAccordionVariants />,
    },
    developer: {
      reactImport: `import { FlowAccordion } from "@flow/design-system";`,
      reactUsage: `// Uncontrolled (manages its own state)
<FlowAccordion title="What is FLOW?">
  <Text>FLOW is a cross-platform design system...</Text>
</FlowAccordion>

// Controlled (parent manages state)
const [expanded, setExpanded] = useState(false);
<FlowAccordion
  title="Settings"
  expanded={expanded}
  onChange={() => setExpanded(!expanded)}
>
  <Text>Your settings content...</Text>
</FlowAccordion>

// All sizes
<FlowAccordion title="Small" size="sm">Content</FlowAccordion>
<FlowAccordion title="Medium" size="md">Content</FlowAccordion>
<FlowAccordion title="Large" size="lg">Content</FlowAccordion>
<FlowAccordion title="Extra Large" size="xl">Content</FlowAccordion>

// Disabled
<FlowAccordion title="Coming soon" disabled>
  <Text>This feature is not yet available.</Text>
</FlowAccordion>

// Default expanded
<FlowAccordion title="Important info" defaultExpanded>
  <Text>This accordion starts expanded.</Text>
</FlowAccordion>

// Common pattern: FAQ section
const [active, setActive] = useState<string | null>(null);

<Stack gap={2}>
  <FlowAccordion
    title="How do I get started?"
    expanded={active === "q1"}
    onChange={() => setActive(active === "q1" ? null : "q1")}
  >
    <Text>Follow our quick start guide...</Text>
  </FlowAccordion>

  <FlowAccordion
    title="What platforms are supported?"
    expanded={active === "q2"}
    onChange={() => setActive(active === "q2" ? null : "q2")}
  >
    <Text>FLOW supports React and Flutter...</Text>
  </FlowAccordion>
</Stack>`,
      flutterImport: `import 'package:flow_ds/layout.dart';`,
      flutterUsage: `FlowAccordion(
  title: 'What is FLOW?',
  child: Text('FLOW is a cross-platform design system...'),
)

// Controlled
FlowAccordion(
  title: 'Settings',
  expanded: expanded,
  onChanged: (value) => setState(() => expanded = value),
  child: Text('Settings content...'),
)

// With size
FlowAccordion(
  title: 'Large accordion',
  size: AccordionSize.lg,
  child: Text('Content...'),
)

// Disabled
FlowAccordion(
  title: 'Coming soon',
  disabled: true,
  child: Text('Not available yet.'),
)`,
      notes:
        "FlowAccordion supports both controlled (via expanded + onChange) and uncontrolled (via defaultExpanded) modes. Use controlled mode when you need multiple accordions where only one can be open at a time. The chevron icon rotates smoothly via CSS transform. Content height animates using max-height + overflow for smooth expansion.",
      props: [
        {
          name: "title",
          type: "string",
          description:
            "Header text shown in the clickable button. Required for accessibility and UX.",
          required: true,
        },
        {
          name: "children",
          type: "ReactNode",
          description:
            "Content shown when accordion is expanded. Can be text, components, or complex layouts.",
          required: true,
        },
        {
          name: "expanded",
          type: "boolean",
          description:
            "Controlled mode: whether accordion is expanded. Use with onChange for full control.",
          required: false,
        },
        {
          name: "defaultExpanded",
          type: "boolean",
          default: "false",
          description:
            "Uncontrolled mode: initial expanded state. Ignored if expanded prop is provided.",
        },
        {
          name: "onChange",
          type: "(expanded: boolean) => void",
          description: "Callback when expansion state changes. Receives new expanded state.",
          required: false,
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description: "Size variant — controls header height and font size.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description:
            "Prevents accordion from being expanded. Header is visually muted and non-interactive.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes on root wrapper.",
          required: false,
        },
        {
          name: "style",
          type: "CSSProperties",
          description: "Inline styles on root wrapper.",
          required: false,
        },
        {
          name: "id",
          type: "string",
          description: "HTML id for the accordion. Auto-generated if not provided.",
          required: false,
        },
      ],
      guidelines: [
        {
          intent: "do",
          text: "Use accordions for FAQs, settings sections, and content that doesn't need to be visible all at once.",
        },
        {
          intent: "do",
          text: "Keep titles concise and descriptive — they should clearly indicate what's inside.",
        },
        {
          intent: "do",
          text: "Use controlled mode when multiple accordions should only allow one open at a time.",
        },
        {
          intent: "dont",
          text: "Don't nest accordions deeply — it creates confusing UX and navigation challenges.",
        },
        {
          intent: "dont",
          text: "Don't use accordions for critical content that users must see — they hide content by default.",
        },
        {
          intent: "info",
          text: "The chevron icon rotates 180° when expanded via CSS transform for smooth animation.",
        },
        {
          intent: "info",
          text: "Content height animates using max-height + overflow hidden for smooth expansion/collapse.",
        },
        {
          intent: "info",
          text: "Accordions use semantic <button> for headers, ensuring keyboard accessibility and screen reader support.",
        },
        {
          intent: "info",
          text: "Density-aware: header height (48→40/56px), padding, and font sizes shift ±1 step in compact/comfortable.",
        },
      ],
    },
  },

  // ─── FlowSplitPane ───
  "layout/flow-split-pane": {
    domain: "Layout",
    spec: {
      name: "FlowSplitPane",
      purpose:
        "Resizable split panel layout with draggable divider. Supports horizontal (side-by-side) and vertical (top-bottom) orientations. Users can drag the separator or use arrow keys to resize panes. Designed for desktop IDE-style layouts, comparison views, and resizable sidebars.",
      platform: "desktop",
      anatomy: [
        {
          part: "Root container",
          description:
            "Flex container (row or column) with border and radius — holds both panes and the separator",
          tokens: [
            "sys-frame-border-thin",
            "sys-energy-border-default",
            "sys-frame-radius-container",
          ],
        },
        {
          part: "First pane",
          description:
            "Leading pane (left or top) — width/height set by split percentage, overflow auto",
          tokens: [],
        },
        {
          part: "Separator",
          description:
            "Draggable divider with role='separator' — 6px wide/tall, drag handle grip indicator in center",
          tokens: [
            "sys-energy-surface-secondary",
            "sys-energy-border-subtle",
            "sys-energy-border-default",
            "sys-momentum-transition-fast",
            "sys-energy-status-info",
          ],
        },
        {
          part: "Second pane",
          description:
            "Trailing pane (right or bottom) — fills remaining space via flex: 1, overflow auto",
          tokens: [],
        },
      ],
      variants: ["Horizontal (side-by-side)", "Vertical (top-bottom)", "Disabled"],
      states: ["default", "dragging", "focus-visible", "disabled"],
      accessibility: {
        handled: [
          "Separator uses role='separator' with aria-orientation",
          "aria-valuenow, aria-valuemin, aria-valuemax reflect split position",
          "aria-disabled='true' when disabled",
          "Focus ring on separator for keyboard users",
        ],
        required: [
          "Provide meaningful content in both panes for screen reader context",
        ],
        keyboard: [
          "Tab to focus separator",
          "Arrow Left/Right (horizontal) or Arrow Up/Down (vertical) to resize by 2%",
          "Shift + Arrow to resize by 10%",
          "Home to collapse to minimum first pane",
          "End to expand first pane to maximum",
        ],
      },
    },
    demos: {
      overview: () => <FlowSplitPaneOverview />,
      variants: () => <FlowSplitPaneVariants />,
    },
    developer: {
      reactImport: `import { FlowSplitPane } from "@flow/design-system";`,
      reactUsage: `// Basic horizontal split (side-by-side)
<FlowSplitPane
  first={<div>Left pane</div>}
  second={<div>Right pane</div>}
/>

// Vertical split (top-bottom)
<FlowSplitPane
  direction="vertical"
  first={<div>Top pane</div>}
  second={<div>Bottom pane</div>}
/>

// Custom initial split ratio (70/30)
<FlowSplitPane
  defaultSplit={70}
  first={<div>Main content (70%)</div>}
  second={<div>Sidebar (30%)</div>}
/>

// With minimum pane sizes
<FlowSplitPane
  minFirst={20}
  minSecond={20}
  first={<div>Left</div>}
  second={<div>Right</div>}
/>

// Disabled (non-resizable)
<FlowSplitPane
  disabled
  first={<div>Fixed left</div>}
  second={<div>Fixed right</div>}
/>`,
      flutterImport: `import 'package:flow_ds/layout.dart';`,
      flutterUsage: `FlowSplitPane(
  first: Text('Left pane'),
  second: Text('Right pane'),
)

// Vertical split
FlowSplitPane(
  direction: SplitDirection.vertical,
  first: Text('Top pane'),
  second: Text('Bottom pane'),
)

// Custom initial split
FlowSplitPane(
  defaultSplit: 70,
  first: Text('Main content'),
  second: Text('Sidebar'),
)`,
      notes:
        "FlowSplitPane is a desktop-only layout component for resizable split panels. The separator supports both pointer drag and full keyboard control (arrow keys for 2% steps, shift+arrow for 10% steps, Home/End for min/max). Split state is uncontrolled — the component manages its own split percentage from defaultSplit. The separator shows a subtle grip indicator and highlights on focus. Minimum pane sizes prevent either pane from collapsing completely.",
      props: [
        {
          name: "first",
          type: "ReactNode",
          description:
            "Content for the leading pane (left in horizontal, top in vertical).",
          required: true,
        },
        {
          name: "second",
          type: "ReactNode",
          description:
            "Content for the trailing pane (right in horizontal, bottom in vertical).",
          required: true,
        },
        {
          name: "direction",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description:
            "Split orientation — horizontal places panes side-by-side, vertical stacks them top-bottom.",
        },
        {
          name: "defaultSplit",
          type: "number",
          default: "50",
          description:
            "Initial split percentage (0–100). Determines how much space the first pane occupies.",
        },
        {
          name: "minFirst",
          type: "number",
          default: "10",
          description:
            "Minimum percentage for the first pane. Prevents collapsing below this threshold.",
        },
        {
          name: "minSecond",
          type: "number",
          default: "10",
          description:
            "Minimum percentage for the second pane. Prevents collapsing below this threshold.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description:
            "Disables drag and keyboard resizing. Separator is non-interactive and not focusable.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes on root container.",
          required: false,
        },
        {
          name: "style",
          type: "CSSProperties",
          description: "Inline styles on root container.",
          required: false,
        },
      ],
      guidelines: [
        {
          intent: "do",
          text: "Use FlowSplitPane for IDE-style layouts, comparison views, and resizable sidebars on desktop.",
        },
        {
          intent: "do",
          text: "Set meaningful minFirst/minSecond values to prevent panes from becoming too small to use.",
        },
        {
          intent: "do",
          text: "Ensure the parent container has explicit height — FlowSplitPane uses height: 100%.",
        },
        {
          intent: "dont",
          text: "Don't use FlowSplitPane on mobile — touch drag conflicts with scrolling. Use tabs or stacked layout instead.",
        },
        {
          intent: "dont",
          text: "Don't nest split panes more than two levels deep — it creates confusing resize interactions.",
        },
        {
          intent: "info",
          text: "The separator is 6px wide with a centered grip indicator for visual affordance.",
        },
        {
          intent: "info",
          text: "Keyboard resize uses 2% steps by default, 10% with Shift held. Home/End jump to min/max.",
        },
        {
          intent: "info",
          text: "Split state is uncontrolled — no onChange callback. The component manages its own percentage.",
        },
      ],
    },
  },

  // ─── FlowFieldset ───
  "layout/flow-fieldset": {
    domain: "Layout",
    spec: {
      name: "FlowFieldset",
      purpose:
        "Semantic form grouping with legend and optional description. Wraps related form controls in a native <fieldset> element with styled <legend>. Supports disabled state (propagates to all children), error state (red border and legend), and nested fieldsets for hierarchical forms.",
      platform: "shared",
      anatomy: [
        {
          part: "Fieldset container",
          description:
            "Native <fieldset> element with border, radius, and padding — disabled state reduces opacity and propagates to children",
          tokens: [
            "sys-frame-border-thin",
            "sys-energy-border-default",
            "sys-energy-status-error",
            "sys-frame-radius-container",
            "sys-frame-padding-control",
            "sys-state-opacity-disabled",
          ],
        },
        {
          part: "Legend",
          description:
            "Native <legend> element — semibold label text with horizontal padding, error state turns red",
          tokens: [
            "ref-frame-space-2",
            "ref-voice-family-sans",
            "sys-size-voice-label",
            "ref-voice-weight-semibold",
            "sys-energy-text-primary",
            "sys-energy-status-error",
          ],
        },
        {
          part: "Description",
          description:
            "Optional caption text below legend — uses Text primitive with secondary color",
          tokens: ["ref-frame-space-3"],
        },
        {
          part: "Content stack",
          description:
            "Stack primitive with gap={3} wrapping children — provides consistent vertical spacing between form controls",
          tokens: [],
        },
      ],
      variants: ["Default", "With description", "Error", "Disabled"],
      states: ["default", "error", "disabled"],
      accessibility: {
        handled: [
          "Semantic <fieldset> element groups related controls for screen readers",
          "Native <legend> provides accessible group name",
          "disabled attribute on <fieldset> propagates to all child form controls",
          "data-state attributes for disabled and error via stateAttrs utility",
        ],
        required: [
          "Provide descriptive legend text that identifies the group purpose",
          "Use error prop with appropriate error messaging for validation",
        ],
        keyboard: [
          "Tab navigates through child form controls normally",
          "Disabled fieldset skips all child controls in tab order",
        ],
      },
    },
    demos: {
      overview: () => <FlowFieldsetOverview />,
      variants: () => <FlowFieldsetVariants />,
    },
    developer: {
      reactImport: `import { FlowFieldset } from "@flow/design-system";`,
      reactUsage: `// Basic fieldset with legend
<FlowFieldset legend="Personal Information">
  <FlowTextInput label="First Name" />
  <FlowTextInput label="Last Name" />
  <FlowTextInput label="Email" type="email" />
</FlowFieldset>

// With description
<FlowFieldset
  legend="Notification Preferences"
  description="Choose how you want to be notified."
>
  <FlowCheckbox label="Email notifications" />
  <FlowCheckbox label="Push notifications" />
  <FlowSwitch label="Marketing emails" />
</FlowFieldset>

// Disabled fieldset (disables all children)
<FlowFieldset legend="Account Settings" disabled>
  <FlowTextInput label="Username" />
  <FlowTextInput label="Display Name" />
</FlowFieldset>

// Error state
<FlowFieldset legend="Payment Details" error>
  <FlowTextInput label="Card Number" error="Invalid card number" />
  <FlowTextInput label="Expiry Date" />
</FlowFieldset>

// Nested fieldsets
<FlowFieldset legend="Shipping">
  <FlowTextInput label="Street Address" />
  <FlowFieldset legend="City & State">
    <FlowTextInput label="City" />
    <FlowTextInput label="State" />
  </FlowFieldset>
</FlowFieldset>`,
      flutterImport: `import 'package:flow_ds/layout.dart';`,
      flutterUsage: `FlowFieldset(
  legend: 'Personal Information',
  children: [
    FlowTextInput(label: 'First Name'),
    FlowTextInput(label: 'Last Name'),
  ],
)

// With description
FlowFieldset(
  legend: 'Preferences',
  description: 'Choose your settings.',
  children: [
    FlowCheckbox(label: 'Enable notifications'),
    FlowSwitch(label: 'Dark mode'),
  ],
)

// Disabled
FlowFieldset(
  legend: 'Account',
  disabled: true,
  children: [
    FlowTextInput(label: 'Username'),
  ],
)

// Error state
FlowFieldset(
  legend: 'Payment',
  error: true,
  children: [
    FlowTextInput(label: 'Card Number'),
  ],
)`,
      notes:
        "FlowFieldset uses native <fieldset> and <legend> elements for correct semantic HTML and accessibility. The disabled prop on <fieldset> natively propagates to all child form controls — no additional state management needed. Error state changes the border and legend color to the error token. Children are wrapped in a Stack with gap={3} for consistent spacing. Description text uses the Text primitive with caption role and secondary color.",
      props: [
        {
          name: "legend",
          type: "string",
          description:
            "Legend text displayed at the top of the fieldset border. Required for accessibility.",
          required: true,
        },
        {
          name: "children",
          type: "ReactNode",
          description:
            "Form controls and content inside the fieldset. Wrapped in Stack with gap={3}.",
          required: true,
        },
        {
          name: "description",
          type: "string",
          description:
            "Optional helper text below the legend. Uses Text caption with secondary color.",
          required: false,
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description:
            "Disables the fieldset and all child form controls. Reduces opacity via disabled token.",
        },
        {
          name: "error",
          type: "boolean",
          default: "false",
          description:
            "Error state — turns border and legend text red using error status token.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes on fieldset element.",
          required: false,
        },
        {
          name: "style",
          type: "CSSProperties",
          description: "Inline styles on fieldset element.",
          required: false,
        },
      ],
      guidelines: [
        {
          intent: "do",
          text: "Use FlowFieldset to group related form controls — it provides semantic structure for screen readers.",
        },
        {
          intent: "do",
          text: "Write clear legend text that describes the group (e.g., 'Personal Information', 'Payment Details').",
        },
        {
          intent: "do",
          text: "Use the disabled prop to disable an entire section of a form — it propagates to all children natively.",
        },
        {
          intent: "do",
          text: "Use the description prop for helper text instead of adding separate Text elements.",
        },
        {
          intent: "dont",
          text: "Don't nest fieldsets more than two levels deep — it creates confusing visual and semantic hierarchy.",
        },
        {
          intent: "dont",
          text: "Don't use FlowFieldset for visual grouping alone — use Surface or Card if no semantic grouping is needed.",
        },
        {
          intent: "info",
          text: "Native <fieldset disabled> propagates to all child form controls — no extra state management needed.",
        },
        {
          intent: "info",
          text: "Children are wrapped in Stack gap={3} for consistent vertical spacing between controls.",
        },
        {
          intent: "info",
          text: "Error state changes border and legend color to sys-energy-status-error token.",
        },
      ],
    },
  },
};
