/// FLOW Design System — FlowTable (L3 Component)
/// ─────────────────────────────────────────────
/// Basic data table with column headers and rows.
/// Supports hoverable rows, striping, and caption.
/// Consumes comp.table tokens via FlowCompTokens.
import 'package:flutter/material.dart';

import '../../primitives/surface.dart';
import '../../primitives/text.dart';
import '../../tokens/comp_tokens.dart';
import '../../tokens/sys_tokens.dart';

/// Column definition for FlowTable.
class FlowTableColumn<T> {
  const FlowTableColumn({
    required this.key,
    this.header,
    this.width,
    this.align = Alignment.centerLeft,
    this.render,
  });

  final String key;
  final String? header;
  final double? width;
  final Alignment align;
  final Widget Function(T row, int index)? render;
}

class FlowTable<T> extends StatelessWidget {
  const FlowTable({
    super.key,
    required this.columns,
    required this.data,
    this.rowKey,
    this.hoverable = true,
    this.striped = false,
    this.caption,
    this.emptyMessage,
    this.semanticLabel,
  });

  final List<FlowTableColumn<T>> columns;
  final List<T> data;
  final String Function(T row, int index)? rowKey;
  final bool hoverable;
  final bool striped;
  final String? caption;
  final String? emptyMessage;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).extension<FlowCompTokens>()!.table;
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    return Semantics(
      label: semanticLabel,
      child: FlowSurface(
        radius: FlowRadius.container,
        border: true,
        padding: 0.0,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: [
            if (caption != null)
              Padding(
                padding: EdgeInsets.all(t.cellPaddingX),
                child: FlowText(caption!, role: FlowTextRole.paragraphS),
              ),
            // Header row
            Container(
              decoration: BoxDecoration(
                border: Border(
                    bottom: BorderSide(
                        color: sys.borderDefault, width: sys.borderThin)),
              ),
              child: Row(
                children: columns.map((col) {
                  return _cell(
                    width: col.width,
                    padding: EdgeInsets.symmetric(
                      horizontal: t.cellPaddingX,
                      vertical: t.cellPaddingY,
                    ),
                    align: col.align,
                    child: FlowText(
                      col.header ?? col.key,
                      role: FlowTextRole.caption,
                      weight: FontWeight.w600,
                    ),
                  );
                }).toList(),
              ),
            ),
            // Empty state
            if (data.isEmpty && emptyMessage != null)
              Padding(
                padding: EdgeInsets.all(t.cellPaddingX * 2),
                child: Center(
                  child: FlowText(emptyMessage!,
                      role: FlowTextRole.paragraphS,
                      color: FlowTextColor.tertiary),
                ),
              ),
            // Data rows
            ...data.asMap().entries.map((entry) {
              final idx = entry.key;
              final row = entry.value;
              final stripedBg =
                  striped && idx.isOdd ? sys.surfaceSecondary : null;

              return _HoverableRow(
                hoverable: hoverable,
                hoverColor: sys.surfaceSecondary,
                stripedColor: stripedBg,
                borderColor: sys.borderDefault,
                borderWidth: sys.borderThin,
                isLast: idx == data.length - 1,
                child: Row(
                  children: columns.map((col) {
                    return _cell(
                      width: col.width,
                      padding: EdgeInsets.symmetric(
                        horizontal: t.cellPaddingX,
                        vertical: t.cellPaddingY,
                      ),
                      align: col.align,
                      child: col.render != null
                          ? col.render!(row, idx)
                          : FlowText(
                              _extractField(row, col.key),
                              role: FlowTextRole.paragraphS,
                            ),
                    );
                  }).toList(),
                ),
              );
            }),
          ],
        ),
      ),
    );
  }

  Widget _cell({
    required double? width,
    required EdgeInsets padding,
    required Alignment align,
    required Widget child,
  }) {
    Widget cell =
        Padding(padding: padding, child: Align(alignment: align, child: child));
    if (width != null) {
      return SizedBox(width: width, child: cell);
    }
    return Expanded(child: cell);
  }

  String _extractField(T row, String key) {
    if (row is Map) return (row[key] ?? '').toString();
    return '';
  }
}

/// Internal hoverable row widget for FlowTable.
class _HoverableRow extends StatefulWidget {
  const _HoverableRow({
    required this.child,
    required this.hoverable,
    required this.hoverColor,
    this.stripedColor,
    required this.borderColor,
    required this.borderWidth,
    required this.isLast,
  });

  final Widget child;
  final bool hoverable;
  final Color hoverColor;
  final Color? stripedColor;
  final Color borderColor;
  final double borderWidth;
  final bool isLast;

  @override
  State<_HoverableRow> createState() => _HoverableRowState();
}

class _HoverableRowState extends State<_HoverableRow> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    final bg =
        _hovered && widget.hoverable ? widget.hoverColor : widget.stripedColor;

    Widget row = Container(
      decoration: BoxDecoration(
        color: bg,
        border: widget.isLast
            ? null
            : Border(
                bottom: BorderSide(
                    color: widget.borderColor, width: widget.borderWidth)),
      ),
      child: widget.child,
    );

    if (widget.hoverable) {
      row = MouseRegion(
        onEnter: (_) => setState(() => _hovered = true),
        onExit: (_) => setState(() => _hovered = false),
        child: row,
      );
    }

    return row;
  }
}
