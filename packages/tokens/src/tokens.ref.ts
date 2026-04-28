import { _contentMax, _space } from "./_scales.ts";

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
