/// FLOW Design System — FlowKPITrendIndicator (L3 Component)
/// ──────────────────────────────────────────────────────────
/// Compact inline trend indicator: arrow + formatted value.
/// Color-coded by direction & whether up-is-good.
/// Uses sys tokens for status colors.
import 'package:flutter/material.dart';

import '../../primitives/icon.dart';
import '../../primitives/text.dart';
import '../../tokens/sys_tokens.dart';

/// Trend direction.
enum FlowTrendDirection { up, down, neutral }

class FlowKPITrendIndicator extends StatelessWidget {
  const FlowKPITrendIndicator({
    super.key,
    required this.value,
    this.direction = FlowTrendDirection.neutral,
    this.upIsGood = true,
    this.label,
    this.semanticLabel,
  });

  /// Formatted value string (e.g. "+12.5%").
  final String value;

  final FlowTrendDirection direction;

  /// Whether an upward trend is semantically positive.
  final bool upIsGood;

  /// Optional trailing label (e.g. "vs last month").
  final String? label;

  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    final bool isPositive = switch (direction) {
      FlowTrendDirection.up => upIsGood,
      FlowTrendDirection.down => !upIsGood,
      FlowTrendDirection.neutral => true,
    };

    final Color trendColor = direction == FlowTrendDirection.neutral
        ? sys.textSecondary
        : isPositive
            ? sys.statusSuccess
            : sys.statusError;

    final IconData trendIcon = switch (direction) {
      FlowTrendDirection.up => Icons.trending_up,
      FlowTrendDirection.down => Icons.trending_down,
      FlowTrendDirection.neutral => Icons.remove,
    };

    return Semantics(
      label: semanticLabel ?? '$value ${direction.name}',
      child: DefaultTextStyle.merge(
        style: TextStyle(color: trendColor),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            FlowIcon(trendIcon, size: FlowIconSize.sm, iconColor: trendColor),
            SizedBox(width: sys.gapTight),
            Text(value,
                style: TextStyle(
                    fontSize: sys.captionFontSize, color: trendColor)),
            if (label != null) ...[
              SizedBox(width: sys.gapTight),
              FlowText(label!,
                  role: FlowTextRole.caption, color: FlowTextColor.tertiary),
            ],
          ],
        ),
      ),
    );
  }
}
