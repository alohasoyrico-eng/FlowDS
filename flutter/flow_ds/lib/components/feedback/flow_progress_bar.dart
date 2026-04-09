/// FLOW Design System — FlowProgressBar (L3 Component)
/// ────────────────────────────────────────────────────
/// Linear progress bar: determinate and indeterminate modes.
/// Color variants: default, success, warning, error.
/// Uses comp.circularProgress tokens for colors and sys tokens for structure.
import 'package:flutter/material.dart';

import '../../primitives/text.dart';
import '../../tokens/comp_tokens.dart';
import '../../tokens/sys_tokens.dart';

/// Progress bar color variant.
enum FlowProgressBarVariant { defaultVariant, success, warning, error }

class FlowProgressBar extends StatefulWidget {
  const FlowProgressBar({
    super.key,
    this.value,
    this.max = 100,
    this.variant = FlowProgressBarVariant.defaultVariant,
    this.showLabel = false,
    this.semanticLabel = 'Progress',
  });

  /// Current value (0-[max]). Null for indeterminate.
  final double? value;
  final double max;
  final FlowProgressBarVariant variant;
  final bool showLabel;
  final String semanticLabel;

  @override
  State<FlowProgressBar> createState() => _FlowProgressBarState();
}

class _FlowProgressBarState extends State<FlowProgressBar>
    with SingleTickerProviderStateMixin {
  AnimationController? _controller;

  bool get _isIndeterminate => widget.value == null;

  @override
  void initState() {
    super.initState();
    if (_isIndeterminate) _startAnimation();
  }

  @override
  void didUpdateWidget(FlowProgressBar oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (_isIndeterminate && _controller == null) {
      _startAnimation();
    } else if (!_isIndeterminate && _controller != null) {
      _controller!.dispose();
      _controller = null;
    }
  }

  void _startAnimation() {
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1800),
    )..repeat();
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final cp = Theme.of(context).extension<FlowCompTokens>()!.circularProgress;
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    final percentage = _isIndeterminate
        ? 0.0
        : (widget.value! / widget.max * 100).clamp(0.0, 100.0);

    final fillColor = _fillColor(cp);
    final trackHeight = cp.strokeWidth;

    Widget track = Container(
      height: trackHeight,
      decoration: BoxDecoration(
        color: cp.trackColor,
        borderRadius: BorderRadius.circular(sys.radiusFull),
      ),
      child: _isIndeterminate
          ? AnimatedBuilder(
              animation: _controller!,
              builder: (context, _) {
                return FractionallySizedBox(
                  alignment: Alignment(
                    (_controller!.value * 3 - 1).clamp(-1.0, 1.0),
                    0,
                  ),
                  widthFactor: 0.3,
                  child: Container(
                    decoration: BoxDecoration(
                      color: fillColor,
                      borderRadius: BorderRadius.circular(sys.radiusFull),
                    ),
                  ),
                );
              },
            )
          : FractionallySizedBox(
              alignment: Alignment.centerLeft,
              widthFactor: percentage / 100,
              child: Container(
                decoration: BoxDecoration(
                  color: fillColor,
                  borderRadius: BorderRadius.circular(sys.radiusFull),
                ),
              ),
            ),
    );

    Widget result;
    if (widget.showLabel && !_isIndeterminate) {
      result = Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          track,
          SizedBox(height: sys.gapTight),
          FlowText(
            '${percentage.round()}%',
            role: FlowTextRole.caption,
            color: FlowTextColor.secondary,
          ),
        ],
      );
    } else {
      result = track;
    }

    return Semantics(
      label: widget.semanticLabel,
      value: _isIndeterminate ? null : '${percentage.round()}%',
      child: result,
    );
  }

  Color _fillColor(FlowCompCircularProgress cp) => switch (widget.variant) {
        FlowProgressBarVariant.defaultVariant => cp.fillDefault,
        FlowProgressBarVariant.success => cp.fillSuccess,
        FlowProgressBarVariant.warning => cp.fillWarning,
        FlowProgressBarVariant.error => cp.fillError,
      };
}
