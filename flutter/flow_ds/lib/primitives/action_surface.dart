/// FLOW Design System — FlowActionSurface Primitive
/// ─────────────────────────────────────────────────
/// Interactive surface with state layer (hover/pressed/disabled/selected).
/// Wraps InkWell + FlowSurface. Maps to React's `<ActionSurface>`.
import 'package:flutter/material.dart';

import '../tokens/sys_tokens.dart';
import 'surface.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowState
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Interaction state for action surfaces, mirroring React's FlowState.
enum FlowState {
  idle,
  hover,
  focusVisible,
  pressed,
  selected,
  disabled,
  loading,
  error,
  success,
  readonly,
  dragging,
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowActionSurface
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowActionSurface extends StatelessWidget {
  const FlowActionSurface({
    super.key,
    required this.child,
    this.onTap,
    this.onLongPress,
    this.disabled = false,
    this.selected = false,
    this.loading = false,
    this.variant = FlowSurfaceVariant.primary,
    this.radius = FlowRadius.control,
    this.padding = FlowPadding.control,
    this.elevation = 0,
    this.border = true,
    this.semanticLabel,
  });

  final Widget child;
  final VoidCallback? onTap;
  final VoidCallback? onLongPress;
  final bool disabled;
  final bool selected;
  final bool loading;
  final FlowSurfaceVariant variant;

  /// Accepts [FlowRadius] or [double].
  final Object radius;

  /// Accepts [FlowPadding] or [double].
  final Object padding;

  final int elevation;
  final bool border;
  final String? semanticLabel;

  /// Resolves the highest-priority state, matching React's resolveState.
  FlowState get _resolvedState {
    if (disabled) return FlowState.disabled;
    if (loading) return FlowState.loading;
    if (selected) return FlowState.selected;
    return FlowState.idle;
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final state = _resolvedState;
    final isInert = state == FlowState.disabled || state == FlowState.loading;

    final r = resolveRadius(sys, radius);
    final p = resolvePadding(sys, padding);
    final bg = _resolveBg(sys, state);
    final shadows = elevation > 0
        ? (elevation <= 1
            ? sys.depthElevationLight
            : elevation <= 2
                ? sys.depthElevationMedium
                : sys.depthElevationHigh)
        : const <BoxShadow>[];

    final borderSide = border
        ? BorderSide(color: sys.borderDefault, width: sys.borderThin)
        : BorderSide.none;

    Widget result = Opacity(
      opacity: isInert ? sys.stateDisabledOpacity : 1.0,
      child: Material(
        color: bg,
        borderRadius: BorderRadius.circular(r),
        elevation: 0,
        child: InkWell(
          onTap: isInert ? null : onTap,
          onLongPress: isInert ? null : onLongPress,
          borderRadius: BorderRadius.circular(r),
          hoverColor: sys.surfacePrimary.withValues(
            alpha: sys.stateHoverOpacity,
          ),
          splashColor: sys.surfacePrimary.withValues(
            alpha: sys.statePressedOpacity,
          ),
          highlightColor: sys.surfacePrimary.withValues(
            alpha: sys.statePressedOpacity,
          ),
          child: DecoratedBox(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(r),
              border: borderSide != BorderSide.none
                  ? Border.fromBorderSide(borderSide)
                  : null,
              boxShadow: shadows.isNotEmpty ? shadows : null,
            ),
            child: Padding(
              padding: EdgeInsets.all(p),
              child: child,
            ),
          ),
        ),
      ),
    );

    if (semanticLabel != null) {
      result = Semantics(
        label: semanticLabel,
        button: true,
        enabled: !isInert,
        selected: selected,
        child: result,
      );
    }

    return result;
  }

  Color _resolveBg(FlowSysTokens sys, FlowState state) {
    if (state == FlowState.disabled) return sys.stateDisabledBg;
    switch (variant) {
      case FlowSurfaceVariant.primary:
        return sys.surfacePrimary;
      case FlowSurfaceVariant.secondary:
        return sys.surfaceSecondary;
      case FlowSurfaceVariant.tertiary:
        return sys.surfaceTertiary;
      case FlowSurfaceVariant.sunken:
        return sys.surfaceSunken;
      case FlowSurfaceVariant.inverse:
        return sys.surfaceInverse;
      case FlowSurfaceVariant.accent:
        return sys.surfaceAccent;
      case FlowSurfaceVariant.filled:
        return sys.actionPrimary;
      case FlowSurfaceVariant.outlined:
        return Colors.transparent;
    }
  }
}
