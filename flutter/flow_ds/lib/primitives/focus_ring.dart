/// FLOW Design System — FlowFocusRing Primitive
/// ─────────────────────────────────────────────
/// Focus indicator ring using borderFocus token.
/// Maps to React's `<FocusRing>`.
import 'package:flutter/material.dart';

import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowFocusRing
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowFocusRing extends StatelessWidget {
  const FlowFocusRing({
    super.key,
    this.focused = false,
    this.ringWidth,
    this.ringOffset,
    this.ringColor,
    this.borderRadius,
    this.inset = false,
    required this.child,
  });

  /// Whether the ring is currently visible.
  final bool focused;

  /// Ring stroke width. Defaults to sys.borderMedium.
  final double? ringWidth;

  /// Offset from the element edge. Defaults to sys.spaceMicro.
  final double? ringOffset;

  /// Ring color. Defaults to sys.borderFocus.
  final Color? ringColor;

  /// Border radius for the ring shape.
  final BorderRadius? borderRadius;

  /// Render as inset ring instead of offset.
  final bool inset;

  final Widget child;

  @override
  Widget build(BuildContext context) {
    if (!focused) return child;

    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final color = ringColor ?? sys.borderFocus;
    final width = ringWidth ?? sys.borderMedium;
    final offset = ringOffset ?? sys.spaceMicro;
    final radius = borderRadius ?? BorderRadius.circular(sys.radiusControl);

    return Semantics(
      focusable: true,
      focused: focused,
      child: CustomPaint(
        foregroundPainter: _FocusRingPainter(
          color: color,
          strokeWidth: width,
          offset: inset ? -width : offset,
          borderRadius: radius,
        ),
        child: child,
      ),
    );
  }
}

class _FocusRingPainter extends CustomPainter {
  _FocusRingPainter({
    required this.color,
    required this.strokeWidth,
    required this.offset,
    required this.borderRadius,
  });

  final Color color;
  final double strokeWidth;
  final double offset;
  final BorderRadius borderRadius;

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth;

    final rect = Rect.fromLTWH(
      -offset,
      -offset,
      size.width + offset * 2,
      size.height + offset * 2,
    );

    final rrect = borderRadius.resolve(TextDirection.ltr).toRRect(rect);
    canvas.drawRRect(rrect, paint);
  }

  @override
  bool shouldRepaint(covariant _FocusRingPainter old) =>
      color != old.color ||
      strokeWidth != old.strokeWidth ||
      offset != old.offset ||
      borderRadius != old.borderRadius;
}
