/**
 * FLOW - Inputs Domain Demos
 * Demo functions for input components (FlowTextInput, FlowTextArea)
 */
import { useState } from "react";

import { FlowCountrySelect, FlowPhoneInput, FlowTextArea, FlowTextInput, Stack, Text } from "../../../../lib";
import { DemoGroup, DemoSection } from "../../../components/demo-helpers";
import { Callout } from "../../../components/doc-primitives";
import { SIZES } from "../types";

export function FlowTextInputOverview() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [error, setError] = useState("");

  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Usage"
        description="Floating-label text input with progressive border-width. Label floats up when focused or filled."
      >
        <DemoGroup>
          <Stack gap={4} style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
            <FlowTextInput
              label="Email"
              value={value1}
              onChange={(v) => setValue1(v)}
              placeholder="Enter your email"
            />
            <FlowTextInput
              label="Password"
              type="password"
              value={value2}
              onChange={(v) => setValue2(v)}
            />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Sizes"
        description="Four size variants: sm, md (default), lg, xl. Controls height, font size, and padding."
      >
        <DemoGroup>
          <Stack gap={4}>
            {SIZES.map((size) => (
              <div key={size} className={`demo-input-scale-${size}`}>
                <FlowTextInput
                  label={`Size ${size}`}
                  size={size}
                  placeholder={`Placeholder for ${size}`}
                />
              </div>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="States"
        description="Inputs support hint text, error states, success states, loading, and disabled."
      >
        <DemoGroup>
          <Stack gap={4} style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
            <FlowTextInput label="With hint" hint="This is a helpful hint" />
            <FlowTextInput
              label="With error"
              error="This field is required"
              value={error}
              onChange={(v) => setError(v)}
            />
            <FlowTextInput label="Success state" success hint="Looks good!" value="Valid input" />
            <FlowTextInput label="Disabled" disabled value="Cannot edit" />
            <FlowTextInput label="Loading" loading />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="With Icons"
        description="Leading and trailing icon slots. Icons auto-size per input size and inherit state colors (focus, error, disabled)."
      >
        <DemoGroup>
          <Stack gap={4} style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
            <FlowTextInput label="Search" leadingIcon="search" placeholder="Search..." />
            <FlowTextInput label="Email" leadingIcon="mail" placeholder="you@example.com" />
            <FlowTextInput label="Password" type="password" trailingIcon="eye" />
            <FlowTextInput
              label="Calendar event"
              leadingIcon="calendar"
              trailingIcon="chevron-down"
              placeholder="Select date"
            />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Prefix & Suffix"
        description="Static text before or after the input value. Useful for currencies, units, and URL protocols."
      >
        <DemoGroup>
          <Stack gap={4} style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
            <FlowTextInput
              label="Amount"
              prefix="$"
              suffix="USD"
              placeholder="0.00"
              type="number"
            />
            <FlowTextInput label="Weight" suffix="kg" placeholder="0" type="number" />
            <FlowTextInput label="Website" prefix="https://" placeholder="example.com" />
            <FlowTextInput
              label="Domain"
              leadingIcon="globe"
              prefix="www."
              suffix=".com"
              placeholder="yoursite"
            />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Clearable"
        description="Add clear button (×) that appears on focus/hover when input has value."
      >
        <DemoGroup>
          <Stack gap={4} style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
            <FlowTextInput
              label="Clearable input"
              value={value3}
              onChange={(v) => setValue3(v)}
              clearable
              onClear={() => setValue3("")}
              hint="Clear button appears when focused and has value"
            />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Accessibility"
        description="FlowTextInput uses semantic <input> with floating <label> linked via htmlFor. Includes aria-invalid and aria-describedby."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowTextInput uses native &lt;input&gt; with associated &lt;label&gt; via htmlFor.
            Error/hint text is linked via aria-describedby. Error state adds aria-invalid=&apos;true&apos;.
            Focus ring is visible for keyboard navigation.
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowTextInputVariants() {
  return (
    <Stack gap={4}>
      <DemoSection title="All Sizes" description="Size comparison across all variants.">
        <DemoGroup>
          <Stack gap={4}>
            {SIZES.map((size) => (
              <div key={size} className={`demo-input-scale-${size}`}>
                <FlowTextInput
                  label={`${size.toUpperCase()} input`}
                  size={size}
                  placeholder={`Size ${size} placeholder`}
                />
              </div>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="State Variants"
        description="Different visual states for validation and feedback."
      >
        <DemoGroup>
          <Stack gap={4} style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
            <FlowTextInput label="Default" placeholder="Normal state" />
            <FlowTextInput label="With hint" hint="Helper text below input" />
            <FlowTextInput label="Error" error="Invalid input" />
            <FlowTextInput label="Success" success hint="Valid input" />
            <FlowTextInput label="Loading" loading />
            <FlowTextInput label="Disabled" disabled value="Cannot edit" />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowTextArea Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowTextAreaOverview() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Usage"
        description="Multi-line text input for longer content. Floating label, progressive border-width, and auto-grow support."
      >
        <DemoGroup>
          <Stack gap={4} style={{ maxWidth: "var(--sys-frame-content-prose)" }}>
            <FlowTextArea
              label="Description"
              value={value1}
              onChange={(val) => setValue1(val)}
              placeholder="Enter a description"
              rows={4}
            />
            <FlowTextArea
              label="Comments"
              value={value2}
              onChange={(val) => setValue2(val)}
              hint="Share your thoughts"
            />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Sizes"
        description="Four size variants: sm, md (default), lg, xl. Controls min-height, font size, and padding."
      >
        <DemoGroup>
          <Stack gap={4}>
            {SIZES.map((size) => (
              <div key={size} className={`demo-input-scale-${size}`}>
                <FlowTextArea
                  label={`Size ${size}`}
                  size={size}
                  placeholder={`Placeholder for ${size}`}
                  rows={3}
                />
              </div>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="States"
        description="TextArea supports hint, error, success, loading, disabled, and read-only states."
      >
        <DemoGroup>
          <Stack gap={4} style={{ maxWidth: "var(--sys-frame-content-prose)" }}>
            <FlowTextArea label="With hint" hint="Maximum 500 characters" />
            <FlowTextArea label="With error" error="This field is required" />
            <FlowTextArea
              label="Success state"
              success
              hint="Saved successfully"
              value="Valid content"
            />
            <FlowTextArea label="Disabled" disabled value="Cannot edit this content" />
            <FlowTextArea label="Loading" loading />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Character Count"
        description="Show remaining characters for inputs with maxLength."
      >
        <DemoGroup>
          <Stack gap={4} style={{ maxWidth: "var(--sys-frame-content-prose)" }}>
            <FlowTextArea
              label="Bio"
              value={value3}
              onChange={(val) => setValue3(val)}
              maxLength={200}
              hint="Tell us about yourself"
              rows={4}
            />
            <Text role="caption" color="secondary">
              {value3.length} / 200 characters
            </Text>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Resize Options"
        description="Control resize behavior: none, vertical, horizontal, both."
      >
        <DemoGroup>
          <Stack gap={4} style={{ maxWidth: "var(--sys-frame-content-prose)" }}>
            <FlowTextArea label="No resize" resize="none" rows={3} />
            <FlowTextArea label="Vertical resize (default)" resize="vertical" rows={3} />
            <FlowTextArea label="Both directions" resize="both" rows={3} />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Accessibility"
        description="FlowTextArea uses semantic <textarea> with floating <label> linked via htmlFor."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowTextArea uses native &lt;textarea&gt; with associated &lt;label&gt; via htmlFor.
            Error/hint text is linked via aria-describedby. Error state adds aria-invalid=&apos;true&apos;.
            Character count updates are announced via aria-live for screen readers.
          </Callout>
        </DemoGroup>
      </DemoSection>

      <Callout intent="info">
        Phase C.1: TextArea container, label, and hint compose the shared{" "}
        <code>.flow-input-surface</code> CSS classes. Border uses <code>box-shadow</code> (inset)
        instead of real CSS border for zero-layout-shift. Label is always at top (no float
        animation) — overrides InputSurface&apos;s transform with <code>transform: none</code>.
      </Callout>
    </Stack>
  );
}

export function FlowTextAreaVariants() {
  return (
    <Stack gap={4}>
      <DemoSection title="All Sizes" description="Size comparison across all variants.">
        <DemoGroup>
          <Stack gap={4}>
            {SIZES.map((size) => (
              <div key={size} className={`demo-input-scale-${size}`}>
                <FlowTextArea
                  label={`${size.toUpperCase()} textarea`}
                  size={size}
                  placeholder={`Size ${size} placeholder`}
                  rows={3}
                />
              </div>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="State Variants"
        description="Different visual states for validation and feedback."
      >
        <DemoGroup>
          <Stack gap={4} style={{ maxWidth: "var(--sys-frame-content-prose)" }}>
            <FlowTextArea label="Default" placeholder="Normal state" rows={3} />
            <FlowTextArea label="With hint" hint="Helper text below textarea" rows={3} />
            <FlowTextArea label="Error" error="Invalid input" rows={3} />
            <FlowTextArea label="Success" success hint="Valid input" rows={3} />
            <FlowTextArea label="Loading" loading rows={3} />
            <FlowTextArea label="Disabled" disabled value="Cannot edit" rows={3} />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowPhoneInput Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowPhoneInputOverview() {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("FR");

  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Usage"
        description="Phone number input with country flag prefix, dial code, and inline country picker. Composes FlowTextInput anatomy with a prefix area for flag + dial code."
      >
        <DemoGroup>
          <Stack gap={4} style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
            <FlowPhoneInput
              label="Phone number"
              value={phone}
              onChange={setPhone}
              country={country}
              onCountryChange={(entry) => setCountry(entry.code)}
              placeholder="Enter phone number"
            />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Sizes"
        description="Four size variants: sm, md, lg, xl. Controls height, font size, flag size, and icon size."
      >
        <DemoGroup>
          <Stack gap={4}>
            {SIZES.map((size) => (
              <div key={size} className={`demo-input-scale-${size}`}>
                <FlowPhoneInput label={`Size ${size}`} size={size} placeholder="Phone number" />
              </div>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="States"
        description="Supports hint text, error, success, loading, and disabled states — mirrors FlowTextInput."
      >
        <DemoGroup>
          <Stack gap={4} style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
            <FlowPhoneInput label="With hint" hint="Include country code" />
            <FlowPhoneInput label="With error" error="Invalid phone number" />
            <FlowPhoneInput label="Success" success hint="Phone verified" value="612345678" />
            <FlowPhoneInput label="Loading" loading />
            <FlowPhoneInput label="Disabled" disabled value="612345678" />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Country Picker"
        description="Click the flag prefix to open the country dropdown. Supports keyboard search and navigation."
      >
        <DemoGroup>
          <Callout intent="info">
            The country prefix button opens a searchable dropdown with all countries. Use arrow keys
            to navigate, Enter to select, Escape to close. The dial code updates automatically when
            a country is selected.
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowPhoneInputVariants() {
  return (
    <Stack gap={4}>
      <DemoSection title="All Sizes" description="Size comparison across all variants.">
        <DemoGroup>
          <Stack gap={4}>
            {SIZES.map((size) => (
              <div key={size} className={`demo-input-scale-${size}`}>
                <FlowPhoneInput
                  label={`${size.toUpperCase()} phone`}
                  size={size}
                  placeholder="Phone number"
                />
              </div>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="State Variants"
        description="Different visual states for validation and feedback."
      >
        <DemoGroup>
          <Stack gap={4} style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
            <FlowPhoneInput label="Default" placeholder="Phone number" />
            <FlowPhoneInput label="With hint" hint="Enter your mobile number" />
            <FlowPhoneInput label="Error" error="Invalid phone number" />
            <FlowPhoneInput label="Success" success hint="Verified" value="612345678" />
            <FlowPhoneInput label="Loading" loading />
            <FlowPhoneInput label="Disabled" disabled value="612345678" />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowCountrySelect Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowCountrySelectOverview() {
  const [country, setCountry] = useState("FR");

  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Usage"
        description="Combobox-style country picker with flag prefix, inline search, and floating label. When focused, the input becomes a search field; when closed, it shows the selected country name."
      >
        <DemoGroup>
          <Stack gap={4} style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
            <FlowCountrySelect
              label="Country"
              value={country}
              onChange={(entry) => setCountry(entry.code)}
            />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Sizes"
        description="Four size variants: sm, md, lg, xl. Controls height, font size, flag size, and chevron size."
      >
        <DemoGroup>
          <Stack gap={4}>
            {SIZES.map((size) => (
              <div key={size} className={`demo-input-scale-${size}`}>
                <FlowCountrySelect label={`Size ${size}`} size={size} />
              </div>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="States"
        description="Supports hint text, error, success, loading, and disabled states — mirrors FlowTextInput."
      >
        <DemoGroup>
          <Stack gap={4} style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
            <FlowCountrySelect label="With hint" hint="Select your country of residence" />
            <FlowCountrySelect label="With error" error="Country is required" />
            <FlowCountrySelect label="Success" success hint="Country confirmed" value="FR" />
            <FlowCountrySelect label="Loading" loading />
            <FlowCountrySelect label="Disabled" disabled value="FR" />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Inline Search"
        description="Focus the input to type and filter countries. The dropdown opens automatically on focus."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowCountrySelect combines inline search with a combobox pattern. On focus, the input
            clears to allow typing a search query. The dropdown filters countries in real-time. Use
            arrow keys to navigate, Enter to select, Escape to close.
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowCountrySelectVariants() {
  return (
    <Stack gap={4}>
      <DemoSection title="All Sizes" description="Size comparison across all variants.">
        <DemoGroup>
          <Stack gap={4}>
            {SIZES.map((size) => (
              <div key={size} className={`demo-input-scale-${size}`}>
                <FlowCountrySelect label={`${size.toUpperCase()} country`} size={size} />
              </div>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="State Variants"
        description="Different visual states for validation and feedback."
      >
        <DemoGroup>
          <Stack gap={4} style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
            <FlowCountrySelect label="Default" />
            <FlowCountrySelect label="With hint" hint="Select country" />
            <FlowCountrySelect label="Error" error="Required field" />
            <FlowCountrySelect label="Success" success hint="Confirmed" value="FR" />
            <FlowCountrySelect label="Loading" loading />
            <FlowCountrySelect label="Disabled" disabled value="FR" />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}
