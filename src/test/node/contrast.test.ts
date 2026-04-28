/**
 * FLOW Design System — Color Contrast Tests
 * ──────────────────────────────────────────
 * Validates WCAG 2.1 AA contrast ratios for critical text/background
 * token pairs. Runs in Node (no jsdom needed) by computing ratios
 * directly from the hex values in tokens.ts.
 *
 * This addresses Known Issue #11: axe-core can't evaluate
 * color-contrast in jsdom due to missing HTMLCanvasElement.getContext().
 *
 * Runner: node --test --import jiti/dist/jiti.cjs
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { ref, sysLight, sysDark } from "../../../packages/tokens/src/tokens.ts";

// ─────────────────────────────────────────────
// WCAG contrast ratio computation
// ─────────────────────────────────────────────

/** Parse hex color (#RGB, #RRGGBB) to [r, g, b] in 0–255 */
function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  if (h.length === 3) {
    return [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)];
  }
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

/** sRGB relative luminance per WCAG 2.1 */
function luminance(hex: string): number {
  const [r, g, b] = parseHex(hex).map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio (always ≥ 1) */
function contrastRatio(fg: string, bg: string): number {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ─────────────────────────────────────────────
// WCAG AA thresholds
// ─────────────────────────────────────────────
const AA_NORMAL = 4.5; // normal text (< 18pt or < 14pt bold)
const AA_LARGE = 3.0; // large text (≥ 18pt or ≥ 14pt bold)

// ─────────────────────────────────────────────
// Light theme — critical text on surface pairs
// ─────────────────────────────────────────────

const white = ref.energy.neutral[0]; // #FFFFFF — primary surface

describe("Light theme — text on primary surface (white)", () => {
  const pairs: Array<{ name: string; fg: string; threshold: number }> = [
    { name: "text.primary (neutral-800)", fg: ref.energy.neutral[800], threshold: AA_NORMAL },
    { name: "text.secondary (neutral-500)", fg: ref.energy.neutral[500], threshold: AA_NORMAL },
    { name: "text.link (blue-600)", fg: ref.energy.blue[600], threshold: AA_NORMAL },
    { name: "text.danger (red-500)", fg: ref.energy.red[500], threshold: AA_NORMAL },
    { name: "text.success (green-500)", fg: ref.energy.green[500], threshold: AA_NORMAL },
    { name: "text.warning (orange-600)", fg: ref.energy.orange[600], threshold: AA_NORMAL },
  ];

  for (const { name, fg, threshold } of pairs) {
    it(`${name} on white meets AA (≥ ${threshold}:1)`, () => {
      const ratio = contrastRatio(fg, white);
      assert.ok(
        ratio >= threshold,
        `${name}: ratio ${ratio.toFixed(2)}:1 < ${threshold}:1 (fg=${fg}, bg=${white})`,
      );
    });
  }
});

describe("Light theme — text on secondary surface (neutral-50)", () => {
  const bg = ref.energy.neutral[50]; // #F8FAFC

  const pairs: Array<{ name: string; fg: string; threshold: number }> = [
    { name: "text.primary (neutral-800)", fg: ref.energy.neutral[800], threshold: AA_NORMAL },
    { name: "text.secondary (neutral-500)", fg: ref.energy.neutral[500], threshold: AA_NORMAL },
  ];

  for (const { name, fg, threshold } of pairs) {
    it(`${name} on neutral-50 meets AA (≥ ${threshold}:1)`, () => {
      const ratio = contrastRatio(fg, bg);
      assert.ok(
        ratio >= threshold,
        `${name}: ratio ${ratio.toFixed(2)}:1 < ${threshold}:1 (fg=${fg}, bg=${bg})`,
      );
    });
  }
});

describe("Light theme — inverse text on inverse surface", () => {
  it("text.inverse (white) on surface.inverse (neutral-900) meets AA", () => {
    const fg = ref.energy.neutral[0];
    const bg = ref.energy.neutral[900];
    const ratio = contrastRatio(fg, bg);
    assert.ok(ratio >= AA_NORMAL, `inverse: ratio ${ratio.toFixed(2)}:1 < ${AA_NORMAL}:1`);
  });
});

describe("Light theme — action button text on action background", () => {
  it("text.onAction (white) on action-primary (blue-500) meets AA large text", () => {
    const fg = ref.energy.neutral[0];
    const bg = ref.energy.blue[500];
    const ratio = contrastRatio(fg, bg);
    assert.ok(
      ratio >= AA_LARGE,
      `action primary: ratio ${ratio.toFixed(2)}:1 < ${AA_LARGE}:1 (fg=${fg}, bg=${bg})`,
    );
  });
});

// ─────────────────────────────────────────────
// Disabled state — WCAG exempt but tracked
// ─────────────────────────────────────────────

describe("Disabled text contrast (informational — WCAG exempt)", () => {
  it("text.disabled (neutral-300) on white — tracks ratio for documentation", () => {
    const fg = ref.energy.neutral[300]; // #CBD5E1
    const ratio = contrastRatio(fg, white);
    // This is expected to be ~2.9:1 — below AA. WCAG exempts disabled states.
    // We track it to inform corporate a11y policy decisions.
    assert.ok(
      ratio >= 1.0,
      `disabled text should at least be distinguishable (ratio=${ratio.toFixed(2)}:1)`,
    );
    // Log the actual ratio for reference
    console.log(`  ℹ disabled text contrast: ${ratio.toFixed(2)}:1 (WCAG AA exempt)`);
  });
});

// ─────────────────────────────────────────────
// Status colors on tinted surfaces
// ─────────────────────────────────────────────

describe("Status colors — text on tinted status surfaces", () => {
  const statusPairs: Array<{ name: string; fg: string; bg: string }> = [
    { name: "danger text on danger surface", fg: ref.energy.red[500], bg: ref.energy.red[50] },
    {
      name: "success text on success surface",
      fg: ref.energy.green[500],
      bg: ref.energy.green[50],
    },
    {
      name: "info/accent text on accent surface",
      fg: ref.energy.blue[600],
      bg: ref.energy.blue[50],
    },
  ];

  for (const { name, fg, bg } of statusPairs) {
    it(`${name} meets AA normal text (≥ ${AA_NORMAL}:1)`, () => {
      const ratio = contrastRatio(fg, bg);
      assert.ok(
        ratio >= AA_NORMAL,
        `${name}: ratio ${ratio.toFixed(2)}:1 < ${AA_NORMAL}:1 (fg=${fg}, bg=${bg})`,
      );
    });
  }
});

// ─────────────────────────────────────────────
// Dark theme — critical text on surface pairs
// ─────────────────────────────────────────────

const darkBg = (sysDark as { energy: { surface: Record<string, string> } }).energy.surface.primary; // neutral-950
const darkText = (sysDark as { energy: { text: Record<string, string> } }).energy.text;

describe("Dark theme — text on primary surface (neutral-950)", () => {
  const pairs: Array<{ name: string; fg: string; threshold: number }> = [
    { name: "text.primary (neutral-100)", fg: darkText.primary, threshold: AA_NORMAL },
    { name: "text.secondary (neutral-400)", fg: darkText.secondary, threshold: AA_NORMAL },
    { name: "text.link (blue-200)", fg: darkText.link, threshold: AA_NORMAL },
    { name: "text.danger (red-200)", fg: darkText.danger, threshold: AA_NORMAL },
    { name: "text.success (green-200)", fg: darkText.success, threshold: AA_NORMAL },
    { name: "text.warning (orange-200)", fg: darkText.warning, threshold: AA_NORMAL },
  ];

  for (const { name, fg, threshold } of pairs) {
    it(`${name} on neutral-950 meets AA (≥ ${threshold}:1)`, () => {
      const ratio = contrastRatio(fg, darkBg);
      assert.ok(
        ratio >= threshold,
        `${name}: ratio ${ratio.toFixed(2)}:1 < ${threshold}:1 (fg=${fg}, bg=${darkBg})`,
      );
    });
  }
});

describe("Dark theme — text on secondary surface (neutral-900)", () => {
  const bg = (sysDark as { energy: { surface: Record<string, string> } }).energy.surface.secondary;

  const pairs: Array<{ name: string; fg: string; threshold: number }> = [
    { name: "text.primary (neutral-100)", fg: darkText.primary, threshold: AA_NORMAL },
    { name: "text.secondary (neutral-400)", fg: darkText.secondary, threshold: AA_NORMAL },
  ];

  for (const { name, fg, threshold } of pairs) {
    it(`${name} on neutral-900 meets AA (≥ ${threshold}:1)`, () => {
      const ratio = contrastRatio(fg, bg);
      assert.ok(
        ratio >= threshold,
        `${name}: ratio ${ratio.toFixed(2)}:1 < ${threshold}:1 (fg=${fg}, bg=${bg})`,
      );
    });
  }
});

describe("Dark theme — inverse text on inverse surface", () => {
  it("text.inverse (neutral-900) on surface.inverse (neutral-100) meets AA", () => {
    const fg = darkText.inverse;
    const bg = (sysDark as { energy: { surface: Record<string, string> } }).energy.surface.inverse;
    const ratio = contrastRatio(fg, bg);
    assert.ok(ratio >= AA_NORMAL, `dark inverse: ratio ${ratio.toFixed(2)}:1 < ${AA_NORMAL}:1`);
  });
});

describe("Dark theme — status colors on tinted dark surfaces", () => {
  const darkSurface = (sysDark as { energy: { surface: Record<string, string> } }).energy.surface;
  const statusPairs: Array<{ name: string; fg: string; bg: string }> = [
    { name: "danger text on danger surface", fg: darkText.danger, bg: darkSurface.danger },
    { name: "success text on success surface", fg: darkText.success, bg: darkSurface.success },
    { name: "accent text on accent surface", fg: darkText.link, bg: darkSurface.accent },
  ];

  for (const { name, fg, bg } of statusPairs) {
    it(`${name} meets AA normal text (≥ ${AA_NORMAL}:1)`, () => {
      const ratio = contrastRatio(fg, bg);
      assert.ok(
        ratio >= AA_NORMAL,
        `${name}: ratio ${ratio.toFixed(2)}:1 < ${AA_NORMAL}:1 (fg=${fg}, bg=${bg})`,
      );
    });
  }
});
