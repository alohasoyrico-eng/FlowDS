/// FLOW Design System — FlowSkeleton (L3 Component)
/// ─────────────────────────────────────────────────
/// Shimmer loading placeholder. Variants: text, circle, rect, card.
/// Uses sys tokens for surface colors and animation.
import 'package:flutter/material.dart';

import '../../tokens/sys_tokens.dart';

/// Skeleton shape variant.
enum FlowSkeletonVariant { text, circle, rect, card }

class FlowSkeleton extends StatefulWidget {
  const FlowSkeleton({
    super.key,
    this.variant = FlowSkeletonVariant.text,
    this.width,
    this.height,
    this.lines = 1,
    this.animate = true,
    this.borderRadius,
  });

  final FlowSkeletonVariant variant;
  final double? width;
  final double? height;
  final int lines;
  final bool animate;
  final double? borderRadius;

  @override
  State<FlowSkeleton> createState() => _FlowSkeletonState();
}

class _FlowSkeletonState extends State<FlowSkeleton>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    );
    _animation = Tween<double>(begin: -1.0, end: 2.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
    if (widget.animate) _controller.repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    if (widget.variant == FlowSkeletonVariant.text && widget.lines > 1) {
      return Semantics(
        excludeSemantics: true,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: List.generate(widget.lines, (i) {
            final isLast = i == widget.lines - 1;
            return Padding(
              padding: EdgeInsets.only(bottom: isLast ? 0 : sys.gapTight),
              child: FractionallySizedBox(
                alignment: Alignment.centerLeft,
                widthFactor: isLast ? 0.75 : 1.0,
                child: _buildSkeleton(sys, null, widget.height),
              ),
            );
          }),
        ),
      );
    }

    final resolvedWidth = widget.width ?? _defaultWidth();
    final resolvedHeight = widget.height ?? _defaultHeight(resolvedWidth);

    return Semantics(
      excludeSemantics: true,
      child: _buildSkeleton(sys, resolvedWidth, resolvedHeight),
    );
  }

  Widget _buildSkeleton(FlowSysTokens sys, double? width, double? height) {
    final double radius = widget.borderRadius ?? _defaultRadius(sys);
    final baseColor = sys.surfaceSecondary;
    final shimmerColor = sys.surfaceTertiary;

    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Container(
          width: width,
          height: height ?? sys.gapComponent,
          decoration: BoxDecoration(
            borderRadius: widget.variant == FlowSkeletonVariant.circle
                ? null
                : BorderRadius.circular(radius),
            shape: widget.variant == FlowSkeletonVariant.circle
                ? BoxShape.circle
                : BoxShape.rectangle,
            gradient: widget.animate
                ? LinearGradient(
                    begin: Alignment.centerLeft,
                    end: Alignment.centerRight,
                    colors: [baseColor, shimmerColor, baseColor],
                    stops: [
                      (_animation.value - 0.3).clamp(0.0, 1.0),
                      _animation.value.clamp(0.0, 1.0),
                      (_animation.value + 0.3).clamp(0.0, 1.0),
                    ],
                  )
                : null,
            color: widget.animate ? null : baseColor,
          ),
        );
      },
    );
  }

  double _defaultWidth() => switch (widget.variant) {
        FlowSkeletonVariant.circle => 40,
        _ => double.infinity,
      };

  double _defaultHeight(double? width) => switch (widget.variant) {
        FlowSkeletonVariant.circle => width ?? 40,
        FlowSkeletonVariant.rect || FlowSkeletonVariant.card => 120,
        FlowSkeletonVariant.text => 16,
      };

  double _defaultRadius(FlowSysTokens sys) => switch (widget.variant) {
        FlowSkeletonVariant.circle => sys.radiusFull,
        FlowSkeletonVariant.card => sys.radiusContainer,
        _ => sys.radiusSm,
      };
}
