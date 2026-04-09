/// FLOW Design System — FlowDivider Primitive
/// ───────────────────────────────────────────
/// Themed divider line with orientation and indent.
/// Maps to React's `<Divider>`.
import 'package:flutter/material.dart';

import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowDivider
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowDivider extends StatelessWidget {
  const FlowDivider({
    super.key,
    this.vertical = false,
    this.indent,
    this.color,
    this.spacing,
    this.thickness,
  });

  /// Whether to render vertically instead of horizontally.
  final bool vertical;

  /// Indent from the start edge (leading side).
  final double? indent;

  /// Override divider color. Defaults to sys.borderSubtle.
  final Color? color;

  /// Spacing above/below (horizontal) or left/right (vertical).
  /// Defaults to sys.gapComponent.
  final double? spacing;

  /// Line thickness. Defaults to sys.borderThin.
  final double? thickness;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final resolvedColor = color ?? sys.borderSubtle;
    final resolvedThickness = thickness ?? sys.borderThin;
    final resolvedSpacing = spacing ?? sys.gapComponent;
    final resolvedIndent = indent ?? 0.0;

    if (vertical) {
      return Semantics(
        excludeSemantics: true,
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: resolvedSpacing),
          child: SizedBox(
            width: resolvedThickness,
            child: ColoredBox(color: resolvedColor),
          ),
        ),
      );
    }

    return Semantics(
      excludeSemantics: true,
      child: Padding(
        padding: EdgeInsets.symmetric(vertical: resolvedSpacing),
        child: Padding(
          padding: EdgeInsetsDirectional.only(start: resolvedIndent),
          child: SizedBox(
            height: resolvedThickness,
            child: ColoredBox(color: resolvedColor),
          ),
        ),
      ),
    );
  }
}
