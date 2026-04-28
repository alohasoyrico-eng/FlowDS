/**
 * FLOW - Controls Domain Demos
 * Demo functions for control components (FlowButton, FlowIconButton, FlowFAB)
 * @module controls/demos
 */
import { useState } from "react";

import { FlowButton, FlowFAB, FlowIconButton, Stack, Text } from "@flow/design-system";
import type { ComponentProps } from "react";
import { DemoGroup, DemoSection } from "../../../components/demo-helpers";
import { LayoutGrid } from "../../../components/layout-grid";
import { BUTTON_VARIANTS } from "../types";
import {
  DemoCell,
  statesGridProps,
  useDemoSize,
  useFabDemoSize,
  VariantMatrix,
} from "../../../templates/component-doc-template";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowButton Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowButtonOverview() {
  const [loading1, setLoading1] = useState(false);
  const demoSize = useDemoSize();

  return (
    <Stack gap="section">
      {/* Sizes  4 × span{3} — siempre muestra los 4, no usa demoSize */}
      <DemoSection
        title="Sizes"
        description="Four size variants: sm, md (default), lg, xl. Font size routes through sys.voice.label tokens — density-responsive: compact shifts -1 step, comfortable shifts +1 step."
      >
        <DemoGroup>
          <LayoutGrid fullBleed>
            {(["sm", "md", "lg", "xl"] as const).map((size) => (
              <LayoutGrid.Item key={size} span={3}>
                <DemoCell label={size}>
                  <FlowButton size={size}>Button</FlowButton>
                </DemoCell>
              </LayoutGrid.Item>
            ))}
          </LayoutGrid>
        </DemoGroup>
      </DemoSection>

      {/* States — usa demoSize para que el tamaño sea coherente con el viewport */}
      <DemoSection
        title="States"
        description={`Default, hover, focus-visible, pressed, disabled, and loading. Shown at size="${demoSize}" (matches current viewport density).`}
      >
        <DemoGroup>
          <div {...statesGridProps(demoSize)}>
            <DemoCell label="Default">
              <FlowButton size={demoSize}>Default</FlowButton>
            </DemoCell>
            <DemoCell label="Hover">
              <FlowButton size={demoSize} data-demo-state="hover">
                Hover
              </FlowButton>
            </DemoCell>
            <DemoCell label="Focus">
              <FlowButton size={demoSize} data-demo-state="focus">
                Focus
              </FlowButton>
            </DemoCell>
            <DemoCell label="Pressed">
              <FlowButton size={demoSize} data-demo-state="pressed">
                Pressed
              </FlowButton>
            </DemoCell>
            <DemoCell label="Disabled">
              <FlowButton size={demoSize} disabled>
                Disabled
              </FlowButton>
            </DemoCell>
            <DemoCell label="Loading">
              <FlowButton
                size={demoSize}
                loading={loading1}
                loadingLabel="Saving..."
                onClick={() => {
                  setLoading1(true);
                  setTimeout(() => setLoading1(false), 2000);
                }}
              >
                Loading
              </FlowButton>
            </DemoCell>
          </div>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowButtonVariants() {
  const demoSize = useDemoSize();

  return (
    <Stack gap="section">
      {/* Emphasis — usa demoSize para que el size sea coherente con el viewport */}
      <DemoSection
        title="Emphasis Variants"
        description={`Seven emphasis levels. Shown at size="${demoSize}" (matches current viewport density).`}
      >
        <DemoGroup>
          <LayoutGrid fullBleed>
            {(["primary", "secondary", "tertiary", "outlined", "ghost"] as const).map(
              (emphasis) => (
                <LayoutGrid.Item key={emphasis} span={4}>
                  <DemoCell label={emphasis}>
                    <FlowButton variant={emphasis} size={demoSize}>
                      Button
                    </FlowButton>
                  </DemoCell>
                </LayoutGrid.Item>
              ),
            )}
          </LayoutGrid>
        </DemoGroup>
      </DemoSection>

      {/* Warning emphasis — full state lifecycle demo */}
      <DemoSection
        title="Warning — Full State Lifecycle"
        description={`Warning emphasis provides complete state CSS: default (subtle yellow) → hover (filled amber) → active (darker amber) → disabled (faint tint) → loading (spinner). Shown at size="${demoSize}".`}
      >
        <DemoGroup>
          <div {...statesGridProps(demoSize)}>
            <DemoCell label="Default">
              <FlowButton variant="primary" intent="warning" size={demoSize}>
                Default
              </FlowButton>
            </DemoCell>
            <DemoCell label="Hover">
              <FlowButton
                variant="primary"
                intent="warning"
                size={demoSize}
                data-demo-state="hover"
              >
                Hover
              </FlowButton>
            </DemoCell>
            <DemoCell label="Focus">
              <FlowButton
                variant="primary"
                intent="warning"
                size={demoSize}
                data-demo-state="focus"
              >
                Focus
              </FlowButton>
            </DemoCell>
            <DemoCell label="Pressed">
              <FlowButton
                variant="primary"
                intent="warning"
                size={demoSize}
                data-demo-state="pressed"
              >
                Pressed
              </FlowButton>
            </DemoCell>
            <DemoCell label="Disabled">
              <FlowButton variant="primary" intent="warning" size={demoSize} disabled>
                Disabled
              </FlowButton>
            </DemoCell>
            <DemoCell label="Loading">
              <FlowButton
                variant="primary"
                intent="warning"
                size={demoSize}
                loading
                loadingLabel="Saving..."
              >
                Loading
              </FlowButton>
            </DemoCell>
          </div>
        </DemoGroup>
      </DemoSection>

      {/* Emphasis × Size matrix — siempre muestra todos los tamaños */}
      <DemoSection
        title="All Emphasis × Size Combinations"
        description="Complete matrix of emphasis and size variants."
      >
        <DemoGroup>
          <VariantMatrix sizes={["sm", "md", "lg", "xl"] as const}>
            {(emphasis, size) => (
              <FlowButton
                variant={emphasis as ComponentProps<typeof FlowButton>["variant"]}
                size={size as "sm" | "md" | "lg" | "xl"}
              >
                {size.toUpperCase()}
              </FlowButton>
            )}
          </VariantMatrix>
        </DemoGroup>
      </DemoSection>

      {/* With Icons — usa demoSize también */}
      <DemoSection
        title="With Icons"
        description="Leading icons provide visual context. Icon size automatically matches button size."
      >
        <DemoGroup>
          <LayoutGrid fullBleed>
            <LayoutGrid.Item span={4}>
              <DemoCell label="primary">
                <FlowButton variant="primary" size={demoSize} leadingIcon="check">
                  Primary
                </FlowButton>
              </DemoCell>
            </LayoutGrid.Item>
            <LayoutGrid.Item span={4}>
              <DemoCell label="secondary">
                <FlowButton variant="secondary" size={demoSize} leadingIcon="check">
                  Secondary
                </FlowButton>
              </DemoCell>
            </LayoutGrid.Item>
            <LayoutGrid.Item span={4}>
              <DemoCell label="tertiary">
                <FlowButton variant="tertiary" size={demoSize} leadingIcon="check">
                  Tertiary
                </FlowButton>
              </DemoCell>
            </LayoutGrid.Item>
            <LayoutGrid.Item span={4}>
              <DemoCell label="outlined">
                <FlowButton variant="outlined" size={demoSize} leadingIcon="check">
                  Outlined
                </FlowButton>
              </DemoCell>
            </LayoutGrid.Item>
            <LayoutGrid.Item span={4}>
              <DemoCell label="danger">
                <FlowButton variant="primary" intent="danger" size={demoSize} leadingIcon="close">
                  Danger
                </FlowButton>
              </DemoCell>
            </LayoutGrid.Item>
            <LayoutGrid.Item span={4}>
              <DemoCell label="warning">
                <FlowButton
                  variant="primary"
                  intent="warning"
                  size={demoSize}
                  leadingIcon="alert-triangle"
                >
                  Warning
                </FlowButton>
              </DemoCell>
            </LayoutGrid.Item>
            <LayoutGrid.Item span={4}>
              <DemoCell label="ghost">
                <FlowButton variant="ghost" size={demoSize} leadingIcon="more-vertical">
                  Ghost
                </FlowButton>
              </DemoCell>
            </LayoutGrid.Item>
          </LayoutGrid>
        </DemoGroup>
      </DemoSection>

      {/* Full Width */}
      <DemoSection
        title="Full Width"
        description="fullWidth stretches button to 100% of container width — useful for mobile UIs and call-to-action buttons."
      >
        <DemoGroup>
          <Stack gap="subsection">
            <Text variant="overline">Without fullWidth (natural width)</Text>
            <LayoutGrid fullBleed>
              <LayoutGrid.Item span={12}>
                <Stack gap="component">
                  <FlowButton variant="primary" leadingIcon="check">
                    Confirm
                  </FlowButton>
                  <FlowButton variant="outlined" leadingIcon="download">
                    Download
                  </FlowButton>
                </Stack>
              </LayoutGrid.Item>
            </LayoutGrid>

            <Text variant="overline">With fullWidth — all emphasis variants</Text>
            <LayoutGrid fullBleed>
              <LayoutGrid.Item span={12}>
                <Stack gap="component">
                  <FlowButton fullWidth variant="primary" leadingIcon="check">
                    High
                  </FlowButton>
                  <FlowButton fullWidth variant="secondary" leadingIcon="save">
                    Medium
                  </FlowButton>
                  <FlowButton fullWidth variant="tertiary" leadingIcon="heart">
                    Low
                  </FlowButton>
                  <FlowButton fullWidth variant="outlined" leadingIcon="download">
                    Outline
                  </FlowButton>
                  <FlowButton fullWidth variant="primary" intent="danger" leadingIcon="trash">
                    Danger
                  </FlowButton>
                  <FlowButton
                    fullWidth
                    variant="primary"
                    intent="warning"
                    leadingIcon="alert-triangle"
                  >
                    Warning
                  </FlowButton>
                  <FlowButton fullWidth variant="ghost" leadingIcon="close">
                    Ghost
                  </FlowButton>
                </Stack>
              </LayoutGrid.Item>
            </LayoutGrid>

            <Text variant="overline">Responsive containers — adapts to parent width</Text>
            <LayoutGrid fullBleed>
              <LayoutGrid.Item span={12}>
                <Text variant="label-s" color="tertiary">
                  12 columns (full width)
                </Text>
                <FlowButton fullWidth variant="primary" leadingIcon="plus">
                  Create New Project
                </FlowButton>
              </LayoutGrid.Item>
              <LayoutGrid.Item span={8}>
                <Text variant="label-s" color="tertiary">
                  8 columns
                </Text>
                <FlowButton fullWidth variant="secondary" leadingIcon="save">
                  Save Changes
                </FlowButton>
              </LayoutGrid.Item>
              <LayoutGrid.Item span={6}>
                <Text variant="label-s" color="tertiary">
                  6 columns
                </Text>
                <FlowButton fullWidth variant="outlined" leadingIcon="download">
                  Export
                </FlowButton>
              </LayoutGrid.Item>
              <LayoutGrid.Item span={4}>
                <Text variant="label-s" color="tertiary">
                  4 columns
                </Text>
                <FlowButton fullWidth variant="tertiary" leadingIcon="copy">
                  Copy
                </FlowButton>
              </LayoutGrid.Item>
            </LayoutGrid>
          </Stack>
        </DemoGroup>
      </DemoSection>

      {/* Responsive Grid Layout — real-world compositions */}
      <DemoSection
        title="Responsive Grid Layout"
        description="FlowButton in LayoutGrid — 12-column system (≥ 992px), 6-column tablet (≥ 576px), 1-column mobile. Toggle the Grid overlay (top-right of the page) to see column alignment."
      >
        <DemoGroup>
          <Stack gap="subsection">
            <Text variant="overline">Action row — span 4 + 4 + 4</Text>
            <LayoutGrid fullBleed>
              <LayoutGrid.Item span={4}>
                <FlowButton fullWidth variant="primary" leadingIcon="plus">
                  Create New
                </FlowButton>
              </LayoutGrid.Item>
              <LayoutGrid.Item span={4}>
                <FlowButton fullWidth variant="outlined" leadingIcon="download">
                  Export CSV
                </FlowButton>
              </LayoutGrid.Item>
              <LayoutGrid.Item span={4}>
                <FlowButton fullWidth variant="ghost" leadingIcon="settings">
                  Settings
                </FlowButton>
              </LayoutGrid.Item>
            </LayoutGrid>

            <Text variant="overline">Primary + secondary — span 8 + 4</Text>
            <LayoutGrid fullBleed>
              <LayoutGrid.Item span={8}>
                <FlowButton fullWidth variant="primary" leadingIcon="save">
                  Save & Continue
                </FlowButton>
              </LayoutGrid.Item>
              <LayoutGrid.Item span={4}>
                <FlowButton fullWidth variant="outlined">
                  Cancel
                </FlowButton>
              </LayoutGrid.Item>
            </LayoutGrid>

            <Text variant="overline">Danger zone — span 6 + 6</Text>
            <LayoutGrid fullBleed>
              <LayoutGrid.Item span={6}>
                <FlowButton fullWidth variant="primary" intent="danger" leadingIcon="trash">
                  Delete Account
                </FlowButton>
              </LayoutGrid.Item>
              <LayoutGrid.Item span={6}>
                <FlowButton
                  fullWidth
                  variant="primary"
                  intent="warning"
                  leadingIcon="alert-triangle"
                >
                  Reset Settings
                </FlowButton>
              </LayoutGrid.Item>
            </LayoutGrid>
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowIconButton Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowIconButtonOverview() {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);
  const [selected4, setSelected4] = useState(false);
  const [loading, setLoading] = useState(false);
  const demoSize = useDemoSize();

  return (
    <Stack gap="section">
      {/* Sizes — 4 × span{3} — variant="primary" como énfasis canónico primario */}
      <DemoSection
        title="Sizes"
        description="Four size variants: sm, md, lg, xl. Square dimensions scale proportionally."
      >
        <DemoGroup>
          <LayoutGrid fullBleed>
            {(["sm", "md", "lg", "xl"] as const).map((size) => (
              <LayoutGrid.Item key={size} span={3}>
                <DemoCell label={size}>
                  <FlowIconButton
                    icon="settings"
                    variant="primary"
                    size={size}
                    aria-label={`Settings (${size})`}
                  />
                </DemoCell>
              </LayoutGrid.Item>
            ))}
          </LayoutGrid>
        </DemoGroup>
      </DemoSection>

      {/* States — variant="primary" para mostrar el énfasis primario del componente */}
      <DemoSection
        title="States"
        description={`Default, hover, focus-visible, pressed, disabled, and loading. Shown at size="${demoSize}" with variant="primary" (primary emphasis).`}
      >
        <DemoGroup>
          <div {...statesGridProps(demoSize)}>
            <DemoCell label="Default">
              <FlowIconButton icon="heart" variant="primary" size={demoSize} aria-label="Default" />
            </DemoCell>
            <DemoCell label="Hover">
              <FlowIconButton
                icon="heart"
                variant="primary"
                size={demoSize}
                aria-label="Hover"
                data-demo-state="hover"
              />
            </DemoCell>
            <DemoCell label="Focus">
              <FlowIconButton
                icon="heart"
                variant="primary"
                size={demoSize}
                aria-label="Focus"
                data-demo-state="focus"
              />
            </DemoCell>
            <DemoCell label="Pressed">
              <FlowIconButton
                icon="heart"
                variant="primary"
                size={demoSize}
                aria-label="Pressed"
                data-demo-state="pressed"
              />
            </DemoCell>
            <DemoCell label="Disabled">
              <FlowIconButton
                icon="heart"
                variant="primary"
                size={demoSize}
                aria-label="Disabled"
                disabled
              />
            </DemoCell>
            <DemoCell label="Loading">
              <FlowIconButton
                icon="refresh-cw"
                variant="primary"
                size={demoSize}
                aria-label="Loading"
                loading={loading}
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => setLoading(false), 2000);
                }}
              />
            </DemoCell>
          </div>
        </DemoGroup>
      </DemoSection>

      {/* Selected State — low emphasis es el caso de uso correcto para toggles de toolbar */}
      <DemoSection
        title="Selected State"
        description={`Toggle buttons show selected state with background fill. variant="tertiary" is canonical for toolbar toggles — the filled selected state provides sufficient visual weight.`}
      >
        <DemoGroup>
          <LayoutGrid fullBleed>
            <LayoutGrid.Item span={3}>
              <DemoCell label="Bold">
                <FlowIconButton
                  icon="bold"
                  variant="tertiary"
                  size={demoSize}
                  selected={selected1}
                  onClick={() => setSelected1(!selected1)}
                  aria-label="Bold"
                />
              </DemoCell>
            </LayoutGrid.Item>
            <LayoutGrid.Item span={3}>
              <DemoCell label="Italic">
                <FlowIconButton
                  icon="italic"
                  variant="tertiary"
                  size={demoSize}
                  selected={selected2}
                  onClick={() => setSelected2(!selected2)}
                  aria-label="Italic"
                />
              </DemoCell>
            </LayoutGrid.Item>
            <LayoutGrid.Item span={3}>
              <DemoCell label="Underline">
                <FlowIconButton
                  icon="underline"
                  variant="tertiary"
                  size={demoSize}
                  selected={selected3}
                  onClick={() => setSelected3(!selected3)}
                  aria-label="Underline"
                />
              </DemoCell>
            </LayoutGrid.Item>
            <LayoutGrid.Item span={3}>
              <DemoCell label="Strikethrough">
                <FlowIconButton
                  icon="strikethrough"
                  variant="tertiary"
                  size={demoSize}
                  selected={selected4}
                  onClick={() => setSelected4(!selected4)}
                  aria-label="Strikethrough"
                />
              </DemoCell>
            </LayoutGrid.Item>
          </LayoutGrid>
        </DemoGroup>
      </DemoSection>

      {/* Tooltips — usa demoSize */}
      <DemoSection
        title="Tooltips"
        description="Icon buttons support CSS-only tooltips via tooltip prop."
      >
        <DemoGroup>
          <LayoutGrid fullBleed>
            <LayoutGrid.Item span={4}>
              <DemoCell label="Edit">
                <FlowIconButton icon="edit" size={demoSize} aria-label="Edit" tooltip="Edit" />
              </DemoCell>
            </LayoutGrid.Item>
            <LayoutGrid.Item span={4}>
              <DemoCell label="Copy">
                <FlowIconButton
                  icon="copy"
                  size={demoSize}
                  aria-label="Copy"
                  tooltip="Copy to clipboard"
                />
              </DemoCell>
            </LayoutGrid.Item>
            <LayoutGrid.Item span={4}>
              <DemoCell label="Download">
                <FlowIconButton
                  icon="download"
                  size={demoSize}
                  aria-label="Download"
                  tooltip="Download file"
                />
              </DemoCell>
            </LayoutGrid.Item>
          </LayoutGrid>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowIconButtonVariants() {
  const demoSize = useDemoSize();

  return (
    <Stack gap="section">
      {/* Emphasis — usa demoSize */}
      <DemoSection
        title="Emphasis Variants"
        description={`Seven emphasis levels matching FlowButton. Shown at size="${demoSize}" (matches current viewport density).`}
      >
        <DemoGroup>
          <LayoutGrid fullBleed>
            {(["primary", "secondary", "tertiary", "outlined", "ghost"] as const).map(
              (emphasis) => (
                <LayoutGrid.Item key={emphasis} span={2}>
                  <DemoCell label={emphasis}>
                    <FlowIconButton
                      icon="heart"
                      variant={emphasis}
                      size={demoSize}
                      aria-label={`Favorite (${emphasis})`}
                    />
                  </DemoCell>
                </LayoutGrid.Item>
              ),
            )}
          </LayoutGrid>
        </DemoGroup>
      </DemoSection>

      {/* Emphasis × Size matrix — CSS grid: 5.5rem label + 4 × 1fr */}
      <DemoSection
        title="All Emphasis × Size Combinations"
        description="Complete matrix of emphasis and size variants."
      >
        <DemoGroup>
          <VariantMatrix sizes={["sm", "md", "lg", "xl"] as const}>
            {(emphasis, size) => (
              <FlowIconButton
                icon="star"
                variant={emphasis as ComponentProps<typeof FlowIconButton>["variant"]}
                size={size as "sm" | "md" | "lg" | "xl"}
                aria-label={`Star (${emphasis}, ${size})`}
              />
            )}
          </VariantMatrix>
        </DemoGroup>
      </DemoSection>

      {/* Selected vs Unselected — usa demoSize */}
      <DemoSection
        title="Selected vs Unselected"
        description="Each emphasis uses its identity channel as accent carrier. High: hue shift to accent-blue fill. Medium: blue-100 fill + accent border (both channels). Low: blue-50 fill (bg only). Outline: accent border, no fill (border only). Ghost: accent icon (no chrome). Danger: destructive fill."
      >
        <DemoGroup>
          <Stack gap="component-lg">
            <Text variant="label-m" color="secondary">
              Unselected
            </Text>
            <LayoutGrid fullBleed>
              {BUTTON_VARIANTS.map((emphasis) => (
                <LayoutGrid.Item key={emphasis} span={2}>
                  <DemoCell label={emphasis}>
                    <FlowIconButton
                      icon="heart"
                      variant={emphasis}
                      size={demoSize}
                      aria-label={`Unselected ${emphasis}`}
                    />
                  </DemoCell>
                </LayoutGrid.Item>
              ))}
            </LayoutGrid>

            <Text variant="label-m" color="secondary">
              Selected
            </Text>
            <LayoutGrid fullBleed>
              {BUTTON_VARIANTS.map((emphasis) => (
                <LayoutGrid.Item key={emphasis} span={2}>
                  <DemoCell label={emphasis}>
                    <FlowIconButton
                      icon="heart"
                      variant={emphasis}
                      size={demoSize}
                      selected
                      aria-label={`Selected ${emphasis}`}
                    />
                  </DemoCell>
                </LayoutGrid.Item>
              ))}
            </LayoutGrid>
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowFAB Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowFABOverview() {
  const [count, setCount] = useState(0);
  const [fabLoading, setFabLoading] = useState(false);
  const fabSize = useFabDemoSize();

  return (
    <Stack gap="section">
      <DemoSection
        title="Basic FAB"
        description={`Floating Action Button for primary mobile actions. Shown at size="${fabSize}" (matches current viewport density).`}
      >
        <DemoGroup>
          <div
            style={{
              position: "relative",
              height: "200px",
              border: "1px dashed var(--sys-color-border-decorative)",
              borderRadius: "var(--sys-radius-surface)",
            }}
          >
            <Text style={{ padding: "var(--ref-frame-space-4)" }}>Simulated mobile viewport</Text>
            <FlowFAB
              icon="plus"
              size={fabSize}
              position="none"
              style={{
                position: "absolute",
                bottom: "var(--ref-frame-space-4)",
                right: "var(--ref-frame-space-4)",
              }}
              aria-label="Add item"
              onClick={() => setCount(count + 1)}
            />
          </div>
          <Text variant="label-m" style={{ marginTop: "var(--ref-frame-space-2)" }}>
            Clicks: {count}
          </Text>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Extended FAB"
        description="Pill-shaped FAB with icon + label. More prominent and descriptive."
      >
        <DemoGroup>
          <div
            style={{
              position: "relative",
              height: "200px",
              border: "1px dashed var(--sys-color-border-decorative)",
              borderRadius: "var(--sys-radius-surface)",
            }}
          >
            <Text style={{ padding: "var(--ref-frame-space-4)" }}>Simulated mobile viewport</Text>
            <FlowFAB
              icon="edit"
              size={fabSize}
              label="Compose"
              position="none"
              style={{
                position: "absolute",
                bottom: "var(--ref-frame-space-4)",
                right: "var(--ref-frame-space-4)",
              }}
              aria-label="Compose message"
            />
          </div>
        </DemoGroup>
      </DemoSection>

      {/* Sizes — 3 × span{4} */}
      <DemoSection title="Sizes" description="Three size variants: sm, md (default), lg.">
        <DemoGroup>
          <LayoutGrid fullBleed>
            {(["sm", "md", "lg"] as const).map((size) => (
              <LayoutGrid.Item key={size} span={4}>
                <DemoCell label={size}>
                  <FlowFAB icon="plus" size={size} position="none" aria-label={size} />
                </DemoCell>
              </LayoutGrid.Item>
            ))}
          </LayoutGrid>
        </DemoGroup>
      </DemoSection>

      {/* States — matches FlowButton gold standard order */}
      <DemoSection
        title="States"
        description={`Default, hover, focus, pressed, disabled, and loading. Shown at size="${fabSize}" (matches current viewport density).`}
      >
        <DemoGroup>
          <div {...statesGridProps(fabSize as "sm" | "md" | "lg" | "xl")}>
            <DemoCell label="Default">
              <FlowFAB icon="plus" size={fabSize} position="none" aria-label="Default" />
            </DemoCell>
            <DemoCell label="Hover">
              <FlowFAB
                icon="plus"
                size={fabSize}
                position="none"
                aria-label="Hover"
                data-demo-state="hover"
              />
            </DemoCell>
            <DemoCell label="Focus">
              <FlowFAB
                icon="plus"
                size={fabSize}
                position="none"
                aria-label="Focus"
                data-demo-state="focus"
              />
            </DemoCell>
            <DemoCell label="Pressed">
              <FlowFAB
                icon="plus"
                size={fabSize}
                position="none"
                aria-label="Pressed"
                data-demo-state="pressed"
              />
            </DemoCell>
            <DemoCell label="Disabled">
              <FlowFAB icon="plus" size={fabSize} position="none" aria-label="Disabled" disabled />
            </DemoCell>
            <DemoCell label="Loading">
              <FlowFAB
                icon="plus"
                size={fabSize}
                position="none"
                aria-label="Loading"
                loading={fabLoading}
                onClick={() => {
                  setFabLoading(true);
                  setTimeout(() => setFabLoading(false), 2000);
                }}
              />
            </DemoCell>
          </div>
        </DemoGroup>
      </DemoSection>

      {/* Positions */}
      <DemoSection
        title="Positions"
        description="FABs can be fixed to different viewport corners: bottom-right (default), bottom-left, bottom-center. Shown here with absolute positioning inside demo containers."
      >
        <DemoGroup>
          <Stack gap="component">
            {(["bottom-right", "bottom-left", "bottom-center"] as const).map((pos) => (
              <div
                key={pos}
                style={{
                  position: "relative",
                  height: "120px",
                  border: "1px dashed var(--sys-color-border-decorative)",
                  borderRadius: "var(--sys-radius-surface)",
                }}
              >
                <Text
                  style={{
                    padding: "var(--ref-frame-space-2)",
                    fontSize: "var(--sys-font-size-xs)",
                  }}
                >
                  position=&quot;{pos}&quot;{pos === "bottom-right" ? " (default)" : ""}
                </Text>
                <FlowFAB
                  icon="plus"
                  position="none"
                  aria-label={pos}
                  style={{
                    position: "absolute",
                    bottom: "var(--ref-frame-space-4)",
                    ...(pos === "bottom-right"
                      ? { right: "var(--ref-frame-space-4)" }
                      : pos === "bottom-left"
                        ? { left: "var(--ref-frame-space-4)" }
                        : { left: "50%", transform: "translateX(-50%)" }),
                  }}
                />
              </div>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowFABVariants() {
  const fabSize = useFabDemoSize();

  return (
    <Stack gap="section">
      {/* Standalone variant gallery — matches FlowButton "Emphasis Variants" pattern */}
      <DemoSection
        title="Variant Colors"
        description={`Three color variants: primary (default), secondary, tertiary. Shown at size="${fabSize}" (matches current viewport density).`}
      >
        <DemoGroup>
          <LayoutGrid fullBleed>
            {(["primary", "secondary", "tertiary"] as const).map((variant) => (
              <LayoutGrid.Item key={variant} span={4}>
                <DemoCell label={variant}>
                  <FlowFAB
                    icon="heart"
                    variant={variant}
                    size={fabSize}
                    position="none"
                    aria-label={variant}
                  />
                </DemoCell>
              </LayoutGrid.Item>
            ))}
          </LayoutGrid>
        </DemoGroup>
      </DemoSection>

      {/* Variant × Size matrix — uses VariantMatrix helper with custom variantLevels */}
      <DemoSection
        title="All Variant × Size Combinations"
        description="Complete matrix of variant and size options."
      >
        <DemoGroup>
          <VariantMatrix
            sizes={["sm", "md", "lg"] as const}
            variantLevels={["primary", "secondary", "tertiary"] as const}
          >
            {(variant, size) => (
              <FlowFAB
                icon="star"
                size={size as "sm" | "md" | "lg"}
                variant={variant as "primary" | "secondary" | "tertiary"}
                position="none"
                aria-label={`${variant} ${size}`}
              />
            )}
          </VariantMatrix>
        </DemoGroup>
      </DemoSection>

      {/* Extended FABs — all variants */}
      <DemoSection
        title="Extended FABs"
        description={`All variants with labels (extended format). Shown at size="${fabSize}".`}
      >
        <DemoGroup>
          <Stack gap="component">
            {(
              [
                { icon: "edit", label: "Compose", variant: "primary" },
                { icon: "camera", label: "Capture", variant: "secondary" },
                { icon: "share", label: "Share", variant: "tertiary" },
              ] as const
            ).map(({ icon, label, variant }) => (
              <div
                key={variant}
                style={{
                  position: "relative",
                  height: "120px",
                  border: "1px dashed var(--sys-color-border-decorative)",
                  borderRadius: "var(--sys-radius-surface)",
                }}
              >
                <FlowFAB
                  icon={icon}
                  size={fabSize}
                  label={label}
                  variant={variant}
                  position="none"
                  style={{
                    position: "absolute",
                    bottom: "var(--ref-frame-space-4)",
                    right: "var(--ref-frame-space-4)",
                  }}
                  aria-label={label}
                />
              </div>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}
