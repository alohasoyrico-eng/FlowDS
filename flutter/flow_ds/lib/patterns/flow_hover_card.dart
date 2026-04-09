/// FLOW Design System — FlowHoverCard (L4 Pattern)
/// ────────────────────────────────────────────────
/// Displays rich content in a tooltip-style popover on hover/long-press.
/// Composes FlowCard (L3).
///
/// Maps to React's `<FlowHoverCard>` from FlowHoverCard.tsx.
import 'dart:async';

import 'package:flutter/material.dart';

import '../components/display/flow_card.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Enums
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Position of the hover card relative to its trigger.
enum FlowHoverCardSide { top, bottom, left, right }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowHoverCard
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowHoverCard extends StatefulWidget {
  const FlowHoverCard({
    super.key,
    required this.trigger,
    required this.child,
    this.side = FlowHoverCardSide.bottom,
    this.openDelay = const Duration(milliseconds: 300),
    this.closeDelay = const Duration(milliseconds: 200),
  });

  /// Trigger widget the hover card is anchored to.
  final Widget trigger;

  /// Rich content displayed inside the hover card.
  final Widget child;

  /// Position of the card relative to the trigger.
  final FlowHoverCardSide side;

  /// Delay before showing the card.
  final Duration openDelay;

  /// Delay before hiding the card.
  final Duration closeDelay;

  @override
  State<FlowHoverCard> createState() => _FlowHoverCardState();
}

class _FlowHoverCardState extends State<FlowHoverCard> {
  bool _open = false;
  Timer? _openTimer;
  Timer? _closeTimer;

  void _show() {
    _closeTimer?.cancel();
    _openTimer = Timer(widget.openDelay, () {
      if (mounted) setState(() => _open = true);
    });
  }

  void _hide() {
    _openTimer?.cancel();
    _closeTimer = Timer(widget.closeDelay, () {
      if (mounted) setState(() => _open = false);
    });
  }

  @override
  void dispose() {
    _openTimer?.cancel();
    _closeTimer?.cancel();
    super.dispose();
  }

  Alignment _triggerAnchor() {
    switch (widget.side) {
      case FlowHoverCardSide.top:
        return Alignment.topCenter;
      case FlowHoverCardSide.bottom:
        return Alignment.bottomCenter;
      case FlowHoverCardSide.left:
        return Alignment.centerLeft;
      case FlowHoverCardSide.right:
        return Alignment.centerRight;
    }
  }

  Alignment _cardAnchor() {
    switch (widget.side) {
      case FlowHoverCardSide.top:
        return Alignment.bottomCenter;
      case FlowHoverCardSide.bottom:
        return Alignment.topCenter;
      case FlowHoverCardSide.left:
        return Alignment.centerRight;
      case FlowHoverCardSide.right:
        return Alignment.centerLeft;
    }
  }

  Offset _offset(FlowSysTokens sys) {
    final gap = sys.gapTight;
    switch (widget.side) {
      case FlowHoverCardSide.top:
        return Offset(0, -gap);
      case FlowHoverCardSide.bottom:
        return Offset(0, gap);
      case FlowHoverCardSide.left:
        return Offset(-gap, 0);
      case FlowHoverCardSide.right:
        return Offset(gap, 0);
    }
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final link = LayerLink();

    return MouseRegion(
      onEnter: (_) => _show(),
      onExit: (_) => _hide(),
      child: GestureDetector(
        onLongPress: () => setState(() => _open = !_open),
        child: Semantics(
          container: true,
          child: CompositedTransformTarget(
            link: link,
            child: Builder(
              builder: (context) {
                if (_open) {
                  // Show via overlay
                  WidgetsBinding.instance.addPostFrameCallback((_) {
                    _showOverlay(context, link, sys);
                  });
                } else {
                  _removeOverlay();
                }
                return widget.trigger;
              },
            ),
          ),
        ),
      ),
    );
  }

  OverlayEntry? _entry;

  void _showOverlay(BuildContext context, LayerLink link, FlowSysTokens sys) {
    _removeOverlay();
    final overlay = Overlay.of(context, rootOverlay: true);
    _entry = OverlayEntry(
      builder: (_) => CompositedTransformFollower(
        link: link,
        targetAnchor: _triggerAnchor(),
        followerAnchor: _cardAnchor(),
        offset: _offset(sys),
        child: MouseRegion(
          onEnter: (_) => _show(),
          onExit: (_) => _hide(),
          child: Semantics(
            label: 'Additional information',
            child: ConstrainedBox(
              constraints: BoxConstraints(
                minWidth: sys.contentDialog * 0.5,
                maxWidth: sys.contentDialog,
              ),
              child: FlowCard(
                variant: FlowCardVariant.elevated,
                child: widget.child,
              ),
            ),
          ),
        ),
      ),
    );
    overlay.insert(_entry!);
  }

  void _removeOverlay() {
    _entry?.remove();
    _entry = null;
  }

  @override
  void deactivate() {
    _removeOverlay();
    super.deactivate();
  }
}
