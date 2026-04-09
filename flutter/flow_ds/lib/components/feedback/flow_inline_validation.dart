/// FLOW Design System — FlowInlineValidationMessage (L3 Component)
/// ──────────────────────────────────────────────────────────────
/// Inline validation feedback: error, success, warning, info.
/// Shows icon + message text, color-coded by variant.
/// Uses sys tokens for status colors.
import 'package:flutter/material.dart';

import '../../primitives/icon.dart';
import '../../tokens/sys_tokens.dart';

/// Validation variant determining color and icon.
enum FlowValidationVariant { error, success, warning, info }

class FlowInlineValidationMessage extends StatelessWidget {
  const FlowInlineValidationMessage({
    super.key,
    required this.message,
    this.variant = FlowValidationVariant.error,
    this.showIcon = true,
    this.semanticLabel,
  });

  final String message;
  final FlowValidationVariant variant;
  final bool showIcon;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    final color = _statusColor(sys);
    final iconData = _iconData();
    final isAlert = variant == FlowValidationVariant.error;

    return Semantics(
      label: semanticLabel ?? message,
      liveRegion: isAlert,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (showIcon) ...[
            FlowIcon(iconData, size: FlowIconSize.sm, iconColor: color),
            SizedBox(width: sys.gapTight),
          ],
          Flexible(
            child: Text(
              message,
              style: TextStyle(
                fontSize: sys.captionFontSize,
                fontWeight: sys.captionFontWeight,
                color: color,
                height: sys.captionLineHeight,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Color _statusColor(FlowSysTokens sys) => switch (variant) {
        FlowValidationVariant.error => sys.statusError,
        FlowValidationVariant.success => sys.statusSuccess,
        FlowValidationVariant.warning => sys.statusWarning,
        FlowValidationVariant.info => sys.statusInfo,
      };

  IconData _iconData() => switch (variant) {
        FlowValidationVariant.error => Icons.error_outline,
        FlowValidationVariant.success => Icons.check_circle_outline,
        FlowValidationVariant.warning => Icons.warning_amber_rounded,
        FlowValidationVariant.info => Icons.info_outline,
      };
}
