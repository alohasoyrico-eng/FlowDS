/**
 * FLOW — Token Architecture Page
 * Route: /tokens
 *
 * Explains the three-tier token architecture (ref→sys→comp),
 * naming convention, theming, density, and token resolution flow.
 *
 * Does NOT duplicate exhaustive token value listings — those live in
 * Foundation explorer pages (Energy, Frame, Voice, Momentum, Depth).
 *
 * Wrapper follows Foundation detail page standard:
 *   LayoutGrid > LayoutGrid.Item span=12 > Surface "secondary" > Stack
 */
import { Code, Divider, Grid, Inline, Stack, Surface, Text } from "../../lib";
import {
  Callout,
  CodeBlock,
  DocList,
  PAGE_GAP,
  PageHeader,
  Section,
} from "../components/doc-primitives";
import { LayoutGrid } from "../components/layout-grid";

export function TokensPage() {
  return (
    <LayoutGrid>
      <LayoutGrid.Item span={12} className="component-detail-surface-wrapper">
        <Surface variant="secondary" radius="surface" className="component-detail-surface">
          <Stack gap={PAGE_GAP}>
            {/* ── Page Header ── */}
            <PageHeader chapter="Chapter 03" title="Token Architecture">
              Flow&apos;s token system follows a strict three-tier architecture:{" "}
              <strong>ref → sys → comp</strong>. Reference tokens define raw scales. System tokens
              assign semantic meaning. Component tokens bind values to specific component
              properties. No hardcoded values exist outside ref tokens.
            </PageHeader>

            {/* ═══ Three-Tier Architecture ═══ */}
            <Section title="Three-Tier Token Chain">
              <Text role="paragraph-m" color="secondary">
                Every visual value in Flow flows through three layers. This indirection is what
                makes theming, density modes, and per-component overrides possible without touching
                component code.
              </Text>
              <Grid minItemWidth="220px" gap={4}>
                {[
                  {
                    tier: "ref",
                    label: "Reference",
                    color: "var(--ref-energy-neutral-150)",
                    textColor: "var(--sys-energy-text-primary)",
                    desc: "Raw, unaliased values. The only place absolute values (hex colors, pixel sizes, easing curves) may exist. Ref tokens are the atomic source of truth.",
                    example:
                      "ref.energy.blue.500 = #0060DF\nref.frame.space.4 = 16px\nref.momentum.duration.normal = 200ms",
                    foundations: "Energy, Frame, Voice, Momentum, Depth, Iconography",
                  },
                  {
                    tier: "sys",
                    label: "System",
                    color: "var(--ref-energy-blue-200)",
                    textColor: "var(--sys-energy-text-primary)",
                    desc: "Semantic aliases. Map ref tokens to functional roles. Themes work by remapping sys tokens to different ref tokens. Sys tokens are the API that components consume.",
                    example:
                      "sys.energy.text.primary → ref.energy.neutral.800\nsys.energy.surface.primary → ref.energy.neutral.0\nsys.frame.gap.component → ref.frame.space.3",
                    foundations: "Theme-aware, density-aware",
                  },
                  {
                    tier: "comp",
                    label: "Component",
                    color: "var(--ref-energy-blue-500)",
                    textColor: "var(--sys-energy-text-inverse)",
                    desc: "Component-scoped bindings. Each component declares which sys tokens it consumes, enabling per-component overrides without breaking the system chain.",
                    example:
                      "comp.button.bg.primary → sys.energy.action.primary\ncomp.button.padding.x → sys.frame.padding.control\ncomp.button.radius → sys.frame.radius.control",
                    foundations: "Component-specific",
                  },
                ].map((tier) => (
                  <Stack
                    key={tier.tier}
                    gap={3}
                    style={{
                      background: tier.color,
                      color: tier.textColor,
                      borderRadius: "var(--ref-frame-radius-3)",
                      padding: "var(--ref-frame-space-6)",
                    }}
                  >
                    <Stack gap={1}>
                      <Text
                        role="overline"
                        color="inherit"
                        style={{ opacity: "var(--ref-state-opacity-subtle)" }}
                      >
                        {tier.tier}
                      </Text>
                      <Text role="heading-l" color="inherit">
                        {tier.label}
                      </Text>
                    </Stack>
                    <Text
                      role="paragraph-s"
                      color="inherit"
                      style={{ opacity: "var(--ref-state-opacity-soft)" }}
                    >
                      {tier.desc}
                    </Text>
                    <pre className="flow-code-block-pre" style={{ color: "inherit" }}>
                      {tier.example}
                    </pre>
                    <Text
                      role="caption"
                      color="inherit"
                      style={{ opacity: "var(--ref-state-opacity-subtle)" }}
                    >
                      {tier.foundations}
                    </Text>
                  </Stack>
                ))}
              </Grid>
            </Section>

            {/* ═══ Naming Convention ═══ */}
            <Section title="Naming Convention">
              <CodeBlock>{`{tier}.{foundation}.{category}.{variant}.{modifier}

Examples:
  ref.energy.neutral.500          → tier.foundation.category.step
  sys.energy.text.primary         → tier.foundation.role.variant
  sys.frame.padding.control       → tier.foundation.category.context
  comp.button.bg.primary          → tier.component.property.variant
  comp.textfield.border.error     → tier.component.property.state`}</CodeBlock>
              <Callout>
                <Text role="paragraph-s" color="accent">
                  Names are semantic, never visual. <Code>sys.energy.text.danger</Code> — not{" "}
                  <Code>sys.color.red</Code>. This ensures themes can remap values without semantic
                  confusion.
                </Text>
              </Callout>
            </Section>

            {/* ═══ Token Resolution Flow ═══ */}
            <Section
              title="Token Resolution Flow"
              description="End-to-end example: how a button's background color resolves through all three layers."
            >
              <Grid minItemWidth="200px" gap={3}>
                <Surface variant="primary" padding="container" radius="container">
                  <Stack gap={2}>
                    <Text role="overline" color="tertiary">
                      1. Component Layer
                    </Text>
                    <CodeBlock>{`comp.button.bg.primary
  ↓ resolves to`}</CodeBlock>
                  </Stack>
                </Surface>
                <Surface variant="primary" padding="container" radius="container">
                  <Stack gap={2}>
                    <Text role="overline" color="tertiary">
                      2. System Layer
                    </Text>
                    <CodeBlock>{`sys.energy.action.primary
  ↓ resolves to`}</CodeBlock>
                  </Stack>
                </Surface>
                <Surface variant="primary" padding="container" radius="container">
                  <Stack gap={2}>
                    <Text role="overline" color="tertiary">
                      3. Reference Layer
                    </Text>
                    <CodeBlock>{`ref.energy.red.500
  = #ED1C24`}</CodeBlock>
                  </Stack>
                </Surface>
              </Grid>
              <Text role="paragraph-s" color="secondary">
                In dark theme, only the sys→ref mapping changes. The component layer and all
                consumer code remain untouched.
              </Text>
            </Section>

            <Divider spacing={0} />

            {/* ═══ Theming ═══ */}
            <Section title="Theming via Token Remapping">
              <Text role="paragraph-m" color="secondary">
                Themes work by remapping sys tokens to different ref tokens. Component code never
                changes. The ref layer is fixed — the sys layer is the switching point.
              </Text>
              <CodeBlock>{`// Light theme (default)
sys.energy.surface.primary   → ref.energy.neutral.0     (#FFFFFF)
sys.energy.text.primary      → ref.energy.neutral.800   (#1E293B)
sys.energy.border.default    → ref.energy.neutral.200   (#E2E8F0)

// Dark theme (remapped)
sys.energy.surface.primary   → ref.energy.neutral.950   (#080E1B)
sys.energy.text.primary      → ref.energy.neutral.100   (#F1F5F9)
sys.energy.border.default    → ref.energy.neutral.700   (#334155)

// High-contrast theme (accessibility)
sys.energy.surface.primary   → ref.energy.neutral.0     (#FFFFFF)
sys.energy.text.primary      → ref.energy.neutral.900   (#0F172A)
sys.energy.border.default    → ref.energy.neutral.800   (#1E293B)`}</CodeBlock>
            </Section>

            {/* ═══ Density ═══ */}
            <Section
              title="Density System"
              description="Density is a Frame foundation concern that works through token remapping — similar to themes but for spacing. Three density modes are defined:"
            >
              <CodeBlock>{`// Compact (data-dense desktop: tables, dashboards)
sys.frame.padding.control    → ref.frame.space.2   (8px)
sys.frame.gap.component      → ref.frame.space.2   (8px)
sys.voice.body.size          → ref.voice.size.sm    (13px)

// Default (standard desktop/tablet)
sys.frame.padding.control    → ref.frame.space.3   (12px)
sys.frame.gap.component      → ref.frame.space.3   (12px)
sys.voice.body.size          → ref.voice.size.base  (14.5px)

// Comfortable (mobile, touch-first)
sys.frame.padding.control    → ref.frame.space.4   (16px)
sys.frame.gap.component      → ref.frame.space.4   (16px)
sys.voice.body.size          → ref.voice.size.md    (16px)`}</CodeBlock>
              <Callout intent="info" title="Density affects more than spacing">
                <Text role="paragraph-s">
                  Voice sizes, icon sizes, and control heights all shift with density. This is why
                  components must consume sys tokens — consuming ref tokens directly would bypass
                  density adaptation.
                </Text>
              </Callout>
            </Section>

            <Divider spacing={0} />

            {/* ═══ Foundation Token Domains ═══ */}
            <Section
              title="Foundation Token Domains"
              description="Each foundation owns a specific domain of tokens. Explore the full value scales in the Foundation detail pages."
            >
              <Grid minItemWidth="240px" gap={4}>
                {[
                  {
                    name: "Energy",
                    icon: "⚡",
                    desc: "Color — surfaces, text, borders, status, action",
                    tokens: "ref.energy.*, sys.energy.*",
                    link: "/foundations/energy",
                  },
                  {
                    name: "Frame",
                    icon: "▦",
                    desc: "Space, sizing, grid, breakpoints, density",
                    tokens: "ref.frame.*, sys.frame.*",
                    link: "/foundations/frame",
                  },
                  {
                    name: "Voice",
                    icon: "Aa",
                    desc: "Typography — families, sizes, weights, line heights",
                    tokens: "ref.voice.*, sys.voice.*",
                    link: "/foundations/voice",
                  },
                  {
                    name: "Momentum",
                    icon: "→",
                    desc: "Motion — durations, easing curves, enter/exit",
                    tokens: "ref.momentum.*, sys.momentum.*",
                    link: "/foundations/momentum",
                  },
                  {
                    name: "Depth",
                    icon: "◐",
                    desc: "Elevation — shadows, z-index, overlays",
                    tokens: "ref.depth.*, sys.depth.*",
                    link: "/foundations/depth",
                  },
                  {
                    name: "State",
                    icon: "◎",
                    desc: "Interaction — hover, focus, pressed, disabled overlays",
                    tokens: "sys.state.*",
                    link: "/foundations/state",
                  },
                  {
                    name: "Iconography",
                    icon: "★",
                    desc: "Icon sizing scale and stroke conventions",
                    tokens: "ref.icon.*, sys.icon.*",
                    link: "/foundations/iconography",
                  },
                  {
                    name: "Tone",
                    icon: "♫",
                    desc: "Communication voice — neutral, brand, marketing, system",
                    tokens: "sys.tone.*",
                    link: "/foundations/tone",
                  },
                  {
                    name: "Growth",
                    icon: "↗",
                    desc: "Analytics instrumentation schema",
                    tokens: "sys.growth.*",
                    link: "/foundations/growth",
                  },
                ].map((f) => (
                  <Surface key={f.name} variant="primary" padding="container" radius="container">
                    <Stack gap={2}>
                      <Inline gap={2} align="center">
                        <Text role="display-s" style={{ width: "1.5em", textAlign: "center" }}>
                          {f.icon}
                        </Text>
                        <Text role="label-l">{f.name}</Text>
                      </Inline>
                      <Text role="paragraph-s" color="secondary">
                        {f.desc}
                      </Text>
                      <code className="flow-inline-code-xs">{f.tokens}</code>
                    </Stack>
                  </Surface>
                ))}
              </Grid>
            </Section>

            <Divider spacing={0} />

            {/* ═══ Key Token Examples ═══ */}
            <Section
              title="Key Token Examples"
              description="Representative samples from each foundation. See Foundation detail pages for complete scales."
            >
              <Grid minItemWidth="300px" gap={4}>
                {/* Color */}
                <Surface variant="primary" padding="container" radius="container">
                  <Stack gap={3}>
                    <Text role="label-l">Color (Energy)</Text>
                    <Stack gap={2}>
                      {[
                        { token: "sys.energy.surface.primary", desc: "Main content background" },
                        { token: "sys.energy.text.primary", desc: "Headings, primary content" },
                        {
                          token: "sys.energy.text.secondary",
                          desc: "Descriptions, supporting text",
                        },
                        { token: "sys.energy.border.default", desc: "Card borders, dividers" },
                        { token: "sys.energy.action.primary", desc: "Primary button background" },
                        { token: "sys.energy.status.error", desc: "Error states" },
                      ].map((t) => (
                        <Inline key={t.token} gap={3}>
                          <code className="flow-inline-code-xs" style={{ minWidth: "220px" }}>
                            {t.token}
                          </code>
                          <Text role="caption" color="secondary">
                            {t.desc}
                          </Text>
                        </Inline>
                      ))}
                    </Stack>
                  </Stack>
                </Surface>

                {/* Spacing */}
                <Surface variant="primary" padding="container" radius="container">
                  <Stack gap={3}>
                    <Text role="label-l">Spacing (Frame)</Text>
                    <Stack gap={2}>
                      {[
                        { token: "ref.frame.space.1", value: "4px", desc: "Tight inline gaps" },
                        {
                          token: "ref.frame.space.2",
                          value: "8px",
                          desc: "Icon padding, inline gap",
                        },
                        { token: "ref.frame.space.4", value: "16px", desc: "Component padding" },
                        {
                          token: "ref.frame.space.6",
                          value: "24px",
                          desc: "Card padding, section gaps",
                        },
                        { token: "ref.frame.space.10", value: "40px", desc: "Page-level spacing" },
                      ].map((t) => (
                        <Inline key={t.token} gap={3}>
                          <code className="flow-inline-code-xs" style={{ minWidth: "160px" }}>
                            {t.token}
                          </code>
                          <Text role="caption" style={{ minWidth: "36px" }}>
                            {t.value}
                          </Text>
                          <Text role="caption" color="secondary">
                            {t.desc}
                          </Text>
                        </Inline>
                      ))}
                    </Stack>
                  </Stack>
                </Surface>

                {/* Typography */}
                <Surface variant="primary" padding="container" radius="container">
                  <Stack gap={3}>
                    <Text role="label-l">Typography (Voice)</Text>
                    <Stack gap={2}>
                      {[
                        { token: "sys.voice.display-xl", desc: "64px — hero headlines" },
                        { token: "sys.voice.heading-l", desc: "18px — section headings" },
                        { token: "sys.voice.paragraph-m", desc: "14px — body text" },
                        { token: "sys.voice.caption", desc: "11px — timestamps, metadata" },
                        { token: "sys.voice.overline", desc: "10px — section labels" },
                      ].map((t) => (
                        <Inline key={t.token} gap={3}>
                          <code className="flow-inline-code-xs" style={{ minWidth: "190px" }}>
                            {t.token}
                          </code>
                          <Text role="caption" color="secondary">
                            {t.desc}
                          </Text>
                        </Inline>
                      ))}
                    </Stack>
                  </Stack>
                </Surface>

                {/* Motion */}
                <Surface variant="primary" padding="container" radius="container">
                  <Stack gap={3}>
                    <Text role="label-l">Motion (Momentum)</Text>
                    <Stack gap={2}>
                      {[
                        {
                          token: "ref.momentum.duration.fast",
                          value: "100ms",
                          desc: "Hover, press",
                        },
                        {
                          token: "ref.momentum.duration.normal",
                          value: "200ms",
                          desc: "Standard transitions",
                        },
                        {
                          token: "ref.momentum.duration.slow",
                          value: "350ms",
                          desc: "Enter/exit, layout shifts",
                        },
                        {
                          token: "ref.momentum.easing.standard",
                          value: "cubic-bezier(0.2,0,0,1)",
                          desc: "Default easing",
                        },
                      ].map((t) => (
                        <Inline key={t.token} gap={3}>
                          <code className="flow-inline-code-xs" style={{ minWidth: "220px" }}>
                            {t.token}
                          </code>
                          <Text role="caption" color="secondary">
                            {t.desc}
                          </Text>
                        </Inline>
                      ))}
                    </Stack>
                  </Stack>
                </Surface>
              </Grid>
            </Section>

            <Divider spacing={0} />

            {/* ═══ Working with Tokens ═══ */}
            <Section title="Working with Tokens">
              <Grid minItemWidth="280px" gap={4}>
                <Surface
                  padding="control"
                  className="flow-doc-accent flow-doc-accent--success"
                >
                  <Stack gap={2}>
                    <Text role="label-l">When to use ref tokens</Text>
                    <DocList
                      items={[
                        "Defining new sys token mappings",
                        "One-off values that don't need theming (e.g., decorative illustrations)",
                        "Building foundation-level utilities (spacing scale, radius scale)",
                      ]}
                    />
                  </Stack>
                </Surface>
                <Surface
                  padding="control"
                  className="flow-doc-accent"
                >
                  <Stack gap={2}>
                    <Text role="label-l">When to use sys tokens</Text>
                    <DocList
                      items={[
                        "Component implementations (default — most common case)",
                        "Layout and page-level styles",
                        "Any value that should respond to theme or density changes",
                      ]}
                    />
                  </Stack>
                </Surface>
                <Surface
                  padding="control"
                  className="flow-doc-accent flow-doc-accent--warning"
                >
                  <Stack gap={2}>
                    <Text role="label-l">When to use comp tokens</Text>
                    <DocList
                      items={[
                        "Overriding a specific component's value without affecting the system",
                        "Creating component variants with different token bindings",
                        "Debugging — trace exactly which value a component property resolves to",
                      ]}
                    />
                  </Stack>
                </Surface>
              </Grid>
            </Section>

            {/* ═══ Trade-offs ═══ */}
            <Section title="Trade-offs in Token Granularity">
              <Grid minItemWidth="280px" gap={4}>
                <Surface
                  padding="control"
                  className="flow-doc-accent flow-doc-accent--success"
                >
                  <Stack gap={2}>
                    <Text role="label-l">Benefits of Fine Granularity</Text>
                    <DocList
                      items={[
                        "Per-component token overrides enable precise customization",
                        "Density modes work without component code changes",
                        "Theme switching is surgical and predictable",
                        "Debugging is traceable: every value has a named source",
                      ]}
                    />
                  </Stack>
                </Surface>
                <Surface
                  padding="control"
                  className="flow-doc-accent flow-doc-accent--warning"
                >
                  <Stack gap={2}>
                    <Text role="label-l">Costs of Fine Granularity</Text>
                    <DocList
                      items={[
                        "Token count grows with every new component",
                        "Naming becomes complex — requires documentation discipline",
                        "Onboarding new engineers takes longer",
                        'Risk of "token soup" if governance is weak',
                      ]}
                    />
                  </Stack>
                </Surface>
              </Grid>
            </Section>

            {/* ═══ Platform Export ═══ */}
            <Section
              title="Platform-Agnostic Export"
              description="All tokens are defined in a canonical JSON format and compiled to platform-specific outputs:"
            >
              <CodeBlock>{`// Canonical source (JSON)
{
  "ref": {
    "energy": {
      "neutral": {
        "500": { "value": "#64748B", "type": "color" }
      }
    }
  }
}

// → CSS Custom Properties
:root {
  --ref-energy-neutral-500: #64748B;
  --sys-energy-text-secondary: var(--ref-energy-neutral-500);
}

// → TypeScript Constants
export const ref = {
  energy: { neutral: { 500: '#64748B' } }
} as const;

// → Dart Theme Extension
class FlowTokens extends ThemeExtension<FlowTokens> {
  final Color refEnergyNeutral500;
  const FlowTokens({
    this.refEnergyNeutral500 = const Color(0xFF64748B),
  });
}`}</CodeBlock>
            </Section>
          </Stack>
        </Surface>
      </LayoutGrid.Item>
    </LayoutGrid>
  );
}
