/// FLOW Design System — FlowPopover (Overlays)
/// ──────────────────────────────────────────
/// Positioned floating content panel attached to a trigger.
/// Uses comp.popover tokens.
import 'package:flutter/material.dart';

import '../../tokens/comp_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowPopover
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowPopover extends StatefulWidget {
  const FlowPopover({
    super.key,
    required this.trigger,
    required this.content,
    this.preferBelow = true,
    this.semanticLabel,
  });

  final Widget trigger;
  final Widget content;
  final bool preferBelow;
  final String? semanticLabel;

  @override
  State<FlowPopover> createState() => _FlowPopoverState();
}

class _FlowPopoverState extends State<FlowPopover> {
  final LayerLink _layerLink = LayerLink();
  OverlayEntry? _overlayEntry;
  bool _isOpen = false;

  void _toggle() {
    if (_isOpen) {
      _close();
    } else {
      _open();
    }
  }

  void _open() {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.popover;

    _overlayEntry = OverlayEntry(
      builder: (context) => GestureDetector(
        behavior: HitTestBehavior.translucent,
        onTap: _close,
        child: Stack(
          children: [
            CompositedTransformFollower(
              link: _layerLink,
              showWhenUnlinked: false,
              targetAnchor:
                  widget.preferBelow ? Alignment.bottomLeft : Alignment.topLeft,
              followerAnchor:
                  widget.preferBelow ? Alignment.topLeft : Alignment.bottomLeft,
              child: GestureDetector(
                onTap: () {}, // prevent dismiss on content tap
                child: Semantics(
                  label: widget.semanticLabel ?? 'Popover',
                  container: true,
                  child: Container(
                    constraints: BoxConstraints(maxWidth: t.maxWidth),
                    decoration: BoxDecoration(
                      color: t.bg,
                      border: Border.fromBorderSide(
                        BorderSide(color: t.border, width: 1),
                      ),
                      borderRadius: BorderRadius.circular(t.radius),
                      boxShadow: t.shadow,
                    ),
                    padding: EdgeInsets.all(t.padding),
                    child: widget.content,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );

    Overlay.of(context).insert(_overlayEntry!);
    setState(() => _isOpen = true);
  }

  void _close() {
    _overlayEntry?.remove();
    _overlayEntry = null;
    if (mounted) setState(() => _isOpen = false);
  }

  @override
  void dispose() {
    _close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return CompositedTransformTarget(
      link: _layerLink,
      child: GestureDetector(
        onTap: _toggle,
        child: widget.trigger,
      ),
    );
  }
}
