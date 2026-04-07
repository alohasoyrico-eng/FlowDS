/**
 * FLOW Design System — CI Enforcement Rules (EXECUTABLE)
 * ────────────────────────────────────────────────────────
 * These rules are both specifications AND runnable.
 * runFlowLint() scans source text and returns violations.
 * In CI: import and call runFlowLint() as a build step.
 * In ESLint: each rule can be adapted into a custom ESLint plugin.
 */

export interface LintRule {
  id: string;
  name: string;
  severity: "error" | "warning";
  description: string;
  pattern: RegExp;
  message: string;
  autofix?: string;
}

export interface LintViolation {
  ruleId: string;
  severity: "error" | "warning";
  message: string;
  line: number;
  column: number;
  source: string;
}

export const flowLintRules: LintRule[] = [
  // ── Rule 1: No hardcoded colors ──
  {
    id: "flow/no-hardcoded-color",
    name: "No Hardcoded Colors",
    severity: "error",
    description:
      "Detects raw hex, rgb, rgba, hsl values in style objects and CSS. All colors must reference var(--ref-energy-*), var(--sys-energy-*), or var(--comp-*) tokens.",
    pattern:
      /(?:color|background|fill|stroke|border(?:-color)?)\s*:\s*["']?(?:#[0-9a-fA-F]{3,8}|rgba?\s*\(|hsla?\s*\()/g,
    message:
      "Hardcoded color detected. Use a Flow token: var(--sys-energy-text-primary), var(--sys-energy-surface-secondary), etc.",
    autofix: "Replace with the closest sys.energy.* token.",
  },

  // ── Rule 2: No hardcoded spacing ──
  {
    id: "flow/no-hardcoded-spacing",
    name: "No Hardcoded Spacing",
    severity: "error",
    description:
      "Detects raw pixel values for margin, padding, gap that don't match the ref.frame.space scale.",
    pattern: /(?:margin|padding|gap)\s*:\s*["']?\d+(?:px)?(?!\s*var)/g,
    message:
      "Hardcoded spacing detected. Use a Flow space token: var(--ref-frame-space-*) or a .flow-mb-* / .flow-gap-* utility class.",
  },

  // ── Rule 3: No hardcoded font properties ──
  {
    id: "flow/no-hardcoded-typography",
    name: "No Hardcoded Typography",
    severity: "error",
    description: "Detects raw font-size, font-weight, font-family declarations.",
    pattern: /(?:fontSize|fontWeight|fontFamily)\s*:\s*(?:\d|["'][^v])/g,
    message:
      "Hardcoded typography detected. Use Voice tokens: var(--ref-voice-size-*), var(--ref-voice-weight-*).",
  },

  // ── Rule 4: No hardcoded shadows ──
  {
    id: "flow/no-hardcoded-shadow",
    name: "No Hardcoded Shadows",
    severity: "error",
    description: "Detects raw box-shadow values. All shadows must use Depth tokens.",
    pattern: /boxShadow\s*:\s*["'](?!var\(--sys-depth|none)/g,
    message:
      "Hardcoded shadow detected. Use: var(--sys-depth-elevation-0) through var(--sys-depth-elevation-4).",
  },

  // ── Rule 5: No hardcoded transitions ──
  {
    id: "flow/no-hardcoded-motion",
    name: "No Hardcoded Motion",
    severity: "error",
    description: "Detects raw transition durations or easing curves.",
    pattern:
      /transition\s*:\s*["'][^v]*(?:\d+ms|\d+s|ease(?:-in|-out|-in-out)?|linear|cubic-bezier)/g,
    message: "Hardcoded motion detected. Use: var(--sys-momentum-transition-fast/default/slow).",
  },

  // ── Rule 6: No hardcoded border-radius ──
  {
    id: "flow/no-hardcoded-radius",
    name: "No Hardcoded Border Radius",
    severity: "error",
    description: "Detects raw border-radius values.",
    pattern: /borderRadius\s*:\s*(?:\d+(?:px)?(?!\s*,))/g,
    message: "Hardcoded radius detected. Use: var(--ref-frame-radius-*).",
  },

  // ── Rule 7: No deprecated --flow-* aliases ──
  {
    id: "flow/no-deprecated-alias",
    name: "No Deprecated Aliases",
    severity: "error",
    description:
      "Detects usage of deprecated --flow-* CSS variable aliases. Use canonical --sys-* or --ref-* tokens.",
    pattern: /var\(--flow-/g,
    message:
      "Deprecated --flow-* alias detected. Migrate to canonical --sys-* or --ref-* token. See DEPRECATION notice in flow.css.",
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXECUTABLE LINT ENGINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Allowlist patterns that are false positives (e.g., token definitions themselves). */
const ALLOWLIST_PATTERNS = [
  /--ref-energy-/, // Token definitions in flow.css
  /--ref-frame-/, // Token definitions
  /--ref-voice-/, // Token definitions
  /--ref-depth-/, // Token definitions
  /--ref-momentum-/, // Token definitions
  /--ref-state-/, // Token definitions
  /--sys-/, // System token definitions
  /--comp-/, // Component token definitions
  /\.hex\b/, // Token documentation data (hex values in token page data)
  /tokens\.ts/, // The canonical token source itself
  /flow\.css/, // The CSS token output itself
  /flutter-impl\.dart/, // Dart code strings
  /icons\.ts/, // SVG path data
];

/**
 * Run Flow lint rules against source code.
 * Returns an array of violations. Empty array = clean.
 *
 * Usage in CI:
 *   import { runFlowLint, flowLintRules } from './lint-rules';
 *   const source = fs.readFileSync(filePath, 'utf8');
 *   const violations = runFlowLint(source, filePath, flowLintRules);
 *   if (violations.some(v => v.severity === 'error')) process.exit(1);
 */
export function runFlowLint(
  source: string,
  filePath: string,
  rules: LintRule[] = flowLintRules,
): LintViolation[] {
  // Skip allowlisted files
  if (ALLOWLIST_PATTERNS.some((p) => p.test(filePath))) {
    return [];
  }

  const violations: LintViolation[] = [];
  const lines = source.split("\n");

  for (const rule of rules) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Reset regex state for global patterns
      rule.pattern.lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = rule.pattern.exec(line)) !== null) {
        // Skip if line contains an allowlist pattern (token definition context)
        const isAllowlisted = ALLOWLIST_PATTERNS.some((p) => p.test(line));
        if (isAllowlisted) continue;

        violations.push({
          ruleId: rule.id,
          severity: rule.severity,
          message: rule.message,
          line: i + 1,
          column: match.index + 1,
          source: line.trim(),
        });
      }
    }
  }

  return violations;
}

/**
 * Format violations as a human-readable report.
 */
export function formatLintReport(filePath: string, violations: LintViolation[]): string {
  if (violations.length === 0) return `  ${filePath}: PASS`;

  const errors = violations.filter((v) => v.severity === "error").length;
  const warnings = violations.filter((v) => v.severity === "warning").length;

  let report = `  ${filePath}: ${errors} errors, ${warnings} warnings\n`;
  for (const v of violations) {
    const icon = v.severity === "error" ? "E" : "W";
    report += `    [${icon}] L${v.line}:${v.column} ${v.ruleId} — ${v.message}\n`;
    report += `        ${v.source}\n`;
  }
  return report;
}

/**
 * Token Drift Detector configuration.
 * In CI: a build step reads tokens.ts, parses flow.css for var() usage,
 * and reports any tokens referenced in code but missing from the canonical source.
 */
export const tokenDriftConfig = {
  canonicalSource: "/src/app/tokens.ts",
  cssOutput: "/src/styles/flow.css",
  allowedPrefixes: ["--ref-", "--sys-", "--comp-"],
  forbiddenPrefixes: ["--flow-"],
  reportFormat: "json" as const,
};

/** Extracts all CSS custom property references from source text. */
export function extractVarReferences(source: string): string[] {
  const regex = /var\((--[a-z][a-z0-9-]*)\)/g;
  const refs = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = regex.exec(source)) !== null) {
    refs.add(match[1]);
  }
  return Array.from(refs);
}

/** Extracts all CSS custom property definitions from CSS source. */
export function extractVarDefinitions(cssSource: string): string[] {
  const regex = /^\s*(--[a-z][a-z0-9-]*):/gm;
  const defs = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = regex.exec(cssSource)) !== null) {
    defs.add(match[1]);
  }
  return Array.from(defs);
}

export interface TokenDriftResult {
  /** Tokens referenced in code but not defined in CSS */
  undefinedRefs: string[];
  /** Tokens defined in CSS but never referenced in code */
  unusedDefs: string[];
  /** Tokens using forbidden prefixes (e.g. --flow-*) */
  forbiddenUsages: string[];
  /** Whether the check passed (no undefinedRefs, no forbiddenUsages) */
  passed: boolean;
}

/**
 * Run Token Drift detection.
 * Compares var() references in component source against CSS definitions.
 *
 * Usage in CI:
 *   import { runTokenDrift, tokenDriftConfig } from './lint-rules';
 *   const cssSource = fs.readFileSync(tokenDriftConfig.cssOutput, 'utf8');
 *   const componentSources = glob.sync('src/app/**\/*.{tsx,ts}').map(f => fs.readFileSync(f, 'utf8')).join('\n');
 *   const result = runTokenDrift(componentSources, cssSource);
 *   if (!result.passed) process.exit(1);
 */
export function runTokenDrift(
  componentSource: string,
  cssSource: string,
  config: typeof tokenDriftConfig = tokenDriftConfig,
): TokenDriftResult {
  const refs = extractVarReferences(componentSource);
  const defs = new Set(extractVarDefinitions(cssSource));

  // Filter refs to only those with allowed prefixes (ignore third-party vars)
  const flowRefs = refs.filter(
    (r) =>
      config.allowedPrefixes.some((p) => r.startsWith(p)) ||
      config.forbiddenPrefixes.some((p) => r.startsWith(p)),
  );

  const undefinedRefs = flowRefs.filter((r) => !defs.has(r));

  const refsSet = new Set(refs);
  const allDefs = extractVarDefinitions(cssSource);
  const unusedDefs = allDefs.filter(
    (d) => config.allowedPrefixes.some((p) => d.startsWith(p)) && !refsSet.has(d),
  );

  const forbiddenUsages = flowRefs.filter((r) =>
    config.forbiddenPrefixes.some((p) => r.startsWith(p)),
  );

  return {
    undefinedRefs,
    unusedDefs,
    forbiddenUsages,
    passed: undefinedRefs.length === 0 && forbiddenUsages.length === 0,
  };
}

/**
 * Format token drift result as human-readable report.
 */
export function formatDriftReport(result: TokenDriftResult): string {
  if (result.passed && result.unusedDefs.length === 0) {
    return "  Token Drift: PASS (all references resolve, no forbidden usage)\n";
  }

  let report = `  Token Drift: ${result.passed ? "PASS" : "FAIL"}\n`;

  if (result.undefinedRefs.length > 0) {
    report += `    Undefined references (${result.undefinedRefs.length}):\n`;
    for (const r of result.undefinedRefs) {
      report += `      [E] ${r} — referenced but not defined in CSS\n`;
    }
  }

  if (result.forbiddenUsages.length > 0) {
    report += `    Forbidden prefixes (${result.forbiddenUsages.length}):\n`;
    for (const r of result.forbiddenUsages) {
      report += `      [E] ${r} — uses deprecated --flow-* prefix\n`;
    }
  }

  if (result.unusedDefs.length > 0) {
    report += `    Unused definitions (${result.unusedDefs.length}):\n`;
    for (const d of result.unusedDefs) {
      report += `      [W] ${d} — defined but never referenced\n`;
    }
  }

  return report;
}

/**
 * Component Coverage Tracker configuration.
 */
export const coverageConfig = {
  targetCoverage: 0.9,
  trackElements: ["button", "input", "select", "textarea", "dialog"],
  expectedReplacements: {
    button: ["FlowButton", "ActionSurface"],
    input: ["FlowTextInput"],
    select: ["FlowSelect"],
    textarea: ["FlowTextArea"],
    dialog: ["FlowDialog"],
  },
  excludePaths: ["/src/app/components/ui/"],
};

/**
 * Run Component Coverage analysis.
 * Scans source files for raw HTML elements that should be replaced by Flow components.
 *
 * Usage in CI:
 *   import { runCoverageCheck, coverageConfig } from './lint-rules';
 *   const sources = glob.sync('src/app/**\/*.tsx').filter(f => !coverageConfig.excludePaths.some(p => f.includes(p)));
 *   const result = runCoverageCheck(sources.map(f => ({ path: f, content: fs.readFileSync(f, 'utf8') })));
 *   if (result.coverage < coverageConfig.targetCoverage) process.exit(1);
 */
export interface CoverageResult {
  /** Total raw HTML element usages found */
  totalRawUsages: number;
  /** Total Flow component usages found */
  totalFlowUsages: number;
  /** Coverage ratio (0-1) */
  coverage: number;
  /** Whether coverage meets target */
  passed: boolean;
  /** Per-element breakdown */
  breakdown: Record<string, { raw: number; flow: number }>;
}

export function runCoverageCheck(
  files: { path: string; content: string }[],
  config: typeof coverageConfig = coverageConfig,
): CoverageResult {
  const breakdown: Record<string, { raw: number; flow: number }> = {};

  for (const element of config.trackElements) {
    breakdown[element] = { raw: 0, flow: 0 };
  }

  for (const file of files) {
    // Skip excluded paths
    if (config.excludePaths.some((p) => file.path.includes(p))) continue;

    for (const element of config.trackElements) {
      const replacements =
        config.expectedReplacements[element as keyof typeof config.expectedReplacements] || [];

      // Count raw HTML usages: <button, <input, etc. (in JSX context)
      const rawPattern = new RegExp(`<${element}[\\s/>]`, "gi");
      const rawMatches = file.content.match(rawPattern);
      if (rawMatches) {
        breakdown[element].raw += rawMatches.length;
      }

      // Count Flow component usages
      for (const replacement of replacements) {
        const flowPattern = new RegExp(`<${replacement}[\\s/>]`, "g");
        const flowMatches = file.content.match(flowPattern);
        if (flowMatches) {
          breakdown[element].flow += flowMatches.length;
        }
      }
    }
  }

  const totalRawUsages = Object.values(breakdown).reduce((sum, b) => sum + b.raw, 0);
  const totalFlowUsages = Object.values(breakdown).reduce((sum, b) => sum + b.flow, 0);
  const total = totalRawUsages + totalFlowUsages;
  const coverage = total > 0 ? totalFlowUsages / total : 1;

  return {
    totalRawUsages,
    totalFlowUsages,
    coverage,
    passed: coverage >= config.targetCoverage,
    breakdown,
  };
}

/**
 * Format coverage result as human-readable report.
 */
export function formatCoverageReport(result: CoverageResult): string {
  const pct = (result.coverage * 100).toFixed(1);
  let report = `  Component Coverage: ${pct}% (${result.passed ? "PASS" : "FAIL"})\n`;
  report += `    Flow components: ${result.totalFlowUsages} | Raw HTML: ${result.totalRawUsages}\n`;

  for (const [element, counts] of Object.entries(result.breakdown)) {
    if (counts.raw > 0 || counts.flow > 0) {
      report += `    ${element}: ${counts.flow} Flow / ${counts.raw} raw\n`;
    }
  }

  return report;
}

/**
 * Platform limitations (Figma Make scaffolding):
 * - shadcn/ui files and theme.css have been removed from the project.
 *   All styling now flows exclusively through FLOW's ref→sys→comp token architecture.
 */
export const platformLimitations = {
  impact: "zero — all legacy shadcn dependencies removed",
} as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMP DRIFT CHECKER — verifies CSS + Flutter
// derive from canonical compLight/compDark
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Converts a camelCase comp token key to a CSS variable name.
 * e.g., ("button", "bgPrimary") → "--comp-button-bg-primary"
 */
function compKeyToCssVar(component: string, key: string): string {
  // Convert camelCase to kebab-case
  const kebab = key.replace(/([A-Z])/g, "-$1").toLowerCase();
  return `--comp-${component}-${kebab}`;
}

/**
 * Converts a camelCase comp token key to a Flutter field name.
 * e.g., ("button", "bgPrimary") → "buttonBgPrimary"
 */
function compKeyToFlutterField(component: string, key: string): string {
  return `${component}${key.charAt(0).toUpperCase()}${key.slice(1)}`;
}

export interface CompDriftResult {
  /** CSS variable names expected from compLight but missing in CSS */
  cssMissing: string[];
  /** CSS variable names found in CSS but not in canonical compLight */
  cssExtra: string[];
  /** Flutter field names expected from compLight but missing in Dart */
  flutterMissing: string[];
  /** Flutter field names found in Dart but not in canonical compLight */
  flutterExtra: string[];
  /** Light↔Dark structural mismatches (keys in one but not the other) */
  lightDarkMismatch: string[];
  /** Whether all checks pass */
  passed: boolean;
}

/**
 * Run Comp Token Drift check.
 *
 * Verifies that:
 *   1. Every key in compLight has a matching --comp-* CSS variable defined
 *   2. Every key in compLight has a matching field in Flutter FlowCompTokens
 *   3. compLight and compDark have identical key structures
 *
 * Usage in CI:
 *   import { runCompDrift } from './lint-rules';
 *   import { compLight, compDark } from './tokens';
 *   const cssSource = fs.readFileSync('src/styles/flow.css', 'utf8');
 *   const dartSource = fs.readFileSync('src/app/flutter-impl.dart', 'utf8');
 *   const result = runCompDrift(compLight, compDark, cssSource, dartSource);
 *   if (!result.passed) process.exit(1);
 */
export function runCompDrift(
  compLightObj: Record<string, Record<string, string>>,
  compDarkObj: Record<string, Record<string, string>>,
  cssSource: string,
  dartSource: string,
): CompDriftResult {
  // ── 1. Build expected sets ──
  const expectedCssVars: string[] = [];
  const expectedFlutterFields: string[] = [];
  const lightKeys: string[] = [];
  const darkKeys: string[] = [];

  for (const [comp, tokens] of Object.entries(compLightObj)) {
    for (const key of Object.keys(tokens)) {
      const cssVar = compKeyToCssVar(comp, key);
      const flutterField = compKeyToFlutterField(comp, key);
      expectedCssVars.push(cssVar);
      expectedFlutterFields.push(flutterField);
      lightKeys.push(`${comp}.${key}`);
    }
  }

  for (const [comp, tokens] of Object.entries(compDarkObj)) {
    for (const key of Object.keys(tokens)) {
      darkKeys.push(`${comp}.${key}`);
    }
  }

  // ── 2. Extract actual CSS --comp-* definitions ──
  const cssCompDefs = extractVarDefinitions(cssSource).filter((d) => d.startsWith("--comp-"));
  const cssDefsSet = new Set(cssCompDefs);

  // ── 3. Extract Flutter comp field names ──
  // Look for field patterns like: final Color buttonBgPrimary;
  // or constructor params like: required this.buttonBgPrimary,
  const flutterFieldRegex = /(?:required\s+this\.|final\s+\w+\s+)([a-z][a-zA-Z]+)/g;
  const flutterFields = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = flutterFieldRegex.exec(dartSource)) !== null) {
    flutterFields.add(match[1]);
  }

  // ── 4. Compare ──
  const cssMissing = expectedCssVars.filter((v) => !cssDefsSet.has(v));
  const expectedCssSet = new Set(expectedCssVars);
  const cssExtra = cssCompDefs.filter((d) => !expectedCssSet.has(d));

  const flutterMissing = expectedFlutterFields.filter((f) => !flutterFields.has(f));
  const expectedFlutterSet = new Set(expectedFlutterFields);
  const flutterExtra = Array.from(flutterFields).filter(
    (f) =>
      expectedFlutterSet.has(f) === false &&
      // Only flag fields that look like comp token fields
      /^(button|textField|card|chip|dialog|panel|sidebar|tag)/.test(f),
  );

  // ── 5. Light↔Dark structural parity ──
  const lightSet = new Set(lightKeys);
  const darkSet = new Set(darkKeys);
  const lightDarkMismatch = [
    ...lightKeys.filter((k) => !darkSet.has(k)).map((k) => `light-only: ${k}`),
    ...darkKeys.filter((k) => !lightSet.has(k)).map((k) => `dark-only: ${k}`),
  ];

  const passed =
    cssMissing.length === 0 && flutterMissing.length === 0 && lightDarkMismatch.length === 0;

  return {
    cssMissing,
    cssExtra,
    flutterMissing,
    flutterExtra,
    lightDarkMismatch,
    passed,
  };
}

/**
 * Format comp drift result as human-readable report.
 */
export function formatCompDriftReport(result: CompDriftResult): string {
  if (result.passed && result.cssExtra.length === 0 && result.flutterExtra.length === 0) {
    return "  Comp Drift: PASS — CSS and Flutter fully derived from tokens.ts compLight/compDark\n";
  }

  let report = `  Comp Drift: ${result.passed ? "PASS" : "FAIL"}\n`;

  if (result.cssMissing.length > 0) {
    report += `    CSS missing (${result.cssMissing.length}):\n`;
    for (const v of result.cssMissing) {
      report += `      [E] ${v} — in compLight but not defined in flow.css\n`;
    }
  }

  if (result.cssExtra.length > 0) {
    report += `    CSS extra (${result.cssExtra.length}):\n`;
    for (const v of result.cssExtra) {
      report += `      [W] ${v} — defined in flow.css but not in compLight\n`;
    }
  }

  if (result.flutterMissing.length > 0) {
    report += `    Flutter missing (${result.flutterMissing.length}):\n`;
    for (const f of result.flutterMissing) {
      report += `      [E] ${f} — in compLight but not in FlowCompTokens\n`;
    }
  }

  if (result.flutterExtra.length > 0) {
    report += `    Flutter extra (${result.flutterExtra.length}):\n`;
    for (const f of result.flutterExtra) {
      report += `      [W] ${f} — in FlowCompTokens but not in compLight\n`;
    }
  }

  if (result.lightDarkMismatch.length > 0) {
    report += `    Light↔Dark mismatch (${result.lightDarkMismatch.length}):\n`;
    for (const m of result.lightDarkMismatch) {
      report += `      [E] ${m}\n`;
    }
  }

  return report;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CI PIPELINE RUNNER — connects all governance
// tools into a single executable pipeline
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface CIPipelineResult {
  /** Overall pass/fail */
  passed: boolean;
  /** Individual check results */
  checks: {
    lint: { passed: boolean; errorCount: number; warningCount: number };
    tokenDrift: { passed: boolean; undefinedCount: number; forbiddenCount: number };
    compDrift: {
      passed: boolean;
      cssMissing: number;
      flutterMissing: number;
      lightDarkMismatch: number;
    };
    coverage: { passed: boolean; percentage: number };
  };
  /** Full formatted report */
  report: string;
  /** Timestamp */
  timestamp: string;
}

/**
 * Run the complete CI governance pipeline.
 * Orchestrates all four governance engines in sequence and produces
 * a unified report with pass/fail exit status.
 *
 * Usage in CI (Node.js script):
 * ```ts
 * import { runCIPipeline } from './lint-rules';
 * import * as fs from 'fs';
 * import * as glob from 'glob';
 *
 * const cssSource = fs.readFileSync('src/styles/flow.css', 'utf8');
 * const dartSource = fs.readFileSync('src/app/flutter-impl.dart', 'utf8');
 * const sourceFiles = glob.sync('src/app/**\/*.{tsx,ts}')
 *   .filter(f => !f.includes('/components/ui/'))
 *   .map(f => ({ path: f, content: fs.readFileSync(f, 'utf8') }));
 *
 * import { compLight, compDark } from './tokens';
 * const result = runCIPipeline(sourceFiles, cssSource, dartSource, compLight, compDark);
 * console.log(result.report);
 * process.exit(result.passed ? 0 : 1);
 * ```
 */
export function runCIPipeline(
  sourceFiles: { path: string; content: string }[],
  cssSource: string,
  dartSource: string,
  compLightObj: Record<string, Record<string, string>>,
  compDarkObj: Record<string, Record<string, string>>,
): CIPipelineResult {
  const timestamp = new Date().toISOString();
  let report = `\n${"═".repeat(60)}\n  FLOW Design System — CI Governance Report\n  ${timestamp}\n${"═".repeat(60)}\n\n`;

  // ── 1. Lint Check ──
  let totalErrors = 0;
  let totalWarnings = 0;
  const lintReports: string[] = [];

  for (const file of sourceFiles) {
    const violations = runFlowLint(file.content, file.path);
    if (violations.length > 0) {
      lintReports.push(formatLintReport(file.path, violations));
      totalErrors += violations.filter((v) => v.severity === "error").length;
      totalWarnings += violations.filter((v) => v.severity === "warning").length;
    }
  }

  const lintPassed = totalErrors === 0;
  report += `  ── LINT CHECK ──\n`;
  report += `  Status: ${lintPassed ? "PASS" : "FAIL"} (${totalErrors} errors, ${totalWarnings} warnings)\n`;
  if (lintReports.length > 0) {
    report += lintReports.join("\n") + "\n";
  }
  report += "\n";

  // ── 2. Token Drift Check ──
  const allSource = sourceFiles.map((f) => f.content).join("\n");
  const driftResult = runTokenDrift(allSource, cssSource);
  report += `  ── TOKEN DRIFT CHECK ──\n`;
  report += formatDriftReport(driftResult);
  report += "\n";

  // ── 3. Comp Drift Check ──
  const compDriftResult = runCompDrift(compLightObj, compDarkObj, cssSource, dartSource);
  report += `  ── COMP DRIFT CHECK ──\n`;
  report += formatCompDriftReport(compDriftResult);
  report += "\n";

  // ── 4. Coverage Check ──
  const coverageResult = runCoverageCheck(sourceFiles);
  report += `  ── COMPONENT COVERAGE ──\n`;
  report += formatCoverageReport(coverageResult);
  report += "\n";

  // ── Summary ──
  const allPassed =
    lintPassed && driftResult.passed && compDriftResult.passed && coverageResult.passed;
  report += `${"─".repeat(60)}\n`;
  report += `  OVERALL: ${allPassed ? "PASS ✓" : "FAIL ✗"}\n`;
  report += `${"═".repeat(60)}\n`;

  return {
    passed: allPassed,
    checks: {
      lint: { passed: lintPassed, errorCount: totalErrors, warningCount: totalWarnings },
      tokenDrift: {
        passed: driftResult.passed,
        undefinedCount: driftResult.undefinedRefs.length,
        forbiddenCount: driftResult.forbiddenUsages.length,
      },
      compDrift: {
        passed: compDriftResult.passed,
        cssMissing: compDriftResult.cssMissing.length,
        flutterMissing: compDriftResult.flutterMissing.length,
        lightDarkMismatch: compDriftResult.lightDarkMismatch.length,
      },
      coverage: {
        passed: coverageResult.passed,
        percentage: Math.round(coverageResult.coverage * 100),
      },
    },
    report,
    timestamp,
  };
}
