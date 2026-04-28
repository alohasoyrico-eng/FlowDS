/**
 * FLOW Doc Layout — SidebarFooter
 * ────────────────────────────────
 * The "View" section at the bottom of the sidebar:
 * theme toggle (light/dark) and column-grid overlay toggle.
 */
import { Text } from "@flow/primitives";

export interface SidebarFooterProps {
  collapsed: boolean;
  theme: string;
  onToggleTheme: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  tierLabel: string;
}

export function SidebarFooter({
  collapsed,
  theme,
  onToggleTheme,
  showGrid,
  onToggleGrid,
  tierLabel,
}: SidebarFooterProps) {
  return (
    <div
      style={{
        borderTop: "1px solid var(--sys-energy-border-default)",
        padding: collapsed
          ? "var(--ref-frame-space-3) var(--ref-frame-space-2)"
          : "var(--ref-frame-space-3) var(--ref-frame-space-4)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--ref-frame-space-1)",
      }}
    >
      {/* Section label — hidden when collapsed */}
      {!collapsed && (
        <Text
          variant="overline"
          style={{
            padding: "var(--ref-frame-space-1) var(--ref-frame-space-2)",
            marginBottom: "var(--ref-frame-space-1)",
          }}
        >
          View
        </Text>
      )}

      {/* ── Theme toggle row ── */}
      <button
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        title={
          collapsed
            ? theme === "light"
              ? "Switch to dark mode"
              : "Switch to light mode"
            : undefined
        }
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--ref-frame-space-3)",
          padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
          borderRadius: "var(--ref-frame-radius-2)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          width: "100%",
          justifyContent: collapsed ? "center" : "flex-start",
          transition: "background var(--sys-momentum-transition-fast)",
          fontFamily: "var(--ref-voice-family-sans)",
          fontSize: "var(--sys-voice-caption-size)",
          color: "var(--sys-energy-text-secondary)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "var(--sys-energy-surface-secondary)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        {/* Sun / Moon inline SVG — never missing from icon set */}
        {theme === "light" ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <circle cx="8" cy="8" r="3" fill="var(--sys-energy-text-tertiary)" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
              const r = (Math.PI * deg) / 180;
              const x1 = 8 + Math.cos(r) * 4.8;
              const y1 = 8 + Math.sin(r) * 4.8;
              const x2 = 8 + Math.cos(r) * 6.5;
              const y2 = 8 + Math.sin(r) * 6.5;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="var(--sys-energy-text-tertiary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <path
              d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7z"
              fill="var(--sys-energy-text-tertiary)"
            />
          </svg>
        )}

        {!collapsed && (
          <>
            <span style={{ flex: 1, textAlign: "left", color: "var(--sys-energy-text-secondary)" }}>
              {theme === "light" ? "Light mode" : "Dark mode"}
            </span>
            {/* Pill — dark mode = on (dark track), light mode = off (grey track) */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                width: "var(--comp-toggle-track-width)",
                height: "var(--comp-toggle-track-height)",
                borderRadius: "var(--ref-frame-radius-full)",
                background:
                  theme === "dark"
                    ? "var(--sys-energy-surface-inverse)"
                    : "var(--sys-energy-text-disabled)",
                position: "relative",
                flexShrink: 0,
                transition: "background var(--sys-momentum-transition-fast)",
                boxSizing: "border-box",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  width: "var(--comp-toggle-knob-size)",
                  height: "var(--comp-toggle-knob-size)",
                  borderRadius: "50%",
                  background: "var(--sys-energy-surface-primary)",
                  left:
                    theme === "light"
                      ? "var(--comp-toggle-knob-inset)"
                      : "var(--comp-toggle-knob-active-left)",
                  transition: "left var(--sys-momentum-transition-fast)",
                  boxShadow: "var(--ref-depth-shadow-1)",
                }}
              />
            </span>
          </>
        )}
      </button>

      {/* ── Grid overlay toggle row ── */}
      <button
        onClick={onToggleGrid}
        aria-label={showGrid ? "Hide column grid" : "Show column grid"}
        aria-pressed={showGrid}
        title={collapsed ? (showGrid ? "Hide column grid" : "Show column grid") : undefined}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--ref-frame-space-3)",
          padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
          borderRadius: "var(--ref-frame-radius-2)",
          background: showGrid && collapsed ? "var(--dev-grid-color-subtle)" : "transparent",
          border: "none",
          cursor: "pointer",
          width: "100%",
          justifyContent: collapsed ? "center" : "flex-start",
          color: showGrid ? "var(--dev-grid-color)" : "var(--sys-energy-text-secondary)",
          transition:
            "background var(--sys-momentum-transition-fast), color var(--sys-momentum-transition-fast)",
          fontFamily: "var(--ref-voice-family-sans)",
          fontSize: "var(--sys-voice-caption-size)",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          if (!showGrid || !collapsed)
            e.currentTarget.style.background = showGrid
              ? "var(--dev-grid-color-subtle)"
              : "var(--sys-energy-surface-secondary)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            showGrid && collapsed ? "var(--dev-grid-color-subtle)" : "transparent";
        }}
      >
        {/* 3-column icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          style={{ flexShrink: 0 }}
        >
          <rect
            x="1"
            y="3"
            width="4"
            height="10"
            rx="0.75"
            fill={showGrid ? "var(--dev-grid-color)" : "var(--sys-energy-text-tertiary)"}
            opacity="0.85"
          />
          <rect
            x="6"
            y="3"
            width="4"
            height="10"
            rx="0.75"
            fill={showGrid ? "var(--dev-grid-color)" : "var(--sys-energy-text-tertiary)"}
            opacity="0.85"
          />
          <rect
            x="11"
            y="3"
            width="4"
            height="10"
            rx="0.75"
            fill={showGrid ? "var(--dev-grid-color)" : "var(--sys-energy-text-tertiary)"}
            opacity="0.85"
          />
        </svg>

        {!collapsed && (
          <>
            <span
              style={{
                flex: 1,
                textAlign: "left",
                color: showGrid ? "var(--dev-grid-color)" : "var(--sys-energy-text-secondary)",
              }}
            >
              Column grid
            </span>
            {/* Tier badge */}
            <span
              style={{
                fontSize: "var(--sys-voice-overline-size)",
                fontFamily: "var(--ref-voice-family-mono, monospace)",
                color: showGrid ? "var(--dev-grid-color)" : "var(--sys-energy-text-tertiary)",
                background: showGrid
                  ? "var(--dev-grid-color-muted)"
                  : "var(--sys-energy-surface-secondary)",
                padding: "var(--comp-badge-micro-padding)",
                borderRadius: "var(--comp-badge-micro-radius)",
                flexShrink: 0,
                transition: "all var(--sys-momentum-transition-fast)",
              }}
            >
              {tierLabel}
            </span>
            {/* Pill toggle */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "var(--comp-toggle-track-width)",
                height: "var(--comp-toggle-track-height)",
                borderRadius: "var(--ref-frame-radius-full)",
                background: showGrid ? "var(--dev-grid-color)" : "var(--sys-energy-border-default)",
                position: "relative",
                flexShrink: 0,
                transition: "background var(--sys-momentum-transition-fast)",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  width: "var(--comp-toggle-knob-size)",
                  height: "var(--comp-toggle-knob-size)",
                  borderRadius: "50%",
                  background: "var(--sys-energy-surface-primary)",
                  left: showGrid
                    ? "var(--comp-toggle-knob-active-left)"
                    : "var(--comp-toggle-knob-inset)",
                  transition: "left var(--sys-momentum-transition-fast)",
                }}
              />
            </span>
          </>
        )}

        {/* Active dot for collapsed state */}
        {collapsed && showGrid && (
          <span
            style={{
              position: "absolute",
              top: "var(--comp-toggle-dot-offset)",
              right: "var(--comp-toggle-dot-offset)",
              width: "var(--comp-toggle-dot-size)",
              height: "var(--comp-toggle-dot-size)",
              borderRadius: "50%",
              background: "var(--dev-grid-color)",
            }}
          />
        )}
      </button>
    </div>
  );
}
