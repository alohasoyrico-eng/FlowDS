/// FLOW Design System — FlowFAB (L3 Component)
/// ─────────────────────────────────────────────
/// Floating Action Button for primary screen actions with extended label variant.
/// Composes Material InkWell for state resolution and elevation.
///
/// Maps to React's `<FlowFAB>` from FlowFAB.tsx.
import 'package:flutter/material.dart';

import '../../primitives/icon.dart';
import '../../theme/flow_size_provider.dart';
import '../../tokens/comp_tokens.dart';
import '../../tokens/density.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Enums
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Color variant for the floating action button.
enum FlowFABVariant {
  primary,
  secondary,
  tertiary,
}

/// Position for fixed-placement FABs.
enum FlowFABPosition {
  bottomRight,
  bottomLeft,
  bottomCenter,
  none,
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Size maps (mirrors React fabIconSize / fabSpinnerSize)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const _fabIconSizeMap = <FlowComponentSize, FlowIconSize>{
  FlowComponentSize.sm: FlowIconSize.sm,
  FlowComponentSize.md: FlowIconSize.md,
  FlowComponentSize.lg: FlowIconSize.lg,
  FlowComponentSize.xl: FlowIconSize.lg,
};

const _fabSpinnerSizeMap = <FlowComponentSize, double>{
  FlowComponentSize.sm: 16,
  FlowComponentSize.md: 16,
  FlowComponentSize.lg: 20,
  FlowComponentSize.xl: 20,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowFAB
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowFAB extends StatelessWidget {
  const FlowFAB({
    super.key,
    required this.icon,
    this.label,
    this.variant = FlowFABVariant.primary,
    this.size,
    this.disabled = false,
    this.loading = false,
    this.position = FlowFABPosition.bottomRight,
    this.onPressed,
    this.semanticLabel,
  });

  /// Icon to display.
  final IconData icon;

  /// Extended label (makes FAB pill-shaped with text).
  final String? label;

  /// Color variant.
  final FlowFABVariant variant;

  /// Size variant. Omit to inherit from [FlowSizeProvider].
  final FlowComponentSize? size;

  /// Whether the FAB is disabled.
  final bool disabled;

  /// Whether the FAB is in a loading state.
  final bool loading;

  /// Position for fixed-placement. Use [FlowFABPosition.none] for inline.
  final FlowFABPosition position;

  /// Callback fired when the FAB is pressed.
  final VoidCallback? onPressed;

  /// Accessible label (required when no [label] prop).
  final String? semanticLabel;

  // ── Helpers ──

  FlowComponentSize _resolvedSize(BuildContext context) =>
      size ?? FlowSizeProvider.of(context);

  double _boxSize(FlowCompFab t, FlowComponentSize s) {
    switch (s) {
      case FlowComponentSize.sm:
        return t.sizeSm;
      case FlowComponentSize.md:
        return t.sizeMd;
      case FlowComponentSize.lg:
        return t.sizeLg;
      case FlowComponentSize.xl:
        return t.sizeLg;
    }
  }

  _FabColors _resolveColors(FlowCompFab t) {
    switch (variant) {
      case FlowFABVariant.primary:
        return _FabColors(
          bg: t.bgPrimary,
          bgHover: t.bgPrimaryHover,
          text: t.textPrimary,
          shadow: t.shadow,
          shadowHover: t.shadowHover,
        );
      case FlowFABVariant.secondary:
        return _FabColors(
          bg: t.bgSecondary,
          bgHover: t.bgSecondaryHover,
          text: t.textSecondary,
          shadow: t.shadow,
          shadowHover: t.shadowHover,
        );
      case FlowFABVariant.tertiary:
        return _FabColors(
          bg: t.bgTertiary,
          bgHover: t.bgTertiaryHover,
          text: t.textTertiary,
          shadow: t.shadow,
          shadowHover: t.shadowHover,
        );
    }
  }

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.fab;
    final s = _resolvedSize(context);
    final isInert = disabled || loading;
    final vc = _resolveColors(t);
    final isExtended = label != null && !loading;

    final dim = _boxSize(t, s);
    final spinnerSize = _fabSpinnerSizeMap[s]!;

    final iconWidget = loading
        ? SizedBox(
            width: spinnerSize,
            height: spinnerSize,
            child: CircularProgressIndicator(strokeWidth: 2, color: vc.text),
          )
        : FlowIcon(
            icon,
            size: _fabIconSizeMap[s]!,
            iconColor: vc.text,
          );

    final shape = RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(isExtended ? t.radius : t.radius),
    );

    Widget content;
    if (isExtended) {
      content = Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          iconWidget,
          SizedBox(width: t.gap),
          Text(
            label!,
            style: TextStyle(
              fontSize: t.labelFont,
              fontWeight: FontWeight.w500,
              color: vc.text,
            ),
          ),
        ],
      );
    } else {
      content = iconWidget;
    }

    final resolvedLabel = loading ? 'Loading' : (semanticLabel ?? label);

    Widget fab = Semantics(
      button: true,
      enabled: !isInert,
      label: resolvedLabel,
      child: Container(
        height: dim,
        constraints: isExtended
            ? BoxConstraints(minWidth: dim)
            : BoxConstraints.tightFor(width: dim, height: dim),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(t.radius),
          boxShadow: vc.shadow,
        ),
        child: Material(
          color: vc.bg,
          shape: shape,
          child: InkWell(
            onTap: isInert ? null : onPressed,
            customBorder: shape,
            hoverColor: vc.bgHover,
            splashColor: vc.bgHover,
            child: Padding(
              padding: isExtended
                  ? EdgeInsets.symmetric(horizontal: t.paddingX)
                  : EdgeInsets.zero,
              child: Center(child: content),
            ),
          ),
        ),
      ),
    );

    if (isInert) {
      fab = Opacity(opacity: 0.38, child: fab);
    }

    // Position overlay
    if (position != FlowFABPosition.none) {
      return Positioned(
        bottom: t.offset,
        right: position == FlowFABPosition.bottomRight ? t.offset : null,
        left: position == FlowFABPosition.bottomLeft ? t.offset : null,
        child: position == FlowFABPosition.bottomCenter
            ? Align(alignment: Alignment.bottomCenter, child: fab)
            : fab,
      );
    }

    return fab;
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Internal — resolved variant colors
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class _FabColors {
  const _FabColors({
    required this.bg,
    required this.bgHover,
    required this.text,
    required this.shadow,
    required this.shadowHover,
  });

  final Color bg;
  final Color bgHover;
  final Color text;
  final List<BoxShadow> shadow;
  final List<BoxShadow> shadowHover;
}
