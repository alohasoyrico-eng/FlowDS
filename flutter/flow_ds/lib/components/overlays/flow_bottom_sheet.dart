/// FLOW Design System — FlowBottomSheet (Overlays)
/// ───────────────────────────────────────────────
/// Modal from bottom edge with drag handle.
/// Uses comp.bottomSheet tokens.
import 'package:flutter/material.dart';

import '../../primitives/text.dart';
import '../../tokens/comp_tokens.dart';
import '../../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowBottomSheet widget
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowBottomSheet extends StatelessWidget {
  const FlowBottomSheet({
    super.key,
    this.title,
    this.child,
    this.showHandle = true,
    this.semanticLabel,
  });

  final String? title;
  final Widget? child;
  final bool showHandle;
  final String? semanticLabel;

  /// Shows this bottom sheet as a modal.
  static Future<T?> show<T>({
    required BuildContext context,
    String? title,
    Widget? child,
    bool showHandle = true,
    bool isDismissible = true,
    bool enableDrag = true,
    String? semanticLabel,
  }) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.bottomSheet;

    return showModalBottomSheet<T>(
      context: context,
      backgroundColor: Colors.transparent,
      barrierColor: t.overlay,
      isDismissible: isDismissible,
      enableDrag: enableDrag,
      isScrollControlled: true,
      builder: (context) => FlowBottomSheet(
        title: title,
        showHandle: showHandle,
        semanticLabel: semanticLabel,
        child: child,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.bottomSheet;
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    return Semantics(
      label: semanticLabel ?? title ?? 'Bottom sheet',
      container: true,
      child: Container(
        decoration: BoxDecoration(
          color: t.bg,
          borderRadius: BorderRadius.vertical(
            top: Radius.circular(t.radius),
          ),
          boxShadow: t.shadow,
          border: Border(
            top: BorderSide(color: t.border, width: 1),
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Handle
            if (showHandle)
              Padding(
                padding: EdgeInsets.symmetric(vertical: t.handleMargin),
                child: Container(
                  width: t.handleWidth,
                  height: t.handleHeight,
                  decoration: BoxDecoration(
                    color: t.handleBg,
                    borderRadius: BorderRadius.circular(t.handleHeight / 2),
                  ),
                ),
              ),
            // Title
            if (title != null)
              Padding(
                padding: EdgeInsets.only(
                  left: t.padding,
                  right: t.padding,
                  bottom: sys.gapComponent,
                ),
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: FlowText(
                    title!,
                    role: FlowTextRole.headingM,
                    color: FlowTextColor.primary,
                  ),
                ),
              ),
            // Content
            if (child != null)
              Flexible(
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: t.padding),
                  child: child!,
                ),
              ),
            // Bottom safe area padding
            SizedBox(height: MediaQuery.of(context).padding.bottom + t.padding),
          ],
        ),
      ),
    );
  }
}
