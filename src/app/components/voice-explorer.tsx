/**
 * Voice Explorer — Interactive Typography Demo
 * ─────────────────────────────────────────────
 * PHASE A: Shows 4×4 grid (Display/Heading/Label/Paragraph × xl/l/m/s) + 2 utilities.
 * Density switching live-morphs all categories ±1 step.
 * Token trace panel reveals the full ref→sys→comp chain.
 */
import { useState } from "react";

import { Inline, Stack, Surface, Text } from "../primitives";

type Density = "compact" | "default" | "comfortable";

// ── Style catalog ──
interface VoiceStyle {
  name: string;
  category: "display" | "heading" | "label" | "paragraph" | "utility";
  cssClass: string;
  sysVar: string;
  refSize: string;
  densityResponsive: boolean;
  sample: string;
}

const VOICE_STYLES: VoiceStyle[] = [
  // Display (4 levels: xl/l/m/s)
  {
    name: "Display XL",
    category: "display",
    cssClass: "flow-display-xl",
    sysVar: "--sys-voice-display-xl-size",
    refSize: "64px",
    densityResponsive: true,
    sample: "$4,892,301",
  },
  {
    name: "Display L",
    category: "display",
    cssClass: "flow-display-l",
    sysVar: "--sys-voice-display-l-size",
    refSize: "48px",
    densityResponsive: true,
    sample: "Annual Report",
  },
  {
    name: "Display M",
    category: "display",
    cssClass: "flow-display-m",
    sysVar: "--sys-voice-display-m-size",
    refSize: "32px",
    densityResponsive: true,
    sample: "Welcome Back",
  },
  {
    name: "Display S",
    category: "display",
    cssClass: "flow-display-s",
    sysVar: "--sys-voice-display-s-size",
    refSize: "24px",
    densityResponsive: true,
    sample: "Dashboard",
  },
  // Heading (4 levels: xl/l/m/s)
  {
    name: "Heading XL",
    category: "heading",
    cssClass: "flow-heading-xl",
    sysVar: "--sys-voice-heading-xl-size",
    refSize: "20px",
    densityResponsive: true,
    sample: "Transaction History",
  },
  {
    name: "Heading L",
    category: "heading",
    cssClass: "flow-heading-l",
    sysVar: "--sys-voice-heading-l-size",
    refSize: "18px",
    densityResponsive: true,
    sample: "Recent Activity",
  },
  {
    name: "Heading M",
    category: "heading",
    cssClass: "flow-heading-m",
    sysVar: "--sys-voice-heading-m-size",
    refSize: "16px",
    densityResponsive: true,
    sample: "Payment Methods",
  },
  {
    name: "Heading S",
    category: "heading",
    cssClass: "flow-heading-s",
    sysVar: "--sys-voice-heading-s-size",
    refSize: "14px",
    densityResponsive: true,
    sample: "Notifications",
  },
  // Label (4 levels: xl/l/m/s)
  {
    name: "Label XL",
    category: "label",
    cssClass: "flow-label-xl",
    sysVar: "--sys-voice-label-xl-size",
    refSize: "16px",
    densityResponsive: true,
    sample: "Total Balance",
  },
  {
    name: "Label L",
    category: "label",
    cssClass: "flow-label-l",
    sysVar: "--sys-voice-label-l-size",
    refSize: "14px",
    densityResponsive: true,
    sample: "Payment Method",
  },
  {
    name: "Label M",
    category: "label",
    cssClass: "flow-label-m",
    sysVar: "--sys-voice-label-m-size",
    refSize: "13px",
    densityResponsive: true,
    sample: "Card Number",
  },
  {
    name: "Label S",
    category: "label",
    cssClass: "flow-label-s",
    sysVar: "--sys-voice-label-s-size",
    refSize: "12px",
    densityResponsive: true,
    sample: "Email Address",
  },
  // Paragraph (4 levels: xl/l/m/s)
  {
    name: "Paragraph XL",
    category: "paragraph",
    cssClass: "flow-paragraph-xl",
    sysVar: "--sys-voice-paragraph-xl-size",
    refSize: "16px",
    densityResponsive: true,
    sample: "A lead paragraph that introduces the section with greater visual weight and presence.",
  },
  {
    name: "Paragraph L",
    category: "paragraph",
    cssClass: "flow-paragraph-l",
    sysVar: "--sys-voice-paragraph-l-size",
    refSize: "14px",
    densityResponsive: true,
    sample:
      "Your account has been updated. All changes will take effect within the next billing cycle.",
  },
  {
    name: "Paragraph M",
    category: "paragraph",
    cssClass: "flow-paragraph-m",
    sysVar: "--sys-voice-paragraph-m-size",
    refSize: "13px",
    densityResponsive: true,
    sample: "Manage your payment methods and set default options for recurring transactions.",
  },
  {
    name: "Paragraph S",
    category: "paragraph",
    cssClass: "flow-paragraph-s",
    sysVar: "--sys-voice-paragraph-s-size",
    refSize: "12px",
    densityResponsive: true,
    sample: "Last updated 5 minutes ago. Changes may take up to 24 hours to process.",
  },
  // Utility
  {
    name: "Caption",
    category: "utility",
    cssClass: "flow-caption",
    sysVar: "--sys-voice-caption-size",
    refSize: "11px",
    densityResponsive: true,
    sample: "Transaction ID: TXN-2026-0842 · Feb 26, 2026",
  },
  {
    name: "Overline",
    category: "utility",
    cssClass: "flow-section-label",
    sysVar: "--sys-voice-overline-size",
    refSize: "10px",
    densityResponsive: true,
    sample: "ACCOUNT SETTINGS",
  },
];

const CATEGORIES = [
  {
    key: "display",
    label: "Display",
    color: "var(--ref-energy-purple-500)",
    desc: "Brand font (Edenred Bold) · Density-responsive",
  },
  {
    key: "heading",
    label: "Heading",
    color: "var(--ref-energy-blue-500)",
    desc: "Brand font (Edenred Bold) · Density-responsive",
  },
  {
    key: "label",
    label: "Label",
    color: "var(--ref-energy-green-500)",
    desc: "Sans font (Ubuntu Medium) · Density-responsive",
  },
  {
    key: "paragraph",
    label: "Paragraph",
    color: "var(--ref-energy-orange-500)",
    desc: "Sans font (Ubuntu Regular) · Density-responsive",
  },
  {
    key: "utility",
    label: "Utility",
    color: "var(--ref-energy-teal-500)",
    desc: "Sans font · Density-responsive",
  },
];

const DENSITY_SIZES: Record<string, { compact: string; default: string; comfortable: string }> = {
  "--sys-voice-display-xl-size": { compact: "56px", default: "64px", comfortable: "72px" },
  "--sys-voice-display-l-size": { compact: "40px", default: "48px", comfortable: "56px" },
  "--sys-voice-display-m-size": { compact: "24px", default: "32px", comfortable: "40px" },
  "--sys-voice-display-s-size": { compact: "20px", default: "24px", comfortable: "32px" },
  "--sys-voice-heading-xl-size": { compact: "18px", default: "20px", comfortable: "24px" },
  "--sys-voice-heading-l-size": { compact: "16px", default: "18px", comfortable: "20px" },
  "--sys-voice-heading-m-size": { compact: "14px", default: "16px", comfortable: "18px" },
  "--sys-voice-heading-s-size": { compact: "13px", default: "14px", comfortable: "16px" },
  "--sys-voice-label-xl-size": { compact: "14px", default: "16px", comfortable: "18px" },
  "--sys-voice-label-l-size": { compact: "13px", default: "14px", comfortable: "16px" },
  "--sys-voice-label-m-size": { compact: "12px", default: "13px", comfortable: "14px" },
  "--sys-voice-label-s-size": { compact: "11px", default: "12px", comfortable: "13px" },
  "--sys-voice-paragraph-xl-size": { compact: "14px", default: "16px", comfortable: "18px" },
  "--sys-voice-paragraph-l-size": { compact: "13px", default: "14px", comfortable: "16px" },
  "--sys-voice-paragraph-m-size": { compact: "12px", default: "13px", comfortable: "14px" },
  "--sys-voice-paragraph-s-size": { compact: "11px", default: "12px", comfortable: "13px" },
  "--sys-voice-caption-size": { compact: "10px", default: "11px", comfortable: "12px" },
  "--sys-voice-overline-size": { compact: "10px", default: "10px", comfortable: "11px" },
};

function DensityToggle({ value, onChange }: { value: Density; onChange: (d: Density) => void }) {
  return (
    <Inline gap={1}>
      {(["compact", "default", "comfortable"] as Density[]).map((d) => (
        <button
          key={d}
          onClick={() => onChange(d)}
          style={{
            padding: "var(--ref-frame-space-1) var(--ref-frame-space-3)",
            borderRadius: "var(--ref-frame-radius-full)",
            border: "none",
            background: value === d ? "var(--sys-energy-action-primary)" : "transparent",
            color:
              value === d ? "var(--sys-energy-text-inverse)" : "var(--sys-energy-text-secondary)",
            fontFamily: "var(--ref-voice-family-sans)",
            fontWeight: "var(--ref-voice-weight-semibold)",
            fontSize: "var(--sys-voice-caption-size)",
            cursor: "pointer",
            transition: "all var(--sys-momentum-transition-fast)",
            textTransform: "capitalize",
          }}
        >
          {d}
        </button>
      ))}
    </Inline>
  );
}

function CategoryBadge({ cat }: { cat: (typeof CATEGORIES)[number] }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--ref-frame-space-2)",
        fontSize: "var(--ref-voice-size-2)",
        fontWeight: "var(--ref-voice-weight-semibold)",
        letterSpacing: "var(--ref-voice-letter-spacing-wide)",
        textTransform: "uppercase",
        color: cat.color,
      }}
    >
      <span
        style={{ width: "var(--ref-frame-space-2)", height: "var(--ref-frame-space-2)", borderRadius: "50%", background: cat.color, flexShrink: 0 }}
      />
      {cat.label}
    </span>
  );
}

function StyleRow({
  style,
  density,
  expanded,
  onToggle,
}: {
  style: VoiceStyle;
  density: Density;
  expanded: boolean;
  onToggle: () => void;
}) {
  const densityInfo = DENSITY_SIZES[style.sysVar];
  const currentSize = densityInfo ? densityInfo[density] : style.refSize;

  return (
    <div
      style={{
        borderBottom: "1px solid var(--sys-energy-border-default)",
        padding: "var(--ref-frame-space-4) 0",
      }}
    >
      {/* Main row */}
      <button
        type="button"
        onClick={onToggle}
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: "var(--ref-frame-space-2)",
          background: "none",
          border: "none",
          padding: 0,
          textAlign: "inherit",
          color: "inherit",
          font: "inherit",
          width: "100%",
        }}
      >
        {/* Meta line */}
        <Inline gap={3} align="center">
          <span
            style={{
              fontFamily: "var(--ref-voice-family-mono)",
              fontSize: "var(--ref-voice-size-3)",
              color: "var(--sys-energy-text-accent)",
              minWidth: "var(--ref-frame-space-20)",
            }}
          >
            {currentSize}
          </span>
          <span
            className="flow-label-s"
            style={{ minWidth: "var(--ref-frame-space-24)", color: "var(--sys-energy-text-primary)" }}
          >
            {style.name}
          </span>
          {style.densityResponsive && (
            <span
              style={{
                fontSize: "var(--ref-voice-size-1)",
                fontWeight: "var(--ref-voice-weight-semibold)",
                letterSpacing: "var(--ref-voice-letter-spacing-caps)",
                textTransform: "uppercase",
                color: "var(--ref-energy-green-500)",
                background: "var(--ref-energy-green-50)",
                padding: "var(--ref-frame-border-thin) var(--ref-frame-space-2)",
                borderRadius: "var(--ref-frame-radius-full)",
              }}
            >
              density
            </span>
          )}
          <span
            style={{
              marginLeft: "auto",
              fontSize: "var(--ref-voice-size-3)",
              color: "var(--sys-energy-text-tertiary)",
            }}
          >
            {expanded ? "\u25B2" : "\u25BC"}
          </span>
        </Inline>

        {/* Live sample */}
        <div className={style.cssClass} style={{ margin: 0 }}>
          {style.sample}
        </div>
      </button>

      {/* Expanded: token trace */}
      {expanded && (
        <Surface
          variant="secondary"
          padding={4}
          radius="md"
          border={false}
          style={{ marginTop: "var(--ref-frame-space-3)" }}
        >
          <div
            style={{
              fontFamily: "var(--ref-voice-family-mono)",
              fontSize: "var(--ref-voice-size-3)",
              lineHeight: "var(--ref-voice-line-height-loose)",
              color: "var(--sys-energy-text-secondary)",
              whiteSpace: "pre-wrap",
            }}
          >
            {`CSS class:  .${style.cssClass}
sys var:    ${style.sysVar}
ref size:   ${style.refSize} (default)${
              densityInfo
                ? `\ncompact:    ${densityInfo.compact}
comfortable: ${densityInfo.comfortable}`
                : "\n(density-invariant)"
            }`}
          </div>
        </Surface>
      )}
    </div>
  );
}

// ── Scale visualizer ──
function ScaleBar({ sizes }: { sizes: { step: number; px: number; label: string }[] }) {
  const maxPx = Math.max(...sizes.map((s) => s.px));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--ref-frame-space-1)" }}>
      {sizes.map((s) => (
        <Inline key={s.step} gap={3} align="center">
          <span
            style={{
              fontFamily: "var(--ref-voice-family-mono)",
              fontSize: "var(--ref-voice-size-3)",
              color: "var(--sys-energy-text-tertiary)",
              width: "var(--ref-frame-space-7)",
              textAlign: "right",
            }}
          >
            {s.step}
          </span>
          <div
            style={{
              height: "var(--ref-frame-space-2)",
              width: `${(s.px / maxPx) * 100}%`,
              minWidth: "var(--ref-frame-space-1)",
              background: "var(--sys-energy-action-primary)",
              borderRadius: "var(--ref-frame-radius-full)",
              opacity: 0.6 + (s.px / maxPx) * 0.4,
              transition: "width var(--sys-momentum-transition-default)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--ref-voice-family-mono)",
              fontSize: "var(--ref-voice-size-3)",
              color: "var(--sys-energy-text-secondary)",
              minWidth: "var(--ref-frame-space-10)",
            }}
          >
            {s.px}px
          </span>
          <span
            style={{
              fontSize: "var(--ref-voice-size-2)",
              color: "var(--sys-energy-text-tertiary)",
            }}
          >
            {s.label}
          </span>
        </Inline>
      ))}
    </div>
  );
}

// ── Font family showcase ──
function FamilyShowcase() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "var(--ref-frame-space-4)",
      }}
    >
      {[
        {
          name: "Edenred",
          varName: "--ref-voice-family-brand",
          role: "Display + Heading",
          sample: "Aa Bb Cc 123",
          weight: "700",
        },
        {
          name: "Ubuntu",
          varName: "--ref-voice-family-sans",
          role: "Label + Paragraph",
          sample: "Aa Bb Cc 123",
          weight: "400",
        },
        {
          name: "JetBrains Mono",
          varName: "--ref-voice-family-mono",
          role: "Code + Tokens",
          sample: "0O 1l {}();",
          weight: "400",
        },
      ].map((f) => (
        <Surface key={f.name} variant="secondary" padding={4} radius="md" border>
          <Stack gap={2}>
            <Text role="overline">{f.role}</Text>
            <span
              style={{
                fontFamily: `var(${f.varName})`,
                fontWeight: f.weight,
                fontSize: "var(--ref-voice-size-9)",
                lineHeight: "var(--ref-voice-line-height-normal)",
                color: "var(--sys-energy-text-primary)",
              }}
            >
              {f.sample}
            </span>
            <span
              style={{
                fontFamily: "var(--ref-voice-family-mono)",
                fontSize: "var(--ref-voice-size-3)",
                color: "var(--sys-energy-text-accent)",
              }}
            >
              {f.varName}
            </span>
          </Stack>
        </Surface>
      ))}
    </div>
  );
}

// ── Main export ──
export function VoiceExplorer() {
  const [density, setDensity] = useState<Density>("default");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredStyles = activeCategory
    ? VOICE_STYLES.filter((s) => s.category === activeCategory)
    : VOICE_STYLES;

  const densityAttr = density === "default" ? undefined : density;

  return (
    <Stack gap="subsection">
      {/* Section 1: Font Families */}
      <Stack gap={3}>
        <Text role="heading-l">Font Families</Text>
        <Text role="paragraph-m">
          Three font families form the typographic identity: Edenred (brand) for display and heading
          styles, Ubuntu (sans) for labels and body text, and JetBrains Mono for code and token
          references.
        </Text>
        <FamilyShowcase />
      </Stack>

      {/* Section 2: Size Scale */}
      <Stack gap={3}>
        <Text role="heading-l">Size Scale</Text>
        <Text role="paragraph-m">
          14 integer steps from 10px to 72px, aligned 1:1 with the Figma Edenred design spec. PHASE
          A grid 4×4: no overlaps between Display/Heading/Label/Paragraph hierarchies.
        </Text>
        <Surface variant="secondary" padding={4} radius="md" border={false}>
          <ScaleBar
            sizes={[
              { step: 1, px: 10, label: "Overline (compact floor)" },
              { step: 2, px: 11, label: "Caption" },
              { step: 3, px: 12, label: "Label S, Paragraph S" },
              { step: 4, px: 13, label: "Label M, Paragraph M" },
              { step: 5, px: 14, label: "Heading S, Label L, Paragraph L" },
              { step: 6, px: 16, label: "Heading M, Label XL, Paragraph XL" },
              { step: 7, px: 18, label: "Heading L" },
              { step: 8, px: 20, label: "Heading XL" },
              { step: 9, px: 24, label: "Display S" },
              { step: 10, px: 32, label: "Display M" },
              { step: 11, px: 40, label: "" },
              { step: 12, px: 48, label: "Display L" },
              { step: 13, px: 56, label: "" },
              { step: 14, px: 64, label: "Display XL" },
              { step: 15, px: 72, label: "(comfortable ceiling)" },
            ]}
          />
        </Surface>
      </Stack>

      {/* Section 3: Composite Styles Explorer */}
      <Stack gap={3}>
        <Inline gap={4} align="center" justify="between" wrap>
          <Text role="heading-l">Composite Styles</Text>
          <DensityToggle value={density} onChange={setDensity} />
        </Inline>
        <Text role="paragraph-m">
          18 composite styles: 4×4 grid (Display/Heading/Label/Paragraph × xl/l/m/s) + 2 utilities.
          All categories are now density-responsive, shifting ±1 step with density changes. Click
          any row to reveal the token trace.
        </Text>

        {/* Category filter */}
        <Inline gap={2} wrap>
          <button
            onClick={() => setActiveCategory(null)}
            style={{
              padding: "var(--ref-frame-space-1) var(--ref-frame-space-3)",
              borderRadius: "var(--ref-frame-radius-full)",
              border: !activeCategory
                ? "1px solid var(--sys-energy-border-focus)"
                : "1px solid var(--sys-energy-border-default)",
              background: !activeCategory ? "var(--sys-energy-status-info-subtle)" : "transparent",
              color: !activeCategory
                ? "var(--sys-energy-text-accent)"
                : "var(--sys-energy-text-secondary)",
              fontFamily: "var(--ref-voice-family-sans)",
              fontSize: "var(--ref-voice-size-3)",
              fontWeight: "var(--ref-voice-weight-medium)",
              cursor: "pointer",
            }}
          >
            All ({VOICE_STYLES.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = VOICE_STYLES.filter((s) => s.category === cat.key).length;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(isActive ? null : cat.key)}
                style={{
                  padding: "var(--ref-frame-space-1) var(--ref-frame-space-3)",
                  borderRadius: "var(--ref-frame-radius-full)",
                  border: isActive
                    ? `1px solid ${cat.color}`
                    : "1px solid var(--sys-energy-border-default)",
                  background: isActive
                    ? `color-mix(in srgb, ${cat.color} 10%, transparent)`
                    : "transparent",
                  color: isActive ? cat.color : "var(--sys-energy-text-secondary)",
                  fontFamily: "var(--ref-voice-family-sans)",
                  fontSize: "var(--ref-voice-size-3)",
                  fontWeight: "var(--ref-voice-weight-medium)",
                  cursor: "pointer",
                }}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </Inline>

        {/* Live demo area with density */}
        <div data-density={densityAttr} data-density-animate>
          {/* Category groups */}
          {CATEGORIES.filter((c) => !activeCategory || activeCategory === c.key).map((cat) => {
            const styles = filteredStyles.filter((s) => s.category === cat.key);
            if (styles.length === 0) return null;
            return (
              <Stack key={cat.key} gap={0} style={{ marginBottom: "var(--ref-frame-space-6)" }}>
                <Inline
                  gap={3}
                  align="center"
                  style={{
                    padding: "var(--ref-frame-space-3) 0",
                    borderBottom: "2px solid var(--sys-energy-border-strong)",
                  }}
                >
                  <CategoryBadge cat={cat} />
                  <span
                    style={{
                      fontSize: "var(--ref-voice-size-3)",
                      color: "var(--sys-energy-text-tertiary)",
                    }}
                  >
                    {cat.desc}
                  </span>
                </Inline>
                {styles.map((style) => {
                  const globalIdx = VOICE_STYLES.indexOf(style);
                  return (
                    <StyleRow
                      key={style.name}
                      style={style}
                      density={density}
                      expanded={expandedIdx === globalIdx}
                      onToggle={() => setExpandedIdx(expandedIdx === globalIdx ? null : globalIdx)}
                    />
                  );
                })}
              </Stack>
            );
          })}
        </div>
      </Stack>

      {/* Section 4: Density comparison table */}
      <Stack gap={3}>
        <Text role="heading-l">Density Impact</Text>
        <Text role="paragraph-m">
          PHASE A: All categories (Display, Heading, Label, Paragraph, utilities) shift ±1 step with
          density changes. This creates a unified, predictable system where every typographic
          element responds to context.
        </Text>
        <div style={{ overflowX: "auto" }}>
          <table className="flow-table">
            <thead>
              <tr>
                <th>Style</th>
                <th>Compact</th>
                <th>Default</th>
                <th>Comfortable</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(DENSITY_SIZES).map(([varName, sizes]) => {
                const styleName = varName
                  .replace("--sys-voice-", "")
                  .replace("-size", "")
                  .replace(/-/g, " ");
                return (
                  <tr key={varName}>
                    <td
                      style={{
                        fontFamily: "var(--ref-voice-family-mono)",
                        color: "var(--sys-energy-text-accent)",
                      }}
                    >
                      {styleName}
                    </td>
                    {(["compact", "default", "comfortable"] as Density[]).map((d) => (
                      <td
                        key={d}
                        style={{
                          fontFamily: "var(--ref-voice-family-mono)",
                          fontWeight: d === density ? "var(--ref-voice-weight-bold)" : undefined,
                          color: d === density ? "var(--sys-energy-text-primary)" : undefined,
                        }}
                      >
                        {sizes[d]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Stack>
    </Stack>
  );
}
