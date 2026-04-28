import { ref } from "./tokens.ref.ts";

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
      secondary: ref.energy.neutral[600],
      tertiary: ref.energy.neutral[500],
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
      tertiary: ref.energy.neutral[500], // Subtle/decorative icons — neutral-500 for WCAG AA
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
