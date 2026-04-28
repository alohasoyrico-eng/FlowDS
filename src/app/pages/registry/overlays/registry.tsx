/**
 * FLOW - Overlays Domain Registry
 * Component metadata, demos, and developer guides for overlay components.
 */
import React from "react";
import {
  FlowBottomSheet,
  FlowButton,
  FlowContextMenu,
  FlowDialog,
  FlowMenu,
  FlowPopover,
  FlowTooltip,
} from "@flow/design-system";
import { Text } from "@flow/primitives";
import type { ComponentEntry } from "../types";
import {
  FlowBottomSheetOverview,
  FlowBottomSheetVariants,
  FlowContextMenuOverview,
  FlowContextMenuVariants,
  FlowDialogOverview,
  FlowDialogVariants,
  FlowMenuOverview,
  FlowMenuVariants,
  FlowPopoverOverview,
  FlowPopoverVariants,
  FlowTooltipOverview,
  FlowTooltipVariants,
} from "./demos";

export const OVERLAYS_REGISTRY: Record<string, ComponentEntry> = {
  // ─── FlowTooltip ───
  "overlays/flow-tooltip": {
    domain: "Overlays",
    spec: {
      name: "FlowTooltip",
      purpose:
        "Accessible tooltip on hover/focus. Wraps a trigger element and shows positioned content after a configurable delay. Uses role='tooltip' and aria-describedby.",
      platform: "desktop",
      anatomy: [
        {
          part: "Trigger wrapper",
          description:
            "Inline-flex <span> that wraps the child — provides hover/focus event surface",
          tokens: [],
        },
        {
          part: "Tooltip bubble",
          description: "Positioned <span> with role='tooltip' — shows content with arrow pointer",
          tokens: [
            "comp.tooltip.bg",
            "comp.tooltip.text",
            "comp.tooltip.radius",
            "comp.tooltip.padding",
            "comp.tooltip.font",
            "comp.tooltip.shadow",
            "comp.tooltip.arrow-size",
          ],
        },
        {
          part: "Arrow",
          description: "CSS pseudo-element pointing toward the trigger",
          tokens: ["comp.tooltip.bg"],
        },
      ],
      variants: ["top", "bottom", "left", "right"],
      states: ["hidden", "visible"],
      accessibility: {
        handled: [
          "role='tooltip' on the bubble element",
          "aria-describedby links trigger to tooltip when visible",
          "Tooltip appears on both hover AND focus for keyboard accessibility",
          "Auto-generated unique ID via useId()",
        ],
        required: [
          "Trigger must be focusable (button, link, input) — tooltips on non-interactive elements are inaccessible",
        ],
        keyboard: [
          { key: "Tab", action: "Focus trigger — tooltip shows" },
          { key: "Tab (away)", action: "Hide tooltip" },
          { key: "Escape", action: "Dismiss" },
        ],
        wcag: ["4.1.2"],
      },
    },
    demos: {
      overview: () => <FlowTooltipOverview />,
      variants: () => <FlowTooltipVariants />,
    },
    developer: {
      reactImport: `import { FlowTooltip } from "@flow/design-system";`,
      reactUsage: `// Basic tooltip - wraps any focusable element
<FlowTooltip content="Save changes">
  <FlowButton variant="primary">Save</FlowButton>
</FlowTooltip>

// All four positions (top is default)
<FlowTooltip content="Top tooltip" position="top">
  <FlowButton variant="outlined">Top</FlowButton>
</FlowTooltip>
<FlowTooltip content="Bottom tooltip" position="bottom">
  <FlowButton variant="outlined">Bottom</FlowButton>
</FlowTooltip>
<FlowTooltip content="Left tooltip" position="left">
  <FlowButton variant="outlined">Left</FlowButton>
</FlowTooltip>
<FlowTooltip content="Right tooltip" position="right">
  <FlowButton variant="outlined">Right</FlowButton>
</FlowTooltip>

// All four sizes (md is default)
<FlowTooltip content="Small tooltip" size="sm">
  <FlowButton size="sm">Small</FlowButton>
</FlowTooltip>
<FlowTooltip content="Medium tooltip" size="md">
  <FlowButton size="md">Medium</FlowButton>
</FlowTooltip>
<FlowTooltip content="Large tooltip" size="lg">
  <FlowButton size="lg">Large</FlowButton>
</FlowTooltip>
<FlowTooltip content="Extra large tooltip" size="xl">
  <FlowButton size="xl">Extra Large</FlowButton>
</FlowTooltip>

// Custom delay (default is 300ms show, 100ms hide)
<FlowTooltip content="Instant tooltip" delay={0}>
  <FlowButton variant="outlined">No delay</FlowButton>
</FlowTooltip>
<FlowTooltip content="Slow tooltip" delay={600}>
  <FlowButton variant="outlined">Slow</FlowButton>
</FlowTooltip>

// Disabled state
<FlowTooltip content="This won't show" disabled>
  <FlowButton variant="outlined">Disabled tooltip</FlowButton>
</FlowTooltip>

// Rich content (ReactNode)
<FlowTooltip content={<span>Line 1<br/>Line 2<br/>Line 3</span>}>
  <FlowButton variant="outlined">Multi-line</FlowButton>
</FlowTooltip>

<FlowTooltip content={<span><strong>Bold</strong><br/>Regular text</span>}>
  <FlowButton variant="outlined">Formatted</FlowButton>
</FlowTooltip>

// Common patterns

// Icon-only buttons (REQUIRED for accessibility)
<FlowTooltip content="Delete item">
  <FlowIconButton icon="trash" variant="primary" intent="danger" aria-label="Delete" />
</FlowTooltip>

// Keyboard shortcuts
<FlowTooltip content="Save (⌘S)">
  <FlowIconButton icon="save" variant="primary" aria-label="Save" />
</FlowTooltip>

// Context actions
<FlowTooltip content="More options">
  <FlowIconButton icon="more-horizontal" variant="ghost" aria-label="More" />
</FlowTooltip>`,
      flutterImport: `import 'package:flow_ds/overlays.dart';`,
      flutterUsage: `FlowTooltip(
  content: 'Save changes',
  child: FlowButton(
    emphasis: ButtonEmphasis.high,
    child: Text('Save'),
  ),
)

// With position
FlowTooltip(
  content: 'Bottom tooltip',
  position: TooltipPosition.bottom,
  child: FlowButton(child: Text('Bottom')),
)

// With size
FlowTooltip(
  content: 'Large tooltip',
  size: TooltipSize.lg,
  child: FlowButton(child: Text('Large')),
)

// Custom delay
FlowTooltip(
  content: 'Instant',
  delay: Duration.zero,
  child: FlowButton(child: Text('No delay')),
)`,
      notes:
        "Tooltips MUST wrap focusable elements (buttons, links, inputs). Non-interactive elements cannot receive keyboard focus, making tooltips on them inaccessible. For icon-only buttons, both aria-label (on button) and tooltip (for context) are required. Default show delay is 300ms, hide delay is 100ms. The position prop accepts 'top', 'bottom', 'left', 'right' with automatic flip if near viewport edge.",
      props: [
        {
          name: "content",
          type: "ReactNode",
          description:
            "Tooltip content — text or rich ReactNode (multi-line, formatted). Shown after delay on hover/focus.",
          required: true,
        },
        {
          name: "children",
          type: "ReactElement",
          description:
            "Single focusable trigger element (button, link, input, custom component). Must be able to receive keyboard focus for accessibility.",
          required: true,
        },
        {
          name: "position",
          type: '"top" | "bottom" | "left" | "right"',
          default: '"top"',
          description: "Tooltip position relative to trigger. Auto-flips if near viewport edge.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description:
            "Size variant — controls font size and padding. Match to trigger size for visual consistency.",
        },
        {
          name: "delay",
          type: "number",
          default: "300",
          description:
            "Show delay in milliseconds. Default 300ms prevents tooltips from appearing during cursor movement. Set to 0 for instant tooltips (use sparingly).",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description:
            "Prevents tooltip from showing. Useful for conditional tooltips or debugging.",
        },
        {
          name: "className",
          type: "string",
          description:
            "Additional CSS classes on the trigger wrapper. Merges with component classes.",
          required: false,
        },
        {
          name: "style",
          type: "CSSProperties",
          description: "Inline styles on the trigger wrapper. Use sparingly — prefer tokens.",
          required: false,
        },
      ],
      guidelines: [
        {
          intent: "do",
          text: "Always wrap focusable elements (buttons, links, inputs) — tooltips on non-interactive elements are inaccessible to keyboard users.",
        },
        {
          intent: "do",
          text: "Use tooltips for icon-only buttons to provide text labels for screen readers and context for sighted users.",
        },
        {
          intent: "do",
          text: "Keep content concise — tooltips are for short hints, not long explanations. Use popovers or modals for complex content.",
        },
        {
          intent: "dont",
          text: "Don't use tooltips on disabled buttons — users can't focus them. Show an explanation elsewhere or enable the button with validation errors.",
        },
        {
          intent: "dont",
          text: "Don't rely on tooltips as the only way to convey critical information — they're hidden by default and easy to miss.",
        },
        {
          intent: "info",
          text: "Tooltips automatically generate unique IDs and link them via aria-describedby. No manual ARIA required.",
        },
        {
          intent: "info",
          text: "Default delays (300ms show, 100ms hide) prevent tooltips from appearing during normal cursor movement. Adjust only if needed.",
        },
        {
          intent: "info",
          text: "Tooltips appear on both hover (mouse) and focus (keyboard), ensuring accessibility for all input methods.",
        },
        {
          intent: "info",
          text: "The component uses portal rendering to avoid z-index and overflow issues. Tooltips always appear on top.",
        },
        {
          intent: "info",
          text: "Density-aware: font size (13→12/14px), padding (8/12→6/10 / 10/14px), and arrow size shift ±1 step in compact/comfortable.",
        },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(
          FlowTooltip,
          {
            content: (props.content as string) || "Tooltip text",
            position: props.position,
            size: props.size,
            disabled: !!props.disabled,
          } as React.ComponentProps<typeof FlowTooltip>,
          React.createElement(FlowButton, { variant: "outlined", size: "sm", children: "Hover me" } as React.ComponentProps<typeof FlowButton>),
        ),
      defaults: { content: "Tooltip text", position: "top", size: "md", disabled: false },
      excludeControls: ["children", "delay", "className", "style"],
    },
  },

  // ─── FlowDialog ───
  "overlays/flow-dialog": {
    domain: "Overlays",
    spec: {
      name: "FlowDialog",
      purpose:
        "Modal dialog overlay with backdrop. Traps focus inside dialog while open. Supports sizes (sm, md, lg, xl), title, footer actions, and close on backdrop click or Escape key.",
      platform: "shared",
      anatomy: [
        {
          part: "Backdrop overlay",
          description: "Semi-transparent overlay covering viewport",
          tokens: ["comp.dialog.backdrop"],
        },
        {
          part: "Dialog container",
          description: "Centered modal box with shadow and border",
          tokens: [
            "comp.dialog.bg",
            "comp.dialog.shadow",
            "comp.dialog.radius",
            "comp.dialog.width",
          ],
        },
        {
          part: "Header",
          description: "Title and close button",
          tokens: ["comp.dialog.header-padding"],
        },
        {
          part: "Content",
          description: "Dialog body content",
          tokens: ["comp.dialog.content-padding"],
        },
        {
          part: "Footer",
          description: "Action buttons (optional)",
          tokens: ["comp.dialog.footer-padding"],
        },
      ],
      variants: ["Sizes (sm, md, lg, xl)", "With footer", "Alert dialog"],
      states: ["open", "closed"],
      accessibility: {
        handled: ["role='dialog'", "aria-modal='true'", "Focus trap", "Escape to close"],
        required: ["Provide aria-label or aria-labelledby"],
        keyboard: [
          { key: "Escape", action: "Close dialog" },
          { key: "Tab", action: "Navigate focusable elements (trapped)" },
        ],
        wcag: ["2.1.1", "2.4.3", "4.1.2"],
      },
    },
    demos: {
      overview: () => <FlowDialogOverview />,
      variants: () => <FlowDialogVariants />,
    },
    developer: {
      reactImport: `import { FlowDialog } from "@flow/design-system";`,
      reactUsage: `const [open, setOpen] = useState(false);

<FlowDialog open={open} onClose={() => setOpen(false)} title="Dialog Title">
  <Text>Dialog content</Text>
</FlowDialog>

// With footer
<FlowDialog
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm Action"
  footer={
    <>
      <FlowButton variant="outlined" onClick={() => setOpen(false)}>Cancel</FlowButton>
      <FlowButton variant="primary" onClick={handleConfirm}>Confirm</FlowButton>
    </>
  }
>
  <Text>Are you sure?</Text>
</FlowDialog>`,
      flutterImport: `import 'package:flow_ds/overlays.dart';`,
      flutterUsage: `FlowDialog(
  title: 'Dialog Title',
  content: Text('Dialog content'),
  onClose: () => Navigator.pop(context),
)`,
      notes:
        "FlowDialog provides modal overlays for confirmations, forms, and critical information. Focus is trapped inside dialog for accessibility. Backdrop click and Escape key close dialog by default.",
      props: [
        {
          name: "open",
          type: "boolean",
          description: "Controls dialog visibility.",
          required: true,
        },
        {
          name: "onClose",
          type: "() => void",
          description: "Callback when dialog should close (backdrop click, Escape).",
          required: true,
        },
        { name: "title", type: "string", description: "Dialog title in header.", required: false },
        { name: "children", type: "ReactNode", description: "Dialog content.", required: true },
        {
          name: "footer",
          type: "ReactNode",
          description: "Footer content (typically action buttons).",
          required: false,
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description: "Dialog width.",
        },
      ],
      guidelines: [
        { intent: "do", text: "Use dialogs for critical actions requiring user confirmation." },
        { intent: "dont", text: "Don't nest dialogs — use stacking or wizard flows instead." },
        { intent: "info", text: "Dialog automatically traps focus for accessibility." },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(
          FlowDialog,
          {
            open: !!props.open,
            onClose: props.onClose as () => void,
            title: (props.title as string) || "Dialog Title",
            size: props.size,
          } as React.ComponentProps<typeof FlowDialog>,
          React.createElement(Text, { variant: "paragraph-s", children: "Dialog content goes here." } as React.ComponentProps<typeof Text>),
        ),
      defaults: { title: "Dialog Title", size: "md" },
      overlay: true,
      excludeControls: ["open", "onClose", "children", "footer"],
    },
  },

  // ─── FlowBottomSheet ───
  "overlays/flow-bottom-sheet": {
    domain: "Overlays",
    spec: {
      name: "FlowBottomSheet",
      purpose:
        "Mobile bottom sheet that slides up from viewport bottom. Supports swipe-to-dismiss, heights (auto, half, full), and backdrop overlay. Mobile-only pattern.",
      platform: "mobile",
      anatomy: [
        {
          part: "Backdrop overlay",
          description: "Semi-transparent overlay",
          tokens: ["comp.bottomsheet.backdrop"],
        },
        {
          part: "Sheet container",
          description: "Panel sliding from bottom",
          tokens: ["comp.bottomsheet.bg", "comp.bottomsheet.radius"],
        },
        {
          part: "Handle",
          description: "Drag handle indicator at top",
          tokens: ["comp.bottomsheet.handle"],
        },
        {
          part: "Content",
          description: "Sheet body content",
          tokens: ["comp.bottomsheet.padding"],
        },
      ],
      variants: ["Heights (auto, half, full)", "With title", "Swipe-to-dismiss"],
      states: ["open", "closed", "dragging"],
      accessibility: {
        handled: ["role='dialog'", "aria-modal='true'", "Focus trap"],
        required: ["Provide aria-label"],
        keyboard: [],
        wcag: ["2.1.1", "2.4.3", "4.1.2"],
      },
    },
    demos: {
      overview: () => <FlowBottomSheetOverview />,
      variants: () => <FlowBottomSheetVariants />,
    },
    developer: {
      reactImport: `import { FlowBottomSheet } from "@flow/design-system";`,
      reactUsage: `const [open, setOpen] = useState(false);

<FlowBottomSheet open={open} onClose={() => setOpen(false)} title="Sheet Title">
  <Text>Sheet content</Text>
</FlowBottomSheet>

// Half height
<FlowBottomSheet
  open={open}
  onClose={() => setOpen(false)}
  height="half"
>
  <Text>Half sheet</Text>
</FlowBottomSheet>`,
      flutterImport: `import 'package:flow_ds/overlays.dart';`,
      flutterUsage: `FlowBottomSheet(
  title: 'Sheet Title',
  child: Text('Sheet content'),
)`,
      notes:
        "FlowBottomSheet is mobile-only. Use for filters, actions, or supplementary content. Swipe down to dismiss. Automatically adjusts for safe area insets.",
      props: [
        {
          name: "open",
          type: "boolean",
          description: "Controls sheet visibility.",
          required: true,
        },
        {
          name: "onClose",
          type: "() => void",
          description: "Callback when sheet closes.",
          required: true,
        },
        { name: "title", type: "string", description: "Sheet title.", required: false },
        { name: "children", type: "ReactNode", description: "Sheet content.", required: true },
        {
          name: "height",
          type: '"auto" | "half" | "full"',
          default: '"auto"',
          description: "Sheet height.",
        },
      ],
      guidelines: [
        {
          intent: "do",
          text: "Use bottom sheets for mobile filters, actions, and supplementary content.",
        },
        { intent: "dont", text: "Don't use on desktop — use FlowDialog or FlowPopover instead." },
        { intent: "info", text: "Sheet supports swipe-to-dismiss gesture." },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(
          FlowBottomSheet,
          {
            open: !!props.open,
            onClose: props.onClose as () => void,
            title: (props.title as string) || "Sheet Title",
            children: React.createElement(Text, { variant: "paragraph-s", children: "Sheet content goes here." } as React.ComponentProps<typeof Text>),
          } as React.ComponentProps<typeof FlowBottomSheet>),
      defaults: { title: "Sheet Title" },
      overlay: true,
      excludeControls: ["open", "onClose", "children"],
    },
  },

  // ─── FlowContextMenu ───
  "overlays/flow-context-menu": {
    domain: "Overlays",
    spec: {
      name: "FlowContextMenu",
      purpose:
        "Right-click context menu overlay. Desktop-only. Shows menu at cursor position. Supports items with icons, keyboard shortcuts, dividers, and nested submenus.",
      platform: "desktop",
      anatomy: [
        {
          part: "Trigger wrapper",
          description: "Element that receives right-click event",
          tokens: [],
        },
        {
          part: "Menu panel",
          description: "Positioned overlay with menu items",
          tokens: ["comp.contextmenu.bg", "comp.contextmenu.shadow", "comp.contextmenu.radius"],
        },
        {
          part: "Menu item",
          description: "Interactive item with icon + label",
          tokens: ["comp.contextmenu.item-height", "comp.contextmenu.item-padding"],
        },
        {
          part: "Divider",
          description: "Horizontal separator between groups",
          tokens: ["comp.contextmenu.divider"],
        },
      ],
      variants: ["With icons", "With shortcuts", "With dividers", "Nested submenus"],
      states: ["open", "closed"],
      accessibility: {
        handled: ["role='menu'", "role='menuitem' on items", "Keyboard navigation"],
        required: ["Provide accessible labels"],
        keyboard: [
          { key: "↑ ↓ Arrow keys", action: "Navigate items" },
          { key: "Enter / Space", action: "Select item" },
          { key: "Escape", action: "Close menu" },
        ],
        wcag: ["2.1.1", "2.4.3", "4.1.2"],
      },
    },
    demos: {
      overview: () => <FlowContextMenuOverview />,
      variants: () => <FlowContextMenuVariants />,
    },
    developer: {
      reactImport: `import { FlowContextMenu } from "@flow/design-system";`,
      reactUsage: `<FlowContextMenu
  items={[
    { label: "Cut", icon: "scissors", onSelect: () => {} },
    { label: "Copy", icon: "copy", onSelect: () => {} },
    { label: "Paste", icon: "clipboard", onSelect: () => {} },
  ]}
>
  <div>Right-click this area</div>
</FlowContextMenu>

// With shortcuts
<FlowContextMenu
  items={[
    { label: "Cut", icon: "scissors", shortcut: "⌘X", onSelect: () => {} },
    { label: "Copy", icon: "copy", shortcut: "⌘C", onSelect: () => {} },
  ]}
>
  <div>Right-click here</div>
</FlowContextMenu>`,
      flutterImport: `import 'package:flow_ds/overlays.dart';`,
      flutterUsage: `FlowContextMenu(
  items: [
    ContextMenuItem(label: 'Cut', icon: Icons.cut),
    ContextMenuItem(label: 'Copy', icon: Icons.copy),
  ],
  child: Text('Right-click me'),
)`,
      notes:
        "FlowContextMenu is desktop-only (no right-click on touch devices). Use for contextual actions on specific elements. Menu closes on item click or outside click.",
      props: [
        {
          name: "items",
          type: "ContextMenuItem[]",
          description: "Menu items: { label, icon?, shortcut?, onSelect }.",
          required: true,
        },
        {
          name: "children",
          type: "ReactNode",
          description: "Element that triggers context menu on right-click.",
          required: true,
        },
      ],
      guidelines: [
        {
          intent: "do",
          text: "Use context menus for contextual actions on elements (edit, delete, share).",
        },
        { intent: "dont", text: "Don't use on mobile — no right-click gesture available." },
        { intent: "info", text: "Context menu automatically positions at cursor location." },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(
          FlowContextMenu,
          {
            items: props.items,
          } as React.ComponentProps<typeof FlowContextMenu>,
          React.createElement(
            "div",
            { style: { padding: "24px", border: "1px dashed var(--sys-energy-border-default)", borderRadius: "8px", textAlign: "center" as const } },
            "Right-click this area",
          ),
        ),
      defaults: {},
      fixtures: {
        items: [
          { label: "Cut", icon: "scissors", onSelect: () => {} },
          { label: "Copy", icon: "copy", onSelect: () => {} },
          { label: "Paste", icon: "clipboard", onSelect: () => {} },
          { label: "Delete", icon: "trash", onSelect: () => {} },
        ],
      },
      excludeControls: ["items", "children"],
    },
  },

  // ─── FlowMenu ───
  "overlays/flow-menu": {
    domain: "Overlays",
    spec: {
      name: "FlowMenu",
      purpose:
        "Click-triggered dropdown menu. Shared platform. Shows menu below or above trigger. Supports items with icons, dividers, and keyboard navigation.",
      platform: "shared",
      anatomy: [
        { part: "Trigger button", description: "Element that opens menu on click", tokens: [] },
        {
          part: "Menu panel",
          description: "Positioned overlay with menu items",
          tokens: ["comp.menu.bg", "comp.menu.shadow", "comp.menu.radius"],
        },
        {
          part: "Menu item",
          description: "Interactive item with icon + label",
          tokens: ["comp.menu.item-height", "comp.menu.item-padding"],
        },
        {
          part: "Divider",
          description: "Horizontal separator between groups",
          tokens: ["comp.menu.divider"],
        },
      ],
      variants: ["Positions (top, bottom, left, right)", "With icons", "With dividers"],
      states: ["open", "closed"],
      accessibility: {
        handled: ["role='menu'", "role='menuitem' on items", "aria-expanded on trigger"],
        required: ["Provide accessible labels"],
        keyboard: [
          { key: "↑ ↓ Arrow keys", action: "Navigate items" },
          { key: "Enter / Space", action: "Select item" },
          { key: "Escape", action: "Close menu" },
        ],
        wcag: ["2.1.1", "2.4.3", "4.1.2"],
      },
    },
    demos: {
      overview: () => <FlowMenuOverview />,
      variants: () => <FlowMenuVariants />,
    },
    developer: {
      reactImport: `import { FlowMenu } from "@flow/design-system";`,
      reactUsage: `<FlowMenu
  trigger={<FlowButton>Open Menu</FlowButton>}
  items={[
    { label: "Profile", icon: "user", onSelect: () => {} },
    { label: "Settings", icon: "settings", onSelect: () => {} },
    { label: "Logout", icon: "log-out", onSelect: () => {} },
  ]}
/>

// With position
<FlowMenu
  trigger={<FlowButton>Menu</FlowButton>}
  position="top"
  items={[...]}
/>`,
      flutterImport: `import 'package:flow_ds/overlays.dart';`,
      flutterUsage: `FlowMenu(
  trigger: FlowButton(child: Text('Menu')),
  items: [
    MenuItem(label: 'Profile', icon: Icons.person),
    MenuItem(label: 'Settings', icon: Icons.settings),
  ],
)`,
      notes:
        "FlowMenu provides dropdown menus triggered by click. Use for user menus, action menus, or contextual options. Menu closes on item click or outside click.",
      props: [
        {
          name: "trigger",
          type: "ReactNode",
          description: "Element that opens menu on click.",
          required: true,
        },
        {
          name: "items",
          type: "MenuItem[]",
          description: "Menu items: { label, icon?, onSelect }.",
          required: true,
        },
        {
          name: "position",
          type: '"top" | "bottom" | "left" | "right"',
          default: '"bottom"',
          description: "Menu position relative to trigger.",
        },
      ],
      guidelines: [
        { intent: "do", text: "Use menus for dropdown actions and user menus." },
        {
          intent: "dont",
          text: "Don't use menus for navigation — use FlowTabs or FlowSidebar instead.",
        },
        { intent: "info", text: "Menu automatically positions itself to stay within viewport." },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(FlowMenu, {
          trigger: React.createElement(FlowButton, { variant: "outlined", size: "sm", children: "Open Menu" } as React.ComponentProps<typeof FlowButton>),
          items: props.items,
          onSelect: () => {},
          placement: props.placement,
        } as React.ComponentProps<typeof FlowMenu>),
      defaults: { placement: "bottom-start" },
      fixtures: {
        items: [
          { id: "profile", label: "Profile", icon: "user" },
          { id: "settings", label: "Settings", icon: "settings" },
          { id: "logout", label: "Logout", icon: "log-out" },
        ],
      },
      excludeControls: ["trigger", "items", "onSelect"],
    },
  },

  // ─── FlowPopover ───
  "overlays/flow-popover": {
    domain: "Overlays",
    spec: {
      name: "FlowPopover",
      purpose:
        "Click-triggered popover with custom content. Richer than tooltip, lighter than dialog. Supports positions, custom content, and close on outside click.",
      platform: "shared",
      anatomy: [
        { part: "Trigger element", description: "Element that opens popover on click", tokens: [] },
        {
          part: "Popover panel",
          description: "Positioned overlay with custom content",
          tokens: [
            "comp.popover.bg",
            "comp.popover.shadow",
            "comp.popover.radius",
            "comp.popover.padding",
          ],
        },
        {
          part: "Arrow (optional)",
          description: "Pointer toward trigger",
          tokens: ["comp.popover.arrow"],
        },
      ],
      variants: ["Positions (top, bottom, left, right)", "With arrow", "Custom content"],
      states: ["open", "closed"],
      accessibility: {
        handled: ["role='dialog'", "aria-expanded on trigger", "Focus trap (optional)"],
        required: ["Provide accessible labels"],
        keyboard: [
          { key: "Escape", action: "Close popover" },
          { key: "Tab", action: "Navigate content" },
        ],
        wcag: ["2.1.1", "2.4.3", "4.1.2"],
      },
    },
    demos: {
      overview: () => <FlowPopoverOverview />,
      variants: () => <FlowPopoverVariants />,
    },
    developer: {
      reactImport: `import { FlowPopover } from "@flow/design-system";`,
      reactUsage: `<FlowPopover
  trigger={<FlowButton>Open Popover</FlowButton>}
  content={
    <Stack gap={2}>
      <Text variant="h3">Popover Title</Text>
      <Text>Custom popover content.</Text>
    </Stack>
  }
/>

// With position
<FlowPopover
  trigger={<FlowButton>Top Popover</FlowButton>}
  position="top"
  content={<Text>Popover above trigger</Text>}
/>`,
      flutterImport: `import 'package:flow_ds/overlays.dart';`,
      flutterUsage: `FlowPopover(
  trigger: FlowButton(child: Text('Open')),
  content: Text('Popover content'),
)`,
      notes:
        "FlowPopover provides rich content overlays. Use for help text, previews, or supplementary information. Lighter than dialog, richer than tooltip.",
      props: [
        {
          name: "trigger",
          type: "ReactNode",
          description: "Element that opens popover on click.",
          required: true,
        },
        {
          name: "content",
          type: "ReactNode",
          description: "Popover content (any ReactNode).",
          required: true,
        },
        {
          name: "position",
          type: '"top" | "bottom" | "left" | "right"',
          default: '"bottom"',
          description: "Popover position relative to trigger.",
        },
      ],
      guidelines: [
        { intent: "do", text: "Use popovers for rich content that doesn't warrant a full dialog." },
        {
          intent: "dont",
          text: "Don't use popovers for critical actions — use FlowDialog instead.",
        },
        { intent: "info", text: "Popover automatically positions to stay within viewport." },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(FlowPopover, {
          trigger: React.createElement(FlowButton, { variant: "outlined", size: "sm", children: "Open Popover" } as React.ComponentProps<typeof FlowButton>),
          content: React.createElement(Text, { variant: "paragraph-s", children: "Popover content goes here." } as React.ComponentProps<typeof Text>),
          position: props.position,
        } as React.ComponentProps<typeof FlowPopover>),
      defaults: { position: "bottom" },
      excludeControls: ["trigger", "content"],
    },
  },
};
