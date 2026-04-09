/// FLOW Design System — FlowChartLegendItem (Data)
/// ───────────────────────────────────────────────
/// Color dot + label for chart legend entries.
/// Uses sys tokens for typography/spacing.
import 'package:flutter/material.dart';

import '../../primitives/text.dart';
import '../../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowChartLegendItem
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowChartLegendItem extends StatelessWidget {
  const FlowChartLegendItem({
    super.key,
    required this.color,
    required this.label,
    this.value,
    this.dotShape = BoxShape.circle,
    this.onTap,
    this.dimmed = false,
    this.semanticLabel,
  });

  final Color color;
  final String label;

  /// Optional numeric/text value shown after the label.
  final String? value;

  /// Shape of the color indicator (circle or square).
  final BoxShape dotShape;

  /// Tap handler for interactive legends.
  final VoidCallback? onTap;

  /// Whether this legend item is dimmed (e.g. series toggled off).
  final bool dimmed;

  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    final dotSize = sys.gapComponent;
    final gap = sys.gapTight;

    Widget result = Opacity(
      opacity: dimmed ? 0.4 : 1.0,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Color dot
          Container(
            width: dotSize,
            height: dotSize,
            decoration: BoxDecoration(
              color: color,
              shape: dotShape,
              borderRadius: dotShape == BoxShape.rectangle
                  ? BorderRadius.circular(sys.radiusSm / 2)
                  : null,
            ),
          ),
          SizedBox(width: gap),
          // Label
          FlowText(
            label,
            role: FlowTextRole.labelS,
            color: FlowTextColor.secondary,
          ),
          // Value
          if (value != null) ...[
            SizedBox(width: gap),
            FlowText(
              value!,
              role: FlowTextRole.labelS,
              color: FlowTextColor.primary,
              weight: FontWeight.w600,
            ),
          ],
        ],
      ),
    );

    if (onTap != null) {
      result = GestureDetector(onTap: onTap, child: result);
    }

    return Semantics(
      label: semanticLabel ?? '$label${value != null ? ": $value" : ""}',
      button: onTap != null,
      child: result,
    );
  }
}
