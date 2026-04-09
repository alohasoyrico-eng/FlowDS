/// FLOW Design System — FlowSurface Primitive
/// ────────────────────────────────────────────
/// Themed container with variant, radius, padding, elevation, and border.
/// Maps to React's `<Surface>`.
import 'package:flutter/material.dart';

import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Enums
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Surface background variant, maps to sys.energy.surface.* tokens.
enum FlowSurfaceVariant {
  primary,
  secondary,
  tertiary,
  sunken,
  inverse,
  accent,
  filled,
  outlined,
}

/// Semantic radius roles routed through sys tokens.
enum FlowRadius {
  none,
  sm,
  control,
  container,
  surface,
  full,
}

/// Semantic padding roles routed through sys tokens.
enum FlowPadding {
  none,
  compact,
  control,
  container,
  surface,
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Resolution helpers
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Resolves a [FlowRadius] enum or raw double to a concrete radius value.
double resolveRadius(FlowSysTokens sys, Object radius) {
  if (radius is double) return radius;
  if (radius is FlowRadius) {
    switch (radius) {
      case FlowRadius.none:
        return 0;
      case FlowRadius.sm:
        return sys.radiusSm;
      case FlowRadius.control:
        return sys.radiusControl;
      case FlowRadius.container:
        return sys.radiusContainer;
      case FlowRadius.surface:
        return sys.radiusSurface;
      case FlowRadius.full:
        return sys.radiusFull;
    }
  }
  return sys.radiusContainer;
}

/// Resolves a [FlowPadding] enum or raw double to a concrete padding value.
double resolvePadding(FlowSysTokens sys, Object padding) {
  if (padding is double) return padding;
  if (padding is FlowPadding) {
    switch (padding) {
      case FlowPadding.none:
        return 0;
      case FlowPadding.compact:
        return sys.paddingControl;
      case FlowPadding.control:
        return sys.paddingControl;
      case FlowPadding.container:
        return sys.paddingContainer;
      case FlowPadding.surface:
        return sys.paddingSurface;
    }
  }
  return sys.paddingContainer;
}

/// Resolves a surface variant to its background color.
Color _resolveVariantColor(FlowSysTokens sys, FlowSurfaceVariant variant) {
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

/// Resolves an elevation tier (0-4) to a list of box shadows.
List<BoxShadow> _resolveElevation(FlowSysTokens sys, int elevation) {
  switch (elevation) {
    case 1:
      return sys.depthElevationLight;
    case 2:
      return sys.depthElevationMedium;
    case 3:
    case 4:
      return sys.depthElevationHigh;
    default:
      return const [];
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSurface
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowSurface extends StatelessWidget {
  const FlowSurface({
    super.key,
    this.variant = FlowSurfaceVariant.primary,
    this.radius = FlowRadius.container,
    this.padding = FlowPadding.container,
    this.elevation = 0,
    this.border = true,
    this.semanticLabel,
    this.child,
  });

  final FlowSurfaceVariant variant;

  /// Accepts [FlowRadius] or [double].
  final Object radius;

  /// Accepts [FlowPadding] or [double].
  final Object padding;

  final int elevation;
  final bool border;
  final String? semanticLabel;
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    final bg = _resolveVariantColor(sys, variant);
    final r = resolveRadius(sys, radius);
    final p = resolvePadding(sys, padding);
    final shadows = _resolveElevation(sys, elevation);
    final borderSide = border && variant != FlowSurfaceVariant.outlined
        ? BorderSide(color: sys.borderDefault, width: sys.borderThin)
        : variant == FlowSurfaceVariant.outlined
            ? BorderSide(color: sys.borderDefault, width: sys.borderThin)
            : BorderSide.none;

    Widget result = DecoratedBox(
      decoration: BoxDecoration(
        color: bg,
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
    );

    if (semanticLabel != null) {
      result = Semantics(label: semanticLabel, container: true, child: result);
    }

    return result;
  }
}
