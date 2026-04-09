/// FLOW Design System — FlowTreeView (L3 Component)
/// ─────────────────────────────────────────────────
/// Expandable hierarchical tree with arrow-key friendly design.
/// WAI-ARIA tree roles mapped to Flutter Semantics.
/// Uses sys tokens for colors; comp tokens not required (CSS-driven in web).
import 'package:flutter/material.dart';

import '../../primitives/icon.dart';
import '../../primitives/text.dart';
import '../../tokens/sys_tokens.dart';

/// Data model for a tree node.
class FlowTreeNode {
  const FlowTreeNode({
    required this.id,
    required this.label,
    this.icon,
    this.children = const [],
    this.disabled = false,
  });

  final String id;
  final String label;
  final IconData? icon;
  final List<FlowTreeNode> children;
  final bool disabled;
}

class FlowTreeView extends StatefulWidget {
  const FlowTreeView({
    super.key,
    required this.nodes,
    this.selectedId,
    this.onSelect,
    this.defaultExpandedIds = const {},
    this.expandAll = false,
    this.indent = 24.0,
    this.semanticLabel,
  });

  final List<FlowTreeNode> nodes;
  final String? selectedId;
  final ValueChanged<String>? onSelect;
  final Set<String> defaultExpandedIds;
  final bool expandAll;
  final double indent;
  final String? semanticLabel;

  @override
  State<FlowTreeView> createState() => _FlowTreeViewState();
}

class _FlowTreeViewState extends State<FlowTreeView> {
  late Set<String> _expanded;

  @override
  void initState() {
    super.initState();
    _expanded = widget.expandAll
        ? _collectParentIds(widget.nodes)
        : Set<String>.from(widget.defaultExpandedIds);
  }

  Set<String> _collectParentIds(List<FlowTreeNode> nodes) {
    final ids = <String>{};
    void walk(List<FlowTreeNode> list) {
      for (final n in list) {
        if (n.children.isNotEmpty) {
          ids.add(n.id);
          walk(n.children);
        }
      }
    }

    walk(nodes);
    return ids;
  }

  void _toggle(String id) {
    setState(() {
      if (_expanded.contains(id)) {
        _expanded.remove(id);
      } else {
        _expanded.add(id);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: widget.semanticLabel ?? 'Tree',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: widget.nodes.map((n) => _buildNode(context, n, 0)).toList(),
      ),
    );
  }

  Widget _buildNode(BuildContext context, FlowTreeNode node, int depth) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final hasChildren = node.children.isNotEmpty;
    final isExpanded = _expanded.contains(node.id);
    final isSelected = widget.selectedId == node.id;

    final rowChildren = <Widget>[
      // Chevron
      SizedBox(
        width: sys.iconSizeXs + sys.gapTight,
        child: hasChildren
            ? FlowIcon(
                isExpanded ? Icons.expand_more : Icons.chevron_right,
                size: FlowIconSize.xs,
                colorRole: FlowIconColor.tertiary,
              )
            : null,
      ),
      if (node.icon != null) ...[
        FlowIcon(node.icon!, size: FlowIconSize.sm),
        SizedBox(width: sys.gapTight),
      ],
      Expanded(
        child: FlowText(
          node.label,
          role: FlowTextRole.paragraphS,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
      ),
    ];

    Widget row = Container(
      padding: EdgeInsetsDirectional.only(
        start: depth * widget.indent,
        top: sys.gapTight,
        bottom: sys.gapTight,
        end: sys.gapTight,
      ),
      decoration: BoxDecoration(
        color: isSelected ? sys.surfaceTertiary : null,
        borderRadius: BorderRadius.circular(sys.radiusSm),
      ),
      child: Row(children: rowChildren),
    );

    if (!node.disabled) {
      row = GestureDetector(
        onTap: () {
          if (hasChildren) _toggle(node.id);
          widget.onSelect?.call(node.id);
        },
        behavior: HitTestBehavior.opaque,
        child: row,
      );
    } else {
      row = Opacity(opacity: 0.5, child: row);
    }

    row = Semantics(
      selected: isSelected,
      enabled: !node.disabled,
      expanded: hasChildren ? isExpanded : null,
      label: node.label,
      child: row,
    );

    if (!hasChildren || !isExpanded) return row;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        row,
        ...node.children.map((c) => _buildNode(context, c, depth + 1)),
      ],
    );
  }
}
