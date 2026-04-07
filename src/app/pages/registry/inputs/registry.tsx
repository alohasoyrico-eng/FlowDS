/**
 * FLOW - Inputs Domain Registry
 * Component metadata, demos, and developer guides for input components.
 */
import React from "react";
import { FlowTextInput } from "../../../../lib";
import type { ComponentEntry } from "../types";
import {
  FlowCountrySelectOverview,
  FlowCountrySelectVariants,
  FlowPhoneInputOverview,
  FlowPhoneInputVariants,
  FlowTextAreaOverview,
  FlowTextAreaVariants,
  FlowTextInputOverview,
  FlowTextInputVariants,
} from "./demos";

export const INPUTS_REGISTRY: Record<string, ComponentEntry> = {
  // ─── FlowTextInput ───
  "inputs/flow-text-input": {
    domain: "Inputs",
    spec: {
      name: "FlowTextInput",
      purpose:
        "Tall floating-label text input. Designed for prominent form fields where the label must remain visible after the user starts typing. Features progressive border-width (1.5px→2px), animated floating label, conditional clear button, loading spinner, and hint/error/success text with status icons.",
      platform: "shared",
      anatomy: [
        {
          part: "Root wrapper",
          description:
            "Outer container — vertical flex stack holding the bordered box and hint text. Controls size via data-size attribute.",
          tokens: ["comp.textinput.height", "comp.textinput.gap"],
        },
        {
          part: "Bordered container",
          description:
            "Flex row (align-items: flex-end) — background, border (as inset box-shadow), and radius. Label is absolute for float animation; input, clear button, and spinner are natural flex children.",
          tokens: [
            "comp.textinput.bg",
            "comp.textinput.border",
            "comp.textinput.border-width",
            "comp.textinput.radius",
            "comp.textinput.padding",
          ],
        },
        {
          part: "Floating label",
          description:
            "Animated <label> — position: absolute for the float animation. Resting state: auto-centered via top:50% + translateY(-50%) + scale. Float trigger: :focus-within or [data-has-value] slides label to top. Color shifts via semantic tokens: label (resting), label-focus, label-error, label-disabled.",
          tokens: [
            "comp.textinput.label",
            "comp.textinput.label-focus",
            "comp.textinput.label-error",
            "comp.textinput.label-disabled",
            "comp.textinput.label-scale",
            "comp.textinput.padding-x",
          ],
        },
        {
          part: "Native input",
          description:
            "Flex child (flex: 1) — fills remaining width naturally. Vertical position via margin-bottom: padding (symmetric centering — pair_top = pair_bottom = padding). No width calc() needed.",
          tokens: [
            "comp.textinput.text",
            "comp.textinput.text-disabled",
            "comp.textinput.value-size",
            "comp.textinput.placeholder",
            "comp.textinput.padding",
          ],
        },
        {
          part: "Leading icon",
          description:
            "Optional flex child (flex-shrink: 0, align-self: center) — rendered before the floating label area. Auto-sized via controlIconSizeMap per data-size. Color inherits state (focus, error, disabled).",
          tokens: ["comp.textinput.label", "comp.textinput.padding-x"],
        },
        {
          part: "Prefix text",
          description:
            "Optional flex child (flex-shrink: 0, align-self: center) — static text rendered before the input value (after leading icon if present). Useful for currencies ($), protocols (https://), etc.",
          tokens: ["comp.textinput.label", "comp.textinput.padding-x"],
        },
        {
          part: "Trailing icon",
          description:
            "Optional flex child (flex-shrink: 0, align-self: center) — rendered after the input, before clear button and loading spinner. Auto-sized via controlIconSizeMap. Hidden when loading={true}.",
          tokens: ["comp.textinput.label", "comp.textinput.padding-x"],
        },
        {
          part: "Suffix text",
          description:
            "Optional flex child (flex-shrink: 0, align-self: center) — static text rendered after the input value (before trailing icon). Useful for units (kg, USD), domains (.com), etc.",
          tokens: ["comp.textinput.label", "comp.textinput.padding-x"],
        },
        {
          part: "Clear button",
          description:
            "Flex child (flex-shrink: 0, align-self: stretch) — always rendered when clearable + not disabled; hidden via CSS opacity/pointer-events until value + hover/focus.",
          tokens: ["comp.textinput.clearSize"],
        },
        {
          part: "Loading spinner",
          description:
            "Flex child (flex-shrink: 0, align-self: center) — animated dots in trailing position, shown when loading={true}.",
          tokens: [],
        },
        {
          part: "Hint / error text",
          description:
            "Text below the container — shows hint, error (with warning icon), or success (with check icon). Color via semantic tokens: hint (resting), hint-error, hint-success.",
          tokens: [
            "comp.textinput.hint",
            "comp.textinput.hint-error",
            "comp.textinput.hint-success",
          ],
        },
      ],
      variants: [
        "Default",
        "With hint",
        "With error",
        "With success",
        "Clearable",
        "Loading",
        "With leading icon",
        "With trailing icon",
        "With prefix",
        "With suffix",
      ],
      states: ["default", "hover", "focus", "filled", "error", "success", "disabled", "loading"],
      accessibility: {
        handled: [
          "Native <input> with associated <label> via htmlFor",
          "aria-invalid='true' when error state is active",
          "aria-describedby links input to hint/error text",
          "Disabled inputs get disabled attribute",
        ],
        required: ["Provide unique id for each input", "Use label prop for accessible field name"],
        keyboard: ["Tab to focus input", "Type to enter text", "Escape to clear (when clearable)"],
      },
    },
    demos: {
      overview: () => <FlowTextInputOverview />,
      variants: () => <FlowTextInputVariants />,
    },
    developer: {
      reactImport: `import { FlowTextInput } from "@flow/design-system";`,
      reactUsage: `// Basic input
<FlowTextInput
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email"
/>

// All sizes
<FlowTextInput label="Small" size="sm" />
<FlowTextInput label="Medium" size="md" />
<FlowTextInput label="Large" size="lg" />
<FlowTextInput label="Extra Large" size="xl" />

// With hint
<FlowTextInput
  label="Password"
  type="password"
  hint="Must be at least 8 characters"
/>

// With error
<FlowTextInput
  label="Username"
  error="Username is already taken"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>

// With success
<FlowTextInput
  label="Email"
  success
  hint="Email is available"
  value={email}
/>

// Clearable
<FlowTextInput
  label="Search"
  clearable
  onClear={() => setValue("")}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// Loading
<FlowTextInput
  label="Username"
  loading
  hint="Checking availability..."
/>

// Disabled
<FlowTextInput
  label="Read-only field"
  disabled
  value="Cannot edit"
/>

// With icons
<FlowTextInput
  label="Search"
  leadingIcon="search"
  placeholder="Search..."
/>
<FlowTextInput
  label="Password"
  type="password"
  trailingIcon="eye"
/>
<FlowTextInput
  label="Calendar event"
  leadingIcon="calendar"
  trailingIcon="chevron-down"
/>

// With prefix & suffix
<FlowTextInput
  label="Amount"
  prefix="$"
  suffix="USD"
  type="number"
/>
<FlowTextInput
  label="Website"
  prefix="https://"
  placeholder="example.com"
/>
<FlowTextInput
  label="Domain"
  leadingIcon="globe"
  prefix="www."
  suffix=".com"
/>`,
      flutterImport: `import 'package:flow_ds/inputs.dart';`,
      flutterUsage: `FlowTextInput(
  label: 'Email',
  onChanged: (value) => setState(() => email = value),
  hint: 'Enter your email',
)

// With error
FlowTextInput(
  label: 'Username',
  error: 'Username is required',
)

// Clearable
FlowTextInput(
  label: 'Search',
  clearable: true,
  onClear: () => setState(() => value = ''),
)`,
      notes:
        "FlowTextInput uses floating label animation for a modern, material-design-inspired look. The label floats up on focus or when the input has a value. Border width increases from 1.5px to 2px on focus for progressive enhancement. Use clearable for search inputs or forms where users frequently need to reset fields. Phase C: container, label, and field compose the shared .flow-input-surface CSS classes — all state rules (hover, focus, error, success, disabled) are centralized in the InputSurface layer.",
      props: [
        {
          name: "label",
          type: "string",
          description: "Floating label text. Required for accessibility.",
          required: true,
        },
        { name: "value", type: "string", description: "Controlled input value.", required: false },
        {
          name: "onChange",
          type: "(e: ChangeEvent<HTMLInputElement>) => void",
          description: "Change handler for controlled input.",
          required: false,
        },
        {
          name: "placeholder",
          type: "string",
          description: "Placeholder text (shows when input is empty).",
          required: false,
        },
        {
          name: "type",
          type: "string",
          default: '"text"',
          description: "HTML input type (text, password, email, etc.).",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description: "Size variant — controls height, font, and padding.",
        },
        {
          name: "leadingIcon",
          type: "string",
          description:
            "Lucide icon name rendered before the input. Auto-sized per data-size via controlIconSizeMap.",
          required: false,
        },
        {
          name: "trailingIcon",
          type: "string",
          description:
            "Lucide icon name rendered after the input (before clear/loading). Hidden when loading={true}.",
          required: false,
        },
        {
          name: "prefix",
          type: "string",
          description:
            "Static text before the input value (e.g. '$', 'https://'). Rendered after leadingIcon if both are present.",
          required: false,
        },
        {
          name: "suffix",
          type: "string",
          description:
            "Static text after the input value (e.g. 'USD', 'kg', '.com'). Rendered before trailingIcon if both are present.",
          required: false,
        },
        {
          name: "hint",
          type: "string",
          description: "Helper text below input. Replaced by error when error prop is set.",
          required: false,
        },
        {
          name: "error",
          type: "string",
          description: "Error message — replaces hint, adds warning icon, and sets aria-invalid.",
          required: false,
        },
        {
          name: "success",
          type: "boolean",
          default: "false",
          description: "Success indicator — green border + check icon in hint area.",
          required: false,
        },
        {
          name: "clearable",
          type: "boolean",
          default: "false",
          description: "Shows clear button (×) on focus/hover when input has value.",
        },
        {
          name: "onClear",
          type: "() => void",
          description: "Callback when clear button is clicked. Only works if clearable={true}.",
          required: false,
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          description: "Shows loading spinner in trailing position.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables input and reduces opacity.",
        },
        {
          name: "id",
          type: "string",
          description: "HTML id for input element. Auto-generated if not provided.",
          required: false,
        },
        {
          name: "name",
          type: "string",
          description: "HTML name attribute for form submission.",
          required: false,
        },
        {
          name: "required",
          type: "boolean",
          description: "HTML required attribute.",
          required: false,
        },
        {
          name: "autoComplete",
          type: "string",
          description: "HTML autocomplete attribute.",
          required: false,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes on root wrapper.",
          required: false,
        },
      ],
      guidelines: [
        {
          intent: "do",
          text: "Always provide a descriptive label — it's required for accessibility and UX clarity.",
        },
        {
          intent: "do",
          text: "Use hint text for helpful guidance, not critical information — users might miss it.",
        },
        {
          intent: "do",
          text: "Use error prop for inline validation feedback with specific, actionable messages.",
        },
        {
          intent: "dont",
          text: "Don't use placeholder as a replacement for label — it disappears when typing and fails accessibility.",
        },
        {
          intent: "dont",
          text: "Don't put long text in error/hint — keep it concise (1-2 sentences max).",
        },
        {
          intent: "info",
          text: "The floating label animates via CSS transform for smooth, compositor-only animation.",
        },
        {
          intent: "info",
          text: "Border uses box-shadow instead of border property to prevent layout shift during focus transitions.",
        },
        {
          intent: "info",
          text: "Clearable inputs show the × button only when the input is focused/hovered AND has a value.",
        },
        {
          intent: "info",
          text: "Density-aware: height (48→40/56px), padding, font sizes shift ±1 step in compact/comfortable.",
        },
        {
          intent: "do",
          text: "Use leadingIcon for contextual hints — search, mail, calendar, lock.",
        },
        {
          intent: "do",
          text: "Use prefix/suffix for units and protocols — $, kg, https://, .com.",
        },
        {
          intent: "dont",
          text: "Don't combine leadingIcon with prefix unless both serve distinct purposes — avoid visual clutter.",
        },
        {
          intent: "info",
          text: "Icons auto-size via controlIconSizeMap — same map as FlowButton. trailingIcon is hidden when loading={true}.",
        },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(FlowTextInput, {
          label: (props.label || "Label") as string,
          placeholder: (props.placeholder || "Type here...") as string,
          size: props.size as "sm" | "md" | "lg",
          disabled: !!props.disabled,
          value: props.value as string,
          onChange: () => {},
        } as React.ComponentProps<typeof FlowTextInput>),
      defaults: { label: "Label", placeholder: "Type here...", size: "md", disabled: false, value: "" },
    },
  },
  // ─── FlowTextArea ───
  "inputs/flow-text-area": {
    domain: "Inputs",
    spec: {
      name: "FlowTextArea",
      purpose:
        "Multi-line text input for longer content. Floating label, progressive border-width (1.5px→2px), and optional auto-grow. Features hint/error/success states, character counter, and resize control (vertical/horizontal/both/none).",
      platform: "shared",
      anatomy: [
        {
          part: "Root wrapper",
          description:
            "Outer container — holds the bordered box and hint text. Controls size via data-size attribute.",
          tokens: ["comp.textarea.min-height"],
        },
        {
          part: "Bordered container",
          description:
            "The interactive box — background, border, and radius. Padding-top reserves space for the always-floated label.",
          tokens: [
            "comp.textinput.bg",
            "comp.textinput.border",
            "comp.textinput.border-width",
            "comp.textinput.radius",
            "comp.textinput.padding",
          ],
        },
        {
          part: "Floating label",
          description:
            "Always-floated <label> — position: absolute at top of container. Color shifts via semantic tokens: label (resting), label-disabled.",
          tokens: ["comp.textinput.label", "comp.textinput.label-disabled"],
        },
        {
          part: "Native textarea",
          description:
            "Block-level <textarea> — natural flow within container padding. Not absolutely positioned.",
          tokens: [
            "comp.textinput.text",
            "comp.textinput.text-disabled",
            "comp.textinput.placeholder",
          ],
        },
        {
          part: "Loading spinner",
          description:
            "Absolutely positioned at top-right — animated dots shown when loading={true}.",
          tokens: [],
        },
        {
          part: "Hint / error text",
          description:
            "Text below the container — shows hint, error (with warning icon), or success (with check icon). Color via semantic tokens: hint (resting), hint-error, hint-success.",
          tokens: [
            "comp.textinput.hint",
            "comp.textinput.hint-error",
            "comp.textinput.hint-success",
          ],
        },
        {
          part: "Character counter (optional)",
          description: "Shows current/max characters when maxLength is set.",
          tokens: ["comp.textarea.counter-size"],
        },
      ],
      variants: [
        "Default",
        "With hint",
        "With error",
        "With success",
        "Loading",
        "With character counter",
        "Resizable (vertical/horizontal/both/none)",
      ],
      states: [
        "default",
        "hover",
        "focus",
        "filled",
        "error",
        "success",
        "disabled",
        "loading",
        "readonly",
      ],
      accessibility: {
        handled: [
          "Native <textarea> with associated <label> via htmlFor",
          "aria-invalid='true' when error state is active",
          "aria-describedby links textarea to hint/error text",
          "Disabled textareas get disabled attribute",
          "Character counter updates announced via aria-live",
        ],
        required: [
          "Provide unique id for each textarea",
          "Use label prop for accessible field name",
        ],
        keyboard: ["Tab to focus textarea", "Type to enter text", "Enter for new line"],
      },
    },
    demos: {
      overview: () => <FlowTextAreaOverview />,
      variants: () => <FlowTextAreaVariants />,
    },
    developer: {
      reactImport: `import { FlowTextArea } from "@flow/design-system";`,
      reactUsage: `// Basic textarea
<FlowTextArea
  label="Description"
  value={description}
  onChange={(val) => setDescription(val)}
  placeholder="Enter a description"
  rows={4}
/>

// All sizes
<FlowTextArea label="Small" size="sm" rows={3} />
<FlowTextArea label="Medium" size="md" rows={3} />
<FlowTextArea label="Large" size="lg" rows={3} />
<FlowTextArea label="Extra Large" size="xl" rows={3} />

// With hint
<FlowTextArea
  label="Comments"
  hint="Share your thoughts (optional)"
  rows={4}
/>

// With error
<FlowTextArea
  label="Message"
  error="Message is required"
  value={message}
  onChange={(val) => setMessage(val)}
/>

// With success
<FlowTextArea
  label="Bio"
  success
  hint="Saved successfully"
  value={bio}
/>

// With character counter
<FlowTextArea
  label="Bio"
  value={bio}
  onChange={(val) => setBio(val)}
  maxLength={200}
  hint="Tell us about yourself"
  rows={4}
/>

// Loading
<FlowTextArea
  label="Content"
  loading
  hint="Saving..."
/>

// Disabled
<FlowTextArea
  label="Read-only content"
  disabled
  value="Cannot edit this"
/>

// Read-only
<FlowTextArea
  label="Terms"
  readOnly
  value="Terms and conditions..."
  rows={6}
/>

// Resize options
<FlowTextArea label="No resize" resize="none" rows={3} />
<FlowTextArea label="Vertical (default)" resize="vertical" rows={3} />
<FlowTextArea label="Horizontal" resize="horizontal" rows={3} />
<FlowTextArea label="Both directions" resize="both" rows={3} />`,
      flutterImport: `import 'package:flow_ds/inputs.dart';`,
      flutterUsage: `FlowTextArea(
  label: 'Description',
  onChanged: (value) => setState(() => description = value),
  hint: 'Enter a description',
  rows: 4,
)

// With error
FlowTextArea(
  label: 'Message',
  error: 'Message is required',
)

// With character counter
FlowTextArea(
  label: 'Bio',
  maxLength: 200,
  onChanged: (value) => setState(() => bio = value),
)`,
      notes:
        "FlowTextArea extends FlowTextInput for multi-line content. Use for longer inputs (descriptions, comments, messages). The floating label provides consistent UX with FlowTextInput. Phase C.1: container, label, and hint compose the shared .flow-input-surface CSS classes — all border/state rules (hover, focus, error, success, disabled) are centralized in the InputSurface layer. Border uses box-shadow (inset) instead of real CSS border for zero-layout-shift. Label is always at top (no float animation). Use rows prop to control initial height. Resize prop controls user resizing behavior (vertical is default).",
      props: [
        {
          name: "label",
          type: "string",
          description: "Floating label text. Required for accessibility.",
          required: true,
        },
        {
          name: "value",
          type: "string",
          description: "Controlled textarea value.",
          required: false,
        },
        {
          name: "onChange",
          type: "(value: string, e: ChangeEvent<HTMLTextAreaElement>) => void",
          description: "Change handler for controlled textarea.",
          required: false,
        },
        {
          name: "placeholder",
          type: "string",
          description: "Placeholder text (shows when textarea is empty).",
          required: false,
        },
        {
          name: "rows",
          type: "number",
          default: "4",
          description: "Initial number of visible text rows (controls min-height).",
        },
        {
          name: "resize",
          type: '"none" | "vertical" | "horizontal" | "both"',
          default: '"vertical"',
          description: "CSS resize property — controls how users can resize the textarea.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description: "Size variant — controls min-height, font, and padding.",
        },
        {
          name: "hint",
          type: "string",
          description: "Helper text below textarea. Replaced by error when error prop is set.",
          required: false,
        },
        {
          name: "error",
          type: "string",
          description: "Error message — replaces hint, adds warning icon, and sets aria-invalid.",
          required: false,
        },
        {
          name: "success",
          type: "boolean",
          default: "false",
          description: "Success indicator — green border + check icon in hint area.",
          required: false,
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          description: "Shows loading spinner in trailing position.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables textarea and reduces opacity.",
        },
        {
          name: "readOnly",
          type: "boolean",
          default: "false",
          description: "Makes textarea read-only (user can see but not edit).",
        },
        {
          name: "maxLength",
          type: "number",
          description: "Maximum character count. Shows character counter when set.",
          required: false,
        },
        {
          name: "id",
          type: "string",
          description: "HTML id for textarea element. Auto-generated if not provided.",
          required: false,
        },
        {
          name: "name",
          type: "string",
          description: "HTML name attribute for form submission.",
          required: false,
        },
        {
          name: "required",
          type: "boolean",
          description: "HTML required attribute.",
          required: false,
        },
        {
          name: "autoFocus",
          type: "boolean",
          description: "Auto-focus textarea on mount.",
          required: false,
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
      ],
      guidelines: [
        {
          intent: "do",
          text: "Use FlowTextArea for multi-line content (descriptions, comments, messages).",
        },
        {
          intent: "do",
          text: "Set appropriate rows value for expected content length (3-6 for short, 8-12 for long).",
        },
        {
          intent: "do",
          text: "Use maxLength with character counter for fields with length limits.",
        },
        { intent: "do", text: "Use resize='vertical' (default) or 'none' for consistent layouts." },
        { intent: "dont", text: "Don't use for single-line input — use FlowTextInput instead." },
        { intent: "dont", text: "Don't set rows too small (<2) or too large (>20) — breaks UX." },
        {
          intent: "dont",
          text: "Don't use placeholder as replacement for label — it disappears when typing.",
        },
        { intent: "info", text: "Floating label animates via CSS transform for smooth animation." },
        { intent: "info", text: "Border uses box-shadow to prevent layout shift during focus." },
        { intent: "info", text: "Character counter updates in real-time as user types." },
        {
          intent: "info",
          text: "Density-aware: min-height, padding, font sizes shift ±1 step in compact/comfortable.",
        },
      ],
    },
  },
  // ─── FlowPhoneInput ───
  "inputs/flow-phone-input": {
    domain: "Inputs",
    spec: {
      name: "FlowPhoneInput",
      purpose:
        "Phone number input with country flag prefix, dial code, searchable country picker, and vertical divider. Composes FlowTextInput anatomy + prefix area. Shares textInput comp tokens for visual consistency across the input family.",
      platform: "shared",
      anatomy: [
        {
          part: "Root wrapper",
          description:
            "Outer container — vertical flex stack holding the bordered box and hint text. Controls size via data-size attribute.",
          tokens: ["comp.textinput.height", "comp.textinput.gap"],
        },
        {
          part: "Bordered container",
          description:
            "Flex row (align-items: center) — background, border (as inset box-shadow), and radius. Contains prefix, divider, body, and optional loading spinner as flex children.",
          tokens: [
            "comp.textinput.bg",
            "comp.textinput.border",
            "comp.textinput.border-width",
            "comp.textinput.radius",
            "comp.textinput.padding",
          ],
        },
        {
          part: "Prefix button",
          description:
            "Flex child (flex-shrink: 0) — clickable button with flag, dial code, and chevron. Opens country dropdown on click. Hover background via CSS.",
          tokens: ["comp.phoneinput.prefix-gap", "comp.phoneinput.prefix-text"],
        },
        {
          part: "Vertical divider",
          description:
            "Flex child (flex-shrink: 0) — decorative separator between prefix and input body.",
          tokens: [
            "comp.phoneinput.divider-width",
            "comp.phoneinput.divider-height",
            "comp.phoneinput.divider-color",
          ],
        },
        {
          part: "Input body",
          description:
            "Flex child (flex: 1, display: flex, align-items: flex-end) — contains floating label (absolute) and native input (flex child). Mirrors FlowTextInput body layout.",
          tokens: [],
        },
        {
          part: "Floating label",
          description:
            "Absolute within body — animated float via translateY + scale. Color shifts via label-focus, label-error, label-disabled.",
          tokens: [
            "comp.textinput.label",
            "comp.textinput.label-focus",
            "comp.textinput.label-error",
            "comp.textinput.label-disabled",
          ],
        },
        {
          part: "Native input",
          description:
            "Flex child (flex: 1) within body — type='tel', margin-bottom: padding for symmetric vertical centering.",
          tokens: ["comp.textinput.text", "comp.textinput.text-disabled", "comp.textinput.padding"],
        },
        {
          part: "Loading spinner",
          description:
            "Flex child (flex-shrink: 0, align-self: center) — animated dots in trailing position.",
          tokens: [],
        },
        {
          part: "Country dropdown",
          description:
            "Absolute panel — searchable list with flags, country names, and dial codes. Opens via prefix button.",
          tokens: ["comp.country-dropdown.*"],
        },
        {
          part: "Hint / error text",
          description:
            "Text below container — hint, error (warning icon), or success (check icon). Color via hint, hint-error, hint-success.",
          tokens: [
            "comp.textinput.hint",
            "comp.textinput.hint-error",
            "comp.textinput.hint-success",
          ],
        },
      ],
      variants: ["Default", "With hint", "With error", "With success", "Loading"],
      states: ["default", "hover", "focus", "filled", "error", "success", "disabled", "loading"],
      accessibility: {
        handled: [
          "Native <input type='tel'> with associated <label> via htmlFor",
          "Prefix button has aria-expanded and aria-label for country",
          "aria-invalid='true' when error state is active",
          "aria-describedby links input to hint/error text",
        ],
        required: ["Provide label prop for accessible field name"],
        keyboard: [
          "Tab to focus input",
          "Tab to prefix button for country selection",
          "Arrow keys to navigate country dropdown",
          "Enter to select country",
          "Escape to close dropdown",
        ],
      },
    },
    demos: {
      overview: () => <FlowPhoneInputOverview />,
      variants: () => <FlowPhoneInputVariants />,
    },
    developer: {
      reactImport: `import { FlowPhoneInput } from "@flow/design-system";`,
      reactUsage: `const [phone, setPhone] = useState("");
const [country, setCountry] = useState("FR");

// Basic phone input
<FlowPhoneInput
  label="Phone number"
  value={phone}
  onChange={setPhone}
  country={country}
  onCountryChange={(entry) => setCountry(entry.code)}
  placeholder="Enter phone number"
/>

// All sizes
<FlowPhoneInput label="Small" size="sm" />
<FlowPhoneInput label="Medium" size="md" />
<FlowPhoneInput label="Large" size="lg" />
<FlowPhoneInput label="Extra Large" size="xl" />

// With hint
<FlowPhoneInput
  label="Mobile"
  hint="Include country code"
/>

// With error
<FlowPhoneInput
  label="Phone"
  error="Invalid phone number"
/>

// Success state
<FlowPhoneInput
  label="Phone"
  success
  hint="Phone verified"
  value="612345678"
/>

// Loading
<FlowPhoneInput
  label="Phone"
  loading
/>

// Disabled
<FlowPhoneInput
  label="Phone"
  disabled
  value="612345678"
/>`,
      flutterImport: `import 'package:flow_ds/inputs.dart';`,
      flutterUsage: `FlowPhoneInput(
  label: 'Phone number',
  onChanged: (value) => setState(() => phone = value),
  country: 'FR',
  onCountryChanged: (entry) => setState(() => country = entry.code),
)

// With error
FlowPhoneInput(
  label: 'Phone',
  error: 'Invalid phone number',
)`,
      notes:
        "FlowPhoneInput composes FlowTextInput anatomy with a prefix area for flag + dial code + chevron. The country picker opens as a searchable dropdown. Phone input type='tel' enables native phone keyboards on mobile. Shares comp.textinput tokens with all input-family components.",
      props: [
        {
          name: "label",
          type: "string",
          description: "Floating label text. Required for accessibility.",
          required: true,
        },
        {
          name: "value",
          type: "string",
          description: "Controlled phone number value (digits only).",
          required: false,
        },
        {
          name: "defaultValue",
          type: "string",
          description: "Default value for uncontrolled mode.",
          required: false,
        },
        {
          name: "onChange",
          type: "(value: string) => void",
          description: "Called when phone number changes.",
          required: false,
        },
        {
          name: "country",
          type: "string",
          default: '"FR"',
          description: "ISO 3166-1 alpha-2 country code for initial flag + dial code.",
        },
        {
          name: "onCountryChange",
          type: "(entry: FlagEntry) => void",
          description: "Called when country is changed via dropdown.",
          required: false,
        },
        { name: "placeholder", type: "string", description: "Placeholder text.", required: false },
        { name: "hint", type: "string", description: "Helper text below input.", required: false },
        {
          name: "error",
          type: "string",
          description: "Error message — replaces hint, adds warning icon.",
          required: false,
        },
        {
          name: "success",
          type: "boolean",
          default: "false",
          description: "Success indicator — green border + check icon.",
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          description: "Shows loading spinner in trailing position.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"xl"',
          description: "Size variant — controls height, font, flag size, icon size.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables input and country picker.",
        },
        {
          name: "readOnly",
          type: "boolean",
          default: "false",
          description: "Makes input read-only.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
          required: false,
        },
      ],
      guidelines: [
        {
          intent: "do",
          text: "Use FlowPhoneInput for international phone number fields — it handles country codes and formatting.",
        },
        {
          intent: "do",
          text: "Set initial country prop to the user's likely country for better UX.",
        },
        {
          intent: "do",
          text: "Use error prop for phone validation feedback with specific messages.",
        },
        {
          intent: "dont",
          text: "Don't use for non-phone number inputs — use FlowTextInput instead.",
        },
        { intent: "dont", text: "Don't hardcode country — let users change via the dropdown." },
        {
          intent: "info",
          text: "The prefix button (flag + dial code) opens a searchable country dropdown.",
        },
        { intent: "info", text: "Uses type='tel' for native phone keyboard on mobile devices." },
        {
          intent: "info",
          text: "Shares comp.textinput tokens with FlowTextInput for input-family cohesion.",
        },
        {
          intent: "info",
          text: "Density-aware: height, padding, flag/icon sizes shift ±1 step in compact/comfortable.",
        },
      ],
    },
  },
  // ─── FlowCountrySelect ───
  "inputs/flow-country-select": {
    domain: "Inputs",
    spec: {
      name: "FlowCountrySelect",
      purpose:
        "Combobox-style country picker with flag prefix, inline search, floating label, and chevron suffix. When focused, the input becomes a search field filtering countries in real-time; when closed, it shows the selected country name. Shares textInput comp tokens.",
      platform: "shared",
      anatomy: [
        {
          part: "Root wrapper",
          description:
            "Outer container — vertical flex stack holding the bordered box and hint text.",
          tokens: ["comp.textinput.height", "comp.textinput.gap"],
        },
        {
          part: "Bordered container",
          description:
            "Flex row (align-items: center) — background, border (as inset box-shadow), and radius. Contains flag, body, and chevron/loading as flex children.",
          tokens: [
            "comp.textinput.bg",
            "comp.textinput.border",
            "comp.textinput.border-width",
            "comp.textinput.radius",
            "comp.textinput.padding",
          ],
        },
        {
          part: "Flag prefix",
          description: "Flex child (flex-shrink: 0) — displays the selected country's flag.",
          tokens: [],
        },
        {
          part: "Input body",
          description:
            "Flex child (flex: 1, display: flex, align-items: flex-end) — contains floating label (absolute) and native input (flex child). Left padding separates from flag.",
          tokens: [],
        },
        {
          part: "Floating label",
          description:
            "Absolute within body — animated float via translateY + scale. Color shifts via label-focus, label-error, label-disabled.",
          tokens: [
            "comp.textinput.label",
            "comp.textinput.label-focus",
            "comp.textinput.label-error",
            "comp.textinput.label-disabled",
          ],
        },
        {
          part: "Native input",
          description:
            "Flex child (flex: 1) within body — shows country name when closed, search text when open. margin-bottom: padding for symmetric vertical centering.",
          tokens: ["comp.textinput.text", "comp.textinput.text-disabled", "comp.textinput.padding"],
        },
        {
          part: "Chevron / loading",
          description:
            "Trailing area — shows chevron button (rotates 180° when open) or loading spinner. Flex child (flex-shrink: 0).",
          tokens: ["comp.countryselect.chevron-color", "comp.countryselect.chevron-disabled"],
        },
        {
          part: "Country dropdown",
          description:
            "Absolute panel — list of countries with flags and names. Opens on focus or chevron click. No separate search input (inline search via the main input).",
          tokens: ["comp.country-dropdown.*"],
        },
        {
          part: "Hint / error text",
          description:
            "Text below container — hint, error (warning icon), or success (check icon).",
          tokens: [
            "comp.textinput.hint",
            "comp.textinput.hint-error",
            "comp.textinput.hint-success",
          ],
        },
      ],
      variants: ["Default", "With hint", "With error", "With success", "Loading"],
      states: [
        "default",
        "hover",
        "focus",
        "open",
        "filled",
        "error",
        "success",
        "disabled",
        "loading",
      ],
      accessibility: {
        handled: [
          "Native <input> with associated <label> via htmlFor",
          "Container gets data-open when dropdown is visible",
          "aria-invalid='true' when error state is active",
          "aria-describedby links input to hint/error text",
          "aria-required when required prop is set",
        ],
        required: ["Provide label prop for accessible field name"],
        keyboard: [
          "Tab to focus input (opens dropdown)",
          "Type to filter countries inline",
          "Arrow keys to navigate dropdown",
          "Enter to select highlighted country",
          "Escape to close dropdown",
        ],
      },
    },
    demos: {
      overview: () => <FlowCountrySelectOverview />,
      variants: () => <FlowCountrySelectVariants />,
    },
    developer: {
      reactImport: `import { FlowCountrySelect } from "@flow/design-system";`,
      reactUsage: `const [country, setCountry] = useState("FR");

// Basic country select
<FlowCountrySelect
  label="Country"
  value={country}
  onChange={(entry) => setCountry(entry.code)}
/>

// All sizes
<FlowCountrySelect label="Small" size="sm" />
<FlowCountrySelect label="Medium" size="md" />
<FlowCountrySelect label="Large" size="lg" />
<FlowCountrySelect label="Extra Large" size="xl" />

// With hint
<FlowCountrySelect
  label="Country of residence"
  hint="Select your current country"
/>

// With error
<FlowCountrySelect
  label="Country"
  error="Country is required"
/>

// Required
<FlowCountrySelect
  label="Country"
  required
/>

// Disabled
<FlowCountrySelect
  label="Country"
  disabled
  value="FR"
/>`,
      flutterImport: `import 'package:flow_ds/inputs.dart';`,
      flutterUsage: `FlowCountrySelect(
  label: 'Country',
  value: country,
  onChanged: (entry) => setState(() => country = entry.code),
)

// With error
FlowCountrySelect(
  label: 'Country',
  error: 'Country is required',
)`,
      notes:
        "FlowCountrySelect combines inline search with a combobox pattern. On focus, the input clears to allow typing a search query. The dropdown filters countries in real-time. Unlike FlowPhoneInput, it doesn't show dial codes — just country names and flags. Uses comp.textinput tokens for input-family consistency.",
      props: [
        {
          name: "label",
          type: "string",
          description: "Floating label text. Required for accessibility.",
          required: true,
        },
        {
          name: "value",
          type: "string",
          description: "Controlled ISO 3166-1 alpha-2 country code.",
          required: false,
        },
        {
          name: "defaultValue",
          type: "string",
          default: '"FR"',
          description: "Default country code for uncontrolled mode.",
        },
        {
          name: "onChange",
          type: "(entry: FlagEntry) => void",
          description: "Called when country is selected.",
          required: false,
        },
        { name: "hint", type: "string", description: "Helper text below select.", required: false },
        {
          name: "error",
          type: "string",
          description: "Error message — replaces hint, adds warning icon.",
          required: false,
        },
        {
          name: "success",
          type: "boolean",
          default: "false",
          description: "Success indicator — green border + check icon.",
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          description: "Shows loading spinner instead of chevron.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"xl"',
          description: "Size variant — controls height, font, flag size.",
        },
        { name: "disabled", type: "boolean", default: "false", description: "Disables select." },
        {
          name: "readOnly",
          type: "boolean",
          default: "false",
          description: "Makes select read-only.",
        },
        {
          name: "required",
          type: "boolean",
          default: "false",
          description: "Shows required indicator (*).",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
          required: false,
        },
      ],
      guidelines: [
        {
          intent: "do",
          text: "Use FlowCountrySelect for country selection fields — it handles 200+ countries with search.",
        },
        { intent: "do", text: "Set defaultValue to the user's likely country for better UX." },
        { intent: "do", text: "Use required prop for mandatory country fields." },
        { intent: "dont", text: "Don't use for small option sets (<10) — use FlowSelect instead." },
        {
          intent: "dont",
          text: "Don't use for phone number country codes — use FlowPhoneInput which includes dial codes.",
        },
        {
          intent: "info",
          text: "Inline search: focus the input to start typing and filter countries.",
        },
        {
          intent: "info",
          text: "The chevron rotates 180° when dropdown is open for visual feedback.",
        },
        {
          intent: "info",
          text: "Shares comp.textinput tokens with FlowTextInput for input-family cohesion.",
        },
        {
          intent: "info",
          text: "Density-aware: height, padding, flag/chevron sizes shift ±1 step in compact/comfortable.",
        },
      ],
    },
  },
};
