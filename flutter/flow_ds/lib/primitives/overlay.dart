/// FLOW Design System — FlowOverlay Primitive
/// ───────────────────────────────────────────
/// Modal dimming backdrop using ModalBarrier with sys overlay color.
/// Maps to React's `<Overlay>`.
import 'package:flutter/material.dart';

import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowOverlay
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowOverlay extends StatelessWidget {
  const FlowOverlay({
    super.key,
    required this.visible,
    this.onDismiss,
    this.dismissible = true,
    this.child,
  });

  final bool visible;
  final VoidCallback? onDismiss;
  final bool dismissible;
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    if (!visible) return const SizedBox.shrink();

    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    return Stack(
      children: [
        Positioned.fill(
          child: Semantics(
            label: 'Dismiss overlay',
            excludeSemantics: true,
            child: ModalBarrier(
              dismissible: dismissible,
              color: sys.depthOverlay,
              onDismiss: dismissible ? onDismiss : null,
            ),
          ),
        ),
        if (child != null) child!,
      ],
    );
  }
}
