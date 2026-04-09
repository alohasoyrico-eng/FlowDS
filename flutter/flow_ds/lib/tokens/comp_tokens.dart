/// FLOW Design System — Component Tokens (Layer 3)
///
/// 40 immutable data classes + FlowCompTokens ThemeExtension aggregate.
/// Each inner class holds Color, double, List<BoxShadow>, or FontWeight fields
/// that map from sys/ref tokens into concrete component styling.
///
/// Architecture: ref -> sys -> comp
///   comp = Per-component semantic aliases consumed by widgets.

import 'package:flutter/material.dart';

import 'ref_tokens.dart';
import 'sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  1. FlowCompButton
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompButton {
  // ── HIGH emphasis — dark filled ──
  final Color bgHigh;
  final Color bgHighHover;
  final Color bgHighActive;
  final Color textHigh;

  // ── MEDIUM emphasis — outlined ──
  final Color bgMedium;
  final Color bgMediumHover;
  final Color bgMediumActive;
  final Color textMedium;
  final Color borderMedium;

  // ── LOW emphasis — link / ghost ──
  final Color bgLow;
  final Color textLow;
  final Color textLowHover;
  final Color textLowActive;

  // ── OUTLINE emphasis — transparent bg, accent text ──
  final Color bgOutline;
  final Color bgOutlineHover;
  final Color bgOutlineActive;
  final Color textOutline;
  final Color borderOutline;

  // ── DANGER — subtle-to-filled ──
  final Color bgDangerSubtle;
  final Color bgDangerHover;
  final Color bgDangerActive;
  final Color textDangerSubtle;
  final Color textDangerOnFilled;

  // ── DISABLED ──
  final Color bgDisabled;
  final Color textDisabled;
  final Color borderDisabled;

  // ── Structural ──
  final double radius;
  final double fontSm;
  final double fontMd;
  final double fontLg;
  final double fontXl;
  final double paddingX;
  final double gap;
  final double borderWidth;
  final double heightSm;
  final double heightMd;
  final double heightLg;
  final double heightXl;

  const FlowCompButton({
    required this.bgHigh,
    required this.bgHighHover,
    required this.bgHighActive,
    required this.textHigh,
    required this.bgMedium,
    required this.bgMediumHover,
    required this.bgMediumActive,
    required this.textMedium,
    required this.borderMedium,
    required this.bgLow,
    required this.textLow,
    required this.textLowHover,
    required this.textLowActive,
    required this.bgOutline,
    required this.bgOutlineHover,
    required this.bgOutlineActive,
    required this.textOutline,
    required this.borderOutline,
    required this.bgDangerSubtle,
    required this.bgDangerHover,
    required this.bgDangerActive,
    required this.textDangerSubtle,
    required this.textDangerOnFilled,
    required this.bgDisabled,
    required this.textDisabled,
    required this.borderDisabled,
    required this.radius,
    required this.fontSm,
    required this.fontMd,
    required this.fontLg,
    required this.fontXl,
    required this.paddingX,
    required this.gap,
    required this.borderWidth,
    required this.heightSm,
    required this.heightMd,
    required this.heightLg,
    required this.heightXl,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  2. FlowCompTextInput
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompTextInput {
  // ── Background ──
  final Color bg;
  final Color bgPressed;
  final Color bgDisabled;

  // ── Border colors ──
  final Color border;
  final Color borderFocus;
  final Color borderError;
  final Color borderDisabled;

  // ── Border widths ──
  final double borderWidth;
  final double borderWidthActive;

  // ── Text colors ──
  final Color text;
  final Color label;
  final Color labelDisabled;
  final Color placeholder;
  final Color hint;
  final Color hintError;

  // ── Typography — base (xl) sizes ──
  final double labelSize;
  final double labelSizeFloat;
  final double valueSize;
  final double hintSize;

  // ── Per-size label sizes ──
  final double labelSizeSm;
  final double labelSizeMd;
  final double labelSizeLg;
  final double labelSizeXl;

  // ── Per-size value sizes ──
  final double valueSizeSm;
  final double valueSizeMd;
  final double valueSizeLg;
  final double valueSizeXl;

  // ── Per-size float label sizes ──
  final double labelSizeFloatSm;
  final double labelSizeFloatMd;
  final double labelSizeFloatLg;
  final double labelSizeFloatXl;

  // ── Per-size hint sizes ──
  final double hintSizeSm;
  final double hintSizeMd;
  final double hintSizeLg;
  final double hintSizeXl;

  // ── Per-size label scale (label / float ratio) ──
  final double labelScaleSm;
  final double labelScaleMd;
  final double labelScaleLg;
  final double labelScaleXl;

  // ── Per-size label offset Y ──
  final double labelOffsetYSm;
  final double labelOffsetYMd;
  final double labelOffsetYLg;
  final double labelOffsetYXl;

  // ── Per-size input bottom ──
  final double inputBottomSm;
  final double inputBottomMd;
  final double inputBottomLg;
  final double inputBottomXl;

  // ── Dimensions ──
  final double height;
  final double heightSm;
  final double heightMd;
  final double heightLg;
  final double heightXl;
  final double radius;
  final double padding;
  final double paddingSm;
  final double paddingMd;
  final double paddingLg;
  final double paddingXl;
  final double gap;
  final double contentGap;
  final double clearSize;

  const FlowCompTextInput({
    required this.bg,
    required this.bgPressed,
    required this.bgDisabled,
    required this.border,
    required this.borderFocus,
    required this.borderError,
    required this.borderDisabled,
    required this.borderWidth,
    required this.borderWidthActive,
    required this.text,
    required this.label,
    required this.labelDisabled,
    required this.placeholder,
    required this.hint,
    required this.hintError,
    required this.labelSize,
    required this.labelSizeFloat,
    required this.valueSize,
    required this.hintSize,
    required this.labelSizeSm,
    required this.labelSizeMd,
    required this.labelSizeLg,
    required this.labelSizeXl,
    required this.valueSizeSm,
    required this.valueSizeMd,
    required this.valueSizeLg,
    required this.valueSizeXl,
    required this.labelSizeFloatSm,
    required this.labelSizeFloatMd,
    required this.labelSizeFloatLg,
    required this.labelSizeFloatXl,
    required this.hintSizeSm,
    required this.hintSizeMd,
    required this.hintSizeLg,
    required this.hintSizeXl,
    required this.labelScaleSm,
    required this.labelScaleMd,
    required this.labelScaleLg,
    required this.labelScaleXl,
    required this.labelOffsetYSm,
    required this.labelOffsetYMd,
    required this.labelOffsetYLg,
    required this.labelOffsetYXl,
    required this.inputBottomSm,
    required this.inputBottomMd,
    required this.inputBottomLg,
    required this.inputBottomXl,
    required this.height,
    required this.heightSm,
    required this.heightMd,
    required this.heightLg,
    required this.heightXl,
    required this.radius,
    required this.padding,
    required this.paddingSm,
    required this.paddingMd,
    required this.paddingLg,
    required this.paddingXl,
    required this.gap,
    required this.contentGap,
    required this.clearSize,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  3. FlowCompCountrySelect
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompCountrySelect {
  final Color chevronColor;
  final Color chevronDisabled;

  const FlowCompCountrySelect({
    required this.chevronColor,
    required this.chevronDisabled,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  4. FlowCompRadio
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompRadio {
  // ── Border colors (unselected) ──
  final Color borderInactive;
  final Color borderInactivePressed;
  final Color borderDisabled;

  // ── Fill colors (selected) ──
  final Color fillActive;
  final Color fillActivePressed;
  final Color fillDisabled;

  // ── Dot ──
  final Color dotColor;

  // ── State layer ──
  final Color stateLayerInactive;
  final Color stateLayerActive;

  // ── Structural ──
  final double size;
  final double dotSize;
  final double stateLayerSize;
  final double touchTarget;
  final double borderWidth;
  final double borderWidthHover;
  final double stateLayerOpacity;
  final double labelFontSize;

  const FlowCompRadio({
    required this.borderInactive,
    required this.borderInactivePressed,
    required this.borderDisabled,
    required this.fillActive,
    required this.fillActivePressed,
    required this.fillDisabled,
    required this.dotColor,
    required this.stateLayerInactive,
    required this.stateLayerActive,
    required this.size,
    required this.dotSize,
    required this.stateLayerSize,
    required this.touchTarget,
    required this.borderWidth,
    required this.borderWidthHover,
    required this.stateLayerOpacity,
    required this.labelFontSize,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  5. FlowCompCheckbox
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompCheckbox {
  // ── Border colors (unchecked) ──
  final Color borderInactive;
  final Color borderInactivePressed;
  final Color borderDisabled;

  // ── Fill colors (checked/indeterminate) ──
  final Color fillActive;
  final Color fillActivePressed;
  final Color fillDisabled;

  // ── Icon (check/dash) ──
  final Color iconColor;

  // ── State layer ──
  final Color stateLayerInactive;
  final Color stateLayerActive;

  // ── Structural ──
  final double size;
  final double iconSize;
  final double radius;
  final double stateLayerSize;
  final double touchTarget;
  final double borderWidth;
  final double borderWidthHover;
  final double stateLayerOpacity;
  final double labelFontSize;

  const FlowCompCheckbox({
    required this.borderInactive,
    required this.borderInactivePressed,
    required this.borderDisabled,
    required this.fillActive,
    required this.fillActivePressed,
    required this.fillDisabled,
    required this.iconColor,
    required this.stateLayerInactive,
    required this.stateLayerActive,
    required this.size,
    required this.iconSize,
    required this.radius,
    required this.stateLayerSize,
    required this.touchTarget,
    required this.borderWidth,
    required this.borderWidthHover,
    required this.stateLayerOpacity,
    required this.labelFontSize,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  6. FlowCompSwitch
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompSwitch {
  // ── Track colors ──
  final Color trackOff;
  final Color trackOffHover;
  final Color trackOn;
  final Color trackOnHover;
  final Color trackOnPressed;
  final Color trackDisabled;

  // ── Thumb colors ──
  final Color thumbOff;
  final Color thumbOn;
  final Color thumbDisabled;

  // ── Thumb icon colors ──
  final Color thumbIconOff;
  final Color thumbIconOn;
  final Color thumbIconDisabled;

  // ── State layer ──
  final Color stateLayerOff;
  final Color stateLayerOn;

  // ── Structural ──
  final double trackWidth;
  final double trackHeight;
  final double thumbSize;
  final double thumbSizePressed;
  final double thumbInset;
  final double stateLayerSize;
  final double stateLayerOpacity;
  final double trackRadius;
  final List<BoxShadow> thumbShadow;

  const FlowCompSwitch({
    required this.trackOff,
    required this.trackOffHover,
    required this.trackOn,
    required this.trackOnHover,
    required this.trackOnPressed,
    required this.trackDisabled,
    required this.thumbOff,
    required this.thumbOn,
    required this.thumbDisabled,
    required this.thumbIconOff,
    required this.thumbIconOn,
    required this.thumbIconDisabled,
    required this.stateLayerOff,
    required this.stateLayerOn,
    required this.trackWidth,
    required this.trackHeight,
    required this.thumbSize,
    required this.thumbSizePressed,
    required this.thumbInset,
    required this.stateLayerSize,
    required this.stateLayerOpacity,
    required this.trackRadius,
    required this.thumbShadow,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  7. FlowCompCountryDropdown
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompCountryDropdown {
  final Color bg;
  final Color itemHoverColor;
  final List<BoxShadow> shadow;
  final double radius;
  final double maxHeight;
  final double itemHeight;

  const FlowCompCountryDropdown({
    required this.bg,
    required this.itemHoverColor,
    required this.shadow,
    required this.radius,
    required this.maxHeight,
    required this.itemHeight,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  8. FlowCompCard
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompCard {
  final Color bgElevated;
  final Color bgOutlined;
  final Color bgFilled;
  final Color border;
  final List<BoxShadow> shadow;
  final List<BoxShadow> shadowHover;
  final double radius;
  final double padding;

  const FlowCompCard({
    required this.bgElevated,
    required this.bgOutlined,
    required this.bgFilled,
    required this.border,
    required this.shadow,
    required this.shadowHover,
    required this.radius,
    required this.padding,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  9. FlowCompTable
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompTable {
  final double cellPaddingY;
  final double cellPaddingX;
  final double fontSize;
  final double headerFontSize;

  const FlowCompTable({
    required this.cellPaddingY,
    required this.cellPaddingX,
    required this.fontSize,
    required this.headerFontSize,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  10. FlowCompChip
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompChip {
  final Color bg;
  final Color bgSelected;
  final Color text;
  final Color textSelected;
  final double fontSm;
  final double fontMd;
  final double fontLg;
  final double fontXl;
  final double radius;
  final double paddingX;
  final double paddingY;
  final double gap;

  const FlowCompChip({
    required this.bg,
    required this.bgSelected,
    required this.text,
    required this.textSelected,
    required this.fontSm,
    required this.fontMd,
    required this.fontLg,
    required this.fontXl,
    required this.radius,
    required this.paddingX,
    required this.paddingY,
    required this.gap,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  11. FlowCompIconButton
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompIconButton {
  // ── HIGH emphasis ──
  final Color bgHigh;
  final Color bgHighHover;
  final Color bgHighActive;
  final Color iconHigh;

  // ── MEDIUM emphasis ──
  final Color bgMedium;
  final Color bgMediumHover;
  final Color bgMediumActive;
  final Color iconMedium;
  final Color borderMedium;

  // ── LOW emphasis ──
  final Color bgLow;
  final Color bgLowHover;
  final Color bgLowActive;
  final Color iconLow;

  // ── OUTLINE emphasis ──
  final Color bgOutline;
  final Color bgOutlineHover;
  final Color bgOutlineActive;
  final Color iconOutline;
  final Color borderOutline;

  // ── DANGER ──
  final Color bgDangerSubtle;
  final Color bgDangerHover;
  final Color bgDangerActive;
  final Color iconDanger;
  final Color iconDangerOnFilled;

  // ── DISABLED ──
  final Color bgDisabled;
  final Color iconDisabled;
  final Color borderDisabled;

  // ── SELECTED — toggle / toolbar active ──
  final Color bgSelectedLow;
  final Color bgSelectedLowHover;
  final Color iconSelectedLow;
  final Color bgSelectedMedium;
  final Color iconSelectedMedium;
  final Color bgSelectedHigh;
  final Color iconSelectedHigh;

  // ── Structural ──
  final double radius;
  final double borderWidth;
  final double sizeSm;
  final double sizeMd;
  final double sizeLg;
  final double sizeXl;
  final double iconSizeSm;
  final double iconSizeMd;
  final double iconSizeLg;
  final double iconSizeXl;

  const FlowCompIconButton({
    required this.bgHigh,
    required this.bgHighHover,
    required this.bgHighActive,
    required this.iconHigh,
    required this.bgMedium,
    required this.bgMediumHover,
    required this.bgMediumActive,
    required this.iconMedium,
    required this.borderMedium,
    required this.bgLow,
    required this.bgLowHover,
    required this.bgLowActive,
    required this.iconLow,
    required this.bgOutline,
    required this.bgOutlineHover,
    required this.bgOutlineActive,
    required this.iconOutline,
    required this.borderOutline,
    required this.bgDangerSubtle,
    required this.bgDangerHover,
    required this.bgDangerActive,
    required this.iconDanger,
    required this.iconDangerOnFilled,
    required this.bgDisabled,
    required this.iconDisabled,
    required this.borderDisabled,
    required this.bgSelectedLow,
    required this.bgSelectedLowHover,
    required this.iconSelectedLow,
    required this.bgSelectedMedium,
    required this.iconSelectedMedium,
    required this.bgSelectedHigh,
    required this.iconSelectedHigh,
    required this.radius,
    required this.borderWidth,
    required this.sizeSm,
    required this.sizeMd,
    required this.sizeLg,
    required this.sizeXl,
    required this.iconSizeSm,
    required this.iconSizeMd,
    required this.iconSizeLg,
    required this.iconSizeXl,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  12. FlowCompDialog
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompDialog {
  final Color bg;
  final List<BoxShadow> shadow;
  final double radius;
  final double padding;
  final double maxWidth;

  const FlowCompDialog({
    required this.bg,
    required this.shadow,
    required this.radius,
    required this.padding,
    required this.maxWidth,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  13. FlowCompPanel
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompPanel {
  final Color bg;
  final Color border;
  final List<BoxShadow> shadow;
  final List<BoxShadow> shadowFloating;
  final double radius;
  final double padding;

  const FlowCompPanel({
    required this.bg,
    required this.border,
    required this.shadow,
    required this.shadowFloating,
    required this.radius,
    required this.padding,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  14. FlowCompTag
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompTag {
  final Color bg;
  final double font;
  final double radius;
  final double paddingX;
  final double paddingY;

  const FlowCompTag({
    required this.bg,
    required this.font,
    required this.radius,
    required this.paddingX,
    required this.paddingY,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  15. FlowCompAvatar
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompAvatar {
  final Color bg;
  final Color text;
  final Color border;
  final Color statusOnline;
  final Color statusOffline;
  final Color statusBusy;
  final Color statusAway;
  final Color statusRing;

  final double sizeSm;
  final double sizeMd;
  final double sizeLg;
  final double sizeXl;
  final double radius;
  final double radiusSquare;
  final double fontSm;
  final double fontMd;
  final double fontLg;
  final double fontXl;
  final double statusSizeSm;
  final double statusSizeMd;
  final double statusSizeLg;
  final double statusSizeXl;
  final double statusRingWidth;

  const FlowCompAvatar({
    required this.bg,
    required this.text,
    required this.border,
    required this.statusOnline,
    required this.statusOffline,
    required this.statusBusy,
    required this.statusAway,
    required this.statusRing,
    required this.sizeSm,
    required this.sizeMd,
    required this.sizeLg,
    required this.sizeXl,
    required this.radius,
    required this.radiusSquare,
    required this.fontSm,
    required this.fontMd,
    required this.fontLg,
    required this.fontXl,
    required this.statusSizeSm,
    required this.statusSizeMd,
    required this.statusSizeLg,
    required this.statusSizeXl,
    required this.statusRingWidth,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  16. FlowCompBadge
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompBadge {
  final Color bgDefault;
  final Color bgAccent;
  final Color bgSuccess;
  final Color bgWarning;
  final Color text;
  final Color ring;
  final double font;
  final FontWeight fontWeight;
  final double radius;
  final double minSize;
  final double height;
  final double paddingX;
  final double ringWidth;

  const FlowCompBadge({
    required this.bgDefault,
    required this.bgAccent,
    required this.bgSuccess,
    required this.bgWarning,
    required this.text,
    required this.ring,
    required this.font,
    required this.fontWeight,
    required this.radius,
    required this.minSize,
    required this.height,
    required this.paddingX,
    required this.ringWidth,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  17. FlowCompTabs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompTabs {
  final Color bg;
  final Color borderDefault;
  final Color textDefault;
  final Color textActive;
  final Color textHover;
  final Color indicator;
  final Color filledBg;
  final Color filledActiveBg;
  final List<BoxShadow> filledActiveShadow;

  final double indicatorHeight;
  final double filledRadius;
  final double gap;
  final double paddingXSm;
  final double paddingXMd;
  final double paddingXLg;
  final double paddingXXl;
  final double heightSm;
  final double heightMd;
  final double heightLg;
  final double heightXl;
  final double fontSm;
  final double fontMd;
  final double fontLg;
  final double fontXl;

  const FlowCompTabs({
    required this.bg,
    required this.borderDefault,
    required this.textDefault,
    required this.textActive,
    required this.textHover,
    required this.indicator,
    required this.filledBg,
    required this.filledActiveBg,
    required this.filledActiveShadow,
    required this.indicatorHeight,
    required this.filledRadius,
    required this.gap,
    required this.paddingXSm,
    required this.paddingXMd,
    required this.paddingXLg,
    required this.paddingXXl,
    required this.heightSm,
    required this.heightMd,
    required this.heightLg,
    required this.heightXl,
    required this.fontSm,
    required this.fontMd,
    required this.fontLg,
    required this.fontXl,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  18. FlowCompList
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompList {
  final Color bg;
  final Color itemBg;
  final Color itemBgHover;
  final Color itemBgSelected;
  final Color itemBgActive;
  final Color textPrimary;
  final Color textSecondary;
  final Color textTertiary;
  final Color divider;

  final double itemPaddingY;
  final double itemPaddingX;
  final double gap;
  final double radius;
  final double iconSize;
  final double avatarSize;

  const FlowCompList({
    required this.bg,
    required this.itemBg,
    required this.itemBgHover,
    required this.itemBgSelected,
    required this.itemBgActive,
    required this.textPrimary,
    required this.textSecondary,
    required this.textTertiary,
    required this.divider,
    required this.itemPaddingY,
    required this.itemPaddingX,
    required this.gap,
    required this.radius,
    required this.iconSize,
    required this.avatarSize,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  19. FlowCompSlider
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompSlider {
  final Color trackBg;
  final Color trackFill;
  final Color trackFillHover;
  final Color trackDisabled;
  final Color thumbBg;
  final Color thumbBorder;
  final Color thumbBorderHover;
  final Color thumbBorderDisabled;
  final Color label;
  final Color value;

  final List<BoxShadow> thumbShadow;
  final double trackHeight;
  final double trackRadius;
  final double thumbSize;
  final double thumbRadius;
  final double thumbBorderWidth;
  final double focusRingSize;
  final double focusRingOpacity;

  const FlowCompSlider({
    required this.trackBg,
    required this.trackFill,
    required this.trackFillHover,
    required this.trackDisabled,
    required this.thumbBg,
    required this.thumbBorder,
    required this.thumbBorderHover,
    required this.thumbBorderDisabled,
    required this.label,
    required this.value,
    required this.thumbShadow,
    required this.trackHeight,
    required this.trackRadius,
    required this.thumbSize,
    required this.thumbRadius,
    required this.thumbBorderWidth,
    required this.focusRingSize,
    required this.focusRingOpacity,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  20. FlowCompCircularProgress
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompCircularProgress {
  final Color trackColor;
  final Color fillDefault;
  final Color fillSuccess;
  final Color fillWarning;
  final Color fillError;
  final Color label;

  final double sizeSm;
  final double sizeMd;
  final double sizeLg;
  final double sizeXl;
  final double strokeWidth;
  final double fontSm;
  final double fontMd;
  final double fontLg;
  final double fontXl;

  const FlowCompCircularProgress({
    required this.trackColor,
    required this.fillDefault,
    required this.fillSuccess,
    required this.fillWarning,
    required this.fillError,
    required this.label,
    required this.sizeSm,
    required this.sizeMd,
    required this.sizeLg,
    required this.sizeXl,
    required this.strokeWidth,
    required this.fontSm,
    required this.fontMd,
    required this.fontLg,
    required this.fontXl,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  21. FlowCompAccordion
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompAccordion {
  final Color bg;
  final Color bgHover;
  final Color bgContent;
  final Color border;
  final Color borderExpanded;
  final Color text;
  final Color textSecondary;
  final Color icon;

  final double radius;
  final double paddingX;
  final double paddingY;
  final double contentPaddingX;
  final double contentPaddingY;
  final double gap;
  final double heightSm;
  final double heightMd;
  final double heightLg;
  final double heightXl;
  final double fontSm;
  final double fontMd;
  final double fontLg;
  final double fontXl;

  const FlowCompAccordion({
    required this.bg,
    required this.bgHover,
    required this.bgContent,
    required this.border,
    required this.borderExpanded,
    required this.text,
    required this.textSecondary,
    required this.icon,
    required this.radius,
    required this.paddingX,
    required this.paddingY,
    required this.contentPaddingX,
    required this.contentPaddingY,
    required this.gap,
    required this.heightSm,
    required this.heightMd,
    required this.heightLg,
    required this.heightXl,
    required this.fontSm,
    required this.fontMd,
    required this.fontLg,
    required this.fontXl,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  22. FlowCompBreadcrumbs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompBreadcrumbs {
  final Color text;
  final Color textHover;
  final Color textActive;
  final Color separator;

  final double font;
  final double separatorFont;
  final double gap;
  final double itemPaddingX;
  final double itemPaddingY;
  final double itemRadius;

  const FlowCompBreadcrumbs({
    required this.text,
    required this.textHover,
    required this.textActive,
    required this.separator,
    required this.font,
    required this.separatorFont,
    required this.gap,
    required this.itemPaddingX,
    required this.itemPaddingY,
    required this.itemRadius,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  23. FlowCompPagination
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompPagination {
  final Color bg;
  final Color bgHover;
  final Color bgActive;
  final Color text;
  final Color textHover;
  final Color textActive;
  final Color textDisabled;
  final Color border;
  final Color navIcon;
  final Color navIconDisabled;

  final double radius;
  final double height;
  final double minWidth;
  final double gap;
  final double font;
  final FontWeight fontWeight;

  const FlowCompPagination({
    required this.bg,
    required this.bgHover,
    required this.bgActive,
    required this.text,
    required this.textHover,
    required this.textActive,
    required this.textDisabled,
    required this.border,
    required this.navIcon,
    required this.navIconDisabled,
    required this.radius,
    required this.height,
    required this.minWidth,
    required this.gap,
    required this.font,
    required this.fontWeight,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  24. FlowCompSegmentedControl
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompSegmentedControl {
  final Color bg;
  final Color bgActive;
  final Color bgHover;
  final Color text;
  final Color textActive;
  final Color border;

  final List<BoxShadow> shadow;
  final double radius;
  final double padding;
  final double gap;
  final double heightSm;
  final double heightMd;
  final double heightLg;
  final double heightXl;
  final double fontSm;
  final double fontMd;
  final double fontLg;
  final double fontXl;
  final double segmentPaddingX;

  const FlowCompSegmentedControl({
    required this.bg,
    required this.bgActive,
    required this.bgHover,
    required this.text,
    required this.textActive,
    required this.border,
    required this.shadow,
    required this.radius,
    required this.padding,
    required this.gap,
    required this.heightSm,
    required this.heightMd,
    required this.heightLg,
    required this.heightXl,
    required this.fontSm,
    required this.fontMd,
    required this.fontLg,
    required this.fontXl,
    required this.segmentPaddingX,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  25. FlowCompStepper
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompStepper {
  final Color indicatorBg;
  final Color indicatorBgCurrent;
  final Color indicatorBgComplete;
  final Color indicatorBgError;
  final Color indicatorBgUpcoming;
  final Color indicatorText;
  final Color indicatorTextActive;
  final Color indicatorTextError;
  final Color labelText;
  final Color labelTextSecondary;
  final Color labelTextUpcoming;
  final Color connectorDefault;
  final Color connectorComplete;

  final double indicatorSizeSm;
  final double indicatorSizeMd;
  final double indicatorSizeLg;
  final double indicatorSizeXl;
  final double connectorHeight;
  final double fontSm;
  final double fontMd;
  final double fontLg;
  final double fontXl;
  final double labelFontSm;
  final double labelFontMd;
  final double labelFontLg;
  final double labelFontXl;
  final double descFontSm;
  final double descFontMd;
  final double descFontLg;
  final double descFontXl;
  final double gap;

  const FlowCompStepper({
    required this.indicatorBg,
    required this.indicatorBgCurrent,
    required this.indicatorBgComplete,
    required this.indicatorBgError,
    required this.indicatorBgUpcoming,
    required this.indicatorText,
    required this.indicatorTextActive,
    required this.indicatorTextError,
    required this.labelText,
    required this.labelTextSecondary,
    required this.labelTextUpcoming,
    required this.connectorDefault,
    required this.connectorComplete,
    required this.indicatorSizeSm,
    required this.indicatorSizeMd,
    required this.indicatorSizeLg,
    required this.indicatorSizeXl,
    required this.connectorHeight,
    required this.fontSm,
    required this.fontMd,
    required this.fontLg,
    required this.fontXl,
    required this.labelFontSm,
    required this.labelFontMd,
    required this.labelFontLg,
    required this.labelFontXl,
    required this.descFontSm,
    required this.descFontMd,
    required this.descFontLg,
    required this.descFontXl,
    required this.gap,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  26. FlowCompBottomNav
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompBottomNav {
  final Color bg;
  final Color border;
  final Color textDefault;
  final Color textActive;
  final Color iconDefault;
  final Color iconActive;
  final Color indicatorBg;
  final Color badgeBg;
  final Color badgeText;

  final List<BoxShadow> shadow;
  final double height;
  final double labelFont;
  final double iconSize;
  final double itemGap;
  final double badgeSize;
  final double badgeDotSize;
  final double badgeFont;

  const FlowCompBottomNav({
    required this.bg,
    required this.border,
    required this.textDefault,
    required this.textActive,
    required this.iconDefault,
    required this.iconActive,
    required this.indicatorBg,
    required this.badgeBg,
    required this.badgeText,
    required this.shadow,
    required this.height,
    required this.labelFont,
    required this.iconSize,
    required this.itemGap,
    required this.badgeSize,
    required this.badgeDotSize,
    required this.badgeFont,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  27. FlowCompFab
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompFab {
  final Color bgPrimary;
  final Color bgPrimaryHover;
  final Color bgPrimaryActive;
  final Color textPrimary;
  final Color bgSecondary;
  final Color bgSecondaryHover;
  final Color textSecondary;
  final Color bgTertiary;
  final Color bgTertiaryHover;
  final Color textTertiary;

  final List<BoxShadow> shadow;
  final List<BoxShadow> shadowHover;
  final double radius;
  final double sizeSm;
  final double sizeMd;
  final double sizeLg;
  final double paddingX;
  final double gap;
  final double labelFont;
  final double offset;

  const FlowCompFab({
    required this.bgPrimary,
    required this.bgPrimaryHover,
    required this.bgPrimaryActive,
    required this.textPrimary,
    required this.bgSecondary,
    required this.bgSecondaryHover,
    required this.textSecondary,
    required this.bgTertiary,
    required this.bgTertiaryHover,
    required this.textTertiary,
    required this.shadow,
    required this.shadowHover,
    required this.radius,
    required this.sizeSm,
    required this.sizeMd,
    required this.sizeLg,
    required this.paddingX,
    required this.gap,
    required this.labelFont,
    required this.offset,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  28. FlowCompToolbar
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompToolbar {
  final Color bg;
  final Color border;
  final Color dividerColor;

  final double radius;
  final double padding;
  final double gap;
  final double dividerWidth;
  final double heightSm;
  final double heightMd;
  final double heightLg;

  const FlowCompToolbar({
    required this.bg,
    required this.border,
    required this.dividerColor,
    required this.radius,
    required this.padding,
    required this.gap,
    required this.dividerWidth,
    required this.heightSm,
    required this.heightMd,
    required this.heightLg,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  29. FlowCompPopover
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompPopover {
  final Color bg;
  final Color border;

  final List<BoxShadow> shadow;
  final double radius;
  final double padding;
  final double maxWidth;

  const FlowCompPopover({
    required this.bg,
    required this.border,
    required this.shadow,
    required this.radius,
    required this.padding,
    required this.maxWidth,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  30. FlowCompBottomSheet
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompBottomSheet {
  final Color bg;
  final Color border;
  final Color handleBg;
  final Color overlay;

  final List<BoxShadow> shadow;
  final double radius;
  final double handleWidth;
  final double handleHeight;
  final double handleMargin;
  final double padding;
  final double headerFont;

  const FlowCompBottomSheet({
    required this.bg,
    required this.border,
    required this.handleBg,
    required this.overlay,
    required this.shadow,
    required this.radius,
    required this.handleWidth,
    required this.handleHeight,
    required this.handleMargin,
    required this.padding,
    required this.headerFont,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  31. FlowCompContextMenu
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompContextMenu {
  final Color bg;
  final Color border;
  final Color itemBgHover;
  final Color itemBgActive;
  final Color textDefault;
  final Color textSecondary;
  final Color textDanger;
  final Color textDisabled;
  final Color separator;

  final List<BoxShadow> shadow;
  final double radius;
  final double padding;
  final double itemPaddingX;
  final double itemPaddingY;
  final double itemRadius;
  final double shortcutFont;
  final double font;
  final double iconSize;
  final double minWidth;
  final double maxWidth;

  const FlowCompContextMenu({
    required this.bg,
    required this.border,
    required this.itemBgHover,
    required this.itemBgActive,
    required this.textDefault,
    required this.textSecondary,
    required this.textDanger,
    required this.textDisabled,
    required this.separator,
    required this.shadow,
    required this.radius,
    required this.padding,
    required this.itemPaddingX,
    required this.itemPaddingY,
    required this.itemRadius,
    required this.shortcutFont,
    required this.font,
    required this.iconSize,
    required this.minWidth,
    required this.maxWidth,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  32. FlowCompMenu
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompMenu {
  final Color bg;
  final Color border;
  final Color itemBgHover;
  final Color itemBgActive;
  final Color textDefault;
  final Color textSecondary;
  final Color textDanger;
  final Color textDisabled;
  final Color separator;

  final List<BoxShadow> shadow;
  final double radius;
  final double padding;
  final double itemPaddingX;
  final double itemPaddingY;
  final double itemRadius;
  final double font;
  final double iconSize;
  final double checkSize;
  final double minWidth;
  final double maxWidth;

  const FlowCompMenu({
    required this.bg,
    required this.border,
    required this.itemBgHover,
    required this.itemBgActive,
    required this.textDefault,
    required this.textSecondary,
    required this.textDanger,
    required this.textDisabled,
    required this.separator,
    required this.shadow,
    required this.radius,
    required this.padding,
    required this.itemPaddingX,
    required this.itemPaddingY,
    required this.itemRadius,
    required this.font,
    required this.iconSize,
    required this.checkSize,
    required this.minWidth,
    required this.maxWidth,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  33. FlowCompToggleButton
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompToggleButton {
  final Color bgOff;
  final Color bgOffHover;
  final Color bgOn;
  final Color bgOnHover;
  final Color textOff;
  final Color textOn;
  final Color border;
  final Color borderOn;
  final Color bgDisabled;
  final Color textDisabled;
  final Color borderDisabled;

  final double radius;
  final double borderWidth;
  final double heightSm;
  final double heightMd;
  final double heightLg;
  final double heightXl;
  final double paddingX;
  final double gap;
  final double fontSm;
  final double fontMd;
  final double fontLg;
  final double fontXl;
  final double groupGap;
  final double groupRadius;

  const FlowCompToggleButton({
    required this.bgOff,
    required this.bgOffHover,
    required this.bgOn,
    required this.bgOnHover,
    required this.textOff,
    required this.textOn,
    required this.border,
    required this.borderOn,
    required this.bgDisabled,
    required this.textDisabled,
    required this.borderDisabled,
    required this.radius,
    required this.borderWidth,
    required this.heightSm,
    required this.heightMd,
    required this.heightLg,
    required this.heightXl,
    required this.paddingX,
    required this.gap,
    required this.fontSm,
    required this.fontMd,
    required this.fontLg,
    required this.fontXl,
    required this.groupGap,
    required this.groupRadius,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  34. FlowCompSearch
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompSearch {
  final Color bg;
  final Color bgFocus;
  final Color border;
  final Color borderFocus;
  final Color text;
  final Color placeholder;
  final Color icon;
  final Color clearIcon;
  final Color clearIconHover;
  final Color shortcutBg;
  final Color shortcutBorder;
  final Color shortcutText;

  final double radius;
  final double height;
  final double heightSm;
  final double heightLg;
  final double paddingX;
  final double font;
  final double fontSm;
  final double fontLg;
  final double iconSize;
  final double shortcutFont;
  final double shortcutRadius;

  const FlowCompSearch({
    required this.bg,
    required this.bgFocus,
    required this.border,
    required this.borderFocus,
    required this.text,
    required this.placeholder,
    required this.icon,
    required this.clearIcon,
    required this.clearIconHover,
    required this.shortcutBg,
    required this.shortcutBorder,
    required this.shortcutText,
    required this.radius,
    required this.height,
    required this.heightSm,
    required this.heightLg,
    required this.paddingX,
    required this.font,
    required this.fontSm,
    required this.fontLg,
    required this.iconSize,
    required this.shortcutFont,
    required this.shortcutRadius,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  35. FlowCompPullToRefresh
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompPullToRefresh {
  final Color bg;
  final Color spinnerColor;
  final Color spinnerTrack;
  final Color text;

  final double spinnerSize;
  final double font;
  final double pullMaxHeight;
  final double threshold;
  final double padding;

  const FlowCompPullToRefresh({
    required this.bg,
    required this.spinnerColor,
    required this.spinnerTrack,
    required this.text,
    required this.spinnerSize,
    required this.font,
    required this.pullMaxHeight,
    required this.threshold,
    required this.padding,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  36. FlowCompSwipeActions
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompSwipeActions {
  final Color bg;
  final Color dangerBg;
  final Color dangerText;
  final Color successBg;
  final Color successText;
  final Color warningBg;
  final Color warningText;
  final Color defaultBg;
  final Color defaultText;

  final double actionPadding;
  final double actionFont;
  final double actionIconSize;
  final double threshold;
  final double maxSwipe;

  const FlowCompSwipeActions({
    required this.bg,
    required this.dangerBg,
    required this.dangerText,
    required this.successBg,
    required this.successText,
    required this.warningBg,
    required this.warningText,
    required this.defaultBg,
    required this.defaultText,
    required this.actionPadding,
    required this.actionFont,
    required this.actionIconSize,
    required this.threshold,
    required this.maxSwipe,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  37. FlowCompSidebar
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompSidebar {
  final Color bg;
  final Color border;
  final Color itemBg;
  final Color itemBgHover;
  final Color itemBgActive;
  final Color itemText;
  final Color itemTextActive;
  final Color itemTextHover;
  final Color groupLabelColor;
  final Color divider;
  final Color toggleBg;
  final Color toggleBorder;
  final Color toggleIcon;

  final List<BoxShadow> shadow;
  final double widthExpanded;
  final double widthCollapsed;
  final double padding;
  final double headerHeight;
  final double itemPaddingX;
  final double itemPaddingY;
  final double itemRadius;
  final double itemIconSize;
  final double itemFont;
  final double groupLabelFont;
  final double groupMarginTop;
  final double toggleSize;

  const FlowCompSidebar({
    required this.bg,
    required this.border,
    required this.itemBg,
    required this.itemBgHover,
    required this.itemBgActive,
    required this.itemText,
    required this.itemTextActive,
    required this.itemTextHover,
    required this.groupLabelColor,
    required this.divider,
    required this.toggleBg,
    required this.toggleBorder,
    required this.toggleIcon,
    required this.shadow,
    required this.widthExpanded,
    required this.widthCollapsed,
    required this.padding,
    required this.headerHeight,
    required this.itemPaddingX,
    required this.itemPaddingY,
    required this.itemRadius,
    required this.itemIconSize,
    required this.itemFont,
    required this.groupLabelFont,
    required this.groupMarginTop,
    required this.toggleSize,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  38. FlowCompTopbar
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompTopbar {
  final Color bg;
  final Color border;
  final Color text;
  final Color textSecondary;

  final List<BoxShadow> shadow;
  final double height;
  final double paddingX;
  final double titleFont;
  final double iconSize;
  final double gap;
  final double actionGap;

  const FlowCompTopbar({
    required this.bg,
    required this.border,
    required this.text,
    required this.textSecondary,
    required this.shadow,
    required this.height,
    required this.paddingX,
    required this.titleFont,
    required this.iconSize,
    required this.gap,
    required this.actionGap,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  39. FlowCompAutocomplete
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompAutocomplete {
  final Color bg;
  final Color border;
  final Color borderFocus;
  final Color borderError;
  final Color text;
  final Color placeholder;
  final Color labelText;
  final Color clearIcon;
  final Color clearIconHover;
  final Color dropdownBg;
  final Color dropdownBorder;
  final Color itemBgHover;
  final Color itemBgSelected;
  final Color itemText;
  final Color itemTextSecondary;
  final Color highlightText;
  final Color emptyText;

  final List<BoxShadow> dropdownShadow;
  final double labelFont;
  final double font;
  final double radius;
  final double height;
  final double heightSm;
  final double heightLg;
  final double paddingX;
  final double iconSize;
  final double dropdownRadius;
  final double dropdownMaxHeight;
  final double dropdownPadding;
  final double itemPaddingX;
  final double itemPaddingY;
  final double itemRadius;
  final double itemFont;
  final double emptyFont;

  const FlowCompAutocomplete({
    required this.bg,
    required this.border,
    required this.borderFocus,
    required this.borderError,
    required this.text,
    required this.placeholder,
    required this.labelText,
    required this.clearIcon,
    required this.clearIconHover,
    required this.dropdownBg,
    required this.dropdownBorder,
    required this.itemBgHover,
    required this.itemBgSelected,
    required this.itemText,
    required this.itemTextSecondary,
    required this.highlightText,
    required this.emptyText,
    required this.dropdownShadow,
    required this.labelFont,
    required this.font,
    required this.radius,
    required this.height,
    required this.heightSm,
    required this.heightLg,
    required this.paddingX,
    required this.iconSize,
    required this.dropdownRadius,
    required this.dropdownMaxHeight,
    required this.dropdownPadding,
    required this.itemPaddingX,
    required this.itemPaddingY,
    required this.itemRadius,
    required this.itemFont,
    required this.emptyFont,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  40. FlowCompLayoutGrid
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompLayoutGrid {
  final int lgColumns;
  final double lgGutter;
  final double lgMargin;
  final double lgMaxWidth;
  final int mdColumns;
  final double mdGutter;
  final double mdMargin;
  final int smColumns;
  final double smGutter;
  final double smMargin;

  const FlowCompLayoutGrid({
    required this.lgColumns,
    required this.lgGutter,
    required this.lgMargin,
    required this.lgMaxWidth,
    required this.mdColumns,
    required this.mdGutter,
    required this.mdMargin,
    required this.smColumns,
    required this.smGutter,
    required this.smMargin,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  FlowCompTokens — Aggregate ThemeExtension (all 40 groups)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCompTokens extends ThemeExtension<FlowCompTokens> {
  final FlowCompButton button;
  final FlowCompTextInput textInput;
  final FlowCompCountrySelect countrySelect;
  final FlowCompRadio radio;
  final FlowCompCheckbox checkbox;
  final FlowCompSwitch switchControl;
  final FlowCompCountryDropdown countryDropdown;
  final FlowCompCard card;
  final FlowCompTable table;
  final FlowCompChip chip;
  final FlowCompIconButton iconButton;
  final FlowCompDialog dialog;
  final FlowCompPanel panel;
  final FlowCompTag tag;
  final FlowCompAvatar avatar;
  final FlowCompBadge badge;
  final FlowCompTabs tabs;
  final FlowCompList list;
  final FlowCompSlider slider;
  final FlowCompCircularProgress circularProgress;
  final FlowCompAccordion accordion;
  final FlowCompBreadcrumbs breadcrumbs;
  final FlowCompPagination pagination;
  final FlowCompSegmentedControl segmentedControl;
  final FlowCompStepper stepper;
  final FlowCompBottomNav bottomNav;
  final FlowCompFab fab;
  final FlowCompToolbar toolbar;
  final FlowCompPopover popover;
  final FlowCompBottomSheet bottomSheet;
  final FlowCompContextMenu contextMenu;
  final FlowCompMenu menu;
  final FlowCompToggleButton toggleButton;
  final FlowCompSearch search;
  final FlowCompPullToRefresh pullToRefresh;
  final FlowCompSwipeActions swipeActions;
  final FlowCompSidebar sidebar;
  final FlowCompTopbar topbar;
  final FlowCompAutocomplete autocomplete;
  final FlowCompLayoutGrid layoutGrid;

  const FlowCompTokens({
    required this.button,
    required this.textInput,
    required this.countrySelect,
    required this.radio,
    required this.checkbox,
    required this.switchControl,
    required this.countryDropdown,
    required this.card,
    required this.table,
    required this.chip,
    required this.iconButton,
    required this.dialog,
    required this.panel,
    required this.tag,
    required this.avatar,
    required this.badge,
    required this.tabs,
    required this.list,
    required this.slider,
    required this.circularProgress,
    required this.accordion,
    required this.breadcrumbs,
    required this.pagination,
    required this.segmentedControl,
    required this.stepper,
    required this.bottomNav,
    required this.fab,
    required this.toolbar,
    required this.popover,
    required this.bottomSheet,
    required this.contextMenu,
    required this.menu,
    required this.toggleButton,
    required this.search,
    required this.pullToRefresh,
    required this.swipeActions,
    required this.sidebar,
    required this.topbar,
    required this.autocomplete,
    required this.layoutGrid,
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  _fromSys — map all 40 groups from sys/ref
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  static FlowCompTokens _fromSys(FlowSysTokens sys) => FlowCompTokens(
        // ── 1. button ──
        button: FlowCompButton(
          bgHigh: sys.actionHigh,
          bgHighHover: sys.actionHighHover,
          bgHighActive: sys.actionHighActive,
          textHigh: sys.textInverse,
          bgMedium: sys.actionGhost,
          bgMediumHover: sys.actionSecondaryHover,
          bgMediumActive: sys.actionMediumActive,
          textMedium: sys.textPrimary,
          borderMedium: sys.actionMediumBorder,
          bgLow: sys.actionGhost,
          textLow: sys.textAccent,
          textLowHover: sys.textLink,
          textLowActive: sys.actionLowActive,
          bgOutline: sys.actionGhost,
          bgOutlineHover: sys.actionSecondaryHover,
          bgOutlineActive: sys.actionMediumActive,
          textOutline: sys.textAccent,
          borderOutline: sys.borderStrong,
          bgDangerSubtle: sys.actionDestructiveSubtle,
          bgDangerHover: sys.actionDestructive,
          bgDangerActive: sys.actionDestructiveActive,
          textDangerSubtle: sys.textDanger,
          textDangerOnFilled: sys.textOnAction,
          bgDisabled: sys.stateDisabledBg,
          textDisabled: sys.stateDisabledText,
          borderDisabled: sys.stateDisabledBorder,
          radius: sys.radiusControl,
          fontSm: FlowRefVoice.size4,
          fontMd: FlowRefVoice.size5,
          fontLg: FlowRefVoice.size6,
          fontXl: FlowRefVoice.size7,
          paddingX: FlowRefFrame.space3,
          gap: FlowRefFrame.space2,
          borderWidth: sys.borderControlWidth,
          heightSm: sys.heightControlSm,
          heightMd: sys.heightControlMd,
          heightLg: sys.heightControlLg,
          heightXl: sys.heightControlXl,
        ),
        // ── 2. textInput ──
        textInput: FlowCompTextInput(
          bg: sys.surfacePrimary,
          bgPressed: sys.surfaceTertiary,
          bgDisabled: sys.surfaceSecondary,
          border: sys.borderControl,
          borderFocus: sys.borderFocus,
          borderError: sys.borderControlError,
          borderDisabled: sys.borderControlDisabled,
          borderWidth: sys.borderControlWidth,
          borderWidthActive: sys.borderMedium,
          text: sys.textPrimary,
          label: sys.borderControl,
          labelDisabled: sys.textSecondary,
          placeholder: sys.textTertiary,
          hint: sys.borderControl,
          hintError: sys.borderControlError,
          labelSize: FlowRefVoice.size9,
          labelSizeFloat: FlowRefVoice.size4,
          valueSize: FlowRefVoice.size6,
          hintSize: FlowRefVoice.size4,
          labelSizeSm: FlowRefVoice.size3,
          labelSizeMd: FlowRefVoice.size5,
          labelSizeLg: FlowRefVoice.size7,
          labelSizeXl: FlowRefVoice.size9,
          valueSizeSm: FlowRefVoice.size3,
          valueSizeMd: FlowRefVoice.size4,
          valueSizeLg: FlowRefVoice.size5,
          valueSizeXl: FlowRefVoice.size6,
          labelSizeFloatSm: FlowRefVoice.size1,
          labelSizeFloatMd: FlowRefVoice.size2,
          labelSizeFloatLg: FlowRefVoice.size3,
          labelSizeFloatXl: FlowRefVoice.size4,
          hintSizeSm: FlowRefVoice.size1,
          hintSizeMd: FlowRefVoice.size2,
          hintSizeLg: FlowRefVoice.size3,
          hintSizeXl: FlowRefVoice.size4,
          labelScaleSm: 1.2,
          labelScaleMd: 1.273,
          labelScaleLg: 1.5,
          labelScaleXl: 1.846,
          labelOffsetYSm: 9,
          labelOffsetYMd: 10,
          labelOffsetYLg: 10,
          labelOffsetYXl: 10,
          inputBottomSm: 4,
          inputBottomMd: 6,
          inputBottomLg: 8,
          inputBottomXl: 10,
          height: sys.heightControlXl,
          heightSm: sys.heightControlSm,
          heightMd: sys.heightControlMd,
          heightLg: sys.heightControlLg,
          heightXl: sys.heightControlXl,
          radius: sys.radiusControl,
          padding: FlowRefFrame.space5,
          paddingSm: FlowRefFrame.space2,
          paddingMd: FlowRefFrame.space3,
          paddingLg: FlowRefFrame.space4,
          paddingXl: FlowRefFrame.space5,
          gap: FlowRefFrame.space1,
          contentGap: sys.spaceMicro,
          clearSize: FlowRefFrame.space12,
        ),
        // ── 3. countrySelect ──
        countrySelect: FlowCompCountrySelect(
          chevronColor: sys.actionPrimary,
          chevronDisabled: sys.textTertiary,
        ),
        // ── 4. radio ──
        radio: FlowCompRadio(
          borderInactive: sys.controlBorderInactive,
          borderInactivePressed: sys.controlBorderInactivePressed,
          borderDisabled: sys.controlBorderDisabled,
          fillActive: sys.actionPrimary,
          fillActivePressed: sys.controlFillPressed,
          fillDisabled: sys.controlFillDisabled,
          dotColor: sys.controlDot,
          stateLayerInactive: sys.controlStateLayerInactive,
          stateLayerActive: sys.actionPrimary,
          size: 24,
          dotSize: 8,
          stateLayerSize: 40,
          touchTarget: FlowRefFrame.space12,
          borderWidth: sys.borderControlWidth,
          borderWidthHover: sys.borderMedium,
          stateLayerOpacity: 0.2,
          labelFontSize: FlowRefVoice.size5,
        ),
        // ── 5. checkbox ──
        checkbox: FlowCompCheckbox(
          borderInactive: sys.controlBorderInactive,
          borderInactivePressed: sys.controlBorderInactivePressed,
          borderDisabled: sys.controlBorderDisabled,
          fillActive: sys.actionPrimary,
          fillActivePressed: sys.controlFillPressed,
          fillDisabled: sys.controlFillDisabled,
          iconColor: sys.controlDot,
          stateLayerInactive: sys.controlStateLayerInactive,
          stateLayerActive: sys.actionPrimary,
          size: 24,
          iconSize: 16,
          radius: sys.radiusSm,
          stateLayerSize: 40,
          touchTarget: FlowRefFrame.space12,
          borderWidth: sys.borderControlWidth,
          borderWidthHover: sys.borderMedium,
          stateLayerOpacity: 0.2,
          labelFontSize: FlowRefVoice.size5,
        ),
        // ── 6. switchControl ──
        switchControl: FlowCompSwitch(
          trackOff: sys.switchTrackOff,
          trackOffHover: sys.switchTrackOffHover,
          trackOn: sys.actionPrimary,
          trackOnHover: sys.actionPrimaryHover,
          trackOnPressed: sys.controlFillPressed,
          trackDisabled: sys.switchTrackDisabled,
          thumbOff: sys.switchThumbOff,
          thumbOn: sys.switchThumbOn,
          thumbDisabled: sys.switchThumbDisabled,
          thumbIconOff: sys.controlBorderInactive,
          thumbIconOn: sys.actionPrimary,
          thumbIconDisabled: sys.switchThumbIconDisabled,
          stateLayerOff: sys.controlStateLayerInactive,
          stateLayerOn: sys.actionPrimary,
          trackWidth: 52,
          trackHeight: 32,
          thumbSize: 16,
          thumbSizePressed: 18,
          thumbInset: 8,
          stateLayerSize: 40,
          stateLayerOpacity: 0.2,
          trackRadius: sys.radiusFull,
          thumbShadow: sys.depthElevationLight,
        ),
        // ── 7. countryDropdown ──
        countryDropdown: FlowCompCountryDropdown(
          bg: sys.surfacePrimary,
          itemHoverColor: sys.surfaceSecondary,
          shadow: sys.depthElevationHigh,
          radius: sys.radiusContainer,
          maxHeight: 320,
          itemHeight: 44,
        ),
        // ── 8. card ──
        card: FlowCompCard(
          bgElevated: sys.surfacePrimary,
          bgOutlined: sys.surfacePrimary,
          bgFilled: sys.surfaceSecondary,
          border: sys.borderDefault,
          shadow: sys.depthElevationLight,
          shadowHover: sys.depthElevationMedium,
          radius: sys.radiusContainer,
          padding: sys.paddingContainer,
        ),
        // ── 9. table ──
        table: FlowCompTable(
          cellPaddingY: 12,
          cellPaddingX: 16,
          fontSize: FlowRefVoice.size4,
          headerFontSize: FlowRefVoice.size3,
        ),
        // ── 10. chip ──
        chip: FlowCompChip(
          bg: sys.surfaceTertiary,
          bgSelected: Color.alphaBlend(
            FlowRefEnergy.blue500.withOpacity(FlowRefState.opacitySelected),
            sys.surfacePrimary,
          ),
          text: sys.textPrimary,
          textSelected: sys.textAccent,
          fontSm: FlowRefVoice.size3,
          fontMd: FlowRefVoice.size4,
          fontLg: FlowRefVoice.size5,
          fontXl: FlowRefVoice.size6,
          radius: sys.radiusFull,
          paddingX: FlowRefFrame.space5,
          paddingY: FlowRefFrame.space1,
          gap: FlowRefFrame.space2,
        ),
        // ── 11. iconButton ──
        iconButton: FlowCompIconButton(
          bgHigh: sys.actionHigh,
          bgHighHover: sys.actionHighHover,
          bgHighActive: sys.actionHighActive,
          iconHigh: sys.textInverse,
          bgMedium: sys.actionGhost,
          bgMediumHover: sys.actionSecondaryHover,
          bgMediumActive: sys.actionMediumActive,
          iconMedium: sys.textPrimary,
          borderMedium: sys.actionMediumBorder,
          bgLow: sys.actionGhost,
          bgLowHover: sys.actionGhostHover,
          bgLowActive: sys.actionSecondaryHover,
          iconLow: sys.textSecondary,
          bgOutline: sys.actionGhost,
          bgOutlineHover: sys.actionSecondaryHover,
          bgOutlineActive: sys.actionMediumActive,
          iconOutline: sys.textAccent,
          borderOutline: sys.borderStrong,
          bgDangerSubtle: sys.actionDestructiveSubtle,
          bgDangerHover: sys.actionDestructive,
          bgDangerActive: sys.actionDestructiveActive,
          iconDanger: sys.textDanger,
          iconDangerOnFilled: sys.textOnAction,
          bgDisabled: sys.stateDisabledBg,
          iconDisabled: sys.stateDisabledText,
          borderDisabled: sys.stateDisabledBorder,
          bgSelectedLow: Color.alphaBlend(
            FlowRefEnergy.blue500.withOpacity(FlowRefState.opacitySelected),
            sys.surfacePrimary,
          ),
          bgSelectedLowHover: Color.alphaBlend(
            FlowRefEnergy.blue500.withOpacity(0.16),
            sys.surfacePrimary,
          ),
          iconSelectedLow: sys.textAccent,
          bgSelectedMedium: sys.actionHigh,
          iconSelectedMedium: sys.textInverse,
          bgSelectedHigh: sys.actionHighActive,
          iconSelectedHigh: sys.textInverse,
          radius: sys.radiusControl,
          borderWidth: sys.borderControlWidth,
          sizeSm: sys.heightControlSm,
          sizeMd: sys.heightControlMd,
          sizeLg: sys.heightControlLg,
          sizeXl: sys.heightControlXl,
          iconSizeSm: sys.iconSizeSm,
          iconSizeMd: sys.iconSizeMd,
          iconSizeLg: sys.iconSizeLg,
          iconSizeXl: sys.iconSizeXl,
        ),
        // ── 12. dialog ──
        dialog: FlowCompDialog(
          bg: sys.surfacePrimary,
          shadow: sys.depthElevationHigh,
          radius: sys.radiusContainer,
          padding: sys.paddingContainer,
          maxWidth: sys.contentDialog,
        ),
        // ── 13. panel ──
        panel: FlowCompPanel(
          bg: sys.surfacePrimary,
          border: sys.borderDefault,
          shadow: const [],
          shadowFloating: sys.depthElevationMedium,
          radius: sys.radiusContainer,
          padding: sys.paddingContainer,
        ),
        // ── 14. tag ──
        tag: FlowCompTag(
          bg: sys.surfaceTertiary,
          font: FlowRefVoice.size2,
          radius: sys.radiusFull,
          paddingX: FlowRefFrame.space3,
          paddingY: FlowRefFrame.space1,
        ),
        // ── 15. avatar ──
        avatar: FlowCompAvatar(
          bg: sys.surfaceTertiary,
          text: sys.textPrimary,
          border: sys.borderDefault,
          statusOnline: sys.statusSuccess,
          statusOffline: sys.textTertiary,
          statusBusy: sys.statusError,
          statusAway: sys.statusWarning,
          statusRing: sys.surfacePrimary,
          sizeSm: 32,
          sizeMd: 40,
          sizeLg: 48,
          sizeXl: 64,
          radius: sys.radiusFull,
          radiusSquare: sys.radiusControl,
          fontSm: FlowRefVoice.size3,
          fontMd: FlowRefVoice.size5,
          fontLg: FlowRefVoice.size6,
          fontXl: FlowRefVoice.size8,
          statusSizeSm: 8,
          statusSizeMd: 10,
          statusSizeLg: 12,
          statusSizeXl: 16,
          statusRingWidth: sys.borderMedium,
        ),
        // ── 16. badge ──
        badge: FlowCompBadge(
          bgDefault: sys.statusError,
          bgAccent: sys.actionPrimary,
          bgSuccess: sys.statusSuccess,
          bgWarning: sys.statusWarning,
          text: sys.textOnAction,
          ring: sys.surfacePrimary,
          font: FlowRefVoice.size1,
          fontWeight: FlowRefVoice.weightBold,
          radius: sys.radiusFull,
          minSize: 8,
          height: 18,
          paddingX: FlowRefFrame.space1,
          ringWidth: sys.borderMedium,
        ),
        // ── 17. tabs ──
        tabs: FlowCompTabs(
          bg: FlowRefEnergy.transparent,
          borderDefault: sys.borderDefault,
          textDefault: sys.textSecondary,
          textActive: sys.textAccent,
          textHover: sys.textPrimary,
          indicator: sys.actionPrimary,
          filledBg: sys.surfaceSecondary,
          filledActiveBg: sys.surfacePrimary,
          filledActiveShadow: sys.depthElevationLight,
          indicatorHeight: sys.borderIndicator,
          filledRadius: sys.radiusControl,
          gap: FlowRefFrame.space0,
          paddingXSm: FlowRefFrame.space3,
          paddingXMd: FlowRefFrame.space4,
          paddingXLg: FlowRefFrame.space5,
          paddingXXl: FlowRefFrame.space6,
          heightSm: FlowRefFrame.space10,
          heightMd: FlowRefFrame.space11,
          heightLg: FlowRefFrame.space12,
          heightXl: 56,
          fontSm: FlowRefVoice.size4,
          fontMd: FlowRefVoice.size5,
          fontLg: FlowRefVoice.size6,
          fontXl: FlowRefVoice.size7,
        ),
        // ── 18. list ──
        list: FlowCompList(
          bg: FlowRefEnergy.transparent,
          itemBg: FlowRefEnergy.transparent,
          itemBgHover: sys.surfaceSecondary,
          itemBgSelected: Color.alphaBlend(
            FlowRefEnergy.blue500.withOpacity(FlowRefState.opacitySelected),
            sys.surfacePrimary,
          ),
          itemBgActive: sys.surfaceTertiary,
          textPrimary: sys.textPrimary,
          textSecondary: sys.textSecondary,
          textTertiary: sys.textTertiary,
          divider: sys.borderDefault,
          itemPaddingY: FlowRefFrame.space3,
          itemPaddingX: FlowRefFrame.space4,
          gap: FlowRefFrame.space0,
          radius: sys.radiusControl,
          iconSize: FlowRefIcon.sizeMd,
          avatarSize: 40,
        ),
        // ── 19. slider ──
        slider: FlowCompSlider(
          trackBg: sys.surfaceTertiary,
          trackFill: sys.actionPrimary,
          trackFillHover: sys.actionPrimaryHover,
          trackDisabled: sys.stateDisabledBg,
          thumbBg: sys.surfacePrimary,
          thumbBorder: sys.actionPrimary,
          thumbBorderHover: sys.actionPrimaryHover,
          thumbBorderDisabled: sys.stateDisabledBorder,
          label: sys.textSecondary,
          value: sys.textPrimary,
          thumbShadow: sys.depthElevationLight,
          trackHeight: 4,
          trackRadius: sys.radiusFull,
          thumbSize: 20,
          thumbRadius: sys.radiusFull,
          thumbBorderWidth: sys.borderMedium,
          focusRingSize: 36,
          focusRingOpacity: 0.2,
        ),
        // ── 20. circularProgress ──
        circularProgress: FlowCompCircularProgress(
          trackColor: sys.surfaceTertiary,
          fillDefault: sys.actionPrimary,
          fillSuccess: sys.statusSuccess,
          fillWarning: sys.statusWarning,
          fillError: sys.statusError,
          label: sys.textPrimary,
          sizeSm: 24,
          sizeMd: 40,
          sizeLg: 56,
          sizeXl: 80,
          strokeWidth: 4,
          fontSm: FlowRefVoice.size1,
          fontMd: FlowRefVoice.size3,
          fontLg: FlowRefVoice.size5,
          fontXl: FlowRefVoice.size7,
        ),
        // ── 21. accordion ──
        accordion: FlowCompAccordion(
          bg: sys.surfacePrimary,
          bgHover: sys.surfaceSecondary,
          bgContent: FlowRefEnergy.transparent,
          border: sys.borderDefault,
          borderExpanded: sys.actionPrimary,
          text: sys.textPrimary,
          textSecondary: sys.textSecondary,
          icon: sys.textTertiary,
          radius: sys.radiusControl,
          paddingX: FlowRefFrame.space5,
          paddingY: FlowRefFrame.space4,
          contentPaddingX: FlowRefFrame.space5,
          contentPaddingY: FlowRefFrame.space4,
          gap: FlowRefFrame.space0,
          heightSm: FlowRefFrame.space10,
          heightMd: FlowRefFrame.space11,
          heightLg: FlowRefFrame.space12,
          heightXl: 56,
          fontSm: FlowRefVoice.size4,
          fontMd: FlowRefVoice.size5,
          fontLg: FlowRefVoice.size6,
          fontXl: FlowRefVoice.size7,
        ),
        // ── 22. breadcrumbs ──
        breadcrumbs: FlowCompBreadcrumbs(
          text: sys.textSecondary,
          textHover: sys.textPrimary,
          textActive: sys.textPrimary,
          separator: sys.textTertiary,
          font: FlowRefVoice.size4,
          separatorFont: FlowRefVoice.size4,
          gap: FlowRefFrame.space2,
          itemPaddingX: FlowRefFrame.space1,
          itemPaddingY: FlowRefFrame.space1,
          itemRadius: FlowRefFrame.radius1,
        ),
        // ── 23. pagination ──
        pagination: FlowCompPagination(
          bg: FlowRefEnergy.transparent,
          bgHover: sys.surfaceSecondary,
          bgActive: sys.actionPrimary,
          text: sys.textSecondary,
          textHover: sys.textPrimary,
          textActive: sys.textOnAction,
          textDisabled: sys.stateDisabledText,
          border: sys.borderDefault,
          navIcon: sys.textSecondary,
          navIconDisabled: sys.stateDisabledText,
          radius: sys.radiusControl,
          height: 36,
          minWidth: 36,
          gap: FlowRefFrame.space1,
          font: FlowRefVoice.size4,
          fontWeight: FlowRefVoice.weightMedium,
        ),
        // ── 24. segmentedControl ──
        segmentedControl: FlowCompSegmentedControl(
          bg: sys.surfaceSecondary,
          bgActive: sys.surfacePrimary,
          bgHover: sys.surfaceTertiary,
          text: sys.textSecondary,
          textActive: sys.textPrimary,
          border: sys.borderDefault,
          shadow: sys.depthElevationLight,
          radius: sys.radiusControl,
          padding: FlowRefFrame.space1,
          gap: FlowRefFrame.space1,
          heightSm: FlowRefFrame.space10,
          heightMd: FlowRefFrame.space11,
          heightLg: FlowRefFrame.space12,
          heightXl: 56,
          fontSm: FlowRefVoice.size4,
          fontMd: FlowRefVoice.size5,
          fontLg: FlowRefVoice.size6,
          fontXl: FlowRefVoice.size7,
          segmentPaddingX: FlowRefFrame.space4,
        ),
        // ── 25. stepper ──
        stepper: FlowCompStepper(
          indicatorBg: sys.surfaceSecondary,
          indicatorBgCurrent: sys.actionPrimary,
          indicatorBgComplete: sys.actionPrimary,
          indicatorBgError: sys.statusError,
          indicatorBgUpcoming: sys.surfaceTertiary,
          indicatorText: sys.textSecondary,
          indicatorTextActive: sys.textOnAction,
          indicatorTextError: sys.textOnAction,
          labelText: sys.textPrimary,
          labelTextSecondary: sys.textSecondary,
          labelTextUpcoming: sys.textTertiary,
          connectorDefault: sys.borderDefault,
          connectorComplete: sys.actionPrimary,
          indicatorSizeSm: 28,
          indicatorSizeMd: 32,
          indicatorSizeLg: 40,
          indicatorSizeXl: 48,
          connectorHeight: sys.borderMedium,
          fontSm: FlowRefVoice.size3,
          fontMd: FlowRefVoice.size4,
          fontLg: FlowRefVoice.size5,
          fontXl: FlowRefVoice.size6,
          labelFontSm: FlowRefVoice.size3,
          labelFontMd: FlowRefVoice.size4,
          labelFontLg: FlowRefVoice.size5,
          labelFontXl: FlowRefVoice.size6,
          descFontSm: FlowRefVoice.size1,
          descFontMd: FlowRefVoice.size2,
          descFontLg: FlowRefVoice.size3,
          descFontXl: FlowRefVoice.size4,
          gap: FlowRefFrame.space3,
        ),
        // ── 26. bottomNav ──
        bottomNav: FlowCompBottomNav(
          bg: sys.surfacePrimary,
          border: sys.borderDefault,
          textDefault: sys.textTertiary,
          textActive: sys.actionPrimary,
          iconDefault: sys.textTertiary,
          iconActive: sys.actionPrimary,
          indicatorBg: Color.alphaBlend(
            FlowRefEnergy.blue500.withOpacity(FlowRefState.opacitySelected),
            sys.surfacePrimary,
          ),
          badgeBg: sys.statusError,
          badgeText: sys.textOnAction,
          shadow: sys.depthElevationMedium,
          height: 64,
          labelFont: FlowRefVoice.size1,
          iconSize: FlowRefIcon.sizeMd,
          itemGap: FlowRefFrame.space1,
          badgeSize: 18,
          badgeDotSize: 8,
          badgeFont: FlowRefVoice.size1,
        ),
        // ── 27. fab ──
        fab: FlowCompFab(
          bgPrimary: sys.actionHigh,
          bgPrimaryHover: sys.actionHighHover,
          bgPrimaryActive: sys.actionHighActive,
          textPrimary: sys.textInverse,
          bgSecondary: sys.surfaceSecondary,
          bgSecondaryHover: sys.surfaceTertiary,
          textSecondary: sys.textPrimary,
          bgTertiary: sys.surfacePrimary,
          bgTertiaryHover: sys.surfaceSecondary,
          textTertiary: sys.actionPrimary,
          shadow: sys.depthElevationMedium,
          shadowHover: sys.depthElevationHigh,
          radius: sys.radiusControl,
          sizeSm: 40,
          sizeMd: 56,
          sizeLg: 72,
          paddingX: FlowRefFrame.space4,
          gap: FlowRefFrame.space2,
          labelFont: FlowRefVoice.size5,
          offset: FlowRefFrame.space4,
        ),
        // ── 28. toolbar ──
        toolbar: FlowCompToolbar(
          bg: sys.surfacePrimary,
          border: sys.borderDefault,
          dividerColor: sys.borderDefault,
          radius: sys.radiusControl,
          padding: FlowRefFrame.space2,
          gap: FlowRefFrame.space1,
          dividerWidth: sys.borderThin,
          heightSm: FlowRefFrame.space10,
          heightMd: FlowRefFrame.space11,
          heightLg: FlowRefFrame.space12,
        ),
        // ── 29. popover ──
        popover: FlowCompPopover(
          bg: sys.surfacePrimary,
          border: sys.borderDefault,
          shadow: sys.depthElevationHigh,
          radius: sys.radiusContainer,
          padding: FlowRefFrame.space4,
          maxWidth: 360,
        ),
        // ── 30. bottomSheet ──
        bottomSheet: FlowCompBottomSheet(
          bg: sys.surfacePrimary,
          border: sys.borderDefault,
          handleBg: sys.textTertiary,
          overlay: sys.depthOverlay,
          shadow: sys.depthElevationHigh,
          radius: 16,
          handleWidth: 40,
          handleHeight: 4,
          handleMargin: FlowRefFrame.space3,
          padding: FlowRefFrame.space5,
          headerFont: FlowRefVoice.size6,
        ),
        // ── 31. contextMenu ──
        contextMenu: FlowCompContextMenu(
          bg: sys.surfacePrimary,
          border: sys.borderDefault,
          itemBgHover: sys.surfaceSecondary,
          itemBgActive: sys.surfaceTertiary,
          textDefault: sys.textPrimary,
          textSecondary: sys.textSecondary,
          textDanger: sys.textDanger,
          textDisabled: sys.stateDisabledText,
          separator: sys.borderDefault,
          shadow: sys.depthElevationHigh,
          radius: sys.radiusContainer,
          padding: FlowRefFrame.space1,
          itemPaddingX: FlowRefFrame.space3,
          itemPaddingY: FlowRefFrame.space2,
          itemRadius: FlowRefFrame.radius1,
          shortcutFont: FlowRefVoice.size2,
          font: FlowRefVoice.size4,
          iconSize: FlowRefIcon.sizeSm,
          minWidth: 180,
          maxWidth: 320,
        ),
        // ── 32. menu ──
        menu: FlowCompMenu(
          bg: sys.surfacePrimary,
          border: sys.borderDefault,
          itemBgHover: sys.surfaceSecondary,
          itemBgActive: sys.surfaceTertiary,
          textDefault: sys.textPrimary,
          textSecondary: sys.textSecondary,
          textDanger: sys.textDanger,
          textDisabled: sys.stateDisabledText,
          separator: sys.borderDefault,
          shadow: sys.depthElevationMedium,
          radius: sys.radiusContainer,
          padding: FlowRefFrame.space1,
          itemPaddingX: FlowRefFrame.space3,
          itemPaddingY: FlowRefFrame.space2,
          itemRadius: FlowRefFrame.radius1,
          font: FlowRefVoice.size4,
          iconSize: FlowRefIcon.sizeSm,
          checkSize: FlowRefIcon.sizeSm,
          minWidth: 160,
          maxWidth: 320,
        ),
        // ── 33. toggleButton ──
        toggleButton: FlowCompToggleButton(
          bgOff: sys.surfaceSecondary,
          bgOffHover: sys.surfaceTertiary,
          bgOn: sys.actionPrimary,
          bgOnHover: sys.actionPrimaryHover,
          textOff: sys.textPrimary,
          textOn: sys.textOnAction,
          border: sys.borderDefault,
          borderOn: sys.actionPrimary,
          bgDisabled: sys.stateDisabledBg,
          textDisabled: sys.stateDisabledText,
          borderDisabled: sys.stateDisabledBorder,
          radius: sys.radiusControl,
          borderWidth: sys.borderControlWidth,
          heightSm: sys.heightControlSm,
          heightMd: sys.heightControlMd,
          heightLg: sys.heightControlLg,
          heightXl: sys.heightControlXl,
          paddingX: FlowRefFrame.space4,
          gap: FlowRefFrame.space2,
          fontSm: FlowRefVoice.size4,
          fontMd: FlowRefVoice.size5,
          fontLg: FlowRefVoice.size6,
          fontXl: FlowRefVoice.size7,
          groupGap: FlowRefFrame.space0,
          groupRadius: sys.radiusControl,
        ),
        // ── 34. search ──
        search: FlowCompSearch(
          bg: sys.surfaceSecondary,
          bgFocus: sys.surfacePrimary,
          border: sys.borderDefault,
          borderFocus: sys.borderFocus,
          text: sys.textPrimary,
          placeholder: sys.textTertiary,
          icon: sys.textSecondary,
          clearIcon: sys.textTertiary,
          clearIconHover: sys.textPrimary,
          shortcutBg: sys.surfaceTertiary,
          shortcutBorder: sys.borderDefault,
          shortcutText: sys.textTertiary,
          radius: sys.radiusFull,
          height: sys.heightControlMd,
          heightSm: sys.heightControlSm,
          heightLg: sys.heightControlLg,
          paddingX: FlowRefFrame.space4,
          font: FlowRefVoice.size5,
          fontSm: FlowRefVoice.size4,
          fontLg: FlowRefVoice.size6,
          iconSize: FlowRefIcon.sizeSm,
          shortcutFont: FlowRefVoice.size2,
          shortcutRadius: FlowRefFrame.radius1,
        ),
        // ── 35. pullToRefresh ──
        pullToRefresh: FlowCompPullToRefresh(
          bg: sys.surfacePrimary,
          spinnerColor: sys.actionPrimary,
          spinnerTrack: sys.borderDefault,
          text: sys.textSecondary,
          spinnerSize: 24,
          font: FlowRefVoice.size3,
          pullMaxHeight: 80,
          threshold: 64,
          padding: FlowRefFrame.space4,
        ),
        // ── 36. swipeActions ──
        swipeActions: FlowCompSwipeActions(
          bg: sys.surfacePrimary,
          dangerBg: sys.statusError,
          dangerText: sys.textInverse,
          successBg: sys.statusSuccess,
          successText: sys.textInverse,
          warningBg: sys.statusWarning,
          warningText: sys.textPrimary,
          defaultBg: sys.surfaceTertiary,
          defaultText: sys.textPrimary,
          actionPadding: FlowRefFrame.space4,
          actionFont: FlowRefVoice.size3,
          actionIconSize: FlowRefIcon.sizeSm,
          threshold: 80,
          maxSwipe: 200,
        ),
        // ── 37. sidebar ──
        sidebar: FlowCompSidebar(
          bg: sys.surfacePrimary,
          border: sys.borderDefault,
          itemBg: FlowRefEnergy.transparent,
          itemBgHover: sys.surfaceSecondary,
          itemBgActive: sys.surfaceTertiary,
          itemText: sys.textSecondary,
          itemTextActive: sys.textPrimary,
          itemTextHover: sys.textPrimary,
          groupLabelColor: sys.textTertiary,
          divider: sys.borderDefault,
          toggleBg: sys.surfacePrimary,
          toggleBorder: sys.borderDefault,
          toggleIcon: sys.textSecondary,
          shadow: sys.depthElevationLight,
          widthExpanded: sys.sidebarExpanded,
          widthCollapsed: sys.sidebarCollapsed,
          padding: FlowRefFrame.space3,
          headerHeight: 56,
          itemPaddingX: FlowRefFrame.space3,
          itemPaddingY: FlowRefFrame.space2,
          itemRadius: FlowRefFrame.radius2,
          itemIconSize: FlowRefIcon.sizeSm,
          itemFont: FlowRefVoice.size4,
          groupLabelFont: FlowRefVoice.size2,
          groupMarginTop: FlowRefFrame.space4,
          toggleSize: 32,
        ),
        // ── 38. topbar ──
        topbar: FlowCompTopbar(
          bg: sys.surfacePrimary,
          border: sys.borderDefault,
          text: sys.textPrimary,
          textSecondary: sys.textSecondary,
          shadow: sys.depthElevationLight,
          height: 56,
          paddingX: FlowRefFrame.space5,
          titleFont: FlowRefVoice.size6,
          iconSize: FlowRefIcon.sizeMd,
          gap: FlowRefFrame.space3,
          actionGap: FlowRefFrame.space2,
        ),
        // ── 39. autocomplete ──
        autocomplete: FlowCompAutocomplete(
          bg: sys.surfacePrimary,
          border: sys.borderDefault,
          borderFocus: sys.borderFocus,
          borderError: sys.statusError,
          text: sys.textPrimary,
          placeholder: sys.textTertiary,
          labelText: sys.textSecondary,
          clearIcon: sys.textTertiary,
          clearIconHover: sys.textPrimary,
          dropdownBg: sys.surfacePrimary,
          dropdownBorder: sys.borderDefault,
          itemBgHover: sys.surfaceSecondary,
          itemBgSelected: sys.surfaceTertiary,
          itemText: sys.textPrimary,
          itemTextSecondary: sys.textSecondary,
          highlightText: sys.actionPrimary,
          emptyText: sys.textTertiary,
          dropdownShadow: sys.depthElevationMedium,
          labelFont: FlowRefVoice.size3,
          font: FlowRefVoice.size5,
          radius: sys.radiusControl,
          height: sys.heightControlMd,
          heightSm: sys.heightControlSm,
          heightLg: sys.heightControlLg,
          paddingX: FlowRefFrame.space3,
          iconSize: FlowRefIcon.sizeSm,
          dropdownRadius: sys.radiusContainer,
          dropdownMaxHeight: 240,
          dropdownPadding: FlowRefFrame.space1,
          itemPaddingX: FlowRefFrame.space3,
          itemPaddingY: FlowRefFrame.space2,
          itemRadius: FlowRefFrame.radius1,
          itemFont: FlowRefVoice.size4,
          emptyFont: FlowRefVoice.size4,
        ),
        // ── 40. layoutGrid ──
        layoutGrid: FlowCompLayoutGrid(
          lgColumns: FlowRefFrame.gridLgColumns,
          lgGutter: FlowRefFrame.gridLgGutter,
          lgMargin: FlowRefFrame.gridLgMargin,
          lgMaxWidth: FlowRefFrame.gridLgMaxWidth,
          mdColumns: FlowRefFrame.gridMdColumns,
          mdGutter: FlowRefFrame.gridMdGutter,
          mdMargin: FlowRefFrame.gridMdMargin,
          smColumns: FlowRefFrame.gridSmColumns,
          smGutter: FlowRefFrame.gridSmGutter,
          smMargin: FlowRefFrame.gridSmMargin,
        ),
      );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  Factory constructors
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  factory FlowCompTokens.light(FlowSysTokens sys) => _fromSys(sys);
  factory FlowCompTokens.dark(FlowSysTokens sys) => _fromSys(sys);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  copyWith
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  @override
  FlowCompTokens copyWith({
    FlowCompButton? button,
    FlowCompTextInput? textInput,
    FlowCompCountrySelect? countrySelect,
    FlowCompRadio? radio,
    FlowCompCheckbox? checkbox,
    FlowCompSwitch? switchControl,
    FlowCompCountryDropdown? countryDropdown,
    FlowCompCard? card,
    FlowCompTable? table,
    FlowCompChip? chip,
    FlowCompIconButton? iconButton,
    FlowCompDialog? dialog,
    FlowCompPanel? panel,
    FlowCompTag? tag,
    FlowCompAvatar? avatar,
    FlowCompBadge? badge,
    FlowCompTabs? tabs,
    FlowCompList? list,
    FlowCompSlider? slider,
    FlowCompCircularProgress? circularProgress,
    FlowCompAccordion? accordion,
    FlowCompBreadcrumbs? breadcrumbs,
    FlowCompPagination? pagination,
    FlowCompSegmentedControl? segmentedControl,
    FlowCompStepper? stepper,
    FlowCompBottomNav? bottomNav,
    FlowCompFab? fab,
    FlowCompToolbar? toolbar,
    FlowCompPopover? popover,
    FlowCompBottomSheet? bottomSheet,
    FlowCompContextMenu? contextMenu,
    FlowCompMenu? menu,
    FlowCompToggleButton? toggleButton,
    FlowCompSearch? search,
    FlowCompPullToRefresh? pullToRefresh,
    FlowCompSwipeActions? swipeActions,
    FlowCompSidebar? sidebar,
    FlowCompTopbar? topbar,
    FlowCompAutocomplete? autocomplete,
    FlowCompLayoutGrid? layoutGrid,
  }) =>
      FlowCompTokens(
        button: button ?? this.button,
        textInput: textInput ?? this.textInput,
        countrySelect: countrySelect ?? this.countrySelect,
        radio: radio ?? this.radio,
        checkbox: checkbox ?? this.checkbox,
        switchControl: switchControl ?? this.switchControl,
        countryDropdown: countryDropdown ?? this.countryDropdown,
        card: card ?? this.card,
        table: table ?? this.table,
        chip: chip ?? this.chip,
        iconButton: iconButton ?? this.iconButton,
        dialog: dialog ?? this.dialog,
        panel: panel ?? this.panel,
        tag: tag ?? this.tag,
        avatar: avatar ?? this.avatar,
        badge: badge ?? this.badge,
        tabs: tabs ?? this.tabs,
        list: list ?? this.list,
        slider: slider ?? this.slider,
        circularProgress: circularProgress ?? this.circularProgress,
        accordion: accordion ?? this.accordion,
        breadcrumbs: breadcrumbs ?? this.breadcrumbs,
        pagination: pagination ?? this.pagination,
        segmentedControl: segmentedControl ?? this.segmentedControl,
        stepper: stepper ?? this.stepper,
        bottomNav: bottomNav ?? this.bottomNav,
        fab: fab ?? this.fab,
        toolbar: toolbar ?? this.toolbar,
        popover: popover ?? this.popover,
        bottomSheet: bottomSheet ?? this.bottomSheet,
        contextMenu: contextMenu ?? this.contextMenu,
        menu: menu ?? this.menu,
        toggleButton: toggleButton ?? this.toggleButton,
        search: search ?? this.search,
        pullToRefresh: pullToRefresh ?? this.pullToRefresh,
        swipeActions: swipeActions ?? this.swipeActions,
        sidebar: sidebar ?? this.sidebar,
        topbar: topbar ?? this.topbar,
        autocomplete: autocomplete ?? this.autocomplete,
        layoutGrid: layoutGrid ?? this.layoutGrid,
      );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  lerp — snap transition (no field-level lerp)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  @override
  FlowCompTokens lerp(covariant FlowCompTokens? other, double t) {
    if (other == null) return this;
    return this; // Snap transition — comp tokens are aggregates of inner classes
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Extension: FlowCompTokensAccess — convenience accessor
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

extension FlowCompTokensAccess on BuildContext {
  FlowCompTokens get flowComp => Theme.of(this).extension<FlowCompTokens>()!;
}
