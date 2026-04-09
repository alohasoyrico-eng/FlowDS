/// FLOW Design System — FlowMenu (Overlays)
/// ────────────────────────────────────────
/// Dropdown menu with items, sections, and shortcut labels.
/// Uses comp.menu tokens.
import 'package:flutter/material.dart';

import '../../primitives/icon.dart';
import '../../primitives/text.dart';
import '../../tokens/comp_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Menu item models
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowMenuItem {
  const FlowMenuItem({
    required this.label,
    this.icon,
    this.shortcut,
    this.onTap,
    this.disabled = false,
    this.danger = false,
    this.checked,
  });

  final String label;
  final IconData? icon;
  final String? shortcut;
  final VoidCallback? onTap;
  final bool disabled;
  final bool danger;

  /// If non-null, show a check mark when true.
  final bool? checked;
}

class FlowMenuSection {
  const FlowMenuSection({
    this.label,
    required this.items,
  });

  final String? label;
  final List<FlowMenuItem> items;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowMenu
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowMenu extends StatelessWidget {
  const FlowMenu({
    super.key,
    required this.sections,
    this.semanticLabel,
  });

  final List<FlowMenuSection> sections;
  final String? semanticLabel;

  /// Shows this menu as a popup below a trigger.
  static Future<void> show({
    required BuildContext context,
    required RelativeRect position,
    required List<FlowMenuSection> sections,
    String? semanticLabel,
  }) async {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.menu;

    final items = <PopupMenuEntry<VoidCallback>>[];

    for (var si = 0; si < sections.length; si++) {
      final section = sections[si];

      if (si > 0) {
        items.add(PopupMenuDivider(height: 1));
      }

      if (section.label != null) {
        items.add(_MenuSectionHeader(label: section.label!, tokens: t));
      }

      for (final item in section.items) {
        items.add(_MenuItemEntry(item: item, tokens: t));
      }
    }

    final result = await showMenu<VoidCallback>(
      context: context,
      position: position,
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
      items: items,
    );

    result?.call();
  }

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.menu;

    return Semantics(
      label: semanticLabel ?? 'Menu',
      container: true,
      child: Container(
        constraints: BoxConstraints(
          minWidth: t.minWidth,
          maxWidth: t.maxWidth,
        ),
        decoration: BoxDecoration(
          color: t.bg,
          borderRadius: BorderRadius.circular(t.radius),
          border: Border.fromBorderSide(
            BorderSide(color: t.border, width: 1),
          ),
          boxShadow: t.shadow,
        ),
        padding: EdgeInsets.all(t.padding),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: _buildSections(t),
        ),
      ),
    );
  }

  List<Widget> _buildSections(FlowCompMenu t) {
    final widgets = <Widget>[];

    for (var si = 0; si < sections.length; si++) {
      final section = sections[si];

      if (si > 0) {
        widgets.add(
          Padding(
            padding: EdgeInsets.symmetric(vertical: t.itemPaddingY),
            child: Container(height: 1, color: t.separator),
          ),
        );
      }

      if (section.label != null) {
        widgets.add(
          Padding(
            padding: EdgeInsets.only(
              left: t.itemPaddingX,
              top: t.itemPaddingY,
              bottom: t.itemPaddingY / 2,
            ),
            child: FlowText(
              section.label!,
              role: FlowTextRole.overline,
              color: FlowTextColor.secondary,
            ),
          ),
        );
      }

      for (final item in section.items) {
        widgets.add(_FlowMenuItemWidget(item: item, tokens: t));
      }
    }

    return widgets;
  }
}

class _FlowMenuItemWidget extends StatelessWidget {
  const _FlowMenuItemWidget({required this.item, required this.tokens});

  final FlowMenuItem item;
  final FlowCompMenu tokens;

  @override
  Widget build(BuildContext context) {
    final textColor = item.disabled
        ? tokens.textDisabled
        : item.danger
            ? tokens.textDanger
            : tokens.textDefault;

    return Semantics(
      label: item.label,
      button: true,
      enabled: !item.disabled,
      child: GestureDetector(
        onTap: item.disabled ? null : item.onTap,
        child: Container(
          padding: EdgeInsets.symmetric(
            horizontal: tokens.itemPaddingX,
            vertical: tokens.itemPaddingY,
          ),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(tokens.itemRadius),
          ),
          child: Row(
            children: [
              if (item.checked != null)
                SizedBox(
                  width: tokens.checkSize,
                  child: item.checked!
                      ? FlowIcon(Icons.check,
                          size: FlowIconSize.sm, iconColor: textColor)
                      : null,
                ),
              if (item.icon != null) ...[
                FlowIcon(item.icon!,
                    size: FlowIconSize.sm, iconColor: textColor),
                SizedBox(width: tokens.itemPaddingX),
              ],
              Expanded(
                child: Text(
                  item.label,
                  style: TextStyle(
                    color: textColor,
                    fontSize: tokens.font,
                  ),
                ),
              ),
              if (item.shortcut != null)
                Text(
                  item.shortcut!,
                  style: TextStyle(
                    color: tokens.textSecondary,
                    fontSize: tokens.font - 2,
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Internal popup menu section header entry.
class _MenuSectionHeader extends PopupMenuEntry<VoidCallback> {
  const _MenuSectionHeader({required this.label, required this.tokens});

  final String label;
  final FlowCompMenu tokens;

  @override
  double get height => tokens.itemPaddingY * 2 + 14;

  @override
  bool represents(VoidCallback? value) => false;

  @override
  State<_MenuSectionHeader> createState() => _MenuSectionHeaderState();
}

class _MenuSectionHeaderState extends State<_MenuSectionHeader> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        left: widget.tokens.itemPaddingX,
        top: widget.tokens.itemPaddingY,
      ),
      child: FlowText(
        widget.label,
        role: FlowTextRole.overline,
        color: FlowTextColor.secondary,
      ),
    );
  }
}

/// Internal popup menu item entry.
class _MenuItemEntry extends PopupMenuEntry<VoidCallback> {
  const _MenuItemEntry({required this.item, required this.tokens});

  final FlowMenuItem item;
  final FlowCompMenu tokens;

  @override
  double get height => tokens.itemPaddingY * 2 + 20;

  @override
  bool represents(VoidCallback? value) => value == item.onTap;

  @override
  State<_MenuItemEntry> createState() => _MenuItemEntryState();
}

class _MenuItemEntryState extends State<_MenuItemEntry> {
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
              FlowIcon(widget.item.icon!,
                  size: FlowIconSize.sm, iconColor: textColor),
              SizedBox(width: widget.tokens.itemPaddingX),
            ],
            Expanded(
              child: Text(
                widget.item.label,
                style:
                    TextStyle(color: textColor, fontSize: widget.tokens.font),
              ),
            ),
            if (widget.item.shortcut != null)
              Text(
                widget.item.shortcut!,
                style: TextStyle(
                  color: widget.tokens.textSecondary,
                  fontSize: widget.tokens.font - 2,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
