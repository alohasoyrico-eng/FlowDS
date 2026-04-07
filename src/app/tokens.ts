/**
 * FLOW Design System — Canonical Token Source
 * ─────────────────────────────────────────────
 * This file is the SINGLE SOURCE OF TRUTH for all Flow tokens.
 * CSS variables, TypeScript constants, and Dart ThemeExtensions
 * are derived from these definitions.
 *
 * Architecture: ref → sys → comp
 *   ref  = Raw, unaliased values. Only place absolute values exist.
 *   sys  = Semantic aliases. Themes remap sys tokens to different ref tokens.
 *   comp = Component-scoped bindings aliasing sys tokens.
 *
 * RULES:
 *   - Raw values (hex, px, ms) exist ONLY in ref.
 *   - sys tokens reference ref tokens only.
 *   - comp tokens reference sys tokens only.
 *   - No rgba() outside ref. sys borders/overlays use ref.state.opacity.
 *
 * MIGRATION LOG:
 *   2026-02-28  Phase 3 — Button/Chip/TextInput single-value tokens
 *     • Added comp.button.{height,font} and comp.chip.{height,font} as CSS-var
 *       references (resolved per [data-size] in flow.css centralized blocks).
 *     • Migrated Tooltip, Snackbar, EmptyState, ProgressBar, Skeleton, Switch
 *       CSS base classes to consume var(--comp-*) instead of direct ref overrides.
 *     • Removed all per-component [data-size] blocks from flow.css (now O(S)).
 *     • Removed inline JS maps (btnHeightMap, btnFontMap, chipHeightMap,
 *       chipFontMap, inputHeightMap) from React components.
 *     • Button, Chip, TextInput now emit data-size; CSS cascade resolves.
 *   2026-02-28  Phase 3b — Chip CSS-class migration
 *     • Created .flow-chip CSS class with structural + variant rules
 *       (.flow-chip[data-variant="*"]) eliminating all inline styles.
 *     • Created .flow-chip-remove CSS class for remove button.
 *     • Removed chipVarStyles JS map from React component.
 *     • Chip now uses className="flow-chip" + data-variant + data-size + data-selected.
 *   2026-03-01  Consistency audit — 8 fixes
 *     • Fix 1: Unified radius — sys-frame-radius-control bumped 8→12px, TextInput
 *       routed through sys (was bypassing to ref-frame-radius-3 directly).
 *     • Fix 2: Per-size radius scaling in [data-size] blocks — sm=8, md=12, lg=12, xl=16.
 *     • Fix 3: Density ×1.2 ratio corrected — comfortable heights
 *       (sm 56→58, md 70→72, lg 84→86, xl 100→106); compact xl 72→74.
 *     • Fix 4: Button padding-x scales per size (sm=8, md=12, lg=16, xl=20).
 *     • Fix 5: Density blocks override --sys-size-label-font and table fonts.
 *     • Fix 7: Demo — added FlowSelect/FlowButton XL variants.
 *     • Fix 8: Stale "TextField" comment updated to "TextInput".
 *   2026-03-01  Post-audit refinements — 3 enhancements
 *     • Fix 9: Comfortable xl geometry tuning — label-offset-y-lg 9→11px,
 *       input-bottom-lg 11→12px, input-bottom-xl 17→15px. Progression now
 *       smooth: offset-y (9,10,11,13), bottom (7,9,12,15 Δ+2,+3,+3).
 *     • Fix 10: Compound selectors [data-density][data-size] — 8 blocks
 *       (2 densities × 4 sizes) at specificity 0,2,0 resolve cascade conflict
 *       where [data-size] was silently overriding density typography shifts.
 *       Covers --sys-size-label-font, --sys-size-table-font,
 *       --sys-size-table-header-font with correct ±1 step per density tier.
 *     • Fix 11: FlowChip padding-x now scales per size (sm=8, md=12, lg=16,
 *       xl=20), matching Button's per-size pattern. Density overrides still
 *       apply at the [data-density] level.
 *   2026-03-06  sys.frame.radius.surface — viewport-responsive surface radius
 *     • Added sys.frame.radius.surface — 16px (radius-4) default, one step above
 *       container (12px). Density: compact 12px (r3), comfortable 20px (r5).
 *       ×1.2 ratio maintained, snapped to ref.frame.radius scale.
 *     • Viewport-responsive: phone (<576px) steps UP +1 for container & surface
 *       to compensate full-width layout. Phone: container 16px (r4←r3),
 *       surface 20px (r5←r4). Cross-products: phone+compact 12/16px,
 *       phone+comfortable 20/24px.
 *     • Added "surface" to SemanticRadius type and semanticRadiusMap in
 *       primitives.tsx → var(--sys-frame-radius-surface).
 *     • Migrated DemoSection (demo-helpers.tsx, demos.tsx) from radius="xl"
 *       (ref bypass) to radius="surface" (sys semantic, viewport-responsive).
 *     • Migrated page-level Surface (component-detail, philosophy, tokens,
 *       foundation-detail) from default radius="container" to radius="surface".
 *     • Phone viewport now also steps UP --sys-frame-radius-control (+1).
 *     • Added phone×size compound selectors in flow.css — [data-size] on
 *       buttons/controls overrides inherited :root phone value (direct decl
 *       beats inheritance). Compounds restore +1 viewport step for all four
 *       sizes (sm/md/lg/xl) on both control and container radius.
 *   2026-03-01  Sys-layer gap & radius extensions
 *     • Added sys.frame.gap.componentLg — 28px (space-7) default, sits between
 *       component (20px) and subsection (36px). Density: compact 24px (space-6),
 *       comfortable 32px (space-8). ×1.2 ratio maintained.
 *     • Added sys.frame.radius — { control, container } sub-object as canonical
 *       source for density-responsive radius. Default both 12px (radius-3).
 *     • Added sys.frame.density.{compact,comfortable}.radius — compact 8px (r2),
 *       comfortable 16px (r4). ×1.2 ratio, snapped to ref.frame.radius scale.
 *     • Added compound density×size selectors in flow.css for radius-control and
 *       radius-container, resolving cascade conflict where [data-size] was
 *       silently overriding density radius shifts.
 *   2026-03-01  L3 comp→sys migration — second bypass fix
 *     • Created sys.frame.border (thin/control/medium/indicator) — structural
 *       border widths consumed by Button, IconButton, TextInput, Radio, Checkbox.
 *     • Created sys.frame.radius.sm (4px) and sys.frame.radius.full (9999px) —
 *       checkbox corners and pill shapes (Chip, Tag, Switch).
 *     • Created sys.frame.content.dialog, sys.frame.sidebar.expanded/collapsed,
 *       sys.frame.space.micro, sys.icon.size.{sm,md,lg,xl} — structural tokens
 *       consumed by Dialog, Sidebar, TextInput, IconButton respectively.
 *     • Created sys.energy.control.{borderInactive, borderInactivePressed,
 *       borderDisabled, fillPressed, fillDisabled, dot, stateLayerInactive} —
 *       shared indicator state colors for Radio, Checkbox, Switch. Dark-remapped.
 *     • Created sys.energy.switch.{trackOff, trackOffHover, trackDisabled,
 *       thumbOff, thumbOn, thumbDisabled, thumbIconDisabled} — switch-specific
 *       state colors. Dark-remapped.
 *     • Migrated ALL comp tokens (compLight + compDark) to reference sys instead
 *       of ref for: radius, border-width, height, icon-size, content-width,
 *       sidebar-width, micro-spacing, control colors, switch colors, elevation.
 *     • Registered "component-lg" in SemanticGap type and semanticGapMap in
 *       primitives.tsx (28px default, density-responsive via flow.css).
 *     • Added missing compound selectors: comfortable×lg and comfortable×xl
 *       for radius-control and radius-container in flow.css.
 *     • Remaining ref references in comp: per-size font curves (button/chip/tag
 *       font-sm..xl, textInput label/value/hint/float sizes) and per-size
 *       padding curves — managed by [data-density] and [data-size] CSS blocks.
 *       These are per-step values without meaningful semantic sys intermediary;
 *       density blocks override them with the correct ±1 step shifts
 *       (changed from ±2 after geometric voice migration).
 *   2026-03-02  Geometric voice scale — H:F ratio fix
 *     • Root cause: voice (body/label/caption) grew arithmetically (+1-2px/tier)
 *       while every other family (height, icon, indicator) grew geometrically (~×1.2).
 *       This caused H:F ratio to diverge 32% from sm(3.69) to xl(4.89), and
 *       Icon:Font/Indicator:Font to diverge 45-50%.
 *     • Fix: Re-mapped sys.size.voice body/label/caption to geometric ~×1.2 per tier.
 *       sm(anchor): body=13,label=12,caption=10 — unchanged.
 *       md: body 14→16, label 13→14, caption 11→12.
 *       lg: body 16→20, label 14→18, caption 12→14.
 *       xl: body 18→24, label 16→20, caption 13→18.
 *       Headline unchanged (not H:F-constrained).
 *     • H:F ratio now stable: 3.69/3.75/3.60/3.67 (±4%, was ±32%).
 *       Icon:Font body: 1.23/1.25/1.20/1.33 (±11%, was ±45%).
 *     • Cascading changes:
 *       — flow.css: :root, [data-size], [data-density], compound [density×size]
 *         voice tokens all updated. ±1 step density shift preserved.
 *       — Button/Chip density fonts: changed from ±2 to ±1 step (geometric scale
 *         makes ±2 too aggressive at upper tiers).
 *       — TextInput geometry: label-scale and label-offset-y recalculated for all
 *         3 densities × 4 sizes (24 values). input-bottom unchanged (visual tuning).
 *       — Composite typography (sys-voice-paragraph-*, sys-voice-label-*) NOT changed
 *         — these are content styles, not control-sizing tokens.
 *   2026-03-02  V4 RESOLUTION — Dual typographic scale unified
 *     • Problem: sys.voice.{paragraph|label|caption} (composite styles) vs
 *       sys.frame.size.voice.{body|label|caption} (control sizing) were independent.
 *       Risk: divergent text sizing in content vs controls as system scales.
 *     • Solution: DEPRECATED sys.voice.{paragraph|label|caption} in favor of
 *       sys.frame.size.voice.{body|label|caption} as canonical typographic scale.
 *     • Rationale:
 *       — sys.frame.size.voice.* is density-responsive (compact/comfortable modes).
 *       — Integrates with [data-size] tier system (sm/md/lg/xl).
 *       — Guarantees hierarchy: headline > body > label > caption at every tier.
 *       — Grows geometrically (~×1.2/tier) matching height/icon/indicator.
 *     • Migration:
 *       — Replace sys.voice.paragraph.* → sys.frame.size.voice.body
 *       — Replace sys.voice.label.* → sys.frame.size.voice.label
 *       — Replace sys.voice.caption → sys.frame.size.voice.caption
 *     • sys.voice.{display|heading|overline} remain valid:
 *       — display/heading: density-INVARIANT for hero/section headers.
 *       — overline: ALL-CAPS utility role for eyebrows/metadata labels.
 *     • Result: Single typographic scale. No divergence risk. V4 RESOLVED.
 *   2026-03-02  Phase 6 — PullToRefresh, SwipeActions, Sidebar, Topbar, Autocomplete
 *     • Added comp tokens (light + dark) for 5 new components:
 *       PullToRefresh (mobile gesture), SwipeActions (mobile swipe-to-reveal),
 *       Sidebar (desktop collapsible nav), Topbar (desktop top bar),
 *       Autocomplete (core search-with-suggestions).
 *     • All comp tokens reference sys tokens exclusively. Dark variants remap
 *       via sysDark. Structural tokens reference sys.frame.height, sys.frame.radius,
 *       sys.icon.size.
 *     • CSS custom properties emitted in flow.css :root block. CSS component
 *       classes added for all 5 components with structural + variant + state rules.
 *     • React components in flow-components-p6.tsx. WAI-ARIA compliant.
 *     • Inventory updated to ~47 implemented (1 complete, ~46 partial) of ~67.
 *     • SwipeActions added to inventory (new component, not previously listed).
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PRE-DEFINED SCALES — Extracted for cross-referencing within ref
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Spacing scale — extracted so ref.frame.grid can trace back to space steps */
const _space = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  9: "36px",
  10: "40px",
  11: "44px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
  32: "128px",
  40: "160px",
  /** Sub-grid micro step — 2px. Used for tight structural gaps (label↔value in
   *  compact inputs) where 4px (step 1) is too large. Not a scale break —
   *  the 4px base grid remains canonical. Named to avoid fractional keys. */
  micro: "2px",
} as const;

/** Content max width — extracted for grid maxWidth traceability */
const _contentMax = "1440px";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// REF TOKENS — Raw scales
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ref = {
  energy: {
    neutral: {
      0: "#FFFFFF",
      coldWhite: "#F1F7FF", // Figma Edenred "Cold white" background
      50: "#F8FAFC", // Slate-50
      100: "#F1F5F9", // Slate-100
      150: "#E9EEF5", // Interpolated (Slate-100↔200) for sunken surface
      200: "#E2E8F0", // Slate-200
      300: "#CBD5E1", // Slate-300
      400: "#94A3B8", // Slate-400
      500: "#64748B", // Slate-500
      600: "#475569", // Slate-600
      700: "#334155", // Slate-700
      800: "#1E293B", // Slate-800
      900: "#0F172A", // Slate-900
      950: "#080E1B", // Interpolated (Slate-900↔black)
    },
    blue: {
      50: "#E0EEFF",
      100: "#C7DFFF",
      200: "#8ABCFF",
      300: "#529CFF",
      400: "#1A7CFF",
      500: "#0060DF",
      600: "#004DB3",
      700: "#003985",
      800: "#002557",
      900: "#00142E",
      // RGB decompositions for compositing (e.g. selected-overlay)
      "500-rgb": "0, 96, 223",
      "200-rgb": "138, 188, 255",
    },
    red: {
      50: "#FFE3E0",
      subtleTint: "#FFEEED", // Figma Edenred: danger button default bg (warmer than red.50)
      100: "#FFC6C2",
      200: "#FF8D85",
      300: "#FF5447",
      400: "#FF1B0A",
      500: "#CA0E00",
      600: "#A30B00",
      700: "#7A0800",
      800: "#520600",
      900: "#290300",
    },
    green: {
      50: "#E1F4EB",
      100: "#C3EFDA",
      200: "#79E6B4",
      300: "#2EE590",
      400: "#0DBA69",
      500: "#007840",
      600: "#065B33",
      700: "#084026",
      800: "#072718",
      900: "#05140D",
    },
    orange: {
      50: "#FDEAE3",
      100: "#FBD5C6",
      200: "#F6AB8E",
      300: "#F28155",
      400: "#ED571C",
      500: "#BF410F",
      600: "#97330C",
      700: "#712709",
      800: "#4C1A06",
      900: "#260D03",
    },
    // Extended palette for foundation identity & expanded UI needs
    purple: {
      50: "#F3EEFB",
      100: "#DDD2F3",
      500: "#6B4DC7",
      700: "#503A99",
    },
    teal: {
      50: "#E8F7F7",
      100: "#C0EBEB",
      500: "#0A7A7A",
      700: "#075C5C",
    },
    olive: {
      50: "#F5F3EC",
      100: "#E5DFC0",
      500: "#8A5A2A",
      700: "#68431F",
    },
    // Transparent as a formal ref token (eliminates raw "transparent" in comp layer)
    transparent: "transparent",
  },
  frame: {
    space: _space,
    radius: {
      0: "0px",
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "28px",
      8: "32px",
      9: "36px",
      10: "40px",
      11: "44px",
      12: "48px",
      full: "9999px",
    },
    height: {
      controlSm: "48px",
      controlMd: "60px",
      controlLg: "72px",
      controlXl: "88px", // Figma Edenred: tall form controls (floating-label inputs)
      // Density-variant control heights (compact / comfortable)
      controlSmCompact: "40px",
      controlMdCompact: "50px",
      controlLgCompact: "60px",
      controlXlCompact: "74px", // 88 / 1.2 = 73.33 → 74 (snapped to nearest 2px)
      controlSmComfortable: "58px", // 48 × 1.2 = 57.6 → 58
      controlMdComfortable: "72px", // 60 × 1.2 = 72 (exact)
      controlLgComfortable: "86px", // 72 × 1.2 = 86.4 → 86
      controlXlComfortable: "106px", // 88 × 1.2 = 105.6 → 106
    },
    // Sidebar structural widths
    sidebar: {
      expanded: "280px",
      collapsed: "56px",
    },
    // Content width constraints
    content: {
      prose: "680px",
      narrow: "640px",
      max: _contentMax,
      dialog: "480px",
    },
    // Accent indicator border width
    border: {
      thin: "1px",
      control: "1.5px", // Figma Edenred: interactive control borders (buttons, inputs)
      medium: "2px",
      indicator: "3px",
    },
    // Documentation layout column & demo dimensions
    doc: {
      colNum: "28px",
      colValueSm: "50px",
      colBar: "120px",
      colToken: "200px",
      colTokenLg: "220px",
      colPreview: "240px",
      demoRadius: "56px",
      badgeSm: "36px",
    },
    // Responsive breakpoints (min-width thresholds)
    breakpoint: {
      sm: "576px", // mobile → tablet
      md: "992px", // tablet → desktop
    },
    // Layout grid specification per viewport tier
    // Derived from Edenred design spec: 12-col / 6-col / 1-col responsive grid
    // Gutters/margins traceable to ref.frame.space via _space
    grid: {
      lg: { columns: 12, gutter: _space[6], margin: _space[12], maxWidth: _contentMax },
      md: { columns: 6, gutter: _space[6], margin: _space[6] },
      sm: { columns: 1, gutter: _space[0], margin: _space[4] },
    },
  },
  voice: {
    family: {
      brand: "'Edenred', 'Ubuntu', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      sans: "'Ubuntu', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    // Size scale — 14 steps, all integers, aligned 1:1 with Figma Edenred
    // Steps 1–4: density-compact small text. Steps 5–14: Figma spec values.
    size: {
      1: "10px", // density: compact caption/overline
      2: "11px", // density: compact label
      3: "12px", // density: compact body-sm / mono base
      4: "13px", // density: compact body
      5: "14px", // Figma: Label XS, Paragraph S
      6: "16px", // Figma: Label S, Paragraph M
      7: "18px", // Figma: Label M, Paragraph L
      8: "20px", // Figma: Heading M, Label L
      9: "24px", // Figma: Heading L, Label XL
      10: "32px", // Figma: Display XS
      11: "40px", // Figma: Display S
      12: "48px", // Figma: Display M
      13: "54px", // Figma: Display L
      14: "62px", // Figma: Display XL
    },
    // Letter-spacing scale (em-relative)
    letterSpacing: {
      tighter: "-0.02em",
      tight: "-0.01em",
      snug: "-0.005em",
      normal: "0em",
      wide: "0.02em",
      wider: "0.06em",
      widest: "0.08em",
      caps: "0.12em",
    },
    // Line-height scale — unitless ratios aligned with Figma Edenred computed LH
    lineHeight: {
      none: 1,
      tight: 1.2,
      dense: 1.333, // Figma: Label M 18/24
      snug: 1.35, // Figma: Display S 40/54
      display: 1.484, // Figma: Display XL 62/92, Display L 54/80
      normal: 1.5, // Figma: Display M/XS, Heading L, Label S/XL, Paragraph M
      relaxed: 1.556, // Figma: Paragraph L 18/28, Label XS/Paragraph S 14/22
      loose: 1.6, // Figma: Heading M 20/32, Label L 20/32
      body: 1.7,
    },
  },
  depth: {
    shadow: {
      // Navy blue branded shadow color: #101A77 = rgb(16, 26, 119)
      // Figma Edenred alignment: Light→1, Medium→2, High→3, Critical→4
      // Spread values added at levels 2-4 for depth richness (4-8px)
      colorRgb: "16, 26, 119", // Branded navy base for light-theme compositing
      0: "none",
      1: "0 1px 3px 0 rgba(16,26,119,0.06), 0 1px 2px 0 rgba(16,26,119,0.04)", // Figma: Light
      2: "0 4px 12px 4px rgba(16,26,119,0.08), 0 2px 4px 0 rgba(16,26,119,0.04)", // Figma: Medium
      3: "0 10px 32px 6px rgba(16,26,119,0.12), 0 4px 12px 0 rgba(16,26,119,0.06)", // Figma: High
      4: "0 20px 56px 8px rgba(16,26,119,0.16), 0 8px 20px 2px rgba(16,26,119,0.08)", // FLOW: Critical
      // Dark theme shadow scale — pure black (navy tint invisible on dark surfaces)
      // Spread values mirrored from light scale; opacity boosted for visibility on dark surfaces
      "dark-1": "0 1px 3px 0 rgba(0,0,0,0.35), 0 1px 2px 0 rgba(0,0,0,0.24)",
      "dark-2": "0 4px 12px 4px rgba(0,0,0,0.35), 0 2px 4px 0 rgba(0,0,0,0.24)",
      "dark-3": "0 10px 32px 6px rgba(0,0,0,0.40), 0 4px 12px 0 rgba(0,0,0,0.24)",
      "dark-4": "0 20px 56px 8px rgba(0,0,0,0.48), 0 8px 20px 2px rgba(0,0,0,0.30)",
    },
    overlay: {
      light: "rgba(10, 10, 15, 0.5)",
      dark: "rgba(0, 0, 0, 0.65)",
    },
    blur: {
      sm: "4px",
      md: "8px",
      lg: "16px",
    },
    zIndex: {
      base: 0,
      content: 1,
      dropdown: 100,
      sticky: 200,
      overlay: 1000,
      modal: 1001,
      toast: 1100,
    },
  },
  momentum: {
    duration: {
      instant: "0ms",
      fast: "100ms",
      normal: "200ms",
      slow: "350ms",
      slower: "500ms",
    },
    easing: {
      standard: "cubic-bezier(0.2, 0, 0, 1)",
      enter: "cubic-bezier(0, 0, 0, 1)",
      exit: "cubic-bezier(0.2, 0, 1, 1)",
      linear: "cubic-bezier(0, 0, 1, 1)",
    },
    // Stagger delays for choreographed sequences
    stagger: {
      fast: "30ms",
      normal: "50ms",
      slow: "80ms",
    },
  },
  icon: {
    size: {
      xs: "12px",
      sm: "16px",
      md: "20px",
      lg: "24px",
      xl: "32px",
    },
    // Grid specification — aligned with Figma Edenred icon library
    grid: {
      canvas: "24px", // Base icon container
      liveArea: "20px", // Active drawing area (2px padding each side)
      padding: "2px", // Padding between container and live area
      figmaViewBox: "32px", // Figma source viewBox (virtual canvas)
    },
    // Stroke rules — consistent across all icon variants
    stroke: {
      weight: "1.5px", // Uniform stroke weight for all icons
      linecap: "round", // Round line caps
      linejoin: "round", // Round line joins
      cornerTerminal: "1px", // Corner radius on open terminals
      cornerEnclosed: "2px", // Corner radius on enclosed shapes
    },
    // Icon style variants
    style: {
      outline: "outline", // Default: stroke-based icons
      filled: "filled", // Filled variant: solid fill, no stroke
    },
    // Semantic categories (8 total: 5 generic UI + 3 domain-specific)
    // Each category groups functionally related icons
    category: {
      navigation: "navigation", // arrows, chevrons, menu, home, back
      action: "action", // edit, delete, copy, share, download, upload
      status: "status", // check, warning, error, info, clock
      object: "object", // file, folder, user, settings, search, star
      toggle: "toggle", // visibility, lock, bookmark, heart, bell
      finance: "finance", // wallet, money, receipt, card, transaction, strongbox
      currency: "currency", // dollar, euro, zloty, pound, percent, bitcoin
      chart: "chart", // chart-square, percentage-square, percentage-circle, discount
    },
    // Action modifiers — closed set of composable suffixes for icon families
    // Pattern: {family}-{modifier} (e.g., wallet-add, money-remove)
    modifier: {
      add: "add",
      remove: "remove",
      check: "check",
      tick: "tick",
      search: "search",
      edit: "edit",
      time: "time",
      change: "change",
      forbidden: "forbidden",
      send: "send",
      receive: "receive",
    },
  },
  state: {
    opacity: {
      disabled: 0.42,
      hover: 0.06,
      pressed: 0.12,
      selected: 0.1,
      overlay: 0.5,
      overlayDark: 0.65,
      // Decorative/hierarchy opacity for text within colored surfaces
      subtle: 0.6,
      muted: 0.7,
      soft: 0.85,
    },
    border: {
      lightBase: "10, 10, 15",
      darkBase: "255, 255, 255",
      defaultAlpha: 0.08,
      strongAlpha: 0.15,
    },
    focusRing: {
      width: "2px",
      offset: "2px",
    },
  },
} as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SYS TOKENS — Semantic roles (Light theme)
// All values reference ref tokens. Zero raw values.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const sysLight = {
  energy: {
    surface: {
      primary: ref.energy.neutral[0],
      secondary: ref.energy.neutral[50],
      tertiary: ref.energy.neutral[100],
      sunken: ref.energy.neutral[150],
      inverse: ref.energy.neutral[900],
      // Tinted surfaces — leverage expanded 10-step scales
      coldWhite: ref.energy.neutral.coldWhite,
      accent: ref.energy.blue[50],
      danger: ref.energy.red[50],
      success: ref.energy.green[50],
      warning: ref.energy.orange[50],
    },
    text: {
      primary: ref.energy.neutral[800],
      secondary: ref.energy.neutral[500],
      tertiary: ref.energy.neutral[400],
      inverse: ref.energy.neutral[0],
      onAction: ref.energy.neutral[0], // Text on primary action surfaces
      link: ref.energy.blue[600], // Link text — blue 600 for AA on white (7.2:1)
      accent: ref.energy.blue[500],
      danger: ref.energy.red[500],
      success: ref.energy.green[500],
      warning: ref.energy.orange[600], // orange 600 (#97330C) → 6.5:1 on white (AA safe margin)
    },
    border: {
      // Composed from ref.state.border + ref.state.border.defaultAlpha
      default: `rgba(${ref.state.border.lightBase}, ${ref.state.border.defaultAlpha})`,
      strong: `rgba(${ref.state.border.lightBase}, ${ref.state.border.strongAlpha})`,
      focus: ref.energy.blue[500],
      accent: ref.energy.blue[200], // Accent-tinted border
      danger: ref.energy.red[200], // Error state border
      success: ref.energy.green[200], // Success state border
      warning: ref.energy.orange[200], // Warning state border
      // ── Form-control borders (opaque, Figma Edenred input spec) ──
      control: ref.energy.neutral[600], // Opaque control border (#475569)
      controlError: ref.energy.red[600], // Opaque error border (#A30B00)
      controlDisabled: ref.energy.neutral[300], // Disabled control border (#CBD5E1)
    },
    action: {
      primary: ref.energy.blue[500],
      primaryHover: ref.energy.blue[700],
      primaryActive: ref.energy.blue[600], // Pressed/active state
      secondary: ref.energy.neutral[100], // Secondary button bg
      secondaryHover: ref.energy.neutral[200],
      ghost: ref.energy.transparent, // Ghost button bg
      ghostHover: ref.energy.neutral[100],
      destructive: ref.energy.red[500],
      destructiveHover: ref.energy.red[700],
      // ── Figma Edenred emphasis model (D1-D8 alignment) ──
      high: ref.energy.neutral[900], // HIGH emphasis: dark filled
      highHover: ref.energy.neutral[700],
      highActive: ref.energy.neutral[800],
      mediumBorder: ref.energy.neutral[900], // MEDIUM emphasis: outlined, dark border
      mediumActive: ref.energy.neutral[300], // MEDIUM bg on pressed
      lowActive: ref.energy.blue[600], // LOW emphasis: link pressed text
      destructiveSubtle: ref.energy.red.subtleTint, // DANGER default bg (subtle tint)
      destructiveActive: ref.energy.red[600], // DANGER pressed state
    },
    // ── Explicit disabled state colors (D3: Figma alignment) ──
    // Replaces opacity-based disabled for buttons; ref.state.opacity.disabled
    // remains available for other components (chips, toggles).
    state: {
      disabledBg: ref.energy.neutral[300],
      disabledText: ref.energy.neutral[500],
      disabledBorder: ref.energy.neutral[300],
    },
    status: {
      success: ref.energy.green[500],
      successSubtle: ref.energy.green[50],
      successMuted: ref.energy.green[100], // Mid-tone for borders/icons
      warning: ref.energy.orange[500],
      warningSubtle: ref.energy.orange[50],
      warningMuted: ref.energy.orange[100],
      error: ref.energy.red[500],
      errorSubtle: ref.energy.red[50],
      errorMuted: ref.energy.red[100],
      info: ref.energy.blue[500],
      infoSubtle: ref.energy.blue[50],
      infoMuted: ref.energy.blue[100],
    },
    // sys.energy.icon — semantic icon color roles
    // Formalizes the default #0F172A from Figma var(--stroke-0) into proper tokens
    icon: {
      default: ref.energy.neutral[900], // Primary icon color — Figma stroke-0 default
      secondary: ref.energy.neutral[500], // De-emphasized icons, supporting context
      tertiary: ref.energy.neutral[400], // Subtle/decorative icons
      action: ref.energy.blue[500], // Interactive/actionable icons
      inverse: ref.energy.neutral[50], // Icons on dark/inverse surfaces
      onAction: ref.energy.neutral[0], // Icons on action-colored surfaces (buttons)
      disabled: ref.energy.neutral[300], // Disabled state icons
      success: ref.energy.green[500], // Status: success
      warning: ref.energy.orange[500], // Status: warning
      error: ref.energy.red[500], // Status: error
      info: ref.energy.blue[500], // Status: informational
    },
    // sys.energy.control — shared indicator control state colors (Radio, Checkbox, Switch)
    control: {
      borderInactive: ref.energy.neutral[500], // unselected border
      borderInactivePressed: ref.energy.neutral[600], // pressed unselected border
      borderDisabled: ref.energy.neutral[300], // disabled border
      fillPressed: ref.energy.blue[600], // selected pressed fill
      fillDisabled: ref.energy.neutral[300], // disabled selected fill
      dot: ref.energy.neutral[0], // inner dot/icon on filled control
      stateLayerInactive: ref.energy.neutral[500], // unselected hover ring
    },
    // sys.energy.switch — switch-specific state colors
    switch: {
      trackOff: ref.energy.neutral[300],
      trackOffHover: ref.energy.neutral[400],
      trackDisabled: ref.energy.neutral[200],
      thumbOff: ref.energy.neutral[0],
      thumbOn: ref.energy.neutral[0],
      thumbDisabled: ref.energy.neutral[100],
      thumbIconDisabled: ref.energy.neutral[300],
    },
  },
  depth: {
    overlay: ref.depth.overlay.light,
    // Semantic elevation aliases — map Figma Edenred's 3 named levels to FLOW's 5-step scale
    elevation: {
      light: ref.depth.shadow[1], // Cards, list items, subtle lift
      medium: ref.depth.shadow[2], // Dropdowns, popovers, menus
      high: ref.depth.shadow[3], // Dialogs, bottom sheets, overlays
    },
    layer: {
      content: ref.depth.zIndex.content,
      sticky: ref.depth.zIndex.sticky,
    },
  },
  frame: {
    height: {
      controlSm: ref.frame.height.controlSm,
      controlMd: ref.frame.height.controlMd,
      controlLg: ref.frame.height.controlLg,
      controlXl: ref.frame.height.controlXl,
    },
    // Spacing tokens — density-switchable via CSS custom properties
    // Default density values; compact/comfortable override in flow.css [data-density]
    // All three tiers use ×1.2 ratio (same as control heights), snapped to ref.frame.space scale
    padding: {
      control: ref.frame.space[5], // internal padding of interactive controls (20px)
      container: ref.frame.space[6], // internal padding of containers — cards, dialogs, panels (24px)
      surface: ref.frame.space[12], // internal padding of content surfaces (48px)
    },
    gap: {
      component: ref.frame.space[5], // gap between sibling elements within a component (20px)
      componentLg: ref.frame.space[7], // gap between larger component groups (28px) — between component and subsection
      subsection: ref.frame.space[9], // gap between subsections within a section (36px)
      section: ref.frame.space[16], // gap between page-level sections (64px)
      page: ref.frame.space[20], // gap between major page regions (80px)
    },
    // Radius tokens — density-switchable via CSS custom properties
    // Default density values; compact/comfortable override in flow.css [data-density]
    // Per-size overrides in [data-size] blocks; compound [data-density][data-size] resolves cascade
    radius: {
      control: ref.frame.radius[3], // 12px — interactive controls (buttons, inputs, chips)
      container: ref.frame.radius[3], // 12px — containers (cards, panels, surfaces, tables)
      surface: ref.frame.radius[4], // 16px — section/page surfaces (viewport-responsive: phone→20px)
      sm: ref.frame.radius[1], // 4px — checkbox corners
      full: ref.frame.radius.full, // 9999px — pills (chip, tag, switch)
    },
    // Border widths — structural, consumed by comp controls
    border: {
      thin: ref.frame.border.thin, // 1px
      control: ref.frame.border.control, // 1.5px — interactive control borders
      medium: ref.frame.border.medium, // 2px — hover/focus/pressed borders
      indicator: ref.frame.border.indicator, // 3px — accent indicator
    },
    // Content width constraints
    content: {
      dialog: ref.frame.content.dialog, // 480px
      prose: ref.frame.content.prose, // 680px
    },
    // Sidebar structural widths
    sidebar: {
      expanded: ref.frame.sidebar.expanded, // 280px
      collapsed: ref.frame.sidebar.collapsed, // 56px
    },
    // Micro spacing — sub-grid step
    space: {
      micro: ref.frame.space.micro, // 2px
    },
    // Density variants — ×1.2 ratio, snapped to space scale
    // Canonical values that flow.css [data-density] blocks emit as CSS overrides
    density: {
      compact: {
        padding: {
          control: ref.frame.space[4], // 16px (20 ÷ 1.2)
          container: ref.frame.space[5], // 20px (24 ÷ 1.2)
          surface: ref.frame.space[10], // 40px (48 ÷ 1.2)
        },
        gap: {
          component: ref.frame.space[4], // 16px (20 ÷ 1.2)
          componentLg: ref.frame.space[6], // 24px (28 ÷ 1.2)
          subsection: ref.frame.space[7], // 28px (36 ÷ 1.2)
          section: ref.frame.space[12], // 48px (64 ÷ 1.2)
          page: ref.frame.space[16], // 64px (80 ÷ 1.2)
        },
        radius: {
          control: ref.frame.radius[2], // 8px (12 ÷ 1.2 → 8 snap)
          container: ref.frame.radius[2], // 8px (12 ÷ 1.2 → 8 snap)
        },
      },
      comfortable: {
        padding: {
          control: ref.frame.space[6], // 24px (20 × 1.2)
          container: ref.frame.space[7], // 28px (24 × 1.2)
          surface: ref.frame.space[16], // 64px (48 × 1.2 → 64 snap)
        },
        gap: {
          component: ref.frame.space[6], // 24px (20 × 1.2)
          componentLg: ref.frame.space[8], // 32px (28 × 1.2)
          subsection: ref.frame.space[11], // 44px (36 × 1.2)
          section: ref.frame.space[20], // 80px (64 × 1.2)
          page: ref.frame.space[24], // 96px (80 × 1.2)
        },
        radius: {
          control: ref.frame.radius[4], // 16px (12 × 1.2 → 16 snap)
          container: ref.frame.radius[4], // 16px (12 × 1.2 → 16 snap)
        },
      },
    },
    // Grid tokens — default density (gutter overridden for spacious baseline)
    // Density modes (compact/comfortable) override gutter/margin via CSS
    grid: {
      lg: {
        columns: ref.frame.grid.lg.columns,
        gutter: ref.frame.space[8],
        margin: ref.frame.grid.lg.margin,
        maxWidth: ref.frame.grid.lg.maxWidth,
      },
      md: {
        columns: ref.frame.grid.md.columns,
        gutter: ref.frame.grid.md.gutter,
        margin: ref.frame.grid.md.margin,
      },
      sm: {
        columns: ref.frame.grid.sm.columns,
        gutter: ref.frame.grid.sm.gutter,
        margin: ref.frame.grid.sm.margin,
      },
      // Grid density variants — ×1.2 ratio
      density: {
        compact: {
          lg: { gutter: ref.frame.space[6], margin: ref.frame.space[10] }, // 24px, 40px
          md: { gutter: ref.frame.space[5], margin: ref.frame.space[5] }, // 20px, 20px
          sm: { margin: ref.frame.space[3] }, // 12px
        },
        comfortable: {
          lg: { gutter: ref.frame.space[10], margin: ref.frame.space[16] }, // 40px, 64px
          md: { gutter: ref.frame.space[7], margin: ref.frame.space[7] }, // 28px, 28px
          sm: { margin: ref.frame.space[5] }, // 20px
        },
      },
    },
    // ── sys.frame.size — Centralized size tokens (L2 upgrade) ──
    // Functional categories shared across multiple components.
    // [data-size] overrides the active tier; default = md.
    // Components consume these via comp tokens or calc() derivation.
    size: {
      // Active defaults (md tier) — CSS [data-size] blocks override per tier
      controlHeight: ref.frame.height.controlMd, // 60px — Button, Chip, IconButton, TextField
      indicator: "24px", // Radio/Checkbox outer size
      indicatorStateLayer: "40px", // Hover/pressed ring (Radio, Checkbox)
      icon: ref.icon.size.md, // 20px — icons in controls
      labelFont: ref.voice.size[6], // 16px — label text on indicator controls (≡ voice.body, geometric)
      tableCellPy: ref.frame.space[3], // 12px — Table vertical cell padding
      tableCellPx: ref.frame.space[4], // 16px — Table horizontal cell padding
      tableFont: ref.voice.size[5], // 14px — Table body cell font (≡ voice.label, geometric)
      tableHeaderFont: ref.voice.size[3], // 12px — Table header cell font
      // Per-tier lookup (canonical source for flow.css [data-size] blocks)
      sm: {
        controlHeight: ref.frame.height.controlSm, // 48px
        indicator: "18px",
        indicatorStateLayer: "32px",
        icon: ref.icon.size.sm, // 16px
        labelFont: ref.voice.size[4], // 13px
        tableCellPy: ref.frame.space[2], // 8px
        tableCellPx: ref.frame.space[3], // 12px
        tableFont: ref.voice.size[3], // 12px
        tableHeaderFont: ref.voice.size[2], // 11px
        cardPadding: ref.frame.space[3], // 12px
        cardRadius: ref.frame.radius[2], // 8px
        dialogMaxWidth: "360px",
      },
      md: {
        controlHeight: ref.frame.height.controlMd, // 60px
        indicator: "24px",
        indicatorStateLayer: "40px",
        icon: ref.icon.size.md, // 20px
        labelFont: ref.voice.size[6], // 16px — ≡ voice.body (geometric)
        tableCellPy: ref.frame.space[3], // 12px
        tableCellPx: ref.frame.space[4], // 16px
        tableFont: ref.voice.size[5], // 14px — ≡ voice.label (geometric)
        tableHeaderFont: ref.voice.size[3], // 12px
        cardPadding: ref.frame.space[5], // 20px
        cardRadius: ref.frame.radius[3], // 12px
        dialogMaxWidth: ref.frame.content.dialog, // 480px
      },
      lg: {
        controlHeight: ref.frame.height.controlLg, // 72px
        indicator: "30px",
        indicatorStateLayer: "48px",
        icon: ref.icon.size.lg, // 24px
        labelFont: ref.voice.size[8], // 20px — ≡ voice.body (geometric)
        tableCellPy: ref.frame.space[4], // 16px
        tableCellPx: ref.frame.space[5], // 20px
        tableFont: ref.voice.size[7], // 18px — ≡ voice.label (geometric)
        tableHeaderFont: ref.voice.size[3], // 12px
        cardPadding: ref.frame.space[6], // 24px
        cardRadius: ref.frame.radius[3], // 12px
        dialogMaxWidth: "640px",
      },
      xl: {
        controlHeight: ref.frame.height.controlXl, // 88px
        indicator: "36px",
        indicatorStateLayer: "56px",
        icon: ref.icon.size.xl, // 32px
        labelFont: ref.voice.size[9], // 24px — ≡ voice.body (geometric)
        tableCellPy: ref.frame.space[5], // 20px
        tableCellPx: ref.frame.space[6], // 24px
        tableFont: ref.voice.size[8], // 20px — ≡ voice.label (geometric)
        tableHeaderFont: ref.voice.size[3], // 12px
        cardPadding: ref.frame.space[8], // 32px
        cardRadius: ref.frame.radius[4], // 16px
        dialogMaxWidth: "800px",
      },
      // sys.size.voice — semantic typographic scale per size tier
      // Guarantees hierarchy: headline > body > label > caption at every tier.
      // Body/label/caption advance geometrically (~×1.2/tier), matching height/icon/indicator.
      // CSS classes consume these directly (not through comp aliases).
      voice: {
        // Default (md tier)
        headline: ref.voice.size[8], // 20px — +3 steps above body for clear title hierarchy
        body: ref.voice.size[6], // 16px — geometric ×1.23 from sm(13)
        label: ref.voice.size[5], // 14px — geometric ×1.17 from sm(12)
        caption: ref.voice.size[3], // 12px — geometric ×1.20 from sm(10)
        // Per-tier lookup (geometric ~×1.2 body/label/caption; headline unchanged)
        sm: {
          headline: ref.voice.size[7],
          body: ref.voice.size[4],
          label: ref.voice.size[3],
          caption: ref.voice.size[1],
        }, // 18,13,12,10 — anchor
        md: {
          headline: ref.voice.size[8],
          body: ref.voice.size[6],
          label: ref.voice.size[5],
          caption: ref.voice.size[3],
        }, // 20,16,14,12
        lg: {
          headline: ref.voice.size[9],
          body: ref.voice.size[8],
          label: ref.voice.size[7],
          caption: ref.voice.size[5],
        }, // 24,20,18,14
        xl: {
          headline: ref.voice.size[10],
          body: ref.voice.size[9],
          label: ref.voice.size[8],
          caption: ref.voice.size[7],
        }, // 32,24,20,18
      },
      // sys.size.gap — compositional spacing per size tier
      gap: {
        field: ref.frame.space[3], // 12px — between related form elements (md default)
        section: ref.frame.space[5], // 20px — between major sections (md default)
        sm: { field: ref.frame.space[2], section: ref.frame.space[4] }, // 8,16
        md: { field: ref.frame.space[3], section: ref.frame.space[5] }, // 12,20
        lg: { field: ref.frame.space[4], section: ref.frame.space[6] }, // 16,24
        xl: { field: ref.frame.space[5], section: ref.frame.space[8] }, // 20,32
      },
      // sys.size.inset — generous container padding (dialogs, cards, panels)
      inset: ref.frame.space[5], // 20px (md default)
      insetPerTier: {
        sm: ref.frame.space[4], // 16px
        md: ref.frame.space[5], // 20px
        lg: ref.frame.space[6], // 24px
        xl: ref.frame.space[8], // 32px
      },
    },
  },
  // sys.voice — composite typography styles aligned with Figma Edenred
  // DEPRECATED (V4 RESOLUTION 2026-03-02): sys.voice.{label|paragraph|caption}
  // are now deprecated in favor of sys.frame.size.voice.{body|label|caption} which:
  //   • Are density-responsive (adapt with compact/default/comfortable modes)
  //   • Integrate with [data-size] tier system (sm/md/lg/xl)
  //   • Guarantee hierarchy: headline > body > label > caption at every tier
  //   • Grow geometrically (~×1.2/tier) matching height/icon/indicator families
  // Migration: Replace sys.voice.paragraph.* → sys.frame.size.voice.body
  //            Replace sys.voice.label.* → sys.frame.size.voice.label
  //            Replace sys.voice.caption → sys.frame.size.voice.caption
  // Display/Heading remain valid (density-INVARIANT, used for hero/section headers).
  // Overline remains valid (ALL-CAPS utility role for eyebrows/metadata labels).
  voice: {
    display: {
      xl: {
        family: ref.voice.family.brand,
        weight: ref.voice.weight.bold,
        size: ref.voice.size[14],
        lineHeight: ref.voice.lineHeight.display,
        letterSpacing: ref.voice.letterSpacing.tight,
      },
      l: {
        family: ref.voice.family.brand,
        weight: ref.voice.weight.bold,
        size: ref.voice.size[13],
        lineHeight: ref.voice.lineHeight.display,
        letterSpacing: ref.voice.letterSpacing.tight,
      },
      m: {
        family: ref.voice.family.brand,
        weight: ref.voice.weight.bold,
        size: ref.voice.size[12],
        lineHeight: ref.voice.lineHeight.normal,
        letterSpacing: ref.voice.letterSpacing.snug,
      },
      s: {
        family: ref.voice.family.brand,
        weight: ref.voice.weight.bold,
        size: ref.voice.size[11],
        lineHeight: ref.voice.lineHeight.snug,
        letterSpacing: ref.voice.letterSpacing.snug,
      },
      xs: {
        family: ref.voice.family.brand,
        weight: ref.voice.weight.bold,
        size: ref.voice.size[10],
        lineHeight: ref.voice.lineHeight.normal,
        letterSpacing: ref.voice.letterSpacing.normal,
      },
    },
    heading: {
      l: {
        family: ref.voice.family.brand,
        weight: ref.voice.weight.bold,
        size: ref.voice.size[9],
        lineHeight: ref.voice.lineHeight.normal,
        letterSpacing: ref.voice.letterSpacing.normal,
      },
      m: {
        family: ref.voice.family.brand,
        weight: ref.voice.weight.bold,
        size: ref.voice.size[8],
        lineHeight: ref.voice.lineHeight.loose,
        letterSpacing: ref.voice.letterSpacing.normal,
      },
    },
    // DEPRECATED — Use sys.frame.size.voice.label instead (density-responsive, [data-size] integrated)
    label: {
      xl: {
        family: ref.voice.family.sans,
        weight: ref.voice.weight.medium,
        size: ref.voice.size[9],
        lineHeight: ref.voice.lineHeight.normal,
        letterSpacing: ref.voice.letterSpacing.normal,
      },
      l: {
        family: ref.voice.family.sans,
        weight: ref.voice.weight.medium,
        size: ref.voice.size[8],
        lineHeight: ref.voice.lineHeight.loose,
        letterSpacing: ref.voice.letterSpacing.normal,
      },
      m: {
        family: ref.voice.family.sans,
        weight: ref.voice.weight.medium,
        size: ref.voice.size[7],
        lineHeight: ref.voice.lineHeight.dense,
        letterSpacing: ref.voice.letterSpacing.normal,
      },
      s: {
        family: ref.voice.family.sans,
        weight: ref.voice.weight.medium,
        size: ref.voice.size[6],
        lineHeight: ref.voice.lineHeight.normal,
        letterSpacing: ref.voice.letterSpacing.normal,
      },
      xs: {
        family: ref.voice.family.sans,
        weight: ref.voice.weight.medium,
        size: ref.voice.size[5],
        lineHeight: ref.voice.lineHeight.relaxed,
        letterSpacing: ref.voice.letterSpacing.normal,
      },
    },
    // DEPRECATED — Use sys.frame.size.voice.body instead (density-responsive, [data-size] integrated)
    paragraph: {
      l: {
        family: ref.voice.family.sans,
        weight: ref.voice.weight.regular,
        size: ref.voice.size[7],
        lineHeight: ref.voice.lineHeight.relaxed,
        letterSpacing: ref.voice.letterSpacing.normal,
      },
      m: {
        family: ref.voice.family.sans,
        weight: ref.voice.weight.regular,
        size: ref.voice.size[6],
        lineHeight: ref.voice.lineHeight.normal,
        letterSpacing: ref.voice.letterSpacing.normal,
      },
      s: {
        family: ref.voice.family.sans,
        weight: ref.voice.weight.regular,
        size: ref.voice.size[5],
        lineHeight: ref.voice.lineHeight.relaxed,
        letterSpacing: ref.voice.letterSpacing.normal,
      },
    },
    // DEPRECATED — Use sys.frame.size.voice.caption instead (density-responsive, [data-size] integrated)
    caption: {
      family: ref.voice.family.sans,
      weight: ref.voice.weight.medium,
      size: ref.voice.size[4],
      lineHeight: ref.voice.lineHeight.relaxed,
      letterSpacing: ref.voice.letterSpacing.wide,
    },
    // Overline remains valid — ALL-CAPS utility role for eyebrows/metadata labels
    overline: {
      family: ref.voice.family.sans,
      weight: ref.voice.weight.bold,
      size: ref.voice.size[1],
      lineHeight: ref.voice.lineHeight.normal,
      letterSpacing: ref.voice.letterSpacing.caps,
    },
  },
  // sys.icon — per-tier icon dimensions
  icon: {
    size: {
      sm: ref.icon.size.sm, // 16px
      md: ref.icon.size.md, // 20px
      lg: ref.icon.size.lg, // 24px
      xl: ref.icon.size.xl, // 32px
    },
  },
  // sys.tone — brand voice/personality variants for text-heavy components
  // Maps tone intent to color+weight combinations. Components with tone prop
  // apply these instead of default text colors to enforce brand hierarchy.
  tone: {
    neutral: {
      text: ref.energy.neutral[800], // Default text, balanced
      textSubtle: ref.energy.neutral[500],
      weight: ref.voice.weight.regular,
    },
    brand: {
      text: ref.energy.blue[700], // Product identity, high-confidence
      textSubtle: ref.energy.blue[500],
      weight: ref.voice.weight.medium,
    },
    marketing: {
      text: ref.energy.orange[700], // Conversion-focused, energetic
      textSubtle: ref.energy.orange[500],
      weight: ref.voice.weight.medium,
    },
    system: {
      text: ref.energy.neutral[600], // System feedback, utilitarian
      textSubtle: ref.energy.neutral[400],
      weight: ref.voice.weight.regular,
    },
  },
  // sys.momentum — identical structure to sysLight (momentum is density-driven, not theme-driven)
  momentum: {
    duration: {
      fast: ref.momentum.duration.fast,
      default: ref.momentum.duration.normal,
      slow: ref.momentum.duration.slow,
    },
  },
} as const;

// Dark theme sys remapping — all values reference ref tokens
export const sysDark = {
  energy: {
    surface: {
      primary: ref.energy.neutral[950],
      secondary: ref.energy.neutral[900],
      tertiary: ref.energy.neutral[800],
      sunken: ref.energy.neutral[700],
      inverse: ref.energy.neutral[100],
      // Tinted surfaces — dark equivalents use deep shades
      coldWhite: ref.energy.neutral[900], // No cold tint in dark mode
      accent: ref.energy.blue[900],
      danger: ref.energy.red[900],
      success: ref.energy.green[900],
      warning: ref.energy.orange[900],
    },
    text: {
      primary: ref.energy.neutral[100],
      secondary: ref.energy.neutral[400],
      tertiary: ref.energy.neutral[500],
      inverse: ref.energy.neutral[900],
      onAction: ref.energy.neutral[900], // Text on primary action surfaces (dark)
      link: ref.energy.blue[200], // Link text on dark
      accent: ref.energy.blue[200],
      danger: ref.energy.red[200], // Upgraded from 100 → 200 for saturation
      success: ref.energy.green[200], // Upgraded from 100 → 200 for saturation
      warning: ref.energy.orange[200], // Upgraded from 100 → 200 for saturation
    },
    border: {
      default: `rgba(${ref.state.border.darkBase}, ${ref.state.border.defaultAlpha})`,
      strong: `rgba(${ref.state.border.darkBase}, ${ref.state.border.strongAlpha})`,
      focus: ref.energy.blue[200],
      accent: ref.energy.blue[700],
      danger: ref.energy.red[700],
      success: ref.energy.green[700],
      warning: ref.energy.orange[700],
      // ── Form-control borders (opaque, dark remapping) ──
      control: ref.energy.neutral[400], // Opaque control border (dark)
      controlError: ref.energy.red[300], // Opaque error border (dark)
      controlDisabled: ref.energy.neutral[700], // Disabled control border (dark)
    },
    action: {
      primary: ref.energy.blue[200],
      primaryHover: ref.energy.blue[100],
      primaryActive: ref.energy.blue[300],
      secondary: ref.energy.neutral[800],
      secondaryHover: ref.energy.neutral[700],
      ghost: ref.energy.transparent,
      ghostHover: ref.energy.neutral[800],
      destructive: ref.energy.red[200], // Upgraded from 100 → 200
      destructiveHover: ref.energy.red[100],
      // ── Figma Edenred emphasis model (D1-D8 alignment, dark remapping) ──
      high: ref.energy.neutral[100], // HIGH emphasis: light filled on dark
      highHover: ref.energy.neutral[300],
      highActive: ref.energy.neutral[200],
      mediumBorder: ref.energy.neutral[100], // MEDIUM emphasis: outlined, light border on dark
      mediumActive: ref.energy.neutral[600], // MEDIUM bg on pressed (dark)
      lowActive: ref.energy.blue[300], // LOW emphasis: link pressed text (dark)
      destructiveSubtle: ref.energy.red[900], // DANGER default bg (dark: deep shade)
      destructiveActive: ref.energy.red[300], // DANGER pressed state (dark)
    },
    // ── Explicit disabled state colors (D3: Figma alignment, dark remapping) ──
    state: {
      disabledBg: ref.energy.neutral[600],
      disabledText: ref.energy.neutral[400],
      disabledBorder: ref.energy.neutral[600],
    },
    status: {
      success: ref.energy.green[200], // Upgraded from 100 → 200
      successSubtle: ref.energy.green[900],
      successMuted: ref.energy.green[800],
      warning: ref.energy.orange[200], // Upgraded from 100 → 200
      warningSubtle: ref.energy.orange[900],
      warningMuted: ref.energy.orange[800],
      error: ref.energy.red[200], // Upgraded from 100 → 200
      errorSubtle: ref.energy.red[900],
      errorMuted: ref.energy.red[800],
      info: ref.energy.blue[200], // Upgraded from 100 → 200
      infoSubtle: ref.energy.blue[900],
      infoMuted: ref.energy.blue[800],
    },
    // sys.energy.icon — dark theme icon color roles
    icon: {
      default: ref.energy.neutral[100], // Primary icon color (dark)
      secondary: ref.energy.neutral[400], // De-emphasized icons
      tertiary: ref.energy.neutral[500], // Subtle/decorative icons
      action: ref.energy.blue[200], // Interactive/actionable icons
      inverse: ref.energy.neutral[900], // Icons on light/inverse surfaces
      onAction: ref.energy.neutral[900], // Icons on action-colored surfaces
      disabled: ref.energy.neutral[600], // Disabled state icons
      success: ref.energy.green[200], // Status: success
      warning: ref.energy.orange[200], // Status: warning
      error: ref.energy.red[200], // Status: error
      info: ref.energy.blue[200], // Status: informational
    },
    // sys.energy.control — dark remapping
    control: {
      borderInactive: ref.energy.neutral[400],
      borderInactivePressed: ref.energy.neutral[300],
      borderDisabled: ref.energy.neutral[700],
      fillPressed: ref.energy.blue[300],
      fillDisabled: ref.energy.neutral[600],
      dot: ref.energy.neutral[900],
      stateLayerInactive: ref.energy.neutral[400],
    },
    // sys.energy.switch — dark remapping
    switch: {
      trackOff: ref.energy.neutral[600],
      trackOffHover: ref.energy.neutral[500],
      trackDisabled: ref.energy.neutral[800],
      thumbOff: ref.energy.neutral[200],
      thumbOn: ref.energy.neutral[900],
      thumbDisabled: ref.energy.neutral[700],
      thumbIconDisabled: ref.energy.neutral[600],
    },
  },
  depth: {
    overlay: ref.depth.overlay.dark,
    // Semantic elevation aliases — dark uses dark-N variants (higher opacity)
    elevation: {
      light: ref.depth.shadow["dark-1"],
      medium: ref.depth.shadow["dark-2"],
      high: ref.depth.shadow["dark-3"],
    },
    layer: {
      content: ref.depth.zIndex.content,
      sticky: ref.depth.zIndex.sticky,
    },
  },
  frame: {
    height: {
      controlSm: ref.frame.height.controlSm,
      controlMd: ref.frame.height.controlMd,
      controlLg: ref.frame.height.controlLg,
      controlXl: ref.frame.height.controlXl,
    },
    // Spacing tokens — same density-switchable structure as sysLight
    // All three tiers use ×1.2 ratio, snapped to ref.frame.space scale
    padding: {
      control: ref.frame.space[5],
      container: ref.frame.space[6],
      surface: ref.frame.space[12],
    },
    gap: {
      component: ref.frame.space[5],
      componentLg: ref.frame.space[7],
      subsection: ref.frame.space[9],
      section: ref.frame.space[16],
      page: ref.frame.space[20],
    },
    // Structural tokens — mirrors sysLight (not theme-dependent)
    radius: sysLight.frame.radius,
    border: sysLight.frame.border,
    content: sysLight.frame.content,
    sidebar: sysLight.frame.sidebar,
    space: sysLight.frame.space,
    // Density variants — mirrors sysLight (spacing is not theme-dependent)
    density: sysLight.frame.density,
    // Grid tokens — same structure as sysLight (grid is spatial, not themed)
    grid: {
      lg: {
        columns: ref.frame.grid.lg.columns,
        gutter: ref.frame.space[8],
        margin: ref.frame.grid.lg.margin,
        maxWidth: ref.frame.grid.lg.maxWidth,
      },
      md: {
        columns: ref.frame.grid.md.columns,
        gutter: ref.frame.grid.md.gutter,
        margin: ref.frame.grid.md.margin,
      },
      sm: {
        columns: ref.frame.grid.sm.columns,
        gutter: ref.frame.grid.sm.gutter,
        margin: ref.frame.grid.sm.margin,
      },
      density: sysLight.frame.grid.density,
    },
    // Size tokens — mirrors sysLight (size is spatial, not themed)
    size: sysLight.frame.size,
  },
  // Icon sizes — mirrors sysLight (structural, not themed)
  icon: sysLight.icon,
  // sys.tone — dark theme remapping
  // Brand voice/personality variants adapted for dark surfaces
  tone: {
    neutral: {
      text: ref.energy.neutral[50], // Light text on dark
      textSubtle: ref.energy.neutral[400],
      weight: ref.voice.weight.regular,
    },
    brand: {
      text: ref.energy.blue[300], // Product identity, high-confidence
      textSubtle: ref.energy.blue[400],
      weight: ref.voice.weight.medium,
    },
    marketing: {
      text: ref.energy.orange[300], // Conversion-focused, energetic
      textSubtle: ref.energy.orange[400],
      weight: ref.voice.weight.medium,
    },
    system: {
      text: ref.energy.neutral[300], // System feedback, utilitarian
      textSubtle: ref.energy.neutral[500],
      weight: ref.voice.weight.regular,
    },
  },
} as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMP TOKENS — Component-scoped bindings
// All values reference sys tokens only (zero ref references).
// This is the canonical definition that CSS --comp-* and
// Flutter FlowCompTokens are derived from.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const compLight = {
  button: {
    // ── Emphasis model (high/medium/low/danger) ──

    // HIGH — dark filled (Figma primary action)
    bgHigh: sysLight.energy.action.high,
    bgHighHover: sysLight.energy.action.highHover,
    bgHighActive: sysLight.energy.action.highActive,
    textHigh: sysLight.energy.text.inverse,

    // MEDIUM — outlined (Figma secondary action)
    bgMedium: sysLight.energy.action.ghost,
    bgMediumHover: sysLight.energy.action.secondaryHover,
    bgMediumActive: sysLight.energy.action.mediumActive,
    textMedium: sysLight.energy.text.primary,
    borderMedium: sysLight.energy.action.mediumBorder,

    // LOW — link button with underline (D4)
    bgLow: sysLight.energy.action.ghost,
    textLow: sysLight.energy.text.accent,
    textLowHover: sysLight.energy.text.link,
    textLowActive: sysLight.energy.action.lowActive,

    // OUTLINE — transparent bg, accent text, strong border (D5)
    bgOutline: sysLight.energy.action.ghost,
    bgOutlineHover: sysLight.energy.action.secondaryHover,
    bgOutlineActive: sysLight.energy.action.mediumActive,
    textOutline: sysLight.energy.text.accent,
    borderOutline: sysLight.energy.border.strong,

    // DANGER — subtle→filled paradigm (D2)
    bgDangerSubtle: sysLight.energy.action.destructiveSubtle,
    bgDangerHover: sysLight.energy.action.destructive,
    bgDangerActive: sysLight.energy.action.destructiveActive,
    textDangerSubtle: sysLight.energy.text.danger,
    textDangerOnFilled: sysLight.energy.text.onAction,

    // DISABLED — explicit colors (D3)
    bgDisabled: sysLight.energy.state.disabledBg,
    textDisabled: sysLight.energy.state.disabledText,
    borderDisabled: sysLight.energy.state.disabledBorder,

    // ── Structural ──
    radius: sysLight.frame.radius.control,
    fontSm: ref.voice.size[4], // 13px — ±2 steps in density (11→13→16)
    fontMd: ref.voice.size[5], // 14px — ±2 steps in density (12→14→18)
    fontLg: ref.voice.size[6], // 16px — ±2 steps in density (13→16→20)
    fontXl: ref.voice.size[7], // 18px — ±2 steps in density (14→18→24)
    paddingX: ref.frame.space[3], // D5: 12px — density-overridden in flow.css [data-density]
    gap: ref.frame.space[2], // 8px — density-overridden in flow.css [data-density]
    borderWidth: sysLight.frame.border.control, // D7: 1.5px (Figma control border)
    heightSm: sysLight.frame.height.controlSm,
    heightMd: sysLight.frame.height.controlMd,
    heightLg: sysLight.frame.height.controlLg,
    heightXl: sysLight.frame.height.controlXl,
    // Single-value tokens (CSS: set per [data-size], consumed by .flow-btn-v2)
    height: "var(--comp-button-height)", // → sys-size-control-height via [data-size]
    font: "var(--comp-button-font)", // → comp-button-font-{size} via [data-size]
  },
  // ─ TextInput — Figma Edenred floating-label input ──
  textInput: {
    // Backgrounds
    bg: sysLight.energy.surface.primary, // white
    bgPressed: sysLight.energy.surface.tertiary, // neutral[100] — :active bg
    bgDisabled: sysLight.energy.surface.secondary, // neutral[50]
    // Border colors (opaque, via sys.energy.border.control*)
    border: sysLight.energy.border.control, // neutral[600] — default opaque
    borderFocus: sysLight.energy.border.focus, // blue[500] — focus ring
    borderError: sysLight.energy.border.controlError, // red[600] — error state
    borderDisabled: sysLight.energy.border.controlDisabled, // neutral[300] — disabled
    // Border widths
    borderWidth: sysLight.frame.border.control, // 1.5px — default
    borderWidthActive: sysLight.frame.border.medium, // 2px — hover/focus/pressed
    // Text colors
    text: sysLight.energy.text.primary, // neutral[800] — input value
    label: sysLight.energy.border.control, // neutral[600] — label text (matches border)
    labelDisabled: sysLight.energy.text.secondary, // neutral[500] — disabled label
    placeholder: sysLight.energy.text.tertiary, // neutral[400]
    hint: sysLight.energy.border.control, // neutral[600] — helper text
    hintError: sysLight.energy.border.controlError, // red[600] — error helper text
    // Typography — ±2 steps in density (per-size refs, CSS density blocks shift ±2)
    labelSize: ref.voice.size[9], // 24px — base=xl, exaggerated label spread
    labelSizeFloat: ref.voice.size[4], // 13px — base=xl
    valueSize: ref.voice.size[6], // 16px — base=xl, moderate +1 step curve
    hintSize: ref.voice.size[4], // 13px — base=xl
    // Dimensions
    height: sysLight.frame.height.controlXl, // 88px (backward compat)
    heightSm: sysLight.frame.height.controlSm, // 48px
    heightMd: sysLight.frame.height.controlMd, // 60px
    heightLg: sysLight.frame.height.controlLg, // 72px
    heightXl: sysLight.frame.height.controlXl, // 88px
    radius: sysLight.frame.radius.control, // 12px — unified with Button/IconButton
    padding: ref.frame.space[5], // 20px — base=xl, density-overridden
    paddingSm: ref.frame.space[2], // 8px — per-size, density-overridden
    paddingMd: ref.frame.space[3], // 12px
    paddingLg: ref.frame.space[4], // 16px
    paddingXl: ref.frame.space[5], // 20px
    gap: ref.frame.space[1], // 4px — between input container and hint
    contentGap: sysLight.frame.space.micro, // 2px — between title and value (sub-grid micro step)
    clearSize: ref.frame.space[12], // 48px — clear icon button hit area
    // Per-size typography (+2 ref steps per size for exaggerated spread)
    labelSizeSm: ref.voice.size[3], // 12px
    labelSizeMd: ref.voice.size[5], // 14px
    labelSizeLg: ref.voice.size[7], // 18px
    labelSizeXl: ref.voice.size[9], // 24px
    valueSizeSm: ref.voice.size[3], // 12px — moderate +1 step curve
    valueSizeMd: ref.voice.size[4], // 13px
    valueSizeLg: ref.voice.size[5], // 14px
    valueSizeXl: ref.voice.size[6], // 16px
    labelSizeFloatSm: ref.voice.size[1], // 10px
    labelSizeFloatMd: ref.voice.size[2], // 11px
    labelSizeFloatLg: ref.voice.size[3], // 12px
    labelSizeFloatXl: ref.voice.size[4], // 13px
    hintSizeSm: ref.voice.size[1], // 10px
    hintSizeMd: ref.voice.size[2], // 11px
    hintSizeLg: ref.voice.size[3], // 12px
    hintSizeXl: ref.voice.size[4], // 13px
    // Per-size label scale (label-size / float-size) — exaggerated
    labelScaleSm: "1.2", // 12/10
    labelScaleMd: "1.273", // 14/11
    labelScaleLg: "1.5", // 18/12
    labelScaleXl: "1.846", // 24/13
    // Per-size label geometry (default density; CSS overrides for compact/comfortable)
    labelOffsetYSm: "9px",
    labelOffsetYMd: "10px",
    labelOffsetYLg: "10px",
    labelOffsetYXl: "10px",
    inputBottomSm: "4px",
    inputBottomMd: "6px",
    inputBottomLg: "8px",
    inputBottomXl: "10px",
  },
  // ── CountrySelect — Figma-aligned country picker ──
  countrySelect: {
    chevronColor: sysLight.energy.action.primary, // blue[500] — default chevron
    chevronDisabled: sysLight.energy.text.tertiary, // neutral[400] — disabled chevron
  },
  // ── Radio Button — Figma Edenred selection control ──
  radio: {
    // Border colors (unselected states) — via sys.energy.control
    borderInactive: sysLight.energy.control.borderInactive, // #64748B — default border
    borderInactivePressed: sysLight.energy.control.borderInactivePressed, // #475569 — pressed border
    borderDisabled: sysLight.energy.control.borderDisabled, // #CBD5E1 — disabled border
    // Fill colors (selected states)
    fillActive: sysLight.energy.action.primary, // #0060DF — selected fill
    fillActivePressed: sysLight.energy.control.fillPressed, // #004DB3 — selected pressed fill
    fillDisabled: sysLight.energy.control.fillDisabled, // #CBD5E1 — disabled selected fill
    // Dot color
    dotColor: sysLight.energy.control.dot, // white — inner dot
    // State-layer ring colors (applied at 20% opacity)
    stateLayerInactive: sysLight.energy.control.stateLayerInactive, // #64748B — unselected hover ring
    stateLayerActive: sysLight.energy.action.primary, // #0060DF — selected hover ring
    // Structural — derived from sys.frame.size (CSS: calc(indicator/3), calc(indicator*2/3))
    size: sysLight.frame.size.indicator, // 24px — radio circle diameter (from sys.size)
    dotSize: "8px", // inner dot = indicator/3 (CSS calc)
    stateLayerSize: sysLight.frame.size.indicatorStateLayer, // 40px — hover/pressed ring (from sys.size)
    touchTarget: ref.frame.space[12], // 48px — outer label padding
    borderWidth: sysLight.frame.border.control, // 1.5px — default
    borderWidthHover: sysLight.frame.border.medium, // 2px — hover/pressed
    stateLayerOpacity: "0.2", // 20% ring opacity
    labelFontSize: sysLight.frame.size.labelFont, // 14px — label text (from sys.size)
  },
  // ── Checkbox — Figma Edenred selection control ──
  checkbox: {
    // Border colors (unchecked states) — via sys.energy.control
    borderInactive: sysLight.energy.control.borderInactive, // #64748B — default border
    borderInactivePressed: sysLight.energy.control.borderInactivePressed, // #475569 — pressed border
    borderDisabled: sysLight.energy.control.borderDisabled, // #CBD5E1 — disabled border
    // Fill colors (checked/indeterminate states)
    fillActive: sysLight.energy.action.primary, // #0060DF — checked fill
    fillActivePressed: sysLight.energy.control.fillPressed, // #004DB3 — checked pressed fill
    fillDisabled: sysLight.energy.control.fillDisabled, // #CBD5E1 — disabled checked fill
    // Icon color (check/dash marks)
    iconColor: sysLight.energy.control.dot, // white — check/dash icon
    // State-layer ring colors (applied at 20% opacity)
    stateLayerInactive: sysLight.energy.control.stateLayerInactive, // #64748B — unchecked hover ring
    stateLayerActive: sysLight.energy.action.primary, // #0060DF — checked hover ring
    // Structural — derived from sys.frame.size (CSS: calc(indicator*2/3))
    size: sysLight.frame.size.indicator, // 24px — checkbox square (from sys.size)
    iconSize: "16px", // check/dash SVG = indicator*2/3 (CSS calc)
    radius: sysLight.frame.radius.sm, // 4px — rounded square corners
    stateLayerSize: sysLight.frame.size.indicatorStateLayer, // 40px — hover/pressed ring (from sys.size)
    touchTarget: ref.frame.space[12], // 48px — outer label padding
    borderWidth: sysLight.frame.border.control, // 1.5px — default
    borderWidthHover: sysLight.frame.border.medium, // 2px — hover/pressed
    stateLayerOpacity: "0.2", // 20% ring opacity
    labelFontSize: sysLight.frame.size.labelFont, // 14px — label text (from sys.size)
  },
  // ── Switch — Figma Edenred toggle control ──
  switch: {
    // Track colors — via sys.energy.switch + sys.energy.control
    trackOff: sysLight.energy.switch.trackOff, // #CBD5E1 — off track
    trackOffHover: sysLight.energy.switch.trackOffHover, // #94A3B8 — off hover track
    trackOn: sysLight.energy.action.primary, // #0060DF — on track
    trackOnHover: sysLight.energy.action.primaryHover, // #003985 — on hover track
    trackOnPressed: sysLight.energy.control.fillPressed, // #004DB3 — on pressed track
    trackDisabled: sysLight.energy.switch.trackDisabled, // #E2E8F0 — disabled track
    // Thumb colors — via sys.energy.switch
    thumbOff: sysLight.energy.switch.thumbOff, // white — off thumb
    thumbOn: sysLight.energy.switch.thumbOn, // white — on thumb
    thumbDisabled: sysLight.energy.switch.thumbDisabled, // #F1F5F9 — disabled thumb
    // Thumb icon colors — via sys.energy.control
    thumbIconOff: sysLight.energy.control.borderInactive, // #64748B — × icon
    thumbIconOn: sysLight.energy.action.primary, // #0060DF — ✓ icon
    thumbIconDisabled: sysLight.energy.switch.thumbIconDisabled, // #CBD5E1 — disabled icon
    // State-layer ring colors — via sys.energy.control
    stateLayerOff: sysLight.energy.control.stateLayerInactive, // #64748B — off hover ring
    stateLayerOn: sysLight.energy.action.primary, // #0060DF — on hover ring
    // Structural
    trackWidth: "52px", // track pill width
    trackHeight: "32px", // track pill height
    thumbSize: "16px", // thumb default diameter
    thumbSizePressed: "18px", // thumb pressed diameter (grows)
    thumbInset: "8px", // thumb offset from track edge
    stateLayerSize: "40px", // hover ring diameter
    stateLayerOpacity: "0.2", // 20% ring opacity
    trackRadius: sysLight.frame.radius.full, // pill shape
    thumbShadow: sysLight.depth.elevation.light, // subtle shadow on thumb
  },
  // ── Shared country dropdown (PhoneInput + CountrySelect) ──
  countryDropdown: {
    bg: sysLight.energy.surface.primary,
    shadow: sysLight.depth.elevation.high,
    radius: sysLight.frame.radius.container,
    maxHeight: "320px",
    itemHover: "var(--sys-state-hover-overlay)",
    itemHeight: "44px",
  },
  card: {
    bgElevated: sysLight.energy.surface.primary,
    bgOutlined: sysLight.energy.surface.primary,
    bgFilled: sysLight.energy.surface.secondary,
    border: sysLight.energy.border.default,
    shadow: sysLight.depth.elevation.light, // Cards → light elevation
    shadowHover: sysLight.depth.elevation.medium, // Interactive card lift on hover
    radius: sysLight.frame.radius.container,
    padding: sysLight.frame.padding.container,
  },
  table: {
    cellPaddingY: sysLight.frame.size.tableCellPy, // 12px — vertical cell padding (from sys.size)
    cellPaddingX: sysLight.frame.size.tableCellPx, // 16px — horizontal cell padding (from sys.size)
    fontSize: sysLight.frame.size.tableFont, // 13px — body cell text (from sys.size)
    headerFontSize: sysLight.frame.size.tableHeaderFont, // 12px — header cell text (from sys.size)
  },
  chip: {
    bg: sysLight.energy.surface.tertiary,
    bgSelected: `rgba(${ref.energy.blue["500-rgb"]}, ${ref.state.opacity.selected})`,
    text: sysLight.energy.text.primary,
    textSelected: sysLight.energy.text.accent,
    fontSm: ref.voice.size[3], // 12px — ±2 steps (10→12→14)
    fontMd: ref.voice.size[4], // 13px — ±2 steps (11→13→16)
    fontLg: ref.voice.size[5], // 14px — ±2 steps (12→14→18)
    fontXl: ref.voice.size[6], // 16px — ±2 steps (13→16→20)
    radius: sysLight.frame.radius.full,
    paddingX: ref.frame.space[5], // 20px — bumped +1 step for pill breathing room
    paddingY: ref.frame.space[1], // 4px — tight vertical, content-driven sizing
    gap: ref.frame.space[2], // 8px — density-overridden in flow.css
    // Single-value tokens (CSS: set per [data-size], consumed by .flow-chip)
    font: "var(--comp-chip-font)", // → comp-chip-font-{size} via [data-size]
  },
  iconButton: {
    // ── Emphasis-model variants (aligned 1:1 with Button v2) ──

    // HIGH — dark filled (same sys tokens as Button.high)
    bgHigh: sysLight.energy.action.high,
    bgHighHover: sysLight.energy.action.highHover,
    bgHighActive: sysLight.energy.action.highActive,
    iconHigh: sysLight.energy.text.inverse,

    // MEDIUM — outlined with border (same sys tokens as Button.medium)
    bgMedium: sysLight.energy.action.ghost,
    bgMediumHover: sysLight.energy.action.secondaryHover,
    bgMediumActive: sysLight.energy.action.mediumActive,
    iconMedium: sysLight.energy.text.primary,
    borderMedium: sysLight.energy.action.mediumBorder,

    // LOW — ghost bg, subtle icon (tertiary actions in toolbars)
    bgLow: sysLight.energy.action.ghost,
    bgLowHover: sysLight.energy.action.ghostHover,
    bgLowActive: sysLight.energy.action.secondaryHover,
    iconLow: sysLight.energy.text.secondary,

    // OUTLINE — transparent bg, accent icon, strong border
    bgOutline: sysLight.energy.action.ghost,
    bgOutlineHover: sysLight.energy.action.secondaryHover,
    bgOutlineActive: sysLight.energy.action.mediumActive,
    iconOutline: sysLight.energy.text.accent,
    borderOutline: sysLight.energy.border.strong,

    // DANGER — subtle→filled paradigm (same as Button.danger)
    bgDangerSubtle: sysLight.energy.action.destructiveSubtle,
    bgDangerHover: sysLight.energy.action.destructive,
    bgDangerActive: sysLight.energy.action.destructiveActive,
    iconDanger: sysLight.energy.text.danger,
    iconDangerOnFilled: sysLight.energy.text.onAction,

    // DISABLED — all emphasis levels
    bgDisabled: sysLight.energy.state.disabledBg,
    iconDisabled: sysLight.energy.state.disabledText,
    borderDisabled: sysLight.energy.state.disabledBorder,

    // SELECTED — toggle/toolbar active state
    bgSelectedLow: `rgba(${ref.energy.blue["500-rgb"]}, ${ref.state.opacity.selected})`,
    bgSelectedLowHover: `rgba(${ref.energy.blue["500-rgb"]}, 0.16)`,
    iconSelectedLow: sysLight.energy.text.accent,
    bgSelectedMedium: sysLight.energy.action.high,
    iconSelectedMedium: sysLight.energy.text.inverse,
    bgSelectedHigh: sysLight.energy.action.highActive,
    iconSelectedHigh: sysLight.energy.text.inverse,

    // ── Structural ──
    radius: sysLight.frame.radius.control,
    borderWidth: sysLight.frame.border.control, // same as Button.borderWidth
    sizeSm: sysLight.frame.height.controlSm, // 48px — square container
    sizeMd: sysLight.frame.height.controlMd, // 60px
    sizeLg: sysLight.frame.height.controlLg, // 72px
    sizeXl: sysLight.frame.height.controlXl, // 88px
    iconSizeSm: sysLight.icon.size.sm, // 16px
    iconSizeMd: sysLight.icon.size.md, // 20px
    iconSizeLg: sysLight.icon.size.lg, // 24px
    iconSizeXl: sysLight.icon.size.xl, // 32px
  },
  dialog: {
    bg: sysLight.energy.surface.primary,
    shadow: sysLight.depth.elevation.high, // Dialogs → high elevation
    radius: sysLight.frame.radius.container,
    padding: sysLight.frame.padding.container,
    maxWidth: sysLight.frame.content.dialog,
  },
  panel: {
    bg: sysLight.energy.surface.primary,
    border: sysLight.energy.border.default,
    shadow: "none", // Panels → flat by default (border-driven)
    shadowFloating: sysLight.depth.elevation.medium, // Floating/detached panels → medium
    radius: sysLight.frame.radius.container,
    padding: sysLight.frame.padding.container,
  },
  tag: {
    bg: sysLight.energy.surface.tertiary,
    font: ref.voice.size[2], // 11px — density-overridden in flow.css
    radius: sysLight.frame.radius.full,
    paddingX: ref.frame.space[3], // 12px — density-overridden in flow.css
    paddingY: ref.frame.space[1], // 4px
  },
  // ── Avatar — Profile image / initials display ──
  avatar: {
    bg: sysLight.energy.surface.tertiary,
    text: sysLight.energy.text.primary,
    border: sysLight.energy.border.default,
    statusOnline: sysLight.energy.status.success,
    statusOffline: sysLight.energy.text.tertiary,
    statusBusy: sysLight.energy.status.error,
    statusAway: sysLight.energy.status.warning,
    statusRing: sysLight.energy.surface.primary,
    sizeSm: "32px",
    sizeMd: "40px",
    sizeLg: "48px",
    sizeXl: "64px",
    radius: sysLight.frame.radius.full,
    radiusSquare: sysLight.frame.radius.control,
    fontSm: ref.voice.size[3],
    fontMd: ref.voice.size[5],
    fontLg: ref.voice.size[6],
    fontXl: ref.voice.size[8],
    statusSizeSm: "8px",
    statusSizeMd: "10px",
    statusSizeLg: "12px",
    statusSizeXl: "16px",
    statusRingWidth: ref.frame.border.medium,
  },
  // ── Badge — Notification dot / count overlay ──
  badge: {
    bgDefault: sysLight.energy.status.error,
    bgAccent: sysLight.energy.action.primary,
    bgSuccess: sysLight.energy.status.success,
    bgWarning: sysLight.energy.status.warning,
    text: sysLight.energy.text.onAction,
    font: ref.voice.size[1],
    fontWeight: ref.voice.weight.bold,
    radius: sysLight.frame.radius.full,
    minSize: "8px",
    height: "18px",
    paddingX: ref.frame.space[1],
    ring: sysLight.energy.surface.primary,
    ringWidth: ref.frame.border.medium,
  },
  // ── Tabs — Adaptive tab navigation ──
  tabs: {
    bg: ref.energy.transparent,
    borderDefault: sysLight.energy.border.default,
    textDefault: sysLight.energy.text.secondary,
    textActive: sysLight.energy.text.accent,
    textHover: sysLight.energy.text.primary,
    indicator: sysLight.energy.action.primary,
    indicatorHeight: ref.frame.border.indicator,
    filledBg: sysLight.energy.surface.secondary,
    filledActiveBg: sysLight.energy.surface.primary,
    filledActiveShadow: sysLight.depth.elevation.light,
    filledRadius: sysLight.frame.radius.control,
    gap: ref.frame.space[0],
    paddingXSm: ref.frame.space[3],
    paddingXMd: ref.frame.space[4],
    paddingXLg: ref.frame.space[5],
    paddingXXl: ref.frame.space[6],
    heightSm: ref.frame.space[10],
    heightMd: ref.frame.space[11],
    heightLg: ref.frame.space[12],
    heightXl: "56px",
    fontSm: ref.voice.size[4],
    fontMd: ref.voice.size[5],
    fontLg: ref.voice.size[6],
    fontXl: ref.voice.size[7],
  },
  // ── List / ListItem — Content display ──
  list: {
    bg: ref.energy.transparent,
    itemBg: ref.energy.transparent,
    itemBgHover: sysLight.energy.surface.secondary,
    itemBgSelected: `rgba(${ref.energy.blue["500-rgb"]}, ${ref.state.opacity.selected})`,
    itemBgActive: sysLight.energy.surface.tertiary,
    textPrimary: sysLight.energy.text.primary,
    textSecondary: sysLight.energy.text.secondary,
    textTertiary: sysLight.energy.text.tertiary,
    divider: sysLight.energy.border.default,
    itemPaddingY: ref.frame.space[3],
    itemPaddingX: ref.frame.space[4],
    gap: ref.frame.space[0],
    radius: sysLight.frame.radius.control,
    iconSize: ref.icon.size.md,
    avatarSize: "40px",
  },
  // ── Slider — Range input control ──
  slider: {
    trackBg: sysLight.energy.surface.tertiary,
    trackFill: sysLight.energy.action.primary,
    trackFillHover: sysLight.energy.action.primaryHover,
    trackDisabled: sysLight.energy.state.disabledBg,
    thumbBg: sysLight.energy.surface.primary,
    thumbBorder: sysLight.energy.action.primary,
    thumbBorderHover: sysLight.energy.action.primaryHover,
    thumbBorderDisabled: sysLight.energy.state.disabledBorder,
    thumbShadow: sysLight.depth.elevation.light,
    label: sysLight.energy.text.secondary,
    value: sysLight.energy.text.primary,
    trackHeight: "4px",
    trackRadius: sysLight.frame.radius.full,
    thumbSize: "20px",
    thumbRadius: sysLight.frame.radius.full,
    thumbBorderWidth: ref.frame.border.medium,
    focusRingSize: "36px",
    focusRingOpacity: "0.2",
  },
  // ── CircularProgress — Circular loading indicator ──
  circularProgress: {
    trackColor: sysLight.energy.surface.tertiary,
    fillDefault: sysLight.energy.action.primary,
    fillSuccess: sysLight.energy.status.success,
    fillWarning: sysLight.energy.status.warning,
    fillError: sysLight.energy.status.error,
    label: sysLight.energy.text.primary,
    sizeSm: "24px",
    sizeMd: "40px",
    sizeLg: "56px",
    sizeXl: "80px",
    strokeWidth: "4px",
    fontSm: ref.voice.size[1],
    fontMd: ref.voice.size[3],
    fontLg: ref.voice.size[5],
    fontXl: ref.voice.size[7],
  },
  // ── Accordion — Expandable content sections ──
  accordion: {
    bg: sysLight.energy.surface.primary,
    bgHover: sysLight.energy.surface.secondary,
    bgContent: ref.energy.transparent,
    border: sysLight.energy.border.default,
    borderExpanded: sysLight.energy.action.primary,
    text: sysLight.energy.text.primary,
    textSecondary: sysLight.energy.text.secondary,
    icon: sysLight.energy.text.tertiary,
    radius: sysLight.frame.radius.control,
    paddingX: ref.frame.space[5],
    paddingY: ref.frame.space[4],
    contentPaddingX: ref.frame.space[5],
    contentPaddingY: ref.frame.space[4],
    gap: ref.frame.space[0],
    heightSm: ref.frame.space[10],
    heightMd: ref.frame.space[11],
    heightLg: ref.frame.space[12],
    heightXl: "56px",
    fontSm: ref.voice.size[4],
    fontMd: ref.voice.size[5],
    fontLg: ref.voice.size[6],
    fontXl: ref.voice.size[7],
  },
  // ── Breadcrumbs — Navigation trail ──
  breadcrumbs: {
    text: sysLight.energy.text.secondary,
    textHover: sysLight.energy.text.primary,
    textActive: sysLight.energy.text.primary,
    separator: sysLight.energy.text.tertiary,
    font: ref.voice.size[4],
    separatorFont: ref.voice.size[4],
    gap: ref.frame.space[2],
    itemPaddingX: ref.frame.space[1],
    itemPaddingY: ref.frame.space[1],
    itemRadius: ref.frame.radius[1],
  },
  // ── Pagination — Page navigation ──
  pagination: {
    bg: ref.energy.transparent,
    bgHover: sysLight.energy.surface.secondary,
    bgActive: sysLight.energy.action.primary,
    text: sysLight.energy.text.secondary,
    textHover: sysLight.energy.text.primary,
    textActive: sysLight.energy.text.onAction,
    textDisabled: sysLight.energy.state.disabledText,
    border: sysLight.energy.border.default,
    radius: sysLight.frame.radius.control,
    height: "36px",
    minWidth: "36px",
    gap: ref.frame.space[1],
    font: ref.voice.size[4],
    fontWeight: ref.voice.weight.medium,
    navIcon: sysLight.energy.text.secondary,
    navIconDisabled: sysLight.energy.state.disabledText,
  },
  // ── SegmentedControl — Mutually exclusive option selector ──
  segmentedControl: {
    bg: sysLight.energy.surface.secondary,
    bgActive: sysLight.energy.surface.primary,
    bgHover: sysLight.energy.surface.tertiary,
    text: sysLight.energy.text.secondary,
    textActive: sysLight.energy.text.primary,
    shadow: sysLight.depth.elevation.light,
    border: sysLight.energy.border.default,
    radius: sysLight.frame.radius.control,
    padding: ref.frame.space[1],
    gap: ref.frame.space[1],
    heightSm: ref.frame.space[10],
    heightMd: ref.frame.space[11],
    heightLg: ref.frame.space[12],
    heightXl: "56px",
    fontSm: ref.voice.size[4],
    fontMd: ref.voice.size[5],
    fontLg: ref.voice.size[6],
    fontXl: ref.voice.size[7],
    segmentPaddingX: ref.frame.space[4],
  },
  // ── Stepper — Multi-step wizard navigation ──
  stepper: {
    indicatorBg: sysLight.energy.surface.secondary,
    indicatorBgCurrent: sysLight.energy.action.primary,
    indicatorBgComplete: sysLight.energy.action.primary,
    indicatorBgError: sysLight.energy.status.error,
    indicatorBgUpcoming: sysLight.energy.surface.tertiary,
    indicatorText: sysLight.energy.text.secondary,
    indicatorTextActive: sysLight.energy.text.onAction,
    indicatorTextError: sysLight.energy.text.onAction,
    labelText: sysLight.energy.text.primary,
    labelTextSecondary: sysLight.energy.text.secondary,
    labelTextUpcoming: sysLight.energy.text.tertiary,
    connectorDefault: sysLight.energy.border.default,
    connectorComplete: sysLight.energy.action.primary,
    indicatorSizeSm: "28px",
    indicatorSizeMd: "32px",
    indicatorSizeLg: "40px",
    indicatorSizeXl: "48px",
    connectorHeight: ref.frame.border.medium,
    fontSm: ref.voice.size[3],
    fontMd: ref.voice.size[4],
    fontLg: ref.voice.size[5],
    fontXl: ref.voice.size[6],
    labelFontSm: ref.voice.size[3],
    labelFontMd: ref.voice.size[4],
    labelFontLg: ref.voice.size[5],
    labelFontXl: ref.voice.size[6],
    descFontSm: ref.voice.size[1],
    descFontMd: ref.voice.size[2],
    descFontLg: ref.voice.size[3],
    descFontXl: ref.voice.size[4],
    gap: ref.frame.space[3],
  },
  // ── BottomNav — Mobile bottom navigation ──
  bottomNav: {
    bg: sysLight.energy.surface.primary,
    border: sysLight.energy.border.default,
    shadow: sysLight.depth.elevation.medium,
    textDefault: sysLight.energy.text.tertiary,
    textActive: sysLight.energy.action.primary,
    iconDefault: sysLight.energy.text.tertiary,
    iconActive: sysLight.energy.action.primary,
    indicatorBg: `rgba(${ref.energy.blue["500-rgb"]}, ${ref.state.opacity.selected})`,
    badgeBg: sysLight.energy.status.error,
    badgeText: sysLight.energy.text.onAction,
    height: "64px",
    labelFont: ref.voice.size[1],
    iconSize: ref.icon.size.md,
    itemGap: ref.frame.space[1],
    badgeSize: "18px",
    badgeDotSize: "8px",
    badgeFont: ref.voice.size[1],
  },
  // ── FAB — Floating Action Button ──
  fab: {
    bgPrimary: sysLight.energy.action.high,
    bgPrimaryHover: sysLight.energy.action.highHover,
    bgPrimaryActive: sysLight.energy.action.highActive,
    textPrimary: sysLight.energy.text.inverse,
    bgSecondary: sysLight.energy.surface.secondary,
    bgSecondaryHover: sysLight.energy.surface.tertiary,
    textSecondary: sysLight.energy.text.primary,
    bgTertiary: sysLight.energy.surface.primary,
    bgTertiaryHover: sysLight.energy.surface.secondary,
    textTertiary: sysLight.energy.action.primary,
    shadow: sysLight.depth.elevation.medium,
    shadowHover: sysLight.depth.elevation.high,
    radius: sysLight.frame.radius.control,
    sizeSm: "40px",
    sizeMd: "56px",
    sizeLg: "72px",
    paddingX: ref.frame.space[4],
    gap: ref.frame.space[2],
    labelFont: ref.voice.size[5],
    offset: ref.frame.space[4],
  },
  // ── Toolbar — Desktop action bar ──
  toolbar: {
    bg: sysLight.energy.surface.primary,
    border: sysLight.energy.border.default,
    radius: sysLight.frame.radius.control,
    padding: ref.frame.space[2],
    gap: ref.frame.space[1],
    dividerColor: sysLight.energy.border.default,
    dividerWidth: ref.frame.border.thin,
    heightSm: ref.frame.space[10],
    heightMd: ref.frame.space[11],
    heightLg: ref.frame.space[12],
  },
  // ── Popover — Floating positioned content ──
  popover: {
    bg: sysLight.energy.surface.primary,
    border: sysLight.energy.border.default,
    shadow: sysLight.depth.elevation.high,
    radius: sysLight.frame.radius.container,
    padding: ref.frame.space[4],
    maxWidth: "360px",
  },
  // ── BottomSheet — Mobile modal from bottom edge ──
  bottomSheet: {
    bg: sysLight.energy.surface.primary,
    border: sysLight.energy.border.default,
    shadow: sysLight.depth.elevation.high,
    radius: "16px",
    handleBg: sysLight.energy.text.tertiary,
    handleWidth: "40px",
    handleHeight: "4px",
    handleMargin: ref.frame.space[3],
    overlay: ref.depth.overlay.light,
    maxHeight: "90vh",
    padding: ref.frame.space[5],
    headerFont: ref.voice.size[6],
    zIndex: String(ref.depth.zIndex.modal),
  },
  // ── ContextMenu — Right-click positioned menu ──
  contextMenu: {
    bg: sysLight.energy.surface.primary,
    border: sysLight.energy.border.default,
    shadow: sysLight.depth.elevation.high,
    radius: sysLight.frame.radius.container,
    padding: ref.frame.space[1],
    itemPaddingX: ref.frame.space[3],
    itemPaddingY: ref.frame.space[2],
    itemRadius: ref.frame.radius[1],
    itemBgHover: sysLight.energy.surface.secondary,
    itemBgActive: sysLight.energy.surface.tertiary,
    textDefault: sysLight.energy.text.primary,
    textSecondary: sysLight.energy.text.secondary,
    textDanger: sysLight.energy.text.danger,
    textDisabled: sysLight.energy.state.disabledText,
    separator: sysLight.energy.border.default,
    shortcutFont: ref.voice.size[2],
    font: ref.voice.size[4],
    iconSize: ref.icon.size.sm,
    minWidth: "180px",
    maxWidth: "320px",
    zIndex: String(ref.depth.zIndex.dropdown),
  },
  // ── Menu — Dropdown menu component ──
  menu: {
    bg: sysLight.energy.surface.primary,
    border: sysLight.energy.border.default,
    shadow: sysLight.depth.elevation.medium,
    radius: sysLight.frame.radius.container,
    padding: ref.frame.space[1],
    itemPaddingX: ref.frame.space[3],
    itemPaddingY: ref.frame.space[2],
    itemRadius: ref.frame.radius[1],
    itemBgHover: sysLight.energy.surface.secondary,
    itemBgActive: sysLight.energy.surface.tertiary,
    textDefault: sysLight.energy.text.primary,
    textSecondary: sysLight.energy.text.secondary,
    textDanger: sysLight.energy.text.danger,
    textDisabled: sysLight.energy.state.disabledText,
    separator: sysLight.energy.border.default,
    font: ref.voice.size[4],
    iconSize: ref.icon.size.sm,
    checkSize: ref.icon.size.sm,
    minWidth: "160px",
    maxWidth: "320px",
    zIndex: String(ref.depth.zIndex.dropdown),
  },
  // ── ToggleButton — Toggle on/off button ──
  toggleButton: {
    bgOff: sysLight.energy.surface.secondary,
    bgOffHover: sysLight.energy.surface.tertiary,
    bgOn: sysLight.energy.action.primary,
    bgOnHover: sysLight.energy.action.primaryHover,
    textOff: sysLight.energy.text.primary,
    textOn: sysLight.energy.text.onAction,
    border: sysLight.energy.border.default,
    borderOn: sysLight.energy.action.primary,
    bgDisabled: sysLight.energy.state.disabledBg,
    textDisabled: sysLight.energy.state.disabledText,
    borderDisabled: sysLight.energy.state.disabledBorder,
    radius: sysLight.frame.radius.control,
    borderWidth: sysLight.frame.border.control,
    heightSm: sysLight.frame.height.controlSm,
    heightMd: sysLight.frame.height.controlMd,
    heightLg: sysLight.frame.height.controlLg,
    heightXl: sysLight.frame.height.controlXl,
    paddingX: ref.frame.space[4],
    gap: ref.frame.space[2],
    fontSm: ref.voice.size[4],
    fontMd: ref.voice.size[5],
    fontLg: ref.voice.size[6],
    fontXl: ref.voice.size[7],
    groupGap: ref.frame.space[0],
    groupRadius: sysLight.frame.radius.control,
  },
  // ── Search — Desktop search input ──
  search: {
    bg: sysLight.energy.surface.secondary,
    bgFocus: sysLight.energy.surface.primary,
    border: sysLight.energy.border.default,
    borderFocus: sysLight.energy.border.focus,
    text: sysLight.energy.text.primary,
    placeholder: sysLight.energy.text.tertiary,
    icon: sysLight.energy.text.secondary,
    clearIcon: sysLight.energy.text.tertiary,
    clearIconHover: sysLight.energy.text.primary,
    radius: sysLight.frame.radius.full,
    height: sysLight.frame.height.controlMd,
    heightSm: sysLight.frame.height.controlSm,
    heightLg: sysLight.frame.height.controlLg,
    paddingX: ref.frame.space[4],
    font: ref.voice.size[5],
    fontSm: ref.voice.size[4],
    fontLg: ref.voice.size[6],
    iconSize: ref.icon.size.sm,
    shortcutFont: ref.voice.size[2],
    shortcutBg: sysLight.energy.surface.tertiary,
    shortcutBorder: sysLight.energy.border.default,
    shortcutText: sysLight.energy.text.tertiary,
    shortcutRadius: ref.frame.radius[1],
  },
  // ── PullToRefresh — Mobile pull-to-refresh gesture ──
  pullToRefresh: {
    bg: sysLight.energy.surface.primary,
    spinnerColor: sysLight.energy.action.primary,
    spinnerSize: "24px",
    spinnerTrack: sysLight.energy.border.default,
    text: sysLight.energy.text.secondary,
    font: ref.voice.size[3],
    pullMaxHeight: "80px",
    threshold: "64px",
    padding: ref.frame.space[4],
  },
  // ── SwipeActions — Swipeable list item actions ──
  swipeActions: {
    bg: sysLight.energy.surface.primary,
    actionPadding: ref.frame.space[4],
    actionFont: ref.voice.size[3],
    actionIconSize: ref.icon.size.sm,
    dangerBg: sysLight.energy.status.error,
    dangerText: sysLight.energy.text.inverse,
    successBg: sysLight.energy.status.success,
    successText: sysLight.energy.text.inverse,
    warningBg: sysLight.energy.status.warning,
    warningText: sysLight.energy.text.primary,
    defaultBg: sysLight.energy.surface.tertiary,
    defaultText: sysLight.energy.text.primary,
    threshold: "80px",
    maxSwipe: "200px",
  },
  // ── Sidebar — Desktop collapsible navigation ──
  sidebar: {
    bg: sysLight.energy.surface.primary,
    border: sysLight.energy.border.default,
    widthExpanded: sysLight.frame.sidebar.expanded,
    widthCollapsed: sysLight.frame.sidebar.collapsed,
    padding: ref.frame.space[3],
    headerHeight: "56px",
    itemPaddingX: ref.frame.space[3],
    itemPaddingY: ref.frame.space[2],
    itemRadius: ref.frame.radius[2],
    itemBg: "transparent",
    itemBgHover: sysLight.energy.surface.secondary,
    itemBgActive: sysLight.energy.surface.tertiary,
    itemText: sysLight.energy.text.secondary,
    itemTextActive: sysLight.energy.text.primary,
    itemTextHover: sysLight.energy.text.primary,
    itemIconSize: ref.icon.size.sm,
    itemFont: ref.voice.size[4],
    groupLabelFont: ref.voice.size[2],
    groupLabelColor: sysLight.energy.text.tertiary,
    groupMarginTop: ref.frame.space[4],
    divider: sysLight.energy.border.default,
    shadow: sysLight.depth.elevation.light,
    zIndex: String(ref.depth.zIndex.overlay),
    toggleSize: "32px",
    toggleBg: sysLight.energy.surface.primary,
    toggleBorder: sysLight.energy.border.default,
    toggleIcon: sysLight.energy.text.secondary,
  },
  // ── Topbar — Desktop application top bar ──
  topbar: {
    bg: sysLight.energy.surface.primary,
    border: sysLight.energy.border.default,
    height: "56px",
    paddingX: ref.frame.space[5],
    text: sysLight.energy.text.primary,
    textSecondary: sysLight.energy.text.secondary,
    titleFont: ref.voice.size[6],
    shadow: sysLight.depth.elevation.light,
    zIndex: String(ref.depth.zIndex.sticky),
    iconSize: ref.icon.size.md,
    gap: ref.frame.space[3],
    actionGap: ref.frame.space[2],
  },
  // ── Autocomplete — Search with suggestions ──
  autocomplete: {
    bg: sysLight.energy.surface.primary,
    border: sysLight.energy.border.default,
    borderFocus: sysLight.energy.border.focus,
    borderError: sysLight.energy.status.error,
    text: sysLight.energy.text.primary,
    placeholder: sysLight.energy.text.tertiary,
    labelText: sysLight.energy.text.secondary,
    labelFont: ref.voice.size[3],
    font: ref.voice.size[5],
    radius: sysLight.frame.radius.control,
    height: sysLight.frame.height.controlMd,
    heightSm: sysLight.frame.height.controlSm,
    heightLg: sysLight.frame.height.controlLg,
    paddingX: ref.frame.space[3],
    iconSize: ref.icon.size.sm,
    clearIcon: sysLight.energy.text.tertiary,
    clearIconHover: sysLight.energy.text.primary,
    dropdownBg: sysLight.energy.surface.primary,
    dropdownBorder: sysLight.energy.border.default,
    dropdownShadow: sysLight.depth.elevation.medium,
    dropdownRadius: sysLight.frame.radius.container,
    dropdownMaxHeight: "240px",
    dropdownPadding: ref.frame.space[1],
    itemPaddingX: ref.frame.space[3],
    itemPaddingY: ref.frame.space[2],
    itemRadius: ref.frame.radius[1],
    itemBgHover: sysLight.energy.surface.secondary,
    itemBgSelected: sysLight.energy.surface.tertiary,
    itemFont: ref.voice.size[4],
    itemText: sysLight.energy.text.primary,
    itemTextSecondary: sysLight.energy.text.secondary,
    highlightBg: "transparent",
    highlightText: sysLight.energy.action.primary,
    emptyText: sysLight.energy.text.tertiary,
    emptyFont: ref.voice.size[4],
    zIndex: String(ref.depth.zIndex.dropdown),
  },
  // LayoutGrid — consumes sys.frame.grid (density-switchable)
  layoutGrid: {
    lg: {
      columns: sysLight.frame.grid.lg.columns,
      gutter: sysLight.frame.grid.lg.gutter,
      margin: sysLight.frame.grid.lg.margin,
      maxWidth: sysLight.frame.grid.lg.maxWidth,
    },
    md: {
      columns: sysLight.frame.grid.md.columns,
      gutter: sysLight.frame.grid.md.gutter,
      margin: sysLight.frame.grid.md.margin,
    },
    sm: {
      columns: sysLight.frame.grid.sm.columns,
      gutter: sysLight.frame.grid.sm.gutter,
      margin: sysLight.frame.grid.sm.margin,
    },
    zIndex: sysLight.depth.layer.content,
  },
} as const;

export const compDark = {
  button: {
    // ── Emphasis model (high/medium/low/danger) ──

    // HIGH — light filled on dark
    bgHigh: sysDark.energy.action.high,
    bgHighHover: sysDark.energy.action.highHover,
    bgHighActive: sysDark.energy.action.highActive,
    textHigh: sysDark.energy.text.inverse,

    // MEDIUM — outlined (light border on dark)
    bgMedium: sysDark.energy.action.ghost,
    bgMediumHover: sysDark.energy.action.secondaryHover,
    bgMediumActive: sysDark.energy.action.mediumActive,
    textMedium: sysDark.energy.text.primary,
    borderMedium: sysDark.energy.action.mediumBorder,

    // LOW — link button with underline
    bgLow: sysDark.energy.action.ghost,
    textLow: sysDark.energy.text.accent,
    textLowHover: sysDark.energy.text.link,
    textLowActive: sysDark.energy.action.lowActive,

    // OUTLINE — transparent bg, accent text, strong border
    bgOutline: sysDark.energy.action.ghost,
    bgOutlineHover: sysDark.energy.action.secondaryHover,
    bgOutlineActive: sysDark.energy.action.mediumActive,
    textOutline: sysDark.energy.text.accent,
    borderOutline: sysDark.energy.border.strong,

    // DANGER — subtle→filled paradigm
    bgDangerSubtle: sysDark.energy.action.destructiveSubtle,
    bgDangerHover: sysDark.energy.action.destructive,
    bgDangerActive: sysDark.energy.action.destructiveActive,
    textDangerSubtle: sysDark.energy.text.danger,
    textDangerOnFilled: sysDark.energy.text.onAction,

    // DISABLED — explicit colors
    bgDisabled: sysDark.energy.state.disabledBg,
    textDisabled: sysDark.energy.state.disabledText,
    borderDisabled: sysDark.energy.state.disabledBorder,

    // ── Structural ──
    fontSm: ref.voice.size[4], // 13px — ±2 steps in density (11→13→16)
    fontMd: ref.voice.size[5], // 14px — ±2 steps in density (12→14→18)
    fontLg: ref.voice.size[6], // 16px — ±2 steps in density (13→16→20)
    fontXl: ref.voice.size[7], // 18px — ±2 steps in density (14→18→24)
    radius: sysDark.frame.radius.control,
    paddingX: ref.frame.space[3], // D5: 12px — density-overridden in flow.css
    gap: ref.frame.space[2], // 8px — density-overridden in flow.css
    borderWidth: sysDark.frame.border.control, // D7: 1.5px
    heightSm: sysDark.frame.height.controlSm,
    heightMd: sysDark.frame.height.controlMd,
    heightLg: sysDark.frame.height.controlLg,
    heightXl: sysDark.frame.height.controlXl,
    // Single-value tokens (CSS: set per [data-size], consumed by .flow-btn-v2)
    height: "var(--comp-button-height)", // → sys-size-control-height via [data-size]
    font: "var(--comp-button-font)", // → comp-button-font-{size} via [data-size]
  },
  // ── TextInput — Figma Edenred floating-label input (dark remapping) ──
  textInput: {
    // Backgrounds
    bg: sysDark.energy.surface.primary,
    bgPressed: sysDark.energy.surface.tertiary,
    bgDisabled: sysDark.energy.surface.secondary,
    // Border colors (opaque, dark remapping)
    border: sysDark.energy.border.control,
    borderFocus: sysDark.energy.border.focus,
    borderError: sysDark.energy.border.controlError,
    borderDisabled: sysDark.energy.border.controlDisabled,
    // Border widths (structural, via sys.frame.border)
    borderWidth: sysDark.frame.border.control,
    borderWidthActive: sysDark.frame.border.medium,
    // Text colors
    text: sysDark.energy.text.primary,
    label: sysDark.energy.border.control,
    labelDisabled: sysDark.energy.text.secondary,
    placeholder: sysDark.energy.text.tertiary,
    hint: sysDark.energy.border.control,
    hintError: sysDark.energy.border.controlError,
    // Typography — density-responsive via sys-voice where possible
    labelSize: ref.voice.size[9], // 24px — base=xl, exaggerated label spread
    labelSizeFloat: ref.voice.size[4], // 13px — base=xl
    valueSize: ref.voice.size[6], // 16px — base=xl, moderate +1 step curve
    hintSize: ref.voice.size[4], // 13px — base=xl
    // Dimensions (structural, via sys)
    height: sysDark.frame.height.controlXl,
    heightSm: sysDark.frame.height.controlSm,
    heightMd: sysDark.frame.height.controlMd,
    heightLg: sysDark.frame.height.controlLg,
    heightXl: sysDark.frame.height.controlXl,
    radius: sysDark.frame.radius.control,
    padding: ref.frame.space[5], // 20px — base=xl, density-overridden
    paddingSm: ref.frame.space[2],
    paddingMd: ref.frame.space[3],
    paddingLg: ref.frame.space[4],
    paddingXl: ref.frame.space[5],
    gap: ref.frame.space[1],
    contentGap: sysDark.frame.space.micro,
    clearSize: ref.frame.space[12],
    labelSizeSm: ref.voice.size[3], // 12px — exaggerated +2 step label curve
    labelSizeMd: ref.voice.size[5], // 14px
    labelSizeLg: ref.voice.size[7], // 18px
    labelSizeXl: ref.voice.size[9], // 24px
    valueSizeSm: ref.voice.size[3], // 12px — moderate +1 step value curve
    valueSizeMd: ref.voice.size[4], // 13px
    valueSizeLg: ref.voice.size[5], // 14px
    valueSizeXl: ref.voice.size[6], // 16px
    labelSizeFloatSm: ref.voice.size[1],
    labelSizeFloatMd: ref.voice.size[2],
    labelSizeFloatLg: ref.voice.size[3],
    labelSizeFloatXl: ref.voice.size[4],
    hintSizeSm: ref.voice.size[1],
    hintSizeMd: ref.voice.size[2],
    hintSizeLg: ref.voice.size[3],
    hintSizeXl: ref.voice.size[4],
    labelScaleSm: "1.2",
    labelScaleMd: "1.273",
    labelScaleLg: "1.5",
    labelScaleXl: "1.846",
    labelOffsetYSm: "9px",
    labelOffsetYMd: "10px",
    labelOffsetYLg: "10px",
    labelOffsetYXl: "10px",
    inputBottomSm: "4px",
    inputBottomMd: "6px",
    inputBottomLg: "8px",
    inputBottomXl: "10px",
  },
  // ── CountrySelect — dark remapping ──
  countrySelect: {
    chevronColor: sysDark.energy.action.primary,
    chevronDisabled: sysDark.energy.text.tertiary,
  },
  // ── Radio Button — dark remapping (via sys.energy.control) ──
  radio: {
    borderInactive: sysDark.energy.control.borderInactive,
    borderInactivePressed: sysDark.energy.control.borderInactivePressed,
    borderDisabled: sysDark.energy.control.borderDisabled,
    fillActive: sysDark.energy.action.primary,
    fillActivePressed: sysDark.energy.control.fillPressed,
    fillDisabled: sysDark.energy.control.fillDisabled,
    dotColor: sysDark.energy.control.dot,
    stateLayerInactive: sysDark.energy.control.stateLayerInactive,
    stateLayerActive: sysDark.energy.action.primary,
    size: sysDark.frame.size.indicator,
    dotSize: "8px",
    stateLayerSize: sysDark.frame.size.indicatorStateLayer,
    touchTarget: ref.frame.space[12],
    borderWidth: sysDark.frame.border.control,
    borderWidthHover: sysDark.frame.border.medium,
    stateLayerOpacity: "0.2",
    labelFontSize: sysDark.frame.size.labelFont,
  },
  // ── Checkbox — dark remapping (via sys.energy.control) ──
  checkbox: {
    borderInactive: sysDark.energy.control.borderInactive,
    borderInactivePressed: sysDark.energy.control.borderInactivePressed,
    borderDisabled: sysDark.energy.control.borderDisabled,
    fillActive: sysDark.energy.action.primary,
    fillActivePressed: sysDark.energy.control.fillPressed,
    fillDisabled: sysDark.energy.control.fillDisabled,
    iconColor: sysDark.energy.control.dot,
    stateLayerInactive: sysDark.energy.control.stateLayerInactive,
    stateLayerActive: sysDark.energy.action.primary,
    size: sysDark.frame.size.indicator,
    iconSize: "16px",
    radius: sysDark.frame.radius.sm,
    stateLayerSize: sysDark.frame.size.indicatorStateLayer,
    touchTarget: ref.frame.space[12],
    borderWidth: sysDark.frame.border.control,
    borderWidthHover: sysDark.frame.border.medium,
    stateLayerOpacity: "0.2",
    labelFontSize: sysDark.frame.size.labelFont,
  },
  // ── Switch — dark remapping (via sys.energy.switch + sys.energy.control) ──
  switch: {
    trackOff: sysDark.energy.switch.trackOff,
    trackOffHover: sysDark.energy.switch.trackOffHover,
    trackOn: sysDark.energy.action.primary,
    trackOnHover: sysDark.energy.action.primaryHover,
    trackOnPressed: sysDark.energy.control.fillPressed,
    trackDisabled: sysDark.energy.switch.trackDisabled,
    thumbOff: sysDark.energy.switch.thumbOff,
    thumbOn: sysDark.energy.switch.thumbOn,
    thumbDisabled: sysDark.energy.switch.thumbDisabled,
    thumbIconOff: sysDark.energy.control.borderInactive,
    thumbIconOn: sysDark.energy.action.primary,
    thumbIconDisabled: sysDark.energy.switch.thumbIconDisabled,
    stateLayerOff: sysDark.energy.control.stateLayerInactive,
    stateLayerOn: sysDark.energy.action.primary,
    trackWidth: "52px",
    trackHeight: "32px",
    thumbSize: "16px",
    thumbSizePressed: "18px",
    thumbInset: "8px",
    stateLayerSize: "40px",
    stateLayerOpacity: "0.2",
    trackRadius: sysDark.frame.radius.full,
    thumbShadow: sysDark.depth.elevation.light,
  },
  // ── Shared country dropdown (dark remapping) ──
  countryDropdown: {
    bg: sysDark.energy.surface.primary,
    shadow: sysDark.depth.elevation.high,
    radius: sysDark.frame.radius.container,
    maxHeight: "320px",
    itemHover: "var(--sys-state-hover-overlay)",
    itemHeight: "44px",
  },
  card: {
    bgElevated: sysDark.energy.surface.primary,
    bgOutlined: sysDark.energy.surface.primary,
    bgFilled: sysDark.energy.surface.secondary,
    border: sysDark.energy.border.default,
    shadow: sysDark.depth.elevation.light, // Cards → light elevation (dark)
    shadowHover: sysDark.depth.elevation.medium, // Interactive card lift on hover (dark)
    radius: sysDark.frame.radius.container,
    padding: sysDark.frame.padding.container,
  },
  table: {
    cellPaddingY: sysDark.frame.size.tableCellPy, // from sys.size
    cellPaddingX: sysDark.frame.size.tableCellPx,
    fontSize: sysDark.frame.size.tableFont,
    headerFontSize: sysDark.frame.size.tableHeaderFont,
  },
  chip: {
    bg: sysDark.energy.surface.tertiary,
    bgSelected: `rgba(${ref.energy.blue["200-rgb"]}, ${ref.state.opacity.selected})`,
    text: sysDark.energy.text.primary,
    textSelected: sysDark.energy.text.accent,
    fontSm: ref.voice.size[3], // 12px — ±2 steps in density (10→12→14)
    fontMd: ref.voice.size[4], // 13px — ±2 steps in density (11→13→16)
    fontLg: ref.voice.size[5], // 14px — ±2 steps in density (12→14→18)
    fontXl: ref.voice.size[6], // 16px — ±2 steps in density (13→16→20)
    radius: sysDark.frame.radius.full,
    paddingX: ref.frame.space[5], // 20px — bumped +1 step for pill breathing room
    paddingY: ref.frame.space[1], // 4px — tight vertical, content-driven sizing
    gap: ref.frame.space[2], // density-overridden in flow.css
    // Single-value tokens (CSS: set per [data-size], consumed by .flow-chip)
    font: "var(--comp-chip-font)", // → comp-chip-font-{size} via [data-size]
  },
  iconButton: {
    // ── Emphasis-model variants (aligned 1:1 with Button v2) ──

    // HIGH — light filled on dark (same sys tokens as Button.high)
    bgHigh: sysDark.energy.action.high,
    bgHighHover: sysDark.energy.action.highHover,
    bgHighActive: sysDark.energy.action.highActive,
    iconHigh: sysDark.energy.text.inverse,

    // MEDIUM — outlined with border (same sys tokens as Button.medium)
    bgMedium: sysDark.energy.action.ghost,
    bgMediumHover: sysDark.energy.action.secondaryHover,
    bgMediumActive: sysDark.energy.action.mediumActive,
    iconMedium: sysDark.energy.text.primary,
    borderMedium: sysDark.energy.action.mediumBorder,

    // LOW — ghost bg, subtle icon (tertiary actions in toolbars)
    bgLow: sysDark.energy.action.ghost,
    bgLowHover: sysDark.energy.action.ghostHover,
    bgLowActive: sysDark.energy.action.secondaryHover,
    iconLow: sysDark.energy.text.secondary,

    // OUTLINE — transparent bg, accent icon, strong border
    bgOutline: sysDark.energy.action.ghost,
    bgOutlineHover: sysDark.energy.action.secondaryHover,
    bgOutlineActive: sysDark.energy.action.mediumActive,
    iconOutline: sysDark.energy.text.accent,
    borderOutline: sysDark.energy.border.strong,

    // DANGER — subtle→filled paradigm (same as Button.danger)
    bgDangerSubtle: sysDark.energy.action.destructiveSubtle,
    bgDangerHover: sysDark.energy.action.destructive,
    bgDangerActive: sysDark.energy.action.destructiveActive,
    iconDanger: sysDark.energy.text.danger,
    iconDangerOnFilled: sysDark.energy.text.onAction,

    // DISABLED — all emphasis levels
    bgDisabled: sysDark.energy.state.disabledBg,
    iconDisabled: sysDark.energy.state.disabledText,
    borderDisabled: sysDark.energy.state.disabledBorder,

    // SELECTED — toggle/toolbar active state
    bgSelectedLow: `rgba(${ref.energy.blue["200-rgb"]}, ${ref.state.opacity.selected})`,
    bgSelectedLowHover: `rgba(${ref.energy.blue["200-rgb"]}, 0.16)`,
    iconSelectedLow: sysDark.energy.text.accent,
    bgSelectedMedium: sysDark.energy.action.high,
    iconSelectedMedium: sysDark.energy.text.inverse,
    bgSelectedHigh: sysDark.energy.action.highActive,
    iconSelectedHigh: sysDark.energy.text.inverse,

    // ── Structural ──
    radius: sysDark.frame.radius.control,
    borderWidth: sysDark.frame.border.control,
    sizeSm: sysDark.frame.height.controlSm,
    sizeMd: sysDark.frame.height.controlMd,
    sizeLg: sysDark.frame.height.controlLg,
    sizeXl: sysDark.frame.height.controlXl,
    iconSizeSm: sysDark.icon.size.sm,
    iconSizeMd: sysDark.icon.size.md,
    iconSizeLg: sysDark.icon.size.lg,
    iconSizeXl: sysDark.icon.size.xl,
  },
  dialog: {
    bg: sysDark.energy.surface.primary,
    shadow: sysDark.depth.elevation.high, // Dialogs → high elevation (dark)
    radius: sysDark.frame.radius.container,
    padding: sysDark.frame.padding.container,
    maxWidth: sysDark.frame.content.dialog,
  },
  panel: {
    bg: sysDark.energy.surface.primary,
    border: sysDark.energy.border.default,
    shadow: "none", // Panels → flat by default
    shadowFloating: sysDark.depth.elevation.medium, // Floating/detached panels → medium (dark)
    radius: sysDark.frame.radius.container,
    padding: sysDark.frame.padding.container,
  },
  tag: {
    bg: sysDark.energy.surface.tertiary,
    font: ref.voice.size[2], // 11px — density-overridden in flow.css
    radius: sysDark.frame.radius.full,
    paddingX: ref.frame.space[3], // density-overridden in flow.css
    paddingY: ref.frame.space[1],
  },
  avatar: {
    bg: sysDark.energy.surface.tertiary,
    text: sysDark.energy.text.primary,
    border: sysDark.energy.border.default,
    statusOnline: sysDark.energy.status.success,
    statusOffline: sysDark.energy.text.tertiary,
    statusBusy: sysDark.energy.status.error,
    statusAway: sysDark.energy.status.warning,
    statusRing: sysDark.energy.surface.primary,
    sizeSm: "32px",
    sizeMd: "40px",
    sizeLg: "48px",
    sizeXl: "64px",
    radius: sysDark.frame.radius.full,
    radiusSquare: sysDark.frame.radius.control,
    fontSm: ref.voice.size[3],
    fontMd: ref.voice.size[5],
    fontLg: ref.voice.size[6],
    fontXl: ref.voice.size[8],
    statusSizeSm: "8px",
    statusSizeMd: "10px",
    statusSizeLg: "12px",
    statusSizeXl: "16px",
    statusRingWidth: ref.frame.border.medium,
  },
  badge: {
    bgDefault: sysDark.energy.status.error,
    bgAccent: sysDark.energy.action.primary,
    bgSuccess: sysDark.energy.status.success,
    bgWarning: sysDark.energy.status.warning,
    text: sysDark.energy.text.onAction,
    font: ref.voice.size[1],
    fontWeight: ref.voice.weight.bold,
    radius: sysDark.frame.radius.full,
    minSize: "8px",
    height: "18px",
    paddingX: ref.frame.space[1],
    ring: sysDark.energy.surface.primary,
    ringWidth: ref.frame.border.medium,
  },
  tabs: {
    bg: ref.energy.transparent,
    borderDefault: sysDark.energy.border.default,
    textDefault: sysDark.energy.text.secondary,
    textActive: sysDark.energy.text.accent,
    textHover: sysDark.energy.text.primary,
    indicator: sysDark.energy.action.primary,
    indicatorHeight: ref.frame.border.indicator,
    filledBg: sysDark.energy.surface.secondary,
    filledActiveBg: sysDark.energy.surface.primary,
    filledActiveShadow: sysDark.depth.elevation.light,
    filledRadius: sysDark.frame.radius.control,
    gap: ref.frame.space[0],
    paddingXSm: ref.frame.space[3],
    paddingXMd: ref.frame.space[4],
    paddingXLg: ref.frame.space[5],
    paddingXXl: ref.frame.space[6],
    heightSm: ref.frame.space[10],
    heightMd: ref.frame.space[11],
    heightLg: ref.frame.space[12],
    heightXl: "56px",
    fontSm: ref.voice.size[4],
    fontMd: ref.voice.size[5],
    fontLg: ref.voice.size[6],
    fontXl: ref.voice.size[7],
  },
  list: {
    bg: ref.energy.transparent,
    itemBg: ref.energy.transparent,
    itemBgHover: sysDark.energy.surface.secondary,
    itemBgSelected: `rgba(${ref.energy.blue["200-rgb"]}, ${ref.state.opacity.selected})`,
    itemBgActive: sysDark.energy.surface.tertiary,
    textPrimary: sysDark.energy.text.primary,
    textSecondary: sysDark.energy.text.secondary,
    textTertiary: sysDark.energy.text.tertiary,
    divider: sysDark.energy.border.default,
    itemPaddingY: ref.frame.space[3],
    itemPaddingX: ref.frame.space[4],
    gap: ref.frame.space[0],
    radius: sysDark.frame.radius.control,
    iconSize: ref.icon.size.md,
    avatarSize: "40px",
  },
  slider: {
    trackBg: sysDark.energy.surface.tertiary,
    trackFill: sysDark.energy.action.primary,
    trackFillHover: sysDark.energy.action.primaryHover,
    trackDisabled: sysDark.energy.state.disabledBg,
    thumbBg: sysDark.energy.surface.primary,
    thumbBorder: sysDark.energy.action.primary,
    thumbBorderHover: sysDark.energy.action.primaryHover,
    thumbBorderDisabled: sysDark.energy.state.disabledBorder,
    thumbShadow: sysDark.depth.elevation.light,
    label: sysDark.energy.text.secondary,
    value: sysDark.energy.text.primary,
    trackHeight: "4px",
    trackRadius: sysDark.frame.radius.full,
    thumbSize: "20px",
    thumbRadius: sysDark.frame.radius.full,
    thumbBorderWidth: ref.frame.border.medium,
    focusRingSize: "36px",
    focusRingOpacity: "0.2",
  },
  circularProgress: {
    trackColor: sysDark.energy.surface.tertiary,
    fillDefault: sysDark.energy.action.primary,
    fillSuccess: sysDark.energy.status.success,
    fillWarning: sysDark.energy.status.warning,
    fillError: sysDark.energy.status.error,
    label: sysDark.energy.text.primary,
    sizeSm: "24px",
    sizeMd: "40px",
    sizeLg: "56px",
    sizeXl: "80px",
    strokeWidth: "4px",
    fontSm: ref.voice.size[1],
    fontMd: ref.voice.size[3],
    fontLg: ref.voice.size[5],
    fontXl: ref.voice.size[7],
  },
  // ── Accordion — dark remapping ──
  accordion: {
    bg: sysDark.energy.surface.primary,
    bgHover: sysDark.energy.surface.secondary,
    bgContent: ref.energy.transparent,
    border: sysDark.energy.border.default,
    borderExpanded: sysDark.energy.action.primary,
    text: sysDark.energy.text.primary,
    textSecondary: sysDark.energy.text.secondary,
    icon: sysDark.energy.text.tertiary,
    radius: sysDark.frame.radius.control,
    paddingX: ref.frame.space[5],
    paddingY: ref.frame.space[4],
    contentPaddingX: ref.frame.space[5],
    contentPaddingY: ref.frame.space[4],
    gap: ref.frame.space[0],
    heightSm: ref.frame.space[10],
    heightMd: ref.frame.space[11],
    heightLg: ref.frame.space[12],
    heightXl: "56px",
    fontSm: ref.voice.size[4],
    fontMd: ref.voice.size[5],
    fontLg: ref.voice.size[6],
    fontXl: ref.voice.size[7],
  },
  // ── Breadcrumbs — dark remapping ──
  breadcrumbs: {
    text: sysDark.energy.text.secondary,
    textHover: sysDark.energy.text.primary,
    textActive: sysDark.energy.text.primary,
    separator: sysDark.energy.text.tertiary,
    font: ref.voice.size[4],
    separatorFont: ref.voice.size[4],
    gap: ref.frame.space[2],
    itemPaddingX: ref.frame.space[1],
    itemPaddingY: ref.frame.space[1],
    itemRadius: ref.frame.radius[1],
  },
  // ── Pagination — dark remapping ──
  pagination: {
    bg: ref.energy.transparent,
    bgHover: sysDark.energy.surface.secondary,
    bgActive: sysDark.energy.action.primary,
    text: sysDark.energy.text.secondary,
    textHover: sysDark.energy.text.primary,
    textActive: sysDark.energy.text.onAction,
    textDisabled: sysDark.energy.state.disabledText,
    border: sysDark.energy.border.default,
    radius: sysDark.frame.radius.control,
    height: "36px",
    minWidth: "36px",
    gap: ref.frame.space[1],
    font: ref.voice.size[4],
    fontWeight: ref.voice.weight.medium,
    navIcon: sysDark.energy.text.secondary,
    navIconDisabled: sysDark.energy.state.disabledText,
  },
  // ── SegmentedControl — dark remapping ──
  segmentedControl: {
    bg: sysDark.energy.surface.secondary,
    bgActive: sysDark.energy.surface.primary,
    bgHover: sysDark.energy.surface.tertiary,
    text: sysDark.energy.text.secondary,
    textActive: sysDark.energy.text.primary,
    shadow: sysDark.depth.elevation.light,
    border: sysDark.energy.border.default,
    radius: sysDark.frame.radius.control,
    padding: ref.frame.space[1],
    gap: ref.frame.space[1],
    heightSm: ref.frame.space[10],
    heightMd: ref.frame.space[11],
    heightLg: ref.frame.space[12],
    heightXl: "56px",
    fontSm: ref.voice.size[4],
    fontMd: ref.voice.size[5],
    fontLg: ref.voice.size[6],
    fontXl: ref.voice.size[7],
    segmentPaddingX: ref.frame.space[4],
  },
  // ── Stepper — dark remapping ──
  stepper: {
    indicatorBg: sysDark.energy.surface.secondary,
    indicatorBgCurrent: sysDark.energy.action.primary,
    indicatorBgComplete: sysDark.energy.action.primary,
    indicatorBgError: sysDark.energy.status.error,
    indicatorBgUpcoming: sysDark.energy.surface.tertiary,
    indicatorText: sysDark.energy.text.secondary,
    indicatorTextActive: sysDark.energy.text.onAction,
    indicatorTextError: sysDark.energy.text.onAction,
    labelText: sysDark.energy.text.primary,
    labelTextSecondary: sysDark.energy.text.secondary,
    labelTextUpcoming: sysDark.energy.text.tertiary,
    connectorDefault: sysDark.energy.border.default,
    connectorComplete: sysDark.energy.action.primary,
    indicatorSizeSm: "28px",
    indicatorSizeMd: "32px",
    indicatorSizeLg: "40px",
    indicatorSizeXl: "48px",
    connectorHeight: ref.frame.border.medium,
    fontSm: ref.voice.size[3],
    fontMd: ref.voice.size[4],
    fontLg: ref.voice.size[5],
    fontXl: ref.voice.size[6],
    labelFontSm: ref.voice.size[3],
    labelFontMd: ref.voice.size[4],
    labelFontLg: ref.voice.size[5],
    labelFontXl: ref.voice.size[6],
    descFontSm: ref.voice.size[1],
    descFontMd: ref.voice.size[2],
    descFontLg: ref.voice.size[3],
    descFontXl: ref.voice.size[4],
    gap: ref.frame.space[3],
  },
  // ── BottomNav — dark remapping ──
  bottomNav: {
    bg: sysDark.energy.surface.primary,
    border: sysDark.energy.border.default,
    shadow: sysDark.depth.elevation.medium,
    textDefault: sysDark.energy.text.tertiary,
    textActive: sysDark.energy.action.primary,
    iconDefault: sysDark.energy.text.tertiary,
    iconActive: sysDark.energy.action.primary,
    indicatorBg: `rgba(${ref.energy.blue["200-rgb"]}, ${ref.state.opacity.selected})`,
    badgeBg: sysDark.energy.status.error,
    badgeText: sysDark.energy.text.onAction,
    height: "64px",
    labelFont: ref.voice.size[1],
    iconSize: ref.icon.size.md,
    itemGap: ref.frame.space[1],
    badgeSize: "18px",
    badgeDotSize: "8px",
    badgeFont: ref.voice.size[1],
  },
  // ── FAB — dark remapping ──
  fab: {
    bgPrimary: sysDark.energy.action.high,
    bgPrimaryHover: sysDark.energy.action.highHover,
    bgPrimaryActive: sysDark.energy.action.highActive,
    textPrimary: sysDark.energy.text.inverse,
    bgSecondary: sysDark.energy.surface.secondary,
    bgSecondaryHover: sysDark.energy.surface.tertiary,
    textSecondary: sysDark.energy.text.primary,
    bgTertiary: sysDark.energy.surface.primary,
    bgTertiaryHover: sysDark.energy.surface.secondary,
    textTertiary: sysDark.energy.action.primary,
    shadow: sysDark.depth.elevation.medium,
    shadowHover: sysDark.depth.elevation.high,
    radius: sysDark.frame.radius.control,
    sizeSm: "40px",
    sizeMd: "56px",
    sizeLg: "72px",
    paddingX: ref.frame.space[4],
    gap: ref.frame.space[2],
    labelFont: ref.voice.size[5],
    offset: ref.frame.space[4],
  },
  // ── Toolbar — dark remapping ──
  toolbar: {
    bg: sysDark.energy.surface.primary,
    border: sysDark.energy.border.default,
    radius: sysDark.frame.radius.control,
    padding: ref.frame.space[2],
    gap: ref.frame.space[1],
    dividerColor: sysDark.energy.border.default,
    dividerWidth: ref.frame.border.thin,
    heightSm: ref.frame.space[10],
    heightMd: ref.frame.space[11],
    heightLg: ref.frame.space[12],
  },
  // ── Popover — dark remapping ──
  popover: {
    bg: sysDark.energy.surface.primary,
    border: sysDark.energy.border.default,
    shadow: sysDark.depth.elevation.high,
    radius: sysDark.frame.radius.container,
    padding: ref.frame.space[4],
    maxWidth: "360px",
  },
  // ── BottomSheet — dark remapping ──
  bottomSheet: {
    bg: sysDark.energy.surface.primary,
    border: sysDark.energy.border.default,
    shadow: sysDark.depth.elevation.high,
    radius: "16px",
    handleBg: sysDark.energy.text.tertiary,
    handleWidth: "40px",
    handleHeight: "4px",
    handleMargin: ref.frame.space[3],
    overlay: ref.depth.overlay.dark,
    maxHeight: "90vh",
    padding: ref.frame.space[5],
    headerFont: ref.voice.size[6],
    zIndex: String(ref.depth.zIndex.modal),
  },
  // ── ContextMenu — dark remapping ──
  contextMenu: {
    bg: sysDark.energy.surface.primary,
    border: sysDark.energy.border.default,
    shadow: sysDark.depth.elevation.high,
    radius: sysDark.frame.radius.container,
    padding: ref.frame.space[1],
    itemPaddingX: ref.frame.space[3],
    itemPaddingY: ref.frame.space[2],
    itemRadius: ref.frame.radius[1],
    itemBgHover: sysDark.energy.surface.secondary,
    itemBgActive: sysDark.energy.surface.tertiary,
    textDefault: sysDark.energy.text.primary,
    textSecondary: sysDark.energy.text.secondary,
    textDanger: sysDark.energy.text.danger,
    textDisabled: sysDark.energy.state.disabledText,
    separator: sysDark.energy.border.default,
    shortcutFont: ref.voice.size[2],
    font: ref.voice.size[4],
    iconSize: ref.icon.size.sm,
    minWidth: "180px",
    maxWidth: "320px",
    zIndex: String(ref.depth.zIndex.dropdown),
  },
  // ── Menu — dark remapping ──
  menu: {
    bg: sysDark.energy.surface.primary,
    border: sysDark.energy.border.default,
    shadow: sysDark.depth.elevation.medium,
    radius: sysDark.frame.radius.container,
    padding: ref.frame.space[1],
    itemPaddingX: ref.frame.space[3],
    itemPaddingY: ref.frame.space[2],
    itemRadius: ref.frame.radius[1],
    itemBgHover: sysDark.energy.surface.secondary,
    itemBgActive: sysDark.energy.surface.tertiary,
    textDefault: sysDark.energy.text.primary,
    textSecondary: sysDark.energy.text.secondary,
    textDanger: sysDark.energy.text.danger,
    textDisabled: sysDark.energy.state.disabledText,
    separator: sysDark.energy.border.default,
    font: ref.voice.size[4],
    iconSize: ref.icon.size.sm,
    checkSize: ref.icon.size.sm,
    minWidth: "160px",
    maxWidth: "320px",
    zIndex: String(ref.depth.zIndex.dropdown),
  },
  // ── ToggleButton — dark remapping ──
  toggleButton: {
    bgOff: sysDark.energy.surface.secondary,
    bgOffHover: sysDark.energy.surface.tertiary,
    bgOn: sysDark.energy.action.primary,
    bgOnHover: sysDark.energy.action.primaryHover,
    textOff: sysDark.energy.text.primary,
    textOn: sysDark.energy.text.onAction,
    border: sysDark.energy.border.default,
    borderOn: sysDark.energy.action.primary,
    bgDisabled: sysDark.energy.state.disabledBg,
    textDisabled: sysDark.energy.state.disabledText,
    borderDisabled: sysDark.energy.state.disabledBorder,
    radius: sysDark.frame.radius.control,
    borderWidth: sysDark.frame.border.control,
    heightSm: sysDark.frame.height.controlSm,
    heightMd: sysDark.frame.height.controlMd,
    heightLg: sysDark.frame.height.controlLg,
    heightXl: sysDark.frame.height.controlXl,
    paddingX: ref.frame.space[4],
    gap: ref.frame.space[2],
    fontSm: ref.voice.size[4],
    fontMd: ref.voice.size[5],
    fontLg: ref.voice.size[6],
    fontXl: ref.voice.size[7],
    groupGap: ref.frame.space[0],
    groupRadius: sysDark.frame.radius.control,
  },
  // ── Search — dark remapping ──
  search: {
    bg: sysDark.energy.surface.secondary,
    bgFocus: sysDark.energy.surface.primary,
    border: sysDark.energy.border.default,
    borderFocus: sysDark.energy.border.focus,
    text: sysDark.energy.text.primary,
    placeholder: sysDark.energy.text.tertiary,
    icon: sysDark.energy.text.secondary,
    clearIcon: sysDark.energy.text.tertiary,
    clearIconHover: sysDark.energy.text.primary,
    radius: sysDark.frame.radius.full,
    height: sysDark.frame.height.controlMd,
    heightSm: sysDark.frame.height.controlSm,
    heightLg: sysDark.frame.height.controlLg,
    paddingX: ref.frame.space[4],
    font: ref.voice.size[5],
    fontSm: ref.voice.size[4],
    fontLg: ref.voice.size[6],
    iconSize: ref.icon.size.sm,
    shortcutFont: ref.voice.size[2],
    shortcutBg: sysDark.energy.surface.tertiary,
    shortcutBorder: sysDark.energy.border.default,
    shortcutText: sysDark.energy.text.tertiary,
    shortcutRadius: ref.frame.radius[1],
  },
  // ── PullToRefresh — dark remapping ──
  pullToRefresh: {
    bg: sysDark.energy.surface.primary,
    spinnerColor: sysDark.energy.action.primary,
    spinnerSize: "24px",
    spinnerTrack: sysDark.energy.border.default,
    text: sysDark.energy.text.secondary,
    font: ref.voice.size[3],
    pullMaxHeight: "80px",
    threshold: "64px",
    padding: ref.frame.space[4],
  },
  // ── SwipeActions — dark remapping ──
  swipeActions: {
    bg: sysDark.energy.surface.primary,
    actionPadding: ref.frame.space[4],
    actionFont: ref.voice.size[3],
    actionIconSize: ref.icon.size.sm,
    dangerBg: sysDark.energy.status.error,
    dangerText: sysDark.energy.text.inverse,
    successBg: sysDark.energy.status.success,
    successText: sysDark.energy.text.inverse,
    warningBg: sysDark.energy.status.warning,
    warningText: sysDark.energy.text.primary,
    defaultBg: sysDark.energy.surface.tertiary,
    defaultText: sysDark.energy.text.primary,
    threshold: "80px",
    maxSwipe: "200px",
  },
  // ── Sidebar — dark remapping ──
  sidebar: {
    bg: sysDark.energy.surface.primary,
    border: sysDark.energy.border.default,
    widthExpanded: sysDark.frame.sidebar.expanded,
    widthCollapsed: sysDark.frame.sidebar.collapsed,
    padding: ref.frame.space[3],
    headerHeight: "56px",
    itemPaddingX: ref.frame.space[3],
    itemPaddingY: ref.frame.space[2],
    itemRadius: ref.frame.radius[2],
    itemBg: "transparent",
    itemBgHover: sysDark.energy.surface.secondary,
    itemBgActive: sysDark.energy.surface.tertiary,
    itemText: sysDark.energy.text.secondary,
    itemTextActive: sysDark.energy.text.primary,
    itemTextHover: sysDark.energy.text.primary,
    itemIconSize: ref.icon.size.sm,
    itemFont: ref.voice.size[4],
    groupLabelFont: ref.voice.size[2],
    groupLabelColor: sysDark.energy.text.tertiary,
    groupMarginTop: ref.frame.space[4],
    divider: sysDark.energy.border.default,
    shadow: sysDark.depth.elevation.light,
    zIndex: String(ref.depth.zIndex.overlay),
    toggleSize: "32px",
    toggleBg: sysDark.energy.surface.primary,
    toggleBorder: sysDark.energy.border.default,
    toggleIcon: sysDark.energy.text.secondary,
  },
  // ── Topbar — dark remapping ──
  topbar: {
    bg: sysDark.energy.surface.primary,
    border: sysDark.energy.border.default,
    height: "56px",
    paddingX: ref.frame.space[5],
    text: sysDark.energy.text.primary,
    textSecondary: sysDark.energy.text.secondary,
    titleFont: ref.voice.size[6],
    shadow: sysDark.depth.elevation.light,
    zIndex: String(ref.depth.zIndex.sticky),
    iconSize: ref.icon.size.md,
    gap: ref.frame.space[3],
    actionGap: ref.frame.space[2],
  },
  // ── Autocomplete — dark remapping ──
  autocomplete: {
    bg: sysDark.energy.surface.primary,
    border: sysDark.energy.border.default,
    borderFocus: sysDark.energy.border.focus,
    borderError: sysDark.energy.status.error,
    text: sysDark.energy.text.primary,
    placeholder: sysDark.energy.text.tertiary,
    labelText: sysDark.energy.text.secondary,
    labelFont: ref.voice.size[3],
    font: ref.voice.size[5],
    radius: sysDark.frame.radius.control,
    height: sysDark.frame.height.controlMd,
    heightSm: sysDark.frame.height.controlSm,
    heightLg: sysDark.frame.height.controlLg,
    paddingX: ref.frame.space[3],
    iconSize: ref.icon.size.sm,
    clearIcon: sysDark.energy.text.tertiary,
    clearIconHover: sysDark.energy.text.primary,
    dropdownBg: sysDark.energy.surface.primary,
    dropdownBorder: sysDark.energy.border.default,
    dropdownShadow: sysDark.depth.elevation.medium,
    dropdownRadius: sysDark.frame.radius.container,
    dropdownMaxHeight: "240px",
    dropdownPadding: ref.frame.space[1],
    itemPaddingX: ref.frame.space[3],
    itemPaddingY: ref.frame.space[2],
    itemRadius: ref.frame.radius[1],
    itemBgHover: sysDark.energy.surface.secondary,
    itemBgSelected: sysDark.energy.surface.tertiary,
    itemFont: ref.voice.size[4],
    itemText: sysDark.energy.text.primary,
    itemTextSecondary: sysDark.energy.text.secondary,
    highlightBg: "transparent",
    highlightText: sysDark.energy.action.primary,
    emptyText: sysDark.energy.text.tertiary,
    emptyFont: ref.voice.size[4],
    zIndex: String(ref.depth.zIndex.dropdown),
  },
  // LayoutGrid — consumes sys.frame.grid (density-switchable)
  layoutGrid: {
    lg: {
      columns: sysDark.frame.grid.lg.columns,
      gutter: sysDark.frame.grid.lg.gutter,
      margin: sysDark.frame.grid.lg.margin,
      maxWidth: sysDark.frame.grid.lg.maxWidth,
    },
    md: {
      columns: sysDark.frame.grid.md.columns,
      gutter: sysDark.frame.grid.md.gutter,
      margin: sysDark.frame.grid.md.margin,
    },
    sm: {
      columns: sysDark.frame.grid.sm.columns,
      gutter: sysDark.frame.grid.sm.gutter,
      margin: sysDark.frame.grid.sm.margin,
    },
    zIndex: sysDark.depth.layer.content,
  },
} as const;

// Foundation identity colors — all reference ref tokens, zero hardcoded hex
export const foundationColors: Record<string, string> = {
  energy: ref.energy.blue[500],
  voice: ref.energy.green[500],
  frame: ref.energy.orange[500],
  depth: ref.energy.purple[500],
  momentum: ref.energy.red[500],
  state: ref.energy.teal[500],
  tone: ref.energy.olive[500],
  growth: ref.energy.purple[700],
  symbol: ref.energy.green[700],
  iconography: ref.energy.teal[700],
} as const;
