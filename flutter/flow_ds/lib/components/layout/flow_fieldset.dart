/// FLOW Design System — FlowFieldset (Layout)
/// ──────────────────────────────────────────
/// Grouped form controls with a legend title.
/// Uses sys tokens for border/radius/padding.
import 'package:flutter/material.dart';

import '../../primitives/text.dart';
import '../../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowFieldset
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowFieldset extends StatelessWidget {
  const FlowFieldset({
    super.key,
    required this.legend,
    required this.children,
    this.description,
    this.disabled = false,
    this.error,
    this.semanticLabel,
  });

  final String legend;
  final List<Widget> children;
  final String? description;
  final bool disabled;
  final String? error;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    final borderColor =
        error != null ? sys.borderControlError : sys.borderDefault;

    Widget result = Opacity(
      opacity: disabled ? sys.stateDisabledOpacity : 1.0,
      child: DecoratedBox(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(sys.radiusContainer),
          border: Border.fromBorderSide(
            BorderSide(color: borderColor, width: sys.borderThin),
          ),
        ),
        child: Padding(
          padding: EdgeInsets.all(sys.paddingContainer),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              // Legend
              FlowText(
                legend,
                role: FlowTextRole.labelL,
                color: FlowTextColor.primary,
              ),
              if (description != null) ...[
                SizedBox(height: sys.gapTight),
                FlowText(
                  description!,
                  role: FlowTextRole.paragraphS,
                  color: FlowTextColor.secondary,
                ),
              ],
              SizedBox(height: sys.gapComponent),
              // Child controls
              ...List.generate(children.length, (i) {
                return Padding(
                  padding: EdgeInsets.only(
                    bottom: i < children.length - 1 ? sys.gapComponent : 0,
                  ),
                  child: children[i],
                );
              }),
              // Error message
              if (error != null) ...[
                SizedBox(height: sys.gapComponent),
                FlowText(
                  error!,
                  role: FlowTextRole.caption,
                  color: FlowTextColor.danger,
                ),
              ],
            ],
          ),
        ),
      ),
    );

    return Semantics(
      label: semanticLabel ?? legend,
      container: true,
      enabled: !disabled,
      child: result,
    );
  }
}
