/// FLOW Design System — FlowButton (L3 Component)
/// ──────────────────────────────────────────────
/// Multi-variant action button with loading, icon, and full-width support.
/// Composes FlowActionSurface (L2 primitive) for state resolution,
/// aria, disabled/loading handling, and focus ring.
///
/// Maps to React's `<FlowButton>` from FlowButton.tsx.
import 'package:flutter/material.dart';

import '../../primitives/icon.dart';
import '../../theme/flow_size_provider.dart';
import '../../tokens/comp_tokens.dart';
import '../../tokens/density.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Enums
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Visual emphasis variant controlling color and prominence.
enum FlowButtonVariant {
  high,
  medium,
  low,
  outline,
  danger,
  warning,
  ghost,
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Size maps (mirrors React controlIconSizeMap / spinnerSizeMap)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const _iconSizeMap = <FlowComponentSize, FlowIconSize>{
  FlowComponentSize.sm: FlowIconSize.sm,
  FlowComponentSize.md: FlowIconSize.sm,
  FlowComponentSize.lg: FlowIconSize.md,
  FlowComponentSize.xl: FlowIconSize.lg,
};

const _spinnerSizeMap = <FlowComponentSize, double>{
  FlowComponentSize.sm: 16,
  FlowComponentSize.md: 16,
  FlowComponentSize.lg: 20,
  FlowComponentSize.xl: 20,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowButton
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowButton extends StatelessWidget {
  const FlowButton({
    super.key,
    required this.child,
    this.variant = FlowButtonVariant.high,
    this.size,
    this.disabled = false,
    this.loading = false,
    this.loadingLabel,
    this.fullWidth = false,
    this.onPressed,
    this.leadingIcon,
  });

  /// Button content (label text or widget).
  final Widget child;

  /// Visual variant controlling color and prominence.
  final FlowButtonVariant variant;

  /// Button size variant. Omit to inherit from [FlowSizeProvider].
  final FlowComponentSize? size;

  /// Whether the button is disabled.
  final bool disabled;

  /// Whether the button is in a loading state.
  final bool loading;

  /// Optional label shown during loading. Falls back to [child].
  final String? loadingLabel;

  /// Whether the button spans the full width of its container.
  final bool fullWidth;

  /// Callback fired when the button is pressed.
  final VoidCallback? onPressed;

  /// Icon displayed before the label.
  final IconData? leadingIcon;

  // ── Helpers ──

  FlowComponentSize _resolvedSize(BuildContext context) =>
      size ?? FlowSizeProvider.of(context);

  double _height(FlowCompButton t, FlowComponentSize s) {
    switch (s) {
      case FlowComponentSize.sm:
        return t.heightSm;
      case FlowComponentSize.md:
        return t.heightMd;
      case FlowComponentSize.lg:
        return t.heightLg;
      case FlowComponentSize.xl:
        return t.heightXl;
    }
  }

  double _fontSize(FlowCompButton t, FlowComponentSize s) {
    switch (s) {
      case FlowComponentSize.sm:
        return t.fontSm;
      case FlowComponentSize.md:
        return t.fontMd;
      case FlowComponentSize.lg:
        return t.fontLg;
      case FlowComponentSize.xl:
        return t.fontXl;
    }
  }

  _VariantColors _resolveVariant(FlowCompButton t) {
    switch (variant) {
      case FlowButtonVariant.high:
        return _VariantColors(
            bg: t.bgHigh, bgHover: t.bgHighHover, text: t.textHigh);
      case FlowButtonVariant.medium:
        return _VariantColors(
          bg: t.bgMedium,
          bgHover: t.bgMediumHover,
          text: t.textMedium,
          border: t.borderMedium,
          borderWidth: t.borderWidth,
        );
      case FlowButtonVariant.low:
        return _VariantColors(bg: t.bgLow, bgHover: t.bgLow, text: t.textLow);
      case FlowButtonVariant.outline:
        return _VariantColors(
          bg: t.bgOutline,
          bgHover: t.bgOutlineHover,
          text: t.textOutline,
          border: t.borderOutline,
          borderWidth: t.borderWidth,
        );
      case FlowButtonVariant.danger:
        return _VariantColors(
          bg: t.bgDangerSubtle,
          bgHover: t.bgDangerHover,
          text: t.textDangerSubtle,
        );
      case FlowButtonVariant.warning:
        return _VariantColors(
          bg: t.bgDangerSubtle,
          bgHover: t.bgDangerHover,
          text: t.textDangerSubtle,
        );
      case FlowButtonVariant.ghost:
        return _VariantColors(bg: t.bgLow, bgHover: t.bgLow, text: t.textLow);
    }
  }

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.button;
    final s = _resolvedSize(context);
    final isInert = disabled || loading;
    final vc = disabled
        ? _VariantColors(
            bg: t.bgDisabled,
            bgHover: t.bgDisabled,
            text: t.textDisabled,
            border: t.borderDisabled,
            borderWidth: t.borderWidth,
          )
        : _resolveVariant(t);

    final displayChild = loading && loadingLabel != null
        ? Text(loadingLabel!,
            style: TextStyle(fontSize: _fontSize(t, s), color: vc.text))
        : DefaultTextStyle.merge(
            style: TextStyle(fontSize: _fontSize(t, s), color: vc.text),
            child: child,
          );

    final spinnerSize = _spinnerSizeMap[s]!;

    final content = Row(
      mainAxisSize: fullWidth ? MainAxisSize.max : MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        if (loading)
          Padding(
            padding: EdgeInsets.only(right: t.gap),
            child: SizedBox(
              width: spinnerSize,
              height: spinnerSize,
              child: CircularProgressIndicator(
                strokeWidth: 2,
                color: vc.text,
              ),
            ),
          )
        else if (leadingIcon != null)
          Padding(
            padding: EdgeInsets.only(right: t.gap),
            child: FlowIcon(
              leadingIcon!,
              size: _iconSizeMap[s]!,
              iconColor: vc.text,
            ),
          ),
        Flexible(child: displayChild),
      ],
    );

    final shape = RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(t.radius),
      side: vc.border != null
          ? BorderSide(color: vc.border!, width: vc.borderWidth)
          : BorderSide.none,
    );

    final semanticLabel = loading ? (loadingLabel ?? 'Loading') : null;

    Widget button = Semantics(
      button: true,
      enabled: !isInert,
      label: semanticLabel,
      child: Material(
        color: vc.bg,
        shape: shape,
        child: InkWell(
          onTap: isInert ? null : onPressed,
          customBorder: shape,
          hoverColor: vc.bgHover,
          splashColor: vc.bgHover,
          child: Container(
            height: _height(t, s),
            padding: EdgeInsets.symmetric(horizontal: t.paddingX),
            alignment: Alignment.center,
            child: content,
          ),
        ),
      ),
    );

    if (fullWidth) {
      button = SizedBox(width: double.infinity, child: button);
    }

    return button;
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Internal — resolved variant colors
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class _VariantColors {
  const _VariantColors({
    required this.bg,
    required this.bgHover,
    required this.text,
    this.border,
    this.borderWidth = 0,
  });

  final Color bg;
  final Color bgHover;
  final Color text;
  final Color? border;
  final double borderWidth;
}
