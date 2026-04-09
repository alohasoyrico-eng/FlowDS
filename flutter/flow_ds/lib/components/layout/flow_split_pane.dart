/// FLOW Design System — FlowSplitPane (Layout)
/// ────────────────────────────────────────────
/// Resizable side-by-side panels with a drag handle.
/// Uses sys tokens for border/colors/spacing.
import 'package:flutter/material.dart';

import '../../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Enums
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

enum FlowSplitOrientation { horizontal, vertical }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSplitPane
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowSplitPane extends StatefulWidget {
  const FlowSplitPane({
    super.key,
    required this.first,
    required this.second,
    this.orientation = FlowSplitOrientation.horizontal,
    this.initialRatio = 0.5,
    this.minRatio = 0.2,
    this.maxRatio = 0.8,
    this.semanticLabel,
  });

  final Widget first;
  final Widget second;
  final FlowSplitOrientation orientation;

  /// Initial split ratio for the first pane (0.0 - 1.0).
  final double initialRatio;
  final double minRatio;
  final double maxRatio;
  final String? semanticLabel;

  @override
  State<FlowSplitPane> createState() => _FlowSplitPaneState();
}

class _FlowSplitPaneState extends State<FlowSplitPane> {
  late double _ratio;

  @override
  void initState() {
    super.initState();
    _ratio = widget.initialRatio;
  }

  void _onDrag(DragUpdateDetails details, BoxConstraints constraints) {
    final isHorizontal = widget.orientation == FlowSplitOrientation.horizontal;
    final totalSize =
        isHorizontal ? constraints.maxWidth : constraints.maxHeight;
    final delta = isHorizontal ? details.delta.dx : details.delta.dy;

    setState(() {
      _ratio =
          (_ratio + delta / totalSize).clamp(widget.minRatio, widget.maxRatio);
    });
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final isHorizontal = widget.orientation == FlowSplitOrientation.horizontal;

    Widget result = LayoutBuilder(
      builder: (context, constraints) {
        final totalSize =
            isHorizontal ? constraints.maxWidth : constraints.maxHeight;
        final dividerThickness = sys.gapTight;
        final firstSize = (totalSize - dividerThickness) * _ratio;
        final secondSize = (totalSize - dividerThickness) * (1 - _ratio);

        final firstPane = SizedBox(
          width: isHorizontal ? firstSize : null,
          height: isHorizontal ? null : firstSize,
          child: widget.first,
        );

        final secondPane = SizedBox(
          width: isHorizontal ? secondSize : null,
          height: isHorizontal ? null : secondSize,
          child: widget.second,
        );

        final divider = GestureDetector(
          onPanUpdate: (details) => _onDrag(details, constraints),
          child: MouseRegion(
            cursor: isHorizontal
                ? SystemMouseCursors.resizeColumn
                : SystemMouseCursors.resizeRow,
            child: Container(
              width: isHorizontal ? dividerThickness : null,
              height: isHorizontal ? null : dividerThickness,
              color: sys.borderDefault,
              child: Center(
                child: Container(
                  width: isHorizontal ? sys.borderMedium : sys.gapComponent * 2,
                  height:
                      isHorizontal ? sys.gapComponent * 2 : sys.borderMedium,
                  decoration: BoxDecoration(
                    color: sys.textTertiary,
                    borderRadius: BorderRadius.circular(sys.radiusFull),
                  ),
                ),
              ),
            ),
          ),
        );

        if (isHorizontal) {
          return Row(
            children: [firstPane, divider, secondPane],
          );
        } else {
          return Column(
            children: [firstPane, divider, secondPane],
          );
        }
      },
    );

    if (widget.semanticLabel != null) {
      result = Semantics(
        label: widget.semanticLabel,
        container: true,
        child: result,
      );
    }

    return result;
  }
}
