import { useParams } from "react-router";
import type React from "react";

import { CodeBlock, Divider, FlowCard, foundationColors, Grid, Inline, Stack, Surface, Text } from "../../lib";
import { VoiceExplorer } from "../components/voice-explorer";
import { EnergyExplorer } from "../components/energy-explorer";
import { DepthExplorer } from "../components/depth-explorer";
import { MomentumExplorer } from "../components/momentum-explorer";
import { MomentumDemoBlock } from "../components/motion-demo-section";
import { FrameExplorer } from "../components/frame-explorer";
import { DensityExplorer } from "../components/density-explorer";
import { IconographyExplorer } from "../components/iconography-explorer";
import { StateExplorer } from "../components/state-explorer";
import { ToneExplorer } from "../components/tone-explorer";
import { GrowthExplorer } from "../components/growth-explorer";
import {
  EvolutionGallery,
  INVENTORY_2D,
  INVENTORY_ISO,
  InventoryCard,
  SymbolGallery,
} from "../components/symbol-gallery";
import { PAGE_GAP, SECTION_GAP } from "../components/doc-primitives";
import { LayoutGrid } from "../components/layout-grid";

/** Local Section for foundation detail pages (used inside content JSX nodes) */
function Section({
  title,
  children,
  description,
}: {
  title: string;
  children: React.ReactNode;
  description?: string;
}) {
  return (
    <Stack gap={SECTION_GAP}>
      <Text role="display-l">{title}</Text>
      {description && (
        <Text role="paragraph-m" color="secondary">
          {description}
        </Text>
      )}
      {children}
    </Stack>
  );
}

const foundationDetails: Record<
  string,
  { title: string; subtitle: string; colorKey: string; content: React.ReactNode }
> = {
  energy: {
    title: "Energy",
    subtitle: "Color & Semantic Roles",
    colorKey: "energy",
    content: (
      <>
        {/* ─ 1. Overview ── */}
        <Section title="Overview">
          <Text role="paragraph-xl">
            When color appears in Flow, it always carries meaning. This discipline allows users to
            interpret the interface quickly and confidently.
          </Text>
          <Grid columns={4} gap={6} minItemWidth="180px">
            <Text role="paragraph-s">
              Energy translates Flow&apos;s design principles into visual meaning through color.
            </Text>
            <Text role="paragraph-s">
              Color in Flow is never decorative — it communicates intent, hierarchy, and feedback.
            </Text>
            <Text role="paragraph-s">
              Energy ensures users can immediately recognize: primary actions, system feedback,
              critical states, and surface hierarchy.
            </Text>
            <Text role="paragraph-s">
              By doing so, Energy makes Flow predictable and visually learnable.
            </Text>
          </Grid>
        </Section>

        <Divider spacing={0} />

        {/* ── 5. Visual Explanation ── */}
        <Section
          title="Visual Explanation"
          description="The following icons represent the five semantic role groups that Energy defines. Each role has a dedicated color assignment that remains constant across all components and contexts."
        >
          <Grid minItemWidth="140px" gap={4}>
            {[
              {
                icon: "⚡",
                role: "Action",
                desc: "Interactive elements — buttons, links, controls",
                accent: "action" as const,
                color: "accent" as const,
              },
              {
                icon: "✔",
                role: "Success",
                desc: "Positive outcomes — confirmations, completed states",
                accent: "success" as const,
                color: "success" as const,
              },
              {
                icon: "▲",
                role: "Warning",
                desc: "Caution states — limits, degraded conditions",
                accent: "warning" as const,
                color: "warning" as const,
              },
              {
                icon: "✕",
                role: "Error",
                desc: "Failures — validation errors, blocked actions",
                accent: "error" as const,
                color: "danger" as const,
              },
              {
                icon: "◻",
                role: "Surface",
                desc: "Backgrounds — content layering, visual depth",
                accent: "neutral" as const,
                color: "secondary" as const,
              },
            ].map((item) => (
              <FlowCard key={item.role} elevation={1} accent={item.accent} padding="md">
                <Stack gap={2}>
                  <Text role="display-s" color={item.color}>
                    {item.icon}
                  </Text>
                  <Text role="label-m">{item.role}</Text>
                  <Text role="caption">{item.desc}</Text>
                </Stack>
              </FlowCard>
            ))}
          </Grid>
        </Section>

        <EnergyExplorer />
      </>
    ),
  },
  voice: {
    title: "Voice",
    subtitle: "Typography System — Figma Edenred Aligned",
    colorKey: "voice",
    content: (
      <>
        <Section title="Purpose">
          <Text role="paragraph-m">
            Voice defines the complete typographic system: font families, weight distribution, size
            scale, line heights, letter spacing, and their composite semantic styles. PHASE A: Voice
            is now a clean 4×4 grid (Display/Heading/Label/Paragraph × xl/l/m/s) with no overlaps,
            fully aligned with the Figma Edenred design spec.
          </Text>
        </Section>
        <Section title="Architecture">
          <Text role="paragraph-m">
            The Voice layer follows the same ref → sys → comp chain as all Flow tokens. Ref defines
            the raw scales (families, sizes, weights, line-heights, letter-spacings). Sys composes
            them into 18 named styles grouped in 4 categories (Display, Heading, Label, Paragraph)
            plus 2 utility roles (Caption, Overline). All categories are density-responsive,
            shifting ±1 step with density changes.
          </Text>
          <CodeBlock>{`FONT FAMILIES (ref.voice.family):
  brand → Edenred, Ubuntu fallback — Display + Heading
  sans  → Ubuntu, system fallback  — Label + Paragraph
  mono  → JetBrains Mono           — Code + Token names

SIZE SCALE (ref.voice.size, 14 integer steps):
  1: 10px   2: 11px   3: 12px   4: 13px   5: 14px
  6: 16px   7: 18px   8: 20px   9: 24px  10: 32px
 11: 40px  12: 48px  13: 56px  14: 64px  15: 72px

COMPOSITE STYLES (sys.voice) — PHASE A 4×4 GRID:
  Display xl/l/m/s  (4)  brand/bold    64→24px  density-RESPONSIVE
  Heading xl/l/m/s  (4)  brand/bold    20→14px  density-RESPONSIVE
  Label xl/l/m/s    (4)  sans/medium   16→12px  density-RESPONSIVE
  Paragraph xl/l/m/s(4)  sans/regular  16→12px  density-RESPONSIVE
  Caption                sans/medium   11px     density-RESPONSIVE
  Overline               sans/bold     10px     density-RESPONSIVE

NO OVERLAPS:
  Display:   64, 48, 32, 24
  Heading:   20, 18, 16, 14
  Label:     16, 14, 13, 12
  Paragraph: 16, 14, 13, 12
  Caption: 11  |  Overline: 10`}</CodeBlock>
        </Section>
        <VoiceExplorer />
      </>
    ),
  },
  frame: {
    title: "Frame",
    subtitle: "Layout, Density & Rhythm",
    colorKey: "frame",
    content: (
      <>
        <Section title="Purpose">
          <Text role="paragraph-m">
            Frame governs all spatial relationships: spacing, sizing, grid, breakpoints, and density
            modes. It ensures that the rhythm of the interface is consistent — every gap, every
            padding, every margin derives from a shared scale.
          </Text>
        </Section>
        <Section title="Spacing Scale Design">
          <Text role="paragraph-m">
            The spacing scale uses a 4px base unit with the sequence: 0, 4, 8, 12, 16, 20, 24, 32,
            40, 48, 64, 80. This is not a strict mathematical progression — it is tuned for
            practical use. The jumps between 24→32→40→48 provide enough differentiation for
            section-level spacing without being wasteful.
          </Text>
          <Text role="paragraph-m">
            <strong>Why 4px base?</strong> 4px aligns with common device pixel ratios (2x, 3x) and
            ensures crisp rendering. 8px is too coarse for tight spacing needs (icon gaps, inline
            margins). 2px is too fine and creates too many options. 4px is the optimal balance.
          </Text>
        </Section>
        <Section title="Density Modes">
          <CodeBlock>{`DENSITY REMAPPING:
  Token                          Compact    Default    Comfortable
  ───────────────────────────── ────────── ────────── ───────────
  sys.frame.padding.control      8px        12px       16px
  sys.frame.gap.component        8px        12px       16px
  sys.frame.height.control       32px       40px       48px
  sys.voice.paragraph.m.size     14px       16px       18px
  sys.voice.label.xs.size        13px       14px       16px

Density is set at the layout/page level — not per-component.
A page declares its density, and all Flow components within respond.`}</CodeBlock>
        </Section>
        <FrameExplorer />
        <DensityExplorer />
      </>
    ),
  },
  depth: {
    title: "Depth",
    subtitle: "Surfaces & Elevation — Figma Edenred Aligned",
    colorKey: "depth",
    content: (
      <>
        <Section title="Purpose">
          <Text role="paragraph-m">
            Depth defines the spatial metaphor of the interface — how surfaces stack visually, how
            elevation communicates hierarchy, and how overlays create focus. Depth governs shadows,
            z-index, surface tinting, and backdrop effects. The shadow system has been recalibrated
            to align with Figma Edenred&apos;s Shadows frame.
          </Text>
        </Section>
        <Section title="Elevation Model">
          <Text role="paragraph-m">
            Flow uses 5 elevation levels (0-4), with Figma Edenred&apos;s 3 named levels (Light / Medium
            / High) mapped to levels 1-3 via semantic aliases. Shadows use a branded navy blue color
            (rgba(16, 26, 119, ...)) instead of generic black, with positive spread values (4-8px)
            at higher levels for richer depth perception.
          </Text>
          <CodeBlock>{`ELEVATION SCALE (5 numeric levels):
Level 0 — Canvas:     No shadow. Base plane. Page backgrounds.
Level 1 — Raised:     Subtle shadow. Cards, list items.    [Figma: Light]
Level 2 — Floating:   Medium shadow + 4px spread. Menus.   [Figma: Medium]
Level 3 — Overlay:    Prominent shadow + 6px spread.       [Figma: High]
Level 4 — Critical:   Maximum shadow + 8px spread. Toasts.

SEMANTIC ALIASES (sys.depth.elevation):
  light  → ref.depth.shadow.1   (Figma Light)
  medium → ref.depth.shadow.2   (Figma Medium)
  high   → ref.depth.shadow.3   (Figma High)

SHADOW COLOR:
  Light theme: rgba(16, 26, 119, ...) — branded navy blue (#101A77)
  Dark theme:  rgba(0, 0, 0, ...)     — pure black (navy invisible on dark)

Z-INDEX SCALE (non-overlapping ranges):
  0:      Base content
  1:      Elevated content regions
  100:    Dropdowns, popovers, tooltips
  200:    Sticky headers, floating toolbars
  1000:   Modal backdrops, overlays
  1001:   Dialogs, bottom sheets
  1100:   Toast notifications`}</CodeBlock>
        </Section>
        <DepthExplorer />
      </>
    ),
  },
  momentum: {
    title: "Momentum",
    subtitle: "Motion System",
    colorKey: "momentum",
    content: (
      <>
        <Section title="Purpose">
          <Text role="paragraph-m">
            Momentum governs all animation and transition in the system. It ensures motion is
            intentional, consistent, and respectful of user preferences. Every moving element uses
            Momentum tokens — no raw durations or easing values in component code.
          </Text>
        </Section>
        <Section title="Motion Categories">
          <CodeBlock>{`MICRO-INTERACTIONS (≤100ms):
  Hover state changes, button press feedback, toggle flips.
  Easing: sys.momentum.easing.standard
  Must feel instant. Users should not perceive delay.

TRANSITIONS (150-350ms):
  Page transitions, tab switching, expand/collapse, dropdown open.
  Easing: sys.momentum.easing.enter (appearing) or .exit (leaving)
  Should feel smooth but not slow. The sweet spot for perceived quality.

CHOREOGRAPHY (300-500ms):
  Staggered list reveals, complex multi-element animations, dashboard loads.
  Easing: sys.momentum.easing.standard with stagger delays
  Used sparingly. Maximum 500ms total duration — anything longer feels sluggish.

CONTINUOUS:
  Loading spinners, progress bars, shimmer effects.
  Duration: infinite loop with ref.momentum.duration.cycle (1400ms).
  Must be subtle. No attention-grabbing pulsing or bouncing.

REDUCED MOTION:
  When prefers-reduced-motion is active:
  - All transitions: duration → 0ms or → simple fade at 150ms
  - Continuous: static or very subtle opacity shift
  - No positional animation (slide, scale) — only opacity changes`}</CodeBlock>
        </Section>
        <MomentumExplorer />
        <MomentumDemoBlock />
      </>
    ),
  },
  state: {
    title: "State",
    subtitle: "Interaction States & Precedence",
    colorKey: "state",
    content: (
      <>
        <Section title="Purpose">
          <Text role="paragraph-m">
            State defines the formal interaction state model for all Flow components. It determines
            which states exist, how they visually manifest, how they resolve conflicts (precedence),
            and how they are communicated to assistive technologies. See the dedicated State Model
            chapter for full detail.
          </Text>
        </Section>
        <Section title="State-to-Visual Mapping">
          <Text role="paragraph-m">
            The State foundation does not define specific colors or shadows — it delegates to Energy
            (colors) and Depth (shadows). What State defines is the <em>pattern</em>: hover uses an
            overlay, focus uses a ring, error uses a border color change + text message. The
            specific token values come from Energy, but the structural pattern comes from State.
          </Text>
        </Section>
        <Section title="State Composition">
          <CodeBlock>{`States can coexist. The StateLayer resolves visual conflicts:

selected + hover:     Selected background + hover overlay (additive)
selected + focus:     Selected background + focus ring (additive)
selected + pressed:   Selected background + pressed overlay (overlay replaces hover)
error + focus:        Error border + focus ring (additive)
error + hover:        Error border + hover overlay (additive)
disabled + error:     Disabled opacity wins. Error visuals suppressed.
disabled + selected:  Disabled opacity wins. Selected indicator dimmed.
loading + hover:      Loading visual wins. Hover suppressed.`}</CodeBlock>
        </Section>

        <StateExplorer />
      </>
    ),
  },
  tone: {
    title: "Tone",
    subtitle: "Language & Communication",
    colorKey: "tone",
    content: (
      <>
        <Section title="Purpose">
          <Text role="paragraph-m">
            Tone defines the structural framework for how the product communicates with users
            through text. It governs error messages, empty states, confirmations, labels, and
            instructional text — not the exact wording, but the structure, format, and principles.
          </Text>
        </Section>
        <Section title="Communication Principles">
          <CodeBlock>{`1. ACTIONABLE OVER INFORMATIONAL
   ✗ "Error 422: Unprocessable Entity"
   ✓ "This email address is already in use. Try signing in instead."

2. BLAME THE SYSTEM, NOT THE USER
   ✗ "You entered an invalid amount"
   ✓ "The amount must be between $1 and $10,000"

3. PROGRESSIVE DISCLOSURE
   Short message first, details on demand.
   ✗ "Your transfer of $500 to John Doe (Account: *4521) failed because 
      the receiving bank rejected the transaction due to insufficient 
      account information. Error code: BANK_REJECT_INFO. Please contact..."
   ✓ "Transfer failed. The receiving bank couldn't process it."
      [Show details] → expanded explanation

4. CONSISTENT TENSE
   Confirmations: past tense ("Changes saved", "File uploaded")
   Actions: present imperative ("Save changes", "Upload file")
   Warnings: conditional future ("This will permanently delete...")
   
5. NO JARGON
   ✗ "Session token expired. Re-authenticate."
   ✓ "You've been signed out. Please sign in again."`}</CodeBlock>
        </Section>

        <ToneExplorer />
      </>
    ),
  },
  growth: {
    title: "Growth",
    subtitle: "Product Learning Signals",
    colorKey: "growth",
    content: (
      <>
        <Section title="Purpose">
          <Text role="paragraph-m">
            Growth defines the instrumentation framework that allows components to emit structured
            analytics events. This enables product teams to measure usage patterns, feature
            adoption, and user behavior without ad-hoc tracking code scattered through the
            application.
          </Text>
        </Section>
        <Section title="Event Schema">
          <CodeBlock>{`EVERY GROWTH EVENT CONTAINS:
{
  "event": "flow.component.interaction",  // taxonomy name
  "component": "Button",                   // Flow component name
  "variant": "primary",                    // component variant
  "context": "checkout.payment",           // page/feature context
  "action": "click",                       // interaction type
  "timestamp": "2026-02-25T10:30:00Z",
  "sessionId": "anonymous-hash",           // no PII
  "properties": {                          // component-specific
    "label": "Submit Payment",
    "loadingDuration": 1200
  }
}

EVENT TYPES:
  flow.component.impression     — Component entered viewport
  flow.component.interaction    — User interacted (click, toggle, type)
  flow.component.completion     — Form submitted, flow completed
  flow.component.abandonment    — Form abandoned, flow exited
  flow.component.error          — Error state triggered`}</CodeBlock>
        </Section>

        <GrowthExplorer />
      </>
    ),
  },
  symbol: {
    title: "Symbol",
    subtitle: "Visual Communication System",
    colorKey: "symbol",
    content: (
      <>
        {/* ── 1. System Vision ── */}
        <Section
          title="System Vision"
          description="Symbol is not about producing illustrations. It is about designing an illustration architecture."
        >
          <Text role="paragraph-xl">
            The Symbol foundation defines a parametric, modular visual system capable of generating
            characters, scenarios, environmental compositions, motion-ready assets, and narrative
            micro-scenes — all governed by FLOW tokens.
          </Text>
          <Grid columns={3} gap={6} minItemWidth="200px">
            <FlowCard elevation={1} padding="md">
              <Stack gap={3}>
                <Text role="label-l">Modular</Text>
                <Text role="paragraph-s">
                  Every visual element is a composable primitive — body, posture, accessory,
                  environment, object. Mix and match to generate infinite scenes from finite parts.
                </Text>
              </Stack>
            </FlowCard>
            <FlowCard elevation={1} padding="md">
              <Stack gap={3}>
                <Text role="label-l">Token-Driven</Text>
                <Text role="paragraph-s">
                  Palette, stroke weight, proportions, and sizing derive from FLOW tokens. Change
                  the tokens, the entire illustration library adapts — including dark mode variants.
                </Text>
              </Stack>
            </FlowCard>
            <FlowCard elevation={1} padding="md">
              <Stack gap={3}>
                <Text role="label-l">Automation-Ready</Text>
                <Text role="paragraph-s">
                  Parametric generation means the system can be driven by code. React SVG components
                  and Flutter vector widgets render illustrations at build time — no static assets.
                </Text>
              </Stack>
            </FlowCard>
          </Grid>
        </Section>

        <Divider spacing={0} />

        {/* ── 1b. Interactive Visual Language Slideshow ── */}
        <SymbolGallery />

        <Divider spacing={0} />

        {/* ── 2. Philosophical DNA ── */}
        <Section
          title="Philosophical DNA"
          description="Structural principles extracted from masters — not stylistic imitation. No retro pastiche."
        >
          <Grid columns={2} gap={6} minItemWidth="260px">
            <Surface variant="secondary" radius="card" className="flow-p-6">
              <Stack gap={3}>
                <Text role="heading-l">Saul Bass</Text>
                <Text role="label-m" color="accent">
                  Reduction · Graphic Tension · Bold Shapes · Asymmetry
                </Text>
                <Text role="paragraph-s">
                  Every illustration must earn its complexity. Default to fewer elements, not more.
                  Tension comes from deliberate imbalance — one dominant shape against smaller
                  counterpoints. Symmetry is avoided unless it communicates stability intentionally.
                </Text>
              </Stack>
            </Surface>
            <Surface variant="secondary" radius="card" className="flow-p-6">
              <Stack gap={3}>
                <Text role="heading-l">Kurt Vonnegut</Text>
                <Text role="label-m" color="accent">
                  Narrative Minimalism · Subtle Absurdity · Intellectual Humor
                </Text>
                <Text role="paragraph-s">
                  Illustrations tell stories with minimum information. A single misplaced object
                  creates curiosity. Humor is structural — a character slightly too large for the
                  environment, a mundane action treated with ceremony. Never slapstick, never
                  childish.
                </Text>
              </Stack>
            </Surface>
            <Surface variant="secondary" radius="card" className="flow-p-6">
              <Stack gap={3}>
                <Text role="heading-l">Jacques Tati</Text>
                <Text role="label-m" color="accent">
                  Environmental Storytelling · Physical Comedy · Timing
                </Text>
                <Text role="paragraph-s">
                  The environment is the character. Illustrations communicate through spatial
                  relationships — a person dwarfed by architecture, objects that suggest a narrative
                  without depicting it. The scene tells the story, not the facial expression.
                </Text>
              </Stack>
            </Surface>
            <Surface variant="secondary" radius="card" className="flow-p-6">
              <Stack gap={3}>
                <Text role="heading-l">Pink Panther</Text>
                <Text role="label-m" color="accent">
                  Fluid Elegance · Playful Movement · Negative Space
                </Text>
                <Text role="paragraph-s">
                  Motion is implied even in static frames. Poses suggest the moment before or after
                  an action. Negative space is compositional — not empty, but active. Elegance comes
                  from economy of line, not ornament.
                </Text>
              </Stack>
            </Surface>
            <InventoryCard
              title="2D"
              count={4}
              thumbnail="/symbols/2d-carreteras.jpeg"
              description="Vistas planas de infraestructura vial: carreteras, casetas, gasolineras y vehículos de flotilla."
              slides={INVENTORY_2D}
            />
            <InventoryCard
              title="Isometrics"
              count={23}
              thumbnail="/symbols/iso-biometrics.jpeg"
              description="Escenas isométricas con personaje y contexto: pagos, logística, electromovilidad y mantenimiento."
              slides={INVENTORY_ISO}
            />
          </Grid>
        </Section>

        <Divider spacing={0} />

        {/* ── 3. Modular Architecture ── */}
        <Section
          title="Modular Architecture"
          description="Compose infinite scenes from finite, well-defined primitives."
        >
          <CodeBlock>{`CHARACTER PRIMITIVES:
  Body     → Neutral humanoid, no facial features, proportional to fintech context
  Posture  → Standing, seated, walking, reaching, presenting (parametric angles)
  Accessory → Card, phone, laptop, wrench, cable — context-specific props
  Scale    → 1x (individual), 0.7x (background), 1.3x (hero emphasis)

ENVIRONMENT PRIMITIVES:
  Ground Plane  → Simple baseline, optional steps/platform for elevation
  Architecture  → Minimal structures: kiosk, charging station, desk, counter
  Context Objects → Vehicles, screens, payment terminals, tools
  Atmosphere    → Light planes (angled rectangles suggesting depth/space)

COMPOSITION RULES:
  ┌─────────────────────────────────────────────────┐
  │  Background layer  │  Light planes, atmosphere   │
  │  Mid-ground layer  │  Architecture, context obj   │
  │  Foreground layer   │  Character + accessory       │
  │  Ground plane      │  Baseline + optional steps   │
  └─────────────────────────────────────────────────┘

  • Character always occupies 40-60% of vertical space
  • Environment provides context without competing for attention
  • Maximum 3 layers of depth per composition
  • Light planes create visual interest without adding complexity`}</CodeBlock>
          <Text role="heading-m">Composition Evolution</Text>
          <Text role="paragraph-s" color="secondary">
            From isolated primitive to full environmental composition — the same character system
            scales through layered complexity.
          </Text>
          <EvolutionGallery />
        </Section>

        <Divider spacing={0} />

        {/* ── 4. Scale Model ── */}
        <Section
          title="Scale Model"
          description="How the system evolves from individual assets to automated pipelines."
        >
          <Grid columns={4} gap={4} minItemWidth="160px">
            <FlowCard elevation={1} accent="neutral" padding="md">
              <Stack gap={2}>
                <Text role="display-s">01</Text>
                <Text role="label-l">Spot</Text>
                <Text role="caption">64–128px</Text>
                <Divider spacing={0} />
                <Text role="paragraph-s">
                  Single concept. One character or object. Empty states, list items, feature
                  highlights. Geometric, 2-3 Energy colors.
                </Text>
              </Stack>
            </FlowCard>
            <FlowCard elevation={1} accent="neutral" padding="md">
              <Stack gap={2}>
                <Text role="display-s">02</Text>
                <Text role="label-l">Hero</Text>
                <Text role="caption">200–400px</Text>
                <Divider spacing={0} />
                <Text role="paragraph-s">
                  Scene-based. Character + environment. Onboarding, feature intros, error pages. 4-6
                  Energy colors, slight organic curves.
                </Text>
              </Stack>
            </FlowCard>
            <FlowCard elevation={1} accent="neutral" padding="md">
              <Stack gap={2}>
                <Text role="display-s">03</Text>
                <Text role="label-l">Narrative</Text>
                <Text role="caption">Multi-step</Text>
                <Divider spacing={0} />
                <Text role="paragraph-s">
                  Sequential compositions. Character continuity across steps. Onboarding flows,
                  walkthroughs, educational content.
                </Text>
              </Stack>
            </FlowCard>
            <FlowCard elevation={1} accent="neutral" padding="md">
              <Stack gap={2}>
                <Text role="display-s">04</Text>
                <Text role="label-l">Motion</Text>
                <Text role="caption">Animated</Text>
                <Divider spacing={0} />
                <Text role="paragraph-s">
                  Motion-ready assets. Parametric SVG with Momentum tokens. Micro-animations: card
                  tap, screen transition, walking cycle.
                </Text>
              </Stack>
            </FlowCard>
          </Grid>
          <Surface variant="secondary" radius="card" className="flow-p-6">
            <Stack gap={3}>
              <Text role="heading-m">Automation Pipeline</Text>
              <CodeBlock>{`INPUT:  Scene descriptor (JSON)
  { character: "standing", accessory: "card", environment: "kiosk", mood: "neutral" }

PROCESS:
  1. Select character primitive → apply posture
  2. Select environment primitive → compose layers
  3. Apply token overrides → palette, stroke, scale
  4. Render → React SVG component / Flutter widget / static export

OUTPUT: Platform-native vector illustration
  • React: <Symbol scene="kiosk-payment" size="hero" />
  • Flutter: FlowSymbol(scene: .kioskPayment, size: .hero)
  • Export: SVG / PNG @2x / Lottie (motion variant)`}</CodeBlock>
            </Stack>
          </Surface>
        </Section>

        <Divider spacing={0} />

        {/* ── 5. Token Integration ── */}
        <Section
          title="Integration with FLOW"
          description="Symbol is not a standalone art system — it is wired into the token architecture."
        >
          <CodeBlock>{`TOKEN BINDINGS:

  PALETTE (via Energy):
    sys.symbol.fill.primary    → sys.energy.text.primary      (character body)
    sys.symbol.fill.secondary  → sys.energy.surface.tertiary   (light planes)
    sys.symbol.stroke          → sys.energy.border.default      (outlines)
    sys.symbol.accent          → sys.energy.text.accent         (interactive elements)

  STROKE (via Iconography alignment):
    sys.symbol.stroke.weight   → 1.5px (matches icon stroke weight)
    sys.symbol.stroke.cap      → round
    sys.symbol.corner          → 2px radius on enclosed shapes

  SIZING (via Frame):
    sys.symbol.size.spot       → 64–128px  (inline contexts)
    sys.symbol.size.hero       → 200–400px (section headers)
    sys.symbol.size.narrative  → fluid     (full-width containers)

  THEME ADAPTATION:
    Light → Neutral gray fills, subtle shadow planes, dark stroke
    Dark  → Inverted fills, lighter stroke, adjusted plane opacity

  DENSITY RESPONSE:
    Compact     → Spot only, reduced padding
    Default     → Hero + Spot, standard spacing
    Comfortable → Full narrative, generous whitespace`}</CodeBlock>
        </Section>

        <Divider spacing={0} />

        {/* ── 6. Design Principles ── */}
        <Section
          title="Design Principles"
          description="Non-negotiable rules that keep Symbol premium and scalable."
        >
          <Grid columns={2} gap={6} minItemWidth="240px">
            <Stack gap={2}>
              <Text role="heading-s">Premium Fintech Positioning</Text>
              <Text role="paragraph-s">
                No childish proportions, no cartoon faces, no bright saturated fills. Characters are
                abstract humanoids — professional, gender-neutral, culturally agnostic. The style
                communicates trust and sophistication.
              </Text>
            </Stack>
            <Stack gap={2}>
              <Text role="heading-s">Vector Only</Text>
              <Text role="paragraph-s">
                No raster assets. Every illustration is a vector composition that scales cleanly
                from 64px spot to full-bleed hero. Export formats: SVG (web), vector drawable
                (Flutter), Lottie (motion).
              </Text>
            </Stack>
            <Stack gap={2}>
              <Text role="heading-s">Accessibility First</Text>
              <Text role="paragraph-s">
                Every illustration includes alt text describing the scene. Decorative illustrations
                are marked aria-hidden. Color is never the only differentiator — shapes and
                composition carry meaning independently.
              </Text>
            </Stack>
            <Stack gap={2}>
              <Text role="heading-s">Team Scalability</Text>
              <Text role="paragraph-s">
                New illustrators compose from existing primitives. They don&apos;t invent new body types
                or environment styles. The primitive library grows through reviewed proposals —
                never ad-hoc additions.
              </Text>
            </Stack>
          </Grid>
        </Section>
      </>
    ),
  },
  iconography: {
    title: "Iconography",
    subtitle: "Functional Glyphs",
    colorKey: "iconography",
    content: (
      <>
        <Section title="Purpose">
          <Text role="paragraph-m">
            Iconography defines the icon system — grid specifications, stroke rules, optical
            adjustments, semantic categorization, and the consumption API. Icons are functional
            glyphs (not artwork) that aid recognition, navigation, and action identification.
          </Text>
        </Section>
        <Section title="Icon Grid & Rules">
          <CodeBlock>{`GRID:
  Base: 24×24px with 2px padding (20×20 live area)
  Stroke weight: 1.5px (consistent for all icons)
  Corner radius: 1px on terminals, 2px on enclosed shapes
  Optical adjustments: circular shapes extend 1px beyond square shapes

SIZING SCALE:
  ref.icon.size.xs  → 12px (inline text indicators)
  ref.icon.size.sm  → 16px (compact controls, badges)
  ref.icon.size.md  → 20px (default, buttons, navigation)
  ref.icon.size.lg  → 24px (comfortable density, mobile)
  ref.icon.size.xl  → 32px (empty states, features)

SEMANTIC CATEGORIES (8 total — 5 generic UI + 3 domain-specific):
  Navigation:  arrows, chevrons, menu, home, back
  Action:      edit, delete, copy, share, download, upload
  Status:      check, warning, error, info, clock
  Object:      file, folder, user, settings, search, star
  Toggle:      visibility, lock, bookmark, heart, bell
  Finance:     wallet, money, receipt, card, transaction, strongbox  [Edenred]
  Currency:    dollar, euro, zloty, pound, percent, bitcoin          [Edenred]
  Chart:       chart-square, percentage, discount                    [Edenred]

STYLE VARIANTS:
  Outline:     Default. Stroke-based, 1.5px weight.
  Filled:      Solid fill, no stroke. Active/selected states.

ICON COLOR TOKENS (sys.energy.icon.*):
  default      → Primary icon color (neutral.900 / neutral.100)
  secondary    → Supporting context icons
  action       → Interactive/clickable icons (blue)
  inverse      → Icons on dark surfaces
  onAction     → Icons on action buttons
  disabled     → Disabled state
  success/warning/error/info → Status indicators

NAMING CONVENTION:
  {family}                     → wallet (base icon)
  {family}-{modifier}          → wallet-add (action variant)
  {prefix}-{family}            → empty-wallet (state prefix)
  {prefix}-{family}-{modifier} → empty-wallet-add (combined)

EVERY ICON MUST:
  ✓ Pass grid compliance check (alignment, stroke weight, padding)
  ✓ Have a semantic category assignment
  ✓ Have a unique, unambiguous meaning (no icon used for 2 concepts)
  ✓ Be accessible via the Icon primitive with proper labeling`}</CodeBlock>
        </Section>
        <IconographyExplorer />
      </>
    ),
  },
};

export function FoundationDetailPage() {
  const { id } = useParams();
  const detail = id ? foundationDetails[id] : null;

  if (!detail) {
    return (
      <Stack gap={3}>
        <Text role="display-s">Foundation Not Found</Text>
        <Text role="paragraph-m">The requested foundation does not exist.</Text>
      </Stack>
    );
  }

  return (
    <LayoutGrid>
      <LayoutGrid.Item span={12} className="component-detail-surface-wrapper">
        <Surface variant="secondary" radius="surface" className="component-detail-surface">
          <Stack gap={PAGE_GAP}>
            <Stack gap={4}>
              <Text role="overline">Foundation Deep Dive</Text>
              <Inline gap={4}>
                <Inline
                  gap={0}
                  justify="center"
                  className="flow-foundation-badge"
                  style={{
                    background: foundationColors[detail.colorKey],
                  }}
                >
                  {detail.title.charAt(0)}
                </Inline>
                <Stack gap={0}>
                  <Text role="display-xl">{detail.title}</Text>
                  <Text role="paragraph-l" color="secondary">
                    {detail.subtitle}
                  </Text>
                </Stack>
              </Inline>
            </Stack>

            <Divider spacing={0} />

            {detail.content}
          </Stack>
        </Surface>
      </LayoutGrid.Item>
    </LayoutGrid>
  );
}
