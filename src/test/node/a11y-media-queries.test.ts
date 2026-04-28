/**
 * FLOW Design System — Accessibility Media Query Tests
 * ─────────────────────────────────────────────────────
 * Validates that forced-colors and prefers-contrast CSS rules
 * exist in the expected component CSS files.
 *
 * This addresses Known Issues #12: no tests for forced-colors
 * or prefers-contrast media queries.
 *
 * Runner: node --test --import jiti/dist/jiti.cjs
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "../../..");

function readCSS(relativePath: string): string {
  const full = resolve(ROOT, relativePath);
  assert.ok(existsSync(full), `CSS file not found: ${relativePath}`);
  return readFileSync(full, "utf-8");
}

// ─────────────────────────────────────────────
// forced-colors: active — critical components
// ─────────────────────────────────────────────

describe("@media (forced-colors: active) — coverage", () => {
  const requiredFiles: Array<{ file: string; description: string }> = [
    {
      file: "packages/primitives/css/utilities.css",
      description: ".flow-focusable default focus ring",
    },
    {
      file: "packages/primitives/css/input-surface.css",
      description: "input-surface focus + border + clear button",
    },
    { file: "packages/primitives/css/primitives.css", description: "inset focus ring" },
    { file: "packages/components/css/controls/Button.css", description: "button focus ring" },
    {
      file: "packages/components/css/navigation/Tabs.css",
      description: "tab + tabpanel focus ring",
    },
    { file: "packages/components/css/inputs/OTPInput.css", description: "OTP cell focus" },
    { file: "packages/components/css/display/TreeView.css", description: "tree item focus ring" },
    { file: "packages/patterns/css/Autocomplete.css", description: "autocomplete focus ring" },
    { file: "packages/patterns/css/Search.css", description: "search focus ring" },
    { file: "packages/patterns/css/ColorPicker.css", description: "swatch selected indicator" },
    { file: "packages/patterns/css/FileUpload.css", description: "upload zone focus ring" },
    { file: "packages/patterns/css/RichTextEditor.css", description: "editor container focus" },
  ];

  for (const { file, description } of requiredFiles) {
    it(`${file} has forced-colors block (${description})`, () => {
      const css = readCSS(file);
      assert.ok(
        css.includes("forced-colors: active"),
        `${file} must contain @media (forced-colors: active) for ${description}`,
      );
    });
  }

  it("forced-colors blocks use CanvasText keyword for outline color", () => {
    // CanvasText is the WHCM system color for text — required for visible outlines
    const files = requiredFiles.map((f) => f.file);
    let canvasTextCount = 0;
    for (const file of files) {
      const css = readCSS(file);
      if (css.includes("CanvasText")) canvasTextCount++;
    }
    assert.ok(
      canvasTextCount >= 8,
      `At least 8 files should use CanvasText in forced-colors blocks, found ${canvasTextCount}`,
    );
  });
});

// ─────────────────────────────────────────────
// prefers-contrast: more — HighContrast.css
// ─────────────────────────────────────────────

describe("@media (prefers-contrast: more) — coverage", () => {
  const highContrastFile = "packages/components/css/_shared/HighContrast.css";

  it("HighContrast.css exists and contains prefers-contrast: more", () => {
    const css = readCSS(highContrastFile);
    assert.ok(
      css.includes("prefers-contrast: more"),
      "Must contain @media (prefers-contrast: more)",
    );
  });

  it("covers control components (button, icon-btn, fab)", () => {
    const css = readCSS(highContrastFile);
    for (const cls of [".flow-btn-v2", ".flow-icon-btn", ".flow-fab"]) {
      assert.ok(css.includes(cls), `HighContrast.css must cover ${cls}`);
    }
  });

  it("covers input components (input-surface, otp, toggle-button, segmented)", () => {
    const css = readCSS(highContrastFile);
    for (const cls of [
      ".flow-input-surface",
      ".flow-otp-input-cell",
      ".flow-toggle-button",
      ".flow-segmented-btn",
    ]) {
      assert.ok(css.includes(cls), `HighContrast.css must cover ${cls}`);
    }
  });

  it("covers navigation components (tab, bottom-nav, accordion, breadcrumb, pagination, stepper)", () => {
    const css = readCSS(highContrastFile);
    for (const cls of [
      ".flow-tab",
      ".flow-bottom-nav-item",
      ".flow-accordion-trigger",
      ".flow-breadcrumb-link",
      ".flow-pagination-btn",
      ".flow-stepper-indicator",
    ]) {
      assert.ok(css.includes(cls), `HighContrast.css must cover ${cls}`);
    }
  });

  it("covers overlay components (dialog, popover, menu, context-menu, tooltip, bottom-sheet)", () => {
    const css = readCSS(highContrastFile);
    for (const cls of [
      ".flow-dialog",
      ".flow-popover",
      ".flow-menu",
      ".flow-context-menu",
      ".flow-tooltip",
      ".flow-bottom-sheet",
    ]) {
      assert.ok(css.includes(cls), `HighContrast.css must cover ${cls}`);
    }
  });

  it("covers pattern components (autocomplete, search, file-upload, color-picker, inline-editable, rich-text-editor, multi-select)", () => {
    const css = readCSS(highContrastFile);
    for (const cls of [
      ".flow-autocomplete-input-wrap",
      ".flow-search",
      ".flow-file-upload-zone",
      ".flow-color-picker-swatch",
      ".flow-inline-editable-edit",
      ".flow-rich-text-editor-container",
      ".flow-multi-select-trigger",
    ]) {
      assert.ok(css.includes(cls), `HighContrast.css must cover ${cls}`);
    }
  });

  it("increases focus ring width to at least 3px", () => {
    const css = readCSS(highContrastFile);
    assert.ok(
      css.includes("outline-width: 3px"),
      "Focus ring width should be bumped to 3px in high contrast",
    );
  });

  it("bumps --sys-frame-border-thin to 2px", () => {
    const css = readCSS(highContrastFile);
    assert.ok(
      css.includes("--sys-frame-border-thin: 2px"),
      "Border width should be bumped in high contrast",
    );
  });
});
