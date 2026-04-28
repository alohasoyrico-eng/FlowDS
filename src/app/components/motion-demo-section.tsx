/**
 * FLOW — Motion Demo Section
 * ──────────────────────────────────────────────────────
 * Reusable interactive demos that demonstrate FLOW's Momentum foundation:
 *
 *   1. DurationComparisonDemo  — all 5 duration tiers, side-by-side
 *   2. EasingComparisonDemo    — all 4 easing curves, animated ball on track
 *   3. StaggerDemo             — 3 stagger speeds (30ms / 50ms / 80ms)
 *   4. MotionTokensReference   — inline reference table of all motion tokens
 *
 * Usage in any demo file:
 *   import { DurationComparisonDemo, EasingComparisonDemo, StaggerDemo } from "../../components/motion-demo-section";
 *
 * Architecture notes:
 *   - All timing values reference momentum CSS tokens (no magic numbers)
 *   - "Replay" buttons increment a key to force React to remount children,
 *     re-triggering CSS animations from frame 0
 *   - `animation-fill-mode: both` keeps elements invisible before animation starts
 *   - Respects prefers-reduced-motion via the [prefers-reduced-motion] overrides
 *     already set in flow.css
 */

import { useCallback, useState } from "react";

import { Grid, Inline, Stack, Surface, Text } from "@flow/primitives";
import { FlowButton } from "@flow/components";
import { DemoGroup, DemoSection } from "./demo-helpers";

// ── Duration scale ────────────────────────────────────────────────────────────

const DURATION_TIERS = [
  {
    label: "instant",
    token: "--ref-momentum-duration-instant",
    ms: "0ms",
    desc: "Immediate feedback — toggle states, checkbox checks",
  },
  {
    label: "fast",
    token: "--ref-momentum-duration-fast",
    ms: "100ms",
    desc: "Micro-interactions — hover reveals, focus rings, icon swaps",
  },
  {
    label: "normal",
    token: "--ref-momentum-duration-normal",
    ms: "200ms",
    desc: "Default — most state transitions, color changes, border shifts",
  },
  {
    label: "slow",
    token: "--ref-momentum-duration-slow",
    ms: "350ms",
    desc: "Deliberate reveals — dialogs opening, dropdowns expanding",
  },
  {
    label: "slower",
    token: "--ref-momentum-duration-slower",
    ms: "500ms",
    desc: "Expressive moments — onboarding, success celebrations",
  },
] as const;

// ── Easing scale ─────────────────────────────────────────────────────────────

const EASING_CURVES = [
  {
    label: "standard",
    token: "--ref-momentum-easing-standard",
    value: "cubic-bezier(0.2, 0, 0, 1)",
    desc: "Most transitions — balanced feel for persistent elements",
  },
  {
    label: "enter",
    token: "--ref-momentum-easing-enter",
    value: "cubic-bezier(0, 0, 0, 1)",
    desc: "Content appearing — decelerates into final position",
  },
  {
    label: "exit",
    token: "--ref-momentum-easing-exit",
    value: "cubic-bezier(0.2, 0, 1, 1)",
    desc: "Content disappearing — accelerates out of view",
  },
  {
    label: "linear",
    token: "--ref-momentum-easing-linear",
    value: "cubic-bezier(0, 0, 1, 1)",
    desc: "Continuous motion — spinners, progress fills, loops",
  },
] as const;

// ── Stagger tiers ─────────────────────────────────────────────────────────────

const STAGGER_TIERS = [
  { label: "fast", token: "--ref-momentum-stagger-fast", ms: "30ms" },
  { label: "normal", token: "--ref-momentum-stagger-normal", ms: "50ms" },
  { label: "slow", token: "--ref-momentum-stagger-slow", ms: "80ms" },
] as const;

const STAGGER_ITEMS = ["Design Tokens", "Components", "Patterns", "Templates"];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. Duration Comparison Demo
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Shows all 5 duration tiers as progress-bar fills triggered simultaneously.
 * The visual difference makes duration semantics immediately obvious.
 *
 * Token demonstrated: ref.momentum.duration.{instant,fast,normal,slow,slower}
 */
export function DurationComparisonDemo() {
  const [active, setActive] = useState(false);

  const replay = useCallback(() => {
    // Reset to 0% first, then animate to 100% on next frame
    setActive(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setActive(true));
    });
  }, []);

  return (
    <DemoSection
      title="Duration Scale"
      description="All 5 duration tiers triggered simultaneously. The fills reach the same endpoint — the difference is only speed. Use sys-momentum-duration-* in components; ref tokens are for demos and token definitions only."
    >
      <DemoGroup>
        <Stack gap="component">
          <div className="flow-demo-motion-replay-row">
            <FlowButton variant="outlined" size="sm" onClick={replay}>
              ▶ Replay
            </FlowButton>
            <Text variant="caption" color="tertiary">
              All bars start at 0% and fill to 100% simultaneously
            </Text>
          </div>

          <Stack gap="component">
            {DURATION_TIERS.map(({ label, token, ms, desc }) => (
              <Stack key={label} gap={1}>
                <Inline gap="component" align="center" justify="between">
                  <Inline gap="component" align="center">
                    <Text
                      variant="label-s"
                      color="secondary"
                      style={{ minWidth: "var(--ref-frame-space-14)" }}
                    >
                      {label}
                    </Text>
                    <Text variant="caption" color="tertiary">
                      {ms} — {desc}
                    </Text>
                  </Inline>
                  <Text
                    variant="caption"
                    color="tertiary"
                    style={{ fontFamily: "var(--ref-voice-family-mono)", whiteSpace: "nowrap" }}
                  >
                    var({token})
                  </Text>
                </Inline>

                <div className="flow-demo-duration-track">
                  <div
                    className="flow-demo-duration-bar"
                    style={{
                      width: active ? "100%" : "0%",
                      transition: `width var(${token}) var(--ref-momentum-easing-standard)`,
                    }}
                  />
                </div>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </DemoGroup>
    </DemoSection>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. Easing Comparison Demo
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Shows all 4 easing curves as a ball moving across a track.
 * All balls use the same duration (slower = 500ms) so only the curve shape differs.
 *
 * Token demonstrated: ref.momentum.easing.{standard,enter,exit,linear}
 */
export function EasingComparisonDemo() {
  const [active, setActive] = useState(false);

  const replay = useCallback(() => {
    setActive(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setActive(true));
    });
  }, []);

  return (
    <DemoSection
      title="Easing Curves"
      description="All 4 easing curves at the same duration (500ms = slower). The path from start to end is identical — only the acceleration profile changes. standard is the default for most transitions."
    >
      <DemoGroup>
        <Stack gap="component">
          <div className="flow-demo-motion-replay-row">
            <FlowButton variant="outlined" size="sm" onClick={replay}>
              ▶ Replay
            </FlowButton>
            <Text variant="caption" color="tertiary">
              Same duration (500ms), different acceleration
            </Text>
          </div>

          <Stack gap="component">
            {EASING_CURVES.map(({ label, token, value, desc }) => (
              <Stack key={label} gap={1}>
                <Inline gap="component" align="center" justify="between">
                  <Inline gap="component" align="center">
                    <Text
                      variant="label-s"
                      color="secondary"
                      style={{ minWidth: "var(--ref-frame-space-16)" }}
                    >
                      {label}
                    </Text>
                    <Text variant="caption" color="tertiary">
                      {desc}
                    </Text>
                  </Inline>
                  <Text
                    variant="caption"
                    color="tertiary"
                    style={{ fontFamily: "var(--ref-voice-family-mono)", whiteSpace: "nowrap" }}
                  >
                    var({token})
                  </Text>
                </Inline>

                <div className="flow-demo-motion-track">
                  <div
                    className="flow-demo-motion-ball"
                    style={{
                      left: active ? "calc(100% - 36px)" : "0",
                      transition: active
                        ? `left var(--ref-momentum-duration-slower) var(${token})`
                        : "none",
                    }}
                  />
                </div>

                <Text
                  variant="caption"
                  color="tertiary"
                  style={{ fontFamily: "var(--ref-voice-family-mono)" }}
                >
                  {value}
                </Text>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </DemoGroup>
    </DemoSection>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. Stagger Choreography Demo
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Shows 3 stagger speeds with 4 items each.
 * Incrementing `animKey` forces React to remount children, restarting animations.
 *
 * Token demonstrated: ref.momentum.stagger.{fast,normal,slow}
 */
export function StaggerDemo() {
  const [animKey, setAnimKey] = useState(0);

  return (
    <DemoSection
      title="Stagger Choreography"
      description="Items in a list or grid should not appear simultaneously — stagger delays create a cascade that reads as organized, not chaotic. Fast (30ms) for dense lists, normal (50ms) for cards, slow (80ms) for featured content."
    >
      <DemoGroup>
        <Stack gap="component">
          <div className="flow-demo-motion-replay-row">
            <FlowButton variant="outlined" size="sm" onClick={() => setAnimKey((k) => k + 1)}>
              ▶ Replay
            </FlowButton>
          </div>

          <Grid columns={3} gap="component-lg">
            {STAGGER_TIERS.map(({ label, token, ms }) => (
              <Stack key={label} gap="component">
                <Stack gap={1}>
                  <Text variant="label-s" color="secondary">
                    {label}
                  </Text>
                  <Text variant="caption" color="tertiary">
                    {ms} between items
                  </Text>
                  <Text
                    variant="caption"
                    color="tertiary"
                    style={{ fontFamily: "var(--ref-voice-family-mono)" }}
                  >
                    var({token})
                  </Text>
                </Stack>

                <Stack gap={1}>
                  {STAGGER_ITEMS.map((item, i) => (
                    <Surface
                      key={`${animKey}-${label}-${i}`}
                      variant="secondary"
                      radius="control"
                      padding="control"
                      className="flow-demo-slide-in"
                      style={{
                        animationDuration: "var(--ref-momentum-duration-normal)",
                        animationTimingFunction: "var(--ref-momentum-easing-enter)",
                        animationDelay: `calc(${i} * var(${token}))`,
                      }}
                    >
                      <Text variant="label-s">{item}</Text>
                    </Surface>
                  ))}
                </Stack>
              </Stack>
            ))}
          </Grid>
        </Stack>
      </DemoGroup>
    </DemoSection>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. Motion Tokens Reference
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Static reference table of all momentum tokens.
 * Companion to the interactive demos above.
 */
export function MotionTokensReference() {
  return (
    <DemoSection
      title="Motion Token Reference"
      description="Quick reference for all momentum tokens. Always consume sys-layer tokens in components (sys-momentum-transition-*); use ref tokens only in token definitions and demo code."
    >
      <DemoGroup>
        <Grid columns={2} gap="component-lg">
          {/* Duration */}
          <Stack gap="component">
            <Text variant="label-l">Duration</Text>
            <Stack gap={1}>
              {[
                { sys: "--sys-momentum-duration-fast", ms: "100ms (compact: 100ms)" },
                {
                  sys: "--sys-momentum-duration-default",
                  ms: "200ms (compact: 100ms)",
                },
                {
                  sys: "--sys-momentum-duration-slow",
                  ms: "350ms (compact: 200ms, comfortable: 500ms)",
                },
              ].map(({ sys, ms }) => (
                <Surface key={sys} variant="secondary" radius="control" padding="control">
                  <Stack gap={1}>
                    <Text variant="label-s" style={{ fontFamily: "var(--ref-voice-family-mono)" }}>
                      var({sys})
                    </Text>
                    <Text variant="caption" color="tertiary">
                      {ms}
                    </Text>
                  </Stack>
                </Surface>
              ))}
            </Stack>
          </Stack>

          {/* Transition shortcuts */}
          <Stack gap="component">
            <Text variant="label-l">Transition Shortcuts</Text>
            <Stack gap={1}>
              {[
                { sys: "--sys-momentum-transition-fast", val: "duration-fast + easing-standard" },
                {
                  sys: "--sys-momentum-transition-default",
                  val: "duration-default + easing-standard",
                },
                { sys: "--sys-momentum-transition-slow", val: "duration-slow + easing-standard" },
              ].map(({ sys, val }) => (
                <Surface key={sys} variant="secondary" radius="control" padding="control">
                  <Stack gap={1}>
                    <Text variant="label-s" style={{ fontFamily: "var(--ref-voice-family-mono)" }}>
                      var({sys})
                    </Text>
                    <Text variant="caption" color="tertiary">
                      {val}
                    </Text>
                  </Stack>
                </Surface>
              ))}
            </Stack>
            <Text variant="caption" color="tertiary">
              Usage:{" "}
              <code style={{ fontFamily: "var(--ref-voice-family-mono)" }}>
                transition: color var(--sys-momentum-transition-default)
              </code>
            </Text>
          </Stack>
        </Grid>
      </DemoGroup>
    </DemoSection>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Composite: all 4 sections together
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Full momentum foundation showcase — drop into any demo page as a section.
 * Shows duration comparison, easing curves, stagger, and token reference.
 */
export function MomentumDemoBlock() {
  return (
    <Stack gap="section">
      <DurationComparisonDemo />
      <EasingComparisonDemo />
      <StaggerDemo />
      <MotionTokensReference />
    </Stack>
  );
}
