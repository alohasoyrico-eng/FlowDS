/// FLOW Design System — FlowTag (L3 Component)
/// ────────────────────────────────────────────
/// Small non-interactive label pill with optional remove action.
/// Structural variant: label | code. Status: neutral | info | success | warning | error.
/// Consumes comp.tag tokens via FlowCompTokens.
import 'package:flutter/material.dart';

import '../../primitives/icon.dart';
import '../../primitives/text.dart';
import '../../tokens/comp_tokens.dart';
import '../../tokens/sys_tokens.dart';

/// Structural variant.
enum FlowTagVariant { label, code }

/// Semantic status color.
enum FlowTagStatus { neutral, info, success, warning, error }

class FlowTag extends StatelessWidget {
  const FlowTag({
    super.key,
    required this.label,
    this.variant = FlowTagVariant.label,
    this.status = FlowTagStatus.neutral,
    this.removable = false,
    this.onRemove,
    this.semanticLabel,
  });

  final String label;
  final FlowTagVariant variant;
  final FlowTagStatus status;
  final bool removable;
  final VoidCallback? onRemove;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).extension<FlowCompTokens>()!.tag;
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    final bgColor = _bgColor(sys, t);
    final textColor = _textColor(sys);

    final children = <Widget>[
      FlowText(label, role: FlowTextRole.caption, color: FlowTextColor.primary),
    ];

    if (removable) {
      children.add(SizedBox(width: t.paddingX / 2));
      children.add(
        GestureDetector(
          onTap: onRemove,
          child: FlowIcon(Icons.close,
              size: FlowIconSize.xs, iconColor: textColor),
        ),
      );
    }

    return Semantics(
      label: semanticLabel ?? label,
      child: Container(
        padding:
            EdgeInsets.symmetric(horizontal: t.paddingX, vertical: t.paddingY),
        decoration: BoxDecoration(
          color: bgColor,
          borderRadius: BorderRadius.circular(t.radius),
        ),
        child: DefaultTextStyle(
          style: TextStyle(
            fontSize: t.font,
            color: textColor,
            fontFamily: variant == FlowTagVariant.code ? 'monospace' : null,
          ),
          child: Row(mainAxisSize: MainAxisSize.min, children: children),
        ),
      ),
    );
  }

  Color _bgColor(FlowSysTokens sys, FlowCompTag t) => switch (status) {
        FlowTagStatus.neutral => t.bg,
        FlowTagStatus.info => sys.statusInfoSubtle,
        FlowTagStatus.success => sys.statusSuccessSubtle,
        FlowTagStatus.warning => sys.statusWarningSubtle,
        FlowTagStatus.error => sys.statusErrorSubtle,
      };

  Color _textColor(FlowSysTokens sys) => switch (status) {
        FlowTagStatus.neutral => sys.textPrimary,
        FlowTagStatus.info => sys.statusInfo,
        FlowTagStatus.success => sys.statusSuccess,
        FlowTagStatus.warning => sys.statusWarning,
        FlowTagStatus.error => sys.statusError,
      };
}
