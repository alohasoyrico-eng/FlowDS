/// FLOW Design System — FlowStateLayer Primitive
/// ──────────────────────────────────────────────
/// Transparent overlay that responds to interaction states.
/// Maps to React's `<StateLayer>`.
import 'package:flutter/material.dart';

import '../tokens/sys_tokens.dart';
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowStateLayerState
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Interaction state for the state layer overlay.
enum FlowStateLayerState {
  idle,
  hover,
  pressed,
  selected,
  dragging,
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowStateLayer
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowStateLayer extends StatelessWidget {
  const FlowStateLayer({
    super.key,
    this.state = FlowStateLayerState.idle,
    this.color,
    this.disabled = false,
    this.clip = true,
    this.borderRadius,
    required this.child,
  });

  final FlowStateLayerState state;

  /// Custom overlay color. Defaults to textPrimary.
  final Color? color;

  final bool disabled;

  /// Whether to clip the overlay to parent's border-radius.
  final bool clip;

  final BorderRadius? borderRadius;

  final Widget child;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    final overlayColor = color ?? sys.textPrimary;
    final opacity = _resolveOpacity(sys);
    final radius = borderRadius ?? BorderRadius.zero;

    return Stack(
      children: [
        child,
        Positioned.fill(
          child: IgnorePointer(
            child: ClipRRect(
              borderRadius: clip ? radius : BorderRadius.zero,
              child: Semantics(
                excludeSemantics: true,
                child: AnimatedOpacity(
                  opacity: disabled ? sys.stateDisabledOpacity : opacity,
                  duration: sys.momentumDurationFast,
                  curve: sys.momentumEasingStandard,
                  child: ColoredBox(color: overlayColor),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  double _resolveOpacity(FlowSysTokens sys) {
    switch (state) {
      case FlowStateLayerState.idle:
        return 0;
      case FlowStateLayerState.hover:
        return sys.stateHoverOpacity;
      case FlowStateLayerState.pressed:
        return sys.statePressedOpacity;
      case FlowStateLayerState.selected:
        return sys.stateSelectedOpacity;
      case FlowStateLayerState.dragging:
        return sys.stateSelectedOpacity * 0.6;
    }
  }
}
