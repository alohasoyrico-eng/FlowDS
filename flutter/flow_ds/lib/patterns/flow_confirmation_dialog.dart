/// FLOW Design System — FlowConfirmationDialog (L4 Pattern)
/// ─────────────────────────────────────────────────────────
/// Modal dialog for confirming or canceling a potentially destructive action.
/// Composes FlowSurface, FlowText, FlowButton, FlowStack, FlowInline (L2/L3).
///
/// Maps to React's `<FlowConfirmationDialog>` from FlowConfirmationDialog.tsx.
import 'package:flutter/material.dart';

import '../components/controls/flow_button.dart';
import '../primitives/inline.dart';
import '../primitives/stack.dart';
import '../primitives/surface.dart';
import '../primitives/text.dart';
import '../tokens/density.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Enums
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Dialog variant controlling confirm button style.
enum FlowConfirmationVariant { defaultVariant, danger }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowConfirmationDialog
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowConfirmationDialog extends StatelessWidget {
  const FlowConfirmationDialog({
    super.key,
    required this.open,
    required this.onConfirm,
    required this.onCancel,
    required this.title,
    required this.message,
    this.confirmLabel = 'Confirm',
    this.cancelLabel = 'Cancel',
    this.variant = FlowConfirmationVariant.defaultVariant,
    this.loading = false,
  });

  /// Whether the dialog is visible.
  final bool open;

  /// Callback fired when the user confirms.
  final VoidCallback onConfirm;

  /// Callback fired when the user cancels.
  final VoidCallback onCancel;

  /// Dialog heading text.
  final String title;

  /// Confirmation message body (String or Widget).
  final dynamic message;

  /// Label for the confirm button.
  final String confirmLabel;

  /// Label for the cancel button.
  final String cancelLabel;

  /// Visual variant (danger shows a destructive-styled confirm button).
  final FlowConfirmationVariant variant;

  /// Whether a loading spinner replaces the confirm label.
  final bool loading;

  @override
  Widget build(BuildContext context) {
    if (!open) return const SizedBox.shrink();

    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    return Semantics(
      scopesRoute: true,
      namesRoute: true,
      label: title,
      child: GestureDetector(
        onTap: onCancel,
        child: ColoredBox(
          color: sys.depthOverlay,
          child: Center(
            child: GestureDetector(
              onTap: () {}, // absorb tap so overlay onTap doesn't fire
              child: ConstrainedBox(
                constraints: BoxConstraints(
                  maxWidth: sys.contentDialog,
                ),
                child: FractionallySizedBox(
                  widthFactor: 0.9,
                  child: FlowSurface(
                    radius: FlowRadius.container,
                    border: true,
                    padding: FlowPadding.control,
                    child: FlowStack(
                      gap: FlowGap.component,
                      children: [
                        FlowStack(
                          gap: sys.gapTight,
                          children: [
                            FlowText(title, role: FlowTextRole.headingM),
                            if (message is String)
                              FlowText(message as String,
                                  role: FlowTextRole.paragraphS)
                            else if (message is Widget)
                              message as Widget,
                          ],
                        ),
                        FlowInline(
                          gap: sys.gapTight,
                          mainAlign: MainAxisAlignment.end,
                          mainSize: MainAxisSize.max,
                          children: [
                            FlowButton(
                              variant: FlowButtonVariant.medium,
                              size: FlowComponentSize.sm,
                              onPressed: onCancel,
                              child: Text(cancelLabel),
                            ),
                            FlowButton(
                              variant: variant == FlowConfirmationVariant.danger
                                  ? FlowButtonVariant.danger
                                  : FlowButtonVariant.high,
                              size: FlowComponentSize.sm,
                              disabled: loading,
                              loading: loading,
                              onPressed: onConfirm,
                              child: Text(loading ? '...' : confirmLabel),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
