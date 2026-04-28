/**
 * DensityExplorer — Interactive density mode explorer
 * ─────────────────────────────────────────────────────
 * Demonstrates how compact/default/comfortable density modes
 * coordinate Frame, Voice, Momentum, and Comp-level tokens
 * through the data-density CSS cascade.
 *
 * Embedded within the Frame foundation detail page.
 */
import { useState } from "react";

import { Code, Divider, Inline, Stack, Surface, Text } from "@flow/primitives";
import { FlowButton } from "@flow/components";
import { FlowTextInput } from "@flow/components";
import { FlowCard, FlowTag } from "@flow/components";
import { FlowCheckbox, FlowSwitch } from "@flow/components";
import { LayoutGrid } from "./layout-grid";

// ── Types ──
type Density = "compact" | "default" | "comfortable";
type Tab = "live" | "tokens" | "mechanism";

// ── Token data ──
interface TokenRow {
  token: string;
  compact: string;
  defaultVal: string;
  comfortable: string;
  foundation: "Frame" | "Voice" | "Momentum" | "Comp";
}

const TOKEN_ROWS: TokenRow[] = [
  // Frame — heights
  {
    token: "sys.frame.height.control.sm",
    compact: "44px",
    defaultVal: "48px",
    comfortable: "58px",
    foundation: "Frame",
  },
  {
    token: "sys.frame.height.control.md",
    compact: "50px",
    defaultVal: "60px",
    comfortable: "72px",
    foundation: "Frame",
  },
  {
    token: "sys.frame.height.control.lg",
    compact: "60px",
    defaultVal: "72px",
    comfortable: "86px",
    foundation: "Frame",
  },
  {
    token: "sys.frame.height.control.xl",
    compact: "74px",
    defaultVal: "88px",
    comfortable: "106px",
    foundation: "Frame",
  },
  // Frame — spacing
  {
    token: "sys.frame.padding.control",
    compact: "16px",
    defaultVal: "20px",
    comfortable: "24px",
    foundation: "Frame",
  },
  {
    token: "sys.frame.padding.container",
    compact: "20px",
    defaultVal: "24px",
    comfortable: "28px",
    foundation: "Frame",
  },
  {
    token: "sys.frame.padding.surface",
    compact: "40px",
    defaultVal: "48px",
    comfortable: "64px",
    foundation: "Frame",
  },
  {
    token: "sys.frame.gap.component",
    compact: "16px",
    defaultVal: "20px",
    comfortable: "24px",
    foundation: "Frame",
  },
  {
    token: "sys.frame.gap.subsection",
    compact: "28px",
    defaultVal: "36px",
    comfortable: "44px",
    foundation: "Frame",
  },
  {
    token: "sys.frame.gap.section",
    compact: "48px",
    defaultVal: "64px",
    comfortable: "80px",
    foundation: "Frame",
  },
  {
    token: "sys.frame.radius.control",
    compact: "8px",
    defaultVal: "12px",
    comfortable: "16px",
    foundation: "Frame",
  },
  // Frame — grid
  {
    token: "sys.frame.grid.lg.gutter",
    compact: "24px",
    defaultVal: "32px",
    comfortable: "40px",
    foundation: "Frame",
  },
  {
    token: "sys.frame.grid.lg.margin",
    compact: "40px",
    defaultVal: "48px",
    comfortable: "64px",
    foundation: "Frame",
  },
  // Voice
  {
    token: "sys.voice.paragraph.m.size",
    compact: "14px",
    defaultVal: "16px",
    comfortable: "18px",
    foundation: "Voice",
  },
  {
    token: "sys.voice.paragraph.s.size",
    compact: "13px",
    defaultVal: "14px",
    comfortable: "16px",
    foundation: "Voice",
  },
  {
    token: "sys.voice.label.xs.size",
    compact: "13px",
    defaultVal: "14px",
    comfortable: "16px",
    foundation: "Voice",
  },
  {
    token: "sys.voice.caption.size",
    compact: "12px",
    defaultVal: "13px",
    comfortable: "14px",
    foundation: "Voice",
  },
  {
    token: "sys.voice.heading.xl.size",
    compact: "18px",
    defaultVal: "20px",
    comfortable: "24px",
    foundation: "Voice",
  },
  // Momentum
  {
    token: "sys.momentum.duration.default",
    compact: "100ms",
    defaultVal: "200ms",
    comfortable: "200ms",
    foundation: "Momentum",
  },
  {
    token: "sys.momentum.duration.slow",
    compact: "200ms",
    defaultVal: "350ms",
    comfortable: "500ms",
    foundation: "Momentum",
  },
  // Comp
  {
    token: "comp.button.height",
    compact: "44px",
    defaultVal: "48px",
    comfortable: "58px",
    foundation: "Comp",
  },
  {
    token: "comp.button.font",
    compact: "13px",
    defaultVal: "14px",
    comfortable: "16px",
    foundation: "Comp",
  },
  {
    token: "comp.tag.font",
    compact: "10px",
    defaultVal: "11px",
    comfortable: "13px",
    foundation: "Comp",
  },
  {
    token: "comp.tag.padding-x",
    compact: "8px",
    defaultVal: "12px",
    comfortable: "16px",
    foundation: "Comp",
  },
];

// ── Tab button ──
function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "var(--ref-frame-space-2) var(--ref-frame-space-4)",
        borderRadius: "var(--sys-frame-radius-full)",
        border: active ? "1px solid var(--sys-energy-action-primary)" : "1px solid transparent",
        background: active ? "var(--sys-energy-status-info-subtle)" : "transparent",
        color: active ? "var(--sys-energy-text-accent)" : "var(--sys-energy-text-secondary)",
        fontWeight: active ? "var(--ref-voice-weight-semibold)" : "var(--ref-voice-weight-regular)",
        fontSize: "var(--ref-voice-size-4)",
        fontFamily: "var(--ref-voice-family-sans)",
        cursor: "pointer",
        transition: "all var(--sys-momentum-transition-fast)",
      }}
    >
      {label}
    </button>
  );
}

// ── Density switcher ──
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
            boxShadow: value === opt ? "var(--sys-depth-elevation-1)" : "none",
            color:
              value === opt ? "var(--sys-energy-text-primary)" : "var(--sys-energy-text-tertiary)",
            fontWeight:
              value === opt
                ? "var(--ref-voice-weight-semibold)"
                : "var(--ref-voice-weight-regular)",
            fontSize: "var(--ref-voice-size-3)",
            fontFamily: "var(--ref-voice-family-sans)",
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

// ── Foundation badge ──
const FOUNDATION_COLORS: Record<TokenRow["foundation"], string> = {
  Frame: "var(--sys-energy-status-info-subtle)",
  Voice: "var(--sys-energy-status-success-subtle)",
  Momentum: "var(--sys-energy-status-warning-subtle)",
  Comp: "var(--sys-energy-surface-tertiary)",
};

// ── Live Demo Tab ──
function LiveDemoTab({ density }: { density: Density }) {
  return (
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
      <div style={{ padding: "var(--sys-frame-padding-surface)" }}>
        <Stack gap="subsection">
          {/* Control heights */}
          <Stack gap="component">
            <Text variant="overline">Frame — Control Heights (sm / md / lg / xl)</Text>
            <Inline gap={3} wrap>
              <FlowButton variant="primary" size="sm">
                Small
              </FlowButton>
              <FlowButton variant="primary" size="md">
                Medium
              </FlowButton>
              <FlowButton variant="primary" size="lg">
                Large
              </FlowButton>
              <FlowButton variant="primary" size="xl">
                Extra Large
              </FlowButton>
            </Inline>
          </Stack>

          <Divider spacing={0} />

          {/* Input fields */}
          <Stack gap="component">
            <Text variant="overline">Frame + Voice — Input Fields</Text>
            <LayoutGrid density={density}>
              <LayoutGrid.Item span={6}>
                <FlowTextInput label="First name" placeholder="Enter name" size="md" />
              </LayoutGrid.Item>
              <LayoutGrid.Item span={6}>
                <FlowTextInput label="Last name" placeholder="Enter name" size="md" />
              </LayoutGrid.Item>
            </LayoutGrid>
          </Stack>

          <Divider spacing={0} />

          {/* Typography scale */}
          <Stack gap="component">
            <Text variant="overline">Voice — Typography Scale</Text>
            <Stack gap={1}>
              <Text variant="heading-xl">Heading XL adapts to density</Text>
              <Text variant="paragraph-m">
                Body text scales: compact 14px → default 16px → comfortable 18px
              </Text>
              <Text variant="paragraph-s" color="secondary">
                Paragraph-s adapts proportionally
              </Text>
              <Text variant="caption" color="tertiary">
                Caption also scales
              </Text>
            </Stack>
          </Stack>

          <Divider spacing={0} />

          {/* Cards + tags */}
          <Stack gap="component">
            <Text variant="overline">Comp — Cards, Tags, Selection</Text>
            <LayoutGrid density={density}>
              {["Energy", "Voice", "Frame"].map((name) => (
                <LayoutGrid.Item key={name} span={4}>
                  <FlowCard elevation={1} padding="md">
                    <Stack gap={2}>
                      <Text variant="label-m">{name}</Text>
                      <Text variant="paragraph-s" color="secondary">
                        Card content with density-responsive padding and spacing.
                      </Text>
                      <Inline gap={1} wrap>
                        <FlowTag status="info">token</FlowTag>
                        <FlowTag status="success">active</FlowTag>
                      </Inline>
                    </Stack>
                  </FlowCard>
                </LayoutGrid.Item>
              ))}
            </LayoutGrid>
          </Stack>

          <Divider spacing={0} />

          {/* Selection controls */}
          <Stack gap="component">
            <Text variant="overline">Selection Controls at Current Density</Text>
            <Inline gap="component" wrap>
              <FlowSwitch label="Dark mode" />
              <FlowCheckbox label="Remember me" />
              <FlowSwitch label="Notifications" checked />
            </Inline>
          </Stack>

          {/* Momentum callout */}
          <div
            style={{
              background: "var(--sys-energy-status-info-subtle)",
              border: "1px solid var(--sys-energy-status-info-muted)",
              borderRadius: "var(--ref-frame-radius-3)",
              padding: "var(--ref-frame-space-4)",
            }}
          >
            <Stack gap={1}>
              <Text variant="label-m" color="accent">
                Momentum — Transition Speed
              </Text>
              <Text variant="paragraph-s">
                Hover any button above. In compact, transitions are snappier (100ms default). In
                comfortable, they are more expressive (200ms default, 500ms slow). The same
                interaction feels qualitatively different per density.
              </Text>
            </Stack>
          </div>
        </Stack>
      </div>
    </div>
  );
}

// ── Token Reference Tab ──
function TokenReferenceTab({ activeDensity }: { activeDensity: Density }) {
  const foundations: TokenRow["foundation"][] = ["Frame", "Voice", "Momentum", "Comp"];

  return (
    <Stack gap="component">
      <Text color="secondary">
        All density-responsive tokens. The highlighted column shows the active density. Values come
        from the <Code>ref → sys → comp</Code> token chain.
      </Text>

      {foundations.map((foundation) => {
        const rows = TOKEN_ROWS.filter((r) => r.foundation === foundation);
        return (
          <Stack key={foundation} gap={3}>
            <Inline gap={2} align="center">
              <div
                style={{
                  width: "var(--ref-frame-space-2)",
                  height: "var(--ref-frame-space-2)",
                  borderRadius: "var(--ref-frame-radius-full)",
                  background: FOUNDATION_COLORS[foundation],
                  border: "1px solid var(--sys-energy-border-default)",
                }}
              />
              <Text variant="overline">{foundation} Tokens</Text>
            </Inline>
            <Surface padding={0} border={true} radius="container">
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: "var(--ref-voice-family-sans)",
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--sys-energy-border-default)" }}>
                      {["Token", "Compact", "Default", "Comfortable"].map((h, i) => {
                        const densityKey: Density | null =
                          i === 1
                            ? "compact"
                            : i === 2
                              ? "default"
                              : i === 3
                                ? "comfortable"
                                : null;
                        const isActive = densityKey === activeDensity;
                        return (
                          <th
                            key={h}
                            style={{
                              padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                              textAlign: "left",
                              fontSize: "var(--ref-voice-size-2)",
                              fontWeight: "var(--ref-voice-weight-bold)",
                              color: isActive
                                ? "var(--sys-energy-text-accent)"
                                : "var(--sys-energy-text-secondary)",
                              textTransform: "uppercase",
                              letterSpacing: "var(--ref-voice-letter-spacing-caps)",
                              background: isActive
                                ? "var(--sys-energy-status-info-subtle)"
                                : "transparent",
                            }}
                          >
                            {h}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr
                        key={row.token}
                        style={{ borderBottom: "1px solid var(--sys-energy-border-default)" }}
                      >
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: "var(--sys-energy-text-primary)",
                          }}
                        >
                          {row.token}
                        </td>
                        {(["compact", "defaultVal", "comfortable"] as const).map((col, i) => {
                          const densityKey: Density =
                            i === 0 ? "compact" : i === 1 ? "default" : "comfortable";
                          const isActive = densityKey === activeDensity;
                          return (
                            <td
                              key={col}
                              style={{
                                padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                                fontFamily: "var(--ref-voice-family-mono)",
                                fontSize: "var(--ref-voice-size-3)",
                                color: isActive
                                  ? "var(--sys-energy-text-accent)"
                                  : "var(--sys-energy-text-secondary)",
                                fontWeight: isActive
                                  ? "var(--ref-voice-weight-medium)"
                                  : "var(--ref-voice-weight-regular)",
                                background: isActive
                                  ? "var(--sys-energy-status-info-subtle)"
                                  : "transparent",
                              }}
                            >
                              {row[col]}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Surface>
          </Stack>
        );
      })}
    </Stack>
  );
}

// ── Mechanism Tab ──
function MechanismTab() {
  return (
    <Stack gap="component">
      <Text color="secondary">
        Density is applied at the layout level via the <Code>data-density</Code> attribute. All Flow
        components respond automatically through the CSS custom property cascade.
      </Text>

      {/* How it works */}
      <Stack gap={3}>
        <Text variant="overline">CSS Cascade</Text>
        <Surface variant="primary" padding="container" radius="container">
          <Stack gap={2}>
            <Text variant="paragraph-s" style={{ fontFamily: "var(--ref-voice-family-mono)" }}>
              1. Page/layout sets: <Code>&lt;div data-density=&quot;compact&quot;&gt;</Code>
            </Text>
            <Text variant="paragraph-s" style={{ fontFamily: "var(--ref-voice-family-mono)" }}>
              2. CSS selector <Code>[data-density=&quot;compact&quot;]</Code> overrides sys tokens
            </Text>
            <Text variant="paragraph-s" style={{ fontFamily: "var(--ref-voice-family-mono)" }}>
              3. Comp tokens reference sys → pick up new values automatically
            </Text>
            <Text variant="paragraph-s" style={{ fontFamily: "var(--ref-voice-family-mono)" }}>
              4. Components use comp tokens → render at new density
            </Text>
          </Stack>
        </Surface>
      </Stack>

      {/* Automatic viewport mapping */}
      <Stack gap={3}>
        <Text variant="overline">Automatic Viewport Mapping</Text>
        <Surface variant="primary" padding="container" radius="container">
          <Stack gap={2}>
            <Text variant="paragraph-s">
              The <Code>useFlowBreakpoint</Code> hook automatically sets <Code>data-density</Code>{" "}
              on <Code>&lt;html&gt;</Code> based on viewport width:
            </Text>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "var(--ref-frame-space-2)" }}
            >
              {[
                { range: "< 576px", density: "compact", label: "Mobile" },
                { range: "576px – 1439px", density: "default", label: "Tablet / Desktop" },
                { range: "≥ 1440px", density: "comfortable", label: "Large Desktop" },
              ].map((bp) => (
                <div
                  key={bp.range}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px 100px 1fr",
                    gap: "var(--ref-frame-space-3)",
                    alignItems: "center",
                    padding: "var(--ref-frame-space-2) 0",
                    borderBottom: "1px solid var(--sys-energy-border-default)",
                    fontFamily: "var(--ref-voice-family-mono)",
                    fontSize: "var(--ref-voice-size-3)",
                  }}
                >
                  <span style={{ color: "var(--sys-energy-text-secondary)" }}>{bp.range}</span>
                  <span
                    style={{
                      color: "var(--sys-energy-text-accent)",
                      fontWeight: "var(--ref-voice-weight-medium)",
                    }}
                  >
                    {bp.density}
                  </span>
                  <span style={{ color: "var(--sys-energy-text-tertiary)" }}>{bp.label}</span>
                </div>
              ))}
            </div>
          </Stack>
        </Surface>
      </Stack>

      {/* Animated transitions */}
      <Stack gap={3}>
        <Text variant="overline">Animated Density Transitions</Text>
        <Surface variant="primary" padding="container" radius="container">
          <Stack gap={2}>
            <Text variant="paragraph-s">
              Add <Code>data-density-animate</Code> to enable smooth transitions between density
              modes. Gap, padding, margin, font-size, line-height, and height all transition using{" "}
              <Code>var(--sys-momentum-transition-default)</Code>.
            </Text>
            <Text variant="paragraph-s" color="secondary">
              This is used in the Live Demo tab above — toggle densities to see it in action.
            </Text>
          </Stack>
        </Surface>
      </Stack>

      {/* Foundations affected */}
      <Stack gap={3}>
        <Text variant="overline">Foundations Affected</Text>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "var(--ref-frame-space-3)",
          }}
        >
          {[
            { name: "Frame", desc: "Heights, padding, gap, radius, grid" },
            { name: "Voice", desc: "Font sizes across all roles shift ±1 step" },
            { name: "Momentum", desc: "Transition durations: snappier ↔ expressive" },
            { name: "Comp", desc: "Button, Tag, Input, Card — all adapt" },
          ].map((f) => (
            <Surface key={f.name} variant="secondary" padding="control" radius="container">
              <Stack gap={1}>
                <Text variant="label-m">{f.name}</Text>
                <Text variant="caption" color="tertiary">
                  {f.desc}
                </Text>
              </Stack>
            </Surface>
          ))}
        </div>
      </Stack>
    </Stack>
  );
}

// ── Main Export ──
export function DensityExplorer() {
  const [tab, setTab] = useState<Tab>("live");
  const [density, setDensity] = useState<Density>("default");

  return (
    <Stack gap="component">
      <Divider spacing={0} />
      <Text variant="overline">Interactive Explorer</Text>
      <Text variant="display-m">Density Modes</Text>
      <Text color="secondary" style={{ maxWidth: "var(--sys-frame-content-prose)" }}>
        Density is not a zoom — it is a coordinated adaptation of <strong>4 foundations</strong>{" "}
        (Frame, Voice, Momentum, Comp). Toggle between compact, default, and comfortable to see how
        the entire UI adapts through the <Code>data-density</Code> attribute cascade.
      </Text>

      {/* Controls bar */}
      <Inline gap="component" align="center" wrap>
        <DensitySwitcher value={density} onChange={setDensity} />
        <Text variant="caption" color="tertiary">
          Active: <Code>{density}</Code>
        </Text>
      </Inline>

      {/* Tab bar */}
      <Inline gap={1}>
        <TabButton label="Live Demo" active={tab === "live"} onClick={() => setTab("live")} />
        <TabButton
          label="Token Reference"
          active={tab === "tokens"}
          onClick={() => setTab("tokens")}
        />
        <TabButton
          label="Mechanism"
          active={tab === "mechanism"}
          onClick={() => setTab("mechanism")}
        />
      </Inline>

      {/* Tab content */}
      {tab === "live" && <LiveDemoTab density={density} />}
      {tab === "tokens" && <TokenReferenceTab activeDensity={density} />}
      {tab === "mechanism" && <MechanismTab />}
    </Stack>
  );
}
