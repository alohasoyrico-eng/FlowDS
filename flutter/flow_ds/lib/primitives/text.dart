/// FLOW Design System — FlowText Primitive
/// ────────────────────────────────────────
/// Themed text with role-based styling and tone-based color.
/// Maps to React's `<Text>`.
import 'package:flutter/material.dart';

import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Enums
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Typography roles, matching React's 4x4 grid + utility roles.
enum FlowTextRole {
  displayXl,
  displayL,
  displayM,
  displayS,
  displayXs,
  headingL,
  headingM,
  labelXl,
  labelL,
  labelM,
  labelS,
  labelXs,
  paragraphL,
  paragraphM,
  paragraphS,
  caption,
  overline,
}

/// Semantic text color, maps to sys text color tokens.
enum FlowTextColor {
  primary,
  secondary,
  tertiary,
  inverse,
  accent,
  danger,
  success,
  warning,
  link,
  onAction,
  disabled,
}

/// Tone selects font weight + color from the tone system.
enum FlowTone {
  neutral,
  brand,
  marketing,
  system,
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowText
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowText extends StatelessWidget {
  const FlowText(
    this.data, {
    super.key,
    this.role = FlowTextRole.paragraphM,
    this.color,
    this.tone,
    this.weight,
    this.align,
    this.maxLines,
    this.overflow,
    this.semanticLabel,
  });

  final String data;
  final FlowTextRole role;
  final FlowTextColor? color;
  final FlowTone? tone;
  final FontWeight? weight;
  final TextAlign? align;
  final int? maxLines;
  final TextOverflow? overflow;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    final style = _resolveStyle(sys);
    final resolvedColor = tone != null
        ? _resolveToneColor(sys, tone!)
        : color != null
            ? _resolveColor(sys, color!)
            : sys.textPrimary;

    final mergedStyle = style.copyWith(
      color: resolvedColor,
      fontWeight: weight ??
          (tone != null ? _resolveToneWeight(sys, tone!) : style.fontWeight),
    );

    Widget result = Text(
      data,
      style: mergedStyle,
      textAlign: align,
      maxLines: maxLines,
      overflow: overflow ?? (maxLines != null ? TextOverflow.ellipsis : null),
    );

    if (semanticLabel != null) {
      result = Semantics(label: semanticLabel, child: result);
    }

    return result;
  }

  TextStyle _resolveStyle(FlowSysTokens sys) {
    switch (role) {
      case FlowTextRole.displayXl:
        return TextStyle(
          fontFamily: sys.displayXlFontFamily,
          fontSize: sys.displayXlFontSize,
          fontWeight: sys.displayXlFontWeight,
          height: sys.displayXlLineHeight,
          letterSpacing: sys.displayXlLetterSpacing * sys.displayXlFontSize,
        );
      case FlowTextRole.displayL:
        return TextStyle(
          fontFamily: sys.displayLFontFamily,
          fontSize: sys.displayLFontSize,
          fontWeight: sys.displayLFontWeight,
          height: sys.displayLLineHeight,
          letterSpacing: sys.displayLLetterSpacing * sys.displayLFontSize,
        );
      case FlowTextRole.displayM:
        return TextStyle(
          fontFamily: sys.displayMFontFamily,
          fontSize: sys.displayMFontSize,
          fontWeight: sys.displayMFontWeight,
          height: sys.displayMLineHeight,
          letterSpacing: sys.displayMLetterSpacing * sys.displayMFontSize,
        );
      case FlowTextRole.displayS:
        return TextStyle(
          fontFamily: sys.displaySFontFamily,
          fontSize: sys.displaySFontSize,
          fontWeight: sys.displaySFontWeight,
          height: sys.displaySLineHeight,
          letterSpacing: sys.displaySLetterSpacing * sys.displaySFontSize,
        );
      case FlowTextRole.displayXs:
        return TextStyle(
          fontFamily: sys.displayXsFontFamily,
          fontSize: sys.displayXsFontSize,
          fontWeight: sys.displayXsFontWeight,
          height: sys.displayXsLineHeight,
          letterSpacing: sys.displayXsLetterSpacing * sys.displayXsFontSize,
        );
      case FlowTextRole.headingL:
        return TextStyle(
          fontFamily: sys.headingLFontFamily,
          fontSize: sys.headingLFontSize,
          fontWeight: sys.headingLFontWeight,
          height: sys.headingLLineHeight,
          letterSpacing: sys.headingLLetterSpacing * sys.headingLFontSize,
        );
      case FlowTextRole.headingM:
        return TextStyle(
          fontFamily: sys.headingMFontFamily,
          fontSize: sys.headingMFontSize,
          fontWeight: sys.headingMFontWeight,
          height: sys.headingMLineHeight,
          letterSpacing: sys.headingMLetterSpacing * sys.headingMFontSize,
        );
      case FlowTextRole.labelXl:
        return TextStyle(
          fontFamily: sys.controlFontFamily,
          fontSize: sys.labelXlFontSize,
          fontWeight: sys.controlFontWeight,
          height: sys.controlLineHeight,
        );
      case FlowTextRole.labelL:
        return TextStyle(
          fontFamily: sys.controlFontFamily,
          fontSize: sys.labelLFontSize,
          fontWeight: sys.controlFontWeight,
          height: sys.controlLineHeight,
        );
      case FlowTextRole.labelM:
        return TextStyle(
          fontFamily: sys.controlFontFamily,
          fontSize: sys.labelMFontSize,
          fontWeight: sys.controlFontWeight,
          height: sys.controlLineHeight,
        );
      case FlowTextRole.labelS:
        return TextStyle(
          fontFamily: sys.controlFontFamily,
          fontSize: sys.labelSFontSize,
          fontWeight: sys.controlFontWeight,
          height: sys.controlLineHeight,
        );
      case FlowTextRole.labelXs:
        return TextStyle(
          fontFamily: sys.controlFontFamily,
          fontSize: sys.labelXsFontSize,
          fontWeight: sys.controlFontWeight,
          height: sys.controlLineHeight,
        );
      case FlowTextRole.paragraphL:
        return TextStyle(
          fontFamily: sys.controlFontFamily,
          fontSize: sys.paragraphLFontSize,
          height: 1.5,
        );
      case FlowTextRole.paragraphM:
        return TextStyle(
          fontFamily: sys.controlFontFamily,
          fontSize: sys.paragraphMFontSize,
          height: 1.5,
        );
      case FlowTextRole.paragraphS:
        return TextStyle(
          fontFamily: sys.controlFontFamily,
          fontSize: sys.paragraphSFontSize,
          height: 1.5,
        );
      case FlowTextRole.caption:
        return TextStyle(
          fontFamily: sys.captionFontFamily,
          fontSize: sys.captionFontSize,
          fontWeight: sys.captionFontWeight,
          height: sys.captionLineHeight,
          letterSpacing: sys.captionLetterSpacing * sys.captionFontSize,
        );
      case FlowTextRole.overline:
        return TextStyle(
          fontFamily: sys.overlineFontFamily,
          fontSize: sys.overlineFontSize,
          fontWeight: sys.overlineFontWeight,
          height: sys.overlineLineHeight,
          letterSpacing: sys.overlineLetterSpacing * sys.overlineFontSize,
        );
    }
  }

  Color _resolveColor(FlowSysTokens sys, FlowTextColor c) {
    switch (c) {
      case FlowTextColor.primary:
        return sys.textPrimary;
      case FlowTextColor.secondary:
        return sys.textSecondary;
      case FlowTextColor.tertiary:
        return sys.textTertiary;
      case FlowTextColor.inverse:
        return sys.textInverse;
      case FlowTextColor.accent:
        return sys.textAccent;
      case FlowTextColor.danger:
        return sys.textDanger;
      case FlowTextColor.success:
        return sys.textSuccess;
      case FlowTextColor.warning:
        return sys.textWarning;
      case FlowTextColor.link:
        return sys.textLink;
      case FlowTextColor.onAction:
        return sys.textOnAction;
      case FlowTextColor.disabled:
        return sys.textDisabled;
    }
  }

  Color _resolveToneColor(FlowSysTokens sys, FlowTone t) {
    switch (t) {
      case FlowTone.neutral:
        return sys.toneNeutralText;
      case FlowTone.brand:
        return sys.toneBrandText;
      case FlowTone.marketing:
        return sys.toneMarketingText;
      case FlowTone.system:
        return sys.toneSystemText;
    }
  }

  FontWeight _resolveToneWeight(FlowSysTokens sys, FlowTone t) {
    switch (t) {
      case FlowTone.neutral:
        return sys.toneNeutralWeight;
      case FlowTone.brand:
        return sys.toneBrandWeight;
      case FlowTone.marketing:
        return sys.toneMarketingWeight;
      case FlowTone.system:
        return sys.toneSystemWeight;
    }
  }
}
