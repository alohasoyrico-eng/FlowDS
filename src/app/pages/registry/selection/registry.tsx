/**
 * FLOW - Selection Domain Registry
 * Component metadata, demos, and developer guides for selection components.
 */
import type { ComponentEntry } from "../types";
import React from "react";
import { FlowCheckbox, FlowSwitch } from "../../../../lib";
import {
  FlowCheckboxOverview,
  FlowCheckboxVariants,
  FlowRadioOverview,
  FlowRadioVariants,
  FlowSegmentedControlOverview,
  FlowSegmentedControlVariants,
  FlowSelectOverview,
  FlowSelectVariants,
  FlowSliderOverview,
  FlowSliderVariants,
  FlowSwitchOverview,
  FlowSwitchVariants,
  FlowToggleButtonOverview,
  FlowToggleButtonVariants,
} from "./demos";

export const SELECTION_REGISTRY: Record<string, ComponentEntry> = {
  // ─── FlowSwitch ───
  "selection/flow-switch": {
    domain: "Selection",
    spec: {
      name: "FlowSwitch",
      purpose:
        "Toggle control for binary on/off states. iOS-style switch with animated thumb. Used for settings, preferences, and instant toggles.",
      platform: "shared",
      anatomy: [
        {
          part: "Switch track",
          description: "Pill-shaped background container",
          tokens: [
            "comp.switch.bg",
            "comp.switch.radius",
            "comp.switch.width",
            "comp.switch.height",
          ],
        },
        {
          part: "Switch thumb",
          description: "Circular sliding indicator",
          tokens: ["comp.switch.thumb-bg", "comp.switch.thumb-size"],
        },
        {
          part: "Label",
          description: "Optional text label next to switch",
          tokens: ["comp.switch.label-gap"],
        },
      ],
      variants: ["Unchecked", "Checked"],
      states: ["unchecked", "checked", "hover", "focus-visible", "disabled"],
      accessibility: {
        handled: [
          "Semantic input type='checkbox' with role='switch'",
          "aria-checked reflects state",
          "Keyboard support (Space to toggle)",
        ],
        required: ["Provide label prop or aria-label"],
        keyboard: ["Tab to focus", "Space to toggle"],
      },
    },
    demos: {
      overview: () => <FlowSwitchOverview />,
      variants: () => <FlowSwitchVariants />,
    },
    developer: {
      reactImport: `import { FlowSwitch } from "@flow/design-system";`,
      reactUsage: `const [enabled, setEnabled] = useState(false);

<FlowSwitch
  checked={enabled}
  onChange={(checked) => setEnabled(checked)}
  label="Enable notifications"
/>

// All sizes
<FlowSwitch size="sm" label="Small" />
<FlowSwitch size="md" label="Medium" />
<FlowSwitch size="lg" label="Large" />
<FlowSwitch size="xl" label="Extra Large" />

// Disabled
<FlowSwitch disabled label="Disabled switch" />`,
      flutterImport: `import 'package:flow_ds/selection.dart';`,
      flutterUsage: `FlowSwitch(
  value: enabled,
  onChanged: (value) => setState(() => enabled = value),
  label: 'Enable notifications',
)`,
      notes:
        "FlowSwitch is ideal for instant on/off toggles in settings and preferences. The thumb animates smoothly between states. Use for binary choices where changes take effect immediately (not form submissions).",
      props: [
        {
          name: "checked",
          type: "boolean",
          description: "Controlled checked state.",
          required: false,
        },
        {
          name: "onChange",
          type: "(checked: boolean) => void",
          description: "Change handler receiving new checked state.",
          required: false,
        },
        {
          name: "label",
          type: "string",
          description: "Label text shown next to switch.",
          required: false,
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description: "Size variant.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables interaction.",
        },
      ],
      guidelines: [
        { intent: "do", text: "Use switches for instant toggles that take effect immediately." },
        { intent: "do", text: "Provide clear labels describing what the switch controls." },
        {
          intent: "dont",
          text: "Don't use switches for form submissions — use checkboxes instead.",
        },
        { intent: "info", text: "Thumb animates via CSS transform for smooth transitions." },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(FlowSwitch, {
          checked: !!props.checked,
          onChange: () => {},
          size: props.size,
          disabled: !!props.disabled,
          "aria-label": "Demo switch",
        } as React.ComponentProps<typeof FlowSwitch>),
      defaults: { checked: false, size: "md", disabled: false },
    },
  },

  // ─── FlowRadioButton ───
  "selection/flow-radio-button": {
    domain: "Selection",
    spec: {
      name: "FlowRadioButton",
      purpose:
        "Single selection from mutually exclusive options. Use with FlowRadioGroup for proper radio behavior. Circular indicator with inner dot when selected.",
      platform: "shared",
      anatomy: [
        {
          part: "Radio circle",
          description: "Outer circular border",
          tokens: ["comp.radio.size", "comp.radio.border", "comp.radio.bg"],
        },
        {
          part: "Radio dot",
          description: "Inner filled circle when checked",
          tokens: ["comp.radio.dot-size", "comp.radio.dot-bg"],
        },
        {
          part: "Label",
          description: "Text label next to radio",
          tokens: ["comp.radio.label-gap"],
        },
      ],
      variants: ["Unchecked", "Checked"],
      states: ["unchecked", "checked", "hover", "focus-visible", "disabled"],
      accessibility: {
        handled: [
          "Semantic input type='radio'",
          "aria-checked reflects state",
          "FlowRadioGroup provides role='radiogroup'",
        ],
        required: ["Use within FlowRadioGroup for proper behavior", "Provide label prop"],
        keyboard: ["Tab to focus group", "Arrow keys to navigate", "Space to select"],
      },
    },
    demos: {
      overview: () => <FlowRadioOverview />,
      variants: () => <FlowRadioVariants />,
    },
    developer: {
      reactImport: `import { FlowRadioButton, FlowRadioGroup } from "@flow/design-system";`,
      reactUsage: `const [value, setValue] = useState("option1");

<FlowRadioGroup value={value} onChange={setValue}>
  <FlowRadioButton value="option1" label="Option 1" />
  <FlowRadioButton value="option2" label="Option 2" />
  <FlowRadioButton value="option3" label="Option 3" />
</FlowRadioGroup>

// Sizes
<FlowRadioButton size="sm" label="Small" />
<FlowRadioButton size="md" label="Medium" />`,
      flutterImport: `import 'package:flow_ds/selection.dart';`,
      flutterUsage: `FlowRadioGroup(
  value: selectedValue,
  onChanged: (value) => setState(() => selectedValue = value),
  children: [
    FlowRadioButton(value: 'option1', label: 'Option 1'),
    FlowRadioButton(value: 'option2', label: 'Option 2'),
  ],
)`,
      notes:
        "Always use FlowRadioButton within FlowRadioGroup for proper mutual exclusion and keyboard navigation. Radio buttons are for single-choice selections where all options should be visible.",
      props: [
        {
          name: "value",
          type: "string",
          description: "Value for this radio option.",
          required: true,
        },
        {
          name: "label",
          type: "string",
          description: "Label text shown next to radio.",
          required: true,
        },
        {
          name: "checked",
          type: "boolean",
          description: "Controlled checked state (managed by RadioGroup).",
          required: false,
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description: "Size variant.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables interaction.",
        },
      ],
      guidelines: [
        {
          intent: "do",
          text: "Use radio buttons for mutually exclusive choices (single selection).",
        },
        { intent: "do", text: "Always use within FlowRadioGroup for proper behavior." },
        {
          intent: "dont",
          text: "Don't use radio buttons for multi-select — use checkboxes instead.",
        },
        {
          intent: "info",
          text: "FlowRadioGroup manages checked state and provides keyboard navigation.",
        },
      ],
    },
  },

  // ─── FlowRadioGroup ───
  "selection/flow-radio-group": {
    domain: "Selection",
    spec: {
      name: "FlowRadioGroup",
      purpose:
        "Container for FlowRadioButton children. Manages mutual exclusion, keyboard navigation, and aria-radiogroup semantics.",
      platform: "shared",
      anatomy: [
        {
          part: "Group container",
          description: "Wrapper with role='radiogroup'",
          tokens: ["comp.radiogroup.gap"],
        },
      ],
      variants: [],
      states: ["default"],
      accessibility: {
        handled: [
          "role='radiogroup' on container",
          "Keyboard navigation via arrow keys",
          "Manages checked state across children",
        ],
        required: ["Provide aria-label or aria-labelledby"],
        keyboard: ["Tab to focus group", "Arrow keys to navigate options", "Space to select"],
      },
    },
    demos: {
      overview: () => <FlowRadioOverview />,
      variants: () => <FlowRadioVariants />,
    },
    developer: {
      reactImport: `import { FlowRadioGroup } from "@flow/design-system";`,
      reactUsage: `const [value, setValue] = useState("option1");

<FlowRadioGroup value={value} onChange={setValue}>
  <FlowRadioButton value="option1" label="Option 1" />
  <FlowRadioButton value="option2" label="Option 2" />
</FlowRadioGroup>`,
      flutterImport: `import 'package:flow_ds/selection.dart';`,
      flutterUsage: `FlowRadioGroup(
  value: value,
  onChanged: (v) => setState(() => value = v),
  children: [...],
)`,
      notes:
        "FlowRadioGroup is required for proper radio button behavior. It manages state, mutual exclusion, and keyboard navigation.",
      props: [
        {
          name: "value",
          type: "string",
          description: "Currently selected radio value.",
          required: false,
        },
        {
          name: "onChange",
          type: "(value: string) => void",
          description: "Called when selection changes.",
          required: false,
        },
        {
          name: "children",
          type: "ReactNode",
          description: "FlowRadioButton children.",
          required: true,
        },
      ],
      guidelines: [
        { intent: "do", text: "Always wrap FlowRadioButton components with FlowRadioGroup." },
        { intent: "info", text: "FlowRadioGroup handles mutual exclusion automatically." },
      ],
    },
  },

  // ─── FlowCheckbox ───
  "selection/flow-checkbox": {
    domain: "Selection",
    spec: {
      name: "FlowCheckbox",
      purpose:
        "Multi-selection control with checked/unchecked/indeterminate states. Square checkbox with checkmark or dash indicator.",
      platform: "shared",
      anatomy: [
        {
          part: "Checkbox square",
          description: "Outer square border",
          tokens: [
            "comp.checkbox.size",
            "comp.checkbox.border",
            "comp.checkbox.bg",
            "comp.checkbox.radius",
          ],
        },
        {
          part: "Check icon",
          description: "Checkmark when checked, dash when indeterminate",
          tokens: ["comp.checkbox.icon-size", "comp.checkbox.icon-color"],
        },
        {
          part: "Label",
          description: "Text label next to checkbox",
          tokens: ["comp.checkbox.label-gap"],
        },
      ],
      variants: ["Unchecked", "Checked", "Indeterminate"],
      states: ["unchecked", "checked", "indeterminate", "hover", "focus-visible", "disabled"],
      accessibility: {
        handled: [
          "Semantic input type='checkbox'",
          "aria-checked reflects state (true/false/mixed)",
          "Keyboard support (Space to toggle)",
        ],
        required: ["Provide label prop or aria-label"],
        keyboard: ["Tab to focus", "Space to toggle"],
      },
    },
    demos: {
      overview: () => <FlowCheckboxOverview />,
      variants: () => <FlowCheckboxVariants />,
    },
    developer: {
      reactImport: `import { FlowCheckbox } from "@flow/design-system";`,
      reactUsage: `const [checked, setChecked] = useState(false);

<FlowCheckbox
  checked={checked}
  onChange={(checked) => setChecked(checked)}
  label="Accept terms"
/>

// Indeterminate (for parent checkboxes)
<FlowCheckbox indeterminate label="Select all" />

// Sizes
<FlowCheckbox size="sm" label="Small" />
<FlowCheckbox size="md" label="Medium" />

// Disabled
<FlowCheckbox disabled label="Disabled" />`,
      flutterImport: `import 'package:flow_ds/selection.dart';`,
      flutterUsage: `FlowCheckbox(
  value: checked,
  onChanged: (value) => setState(() => checked = value),
  label: 'Accept terms',
)`,
      notes:
        "FlowCheckbox supports indeterminate state for parent checkboxes controlling multiple children. Use for multi-select, settings, and terms acceptance.",
      props: [
        {
          name: "checked",
          type: "boolean",
          description: "Controlled checked state.",
          required: false,
        },
        {
          name: "onChange",
          type: "(checked: boolean) => void",
          description: "Change handler.",
          required: false,
        },
        { name: "label", type: "string", description: "Label text.", required: false },
        {
          name: "indeterminate",
          type: "boolean",
          default: "false",
          description: "Shows dash icon for partial selection.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description: "Size variant.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables interaction.",
        },
      ],
      guidelines: [
        { intent: "do", text: "Use checkboxes for multi-select or independent binary choices." },
        {
          intent: "do",
          text: "Use indeterminate for parent checkboxes with partial child selection.",
        },
        {
          intent: "dont",
          text: "Don't use checkboxes for mutually exclusive options — use radio buttons.",
        },
        {
          intent: "info",
          text: "Indeterminate state shows a dash icon and sets aria-checked='mixed'.",
        },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(FlowCheckbox, {
          checked: !!props.checked,
          onChange: () => {},
          size: props.size as "sm" | "md" | "lg",
          disabled: !!props.disabled,
          label: (props.label || "Check me") as string,
        } as React.ComponentProps<typeof FlowCheckbox>),
      defaults: { checked: false, size: "md", disabled: false, label: "Check me" },
    },
  },

  // ─── FlowCheckboxGroup ───
  "selection/flow-checkbox-group": {
    domain: "Selection",
    spec: {
      name: "FlowCheckboxGroup",
      purpose: "Container for FlowCheckbox children with optional label and layout.",
      platform: "shared",
      anatomy: [
        {
          part: "Group container",
          description: "Stack layout with gap",
          tokens: ["comp.checkboxgroup.gap"],
        },
      ],
      variants: [],
      states: ["default"],
      accessibility: {
        handled: ["role='group'", "Optional aria-label"],
        required: [],
        keyboard: [],
      },
    },
    demos: {
      overview: () => <FlowCheckboxOverview />,
      variants: () => <FlowCheckboxVariants />,
    },
    developer: {
      reactImport: `import { FlowCheckboxGroup } from "@flow/design-system";`,
      reactUsage: `<FlowCheckboxGroup>
  <FlowCheckbox label="Option 1" />
  <FlowCheckbox label="Option 2" />
</FlowCheckboxGroup>`,
      flutterImport: `import 'package:flow_ds/selection.dart';`,
      flutterUsage: `FlowCheckboxGroup(
  children: [
    FlowCheckbox(label: 'Option 1'),
    FlowCheckbox(label: 'Option 2'),
  ],
)`,
      notes: "FlowCheckboxGroup is optional but provides semantic grouping and consistent spacing.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          description: "FlowCheckbox children.",
          required: true,
        },
      ],
      guidelines: [{ intent: "do", text: "Use for grouping related checkboxes." }],
    },
  },

  // ─── FlowSelect ───
  "selection/flow-select": {
    domain: "Selection",
    spec: {
      name: "FlowSelect",
      purpose:
        "Custom dropdown for selecting one option from a list. Floating label, progressive border-width, custom dropdown panel with optional icons per option. Shares textInput comp tokens for visual consistency across the input family.",
      platform: "shared",
      anatomy: [
        {
          part: "Root wrapper",
          description:
            "Outer container — vertical flex stack holding the trigger button and hint text.",
          tokens: ["comp.textinput.height", "comp.textinput.gap"],
        },
        {
          part: "Trigger button",
          description:
            "The bordered interactive box — background, border, and radius. Renders as a <button> with custom dropdown (not native <select>).",
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
            "Animated <label> — position: absolute for the float animation. Floats when focused, open, or has value. Color shifts via semantic tokens: label-focus, label-error, label-disabled.",
          tokens: [
            "comp.textinput.label",
            "comp.textinput.label-focus",
            "comp.textinput.label-error",
            "comp.textinput.label-disabled",
          ],
        },
        {
          part: "Selected value",
          description: "Text display of the current selection or placeholder.",
          tokens: [
            "comp.textinput.text",
            "comp.textinput.text-disabled",
            "comp.textinput.placeholder",
          ],
        },
        {
          part: "Chevron icon",
          description: "Trailing indicator — rotates 180° when dropdown is open.",
          tokens: ["comp.countryselect.chevron-color"],
        },
        {
          part: "Dropdown panel",
          description:
            "Floating list of options — absolute positioned below trigger. Supports option icons and disabled options.",
          tokens: [],
        },
        {
          part: "Hint / error text",
          description:
            "Text below the trigger — shows hint, error (with warning icon), or success (with check icon). Color via semantic tokens: hint, hint-error, hint-success.",
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
        "With placeholder",
        "With icons",
      ],
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
          "Custom <button> trigger with aria-haspopup='listbox'",
          "aria-expanded reflects dropdown open state",
          "aria-invalid when error state is active",
          "aria-describedby links trigger to hint/error text",
          "Options have role='option' with aria-selected",
        ],
        required: ["Provide label prop for accessible field name"],
        keyboard: [
          "Tab to focus trigger",
          "Enter/Space to open dropdown",
          "Arrow keys to navigate options",
          "Enter to select highlighted option",
          "Escape to close dropdown",
        ],
      },
    },
    demos: {
      overview: () => <FlowSelectOverview />,
      variants: () => <FlowSelectVariants />,
    },
    developer: {
      reactImport: `import { FlowSelect } from "@flow/design-system";`,
      reactUsage: `const [value, setValue] = useState("");

<FlowSelect
  label="Choose an option"
  value={value}
  onChange={(val, opt) => setValue(val)}
  options={[
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ]}
/>

// With icons per option
<FlowSelect
  label="Category"
  options={[
    { value: "docs", label: "Documents", icon: "file-text" },
    { value: "images", label: "Images", icon: "image" },
    { value: "music", label: "Music", icon: "headphones" },
  ]}
/>

// With hint
<FlowSelect
  label="Country"
  hint="Select your country of residence"
  options={[...]}
/>

// With error
<FlowSelect
  label="Required field"
  error="This field is required"
  options={[...]}
/>

// Disabled
<FlowSelect label="Disabled" disabled options={[...]} />`,
      flutterImport: `import 'package:flow_ds/selection.dart';`,
      flutterUsage: `FlowSelect(
  label: 'Choose an option',
  value: value,
  onChanged: (v) => setState(() => value = v),
  items: [
    SelectItem(value: '1', label: 'Option 1'),
    SelectItem(value: '2', label: 'Option 2'),
  ],
)`,
      notes:
        "FlowSelect uses a custom dropdown (not native <select>) for cross-platform consistency and rich option rendering (icons, disabled options). The floating label animates like FlowTextInput for visual consistency. Phase C.1: trigger, label, and hint compose the shared .flow-input-surface CSS classes — all border/state rules (hover, focus, error, success, disabled) are centralized in the InputSurface layer. Border uses box-shadow (inset) instead of real CSS border for zero-layout-shift on state changes. Focus ring is keyboard-only (:focus-visible) on the button trigger.",
      props: [
        {
          name: "label",
          type: "string",
          description: "Floating label text. Required for accessibility.",
          required: true,
        },
        {
          name: "options",
          type: "SelectOption[]",
          description: "Array of {value, label, icon?, disabled?} objects.",
          required: true,
        },
        {
          name: "value",
          type: "string",
          description: "Controlled selected value.",
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
          type: "(value: string, option: SelectOption) => void",
          description: "Called when selection changes.",
          required: false,
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Select an option..."',
          description: "Placeholder text when no value selected.",
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
          description: "Shows loading spinner before chevron.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description: "Size variant — controls height, font, padding.",
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
        { intent: "do", text: "Use FlowSelect for 5+ options or when space is limited." },
        { intent: "do", text: "Provide meaningful placeholder text for optional selections." },
        { intent: "do", text: "Use option icons when they help users scan options faster." },
        { intent: "dont", text: "Don't use for 2-4 options — use FlowRadioGroup instead." },
        {
          intent: "dont",
          text: "Don't put more than 15-20 options without search — use FlowCountrySelect or Autocomplete pattern.",
        },
        { intent: "info", text: "Uses custom dropdown for cross-platform visual consistency." },
        {
          intent: "info",
          text: "Shares comp.textinput tokens with FlowTextInput for input-family cohesion.",
        },
        {
          intent: "info",
          text: "Density-aware: height, padding, font sizes shift ±1 step in compact/comfortable.",
        },
      ],
    },
  },

  // ─── FlowSlider ───
  "selection/flow-slider": {
    domain: "Selection",
    spec: {
      name: "FlowSlider",
      purpose:
        "Range input for selecting numeric values. Custom-styled slider with track, fill, and thumb. Uses native <input type='range'> for accessibility.",
      platform: "shared",
      anatomy: [
        {
          part: "Slider track",
          description: "Background rail",
          tokens: ["comp.slider.track-bg", "comp.slider.track-height", "comp.slider.radius"],
        },
        {
          part: "Slider fill",
          description: "Filled portion from start to thumb",
          tokens: ["comp.slider.fill-bg"],
        },
        {
          part: "Slider thumb",
          description: "Draggable circular handle",
          tokens: ["comp.slider.thumb-bg", "comp.slider.thumb-size"],
        },
        { part: "Label", description: "Optional label above slider", tokens: [] },
      ],
      variants: ["Default"],
      states: ["default", "hover", "focus", "dragging", "disabled"],
      accessibility: {
        handled: [
          "Semantic input type='range'",
          "aria-valuemin, aria-valuemax, aria-valuenow",
          "Keyboard support (Arrow keys)",
        ],
        required: ["Provide label prop or aria-label"],
        keyboard: ["Tab to focus", "Arrow keys to adjust", "Page Up/Down for larger steps"],
      },
    },
    demos: {
      overview: () => <FlowSliderOverview />,
      variants: () => <FlowSliderVariants />,
    },
    developer: {
      reactImport: `import { FlowSlider } from "@flow/design-system";`,
      reactUsage: `const [value, setValue] = useState(50);

<FlowSlider
  label="Volume"
  value={value}
  onChange={setValue}
  min={0}
  max={100}
/>

// With step
<FlowSlider
  label="Rating"
  value={rating}
  onChange={setRating}
  min={0}
  max={5}
  step={0.5}
/>

// Disabled
<FlowSlider label="Disabled" value={50} min={0} max={100} disabled />`,
      flutterImport: `import 'package:flow_ds/selection.dart';`,
      flutterUsage: `FlowSlider(
  label: 'Volume',
  value: value,
  onChanged: (v) => setState(() => value = v),
  min: 0,
  max: 100,
)`,
      notes:
        "FlowSlider uses native <input type='range'> with custom styling. Supports min, max, step, and value props for full control.",
      props: [
        { name: "label", type: "string", description: "Label text above slider.", required: false },
        { name: "value", type: "number", description: "Controlled value.", required: false },
        {
          name: "onChange",
          type: "(value: number) => void",
          description: "Change handler.",
          required: false,
        },
        { name: "min", type: "number", default: "0", description: "Minimum value." },
        { name: "max", type: "number", default: "100", description: "Maximum value." },
        { name: "step", type: "number", default: "1", description: "Step increment." },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description: "Size variant.",
        },
        { name: "disabled", type: "boolean", default: "false", description: "Disables slider." },
      ],
      guidelines: [
        {
          intent: "do",
          text: "Use sliders for continuous numeric ranges (volume, brightness, price).",
        },
        { intent: "do", text: "Show current value near slider for user feedback." },
        {
          intent: "dont",
          text: "Don't use sliders for precise value entry — use FlowTextInput instead.",
        },
        { intent: "info", text: "Thumb size increases on hover/focus for easier interaction." },
      ],
    },
  },

  // ─── FlowSegmentedControl ───
  "selection/flow-segmented-control": {
    domain: "Selection",
    spec: {
      name: "FlowSegmentedControl",
      purpose:
        "Single selection from 2-5 options with animated pill slider indicator. Used for view modes, filters, and tabs.",
      platform: "shared",
      anatomy: [
        {
          part: "Control container",
          description: "Pill-shaped wrapper",
          tokens: ["comp.segmented.bg", "comp.segmented.radius", "comp.segmented.padding"],
        },
        {
          part: "Slider pill",
          description: "Animated background indicator",
          tokens: ["comp.segmented.slider-bg", "comp.segmented.transition"],
        },
        {
          part: "Option buttons",
          description: "Clickable option labels",
          tokens: ["comp.segmented.option-text"],
        },
      ],
      variants: ["2 options", "3 options", "4 options", "5 options"],
      states: ["default", "hover", "focus", "selected"],
      accessibility: {
        handled: [
          "role='radiogroup' on container",
          "role='radio' on options",
          "aria-checked reflects selection",
          "Keyboard navigation",
        ],
        required: ["Provide aria-label on control"],
        keyboard: ["Tab to focus", "Arrow keys to navigate", "Space/Enter to select"],
      },
    },
    demos: {
      overview: () => <FlowSegmentedControlOverview />,
      variants: () => <FlowSegmentedControlVariants />,
    },
    developer: {
      reactImport: `import { FlowSegmentedControl } from "@flow/design-system";`,
      reactUsage: `const [view, setView] = useState("list");

<FlowSegmentedControl
  options={[
    { value: "list", label: "List" },
    { value: "grid", label: "Grid" },
    { value: "table", label: "Table" },
  ]}
  value={view}
  onChange={setView}
/>

// With icons
<FlowSegmentedControl
  options={[
    { value: "list", label: "List", icon: "list" },
    { value: "grid", label: "Grid", icon: "grid" },
  ]}
  value={view}
  onChange={setView}
/>`,
      flutterImport: `import 'package:flow_ds/selection.dart';`,
      flutterUsage: `FlowSegmentedControl(
  options: [
    SegmentedOption(value: 'list', label: 'List'),
    SegmentedOption(value: 'grid', label: 'Grid'),
  ],
  value: view,
  onChanged: (v) => setState(() => view = v),
)`,
      notes:
        "FlowSegmentedControl is ideal for 2-5 mutually exclusive options where all should be visible. The pill slider animates smoothly between selections.",
      props: [
        {
          name: "options",
          type: "Array<{value: string, label: string, icon?: string}>",
          description: "2-5 options.",
          required: true,
        },
        {
          name: "value",
          type: "string",
          description: "Currently selected value.",
          required: false,
        },
        {
          name: "onChange",
          type: "(value: string) => void",
          description: "Change handler.",
          required: false,
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description: "Size variant.",
        },
      ],
      guidelines: [
        {
          intent: "do",
          text: "Use for 2-5 mutually exclusive options (view modes, filters, tabs).",
        },
        { intent: "do", text: "Keep option labels concise (1-2 words max)." },
        {
          intent: "dont",
          text: "Don't use for more than 5 options — use FlowTabs or FlowSelect instead.",
        },
        {
          intent: "info",
          text: "The pill slider animates via CSS transform for smooth transitions.",
        },
      ],
    },
  },

  // ─── FlowToggleButton ───
  "selection/flow-toggle-button": {
    domain: "Selection",
    spec: {
      name: "FlowToggleButton",
      purpose:
        "Button with pressed/unpressed state. Used for toolbar formatting controls and toggleable actions.",
      platform: "shared",
      anatomy: [
        {
          part: "Button container",
          description: "Rectangular button with pressed state",
          tokens: ["comp.togglebutton.bg", "comp.togglebutton.border", "comp.togglebutton.radius"],
        },
        { part: "Button content", description: "Icon, text, or both", tokens: [] },
      ],
      variants: ["Unpressed", "Pressed"],
      states: ["unpressed", "pressed", "hover", "focus-visible", "disabled"],
      accessibility: {
        handled: [
          "Semantic button with aria-pressed",
          "aria-pressed reflects state",
          "Keyboard support",
        ],
        required: ["Provide aria-label or children text"],
        keyboard: ["Tab to focus", "Space/Enter to toggle"],
      },
    },
    demos: {
      overview: () => <FlowToggleButtonOverview />,
      variants: () => <FlowToggleButtonVariants />,
    },
    developer: {
      reactImport: `import { FlowToggleButton } from "@flow/design-system";`,
      reactUsage: `const [bold, setBold] = useState(false);

<FlowToggleButton
  pressed={bold}
  onPressedChange={setBold}
  aria-label="Bold"
>
  <FlowIcon name="bold" />
</FlowToggleButton>

// With text
<FlowToggleButton pressed={pressed} onPressedChange={setPressed}>
  Bold
</FlowToggleButton>`,
      flutterImport: `import 'package:flow_ds/selection.dart';`,
      flutterUsage: `FlowToggleButton(
  pressed: bold,
  onPressed: (value) => setState(() => bold = value),
  child: Icon(Icons.format_bold),
)`,
      notes:
        "FlowToggleButton is ideal for toolbar formatting controls (bold, italic, underline) and toggleable actions. Use aria-pressed for accessibility.",
      props: [
        { name: "pressed", type: "boolean", description: "Pressed state.", required: false },
        {
          name: "onPressedChange",
          type: "(pressed: boolean) => void",
          description: "Change handler.",
          required: false,
        },
        {
          name: "children",
          type: "ReactNode",
          description: "Button content (icon, text).",
          required: true,
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description: "Size variant.",
        },
        { name: "disabled", type: "boolean", default: "false", description: "Disables button." },
      ],
      guidelines: [
        { intent: "do", text: "Use for toolbar formatting controls and toggleable actions." },
        { intent: "do", text: "Provide clear aria-label for icon-only buttons." },
        {
          intent: "info",
          text: "Uses aria-pressed for accessibility (different from aria-selected).",
        },
      ],
    },
  },

  // ─── FlowToggleButtonGroup ───
  "selection/flow-toggle-button-group": {
    domain: "Selection",
    spec: {
      name: "FlowToggleButtonGroup",
      purpose:
        "Container for FlowToggleButton children with connected borders and consistent spacing.",
      platform: "shared",
      anatomy: [
        {
          part: "Group container",
          description: "Inline flex container with connected buttons",
          tokens: ["comp.togglebuttongroup.gap"],
        },
      ],
      variants: [],
      states: ["default"],
      accessibility: {
        handled: ["role='toolbar'"],
        required: [],
        keyboard: [],
      },
    },
    demos: {
      overview: () => <FlowToggleButtonOverview />,
      variants: () => <FlowToggleButtonVariants />,
    },
    developer: {
      reactImport: `import { FlowToggleButtonGroup } from "@flow/design-system";`,
      reactUsage: `<FlowToggleButtonGroup>
  <FlowToggleButton pressed={bold} onPressedChange={setBold}>B</FlowToggleButton>
  <FlowToggleButton pressed={italic} onPressedChange={setItalic}>I</FlowToggleButton>
  <FlowToggleButton pressed={underline} onPressedChange={setUnderline}>U</FlowToggleButton>
</FlowToggleButtonGroup>`,
      flutterImport: `import 'package:flow_ds/selection.dart';`,
      flutterUsage: `FlowToggleButtonGroup(
  children: [
    FlowToggleButton(pressed: bold, child: Text('B')),
    FlowToggleButton(pressed: italic, child: Text('I')),
  ],
)`,
      notes:
        "FlowToggleButtonGroup visually connects toggle buttons with shared borders for toolbar UIs.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          description: "FlowToggleButton children.",
          required: true,
        },
      ],
      guidelines: [
        {
          intent: "do",
          text: "Use for grouping related toggle buttons (text formatting toolbar).",
        },
      ],
    },
  },
};
