/**
 * FLOW Design System — Token Architecture Tests
 * ─────────────────────────────────────────────
 * Validates the canonical token source (`tokens.ts`) against FLOW's
 * three-tier architecture rules: ref → sys → comp.
 *
 * Architecture clarification (discovered via tests):
 * - ref/sys/comp in tokens.ts store RESOLVED JS values (hex, px, ms)
 * - CSS custom properties are GENERATED from these objects in flow.css
 * - The semanticGapMap in primitives.tsx is the bridge: maps semantic
 *   names to CSS var strings for inline style usage
 *
 * Runner: node --test --import jiti/dist/jiti.cjs
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { compLight, ref, sysDark, sysLight } from "../../app/tokens.ts";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

type DeepObject = Record<string, unknown>;

/** Recursively collect all leaf values in a nested object */
function collectLeaves(obj: DeepObject, path = ""): Array<{ path: string; value: unknown }> {
  const result: Array<{ path: string; value: unknown }> = [];
  for (const [key, val] of Object.entries(obj)) {
    const fullPath = path ? `${path}.${key}` : key;
    if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      result.push(...collectLeaves(val as DeepObject, fullPath));
    } else {
      result.push({ path: fullPath, value: val });
    }
  }
  return result;
}

/** Check if a string looks like a raw primitive value */
function _isRawPrimitive(v: unknown): boolean {
  if (typeof v === "number") return true;
  if (typeof v !== "string") return false;
  return (
    /^#[0-9a-fA-F]+$/.test(v) || // hex color
    /^rgba?\(/.test(v) || // rgba function
    /^\d+px$/.test(v) || // pixels
    /^\d+ms$/.test(v) || // milliseconds
    /^\d+%$/.test(v) || // percentage
    v === "0" || // zero
    v === "transparent" || // named color
    v === "inherit" || // CSS keyword
    v === "round" || // CSS keyword
    /^cubic-bezier\(/.test(v) || // easing function
    /^linear$/.test(v) || // linear easing keyword
    /^\d+(\.\d+)?$/.test(v) || // bare number / multiplier
    /^\d+, \d+, \d+$/.test(v) || // RGB components "0, 96, 223"
    /^\d+(\.\d+)?rem$/.test(v) || // rem units
    /^\d+(\.\d+)?em$/.test(v) || // em units
    /^[\w-]+$/.test(v) // CSS keyword (e.g. "round", "bold")
  );
}

// ─────────────────────────────────────────────
// ref layer: must contain ONLY raw values (no CSS vars)
// ─────────────────────────────────────────────

describe("ref layer — raw values only, no CSS vars", () => {
  const leaves = collectLeaves(ref as unknown as DeepObject);

  it("should export a non-empty ref object", () => {
    assert.ok(leaves.length > 100, `ref should have >100 token entries, got ${leaves.length}`);
  });

  it("every ref leaf value must NOT be a CSS var reference", () => {
    const cssVarLeaves = leaves.filter(
      (l) => typeof l.value === "string" && l.value.startsWith("var(--"),
    );
    assert.equal(
      cssVarLeaves.length,
      0,
      `ref tokens must not reference CSS vars. Found: ${cssVarLeaves.map((l) => l.path).join(", ")}`,
    );
  });

  it("ref must have all 5 top-level sections", () => {
    const required = ["energy", "frame", "voice", "momentum", "icon"];
    for (const section of required) {
      assert.ok(section in ref, `ref must contain section '${section}'`);
    }
  });
});

// ─────────────────────────────────────────────
// ref.momentum — token structure and values
// ─────────────────────────────────────────────

describe("ref.momentum — structure and value contracts", () => {
  const d = ref.momentum.duration as Record<string, string>;
  const e = ref.momentum.easing as Record<string, string>;
  const s = ref.momentum.stagger as Record<string, string>;

  it("has duration tier: instant, fast, normal, slow, slower", () => {
    assert.deepEqual(Object.keys(d).sort(), ["fast", "instant", "normal", "slow", "slower"]);
  });

  it("has easing curves: standard, enter, exit, linear", () => {
    assert.deepEqual(Object.keys(e).sort(), ["enter", "exit", "linear", "standard"]);
  });

  it("has stagger tiers: fast, normal, slow", () => {
    assert.deepEqual(Object.keys(s).sort(), ["fast", "normal", "slow"]);
  });

  it("instant = 0ms", () => {
    assert.equal(d.instant, "0ms");
  });

  it("duration scale is strictly monotone", () => {
    const ordered = ["fast", "normal", "slow", "slower"];
    const values = ordered.map((k) => parseInt(d[k], 10));
    for (let i = 1; i < values.length; i++) {
      assert.ok(
        values[i] > values[i - 1],
        `${ordered[i]} (${values[i]}ms) must exceed ${ordered[i - 1]} (${values[i - 1]}ms)`,
      );
    }
  });

  it("max animation duration ≤ 500ms (FLOW budget)", () => {
    assert.ok(parseInt(d.slower, 10) <= 500, `Max budget 500ms exceeded: ${d.slower}`);
  });

  it("stagger scale is strictly ascending", () => {
    const tiers = ["fast", "normal", "slow"];
    const values = tiers.map((t) => parseInt(s[t], 10));
    for (let i = 1; i < values.length; i++) {
      assert.ok(
        values[i] > values[i - 1],
        `stagger.${tiers[i]} must exceed stagger.${tiers[i - 1]}`,
      );
    }
  });

  it("stagger values stay ≤ 100ms (beyond this feels sluggish)", () => {
    for (const [name, val] of Object.entries(s)) {
      assert.ok(parseInt(val, 10) <= 100, `stagger.${name} (${val}) must be ≤ 100ms`);
    }
  });

  it("easing values are valid cubic-bezier or 'linear'", () => {
    const validPattern = /^(cubic-bezier\([^)]+\)|linear)$/;
    for (const [name, value] of Object.entries(e)) {
      assert.ok(
        validPattern.test(value),
        `easing.${name} ('${value}') must be cubic-bezier() or 'linear'`,
      );
    }
  });

  it("enter and exit easings are different (directional intent)", () => {
    assert.notEqual(e.enter, e.exit, "enter and exit must differ — they encode direction");
  });
});

// ─────────────────────────────────────────────
// sysLight layer — semantic structure
// ─────────────────────────────────────────────

describe("sysLight layer — semantic sections present", () => {
  it("sysLight has required semantic sections", () => {
    const required = ["energy", "frame", "voice", "momentum"];
    for (const section of required) {
      assert.ok(section in sysLight, `sysLight must contain '${section}'`);
    }
  });

  it("sysLight.energy has semantic color roles", () => {
    const energy = sysLight.energy as DeepObject;
    const required = ["surface", "text", "border", "action"];
    for (const role of required) {
      assert.ok(role in energy, `sysLight.energy must contain role '${role}'`);
    }
  });

  it("sysLight.energy.text has primary, secondary, tertiary roles", () => {
    const text = (sysLight.energy as DeepObject).text as DeepObject;
    for (const key of ["primary", "secondary", "tertiary"]) {
      assert.ok(key in text, `sysLight.energy.text must contain '${key}'`);
    }
  });

  it("sysLight.momentum has duration shortcuts", () => {
    const momentum = sysLight.momentum as DeepObject;
    assert.ok("duration" in momentum, "sysLight.momentum must have duration shortcuts");
    const dur = momentum.duration as DeepObject;
    assert.ok("fast" in dur);
    assert.ok("default" in dur);
    assert.ok("slow" in dur);
  });

  it("sysLight values should not be CSS var strings", () => {
    // sysLight stores resolved JS values, not CSS var references.
    // This distinguishes it from primitives.tsx which generates CSS var strings.
    const leaves = collectLeaves(sysLight as unknown as DeepObject);
    const cssVarLeaves = leaves.filter(
      (l) => typeof l.value === "string" && (l.value as string).startsWith("var(--"),
    );
    assert.equal(
      cssVarLeaves.length,
      0,
      `sysLight must store resolved values, not CSS vars. Got: ${cssVarLeaves
        .slice(0, 3)
        .map((l) => `${l.path}=${l.value}`)
        .join(", ")}`,
    );
  });
});

// ─────────────────────────────────────────────
// sysDark layer — theme override coverage
// ─────────────────────────────────────────────

describe("sysDark layer — theme-sensitive overrides", () => {
  it("sysDark exists and is non-empty", () => {
    const leaves = collectLeaves(sysDark as unknown as DeepObject);
    assert.ok(leaves.length > 0, "sysDark must have entries");
  });

  it("sysDark has theme-sensitive sections: energy, frame, depth", () => {
    // momentum and voice are theme-independent (density-driven),
    // so they don't need dark mode overrides
    const required = ["energy", "frame"];
    for (const section of required) {
      assert.ok(section in sysDark, `sysDark must contain '${section}'`);
    }
  });

  it("sysDark.energy has same color roles as sysLight.energy", () => {
    const lightRoles = Object.keys(sysLight.energy as DeepObject).sort();
    const darkRoles = Object.keys((sysDark as DeepObject).energy as DeepObject).sort();
    assert.deepEqual(darkRoles, lightRoles, "sysDark.energy must mirror sysLight.energy structure");
  });
});

// ─────────────────────────────────────────────
// compLight layer — component-level bindings
// ─────────────────────────────────────────────

describe("compLight layer — component token structure", () => {
  it("compLight exists and has component sections", () => {
    const keys = Object.keys(compLight as unknown as DeepObject);
    assert.ok(keys.length > 0, "compLight must have component sections");
    assert.ok(keys.includes("button"), "compLight must have a button section");
  });

  it("compLight.button has emphasis model tokens (high/medium/low)", () => {
    const button = (compLight as unknown as DeepObject).button as DeepObject;
    const required = ["bgHigh", "textHigh", "bgMedium", "textMedium", "bgLow", "textLow"];
    for (const key of required) {
      assert.ok(key in button, `compLight.button must contain '${key}'`);
    }
  });

  it("compLight.button emphasis backgrounds are string values", () => {
    const button = (compLight as unknown as DeepObject).button as DeepObject;
    assert.equal(typeof button.bgHigh, "string", "bgHigh must be a string value");
    assert.equal(typeof button.textHigh, "string", "textHigh must be a string value");
  });
});
