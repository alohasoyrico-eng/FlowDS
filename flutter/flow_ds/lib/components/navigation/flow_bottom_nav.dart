/// FLOW Design System — FlowBottomNav (Navigation)
/// ────────────────────────────────────────────────
/// Mobile bottom navigation bar with icon + label items and optional badge.
/// Uses comp.bottomNav tokens.
import 'package:flutter/material.dart';

import '../../primitives/icon.dart';
import '../../primitives/text.dart';
import '../../tokens/comp_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Navigation item model
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowBottomNavItem {
  const FlowBottomNavItem({
    required this.icon,
    required this.label,
    this.badge,
    this.showDot = false,
  });

  final IconData icon;
  final String label;

  /// Badge count. When > 0, displays count badge.
  final int? badge;

  /// Show dot-only badge (no count).
  final bool showDot;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowBottomNav
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowBottomNav extends StatelessWidget {
  const FlowBottomNav({
    super.key,
    required this.items,
    required this.selectedIndex,
    required this.onChanged,
    this.semanticLabel,
  });

  final List<FlowBottomNavItem> items;
  final int selectedIndex;
  final ValueChanged<int> onChanged;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.bottomNav;

    Widget bar = DecoratedBox(
      decoration: BoxDecoration(
        color: t.bg,
        border: Border(top: BorderSide(color: t.border, width: 1)),
        boxShadow: t.shadow,
      ),
      child: SizedBox(
        height: t.height,
        child: Row(
          children: List.generate(items.length, (i) {
            final item = items[i];
            final isActive = i == selectedIndex;
            return Expanded(
              child: _BottomNavItemWidget(
                item: item,
                isActive: isActive,
                tokens: t,
                onTap: () => onChanged(i),
              ),
            );
          }),
        ),
      ),
    );

    if (semanticLabel != null) {
      bar = Semantics(label: semanticLabel, container: true, child: bar);
    }

    return bar;
  }
}

class _BottomNavItemWidget extends StatelessWidget {
  const _BottomNavItemWidget({
    required this.item,
    required this.isActive,
    required this.tokens,
    required this.onTap,
  });

  final FlowBottomNavItem item;
  final bool isActive;
  final FlowCompBottomNav tokens;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final iconColor = isActive ? tokens.iconActive : tokens.iconDefault;

    return Semantics(
      label: item.label,
      selected: isActive,
      button: true,
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: onTap,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Stack(
              clipBehavior: Clip.none,
              children: [
                FlowIcon(item.icon, iconColor: iconColor),
                if (item.badge != null && item.badge! > 0)
                  Positioned(
                    top: -tokens.badgeSize / 2,
                    right: -tokens.badgeSize / 2,
                    child: _Badge(
                      count: item.badge!,
                      tokens: tokens,
                    ),
                  ),
                if (item.showDot && (item.badge == null || item.badge == 0))
                  Positioned(
                    top: -tokens.badgeDotSize / 3,
                    right: -tokens.badgeDotSize / 3,
                    child: Container(
                      width: tokens.badgeDotSize,
                      height: tokens.badgeDotSize,
                      decoration: BoxDecoration(
                        color: tokens.badgeBg,
                        shape: BoxShape.circle,
                      ),
                    ),
                  ),
              ],
            ),
            SizedBox(height: tokens.itemGap),
            FlowText(
              item.label,
              role: FlowTextRole.labelXs,
              color: isActive ? FlowTextColor.accent : FlowTextColor.tertiary,
            ),
          ],
        ),
      ),
    );
  }
}

class _Badge extends StatelessWidget {
  const _Badge({required this.count, required this.tokens});

  final int count;
  final FlowCompBottomNav tokens;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: tokens.badgeSize,
      constraints: BoxConstraints(minWidth: tokens.badgeSize),
      padding: const EdgeInsets.symmetric(horizontal: 4),
      decoration: BoxDecoration(
        color: tokens.badgeBg,
        borderRadius: BorderRadius.circular(tokens.badgeSize / 2),
      ),
      alignment: Alignment.center,
      child: Text(
        count > 99 ? '99+' : count.toString(),
        style: TextStyle(
          color: tokens.badgeText,
          fontSize: tokens.badgeFont,
          fontWeight: FontWeight.w600,
          height: 1,
        ),
      ),
    );
  }
}
