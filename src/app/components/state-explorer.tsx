/**
 * StateExplorer — Interactive state system explorer
 * ────────────────────────────────────────────────────────────
 * Visualizes FLOW's state architecture:
 * - 9-level precedence hierarchy (disabled → default)
 * - Interactive state compositor with live preview
 * - Component state coverage matrix
 * - State composition rules & visual resolution
 *
 * Embedded within the State foundation detail page.
 */
import { useState } from "react";

import { Divider, Inline, Stack, Surface, Text } from "@flow/primitives";

// ── Color constants ──
const AZURE = "#2F64F5";
const JADE = "#1DA470";
const CORAL = "#EF3535";

// ── State precedence data ──
interface StateLevel {
  name: string;
  rank: number;
  attribute: string;
  description: string;
  opacity: number;
  color: string;
}

const STATE_LEVELS: StateLevel[] = [
  {
    name: "disabled",
    rank: 1,
    attribute: 'data-state="disabled"',
    description: "Fully non-interactive, dimmed to 38% opacity",
    opacity: 0.38,
    color: "var(--sys-energy-content-primary, #9E9E9E)",
  },
  {
    name: "loading",
    rank: 2,
    attribute: 'data-state="loading"',
    description: "Awaiting async result, reduced to 60% opacity",
    opacity: 0.6,
    color: "var(--sys-energy-content-primary, #9E9E9E)",
  },
  {
    name: "error",
    rank: 3,
    attribute: 'data-state="error"',
    description: "Validation failure, coral left border accent",
    opacity: 1,
    color: CORAL,
  },
  {
    name: "success",
    rank: 4,
    attribute: 'data-state="success"',
    description: "Confirmed action, jade left border accent",
    opacity: 1,
    color: JADE,
  },
  {
    name: "readonly",
    rank: 5,
    attribute: 'data-state="readonly"',
    description: "Visible but non-editable, dimmed content",
    opacity: 0.7,
    color: "var(--sys-energy-content-primary, #9E9E9E)",
  },
  {
    name: "selected",
    rank: 6,
    attribute: 'data-state="selected"',
    description: "Active selection, azure tinted background",
    opacity: 1,
    color: AZURE,
  },
  {
    name: "pressed",
    rank: 7,
    attribute: 'data-state="pressed"',
    description: "Momentary activation, 12% dark overlay",
    opacity: 1,
    color: "var(--sys-energy-content-primary, #424242)",
  },
  {
    name: "focus",
    rank: 8,
    attribute: 'data-state="focus"',
    description: "Keyboard-focused, 2px azure ring",
    opacity: 1,
    color: AZURE,
  },
  {
    name: "hover",
    rank: 9,
    attribute: 'data-state="hover"',
    description: "Pointer resting, 8% light overlay",
    opacity: 1,
    color: "var(--sys-energy-content-primary, #757575)",
  },
  {
    name: "default",
    rank: 10,
    attribute: 'data-state="default"',
    description: "Resting idle appearance, no visual treatments",
    opacity: 1,
    color: "var(--sys-energy-content-primary, #424242)",
  },
];

// ── Coverage matrix data ──
interface ComponentRow {
  name: string;
  hover: boolean;
  focus: boolean;
  pressed: boolean;
  selected: boolean;
  disabled: boolean;
  loading: boolean;
  error: boolean;
  success: boolean;
}

const MATRIX_COLUMNS = [
  "hover",
  "focus",
  "pressed",
  "selected",
  "disabled",
  "loading",
  "error",
  "success",
] as const;

const COMPONENT_MATRIX: ComponentRow[] = [
  {
    name: "Button",
    hover: true,
    focus: true,
    pressed: true,
    selected: false,
    disabled: true,
    loading: true,
    error: false,
    success: false,
  },
  {
    name: "IconButton",
    hover: true,
    focus: true,
    pressed: true,
    selected: false,
    disabled: true,
    loading: true,
    error: false,
    success: false,
  },
  {
    name: "TextField",
    hover: true,
    focus: true,
    pressed: false,
    selected: false,
    disabled: true,
    loading: false,
    error: true,
    success: true,
  },
  {
    name: "Checkbox",
    hover: true,
    focus: true,
    pressed: false,
    selected: true,
    disabled: true,
    loading: false,
    error: true,
    success: false,
  },
  {
    name: "Radio",
    hover: true,
    focus: true,
    pressed: false,
    selected: true,
    disabled: true,
    loading: false,
    error: true,
    success: false,
  },
  {
    name: "Switch",
    hover: true,
    focus: true,
    pressed: false,
    selected: true,
    disabled: true,
    loading: true,
    error: false,
    success: false,
  },
  {
    name: "Select",
    hover: true,
    focus: true,
    pressed: false,
    selected: false,
    disabled: true,
    loading: false,
    error: true,
    success: true,
  },
  {
    name: "Slider",
    hover: true,
    focus: true,
    pressed: true,
    selected: false,
    disabled: true,
    loading: true,
    error: true,
    success: false,
  },
  {
    name: "Card",
    hover: true,
    focus: true,
    pressed: true,
    selected: true,
    disabled: true,
    loading: true,
    error: true,
    success: true,
  },
  {
    name: "Chip",
    hover: true,
    focus: true,
    pressed: true,
    selected: true,
    disabled: true,
    loading: true,
    error: true,
    success: true,
  },
  {
    name: "List",
    hover: true,
    focus: true,
    pressed: true,
    selected: true,
    disabled: true,
    loading: true,
    error: true,
    success: true,
  },
  {
    name: "Accordion",
    hover: true,
    focus: true,
    pressed: false,
    selected: false,
    disabled: true,
    loading: true,
    error: false,
    success: false,
  },
  {
    name: "Tab",
    hover: true,
    focus: true,
    pressed: false,
    selected: true,
    disabled: true,
    loading: false,
    error: false,
    success: false,
  },
  {
    name: "Pagination",
    hover: true,
    focus: true,
    pressed: true,
    selected: true,
    disabled: true,
    loading: true,
    error: false,
    success: false,
  },
  {
    name: "Stepper",
    hover: true,
    focus: true,
    pressed: true,
    selected: true,
    disabled: true,
    loading: true,
    error: true,
    success: false,
  },
];

// ── Composition rules ──
interface CompositionRule {
  states: [string, string];
  result: string;
  visual: string;
  additive: boolean;
}

const COMPOSITION_RULES: CompositionRule[] = [
  {
    states: ["selected", "hover"],
    result: "selected + hover overlay",
    visual: "Selected background with 8% hover overlay",
    additive: true,
  },
  {
    states: ["selected", "focus"],
    result: "selected + focus ring",
    visual: "Selected background with 2px azure ring",
    additive: true,
  },
  {
    states: ["error", "focus"],
    result: "error border + focus ring",
    visual: "Coral left border with 2px azure focus ring",
    additive: true,
  },
  {
    states: ["disabled", "anything"],
    result: "disabled only",
    visual: "Disabled wins — all other states suppressed",
    additive: false,
  },
  {
    states: ["loading", "anything"],
    result: "loading only (unless disabled)",
    visual: "Loading wins — except when disabled is active",
    additive: false,
  },
];

// ── Helpers ──
type StateName =
  | "disabled"
  | "loading"
  | "error"
  | "success"
  | "readonly"
  | "selected"
  | "pressed"
  | "focus"
  | "hover"
  | "default";
const STATE_ORDER: StateName[] = [
  "disabled",
  "loading",
  "error",
  "success",
  "readonly",
  "selected",
  "pressed",
  "focus",
  "hover",
  "default",
];

function resolveState(active: Record<StateName, boolean>): StateName {
  for (const s of STATE_ORDER) {
    if (active[s]) return s;
  }
  return "default";
}

function getMockStyle(active: Record<StateName, boolean>): React.CSSProperties {
  const resolved = resolveState(active);
  const base: React.CSSProperties = {
    padding: "var(--ref-frame-space-5, 20px) var(--ref-frame-space-8, 32px)",
    borderRadius: "var(--ref-frame-radius-2, 8px)",
    border: "2px solid transparent",
    borderLeft: "4px solid transparent",
    background: "var(--sys-energy-surface-secondary, #F5F5F5)",
    color: "var(--sys-energy-content-primary, #1A1A1A)",
    fontFamily: "var(--ref-voice-family-sans, system-ui)",
    fontSize: "var(--ref-voice-size-5, 16px)",
    fontWeight: "var(--ref-voice-weight-medium)",
    transition: "all var(--ref-momentum-duration-normal) var(--ref-momentum-easing-standard)",
    cursor: "default",
    minWidth: 280,
    textAlign: "center" as const,
  };

  if (resolved === "disabled") {
    base.opacity = 0.38;
    base.cursor = "not-allowed";
  } else if (resolved === "loading") {
    base.opacity = 0.6;
  } else if (resolved === "error") {
    base.borderLeft = `4px solid ${CORAL}`;
  } else if (resolved === "success") {
    base.borderLeft = `4px solid ${JADE}`;
  } else if (resolved === "readonly") {
    base.opacity = 0.7;
    base.cursor = "default";
  } else if (resolved === "selected") {
    base.background = `color-mix(in srgb, ${AZURE} 12%, var(--sys-energy-surface-secondary, #F5F5F5))`;
  } else if (resolved === "pressed") {
    base.background = `color-mix(in srgb, #000 12%, var(--sys-energy-surface-secondary, #F5F5F5))`;
  } else if (resolved === "focus") {
    base.border = `2px solid ${AZURE}`;
    base.outline = `2px solid color-mix(in srgb, ${AZURE} 40%, transparent)`;
    base.outlineOffset = "2px";
  } else if (resolved === "hover") {
    base.background = `color-mix(in srgb, #FFF 8%, var(--sys-energy-surface-secondary, #F5F5F5))`;
  }

  // Additive compositions for non-exclusive states
  if (resolved !== "disabled" && resolved !== "loading") {
    if (active.selected && active.hover && resolved === "selected") {
      base.background = `color-mix(in srgb, #FFF 8%, color-mix(in srgb, ${AZURE} 12%, var(--sys-energy-surface-secondary, #F5F5F5)))`;
    }
    if (active.selected && active.focus && resolved === "selected") {
      base.border = `2px solid ${AZURE}`;
      base.outlineOffset = "2px";
    }
    if (active.error && active.focus && resolved === "error") {
      base.border = `2px solid ${AZURE}`;
      base.outlineOffset = "2px";
    }
  }

  return base;
}

function getCompositionStyle(states: [string, string]): React.CSSProperties {
  const base: React.CSSProperties = {
    padding: "var(--ref-frame-space-4, 16px) var(--ref-frame-space-6, 24px)",
    borderRadius: "var(--ref-frame-radius-2, 8px)",
    border: "2px solid transparent",
    borderLeft: "4px solid transparent",
    background: "var(--sys-energy-surface-secondary, #F5F5F5)",
    fontFamily: "var(--ref-voice-family-sans, system-ui)",
    fontSize: "var(--ref-voice-size-5, 14px)",
    fontWeight: "var(--ref-voice-weight-medium)",
    minHeight: "var(--ref-frame-space-12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  if (states[0] === "selected" && states[1] === "hover") {
    base.background = `color-mix(in srgb, #FFF 8%, color-mix(in srgb, ${AZURE} 12%, var(--sys-energy-surface-secondary, #F5F5F5)))`;
  } else if (states[0] === "selected" && states[1] === "focus") {
    base.background = `color-mix(in srgb, ${AZURE} 12%, var(--sys-energy-surface-secondary, #F5F5F5))`;
    base.border = `2px solid ${AZURE}`;
  } else if (states[0] === "error" && states[1] === "focus") {
    base.borderLeft = `4px solid ${CORAL}`;
    base.border = `2px solid ${AZURE}`;
  } else if (states[0] === "disabled") {
    base.opacity = 0.38;
    base.cursor = "not-allowed";
  } else if (states[0] === "loading") {
    base.opacity = 0.6;
  }

  return base;
}

// ── Main component ──
export function StateExplorer() {
  const [active, setActive] = useState<Record<StateName, boolean>>({
    disabled: false,
    loading: false,
    error: false,
    success: false,
    readonly: false,
    selected: false,
    pressed: false,
    focus: false,
    hover: false,
    default: false,
  });

  const resolved = resolveState(active);
  const hasAnyActive = STATE_ORDER.some((s) => active[s]);

  function toggle(state: StateName) {
    setActive((prev) => ({ ...prev, [state]: !prev[state] }));
  }

  return (
    <Stack gap={10}>
      {/* ── Section 1: State Precedence ── */}
      <Stack gap={4}>
        <Text variant="display-l">State Precedence</Text>
        <Text variant="paragraph-l" style={{ color: "var(--sys-energy-content-secondary, #666)" }}>
          FLOW defines 9 mandatory interactive states resolved by strict precedence. When multiple
          states are active, the highest-ranked state determines the visual treatment.
        </Text>
        <Divider />
        <Stack gap={2}>
          {STATE_LEVELS.map((level, i) => (
            <div
              key={level.name}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--ref-frame-space-2) var(--ref-frame-space-4)",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "var(--ref-frame-space-7)",
                  height: "var(--ref-frame-space-7)",
                  borderRadius: "50%",
                  flexShrink: 0,
                  background:
                    i === 0
                      ? CORAL
                      : i === STATE_LEVELS.length - 1
                        ? "var(--sys-energy-surface-secondary, #E0E0E0)"
                        : `color-mix(in srgb, ${AZURE} ${100 - i * 10}%, var(--sys-energy-surface-secondary, #E0E0E0))`,
                  color:
                    i < 3
                      ? "var(--ref-energy-neutral-0)"
                      : "var(--sys-energy-content-primary, #1A1A1A)",
                  fontFamily: "var(--ref-voice-family-mono, monospace)",
                  fontSize: "var(--ref-voice-size-4, 12px)",
                  fontWeight: "var(--ref-voice-weight-bold)",
                }}
              >
                {level.rank}
              </span>
              <Text
                variant="label-l"
                style={{ minWidth: 64, fontWeight: "var(--ref-voice-weight-semibold)" }}
              >
                {level.name}
              </Text>
              <code
                style={{
                  fontFamily: "var(--ref-voice-family-mono, monospace)",
                  fontSize: "var(--ref-voice-size-4, 12px)",
                  padding: "var(--ref-frame-space-micro) var(--ref-frame-space-2)",
                  borderRadius: "var(--ref-frame-radius-1)",
                  background: "var(--sys-energy-surface-secondary, #F0F0F0)",
                  color: "var(--sys-energy-content-secondary, #555)",
                }}
              >
                {level.attribute}
              </code>
              <Text
                variant="paragraph-s"
                style={{
                  color: "var(--sys-energy-content-secondary, #666)",
                  flex: 1,
                  minWidth: 120,
                }}
              >
                {level.description}
              </Text>
              <span
                style={{
                  display: "inline-block",
                  width: "var(--ref-frame-space-8)",
                  height: "var(--ref-frame-space-2)",
                  borderRadius: "var(--ref-frame-radius-1)",
                  background: level.color,
                  opacity: level.opacity,
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </Stack>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--ref-frame-space-1) var(--ref-frame-space-2)",
            alignItems: "center",
            marginTop: "var(--ref-frame-space-2, 8px)",
            color: "var(--sys-energy-content-tertiary, #999)",
            fontFamily: "var(--ref-voice-family-mono, monospace)",
            fontSize: "var(--ref-voice-size-4, 12px)",
          }}
        >
          <span>disabled</span>
          <span style={{ opacity: 0.4 }}>&gt;</span>
          <span>loading</span>
          <span style={{ opacity: 0.4 }}>&gt;</span>
          <span>error</span>
          <span style={{ opacity: 0.4 }}>&gt;</span>
          <span>success</span>
          <span style={{ opacity: 0.4 }}>&gt;</span>
          <span>readonly</span>
          <span style={{ opacity: 0.4 }}>&gt;</span>
          <span>selected</span>
          <span style={{ opacity: 0.4 }}>&gt;</span>
          <span>pressed</span>
          <span style={{ opacity: 0.4 }}>&gt;</span>
          <span>focus</span>
          <span style={{ opacity: 0.4 }}>&gt;</span>
          <span>hover</span>
          <span style={{ opacity: 0.4 }}>&gt;</span>
          <span>default</span>
        </div>
      </Stack>

      {/* ── Section 2: Interactive State Compositor ── */}
      <Stack gap={4}>
        <Text variant="display-l">Interactive State Compositor</Text>
        <Text variant="paragraph-l" style={{ color: "var(--sys-energy-content-secondary, #666)" }}>
          Toggle states to see how they resolve visually. The highest-precedence active state wins.
        </Text>
        <Divider />
        <Inline gap={8} style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
          <Stack gap={3} style={{ minWidth: 240 }}>
            <Text
              variant="label-l"
              style={{
                fontWeight: "var(--ref-voice-weight-semibold)",
                marginBottom: "var(--ref-frame-space-1)",
              }}
            >
              Active States
            </Text>
            {STATE_ORDER.map((state) => (
              <label
                key={state}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--ref-frame-space-2)",
                  cursor: "pointer",
                  fontFamily: "var(--ref-voice-family-sans, system-ui)",
                  fontSize: "var(--ref-voice-size-5, 14px)",
                  color: active[state]
                    ? "var(--sys-energy-content-primary, #1A1A1A)"
                    : "var(--sys-energy-content-secondary, #888)",
                }}
              >
                <input
                  type="checkbox"
                  checked={active[state]}
                  onChange={() => toggle(state)}
                  style={{
                    accentColor: AZURE,
                    width: "var(--ref-frame-space-4)",
                    height: "var(--ref-frame-space-4)",
                  }}
                />
                <span
                  style={{ fontWeight: active[state] ? "var(--ref-voice-weight-semibold)" : 400 }}
                >
                  {state}
                </span>
              </label>
            ))}
          </Stack>
          <Stack
            gap={4}
            style={{
              flex: 1,
              minWidth: 200,
              alignItems: "center",
              justifyContent: "center",
              minHeight: 200,
            }}
          >
            <div style={getMockStyle(active)}>
              {resolved === "loading" ? "Loading..." : "Sample Component"}
            </div>
            <Surface
              style={{
                padding: "var(--ref-frame-space-3, 12px) var(--ref-frame-space-5, 20px)",
                borderRadius: "var(--ref-frame-radius-2, 8px)",
                textAlign: "center",
              }}
            >
              <Inline gap={3} style={{ alignItems: "center", justifyContent: "center" }}>
                <Text
                  variant="label-s"
                  style={{ color: "var(--sys-energy-content-secondary, #888)" }}
                >
                  Resolved State:
                </Text>
                <code
                  style={{
                    fontFamily: "var(--ref-voice-family-mono, monospace)",
                    fontSize: "var(--ref-voice-size-5, 14px)",
                    fontWeight: "var(--ref-voice-weight-bold)",
                    color: resolved === "error" ? CORAL : resolved === "success" ? JADE : AZURE,
                  }}
                >
                  {hasAnyActive ? resolved : "default"}
                </code>
              </Inline>
              <Text
                variant="paragraph-s"
                style={{
                  color: "var(--sys-energy-content-tertiary, #999)",
                  fontFamily: "var(--ref-voice-family-mono, monospace)",
                  marginTop: "var(--ref-frame-space-1)",
                }}
              >
                {`data-state="${hasAnyActive ? resolved : "default"}"`}
              </Text>
            </Surface>
          </Stack>
        </Inline>
      </Stack>

      {/* ── Section 3: Component State Coverage Matrix ── */}
      <Stack gap={4}>
        <Text variant="display-l">Component State Coverage Matrix</Text>
        <Text variant="paragraph-l" style={{ color: "var(--sys-energy-content-secondary, #666)" }}>
          Not every component implements all 9 states. This matrix shows which states each component
          supports.
        </Text>
        <Divider />
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: "var(--ref-voice-family-sans, system-ui)",
              fontSize: "var(--ref-voice-size-5, 14px)",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "left",
                    padding: "var(--ref-frame-space-3, 12px)",
                    borderBottom: "2px solid var(--sys-energy-border-default, #E0E0E0)",
                    color: "var(--sys-energy-content-secondary, #666)",
                    fontWeight: "var(--ref-voice-weight-semibold)",
                  }}
                >
                  Component
                </th>
                {MATRIX_COLUMNS.map((col) => (
                  <th
                    key={col}
                    style={{
                      textAlign: "center",
                      padding: "var(--ref-frame-space-3, 12px)",
                      borderBottom: "2px solid var(--sys-energy-border-default, #E0E0E0)",
                      color: "var(--sys-energy-content-secondary, #666)",
                      fontWeight: "var(--ref-voice-weight-semibold)",
                      textTransform: "capitalize",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPONENT_MATRIX.map((row, i) => (
                <tr
                  key={row.name}
                  style={{
                    background:
                      i % 2 === 0 ? "transparent" : "var(--sys-energy-surface-secondary, #FAFAFA)",
                  }}
                >
                  <td
                    style={{
                      padding: "var(--ref-frame-space-2, 8px) var(--ref-frame-space-3, 12px)",
                      fontWeight: "var(--ref-voice-weight-medium)",
                      color: "var(--sys-energy-content-primary, #1A1A1A)",
                      borderBottom: "1px solid var(--sys-energy-border-default, #F0F0F0)",
                    }}
                  >
                    {row.name}
                  </td>
                  {MATRIX_COLUMNS.map((col) => (
                    <td
                      key={col}
                      style={{
                        textAlign: "center",
                        padding: "var(--ref-frame-space-2, 8px) var(--ref-frame-space-3, 12px)",
                        borderBottom: "1px solid var(--sys-energy-border-default, #F0F0F0)",
                        fontSize: "var(--ref-voice-size-5, 16px)",
                        color: row[col] ? JADE : "var(--sys-energy-content-tertiary, #CCC)",
                        fontWeight: row[col] ? "var(--ref-voice-weight-bold)" : 400,
                      }}
                    >
                      {row[col] ? "\u2713" : "\u2014"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Stack>

      {/* ── Section 4: State Composition Rules ── */}
      <Stack gap={4}>
        <Text variant="display-l">State Composition Rules</Text>
        <Text variant="paragraph-l" style={{ color: "var(--sys-energy-content-secondary, #666)" }}>
          Some states compose additively, layering their visual treatments. Others are exclusive and
          suppress all lower-precedence states.
        </Text>
        <Divider />
        <Stack gap={4}>
          {COMPOSITION_RULES.map((rule, i) => (
            <Surface
              key={i}
              style={{
                padding: "var(--ref-frame-space-4, 16px)",
                borderRadius: "var(--ref-frame-radius-2, 8px)",
                border: "1px solid var(--sys-energy-border-default, #E0E0E0)",
              }}
            >
              <Inline gap={6} style={{ alignItems: "center", flexWrap: "wrap" }}>
                <div style={getCompositionStyle(rule.states)}>
                  <Inline gap={2} style={{ alignItems: "center" }}>
                    <span
                      style={{
                        padding: "var(--ref-frame-space-micro) var(--ref-frame-space-2)",
                        borderRadius: "var(--ref-frame-radius-1)",
                        fontSize: "var(--ref-voice-size-4, 12px)",
                        fontFamily: "var(--ref-voice-family-mono, monospace)",
                        background: `color-mix(in srgb, ${AZURE} 15%, transparent)`,
                        color: AZURE,
                        fontWeight: "var(--ref-voice-weight-semibold)",
                      }}
                    >
                      {rule.states[0]}
                    </span>
                    <span
                      style={{
                        color: "var(--sys-energy-content-tertiary, #999)",
                        fontSize: "var(--ref-voice-size-3)",
                      }}
                    >
                      +
                    </span>
                    <span
                      style={{
                        padding: "var(--ref-frame-space-micro) var(--ref-frame-space-2)",
                        borderRadius: "var(--ref-frame-radius-1)",
                        fontSize: "var(--ref-voice-size-4, 12px)",
                        fontFamily: "var(--ref-voice-family-mono, monospace)",
                        background: `color-mix(in srgb, ${AZURE} 15%, transparent)`,
                        color: AZURE,
                        fontWeight: "var(--ref-voice-weight-semibold)",
                      }}
                    >
                      {rule.states[1]}
                    </span>
                  </Inline>
                </div>
                <Stack gap={1} style={{ flex: 1 }}>
                  <Inline gap={2} style={{ alignItems: "center" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "var(--ref-frame-border-thin) var(--ref-frame-space-1)",
                        borderRadius: "var(--ref-frame-radius-1)",
                        fontSize: "var(--ref-voice-size-3, 11px)",
                        fontWeight: "var(--ref-voice-weight-semibold)",
                        textTransform: "uppercase",
                        letterSpacing: "var(--ref-voice-letter-spacing-caps)",
                        background: rule.additive
                          ? `color-mix(in srgb, ${JADE} 15%, transparent)`
                          : `color-mix(in srgb, ${CORAL} 15%, transparent)`,
                        color: rule.additive ? JADE : CORAL,
                      }}
                    >
                      {rule.additive ? "Additive" : "Exclusive"}
                    </span>
                    <Text
                      variant="label-l"
                      style={{ fontWeight: "var(--ref-voice-weight-semibold)" }}
                    >
                      {rule.result}
                    </Text>
                  </Inline>
                  <Text
                    variant="paragraph-s"
                    style={{ color: "var(--sys-energy-content-secondary, #666)" }}
                  >
                    {rule.visual}
                  </Text>
                </Stack>
              </Inline>
            </Surface>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
