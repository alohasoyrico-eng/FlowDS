/// FLOW Design System — FlowSwipeActions (L4 Pattern)
/// ──────────────────────────────────────────────────
/// Swipeable list item that reveals action buttons on left or right swipe.
/// Composes FlowIcon, FlowText, FlowActionSurface.
/// Maps to React's `<FlowSwipeActions>`.
import 'package:flutter/material.dart';

import '../primitives/icon.dart';
import '../primitives/text.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Color variant for swipe action buttons.
enum FlowSwipeActionVariant { danger, success, warning, defaultVariant }

/// Definition for a single swipe action.
class FlowSwipeAction {
  const FlowSwipeAction({
    required this.label,
    this.icon,
    this.variant = FlowSwipeActionVariant.defaultVariant,
    this.onAction,
  });

  /// Button label text.
  final String label;

  /// Optional icon for the action.
  final IconData? icon;

  /// Color variant.
  final FlowSwipeActionVariant variant;

  /// Callback when the action is triggered.
  final VoidCallback? onAction;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSwipeActions
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowSwipeActions extends StatefulWidget {
  const FlowSwipeActions({
    super.key,
    required this.child,
    this.leftActions = const [],
    this.rightActions = const [],
    this.threshold = 80.0,
    this.disabled = false,
  });

  /// Content to swipe.
  final Widget child;

  /// Actions revealed on swipe right (appear on left side).
  final List<FlowSwipeAction> leftActions;

  /// Actions revealed on swipe left (appear on right side).
  final List<FlowSwipeAction> rightActions;

  /// Swipe threshold before snapping open.
  final double threshold;

  /// Whether swipe is disabled.
  final bool disabled;

  @override
  State<FlowSwipeActions> createState() => _FlowSwipeActionsState();
}

class _FlowSwipeActionsState extends State<FlowSwipeActions>
    with SingleTickerProviderStateMixin {
  double _offsetX = 0;
  late final AnimationController _anim;
  late Animation<double> _slideAnim;

  double get _maxLeft => widget.rightActions.length * 72.0;
  double get _maxRight => widget.leftActions.length * 72.0;

  @override
  void initState() {
    super.initState();
    _anim = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 200),
    );
  }

  @override
  void dispose() {
    _anim.dispose();
    super.dispose();
  }

  void _snapTo(double target) {
    _slideAnim = Tween<double>(begin: _offsetX, end: target).animate(
      CurvedAnimation(parent: _anim, curve: Curves.easeOut),
    )..addListener(() {
        setState(() => _offsetX = _slideAnim.value);
      });
    _anim.forward(from: 0);
  }

  void _close() => _snapTo(0);

  Color _variantColor(FlowSwipeActionVariant v, FlowSysTokens sys) {
    switch (v) {
      case FlowSwipeActionVariant.danger:
        return sys.statusError;
      case FlowSwipeActionVariant.success:
        return sys.statusSuccess;
      case FlowSwipeActionVariant.warning:
        return sys.statusWarning;
      case FlowSwipeActionVariant.defaultVariant:
        return sys.actionSecondary;
    }
  }

  Widget _buildActionPanel(List<FlowSwipeAction> actions, FlowSysTokens sys) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: actions.map((action) {
        return Semantics(
          button: true,
          label: action.label,
          child: GestureDetector(
            onTap: () {
              action.onAction?.call();
              _close();
            },
            child: Container(
              width: 72,
              alignment: Alignment.center,
              color: _variantColor(action.variant, sys),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  if (action.icon != null)
                    FlowIcon(
                      action.icon!,
                      size: FlowIconSize.sm,
                      iconColor: sys.textInverse,
                    ),
                  SizedBox(height: sys.gapTight),
                  FlowText(
                    action.label,
                    role: FlowTextRole.caption,
                    color: FlowTextColor.inverse,
                  ),
                ],
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    return Semantics(
      label: 'Swipeable item',
      child: ClipRect(
        child: Stack(
          children: [
            // Left-side actions (revealed on swipe right)
            if (widget.leftActions.isNotEmpty)
              Positioned(
                left: 0,
                top: 0,
                bottom: 0,
                child: _buildActionPanel(widget.leftActions, sys),
              ),
            // Right-side actions (revealed on swipe left)
            if (widget.rightActions.isNotEmpty)
              Positioned(
                right: 0,
                top: 0,
                bottom: 0,
                child: _buildActionPanel(widget.rightActions, sys),
              ),
            // Draggable content
            GestureDetector(
              onHorizontalDragUpdate: widget.disabled
                  ? null
                  : (details) {
                      setState(() {
                        _offsetX = (_offsetX + details.delta.dx)
                            .clamp(-_maxLeft, _maxRight);
                      });
                    },
              onHorizontalDragEnd: widget.disabled
                  ? null
                  : (_) {
                      if (_offsetX < -widget.threshold &&
                          widget.rightActions.isNotEmpty) {
                        _snapTo(-_maxLeft);
                      } else if (_offsetX > widget.threshold &&
                          widget.leftActions.isNotEmpty) {
                        _snapTo(_maxRight);
                      } else {
                        _close();
                      }
                    },
              child: Transform.translate(
                offset: Offset(_offsetX, 0),
                child: widget.child,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
