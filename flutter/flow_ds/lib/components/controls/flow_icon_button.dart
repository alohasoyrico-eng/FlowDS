/// FLOW Design System — FlowIconButton (L3 Component)
/// ──────────────────────────────────────────────────
/// Icon-only button with tooltip, badge, selected toggle, and variant support.
/// Composes Material InkWell for state resolution and focus ring.
///
/// Maps to React's `<FlowIconButton>` from FlowIconButton.tsx.
import 'package:flutter/material.dart';

import '../../primitives/icon.dart';
import '../../theme/flow_size_provider.dart';
import '../../tokens/comp_tokens.dart';
import '../../tokens/density.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Enums
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Visual emphasis variant for icon buttons.
enum FlowIconButtonVariant {
  high,
  medium,
  low,
  outline,
  danger,
  warning,
  ghost,
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Size maps (mirrors React iconBtnIconSizeMap / spinnerSizeMap)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const _iconBtnIconSizeMap = <FlowComponentSize, FlowIconSize>{
  FlowComponentSize.sm: FlowIconSize.sm,
  FlowComponentSize.md: FlowIconSize.md,
  FlowComponentSize.lg: FlowIconSize.lg,
  FlowComponentSize.xl: FlowIconSize.xl,
};

const _spinnerSizeMap = <FlowComponentSize, double>{
  FlowComponentSize.sm: 16,
  FlowComponentSize.md: 16,
  FlowComponentSize.lg: 20,
  FlowComponentSize.xl: 20,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowIconButton
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowIconButton extends StatelessWidget {
  const FlowIconButton({
    super.key,
    required this.icon,
    this.variant = FlowIconButtonVariant.low,
    this.size,
    this.disabled = false,
    this.loading = false,
    this.selected = false,
    this.onPressed,
    this.tooltip,
    this.badge,
    this.semanticLabel,
  });

  /// Icon to display.
  final IconData icon;

  /// Visual variant controlling color and prominence.
  final FlowIconButtonVariant variant;

  /// Button size variant. Omit to inherit from [FlowSizeProvider].
  final FlowComponentSize? size;

  /// Whether the button is disabled.
  final bool disabled;

  /// Whether the button is in a loading state.
  final bool loading;

  /// Toggle selected state for toolbar/toggle buttons.
  final bool selected;

  /// Callback fired when the button is pressed.
  final VoidCallback? onPressed;

  /// Tooltip shown on long-press / hover.
  final String? tooltip;

  /// Badge count. Pass 0 for a dot indicator, >0 for a count badge.
  final int? badge;

  /// Accessible label for the icon-only button.
  final String? semanticLabel;

  // ── Helpers ──

  FlowComponentSize _resolvedSize(BuildContext context) =>
      size ?? FlowSizeProvider.of(context);

  double _boxSize(FlowCompIconButton t, FlowComponentSize s) {
    switch (s) {
      case FlowComponentSize.sm:
        return t.sizeSm;
      case FlowComponentSize.md:
        return t.sizeMd;
      case FlowComponentSize.lg:
        return t.sizeLg;
      case FlowComponentSize.xl:
        return t.sizeXl;
    }
  }

  _IconBtnColors _resolveColors(FlowCompIconButton t) {
    if (selected) {
      if (variant == FlowIconButtonVariant.high) {
        return _IconBtnColors(
            bg: t.bgSelectedHigh,
            bgHover: t.bgSelectedHigh,
            icon: t.iconSelectedHigh);
      }
      if (variant == FlowIconButtonVariant.medium) {
        return _IconBtnColors(
            bg: t.bgSelectedMedium,
            bgHover: t.bgSelectedMedium,
            icon: t.iconSelectedMedium);
      }
      return _IconBtnColors(
          bg: t.bgSelectedLow,
          bgHover: t.bgSelectedLowHover,
          icon: t.iconSelectedLow);
    }
    switch (variant) {
      case FlowIconButtonVariant.high:
        return _IconBtnColors(
            bg: t.bgHigh, bgHover: t.bgHighHover, icon: t.iconHigh);
      case FlowIconButtonVariant.medium:
        return _IconBtnColors(
            bg: t.bgMedium,
            bgHover: t.bgMediumHover,
            icon: t.iconMedium,
            border: t.borderMedium,
            borderWidth: t.borderWidth);
      case FlowIconButtonVariant.low:
        return _IconBtnColors(
            bg: t.bgLow, bgHover: t.bgLowHover, icon: t.iconLow);
      case FlowIconButtonVariant.outline:
        return _IconBtnColors(
            bg: t.bgOutline,
            bgHover: t.bgOutlineHover,
            icon: t.iconOutline,
            border: t.borderOutline,
            borderWidth: t.borderWidth);
      case FlowIconButtonVariant.danger:
      case FlowIconButtonVariant.warning:
        return _IconBtnColors(
            bg: t.bgDangerSubtle, bgHover: t.bgDangerHover, icon: t.iconDanger);
      case FlowIconButtonVariant.ghost:
        return _IconBtnColors(
            bg: t.bgLow, bgHover: t.bgLowHover, icon: t.iconLow);
    }
  }

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.iconButton;
    final s = _resolvedSize(context);
    final isInert = disabled || loading;
    final vc = disabled
        ? _IconBtnColors(
            bg: t.bgDisabled,
            bgHover: t.bgDisabled,
            icon: t.iconDisabled,
            border: t.borderDisabled,
            borderWidth: t.borderWidth,
          )
        : _resolveColors(t);

    final dim = _boxSize(t, s);
    final spinnerSize = _spinnerSizeMap[s]!;

    final iconChild = loading
        ? SizedBox(
            width: spinnerSize,
            height: spinnerSize,
            child: CircularProgressIndicator(strokeWidth: 2, color: vc.icon),
          )
        : FlowIcon(
            icon,
            size: _iconBtnIconSizeMap[s]!,
            iconColor: vc.icon,
          );

    final shape = RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(t.radius),
      side: vc.border != null
          ? BorderSide(color: vc.border!, width: vc.borderWidth)
          : BorderSide.none,
    );

    Widget button = Semantics(
      button: true,
      enabled: !isInert,
      label: loading ? 'Loading' : semanticLabel,
      toggled: selected,
      child: SizedBox(
        width: dim,
        height: dim,
        child: Material(
          color: vc.bg,
          shape: shape,
          child: InkWell(
            onTap: isInert ? null : onPressed,
            customBorder: shape,
            hoverColor: vc.bgHover,
            splashColor: vc.bgHover,
            child: Center(child: iconChild),
          ),
        ),
      ),
    );

    // Badge overlay
    if (badge != null && !loading) {
      final badgeComp = comp.badge;
      button = Stack(
        clipBehavior: Clip.none,
        children: [
          button,
          Positioned(
            top: 0,
            right: 0,
            child: badge! > 0
                ? Container(
                    height: badgeComp.height,
                    constraints: BoxConstraints(minWidth: badgeComp.height),
                    padding:
                        EdgeInsets.symmetric(horizontal: badgeComp.paddingX),
                    decoration: BoxDecoration(
                      color: badgeComp.bgDefault,
                      borderRadius: BorderRadius.circular(badgeComp.radius),
                    ),
                    alignment: Alignment.center,
                    child: Text(
                      '$badge',
                      style: TextStyle(
                        fontSize: badgeComp.font,
                        fontWeight: badgeComp.fontWeight,
                        color: badgeComp.text,
                      ),
                    ),
                  )
                : Container(
                    width: badgeComp.minSize,
                    height: badgeComp.minSize,
                    decoration: BoxDecoration(
                      color: badgeComp.bgDefault,
                      shape: BoxShape.circle,
                    ),
                  ),
          ),
        ],
      );
    }

    // Tooltip wrapper
    if (tooltip != null && !loading) {
      button = Tooltip(message: tooltip!, child: button);
    }

    return button;
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Internal — resolved variant colors
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class _IconBtnColors {
  const _IconBtnColors({
    required this.bg,
    required this.bgHover,
    required this.icon,
    this.border,
    this.borderWidth = 0,
  });

  final Color bg;
  final Color bgHover;
  final Color icon;
  final Color? border;
  final double borderWidth;
}
