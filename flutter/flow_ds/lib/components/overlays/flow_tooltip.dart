/// FLOW Design System — FlowTooltip (Overlays)
/// ──────────────────────────────────────────
/// Hover/long-press tooltip with configurable placement.
/// Uses sys tokens for styling (no dedicated comp token group).
import 'package:flutter/material.dart';

import '../../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Enums
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

enum FlowTooltipPlacement { top, bottom, left, right }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowTooltip
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowTooltip extends StatelessWidget {
  const FlowTooltip({
    super.key,
    required this.message,
    required this.child,
    this.placement = FlowTooltipPlacement.top,
    this.waitDuration = const Duration(milliseconds: 500),
    this.showDuration = const Duration(seconds: 2),
    this.semanticLabel,
  });

  final String message;
  final Widget child;
  final FlowTooltipPlacement placement;
  final Duration waitDuration;
  final Duration showDuration;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    final isBelow = placement == FlowTooltipPlacement.bottom;

    return Semantics(
      label: semanticLabel ?? message,
      child: Tooltip(
        message: message,
        preferBelow: isBelow,
        waitDuration: waitDuration,
        showDuration: showDuration,
        decoration: BoxDecoration(
          color: sys.surfaceInverse,
          borderRadius: BorderRadius.circular(sys.radiusSm),
          boxShadow: sys.depthElevationLight,
        ),
        textStyle: TextStyle(
          color: sys.textInverse,
          fontSize: sys.labelSFontSize,
          fontFamily: sys.controlFontFamily,
        ),
        padding: EdgeInsets.symmetric(
          horizontal: sys.paddingControl,
          vertical: sys.gapTight,
        ),
        child: child,
      ),
    );
  }
}
