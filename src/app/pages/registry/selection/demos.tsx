/**
 * FLOW - Selection Domain Demos
 * Demo functions for selection components
 */
import { useState } from "react";

import {
  FlowCheckbox,
  FlowRadioButton,
  FlowRadioGroup,
  FlowSegmentedControl,
  FlowSelect,
  FlowSlider,
  FlowSwitch,
  FlowToggleButton,
  Inline,
  Stack,
  Text,
} from "@flow/design-system";
import { DemoGroup, DemoSection } from "../../../components/demo-helpers";
import { Callout } from "../../../components/doc-primitives";
import { SIZES } from "../types";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSwitch Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowSwitchOverview() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Stack gap={6}>
      <DemoSection title="Basic Switch" description="Toggle control for binary on/off states.">
        <DemoGroup>
          <FlowSwitch
            checked={enabled}
            onChange={(checked) => setEnabled(checked)}
            label="Enable notifications"
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Sizes" description="Four size variants: sm, md, lg, xl.">
        <DemoGroup>
          <Stack gap={2}>
            {SIZES.map((size) => (
              <FlowSwitch key={size} size={size} label={`Size ${size}`} />
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="States" description="Switches support disabled state.">
        <DemoGroup>
          <Stack gap={2}>
            <FlowSwitch label="Enabled switch" />
            <FlowSwitch checked label="Checked switch" />
            <FlowSwitch disabled label="Disabled switch" />
            <FlowSwitch checked disabled label="Disabled checked" />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowSwitchVariants() {
  return (
    <Stack gap={4}>
      <DemoSection title="All Sizes" description="Size comparison.">
        <DemoGroup>
          <Stack gap={2}>
            {SIZES.map((size) => (
              <FlowSwitch key={size} size={size} label={`${size.toUpperCase()} switch`} checked />
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowRadio Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowRadioOverview() {
  const [value, setValue] = useState("option1");

  return (
    <Stack gap={6}>
      <DemoSection
        title="Radio Group"
        description="Single selection from multiple options using FlowRadioGroup."
      >
        <DemoGroup>
          <FlowRadioGroup name="radio-group" value={value} onChange={setValue}>
            <FlowRadioButton value="option1" label="Option 1" />
            <FlowRadioButton value="option2" label="Option 2" />
            <FlowRadioButton value="option3" label="Option 3" />
          </FlowRadioGroup>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Sizes" description="Four size variants.">
        <DemoGroup>
          <Stack gap={2}>
            {SIZES.map((size) => (
              <FlowRadioButton key={size} size={size} label={`Size ${size}`} checked />
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="All Options"
        description="Radio group supports 2-10 options. Layout automatically adapts."
      >
        <DemoGroup>
          <FlowRadioGroup
            name="subscription"
            value={value}
            onChange={setValue}
            className="demo-content-frame-sm"
          >
            <FlowRadioButton value="free" label="Free" />
            <FlowRadioButton value="pro" label="Pro" />
            <FlowRadioButton value="business" label="Business" />
            <FlowRadioButton value="enterprise" label="Enterprise" />
          </FlowRadioGroup>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowRadioVariants() {
  return (
    <Stack gap={4}>
      <DemoSection title="States" description="Radio button states.">
        <DemoGroup>
          <Stack gap={2}>
            <FlowRadioButton label="Unchecked" />
            <FlowRadioButton label="Checked" checked />
            <FlowRadioButton label="Disabled" disabled />
            <FlowRadioButton label="Disabled checked" checked disabled />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowCheckbox Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowCheckboxOverview() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);

  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Checkboxes"
        description="Multi-selection control with checked/unchecked states."
      >
        <DemoGroup>
          <Stack gap={2}>
            <FlowCheckbox checked={checked1} onChange={(c) => setChecked1(c)} label="Option 1" />
            <FlowCheckbox checked={checked2} onChange={(c) => setChecked2(c)} label="Option 2" />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Sizes" description="Four size variants.">
        <DemoGroup>
          <Stack gap={2}>
            {SIZES.map((size) => (
              <FlowCheckbox key={size} size={size} label={`Size ${size}`} checked />
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowCheckboxVariants() {
  return (
    <Stack gap={4}>
      <DemoSection title="States" description="Checkbox states including indeterminate.">
        <DemoGroup>
          <Stack gap={2}>
            <FlowCheckbox label="Unchecked" />
            <FlowCheckbox label="Checked" checked />
            <FlowCheckbox label="Indeterminate" indeterminate />
            <FlowCheckbox label="Disabled" disabled />
            <FlowCheckbox label="Disabled checked" checked disabled />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSelect Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SELECT_OPTIONS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS", disabled: true },
];

const ICON_OPTIONS = [
  { value: "home", label: "Home", icon: "home" },
  { value: "settings", label: "Settings", icon: "settings" },
  { value: "user", label: "Profile", icon: "user" },
];

export function FlowSelectOverview() {
  const [value, setValue] = useState("");

  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Select"
        description="Dropdown menu for selecting one option from a list. Uses floating label, keyboard navigation, and box-shadow border (InputSurface composition)."
      >
        <DemoGroup>
          <FlowSelect
            label="Framework"
            value={value}
            onChange={(val) => setValue(val)}
            options={SELECT_OPTIONS}
            placeholder="Choose a framework..."
            className="demo-content-frame-sm"
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="With icons"
        description="Options can include leading icons for visual cues."
      >
        <DemoGroup>
          <FlowSelect
            label="Navigate to"
            options={ICON_OPTIONS}
            className="demo-content-frame-sm"
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Sizes"
        description="Four size variants — height, font size, label offset, and padding shift via comp tokens."
      >
        <DemoGroup>
          <Stack gap={2}>
            {SIZES.map((size) => (
              <div key={size} className={`demo-input-scale-${size}`}>
                <FlowSelect label={`Size ${size}`} size={size} options={SELECT_OPTIONS} />
              </div>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowSelectVariants() {
  return (
    <Stack gap={4}>
      <DemoSection
        title="States"
        description="All input-family states. Border color and hint text change via shared InputSurface CSS variables."
      >
        <DemoGroup>
          <Stack gap={2} className="demo-content-frame-sm">
            <FlowSelect label="Default" options={SELECT_OPTIONS} />
            <FlowSelect
              label="With hint"
              hint="Pick your preferred framework"
              options={SELECT_OPTIONS}
            />
            <FlowSelect label="With value" defaultValue="react" options={SELECT_OPTIONS} />
            <FlowSelect
              label="With error"
              error="This field is required"
              options={SELECT_OPTIONS}
            />
            <FlowSelect
              label="Success"
              success
              hint="Selection saved"
              defaultValue="vue"
              options={SELECT_OPTIONS}
            />
            <FlowSelect
              label="Loading"
              loading
              hint="Fetching options..."
              options={SELECT_OPTIONS}
            />
            <FlowSelect label="Disabled (empty)" disabled options={SELECT_OPTIONS} />
            <FlowSelect
              label="Disabled (with value)"
              disabled
              defaultValue="angular"
              options={SELECT_OPTIONS}
            />
            <FlowSelect label="Read-only" readOnly defaultValue="svelte" options={SELECT_OPTIONS} />
            <FlowSelect label="Required" required options={SELECT_OPTIONS} />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <Callout intent="info">
        Phase C.1: Select trigger, label, and hint compose the shared{" "}
        <code>.flow-input-surface</code> CSS classes. Border uses <code>box-shadow</code> (inset)
        instead of real CSS border for zero-layout-shift on state changes. Focus ring is
        keyboard-only via <code>:focus-visible</code> suppression.
      </Callout>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSlider Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowSliderOverview() {
  const [value, setValue] = useState(50);

  return (
    <Stack gap={6}>
      <DemoSection title="Basic Slider" description="Range input for selecting numeric values.">
        <DemoGroup>
          <FlowSlider
            label="Volume"
            value={value}
            onChange={setValue}
            min={0}
            max={100}
            className="demo-content-frame-md"
          />
          <Text variant="label-m">Value: {value}</Text>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Sizes" description="Four size variants.">
        <DemoGroup>
          <Stack gap={4} className="demo-content-frame-md">
            {SIZES.map((size) => (
              <FlowSlider key={size} label={`Size ${size}`} value={50} min={0} max={100} />
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowSliderVariants() {
  return (
    <Stack gap={4}>
      <DemoSection title="States" description="Slider states.">
        <DemoGroup>
          <Stack gap={4} className="demo-content-frame-md">
            <FlowSlider label="Default" value={50} min={0} max={100} />
            <FlowSlider label="Disabled" value={50} min={0} max={100} disabled />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSegmentedControl Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowSegmentedControlOverview() {
  const [value, setValue] = useState("list");

  return (
    <Stack gap={6}>
      <DemoSection
        title="Segmented Control"
        description="Single selection from 2-5 options with pill slider indicator."
      >
        <DemoGroup>
          <FlowSegmentedControl
            options={[
              { value: "list", label: "List" },
              { value: "grid", label: "Grid" },
              { value: "table", label: "Table" },
            ]}
            value={value}
            onChange={setValue}
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Sizes" description="Four size variants.">
        <DemoGroup>
          <Stack gap={2}>
            {SIZES.map((size) => (
              <FlowSegmentedControl
                key={size}
                options={[
                  { value: "1", label: "Small" },
                  { value: "2", label: "Large" },
                ]}
                size={size}
                value="1"
              />
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowSegmentedControlVariants() {
  return (
    <Stack gap={4}>
      <DemoSection title="Options Count" description="2-5 options.">
        <DemoGroup>
          <Stack gap={2}>
            <FlowSegmentedControl
              options={[
                { value: "1", label: "One" },
                { value: "2", label: "Two" },
              ]}
              value="1"
            />
            <FlowSegmentedControl
              options={[
                { value: "1", label: "One" },
                { value: "2", label: "Two" },
                { value: "3", label: "Three" },
              ]}
              value="1"
            />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowToggleButton Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowToggleButtonOverview() {
  const [pressed, setPressed] = useState(false);

  return (
    <Stack gap={6}>
      <DemoSection
        title="Toggle Button"
        description="Button with pressed/unpressed state, like toolbar formatting controls."
      >
        <DemoGroup>
          <FlowToggleButton pressed={pressed} onChange={setPressed} aria-label="Bold">
            <Text>Bold</Text>
          </FlowToggleButton>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Sizes" description="Four size variants.">
        <DemoGroup>
          <Inline gap={2} wrap>
            {SIZES.map((size) => (
              <FlowToggleButton
                key={size}
                pressed={size === "md"}
                onChange={() => {}}
                size={size}
                aria-label={`${size} toggle`}
              >
                {size.toUpperCase()}
              </FlowToggleButton>
            ))}
          </Inline>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowToggleButtonVariants() {
  return (
    <Stack gap={4}>
      <DemoSection title="States" description="Pressed and unpressed states.">
        <DemoGroup>
          <Inline gap={2}>
            <FlowToggleButton onChange={() => {}} aria-label="Unpressed">
              Unpressed
            </FlowToggleButton>
            <FlowToggleButton pressed onChange={() => {}} aria-label="Pressed">
              Pressed
            </FlowToggleButton>
            <FlowToggleButton disabled onChange={() => {}} aria-label="Disabled">
              Disabled
            </FlowToggleButton>
          </Inline>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}
