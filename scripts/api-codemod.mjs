#!/usr/bin/env node
/**
 * Flow Design System — API Codemod
 *
 * Migrates consumer code from pre-1.0 API to the standardised v1.0 API.
 *
 * Transforms:
 *  1. Button/IconButton variant renames (high→primary, medium→secondary, low→tertiary, outline→outlined)
 *  2. Button/IconButton danger/warning → intent prop
 *  3. Badge color→status rename + value mapping
 *  4. Card accent→status rename + value mapping
 *  5. Chip variant simplification (default→filled, semantic variants→status prop)
 *  6. List/Progress/InlineValidation/Snackbar/Timeline/NotificationPanel variant→status
 *  7. SwipeActions/ConfirmationDialog/QuickActions variant→intent
 *  8. DatePicker error+errorMessage → error (string)
 *  9. SectionHeader subtitle→description
 * 10. Data objects: key→id (TabItem, AccordionItem, StepperStep, MenuItem)
 * 11. Timeline title→label
 *
 * Usage:
 *   node scripts/api-codemod.mjs [--dry-run] [--dir path]
 *
 * Options:
 *   --dry-run   Print changes without writing files
 *   --dir       Target directory (default: current working directory)
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve, relative } from "node:path";

// ── Helpers ──────────────────────────────────────────

let totalChanges = 0;
let filesChanged = 0;
const dryRun = process.argv.includes("--dry-run");
const dirIdx = process.argv.indexOf("--dir");
const targetDir = dirIdx !== -1 ? resolve(process.argv[dirIdx + 1]) : process.cwd();

function walkDir(dir) {
  const results = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules" && entry.name !== "dist") {
      results.push(...walkDir(full));
    } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

// ── Transform rules ──────────────────────────────────

const rules = [];

function rule(name, fn) {
  rules.push({ name, fn });
}

// ── 1. Button/IconButton emphasis variant renames ────

const btnVariantMap = [
  ["high", "primary"],
  ["medium", "secondary"],
  ["low", "tertiary"],
  ["outline", "outlined"],
];

for (const [from, to] of btnVariantMap) {
  rule(`Button variant: ${from} → ${to}`, (src) => {
    let count = 0;
    let out = src;
    out = out.replace(
      new RegExp(`(<Flow(?:Icon)?Button\\b[^>]*?\\bvariant=)"${from}"`, "g"),
      (m, prefix) => { count++; return `${prefix}"${to}"`; }
    );
    out = out.replace(
      new RegExp(`(<Flow(?:Icon)?Button\\b[^>]*?\\bvariant=\\{)"${from}"(\\})`, "g"),
      (m, prefix, suffix) => { count++; return `${prefix}"${to}"${suffix}`; }
    );
    return [out, count];
  });
}

// ── 2. Button/IconButton danger/warning → intent ─────

for (const intent of ["danger", "warning"]) {
  rule(`Button variant=${intent} → intent=${intent}`, (src) => {
    let count = 0;
    let out = src;
    out = out.replace(
      new RegExp(`(<Flow(?:Icon)?Button\\b[^>]*?)\\bvariant="${intent}"`, "g"),
      (m, prefix) => { count++; return `${prefix}variant="primary" intent="${intent}"`; }
    );
    out = out.replace(
      new RegExp(`(<Flow(?:Icon)?Button\\b[^>]*?)\\bvariant=\\{"${intent}"\\}`, "g"),
      (m, prefix) => { count++; return `${prefix}variant="primary" intent="${intent}"`; }
    );
    return [out, count];
  });
}

// ── 3. Badge color → status ──────────────────────────

rule("Badge: color → status", (src) => {
  let count = 0;
  let out = src;

  out = out.replace(
    /(<FlowBadge\b[^>]*?)\bcolor=/g,
    (m, prefix) => { count++; return `${prefix}status=`; }
  );
  out = out.replace(
    /(<FlowBadge\b[^>]*?\bstatus=)"(?:default|secondary)"/g,
    (m, prefix) => { count++; return `${prefix}"neutral"`; }
  );
  out = out.replace(
    /(<FlowBadge\b[^>]*?\bstatus=)"accent"/g,
    (m, prefix) => { count++; return `${prefix}"info"`; }
  );
  out = out.replace(
    /(<FlowBadge\b[^>]*?\bstatus=)"danger"/g,
    (m, prefix) => { count++; return `${prefix}"error"`; }
  );

  return [out, count];
});

// ── 4. Card accent → status ──────────────────────────

rule("Card: accent → status", (src) => {
  let count = 0;
  let out = src;

  out = out.replace(
    /(<FlowCard\b[^>]*?)\baccent=/g,
    (m, prefix) => { count++; return `${prefix}status=`; }
  );
  out = out.replace(
    /(<FlowCard\b[^>]*?\bstatus=)"(?:action|accent)"/g,
    (m, prefix) => { count++; return `${prefix}"info"`; }
  );
  out = out.replace(
    /(<FlowCard\b[^>]*?\bstatus=)"danger"/g,
    (m, prefix) => { count++; return `${prefix}"error"`; }
  );

  return [out, count];
});

// ── 5. Chip variant simplification ───────────────────

rule("Chip: variant=default → variant=filled", (src) => {
  let count = 0;
  let out = src;
  out = out.replace(
    /(<FlowChip\b[^>]*?\bvariant=)"default"/g,
    (m, prefix) => { count++; return `${prefix}"filled"`; }
  );
  return [out, count];
});

rule("Chip: semantic variants → status prop", (src) => {
  let count = 0;
  let out = src;

  for (const status of ["success", "warning", "error", "info"]) {
    out = out.replace(
      new RegExp(`(<FlowChip\\b[^>]*?)\\bvariant="${status}"`, "g"),
      (m, prefix) => { count++; return `${prefix}variant="filled" status="${status}"`; }
    );
  }
  out = out.replace(
    /(<FlowChip\b[^>]*?)\bvariant="accent"/g,
    (m, prefix) => { count++; return `${prefix}variant="filled" status="info"`; }
  );
  out = out.replace(
    /(<FlowChip\b[^>]*?)\bvariant="danger"/g,
    (m, prefix) => { count++; return `${prefix}variant="filled" status="error"`; }
  );

  return [out, count];
});

// ── 6. variant → status (display/feedback components) ─

const statusComponents = [
  "FlowCircularProgress",
  "FlowProgressBar",
  "FlowInlineValidationMessage",
  "FlowSnackbar",
  "FlowTimeline",
  "FlowNotificationPanel",
];

for (const comp of statusComponents) {
  rule(`${comp}: variant → status`, (src) => {
    let count = 0;
    let out = src;
    out = out.replace(
      new RegExp(`(<${comp}\\b[^>]*?)\\bvariant=`, "g"),
      (m, prefix) => { count++; return `${prefix}status=`; }
    );
    out = out.replace(
      new RegExp(`(<${comp}\\b[^>]*?\\bstatus=)"default"`, "g"),
      (m, prefix) => { count++; return `${prefix}"neutral"`; }
    );
    return [out, count];
  });
}

// ── 7. variant → intent (action components) ──────────

for (const comp of ["FlowSwipeActions", "FlowConfirmationDialog", "FlowQuickActions"]) {
  rule(`${comp}: variant → intent`, (src) => {
    let count = 0;
    let out = src;
    out = out.replace(
      new RegExp(`(<${comp}\\b[^>]*?)\\bvariant=`, "g"),
      (m, prefix) => { count++; return `${prefix}intent=`; }
    );
    return [out, count];
  });
}

// ── 8. DatePicker error + errorMessage merge ─────────

rule("DatePicker: errorMessage → error", (src) => {
  let count = 0;
  let out = src;

  if (src.includes("FlowDatePicker") && src.includes("errorMessage")) {
    console.log("  ⚠  FlowDatePicker with errorMessage detected — manual review recommended");
    console.log("     Merge error={bool} + errorMessage={string} → error={string}");
  }

  out = out.replace(
    /(<FlowDate(?:Range)?Picker\b[^>]*?)\berrorMessage=/g,
    (m, prefix) => {
      if (prefix.includes(" error=") || prefix.includes(" error ")) {
        return m; // Both present — needs manual review
      }
      count++;
      return `${prefix}error=`;
    }
  );

  return [out, count];
});

// ── 9. SectionHeader subtitle → description ──────────

rule("SectionHeader: subtitle → description", (src) => {
  let count = 0;
  let out = src;
  out = out.replace(
    /(<FlowSectionHeader\b[^>]*?)\bsubtitle=/g,
    (m, prefix) => { count++; return `${prefix}description=`; }
  );
  return [out, count];
});

// ── 10. Data object key → id (advisory only) ────────

rule("Data objects: key → id", (src) => {
  if (/\b(?:tabs|items|steps|menuItems)\s*[:=]\s*\[/.test(src)) {
    const hasKeyProp = /\{\s*key:\s*["'`]/.test(src);
    if (hasKeyProp && (src.includes("FlowTabs") || src.includes("FlowAccordion") || src.includes("FlowStepper") || src.includes("FlowMenu"))) {
      console.log("  ⚠  Data objects with `key:` found — consider migrating to `id:`");
      console.log("     Components support both during deprecation period");
    }
  }
  return [src, 0];
});

// ── 11. Timeline title → label (advisory only) ──────

rule("Timeline: title → label", (src) => {
  if (src.includes("FlowTimeline") && /\btitle:\s*["'`]/.test(src)) {
    console.log("  ⚠  FlowTimeline data objects may need title: → label: migration");
  }
  return [src, 0];
});

// ── Type alias renames ───────────────────────────────

rule("Type: BadgeColor → BadgeStatus", (src) => {
  let count = 0;
  let out = src.replace(/\bBadgeColor\b/g, () => { count++; return "BadgeStatus"; });
  return [out, count];
});

rule("Type: CardAccent → CardStatus", (src) => {
  let count = 0;
  let out = src.replace(/\bCardAccent\b/g, () => { count++; return "CardStatus"; });
  return [out, count];
});

// ── Run ──────────────────────────────────────────────

console.log(`\n🔄 Flow API Codemod — ${dryRun ? "DRY RUN" : "LIVE"}`);
console.log(`   Target: ${targetDir}\n`);

const files = walkDir(targetDir);
console.log(`   Found ${files.length} TypeScript/JSX files\n`);

for (const filePath of files) {
  const original = readFileSync(filePath, "utf8");
  let content = original;
  let fileChanges = 0;
  const appliedRules = [];

  for (const { name, fn } of rules) {
    const [newContent, count] = fn(content);
    if (count > 0) {
      content = newContent;
      fileChanges += count;
      appliedRules.push(`${name} (${count})`);
    }
  }

  if (fileChanges > 0) {
    const rel = relative(targetDir, filePath);
    console.log(`  ✓ ${rel} — ${fileChanges} change(s)`);
    for (const r of appliedRules) {
      console.log(`      ${r}`);
    }

    if (!dryRun) {
      writeFileSync(filePath, content, "utf8");
    }

    filesChanged++;
    totalChanges += fileChanges;
  }
}

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`  Files changed: ${filesChanged}`);
console.log(`  Total changes: ${totalChanges}`);
if (dryRun) {
  console.log(`  Mode: DRY RUN (no files written)`);
}
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
