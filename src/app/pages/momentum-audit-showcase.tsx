/**
 * FLOW — Momentum Audit Showcase
 * ─────────────────────────────────────────────────────────────────────
 * Interactive motion & transition system demonstration.
 *
 * MOMENTUM FOUNDATION (formerly "Motion"):
 * - Duration tokens: instant, fast, normal, slow, slower
 * - Easing functions: standard, enter, exit, linear
 * - Stagger patterns: choreography for sequential animations
 *
 * This page addresses Momentum audit finding: 0% compliance.
 * Previously demos used hardcoded 1200ms timeouts. This showcases
 * proper token-based motion system.
 */

import { useState } from "react";

import { Divider, FlowButton, FlowChip, Grid, Inline, Stack, Surface, Text } from "../../lib";
import { Callout, CodeBlock, PageHeader, Section } from "../components/doc-primitives";
import { DemoGroup, DemoSection } from "../components/demo-helpers";
import { LayoutGrid } from "../components/layout-grid";

type Duration = "instant" | "fast" | "normal" | "slow" | "slower";
type Easing = "standard" | "enter" | "exit" | "linear";

/**
 * Get Momentum token duration value in milliseconds
 */
function getDurationMs(
  duration: Duration,
  denseMode?: "compact" | "default" | "comfortable",
): number {
  // Default to standard density mode
  const density = denseMode || "default";

  const durations = {
    compact: {
      instant: 0,
      fast: 30,
      normal: 50,
      slow: 70,
      slower: 100,
    },
    default: {
      instant: 0,
      fast: 35,
      normal: 65,
      slow: 95,
      slower: 130,
    },
    comfortable: {
      instant: 0,
      fast: 40,
      normal: 80,
      slow: 120,
      slower: 160,
    },
  };

  return durations[density][duration];
}

/**
 * Get Momentum token easing function (constant across densities)
 */
function getEasingValue(easing: Easing): string {
  const easings = {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    enter: "cubic-bezier(0.05, 0.7, 0.1, 1)",
    exit: "cubic-bezier(0.3, 0, 0.8, 0.15)",
    linear: "linear",
  };
  return easings[easing];
}

/**
 * AnimatedBox: Simple box that animates to show motion
 */
function AnimatedBox({
  duration,
  easing,
  label,
}: {
  duration: Duration;
  easing: Easing;
  label: string;
}) {
  const [animate, setAnimate] = useState(false);
  const durationMs = getDurationMs(duration);
  const easingValue = getEasingValue(easing);

  const durationSec = durationMs / 1000;

  return (
    <Surface variant="primary" padding="control" radius="control">
      <Stack gap={3} align="start">
        <Stack gap={1}>
          <Text role="label-m">{label}</Text>
          <Text role="caption" color="secondary">
            {durationMs}ms • {easing}
          </Text>
        </Stack>

        <div
          style={{
            width: "100%",
            height: "90px",
            background: "var(--sys-energy-accent-subtle)",
            borderRadius: "var(--ref-frame-radius-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: animate ? "calc(100% - 40px)" : "0px",
              width: "var(--ref-frame-space-10)",
              height: "var(--ref-frame-space-10)",
              background: "var(--sys-energy-accent)",
              borderRadius: "var(--ref-frame-radius-1)",
              transition: `left ${durationSec}s ${easingValue}`,
            }}
          />
        </div>

        <FlowButton
          variant="secondary"
          size="sm"
          onClick={() => {
            setAnimate(false);
            // Trigger reflow to reset animation
            void document.body.offsetHeight;
            setAnimate(true);
          }}
        >
          Play
        </FlowButton>
      </Stack>
    </Surface>
  );
}

/**
 * StaggerList: Shows choreography of staggered animations
 */
function StaggerList({
  duration,
  staggerDelay,
  itemCount = 5,
}: {
  duration: Duration;
  staggerDelay: number;
  itemCount?: number;
}) {
  const [animate, setAnimate] = useState(false);
  const durationMs = getDurationMs(duration);
  const durationSec = durationMs / 1000;
  const staggerSec = staggerDelay / 1000;

  return (
    <Stack gap={3}>
      <Stack gap={1}>
        <Text role="label-m">Stagger Choreography</Text>
        <Text role="caption" color="secondary">
          {itemCount} items, {staggerDelay}ms delay between each
        </Text>
      </Stack>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--ref-frame-space-2)",
        }}
      >
        {Array.from({ length: itemCount }).map((_, idx) => (
          <div
            key={idx}
            style={{
              width: "100%",
              height: "var(--ref-frame-space-10)",
              background: "var(--sys-energy-surface-secondary)",
              borderRadius: "var(--ref-frame-radius-1)",
              opacity: animate ? 1 : 0.3,
              transform: animate ? "translateX(0)" : "translateX(-20px)",
              transition: `all ${durationSec}s cubic-bezier(0.05, 0.7, 0.1, 1) ${idx * staggerSec}s`,
            }}
          />
        ))}
      </div>

      <FlowButton
        variant="secondary"
        size="sm"
        onClick={() => {
          setAnimate(false);
          void document.body.offsetHeight;
          setAnimate(true);
        }}
      >
        Play Stagger
      </FlowButton>
    </Stack>
  );
}

/**
 * Main Momentum Showcase Page
 */
export function MomentumAuditShowcasePage() {
  const [selectedDuration, setSelectedDuration] = useState<Duration>("normal");
  const [selectedEasing, setSelectedEasing] = useState<Easing>("standard");
  const [selectedDensity, setSelectedDensity] = useState<"compact" | "default" | "comfortable">(
    "default",
  );

  const durations: Duration[] = ["instant", "fast", "normal", "slow", "slower"];
  const easings: Easing[] = ["standard", "enter", "exit", "linear"];

  return (
    <LayoutGrid>
      <Surface variant="primary" padding="layout" radius="layout">
        <Stack gap={8}>
          {/* ────────────────────────────────────────────────────────── */}
          {/* PAGE HEADER */}
          {/* ────────────────────────────────────────────────────────── */}
          <PageHeader chapter="Audit" title="Momentum System Showcase">
            The Momentum foundation controls motion: transition durations, easing curves, and
            stagger choreography. This audit fix demonstrates all motion patterns that were
            previously hardcoded (40+ instances of 1200ms magic numbers).
          </PageHeader>

          <Divider spacing={0} />

          {/* ────────────────────────────────────────────────────────── */}
          {/* 1. DURATION TOKENS */}
          {/* ────────────────────────────────────────────────────────── */}
          <Section
            title="1. Duration Tokens"
            description="Five standard durations scale slightly with density. Compact mode uses faster timings (for data-heavy UIs), comfortable mode is generous (for touch UIs)."
          >
            <DemoSection title="Duration Selector">
              <DemoGroup>
                <Stack gap={4}>
                  <Stack gap={2}>
                    <Text role="overline" color="tertiary">
                      Select Density Mode
                    </Text>
                    <Inline gap={2} wrap>
                      {(["compact", "default", "comfortable"] as const).map((d) => (
                        <FlowChip
                          key={d}
                          variant={selectedDensity === d ? "primary" : "secondary"}
                          onClick={() => setSelectedDensity(d)}
                        >
                          {d === "compact" && "Compact"}
                          {d === "default" && "Default"}
                          {d === "comfortable" && "Comfortable"}
                        </FlowChip>
                      ))}
                    </Inline>
                  </Stack>

                  <Stack gap={2}>
                    <Text role="overline" color="tertiary">
                      Select Duration
                    </Text>
                    <Inline gap={2} wrap>
                      {durations.map((dur) => (
                        <FlowChip
                          key={dur}
                          variant={selectedDuration === dur ? "primary" : "secondary"}
                          onClick={() => setSelectedDuration(dur)}
                        >
                          {dur.charAt(0).toUpperCase() + dur.slice(1)} (
                          {getDurationMs(dur, selectedDensity)}ms)
                        </FlowChip>
                      ))}
                    </Inline>
                  </Stack>
                </Stack>
              </DemoGroup>
            </DemoSection>

            <DemoSection title="All Durations Reference Table">
              <DemoGroup>
                <div
                  style={{
                    overflowX: "auto",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "var(--ref-voice-size-4)",
                    }}
                  >
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--sys-energy-border-default)" }}>
                        <th style={{ textAlign: "left", padding: "var(--ref-frame-space-2)", fontWeight: 600 }}>
                          Token
                        </th>
                        <th style={{ textAlign: "center", padding: "var(--ref-frame-space-2)", fontWeight: 600 }}>
                          Compact
                        </th>
                        <th style={{ textAlign: "center", padding: "var(--ref-frame-space-2)", fontWeight: 600 }}>
                          Default
                        </th>
                        <th style={{ textAlign: "center", padding: "var(--ref-frame-space-2)", fontWeight: 600 }}>
                          Comfortable
                        </th>
                        <th style={{ textAlign: "left", padding: "var(--ref-frame-space-2)", fontWeight: 600 }}>
                          Use Case
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {durations.map((dur) => (
                        <tr
                          key={dur}
                          style={{ borderBottom: "1px solid var(--sys-energy-border-subtle)" }}
                        >
                          <td
                            style={{
                              padding: "var(--ref-frame-space-2)",
                              fontFamily: "var(--ref-voice-family-mono)",
                              fontWeight: "var(--ref-voice-weight-medium)",
                            }}
                          >
                            --sys-momentum-transition-{dur}
                          </td>
                          <td style={{ textAlign: "center", padding: "var(--ref-frame-space-2)" }}>
                            {getDurationMs(dur, "compact")}ms
                          </td>
                          <td style={{ textAlign: "center", padding: "var(--ref-frame-space-2)" }}>
                            {getDurationMs(dur, "default")}ms
                          </td>
                          <td style={{ textAlign: "center", padding: "var(--ref-frame-space-2)" }}>
                            {getDurationMs(dur, "comfortable")}ms
                          </td>
                          <td style={{ padding: "var(--ref-frame-space-2)", fontSize: "var(--ref-voice-size-xs)" }}>
                            {dur === "instant" && "UI state changes (0ms visual feedback)"}
                            {dur === "fast" && "Hover states, tooltip appears"}
                            {dur === "normal" && "Standard transitions, modal opens"}
                            {dur === "slow" && "Loading spinners, emphasized transitions"}
                            {dur === "slower" && "Page transitions, major layout shifts"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </DemoGroup>
            </DemoSection>
          </Section>

          <Divider spacing={2} />

          {/* ────────────────────────────────────────────────────────── */}
          {/* 2. EASING FUNCTIONS */}
          {/* ────────────────────────────────────────────────────────── */}
          <Section
            title="2. Easing Functions"
            description="Four easing curves for different motion types. Constant across all density modes."
          >
            <DemoSection title="Compare All Easing Curves">
              <DemoGroup>
                <Stack gap={4}>
                  <Stack gap={2}>
                    <Text role="overline" color="tertiary">
                      Select Easing
                    </Text>
                    <Inline gap={2} wrap>
                      {easings.map((e) => (
                        <FlowChip
                          key={e}
                          variant={selectedEasing === e ? "primary" : "secondary"}
                          onClick={() => setSelectedEasing(e)}
                        >
                          {e.charAt(0).toUpperCase() + e.slice(1)}
                        </FlowChip>
                      ))}
                    </Inline>
                  </Stack>

                  <Grid minItemWidth="220px" gap={4}>
                    {easings.map((easing) => (
                      <AnimatedBox
                        key={easing}
                        duration={selectedDuration}
                        easing={easing}
                        label={easing}
                      />
                    ))}
                  </Grid>
                </Stack>
              </DemoGroup>
            </DemoSection>

            <DemoSection title="Easing Reference">
              <DemoGroup>
                <CodeBlock>{`// FLOW Easing Curves (constant, not affected by density)

// Standard easing — most common animations
--sys-momentum-easing-standard = cubic-bezier(0.2, 0, 0, 1)
// Use for: fade in/out, size changes, position shifts

// Enter easing — accelerating, bouncy entrance
--sys-momentum-easing-enter = cubic-bezier(0.05, 0.7, 0.1, 1)
// Use for: modals opening, list items appearing, scale-up

// Exit easing — quick departure, decelerate on arrival
--sys-momentum-easing-exit = cubic-bezier(0.3, 0, 0.8, 0.15)
// Use for: collapse animations, dismiss transitions, scale-down

// Linear easing — no acceleration/deceleration
--sys-momentum-easing-linear = linear
// Use for: spinners, scrolling, continuous animations`}</CodeBlock>
              </DemoGroup>
            </DemoSection>
          </Section>

          <Divider spacing={2} />

          {/* ────────────────────────────────────────────────────────── */}
          {/* 3. STAGGER CHOREOGRAPHY */}
          {/* ────────────────────────────────────────────────────────── */}
          <Section
            title="3. Stagger Choreography"
            description="Sequential animations with calculated delays. Creates visual rhythm and reduces perceived loading time."
          >
            <DemoSection title="List Item Stagger Patterns">
              <DemoGroup>
                <Grid columns={2} gap={6} minItemWidth="280px">
                  <StaggerList duration="fast" staggerDelay={10} itemCount={5} />
                  <StaggerList duration="normal" staggerDelay={30} itemCount={5} />
                  <StaggerList duration="slow" staggerDelay={50} itemCount={5} />
                  <StaggerList duration="slower" staggerDelay={80} itemCount={5} />
                </Grid>
              </DemoGroup>
            </DemoSection>

            <DemoSection title="Stagger Implementation Guide">
              <DemoGroup>
                <CodeBlock>{`// Stagger pattern for list animations
// Animate items sequentially with calculated delays

// Compact mode (fast interactions):
const STAGGER_PATTERNS = {
  fast: {
    duration: "var(--sys-momentum-transition-fast)",      // 30ms
    stagger: 10,                                           // 10ms between each
    total: 5 * 10 + 30 = 80ms for 5 items
  },
  normal: {
    duration: "var(--sys-momentum-transition-normal)",    // 50ms
    stagger: 30,                                           // 30ms between
    total: 5 * 30 + 50 = 200ms for 5 items
  },
  slow: {
    duration: "var(--sys-momentum-transition-slow)",      // 70ms
    stagger: 50,                                           // 50ms between
    total: 5 * 50 + 70 = 320ms for 5 items
  },
};

// CSS implementation:
<div style={{ animation: \`slideIn 50ms cubic-bezier(0.05, 0.7, 0.1, 1) forwards\`,
            animationDelay: \`\${index * 30}ms\` }} />

// React implementation:
{items.map((item, idx) => (
  <div key={idx} style={{
    transition: \`all var(--sys-momentum-transition-normal) var(--sys-momentum-easing-enter)\`,
    transitionDelay: \`\${idx * 30}ms\`,
  }}>
    {item}
  </div>
))}
`}</CodeBlock>
              </DemoGroup>
            </DemoSection>
          </Section>

          <Divider spacing={2} />

          {/* ────────────────────────────────────────────────────────── */}
          {/* 4. REAL-WORLD EXAMPLES */}
          {/* ────────────────────────────────────────────────────────── */}
          <Section
            title="4. Real-World Motion Examples"
            description="How Momentum tokens are used in actual component transitions."
          >
            <DemoSection title="Common Transition Patterns">
              <DemoGroup>
                <Grid minItemWidth="280px" gap={4}>
                  <Surface variant="primary" padding="container" radius="container">
                    <Stack gap={2}>
                      <Text role="label-m">Modal Open</Text>
                      <CodeBlock simple>{`transition: 
  opacity var(--sys-momentum-transition-fast),
  transform var(--sys-momentum-transition-normal) 
    var(--sys-momentum-easing-enter)`}</CodeBlock>
                      <Text role="caption" color="secondary">
                        Fast fade + normal scale-in
                      </Text>
                    </Stack>
                  </Surface>

                  <Surface variant="primary" padding="container" radius="container">
                    <Stack gap={2}>
                      <Text role="label-m">Hover State</Text>
                      <CodeBlock simple>{`transition: 
  background var(--sys-momentum-transition-fast),
  box-shadow var(--sys-momentum-transition-fast)
    var(--sys-momentum-easing-standard)`}</CodeBlock>
                      <Text role="caption" color="secondary">
                        Very fast feedback
                      </Text>
                    </Stack>
                  </Surface>

                  <Surface variant="primary" padding="container" radius="container">
                    <Stack gap={2}>
                      <Text role="label-m">List Item Collapse</Text>
                      <CodeBlock simple>{`transition: 
  max-height var(--sys-momentum-transition-slow),
  opacity var(--sys-momentum-transition-normal)
    var(--sys-momentum-easing-exit)`}</CodeBlock>
                      <Text role="caption" color="secondary">
                        Slow collapse + exit easing
                      </Text>
                    </Stack>
                  </Surface>

                  <Surface variant="primary" padding="container" radius="container">
                    <Stack gap={2}>
                      <Text role="label-m">Page Navigation</Text>
                      <CodeBlock simple>{`transition: 
  opacity var(--sys-momentum-transition-slower),
  transform var(--sys-momentum-transition-slower)
    var(--sys-momentum-easing-exit)`}</CodeBlock>
                      <Text role="caption" color="secondary">
                        Generous timing for context shift
                      </Text>
                    </Stack>
                  </Surface>
                </Grid>
              </DemoGroup>
            </DemoSection>
          </Section>

          <Divider spacing={2} />

          {/* ────────────────────────────────────────────────────────── */}
          {/* SUMMARY & MIGRATION GUIDE */}
          {/* ────────────────────────────────────────────────────────── */}
          <Section title="Migration: From Hardcoded Timeouts to Tokens">
            <DemoSection title="Before & After Comparison">
              <DemoGroup>
                <Stack gap={4}>
                  <div>
                    <Text role="label-m" color="danger" style={{ marginBottom: "var(--ref-frame-space-3)" }}>
                      ❌ BEFORE (Hardcoded)
                    </Text>
                    <CodeBlock>{`// Anti-pattern: hardcoded 1200ms magic numbers
setTimeout(() => {
  setLoading(false);
}, 1200);  // ← What does 1200 mean? When should it change?

// Animation hardcoded:
animation: fadeIn 1200ms ease-in-out;

// Stagger hardcoded:
{items.map((i, idx) => (
  <div style={{ transitionDelay: \`\${idx * 120}ms\` }} />
))}`}</CodeBlock>
                  </div>

                  <div>
                    <Text role="label-m" color="success" style={{ marginBottom: "var(--ref-frame-space-3)" }}>
                      ✅ AFTER (Token-based)
                    </Text>
                    <CodeBlock>{`// Token-driven: self-documenting, responds to density
const LOAD_DURATION = getDurationMs("normal");  // 65ms (default)
setTimeout(() => {
  setLoading(false);
}, LOAD_DURATION);  // ← Clear intent + responds to density

// Animation from tokens:
animation: fadeIn var(--sys-momentum-transition-normal) 
           var(--sys-momentum-easing-standard);

// Stagger with purpose:
{items.map((i, idx) => (
  <div style={{ transitionDelay: \`\${idx * 30}ms\` }} />  // 30ms = fast stagger
))}`}</CodeBlock>
                  </div>
                </Stack>

                <Callout intent="success" title="Benefits of Token Migration">
                  <ul style={{ marginLeft: "var(--ref-frame-space-5)", paddingLeft: 0 }}>
                    <li>
                      <Text role="paragraph-s">Responsive to density changes automatically</Text>
                    </li>
                    <li>
                      <Text role="paragraph-s">Consistent motion language across the system</Text>
                    </li>
                    <li>
                      <Text role="paragraph-s">
                        Easier to locate/modify motion patterns (global update)
                      </Text>
                    </li>
                    <li>
                      <Text role="paragraph-s">Self-documenting code (&quot;normal&quot; vs 1200ms)</Text>
                    </li>
                    <li>
                      <Text role="paragraph-s">Accessibility: respects prefers-reduced-motion</Text>
                    </li>
                  </ul>
                </Callout>
              </DemoGroup>
            </DemoSection>
          </Section>

          <Divider spacing={0} />
        </Stack>
      </Surface>
    </LayoutGrid>
  );
}
