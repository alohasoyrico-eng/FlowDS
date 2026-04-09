/// FLOW Design System — FlowFullscreenSheet (L4 Pattern)
/// ──────────────────────────────────────────────────────
/// Full-page mobile overlay that slides up from the bottom
/// with a header and close/back controls.
/// Composes FlowIconButton, FlowText, FlowInline (L2/L3).
///
/// Maps to React's `<FlowFullscreenSheet>` from FlowFullscreenSheet.tsx.
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../components/controls/flow_icon_button.dart';
import '../primitives/inline.dart';
import '../primitives/stack.dart';
import '../primitives/text.dart';
import '../tokens/density.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowFullscreenSheet
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowFullscreenSheet extends StatelessWidget {
  const FlowFullscreenSheet({
    super.key,
    required this.open,
    required this.onClose,
    this.title,
    this.showBack = false,
    this.onBack,
    this.headerActions,
    this.closeOnEscape = true,
    this.semanticLabel,
    required this.child,
  });

  /// Whether the sheet is visible.
  final bool open;

  /// Close handler.
  final VoidCallback onClose;

  /// Title shown in header. Can be a String.
  final String? title;

  /// Show back button (arrow-left) instead of close (x).
  final bool showBack;

  /// Back button handler (defaults to onClose).
  final VoidCallback? onBack;

  /// Header right actions widget.
  final Widget? headerActions;

  /// Close on escape key press.
  final bool closeOnEscape;

  /// Accessible label for the sheet.
  final String? semanticLabel;

  /// Sheet content.
  final Widget child;

  @override
  Widget build(BuildContext context) {
    if (!open) return const SizedBox.shrink();

    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    Widget sheet = Semantics(
      scopesRoute: true,
      namesRoute: true,
      label: semanticLabel ?? title,
      child: ColoredBox(
        color: sys.surfacePrimary,
        child: Column(
          children: [
            // ── Header ──
            DecoratedBox(
              decoration: BoxDecoration(
                border: Border(
                  bottom: BorderSide(
                      color: sys.borderDefault, width: sys.borderThin),
                ),
              ),
              child: SafeArea(
                bottom: false,
                child: Padding(
                  padding: EdgeInsets.symmetric(
                    horizontal: sys.paddingControl,
                    vertical: sys.gapTight,
                  ),
                  child: Row(
                    children: [
                      // Leading: back or close
                      FlowIconButton(
                        icon: showBack ? Icons.arrow_back : Icons.close,
                        size: FlowComponentSize.md,
                        variant: FlowIconButtonVariant.ghost,
                        onPressed: showBack ? (onBack ?? onClose) : onClose,
                        semanticLabel: showBack ? 'Go back' : 'Close',
                      ),
                      // Title
                      if (title != null)
                        Expanded(
                          child: FlowText(title!,
                              role: FlowTextRole.headingM,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis),
                        ),
                      if (title == null) const Spacer(),
                      // Right actions
                      if (headerActions != null)
                        FlowInline(
                          gap: FlowGap.component,
                          children: [headerActions!],
                        ),
                    ],
                  ),
                ),
              ),
            ),
            // ── Body ──
            Expanded(
              child: Padding(
                padding: EdgeInsets.all(sys.paddingControl),
                child: child,
              ),
            ),
          ],
        ),
      ),
    );

    // Wrap with keyboard escape handler
    if (closeOnEscape) {
      sheet = KeyboardListener(
        focusNode: FocusNode()..requestFocus(),
        onKeyEvent: (event) {
          if (event is KeyDownEvent &&
              event.logicalKey == LogicalKeyboardKey.escape) {
            onClose();
          }
        },
        child: sheet,
      );
    }

    return sheet;
  }
}
