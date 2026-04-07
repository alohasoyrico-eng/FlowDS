/**
 * FLOW Design System — Input Demos
 * FlowTextInput, FlowPhoneInput, FlowCountrySelect, FlowSelect.
 */
import { useState } from "react";

import {
  flagByCode,
  FlowButton,
  FlowCountrySelect,
  FlowPhoneInput,
  FlowSelect,
  FlowTextInput,
  Grid,
  Inline,
  Text,
} from "../../../lib";
import { DemoGroup, DemoSection, GRID_2_MIN, GRID_3_MIN } from "./helpers";

export function InputsDemos() {
  // ── FlowTextInput state ──
  const [textInputValue, setTextInputValue] = useState("");
  const [textInputError, setTextInputError] = useState("");
  const [textInputDisabled, setTextInputDisabled] = useState(false);

  const validateTextInput = (v: string) => {
    setTextInputValue(v);
    if (v.length > 0 && v.length < 3) {
      setTextInputError("Minimum 3 characters required");
    } else if (v.includes("@") && !v.includes(".")) {
      setTextInputError("Enter a valid email address");
    } else {
      setTextInputError("");
    }
  };

  // ── FlowPhoneInput state ──
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState("FR");
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (phoneError && value.length > 0) setPhoneError("");
  };

  const handlePhoneValidate = () => {
    if (phone.length === 0) {
      setPhoneError("Phone number is required");
    } else if (phone.length < 6) {
      setPhoneError("Phone number is too short");
    } else {
      setPhoneError("");
    }
  };

  // ── FlowCountrySelect state ──
  const [selectedCountry, setSelectedCountry] = useState("FR");
  const [countrySelectError, setCountrySelectError] = useState("");

  // ── FlowSelect state ──
  const [fruit, setFruit] = useState("");

  // ── FlowSelect demo data ──
  const fruitOptions = [
    { value: "apple", label: "Apple", icon: "check" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "grape", label: "Grape" },
    { value: "mango", label: "Mango" },
    { value: "unavailable", label: "Unavailable (disabled)", disabled: true },
    { value: "orange", label: "Orange" },
    { value: "peach", label: "Peach" },
  ];

  const roleOptions = [
    { value: "admin", label: "Administrator" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" },
    { value: "guest", label: "Guest" },
  ];

  return (
    <>
      <DemoSection
        title="FlowTextInput"
        description={
          <>
            Floating-label input from Figma Edenred. 4 sizes (sm/md/lg/xl → 48/60/72/88px default),
            animated label via CSS transform, progressive border-width (1.5px→2px), clearable
            button, and hint/error with warning icon.
          </>
        }
      >
        {/* Sizes — sm/md/lg/xl */}
        <DemoGroup>
          <Text role="overline">Sizes — sm / md / lg / xl</Text>
          <Text role="caption" color="tertiary">
            All 4 sizes share the same label/value font — only height, padding, label offset, and
            input bottom change per size. Density scales all uniformly.
          </Text>
          <Inline gap="component" align="end" style={{ flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 160px" }}>
              <FlowTextInput size="sm" label="Small" placeholder="sm" hint="48px · 12px label" />
            </div>
            <div style={{ flex: "1 1 160px" }}>
              <FlowTextInput size="md" label="Medium" placeholder="md" hint="60px · 14px label" />
            </div>
            <div style={{ flex: "1 1 160px" }}>
              <FlowTextInput size="lg" label="Large" placeholder="lg" hint="72px · 18px label" />
            </div>
            <div style={{ flex: "1 1 160px" }}>
              <FlowTextInput
                size="xl"
                label="Extra Large"
                placeholder="xl"
                hint="88px · 24px label"
                clearable
              />
            </div>
          </Inline>
        </DemoGroup>

        {/* Default + Hint + Clearable */}
        <DemoGroup>
          <Text role="overline">Default / Hint / Clearable</Text>
          <Text role="caption" color="tertiary">
            Click to focus — label floats up. Type to see clear button appear. Hover the container
            to see 2px border.
          </Text>
          <Grid minItemWidth={GRID_2_MIN} gap="component">
            <FlowTextInput label="Full name" hint="As it appears on your ID" />
            <FlowTextInput
              label="Email address"
              hint="We'll never share your email"
              clearable
              type="email"
              placeholder="john@example.com"
            />
          </Grid>
        </DemoGroup>

        {/* Live validation */}
        <DemoGroup>
          <Text role="overline">Live Validation</Text>
          <Text role="caption" color="tertiary">
            Type to trigger validation — under 3 chars shows error, &quot;@&quot; without &quot;.&quot; shows error.
            Clear to reset.
          </Text>
          <Grid minItemWidth={GRID_2_MIN} gap="component">
            <FlowTextInput
              label="Username"
              hint="Must be at least 3 characters"
              error={textInputError || undefined}
              value={textInputValue}
              onChange={validateTextInput}
              clearable
              onClear={() => {
                setTextInputValue("");
                setTextInputError("");
              }}
            />
            <FlowTextInput label="Password" type="password" hint="At least 8 characters" />
          </Grid>
        </DemoGroup>

        {/* State Showcase */}
        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Text role="caption" color="tertiary">
            All visual states — focus, error, success, loading, disabled
          </Text>
          <Grid minItemWidth={GRID_3_MIN} gap="component">
            <FlowTextInput label="Default" hint="Default state" />
            <FlowTextInput label="With value" defaultValue="Hello World" hint="Label floated" />
            <FlowTextInput label="Error" error="This field is required" defaultValue="Invalid" />
            <FlowTextInput
              label="Success"
              defaultValue="user@example.com"
              success
              hint="Email verified"
            />
            <FlowTextInput label="Loading" defaultValue="checking..." loading hint="Validating" />
            <FlowTextInput label="Disabled" defaultValue="Cannot edit" disabled hint="Read-only" />
          </Grid>
        </DemoGroup>

        <Inline gap={3}>
          <FlowButton
            variant="low"
            size="sm"
            onClick={() => setTextInputDisabled(!textInputDisabled)}
          >
            Toggle disabled
          </FlowButton>
          <FlowButton
            variant="low"
            size="sm"
            onClick={() => {
              setTextInputValue("");
              setTextInputError("");
            }}
          >
            Clear validation
          </FlowButton>
        </Inline>
      </DemoSection>
      <DemoSection
        title="FlowPhoneInput"
        description="Composes FlowTextInput anatomy + FlowFlag. 4 sizes (sm/md/lg/xl). Includes flag prefix with country selector dropdown, dial code, floating label, and all standard input states."
      >
        {/* Sizes */}
        <DemoGroup>
          <Text role="overline">Sizes — sm / md / lg / xl</Text>
          <Grid columns="repeat(auto-fill, minmax(260px, 1fr))" gap="component">
            <FlowPhoneInput size="sm" label="Small" hint="48px · 12px" country="FR" />
            <FlowPhoneInput size="md" label="Medium" hint="60px · 14px" country="BR" />
            <FlowPhoneInput size="lg" label="Large" hint="72px · 18px" country="ES" />
            <FlowPhoneInput size="xl" label="Extra Large" hint="88px · 24px" country="AU" />
          </Grid>
        </DemoGroup>

        {/* Default */}
        <DemoGroup>
          <Text role="overline">Interactive Example</Text>
          <div style={{ maxWidth: "var(--ref-frame-content-form)" }}>
            <FlowPhoneInput
              label="Phone number"
              hint="Enter your mobile number"
              value={phone}
              country={phoneCountry}
              onChange={(val) => handlePhoneChange(val)}
              onCountryChange={(c) => setPhoneCountry(c.code)}
              error={phoneError}
            />
          </div>
          <Inline gap={2}>
            <FlowButton variant="medium" size="sm" onClick={handlePhoneValidate}>
              Validate
            </FlowButton>
            <FlowButton
              variant="low"
              size="sm"
              onClick={() => {
                setPhone("");
                setPhoneError("");
                setPhoneCountry("FR");
              }}
            >
              Reset
            </FlowButton>
          </Inline>
          {phone && (
            <Text role="caption" color="secondary">
              Full number: {flagByCode[phoneCountry]?.dial} {phone}
            </Text>
          )}
        </DemoGroup>

        {/* Pre-filled countries */}
        <DemoGroup>
          <Text role="overline">Pre-filled with Different Countries</Text>
          <Grid columns="repeat(auto-fill, minmax(280px, 1fr))" gap="component">
            <FlowPhoneInput
              label="Phone number"
              hint="Brazil office"
              country="BR"
              defaultValue="11 9876 5432"
            />
            <FlowPhoneInput
              label="Phone number"
              hint="Belgium office"
              country="BE"
              defaultValue="2 123 45 67"
            />
            <FlowPhoneInput
              label="Phone number"
              hint="Spain office"
              country="ES"
              defaultValue="912 345 678"
            />
          </Grid>
        </DemoGroup>

        {/* State Showcase */}
        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Grid columns="repeat(auto-fill, minmax(280px, 1fr))" gap="component">
            <FlowPhoneInput
              label="Error state"
              error="Invalid phone number format"
              country="FR"
              defaultValue="123"
            />
            <FlowPhoneInput
              label="Success state"
              country="FR"
              defaultValue="6 12 34 56 78"
              success
              hint="Number verified"
            />
            <FlowPhoneInput
              label="Loading state"
              country="BR"
              defaultValue="555 123 4567"
              loading
              hint="Checking number"
            />
            <FlowPhoneInput
              label="Disabled"
              hint="This field is disabled"
              country="FR"
              defaultValue="6 12 34 56 78"
              disabled
            />
          </Grid>
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="FlowCountrySelect"
        description="Combobox country picker — 4 sizes (sm/md/lg/xl). Click or focus to open the dropdown and type to search/filter countries inline. Keyboard navigation (Arrow + Enter) supported."
      >
        <DemoGroup>
          <Text role="overline">Sizes — sm / md / lg / xl</Text>
          <Grid columns="repeat(auto-fill, minmax(260px, 1fr))" gap="component">
            <FlowCountrySelect size="sm" label="Small" hint="48px · 12px" defaultValue="FR" />
            <FlowCountrySelect size="md" label="Medium" hint="60px · 14px" defaultValue="BR" />
            <FlowCountrySelect size="lg" label="Large" hint="72px · 18px" defaultValue="ES" />
            <FlowCountrySelect size="xl" label="Extra Large" hint="88px · 24px" defaultValue="AU" />
          </Grid>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Interactive Example</Text>
          <div style={{ maxWidth: "var(--ref-frame-content-form)" }}>
            <FlowCountrySelect
              label="Country"
              hint="Select your country of residence"
              value={selectedCountry}
              onChange={(c) => {
                setSelectedCountry(c.code);
                if (countrySelectError) setCountrySelectError("");
              }}
              error={countrySelectError || undefined}
            />
          </div>
          <Inline gap={2}>
            <FlowButton
              variant="medium"
              size="sm"
              onClick={() => {
                if (!selectedCountry) setCountrySelectError("Country is required");
                else setCountrySelectError("");
              }}
            >
              Validate
            </FlowButton>
            <FlowButton
              variant="low"
              size="sm"
              onClick={() => {
                setSelectedCountry("FR");
                setCountrySelectError("");
              }}
            >
              Reset
            </FlowButton>
          </Inline>
          {selectedCountry && (
            <Text role="caption" color="secondary">
              Selected: {selectedCountry} — {flagByCode[selectedCountry]?.name}
            </Text>
          )}
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Pre-filled with Different Countries</Text>
          <Grid columns="repeat(auto-fill, minmax(280px, 1fr))" gap="component">
            <FlowCountrySelect label="Country" hint="Brazil office" defaultValue="BR" />
            <FlowCountrySelect label="Nationality" hint="Belgium HQ" defaultValue="BE" />
            <FlowCountrySelect label="Tax residence" hint="Spain branch" defaultValue="ES" />
          </Grid>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Grid columns="repeat(auto-fill, minmax(280px, 1fr))" gap="component">
            <FlowCountrySelect
              label="Error state"
              error="Please select a valid country"
              defaultValue="FR"
            />
            <FlowCountrySelect
              label="Success state"
              defaultValue="FR"
              success
              hint="Country confirmed"
            />
            <FlowCountrySelect
              label="Loading state"
              defaultValue="BR"
              loading
              hint="Verifying eligibility"
            />
            <FlowCountrySelect
              label="Disabled"
              hint="This field is disabled"
              defaultValue="FR"
              disabled
            />
          </Grid>
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="FlowSelect"
        description="Generic dropdown select with floating label, keyboard navigation, and full ARIA combobox pattern. Shares textInput comp tokens for visual consistency. Supports icons, disabled options, error/hint states."
      >
        <DemoGroup>
          <Text role="overline">Interactive Example</Text>
          <Grid minItemWidth={GRID_3_MIN} gap="component">
            <FlowSelect label="Role" options={roleOptions} hint="Choose your access level" />
            <FlowSelect
              label="Favourite fruit"
              options={fruitOptions}
              value={fruit}
              onChange={(v) => setFruit(v)}
              hint="Some options have icons"
            />
            <FlowSelect
              label="Department"
              options={[
                { value: "eng", label: "Engineering" },
                { value: "design", label: "Design" },
                { value: "marketing", label: "Marketing" },
              ]}
              error="Selection required"
              required
            />
          </Grid>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Sizes — sm / md / lg / xl</Text>
          <Inline gap="component" align="end" style={{ flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 160px" }}>
              <FlowSelect label="Small" size="sm" options={roleOptions} />
            </div>
            <div style={{ flex: "1 1 160px" }}>
              <FlowSelect label="Medium" size="md" options={roleOptions} />
            </div>
            <div style={{ flex: "1 1 160px" }}>
              <FlowSelect label="Large" size="lg" options={roleOptions} />
            </div>
            <div style={{ flex: "1 1 160px" }}>
              <FlowSelect label="Extra Large" size="xl" options={roleOptions} />
            </div>
          </Inline>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Text role="caption" color="tertiary">
            All visual states — error, success, loading, disabled
          </Text>
          <Grid minItemWidth={GRID_3_MIN} gap="component">
            <FlowSelect label="Default" options={roleOptions} hint="No state applied" />
            <FlowSelect label="Error" options={roleOptions} error="Selection required" />
            <FlowSelect
              label="Success"
              options={roleOptions}
              defaultValue="admin"
              success
              hint="Role assigned"
            />
            <FlowSelect label="Loading" options={roleOptions} loading hint="Fetching options..." />
            <FlowSelect label="Disabled" options={roleOptions} defaultValue="viewer" disabled />
          </Grid>
        </DemoGroup>
      </DemoSection>
    </>
  );
}
