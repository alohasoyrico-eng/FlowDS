/// FLOW Design System — FlowSidebar (Navigation)
/// ─────────────────────────────────────────────
/// Collapsible navigation sidebar with animated width transition.
/// Uses comp.sidebar tokens.
import 'package:flutter/material.dart';

import '../../primitives/icon.dart';
import '../../primitives/text.dart';
import '../../tokens/comp_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Sidebar item models
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowSidebarItem {
  const FlowSidebarItem({
    required this.key,
    required this.icon,
    required this.label,
    this.badge,
  });

  final String key;
  final IconData icon;
  final String label;
  final String? badge;
}

class FlowSidebarGroup {
  const FlowSidebarGroup({
    required this.label,
    required this.items,
  });

  final String label;
  final List<FlowSidebarItem> items;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSidebar
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowSidebar extends StatefulWidget {
  const FlowSidebar({
    super.key,
    required this.groups,
    required this.selectedKey,
    required this.onItemSelected,
    this.expanded = true,
    this.onToggle,
    this.header,
    this.footer,
    this.semanticLabel,
  });

  final List<FlowSidebarGroup> groups;
  final String selectedKey;
  final ValueChanged<String> onItemSelected;
  final bool expanded;
  final VoidCallback? onToggle;
  final Widget? header;
  final Widget? footer;
  final String? semanticLabel;

  @override
  State<FlowSidebar> createState() => _FlowSidebarState();
}

class _FlowSidebarState extends State<FlowSidebar>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _widthAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
      value: widget.expanded ? 1.0 : 0.0,
    );
    _widthAnimation = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    );
  }

  @override
  void didUpdateWidget(FlowSidebar oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.expanded != oldWidget.expanded) {
      widget.expanded ? _controller.forward() : _controller.reverse();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.sidebar;

    return AnimatedBuilder(
      animation: _widthAnimation,
      builder: (context, child) {
        final width = t.widthCollapsed +
            (t.widthExpanded - t.widthCollapsed) * _widthAnimation.value;

        return Semantics(
          label: widget.semanticLabel ?? 'Navigation sidebar',
          container: true,
          child: DecoratedBox(
            decoration: BoxDecoration(
              color: t.bg,
              border: Border(right: BorderSide(color: t.border, width: 1)),
              boxShadow: t.shadow,
            ),
            child: SizedBox(
              width: width,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Header area
                  if (widget.header != null)
                    SizedBox(height: t.headerHeight, child: widget.header),
                  // Nav groups
                  Expanded(
                    child: Padding(
                      padding: EdgeInsets.all(t.padding),
                      child: ListView(
                        children: widget.groups.map((group) {
                          return _SidebarGroupWidget(
                            group: group,
                            tokens: t,
                            isExpanded: widget.expanded,
                            selectedKey: widget.selectedKey,
                            onItemSelected: widget.onItemSelected,
                          );
                        }).toList(),
                      ),
                    ),
                  ),
                  // Toggle button
                  if (widget.onToggle != null)
                    _ToggleButton(
                      isExpanded: widget.expanded,
                      tokens: t,
                      onTap: widget.onToggle!,
                    ),
                  // Footer
                  if (widget.footer != null) widget.footer!,
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

class _SidebarGroupWidget extends StatelessWidget {
  const _SidebarGroupWidget({
    required this.group,
    required this.tokens,
    required this.isExpanded,
    required this.selectedKey,
    required this.onItemSelected,
  });

  final FlowSidebarGroup group;
  final FlowCompSidebar tokens;
  final bool isExpanded;
  final String selectedKey;
  final ValueChanged<String> onItemSelected;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(height: tokens.groupMarginTop),
        if (isExpanded)
          Padding(
            padding: EdgeInsets.symmetric(horizontal: tokens.itemPaddingX),
            child: FlowText(
              group.label.toUpperCase(),
              role: FlowTextRole.overline,
              color: FlowTextColor.tertiary,
            ),
          ),
        SizedBox(height: tokens.itemPaddingY),
        ...group.items.map((item) {
          final isActive = item.key == selectedKey;
          return _SidebarItemWidget(
            item: item,
            isActive: isActive,
            isExpanded: isExpanded,
            tokens: tokens,
            onTap: () => onItemSelected(item.key),
          );
        }),
      ],
    );
  }
}

class _SidebarItemWidget extends StatelessWidget {
  const _SidebarItemWidget({
    required this.item,
    required this.isActive,
    required this.isExpanded,
    required this.tokens,
    required this.onTap,
  });

  final FlowSidebarItem item;
  final bool isActive;
  final bool isExpanded;
  final FlowCompSidebar tokens;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final bgColor = isActive ? tokens.itemBgActive : tokens.itemBg;
    final textColor = isActive ? tokens.itemTextActive : tokens.itemText;

    return Semantics(
      label: item.label,
      selected: isActive,
      button: true,
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          decoration: BoxDecoration(
            color: bgColor,
            borderRadius: BorderRadius.circular(tokens.itemRadius),
          ),
          padding: EdgeInsets.symmetric(
            horizontal: tokens.itemPaddingX,
            vertical: tokens.itemPaddingY,
          ),
          child: Row(
            children: [
              FlowIcon(item.icon, size: FlowIconSize.sm, iconColor: textColor),
              if (isExpanded) ...[
                SizedBox(width: tokens.itemPaddingX),
                Expanded(
                  child: Text(
                    item.label,
                    style: TextStyle(
                      color: textColor,
                      fontSize: tokens.itemFont,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                if (item.badge != null)
                  Text(
                    item.badge!,
                    style: TextStyle(
                      color: tokens.itemText,
                      fontSize: tokens.groupLabelFont,
                    ),
                  ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

class _ToggleButton extends StatelessWidget {
  const _ToggleButton({
    required this.isExpanded,
    required this.tokens,
    required this.onTap,
  });

  final bool isExpanded;
  final FlowCompSidebar tokens;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(tokens.padding),
      child: Semantics(
        label: isExpanded ? 'Collapse sidebar' : 'Expand sidebar',
        button: true,
        child: GestureDetector(
          onTap: onTap,
          child: Container(
            width: tokens.toggleSize,
            height: tokens.toggleSize,
            decoration: BoxDecoration(
              color: tokens.toggleBg,
              border: Border.fromBorderSide(
                BorderSide(color: tokens.toggleBorder, width: 1),
              ),
              borderRadius: BorderRadius.circular(tokens.itemRadius),
            ),
            alignment: Alignment.center,
            child: FlowIcon(
              isExpanded ? Icons.chevron_left : Icons.chevron_right,
              size: FlowIconSize.sm,
              iconColor: tokens.toggleIcon,
            ),
          ),
        ),
      ),
    );
  }
}
