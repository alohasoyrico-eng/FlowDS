/* FLOW Core Components Page - Layer 5 Template */
import { FlowChip, Inline, Stack } from "../../lib";
import { type ComponentSpec, ComponentSpecAccordion } from "../components/component-accordion";
import { PAGE_GAP, PageHeader } from "../components/doc-primitives";

interface CoreSpec extends ComponentSpec {
  foundations: string[];
}

const coreComponents: CoreSpec[] = [
  {
    name: "Button",
    purpose:
      "The primary action trigger. Communicates hierarchy through emphasis levels (high, medium, low, outline, danger, warning, ghost) and conveys loading/disabled states clearly.",
    anatomy: [
      "Container (ActionSurface)",
      "StateLayer",
      "Leading icon (optional)",
      "Label (Text primitive)",
      "Trailing icon (optional)",
      "Loading spinner (replaces label)",
    ],
    variants: [
      "High — dark filled, highest emphasis for primary actions",
      "Medium — outlined with border, standard secondary actions",
      "Outline — transparent bg, accent text, strong border (V-008 addition)",
      "Low — link-style with underline, tertiary/navigational actions",
      "Danger — subtle-to-filled paradigm (D2), destructive actions",
      "Warning — subtle-to-filled paradigm, cautionary non-destructive actions",
      "Ghost — minimal chrome, tertiary actions in dense UIs",
    ],
    states: ["default", "hover", "focus-visible", "pressed", "disabled", "loading"],
    statePrecedence: "disabled > loading > pressed > focus-visible > hover > default",
    tokens: [
      "comp.button.bg.*",
      "comp.button.text.*",
      "comp.button.border.*",
      "comp.button.padding.*",
      "comp.button.radius",
      "comp.button.height.*",
      "comp.button.borderWidth",
      "comp.button.gap",
    ],
    foundations: ["Energy", "Voice", "Frame", "State", "Momentum", "Iconography"],
    accessibility: [
      "role='button'",
      "aria-disabled when disabled",
      "aria-busy when loading",
      "Minimum 44px touch target on mobile",
      "Focus ring via FocusRing primitive",
      "Loading state announced to screen readers",
    ],
    tone: "Labels use sentence case, verb-first ('Save changes', 'Delete account'). Destructive buttons must clearly state the irreversible action.",
    growth:
      "Tracks impressions and click events. Primary vs secondary click ratios inform hierarchy effectiveness.",
    platformNotes:
      "React: renders <button> with .flow-btn-v2 CSS class + data-variant attribute. Flutter: renders with FlowButtonEmphasis enum (high/medium/low/outline/danger/warning/ghost) — V-008 aligned 1:1. Touch targets enlarge on mobile density.",
  },
  {
    name: "IconButton",
    purpose:
      "A compact action trigger using only an icon. Always requires a tooltip and accessible label. Used in toolbars, table rows, and compact layouts.",
    anatomy: [
      "Container (button, square)",
      "StateLayer (CSS :hover/:active)",
      "Icon (FlowIcon)",
      "Tooltip (CSS ::after on hover/focus)",
    ],
    variants: [
      "High — dark filled, same as Button.high",
      "Medium — outlined with border, same as Button.medium",
      "Outline — transparent bg, accent icon, strong border (V-008 aligned)",
      "Low — ghost bg, subtle icon for tertiary toolbar actions",
      "Danger — subtle tint → filled on hover, same as Button.danger",
      "Warning — subtle tint → filled on hover, same as Button.warning",
      "Ghost — minimal chrome, icon-only tertiary actions",
    ],
    states: ["default", "hover", "focus-visible", "pressed", "disabled", "loading"],
    statePrecedence: "disabled > loading > pressed > focus-visible > hover > default",
    tokens: [
      "comp.iconButton.bg{High,Medium,Low,DangerSubtle}.*",
      "comp.iconButton.icon{High,Medium,Low,Danger}.*",
      "comp.iconButton.border{Medium,Disabled}",
      "comp.iconButton.radius",
      "comp.iconButton.borderWidth",
      "comp.iconButton.size.*",
      "comp.iconButton.iconSize.*",
    ],
    foundations: ["Energy", "State", "Iconography", "Frame"],
    accessibility: [
      "aria-label required (icon is not self-describing)",
      "Tooltip provides visual label via data-tooltip + CSS ::after",
      "Minimum 32px target on desktop (sm), 40px default (md), 48px large (lg)",
    ],
    tone: "Tooltip text is a brief verb phrase: 'Edit', 'Delete', 'More options'.",
    growth: "Tracks click events. Low click rates may indicate the icon metaphor is unclear.",
    platformNotes:
      "React: renders <button> with .flow-icon-btn CSS class + data-variant/data-size attributes. Variant model aligned 1:1 with FlowButton (7 levels: high/medium/low/outline/danger/warning/ghost). Loading state shows spinning loader icon via flowSpin keyframe. Low disabled keeps transparent bg. CSS tooltip via ::after pseudo-element. Flutter: renders with FlowButtonEmphasis enum — V-008 aligned.",
  },
  {
    name: "ToggleButton",
    purpose:
      "A button that toggles between on/off states. Used for binary settings inline with content (e.g., bold/italic in a toolbar).",
    anatomy: [
      "Container (ActionSurface)",
      "StateLayer",
      "Icon or label",
      "Selected indicator (background fill or border change)",
    ],
    variants: [
      "Icon toggle \u2014 single icon, selected state changes fill",
      "Label toggle \u2014 text label, selected state changes background",
      "Grouped \u2014 used within SegmentedControl",
    ],
    states: ["default", "hover", "focus-visible", "pressed", "selected", "disabled"],
    statePrecedence:
      "disabled > selected+pressed > selected+hover > selected > pressed > focus-visible > hover > default",
    tokens: [
      "comp.toggle.bg.*",
      "comp.toggle.border.*",
      "comp.toggle.icon.color.*",
      "comp.toggle.selected.*",
    ],
    foundations: ["Energy", "State", "Frame"],
    accessibility: [
      "aria-pressed='true'/'false'",
      "State change announced to screen readers",
      "Keyboard: Space/Enter toggles",
    ],
    tone: "If labeled, uses the property being toggled: 'Bold', 'Mute', 'Pin'.",
    growth: "Tracks toggle frequency and final state distribution.",
    platformNotes:
      "Identical behavior cross-platform. Visual selected indicator may differ (filled on web, checkmark on mobile).",
  },
  {
    name: "SegmentedControl",
    purpose:
      "A horizontal set of mutually exclusive options. Used when there are 2-5 options and the selection is immediate (no submit needed).",
    anatomy: [
      "Container (Surface)",
      "Segments (ActionSurface each)",
      "StateLayer per segment",
      "Selected indicator (sliding background)",
      "Labels and/or icons",
    ],
    variants: [
      "Text-only segments",
      "Icon-only segments",
      "Icon + text segments",
      "Full-width (stretches to container) vs auto-width",
    ],
    states: [
      "default",
      "hover",
      "focus-visible",
      "pressed",
      "selected",
      "disabled (per segment or whole)",
    ],
    statePrecedence: "disabled > selected > pressed > focus-visible > hover > default",
    tokens: [
      "comp.segmented.bg.*",
      "comp.segmented.indicator.*",
      "comp.segmented.text.*",
      "comp.segmented.radius",
      "comp.segmented.padding.*",
    ],
    foundations: ["Energy", "Voice", "Frame", "State", "Momentum"],
    accessibility: [
      "role='radiogroup' on container",
      "role='radio' on each segment",
      "aria-checked on selected",
      "Arrow keys navigate between segments",
    ],
    tone: "Segment labels are short nouns or categories: 'Day', 'Week', 'Month'.",
    growth: "Tracks selection distribution to understand preference patterns.",
    platformNotes:
      "Animated sliding indicator on both platforms. Spring physics on mobile, eased transition on web.",
  },
  {
    name: "Card",
    purpose:
      "A contained surface for grouping related content. Cards establish visual hierarchy through elevation and can be interactive (clickable) or static.",
    anatomy: [
      "Surface (with elevation)",
      "Header area (optional: title, subtitle, action)",
      "Content area",
      "Footer area (optional: actions, metadata)",
      "Media area (optional: image, illustration)",
    ],
    variants: [
      "Elevated \u2014 shadow-based depth",
      "Outlined \u2014 border, no shadow",
      "Filled \u2014 secondary surface color, no shadow",
      "Interactive \u2014 clickable, shows hover/press states",
    ],
    states: [
      "default",
      "hover (interactive only)",
      "focus-visible (interactive only)",
      "pressed (interactive only)",
      "selected",
      "disabled",
    ],
    statePrecedence: "disabled > selected > pressed > focus-visible > hover > default",
    tokens: [
      "comp.card.bg.*",
      "comp.card.border.*",
      "comp.card.elevation.*",
      "comp.card.radius",
      "comp.card.padding.*",
    ],
    foundations: ["Depth", "Energy", "Frame", "State"],
    accessibility: [
      "Interactive cards: role='article' or role='link' with aria-label",
      "Focus ring on keyboard navigation",
      "Content inside is naturally accessible",
    ],
    tone: "Card titles are concise nouns. Description text follows body copy rules.",
    growth:
      "Interactive cards track click-through rate. Non-interactive cards track content impression.",
    platformNotes:
      "Elevation rendering differs: CSS box-shadow on web, Material elevation on Flutter. Visual result should match.",
  },
  {
    name: "KPI Card",
    purpose:
      "A specialized card for displaying key performance indicators \u2014 a metric value with label, trend indicator, and optional sparkline or comparison.",
    anatomy: [
      "Surface",
      "Metric label (Text, caption role)",
      "Metric value (Text, display role)",
      "Trend indicator (icon + percentage)",
      "Comparison text (optional)",
      "Sparkline (optional)",
    ],
    variants: [
      "Standard \u2014 label + value + trend",
      "Compact \u2014 value + trend only",
      "Expanded \u2014 includes sparkline and comparison period",
      "Alert \u2014 highlighted border when metric exceeds threshold",
    ],
    states: [
      "default",
      "hover (if interactive)",
      "alert (threshold exceeded)",
      "loading (skeleton)",
    ],
    statePrecedence: "alert > loading > hover > default",
    tokens: [
      "comp.kpi.bg.*",
      "comp.kpi.value.*",
      "comp.kpi.label.*",
      "comp.kpi.trend.*",
      "comp.kpi.alert.*",
    ],
    foundations: ["Energy", "Voice", "Frame", "Depth", "State"],
    accessibility: [
      "aria-label includes full metric description",
      "Trend direction communicated via text, not just color",
      "Sparkline has aria-hidden (decorative)",
    ],
    tone: "Labels are the metric name: 'Revenue', 'Active Users'. Trend text: '+12.5% vs last month'.",
    growth:
      "Tracks which KPIs receive visual attention (impression duration) and which trigger drill-down.",
    platformNotes: "Sparkline rendered via canvas/CustomPaint. Touch on mobile opens detail view.",
  },
  {
    name: "Divider",
    purpose:
      "A visual separator between content sections. Purely decorative \u2014 communicates rhythm and grouping.",
    anatomy: [
      "Horizontal or vertical line",
      "Optional inset (margin from edges)",
      "Optional label (centered text)",
    ],
    variants: [
      "Full-bleed \u2014 edge to edge",
      "Inset \u2014 padded from leading edge",
      "Labeled \u2014 text centered on the line",
      "Vertical \u2014 for inline separation",
    ],
    states: ["default (static only)"],
    statePrecedence: "N/A \u2014 Divider has no interactive states.",
    tokens: [
      "comp.divider.color",
      "comp.divider.thickness",
      "comp.divider.inset",
      "comp.divider.label.*",
    ],
    foundations: ["Energy", "Frame", "Voice (for labeled variant)"],
    accessibility: [
      "role='separator'",
      "aria-orientation='horizontal' or 'vertical'",
      "Labeled divider: text is accessible",
    ],
    tone: "Label text (when used) is a short section name: 'Or', 'Advanced Options'.",
    growth: "No tracking \u2014 Divider is decorative.",
    platformNotes: "Identical across platforms. 1px rendered as hairline on high-DPI displays.",
  },
  {
    name: "List / ListItem",
    purpose:
      "A structured vertical collection of items. ListItems can be interactive (navigational, selectable) or informational.",
    anatomy: [
      "List container",
      "ListItem: leading area (icon/avatar), content (primary + secondary text), trailing area (action/metadata/chevron)",
      "Dividers between items (optional)",
    ],
    variants: [
      "Single-line \u2014 title only",
      "Two-line \u2014 title + description",
      "Three-line \u2014 title + description + metadata",
      "Interactive \u2014 navigational with chevron",
      "Selectable \u2014 checkbox/radio integration",
    ],
    states: ["default", "hover", "focus-visible", "pressed", "selected", "disabled"],
    statePrecedence: "disabled > selected > pressed > focus-visible > hover > default",
    tokens: [
      "comp.list.bg.*",
      "comp.list.item.padding.*",
      "comp.list.item.height.*",
      "comp.list.divider.*",
      "comp.list.text.*",
    ],
    foundations: ["Energy", "Voice", "Frame", "State", "Iconography"],
    accessibility: [
      "role='list' on container, role='listitem' on items",
      "Selectable lists: role='listbox' + role='option'",
      "Arrow keys navigate, Enter selects",
    ],
    tone: "Primary text is the item name. Secondary text provides context. Trailing text is metadata (date, count).",
    growth: "Tracks item selection frequency to inform default ordering.",
    platformNotes:
      "Native list scrolling on mobile (momentum scroll). Virtual scrolling for large lists on web.",
  },
  {
    name: "Avatar",
    purpose:
      "Represents a user or entity with an image, initials, or placeholder icon. Supports status indicators.",
    anatomy: [
      "Container (circle or rounded square)",
      "Image / Initials / Placeholder icon",
      "Status badge (optional: online, away, busy)",
    ],
    variants: [
      "Image \u2014 user photo",
      "Initials \u2014 first letter(s) with generated background color",
      "Placeholder \u2014 generic user icon",
      "Group \u2014 overlapping avatars for multiple users",
    ],
    states: ["default", "loading (skeleton circle)"],
    statePrecedence: "loading > default",
    tokens: [
      "comp.avatar.size.*",
      "comp.avatar.radius",
      "comp.avatar.bg.*",
      "comp.avatar.text.*",
      "comp.avatar.status.*",
    ],
    foundations: ["Energy", "Voice", "Frame", "Iconography"],
    accessibility: [
      "alt text for image avatars",
      "aria-label for initials/placeholder",
      "Status badge has aria-label ('Online', 'Away')",
    ],
    tone: "Alt text: '{Name}'s avatar'. Status: 'Online', 'Away', 'Do not disturb'.",
    growth: "No direct tracking. Avatar presence in UI affects perceived personalization.",
    platformNotes:
      "Image loading with progressive placeholder on both platforms. Initials color generation uses deterministic hash of name.",
  },
  {
    name: "Badge",
    purpose:
      "A small visual indicator attached to another element \u2014 shows count, status, or attention signal.",
    anatomy: [
      "Container (pill or dot)",
      "Content (number or empty)",
      "Anchor positioning relative to parent",
    ],
    variants: [
      "Dot \u2014 empty circle, attention signal",
      "Count \u2014 number inside pill",
      "Max \u2014 shows '99+' when exceeding threshold",
      "Status \u2014 colored dot with semantic meaning",
    ],
    states: ["default", "hidden (count = 0, optionally hidden)"],
    statePrecedence: "N/A \u2014 Badge is informational.",
    tokens: ["comp.badge.bg.*", "comp.badge.text.*", "comp.badge.size.*", "comp.badge.offset.*"],
    foundations: ["Energy", "Voice", "Frame"],
    accessibility: [
      "aria-label describing the count or status",
      "Screen reader: '{count} notifications'",
      "Hidden badges have aria-hidden",
    ],
    tone: "Screen reader text is a full phrase: '5 unread messages', not just '5'.",
    growth: "Badge visibility correlates with engagement \u2014 track dismiss rates.",
    platformNotes:
      "Positioning uses absolute offset on web, overlay on Flutter. Animated appearance with Momentum tokens.",
  },
  {
    name: "Chip",
    purpose:
      "A compact, interactive element for selections, filters, or status display. Chips can be dismissible, selectable, or purely informational.",
    anatomy: [
      "Container (ActionSurface, pill shape)",
      "StateLayer",
      "Leading icon or avatar (optional)",
      "Label",
      "Trailing dismiss icon (optional)",
    ],
    variants: [
      "Base \u2014 static informational label",
      "Filter \u2014 toggleable, used in filter bars",
      "Status \u2014 semantic color (success, warning, error)",
      "Input \u2014 removable, used in multi-select",
    ],
    states: ["default", "hover", "focus-visible", "pressed", "selected", "disabled"],
    statePrecedence: "disabled > selected > pressed > focus-visible > hover > default",
    tokens: [
      "comp.chip.bg.*",
      "comp.chip.text.*",
      "comp.chip.border.*",
      "comp.chip.padding-x",
      "comp.chip.padding-y",
      "comp.chip.radius",
    ],
    foundations: ["Energy", "Voice", "Frame", "State", "Iconography"],
    accessibility: [
      "Filter chips: role='checkbox' with aria-checked",
      "Dismiss button: aria-label='Remove {label}'",
      "Keyboard: Enter toggles, Delete/Backspace removes",
    ],
    tone: "Labels are short nouns or adjectives: 'Active', 'USD', 'High Priority'.",
    growth: "Filter chips: track which filters are most/least used.",
    platformNotes: "Consistent pill shape. Dismiss icon touch target extended on mobile.",
  },
  {
    name: "TextField",
    purpose:
      "Single-line text input. The workhorse of forms. Supports labels, placeholders, helper text, error states, and leading/trailing adornments.",
    anatomy: [
      "FormField wrapper (label, helper, error)",
      "Input container (Surface)",
      "Leading adornment (icon or text)",
      "Input element",
      "Trailing adornment (icon, clear button, character count)",
      "StateLayer (on hover/focus of container)",
    ],
    variants: [
      "Outlined \u2014 border container",
      "Filled \u2014 background fill container",
      "With adornments \u2014 prefix/suffix text or icons",
      "Password \u2014 masked with toggle visibility",
    ],
    states: [
      "default",
      "hover",
      "focus",
      "filled (has value)",
      "error",
      "success",
      "disabled",
      "readonly",
    ],
    statePrecedence: "disabled > error > success > focus > hover > filled > default",
    tokens: [
      "comp.textfield.bg.*",
      "comp.textfield.border.*",
      "comp.textfield.text.*",
      "comp.textfield.placeholder.*",
      "comp.textfield.padding.*",
      "comp.textfield.radius",
      "comp.textfield.height",
    ],
    foundations: ["Energy", "Voice", "Frame", "State", "Tone"],
    accessibility: [
      "Linked label via htmlFor/id",
      "aria-invalid on error",
      "aria-describedby for helper/error text",
      "Required: aria-required",
    ],
    tone: "Placeholders are example values, not instructions: 'john@example.com' not 'Enter your email'. Error messages are actionable: 'Enter a valid email address'.",
    growth: "Track completion rates, error frequency, and time-to-fill for optimization.",
    platformNotes:
      "Native input on web, TextFormField on Flutter. Keyboard type hints (email, number) on mobile.",
  },
  {
    name: "TextInput",
    purpose:
      "Tall (64px) floating-label input from Figma Edenred. Designed for prominent form fields where label context must remain visible after the user starts typing. Features progressive border-width (1.5px→2px), animated floating label via CSS transforms, conditional clear button, and hint/error text with warning icon.",
    anatomy: [
      "Root wrapper (.flow-text-input)",
      "Bordered container (.flow-text-input-container)",
      "Floating label (<label>, transform-animated)",
      "Native input (transparent bg, absolutely positioned)",
      "Clear button (FlowIcon 'close', opacity-animated)",
      "Hint/error text (with FlowIcon 'x-circle' on error)",
    ],
    variants: [
      "Default — standard floating-label input",
      "With hint — helper text below container",
      "With error — error message + warning icon replaces hint",
      "Clearable — shows × button on focus/hover when has value",
      "Disabled — muted bg/border, cursor not-allowed",
    ],
    states: [
      "default",
      "hover (border 2px)",
      "focus (border 2px blue, label blue)",
      "pressed (bg neutral[100], no focus-within)",
      "filled (has value, label floated)",
      "error (border red, label red, hint red + icon)",
      "disabled (bg neutral[50], border neutral[300], muted label)",
    ],
    statePrecedence: "disabled > error > focus > hover > filled > default",
    tokens: [
      "comp.textinput.bg.*",
      "comp.textinput.border.*",
      "comp.textinput.borderWidth.*",
      "comp.textinput.text",
      "comp.textinput.label.*",
      "comp.textinput.placeholder",
      "comp.textinput.hint.*",
      "comp.textinput.height",
      "comp.textinput.radius",
      "comp.textinput.padding",
      "comp.textinput.gap",
      "comp.textinput.contentGap",
      "comp.textinput.clearSize",
      "comp.textinput.labelSize.*",
      "comp.textinput.valueSize",
      "comp.textinput.hintSize",
    ],
    foundations: ["Energy", "Voice", "Frame", "State", "Momentum", "Iconography"],
    accessibility: [
      "label linked via htmlFor/id",
      "aria-invalid on error",
      "aria-describedby for hint/error text",
      "Clear button: aria-label='Clear input'",
      "Error hint: role='alert' for live-region announcement",
      "prefers-reduced-motion: transitions disabled",
    ],
    tone: "Labels name the field: 'Email address', 'Full name'. Hints provide constraints: 'Must be at least 8 characters'. Error messages are actionable: 'Enter a valid email address'.",
    growth: "Track fill rate, error rate, clear-button usage, and time-to-complete per field.",
    platformNotes:
      "React: FlowTextInput (forwardRef) with CSS-only states via data-attributes. Floating label uses transform scale(1.334)→scale(1) for compositor-only animation. Border rendered as inset box-shadow to prevent layout shift on width change. Flutter: pending implementation.",
  },
  {
    name: "TextArea",
    purpose:
      "Multi-line text input. Used for comments, descriptions, and longer-form content entry.",
    anatomy: [
      "FormField wrapper",
      "TextArea container (Surface)",
      "Input element (multi-line)",
      "Character count (optional)",
      "Resize handle (web only)",
    ],
    variants: [
      "Fixed height \u2014 set rows",
      "Auto-growing \u2014 expands with content",
      "With character limit \u2014 shows count and limit",
    ],
    states: ["default", "hover", "focus", "filled", "error", "disabled", "readonly"],
    statePrecedence: "disabled > error > focus > hover > filled > default",
    tokens: [
      "comp.textarea.bg.*",
      "comp.textarea.border.*",
      "comp.textarea.text.*",
      "comp.textarea.padding.*",
      "comp.textarea.radius",
      "comp.textarea.minHeight",
    ],
    foundations: ["Energy", "Voice", "Frame", "State", "Tone"],
    accessibility: ["Same as TextField", "Auto-grow: aria-live for character count updates"],
    tone: "Placeholders guide content type: 'Describe the issue in detail...'",
    growth: "Track average content length and abandonment rate.",
    platformNotes:
      "Auto-grow behavior implemented differently: CSS resize on web, intrinsic height on Flutter.",
  },
  {
    name: "Checkbox",
    purpose:
      "Binary or indeterminate selection control. Used for multiple selections in forms and lists.",
    anatomy: [
      "Container (ActionSurface)",
      "Check box (Surface with border)",
      "Check mark / indeterminate mark (animated)",
      "StateLayer",
      "Label (optional, via FormField)",
    ],
    variants: [
      "Default \u2014 unchecked/checked toggle",
      "Indeterminate \u2014 partial selection (e.g., parent of mixed children)",
      "Error \u2014 red border when validation fails",
    ],
    states: [
      "default",
      "hover",
      "focus-visible",
      "pressed",
      "checked",
      "indeterminate",
      "error",
      "disabled",
    ],
    statePrecedence:
      "disabled > error > checked/indeterminate > pressed > focus-visible > hover > default",
    tokens: [
      "comp.checkbox.size",
      "comp.checkbox.bg.*",
      "comp.checkbox.border.*",
      "comp.checkbox.check.color",
      "comp.checkbox.radius",
    ],
    foundations: ["Energy", "State", "Momentum", "Frame"],
    accessibility: [
      "role='checkbox'",
      "aria-checked='true'/'false'/'mixed'",
      "Keyboard: Space toggles",
      "Label association required",
    ],
    tone: "Labels are the option being selected: 'I agree to the terms', 'Enable notifications'.",
    growth: "Track opt-in/opt-out rates for consent and preference checkboxes.",
    platformNotes:
      "Custom rendered on both platforms (not native checkbox). Check animation uses Momentum tokens.",
  },
  {
    name: "Radio",
    purpose:
      "Single selection from a mutually exclusive group. Used when all options should be visible simultaneously.",
    anatomy: [
      "RadioGroup container",
      "Radio item: container (ActionSurface), circle (outer ring + inner dot), StateLayer, label",
    ],
    variants: [
      "Default \u2014 standard radio group",
      "Card \u2014 each option is a card with radio indicator",
      "Horizontal \u2014 options laid out inline",
    ],
    states: ["default", "hover", "focus-visible", "pressed", "selected", "error", "disabled"],
    statePrecedence: "disabled > error > selected > pressed > focus-visible > hover > default",
    tokens: ["comp.radio.size", "comp.radio.border.*", "comp.radio.dot.*", "comp.radio.gap"],
    foundations: ["Energy", "State", "Frame"],
    accessibility: [
      "role='radiogroup' on container",
      "role='radio' on items",
      "aria-checked",
      "Arrow keys navigate within group",
    ],
    tone: "Labels are the option value: 'Monthly', 'Annually'. Group label is the question: 'Billing frequency'.",
    growth: "Track selection distribution to understand preference defaults.",
    platformNotes: "Custom rendered. Inner dot animation uses scale + Momentum easing.",
  },
  {
    name: "Switch",
    purpose:
      "An immediate toggle for binary settings. Unlike Checkbox, the Switch takes effect immediately (no form submission needed).",
    anatomy: [
      "Track (Surface, pill shape)",
      "Thumb (circle, slides between positions)",
      "StateLayer on thumb",
      "Label (via FormField or inline)",
    ],
    variants: [
      "Default \u2014 standard toggle",
      "With icons \u2014 check/x icons inside thumb",
      "Compact \u2014 smaller for dense UIs",
    ],
    states: ["default", "hover", "focus-visible", "pressed", "checked", "disabled"],
    statePrecedence:
      "disabled > checked+pressed > checked+hover > checked > pressed > focus-visible > hover > default",
    tokens: [
      "comp.switch.track.bg.*",
      "comp.switch.thumb.bg.*",
      "comp.switch.thumb.size",
      "comp.switch.track.width",
      "comp.switch.track.height",
    ],
    foundations: ["Energy", "State", "Momentum", "Frame"],
    accessibility: [
      "role='switch'",
      "aria-checked",
      "Keyboard: Space toggles",
      "State change is immediate \u2014 communicate via aria-live if needed",
    ],
    tone: "Label describes the setting: 'Dark mode', 'Email notifications'. No 'on'/'off' in the label.",
    growth: "Track toggle frequency and final state distribution per setting.",
    platformNotes:
      "Thumb slides with spring easing on mobile, standard easing on web. Track color transitions smoothly.",
  },
  {
    name: "Slider",
    purpose: "A control for selecting a value or range within a continuous or stepped scale.",
    anatomy: [
      "Track (background line)",
      "Fill (active portion of track)",
      "Thumb (draggable circle)",
      "Value label (tooltip or persistent)",
      "Tick marks (for stepped sliders)",
    ],
    variants: [
      "Continuous \u2014 any value in range",
      "Stepped \u2014 discrete values with ticks",
      "Range \u2014 two thumbs for min/max selection",
      "With value label \u2014 shows current value on drag",
    ],
    states: ["default", "hover", "focus-visible", "pressed/dragging", "disabled"],
    statePrecedence: "disabled > pressed > focus-visible > hover > default",
    tokens: [
      "comp.slider.track.*",
      "comp.slider.fill.*",
      "comp.slider.thumb.*",
      "comp.slider.tick.*",
      "comp.slider.label.*",
    ],
    foundations: ["Energy", "State", "Momentum", "Frame"],
    accessibility: [
      "role='slider'",
      "aria-valuenow, aria-valuemin, aria-valuemax",
      "aria-valuetext for formatted values",
      "Keyboard: arrow keys adjust value",
    ],
    tone: "Value labels show formatted values: '$500', '75%', 'Medium'.",
    growth: "Track final value distribution and interaction duration.",
    platformNotes:
      "Drag interaction uses platform gesture system. Value label uses Tooltip primitive.",
  },
  {
    name: "Select",
    purpose:
      "A dropdown for choosing one option from a list. Used when the list is too long for Radio buttons (>5 options) or when space is constrained.",
    anatomy: [
      "Trigger (ActionSurface with current value or placeholder)",
      "Dropdown menu (Surface, elevated)",
      "Option list (ListItems)",
      "Search/filter input (optional)",
      "Selected indicator (checkmark)",
    ],
    variants: [
      "Default \u2014 standard dropdown",
      "Searchable \u2014 includes filter input",
      "Grouped \u2014 options organized in sections",
      "Multi-select \u2014 checkboxes, chip display",
    ],
    states: ["default", "hover", "focus-visible", "open", "error", "disabled"],
    statePrecedence: "disabled > error > open > focus-visible > hover > default",
    tokens: [
      "comp.select.trigger.*",
      "comp.select.menu.*",
      "comp.select.option.*",
      "comp.select.search.*",
    ],
    foundations: ["Energy", "Voice", "Frame", "State", "Depth", "Momentum"],
    accessibility: [
      "role='combobox' on trigger",
      "role='listbox' on menu",
      "role='option' on items",
      "aria-expanded",
      "Keyboard: arrows navigate, Enter selects, Escape closes",
    ],
    tone: "Placeholder: 'Select a country'. Options: clear values, no abbreviations unless standard.",
    growth:
      "Track which options are selected most/least. Track search usage in searchable selects.",
    platformNotes:
      "Web: custom dropdown via Portal. Mobile (Flutter): platform-native picker or custom bottom sheet depending on option count.",
  },
  {
    name: "Autocomplete",
    purpose:
      "A text input with suggestion dropdown. Combines free-text input with option selection. Used for search, tag entry, and entity selection.",
    anatomy: [
      "TextField (input)",
      "Suggestion dropdown (Surface, elevated)",
      "Option items (ListItems)",
      "Loading indicator",
      "No-results message",
    ],
    variants: [
      "Single \u2014 selects one value, populates input",
      "Multi \u2014 allows multiple selections as chips",
      "Free-form \u2014 accepts custom values not in suggestions",
      "Grouped \u2014 suggestions organized by category",
    ],
    states: ["default", "focus/open", "loading", "no-results", "error", "disabled"],
    statePrecedence: "disabled > error > loading > open > default",
    tokens: [
      "comp.autocomplete.input.*",
      "comp.autocomplete.menu.*",
      "comp.autocomplete.option.*",
      "comp.autocomplete.chip.*",
    ],
    foundations: ["Energy", "Voice", "Frame", "State", "Depth", "Momentum", "Tone"],
    accessibility: [
      "role='combobox'",
      "aria-autocomplete='list' or 'both'",
      "aria-activedescendant for highlighted option",
      "Keyboard: arrows navigate, Enter selects, Escape closes",
    ],
    tone: "Placeholder guides expected input: 'Search by name or email'. No-results: 'No results for \"{query}\"'.",
    growth: "Track search queries, selection from suggestions vs custom input, and drop-off rates.",
    platformNotes:
      "Debounced input on both platforms. Mobile may use full-screen search for better UX.",
  },
  {
    name: "Tooltip",
    purpose:
      "A floating label providing additional context for an element. Appears on hover (web) or long-press (mobile). Non-interactive.",
    anatomy: [
      "Trigger element (any focusable element)",
      "Tooltip surface (Surface, elevated, arrow optional)",
      "Text content",
    ],
    variants: [
      "Standard \u2014 text only",
      "Rich \u2014 multi-line or formatted text",
      "Positioned \u2014 top, bottom, left, right with auto-flip",
    ],
    states: ["hidden", "visible (on hover/focus/long-press)"],
    statePrecedence: "N/A \u2014 Tooltip is triggered, not stateful.",
    tokens: [
      "comp.tooltip.bg",
      "comp.tooltip.text.*",
      "comp.tooltip.padding.*",
      "comp.tooltip.radius",
      "comp.tooltip.maxWidth",
      "comp.tooltip.elevation",
    ],
    foundations: ["Energy", "Voice", "Depth", "Momentum"],
    accessibility: [
      "role='tooltip'",
      "aria-describedby links trigger to tooltip",
      "Delay before showing (prevents flashing)",
      "Dismissible on Escape",
    ],
    tone: "Brief, supplementary information: 'Copy to clipboard', 'Last updated 2h ago'. Not instructions.",
    growth:
      "Track tooltip show rate to gauge label clarity \u2014 high tooltip use may indicate poor labeling.",
    platformNotes:
      "Web: hover + focus triggers. Mobile: long-press triggers. Portal rendering to escape overflow.",
  },
  {
    name: "Dialog",
    purpose:
      "A modal overlay for focused tasks requiring user attention or decision. Interrupts the workflow \u2014 use sparingly.",
    anatomy: [
      "Overlay backdrop",
      "Dialog surface (Surface, elevated)",
      "Header (title + optional close button)",
      "Content area",
      "Footer (action buttons)",
      "FocusRing (focus trap inside dialog)",
    ],
    variants: [
      "Alert \u2014 simple message + confirm/cancel",
      "Confirmation \u2014 destructive action confirmation",
      "Form \u2014 contains form inputs",
      "Full-screen (mobile) \u2014 takes entire viewport",
    ],
    states: ["closed", "opening (animated)", "open", "closing (animated)"],
    statePrecedence: "N/A \u2014 Dialog is open or closed.",
    tokens: [
      "comp.dialog.bg",
      "comp.dialog.elevation",
      "comp.dialog.radius",
      "comp.dialog.padding.*",
      "comp.dialog.maxWidth",
      "comp.dialog.overlay.*",
    ],
    foundations: ["Energy", "Voice", "Frame", "Depth", "Momentum", "Tone", "State"],
    accessibility: [
      "role='dialog' or role='alertdialog'",
      "aria-labelledby \u2192 title",
      "aria-describedby \u2192 content",
      "Focus trapped inside",
      "Escape closes",
      "Return focus to trigger on close",
    ],
    tone: "Title is a clear action: 'Delete this project?'. Body explains consequences. Buttons match Tone action conventions.",
    growth:
      "Track open \u2192 action completion rate. High dismiss-without-action rates indicate unnecessary dialogs.",
    platformNotes:
      "Web: Portal + Overlay + focus trap. Flutter: showDialog with custom transition. Mobile may use FullscreenSheet for complex forms.",
  },
  {
    name: "Snackbar",
    purpose:
      "A brief, non-blocking notification at the bottom of the screen. Auto-dismisses. Used for confirmations and non-critical messages.",
    anatomy: [
      "Container (Surface, elevated)",
      "Message text",
      "Action button (optional)",
      "Dismiss button (optional, mobile)",
    ],
    variants: [
      "Informational \u2014 neutral",
      "Success \u2014 green accent",
      "Warning \u2014 yellow accent",
      "Error \u2014 red accent, may not auto-dismiss",
    ],
    states: ["entering", "visible", "exiting"],
    statePrecedence: "N/A \u2014 Snackbar lifecycle is temporal.",
    tokens: [
      "comp.snackbar.bg.*",
      "comp.snackbar.text.*",
      "comp.snackbar.action.*",
      "comp.snackbar.elevation",
      "comp.snackbar.radius",
      "comp.snackbar.padding.*",
    ],
    foundations: ["Energy", "Voice", "Frame", "Depth", "Momentum", "Tone"],
    accessibility: [
      "role='status' or role='alert' (for errors)",
      "aria-live='polite' (info) or 'assertive' (error)",
      "Action is keyboard focusable",
      "Auto-dismiss timing respects content length",
    ],
    tone: "Messages are past tense confirmations: 'Changes saved', 'File uploaded'. With action: 'Item deleted. Undo'.",
    growth: "Track action click rate (especially 'Undo') and whether users notice snackbars.",
    platformNotes:
      "Positioned above BottomNav on mobile. Stacking behavior when multiple snackbars fire.",
  },
  {
    name: "ProgressBar",
    purpose: "Visualizes determinate or indeterminate progress toward completion of a task.",
    anatomy: [
      "Track (background bar)",
      "Fill (progress indicator)",
      "Label (optional percentage or step count)",
    ],
    variants: [
      "Determinate \u2014 known progress percentage",
      "Indeterminate \u2014 unknown duration, animated pattern",
      "Segmented \u2014 discrete steps (e.g., 3 of 5)",
    ],
    states: ["in-progress", "complete", "error"],
    statePrecedence: "error > complete > in-progress",
    tokens: [
      "comp.progress.track.*",
      "comp.progress.fill.*",
      "comp.progress.height",
      "comp.progress.radius",
      "comp.progress.label.*",
    ],
    foundations: ["Energy", "Frame", "Momentum", "Voice"],
    accessibility: [
      "role='progressbar'",
      "aria-valuenow, aria-valuemin, aria-valuemax",
      "aria-label describing what's progressing",
    ],
    tone: "'Uploading... 45%' or 'Step 2 of 4: Payment details'.",
    growth: "Track completion rates and where users abandon multi-step processes.",
    platformNotes: "Indeterminate animation uses Momentum tokens. Identical visual cross-platform.",
  },
  {
    name: "Skeleton",
    purpose:
      "A placeholder that mimics content shape while data loads. Reduces perceived loading time.",
    anatomy: [
      "Rectangular or circular shapes matching content dimensions",
      "Shimmer animation (gradient sweep)",
    ],
    variants: [
      "Text \u2014 narrow rectangles matching text lines",
      "Avatar \u2014 circle",
      "Card \u2014 rounded rectangle",
      "Custom \u2014 arbitrary shapes via children",
    ],
    states: ["loading (always)"],
    statePrecedence: "N/A \u2014 Skeleton is a loading state representation.",
    tokens: ["comp.skeleton.bg", "comp.skeleton.shimmer.*", "comp.skeleton.radius.*"],
    foundations: ["Energy", "Frame", "Momentum"],
    accessibility: [
      "aria-busy='true' on parent",
      "aria-hidden on skeleton elements",
      "Screen reader: announce loading state once, not per skeleton",
    ],
    tone: "N/A \u2014 Skeleton is visual-only.",
    growth: "Track time-to-content to identify slow data fetches.",
    platformNotes:
      "Shimmer animation identical cross-platform. Flutter uses ShaderMask, web uses CSS gradient animation.",
  },
  {
    name: "EmptyState",
    purpose:
      "Displayed when a view has no content. Communicates what the empty area is for and how to populate it.",
    anatomy: [
      "Container (centered within parent)",
      "Illustration (from Illustration foundation)",
      "Title",
      "Description",
      "Primary action (Button)",
      "Secondary action (optional)",
    ],
    variants: [
      "First-use \u2014 encouraging, guides to first action",
      "No results \u2014 search/filter produced no matches",
      "Error \u2014 data failed to load, offers retry",
      "Permissions \u2014 user lacks access",
    ],
    states: ["default"],
    statePrecedence: "N/A \u2014 EmptyState is informational.",
    tokens: [
      "comp.empty.illustration.size",
      "comp.empty.text.*",
      "comp.empty.spacing.*",
      "comp.empty.maxWidth",
    ],
    foundations: ["Energy", "Voice", "Frame", "Illustration", "Tone"],
    accessibility: [
      "region with aria-label",
      "Illustration has alt text or aria-hidden",
      "Action buttons are focusable",
    ],
    tone: "Title is a statement: 'No transactions yet'. Description is actionable: 'Create your first transaction to get started.' Never blaming: not 'You haven't done anything'.",
    growth:
      "Track action click-through rate from empty states. Low rates may indicate unclear CTAs.",
    platformNotes: "Illustration sizing adapts to viewport. Mobile may use smaller illustrations.",
  },
];

export function ComponentsCorePage() {
  return (
    <Stack gap={PAGE_GAP}>
      <PageHeader chapter="Chapter 05 — Core" title="Core / Shared Components">
        Core components are platform-agnostic — they exist in both React (web) and Flutter (mobile)
        with identical APIs, semantics, and visual output. Each component is built from Flow
        primitives and styled exclusively through Flow tokens.
      </PageHeader>

      <Inline wrap gap={2}>
        {coreComponents.map((c) => (
          <FlowChip key={c.name}>{c.name}</FlowChip>
        ))}
      </Inline>

      <ComponentSpecAccordion items={coreComponents} badge="index" layout="full" />
    </Stack>
  );
}
