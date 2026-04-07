import { Code, CodeBlock, FlowChip, FlowTable, Grid, Inline, Stack, Surface, Text } from "../../lib";
import { PAGE_GAP, PageHeader, Section } from "../components/doc-primitives";

export function StateModelPage() {
  const states = [
    {
      name: "default",
      priority: 0,
      bg: "var(--sys-energy-surface-sunken)",
      text: "var(--sys-energy-text-secondary)",
      visual: "Base appearance. No overlay. Standard token values.",
      desc: "The resting state. All tokens at their default value. This is what the component looks like when nothing is happening.",
    },
    {
      name: "hover",
      priority: 1,
      bg: "var(--sys-state-hover-overlay)",
      text: "var(--sys-energy-text-primary)",
      visual:
        "Light overlay (4-8% opacity of ink color) on the interactive surface. Cursor changes to pointer.",
      desc: "Triggered by pointer entering the component's interactive boundary. Web-only — mobile has no hover. Duration: instant (no delay to appear).",
    },
    {
      name: "focus-visible",
      priority: 2,
      bg: "var(--ref-energy-blue-200)",
      text: "var(--sys-energy-text-primary)",
      visual:
        "Focus ring (2px solid, accent color, 2px offset). Interior unchanged from default or hover.",
      desc: "Triggered by keyboard navigation (Tab key). NOT shown on mouse/touch click. The ring is rendered by the FocusRing primitive and is visually consistent across all components.",
    },
    {
      name: "pressed",
      priority: 3,
      bg: "var(--ref-energy-blue-300)",
      text: "var(--sys-energy-text-inverse)",
      visual:
        "Darker overlay (10-16% opacity). Slight scale reduction (0.98) on some components. Duration: instant in, 100ms out.",
      desc: "Active/pressing state. On web: mousedown/pointerdown. On mobile: finger down on touch target. Short-lived — transitions to default or selected on release.",
    },
    {
      name: "selected",
      priority: 4,
      bg: "var(--ref-energy-blue-500)",
      text: "var(--sys-energy-text-inverse)",
      visual:
        "Tinted background (accent color at 8-12% opacity). Accent-colored indicator (checkmark, underline, dot). May coexist with hover.",
      desc: "The component is in its 'on' or 'chosen' state. Applies to toggleable components: Checkbox (checked), Radio (selected), Tab (active), ListItem (selected).",
    },
    {
      name: "dragging",
      priority: 5,
      bg: "var(--ref-energy-blue-100)",
      text: "var(--sys-energy-text-accent)",
      visual:
        "Elevated shadow (elevation 2+). Slight rotation or scale. Semi-transparent in original position. Accent-colored drop zone indicators.",
      desc: "The component is being dragged by the user. Origin position shows a ghost/placeholder. Drop targets highlight. Used in DataTable row reordering, Kanban boards, and sortable lists.",
    },
    {
      name: "readonly",
      priority: 6,
      bg: "var(--sys-energy-surface-secondary)",
      text: "var(--sys-energy-text-secondary)",
      visual:
        "Normal appearance but no editing affordance. No hover overlay. Cursor: default. Text is selectable but not editable.",
      desc: "The component displays a value but cannot be modified. Visually similar to default but with subtle cues removing edit affordance. Common in forms showing non-editable reference data.",
    },
    {
      name: "success",
      priority: 7,
      bg: "var(--sys-energy-status-success-subtle)",
      text: "var(--sys-energy-status-success)",
      visual:
        "Success-colored border or check icon. Success message text appears. Temporary — reverts to default after confirmation period.",
      desc: "Validation has passed or operation completed. Often temporary. Used for inline feedback (form field validated) or confirmation (Snackbar success).",
    },
    {
      name: "error",
      priority: 8,
      bg: "var(--sys-energy-status-error-subtle)",
      text: "var(--sys-energy-status-error)",
      visual:
        "Danger-colored border. Error message text appears. Icon may change to error indicator. Background may tint red at very low opacity.",
      desc: "Validation has failed. Applies primarily to form components: TextField, TextArea, Select, Checkbox, Radio. Always accompanied by an actionable error message (Tone foundation).",
    },
    {
      name: "loading",
      priority: 9,
      bg: "var(--sys-energy-status-warning-subtle)",
      text: "var(--sys-energy-status-warning)",
      visual:
        "Spinner or skeleton replaces content. Component maintains its dimensions. Interactive states suppressed (like disabled but with different visual).",
      desc: "The component is performing an async operation. Button shows spinner. TextField shows subtle animation. Functionally similar to disabled but communicates progress.",
    },
    {
      name: "disabled",
      priority: 10,
      bg: "var(--sys-energy-surface-tertiary)",
      text: "var(--sys-energy-state-disabled-text)",
      visual:
        "Reduced opacity (38-50%). No interactive states. Cursor: not-allowed (web). No StateLayer responses.",
      desc: "The component cannot be interacted with. All interactive states are suppressed. The component is visually muted but still visible in the layout.",
    },
  ];

  const _precedenceRules = [
    {
      rule: "disabled > *",
      explanation:
        "Disabled overrides everything. A disabled + error component shows disabled visuals, not error. The error state is preserved in data but not shown visually.",
    },
    {
      rule: "loading > error, success",
      explanation:
        "Loading suppresses error/success display. When loading completes, the error or success state becomes visible.",
    },
    {
      rule: "error > success",
      explanation:
        "If somehow both error and success are set, error takes visual precedence. This shouldn't happen in practice — it indicates a logic bug.",
    },
    {
      rule: "error > selected",
      explanation:
        "An error on a selected checkbox shows error styling. The selection state is preserved but the visual emphasis is on the error.",
    },
    {
      rule: "selected can coexist with hover, focus, pressed",
      explanation:
        "A selected tab can still show hover and focus states. These are additive — the selected indicator + hover overlay both render.",
    },
    {
      rule: "focus-visible is additive",
      explanation:
        "Focus ring renders on top of any other state (hover, pressed, selected, error). It does not replace them — it adds the ring as an overlay.",
    },
    {
      rule: "pressed > hover",
      explanation: "When pressing, the press overlay replaces the hover overlay. They don't stack.",
    },
    {
      rule: "readonly ≈ default (visual), readonly > hover (behavioral)",
      explanation:
        "Readonly looks like default but suppresses hover/press/focus interactive overlays. The value is visible and selectable but not editable.",
    },
    {
      rule: "dragging > hover, pressed",
      explanation:
        "While dragging, the component switches to drag visual. Hover and press overlays are suppressed on the dragged item. Drop targets show their own hover states.",
    },
  ];

  return (
    <Stack gap={PAGE_GAP}>
      <PageHeader chapter="Chapter 06" title="State Model">
        Flow defines a formal, system-wide state model that governs how every interactive component
        communicates its current condition to the user. States are not ad-hoc per-component
        decisions — they are a shared vocabulary with strict precedence rules and consistent visual
        expression.
      </PageHeader>

      {/* State Catalog */}
      <Section title="State Catalog">
        <Stack gap={3}>
          {states.map((s) => (
            <Surface key={s.name} padding="control">
              <Inline gap={4}>
                <Stack
                  gap={1}
                  align="center"
                  style={{
                    width: "var(--ref-frame-space-16)",
                    height: "var(--ref-frame-space-16)",
                    borderRadius: "var(--ref-frame-radius-2)",
                    background: s.bg,
                    flexShrink: 0,
                    justifyContent: "center",
                  }}
                >
                  <Text role="heading-l" as="span" style={{ color: s.text }}>
                    {s.priority}
                  </Text>
                  <Text role="overline" as="span" style={{ color: s.text }}>
                    PRI
                  </Text>
                </Stack>
                <Stack gap={4} style={{ flex: 1 }}>
                  <Inline gap={3}>
                    <Text role="heading-m">{s.name}</Text>
                    <FlowChip size="sm">{`Priority ${s.priority}`}</FlowChip>
                  </Inline>
                  <Text role="paragraph-s">{s.desc}</Text>
                  <Surface
                    variant="secondary"
                    padding={3}
                    border={false}
                    style={{ borderLeft: `3px solid ${s.text}` }}
                  >
                    <Stack gap={1}>
                      <Text role="caption">Visual Expression</Text>
                      <Text role="paragraph-s">{s.visual}</Text>
                    </Stack>
                  </Surface>
                </Stack>
              </Inline>
            </Surface>
          ))}
        </Stack>
      </Section>

      {/* Precedence Rules */}
      <Section
        title="Precedence Rules"
        description="When multiple states are active simultaneously (e.g., a selected checkbox with an error on hover), precedence determines which visual treatment wins. Higher priority number = takes precedence."
      >
        <CodeBlock>{`STATE PRECEDENCE (highest number wins visual treatment):

10 disabled        ████████████████████████████████████████
 9 loading         ███████████████████████████████████
 8 error           ██████████████████████████████
 7 success         █████████████████████████
 6 readonly        █████████████████████████     ← visual default, behavioral override
 5 dragging        ████████████████████          ← suppresses hover/press
 4 selected        ████████████████████
 3 pressed         ███████████████
 2 focus-visible   ██████████                    ← additive (ring overlays)
 1 hover           █████                         ← web only
 0 default         ·                             ← baseline`}</CodeBlock>

        {/* State Composition Matrix */}
        <Section
          title="State Composition Matrix"
          description="Formal resolution table for all common state combinations:"
        >
          <FlowTable
            columns={[
              {
                key: "combo",
                header: "Combination",
                render: (r: Record<string, unknown>) => <Code>{r.combo as string}</Code>,
              },
              { key: "result", header: "Visual Result" },
              { key: "rule", header: "Rule", cellRole: "caption" },
            ]}
            data={[
              {
                combo: "hover + selected",
                result: "Selected bg + hover overlay (additive)",
                rule: "Both render, hover layers on top",
              },
              {
                combo: "focus + selected",
                result: "Selected bg + focus ring (additive)",
                rule: "Ring renders outside, always visible",
              },
              {
                combo: "disabled + error",
                result: "Disabled opacity only",
                rule: "disabled > error; error preserved in data",
              },
              {
                combo: "disabled + selected",
                result: "Disabled opacity, selected indicator dimmed",
                rule: "disabled > selected visually",
              },
              {
                combo: "loading + error",
                result: "Loading spinner only",
                rule: "loading > error; error shows on completion",
              },
              {
                combo: "error + focus",
                result: "Error border + focus ring",
                rule: "Both render, ring outside error border",
              },
              {
                combo: "pressed + selected",
                result: "Selected bg + press overlay",
                rule: "Both render, press replaces hover",
              },
              {
                combo: "hover + error",
                result: "Error border + hover overlay",
                rule: "Error border persists, hover overlays",
              },
              {
                combo: "dragging + hover",
                result: "Drag visual only",
                rule: "dragging > hover on dragged item",
              },
              {
                combo: "readonly + hover",
                result: "Default appearance, no overlay",
                rule: "readonly suppresses interactive overlays",
              },
            ]}
            rowKey={(r) => r.combo}
          />
        </Section>

        {/* Visual Consistency Requirements */}
        <Section title="Visual Consistency Requirements">
          <Grid minItemWidth="280px" gap={4}>
            {[
              {
                title: "Hover must feel identical everywhere",
                desc: "Every hoverable surface uses the same overlay approach: sys.state.hover.overlay (typically 4-8% of ink color). Whether it's a Button, ListItem, Card, or Tab — the hover feedback uses the same token, producing identical visual density.",
              },
              {
                title: "Focus rings must be uniform",
                desc: "Every focusable element uses the FocusRing primitive with identical ring width, color, and offset. No component may customize its focus ring appearance — this ensures users always recognize focus regardless of component.",
              },
              {
                title: "Disabled must be visually consistent",
                desc: "Disabled state applies a single opacity reduction (sys.state.disabled.opacity = 0.42) to the entire component. No component redefines what 'disabled' looks like — the system handles it.",
              },
              {
                title: "Error must always include a message",
                desc: "Error state is never communicated through color alone. The Tone foundation requires an actionable error message. The visual treatment (red border, error icon) is supplementary to the text message.",
              },
            ].map((req) => (
              <Surface key={req.title} padding="control">
                <Stack gap={2}>
                  <Text role="label-l">{req.title}</Text>
                  <Text role="paragraph-s">{req.desc}</Text>
                </Stack>
              </Surface>
            ))}
          </Grid>
        </Section>

        {/* StateLayer Architecture */}
        <Section
          title="StateLayer Architecture"
          description="The StateLayer primitive is the mechanism that enforces this model. It sits inside every interactive surface and responds to interaction events by rendering overlays, adjusting opacity, or triggering visual changes — all through tokens."
        >
          <CodeBlock>{`// Conceptual StateLayer behavior
StateLayer receives:
  - Current interaction state (from pointer/keyboard events)
  - Component semantic state (selected, error, disabled, loading, readonly, dragging)
  - Token overrides (optional, for custom overlay colors)

StateLayer computes:
  1. Resolve precedence: which state wins?
  2. Determine overlay: what color/opacity for the winning state?
  3. Determine additions: focus-visible ring? (additive, always renders)
  4. Apply transitions: use Momentum tokens for smooth state changes
  5. Suppress interactions: if disabled/loading/readonly, prevent event propagation

StateLayer renders:
  - A semi-transparent overlay div/view (positioned absolute, inset: 0)
  - The overlay color/opacity changes per state
  - The focus ring is rendered outside the overlay (not clipped)
  - Dragging state elevates the surface and applies rotation/scale`}</CodeBlock>
        </Section>
      </Section>
    </Stack>
  );
}
