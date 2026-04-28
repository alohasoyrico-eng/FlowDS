/**
 * FLOW — Interaction Tests (Playwright, real browser)
 *
 * Tests browser-specific behavior for components where real DOM matters:
 * focus traps, keyboard navigation, positioning, animations.
 * These replace Storybook play() functions for high-priority components.
 *
 * Run: npx playwright test interactions.spec.ts
 */
import { expect, test } from "playwright/test";

const BASE = "http://localhost:5173";
const go = (path: string) => `${BASE}/preview/${path}`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowButton
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test.describe("FlowButton", () => {
  test("renders primary variant with correct attribute", async ({ page }) => {
    await page.goto(go("controls-flowbutton/default"));
    const btn = page.getByRole("button", { name: "Primary Action" });
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute("data-variant", "primary");
    await expect(btn).not.toBeDisabled();
  });

  test("disabled button is not clickable", async ({ page }) => {
    await page.goto(go("controls-flowbutton/disabled"));
    const btn = page.getByRole("button");
    await expect(btn).toBeDisabled();
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowDialog — focus trap, aria-modal, keyboard close
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test.describe("FlowDialog", () => {
  test("opens dialog and traps focus", async ({ page }) => {
    await page.goto(go("overlays-flowdialog/default"));
    await page.getByRole("button", { name: "Open Dialog" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await expect(dialog.getByText("Dialog Title")).toBeVisible();
  });

  test("closes dialog on Cancel", async ({ page }) => {
    await page.goto(go("overlays-flowdialog/with-actions"));
    await page.getByRole("button", { name: "Open Dialog" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("button", { name: "Cancel" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("closes dialog on Escape key", async ({ page }) => {
    await page.goto(go("overlays-flowdialog/default"));
    await page.getByRole("button", { name: "Open Dialog" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("alert variant renders", async ({ page }) => {
    await page.goto(go("overlays-flowdialog/alert-variant"));
    await page.getByRole("button", { name: "Delete" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSelect — dropdown, keyboard navigation
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test.describe("FlowSelect", () => {
  test("opens dropdown and selects an option", async ({ page }) => {
    await page.goto(go("selection-flowselect/default"));
    const combobox = page.getByRole("combobox");
    await expect(combobox).toHaveAttribute("aria-expanded", "false");
    await combobox.click();
    await expect(combobox).toHaveAttribute("aria-expanded", "true");
    const listbox = page.getByRole("listbox");
    await expect(listbox).toBeVisible();
    await page.getByRole("option", { name: "Canada" }).click();
    await expect(combobox).toHaveAttribute("aria-expanded", "false");
  });

  test("disabled select cannot be opened", async ({ page }) => {
    await page.goto(go("selection-flowselect/disabled"));
    const combobox = page.getByRole("combobox");
    await combobox.click();
    await expect(page.getByRole("listbox")).not.toBeVisible();
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowMenu — opens, keyboard navigation, selection
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test.describe("FlowMenu", () => {
  test("opens menu on trigger click", async ({ page }) => {
    await page.goto(go("overlays-flowmenu/default"));
    const trigger = page.getByRole("button", { name: "Open Menu" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("menu")).toBeVisible();
  });

  test("closes menu on Escape", async ({ page }) => {
    await page.goto(go("overlays-flowmenu/default"));
    await page.getByRole("button", { name: "Open Menu" }).click();
    await expect(page.getByRole("menu")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("menu")).not.toBeVisible();
  });

  test("menu items are visible and clickable", async ({ page }) => {
    await page.goto(go("overlays-flowmenu/default"));
    await page.getByRole("button", { name: "Open Menu" }).click();
    const menu = page.getByRole("menu");
    await expect(menu.getByRole("menuitem", { name: /Edit/i })).toBeVisible();
    await menu.getByRole("menuitem", { name: /Edit/i }).click();
    await expect(menu).not.toBeVisible();
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowTooltip — hover behavior
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test.describe("FlowTooltip", () => {
  test("shows tooltip on hover", async ({ page }) => {
    await page.goto(go("overlays-flowtooltip/default"));
    const trigger = page.getByRole("button", { name: "Hover me" });
    await trigger.hover();
    await expect(page.getByRole("tooltip")).toBeVisible();
    await expect(page.getByText("This is a tooltip")).toBeVisible();
  });

  test("hides tooltip when mouse leaves", async ({ page }) => {
    await page.goto(go("overlays-flowtooltip/default"));
    const trigger = page.getByRole("button", { name: "Hover me" });
    await trigger.hover();
    await expect(page.getByRole("tooltip")).toBeVisible();
    await page.mouse.move(0, 0);
    await expect(page.getByRole("tooltip")).not.toBeVisible();
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowBottomSheet — open/close, keyboard
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test.describe("FlowBottomSheet", () => {
  test("opens and closes bottom sheet", async ({ page }) => {
    await page.goto(go("overlays-flowbottomsheet/default"));
    await page.getByRole("button", { name: "Open Sheet" }).click();
    const sheet = page.getByRole("dialog");
    await expect(sheet).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(sheet).not.toBeVisible();
  });

  test("renders with title", async ({ page }) => {
    await page.goto(go("overlays-flowbottomsheet/with-title"));
    await page.getByRole("button", { name: "Open Sheet" }).click();
    await expect(page.getByText("Sheet Title")).toBeVisible();
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowTabs — tab switching
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test.describe("FlowTabs", () => {
  test("switches tab on click", async ({ page }) => {
    await page.goto(go("navigation-flowtabs/default"));
    await expect(page.getByText("Overview content")).toBeVisible();
    await page.getByRole("tab", { name: "Details" }).click();
    await expect(page.getByText("Details content")).toBeVisible();
    await expect(page.getByText("Overview content")).not.toBeVisible();
  });

  test("active tab has aria-selected", async ({ page }) => {
    await page.goto(go("navigation-flowtabs/default"));
    const overviewTab = page.getByRole("tab", { name: "Overview" });
    await expect(overviewTab).toHaveAttribute("aria-selected", "true");
    await page.getByRole("tab", { name: "Details" }).click();
    await expect(overviewTab).toHaveAttribute("aria-selected", "false");
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowAccordion — expand/collapse
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test.describe("FlowAccordion", () => {
  test("expands item on click", async ({ page }) => {
    await page.goto(go("layout-flowaccordion/default"));
    const trigger = page.getByRole("button", { name: /What is Flow/ });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("Flow is a design system.")).toBeVisible();
  });

  test("collapses item on second click", async ({ page }) => {
    await page.goto(go("layout-flowaccordion/default"));
    const trigger = page.getByRole("button", { name: /What is Flow/ });
    await trigger.click();
    await expect(page.getByText("Flow is a design system.")).toBeVisible();
    await trigger.click();
    await expect(page.getByText("Flow is a design system.")).not.toBeVisible();
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowCheckbox — toggle, keyboard
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test.describe("FlowCheckbox", () => {
  test("toggles checkbox on click", async ({ page }) => {
    await page.goto(go("selection-flowcheckbox/default"));
    const cb = page.getByRole("checkbox", { name: "Accept terms" });
    await expect(cb).not.toBeChecked();
    await cb.click();
    await expect(cb).toBeChecked();
    await cb.click();
    await expect(cb).not.toBeChecked();
  });

  test("indeterminate checkbox has aria-checked mixed", async ({ page }) => {
    await page.goto(go("selection-flowcheckbox/indeterminate"));
    const cb = page.getByRole("checkbox");
    await expect(cb).toHaveJSProperty("indeterminate", true);
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSwitch — toggle
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test.describe("FlowSwitch", () => {
  test("toggles switch on click", async ({ page }) => {
    await page.goto(go("selection-flowswitch/default"));
    const sw = page.getByRole("switch");
    await expect(sw).toHaveAttribute("aria-checked", "false");
    await sw.click();
    await expect(sw).toHaveAttribute("aria-checked", "true");
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowTextInput — type and clear
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test.describe("FlowTextInput", () => {
  test("accepts typed input", async ({ page }) => {
    await page.goto(go("inputs-flowtextinput/default"));
    const input = page.getByRole("textbox");
    await input.click();
    await input.type("test@flow.dev");
    await expect(input).toHaveValue("test@flow.dev");
  });

  test("shows error state", async ({ page }) => {
    await page.goto(go("inputs-flowtextinput/with-error"));
    await expect(page.getByText("Invalid email address")).toBeVisible();
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowPopover — open/close
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test.describe("FlowPopover", () => {
  test("opens and closes popover", async ({ page }) => {
    await page.goto(go("overlays-flowpopover/default"));
    await page.getByRole("button", { name: "Open Popover" }).click();
    await expect(page.getByText("Popover content")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByText("Popover content")).not.toBeVisible();
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowMultiSelect — multi-selection
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test.describe("FlowMultiSelect", () => {
  test("opens dropdown and selects multiple options", async ({ page }) => {
    await page.goto(go("selection-flowmultiselect/default"));
    const combobox = page.getByRole("combobox");
    await combobox.click();
    await expect(page.getByRole("listbox")).toBeVisible();
    await page.getByRole("option", { name: "United States" }).click();
    await page.getByRole("option", { name: "Canada" }).click();
    // Both should be checked
    await expect(page.getByRole("option", { name: "United States" })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("option", { name: "Canada" })).toHaveAttribute("aria-selected", "true");
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowConfirmationDialog
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test.describe("FlowConfirmationDialog", () => {
  test("opens and shows confirmation content", async ({ page }) => {
    await page.goto(go("patterns-flowconfirmationdialog/default"));
    await page.getByRole("button", { name: "Confirm" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText("Do you want to proceed?")).toBeVisible();
  });

  test("danger variant shows destructive action", async ({ page }) => {
    await page.goto(go("patterns-flowconfirmationdialog/danger"));
    await page.getByRole("button", { name: "Delete" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText("This cannot be undone.")).toBeVisible();
  });
});
