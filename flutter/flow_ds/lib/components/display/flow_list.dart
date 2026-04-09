/// FLOW Design System — FlowList + FlowListItem (L3 Component)
/// ────────────────────────────────────────────────────────────
/// Vertical list with leading/trailing slots, separator, selection.
/// Consumes comp.list tokens via FlowCompTokens.
import 'package:flutter/material.dart';

import '../../primitives/divider.dart';
import '../../primitives/text.dart';
import '../../tokens/comp_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowList — container
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowList extends StatelessWidget {
  const FlowList({
    super.key,
    required this.children,
    this.dividers = false,
    this.selectable = false,
    this.semanticLabel,
  });

  final List<Widget> children;
  final bool dividers;
  final bool selectable;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final items = <Widget>[];
    for (var i = 0; i < children.length; i++) {
      if (i > 0 && dividers) {
        items.add(const FlowDivider(spacing: 0));
      }
      items.add(children[i]);
    }

    return Semantics(
      label: semanticLabel,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: items,
      ),
    );
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowListItem — individual row
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowListItem extends StatefulWidget {
  const FlowListItem({
    super.key,
    required this.primary,
    this.secondary,
    this.tertiary,
    this.leading,
    this.trailing,
    this.selected = false,
    this.disabled = false,
    this.onTap,
    this.semanticLabel,
  });

  final String primary;
  final String? secondary;
  final String? tertiary;
  final Widget? leading;
  final Widget? trailing;
  final bool selected;
  final bool disabled;
  final VoidCallback? onTap;
  final String? semanticLabel;

  @override
  State<FlowListItem> createState() => _FlowListItemState();
}

class _FlowListItemState extends State<FlowListItem> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).extension<FlowCompTokens>()!.list;

    Color bg;
    if (widget.disabled) {
      bg = t.itemBg;
    } else if (widget.selected) {
      bg = t.itemBgSelected;
    } else if (_hovered) {
      bg = t.itemBgHover;
    } else {
      bg = t.itemBg;
    }

    final content = Row(
      children: [
        if (widget.leading != null) ...[
          widget.leading!,
          SizedBox(width: t.gap > 0 ? t.gap : t.itemPaddingX / 2),
        ],
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              FlowText(widget.primary, role: FlowTextRole.labelM),
              if (widget.secondary != null)
                FlowText(
                  widget.secondary!,
                  role: FlowTextRole.paragraphS,
                  color: FlowTextColor.secondary,
                ),
              if (widget.tertiary != null)
                FlowText(
                  widget.tertiary!,
                  role: FlowTextRole.caption,
                  color: FlowTextColor.tertiary,
                ),
            ],
          ),
        ),
        if (widget.trailing != null) ...[
          SizedBox(width: t.gap > 0 ? t.gap : t.itemPaddingX / 2),
          widget.trailing!,
        ],
      ],
    );

    Widget item = AnimatedContainer(
      duration: const Duration(milliseconds: 150),
      padding: EdgeInsets.symmetric(
        horizontal: t.itemPaddingX,
        vertical: t.itemPaddingY,
      ),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(t.radius),
      ),
      child: content,
    );

    if (widget.disabled) {
      item = Opacity(opacity: 0.5, child: item);
    } else if (widget.onTap != null) {
      item = MouseRegion(
        onEnter: (_) => setState(() => _hovered = true),
        onExit: (_) => setState(() => _hovered = false),
        cursor: SystemMouseCursors.click,
        child: GestureDetector(onTap: widget.onTap, child: item),
      );
    }

    return Semantics(
      label: widget.semanticLabel ?? widget.primary,
      selected: widget.selected,
      enabled: !widget.disabled,
      child: item,
    );
  }
}
