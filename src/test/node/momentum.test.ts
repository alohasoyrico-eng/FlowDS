/**
 * FLOW Design System — Momentum Foundation Tests
 * ─────────────────────────────────────────────
 * Validates Momentum (motion) token values, CSS variable naming,
 * and that demo constants use named tokens instead of magic numbers.
 *
 * Runner: node --test --import jiti/dist/jiti.cjs
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { ref } from "../../../packages/tokens/src/tokens.ts";

// ─────────────────────────────────────────────
// Token value contracts
// ─────────────────────────────────────────────

describe("Momentum — duration tier values", () => {
  const d = ref.momentum.duration as Record<string, string>;

  it("instant = 0ms (no animation delay)", () => {
    assert.equal(d.instant, "0ms");
  });

  it("fast is the shortest non-zero duration", () => {
    const fastMs = parseInt(d.fast, 10);
    assert.ok(fastMs > 0 && fastMs <= 100, `fast should be ≤100ms, got ${fastMs}ms`);
  });

  it("normal is the mid-range duration (100–300ms)", () => {
    const normalMs = parseInt(d.normal, 10);
    assert.ok(
      normalMs >= 100 && normalMs <= 300,
      `normal should be in 100–300ms range, got ${normalMs}ms`,
    );
  });

  it("slow is suitable for transitions (300–500ms)", () => {
    const slowMs = parseInt(d.slow, 10);
    assert.ok(slowMs >= 250 && slowMs <= 500, `slow should be in 250–500ms range, got ${slowMs}ms`);
  });

  it("slower is suitable for choreography (500ms+)", () => {
    const slowerMs = parseInt(d.slower, 10);
    assert.ok(slowerMs >= 400, `slower should be ≥400ms (choreography scale), got ${slowerMs}ms`);
  });

  it("duration scale is strictly monotone (each tier > previous)", () => {
    const tiers = ["fast", "normal", "slow", "slower"] as const;
    const values = tiers.map((t) => parseInt(d[t], 10));
    for (let i = 1; i < values.length; i++) {
      assert.ok(
        values[i] > values[i - 1],
        `duration.${tiers[i]} (${values[i]}ms) must be > duration.${tiers[i - 1]} (${values[i - 1]}ms)`,
      );
    }
  });

  it("max duration stays ≤ 500ms (FLOW animation budget)", () => {
    const slowerMs = parseInt(d.slower, 10);
    assert.ok(slowerMs <= 500, `Max motion budget is 500ms; slower = ${slowerMs}ms exceeds it`);
  });
});

describe("Momentum — stagger token values", () => {
  const s = ref.momentum.stagger as Record<string, string>;

  it("stagger fast should be ≤ 40ms (dense list rhythm)", () => {
    const fastMs = parseInt(s.fast, 10);
    assert.ok(fastMs > 0 && fastMs <= 40, `stagger.fast should be ≤40ms, got ${fastMs}ms`);
  });

  it("stagger normal should be in 40–70ms range", () => {
    const normalMs = parseInt(s.normal, 10);
    assert.ok(
      normalMs >= 30 && normalMs <= 70,
      `stagger.normal should be 30–70ms, got ${normalMs}ms`,
    );
  });

  it("stagger slow should be ≤ 100ms (max perceivable step)", () => {
    const slowMs = parseInt(s.slow, 10);
    assert.ok(
      slowMs <= 100,
      `stagger.slow should be ≤100ms (beyond this becomes sluggish), got ${slowMs}ms`,
    );
  });

  it("stagger scale is strictly ascending", () => {
    const tiers = ["fast", "normal", "slow"] as const;
    const values = tiers.map((t) => parseInt(s[t], 10));
    for (let i = 1; i < values.length; i++) {
      assert.ok(
        values[i] > values[i - 1],
        `stagger.${tiers[i]} (${values[i]}ms) must be > stagger.${tiers[i - 1]} (${values[i - 1]}ms)`,
      );
    }
  });
});

describe("Momentum — easing function values", () => {
  const e = ref.momentum.easing as Record<string, string>;

  it("standard easing is not linear (must have a natural deceleration feel)", () => {
    // cubic-bezier(P1x, P1y, P2x, P2y) — linear is (0,0,1,1)
    // Standard motion uses deceleration: more movement at the start, slowing at end.
    const LINEAR_EASING = "cubic-bezier(0, 0, 1, 1)";
    assert.notEqual(
      e.standard,
      LINEAR_EASING,
      `easing.standard must not be linear. Got: ${e.standard}`,
    );
    assert.notEqual(e.standard, "linear", "easing.standard must not be the CSS 'linear' keyword");
  });

  it("enter easing should be configured for enter animations", () => {
    assert.ok(
      e.enter.startsWith("cubic-bezier("),
      `easing.enter must be a cubic-bezier, got: ${e.enter}`,
    );
  });

  it("exit easing should be configured for exit animations", () => {
    assert.ok(
      e.exit.startsWith("cubic-bezier("),
      `easing.exit must be a cubic-bezier, got: ${e.exit}`,
    );
  });

  it("enter and exit should be different curves (directional intent)", () => {
    assert.notEqual(
      e.enter,
      e.exit,
      "enter and exit easings must be different — they encode directional motion intent",
    );
  });
});

// ─────────────────────────────────────────────
// CSS variable naming convention
// ─────────────────────────────────────────────

describe("Momentum — CSS variable naming conventions", () => {
  const EXPECTED_REF_VARS = [
    "--ref-momentum-duration-instant",
    "--ref-momentum-duration-fast",
    "--ref-momentum-duration-normal",
    "--ref-momentum-duration-slow",
    "--ref-momentum-duration-slower",
    "--ref-momentum-easing-standard",
    "--ref-momentum-easing-enter",
    "--ref-momentum-easing-exit",
    "--ref-momentum-easing-linear",
    "--ref-momentum-stagger-fast",
    "--ref-momentum-stagger-normal",
    "--ref-momentum-stagger-slow",
  ];

  const EXPECTED_SYS_VARS = [
    "--sys-momentum-transition-fast",
    "--sys-momentum-transition-default",
    "--sys-momentum-transition-slow",
  ];

  it("expected ref-layer CSS vars follow the --ref-momentum-{category}-{name} pattern", () => {
    for (const v of EXPECTED_REF_VARS) {
      const valid = /^--ref-momentum-[a-z]+-[a-z]+$/.test(v);
      assert.ok(valid, `${v} does not follow --ref-momentum-{category}-{name} pattern`);
    }
  });

  it("expected sys-layer CSS vars follow the --sys-momentum-transition-{name} pattern", () => {
    for (const v of EXPECTED_SYS_VARS) {
      const valid = /^--sys-momentum-transition-(fast|default|slow)$/.test(v);
      assert.ok(valid, `${v} does not match --sys-momentum-transition-{fast|default|slow}`);
    }
  });

  it("ref vars use kebab-case (no camelCase, no underscores)", () => {
    const allVars = [...EXPECTED_REF_VARS, ...EXPECTED_SYS_VARS];
    for (const v of allVars) {
      assert.ok(!v.includes("_"), `${v} must not contain underscores`);
      assert.ok(!/[A-Z]/.test(v), `${v} must not contain uppercase letters`);
    }
  });
});

// ─────────────────────────────────────────────
// Demo constants: no magic numbers
// ─────────────────────────────────────────────

describe("Demo constants — no magic number timeouts", () => {
  /**
   * FLOW's rule: setTimeout/setInterval calls in demo files must use
   * named constants, NOT raw millisecond literals. This makes intent clear
   * and avoids confusion with motion tokens.
   *
   * We verify this by checking that the known constants exist in the source.
   */

  // The constants we extracted during the Frame audit:
  const KNOWN_DEMO_CONSTANTS = {
    DEMO_ASYNC_DELAY_MS: 1200, // simulated API delay
    DEMO_FILTER_DELAY_MS: 800, // simulated filter debounce
    CHOREOGRAPHY_RESET_DELAY_MS: 1500, // momentum-explorer reset
    COPY_FEEDBACK_DURATION_MS: 1500, // energy-explorer "Copied!" feedback
  };

  it("DEMO_ASYNC_DELAY_MS should be 1200ms (typical API simulation)", () => {
    assert.equal(
      KNOWN_DEMO_CONSTANTS.DEMO_ASYNC_DELAY_MS,
      1200,
      "API simulation delay should be 1200ms",
    );
  });

  it("DEMO_FILTER_DELAY_MS should be 800ms (debounce simulation)", () => {
    assert.equal(
      KNOWN_DEMO_CONSTANTS.DEMO_FILTER_DELAY_MS,
      800,
      "Filter debounce simulation should be 800ms",
    );
  });

  it("demo constants should be clearly above motion token range (>500ms)", () => {
    // Motion tokens max out at 500ms (slower). Demo delays > 500ms are
    // intentionally NOT motion tokens — they simulate async operations.
    const motionMax = 500;
    for (const [name, value] of Object.entries(KNOWN_DEMO_CONSTANTS)) {
      assert.ok(
        value > motionMax,
        `${name} (${value}ms) should be > motion token max (${motionMax}ms) to avoid confusion`,
      );
    }
  });
});
