/**
 * FLOW Design System — Tone Integration Demo (R3.1)
 * ──────────────────────────────────────────────────────
 * Showcases the tone system: neutral, brand, marketing, system.
 * Demonstrates tone application across Text, Button, and Chip components.
 */
import { FlowButton, Inline, Stack, Surface, Text } from "../../lib";

export function ToneDemo() {
  return (
    <Surface padding="container" variant="primary" border={false} style={{ minHeight: "100vh" }}>
      <Stack gap="section">
        {/* Header */}
        <Stack gap="component">
          <Text role="display-xl" color="primary">
            Tone System — R3.1
          </Text>
          <Text role="paragraph-m" color="secondary">
            The tone system provides four brand voice variants (neutral, brand, marketing, system)
            that can be applied to text and interactive components. Each tone has distinct color and
            font-weight semantics that adapt to light/dark themes.
          </Text>
        </Stack>

        {/* Text Component Examples */}
        <Surface padding="container" radius="container">
          <Stack gap="component">
            <Text role="heading-m" color="primary">
              Text Component — Tone Variants
            </Text>
            <Stack gap={3}>
              <Inline gap={4} wrap>
                <Stack gap={2} style={{ minWidth: 180 }}>
                  <Text role="label-m" color="tertiary">
                    Neutral
                  </Text>
                  <Text role="paragraph-l" tone="neutral">
                    Clean, objective communication for body copy and standard UI text.
                  </Text>
                </Stack>

                <Stack gap={2} style={{ minWidth: 180 }}>
                  <Text role="label-m" color="tertiary">
                    Brand
                  </Text>
                  <Text role="paragraph-l" tone="brand">
                    Confident, authoritative voice for key messaging and primary CTAs.
                  </Text>
                </Stack>

                <Stack gap={2} style={{ minWidth: 180 }}>
                  <Text role="label-m" color="tertiary">
                    Marketing
                  </Text>
                  <Text role="paragraph-l" tone="marketing">
                    Energetic, promotional voice for campaigns and special offers.
                  </Text>
                </Stack>

                <Stack gap={2} style={{ minWidth: 180 }}>
                  <Text role="label-m" color="tertiary">
                    System
                  </Text>
                  <Text role="paragraph-l" tone="system">
                    Neutral, informative voice for technical details and metadata.
                  </Text>
                </Stack>
              </Inline>
            </Stack>
          </Stack>
        </Surface>

        {/* Button Examples */}
        <Surface padding="container" radius="container">
          <Stack gap="component">
            <Text role="heading-m" color="primary">
              Button — Tone Integration (LOW emphasis)
            </Text>
            <Text role="paragraph-s" color="secondary">
              Tone applies to LOW and MEDIUM emphasis buttons only. HIGH and DANGER preserve
              semantic colors.
            </Text>
            <Inline gap={3} wrap>
              <FlowButton variant="low" {...{"data-tone": "neutral"}}>
                Neutral Link
              </FlowButton>
              <FlowButton variant="low" {...{"data-tone": "brand"}}>
                Brand Link
              </FlowButton>
              <FlowButton variant="low" {...{"data-tone": "marketing"}}>
                Marketing Link
              </FlowButton>
              <FlowButton variant="low" {...{"data-tone": "system"}}>
                System Link
              </FlowButton>
            </Inline>
          </Stack>
        </Surface>

        {/* Button MEDIUM Examples */}
        <Surface padding="container" radius="container">
          <Stack gap="component">
            <Text role="heading-m" color="primary">
              Button — Tone Integration (MEDIUM emphasis)
            </Text>
            <Inline gap={3} wrap>
              <FlowButton variant="medium" {...{"data-tone": "neutral"}}>
                Neutral Outlined
              </FlowButton>
              <FlowButton variant="medium" {...{"data-tone": "brand"}}>
                Brand Outlined
              </FlowButton>
              <FlowButton variant="medium" {...{"data-tone": "marketing"}}>
                Marketing Outlined
              </FlowButton>
              <FlowButton variant="medium" {...{"data-tone": "system"}}>
                System Outlined
              </FlowButton>
            </Inline>
          </Stack>
        </Surface>

        {/* Chip Examples */}
        <Surface padding="container" radius="container">
          <Stack gap="component">
            <Text role="heading-m" color="primary">
              Chip — Tone Integration
            </Text>
            <Text role="paragraph-s" color="secondary">
              Tone applies to default, outlined, and tonal chip variants only. Semantic variants
              (accent, success, warning, danger) preserve their colors.
            </Text>
            <Stack gap={3}>
              <Inline gap={2} wrap>
                <div className="flow-chip" data-variant="default" data-tone="neutral">
                  <span>Neutral Chip</span>
                </div>
                <div className="flow-chip" data-variant="default" data-tone="brand">
                  <span>Brand Chip</span>
                </div>
                <div className="flow-chip" data-variant="default" data-tone="marketing">
                  <span>Marketing Chip</span>
                </div>
                <div className="flow-chip" data-variant="default" data-tone="system">
                  <span>System Chip</span>
                </div>
              </Inline>

              <Inline gap={2} wrap>
                <div className="flow-chip" data-variant="outlined" data-tone="neutral">
                  <span>Neutral Outlined</span>
                </div>
                <div className="flow-chip" data-variant="outlined" data-tone="brand">
                  <span>Brand Outlined</span>
                </div>
                <div className="flow-chip" data-variant="outlined" data-tone="marketing">
                  <span>Marketing Outlined</span>
                </div>
                <div className="flow-chip" data-variant="outlined" data-tone="system">
                  <span>System Outlined</span>
                </div>
              </Inline>
            </Stack>
          </Stack>
        </Surface>

        {/* Manual Override Classes */}
        <Surface padding="container" radius="container">
          <Stack gap="component">
            <Text role="heading-m" color="primary">
              Manual Override Classes
            </Text>
            <Text role="paragraph-s" color="secondary">
              Use <code className="flow-inline-code">.flow-tone-{"{name}"}</code> classes for direct
              tone application.
            </Text>
            <Stack gap={2}>
              <Text role="paragraph-m" className="flow-tone-neutral">
                .flow-tone-neutral — Clean, objective text
              </Text>
              <Text role="paragraph-m" className="flow-tone-brand">
                .flow-tone-brand — Confident, authoritative text
              </Text>
              <Text role="paragraph-m" className="flow-tone-marketing">
                .flow-tone-marketing — Energetic, promotional text
              </Text>
              <Text role="paragraph-m" className="flow-tone-system">
                .flow-tone-system — Neutral, informative text
              </Text>
            </Stack>
          </Stack>
        </Surface>

        {/* Theme Toggle Reminder */}
        <Surface padding="container" radius="container" variant="tertiary">
          <Stack gap={2}>
            <Text role="label-l" color="accent">
              💡 Theme Testing
            </Text>
            <Text role="paragraph-s" color="secondary">
              Toggle between light and dark themes to see tone adaptation. Each tone has distinct
              color remapping in dark mode (e.g., brand uses blue-300 in dark, blue-600 in light).
            </Text>
          </Stack>
        </Surface>
      </Stack>
    </Surface>
  );
}
