/// FLOW Design System — FlowGrid Primitive
/// ────────────────────────────────────────
/// Token-driven grid layout with fixed column count and gap.
/// Maps to React's `<Grid>`.
import 'package:flutter/material.dart';

import '../tokens/sys_tokens.dart';
import 'stack.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowGrid
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowGrid extends StatelessWidget {
  const FlowGrid({
    super.key,
    this.columns = 2,
    this.gap = FlowGap.component,
    this.padding,
    this.children = const [],
  });

  final int columns;

  /// Accepts [FlowGap] or [double].
  final Object gap;

  /// Accepts [FlowPadding] or [double] or null.
  final Object? padding;

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final gapValue = resolveGap(sys, gap);

    // Build rows manually for layout control without scroll.
    final rows = <Widget>[];
    for (var i = 0; i < children.length; i += columns) {
      final rowChildren = <Widget>[];
      for (var j = 0; j < columns; j++) {
        if (j > 0 && gapValue > 0) {
          rowChildren.add(SizedBox(width: gapValue));
        }
        final idx = i + j;
        rowChildren.add(
          Expanded(
            child:
                idx < children.length ? children[idx] : const SizedBox.shrink(),
          ),
        );
      }
      if (rows.isNotEmpty && gapValue > 0) {
        rows.add(SizedBox(height: gapValue));
      }
      rows.add(Row(children: rowChildren));
    }

    Widget result = Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: rows,
    );

    if (padding != null) {
      final p =
          padding is double ? padding as double : resolveGap(sys, padding!);
      result = Padding(padding: EdgeInsets.all(p), child: result);
    }

    return result;
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowGridItem — optional child with span control
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowGridItem extends StatelessWidget {
  const FlowGridItem({
    super.key,
    this.span = 1,
    required this.child,
  });

  /// How many columns this item spans.
  final int span;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    // Span is handled by parent FlowGrid when using GridView.
    // For the Column+Row layout, wrap with Expanded(flex: span).
    return child;
  }
}
