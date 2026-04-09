/// FLOW Design System — FlowDialog (Overlays)
/// ──────────────────────────────────────────
/// Modal dialog with title, description, content, and action buttons.
/// Uses comp.dialog tokens. Wraps Flutter's showDialog with Flow theming.
import 'package:flutter/material.dart';

import '../../primitives/text.dart';
import '../../tokens/comp_tokens.dart';
import '../../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowDialog widget
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowDialog extends StatelessWidget {
  const FlowDialog({
    super.key,
    this.title,
    this.description,
    this.actions,
    this.child,
    this.semanticLabel,
  });

  final String? title;
  final String? description;
  final List<Widget>? actions;
  final Widget? child;
  final String? semanticLabel;

  /// Shows this dialog as a modal.
  static Future<T?> show<T>({
    required BuildContext context,
    String? title,
    String? description,
    List<Widget>? actions,
    Widget? child,
    bool barrierDismissible = true,
    String? semanticLabel,
  }) {
    return showDialog<T>(
      context: context,
      barrierDismissible: barrierDismissible,
      barrierColor: Theme.of(context).extension<FlowSysTokens>()!.depthOverlay,
      builder: (context) => FlowDialog(
        title: title,
        description: description,
        actions: actions,
        semanticLabel: semanticLabel,
        child: child,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.dialog;
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    Widget panel = Container(
      constraints: BoxConstraints(maxWidth: t.maxWidth),
      decoration: BoxDecoration(
        color: t.bg,
        borderRadius: BorderRadius.circular(t.radius),
        boxShadow: t.shadow,
      ),
      padding: EdgeInsets.all(t.padding),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          if (title != null || description != null) ...[
            if (title != null)
              FlowText(
                title!,
                role: FlowTextRole.headingM,
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
          ],
          // Body content
          if (child != null) child!,
          // Action buttons
          if (actions != null && actions!.isNotEmpty) ...[
            SizedBox(height: sys.gapComponent),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: actions!.map((action) {
                return Padding(
                  padding: EdgeInsets.only(left: sys.gapTight),
                  child: action,
                );
              }).toList(),
            ),
          ],
        ],
      ),
    );

    return Semantics(
      label: semanticLabel ?? title ?? 'Dialog',
      container: true,
      scopesRoute: true,
      namesRoute: true,
      child: Center(
        child: Material(
          color: Colors.transparent,
          child: panel,
        ),
      ),
    );
  }
}
