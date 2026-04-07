/**
 * FLOW Design System — Selection & Text Demos
 * FlowRadioButton, FlowCheckbox, FlowSwitch, FlowTextArea, FlowOTPInput.
 */
import { useState } from "react";

import {
  Code,
  FlowButton,
  FlowCheckbox,
  FlowCheckboxGroup,
  FlowOTPInput,
  FlowRadioButton,
  FlowRadioGroup,
  FlowSwitch,
  FlowTextArea,
  Grid,
  Inline,
  Stack,
  Text,
} from "../../../lib";
import { DemoGroup, DemoSection, GRID_2_MIN } from "./helpers";

export function SelectionDemos() {
  // ── FlowRadioButton state ──
  const [plan, setPlan] = useState("standard");
  const [radioSize, setRadioSize] = useState("md");
  const [standalone, setStandalone] = useState("a");

  // ── FlowCheckbox state ──
  const [terms, setTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const childChecked = [terms, newsletter, marketing];
  const allChecked = childChecked.every(Boolean);
  const someChecked = childChecked.some(Boolean) && !allChecked;

  const handleParentCheckbox = (checked: boolean) => {
    setTerms(checked);
    setNewsletter(checked);
    setMarketing(checked);
  };

  // ── FlowSwitch state ──
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // ── FlowTextArea state ──
  const [bio, setBio] = useState("");

  // ── FlowOTPInput state ──
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState(false);

  return (
    <>
      <DemoSection
        title="FlowRadioButton"
        description={
          <>
            Figma-aligned radio button with CSS-driven state-layer, border progression (1.5→2px),
            and dot scale animation. Uses native <Code>&lt;input type=&quot;radio&quot;&gt;</Code>{" "}
            for full accessibility (keyboard, form submission, screen reader).
          </>
        }
      >
        <DemoGroup>
          <Text role="overline">RadioGroup — Subscription Plan</Text>
          <FlowRadioGroup name="plan" value={plan} onChange={setPlan} direction="column">
            <FlowRadioButton value="free" label="Free — Basic features" />
            <FlowRadioButton value="standard" label="Standard — Most popular" />
            <FlowRadioButton value="premium" label="Premium — Full access" />
            <FlowRadioButton value="enterprise" label="Enterprise" disabled />
          </FlowRadioGroup>
          <Text role="caption" color="secondary">
            Selected: <Code>{plan}</Code>
          </Text>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Horizontal Group</Text>
          <FlowRadioGroup
            name="size-pref"
            value={radioSize}
            onChange={setRadioSize}
            direction="row"
          >
            <FlowRadioButton value="sm" label="Small" />
            <FlowRadioButton value="md" label="Medium" />
            <FlowRadioButton value="lg" label="Large" />
          </FlowRadioGroup>
          <Text role="caption" color="secondary">
            Selected: <Code>{radioSize}</Code>
          </Text>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Inline gap="component" align="center">
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowRadioButton
                name="state-demo"
                value="a"
                checked={standalone === "a"}
                onChange={setStandalone}
              />
              <Text role="caption" color="tertiary">
                Checked
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowRadioButton
                name="state-demo"
                value="b"
                checked={standalone === "b"}
                onChange={setStandalone}
              />
              <Text role="caption" color="tertiary">
                Unchecked
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowRadioButton
                name="disabled-unselected"
                value="x"
                disabled
                aria-label="Disabled unselected"
              />
              <Text role="caption" color="tertiary">
                Disabled
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowRadioButton
                name="disabled-selected"
                value="y"
                checked
                disabled
                onChange={() => {}}
                aria-label="Disabled selected"
              />
              <Text role="caption" color="tertiary">
                Disabled Checked
              </Text>
            </Stack>
          </Inline>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Size Variants</Text>
          <Inline gap="component" align="center">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <Stack key={s} gap={1} style={{ alignItems: "center" }}>
                <FlowRadioButton
                  name="size-demo-radio"
                  value={s}
                  size={s}
                  checked={s === "md"}
                  onChange={() => {}}
                  label={s.toUpperCase()}
                />
              </Stack>
            ))}
          </Inline>
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="FlowCheckbox"
        description={
          <>
            Checkbox with 3 sub-states: unchecked, checked, and indeterminate. Uses native{" "}
            <Code>&lt;input type=&quot;checkbox&quot;&gt;</Code> with indeterminate set via ref. SVG
            check and dash icons with scale animation.
          </>
        }
      >
        <DemoGroup>
          <Text role="overline">Parent/Child — Indeterminate Pattern</Text>
          <Stack gap={1}>
            <FlowCheckbox
              label="Select all preferences"
              checked={allChecked}
              indeterminate={someChecked}
              onChange={handleParentCheckbox}
            />
            <div style={{ paddingLeft: "var(--ref-frame-space-8)" }}>
              <Stack gap={1}>
                <FlowCheckbox
                  label="Accept terms & conditions"
                  checked={terms}
                  onChange={setTerms}
                />
                <FlowCheckbox
                  label="Subscribe to newsletter"
                  checked={newsletter}
                  onChange={setNewsletter}
                />
                <FlowCheckbox
                  label="Receive marketing emails"
                  checked={marketing}
                  onChange={setMarketing}
                />
              </Stack>
            </div>
          </Stack>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Inline gap="component" align="center">
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowCheckbox aria-label="Unchecked" />
              <Text role="caption" color="tertiary">
                Unchecked
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowCheckbox checked onChange={() => {}} aria-label="Checked" />
              <Text role="caption" color="tertiary">
                Checked
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowCheckbox indeterminate aria-label="Indeterminate" />
              <Text role="caption" color="tertiary">
                Indeterminate
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowCheckbox disabled aria-label="Disabled" />
              <Text role="caption" color="tertiary">
                Disabled
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowCheckbox checked disabled onChange={() => {}} aria-label="Disabled checked" />
              <Text role="caption" color="tertiary">
                Disabled Chk
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowCheckbox indeterminate disabled aria-label="Disabled indeterminate" />
              <Text role="caption" color="tertiary">
                Disabled Ind
              </Text>
            </Stack>
          </Inline>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Size Variants</Text>
          <Inline gap="component" align="center">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <Stack key={s} gap={1} style={{ alignItems: "center" }}>
                <FlowCheckbox size={s} checked onChange={() => {}} label={s.toUpperCase()} />
              </Stack>
            ))}
          </Inline>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">FlowCheckboxGroup (L4 wrapper)</Text>
          <Inline gap="subsection">
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Column (default)
              </Text>
              <FlowCheckboxGroup aria-label="Column group">
                <FlowCheckbox label="Option A" defaultChecked />
                <FlowCheckbox label="Option B" />
                <FlowCheckbox label="Option C" />
              </FlowCheckboxGroup>
            </Stack>
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Row
              </Text>
              <FlowCheckboxGroup direction="row" aria-label="Row group">
                <FlowCheckbox label="Red" />
                <FlowCheckbox label="Green" defaultChecked />
                <FlowCheckbox label="Blue" defaultChecked />
              </FlowCheckboxGroup>
            </Stack>
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Disabled group
              </Text>
              <FlowCheckboxGroup disabled aria-label="Disabled group">
                <FlowCheckbox label="Locked A" defaultChecked />
                <FlowCheckbox label="Locked B" />
              </FlowCheckboxGroup>
            </Stack>
          </Inline>
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="FlowSwitch"
        description={
          <>
            Toggle switch with sliding thumb, track color change, icon swap, and thumb grow
            animation (16 to 18px) on press. Uses{" "}
            <Code>&lt;button role=&quot;switch&quot;&gt;</Code> for full keyboard and screen reader
            accessibility.
          </>
        }
      >
        <DemoGroup>
          <Text role="overline">Settings Panel</Text>
          <Stack gap={3}>
            <FlowSwitch label="Wi-Fi" checked={wifi} onChange={setWifi} />
            <FlowSwitch label="Bluetooth" checked={bluetooth} onChange={setBluetooth} />
            <FlowSwitch label="Dark mode" checked={darkMode} onChange={setDarkMode} />
            <FlowSwitch label="Notifications" checked={notifications} onChange={setNotifications} />
            <FlowSwitch label="Airplane mode (disabled)" disabled />
            <FlowSwitch label="VPN (disabled on)" checked disabled onChange={() => {}} />
          </Stack>
          <Text role="caption" color="secondary">
            Wi-Fi: {wifi ? "on" : "off"} | Bluetooth: {bluetooth ? "on" : "off"} | Dark:{" "}
            {darkMode ? "on" : "off"} | Notifs: {notifications ? "on" : "off"}
          </Text>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Inline gap="component" align="center">
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowSwitch aria-label="Off" />
              <Text role="caption" color="tertiary">
                Off
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowSwitch checked onChange={() => {}} aria-label="On" />
              <Text role="caption" color="tertiary">
                On
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowSwitch disabled aria-label="Disabled off" />
              <Text role="caption" color="tertiary">
                Disabled Off
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowSwitch checked disabled onChange={() => {}} aria-label="Disabled on" />
              <Text role="caption" color="tertiary">
                Disabled On
              </Text>
            </Stack>
          </Inline>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Label Position</Text>
          <Stack gap={3}>
            <FlowSwitch
              label="Label at end (default)"
              checked
              onChange={() => {}}
              labelPosition="end"
            />
            <FlowSwitch label="Label at start" checked onChange={() => {}} labelPosition="start" />
          </Stack>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Size Variants</Text>
          <Inline gap="component" align="center">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <Stack key={s} gap={1} style={{ alignItems: "center" }}>
                <FlowSwitch size={s} checked onChange={() => {}} aria-label={s} />
                <Text role="caption" color="tertiary">
                  {s.toUpperCase()}
                </Text>
              </Stack>
            ))}
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="FlowTextArea"
        description="Multi-line floating-label textarea. Shares textInput comp tokens for size-responsive padding, label, and value font. Size variants (sm/md/lg/xl) scale container padding, label size, and field text. Supports error, success, loading, disabled, read-only. Character counter via maxLength."
      >
        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Grid minItemWidth={GRID_2_MIN} gap="component">
            <FlowTextArea
              label="Bio"
              hint="Tell us about yourself"
              value={bio}
              onChange={setBio}
              maxLength={200}
            />
            <FlowTextArea label="Description" error="Description is required" defaultValue="" />
            <FlowTextArea
              label="Notes"
              success
              hint="Saved successfully"
              defaultValue="This is a note that has been saved."
            />
            <FlowTextArea
              label="Processing..."
              loading
              hint="Validating content"
              defaultValue="Content being validated server-side."
            />
          </Grid>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Size Variants — sm / md / lg / xl</Text>
          <Grid minItemWidth={GRID_2_MIN} gap="component">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <FlowTextArea
                key={s}
                label={`Size: ${s.toUpperCase()}`}
                size={s}
                hint={`size="${s}"`}
                rows={2}
                placeholder={`Textarea at ${s} size`}
              />
            ))}
          </Grid>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Disabled / Read-only</Text>
          <Grid minItemWidth={GRID_2_MIN} gap="component">
            <FlowTextArea label="Disabled" disabled defaultValue="This textarea is disabled" />
            <FlowTextArea
              label="Read-only"
              readOnly
              defaultValue="This textarea is read-only"
              hint="Cannot be edited"
            />
          </Grid>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="FlowOTPInput"
        description="Specialized input for one-time password entry with individual character boxes."
      >
        <DemoGroup>
          <Text role="overline">6-Digit Code</Text>
          <FlowOTPInput
            length={6}
            value={otpValue}
            onChange={(v) => {
              setOtpValue(v);
              setOtpError(false);
            }}
            error={otpError}
          />
          <Inline gap={2}>
            <FlowButton variant="medium" size="sm" onClick={() => setOtpError(true)}>
              Trigger Error
            </FlowButton>
            <FlowButton
              variant="low"
              size="sm"
              onClick={() => {
                setOtpValue("");
                setOtpError(false);
              }}
            >
              Clear
            </FlowButton>
          </Inline>
          <Text role="caption" color="secondary">
            Current value: {otpValue || "(empty)"}
          </Text>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">4-Digit Code</Text>
          <FlowOTPInput length={4} />
        </DemoGroup>
      </DemoSection>
    </>
  );
}
