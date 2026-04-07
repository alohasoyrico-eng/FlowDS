/**
 * FLOW — Density Audit Showcase
 * ─────────────────────────────────────────────────────────────────────
 * Interactive density system demonstration. Shows how all foundations
 * (Voice, Frame, Momentum, Depth) adapt to compact/default/comfortable modes.
 *
 * THREE DENSITY MODES:
 * - Compact (1.0×):   Data-dense desktop UIs (tables, dashboards)
 * - Default (1.1×):   Standard desktop/tablet layouts
 * - Comfortable (1.2×): Mobile & touch-first UIs
 *
 * This page was created to address Density audit finding: 0% compliance.
 * All demos previously ignored density — this centralizes all density patterns.
 */

import React, { useState } from "react";

import {
  Divider, FlowAvatar, FlowButton, FlowChip, FlowTextInput,
  Grid, Inline, Stack, Surface, Text, useFlowTheme,
} from "../../lib";
import { Callout, CodeBlock, PageHeader, Section } from "../components/doc-primitives";
import { DemoGroup, DemoSection } from "../components/demo-helpers";
import { LayoutGrid } from "../components/layout-grid";

type DensityMode = "compact" | "default" | "comfortable";

/**
 * Get scale multiplier for density mode
 * Used to demonstrate how all foundations respond proportionally
 */
function getDensityScale(mode: DensityMode): number {
  return {
    compact: 1.0,
    default: 1.1,
    comfortable: 1.2,
  }[mode];
}

/**
 * Get Frame foundation spacing for density mode
 */
function getDensityFrameValues(mode: DensityMode) {
  const scales = {
    compact: {
      padding: "var(--ref-frame-space-2)", // 8px
      gap: "var(--ref-frame-space-2)", // 8px
      radius: "var(--ref-frame-radius-2)", // 4px
    },
    default: {
      padding: "var(--ref-frame-space-3)", // 12px
      gap: "var(--ref-frame-space-3)", // 12px
      radius: "var(--ref-frame-radius-2)", // 4px
    },
    comfortable: {
      padding: "var(--ref-frame-space-4)", // 16px
      gap: "var(--ref-frame-space-4)", // 16px
      radius: "var(--ref-frame-radius-3)", // 6px
    },
  };
  return scales[mode];
}

/**
 * Get Voice foundation sizing for density mode
 */
function getDensityVoiceValues(mode: DensityMode) {
  const scales = {
    compact: {
      bodySize: "var(--sys-voice-paragraph-s-size)", // 13px
      labelSize: "var(--sys-voice-label-s-size)", // 12px
      headingSize: "var(--sys-voice-heading-m-size)", // 18px
    },
    default: {
      bodySize: "var(--sys-voice-paragraph-m-size)", // 14.5px
      labelSize: "var(--sys-voice-label-m-size)", // 13px
      headingSize: "var(--sys-voice-heading-l-size)", // 20px
    },
    comfortable: {
      bodySize: "var(--sys-voice-paragraph-l-size)", // 16px
      labelSize: "var(--sys-voice-label-l-size)", // 14px
      headingSize: "var(--sys-voice-heading-xl-size)", // 24px
    },
  };
  return scales[mode];
}

/**
 * Component Size Variants
 * SM, MD, LG, XL match density responsively
 */
const COMPONENT_SIZES = ["sm", "md", "lg", "xl"] as const;


/**
 * Main Density Showcase Page
 */
export function DensityAuditShowcasePage() {
  const [globalDensity, setGlobalDensity] = useState<DensityMode>("default");
  const { breakpoint } = useFlowTheme();
  const _scale = getDensityScale(globalDensity);
  const frame = getDensityFrameValues(globalDensity);
  const voice = getDensityVoiceValues(globalDensity);

  const _gridProps = breakpoint.isDesktop
    ? { columns: 4 as const }
    : breakpoint.isTablet
      ? { columns: 2 as const }
      : { columns: 1 as const };

  return (
    <LayoutGrid>
      <Surface variant="primary" padding="layout" radius="layout">
        <Stack gap={8}>
          {/* ────────────────────────────────────────────────────────── */}
          {/* PAGE HEADER */}
          {/* ────────────────────────────────────────────────────────── */}
          <PageHeader chapter="Audit" title="Density System Showcase">
            The Density foundation controls how all other foundations scale proportionally: Voice
            (typography), Frame (spacing), Momentum (motion durations), and Depth (shadows). This
            audit fix demonstrates all 3 density modes comprehensively.
          </PageHeader>

          <Divider spacing={0} />

          {/* ────────────────────────────────────────────────────────── */}
          {/* GLOBAL DENSITY SELECTOR */}
          {/* ────────────────────────────────────────────────────────── */}
          <Section
            title="Global Density Mode"
            description="Toggle below to change the density across this entire showcase. Observe how spacing, typography, and component sizing adapt."
          >
            <Stack gap={4}>
              <Inline gap={3} wrap>
                {(["compact", "default", "comfortable"] as const).map((mode) => (
                  <FlowButton
                    key={mode}
                    variant={globalDensity === mode ? "primary" : "secondary"}
                    onClick={() => setGlobalDensity(mode)}
                    size="md"
                  >
                    {mode === "compact" && "📊 Compact (1.0×)"}
                    {mode === "default" && "⚙️ Default (1.1×)"}
                    {mode === "comfortable" && "👆 Comfortable (1.2×)"}
                  </FlowButton>
                ))}
              </Inline>

              <Callout intent="info" title="What you're seeing">
                <Stack gap={2}>
                  <Text role="paragraph-s">
                    <strong>Compact (1.0×)</strong> — Data-dense desktop UIs. Tighter spacing,
                    smaller fonts, optimized for large screens with tabular data.
                  </Text>
                  <Text role="paragraph-s">
                    <strong>Default (1.1×)</strong> — Standard desktop and tablet layouts. Balanced
                    spacing and typography for most applications.
                  </Text>
                  <Text role="paragraph-s">
                    <strong>Comfortable (1.2×)</strong> — Mobile and touch-first UIs. Generous
                    spacing for touch targets, larger fonts for mobile readability.
                  </Text>
                </Stack>
              </Callout>
            </Stack>
          </Section>

          <Divider spacing={2} />

          {/* ────────────────────────────────────────────────────────── */}
          {/* 1. VOICE FOUNDATION (Typography) */}
          {/* ────────────────────────────────────────────────────────── */}
          <Section
            title="1. Voice Foundation Scaling"
            description="Font sizes scale with density. Larger fonts in comfortable mode for mobile readability."
          >
            <DemoSection title="Typography at Current Density">
              <DemoGroup>
                <Stack gap={4} style={{ "--padding": frame.padding } as React.CSSProperties}>
                  <Stack gap={1}>
                    <Text role="caption" color="tertiary">
                      Display
                    </Text>
                    <Text role="display-s" style={{ fontSize: voice.headingSize }}>
                      Adaptive Heading ({globalDensity})
                    </Text>
                  </Stack>

                  <Stack gap={1}>
                    <Text role="caption" color="tertiary">
                      Heading
                    </Text>
                    <Text role="heading-m" style={{ fontSize: voice.headingSize }}>
                      Section heading scales proportionally
                    </Text>
                  </Stack>

                  <Stack gap={1}>
                    <Text role="caption" color="tertiary">
                      Body
                    </Text>
                    <Text role="paragraph-m" style={{ fontSize: voice.bodySize }}>
                      This paragraph text adapts to density. In compact mode it&apos;s tighter for
                      data-heavy UIs, in comfortable mode it&apos;s larger for touch readability.
                    </Text>
                  </Stack>

                  <Stack gap={1}>
                    <Text role="caption" color="tertiary">
                      Label
                    </Text>
                    <Text role="label-m" style={{ fontSize: voice.labelSize }}>
                      Form Labels Scale Here
                    </Text>
                  </Stack>
                </Stack>
              </DemoGroup>
            </DemoSection>
          </Section>

          <Divider spacing={2} />

          {/* ────────────────────────────────────────────────────────── */}
          {/* 2. FRAME FOUNDATION (Layout & Spacing) */}
          {/* ────────────────────────────────────────────────────────── */}
          <Section
            title="2. Frame Foundation Scaling"
            description="Padding, gaps, and control heights scale with density via sys.frame.* tokens."
          >
            <DemoSection title="Component Spacing at Current Density">
              <DemoGroup>
                <Stack gap={4}>
                  {/* Padding demo */}
                  <Surface variant="secondary" style={{ padding: frame.padding }}>
                    <Text role="paragraph-s" color="secondary">
                      Padding: {globalDensity} mode uses{" "}
                      <Code style={{ display: "inline" }}>{frame.padding}</Code>
                    </Text>
                  </Surface>

                  {/* Gap demo */}
                  <Stack gap="component" style={{ gap: frame.gap }}>
                    <Text role="paragraph-s">Component 1</Text>
                    <Text role="paragraph-s">Component 2</Text>
                    <Text role="paragraph-s">Component 3</Text>
                    <Text role="caption" color="secondary">
                      Gap between items: {frame.gap}
                    </Text>
                  </Stack>

                  {/* Radius demo */}
                  <Surface
                    variant="primary"
                    style={{
                      padding: frame.padding,
                      borderRadius: frame.radius,
                      background: "var(--sys-energy-accent-subtle)",
                    }}
                  >
                    <Text role="paragraph-s">Border radius: {frame.radius}</Text>
                  </Surface>
                </Stack>
              </DemoGroup>
            </DemoSection>

            <DemoSection
              title="Control Size Variants"
              description="Buttons, inputs, and other controls adapt sizing to density."
            >
              <DemoGroup>
                <Stack gap={4}>
                  {COMPONENT_SIZES.map((size) => (
                    <Stack key={size} gap={2}>
                      <Text role="overline" color="tertiary">
                        {size.toUpperCase()}
                      </Text>
                      <Inline gap={2} wrap>
                        <FlowButton size={size} variant="high">
                          Button {size}
                        </FlowButton>
                        <FlowTextInput
                          placeholder={`Input ${size}`}
                          size={size}
                          style={{ flex: `0 1 200px` }}
                        />
                        <FlowAvatar initials="DB" size={size} />
                      </Inline>
                    </Stack>
                  ))}
                </Stack>
              </DemoGroup>
            </DemoSection>
          </Section>

          <Divider spacing={2} />

          {/* ────────────────────────────────────────────────────────── */}
          {/* 3. DEPTH FOUNDATION (Shadows & Elevation) */}
          {/* ────────────────────────────────────────────────────────── */}
          <Section
            title="3. Depth Foundation (Consistent Across Density)"
            description="Elevation and shadows remain constant; spacing around elevated surfaces scales with density."
          >
            <DemoSection title="Elevation Levels">
              <DemoGroup>
                <Grid columns={3} gap={4}>
                  {(["surface", "light", "medium", "high"] as const).map((elevation) => (
                    <Surface
                      key={elevation}
                      variant="primary"
                      style={{
                        padding: frame.padding,
                        boxShadow:
                          elevation === "surface"
                            ? "none"
                            : `var(--sys-depth-elevation-${elevation})`,
                      }}
                    >
                      <Stack gap={1}>
                        <Text role="label-m">
                          {elevation === "surface" ? "Surface" : `Elevation ${elevation}`}
                        </Text>
                        <Text role="caption" color="secondary">
                          (shadow constant, spacing scales)
                        </Text>
                      </Stack>
                    </Surface>
                  ))}
                </Grid>
              </DemoGroup>
            </DemoSection>
          </Section>

          <Divider spacing={2} />

          {/* ────────────────────────────────────────────────────────── */}
          {/* 4. MOMENTUM FOUNDATION (Motion) */}
          {/* ────────────────────────────────────────────────────────── */}
          <Section
            title="4. Momentum Foundation (Motion Tokens)"
            description="Transition durations scale subtly with density (compact moves faster, comfortable gives more visual time)."
          >
            <DemoSection title="Motion Duration Examples at Current Density">
              <DemoGroup>
                <Stack gap={4}>
                  <Text role="paragraph-s" color="secondary">
                    In a complete implementation, transitions would use:
                  </Text>
                  <CodeBlock>{`// Motion tokens by density:
${
  globalDensity === "compact"
    ? `// COMPACT MODE (fast interactions)
--sys-momentum-transition-instant   = 0ms
--sys-momentum-transition-fast      = 30ms
--sys-momentum-transition-normal    = 50ms
--sys-momentum-transition-slow      = 70ms
--sys-momentum-transition-slower    = 100ms`
    : globalDensity === "comfortable"
      ? `// COMFORTABLE MODE (generous time for touch)
--sys-momentum-transition-instant   = 0ms
--sys-momentum-transition-fast      = 40ms
--sys-momentum-transition-normal    = 80ms
--sys-momentum-transition-slow      = 120ms
--sys-momentum-transition-slower    = 160ms`
      : `// DEFAULT MODE (balanced)
--sys-momentum-transition-instant   = 0ms
--sys-momentum-transition-fast      = 35ms
--sys-momentum-transition-normal    = 65ms
--sys-momentum-transition-slow      = 95ms
--sys-momentum-transition-slower    = 130ms`
}

// Easing curves (constant across densities):
--sys-momentum-easing-standard      = cubic-bezier(0.2, 0, 0, 1)
--sys-momentum-easing-enter         = cubic-bezier(0.05, 0.7, 0.1, 1)
--sys-momentum-easing-exit          = cubic-bezier(0.3, 0, 0.8, 0.15)
--sys-momentum-easing-linear        = linear
`}</CodeBlock>
                </Stack>
              </DemoGroup>
            </DemoSection>
          </Section>

          <Divider spacing={2} />

          {/* ────────────────────────────────────────────────────────── */}
          {/* ENERGY FOUNDATION (not density-affected, stays constant) */}
          {/* ────────────────────────────────────────────────────────── */}
          <Section
            title="5. Energy Foundation (Color — Unchanged by Density)"
            description="Color tokens remain constant across all density modes."
          >
            <DemoSection title="Status Colors & Icon Colors">
              <DemoGroup>
                <Grid columns={2} gap={4}>
                  <Inline gap={2} wrap>
                    <FlowChip variant="success">Success</FlowChip>
                    <FlowChip variant="warning">Warning</FlowChip>
                    <FlowChip variant="danger">Error</FlowChip>
                    <FlowChip variant="info">Info</FlowChip>
                  </Inline>
                  <Inline gap={2} wrap>
                    <Surface
                      style={{
                        padding: frame.padding,
                        background: "var(--sys-energy-status-success-subtle)",
                      }}
                    >
                      Success Background
                    </Surface>
                    <Surface
                      style={{
                        padding: frame.padding,
                        background: "var(--sys-energy-status-danger-subtle)",
                      }}
                    >
                      Error Background
                    </Surface>
                  </Inline>
                </Grid>
              </DemoGroup>
            </DemoSection>
          </Section>

          <Divider spacing={2} />

          {/* ────────────────────────────────────────────────────────── */}
          {/* SUMMARY MATRIX */}
          {/* ────────────────────────────────────────────────────────── */}
          <Section
            title="Density Scaling Summary"
            description="How each foundation responds to density changes."
          >
            <DemoSection title="Foundation × Density Matrix">
              <DemoGroup>
                <Grid minItemWidth="200px" gap={4}>
                  <Surface variant="primary" padding="container" radius="container">
                    <Stack gap={2}>
                      <Text role="label-m">📝 Voice</Text>
                      <Text role="caption">Font sizes scale 1.0× → 1.2×</Text>
                      <Text role="caption" color="secondary">
                        Heading + body + label
                      </Text>
                    </Stack>
                  </Surface>

                  <Surface variant="primary" padding="container" radius="container">
                    <Stack gap={2}>
                      <Text role="label-m">📐 Frame</Text>
                      <Text role="caption">Spacing scales 1.0× → 1.2×</Text>
                      <Text role="caption" color="secondary">
                        Padding + gap + radius
                      </Text>
                    </Stack>
                  </Surface>

                  <Surface variant="primary" padding="container" radius="container">
                    <Stack gap={2}>
                      <Text role="label-m">⏱️ Momentum</Text>
                      <Text role="caption">Durations scale slightly</Text>
                      <Text role="caption" color="secondary">
                        30ms → 40ms for comfortable
                      </Text>
                    </Stack>
                  </Surface>

                  <Surface variant="primary" padding="container" radius="container">
                    <Stack gap={2}>
                      <Text role="label-m">🎨 Energy</Text>
                      <Text role="caption">Colors unchanged</Text>
                      <Text role="caption" color="secondary">
                        Same across all densities
                      </Text>
                    </Stack>
                  </Surface>

                  <Surface variant="primary" padding="container" radius="container">
                    <Stack gap={2}>
                      <Text role="label-m">◐ Depth</Text>
                      <Text role="caption">Shadows unchanged</Text>
                      <Text role="caption" color="secondary">
                        Spacing around changes
                      </Text>
                    </Stack>
                  </Surface>

                  <Surface variant="primary" padding="container" radius="container">
                    <Stack gap={2}>
                      <Text role="label-m">🔄 Iconography</Text>
                      <Text role="caption">Icon sizes scale</Text>
                      <Text role="caption" color="secondary">
                        With control sizing
                      </Text>
                    </Stack>
                  </Surface>
                </Grid>
              </DemoGroup>
            </DemoSection>
          </Section>

          <Divider spacing={2} />

          {/* ────────────────────────────────────────────────────────── */}
          {/* DEVELOPER NOTES */}
          {/* ────────────────────────────────────────────────────────── */}
          <Section
            title="Developer Implementation"
            description="How to consume density tokens in your components."
          >
            <DemoGroup>
              <CodeBlock>{`// All FLOW components automatically adapt to density via CSS custom properties:

// In component rendering:
<Stack gap="component">  // Uses sys.frame.gap.component (adapts to density)
  <Text role="body-m">Density-responsive</Text>
</Stack>

// Token mapping:
// compact:     --sys-frame-gap-component = 8px
// default:     --sys-frame-gap-component = 12px
// comfortable: --sys-frame-gap-component = 16px

// For custom styling, use semantic tokens:
style={{ 
  padding: "var(--sys-frame-padding-control)",  // Adapts to density
  fontSize: "var(--sys-voice-body-size)",       // Adapts to density
  gap: "var(--sys-frame-gap-component)",        // Adapts to density
}}

// To detect current density in JavaScript:
const density = document.documentElement.getAttribute("data-density");
// Returns: "compact" | "default" | "comfortable"
`}</CodeBlock>
            </DemoGroup>
          </Section>

          <Divider spacing={0} />
        </Stack>
      </Surface>
    </LayoutGrid>
  );
}

/**
 * Helper: Code component for inline code rendering
 */
function Code({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <code
      style={{
        background: "var(--sys-energy-surface-secondary)",
        padding: "var(--ref-frame-space-micro) var(--ref-frame-space-1)",
        borderRadius: "var(--ref-frame-radius-1)",
        fontFamily: "var(--ref-voice-family-mono)",
        fontSize: "0.85em",
        ...style,
      }}
    >
      {children}
    </code>
  );
}
