/**
 * FLOW — Visual Regression Tests
 *
 * Discovers all preview variants from the registry and generates a screenshot
 * test per variant. Also runs density × theme matrix tests on boundary components.
 *
 * Run:              npx playwright test
 * Update baselines: npx playwright test --update-snapshots
 */
import { expect, test } from "playwright/test";

import { previewManifest } from "../../app/registry/preview-manifest";

const BASE_URL = "http://localhost:5173";

// ── Boundary components for matrix tests ──
// These exercise the full density/theme token paths.
const DENSITY_BOUNDARY_IDS = [
  "controls-flowbutton/all-sizes",
  "inputs-flowtextinput/default",
  "selection-flowselect/default",
  "display-flowcard/default",
  "overlays-flowdialog/default",
  "layout-flowaccordion/default",
  "display-flowlist/default",
  "navigation-flowtabs/default",
  "patterns-flowdatepicker/default",
  "display-flowchip/default",
  "display-flowbadge/default",
  "patterns-flowvirtualdatatable/default",
];

const THEME_BOUNDARY_IDS = [
  "controls-flowbutton/all-variants",
  "display-flowchip/default",
  "display-flowbadge/default",
  "display-flowcard/default",
  "display-flowtag/all-statuses",
  "patterns-flowsnackbar/info",
  "inputs-flowtextinput/with-error",
  "selection-flowswitch/default",
  "patterns-flowdatepicker/default",
  "patterns-flowsectionheader/default",
  "patterns-flownotificationpanel/default",
  "patterns-flowadvancedfilters/default",
];

const DENSITIES = ["compact", "default", "comfortable"] as const;
const THEMES = ["light", "dark"] as const;

// ── Helper: navigate to preview URL and wait for render ──
async function gotoPreview(
  page: import("playwright/test").Page,
  componentId: string,
  variant: string,
  params?: { density?: string; theme?: string },
) {
  const url = new URL(`${BASE_URL}/preview/${componentId}/${variant}`);
  if (params?.density && params.density !== "default") url.searchParams.set("density", params.density);
  if (params?.theme && params.theme !== "light") url.searchParams.set("theme", params.theme);
  await page.goto(url.toString());
  // Wait for the preview container — the div with data-density
  await page.waitForSelector("[data-density]", { state: "visible" });
  // Allow CSS transitions and fonts to settle
  await page.waitForTimeout(300);
}

// Snapshot name: preserve double-dash format to keep baseline compatibility
function snapshotName(componentId: string, variant: string, suffix?: string): string {
  const base = `${componentId}--${variant}`.replace(/\//g, "--");
  return suffix ? `${base}--${suffix}.png` : `${base}.png`;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Phase 1 — All registry variants
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const allVariants = Object.entries(previewManifest).flatMap(([componentId, variants]) =>
  variants.map((variant) => ({ componentId, variant })),
);

test.describe("Base screenshots — all variants", () => {
  test("screenshot all registry variants", async ({ page }) => {
    for (const { componentId, variant } of allVariants) {
      await gotoPreview(page, componentId, variant);
      await expect.soft(page).toHaveScreenshot(snapshotName(componentId, variant), {
        maxDiffPixelRatio: 0.01,
      });
    }
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Phase 2 — Density matrix (boundary components)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test.describe("Density matrix — boundary components", () => {
  for (const id of DENSITY_BOUNDARY_IDS) {
    const [componentId, variant] = id.split("/");
    for (const density of DENSITIES) {
      test(`${id} @ density=${density}`, async ({ page }) => {
        await gotoPreview(page, componentId, variant, { density });
        await expect(page).toHaveScreenshot(snapshotName(componentId, variant, `density-${density}`), {
          maxDiffPixelRatio: 0.01,
        });
      });
    }
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Phase 3 — Theme matrix (boundary components)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test.describe("Theme matrix — boundary components", () => {
  for (const id of THEME_BOUNDARY_IDS) {
    const [componentId, variant] = id.split("/");
    for (const theme of THEMES) {
      test(`${id} @ theme=${theme}`, async ({ page }) => {
        await gotoPreview(page, componentId, variant, { theme });
        await expect(page).toHaveScreenshot(snapshotName(componentId, variant, `theme-${theme}`), {
          maxDiffPixelRatio: 0.01,
        });
      });
    }
  }
});
