/// FLOW Design System — FlowContextMenu (Overlays)
/// ───────────────────────────────────────────────
/// Right-click / long-press positioned menu.
/// Uses comp.contextMenu tokens.
import 'package:flutter/material.dart';

import '../../primitives/icon.dart';
import '../../tokens/comp_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Context menu item models
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowContextMenuItem {
  const FlowContextMenuItem({
    required this.label,
    this.icon,
    this.shortcut,
    this.onTap,
    this.disabled = false,
    this.danger = false,
  });

  final String label;
  final IconData? icon;
  final String? shortcut;
  final VoidCallback? onTap;
  final bool disabled;
  final bool danger;
}

class FlowContextMenuSeparator extends FlowContextMenuItem {
  const FlowContextMenuSeparator() : super(label: '');
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowContextMenu
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowContextMenu extends StatelessWidget {
  const FlowContextMenu({
    super.key,
    required this.child,
    required this.items,
    this.semanticLabel,
  });

  final Widget child;
  final List<FlowContextMenuItem> items;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onLongPressStart: (details) => _showMenu(context, details.globalPosition),
      onSecondaryTapUp: (details) => _showMenu(context, details.globalPosition),
      child: child,
    );
  }

  Future<void> _showMenu(BuildContext context, Offset position) async {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.contextMenu;

    final entries = <PopupMenuEntry<VoidCallback>>[];

    for (final item in items) {
      if (item is FlowContextMenuSeparator) {
        entries.add(const PopupMenuDivider(height: 1));
      } else {
        entries.add(_ContextMenuItemEntry(item: item, tokens: t));
      }
    }

    final result = await showMenu<VoidCallback>(
      context: context,
      position: RelativeRect.fromLTRB(
        position.dx,
        position.dy,
        position.dx,
        position.dy,
      ),
      color: t.bg,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(t.radius),
        side: BorderSide(color: t.border, width: 1),
      ),
      elevation: 0,
      shadowColor: Colors.transparent,
      constraints: BoxConstraints(
        minWidth: t.minWidth,
        maxWidth: t.maxWidth,
      ),
      items: entries,
    );

    result?.call();
  }
}

class _ContextMenuItemEntry extends PopupMenuEntry<VoidCallback> {
  const _ContextMenuItemEntry({
    required this.item,
    required this.tokens,
  });

  final FlowContextMenuItem item;
  final FlowCompContextMenu tokens;

  @override
  double get height => tokens.itemPaddingY * 2 + 20;

  @override
  bool represents(VoidCallback? value) => value == item.onTap;

  @override
  State<_ContextMenuItemEntry> createState() => _ContextMenuItemEntryState();
}

class _ContextMenuItemEntryState extends State<_ContextMenuItemEntry> {
  @override
  Widget build(BuildContext context) {
    final textColor = widget.item.disabled
        ? widget.tokens.textDisabled
        : widget.item.danger
            ? widget.tokens.textDanger
            : widget.tokens.textDefault;

    return InkWell(
      onTap: widget.item.disabled
          ? null
          : () => Navigator.of(context).pop(widget.item.onTap),
      borderRadius: BorderRadius.circular(widget.tokens.itemRadius),
      child: Padding(
        padding: EdgeInsets.symmetric(
          horizontal: widget.tokens.itemPaddingX,
          vertical: widget.tokens.itemPaddingY,
        ),
        child: Row(
          children: [
            if (widget.item.icon != null) ...[
              FlowIcon(
                widget.item.icon!,
                size: FlowIconSize.sm,
                iconColor: textColor,
              ),
              SizedBox(width: widget.tokens.itemPaddingX),
            ],
            Expanded(
              child: Text(
                widget.item.label,
                style: TextStyle(
                  color: textColor,
                  fontSize: widget.tokens.font,
                ),
              ),
            ),
            if (widget.item.shortcut != null)
              Text(
                widget.item.shortcut!,
                style: TextStyle(
                  color: widget.tokens.textSecondary,
                  fontSize: widget.tokens.shortcutFont,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
