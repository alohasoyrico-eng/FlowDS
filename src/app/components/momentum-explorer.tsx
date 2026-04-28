/**
 * MomentumExplorer — Interactive motion & animation explorer
 * ────────────────────────────────────────────────────────────
 * Visualizes FLOW's motion system:
 * - 5-step duration scale (instant → slower)
 * - 3 easing curves (standard, enter, exit) + linear
 * - Live animated demos (micro, transition, choreography)
 * - Stagger delay tokens
 * - Reduced-motion guidance
 *
 * Embedded within the Momentum foundation detail page.
 */
import { useCallback, useEffect, useRef, useState } from "react";

import { Divider, Inline, Stack, Surface, Text } from "@flow/primitives";

// ── Duration data ──
interface DurationToken {
  name: string;
  value: string;
  ms: number;
  refToken: string;
  cssVar: string;
  category: string;
  useCase: string;
}

const DURATIONS: DurationToken[] = [
  {
    name: "Instant",
    value: "0ms",
    ms: 0,
    refToken: "ref.momentum.duration.instant",
    cssVar: "--ref-momentum-duration-instant",
    category: "Micro",
    useCase: "Immediate state changes, no perceptible delay",
  },
  {
    name: "Fast",
    value: "100ms",
    ms: 100,
    refToken: "ref.momentum.duration.fast",
    cssVar: "--ref-momentum-duration-fast",
    category: "Micro",
    useCase: "Hover states, button press, toggle flips",
  },
  {
    name: "Normal",
    value: "200ms",
    ms: 200,
    refToken: "ref.momentum.duration.normal",
    cssVar: "--ref-momentum-duration-normal",
    category: "Transition",
    useCase: "Tab switching, expand/collapse, dropdown",
  },
  {
    name: "Slow",
    value: "350ms",
    ms: 350,
    refToken: "ref.momentum.duration.slow",
    cssVar: "--ref-momentum-duration-slow",
    category: "Transition",
    useCase: "Page transitions, complex reveals, modals",
  },
  {
    name: "Slower",
    value: "500ms",
    ms: 500,
    refToken: "ref.momentum.duration.slower",
    cssVar: "--ref-momentum-duration-slower",
    category: "Choreography",
    useCase: "Staggered lists, dashboard load, onboarding",
  },
  {
    name: "Cycle",
    value: "1400ms",
    ms: 1400,
    refToken: "ref.momentum.duration.cycle",
    cssVar: "--ref-momentum-duration-cycle",
    category: "Continuous",
    useCase: "Loading spinners, shimmer effects, infinite loops",
  },
];

// ── Easing data ──
interface EasingToken {
  name: string;
  value: string;
  refToken: string;
  cssVar: string;
  description: string;
  useCase: string;
  // Control points for visualization
  p1x: number;
  p1y: number;
  p2x: number;
  p2y: number;
}

const EASINGS: EasingToken[] = [
  {
    name: "Standard",
    value: "cubic-bezier(0.2, 0, 0, 1)",
    refToken: "ref.momentum.easing.standard",
    cssVar: "--ref-momentum-easing-standard",
    description: "Default for most transitions. Quick start, gentle finish.",
    useCase: "General UI transitions, property changes",
    p1x: 0.2,
    p1y: 0,
    p2x: 0,
    p2y: 1,
  },
  {
    name: "Enter",
    value: "cubic-bezier(0, 0, 0, 1)",
    refToken: "ref.momentum.easing.enter",
    cssVar: "--ref-momentum-easing-enter",
    description: "Elements appearing. Maximum deceleration.",
    useCase: "Modals opening, tooltips appearing, fade-in",
    p1x: 0,
    p1y: 0,
    p2x: 0,
    p2y: 1,
  },
  {
    name: "Exit",
    value: "cubic-bezier(0.2, 0, 1, 1)",
    refToken: "ref.momentum.easing.exit",
    cssVar: "--ref-momentum-easing-exit",
    description: "Elements leaving. Quick acceleration out.",
    useCase: "Modals closing, tooltips hiding, fade-out",
    p1x: 0.2,
    p1y: 0,
    p2x: 1,
    p2y: 1,
  },
  {
    name: "Linear",
    value: "cubic-bezier(0, 0, 1, 1)",
    refToken: "ref.momentum.easing.linear",
    cssVar: "--ref-momentum-easing-linear",
    description: "Constant speed. Used for progress indicators.",
    useCase: "Progress bars, loading spinners, continuous animations",
    p1x: 0,
    p1y: 0,
    p2x: 1,
    p2y: 1,
  },
];

// ── Stagger data ──
interface StaggerToken {
  name: string;
  value: string;
  ms: number;
  refToken: string;
  cssVar: string;
  useCase: string;
}

const STAGGERS: StaggerToken[] = [
  {
    name: "Fast",
    value: "30ms",
    ms: 30,
    refToken: "ref.momentum.stagger.fast",
    cssVar: "--ref-momentum-stagger-fast",
    useCase: "Dense lists, table rows, compact chip groups",
  },
  {
    name: "Normal",
    value: "50ms",
    ms: 50,
    refToken: "ref.momentum.stagger.normal",
    cssVar: "--ref-momentum-stagger-normal",
    useCase: "Card grids, menu items, standard list reveals",
  },
  {
    name: "Slow",
    value: "80ms",
    ms: 80,
    refToken: "ref.momentum.stagger.slow",
    cssVar: "--ref-momentum-stagger-slow",
    useCase: "Dashboard widgets, onboarding steps, hero sections",
  },
];

// ── Sys mapping data ──
interface SysMappingRow {
  sysToken: string;
  cssVar: string;
  defaultRef: string;
  compactRef: string;
  comfortableRef: string;
}

const SYS_MAPPINGS: SysMappingRow[] = [
  {
    sysToken: "sys.momentum.duration.fast",
    cssVar: "--sys-momentum-duration-fast",
    defaultRef: "fast (100ms)",
    compactRef: "fast (100ms)",
    comfortableRef: "fast (100ms)",
  },
  {
    sysToken: "sys.momentum.duration.default",
    cssVar: "--sys-momentum-duration-default",
    defaultRef: "normal (200ms)",
    compactRef: "fast (100ms)",
    comfortableRef: "normal (200ms)",
  },
  {
    sysToken: "sys.momentum.duration.slow",
    cssVar: "--sys-momentum-duration-slow",
    defaultRef: "slow (350ms)",
    compactRef: "normal (200ms)",
    comfortableRef: "slower (500ms)",
  },
];

type Tab = "durations" | "easings" | "demos" | "tokens" | "reduced";

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

// ── Easing curve SVG ──
function EasingCurve({
  easing,
  size = 120,
  selected,
}: {
  easing: EasingToken;
  size?: number;
  selected?: boolean;
}) {
  const pad = 12;
  const w = size - pad * 2;
  const h = size - pad * 2;
  // Build cubic bezier path
  const x0 = pad,
    y0 = size - pad;
  const x3 = size - pad,
    y3 = pad;
  const cx1 = pad + easing.p1x * w;
  const cy1 = size - pad - easing.p1y * h;
  const cx2 = pad + easing.p2x * w;
  const cy2 = size - pad - easing.p2y * h;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      {/* Grid */}
      <rect
        x={pad}
        y={pad}
        width={w}
        height={h}
        fill="none"
        stroke="var(--sys-energy-border-default)"
        strokeWidth="1"
      />
      {/* Control point lines */}
      <line
        x1={x0}
        y1={y0}
        x2={cx1}
        y2={cy1}
        stroke="var(--sys-energy-text-tertiary)"
        strokeWidth="1"
        strokeDasharray="3,3"
      />
      <line
        x1={x3}
        y1={y3}
        x2={cx2}
        y2={cy2}
        stroke="var(--sys-energy-text-tertiary)"
        strokeWidth="1"
        strokeDasharray="3,3"
      />
      {/* Curve */}
      <path
        d={`M ${x0} ${y0} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x3} ${y3}`}
        fill="none"
        stroke={selected ? "var(--sys-energy-action-primary)" : "var(--sys-energy-text-accent)"}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Control points */}
      <circle cx={cx1} cy={cy1} r="3.5" fill="var(--sys-energy-status-warning)" />
      <circle cx={cx2} cy={cy2} r="3.5" fill="var(--sys-energy-status-success)" />
      {/* End points */}
      <circle cx={x0} cy={y0} r="3" fill="var(--sys-energy-text-primary)" />
      <circle cx={x3} cy={y3} r="3" fill="var(--sys-energy-text-primary)" />
    </svg>
  );
}

// ── Animated timeline bar ──
function TimelineBar({ duration, playing }: { duration: DurationToken; playing: boolean }) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef(0);

  // Reset progress synchronously during render when playing/duration changes
  const [prevPlaying, setPrevPlaying] = useState(playing);
  const [prevDurationMs, setPrevDurationMs] = useState(duration.ms);
  if (playing !== prevPlaying || duration.ms !== prevDurationMs) {
    setPrevPlaying(playing);
    setPrevDurationMs(duration.ms);
    if (!playing) {
      setProgress(0);
    } else if (duration.ms === 0) {
      setProgress(100);
    }
  }

  useEffect(() => {
    if (!playing || duration.ms === 0) return;
    // Respect prefers-reduced-motion: skip animation, show end state immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setProgress(100));
      return;
    }
    startRef.current = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startRef.current;
      const p = Math.min(100, (elapsed / duration.ms) * 100);
      setProgress(p);
      if (p < 100) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, duration.ms]);

  return (
    <div
      style={{
        height: "var(--ref-frame-space-2)",
        borderRadius: "var(--ref-frame-radius-full)",
        background: "var(--sys-energy-surface-tertiary)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          height: "100%",
          borderRadius: "var(--ref-frame-radius-full)",
          background:
            duration.ms === 0
              ? "var(--sys-energy-text-tertiary)"
              : "var(--sys-energy-action-primary)",
          width: `${progress}%`,
          transition: duration.ms === 0 ? "none" : undefined,
        }}
      />
    </div>
  );
}

// ── Live demo component ──
function LiveDemo({ type }: { type: "micro" | "transition" | "choreography" | "continuous" }) {
  const [active, setActive] = useState(false);

  const toggle = useCallback(() => setActive((a) => !a), []);

  // Auto-reset for choreography — duration chosen to outlast the stagger sequence
  // (3 items × slow stagger 80ms + slower animation 500ms = ~740ms total, rounded up)
  // Not a motion token: this is a reset delay, not a transition duration.
  const CHOREOGRAPHY_RESET_DELAY_MS = 1500;
  useEffect(() => {
    if (active && type === "choreography") {
      const t = setTimeout(() => setActive(false), CHOREOGRAPHY_RESET_DELAY_MS);
      return () => clearTimeout(t);
    }
  }, [active, type]);

  if (type === "micro") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--ref-frame-space-4)" }}>
        <Text variant="caption" color="secondary">
          Hover states, button press feedback (100ms, standard easing)
        </Text>
        <div style={{ display: "flex", gap: "var(--ref-frame-space-4)", flexWrap: "wrap" }}>
          <button
            style={{
              padding: "var(--ref-frame-space-3) var(--ref-frame-space-6)",
              borderRadius: "var(--ref-frame-radius-2)",
              background: "var(--sys-energy-action-primary)",
              color: "var(--sys-energy-text-on-action)",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--ref-voice-family-sans)",
              fontSize: "var(--ref-voice-size-5)",
              fontWeight: "var(--ref-voice-weight-medium)",
              transition:
                "background var(--ref-momentum-duration-fast) var(--ref-momentum-easing-standard), transform var(--ref-momentum-duration-fast) var(--ref-momentum-easing-standard)",
            }}
            onMouseDown={(e) => {
              (e.target as HTMLElement).style.transform = "scale(0.97)";
            }}
            onMouseUp={(e) => {
              (e.target as HTMLElement).style.transform = "scale(1)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = "scale(1)";
            }}
          >
            Press me
          </button>
          <button
            type="button"
            style={{
              width: "var(--ref-frame-space-12)",
              height: "var(--ref-frame-space-7)",
              borderRadius: "var(--ref-frame-radius-full)",
              background: active
                ? "var(--sys-energy-action-primary)"
                : "var(--sys-energy-surface-tertiary)",
              cursor: "pointer",
              position: "relative",
              transition:
                "background var(--ref-momentum-duration-fast) var(--ref-momentum-easing-standard)",
              border: "none",
              padding: 0,
            }}
            onClick={toggle}
          >
            <div
              style={{
                width: "var(--ref-frame-space-6)",
                height: "var(--ref-frame-space-6)",
                borderRadius: "var(--ref-frame-radius-full)",
                background: "var(--sys-energy-surface-primary)",
                position: "absolute",
                top: "var(--ref-frame-space-micro)",
                left: active ? "var(--ref-frame-space-6)" : "var(--ref-frame-space-micro)",
                boxShadow: "var(--ref-depth-shadow-1)",
                transition:
                  "left var(--ref-momentum-duration-fast) var(--ref-momentum-easing-standard)",
              }}
            />
          </button>
        </div>
      </div>
    );
  }

  if (type === "transition") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--ref-frame-space-4)" }}>
        <Text variant="caption" color="secondary">
          Expand/collapse, dropdown, page fade (200-350ms, enter/exit easing)
        </Text>
        <button
          onClick={toggle}
          style={{
            padding: "var(--ref-frame-space-2) var(--ref-frame-space-4)",
            borderRadius: "var(--ref-frame-radius-2)",
            border: "1px solid var(--sys-energy-border-default)",
            background: "var(--sys-energy-surface-primary)",
            color: "var(--sys-energy-text-primary)",
            cursor: "pointer",
            fontFamily: "var(--ref-voice-family-sans)",
            fontSize: "var(--ref-voice-size-5)",
            width: "fit-content",
          }}
        >
          {active ? "Collapse" : "Expand"} panel
        </button>
        <div
          style={{
            maxHeight: active ? "200px" : "0px",
            opacity: active ? 1 : 0,
            overflow: "hidden",
            transition: `max-height var(--ref-momentum-duration-slow) var(${active ? "--ref-momentum-easing-enter" : "--ref-momentum-easing-exit"}), opacity var(--ref-momentum-duration-normal) var(--ref-momentum-easing-standard)`,
          }}
        >
          <Surface padding="control" variant="secondary">
            <Stack gap={2}>
              <Text variant="caption" color="accent">
                Panel content revealed
              </Text>
              <Text variant="caption" color="secondary">
                This panel uses 350ms enter easing to appear and exit easing to collapse. The
                opacity transitions at 200ms for a snappy feel.
              </Text>
            </Stack>
          </Surface>
        </div>
      </div>
    );
  }

  if (type === "choreography") {
    const items = ["Dashboard", "Analytics", "Reports", "Settings", "Users"];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--ref-frame-space-4)" }}>
        <Text variant="caption" color="secondary">
          Staggered list reveal (50ms stagger, 200ms each, enter easing)
        </Text>
        <button
          onClick={() => setActive(true)}
          style={{
            padding: "var(--ref-frame-space-2) var(--ref-frame-space-4)",
            borderRadius: "var(--ref-frame-radius-2)",
            border: "1px solid var(--sys-energy-border-default)",
            background: "var(--sys-energy-surface-primary)",
            color: "var(--sys-energy-text-primary)",
            cursor: "pointer",
            fontFamily: "var(--ref-voice-family-sans)",
            fontSize: "var(--ref-voice-size-5)",
            width: "fit-content",
          }}
        >
          Trigger stagger
        </button>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--ref-frame-space-2)" }}>
          {items.map((item, i) => (
            <div
              key={item}
              style={{
                padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                borderRadius: "var(--ref-frame-radius-2)",
                background: "var(--sys-energy-surface-secondary)",
                border: "1px solid var(--sys-energy-border-default)",
                opacity: active ? 1 : 0,
                transform: active
                  ? "translateX(0)"
                  : "translateX(calc(-1 * var(--ref-frame-space-3)))",
                transition: `opacity var(--ref-momentum-duration-normal) var(--ref-momentum-easing-enter) ${i * 50}ms, transform var(--ref-momentum-duration-normal) var(--ref-momentum-easing-enter) ${i * 50}ms`,
                fontFamily: "var(--ref-voice-family-sans)",
                fontSize: "var(--ref-voice-size-5)",
                color: "var(--sys-energy-text-primary)",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // continuous
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--ref-frame-space-4)" }}>
      <Text variant="caption" color="secondary">
        Loading spinners, progress indicators (infinite loop using ref.momentum.duration.cycle)
      </Text>
      <div style={{ display: "flex", gap: "var(--ref-frame-space-6)", alignItems: "center" }}>
        {/* Spinner */}
        <div
          style={{
            width: "var(--ref-frame-space-8)",
            height: "var(--ref-frame-space-8)",
            borderRadius: "var(--ref-frame-radius-full)",
            border: "3px solid var(--sys-energy-surface-tertiary)",
            borderTopColor: "var(--sys-energy-action-primary)",
            animation: "flow-spin var(--ref-momentum-duration-cycle) linear infinite",
          }}
        />
        {/* Shimmer bar */}
        <div
          style={{
            flex: 1,
            maxWidth: "240px",
            height: "var(--ref-frame-space-3)",
            borderRadius: "var(--ref-frame-radius-full)",
            background: "var(--sys-energy-surface-tertiary)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "40%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, var(--sys-energy-surface-accent), transparent)",
              animation: "flow-shimmer var(--ref-momentum-duration-cycle) linear infinite",
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes flow-spin { to { transform: rotate(360deg); } }
        @keyframes flow-shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }
      `}</style>
    </div>
  );
}

// ── Main explorer ──
export function MomentumExplorer() {
  const [tab, setTab] = useState<Tab>("durations");
  const [selectedEasing, setSelectedEasing] = useState(0);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(false);
    requestAnimationFrame(() => setPlaying(true));
  };

  return (
    <Stack gap="component">
      <Divider spacing={0} />

      <Stack gap={2}>
        <Text variant="overline">Interactive Explorer</Text>
        <Text variant="heading-l">Motion System</Text>
        <Text color="secondary">
          5-step duration scale, 4 easing curves, stagger delays, and density-responsive timing. All
          motion respects prefers-reduced-motion.
        </Text>
      </Stack>

      {/* Tab bar */}
      <Inline gap={2} wrap>
        <TabButton
          label="Duration Scale"
          active={tab === "durations"}
          onClick={() => setTab("durations")}
        />
        <TabButton
          label="Easing Curves"
          active={tab === "easings"}
          onClick={() => setTab("easings")}
        />
        <TabButton label="Live Demos" active={tab === "demos"} onClick={() => setTab("demos")} />
        <TabButton
          label="Token Reference"
          active={tab === "tokens"}
          onClick={() => setTab("tokens")}
        />
        <TabButton
          label="Reduced Motion"
          active={tab === "reduced"}
          onClick={() => setTab("reduced")}
        />
      </Inline>

      {/* ── Duration Scale Tab ── */}
      {tab === "durations" && (
        <Stack gap="component">
          {/* Play button */}
          <button
            onClick={handlePlay}
            style={{
              padding: "var(--ref-frame-space-2) var(--ref-frame-space-5)",
              borderRadius: "var(--ref-frame-radius-2)",
              background: "var(--sys-energy-action-primary)",
              color: "var(--sys-energy-text-on-action)",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--ref-voice-family-sans)",
              fontSize: "var(--ref-voice-size-5)",
              fontWeight: "var(--ref-voice-weight-medium)",
              width: "fit-content",
            }}
          >
            Play all durations
          </button>

          {/* Duration bars */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "var(--ref-frame-space-4)" }}
          >
            {DURATIONS.map((d) => (
              <div
                key={d.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 60px 1fr 100px",
                  gap: "var(--ref-frame-space-3)",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--ref-voice-family-sans)",
                    fontSize: "var(--ref-voice-size-5)",
                    fontWeight: "var(--ref-voice-weight-medium)",
                    color: "var(--sys-energy-text-primary)",
                  }}
                >
                  {d.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--ref-voice-family-mono)",
                    fontSize: "var(--ref-voice-size-3)",
                    color: "var(--sys-energy-text-accent)",
                    textAlign: "right",
                  }}
                >
                  {d.value}
                </span>
                <TimelineBar duration={d} playing={playing} />
                <span
                  style={{
                    fontSize: "var(--ref-voice-size-2)",
                    fontFamily: "var(--ref-voice-family-sans)",
                    color: "var(--sys-energy-text-tertiary)",
                    paddingLeft: "var(--ref-frame-space-2)",
                  }}
                >
                  {d.category}
                </span>
              </div>
            ))}
          </div>

          {/* Duration detail cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "var(--ref-frame-space-4)",
            }}
          >
            {DURATIONS.map((d) => (
              <Surface key={d.name} padding={4} border={true}>
                <Stack gap={2}>
                  <Inline gap={2}>
                    <span
                      style={{
                        width: "var(--ref-frame-space-6)",
                        height: "var(--ref-frame-space-6)",
                        borderRadius: "var(--ref-frame-radius-2)",
                        background:
                          d.ms === 0
                            ? "var(--sys-energy-surface-tertiary)"
                            : "var(--sys-energy-surface-accent)",
                        color:
                          d.ms === 0
                            ? "var(--sys-energy-text-tertiary)"
                            : "var(--sys-energy-text-accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "var(--ref-voice-size-3)",
                        fontWeight: "var(--ref-voice-weight-bold)",
                        fontFamily: "var(--ref-voice-family-mono)",
                      }}
                    >
                      {d.ms}
                    </span>
                    <Text style={{ fontWeight: "var(--ref-voice-weight-semibold)" }}>{d.name}</Text>
                  </Inline>
                  <Text variant="caption" color="secondary">
                    {d.useCase}
                  </Text>
                  <div
                    style={{
                      fontFamily: "var(--ref-voice-family-mono)",
                      fontSize: "var(--ref-voice-size-2)",
                      color: "var(--sys-energy-text-tertiary)",
                    }}
                  >
                    {d.refToken}
                  </div>
                </Stack>
              </Surface>
            ))}
          </div>

          {/* Stagger tokens */}
          <Stack gap={3}>
            <Text variant="overline">Stagger Delays</Text>
            <Text color="secondary">
              Used in choreographed sequences where multiple elements animate in succession. Each
              item&apos;s animation starts after the previous item&apos;s stagger delay.
            </Text>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "var(--ref-frame-space-4)",
              }}
            >
              {STAGGERS.map((s) => (
                <Surface key={s.name} padding={4} variant="secondary">
                  <Stack gap={2}>
                    <Inline gap={2}>
                      <span
                        style={{
                          fontFamily: "var(--ref-voice-family-mono)",
                          fontSize: "var(--ref-voice-size-5)",
                          fontWeight: "var(--ref-voice-weight-bold)",
                          color: "var(--sys-energy-text-accent)",
                        }}
                      >
                        +{s.value}
                      </span>
                      <Text style={{ fontWeight: "var(--ref-voice-weight-medium)" }}>
                        Stagger {s.name}
                      </Text>
                    </Inline>
                    <Text variant="caption" color="secondary">
                      {s.useCase}
                    </Text>
                    <div
                      style={{
                        fontFamily: "var(--ref-voice-family-mono)",
                        fontSize: "var(--ref-voice-size-2)",
                        color: "var(--sys-energy-text-tertiary)",
                      }}
                    >
                      {s.cssVar}
                    </div>
                  </Stack>
                </Surface>
              ))}
            </div>
          </Stack>
        </Stack>
      )}

      {/* ── Easing Curves Tab ── */}
      {tab === "easings" && (
        <Stack gap="component">
          {/* Easing cards grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "var(--ref-frame-space-4)",
            }}
          >
            {EASINGS.map((e, i) => (
              <button
                key={e.name}
                onClick={() => setSelectedEasing(i)}
                style={{
                  padding: "var(--ref-frame-space-5)",
                  borderRadius: "var(--ref-frame-radius-3)",
                  background: "var(--sys-energy-surface-primary)",
                  border:
                    selectedEasing === i
                      ? "2px solid var(--sys-energy-border-focus)"
                      : "1px solid var(--sys-energy-border-default)",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--ref-frame-space-3)",
                  fontFamily: "var(--ref-voice-family-sans)",
                }}
              >
                <Inline gap={3}>
                  <EasingCurve easing={e} size={80} selected={selectedEasing === i} />
                  <Stack gap={1} style={{ flex: 1 }}>
                    <span
                      style={{
                        fontSize: "var(--ref-voice-size-6)",
                        fontWeight: "var(--ref-voice-weight-semibold)",
                        color: "var(--sys-energy-text-primary)",
                      }}
                    >
                      {e.name}
                    </span>
                    <span
                      style={{
                        fontSize: "var(--ref-voice-size-3)",
                        fontFamily: "var(--ref-voice-family-mono)",
                        color: "var(--sys-energy-text-accent)",
                      }}
                    >
                      {e.value}
                    </span>
                  </Stack>
                </Inline>
                <span
                  style={{
                    fontSize: "var(--ref-voice-size-4)",
                    color: "var(--sys-energy-text-secondary)",
                  }}
                >
                  {e.description}
                </span>
              </button>
            ))}
          </div>

          {/* Selected easing detail */}
          <Surface padding="container" variant="secondary">
            <Stack gap={4}>
              <Inline gap={4} style={{ alignItems: "flex-start" }}>
                <EasingCurve easing={EASINGS[selectedEasing]} size={160} selected />
                <Stack gap={3} style={{ flex: 1 }}>
                  <Text variant="heading-m" style={{ margin: 0 }}>
                    {EASINGS[selectedEasing].name} Easing
                  </Text>
                  <Text color="secondary">{EASINGS[selectedEasing].description}</Text>
                  <Divider spacing={0} />
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
                      {EASINGS[selectedEasing].refToken}
                    </div>
                    <div>
                      <span style={{ color: "var(--sys-energy-text-tertiary)" }}>css:</span>{" "}
                      {EASINGS[selectedEasing].cssVar}
                    </div>
                    <div>
                      <span style={{ color: "var(--sys-energy-text-tertiary)" }}>val:</span>{" "}
                      {EASINGS[selectedEasing].value}
                    </div>
                    <div>
                      <span style={{ color: "var(--sys-energy-text-tertiary)" }}>use:</span>{" "}
                      {EASINGS[selectedEasing].useCase}
                    </div>
                  </div>
                  {/* Animated preview ball */}
                  <div style={{ marginTop: "var(--ref-frame-space-2)" }}>
                    <Text variant="overline">Animation Preview</Text>
                    <EasingPreviewBall easing={EASINGS[selectedEasing]} />
                  </div>
                </Stack>
              </Inline>
            </Stack>
          </Surface>
        </Stack>
      )}

      {/* ── Live Demos Tab ── */}
      {tab === "demos" && (
        <Stack gap="component">
          <Surface padding="container">
            <Stack gap={3}>
              <Text variant="heading-m" style={{ margin: 0 }}>
                Micro-interactions
              </Text>
              <span
                style={{
                  fontSize: "var(--ref-voice-size-2)",
                  fontFamily: "var(--ref-voice-family-mono)",
                  color: "var(--sys-energy-text-accent)",
                  background: "var(--sys-energy-surface-accent)",
                  padding: "var(--ref-frame-space-micro) var(--ref-frame-space-2)",
                  borderRadius: "var(--ref-frame-radius-full)",
                  width: "fit-content",
                }}
              >
                {"<"} 100ms / standard easing
              </span>
              <LiveDemo type="micro" />
            </Stack>
          </Surface>

          <Surface padding="container">
            <Stack gap={3}>
              <Text variant="heading-m" style={{ margin: 0 }}>
                Transitions
              </Text>
              <span
                style={{
                  fontSize: "var(--ref-voice-size-2)",
                  fontFamily: "var(--ref-voice-family-mono)",
                  color: "var(--sys-energy-text-accent)",
                  background: "var(--sys-energy-surface-accent)",
                  padding: "var(--ref-frame-space-micro) var(--ref-frame-space-2)",
                  borderRadius: "var(--ref-frame-radius-full)",
                  width: "fit-content",
                }}
              >
                200-350ms / enter + exit easing
              </span>
              <LiveDemo type="transition" />
            </Stack>
          </Surface>

          <Surface padding="container">
            <Stack gap={3}>
              <Text variant="heading-m" style={{ margin: 0 }}>
                Choreography
              </Text>
              <span
                style={{
                  fontSize: "var(--ref-voice-size-2)",
                  fontFamily: "var(--ref-voice-family-mono)",
                  color: "var(--sys-energy-text-accent)",
                  background: "var(--sys-energy-surface-accent)",
                  padding: "var(--ref-frame-space-micro) var(--ref-frame-space-2)",
                  borderRadius: "var(--ref-frame-radius-full)",
                  width: "fit-content",
                }}
              >
                200ms each + 50ms stagger / enter easing
              </span>
              <LiveDemo type="choreography" />
            </Stack>
          </Surface>

          <Surface padding="container">
            <Stack gap={3}>
              <Text variant="heading-m" style={{ margin: 0 }}>
                Continuous
              </Text>
              <span
                style={{
                  fontSize: "var(--ref-voice-size-2)",
                  fontFamily: "var(--ref-voice-family-mono)",
                  color: "var(--sys-energy-text-accent)",
                  background: "var(--sys-energy-surface-accent)",
                  padding: "var(--ref-frame-space-micro) var(--ref-frame-space-2)",
                  borderRadius: "var(--ref-frame-radius-full)",
                  width: "fit-content",
                }}
              >
                infinite / linear easing
              </span>
              <LiveDemo type="continuous" />
            </Stack>
          </Surface>
        </Stack>
      )}

      {/* ── Token Reference Tab ── */}
      {tab === "tokens" && (
        <Stack gap="component">
          {/* Ref tokens table */}
          <Stack gap={3}>
            <Text variant="overline">Ref Tokens (Raw Scale)</Text>
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
                      {["Name", "Value", "CSS Variable", "Category"].map((h) => (
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
                    {DURATIONS.map((d) => (
                      <tr
                        key={d.name}
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
                          {d.name}
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: "var(--sys-energy-text-accent)",
                          }}
                        >
                          {d.value}
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: "var(--sys-energy-text-secondary)",
                          }}
                        >
                          {d.cssVar}
                        </td>
                        <td
                          style={{ padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)" }}
                        >
                          <span
                            style={{
                              fontSize: "var(--ref-voice-size-2)",
                              fontWeight: "var(--ref-voice-weight-medium)",
                              color:
                                d.category === "Micro"
                                  ? "var(--sys-energy-text-success)"
                                  : d.category === "Transition"
                                    ? "var(--sys-energy-text-accent)"
                                    : "var(--sys-energy-text-warning)",
                              background:
                                d.category === "Micro"
                                  ? "var(--sys-energy-surface-success)"
                                  : d.category === "Transition"
                                    ? "var(--sys-energy-surface-accent)"
                                    : "var(--sys-energy-surface-warning)",
                              padding: "var(--ref-frame-space-micro) var(--ref-frame-space-2)",
                              borderRadius: "var(--ref-frame-radius-full)",
                            }}
                          >
                            {d.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Surface>
          </Stack>

          {/* Easing tokens table */}
          <Stack gap={3}>
            <Text variant="overline">Easing Functions</Text>
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
                      {["Curve", "Name", "Value", "CSS Variable"].map((h) => (
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
                    {EASINGS.map((e) => (
                      <tr
                        key={e.name}
                        style={{ borderBottom: "1px solid var(--sys-energy-border-default)" }}
                      >
                        <td
                          style={{ padding: "var(--ref-frame-space-2) var(--ref-frame-space-4)" }}
                        >
                          <EasingCurve easing={e} size={48} />
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontWeight: "var(--ref-voice-weight-medium)",
                            color: "var(--sys-energy-text-primary)",
                            fontSize: "var(--ref-voice-size-4)",
                          }}
                        >
                          {e.name}
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: "var(--sys-energy-text-accent)",
                          }}
                        >
                          {e.value}
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: "var(--sys-energy-text-secondary)",
                          }}
                        >
                          {e.cssVar}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Surface>
          </Stack>

          {/* Sys mapping — density-responsive */}
          <Stack gap={3}>
            <Text variant="overline">Sys Tokens (Density-Responsive)</Text>
            <Text variant="caption" color="secondary">
              Sys momentum tokens shift with density mode. Compact UIs use faster timings;
              comfortable UIs allow more expressive transitions.
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
                      {["Sys Token", "Compact", "Default", "Comfortable"].map((h) => (
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
                    {SYS_MAPPINGS.map((m) => (
                      <tr
                        key={m.sysToken}
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
                          {m.cssVar}
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: "var(--sys-energy-text-secondary)",
                          }}
                        >
                          {m.compactRef}
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
                          {m.defaultRef}
                        </td>
                        <td
                          style={{
                            padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                            fontFamily: "var(--ref-voice-family-mono)",
                            fontSize: "var(--ref-voice-size-3)",
                            color: "var(--sys-energy-text-secondary)",
                          }}
                        >
                          {m.comfortableRef}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Surface>
          </Stack>

          {/* Composite transition tokens */}
          <Stack gap={3}>
            <Text variant="overline">Composite Transition Tokens</Text>
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
                    {"// Pre-composed duration + easing for CSS transition shorthand"}
                  </span>
                </div>
                <div>
                  <span style={{ color: "var(--sys-energy-text-accent)" }}>
                    --sys-momentum-transition-fast
                  </span>
                  : 100ms cubic-bezier(0.2, 0, 0, 1)
                </div>
                <div>
                  <span style={{ color: "var(--sys-energy-text-accent)" }}>
                    --sys-momentum-transition-default
                  </span>
                  : 200ms cubic-bezier(0.2, 0, 0, 1)
                </div>
                <div>
                  <span style={{ color: "var(--sys-energy-text-accent)" }}>
                    --sys-momentum-transition-slow
                  </span>
                  : 350ms cubic-bezier(0.2, 0, 0, 1)
                </div>
              </div>
            </Surface>
          </Stack>
        </Stack>
      )}

      {/* ── Reduced Motion Tab ── */}
      {tab === "reduced" && (
        <Stack gap="component">
          <Surface padding="container">
            <Stack gap={4}>
              <Text variant="heading-m" style={{ margin: 0 }}>
                prefers-reduced-motion Strategy
              </Text>
              <Text color="secondary">
                When the user&apos;s system setting requests reduced motion, FLOW adapts all
                animations to be non-disorienting. The strategy is progressive: remove spatial
                animations first, simplify to opacity-only fades, and reduce durations to
                near-instant.
              </Text>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "var(--ref-frame-space-4)",
                }}
              >
                {/* Standard */}
                <Surface padding="control" variant="secondary">
                  <Stack gap={3}>
                    <Text variant="overline">Standard Motion</Text>
                    <div
                      style={{
                        fontFamily: "var(--ref-voice-family-mono)",
                        fontSize: "var(--ref-voice-size-3)",
                        lineHeight: 2,
                        color: "var(--sys-energy-text-secondary)",
                      }}
                    >
                      <div>Slide + fade transitions</div>
                      <div>Scale animations on press</div>
                      <div>Staggered list reveals</div>
                      <div>Loading spinners rotate</div>
                      <div>Page cross-fades</div>
                    </div>
                  </Stack>
                </Surface>

                {/* Reduced */}
                <Surface padding="control" variant="secondary">
                  <Stack gap={3}>
                    <Text variant="overline">Reduced Motion</Text>
                    <div
                      style={{
                        fontFamily: "var(--ref-voice-family-mono)",
                        fontSize: "var(--ref-voice-size-3)",
                        lineHeight: 2,
                        color: "var(--sys-energy-text-secondary)",
                      }}
                    >
                      <div>Fade-only transitions (150ms)</div>
                      <div>No scale, no translate</div>
                      <div>Instant list appearance</div>
                      <div>Static or pulse opacity</div>
                      <div>Instant page switch</div>
                    </div>
                  </Stack>
                </Surface>
              </div>
            </Stack>
          </Surface>

          <Surface padding="container">
            <Stack gap={4}>
              <Text variant="heading-m" style={{ margin: 0 }}>
                Implementation Pattern
              </Text>
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
                      {"/* CSS approach — override at media query level */"}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: "var(--sys-energy-text-accent)" }}>@media</span>{" "}
                    (prefers-reduced-motion: reduce) {"{"}
                  </div>
                  <div>
                    {"  "}:root {"{"}
                  </div>
                  <div>{"    "}--ref-momentum-duration-fast: 0ms;</div>
                  <div>{"    "}--ref-momentum-duration-normal: 0ms;</div>
                  <div>{"    "}--ref-momentum-duration-slow: 150ms;</div>
                  <div>{"    "}--ref-momentum-duration-slower: 150ms;</div>
                  <div>
                    {"  "}
                    {"}"}
                  </div>
                  <div>
                    {"  "}
                    <span style={{ color: "var(--sys-energy-text-tertiary)" }}>
                      {"/* Remove all transform-based animations */"}
                    </span>
                  </div>
                  <div>
                    {"  "}*, *::before, *::after {"{"}
                  </div>
                  <div>{"    "}animation-duration: 0.01ms !important;</div>
                  <div>{"    "}transition-duration: 0.01ms !important;</div>
                  <div>
                    {"  "}
                    {"}"}
                  </div>
                  <div>
                    {"  "}
                    <span style={{ color: "var(--sys-energy-text-tertiary)" }}>
                      {"/* Allow opacity-only fades */"}
                    </span>
                  </div>
                  <div>
                    {"  "}.flow-allow-fade {"{"}
                  </div>
                  <div>
                    {"    "}transition: opacity 150ms var(--ref-momentum-easing-standard)
                    !important;
                  </div>
                  <div>
                    {"  "}
                    {"}"}
                  </div>
                  <div>{"}"}</div>
                </div>
              </Surface>
            </Stack>
          </Surface>

          <Surface padding="container">
            <Stack gap={4}>
              <Text variant="heading-m" style={{ margin: 0 }}>
                Decision Matrix
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
                        {["Animation Type", "Standard", "Reduced"].map((h) => (
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
                      {[
                        ["Hover overlay", "100ms opacity", "Instant"],
                        ["Button press scale", "100ms scale(0.97)", "No animation"],
                        ["Dropdown open", "200ms slide+fade", "150ms fade only"],
                        ["Modal enter", "350ms slide-up+fade", "150ms fade only"],
                        ["Modal exit", "200ms slide-down+fade", "Instant"],
                        ["Staggered list", "200ms each + 50ms stagger", "Instant appearance"],
                        ["Page transition", "300ms cross-fade", "Instant switch"],
                        ["Loading spinner", "Infinite rotate", "Static or subtle pulse"],
                        ["Progress bar", "Smooth fill", "Stepped fill"],
                      ].map(([type, standard, reduced]) => (
                        <tr
                          key={type}
                          style={{ borderBottom: "1px solid var(--sys-energy-border-default)" }}
                        >
                          <td
                            style={{
                              padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                              fontSize: "var(--ref-voice-size-4)",
                              color: "var(--sys-energy-text-primary)",
                              fontWeight: "var(--ref-voice-weight-medium)",
                            }}
                          >
                            {type}
                          </td>
                          <td
                            style={{
                              padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                              fontFamily: "var(--ref-voice-family-mono)",
                              fontSize: "var(--ref-voice-size-3)",
                              color: "var(--sys-energy-text-secondary)",
                            }}
                          >
                            {standard}
                          </td>
                          <td
                            style={{
                              padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                              fontFamily: "var(--ref-voice-family-mono)",
                              fontSize: "var(--ref-voice-size-3)",
                              color: "var(--sys-energy-text-accent)",
                            }}
                          >
                            {reduced}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Surface>
            </Stack>
          </Surface>
        </Stack>
      )}
    </Stack>
  );
}

// ── Easing preview ball ──
function EasingPreviewBall({ easing }: { easing: EasingToken }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Read the slower duration token from CSS and add a pause buffer
    const slowerMs =
      parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--ref-momentum-duration-slower")
          .trim(),
      ) || 500;
    const intervalMs = slowerMs + 700; // duration + pause
    const interval = setInterval(() => {
      setAnimate((a) => !a);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [easing]);

  return (
    <div
      style={{
        height: "var(--ref-frame-space-9)",
        position: "relative",
        background: "var(--sys-energy-surface-tertiary)",
        borderRadius: "var(--ref-frame-radius-full)",
        marginTop: "var(--ref-frame-space-2)",
      }}
    >
      <div
        style={{
          width: "var(--ref-frame-space-7)",
          height: "var(--ref-frame-space-7)",
          borderRadius: "var(--ref-frame-radius-full)",
          background: "var(--sys-energy-action-primary)",
          position: "absolute",
          top: "var(--ref-frame-space-1)",
          left: animate ? "calc(100% - var(--ref-frame-space-8))" : "var(--ref-frame-space-1)",
          transition: `left var(--ref-momentum-duration-slower) ${easing.value}`,
        }}
      />
    </div>
  );
}
