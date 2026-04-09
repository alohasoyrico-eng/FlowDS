/// FLOW Design System — FlowStack Primitive
/// ─────────────────────────────────────────
/// Vertical layout with token-driven gap.
/// Maps to React's `<Stack>`.
import 'package:flutter/material.dart';

import '../tokens/sys_tokens.dart';
import 'surface.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Semantic gap roles
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Semantic gap roles routed through sys tokens.
enum FlowGap {
  tight,
  component,
  componentLg,
  subsection,
  section,
  page,
}

/// Resolves a [FlowGap] enum or raw double to a concrete gap value.
double resolveGap(FlowSysTokens sys, Object gap) {
  if (gap is double) return gap;
  if (gap is FlowGap) {
    switch (gap) {
      case FlowGap.tight:
        return sys.gapTight;
      case FlowGap.component:
        return sys.gapComponent;
      case FlowGap.componentLg:
        return sys.gapComponentLg;
      case FlowGap.subsection:
        return sys.gapSubsection;
      case FlowGap.section:
        return sys.gapSection;
      case FlowGap.page:
        return sys.gapPage;
    }
  }
  return sys.gapComponent;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowStack
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowStack extends StatelessWidget {
  const FlowStack({
    super.key,
    this.gap = FlowGap.component,
    this.align = CrossAxisAlignment.stretch,
    this.mainAlign = MainAxisAlignment.start,
    this.mainSize = MainAxisSize.min,
    this.padding,
    this.children = const [],
  });

  /// Accepts [FlowGap] or [double].
  final Object gap;

  final CrossAxisAlignment align;
  final MainAxisAlignment mainAlign;
  final MainAxisSize mainSize;

  /// Accepts [FlowPadding] or [double] or null.
  final Object? padding;

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final gapValue = resolveGap(sys, gap);

    final spaced = <Widget>[];
    for (var i = 0; i < children.length; i++) {
      if (i > 0 && gapValue > 0) {
        spaced.add(SizedBox(height: gapValue));
      }
      spaced.add(children[i]);
    }

    Widget result = Column(
      crossAxisAlignment: align,
      mainAxisAlignment: mainAlign,
      mainAxisSize: mainSize,
      children: spaced,
    );

    if (padding != null) {
      final p = resolvePadding(sys, padding!);
      result = Padding(padding: EdgeInsets.all(p), child: result);
    }

    return result;
  }
}
