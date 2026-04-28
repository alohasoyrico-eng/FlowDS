/**
 * FLOW — Grid Overlay (Annotated, Figma-spec style)
 * ────────────────────────────────────────────────────────────────
 * Columnas violeta + indicadores de margin rosa, alineados 1:1
 * con el <LayoutGrid> real del DOM via getBoundingClientRect().
 *
 * Esto significa que el overlay se ajusta automáticamente a:
 *   • Sidebar expandido / colapsado (transition incluida)
 *   • Max-width del grid centrado
 *   • Cada breakpoint (sm / md / lg)
 *
 * API:
 *   <GridOverlay visible={bool} />         — controlled, mount en DocLayout
 *   <GridOverlayButton visible onToggle /> — botón legacy (no usado)
 */

import { useCallback, useEffect, useState } from "react";

// ── Types ──────────────────────────────────────────────────────

interface GridMetrics {
  tier: "lg" | "md" | "sm";
  tierLabel: string;
  columns: number;
  gap: number; // px gutter
  margin: number; // px margin (one side, inside the grid area)
  maxWidth: number; // px
  // Real viewport offsets derived from getBoundingClientRect()
  gridLeft: number; // px from left edge of viewport to left edge of .flow-layout-grid
  gridRight: number; // px from right edge of viewport to right edge of .flow-layout-grid
}

// Spec fallbacks (match FLOW grid tokens at default density)
const SPEC: Record<
  "lg" | "md" | "sm",
  Omit<GridMetrics, "tier" | "tierLabel" | "gridLeft" | "gridRight">
> = {
  lg: { columns: 12, gap: 32, margin: 48, maxWidth: 1440 },
  md: { columns: 6, gap: 24, margin: 24, maxWidth: 99999 },
  sm: { columns: 1, gap: 0, margin: 16, maxWidth: 99999 },
};

const TIER_LABELS: Record<"lg" | "md" | "sm", string> = {
  lg: "Large · ≥ 992px",
  md: "Medium · ≥ 576px",
  sm: "Small · < 576px",
};

function getActiveTier(): "lg" | "md" | "sm" {
  const w = window.innerWidth;
  if (w >= 992) return "lg";
  if (w >= 576) return "md";
  return "sm";
}

/**
 * Read real grid metrics from the live DOM.
 * getBoundingClientRect() gives us the exact position of .flow-layout-grid
 * relative to the viewport — sidebar width, max-width centering, etc. all
 * resolved for free.
 */
function readMetrics(): GridMetrics {
  const tier = getActiveTier();
  let columns = SPEC[tier].columns;
  let gap = SPEC[tier].gap;
  let margin = SPEC[tier].margin;
  let maxWidth = SPEC[tier].maxWidth;
  let gridLeft = 0;
  let gridRight = 0;

  const el = document.querySelector<HTMLElement>(".flow-layout-grid");

  if (el) {
    const rect = el.getBoundingClientRect();
    gridLeft = Math.round(rect.left);
    gridRight = Math.round(window.innerWidth - rect.right);

    const cs = getComputedStyle(el);

    // Column count from real computed grid
    const tpl = cs.gridTemplateColumns;
    if (tpl && tpl !== "none") {
      const count = tpl.trim().split(/\s+/).length;
      if (count > 0) columns = count;
    }

    // Gap
    const rawGap = parseFloat(cs.columnGap || cs.gap || "");
    if (!isNaN(rawGap)) gap = rawGap;

    // Margin = paddingLeft of the grid element
    const rawPad = parseFloat(cs.paddingLeft || "");
    if (!isNaN(rawPad)) margin = rawPad;

    // Max-width
    const rawMax = parseFloat(cs.maxWidth || "");
    if (!isNaN(rawMax) && rawMax > 0 && rawMax < 9999) maxWidth = rawMax;
  } else {
    // Fallback: estimate sidebar offset from <aside> element
    const sidebar = document.querySelector<HTMLElement>("aside");
    if (sidebar) {
      gridLeft = Math.round(sidebar.getBoundingClientRect().width);
    }
  }

  return {
    tier,
    tierLabel: TIER_LABELS[tier],
    columns,
    gap,
    margin,
    maxWidth,
    gridLeft,
    gridRight,
  };
}

// ── GridOverlay ─────────────────────────────────────────────────

/** Local CSS custom properties for dev-only debug overlay colors */
const GRID_OVERLAY_VARS: React.CSSProperties = {
  "--_grid-col-fill": "rgba(95, 0, 250, 0.10)",
  "--_grid-col-border": "rgba(95, 0, 250, 0.20)",
  "--_grid-margin-fill": "rgba(255, 0, 125, 0.07)",
  "--_grid-margin-line": "rgba(255, 0, 125, 0.45)",
  "--_grid-ann-pink": "rgba(255, 0, 125, 1)",
  "--_grid-ann-violet": "rgba(95, 0, 250, 0.85)",
  "--_grid-chip-bg": "rgba(255, 255, 255, 0.93)",
  "--_grid-chip-border": "rgba(255, 0, 125, 0.22)",
  "--_grid-chip-shadow": "rgba(0, 0, 0, 0.08)",
  "--_grid-sep-bg": "rgba(0, 0, 0, 0.12)",
  "--_grid-btn-active-bg": "rgba(95, 0, 250, 0.08)",
  "--_grid-btn-active-border": "rgba(95, 0, 250, 0.35)",
  "--_grid-btn-active-text": "rgba(95, 0, 250, 1)",
  "--_grid-btn-tier-active-bg": "rgba(95, 0, 250, 0.12)",
  "--_grid-btn-tier-inactive-bg": "rgba(0, 0, 0, 0.06)",
} as React.CSSProperties;

interface GridOverlayProps {
  visible: boolean;
}

export function GridOverlay({ visible }: GridOverlayProps) {
  const [m, setM] = useState<GridMetrics>(() => ({
    tier: "lg",
    tierLabel: TIER_LABELS.lg,
    ...SPEC.lg,
    gridLeft: 0,
    gridRight: 0,
  }));

  const update = useCallback(() => setM(readMetrics()), []);

  useEffect(() => {
    if (!visible) return;

    // First read after paint (DOM settled)
    const raf = requestAnimationFrame(update);

    const ro = new ResizeObserver(update);
    // Observe root for viewport resize
    ro.observe(document.documentElement);
    // Observe sidebar so collapse/expand transitions reposition the overlay
    const sidebar = document.querySelector<HTMLElement>("aside");
    if (sidebar) ro.observe(sidebar);
    // Also observe the grid itself
    const grid = document.querySelector<HTMLElement>(".flow-layout-grid");
    if (grid) ro.observe(grid);

    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [visible, update]);

  // Re-read on route changes (grid element may be replaced)
  useEffect(() => {
    if (visible) {
      const raf = requestAnimationFrame(update);
      return () => cancelAnimationFrame(raf);
    }
  }, [visible, update]);

  if (!visible) return null;

  const { columns, gap, margin, maxWidth, tierLabel, gridLeft, gridRight } = m;

  // ── Color aliases (reference local CSS custom properties) ──
  const COL_FILL = "var(--_grid-col-fill)";
  const COL_BORDER = "var(--_grid-col-border)";
  const MARGIN_FILL = "var(--_grid-margin-fill)";
  const MARGIN_LINE = "var(--_grid-margin-line)";
  const ANN_PINK = "var(--_grid-ann-pink)";
  const ANN_VIOLET = "var(--_grid-ann-violet)";

  // The column area is inset by `margin` on each side of the grid rect.
  // Expressed as fixed offsets from viewport edges:
  const colLeft = gridLeft + margin;
  const colRight = gridRight + margin;

  return (
    <div style={GRID_OVERLAY_VARS}>
      {/* ── Column fills ─────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: colLeft,
          right: colRight,
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `0 ${gap}px`,
          pointerEvents: "none",
          zIndex: 9990,
        }}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={i}
            style={{
              background: COL_FILL,
              borderLeft: `1px solid ${COL_BORDER}`,
              borderRight: `1px solid ${COL_BORDER}`,
            }}
          />
        ))}
      </div>

      {/* ── Left margin indicator ─────────────────────────────────── */}
      {margin > 0 && (
        <>
          <div
            aria-hidden="true"
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: gridLeft,
              width: margin,
              background: MARGIN_FILL,
              borderRight: `1px dashed ${MARGIN_LINE}`,
              pointerEvents: "none",
              zIndex: 9990,
            }}
          />
          {/* ── Right margin indicator ── */}
          <div
            aria-hidden="true"
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              right: gridRight,
              width: margin,
              background: MARGIN_FILL,
              borderLeft: `1px dashed ${MARGIN_LINE}`,
              pointerEvents: "none",
              zIndex: 9990,
            }}
          />
        </>
      )}

      {/* ── Annotation strip ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "var(--ref-frame-space-3)",
          left: gridLeft,
          right: gridRight,
          display: "flex",
          flexDirection: "column",
          gap: "var(--ref-frame-space-1)",
          pointerEvents: "none",
          zIndex: 9991,
          paddingLeft: margin,
          paddingRight: margin,
          boxSizing: "border-box",
        }}
      >
        {/* Info chip */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--ref-frame-space-3)",
            padding: "var(--ref-frame-space-1) var(--ref-frame-space-2)",
            background: "var(--_grid-chip-bg)",
            borderRadius: "var(--ref-frame-radius-1)",
            border: "var(--ref-frame-border-thin) solid var(--_grid-chip-border)",
            backdropFilter: "blur(var(--ref-depth-blur-md))",
            alignSelf: "flex-start",
            boxShadow: "0 1px 4px var(--_grid-chip-shadow)",
          }}
        >
          <Ann color={ANN_PINK} bold>
            {tierLabel}
          </Ann>
          <Sep />
          <Ann color={ANN_PINK}>
            {columns} {columns === 1 ? "column" : "columns"}
          </Ann>
          {gap > 0 && (
            <>
              <Sep />
              <Ann color={ANN_VIOLET}>{gap}px gutter</Ann>
            </>
          )}
          <Sep />
          <Ann color={ANN_PINK}>{margin}px margin</Ann>
          {maxWidth < 9999 && (
            <>
              <Sep />
              <Ann color={ANN_VIOLET}>max {maxWidth}px</Ann>
            </>
          )}
        </div>

        {/* Bracket line spanning column area (margin-to-margin) */}
        <BracketLine
          label={`${columns} ${columns === 1 ? "col" : "cols"}`}
          color={ANN_PINK}
          contentWidth={Math.max(0, window.innerWidth - gridLeft - gridRight - margin * 2)}
        />
      </div>
    </div>
  );
}

// ── Helper sub-components ──────────────────────────────────────

function Ann({
  children,
  color,
  bold,
}: {
  children: React.ReactNode;
  color: string;
  bold?: boolean;
}) {
  return (
    <span
      style={{
        fontFamily: "var(--ref-voice-family-mono)",
        fontSize: "var(--sys-voice-overline-size)",
        fontWeight: bold ? "var(--ref-voice-weight-bold)" : "var(--ref-voice-weight-regular)",
        color,
        whiteSpace: "nowrap",
        lineHeight: "var(--ref-frame-space-4)",
      }}
    >
      {children}
    </span>
  );
}

function Sep() {
  return (
    <span
      style={{
        width: "var(--ref-frame-border-thin)",
        height: "var(--ref-frame-space-3)",
        background: "var(--_grid-sep-bg)",
        flexShrink: 0,
      }}
    />
  );
}

function BracketLine({
  label,
  color,
  contentWidth,
}: {
  label: string;
  color: string;
  contentWidth: number;
}) {
  if (contentWidth <= 0) return null;
  const H = 18;
  const W = contentWidth;
  return (
    <div style={{ width: W, height: H, flexShrink: 0 }}>
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        overflow="visible"
        style={{ display: "block" }}
      >
        <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke={color} strokeWidth={1} />
        <line x1={0} y1={2} x2={0} y2={H - 2} stroke={color} strokeWidth={1} />
        <line x1={W} y1={2} x2={W} y2={H - 2} stroke={color} strokeWidth={1} />
        <text
          x={W / 2}
          y={H / 2 - 3}
          textAnchor="middle"
          fill={color}
          fontFamily="monospace"
          fontSize={10}
        >
          {label}
        </text>
      </svg>
    </div>
  );
}

// ── GridOverlayButton (legacy) ─────────────────────────────────

interface GridOverlayButtonProps {
  visible: boolean;
  onToggle: () => void;
}

export function GridOverlayButton({ visible, onToggle }: GridOverlayButtonProps) {
  const [tier, setTier] = useState<"lg" | "md" | "sm">(getActiveTier);
  useEffect(() => {
    const h = () => setTier(getActiveTier());
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  const tierLabel = { lg: "12 col", md: "6 col", sm: "1 col" }[tier];
  return (
    <span style={{ ...GRID_OVERLAY_VARS, display: "contents" }}>
      <button
        onClick={onToggle}
        title={visible ? "Hide grid overlay" : "Show grid overlay"}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--ref-frame-space-1)",
          padding: "var(--ref-frame-space-1) var(--ref-frame-space-2)",
          background: visible
            ? "var(--_grid-btn-active-bg)"
            : "var(--sys-energy-surface-secondary)",
          border: `var(--ref-frame-border-thin) solid ${visible ? "var(--_grid-btn-active-border)" : "var(--sys-energy-border-default)"}`,
          borderRadius: "var(--ref-frame-radius-2)",
          fontFamily: "var(--ref-voice-family-mono)",
          fontSize: "var(--sys-voice-overline-size)",
          color: visible ? "var(--_grid-btn-active-text)" : "var(--sys-energy-text-secondary)",
          cursor: "pointer",
          transition: "all var(--sys-momentum-transition-fast)",
          whiteSpace: "nowrap",
          flexShrink: 0,
          lineHeight: "var(--ref-frame-space-4)",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <rect x="0" y="1.5" width="2.5" height="10" rx="0.5" fill="currentColor" opacity="0.75" />
          <rect x="5" y="1.5" width="2.5" height="10" rx="0.5" fill="currentColor" opacity="0.75" />
          <rect
            x="10"
            y="1.5"
            width="2.5"
            height="10"
            rx="0.5"
            fill="currentColor"
            opacity="0.75"
          />
        </svg>
        {visible ? "Hide grid" : "Grid"}
        <span
          style={{
            fontSize: "var(--sys-voice-overline-size)",
            opacity: "var(--ref-state-opacity-subtle)",
            background: visible
              ? "var(--_grid-btn-tier-active-bg)"
              : "var(--_grid-btn-tier-inactive-bg)",
            padding: "var(--ref-frame-space-micro) var(--ref-frame-space-1)",
            borderRadius: "var(--ref-frame-radius-1)",
          }}
        >
          {tierLabel}
        </span>
      </button>
    </span>
  );
}

/** @deprecated */
export function GridOverlayToggle({
  defaultVisible = false,
}: {
  label?: string;
  defaultVisible?: boolean;
}) {
  const [visible, setVisible] = useState(defaultVisible);
  return (
    <>
      <GridOverlay visible={visible} />
      <GridOverlayButton visible={visible} onToggle={() => setVisible((v) => !v)} />
    </>
  );
}
