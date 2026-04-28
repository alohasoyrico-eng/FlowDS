#!/usr/bin/env node
/**
 * split-css.mjs — Split monolithic components.css into per-component files
 *
 * Reads packages/components/css/components.css, splits by section headers,
 * writes individual CSS files per component/pattern, and generates a barrel
 * @import file for backwards compatibility.
 *
 * Usage: node scripts/split-css.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const COMPONENTS_CSS = join(ROOT, "packages/components/css/components.css");

// ── Section mapping: line-based component boundaries ──
// Each entry: [startLine (1-indexed), componentName, target]
// target: "components/{domain}/{Name}.css" or "patterns/{Name}.css"
// Lines between entries belong to the previous component.
// The splitter reads from startLine to the line before the next entry.

const SECTION_MAP = [
  // L3 Components
  [1,    "Button",            "components/controls/Button.css"],
  [438,  "IconButton",        "components/controls/IconButton.css"],
  [739,  "Chip",              "components/display/Chip.css"],
  [892,  "Avatar",            "components/display/Avatar.css"],
  [979,  "Badge",             "components/display/Badge.css"],
  [1035, "Tabs",              "components/navigation/Tabs.css"],
  [1237, "List",              "components/display/List.css"],
  [1346, "TreeView",          "components/display/TreeView.css"],
  [1419, "Slider",            "components/selection/Slider.css"],
  [1531, "CircularProgress",  "components/feedback/CircularProgress.css"],
  [1636, "Accordion",         "components/navigation/Accordion.css"],
  [1752, "Breadcrumbs",       "components/navigation/Breadcrumbs.css"],
  [1874, "Pagination",        "components/navigation/Pagination.css"],
  [1965, "SegmentedControl",  "components/selection/SegmentedControl.css"],
  [2038, "Stepper",           "components/layout/Stepper.css"],
  [2208, "BottomNav",         "components/navigation/BottomNav.css"],
  [2298, "FAB",               "components/controls/FAB.css"],
  [2432, "Toolbar",           "patterns/Toolbar.css"],
  [2473, "Popover",           "components/overlays/Popover.css"],
  [2502, "BottomSheet",       "components/overlays/BottomSheet.css"],
  [2591, "ContextMenu",       "components/overlays/ContextMenu.css"],
  [2676, "Menu",              "components/overlays/Menu.css"],
  [2777, "ToggleButton",      "components/selection/ToggleButton.css"],
  [2861, "Search",            "patterns/Search.css"],
  [2959, "PullToRefresh",     "patterns/PullToRefresh.css"],
  [3001, "SwipeActions",      "patterns/SwipeActions.css"],
  [3064, "Sidebar",           "components/navigation/Sidebar.css"],
  [3192, "Topbar",            "patterns/Topbar.css"],
  [3234, "Autocomplete",      "patterns/Autocomplete.css"],
  [3390, "LoadingDots",       "components/feedback/LoadingDots.css"],
  [3429, "FullscreenSheet",   "patterns/FullscreenSheet.css"],
  [3439, "Skeleton",          "components/feedback/Skeleton.css"],
  [3450, "Tone",              "components/_shared/Tone.css"],
  [3478, "OTPInput",          "components/inputs/OTPInput.css"],
  [3544, "DatePicker",        "patterns/DatePicker.css"],
  [3694, "MultiSelect",       "patterns/MultiSelect.css"],
  [3854, "InlineEditable",    "patterns/InlineEditable.css"],
  [3889, "ColorPicker",       "patterns/ColorPicker.css"],
  [3958, "FileUpload",        "patterns/FileUpload.css"],
  [4072, "RichTextEditor",    "patterns/RichTextEditor.css"],
  [4137, "DateRangePicker",   "patterns/DateRangePicker.css"],
  [4234, "KPICard",           "patterns/KPICard.css"],
  [4248, "Timeline",          "patterns/Timeline.css"],
  [4259, "SectionHeader",     "patterns/SectionHeader.css"],
  [4270, "HoverCard",         "patterns/HoverCard.css"],
  [4280, "NotificationPanel", "patterns/NotificationPanel.css"],
  [4292, "ConfirmationDialog","patterns/ConfirmationDialog.css"],
  [4307, "DataTable",         "patterns/DataTable.css"],
  [4351, "FormSection",       "patterns/FormSection.css"],
  [4360, "InlineValidation",  "components/feedback/InlineValidation.css"],
  [4372, "ToneIntegration",   "components/_shared/ToneIntegration.css"],
  [4416, "Dialog",            "components/overlays/Dialog.css"],
  [4439, "Tooltip",           "components/overlays/Tooltip.css"],
  [4451, "KPITrend",          "components/display/KPITrend.css"],
  [4465, "ContainerQueries",  "components/_shared/ContainerQueries.css"],
  [4493, "HighContrast",      "components/_shared/HighContrast.css"],
  [4516, "ImageWithFallback", "components/display/ImageWithFallback.css"],
  [4531, "FlagIcons",         "components/display/FlagIcons.css"],
  [4538, "Tags",              "components/display/Tags.css"],
];

// ── Read source ──
const source = readFileSync(COMPONENTS_CSS, "utf8");
const lines = source.split("\n");
const totalLines = lines.length;

console.log(`Source: ${totalLines} lines, ${source.length} bytes`);

// ── Split into sections ──
const componentFiles = new Map(); // target path → css content
const patternFiles = new Map();

for (let i = 0; i < SECTION_MAP.length; i++) {
  const [startLine, name, target] = SECTION_MAP[i];
  const endLine = i + 1 < SECTION_MAP.length ? SECTION_MAP[i + 1][0] - 1 : totalLines;

  // Extract lines (1-indexed to 0-indexed)
  const sectionLines = lines.slice(startLine - 1, endLine);

  // Trim trailing empty lines
  while (sectionLines.length > 0 && sectionLines[sectionLines.length - 1].trim() === "") {
    sectionLines.pop();
  }

  const content = sectionLines.join("\n") + "\n";

  if (target.startsWith("patterns/")) {
    patternFiles.set(target.replace("patterns/", ""), content);
  } else {
    componentFiles.set(target.replace("components/", ""), content);
  }

  console.log(`  ${name}: L${startLine}-L${endLine} (${sectionLines.length} lines) → ${target}`);
}

// ── Write component CSS files ──
const compCssDir = join(ROOT, "packages/components/css");
let compImports = [];

for (const [relPath, content] of componentFiles) {
  const fullPath = join(compCssDir, relPath);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, content);
  compImports.push(relPath);
}

// ── Write pattern CSS files ──
const patternCssDir = join(ROOT, "packages/patterns/css");
mkdirSync(patternCssDir, { recursive: true });
let patternImports = [];

for (const [relPath, content] of patternFiles) {
  const fullPath = join(patternCssDir, relPath);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, content);
  patternImports.push(relPath);
}

// ── Generate barrel components.css (backwards compat) ──
const barrelLines = [
  "/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  "   FLOW Components — Aggregated CSS (auto-generated barrel)",
  "   Import all per-component CSS files for backwards compatibility.",
  "   For tree-shaking, import individual component CSS instead.",
  "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */",
  "",
  "/* L3 Components */",
  ...compImports.map(p => `@import "./${p}";`),
  "",
  "/* L4 Patterns (CSS owned by @flow/patterns) */",
  ...patternImports.map(p => `@import "../../../packages/patterns/css/${p}";`),
  "",
];
writeFileSync(join(compCssDir, "components.css"), barrelLines.join("\n") + "\n");

// ── Summary ──
const totalComp = componentFiles.size;
const totalPat = patternFiles.size;
let totalBytes = 0;
for (const c of componentFiles.values()) totalBytes += c.length;
for (const c of patternFiles.values()) totalBytes += c.length;

console.log(`\n✓ Split complete:`);
console.log(`  ${totalComp} component CSS files → packages/components/css/{domain}/`);
console.log(`  ${totalPat} pattern CSS files → packages/patterns/css/`);
console.log(`  ${totalBytes} bytes total (source: ${source.length} bytes)`);
console.log(`  Barrel: packages/components/css/components.css (${compImports.length + patternImports.length} imports)`);
