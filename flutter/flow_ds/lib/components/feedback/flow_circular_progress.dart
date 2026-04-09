/// FLOW Design System — FlowCircularProgress (L3 Component)
/// ─────────────────────────────────────────────────────────
/// Circular progress indicator with determinate / indeterminate modes.
/// Shows value label for determinate md+ sizes.
/// Consumes comp.circularProgress tokens via FlowCompTokens.
import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../primitives/text.dart';
import '../../tokens/comp_tokens.dart';

/// Size tier for circular progress.
enum FlowCircularProgressSize { sm, md, lg, xl }

/// Color variant.
enum FlowCircularProgressVariant { defaultVariant, success, warning, error }

class FlowCircularProgress extends StatefulWidget {
  const FlowCircularProgress({
    super.key,
    this.value,
    this.max = 100,
    this.size = FlowCircularProgressSize.md,
    this.variant = FlowCircularProgressVariant.defaultVariant,
    this.showLabel = false,
    this.semanticLabel = 'Progress',
  });

  /// Current value (0-[max]). Null for indeterminate.
  final double? value;
  final double max;
  final FlowCircularProgressSize size;
  final FlowCircularProgressVariant variant;
  final bool showLabel;
  final String semanticLabel;

  @override
  State<FlowCircularProgress> createState() => _FlowCircularProgressState();
}

class _FlowCircularProgressState extends State<FlowCircularProgress>
    with SingleTickerProviderStateMixin {
  AnimationController? _controller;

  bool get _isIndeterminate => widget.value == null;

  @override
  void initState() {
    super.initState();
    if (_isIndeterminate) _startAnimation();
  }

  @override
  void didUpdateWidget(FlowCircularProgress oldWidget) {
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
      duration: const Duration(milliseconds: 1200),
    )..repeat();
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).extension<FlowCompTokens>()!.circularProgress;

    final double dimension = _sizeValue(t);
    final double fontSize = _fontValue(t);
    final percentage = _isIndeterminate
        ? 0.0
        : (widget.value! / widget.max * 100).clamp(0.0, 100.0);
    final fillColor = _fillColor(t);

    Widget indicator;
    if (_isIndeterminate) {
      indicator = _controller != null
          ? AnimatedBuilder(
              animation: _controller!,
              builder: (_, __) => CustomPaint(
                size: Size(dimension, dimension),
                painter: _CircularProgressPainter(
                  trackColor: t.trackColor,
                  fillColor: fillColor,
                  strokeWidth: t.strokeWidth,
                  progress: null,
                  rotationAngle: _controller!.value * 2 * math.pi,
                ),
              ),
            )
          : SizedBox(width: dimension, height: dimension);
    } else {
      indicator = CustomPaint(
        size: Size(dimension, dimension),
        painter: _CircularProgressPainter(
          trackColor: t.trackColor,
          fillColor: fillColor,
          strokeWidth: t.strokeWidth,
          progress: percentage / 100,
          rotationAngle: -math.pi / 2,
        ),
      );
    }

    Widget result;
    if (widget.showLabel &&
        !_isIndeterminate &&
        widget.size != FlowCircularProgressSize.sm) {
      result = SizedBox(
        width: dimension,
        height: dimension,
        child: Stack(
          alignment: Alignment.center,
          children: [
            indicator,
            FlowText(
              '${percentage.round()}%',
              role: FlowTextRole.caption,
              color: FlowTextColor.primary,
            ),
          ],
        ),
      );
    } else {
      result = SizedBox(width: dimension, height: dimension, child: indicator);
    }

    return Semantics(
      label: widget.semanticLabel,
      value: _isIndeterminate ? null : '${percentage.round()}%',
      child: DefaultTextStyle(
        style: TextStyle(fontSize: fontSize),
        child: result,
      ),
    );
  }

  double _sizeValue(FlowCompCircularProgress t) => switch (widget.size) {
        FlowCircularProgressSize.sm => t.sizeSm,
        FlowCircularProgressSize.md => t.sizeMd,
        FlowCircularProgressSize.lg => t.sizeLg,
        FlowCircularProgressSize.xl => t.sizeXl,
      };

  double _fontValue(FlowCompCircularProgress t) => switch (widget.size) {
        FlowCircularProgressSize.sm => t.fontSm,
        FlowCircularProgressSize.md => t.fontMd,
        FlowCircularProgressSize.lg => t.fontLg,
        FlowCircularProgressSize.xl => t.fontXl,
      };

  Color _fillColor(FlowCompCircularProgress t) => switch (widget.variant) {
        FlowCircularProgressVariant.defaultVariant => t.fillDefault,
        FlowCircularProgressVariant.success => t.fillSuccess,
        FlowCircularProgressVariant.warning => t.fillWarning,
        FlowCircularProgressVariant.error => t.fillError,
      };
}

/// Custom painter for the circular progress ring.
class _CircularProgressPainter extends CustomPainter {
  _CircularProgressPainter({
    required this.trackColor,
    required this.fillColor,
    required this.strokeWidth,
    required this.progress,
    required this.rotationAngle,
  });

  final Color trackColor;
  final Color fillColor;
  final double strokeWidth;
  final double? progress; // null = indeterminate
  final double rotationAngle;

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = (size.shortestSide - strokeWidth) / 2;

    // Track
    final trackPaint = Paint()
      ..color = trackColor
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..strokeCap = StrokeCap.round;
    canvas.drawCircle(center, radius, trackPaint);

    // Fill
    final fillPaint = Paint()
      ..color = fillColor
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..strokeCap = StrokeCap.round;

    if (progress != null) {
      final sweepAngle = 2 * math.pi * progress!;
      canvas.drawArc(
        Rect.fromCircle(center: center, radius: radius),
        rotationAngle,
        sweepAngle,
        false,
        fillPaint,
      );
    } else {
      canvas.drawArc(
        Rect.fromCircle(center: center, radius: radius),
        rotationAngle,
        math.pi * 1.5,
        false,
        fillPaint,
      );
    }
  }

  @override
  bool shouldRepaint(_CircularProgressPainter oldDelegate) =>
      oldDelegate.progress != progress ||
      oldDelegate.rotationAngle != rotationAngle ||
      oldDelegate.fillColor != fillColor;
}
