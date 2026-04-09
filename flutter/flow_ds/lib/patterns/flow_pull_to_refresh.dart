/// FLOW Design System — FlowPullToRefresh (L4 Pattern)
/// ────────────────────────────────────────────────────
/// Mobile pull-to-refresh gesture container.
/// Composes FlowCircularProgress, FlowText, FlowStack (L3/L2).
///
/// Maps to React's `<FlowPullToRefresh>` from FlowPullToRefresh.tsx.
import 'package:flutter/material.dart';

import '../components/feedback/flow_circular_progress.dart';
import '../primitives/stack.dart';
import '../primitives/text.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowPullToRefresh
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowPullToRefresh extends StatefulWidget {
  const FlowPullToRefresh({
    super.key,
    required this.refreshing,
    required this.onRefresh,
    this.threshold = 64,
    this.pullingText = 'Pull to refresh',
    this.refreshingText = 'Refreshing...',
    this.releaseText = 'Release to refresh',
    this.disabled = false,
    required this.child,
  });

  /// Whether currently refreshing.
  final bool refreshing;

  /// Called when pull threshold is reached.
  final VoidCallback onRefresh;

  /// Pull distance threshold in logical pixels.
  final double threshold;

  /// Text shown while pulling.
  final String pullingText;

  /// Text shown while refreshing.
  final String refreshingText;

  /// Text shown when ready to release.
  final String releaseText;

  /// Whether pull-to-refresh is disabled.
  final bool disabled;

  /// Scrollable content.
  final Widget child;

  @override
  State<FlowPullToRefresh> createState() => _FlowPullToRefreshState();
}

enum _PullPhase { idle, pulling, ready, refreshing }

class _FlowPullToRefreshState extends State<FlowPullToRefresh> {
  double _pullDistance = 0;
  _PullPhase _phase = _PullPhase.idle;
  double _startY = 0;
  bool _isPulling = false;

  @override
  void didUpdateWidget(FlowPullToRefresh old) {
    super.didUpdateWidget(old);
    if (widget.refreshing != old.refreshing) {
      if (widget.refreshing) {
        setState(() {
          _phase = _PullPhase.refreshing;
          _pullDistance = widget.threshold;
        });
      } else {
        setState(() {
          _phase = _PullPhase.idle;
          _pullDistance = 0;
        });
      }
    }
  }

  void _onPointerDown(PointerDownEvent e) {
    if (widget.disabled || widget.refreshing) return;
    _startY = e.position.dy;
    _isPulling = true;
  }

  void _onPointerMove(PointerMoveEvent e) {
    if (!_isPulling || widget.disabled) return;
    final dy = (e.position.dy - _startY) * 0.5; // damping
    final clamped = dy.clamp(0.0, 80.0);
    setState(() {
      _pullDistance = clamped;
      _phase =
          clamped >= widget.threshold ? _PullPhase.ready : _PullPhase.pulling;
    });
  }

  void _onPointerUp(PointerUpEvent e) {
    if (!_isPulling) return;
    _isPulling = false;
    if (_phase == _PullPhase.ready) {
      widget.onRefresh();
    } else {
      setState(() {
        _pullDistance = 0;
        _phase = _PullPhase.idle;
      });
    }
  }

  String get _indicatorText {
    switch (_phase) {
      case _PullPhase.refreshing:
        return widget.refreshingText;
      case _PullPhase.ready:
        return widget.releaseText;
      default:
        return widget.pullingText;
    }
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final progress = _phase == _PullPhase.refreshing
        ? null
        : (_pullDistance / widget.threshold * 100).clamp(0.0, 100.0);

    return Listener(
      onPointerDown: _onPointerDown,
      onPointerMove: _onPointerMove,
      onPointerUp: _onPointerUp,
      child: Column(
        children: [
          // Indicator
          AnimatedContainer(
            duration: sys.momentumDurationFast,
            height: _pullDistance > 0 ? _pullDistance : 0,
            child: _pullDistance > 0
                ? Semantics(
                    label: _phase == _PullPhase.refreshing
                        ? 'Refreshing'
                        : 'Pull progress',
                    child: Center(
                      child: Opacity(
                        opacity:
                            (_pullDistance / widget.threshold).clamp(0.0, 1.0),
                        child: FlowStack(
                          gap: sys.gapTight,
                          align: CrossAxisAlignment.center,
                          children: [
                            FlowCircularProgress(
                              size: FlowCircularProgressSize.sm,
                              value: progress,
                            ),
                            FlowText(_indicatorText,
                                role: FlowTextRole.caption),
                          ],
                        ),
                      ),
                    ),
                  )
                : const SizedBox.shrink(),
          ),
          // Content
          Expanded(
            child: Semantics(
              liveRegion: true,
              child: widget.child,
            ),
          ),
        ],
      ),
    );
  }
}
