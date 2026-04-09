/// FLOW Design System — FlowMotionContainer Primitive
/// ──────────────────────────────────────────────────
/// Animated container with enter/exit transitions using momentum tokens.
/// Maps to React's `<MotionContainer>`.
import 'package:flutter/material.dart';

import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowMotionContainer
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowMotionContainer extends StatefulWidget {
  const FlowMotionContainer({
    super.key,
    required this.visible,
    required this.child,
  });

  final bool visible;
  final Widget child;

  @override
  State<FlowMotionContainer> createState() => _FlowMotionContainerState();
}

class _FlowMotionContainerState extends State<FlowMotionContainer>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late Animation<double> _fadeAnimation;
  late Animation<double> _sizeAnimation;
  bool _shouldRender = false;

  @override
  void initState() {
    super.initState();
    _shouldRender = widget.visible;
    _controller = AnimationController(vsync: this);
    _controller.addStatusListener(_handleStatus);
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _configureAnimations();
    if (widget.visible) {
      _controller.value = 1.0;
    }
  }

  @override
  void didUpdateWidget(covariant FlowMotionContainer oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.visible != oldWidget.visible) {
      _configureAnimations();
      if (widget.visible) {
        setState(() => _shouldRender = true);
        _controller.forward(from: 0.0);
      } else {
        _controller.reverse(from: 1.0);
      }
    }
  }

  void _configureAnimations() {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    _controller.duration = sys.momentumDurationDefault;
    _controller.reverseDuration = sys.momentumDurationFast;
    _fadeAnimation = CurvedAnimation(
      parent: _controller,
      curve: sys.momentumEasingEnter,
      reverseCurve: sys.momentumEasingExit,
    );
    _sizeAnimation = CurvedAnimation(
      parent: _controller,
      curve: sys.momentumEasingEnter,
      reverseCurve: sys.momentumEasingExit,
    );
  }

  void _handleStatus(AnimationStatus status) {
    if (status == AnimationStatus.dismissed) {
      setState(() => _shouldRender = false);
    }
  }

  @override
  void dispose() {
    _controller.removeStatusListener(_handleStatus);
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_shouldRender) return const SizedBox.shrink();

    return FadeTransition(
      opacity: _fadeAnimation,
      child: SizeTransition(
        sizeFactor: _sizeAnimation,
        axisAlignment: -1.0,
        child: widget.child,
      ),
    );
  }
}
