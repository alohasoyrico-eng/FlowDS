/// FLOW Design System — FlowQuickActions (L4 Pattern)
/// ──────────────────────────────────────────────────
/// iOS-style bottom action sheet with grouped action buttons.
/// Composes FlowSurface, FlowButton, FlowDivider, FlowText (L2/L3).
///
/// Maps to React's `<FlowQuickActions>` from FlowQuickActions.tsx.
import 'package:flutter/material.dart';

import '../components/controls/flow_button.dart';
import '../primitives/divider.dart';
import '../primitives/surface.dart';
import '../primitives/text.dart';
import '../tokens/density.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Data
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Visual variant for a quick action.
enum FlowQuickActionVariant { defaultVariant, danger }

/// A single quick action entry.
class FlowQuickAction {
  const FlowQuickAction({
    required this.id,
    required this.label,
    this.icon,
    this.variant = FlowQuickActionVariant.defaultVariant,
    this.disabled = false,
  });

  final String id;
  final String label;
  final IconData? icon;
  final FlowQuickActionVariant variant;
  final bool disabled;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Widget
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowQuickActions extends StatelessWidget {
  const FlowQuickActions({
    super.key,
    required this.open,
    this.onClose,
    this.onOpenChange,
    required this.actions,
    required this.onAction,
    this.title,
    this.cancelLabel = 'Cancel',
    this.disabled = false,
    this.loading = false,
  });

  /// Whether the action sheet is visible.
  final bool open;

  /// Close handler.
  final VoidCallback? onClose;

  /// Alias for onClose.
  final ValueChanged<bool>? onOpenChange;

  /// Available actions.
  final List<FlowQuickAction> actions;

  /// Called when an action is selected.
  final ValueChanged<String> onAction;

  /// Optional title text.
  final String? title;

  /// Label for the cancel button.
  final String cancelLabel;

  /// Disabled state.
  final bool disabled;

  /// Loading state.
  final bool loading;

  void _handleClose() {
    onClose?.call();
    onOpenChange?.call(false);
  }

  @override
  Widget build(BuildContext context) {
    if (!open) return const SizedBox.shrink();

    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    return Semantics(
      label: title ?? 'Quick actions',
      child: GestureDetector(
        onTap: _handleClose,
        child: ColoredBox(
          color: sys.depthOverlay,
          child: SafeArea(
            child: Align(
              alignment: Alignment.bottomCenter,
              child: Padding(
                padding: EdgeInsets.all(sys.paddingControl),
                child: GestureDetector(
                  onTap: () {}, // absorb
                  child: ConstrainedBox(
                    constraints: BoxConstraints(
                      maxWidth: sys.contentDialog,
                    ),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        // Actions group
                        FlowSurface(
                          radius: FlowRadius.container,
                          padding: 0.0,
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              if (title != null)
                                DecoratedBox(
                                  decoration: BoxDecoration(
                                    border: Border(
                                      bottom: BorderSide(
                                        color: sys.borderDefault,
                                        width: sys.borderThin,
                                      ),
                                    ),
                                  ),
                                  child: SizedBox(
                                    width: double.infinity,
                                    child: Padding(
                                      padding:
                                          EdgeInsets.all(sys.paddingControl),
                                      child: FlowText(title!,
                                          role: FlowTextRole.caption,
                                          color: FlowTextColor.secondary,
                                          align: TextAlign.center),
                                    ),
                                  ),
                                ),
                              ...List.generate(actions.length, (i) {
                                final action = actions[i];
                                return Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    if (i > 0) FlowDivider(spacing: 0),
                                    FlowButton(
                                      variant: action.variant ==
                                              FlowQuickActionVariant.danger
                                          ? FlowButtonVariant.danger
                                          : FlowButtonVariant.ghost,
                                      size: FlowComponentSize.lg,
                                      fullWidth: true,
                                      disabled: action.disabled ||
                                          disabled ||
                                          loading,
                                      leadingIcon: action.icon,
                                      onPressed: () {
                                        onAction(action.id);
                                        _handleClose();
                                      },
                                      child: Text(action.label),
                                    ),
                                  ],
                                );
                              }),
                            ],
                          ),
                        ),
                        SizedBox(height: sys.gapTight),
                        // Cancel button
                        FlowSurface(
                          radius: FlowRadius.container,
                          padding: 0.0,
                          child: FlowButton(
                            variant: FlowButtonVariant.ghost,
                            size: FlowComponentSize.lg,
                            fullWidth: true,
                            onPressed: _handleClose,
                            child: Text(cancelLabel),
                          ),
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
