/// FLOW Design System — FlowTopbar (L4 Pattern)
/// ─────────────────────────────────────────────
/// Application top bar with title, leading section, and trailing actions.
/// Composes FlowInline, FlowText, FlowProgressBar.
/// Maps to React's `<FlowTopbar>`.
import 'package:flutter/material.dart';

import '../primitives/inline.dart';
import '../primitives/stack.dart';
import '../components/feedback/flow_progress_bar.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowTopbar
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowTopbar extends StatelessWidget {
  const FlowTopbar({
    super.key,
    this.title,
    this.leading,
    this.actions,
    this.children = const [],
    this.sticky = false,
    this.loading = false,
    this.semanticLabel = 'Application top bar',
  });

  /// Title text or widget.
  final Widget? title;

  /// Leading section (e.g. hamburger, logo).
  final Widget? leading;

  /// Trailing actions section.
  final Widget? actions;

  /// Additional sections between title and actions.
  final List<Widget> children;

  /// Whether the topbar uses sticky positioning (handled by parent).
  final bool sticky;

  /// Loading state shows an indeterminate progress bar.
  final bool loading;

  /// Accessible label.
  final String semanticLabel;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    return Semantics(
      label: semanticLabel,
      container: true,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            padding: EdgeInsets.symmetric(
              horizontal: sys.paddingControl,
              vertical: sys.gapTight,
            ),
            decoration: BoxDecoration(
              color: sys.surfacePrimary,
              border: Border(
                bottom: BorderSide(
                  color: sys.borderDefault,
                  width: sys.borderThin,
                ),
              ),
            ),
            child: Row(
              children: [
                if (leading != null) ...[
                  leading!,
                  SizedBox(width: sys.gapComponent),
                ],
                if (title != null)
                  DefaultTextStyle(
                    style: TextStyle(
                      fontSize: sys.labelLFontSize,
                      fontWeight: sys.controlFontWeight,
                      color: sys.textPrimary,
                    ),
                    child: title!,
                  ),
                ...children,
                const Spacer(),
                if (actions != null)
                  FlowInline(
                    gap: FlowGap.tight,
                    children: [actions!],
                  ),
              ],
            ),
          ),
          if (loading)
            SizedBox(
              height: sys.borderMedium,
              child: const FlowProgressBar(
                semanticLabel: 'Loading',
              ),
            ),
        ],
      ),
    );
  }
}
