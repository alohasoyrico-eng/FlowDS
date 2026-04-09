/// FLOW Design System — FlowInline Primitive
/// ──────────────────────────────────────────
/// Horizontal layout with token-driven gap and optional wrapping.
/// Maps to React's `<Inline>`.
import 'package:flutter/material.dart';

import '../tokens/sys_tokens.dart';
import 'surface.dart';
import 'stack.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowInline
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowInline extends StatelessWidget {
  const FlowInline({
    super.key,
    this.gap = FlowGap.component,
    this.align = CrossAxisAlignment.center,
    this.mainAlign = MainAxisAlignment.start,
    this.mainSize = MainAxisSize.min,
    this.wrap = false,
    this.padding,
    this.children = const [],
  });

  /// Accepts [FlowGap] or [double].
  final Object gap;

  final CrossAxisAlignment align;
  final MainAxisAlignment mainAlign;
  final MainAxisSize mainSize;
  final bool wrap;

  /// Accepts [FlowPadding] or [double] or null.
  final Object? padding;

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final gapValue = resolveGap(sys, gap);

    Widget result;

    if (wrap) {
      result = Wrap(
        spacing: gapValue,
        runSpacing: gapValue,
        crossAxisAlignment: _wrapCrossAlign(align),
        alignment: _wrapMainAlign(mainAlign),
        children: children,
      );
    } else {
      final spaced = <Widget>[];
      for (var i = 0; i < children.length; i++) {
        if (i > 0 && gapValue > 0) {
          spaced.add(SizedBox(width: gapValue));
        }
        spaced.add(children[i]);
      }
      result = Row(
        crossAxisAlignment: align,
        mainAxisAlignment: mainAlign,
        mainAxisSize: mainSize,
        children: spaced,
      );
    }

    if (padding != null) {
      final p = resolvePadding(sys, padding!);
      result = Padding(padding: EdgeInsets.all(p), child: result);
    }

    return result;
  }
}

WrapCrossAlignment _wrapCrossAlign(CrossAxisAlignment ca) {
  switch (ca) {
    case CrossAxisAlignment.start:
      return WrapCrossAlignment.start;
    case CrossAxisAlignment.end:
      return WrapCrossAlignment.end;
    case CrossAxisAlignment.center:
      return WrapCrossAlignment.center;
    default:
      return WrapCrossAlignment.start;
  }
}

WrapAlignment _wrapMainAlign(MainAxisAlignment ma) {
  switch (ma) {
    case MainAxisAlignment.start:
      return WrapAlignment.start;
    case MainAxisAlignment.end:
      return WrapAlignment.end;
    case MainAxisAlignment.center:
      return WrapAlignment.center;
    case MainAxisAlignment.spaceBetween:
      return WrapAlignment.spaceBetween;
    case MainAxisAlignment.spaceAround:
      return WrapAlignment.spaceAround;
    case MainAxisAlignment.spaceEvenly:
      return WrapAlignment.spaceEvenly;
  }
}
