/**
 * DepthExplorer — Interactive shadow & elevation explorer
 * ─────────────────────────────────────────────────────────
 * Visualizes FLOW's recalibrated depth system:
 * - 5-step numeric elevation scale (0-4)
 * - 3 Figma Edenred semantic aliases (Light / Medium / High)
 * - Navy blue branded shadow color (#101A77)
 * - Spread values, blur/offset comparison, token trace
 *
 * Embedded within the Depth foundation detail page.
 */
import { useState } from "react";

import { Divider, Inline, Stack, Surface, Text } from "../primitives";

// ── Shadow level data ──────────────────────────────────
interface ShadowLevel {
  level: number;
  name: string;
  figmaName: string | null;
  semanticAlias: string | null;
  useCase: string;
  refToken: string;
  cssVar: string;
  semanticCssVar: string | null;
  offsetY: string;
  blur: string;
  spread: string;
  opacity: string;
}

const SHADOW_LEVELS: ShadowLevel[] = [
  {
    level: 0,
    name: "Canvas",
    figmaName: null,
    semanticAlias: null,
    useCase: "Base plane, page backgrounds",
    refToken: "ref.depth.shadow.0",
    cssVar: "--sys-depth-elevation-0",
    semanticCssVar: null,
    offsetY: "0",
    blur: "0",
    spread: "0",
    opacity: "0%",
  },
  {
    level: 1,
    name: "Raised",
    figmaName: "Light",
    semanticAlias: "sys.depth.elevation.light",
    useCase: "Cards, list items, table rows",
    refToken: "ref.depth.shadow.1",
    cssVar: "--sys-depth-elevation-1",
    semanticCssVar: "--sys-depth-elevation-light",
    offsetY: "1px",
    blur: "3px",
    spread: "0",
    opacity: "6%",
  },
  {
    level: 2,
    name: "Floating",
    figmaName: "Medium",
    semanticAlias: "sys.depth.elevation.medium",
    useCase: "Dropdowns, popovers, menus",
    refToken: "ref.depth.shadow.2",
    cssVar: "--sys-depth-elevation-2",
    semanticCssVar: "--sys-depth-elevation-medium",
    offsetY: "4px",
    blur: "12px",
    spread: "4px",
    opacity: "8%",
  },
  {
    level: 3,
    name: "Overlay",
    figmaName: "High",
    semanticAlias: "sys.depth.elevation.high",
    useCase: "Dialogs, bottom sheets, overlays",
    refToken: "ref.depth.shadow.3",
    cssVar: "--sys-depth-elevation-3",
    semanticCssVar: "--sys-depth-elevation-high",
    offsetY: "10px",
    blur: "32px",
    spread: "6px",
    opacity: "12%",
  },
  {
    level: 4,
    name: "Critical",
    figmaName: null,
    semanticAlias: null,
    useCase: "Toasts, urgent notifications",
    refToken: "ref.depth.shadow.4",
    cssVar: "--sys-depth-elevation-4",
    semanticCssVar: null,
    offsetY: "20px",
    blur: "56px",
    spread: "8px",
    opacity: "16%",
  },
];

// ── Dark shadow data — parallel to SHADOW_LEVELS, with boosted opacities for dark surfaces ──
interface DarkShadowLevel {
  level: number;
  refToken: string;
  cssVar: string;
  offsetY: string;
  blur: string;
  spread: string;
  primaryOpacity: string;
  secondaryOpacity: string;
  color: string;
}

const DARK_SHADOW_LEVELS: DarkShadowLevel[] = [
  { level: 1, refToken: "ref.depth.shadow.dark-1", cssVar: "--ref-depth-shadow-dark-1", offsetY: "1px", blur: "3px", spread: "0", primaryOpacity: "35%", secondaryOpacity: "24%", color: "rgba(0, 0, 0, ...)" },
  { level: 2, refToken: "ref.depth.shadow.dark-2", cssVar: "--ref-depth-shadow-dark-2", offsetY: "4px", blur: "12px", spread: "4px", primaryOpacity: "35%", secondaryOpacity: "24%", color: "rgba(0, 0, 0, ...)" },
  { level: 3, refToken: "ref.depth.shadow.dark-3", cssVar: "--ref-depth-shadow-dark-3", offsetY: "10px", blur: "32px", spread: "6px", primaryOpacity: "40%", secondaryOpacity: "24%", color: "rgba(0, 0, 0, ...)" },
  { level: 4, refToken: "ref.depth.shadow.dark-4", cssVar: "--ref-depth-shadow-dark-4", offsetY: "20px", blur: "56px", spread: "8px", primaryOpacity: "48%", secondaryOpacity: "30%", color: "rgba(0, 0, 0, ...)" },
];

// ── Z-Index data ──
interface ZLevel {
  name: string;
  value: number;
  token: string;
  useCase: string;
}

const Z_LEVELS: ZLevel[] = [
  { name: "Base", value: 0, token: "ref.depth.zIndex.base", useCase: "Default stacking" },
  {
    name: "Content",
    value: 1,
    token: "ref.depth.zIndex.content",
    useCase: "Elevated content regions",
  },
  {
    name: "Dropdown",
    value: 100,
    token: "ref.depth.zIndex.dropdown",
    useCase: "Popovers, menus, tooltips",
  },
  {
    name: "Sticky",
    value: 200,
    token: "ref.depth.zIndex.sticky",
    useCase: "Sticky headers, floating toolbars",
  },
  {
    name: "Overlay",
    value: 1000,
    token: "ref.depth.zIndex.overlay",
    useCase: "Modal backdrops, overlays",
  },
  {
    name: "Modal",
    value: 1001,
    token: "ref.depth.zIndex.modal",
    useCase: "Dialogs, bottom sheets",
  },
  { name: "Toast", value: 1100, token: "ref.depth.zIndex.toast", useCase: "Toast notifications" },
];

// ── Gap analysis data ──
interface GapItem {
  gap: string;
  before: string;
  after: string;
  status: "resolved" | "info";
}

const GAPS: GapItem[] = [
  {
    gap: "Shadow color: generic black",
    before: "rgba(0, 0, 0, ...)",
    after: "rgba(16, 26, 119, ...) — navy blue branded",
    status: "resolved",
  },
  {
    gap: "Missing spread values",
    before: "No spread on any level",
    after: "4px (L2), 6px (L3), 8px (L4) spread",
    status: "resolved",
  },
  {
    gap: "Blur under-scaled",
    before: "8px max blur (L2), 24px (L3)",
    after: "12px (L2), 32px (L3), 56px (L4)",
    status: "resolved",
  },
  {
    gap: "Offset-Y under-scaled",
    before: "4px (L2), 8px (L3)",
    after: "4px (L2), 10px (L3), 20px (L4)",
    status: "resolved",
  },
  {
    gap: "No Figma semantic aliases",
    before: "Only numeric 0-4 scale",
    after: "sys.depth.elevation.{light,medium,high}",
    status: "resolved",
  },
  {
    gap: "Dark theme opacity too low",
    before: "0.20 / 0.15 (L1 dark)",
    after: "0.35 / 0.24 (L1) → 0.48 / 0.30 (L4) — boosted for dark surface visibility",
    status: "resolved",
  },
];

type Tab = "visual" | "tokens" | "gaps" | "z-index";

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

// ── Shadow card (visual demo) ──
function ShadowCard({
  level,
  selected,
  onClick,
}: {
  level: ShadowLevel;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "var(--ref-frame-space-6)",
        borderRadius: "var(--ref-frame-radius-3)",
        background: "var(--sys-energy-surface-primary)",
        border: selected
          ? "2px solid var(--sys-energy-border-focus)"
          : "1px solid var(--sys-energy-border-default)",
        boxShadow: level.level > 0 ? `var(${level.cssVar})` : "none",
        cursor: "pointer",
        textAlign: "left" as const,
        minHeight: "120px",
        display: "flex",
        flexDirection: "column" as const,
        gap: "var(--ref-frame-space-2)",
        transition:
          "box-shadow var(--ref-momentum-duration-normal) var(--ref-momentum-easing-standard)",
        fontFamily: "var(--ref-voice-family-sans)",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--ref-frame-space-2)",
        }}
      >
        <span
          style={{
            width: "var(--ref-frame-space-7)",
            height: "var(--ref-frame-space-7)",
            borderRadius: "var(--ref-frame-radius-2)",
            background: level.figmaName
              ? "var(--sys-energy-surface-accent)"
              : "var(--sys-energy-surface-tertiary)",
            color: level.figmaName
              ? "var(--sys-energy-text-accent)"
              : "var(--sys-energy-text-tertiary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "var(--ref-voice-size-5)",
            fontWeight: "var(--ref-voice-weight-bold)",
          }}
        >
          {level.level}
        </span>
        <span
          style={{
            fontSize: "var(--ref-voice-size-6)",
            fontWeight: "var(--ref-voice-weight-semibold)",
            color: "var(--sys-energy-text-primary)",
          }}
        >
          {level.name}
        </span>
      </span>
      {level.figmaName && (
        <span
          style={{
            fontSize: "var(--ref-voice-size-3)",
            fontWeight: "var(--ref-voice-weight-medium)",
            color: "var(--sys-energy-text-accent)",
            background: "var(--sys-energy-surface-accent)",
            padding: "var(--ref-frame-space-micro) var(--ref-frame-space-2)",
            borderRadius: "var(--ref-frame-radius-full)",
            display: "inline-block",
            width: "fit-content",
          }}
        >
          Figma: {level.figmaName}
        </span>
      )}
      <span
        style={{
          fontSize: "var(--ref-voice-size-4)",
          color: "var(--sys-energy-text-secondary)",
          marginTop: "auto",
        }}
      >
        {level.useCase}
      </span>
    </button>
  );
}

// ── Detail panel ──
function DetailPanel({ level }: { level: ShadowLevel }) {
  const rows = [
    { label: "Offset-Y", value: level.offsetY },
    { label: "Blur", value: level.blur },
    { label: "Spread", value: level.spread },
    { label: "Primary opacity", value: level.opacity },
    { label: "Shadow color", value: level.level === 0 ? "none" : "rgba(16, 26, 119, ...)" },
  ];

  return (
    <Surface padding="container" variant="secondary">
      <Stack gap={4}>
        <Inline gap={3}>
          <Text role="heading-m" style={{ margin: 0 }}>
            Level {level.level} — {level.name}
          </Text>
          {level.figmaName && (
            <span
              style={{
                fontSize: "var(--ref-voice-size-3)",
                color: "var(--sys-energy-text-accent)",
                background: "var(--sys-energy-surface-accent)",
                padding: "var(--ref-frame-space-micro) var(--ref-frame-space-2)",
                borderRadius: "var(--ref-frame-radius-full)",
                fontWeight: "var(--ref-voice-weight-medium)",
                fontFamily: "var(--ref-voice-family-sans)",
              }}
            >
              Figma: {level.figmaName}
            </span>
          )}
        </Inline>

        {/* Anatomy bars */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "var(--ref-frame-space-24) 1fr var(--ref-frame-space-20)",
            gap: "var(--ref-frame-space-2)",
            alignItems: "center",
          }}
        >
          {rows.map((r) => (
            <div key={r.label} style={{ display: "contents" }}>
              <Text role="caption" color="secondary">
                {r.label}
              </Text>
              <div
                style={{
                  height: "var(--ref-frame-space-1)",
                  borderRadius: "var(--ref-frame-radius-full)",
                  background: "var(--sys-energy-surface-accent)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: "var(--ref-frame-radius-full)",
                    background: "var(--sys-energy-action-primary)",
                    width:
                      level.level === 0
                        ? "0%"
                        : `${Math.min(100, (parseFloat(r.value) / 60) * 100)}%`,
                    transition:
                      "width var(--ref-momentum-duration-normal) var(--ref-momentum-easing-standard)",
                  }}
                />
              </div>
              <Text role="code" style={{ textAlign: "right", fontSize: "var(--ref-voice-size-3)" }}>
                {r.value}
              </Text>
            </div>
          ))}
        </div>

        <Divider spacing={0} />

        {/* Token trace */}
        <Stack gap={2}>
          <Text role="overline">Token Trace</Text>
          <div
            style={{
              fontFamily: "var(--ref-voice-family-mono)",
              fontSize: "var(--ref-voice-size-3)",
              lineHeight: 1.8,
              color: "var(--sys-energy-text-secondary)",
            }}
          >
            <div>
              <span style={{ color: "var(--sys-energy-text-tertiary)" }}>ref:</span>{" "}
              {level.refToken}
            </div>
            <div>
              <span style={{ color: "var(--sys-energy-text-tertiary)" }}>sys:</span> {level.cssVar}
            </div>
            {level.semanticCssVar && (
              <div>
                <span style={{ color: "var(--sys-energy-text-accent)" }}>alias:</span>{" "}
                <span style={{ color: "var(--sys-energy-text-accent)" }}>
                  {level.semanticCssVar}
                </span>
              </div>
            )}
          </div>
        </Stack>
      </Stack>
    </Surface>
  );
}

// ── Main explorer ──
export function DepthExplorer() {
  const [tab, setTab] = useState<Tab>("visual");
  const [selectedLevel, setSelectedLevel] = useState(2);

  return (
    <Stack gap="component">
      <Divider spacing={0} />

      <Stack gap={2}>
        <Text role="overline">Interactive Explorer</Text>
        <Text role="heading-l">Depth System</Text>
        <Text color="secondary">
          { }
          Recalibrated shadow scale with navy blue branded color, positive spread values, and
          semantic aliases mapped to Figma Edenred&apos;s Light / Medium / High levels.
        </Text>
      </Stack>

      {/* Tab bar */}
      <Inline gap={2} wrap>
        <TabButton label="Visual Demo" active={tab === "visual"} onClick={() => setTab("visual")} />
        <TabButton
          label="Token Reference"
          active={tab === "tokens"}
          onClick={() => setTab("tokens")}
        />
        <TabButton label="Gap Analysis" active={tab === "gaps"} onClick={() => setTab("gaps")} />
        <TabButton
          label="Z-Index Scale"
          active={tab === "z-index"}
          onClick={() => setTab("z-index")}
        />
      </Inline>

      {/* ── Visual Demo Tab ── */}
      {tab === "visual" && (
        <Stack gap="component">
          {/* Shadow cards on subtle background */}
          <div
            style={{
              background: "var(--sys-energy-surface-sunken)",
              borderRadius: "var(--ref-frame-radius-4)",
              padding: "var(--ref-frame-space-8)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "var(--ref-frame-space-6)",
              }}
            >
              {SHADOW_LEVELS.map((level) => (
                <ShadowCard
                  key={level.level}
                  level={level}
                  selected={selectedLevel === level.level}
                  onClick={() => setSelectedLevel(level.level)}
                />
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <DetailPanel level={SHADOW_LEVELS[selectedLevel]} />

          {/* Side-by-side: Light vs Dark comparison */}
          <Stack gap={3}>
            <Text role="overline">Theme Comparison</Text>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--ref-frame-space-4)",
                borderRadius: "var(--ref-frame-radius-3)",
                overflow: "hidden",
              }}
            >
              {/* Light side — forced light theme */}
              <div
                data-theme="light"
                style={{
                  background: "var(--sys-energy-surface-cold-white)",
                  padding: "var(--ref-frame-space-8)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--ref-frame-space-3)",
                }}
              >
                <span
                  style={{
                    fontSize: "var(--ref-voice-size-3)",
                    fontWeight: "var(--ref-voice-weight-medium)",
                    color: "var(--sys-energy-text-secondary)",
                    fontFamily: "var(--ref-voice-family-sans)",
                  }}
                >
                  Light Theme
                </span>
                <div
                  style={{
                    width: "var(--ref-frame-space-40)",
                    height: "var(--ref-frame-space-24)",
                    borderRadius: "var(--ref-frame-radius-3)",
                    background: "var(--sys-energy-surface-primary)",
                    boxShadow:
                      SHADOW_LEVELS[selectedLevel].level > 0
                        ? `var(--sys-depth-elevation-${selectedLevel})`
                        : "none",
                    border: "1px solid var(--sys-energy-border-default)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--ref-voice-size-4)",
                    color: "var(--sys-energy-text-secondary)",
                    fontFamily: "var(--ref-voice-family-mono)",
                  }}
                >
                  Level {selectedLevel}
                </div>
                <span
                  style={{
                    fontSize: "var(--ref-voice-size-2)",
                    color: "var(--sys-energy-text-tertiary)",
                    fontFamily: "var(--ref-voice-family-mono)",
                  }}
                >
                  rgba(16, 26, 119, ...)
                </span>
              </div>
              {/* Dark side — forced dark theme */}
              <div
                data-theme="dark"
                style={{
                  background: "var(--sys-energy-surface-cold-white)",
                  padding: "var(--ref-frame-space-8)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--ref-frame-space-3)",
                }}
              >
                <span
                  style={{
                    fontSize: "var(--ref-voice-size-3)",
                    fontWeight: "var(--ref-voice-weight-medium)",
                    color: "var(--sys-energy-text-secondary)",
                    fontFamily: "var(--ref-voice-family-sans)",
                  }}
                >
                  Dark Theme
                </span>
                <div
                  style={{
                    width: "var(--ref-frame-space-40)",
                    height: "var(--ref-frame-space-24)",
                    borderRadius: "var(--ref-frame-radius-3)",
                    background: "var(--sys-energy-surface-primary)",
                    boxShadow:
                      selectedLevel > 0 ? `var(--sys-depth-elevation-${selectedLevel})` : "none",
                    border: "1px solid var(--sys-energy-border-default)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--ref-voice-size-4)",
                    color: "var(--sys-energy-text-secondary)",
                    fontFamily: "var(--ref-voice-family-mono)",
                  }}
                >
                  Level {selectedLevel}
                </div>
                <span
                  style={{
                    fontSize: "var(--ref-voice-size-2)",
                    color: "var(--sys-energy-text-tertiary)",
                    fontFamily: "var(--ref-voice-family-mono)",
                  }}
                >
                  rgba(0, 0, 0, ...)
                </span>
              </div>
            </div>
          </Stack>
        </Stack>
      )}

      {/* ── Token Reference Tab ── */}
      {tab === "tokens" && (
        <Stack gap="component">
          {/* ref tokens table */}
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
                    {["Level", "Ref Token", "Offset-Y", "Blur", "Spread", "Opacity", "Color"].map(
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
                  {SHADOW_LEVELS.map((level) => (
                    <tr
                      key={level.level}
                      style={{ borderBottom: "1px solid var(--sys-energy-border-default)" }}
                    >
                      <td style={{ padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "var(--ref-frame-space-6)",
                            height: "var(--ref-frame-space-6)",
                            borderRadius: "var(--ref-frame-radius-2)",
                            background: level.figmaName
                              ? "var(--sys-energy-surface-accent)"
                              : "var(--sys-energy-surface-tertiary)",
                            color: level.figmaName
                              ? "var(--sys-energy-text-accent)"
                              : "var(--sys-energy-text-tertiary)",
                            fontSize: "var(--ref-voice-size-3)",
                            fontWeight: "var(--ref-voice-weight-bold)",
                          }}
                        >
                          {level.level}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                          fontFamily: "var(--ref-voice-family-mono)",
                          fontSize: "var(--ref-voice-size-3)",
                          color: "var(--sys-energy-text-primary)",
                        }}
                      >
                        {level.refToken}
                      </td>
                      <td
                        style={{
                          padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                          fontSize: "var(--ref-voice-size-4)",
                          color: "var(--sys-energy-text-primary)",
                        }}
                      >
                        {level.offsetY}
                      </td>
                      <td
                        style={{
                          padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                          fontSize: "var(--ref-voice-size-4)",
                          color: "var(--sys-energy-text-primary)",
                        }}
                      >
                        {level.blur}
                      </td>
                      <td
                        style={{
                          padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                          fontSize: "var(--ref-voice-size-4)",
                          color: "var(--sys-energy-text-primary)",
                        }}
                      >
                        {level.spread !== "0" ? (
                          <span
                            style={{
                              color: "var(--sys-energy-text-accent)",
                              fontWeight: "var(--ref-voice-weight-medium)",
                            }}
                          >
                            {level.spread}
                          </span>
                        ) : (
                          level.spread
                        )}
                      </td>
                      <td
                        style={{
                          padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                          fontSize: "var(--ref-voice-size-4)",
                          color: "var(--sys-energy-text-primary)",
                        }}
                      >
                        {level.opacity}
                      </td>
                      <td style={{ padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)" }}>
                        {level.level > 0 ? (
                          <Inline gap={2}>
                            <span
                              style={{
                                width: "var(--ref-frame-space-4)",
                                height: "var(--ref-frame-space-4)",
                                borderRadius: "var(--ref-frame-radius-1)",
                                background: "rgba(var(--ref-depth-shadow-color-rgb), 0.3)",
                                border: "1px solid var(--sys-energy-border-default)",
                                display: "inline-block",
                              }}
                            />
                            <Text role="code" style={{ fontSize: "var(--ref-voice-size-2)" }}>
                              #101A77
                            </Text>
                          </Inline>
                        ) : (
                          <Text role="caption" color="tertiary">
                            none
                          </Text>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Surface>

          {/* Semantic aliases */}
          <Stack gap={3}>
            <Text role="overline">Semantic Aliases (Figma Edenred)</Text>
            <Surface padding="container">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "var(--ref-frame-space-4)",
                }}
              >
                {SHADOW_LEVELS.filter((l) => l.semanticAlias).map((level) => (
                  <div
                    key={level.level}
                    style={{
                      padding: "var(--ref-frame-space-4)",
                      borderRadius: "var(--ref-frame-radius-2)",
                      background: "var(--sys-energy-surface-accent)",
                      border: "1px solid var(--sys-energy-border-accent)",
                    }}
                  >
                    <Stack gap={2}>
                      <Text
                        role="caption"
                        color="accent"
                        style={{ fontWeight: "var(--ref-voice-weight-bold)" }}
                      >
                        {level.figmaName}
                      </Text>
                      <Text role="code" style={{ fontSize: "var(--ref-voice-size-2)" }}>
                        {level.semanticCssVar}
                      </Text>
                      <Text
                        role="caption"
                        color="secondary"
                        style={{ fontSize: "var(--ref-voice-size-2)" }}
                      >
                        Maps to level {level.level} ({level.name})
                      </Text>
                    </Stack>
                  </div>
                ))}
              </div>
            </Surface>
          </Stack>

          {/* Dark theme tokens — full table with real values */}
          <Stack gap={3}>
            <Text role="overline">Dark Theme Variants</Text>
            <Text role="caption" color="tertiary">
              Dark shadows use pure black (navy tint invisible on dark surfaces).
              Opacity boosted for visibility: 35-48% primary, 24-30% secondary.
            </Text>
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
                    <tr
                      style={{
                        background: "var(--sys-energy-surface-tertiary)",
                        borderBottom: "1px solid var(--sys-energy-border-default)",
                      }}
                    >
                      {["Level", "Ref Token", "Offset-Y", "Blur", "Spread", "Primary α", "Secondary α"].map(
                        (h) => (
                          <th
                            key={h}
                            style={{
                              padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
                              textAlign: "left",
                              fontSize: "var(--ref-voice-size-2)",
                              fontWeight: "var(--ref-voice-weight-medium)",
                              color: "var(--sys-energy-text-secondary)",
                            }}
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {DARK_SHADOW_LEVELS.map((d) => (
                      <tr
                        key={d.level}
                        style={{ borderBottom: "1px solid var(--sys-energy-border-default)" }}
                      >
                        <td style={{ padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)", fontWeight: "var(--ref-voice-weight-medium)" }}>
                          {d.level}
                        </td>
                        <td style={{ padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)", fontFamily: "var(--ref-voice-family-mono)", fontSize: "var(--ref-voice-size-2)", color: "var(--sys-energy-text-accent)" }}>
                          {d.cssVar}
                        </td>
                        <td style={{ padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)", fontFamily: "var(--ref-voice-family-mono)", fontSize: "var(--ref-voice-size-2)" }}>{d.offsetY}</td>
                        <td style={{ padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)", fontFamily: "var(--ref-voice-family-mono)", fontSize: "var(--ref-voice-size-2)" }}>{d.blur}</td>
                        <td style={{ padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)", fontFamily: "var(--ref-voice-family-mono)", fontSize: "var(--ref-voice-size-2)" }}>{d.spread}</td>
                        <td style={{ padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)", fontFamily: "var(--ref-voice-family-mono)", fontSize: "var(--ref-voice-size-2)" }}>{d.primaryOpacity}</td>
                        <td style={{ padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)", fontFamily: "var(--ref-voice-family-mono)", fontSize: "var(--ref-voice-size-2)" }}>{d.secondaryOpacity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Surface>
          </Stack>
        </Stack>
      )}

      {/* ── Gap Analysis Tab ── */}
      {tab === "gaps" && (
        <Stack gap={4}>
          <Text color="secondary">
            Comparative analysis of FLOW&apos;s depth system against the Figma Edenred Shadows frame. All
            6 identified gaps have been resolved in this recalibration.
          </Text>

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
                    {["#", "Gap", "Before", "After", "Status"].map((h) => (
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
                  {GAPS.map((gap, idx) => (
                    <tr
                      key={idx}
                      style={{ borderBottom: "1px solid var(--sys-energy-border-default)" }}
                    >
                      <td
                        style={{
                          padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                          fontSize: "var(--ref-voice-size-4)",
                          color: "var(--sys-energy-text-tertiary)",
                        }}
                      >
                        {idx + 1}
                      </td>
                      <td
                        style={{
                          padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                          fontSize: "var(--ref-voice-size-4)",
                          color: "var(--sys-energy-text-primary)",
                          fontWeight: "var(--ref-voice-weight-medium)",
                        }}
                      >
                        {gap.gap}
                      </td>
                      <td
                        style={{
                          padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                          fontSize: "var(--ref-voice-size-3)",
                          fontFamily: "var(--ref-voice-family-mono)",
                          color: "var(--sys-energy-text-danger)",
                          textDecoration: "line-through",
                          opacity: 0.7,
                        }}
                      >
                        {gap.before}
                      </td>
                      <td
                        style={{
                          padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                          fontSize: "var(--ref-voice-size-3)",
                          fontFamily: "var(--ref-voice-family-mono)",
                          color: "var(--sys-energy-text-success)",
                        }}
                      >
                        {gap.after}
                      </td>
                      <td style={{ padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            padding: "var(--ref-frame-space-micro) var(--ref-frame-space-2)",
                            borderRadius: "var(--ref-frame-radius-full)",
                            background: "var(--sys-energy-status-success-subtle)",
                            color: "var(--sys-energy-status-success)",
                            fontSize: "var(--ref-voice-size-2)",
                            fontWeight: "var(--ref-voice-weight-bold)",
                            textTransform: "uppercase",
                            letterSpacing: "var(--ref-voice-letter-spacing-expanded)",
                          }}
                        >
                          Resolved
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Surface>

          {/* Navy blue color swatch */}
          <Surface padding="container">
            <Stack gap={3}>
              <Text role="overline">Branded Shadow Color</Text>
              <Inline gap={4}>
                <div
                  style={{
                    width: "var(--ref-frame-space-16)",
                    height: "var(--ref-frame-space-16)",
                    borderRadius: "var(--ref-frame-radius-3)",
                    background: "rgba(var(--ref-depth-shadow-color-rgb), 1)",
                    border: "1px solid var(--sys-energy-border-default)",
                  }}
                />
                <Stack gap={1}>
                  <Text role="code" style={{ fontSize: "var(--ref-voice-size-3)" }}>
                    #101A77
                  </Text>
                  <Text role="code" style={{ fontSize: "var(--ref-voice-size-3)" }}>
                    rgb(16, 26, 119)
                  </Text>
                  <Text role="caption" color="secondary">
                    { }
                    Navy blue — cooler and more refined than generic black. Aligns with Figma
                    Edenred&apos;s brand shadow specification.
                  </Text>
                </Stack>
              </Inline>
            </Stack>
          </Surface>
        </Stack>
      )}

      {/* ── Z-Index Tab ── */}
      {tab === "z-index" && (
        <Stack gap={4}>
          <Text color="secondary">
            Non-overlapping z-index ranges for predictable stacking. Each range is reserved for a
            specific category of UI element.
          </Text>

          <div
            style={{
              display: "flex",
              gap: "var(--ref-frame-space-3)",
              alignItems: "flex-end",
              padding: "var(--ref-frame-space-6) 0",
            }}
          >
            {Z_LEVELS.map((z, idx) => {
              const maxBarHeight = 200;
              const maxVal = 1100;
              // Use log scale for visual proportion
              const logHeight =
                z.value === 0
                  ? 12
                  : Math.max(20, (Math.log10(z.value + 1) / Math.log10(maxVal + 1)) * maxBarHeight);

              return (
                <div
                  key={z.name}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "var(--ref-frame-space-2)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "var(--ref-voice-size-3)",
                      fontWeight: "var(--ref-voice-weight-bold)",
                      color: "var(--sys-energy-text-primary)",
                      fontFamily: "var(--ref-voice-family-mono)",
                    }}
                  >
                    {z.value}
                  </span>
                  <div
                    style={{
                      width: "100%",
                      height: `${logHeight}px`,
                      borderRadius: "var(--ref-frame-radius-2) var(--ref-frame-radius-2) 0 0",
                      background:
                        idx <= 1
                          ? "var(--sys-energy-surface-tertiary)"
                          : `hsl(${220 + idx * 15}, 70%, ${65 - idx * 5}%)`,
                      transition:
                        "height var(--ref-momentum-duration-normal) var(--ref-momentum-easing-standard)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "var(--ref-voice-size-2)",
                      fontWeight: "var(--ref-voice-weight-medium)",
                      color: "var(--sys-energy-text-secondary)",
                      textAlign: "center",
                      fontFamily: "var(--ref-voice-family-sans)",
                    }}
                  >
                    {z.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Z-index detail table */}
          <Surface padding={0} border={true} radius="container">
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "var(--ref-voice-family-sans)",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid var(--sys-energy-border-default)" }}>
                  {["Name", "Value", "Token", "Use Case"].map((h) => (
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
                {Z_LEVELS.map((z) => (
                  <tr
                    key={z.name}
                    style={{ borderBottom: "1px solid var(--sys-energy-border-default)" }}
                  >
                    <td
                      style={{
                        padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                        fontWeight: "var(--ref-voice-weight-medium)",
                        fontSize: "var(--ref-voice-size-4)",
                        color: "var(--sys-energy-text-primary)",
                      }}
                    >
                      {z.name}
                    </td>
                    <td
                      style={{
                        padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                        fontFamily: "var(--ref-voice-family-mono)",
                        fontSize: "var(--ref-voice-size-4)",
                        color: "var(--sys-energy-text-accent)",
                      }}
                    >
                      {z.value}
                    </td>
                    <td
                      style={{
                        padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                        fontFamily: "var(--ref-voice-family-mono)",
                        fontSize: "var(--ref-voice-size-3)",
                        color: "var(--sys-energy-text-secondary)",
                      }}
                    >
                      {z.token}
                    </td>
                    <td
                      style={{
                        padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                        fontSize: "var(--ref-voice-size-4)",
                        color: "var(--sys-energy-text-secondary)",
                      }}
                    >
                      {z.useCase}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Surface>
        </Stack>
      )}
    </Stack>
  );
}
