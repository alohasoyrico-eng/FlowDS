/**
 * FLOW — Primitives Specification Page
 * Route: /primitives
 *
 * Documents all L2 primitives with accurate APIs from real implementations,
 * live demos, token references, and foundation links.
 *
 * Wrapper follows Foundation detail page standard:
 *   LayoutGrid > LayoutGrid.Item span=12 > Surface "secondary" > Stack
 */

import {
  Divider,
  FlowChip,
  FlowTag,
  Grid,
  Inline,
  Stack,
  Surface,
  Text,
} from "@flow/design-system";
import { FlowIcon } from "@flow/primitives";
import {
  Callout,
  CodeBlock,
  DocList,
  PAGE_GAP,
  PageHeader,
  Section,
} from "../components/doc-primitives";
import { LayoutGrid } from "../components/layout-grid";

// ── Live demo wrappers ──

function DemoSurface() {
  return (
    <Inline gap={4} wrap>
      <Surface variant="primary" padding="container" radius="container" border>
        <Text variant="paragraph-s">primary</Text>
      </Surface>
      <Surface variant="secondary" padding="container" radius="container">
        <Text variant="paragraph-s">secondary</Text>
      </Surface>
      <Surface variant="tertiary" padding="container" radius="container">
        <Text variant="paragraph-s">tertiary</Text>
      </Surface>
      <Surface variant="sunken" padding="container" radius="container">
        <Text variant="paragraph-s">sunken</Text>
      </Surface>
      <Surface variant="inverse" padding="container" radius="container">
        <Text variant="paragraph-s" color="inverse">
          inverse
        </Text>
      </Surface>
    </Inline>
  );
}

function DemoText() {
  return (
    <Stack gap={2}>
      <Text variant="display-s">Display S</Text>
      <Text variant="heading-l">Heading L</Text>
      <Text variant="label-m">Label M</Text>
      <Text variant="paragraph-m">Paragraph M — body text for content.</Text>
      <Text variant="caption" color="secondary">
        Caption — secondary color
      </Text>
      <Text variant="overline">Overline</Text>
      <Text variant="code">code role</Text>
    </Stack>
  );
}

function DemoStack() {
  return (
    <Surface variant="tertiary" padding="container" radius="container">
      <Stack gap="component">
        <Surface variant="primary" padding="control" radius="control">
          <Text variant="paragraph-s">Item 1</Text>
        </Surface>
        <Surface variant="primary" padding="control" radius="control">
          <Text variant="paragraph-s">Item 2</Text>
        </Surface>
        <Surface variant="primary" padding="control" radius="control">
          <Text variant="paragraph-s">Item 3</Text>
        </Surface>
      </Stack>
    </Surface>
  );
}

function DemoInline() {
  return (
    <Inline gap={3} wrap>
      <FlowChip variant="filled" status="info">
        Tag A
      </FlowChip>
      <FlowChip variant="filled" status="success">
        Tag B
      </FlowChip>
      <FlowChip variant="filled" status="warning">
        Tag C
      </FlowChip>
      <FlowChip variant="tonal">Tag D</FlowChip>
    </Inline>
  );
}

function DemoGrid() {
  return (
    <Grid minItemWidth="120px" gap={3}>
      {[1, 2, 3, 4].map((n) => (
        <Surface key={n} variant="primary" padding="control" radius="control">
          <Text variant="paragraph-s" style={{ textAlign: "center" }}>
            Cell {n}
          </Text>
        </Surface>
      ))}
    </Grid>
  );
}

function DemoIcon() {
  return (
    <Inline gap={4} align="end">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <Stack key={s} gap={1} align="center">
          <FlowIcon name="star" size={s} />
          <Text variant="caption">{s}</Text>
        </Stack>
      ))}
    </Inline>
  );
}

function DemoDivider() {
  return (
    <Stack gap={3}>
      <Text variant="paragraph-s">Above divider</Text>
      <Divider spacing={0} />
      <Text variant="paragraph-s">Below divider</Text>
    </Stack>
  );
}

// ── Primitive data ──

const primitives = [
  {
    name: "Surface",
    desc: "Visual container with elevation, background, border, and radius from Depth and Energy tokens.",
    responsibilities: [
      "Renders a visual container consuming Depth, Energy, and Frame tokens.",
      "Manages surface layering: nested Surfaces increment elevation context automatically.",
      "Provides semantic variants (primary, secondary, tertiary, sunken, inverse) for surface hierarchy.",
    ],
    api: `<Surface
  elevation?: 0 | 1 | 2 | 3 | 4                         // default: 0
  variant?: "primary" | "secondary" | "tertiary"
         | "sunken" | "inverse"                           // default: "primary"
  radius?: RadiusToken | "control" | "container" | "surface"  // default: "container"
  border?: boolean                                         // default: true
  padding?: SpaceToken | "none" | "control" | "container" | "surface"  // default: "container"
  as?: ElementType
  className?: string
  style?: CSSProperties
  children: ReactNode
/>`,
    prevents:
      "Direct use of background-color, box-shadow, border-radius, or border on arbitrary divs.",
    tokens: [
      "sys.energy.surface.*",
      "sys.depth.elevation.*",
      "sys.frame.radius.*",
      "sys.frame.padding.*",
    ],
    foundations: ["Energy", "Depth", "Frame"],
    demo: DemoSurface,
  },
  {
    name: "Text",
    desc: "Typography primitive enforcing the Voice foundation's typographic scale.",
    responsibilities: [
      "Renders text with Voice tokens — size, weight, family, line height, letter spacing.",
      "Enforces the 4×4 typographic grid: Display, Heading, Label, Paragraph (xl/l/m/s) plus Caption, Overline, Code.",
      "Handles truncation and max-lines consistently.",
      "Maps roles to semantic HTML tags automatically (display→h1, heading→h2-h5, paragraph→p, etc.).",
    ],
    api: `<Text
  role?: "display-xl" | "display-l" | "display-m" | "display-s"
       | "heading-xl" | "heading-l" | "heading-m" | "heading-s"
       | "label-xl" | "label-l" | "label-m" | "label-s"
       | "paragraph-xl" | "paragraph-l" | "paragraph-m" | "paragraph-s"
       | "caption" | "overline" | "code"                  // default: "paragraph-m"
  color?: "primary" | "secondary" | "tertiary" | "inverse"
        | "accent" | "danger" | "success" | "warning"
        | "link" | "onAction" | "inherit"
  tone?: "neutral" | "brand" | "marketing" | "system"
  truncate?: boolean | number         // true = 1 line, number = max lines
  as?: ElementType                    // override semantic tag
  className?: string
  style?: CSSProperties
  children: ReactNode
/>`,
    prevents:
      "Raw font-size, font-weight, or font-family CSS. Text rendered without semantic markup.",
    tokens: [
      "sys.voice.display.*",
      "sys.voice.heading.*",
      "sys.voice.label.*",
      "sys.voice.paragraph.*",
      "sys.voice.caption",
      "sys.voice.overline",
    ],
    foundations: ["Voice", "Energy"],
    demo: DemoText,
  },
  {
    name: "Stack",
    desc: "Vertical layout primitive with consistent gap from Frame tokens.",
    responsibilities: [
      "Lays out children vertically with token-derived gap.",
      "Supports semantic gaps (component, subsection, section, page) that respond to density mode.",
      "Provides alignment and padding props.",
    ],
    api: `<Stack
  gap?: SpaceToken | "component" | "component-lg"
      | "subsection" | "section" | "page"                // default: 3
  align?: "start" | "center" | "end" | "stretch"        // default: "stretch"
  padding?: SpaceToken | "none" | "control" | "container" | "surface"
  as?: ElementType
  className?: string
  style?: CSSProperties
  children: ReactNode
/>`,
    prevents:
      "Arbitrary margin/padding on child elements for spacing. display:flex with hardcoded gap values.",
    tokens: ["sys.frame.gap.*", "sys.frame.padding.*"],
    foundations: ["Frame"],
    demo: DemoStack,
  },
  {
    name: "Inline",
    desc: "Horizontal layout primitive with consistent gap and alignment.",
    responsibilities: [
      "Lays out children horizontally with consistent gap.",
      "Supports wrapping, alignment (including baseline), and justify.",
    ],
    api: `<Inline
  gap?: SpaceToken | "component" | "component-lg"
      | "subsection" | "section" | "page"                // default: 3
  align?: "start" | "center" | "end" | "baseline" | "stretch"  // default: "center"
  justify?: "start" | "center" | "end" | "between"      // default: "start"
  wrap?: boolean                                          // default: false
  as?: ElementType
  className?: string
  style?: CSSProperties
  children: ReactNode
/>`,
    prevents:
      "Horizontal layouts with inconsistent spacing. Inline items without proper alignment.",
    tokens: ["sys.frame.gap.*"],
    foundations: ["Frame"],
    demo: DemoInline,
  },
  {
    name: "Grid",
    desc: "CSS Grid layout with token-derived columns, responsive auto-fit, and gap.",
    responsibilities: [
      "Provides fixed-column or auto-fit responsive grid layout.",
      "Supports minItemWidth for responsive auto-fit columns.",
      "Grid.Item sub-component for span/start control.",
    ],
    api: `<Grid
  columns?: number | string                               // default: 2
  minItemWidth?: string          // e.g. "200px" — overrides columns with auto-fit
  gap?: SpaceToken | SemanticGap                          // default: 4
  padding?: SpaceToken | SemanticPadding
  align?: "start" | "center" | "end" | "stretch"
  as?: ElementType
  children: ReactNode
/>

<Grid.Item
  span?: number         // columns to occupy
  start?: number        // grid-column-start (1-based)
  children: ReactNode
/>`,
    prevents: "Hardcoded grid-template-columns. Inconsistent responsive breakpoint handling.",
    tokens: ["sys.frame.grid.*", "sys.frame.gap.*"],
    foundations: ["Frame"],
    demo: DemoGrid,
  },
  {
    name: "LayoutGrid",
    desc: "Page-level 12-column responsive layout primitive following the Edenred column system.",
    responsibilities: [
      "Implements 12 columns on desktop (≥992px), 6 on tablet (≥576px), 1 on mobile (<576px).",
      "Enforces the full ref→sys→comp token chain for grid spacing.",
      "Supports density modes that adjust gutter and margin without changing column counts.",
      "LayoutGrid.Item sub-component with span (1-12 or 'full') and start props.",
    ],
    api: `<LayoutGrid
  density?: "compact" | "default" | "comfortable"
  fullBleed?: boolean              // disable max-width constraint
  className?: string
  style?: CSSProperties
  children: ReactNode
/>

<LayoutGrid.Item
  span?: 1-12 | "full"            // columns to occupy
  start?: number                   // grid-column-start (1-based)
  className?: string
  children: ReactNode
/>`,
    prevents:
      "Ad-hoc responsive grids with hardcoded media queries. Direct consumption of ref tokens skipping sys→comp chain.",
    tokens: [
      "comp.layoutGrid.lg.*",
      "comp.layoutGrid.md.*",
      "comp.layoutGrid.sm.*",
      "sys.frame.grid.*",
      "ref.frame.grid.*",
    ],
    foundations: ["Frame", "Depth"],
    demo: null,
  },
  {
    name: "FlowIcon",
    desc: "Icon primitive rendering from the Flow icon registry at token-defined sizes.",
    responsibilities: [
      "Renders icons at token-defined sizes (xs through xl).",
      "Enforces the icon sizing scale — no arbitrary sizes.",
      "Provides accessible SVG output with aria-label from icon registry.",
      "Shows missing-icon placeholder in development for unknown names.",
    ],
    api: `<FlowIcon
  name: string                     // from Flow icon registry
  size?: "xs" | "sm" | "md" | "lg" | "xl"               // default: "md"
  color?: string                   // CSS color value, default: "currentColor"
  className?: string
  style?: CSSProperties
/>`,
    prevents:
      "Arbitrary icon sizes. Icons without accessibility. Inline SVGs with hardcoded colors.",
    tokens: ["ref.icon.size.*", "sys.energy.icon.*"],
    foundations: ["Iconography", "Energy"],
    demo: DemoIcon,
  },
  {
    name: "ActionSurface",
    desc: "Interactive surface primitive handling pointer/keyboard events and state management.",
    responsibilities: [
      "Wraps content in an interactive button element with accessible state management.",
      "Manages disabled, loading, selected, and expanded states through resolveState().",
      "Handles ARIA attributes automatically (aria-disabled, aria-busy, aria-selected, aria-expanded).",
      "Composes with StateLayer for visual state feedback.",
    ],
    api: `<ActionSurface
  onPress?: () => void
  disabled?: boolean
  loading?: boolean
  selected?: boolean
  "aria-expanded"?: boolean
  "aria-controls"?: string
  "aria-label"?: string
  type?: "button" | "submit" | "reset"                   // default: "button"
  className?: string
  style?: CSSProperties
  children: ReactNode
/>`,
    prevents:
      "onClick handlers on unstyled divs. Custom hover/focus implementations. Missing keyboard accessibility.",
    tokens: ["sys.state.*", "sys.momentum.transition.*"],
    foundations: ["State", "Momentum"],
    demo: null,
  },
  {
    name: "Divider",
    desc: "Horizontal rule with token-derived spacing.",
    responsibilities: [
      "Renders a semantic <hr> separator with configurable spacing.",
      "Spacing is derived from the Frame space scale.",
    ],
    api: `<Divider
  spacing?: SpaceToken             // default: 10 (40px)
/>`,
    prevents: "Manual <hr> elements with hardcoded margins. Inconsistent divider styling.",
    tokens: ["ref.frame.space.*", "sys.energy.border.*"],
    foundations: ["Frame", "Energy"],
    demo: DemoDivider,
  },
  {
    name: "Overlay",
    desc: "Dimming backdrop for elevated content (dialogs, drawers, bottom sheets).",
    responsibilities: [
      "Renders a dimming backdrop behind elevated content.",
      "Handles click-outside-to-dismiss behavior via onDismiss callback.",
      "Can be non-dismissible for critical dialogs.",
    ],
    api: `<Overlay
  visible: boolean
  onDismiss?: () => void
  dismissible?: boolean            // default: true
  children?: ReactNode
/>`,
    prevents: "Inconsistent backdrop implementations. Missing click-outside dismiss handling.",
    tokens: ["sys.depth.overlay.*", "sys.momentum.enter.*", "sys.momentum.exit.*"],
    foundations: ["Depth", "Momentum"],
    demo: null,
  },
  {
    name: "FormField",
    desc: "Form layout primitive wrapping inputs with label, helper text, and error state.",
    responsibilities: [
      "Wraps form inputs with label, helper text, and error/success messages.",
      "Auto-generates unique IDs and connects label→input via htmlFor.",
      'Handles error state display with role="alert" for screen readers.',
      "Provides consistent vertical rhythm for form layouts.",
    ],
    api: `<FormField
  label?: string
  htmlFor?: string                 // auto-generated if omitted
  helperText?: string
  error?: string                   // error message (also sets error state)
  success?: boolean
  required?: boolean               // shows * indicator
  fullWidth?: boolean
  className?: string
  style?: CSSProperties
  children: ReactNode              // the actual input component
/>`,
    prevents:
      "Labels disconnected from inputs. Inconsistent error message placement. Missing required indicators.",
    tokens: ["sys.voice.label.*", "sys.voice.caption.*", "sys.energy.text.*", "sys.frame.gap.*"],
    foundations: ["Voice", "Energy", "Frame", "State"],
    demo: null,
  },
  {
    name: "MotionContainer",
    desc: "Enter/exit animation wrapper driven by Momentum tokens.",
    responsibilities: [
      "Wraps content with CSS enter/exit animations (collapse pattern).",
      "Manages mount/unmount lifecycle — renders during exit animation, unmounts after.",
      "Uses CSS animation classes: flow-collapse-enter / flow-collapse-exit.",
    ],
    api: `<MotionContainer
  visible: boolean                 // triggers enter/exit
  className?: string
  children: ReactNode
/>`,
    prevents: "Custom CSS transitions/keyframes. Inconsistent enter/exit patterns.",
    tokens: ["sys.momentum.duration.*", "sys.momentum.easing.*"],
    foundations: ["Momentum"],
    demo: null,
  },
  {
    name: "GrowthObserver",
    desc: "Declarative analytics instrumentation via IntersectionObserver.",
    responsibilities: [
      "Wraps components to emit structured analytics events without manual instrumentation.",
      "Tracks viewport visibility via IntersectionObserver (50% threshold).",
      "Fires onVisible callback exactly once per mount.",
      "Logs events in development, ready for production analytics pipeline.",
    ],
    api: `<GrowthObserver
  event: string                    // event name in taxonomy
  properties?: Record<string, unknown>
  onVisible?: () => void           // fired when element becomes visible
  children: ReactNode
/>`,
    prevents: "Ad-hoc analytics calls scattered through component code. Missing instrumentation.",
    tokens: [],
    foundations: ["Growth"],
    demo: null,
  },
  {
    name: "FocusRing",
    desc: "Visible focus indicator consuming sys.state.focusRing tokens.",
    responsibilities: [
      "Renders a visible focus ring around its child element.",
      "Defers to CSS :focus-visible by default; can be controlled programmatically via visible prop.",
      "Supports inset mode for components where outline offset doesn't work.",
      "Consumes sys.state.focusRing tokens for consistent width, offset, and color.",
    ],
    api: `<FocusRing
  color?: string                   // default: var(--sys-state-focus-ring-color)
  width?: string                   // default: var(--sys-state-focus-ring-width)
  offset?: string                  // default: var(--sys-state-focus-ring-offset)
  visible?: boolean                // undefined = CSS :focus-visible, true/false = manual
  inset?: boolean                  // default: false
  children: ReactNode
/>`,
    prevents: "Inconsistent or missing focus indicators. Focus rings visible on click.",
    tokens: [
      "sys.state.focus.ring.color",
      "sys.state.focus.ring.width",
      "sys.state.focus.ring.offset",
    ],
    foundations: ["State"],
    demo: null,
  },
  {
    name: "StateLayer",
    desc: "Semi-transparent overlay communicating interaction state (hover, pressed, selected).",
    responsibilities: [
      "Renders a semi-transparent overlay inside interactive surfaces for state feedback.",
      "Supports states: idle, hover, pressed, selected, dragging.",
      "Handles disabled state with reduced opacity.",
      "Clips overlay to parent's border-radius when clip=true.",
    ],
    api: `<StateLayer
  state?: "idle" | "hover" | "pressed" | "selected" | "dragging"  // default: "idle"
  color?: string                   // custom overlay color
  disabled?: boolean               // default: false
  clip?: boolean                   // default: true
  children: ReactNode
/>`,
    prevents: "Per-component hover/active state styling. Inconsistent state visuals.",
    tokens: [
      "sys.state.hover.overlay",
      "sys.state.pressed.overlay",
      "sys.state.selected.overlay",
      "sys.state.disabled.opacity",
    ],
    foundations: ["State", "Momentum"],
    demo: null,
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PAGE COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function PrimitivesPage() {
  return (
    <LayoutGrid>
      <LayoutGrid.Item span={12} className="component-detail-surface-wrapper">
        <Surface variant="secondary" radius="surface" className="component-detail-surface">
          <Stack gap={PAGE_GAP}>
            {/* ── Page Header ── */}
            <PageHeader chapter="Chapter 04" title="Primitives">
              Primitives are the structural building blocks of Flow. They sit between Foundations
              (tokens) and Components (L3) — consuming tokens, enforcing constraints, and providing
              the API surface that components compose. Every primitive is platform-agnostic in
              concept, with implementations in React and Flutter.
            </PageHeader>

            <Callout>
              <Text variant="paragraph-s" color="accent">
                <strong>Rule:</strong> Primitives consume tokens only. They never define raw visual
                values. They never contain business logic. They are the enforcement layer between
                foundations and components.
              </Text>
            </Callout>

            {/* ── Inventory ── */}
            <Section title="Inventory">
              <Text variant="paragraph-s" color="secondary">
                {primitives.length} primitives — covering layout, typography, interaction, motion,
                accessibility, and instrumentation.
              </Text>
              <Inline gap={2} wrap>
                {primitives.map((p) => (
                  <FlowTag key={p.name} variant="code">
                    {p.name}
                  </FlowTag>
                ))}
              </Inline>
            </Section>

            <Divider spacing={0} />

            {/* ── Primitive Details ── */}
            {primitives.map((p, idx) => (
              <Stack key={p.name} gap="component">
                {/* Header */}
                <Inline gap={3}>
                  <Inline
                    gap={0}
                    justify="center"
                    style={{
                      width: "var(--ref-frame-doc-badge-sm)",
                      height: "var(--ref-frame-doc-badge-sm)",
                      borderRadius: "var(--ref-frame-radius-2)",
                      background: "var(--sys-energy-surface-sunken)",
                    }}
                  >
                    <FlowIcon name="shapes" size="sm" color="var(--sys-energy-text-secondary)" />
                  </Inline>
                  <Stack gap={0}>
                    <Text variant="heading-l">{p.name}</Text>
                    <Text variant="paragraph-s" color="secondary">
                      {p.desc}
                    </Text>
                  </Stack>
                </Inline>

                {/* Live Demo */}
                {p.demo && (
                  <Surface variant="primary" padding="container" radius="container">
                    <Stack gap={2}>
                      <Text variant="overline" color="tertiary">
                        Live Demo
                      </Text>
                      <p.demo />
                    </Stack>
                  </Surface>
                )}

                {/* Responsibilities */}
                <Surface padding="control">
                  <Stack gap={2}>
                    <Text variant="overline">Responsibilities</Text>
                    <DocList items={p.responsibilities} />
                  </Stack>
                </Surface>

                {/* API Reference */}
                <Stack gap={2}>
                  <Text variant="overline">API Reference</Text>
                  <CodeBlock>{p.api}</CodeBlock>
                </Stack>

                <Grid minItemWidth="280px" gap={3}>
                  {/* Tokens Consumed */}
                  {p.tokens.length > 0 && (
                    <Surface padding="control">
                      <Stack gap={2}>
                        <Text variant="overline">Tokens Consumed</Text>
                        <Inline wrap gap={1}>
                          {p.tokens.map((t) => (
                            <code key={t} className="flow-inline-code-xs">
                              {t}
                            </code>
                          ))}
                        </Inline>
                      </Stack>
                    </Surface>
                  )}
                  {/* Foundations */}
                  <Surface padding="control">
                    <Stack gap={2}>
                      <Text variant="overline">Foundations</Text>
                      <Inline wrap gap={2}>
                        {p.foundations.map((f) => (
                          <FlowChip key={f} variant="filled" status="info">
                            {f}
                          </FlowChip>
                        ))}
                      </Inline>
                    </Stack>
                  </Surface>
                </Grid>

                {/* What it Prevents */}
                <Surface padding="control" className="flow-doc-accent flow-doc-accent--error">
                  <Stack gap={2}>
                    <Text variant="overline" color="danger">
                      What It Prevents
                    </Text>
                    <Text variant="paragraph-s">{p.prevents}</Text>
                  </Stack>
                </Surface>

                {idx < primitives.length - 1 && <Divider spacing={2} />}
              </Stack>
            ))}
          </Stack>
        </Surface>
      </LayoutGrid.Item>
    </LayoutGrid>
  );
}
