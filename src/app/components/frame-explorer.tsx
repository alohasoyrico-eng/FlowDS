/**
 * FrameExplorer — Interactive layout, spacing & grid explorer
 * ─────────────────────────────────────────────────────────────
 * Visualizes FLOW's spatial system:
 * - 15-step spacing scale (4px base unit)
 * - Responsive grid system (12/6/1 columns)
 * - 14-step radius scale
 * - Responsive breakpoints (sm/md)
 * - Density modes (compact/default/comfortable)
 *
 * Embedded within the Frame foundation detail page.
 */
import { useState } from "react";

import { Divider, Inline, Stack, Surface, Text } from "../primitives";

// ── Spacing data ──
interface SpaceStep {
  step: number;
  value: string;
  px: number;
  refToken: string;
  cssVar: string;
  useCase: string;
}

const SPACE_STEPS: SpaceStep[] = [
  {
    step: 0,
    value: "0px",
    px: 0,
    refToken: "ref.frame.space.0",
    cssVar: "--ref-frame-space-0",
    useCase: "No spacing, collapsed",
  },
  {
    step: 1,
    value: "4px",
    px: 4,
    refToken: "ref.frame.space.1",
    cssVar: "--ref-frame-space-1",
    useCase: "Inline icon gap, tight pairs",
  },
  {
    step: 2,
    value: "8px",
    px: 8,
    refToken: "ref.frame.space.2",
    cssVar: "--ref-frame-space-2",
    useCase: "Compact control gap, chip spacing",
  },
  {
    step: 3,
    value: "12px",
    px: 12,
    refToken: "ref.frame.space.3",
    cssVar: "--ref-frame-space-3",
    useCase: "Default control padding, field gap",
  },
  {
    step: 4,
    value: "16px",
    px: 16,
    refToken: "ref.frame.space.4",
    cssVar: "--ref-frame-space-4",
    useCase: "Card inner padding, mobile margin",
  },
  {
    step: 5,
    value: "20px",
    px: 20,
    refToken: "ref.frame.space.5",
    cssVar: "--ref-frame-space-5",
    useCase: "Comfortable control padding",
  },
  {
    step: 6,
    value: "24px",
    px: 24,
    refToken: "ref.frame.space.6",
    cssVar: "--ref-frame-space-6",
    useCase: "Section gap, grid gutter, card padding",
  },
  {
    step: 7,
    value: "28px",
    px: 28,
    refToken: "ref.frame.space.7",
    cssVar: "--ref-frame-space-7",
    useCase: "Extended section spacing",
  },
  {
    step: 8,
    value: "32px",
    px: 32,
    refToken: "ref.frame.space.8",
    cssVar: "--ref-frame-space-8",
    useCase: "Section margin, compact grid margin",
  },
  {
    step: 9,
    value: "36px",
    px: 36,
    refToken: "ref.frame.space.9",
    cssVar: "--ref-frame-space-9",
    useCase: "Large component gap",
  },
  {
    step: 10,
    value: "40px",
    px: 40,
    refToken: "ref.frame.space.10",
    cssVar: "--ref-frame-space-10",
    useCase: "Page section gap",
  },
  {
    step: 11,
    value: "44px",
    px: 44,
    refToken: "ref.frame.space.11",
    cssVar: "--ref-frame-space-11",
    useCase: "Extended page spacing",
  },
  {
    step: 12,
    value: "48px",
    px: 48,
    refToken: "ref.frame.space.12",
    cssVar: "--ref-frame-space-12",
    useCase: "Default grid margin, icon badge size",
  },
  {
    step: 16,
    value: "64px",
    px: 64,
    refToken: "ref.frame.space.16",
    cssVar: "--ref-frame-space-16",
    useCase: "Comfortable grid margin",
  },
  {
    step: 20,
    value: "80px",
    px: 80,
    refToken: "ref.frame.space.20",
    cssVar: "--ref-frame-space-20",
    useCase: "Hero spacing, page-level gap",
  },
];

// ── Radius data ──
interface RadiusStep {
  step: number | string;
  value: string;
  px: number;
  cssVar: string;
  useCase: string;
}

const RADIUS_STEPS: RadiusStep[] = [
  { step: 0, value: "0px", px: 0, cssVar: "--ref-frame-radius-0", useCase: "Square corners" },
  {
    step: 1,
    value: "4px",
    px: 4,
    cssVar: "--ref-frame-radius-1",
    useCase: "Subtle rounding, badges",
  },
  {
    step: 2,
    value: "8px",
    px: 8,
    cssVar: "--ref-frame-radius-2",
    useCase: "Buttons, inputs, chips",
  },
  {
    step: 3,
    value: "12px",
    px: 12,
    cssVar: "--ref-frame-radius-3",
    useCase: "Cards, panels, surfaces",
  },
  {
    step: 4,
    value: "16px",
    px: 16,
    cssVar: "--ref-frame-radius-4",
    useCase: "Dialogs, large surfaces",
  },
  { step: 6, value: "24px", px: 24, cssVar: "--ref-frame-radius-6", useCase: "Large containers" },
  {
    step: 8,
    value: "32px",
    px: 32,
    cssVar: "--ref-frame-radius-8",
    useCase: "Extra-large surfaces",
  },
  {
    step: 12,
    value: "48px",
    px: 48,
    cssVar: "--ref-frame-radius-12",
    useCase: "Maximum rectangular radius",
  },
  {
    step: "full",
    value: "9999px",
    px: 9999,
    cssVar: "--ref-frame-radius-full",
    useCase: "Pills, circles, avatars",
  },
];

// ── Grid tier data ──
interface GridTier {
  name: string;
  breakpoint: string;
  columns: number;
  gutter: string;
  margin: string;
  maxWidth: string | null;
  description: string;
}

const GRID_TIERS: GridTier[] = [
  {
    name: "Large (lg)",
    breakpoint: ">= 992px",
    columns: 12,
    gutter: "24px",
    margin: "48px",
    maxWidth: "1440px",
    description: "Desktop — full 12-column grid with generous margins and 24px gutters",
  },
  {
    name: "Medium (md)",
    breakpoint: "576-991px",
    columns: 6,
    gutter: "24px",
    margin: "24px",
    maxWidth: null,
    description: "Tablet — 6-column grid, same gutter, tighter margins",
  },
  {
    name: "Small (sm)",
    breakpoint: "< 576px",
    columns: 1,
    gutter: "0px",
    margin: "16px",
    maxWidth: null,
    description: "Mobile — single column, no gutters, minimum margin",
  },
];

// ── Density data ──
interface DensityRow {
  token: string;
  compact: string;
  defaultVal: string;
  comfortable: string;
}

const DENSITY_FRAME_ROWS: DensityRow[] = [
  {
    token: "--sys-frame-padding-control",
    compact: "8px (space-2)",
    defaultVal: "12px (space-3)",
    comfortable: "16px (space-4)",
  },
  {
    token: "--sys-frame-gap-component",
    compact: "8px (space-2)",
    defaultVal: "12px (space-3)",
    comfortable: "16px (space-4)",
  },
  {
    token: "--sys-frame-height-control-sm",
    compact: "28px",
    defaultVal: "32px",
    comfortable: "36px",
  },
  {
    token: "--sys-frame-height-control-md",
    compact: "32px",
    defaultVal: "40px",
    comfortable: "44px",
  },
  {
    token: "--sys-frame-height-control-lg",
    compact: "40px",
    defaultVal: "48px",
    comfortable: "52px",
  },
];

const DENSITY_GRID_ROWS: DensityRow[] = [
  {
    token: "--sys-frame-grid-lg-gutter",
    compact: "16px (space-4)",
    defaultVal: "24px (space-6)",
    comfortable: "32px (space-8)",
  },
  {
    token: "--sys-frame-grid-lg-margin",
    compact: "32px (space-8)",
    defaultVal: "48px (space-12)",
    comfortable: "64px (space-16)",
  },
  {
    token: "--sys-frame-grid-md-gutter",
    compact: "16px (space-4)",
    defaultVal: "24px (space-6)",
    comfortable: "32px (space-8)",
  },
  {
    token: "--sys-frame-grid-md-margin",
    compact: "16px (space-4)",
    defaultVal: "24px (space-6)",
    comfortable: "32px (space-8)",
  },
  {
    token: "--sys-frame-grid-sm-margin",
    compact: "12px (space-3)",
    defaultVal: "16px (space-4)",
    comfortable: "20px (space-5)",
  },
];

// ── Breakpoint data ──
interface BreakpointInfo {
  name: string;
  value: string;
  cssVar: string;
  refToken: string;
  fromTo: string;
  gridTier: string;
}

const BREAKPOINTS: BreakpointInfo[] = [
  {
    name: "sm",
    value: "576px",
    cssVar: "--ref-frame-breakpoint-sm",
    refToken: "ref.frame.breakpoint.sm",
    fromTo: "Mobile -> Tablet",
    gridTier: "sm -> md",
  },
  {
    name: "md",
    value: "992px",
    cssVar: "--ref-frame-breakpoint-md",
    refToken: "ref.frame.breakpoint.md",
    fromTo: "Tablet -> Desktop",
    gridTier: "md -> lg",
  },
];

type Tab = "spacing" | "grid" | "radius" | "breakpoints" | "density";

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
        borderRadius: "var(--ref-frame-radius-2)",
        border: active
          ? "1px solid var(--sys-energy-border-focus)"
          : "1px solid var(--sys-energy-border-default)",
        background: active
          ? "var(--sys-energy-surface-accent)"
          : "var(--sys-energy-surface-primary)",
        color: active ? "var(--sys-energy-text-accent)" : "var(--sys-energy-text-secondary)",
        cursor: "pointer",
        fontFamily: "var(--ref-voice-family-sans)",
        fontSize: "var(--ref-voice-size-5)",
        fontWeight: "var(--ref-voice-weight-medium)",
        transition: "var(--ref-momentum-duration-fast) var(--ref-momentum-easing-standard)",
      }}
    >
      {label}
    </button>
  );
}

// ── Grid visualization ──
function GridVisualization({ tier }: { tier: GridTier }) {
  const cols = tier.columns;
  return (
    <div
      style={{
        background: "var(--sys-energy-surface-sunken)",
        borderRadius: "var(--ref-frame-radius-3)",
        padding: `var(--ref-frame-space-4) ${tier.margin}`,
        overflow: "hidden",
      }}
    >
      {/* Margin labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "var(--ref-frame-space-2)",
        }}
      >
        <span
          style={{
            fontSize: "var(--ref-voice-size-2)",
            fontFamily: "var(--ref-voice-family-mono)",
            color: "var(--sys-energy-text-tertiary)",
          }}
        >
          margin: {tier.margin}
        </span>
        <span
          style={{
            fontSize: "var(--ref-voice-size-2)",
            fontFamily: "var(--ref-voice-family-mono)",
            color: "var(--sys-energy-text-tertiary)",
          }}
        >
          {tier.maxWidth ? `max: ${tier.maxWidth}` : "fluid"}
        </span>
      </div>
      {/* Columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: tier.gutter,
        }}
      >
        {Array.from({ length: cols }).map((_, i) => (
          <div
            key={i}
            style={{
              height: "var(--ref-frame-space-12)",
              borderRadius: "var(--ref-frame-radius-1)",
              background: "var(--sys-energy-surface-accent)",
              border: "1px solid var(--sys-energy-border-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "var(--ref-voice-size-2)",
              fontFamily: "var(--ref-voice-family-mono)",
              color: "var(--sys-energy-text-accent)",
              fontWeight: "var(--ref-voice-weight-medium)",
            }}
          >
            {cols > 1 ? i + 1 : "1"}
          </div>
        ))}
      </div>
      {/* Gutter label */}
      {cols > 1 && (
        <div
          style={{
            textAlign: "center",
            marginTop: "var(--ref-frame-space-2)",
            fontSize: "var(--ref-voice-size-2)",
            fontFamily: "var(--ref-voice-family-mono)",
            color: "var(--sys-energy-text-tertiary)",
          }}
        >
          gutter: {tier.gutter}
        </div>
      )}
    </div>
  );
}

// ── Main explorer ──
export function FrameExplorer() {
  const [tab, setTab] = useState<Tab>("spacing");
  const [selectedGrid, setSelectedGrid] = useState(0);

  return (
    <Stack gap="component">
      <Divider spacing={0} />

      <Stack gap={2}>
        <Text role="overline">Interactive Explorer</Text>
        <Text role="heading-l">Frame System</Text>
        <Text color="secondary">
          4px base-unit spacing scale, responsive 12/6/1 grid, radius scale, breakpoints, and
          density-adaptive controls. All spatial tokens trace back to ref.frame.
        </Text>
      </Stack>

      {/* Tab bar */}
      <Inline gap={2} wrap>
        <TabButton
          label="Spacing Scale"
          active={tab === "spacing"}
          onClick={() => setTab("spacing")}
        />
        <TabButton label="Grid System" active={tab === "grid"} onClick={() => setTab("grid")} />
        <TabButton
          label="Radius Scale"
          active={tab === "radius"}
          onClick={() => setTab("radius")}
        />
        <TabButton
          label="Breakpoints"
          active={tab === "breakpoints"}
          onClick={() => setTab("breakpoints")}
        />
        <TabButton
          label="Density Modes"
          active={tab === "density"}
          onClick={() => setTab("density")}
        />
      </Inline>

      {/* ── Spacing Scale Tab ── */}
      {tab === "spacing" && (
        <Stack gap="component">
          {/* Visual spacing bars */}
          <div
            style={{
              background: "var(--sys-energy-surface-sunken)",
              borderRadius: "var(--ref-frame-radius-4)",
              padding: "var(--ref-frame-space-6)",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "var(--ref-frame-space-3)" }}
            >
              {SPACE_STEPS.map((s) => (
                <div
                  key={s.step}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "var(--ref-frame-space-9) var(--ref-frame-space-12) 1fr auto",
                    gap: "var(--ref-frame-space-3)",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--ref-voice-family-mono)",
                      fontSize: "var(--ref-voice-size-3)",
                      color: "var(--sys-energy-text-tertiary)",
                      textAlign: "right",
                    }}
                  >
                    {s.step}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--ref-voice-family-mono)",
                      fontSize: "var(--ref-voice-size-3)",
                      color: "var(--sys-energy-text-accent)",
                      textAlign: "right",
                    }}
                  >
                    {s.value}
                  </span>
                  <div style={{ position: "relative", height: "var(--ref-frame-space-4)" }}>
                    <div
                      style={{
                        height: "100%",
                        width: s.px === 0 ? "var(--ref-frame-space-micro)" : `${Math.min(100, (s.px / 80) * 100)}%`,
                        borderRadius: "var(--ref-frame-radius-1)",
                        background:
                          s.px === 0
                            ? "var(--sys-energy-text-tertiary)"
                            : "var(--sys-energy-action-primary)",
                        opacity: s.px === 0 ? 0.5 : Math.min(1, 0.3 + (s.px / 80) * 0.7),
                        transition:
                          "width var(--ref-momentum-duration-normal) var(--ref-momentum-easing-standard)",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--ref-voice-family-sans)",
                      fontSize: "var(--ref-voice-size-2)",
                      color: "var(--sys-energy-text-tertiary)",
                      minWidth: "var(--ref-frame-doc-col-token)",
                      textAlign: "right",
                    }}
                  >
                    {s.useCase}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Token reference table */}
          <Stack gap={3}>
            <Text role="overline">Token Reference</Text>
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
                      {["Step", "Value", "CSS Variable", "Use Case"].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            textAlign: "left",
                            fontSize: "var(--ref-voice-size-2)",
                            fontWeight: "var(--ref-voice-weight-bold)",
                            color: "var(--sys-energy-text-secondary)",
                            textTransform: "uppercase",
                            letterSpacing: "var(--ref-voice-letter-spacing-caps)",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SPACE_STEPS.map((s) => (
                      <tr
                        key={s.step}
                        style={{ borderBottom: "1px solid var(--sys-energy-border-default)" }}
                      >
                        <td
                          style={{ padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)" }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "var(--ref-frame-space-6)",
                              height: "var(--ref-frame-space-6)",
                              borderRadius: "var(--ref-frame-radius-2)",
                              background: "var(--sys-energy-surface-accent)",
                              color: "var(--sys-energy-text-accent)",
                              fontSize: "var(--ref-voice-size-3)",
                              fontWeight: "var(--ref-voice-weight-bold)",
                              fontFamily: "var(--ref-voice-family-mono)",
                            }}
                          >
                            {s.step}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: "var(--sys-energy-text-accent)",
                            fontWeight: "var(--ref-voice-weight-medium)",
                          }}
                        >
                          {s.value}
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: "var(--sys-energy-text-secondary)",
                          }}
                        >
                          {s.cssVar}
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontSize: "var(--ref-voice-size-4)",
                            color: "var(--sys-energy-text-secondary)",
                          }}
                        >
                          {s.useCase}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Surface>
          </Stack>

          {/* Design rationale */}
          <Surface padding="control" variant="secondary">
            <Stack gap={3}>
              <Text role="overline">Design Rationale</Text>
              <div
                style={{
                  fontFamily: "var(--ref-voice-family-mono)",
                  fontSize: "var(--ref-voice-size-3)",
                  lineHeight: 2,
                  color: "var(--sys-energy-text-secondary)",
                }}
              >
                { }
                <div>
                  <span style={{ color: "var(--sys-energy-text-tertiary)" }}>
                    {"// 4px base unit for crisp rendering on 2x/3x displays"}
                  </span>
                </div>
                { }
                <div>
                  <span style={{ color: "var(--sys-energy-text-tertiary)" }}>
                    {"// Sequence: 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 64, 80"}
                  </span>
                </div>
                { }
                <div>
                  <span style={{ color: "var(--sys-energy-text-tertiary)" }}>
                    {"// Steps 0-12: linear 4px increments (fine control)"}
                  </span>
                </div>
                { }
                <div>
                  <span style={{ color: "var(--sys-energy-text-tertiary)" }}>
                    {"// Steps 16, 20: jump to 64px, 80px (section-level spacing)"}
                  </span>
                </div>
                { }
                <div>
                  <span style={{ color: "var(--sys-energy-text-tertiary)" }}>
                    {"// No 2px step: too fine for most use cases, creates ambiguity"}
                  </span>
                </div>
                { }
                <div>
                  <span style={{ color: "var(--sys-energy-text-tertiary)" }}>
                    {"// Grid gutters/margins directly reference space steps for traceability"}
                  </span>
                </div>
              </div>
            </Stack>
          </Surface>
        </Stack>
      )}

      {/* ── Grid System Tab ── */}
      {tab === "grid" && (
        <Stack gap="component">
          {/* Grid tier selector */}
          <Inline gap={2} wrap>
            {GRID_TIERS.map((tier, i) => (
              <button
                key={tier.name}
                onClick={() => setSelectedGrid(i)}
                style={{
                  padding: "var(--ref-frame-space-3) var(--ref-frame-space-5)",
                  borderRadius: "var(--ref-frame-radius-2)",
                  border:
                    selectedGrid === i
                      ? "2px solid var(--sys-energy-border-focus)"
                      : "1px solid var(--sys-energy-border-default)",
                  background:
                    selectedGrid === i
                      ? "var(--sys-energy-surface-accent)"
                      : "var(--sys-energy-surface-primary)",
                  color:
                    selectedGrid === i
                      ? "var(--sys-energy-text-accent)"
                      : "var(--sys-energy-text-secondary)",
                  cursor: "pointer",
                  fontFamily: "var(--ref-voice-family-sans)",
                  fontSize: "var(--ref-voice-size-5)",
                  fontWeight: "var(--ref-voice-weight-medium)",
                }}
              >
                {tier.name}
              </button>
            ))}
          </Inline>

          {/* Grid visualization */}
          <GridVisualization tier={GRID_TIERS[selectedGrid]} />

          {/* Grid spec detail */}
          <Surface padding="container" variant="secondary">
            <Stack gap={4}>
              <Text role="heading-m" style={{ margin: 0 }}>
                {GRID_TIERS[selectedGrid].name}
              </Text>
              <Text color="secondary">{GRID_TIERS[selectedGrid].description}</Text>
              <Divider spacing={0} />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(var(--ref-frame-space-32), 1fr))",
                  gap: "var(--ref-frame-space-4)",
                }}
              >
                {[
                  { label: "Columns", value: String(GRID_TIERS[selectedGrid].columns) },
                  { label: "Gutter", value: GRID_TIERS[selectedGrid].gutter },
                  { label: "Margin", value: GRID_TIERS[selectedGrid].margin },
                  { label: "Max Width", value: GRID_TIERS[selectedGrid].maxWidth || "Fluid" },
                  { label: "Breakpoint", value: GRID_TIERS[selectedGrid].breakpoint },
                ].map((item) => (
                  <div key={item.label}>
                    <div
                      style={{
                        fontSize: "var(--ref-voice-size-2)",
                        fontWeight: "var(--ref-voice-weight-bold)",
                        color: "var(--sys-energy-text-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "var(--ref-voice-letter-spacing-caps)",
                        marginBottom: "var(--ref-frame-space-1)",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--ref-voice-family-mono)",
                        fontSize: "var(--ref-voice-size-5)",
                        fontWeight: "var(--ref-voice-weight-semibold)",
                        color: "var(--sys-energy-text-accent)",
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </Stack>
          </Surface>

          {/* All tiers comparison table */}
          <Stack gap={3}>
            <Text role="overline">Grid Specification Comparison</Text>
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
                      {["Tier", "Breakpoint", "Columns", "Gutter", "Margin", "Max Width"].map(
                        (h) => (
                          <th
                            key={h}
                            style={{
                              padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                              textAlign: "left",
                              fontSize: "var(--ref-voice-size-2)",
                              fontWeight: "var(--ref-voice-weight-bold)",
                              color: "var(--sys-energy-text-secondary)",
                              textTransform: "uppercase",
                              letterSpacing: "var(--ref-voice-letter-spacing-caps)",
                            }}
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {GRID_TIERS.map((tier) => (
                      <tr
                        key={tier.name}
                        style={{ borderBottom: "1px solid var(--sys-energy-border-default)" }}
                      >
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontWeight: "var(--ref-voice-weight-medium)",
                            color: "var(--sys-energy-text-primary)",
                            fontSize: "var(--ref-voice-size-4)",
                          }}
                        >
                          {tier.name}
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: "var(--sys-energy-text-secondary)",
                          }}
                        >
                          {tier.breakpoint}
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-4)",
                            color: "var(--sys-energy-text-accent)",
                            fontWeight: "var(--ref-voice-weight-bold)",
                          }}
                        >
                          {tier.columns}
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: "var(--sys-energy-text-primary)",
                          }}
                        >
                          {tier.gutter}
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: "var(--sys-energy-text-primary)",
                          }}
                        >
                          {tier.margin}
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: tier.maxWidth
                              ? "var(--sys-energy-text-primary)"
                              : "var(--sys-energy-text-tertiary)",
                          }}
                        >
                          {tier.maxWidth || "Fluid"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Surface>
          </Stack>

          {/* CSS variable mapping */}
          <Stack gap={3}>
            <Text role="overline">CSS Variable Trace</Text>
            <Surface padding="control" variant="secondary">
              <div
                style={{
                  fontFamily: "var(--ref-voice-family-mono)",
                  fontSize: "var(--ref-voice-size-3)",
                  lineHeight: 2,
                  color: "var(--sys-energy-text-secondary)",
                }}
              >
                <div>
                  <span style={{ color: "var(--sys-energy-text-tertiary)" }}>
                    {"/* ref layer — raw grid values */"}
                  </span>
                </div>
                <div>
                  <span style={{ color: "var(--sys-energy-text-accent)" }}>
                    --ref-frame-grid-lg-columns
                  </span>
                  : 12
                </div>
                <div>
                  <span style={{ color: "var(--sys-energy-text-accent)" }}>
                    --ref-frame-grid-lg-gutter
                  </span>
                  : 24px{" "}
                  <span style={{ color: "var(--sys-energy-text-tertiary)" }}>
                    {"/* = ref.frame.space.6 */"}
                  </span>
                </div>
                <div>
                  <span style={{ color: "var(--sys-energy-text-accent)" }}>
                    --ref-frame-grid-lg-margin
                  </span>
                  : 48px{" "}
                  <span style={{ color: "var(--sys-energy-text-tertiary)" }}>
                    {"/* = ref.frame.space.12 */"}
                  </span>
                </div>
                <div>
                  <span style={{ color: "var(--sys-energy-text-accent)" }}>
                    --ref-frame-grid-lg-max-width
                  </span>
                  : 1440px
                </div>
                <div style={{ marginTop: "var(--ref-frame-space-2)" }}>
                  <span style={{ color: "var(--sys-energy-text-tertiary)" }}>
                    {"/* sys layer — density-responsive */"}
                  </span>
                </div>
                <div>
                  <span style={{ color: "var(--sys-energy-text-accent)" }}>
                    --sys-frame-grid-lg-gutter
                  </span>
                  : var(--ref-frame-grid-lg-gutter)
                </div>
                <div>
                  <span style={{ color: "var(--sys-energy-text-tertiary)" }}>
                    {"/* Compact: overrides to space-4 (16px) */"}
                  </span>
                </div>
                <div>
                  <span style={{ color: "var(--sys-energy-text-tertiary)" }}>
                    {"/* Comfortable: overrides to space-8 (32px) */"}
                  </span>
                </div>
              </div>
            </Surface>
          </Stack>
        </Stack>
      )}

      {/* ── Radius Scale Tab ── */}
      {tab === "radius" && (
        <Stack gap="component">
          {/* Visual radius demos */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(var(--ref-frame-space-32), 1fr))",
              gap: "var(--ref-frame-space-4)",
            }}
          >
            {RADIUS_STEPS.map((r) => (
              <div
                key={String(r.step)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--ref-frame-space-2)",
                }}
              >
                <div
                  style={{
                    width: r.step === "full" ? "var(--ref-frame-space-20)" : "var(--ref-frame-space-20)",
                    height: "var(--ref-frame-space-20)",
                    borderRadius: r.value,
                    background: "var(--sys-energy-surface-accent)",
                    border: "2px solid var(--sys-energy-border-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--ref-voice-family-mono)",
                      fontSize: "var(--ref-voice-size-3)",
                      color: "var(--sys-energy-text-accent)",
                      fontWeight: "var(--ref-voice-weight-bold)",
                    }}
                  >
                    {r.step}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--ref-voice-family-mono)",
                    fontSize: "var(--ref-voice-size-3)",
                    color: "var(--sys-energy-text-accent)",
                  }}
                >
                  {r.value}
                </span>
                <span
                  style={{
                    fontSize: "var(--ref-voice-size-2)",
                    color: "var(--sys-energy-text-tertiary)",
                    textAlign: "center",
                    fontFamily: "var(--ref-voice-family-sans)",
                  }}
                >
                  {r.useCase}
                </span>
              </div>
            ))}
          </div>

          {/* Radius token table */}
          <Stack gap={3}>
            <Text role="overline">Token Reference</Text>
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
                      {["Step", "Value", "CSS Variable", "Use Case"].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            textAlign: "left",
                            fontSize: "var(--ref-voice-size-2)",
                            fontWeight: "var(--ref-voice-weight-bold)",
                            color: "var(--sys-energy-text-secondary)",
                            textTransform: "uppercase",
                            letterSpacing: "var(--ref-voice-letter-spacing-caps)",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {RADIUS_STEPS.map((r) => (
                      <tr
                        key={String(r.step)}
                        style={{ borderBottom: "1px solid var(--sys-energy-border-default)" }}
                      >
                        <td
                          style={{ padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)" }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minWidth: "var(--ref-frame-space-8)",
                              height: "var(--ref-frame-space-6)",
                              padding: "0 var(--ref-frame-space-1)",
                              borderRadius: "var(--ref-frame-radius-2)",
                              background: "var(--sys-energy-surface-accent)",
                              color: "var(--sys-energy-text-accent)",
                              fontSize: "var(--ref-voice-size-3)",
                              fontWeight: "var(--ref-voice-weight-bold)",
                              fontFamily: "var(--ref-voice-family-mono)",
                            }}
                          >
                            {r.step}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: "var(--sys-energy-text-accent)",
                            fontWeight: "var(--ref-voice-weight-medium)",
                          }}
                        >
                          {r.value}
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: "var(--sys-energy-text-secondary)",
                          }}
                        >
                          {r.cssVar}
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontSize: "var(--ref-voice-size-4)",
                            color: "var(--sys-energy-text-secondary)",
                          }}
                        >
                          {r.useCase}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Surface>
          </Stack>

          {/* Component-to-radius mapping */}
          <Stack gap={3}>
            <Text role="overline">Component Radius Mapping</Text>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(var(--ref-frame-doc-col-token), 1fr))",
                gap: "var(--ref-frame-space-4)",
              }}
            >
              {[
                { component: "Button", radius: "8px (step 2)", cssVar: "--comp-button-radius" },
                {
                  component: "TextField",
                  radius: "8px (step 2)",
                  cssVar: "--comp-text-field-radius",
                },
                { component: "Card", radius: "12px (step 3)", cssVar: "--comp-card-radius" },
                { component: "Dialog", radius: "16px (step 4)", cssVar: "--comp-dialog-radius" },
                { component: "Panel", radius: "12px (step 3)", cssVar: "--comp-panel-radius" },
                { component: "Chip/Tag", radius: "9999px (full)", cssVar: "--comp-chip-radius" },
              ].map((item) => (
                <Surface key={item.component} padding={4} variant="secondary">
                  <Stack gap={1}>
                    <Text style={{ fontWeight: "var(--ref-voice-weight-medium)" }}>
                      {item.component}
                    </Text>
                    <span
                      style={{
                        fontFamily: "var(--ref-voice-family-mono)",
                        fontSize: "var(--ref-voice-size-3)",
                        color: "var(--sys-energy-text-accent)",
                      }}
                    >
                      {item.radius}
                    </span>
                  </Stack>
                </Surface>
              ))}
            </div>
          </Stack>
        </Stack>
      )}

      {/* ── Breakpoints Tab ── */}
      {tab === "breakpoints" && (
        <Stack gap="component">
          {/* Visual breakpoint diagram */}
          <div
            style={{
              background: "var(--sys-energy-surface-sunken)",
              borderRadius: "var(--ref-frame-radius-4)",
              padding: "var(--ref-frame-space-6)",
            }}
          >
            <div style={{ position: "relative", height: "var(--ref-frame-space-32)" }}>
              {/* Full bar */}
              <div
                style={{
                  position: "absolute",
                  top: "var(--ref-frame-space-10)",
                  left: 0,
                  right: 0,
                  height: "var(--ref-frame-space-10)",
                  borderRadius: "var(--ref-frame-radius-2)",
                  overflow: "hidden",
                  display: "flex",
                }}
              >
                {/* Mobile */}
                <div
                  style={{
                    flex: "576",
                    background: "var(--sys-energy-surface-danger)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--ref-voice-family-sans)",
                    fontSize: "var(--ref-voice-size-3)",
                    color: "var(--sys-energy-text-danger)",
                    fontWeight: "var(--ref-voice-weight-medium)",
                  }}
                >
                  Mobile (1 col)
                </div>
                {/* Tablet */}
                <div
                  style={{
                    flex: "416",
                    background: "var(--sys-energy-surface-warning)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--ref-voice-family-sans)",
                    fontSize: "var(--ref-voice-size-3)",
                    color: "var(--sys-energy-text-warning)",
                    fontWeight: "var(--ref-voice-weight-medium)",
                  }}
                >
                  Tablet (6 col)
                </div>
                {/* Desktop */}
                <div
                  style={{
                    flex: "448",
                    background: "var(--sys-energy-surface-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--ref-voice-family-sans)",
                    fontSize: "var(--ref-voice-size-3)",
                    color: "var(--sys-energy-text-accent)",
                    fontWeight: "var(--ref-voice-weight-medium)",
                  }}
                >
                  Desktop (12 col)
                </div>
              </div>
              {/* Breakpoint markers */}
              <div
                style={{
                  position: "absolute",
                  top: "var(--ref-frame-space-4)",
                  left: "calc(576 / 1440 * 100%)",
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--ref-frame-space-micro)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--ref-voice-family-mono)",
                    fontSize: "var(--ref-voice-size-2)",
                    color: "var(--sys-energy-text-primary)",
                    fontWeight: "var(--ref-voice-weight-bold)",
                  }}
                >
                  576px
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "var(--ref-frame-space-4)",
                  left: "calc(992 / 1440 * 100%)",
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--ref-frame-space-micro)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--ref-voice-family-mono)",
                    fontSize: "var(--ref-voice-size-2)",
                    color: "var(--sys-energy-text-primary)",
                    fontWeight: "var(--ref-voice-weight-bold)",
                  }}
                >
                  992px
                </span>
              </div>
              {/* Max width marker */}
              <div
                style={{
                  position: "absolute",
                  top: "var(--ref-frame-height-control-xl)",
                  right: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--ref-frame-space-1)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--ref-voice-family-mono)",
                    fontSize: "var(--ref-voice-size-2)",
                    color: "var(--sys-energy-text-tertiary)",
                  }}
                >
                  max: 1440px
                </span>
              </div>
            </div>
          </div>

          {/* Breakpoint details */}
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
                    {["Name", "Value", "CSS Variable", "Transition", "Grid Tier"].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                          textAlign: "left",
                          fontSize: "var(--ref-voice-size-2)",
                          fontWeight: "var(--ref-voice-weight-bold)",
                          color: "var(--sys-energy-text-secondary)",
                          textTransform: "uppercase",
                          letterSpacing: "var(--ref-voice-letter-spacing-caps)",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {BREAKPOINTS.map((bp) => (
                    <tr
                      key={bp.name}
                      style={{ borderBottom: "1px solid var(--sys-energy-border-default)" }}
                    >
                      <td
                        style={{
                          padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                          fontWeight: "var(--ref-voice-weight-medium)",
                          color: "var(--sys-energy-text-primary)",
                          fontSize: "var(--ref-voice-size-4)",
                        }}
                      >
                        {bp.name}
                      </td>
                      <td
                        style={{
                          padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                          fontFamily: "var(--ref-voice-family-mono)",
                          fontSize: "var(--ref-voice-size-4)",
                          color: "var(--sys-energy-text-accent)",
                          fontWeight: "var(--ref-voice-weight-bold)",
                        }}
                      >
                        {bp.value}
                      </td>
                      <td
                        style={{
                          padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                          fontFamily: "var(--ref-voice-family-mono)",
                          fontSize: "var(--ref-voice-size-3)",
                          color: "var(--sys-energy-text-secondary)",
                        }}
                      >
                        {bp.cssVar}
                      </td>
                      <td
                        style={{
                          padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                          fontSize: "var(--ref-voice-size-4)",
                          color: "var(--sys-energy-text-secondary)",
                        }}
                      >
                        {bp.fromTo}
                      </td>
                      <td
                        style={{
                          padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                          fontFamily: "var(--ref-voice-family-mono)",
                          fontSize: "var(--ref-voice-size-3)",
                          color: "var(--sys-energy-text-accent)",
                        }}
                      >
                        {bp.gridTier}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Surface>

          {/* Content width constraints */}
          <Stack gap={3}>
            <Text role="overline">Content Width Constraints</Text>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(var(--ref-frame-space-32), 1fr))",
                gap: "var(--ref-frame-space-4)",
              }}
            >
              {[
                {
                  name: "Max",
                  value: "1440px",
                  token: "--ref-frame-content-max",
                  useCase: "Page layout",
                },
                {
                  name: "Prose Wide",
                  value: "840px",
                  token: "--sys-frame-content-prose-wide",
                  useCase: "Lead / intro text (breakpoint-responsive)",
                },
                {
                  name: "Prose",
                  value: "680px",
                  token: "--sys-frame-content-prose",
                  useCase: "Long-form text (breakpoint-responsive)",
                },
                {
                  name: "Narrow",
                  value: "640px",
                  token: "--sys-frame-content-narrow",
                  useCase: "Forms, centered (breakpoint-responsive)",
                },
                {
                  name: "Dialog",
                  value: "480px",
                  token: "--ref-frame-content-dialog",
                  useCase: "Modal dialogs",
                },
              ].map((cw) => (
                <Surface key={cw.name} padding={4} variant="secondary">
                  <Stack gap={1}>
                    <Text style={{ fontWeight: "var(--ref-voice-weight-medium)" }}>{cw.name}</Text>
                    <span
                      style={{
                        fontFamily: "var(--ref-voice-family-mono)",
                        fontSize: "var(--ref-voice-size-4)",
                        color: "var(--sys-energy-text-accent)",
                        fontWeight: "var(--ref-voice-weight-bold)",
                      }}
                    >
                      {cw.value}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--ref-voice-family-mono)",
                        fontSize: "var(--ref-voice-size-2)",
                        color: "var(--sys-energy-text-tertiary)",
                      }}
                    >
                      {cw.token}
                    </span>
                    <Text role="caption" color="secondary">
                      {cw.useCase}
                    </Text>
                  </Stack>
                </Surface>
              ))}
            </div>
          </Stack>
        </Stack>
      )}

      {/* ── Density Modes Tab ── */}
      {tab === "density" && (
        <Stack gap="component">
          <Text color="secondary">
            Density modes adapt spatial tokens (padding, gap, height) and grid specifications.
            Compact is for data-dense dashboards; Comfortable is for consumer-facing or
            touch-oriented UIs.
          </Text>

          {/* Frame density table */}
          <Stack gap={3}>
            <Text role="overline">Frame Tokens by Density</Text>
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
                      {["Token", "Compact", "Default", "Comfortable"].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            textAlign: "left",
                            fontSize: "var(--ref-voice-size-2)",
                            fontWeight: "var(--ref-voice-weight-bold)",
                            color: "var(--sys-energy-text-secondary)",
                            textTransform: "uppercase",
                            letterSpacing: "var(--ref-voice-letter-spacing-caps)",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DENSITY_FRAME_ROWS.map((row) => (
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
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: "var(--sys-energy-text-secondary)",
                          }}
                        >
                          {row.compact}
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: "var(--sys-energy-text-accent)",
                            fontWeight: "var(--ref-voice-weight-medium)",
                          }}
                        >
                          {row.defaultVal}
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: "var(--sys-energy-text-secondary)",
                          }}
                        >
                          {row.comfortable}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Surface>
          </Stack>

          {/* Grid density table */}
          <Stack gap={3}>
            <Text role="overline">Grid Tokens by Density</Text>
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
                      {["Token", "Compact", "Default", "Comfortable"].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            textAlign: "left",
                            fontSize: "var(--ref-voice-size-2)",
                            fontWeight: "var(--ref-voice-weight-bold)",
                            color: "var(--sys-energy-text-secondary)",
                            textTransform: "uppercase",
                            letterSpacing: "var(--ref-voice-letter-spacing-caps)",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DENSITY_GRID_ROWS.map((row) => (
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
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: "var(--sys-energy-text-secondary)",
                          }}
                        >
                          {row.compact}
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: "var(--sys-energy-text-accent)",
                            fontWeight: "var(--ref-voice-weight-medium)",
                          }}
                        >
                          {row.defaultVal}
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: "var(--sys-energy-text-secondary)",
                          }}
                        >
                          {row.comfortable}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Surface>
          </Stack>

          {/* Visual density comparison */}
          <Stack gap={3}>
            <Text role="overline">Visual Comparison</Text>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "var(--ref-frame-space-4)",
              }}
            >
              {(["compact", "default", "comfortable"] as const).map((density) => {
                const pad = density === "compact" ? "8px" : density === "default" ? "12px" : "16px";
                const gap = density === "compact" ? "8px" : density === "default" ? "12px" : "16px";
                const h = density === "compact" ? "32px" : density === "default" ? "40px" : "44px";
                const padVar = density === "compact" ? "var(--ref-frame-space-2)" : density === "default" ? "var(--ref-frame-space-3)" : "var(--ref-frame-space-4)";
                const gapVar = density === "compact" ? "var(--ref-frame-space-2)" : density === "default" ? "var(--ref-frame-space-3)" : "var(--ref-frame-space-4)";
                const hVar = density === "compact" ? "var(--ref-frame-space-8)" : density === "default" ? "var(--ref-frame-space-10)" : "var(--ref-frame-space-11)";
                return (
                  <Surface key={density} padding="control" variant="secondary">
                    <Stack gap={3}>
                      <span
                        style={{
                          fontSize: "var(--ref-voice-size-2)",
                          fontWeight: "var(--ref-voice-weight-bold)",
                          textTransform: "uppercase",
                          letterSpacing: "var(--ref-voice-letter-spacing-caps)",
                          color:
                            density === "default"
                              ? "var(--sys-energy-text-accent)"
                              : "var(--sys-energy-text-secondary)",
                          fontFamily: "var(--ref-voice-family-sans)",
                        }}
                      >
                        {density}
                      </span>
                      {/* Simulated form */}
                      <div style={{ display: "flex", flexDirection: "column", gap: gapVar }}>
                        <div
                          style={{
                            height: hVar,
                            borderRadius: "var(--ref-frame-radius-2)",
                            border: "1px solid var(--sys-energy-border-default)",
                            background: "var(--sys-energy-surface-primary)",
                            padding: `0 ${padVar}`,
                            display: "flex",
                            alignItems: "center",
                            fontSize: "var(--ref-voice-size-4)",
                            color: "var(--sys-energy-text-tertiary)",
                            fontFamily: "var(--ref-voice-family-sans)",
                          }}
                        >
                          Input field
                        </div>
                        <div
                          style={{
                            height: hVar,
                            borderRadius: "var(--ref-frame-radius-2)",
                            border: "1px solid var(--sys-energy-border-default)",
                            background: "var(--sys-energy-surface-primary)",
                            padding: `0 ${padVar}`,
                            display: "flex",
                            alignItems: "center",
                            fontSize: "var(--ref-voice-size-4)",
                            color: "var(--sys-energy-text-tertiary)",
                            fontFamily: "var(--ref-voice-family-sans)",
                          }}
                        >
                          Another field
                        </div>
                        <div
                          style={{
                            height: hVar,
                            borderRadius: "var(--ref-frame-radius-2)",
                            background: "var(--sys-energy-action-primary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "var(--ref-voice-size-4)",
                            color: "var(--sys-energy-text-on-action)",
                            fontFamily: "var(--ref-voice-family-sans)",
                            fontWeight: "var(--ref-voice-weight-medium)",
                          }}
                        >
                          Submit
                        </div>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--ref-voice-family-mono)",
                          fontSize: "var(--ref-voice-size-2)",
                          color: "var(--sys-energy-text-tertiary)",
                        }}
                      >
                        pad: {pad} / gap: {gap} / h: {h}
                      </span>
                    </Stack>
                  </Surface>
                );
              })}
            </div>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
