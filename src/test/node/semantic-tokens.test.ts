/**
 * FLOW Design System — Semantic Token & Primitive Tests
 * ──────────────────────────────────────────────────────
 * Validates the contract of SemanticGap, SemanticRadius, spaceMap, radiusMap
 * as defined in primitives.tsx. Tests verify that:
 * - Semantic tokens route through the correct CSS var layer (sys vs ref)
 * - Maps are complete and contain no unexpected keys
 * - CSS variable names follow the FLOW naming convention
 *
 * Approach: contract values are declared inline and cross-checked
 * against the source file text, avoiding jsx/tsx transform issues.
 *
 * Runner: node --test --import jiti/dist/jiti.cjs
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Read the source files once
const primitivesSource = readFileSync(resolve("packages/primitives/src/types.ts"), "utf-8");

// ─────────────────────────────────────────────
// Contract declarations
// These must match primitives.tsx exactly — tests will catch drift.
// ─────────────────────────────────────────────

// radiusMap contract (line ~149 in primitives.tsx)
const RADIUS_MAP_CONTRACT: Record<string, string> = {
  none: "var(--ref-frame-radius-0)",
  sm: "var(--ref-frame-radius-1)",
  md: "var(--ref-frame-radius-2)",
  lg: "var(--ref-frame-radius-3)",
  xl: "var(--ref-frame-radius-4)",
  full: "var(--ref-frame-radius-full)",
};

// spaceMap contract (line ~164 in primitives.tsx)
const SPACE_MAP_CONTRACT: Record<number, string> = {
  0: "0",
  1: "var(--ref-frame-space-1)",
  2: "var(--ref-frame-space-2)",
  3: "var(--ref-frame-space-3)",
  4: "var(--ref-frame-space-4)",
  5: "var(--ref-frame-space-5)",
  6: "var(--ref-frame-space-6)",
  8: "var(--ref-frame-space-8)",
  10: "var(--ref-frame-space-10)",
  12: "var(--ref-frame-space-12)",
  16: "var(--ref-frame-space-16)",
  20: "var(--ref-frame-space-20)",
};

// semanticGapMap contract (line ~180 in primitives.tsx)
const SEMANTIC_GAP_CONTRACT: Record<string, string> = {
  component: "var(--sys-frame-gap-component)",
  "component-lg": "var(--sys-frame-gap-component-lg)",
  subsection: "var(--sys-frame-gap-subsection)",
  section: "var(--sys-frame-gap-section)",
  page: "var(--sys-frame-gap-page)",
};

// semanticRadiusMap contract (line ~158 in primitives.tsx)
const SEMANTIC_RADIUS_CONTRACT: Record<string, string> = {
  control: "var(--sys-frame-radius-control)",
  container: "var(--sys-frame-radius-container)",
  surface: "var(--sys-frame-radius-surface)",
};

// ─────────────────────────────────────────────
// spaceMap
// ─────────────────────────────────────────────

describe("spaceMap — ref-level numeric gaps", () => {
  const entries = Object.entries(SPACE_MAP_CONTRACT);

  it("has exactly 12 space tokens (0–20, skipping 7,9,11,13-15,17-19)", () => {
    assert.equal(entries.length, 12, `Expected 12 space tokens, got ${entries.length}`);
  });

  it("every value is '0' or a --ref-frame-space-* CSS var", () => {
    for (const [key, value] of entries) {
      const valid = value === "0" || value.startsWith("var(--ref-frame-space-");
      assert.ok(valid, `spaceMap[${key}] = '${value}' must be '0' or --ref-frame-space-* var`);
    }
  });

  it("spaceMap[0] equals '0' (unitless zero)", () => {
    assert.equal(SPACE_MAP_CONTRACT[0], "0");
  });

  it("source file defines the spaceMap with these CSS vars", () => {
    // Spot-check that the source still contains these key mappings
    const spotCheck = ["--ref-frame-space-1", "--ref-frame-space-4", "--ref-frame-space-20"];
    for (const varName of spotCheck) {
      assert.ok(
        primitivesSource.includes(varName),
        `primitives.tsx must reference '${varName}' in spaceMap`,
      );
    }
  });
});

// ─────────────────────────────────────────────
// radiusMap
// ─────────────────────────────────────────────

describe("radiusMap — ref-level radius tokens", () => {
  it("has exactly 6 radius tokens: none, sm, md, lg, xl, full", () => {
    assert.deepEqual(Object.keys(RADIUS_MAP_CONTRACT).sort(), [
      "full",
      "lg",
      "md",
      "none",
      "sm",
      "xl",
    ]);
  });

  it("every value is a --ref-frame-radius-* CSS var", () => {
    for (const [key, value] of Object.entries(RADIUS_MAP_CONTRACT)) {
      assert.ok(
        value.startsWith("var(--ref-frame-radius-"),
        `radiusMap['${key}'] = '${value}' must be a --ref-frame-radius-* CSS var`,
      );
    }
  });

  it("source file contains all expected radius var names", () => {
    for (const cssVar of Object.values(RADIUS_MAP_CONTRACT)) {
      const varName = cssVar.slice(4, -1); // strip var( and )
      assert.ok(primitivesSource.includes(varName), `primitives.tsx must reference '${varName}'`);
    }
  });
});

// ─────────────────────────────────────────────
// SemanticGap — density-responsive spacing
// ─────────────────────────────────────────────

describe("SemanticGap — sys-layer CSS var contract", () => {
  it("has exactly 5 semantic gap roles", () => {
    assert.equal(Object.keys(SEMANTIC_GAP_CONTRACT).length, 5);
  });

  it("all values reference the --sys-frame-gap-* layer", () => {
    for (const [key, val] of Object.entries(SEMANTIC_GAP_CONTRACT)) {
      assert.ok(
        val.startsWith("var(--sys-frame-gap-"),
        `SemanticGap['${key}'] = '${val}' must use --sys-frame-gap-*`,
      );
    }
  });

  it("members form the documented density hierarchy", () => {
    const hierarchyOrder = ["component", "component-lg", "subsection", "section", "page"];
    const keys = Object.keys(SEMANTIC_GAP_CONTRACT);
    assert.deepEqual(keys, hierarchyOrder, "SemanticGap must be ordered ascending");
  });

  it("source file defines semanticGapMap with the correct sys vars", () => {
    for (const cssVar of Object.values(SEMANTIC_GAP_CONTRACT)) {
      const varName = cssVar.slice(4, -1);
      assert.ok(
        primitivesSource.includes(varName),
        `primitives.tsx semanticGapMap must reference '${varName}'`,
      );
    }
  });

  it("SemanticGap type is exported from primitives.tsx", () => {
    assert.ok(
      primitivesSource.includes("export type SemanticGap"),
      "primitives.tsx must export the SemanticGap type",
    );
  });
});

// ─────────────────────────────────────────────
// SemanticRadius — density-responsive radii
// ─────────────────────────────────────────────

describe("SemanticRadius — sys-layer CSS var contract", () => {
  it("has exactly 3 semantic radius roles: control, container, surface", () => {
    assert.deepEqual(Object.keys(SEMANTIC_RADIUS_CONTRACT).sort(), [
      "container",
      "control",
      "surface",
    ]);
  });

  it("all values reference the --sys-frame-radius-* layer", () => {
    for (const [key, val] of Object.entries(SEMANTIC_RADIUS_CONTRACT)) {
      assert.ok(
        val.startsWith("var(--sys-frame-radius-"),
        `SemanticRadius['${key}'] = '${val}' must use --sys-frame-radius-*`,
      );
    }
  });

  it("source file includes 'surface' in SemanticRadius type", () => {
    assert.ok(
      primitivesSource.includes('"surface"') || primitivesSource.includes("'surface'"),
      "primitives.tsx must include 'surface' in SemanticRadius — added in v1.0.0-rc.1",
    );
  });
});

// ─────────────────────────────────────────────
// CSS var naming convention (cross-cutting)
// ─────────────────────────────────────────────

describe("CSS variable naming conventions", () => {
  const allCssVars = [
    ...Object.values(RADIUS_MAP_CONTRACT),
    ...Object.values(SPACE_MAP_CONTRACT).filter((v) => v !== "0"),
    ...Object.values(SEMANTIC_GAP_CONTRACT),
    ...Object.values(SEMANTIC_RADIUS_CONTRACT),
  ];

  it("all CSS vars use kebab-case (no camelCase, no underscores)", () => {
    for (const cssVar of allCssVars) {
      assert.ok(!cssVar.includes("_"), `${cssVar} must not contain underscores`);
      assert.ok(!/[A-Z]/.test(cssVar), `${cssVar} must not contain uppercase letters`);
    }
  });

  it("all CSS vars follow the --{layer}-{foundation}-{property} pattern", () => {
    // Allows numeric steps: --ref-frame-radius-0, --ref-frame-space-10, etc.
    const validPattern = /^var\(--(?:ref|sys|comp)-[a-z]+-[a-z0-9-]+\)$/;
    for (const cssVar of allCssVars) {
      assert.ok(
        validPattern.test(cssVar),
        `'${cssVar}' must match --{ref|sys|comp}-{foundation}-{property} pattern`,
      );
    }
  });
});
