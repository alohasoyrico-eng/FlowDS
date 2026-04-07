/**
 * Density Showcase — Dedicated Page
 * ─────────────────────────────────────────────────
 * Interactive density switcher demonstrating how compact/default/comfortable
 * affects Frame, Voice, Momentum, and Depth foundations simultaneously.
 */

import { useState } from "react";

import {
  Code, FlowButton, FlowCard, FlowTag, FlowTextInput,
  Inline, Stack, Surface, Text, useFlowTheme,
} from "../../lib";
import { LayoutGrid } from "../components/layout-grid";

type Density = "compact" | "default" | "comfortable";

// ── Density Switcher segmented control ──
function DensitySwitcher({ value, onChange }: { value: Density; onChange: (d: Density) => void }) {
  const options: Density[] = ["compact", "default", "comfortable"];
  return (
    <div
      style={{
        display: "inline-flex",
        borderRadius: "var(--sys-frame-radius-full)",
        border: "1px solid var(--sys-energy-border-default)",
        background: "var(--sys-energy-surface-secondary)",
        padding: "var(--ref-frame-space-1)",
        gap: "var(--ref-frame-space-1)",
      }}
    >
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          style={{
            padding: "var(--ref-frame-space-2) var(--ref-frame-space-4)",
            borderRadius: "calc(var(--sys-frame-radius-full) - var(--ref-frame-space-1))",
            border: "none",
            background: value === opt ? "var(--sys-energy-surface-primary)" : "transparent",
            boxShadow: value === opt ? "var(--ref-depth-shadow-1)" : "none",
            color:
              value === opt ? "var(--sys-energy-text-primary)" : "var(--sys-energy-text-tertiary)",
            fontWeight:
              value === opt
                ? "var(--ref-voice-weight-semibold)"
                : "var(--ref-voice-weight-regular)",
            fontSize: "var(--ref-voice-size-3)",
            cursor: "pointer",
            transition: "all var(--sys-momentum-transition-fast)",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ── Token trace row (responsive) ──
function TokenTrace({
  token,
  compact,
  def,
  comfortable,
  activeDensity,
}: {
  token: string;
  compact: string;
  def: string;
  comfortable: string;
  activeDensity: Density;
}) {
  const { breakpoint } = useFlowTheme();
  const mobile = breakpoint.isMobile;

  if (mobile) {
    return (
      <div
        style={{
          padding: "var(--ref-frame-space-2) 0",
          borderBottom: "1px solid var(--sys-energy-border-default)",
          fontSize: "var(--ref-voice-size-3)",
          fontFamily: "var(--ref-voice-family-mono)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--ref-frame-space-1)",
        }}
      >
        <span style={{ color: "var(--sys-energy-text-accent)", wordBreak: "break-all" }}>
          {token}
        </span>
        <div style={{ display: "flex", gap: "var(--ref-frame-space-2)" }}>
          {(["compact", "default", "comfortable"] as Density[]).map((d) => {
            const val = d === "compact" ? compact : d === "comfortable" ? comfortable : def;
            const isActive = d === activeDensity;
            const label = d === "compact" ? "C" : d === "comfortable" ? "+" : "D";
            return (
              <span
                key={d}
                style={{
                  flex: 1,
                  textAlign: "center",
                  color: isActive
                    ? "var(--sys-energy-text-primary)"
                    : "var(--sys-energy-text-tertiary)",
                  fontWeight: isActive
                    ? "var(--ref-voice-weight-bold)"
                    : "var(--ref-voice-weight-regular)",
                  background: isActive ? "var(--sys-energy-status-info-subtle)" : "transparent",
                  borderRadius: "var(--ref-frame-radius-1)",
                  padding: "var(--ref-frame-space-1)",
                  transition: "all var(--sys-momentum-transition-fast)",
                }}
              >
                {label}:{val}
              </span>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 80px 80px 80px",
        gap: "var(--ref-frame-space-2)",
        alignItems: "center",
        padding: "var(--ref-frame-space-1) 0",
        borderBottom: "1px solid var(--sys-energy-border-default)",
        fontSize: "var(--ref-voice-size-3)",
        fontFamily: "var(--ref-voice-family-mono)",
      }}
    >
      <span style={{ color: "var(--sys-energy-text-accent)" }}>{token}</span>
      {(["compact", "default", "comfortable"] as Density[]).map((d) => {
        const val = d === "compact" ? compact : d === "comfortable" ? comfortable : def;
        const isActive = d === activeDensity;
        return (
          <span
            key={d}
            style={{
              textAlign: "center",
              color: isActive
                ? "var(--sys-energy-text-primary)"
                : "var(--sys-energy-text-tertiary)",
              fontWeight: isActive
                ? "var(--ref-voice-weight-bold)"
                : "var(--ref-voice-weight-regular)",
              background: isActive ? "var(--sys-energy-status-info-subtle)" : "transparent",
              borderRadius: "var(--ref-frame-radius-1)",
              padding: "var(--ref-frame-space-1)",
              transition: "all var(--sys-momentum-transition-fast)",
            }}
          >
            {val}
          </span>
        );
      })}
    </div>
  );
}

// ── Token trace header ──
function TokenTraceHeader() {
  const { breakpoint } = useFlowTheme();
  if (breakpoint.isMobile) {
    return (
      <div
        style={{
          display: "flex",
          gap: "var(--ref-frame-space-2)",
          padding: "var(--ref-frame-space-2) 0",
          borderBottom: "2px solid var(--sys-energy-border-strong)",
          fontSize: "var(--ref-voice-size-3)",
          fontWeight: "var(--ref-voice-weight-semibold)",
          fontFamily: "var(--ref-voice-family-mono)",
          color: "var(--sys-energy-text-tertiary)",
        }}
      >
        <span style={{ flex: 1 }}>Token</span>
        <span>C / D / +</span>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 80px 80px 80px",
        gap: "var(--ref-frame-space-2)",
        padding: "var(--ref-frame-space-2) 0",
        borderBottom: "2px solid var(--sys-energy-border-strong)",
        fontSize: "var(--ref-voice-size-3)",
        fontWeight: "var(--ref-voice-weight-semibold)",
        fontFamily: "var(--ref-voice-family-mono)",
        color: "var(--sys-energy-text-tertiary)",
      }}
    >
      <span>Token</span>
      <span style={{ textAlign: "center" }}>⊘ Compact</span>
      <span style={{ textAlign: "center" }}>◎ Default</span>
      <span style={{ textAlign: "center" }}>◉ Comfort</span>
    </div>
  );
}

// ── DemoGroup wrapper ──
function DemoGroup({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-component)" }}
    >
      {children}
    </div>
  );
}

export function DensityShowcasePage() {
  const [density, setDensity] = useState<Density>("default");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--sys-frame-gap-page)",
        minWidth: 0,
      }}
    >
      {/* ── Page Header ── */}
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--sys-frame-gap-component)",
          minWidth: 0,
        }}
      >
        <Text role="overline">Interactive Foundation Showcase</Text>
        <Text role="display-xl">Density — Interactive Switcher</Text>
        <Text style={{ maxWidth: "var(--sys-frame-content-prose)" }}>
          Density is not a zoom — it&apos;s a coordinated adaptation of <strong>4 foundations</strong>{" "}
          (Frame, Voice, Momentum, Depth indirectly). Toggle below and watch control heights,
          typography, spacing, and transition speeds morph simultaneously through the{" "}
          <Code>data-density</Code> attribute cascade: <Code>[data-density] → sys → comp</Code>.
        </Text>
      </header>

      {/* Switcher control (outside the density zone) */}
      <Inline gap="component" align="center">
        <DensitySwitcher value={density} onChange={setDensity} />
        <Text role="caption" color="tertiary">
          Active: <Code>{density}</Code>
        </Text>
      </Inline>

      {/* ── Density-affected zone ── */}
      <div
        data-density={density !== "default" ? density : undefined}
        data-density-animate=""
        style={{
          borderRadius: "var(--ref-frame-radius-4)",
          border: "1px solid var(--sys-energy-border-default)",
          background: "var(--sys-energy-surface-primary)",
          overflow: "hidden",
        }}
      >
        {/* Demo UI: a realistic mini-form + card + chips */}
        <div style={{ padding: "var(--sys-frame-padding-surface)" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--sys-frame-gap-subsection)",
            }}
          >
            {/* Section 1: Buttons — all 3 sizes */}
            <DemoGroup>
              <Text role="overline">Frame — Control Heights</Text>
              <Text role="paragraph-s">
                Button heights (sm/md/lg/xl) shift: compact 40/50/60/74 → default 48/60/72/88 →
                comfortable 58/72/86/106.
              </Text>
              <Inline gap={3} wrap>
                <FlowButton variant="high" size="sm">
                  Small
                </FlowButton>
                <FlowButton variant="high" size="md">
                  Medium
                </FlowButton>
                <FlowButton variant="high" size="lg">
                  Large
                </FlowButton>
                <FlowButton variant="high" size="xl">
                  Extra Large
                </FlowButton>
              </Inline>
            </DemoGroup>

            {/* Section 2: TextInput — all 4 sizes */}
            <DemoGroup>
              <Text role="overline">Frame + Voice — Input Fields (4 sizes)</Text>
              <Text role="paragraph-s">
                Input field padding, height, and label/value font scale simultaneously. Each size
                has 3 distinct density expressions.
              </Text>
              <Stack gap="component">
                <FlowTextInput
                  label="Small"
                  placeholder="sm"
                  hint="Frame + voice scale together"
                  size="sm"
                />
                <FlowTextInput
                  label="Medium"
                  placeholder="md"
                  hint="Frame + voice scale together"
                  size="md"
                />
                <FlowTextInput
                  label="Large"
                  placeholder="lg"
                  hint="Frame + voice scale together"
                  size="lg"
                />
                <FlowTextInput
                  label="Extra Large"
                  placeholder="xl"
                  hint="Frame + voice scale together"
                  size="xl"
                />
              </Stack>
            </DemoGroup>

            {/* Section 3: Typography only */}
            <DemoGroup>
              <Text role="overline">Voice — Typography Scale</Text>
              <Text role="paragraph-s">
                Body text and captions shrink in compact (14→13px), expand in comfortable (16→18px).
              </Text>
              <Stack gap={1}>
                <Text role="paragraph-m">Body text at current density</Text>
                <Text role="paragraph-s">Paragraph-s adapts to density</Text>
                <Text role="caption" color="tertiary">
                  Caption also scales
                </Text>
              </Stack>
            </DemoGroup>

            {/* Section 4: Grid gutter + margin */}
            <DemoGroup>
              <Text role="overline">Frame — Grid Gutter & Margins</Text>
              <Text role="paragraph-s">
                LayoutGrid&apos;s gutter and margins scale with density. Try resizing the window —
                responsive breakpoints remain, but spacing scales.
              </Text>
              <LayoutGrid density={density}>
                {["Energy", "Voice", "Frame"].map((name) => (
                  <LayoutGrid.Item key={name} span={4}>
                    <FlowCard elevation={1} padding="md">
                      <Stack gap={2}>
                        <Text role="label-m">{name}</Text>
                        <Text role="paragraph-s">
                          Card content adapts to the active density mode.
                        </Text>
                        <FlowButton variant="medium" size="sm">
                          Open
                        </FlowButton>
                      </Stack>
                    </FlowCard>
                  </LayoutGrid.Item>
                ))}
              </LayoutGrid>
            </DemoGroup>

            {/* Section 5: Tags — presentational density */}
            <DemoGroup>
              <Text role="overline">Comp — FlowTag (Presentational Density)</Text>
              <Text role="paragraph-s">
                Tags are padding-based (no control-height). Font scales 10px → 11px → 13px;
                horizontal padding 8px → 12px → 16px; vertical padding 4px → 4px → 8px.
              </Text>
              <Inline gap={2} wrap>
                <FlowTag>neutral</FlowTag>
                <FlowTag status="info">info</FlowTag>
                <FlowTag status="success">success</FlowTag>
                <FlowTag status="warning">warning</FlowTag>
                <FlowTag status="error">error</FlowTag>
                <FlowTag variant="code">code</FlowTag>
                <FlowTag variant="code" status="error">
                  code+error
                </FlowTag>
              </Inline>
            </DemoGroup>

            {/* Section 6: Momentum callout */}
            <div
              style={{
                background: "var(--sys-energy-status-info-subtle)",
                border: "1px solid var(--sys-energy-status-info-muted)",
                borderRadius: "var(--ref-frame-radius-3)",
                padding: "var(--ref-frame-space-4)",
              }}
            >
              <Stack gap={1}>
                <Text role="label-m" color="accent">
                  Momentum — Transition Speed
                </Text>
                <Text role="paragraph-s">
                  Hover any button above. In compact mode, transitions feel snappier (100ms). In
                  comfortable, they&apos;re more expressive (200ms default, 500ms slow). The same UI
                  interaction feels qualitatively different per density.
                </Text>
              </Stack>
            </div>
          </div>
        </div>
      </div>

      {/* ── Token Trace Table ── */}
      <Surface padding={0} style={{ padding: "var(--sys-frame-padding-surface)" }}>
        <Stack gap={3}>
          <Text role="overline">Token Trace — Live Values</Text>
          <Text role="paragraph-s" color="secondary">
            Highlighted column shows the active density&apos;s resolved value. All values come from the{" "}
            <Code>ref→sys→comp</Code> chain.
          </Text>
          {/* Header */}
          <TokenTraceHeader />
          <TokenTrace
            token="sys.frame.height.control.sm"
            compact="40px"
            def="48px"
            comfortable="58px"
            activeDensity={density}
          />
          <TokenTrace
            token="sys.frame.height.control.md"
            compact="50px"
            def="60px"
            comfortable="72px"
            activeDensity={density}
          />
          <TokenTrace
            token="sys.frame.height.control.lg"
            compact="60px"
            def="72px"
            comfortable="86px"
            activeDensity={density}
          />
          <TokenTrace
            token="sys.frame.height.control.xl"
            compact="74px"
            def="88px"
            comfortable="106px"
            activeDensity={density}
          />
          <TokenTrace
            token="sys.voice.paragraph.m.size"
            compact="14px"
            def="16px"
            comfortable="18px"
            activeDensity={density}
          />
          <TokenTrace
            token="sys.voice.paragraph.s.size"
            compact="13px"
            def="14px"
            comfortable="16px"
            activeDensity={density}
          />
          <TokenTrace
            token="sys.voice.label.xs.size"
            compact="13px"
            def="14px"
            comfortable="16px"
            activeDensity={density}
          />
          <TokenTrace
            token="sys.voice.caption.size"
            compact="12px"
            def="13px"
            comfortable="14px"
            activeDensity={density}
          />
          <TokenTrace
            token="sys.frame.padding.control"
            compact="16px"
            def="20px"
            comfortable="24px"
            activeDensity={density}
          />
          <TokenTrace
            token="sys.frame.padding.container"
            compact="20px"
            def="24px"
            comfortable="28px"
            activeDensity={density}
          />
          <TokenTrace
            token="sys.frame.padding.surface"
            compact="40px"
            def="48px"
            comfortable="64px"
            activeDensity={density}
          />
          <TokenTrace
            token="sys.frame.gap.component"
            compact="16px"
            def="20px"
            comfortable="24px"
            activeDensity={density}
          />
          <TokenTrace
            token="sys.frame.gap.subsection"
            compact="28px"
            def="36px"
            comfortable="44px"
            activeDensity={density}
          />
          <TokenTrace
            token="sys.frame.gap.section"
            compact="48px"
            def="64px"
            comfortable="80px"
            activeDensity={density}
          />
          <TokenTrace
            token="sys.frame.gap.page"
            compact="64px"
            def="80px"
            comfortable="96px"
            activeDensity={density}
          />
          <TokenTrace
            token="sys.frame.grid.lg.gutter"
            compact="24px"
            def="32px"
            comfortable="40px"
            activeDensity={density}
          />
          <TokenTrace
            token="sys.frame.grid.lg.margin"
            compact="40px"
            def="48px"
            comfortable="64px"
            activeDensity={density}
          />
          <TokenTrace
            token="sys.momentum.duration.default"
            compact="100ms"
            def="200ms"
            comfortable="200ms"
            activeDensity={density}
          />
          <TokenTrace
            token="sys.momentum.duration.slow"
            compact="200ms"
            def="350ms"
            comfortable="500ms"
            activeDensity={density}
          />
          <TokenTrace
            token="comp.tag.font"
            compact="10px"
            def="11px"
            comfortable="13px"
            activeDensity={density}
          />
          <TokenTrace
            token="comp.tag.padding-x"
            compact="8px"
            def="12px"
            comfortable="16px"
            activeDensity={density}
          />
          <TokenTrace
            token="comp.tag.padding-y"
            compact="4px"
            def="4px"
            comfortable="8px"
            activeDensity={density}
          />
        </Stack>
      </Surface>
    </div>
  );
}
