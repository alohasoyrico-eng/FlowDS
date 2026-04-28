/**
 * FLOW - Controls Domain Registry
 * Component metadata, demos, and developer guides for control components.
 */
import React from "react";
import type { ComponentEntry } from "../types";
import {
  FlowButtonOverview,
  FlowButtonVariants,
  FlowFABOverview,
  FlowFABVariants,
  FlowIconButtonOverview,
  FlowIconButtonVariants,
} from "./demos";
import { FlowButton, FlowFAB, FlowIconButton } from "@flow/design-system";

export const CONTROLS_REGISTRY: Record<string, ComponentEntry> = {
  // ─── FlowButton ───
  "controls/flow-button": {
    domain: "Controls",
    spec: {
      name: "FlowButton",
      purpose:
        "Primary clickable action trigger with label and optional icon. Composes ActionSurface (L2 primitive) for state resolution, focus management, and semantic HTML. Seven emphasis levels drive visual hierarchy: high → medium → low → outline → danger → warning → ghost. Supports loading state with spinner, disabled state, and full-width layout.",
      platform: "shared",
      anatomy: [
        {
          part: "ActionSurface wrapper",
          description:
            "L2 primitive <button> — handles disabled, loading, focus, aria, and state resolution",
          tokens: [],
        },
        {
          part: "Button container",
          description:
            "Visual styling layer — background, border, radius, padding via [data-variant] and [data-size]",
          tokens: [
            "comp.button.bg",
            "comp.button.text",
            "comp.button.border",
            "comp.button.radius",
            "comp.button.padding",
            "comp.button.height",
            "comp.button.font-size",
            "comp.button.font-family → sys.voice.family-control",
            "comp.button.font-weight → sys.voice.weight-control",
            "comp.button.line-height → sys.voice.line-height-control",
            "comp.button.letter-spacing → sys.voice.letter-spacing-control",
            "comp.button.transition (explicit properties, not 'all')",
            "comp.button.z-index (defaults to auto, overrideable)",
          ],
        },
        {
          part: "Leading icon",
          description: "Optional icon before label — size matches button size",
          tokens: ["comp.button.icon-size", "comp.button.icon-gap"],
        },
        {
          part: "Loading spinner",
          description: "Replaces icon when loading={true} — FlowCircularProgress component",
          tokens: ["comp.button.spinner-size"],
        },
        {
          part: "Label text",
          description: "<span> with button text — fades during loading if loadingLabel provided",
          tokens: ["comp.button.label-weight"],
        },
      ],
      variants: ["High", "Medium", "Low", "Outline", "Danger", "Warning", "Ghost"],
      states: ["default", "hover", "focus-visible", "pressed", "disabled", "loading"],
      accessibility: {
        handled: [
          "Semantic <button> element via ActionSurface",
          "disabled attribute prevents interaction when disabled={true}",
          "aria-label automatically set during loading state",
          "Focus ring visible for keyboard navigation (focus-visible)",
          "Type attribute defaults to 'button' (prevents form submission)",
        ],
        required: [
          "Provide descriptive children text for screen readers",
          "Use type='submit' for form submission buttons",
        ],
        keyboard: [
          { key: "Tab", action: "Focus button" },
          { key: "Enter / Space", action: "Activate" },
        ],
        wcag: ["2.1.1", "4.1.2"],
      },
    },
    demos: {
      overview: () => <FlowButtonOverview />,
      variants: () => <FlowButtonVariants />,
    },
    developer: {
      reactImport: `import { FlowButton } from "@flow/design-system";`,
      reactUsage: `// Basic button
<FlowButton>Click me</FlowButton>

// All emphasis levels (canonical order)
<FlowButton variant="primary">Primary Action</FlowButton>
<FlowButton variant="secondary">Secondary</FlowButton>
<FlowButton variant="tertiary">Tertiary</FlowButton>
<FlowButton variant="outlined">Outlined</FlowButton>
<FlowButton variant="primary" intent="danger">Delete</FlowButton>
<FlowButton variant="primary" intent="warning">Caution</FlowButton>
<FlowButton variant="ghost">Subtle</FlowButton>

// All sizes
<FlowButton size="sm">Small</FlowButton>
<FlowButton size="md">Medium</FlowButton>
<FlowButton size="lg">Large</FlowButton>
<FlowButton size="xl">Extra Large</FlowButton>

// With leading icon
<FlowButton leadingIcon="plus">Create New</FlowButton>
<FlowButton leadingIcon="download" variant="secondary">Download</FlowButton>
<FlowButton leadingIcon="trash-2" variant="primary" intent="danger">Delete</FlowButton>

// Loading state
const [loading, setLoading] = useState(false);

<FlowButton
  loading={loading}
  onClick={() => {
    setLoading(true);
    // Async operation...
    setTimeout(() => setLoading(false), 2000);
  }}
>
  Save
</FlowButton>

// Loading with custom label
<FlowButton
  loading={loading}
  loadingLabel="Saving..."
  onClick={handleSave}
>
  Save Changes
</FlowButton>

// Disabled
<FlowButton disabled>Unavailable</FlowButton>

// Full width (mobile layouts)
<FlowButton fullWidth>Sign In</FlowButton>

// Form submission
<FlowButton type="submit" variant="primary">Submit</FlowButton>

// Common patterns
<FlowButton variant="primary" leadingIcon="check">Confirm</FlowButton>
<FlowButton variant="outlined" leadingIcon="x">Cancel</FlowButton>
<FlowButton variant="primary" intent="danger" leadingIcon="trash-2">Delete Account</FlowButton>`,
      flutterImport: `import 'package:flow_ds/controls.dart';`,
      flutterUsage: `FlowButton(
  onPressed: () => print('Clicked'),
  child: Text('Click me'),
)

// With emphasis
FlowButton(
  emphasis: ButtonEmphasis.high,
  onPressed: handleAction,
  child: Text('Primary Action'),
)

// With icon
FlowButton(
  leadingIcon: Icons.add,
  onPressed: onCreate,
  child: Text('Create'),
)

// Loading state
FlowButton(
  loading: isLoading,
  onPressed: isLoading ? null : handleSave,
  child: Text('Save'),
)

// Full width
FlowButton(
  fullWidth: true,
  onPressed: handleSubmit,
  child: Text('Submit'),
)`,
      notes:
        "FlowButton is the foundational action component in FLOW. The canonical emphasis order (high → medium → low → outline → danger → warning → ghost) reflects decreasing visual weight and hierarchy. Use 'high' for primary actions (1 per screen), 'medium' for secondary, 'low'/'outline' for tertiary. The danger and warning emphases are semantically distinct — danger for destructive actions, warning for cautionary ones. Both use subtle→filled paradigm on hover. Foundation alignment: Voice (font-family, weight, line-height, letter-spacing route through sys.voice.control tokens), Frame (fullWidth via data-attribute, padding tokens per emphasis), Depth (z-index overrideable via --comp-button-z-index), Momentum (explicit transition properties: background, color, border-color, box-shadow, opacity), State (data-state from ActionSurface connected to CSS selectors).",
      props: [
        {
          name: "children",
          type: "ReactNode",
          description: "Button label text. Required for accessibility and UX.",
          required: true,
        },
        {
          name: "variant",
          type: '"primary" | "secondary" | "tertiary" | "outlined" | "ghost"',
          default: '"primary"',
          description:
            "Visual variant — controls background, border, and text color. Warning variant uses subtle→filled paradigm (yellow palette) for cautionary actions.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"md" (density-aware)',
          description: "Size variant — controls height, padding, font size, and icon size.",
        },
        {
          name: "onClick",
          type: "() => void",
          description: "Click handler. Called on mouse click, Enter, or Space.",
          required: false,
        },
        {
          name: "type",
          type: '"button" | "submit" | "reset"',
          default: '"button"',
          description: "HTML button type. Use 'submit' for form submissions.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables button and prevents interaction. Adds disabled attribute.",
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          description: "Shows loading spinner and optional loading label. Does not disable button.",
        },
        {
          name: "loadingLabel",
          type: "ReactNode",
          description: "Optional label to show during loading state. Replaces children text.",
          required: false,
        },
        {
          name: "leadingIcon",
          type: "string",
          description:
            "Icon name from lucide-react. Shown before label. Replaced by spinner when loading.",
          required: false,
        },
        {
          name: "fullWidth",
          type: "boolean",
          default: "false",
          description:
            "Makes button stretch to 100% of container width via data-full-width attribute (CSS cascade compatible).",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes appended to button.",
          required: false,
        },
      ],
      guidelines: [
        {
          intent: "do",
          text: "Use the canonical emphasis order: high for primary actions, medium for secondary, low/outline for tertiary.",
        },
        {
          intent: "do",
          text: "Limit high-emphasis buttons to ONE per screen or modal — too many primaries create confusion.",
        },
        {
          intent: "do",
          text: "Use danger emphasis ONLY for destructive actions (delete, remove, cancel subscription).",
        },
        {
          intent: "do",
          text: "Use warning emphasis for cautionary but non-destructive actions (proceed with risk, override defaults).",
        },
        {
          intent: "do",
          text: "Provide descriptive labels — avoid generic text like 'OK' or 'Click here'.",
        },
        {
          intent: "dont",
          text: "Don't use disabled state as a loading indicator — use loading={true} instead.",
        },
        {
          intent: "dont",
          text: "Don't chain multiple high-emphasis buttons — use medium or outline for secondary actions.",
        },
        {
          intent: "dont",
          text: "Don't use icon-only buttons with FlowButton — use FlowIconButton instead.",
        },
        {
          intent: "info",
          text: "FlowButton composes ActionSurface (L2), which provides state resolution, focus, and aria.",
        },
        {
          intent: "info",
          text: "Loading state shows spinner but does NOT disable the button — handle onClick accordingly.",
        },
        {
          intent: "info",
          text: "Typography routes through sys.voice.control tokens — line-height: 1 prevents inherited line-height from breaking vertical centering; font-family, weight, and letter-spacing ensure consistency across all control components.",
        },
        {
          intent: "info",
          text: "Transition uses explicit properties (background, color, border-color, box-shadow, opacity) — not 'all' — for predictable animation behavior.",
        },
        {
          intent: "info",
          text: "fullWidth uses data-full-width attribute (not inline style) so density/theme CSS overrides cascade correctly.",
        },
        {
          intent: "info",
          text: "Density-aware: height (40/48/56px), padding, and font size shift ±1 step in compact/comfortable.",
        },
        {
          intent: "info",
          text: "Loading label opacity transition is CSS-driven via .flow-btn-v2[aria-busy='true'] .flow-btn-label — animation timing controlled by Momentum foundation, not inline styles.",
        },
        {
          intent: "info",
          text: "Warning emphasis has complete state lifecycle: default (subtle yellow) → hover (filled amber) → active (darker amber) → disabled (faint tint) → loading (subtle + spinner). Same subtle→filled paradigm as danger.",
        },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(FlowButton, {
          variant: props.variant,
          size: props.size,
          disabled: !!props.disabled,
          loading: !!props.loading,
          fullWidth: !!props.fullWidth,
          leadingIcon: props.leadingIcon,
          children: props.children ?? "Click me",
        } as React.ComponentProps<typeof FlowButton>),
      defaults: {
        children: "Click me",
        variant: "primary",
        size: "md",
        disabled: false,
        loading: false,
        fullWidth: false,
      },
    },
  },

  // ─── FlowIconButton ───
  "controls/flow-icon-button": {
    domain: "Controls",
    spec: {
      name: "FlowIconButton",
      purpose:
        "Square, icon-only action trigger for toolbars and compact UIs. Composes ActionSurface (L2 primitive) with same emphasis levels as FlowButton. Supports selected state for toggles (visual varies by emphasis), optional tooltips via FlowTooltip composition, loading state with spinner. REQUIRES aria-label for accessibility.",
      platform: "shared",
      anatomy: [
        {
          part: "ActionSurface wrapper",
          description:
            "L2 primitive <button> — handles disabled, loading, focus, aria, and state resolution",
          tokens: [],
        },
        {
          part: "Square container",
          description:
            "Icon button styling — background, border, radius via [data-variant] and [data-size]",
          tokens: [
            "comp.iconbutton.bg",
            "comp.iconbutton.border",
            "comp.iconbutton.radius",
            "comp.iconbutton.size",
            "comp.iconbutton.padding",
          ],
        },
        {
          part: "Icon",
          description:
            "FlowIcon component — size matches button size. Replaced by spinner when loading.",
          tokens: ["comp.iconbutton.icon-size", "comp.iconbutton.icon-color"],
        },
        {
          part: "Loading spinner",
          description: "FlowCircularProgress shown when loading={true}",
          tokens: [],
        },
        {
          part: "Tooltip (optional)",
          description:
            "FlowTooltip wrapper — composed internally when tooltip prop is provided. Shows on hover/focus.",
          tokens: [],
        },
      ],
      variants: ["High", "Medium", "Low", "Outline", "Danger", "Warning", "Ghost"],
      states: ["default", "hover", "focus-visible", "pressed", "selected", "disabled", "loading"],
      accessibility: {
        handled: [
          "Semantic <button> element via ActionSurface",
          "aria-label REQUIRED — screen readers cannot infer meaning from icons",
          "disabled attribute prevents interaction when disabled={true}",
          "Focus ring visible for keyboard navigation (focus-visible)",
          "aria-pressed when selected={true} for toggle buttons",
        ],
        required: [
          "ALWAYS provide aria-label — it's required for icon buttons",
          "Make aria-label descriptive (e.g., 'Delete item' not 'Trash icon')",
        ],
        keyboard: [
          { key: "Tab", action: "Focus button" },
          { key: "Enter / Space", action: "Activate" },
        ],
        wcag: ["2.1.1", "4.1.2"],
      },
    },
    demos: {
      overview: () => <FlowIconButtonOverview />,
      variants: () => <FlowIconButtonVariants />,
    },
    developer: {
      reactImport: `import { FlowIconButton } from "@flow/design-system";`,
      reactUsage: `// Basic icon button (aria-label REQUIRED)
<FlowIconButton icon="heart" aria-label="Favorite" />

// All emphasis levels
<FlowIconButton icon="star" variant="primary" aria-label="Star" />
<FlowIconButton icon="bookmark" variant="secondary" aria-label="Bookmark" />
<FlowIconButton icon="share-2" variant="tertiary" aria-label="Share" />
<FlowIconButton icon="edit-2" variant="outlined" aria-label="Edit" />
<FlowIconButton icon="trash-2" variant="primary" intent="danger" aria-label="Delete" />
<FlowIconButton icon="more-vertical" variant="ghost" aria-label="More options" />

// All sizes
<FlowIconButton icon="settings" size="sm" aria-label="Settings" />
<FlowIconButton icon="settings" size="md" aria-label="Settings" />
<FlowIconButton icon="settings" size="lg" aria-label="Settings" />
<FlowIconButton icon="settings" size="xl" aria-label="Settings" />

// With tooltip (visual hint, NOT a11y replacement)
<FlowIconButton
  icon="copy"
  aria-label="Copy to clipboard"
  tooltip="Copy"
/>

// Selected state (for toggles)
const [isBold, setIsBold] = useState(false);

<FlowIconButton
  icon="bold"
  variant="tertiary"
  selected={isBold}
  onClick={() => setIsBold(!isBold)}
  aria-label="Bold"
/>

// Toolbar pattern
<Inline gap={0.5}>
  <FlowIconButton icon="bold" variant="tertiary" aria-label="Bold" selected={bold} />
  <FlowIconButton icon="italic" variant="tertiary" aria-label="Italic" selected={italic} />
  <FlowIconButton icon="underline" variant="tertiary" aria-label="Underline" selected={underline} />
</Inline>

// Loading state
<FlowIconButton
  icon="refresh-cw"
  aria-label="Refresh"
  loading={isLoading}
  onClick={handleRefresh}
/>

// Disabled
<FlowIconButton icon="save" aria-label="Save" disabled />`,
      flutterImport: `import 'package:flow_ds/controls.dart';`,
      flutterUsage: `FlowIconButton(
  icon: Icons.favorite,
  onPressed: handleFavorite,
  // Tooltip provides accessible label in Flutter
  tooltip: 'Favorite',
)

// With emphasis
FlowIconButton(
  icon: Icons.delete,
  emphasis: IconButtonEmphasis.danger,
  onPressed: handleDelete,
  tooltip: 'Delete',
)

// Selected state
FlowIconButton(
  icon: Icons.format_bold,
  selected: isBold,
  onPressed: () => setState(() => isBold = !isBold),
  tooltip: 'Bold',
)`,
      notes:
        "FlowIconButton is essential for toolbars, compact layouts, and icon-driven UIs. Unlike FlowButton, aria-label is REQUIRED because screen readers cannot infer meaning from icons. The tooltip prop composes FlowTooltip internally for visual context but does NOT replace aria-label. Selected state visual varies by emphasis — each emphasis uses its identity channel as accent carrier (high: fill shift, medium: fill + border, low: fill only, outline: border only, ghost: icon color only). Always use descriptive aria-labels (e.g., 'Delete item' not 'Trash icon').",
      props: [
        {
          name: "icon",
          type: "string",
          description:
            "Icon name from lucide-react. Shown in button center. Replaced by spinner when loading.",
          required: true,
        },
        {
          name: "aria-label",
          type: "string",
          description:
            "REQUIRED accessible label — screen readers cannot infer meaning from icons alone.",
          required: true,
        },
        {
          name: "variant",
          type: '"primary" | "secondary" | "tertiary" | "outlined" | "ghost"',
          default: '"tertiary"',
          description: "Visual variant — controls background, border, and icon color.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"md" (density-aware)',
          description: "Size variant — controls button dimensions and icon size (square).",
        },
        {
          name: "onClick",
          type: "() => void",
          description: "Click handler. Called on mouse click, Enter, or Space.",
          required: false,
        },
        {
          name: "type",
          type: '"button" | "submit" | "reset"',
          default: '"button"',
          description: "HTML button type.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables button and prevents interaction. Adds disabled attribute.",
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          description: "Shows loading spinner instead of icon.",
        },
        {
          name: "selected",
          type: "boolean",
          default: "false",
          description:
            "Toggle selected state — visual varies by emphasis (high: accent fill, medium: accent fill + border, low: accent fill, outline: accent border only, ghost: accent icon only, danger: destructive fill). Sets aria-pressed='true'.",
        },
        {
          name: "tooltip",
          type: "string",
          description:
            "Optional tooltip shown on hover/focus via FlowTooltip composition. Does NOT replace aria-label.",
          required: false,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes appended to button.",
          required: false,
        },
      ],
      guidelines: [
        {
          intent: "do",
          text: "ALWAYS provide descriptive aria-label — it's required for screen reader accessibility.",
        },
        {
          intent: "do",
          text: "Use icon buttons for toolbars, compact layouts, and repeated actions in lists.",
        },
        {
          intent: "do",
          text: "Use selected={true} for toggle buttons like bold, italic, or filter chips.",
        },
        {
          intent: "do",
          text: "Keep tooltips concise — they provide visual hints but are not a replacement for aria-label.",
        },
        {
          intent: "dont",
          text: "Don't omit aria-label — icon buttons are inaccessible without it.",
        },
        {
          intent: "dont",
          text: "Don't use generic aria-labels like 'Icon' or 'Button' — describe the action.",
        },
        {
          intent: "dont",
          text: "Don't use icon buttons for primary actions — use FlowButton with leadingIcon instead.",
        },
        {
          intent: "info",
          text: "FlowIconButton shares the same emphasis levels as FlowButton for visual consistency.",
        },
        {
          intent: "info",
          text: "The tooltip prop composes FlowTooltip internally — no manual wrapping needed.",
        },
        {
          intent: "info",
          text: "Selected state visual varies by emphasis: high/medium/low use accent fill, outline uses accent border only, ghost uses accent icon only. aria-pressed='true' is set for screen readers.",
        },
        {
          intent: "info",
          text: "Density-aware: size (32/40/48px), padding, and icon size shift ±1 step in compact/comfortable.",
        },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(FlowIconButton, {
          icon: props.icon || "edit",
          variant: props.variant,
          size: props.size,
          disabled: !!props.disabled,
          selected: !!props.selected,
          "aria-label": "Demo icon button",
        } as React.ComponentProps<typeof FlowIconButton>),
      defaults: {
        icon: "edit",
        variant: "secondary",
        size: "md",
        disabled: false,
        selected: false,
      },
    },
  },

  // ─── FlowFAB ───
  "controls/flow-fab": {
    domain: "Controls",
    spec: {
      name: "FlowFAB",
      purpose:
        "Floating Action Button for primary mobile actions. Composes ActionSurface (L2 primitive) for state resolution, aria attributes, and disabled/loading handling. Fixed-position circular (or pill-shaped when extended) button that floats above content. Designed for the single most important action on a mobile screen (compose, create, add). Supports three color variants, three sizes, extended format with icon + label, loading state with spinner, and four position options.",
      platform: "mobile",
      anatomy: [
        {
          part: "ActionSurface wrapper",
          description:
            "L2 primitive <button> — handles disabled, loading, focus, aria, and state resolution via data-state. Provides .flow-action-surface CSS reset and .flow-focusable focus ring.",
          tokens: [
            "comp.fab.bg",
            "comp.fab.shadow",
            "comp.fab.radius",
            "comp.fab.size",
            "comp.fab.padding",
          ],
        },
        {
          part: "Icon",
          description:
            "FlowIcon component — size matches FAB size. Replaced by FlowCircularProgress spinner during loading.",
          tokens: ["comp.fab.icon-size", "comp.fab.icon-color"],
        },
        {
          part: "Label (extended)",
          description: "Optional text label — makes FAB pill-shaped. Hidden during loading state.",
          tokens: ["comp.fab.label-text", "comp.fab.label-gap", "comp.fab.label-weight"],
        },
        {
          part: "Position anchor",
          description:
            "CSS fixed positioning via data-position attribute — bottom-right, bottom-left, bottom-center, or none (no positioning).",
          tokens: ["comp.fab.position-offset"],
        },
      ],
      variants: ["Primary", "Secondary", "Tertiary"],
      states: ["default", "hover", "focus-visible", "pressed", "disabled", "loading"],
      accessibility: {
        handled: [
          "Semantic <button> via ActionSurface (L2 primitive)",
          "aria-label automatically derived from label prop; falls back to explicit aria-label prop",
          "aria-busy={true} during loading state",
          "data-state resolution: disabled > loading > default (via ActionSurface)",
          "Focus ring visible for keyboard navigation (focus-visible via .flow-focusable)",
        ],
        required: [
          "Provide aria-label when using icon-only FAB (no label prop) — icon name fallback is not descriptive enough",
          "Ensure FAB doesn't obstruct critical content",
        ],
        keyboard: [
          { key: "Tab", action: "Focus FAB (appears in DOM order, not visual position)" },
          { key: "Enter / Space", action: "Activate" },
        ],
        wcag: ["2.1.1", "4.1.2"],
      },
    },
    demos: {
      overview: () => <FlowFABOverview />,
      variants: () => <FlowFABVariants />,
    },
    developer: {
      reactImport: `import { FlowFAB } from "@flow/design-system";`,
      reactUsage: `// Basic FAB (fixed to bottom-right)
<FlowFAB icon="plus" aria-label="Add item" onClick={handleAdd} />

// Extended FAB (with label)
<FlowFAB icon="edit-3" label="Compose" onClick={handleCompose} />

// All sizes
<FlowFAB icon="plus" size="sm" aria-label="Add" />
<FlowFAB icon="plus" size="md" aria-label="Add" />
<FlowFAB icon="plus" size="lg" aria-label="Add" />

// All variants
<FlowFAB icon="heart" variant="primary" aria-label="Favorite" />
<FlowFAB icon="bookmark" variant="secondary" aria-label="Bookmark" />
<FlowFAB icon="share-2" variant="tertiary" aria-label="Share" />

// Positions
<FlowFAB icon="plus" position="bottom-right" aria-label="Add" />
<FlowFAB icon="plus" position="bottom-left" aria-label="Add" />
<FlowFAB icon="plus" position="bottom-center" aria-label="Add" />
<FlowFAB icon="plus" position="none" aria-label="Add" />

// Disabled
<FlowFAB icon="plus" disabled aria-label="Add" />

// Loading
<FlowFAB icon="plus" loading aria-label="Creating..." />

// Common pattern: Email compose
<FlowFAB
  icon="edit-3"
  label="Compose"
  variant="primary"
  onClick={handleCompose}
/>

// Common pattern: Add new item
<FlowFAB
  icon="plus"
  variant="primary"
  size="lg"
  onClick={handleCreate}
  aria-label="Create new item"
/>`,
      flutterImport: `import 'package:flow_ds/mobile.dart';`,
      flutterUsage: `FlowFAB(
  icon: Icons.add,
  onPressed: handleAdd,
)

// Extended FAB
FlowFAB(
  icon: Icons.edit,
  label: 'Compose',
  onPressed: handleCompose,
)

// With variant
FlowFAB(
  icon: Icons.favorite,
  variant: FABVariant.primary,
  onPressed: handleFavorite,
)

// With position
FlowFAB(
  icon: Icons.add,
  position: FABPosition.bottomLeft,
  onPressed: handleAdd,
)`,
      notes:
        "FlowFAB composes ActionSurface (L2 primitive) — ActionSurface handles state resolution (disabled > loading > default), aria attributes, focus management, and the .flow-action-surface CSS reset. This is the same architecture as FlowButton and FlowIconButton. FlowFAB is designed exclusively for mobile layouts and should represent the SINGLE most important action on a screen (typically create, compose, or add). Use the extended format (with label) for primary actions that benefit from clarity, especially on first use. FAB positioning uses CSS fixed positioning via data-position attribute, not portals or overlays. The loading state replaces the icon with FlowCircularProgress spinner and hides the label (extended). All three variants (primary, secondary, tertiary) have complete hover and active state transitions. Primary is most common; secondary/tertiary for less prominent floating actions. Avoid using FABs on desktop — use FlowButton instead.",
      props: [
        {
          name: "icon",
          type: "string",
          description:
            "Icon name from lucide-react. Shown in FAB center. Replaced by spinner during loading.",
          required: true,
        },
        {
          name: "label",
          type: "string",
          description:
            "Optional text label — makes FAB extended (pill-shaped). Hidden during loading. Improves clarity for primary actions.",
          required: false,
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: "Size variant — controls FAB diameter, icon size, and spinner size.",
        },
        {
          name: "variant",
          type: '"primary" | "secondary" | "tertiary"',
          default: '"primary"',
          description:
            "Color variant — controls background and icon color. All variants have hover and active state transitions.",
        },
        {
          name: "onClick",
          type: "() => void",
          description:
            "Click handler. Called on tap, Enter, or Space. Ignored when disabled or loading.",
          required: false,
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables FAB and prevents interaction. Reduces opacity via ActionSurface.",
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          description:
            "Shows spinner, hides icon/label, prevents interaction. Uses FlowCircularProgress sized to match FAB size.",
        },
        {
          name: "position",
          type: '"bottom-right" | "bottom-left" | "bottom-center" | "none"',
          default: '"bottom-right"',
          description:
            "Fixed position in viewport. Use 'none' for non-fixed FABs (e.g., inside scrollable content).",
        },
        {
          name: "type",
          type: '"button" | "submit" | "reset"',
          default: '"button"',
          description: "HTML button type. Forwarded to ActionSurface.",
        },
        {
          name: "aria-label",
          type: "string",
          description:
            "Accessible label. Required when no label prop is provided. During loading, automatically set to 'Loading...'.",
          required: false,
        },
        {
          name: "ref",
          type: "React.Ref<HTMLButtonElement>",
          description: "Forwarded ref to the underlying button element via ActionSurface.",
          required: false,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes appended to FAB.",
          required: false,
        },
        {
          name: "style",
          type: "CSSProperties",
          description: "Inline styles on FAB.",
          required: false,
        },
      ],
      guidelines: [
        {
          intent: "do",
          text: "Use FAB for the SINGLE most important action on a mobile screen (create, compose, add).",
        },
        {
          intent: "do",
          text: "Use extended format (with label) for primary actions to improve discoverability.",
        },
        {
          intent: "do",
          text: "Position FAB in the bottom-right corner (default) for thumb-friendly access on mobile.",
        },
        {
          intent: "do",
          text: "Provide explicit aria-label when using icon-only FABs — do not rely on icon name fallback.",
        },
        {
          intent: "do",
          text: "Use loading state for async primary actions (e.g., creating a new item).",
        },
        {
          intent: "dont",
          text: "Don't use multiple FABs on one screen — it dilutes the primary action.",
        },
        { intent: "dont", text: "Don't use FABs on desktop — use FlowButton instead." },
        {
          intent: "dont",
          text: "Don't position FABs where they obstruct critical content or navigation.",
        },
        {
          intent: "dont",
          text: "Don't use FABs for destructive actions — they're designed for positive, creative actions.",
        },
        {
          intent: "info",
          text: "FlowFAB composes ActionSurface (L2) — same architecture as FlowButton and FlowIconButton.",
        },
        {
          intent: "info",
          text: "FAB positioning uses CSS fixed positioning with z-index layering — not portals.",
        },
        {
          intent: "info",
          text: "Extended FABs use pill shape (border-radius: round) based on label presence.",
        },
        {
          intent: "info",
          text: "FABs appear in DOM order for keyboard navigation, not based on visual position.",
        },
        {
          intent: "info",
          text: "Primary variant is most common; use secondary/tertiary for less prominent floating actions.",
        },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(FlowFAB, {
          icon: (props.icon as string) || "plus",
          variant: props.variant,
          size: props.size,
          disabled: !!props.disabled,
          loading: !!props.loading,
          label: props.label,
          position: "none",
          "aria-label": "Demo FAB",
        } as React.ComponentProps<typeof FlowFAB>),
      defaults: {
        icon: "plus",
        variant: "primary",
        size: "md",
        disabled: false,
        loading: false,
        label: "",
      },
    },
  },
};
