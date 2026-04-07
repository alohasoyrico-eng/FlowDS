/**
 * FLOW Design System — Controls Demos
 * FlowButton + FlowIconButton interactive demos.
 */
import { useState } from "react";

import {
  FlowButton,
  FlowIconButton,
  Inline,
  Stack,
  Text,
} from "../../../lib";
import { DemoGroup, DemoSection } from "./helpers";

export function ControlsDemos() {
  // ── FlowButton state ──
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnClicks, setBtnClicks] = useState(0);

  // ── FlowIconButton selected state ──
  const [boldActive, setBoldActive] = useState(false);
  const [italicActive, setItalicActive] = useState(true);
  const [underlineActive, setUnderlineActive] = useState(false);

  const handleLoadingClick = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 2000);
  };

  return (
    <>
      <DemoSection
        title="FlowButton"
        description="All 7 emphasis levels (v2), 4 sizes (sm/md/lg/xl), loading state, and disabled state — fully interactive."
      >
        {/* v2 Emphasis Model */}
        <DemoGroup>
          <Text role="overline">v2 Emphasis Model (D1-D8)</Text>
          <Text role="caption" color="tertiary">
            New Figma-aligned taxonomy: high → medium → low → outline → danger → warning → ghost. Hover and press each to see
            state transitions.
          </Text>
          <Inline gap={3} wrap style={{ alignItems: "center" }}>
            <FlowButton variant="high" onClick={() => setBtnClicks((c) => c + 1)}>
              High
            </FlowButton>
            <FlowButton variant="medium" onClick={() => setBtnClicks((c) => c + 1)}>
              Medium
            </FlowButton>
            <FlowButton variant="outline" onClick={() => setBtnClicks((c) => c + 1)}>
              Outline
            </FlowButton>
            <FlowButton variant="low" onClick={() => setBtnClicks((c) => c + 1)}>
              Low
            </FlowButton>
            <FlowButton variant="danger" onClick={() => setBtnClicks((c) => c + 1)}>
              Danger
            </FlowButton>
            <FlowButton variant="warning" onClick={() => setBtnClicks((c) => c + 1)}>
              Warning
            </FlowButton>
            <FlowButton variant="ghost" onClick={() => setBtnClicks((c) => c + 1)}>
              Ghost
            </FlowButton>
          </Inline>
          <Text role="caption" color="tertiary">
            Click count: {btnClicks}
          </Text>
        </DemoGroup>

        {/* v2 Sizes */}
        <DemoGroup>
          <Text role="overline">Sizes × Emphasis</Text>
          <Inline gap={3} wrap style={{ alignItems: "center" }}>
            <FlowButton variant="high" size="sm">
              Small High
            </FlowButton>
            <FlowButton variant="high" size="md">
              Medium High
            </FlowButton>
            <FlowButton variant="high" size="lg">
              Large High
            </FlowButton>
            <FlowButton variant="high" size="xl">
              XL High
            </FlowButton>
          </Inline>
          <Inline gap={3} wrap style={{ alignItems: "center" }}>
            <FlowButton variant="medium" size="sm">
              Small Medium
            </FlowButton>
            <FlowButton variant="medium" size="md">
              Medium Medium
            </FlowButton>
            <FlowButton variant="medium" size="lg">
              Large Medium
            </FlowButton>
            <FlowButton variant="medium" size="xl">
              XL Medium
            </FlowButton>
          </Inline>
        </DemoGroup>

        {/* State Showcase */}
        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Text role="caption" color="tertiary">
            All interaction states — hover over each to see transitions
          </Text>
          <Inline gap="component" align="center" wrap>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowButton variant="high">Default</FlowButton>
              <Text role="caption" color="tertiary">
                Default
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowButton variant="high" disabled>
                Disabled
              </FlowButton>
              <Text role="caption" color="tertiary">
                Disabled
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowButton variant="high" loading loadingLabel="Loading...">
                Save
              </FlowButton>
              <Text role="caption" color="tertiary">
                Loading
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowButton variant="medium">Default</FlowButton>
              <Text role="caption" color="tertiary">
                Medium
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowButton variant="medium" disabled>
                Disabled
              </FlowButton>
              <Text role="caption" color="tertiary">
                Medium Dis
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowButton variant="low">Default</FlowButton>
              <Text role="caption" color="tertiary">
                Low
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowButton variant="danger">Danger</FlowButton>
              <Text role="caption" color="tertiary">
                Danger
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowButton variant="danger" disabled>
                Disabled
              </FlowButton>
              <Text role="caption" color="tertiary">
                Danger Dis
              </Text>
            </Stack>
          </Inline>
        </DemoGroup>

        {/* Interactive Loading */}
        <DemoGroup>
          <Text role="overline">Interactive Loading</Text>
          <Text role="caption" color="tertiary">
            Click any button to trigger 2-second loading state with pulsing dots animation.
          </Text>
          <Inline gap={3} wrap style={{ alignItems: "center" }}>
            <FlowButton
              variant="high"
              loading={btnLoading}
              loadingLabel="Loading..."
              onClick={handleLoadingClick}
            >
              High — click to load
            </FlowButton>
            <FlowButton
              variant="medium"
              loading={btnLoading}
              loadingLabel="Loading..."
              onClick={handleLoadingClick}
            >
              Medium — click to load
            </FlowButton>
            <FlowButton
              variant="danger"
              loading={btnLoading}
              loadingLabel="Deleting..."
              onClick={handleLoadingClick}
            >
              Danger — click to load
            </FlowButton>
            <FlowButton
              variant="low"
              loading={btnLoading}
              loadingLabel="Loading..."
              onClick={handleLoadingClick}
            >
              Low — click to load
            </FlowButton>
          </Inline>
        </DemoGroup>

        {/* With Icons */}
        <DemoGroup>
          <Text role="overline">With Leading Icons</Text>
          <Text role="caption" color="tertiary">
            Icons scale with size: sm/md → 16px, lg → 20px, xl → 24px.
          </Text>
          <Inline gap={3} wrap style={{ alignItems: "center" }}>
            <FlowButton variant="high" leadingIcon="check">
              Confirm
            </FlowButton>
            <FlowButton variant="medium" leadingIcon="edit">
              Edit
            </FlowButton>
            <FlowButton variant="danger" leadingIcon="trash">
              Delete
            </FlowButton>
            <FlowButton variant="low" leadingIcon="download">
              Download
            </FlowButton>
          </Inline>
          <Inline gap={3} wrap style={{ alignItems: "center" }}>
            <FlowButton variant="high" size="sm" leadingIcon="check">
              Small
            </FlowButton>
            <FlowButton variant="high" size="md" leadingIcon="check">
              Medium
            </FlowButton>
            <FlowButton variant="high" size="lg" leadingIcon="check">
              Large
            </FlowButton>
            <FlowButton variant="high" size="xl" leadingIcon="check">
              Extra Large
            </FlowButton>
          </Inline>
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="FlowIconButton"
        description="Compact, square icon-only action trigger. Always requires aria-label. Tooltip on hover/focus via CSS."
      >
        {/* All 5 variants */}
        <DemoGroup>
          <Text role="overline">Emphasis Levels</Text>
          <Inline gap={3} wrap style={{ alignItems: "center" }}>
            <FlowIconButton icon="edit" variant="high" aria-label="Edit" tooltip="High" />
            <FlowIconButton
              icon="settings"
              variant="medium"
              aria-label="Settings"
              tooltip="Medium"
            />
            <FlowIconButton icon="copy" variant="low" aria-label="Copy" tooltip="Low" />
            <FlowIconButton icon="trash" variant="danger" aria-label="Delete" tooltip="Danger" />
          </Inline>
          <Text role="caption" color="tertiary">
            high (dark filled) · medium (outlined) · low (ghost) · outline (border) · danger
            (subtle→filled) · warning (subtle→filled) · ghost (minimal) — same emphasis model as
            FlowButton
          </Text>
        </DemoGroup>

        {/* Sizes */}
        <DemoGroup>
          <Text role="overline">Sizes</Text>
          <Inline gap={3} wrap style={{ alignItems: "center" }}>
            <FlowIconButton
              icon="check"
              variant="high"
              size="sm"
              aria-label="Small"
              tooltip="32px"
            />
            <FlowIconButton
              icon="check"
              variant="high"
              size="md"
              aria-label="Medium"
              tooltip="40px"
            />
            <FlowIconButton
              icon="check"
              variant="high"
              size="lg"
              aria-label="Large"
              tooltip="48px"
            />
          </Inline>
          <Inline gap={3} wrap style={{ alignItems: "center" }}>
            <FlowIconButton icon="check" variant="medium" size="sm" aria-label="Small medium" />
            <FlowIconButton icon="check" variant="medium" size="md" aria-label="Medium medium" />
            <FlowIconButton icon="check" variant="medium" size="lg" aria-label="Large medium" />
          </Inline>
        </DemoGroup>

        {/* State Showcase */}
        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Text role="caption" color="tertiary">
            All interaction states — hover over each to see transitions
          </Text>
          <Inline gap="component" align="center" wrap>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowIconButton icon="star" variant="high" aria-label="Default" />
              <Text role="caption" color="tertiary">
                Default
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowIconButton icon="star" variant="high" selected aria-label="Selected" />
              <Text role="caption" color="tertiary">
                Selected
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowIconButton icon="star" variant="high" disabled aria-label="Disabled" />
              <Text role="caption" color="tertiary">
                Disabled
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowIconButton icon="star" variant="high" loading aria-label="Loading" />
              <Text role="caption" color="tertiary">
                Loading
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowIconButton icon="star" variant="medium" aria-label="Medium" />
              <Text role="caption" color="tertiary">
                Medium
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowIconButton icon="star" variant="low" aria-label="Low" />
              <Text role="caption" color="tertiary">
                Low
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowIconButton icon="trash" variant="danger" aria-label="Danger" />
              <Text role="caption" color="tertiary">
                Danger
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowIconButton
                icon="trash"
                variant="danger"
                disabled
                aria-label="Danger disabled"
              />
              <Text role="caption" color="tertiary">
                Danger Dis
              </Text>
            </Stack>
          </Inline>
        </DemoGroup>

        {/* Interactive Patterns */}
        <DemoGroup>
          <Text role="overline">Interactive Patterns — Toolbar & Toggle</Text>
          <Text role="caption" color="tertiary">
            Common patterns: toolbar grouping with dividers, and toggleable selected state
            (aria-pressed).
          </Text>
          <Stack gap={3}>
            <div
              style={{
                display: "inline-flex",
                gap: "var(--ref-frame-space-1)",
                padding: "var(--ref-frame-space-1)",
                borderRadius: "var(--ref-frame-radius-2)",
                border: "var(--ref-frame-border-thin) solid var(--sys-energy-border-default)",
                background: "var(--sys-energy-surface-secondary)",
              }}
            >
              <FlowIconButton
                icon="edit"
                variant="low"
                size="sm"
                aria-label="Edit"
                tooltip="Edit"
              />
              <FlowIconButton
                icon="copy"
                variant="low"
                size="sm"
                aria-label="Copy"
                tooltip="Copy"
              />
              <FlowIconButton
                icon="download"
                variant="low"
                size="sm"
                aria-label="Download"
                tooltip="Download"
              />
              <div
                style={{
                  width: "var(--ref-frame-border-thin)",
                  background: "var(--sys-energy-border-default)",
                  margin: "var(--ref-frame-space-1) 0",
                }}
              />
              <FlowIconButton
                icon="trash"
                variant="danger"
                size="sm"
                aria-label="Delete"
                tooltip="Delete"
              />
            </div>
            <Inline gap={3} wrap style={{ alignItems: "center" }}>
              <FlowIconButton
                icon="type"
                variant="low"
                selected={boldActive}
                onClick={() => setBoldActive(!boldActive)}
                aria-label="Bold"
                tooltip="Bold"
              />
              <FlowIconButton
                icon="edit"
                variant="low"
                selected={italicActive}
                onClick={() => setItalicActive(!italicActive)}
                aria-label="Italic"
                tooltip="Italic"
              />
              <FlowIconButton
                icon="layers"
                variant="low"
                selected={underlineActive}
                onClick={() => setUnderlineActive(!underlineActive)}
                aria-label="Underline"
                tooltip="Underline"
              />
              <FlowIconButton
                icon="check"
                variant="medium"
                selected
                aria-label="Approved"
                tooltip="Medium selected"
              />
              <FlowIconButton
                icon="star"
                variant="high"
                selected
                aria-label="Favorited"
                tooltip="High selected"
              />
            </Inline>
          </Stack>
        </DemoGroup>
      </DemoSection>
    </>
  );
}
