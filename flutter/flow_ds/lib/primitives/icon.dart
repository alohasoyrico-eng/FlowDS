/// FLOW Design System — FlowIcon Primitive
/// ────────────────────────────────────────
/// Icon display with token-driven size tiers and color.
/// Maps to React's `<FlowIcon>`.
import 'package:flutter/material.dart';

import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Enums
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Icon size tiers matching React's xs|sm|md|lg|xl.
enum FlowIconSize {
  xs,
  sm,
  md,
  lg,
  xl,
}

/// Icon semantic color roles.
enum FlowIconColor {
  defaultColor,
  secondary,
  tertiary,
  action,
  inverse,
  onAction,
  disabled,
  success,
  warning,
  error,
  info,
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowIcon
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowIcon extends StatelessWidget {
  const FlowIcon(
    this.icon, {
    super.key,
    this.size = FlowIconSize.md,
    this.iconColor,
    this.colorRole,
    this.semanticLabel,
  });

  final IconData icon;

  /// Size tier. Accepts [FlowIconSize] for semantic, or use [customSize].
  final FlowIconSize size;

  /// Direct color override. Takes precedence over [colorRole].
  final Color? iconColor;

  /// Semantic icon color role from sys tokens.
  final FlowIconColor? colorRole;

  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final resolvedSize = _resolveSize(sys);
    final resolvedColor = iconColor ?? _resolveColorRole(sys);

    return Semantics(
      image: true,
      label: semanticLabel,
      child: Icon(
        icon,
        size: resolvedSize,
        color: resolvedColor,
      ),
    );
  }

  double _resolveSize(FlowSysTokens sys) {
    switch (size) {
      case FlowIconSize.xs:
        return sys.iconSizeXs;
      case FlowIconSize.sm:
        return sys.iconSizeSm;
      case FlowIconSize.md:
        return sys.iconSizeMd;
      case FlowIconSize.lg:
        return sys.iconSizeLg;
      case FlowIconSize.xl:
        return sys.iconSizeXl;
    }
  }

  Color _resolveColorRole(FlowSysTokens sys) {
    if (colorRole == null) return sys.iconDefault;
    switch (colorRole!) {
      case FlowIconColor.defaultColor:
        return sys.iconDefault;
      case FlowIconColor.secondary:
        return sys.iconSecondary;
      case FlowIconColor.tertiary:
        return sys.iconTertiary;
      case FlowIconColor.action:
        return sys.iconAction;
      case FlowIconColor.inverse:
        return sys.iconInverse;
      case FlowIconColor.onAction:
        return sys.iconOnAction;
      case FlowIconColor.disabled:
        return sys.iconDisabled;
      case FlowIconColor.success:
        return sys.iconSuccess;
      case FlowIconColor.warning:
        return sys.iconWarning;
      case FlowIconColor.error:
        return sys.iconError;
      case FlowIconColor.info:
        return sys.iconInfo;
    }
  }
}
