import { ref } from "./tokens.ref.ts";
import { sysDark, sysLight } from "./tokens.sys.ts";

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
