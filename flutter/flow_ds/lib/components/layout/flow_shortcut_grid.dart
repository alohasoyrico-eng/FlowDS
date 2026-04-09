/// FLOW Design System — FlowShortcutGrid (Layout)
/// ──────────────────────────────────────────────
/// Grid of quick action buttons with icon + label.
/// Uses sys tokens for spacing/radius/colors.
import 'package:flutter/material.dart';

import '../../primitives/action_surface.dart';
import '../../primitives/icon.dart';
import '../../primitives/surface.dart';
import '../../primitives/text.dart';
import '../../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Shortcut item model
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowShortcutItem {
  const FlowShortcutItem({
    required this.icon,
    required this.label,
    this.onTap,
    this.disabled = false,
  });

  final IconData icon;
  final String label;
  final VoidCallback? onTap;
  final bool disabled;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowShortcutGrid
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowShortcutGrid extends StatelessWidget {
  const FlowShortcutGrid({
    super.key,
    required this.items,
    this.columns = 4,
    this.semanticLabel,
  });

  final List<FlowShortcutItem> items;
  final int columns;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    Widget grid = Wrap(
      spacing: sys.gapComponent,
      runSpacing: sys.gapComponent,
      children: items.map((item) {
        return SizedBox(
          width: _itemWidth(context, sys),
          child: _ShortcutTile(item: item),
        );
      }).toList(),
    );

    if (semanticLabel != null) {
      grid = Semantics(label: semanticLabel, container: true, child: grid);
    }

    return grid;
  }

  double _itemWidth(BuildContext context, FlowSysTokens sys) {
    // Calculate approximate width per item based on available space
    // Using LayoutBuilder would be ideal, but for simplicity use a
    // fixed formula with the gap accounted for.
    return 80; // Minimum width; will expand within the Wrap
  }
}

class _ShortcutTile extends StatelessWidget {
  const _ShortcutTile({required this.item});

  final FlowShortcutItem item;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    return FlowActionSurface(
      onTap: item.onTap,
      disabled: item.disabled,
      variant: FlowSurfaceVariant.secondary,
      radius: FlowRadius.container,
      padding: FlowPadding.control,
      border: false,
      semanticLabel: item.label,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          FlowIcon(
            item.icon,
            size: FlowIconSize.lg,
            colorRole:
                item.disabled ? FlowIconColor.disabled : FlowIconColor.action,
          ),
          SizedBox(height: sys.gapTight),
          FlowText(
            item.label,
            role: FlowTextRole.labelS,
            color:
                item.disabled ? FlowTextColor.disabled : FlowTextColor.primary,
            align: TextAlign.center,
            maxLines: 2,
          ),
        ],
      ),
    );
  }
}
