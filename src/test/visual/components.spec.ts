/**
 * Visual regression tests for core Flow components.
 *
 * Each test navigates to a Storybook story iframe and takes a screenshot,
 * compared against baseline snapshots in __snapshots__/.
 *
 * Run: npx playwright test
 * Update baselines: npx playwright test --update-snapshots
 */
import { expect, test } from "playwright/test";

const STORIES = [
  // Controls
  { id: "controls-flowbutton--high", name: "FlowButton High" },
  { id: "controls-flowbutton--medium", name: "FlowButton Medium" },
  { id: "controls-flowbutton--low", name: "FlowButton Low" },
  { id: "controls-flowbutton--outline", name: "FlowButton Outline" },
  { id: "controls-flowbutton--danger", name: "FlowButton Danger" },
  { id: "controls-flowbutton--with-icon", name: "FlowButton WithIcon" },
  { id: "controls-flowbutton--loading", name: "FlowButton Loading" },
  { id: "controls-flowbutton--disabled", name: "FlowButton Disabled" },
  { id: "controls-flowbutton--all-sizes", name: "FlowButton AllSizes" },
  { id: "controls-flowbutton--all-emphases", name: "FlowButton AllEmphases" },
  // Inputs
  { id: "inputs-flowtextinput--default", name: "FlowTextInput Default" },
  { id: "inputs-flowtextinput--with-hint", name: "FlowTextInput WithHint" },
  { id: "inputs-flowtextinput--with-error", name: "FlowTextInput WithError" },
  { id: "inputs-flowtextinput--disabled", name: "FlowTextInput Disabled" },
  { id: "inputs-flowtextinput--all-sizes", name: "FlowTextInput AllSizes" },
  // Selection
  { id: "selection-flowswitch--default", name: "FlowSwitch Default" },
  { id: "selection-flowswitch--checked", name: "FlowSwitch Checked" },
  { id: "selection-flowswitch--disabled", name: "FlowSwitch Disabled" },
  // Display
  { id: "display-flowcard--default", name: "FlowCard Default" },
  { id: "display-flowcard--elevation-levels", name: "FlowCard ElevationLevels" },
  { id: "display-flowtag--default", name: "FlowTag Default" },
  { id: "display-flowtag--all-statuses", name: "FlowTag AllStatuses" },
  // Foundation
  { id: "foundation-density-comparison--side-by-side", name: "Density SideBySide" },
];

for (const story of STORIES) {
  test(`${story.name} matches snapshot`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
    // Wait for Storybook to render and fonts to load
    await page.waitForSelector("#storybook-root", { state: "visible" });
    await page.waitForTimeout(500); // allow CSS transitions to settle
    await expect(page).toHaveScreenshot(`${story.name}.png`, {
      maxDiffPixelRatio: 0.01,
    });
  });
}

// ── Density-specific visual tests ──
const DENSITY_MODES = ["compact", "default", "comfortable"] as const;

for (const density of DENSITY_MODES) {
  test(`FlowButton at density=${density}`, async ({ page }) => {
    const densityParam = density !== "default" ? `&globals=density:${density}` : "";
    await page.goto(`/iframe.html?id=controls-flowbutton--all-sizes&viewMode=story${densityParam}`);
    await page.waitForSelector("#storybook-root", { state: "visible" });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot(`FlowButton-density-${density}.png`, {
      maxDiffPixelRatio: 0.01,
    });
  });
}

// ── Theme-specific visual tests ──
for (const theme of ["light", "dark"] as const) {
  test(`FlowButton AllEmphases in ${theme} theme`, async ({ page }) => {
    await page.goto(
      `/iframe.html?id=controls-flowbutton--all-emphases&viewMode=story&globals=theme:${theme}`,
    );
    await page.waitForSelector("#storybook-root", { state: "visible" });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot(`FlowButton-AllEmphases-${theme}.png`, {
      maxDiffPixelRatio: 0.01,
    });
  });
}
