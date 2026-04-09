/// FLOW Design System — FlowTabs (Navigation)
/// ────────────────────────────────────────────
/// Underline + filled tab bar variants across 4 sizes (sm/md/lg/xl).
/// Uses comp.tabs tokens.
import 'package:flutter/material.dart';

import '../../primitives/text.dart';
import '../../tokens/comp_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Enums
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

enum FlowTabVariant { underline, filled }

enum FlowTabSize { sm, md, lg, xl }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Tab item model
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowTabItem {
  const FlowTabItem({
    required this.label,
    this.icon,
    this.disabled = false,
  });

  final String label;
  final IconData? icon;
  final bool disabled;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowTabs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowTabs extends StatelessWidget {
  const FlowTabs({
    super.key,
    required this.items,
    required this.selectedIndex,
    required this.onChanged,
    this.variant = FlowTabVariant.underline,
    this.size = FlowTabSize.md,
    this.semanticLabel,
  });

  final List<FlowTabItem> items;
  final int selectedIndex;
  final ValueChanged<int> onChanged;
  final FlowTabVariant variant;
  final FlowTabSize size;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.tabs;

    final height = _resolveHeight(t);
    final fontSize = _resolveFontSize(t);
    final paddingX = _resolvePaddingX(t);

    Widget tabBar = DecoratedBox(
      decoration: BoxDecoration(
        color: variant == FlowTabVariant.filled ? t.filledBg : t.bg,
        borderRadius: variant == FlowTabVariant.filled
            ? BorderRadius.circular(t.filledRadius)
            : null,
        border: variant == FlowTabVariant.underline
            ? Border(
                bottom: BorderSide(
                    color: t.borderDefault, width: t.indicatorHeight))
            : null,
      ),
      child: Row(
        children: List.generate(items.length, (i) {
          final item = items[i];
          final isActive = i == selectedIndex;
          final isDisabled = item.disabled;

          return Expanded(
            child: Semantics(
              label: item.label,
              selected: isActive,
              enabled: !isDisabled,
              button: true,
              child: GestureDetector(
                onTap: isDisabled ? null : () => onChanged(i),
                child: _buildTab(
                  item: item,
                  isActive: isActive,
                  isDisabled: isDisabled,
                  tokens: t,
                  height: height,
                  fontSize: fontSize,
                  paddingX: paddingX,
                ),
              ),
            ),
          );
        }),
      ),
    );

    if (semanticLabel != null) {
      tabBar = Semantics(label: semanticLabel, container: true, child: tabBar);
    }

    return tabBar;
  }

  Widget _buildTab({
    required FlowTabItem item,
    required bool isActive,
    required bool isDisabled,
    required FlowCompTabs tokens,
    required double height,
    required double fontSize,
    required double paddingX,
  }) {
    final textColor = isDisabled
        ? tokens.textDefault.withValues(alpha: 0.4)
        : isActive
            ? tokens.textActive
            : tokens.textDefault;

    Widget content = SizedBox(
      height: height,
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: paddingX),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          mainAxisSize: MainAxisSize.min,
          children: [
            if (item.icon != null) ...[
              Icon(item.icon, size: fontSize + 2, color: textColor),
              SizedBox(width: tokens.gap > 0 ? tokens.gap : 4),
            ],
            FlowText(
              item.label,
              role: FlowTextRole.labelM,
              color: isActive ? FlowTextColor.accent : FlowTextColor.secondary,
            ),
          ],
        ),
      ),
    );

    if (variant == FlowTabVariant.underline) {
      content = DecoratedBox(
        decoration: BoxDecoration(
          border: isActive
              ? Border(
                  bottom: BorderSide(
                    color: tokens.indicator,
                    width: tokens.indicatorHeight,
                  ),
                )
              : null,
        ),
        child: content,
      );
    } else {
      // Filled variant
      content = Container(
        decoration: BoxDecoration(
          color: isActive ? tokens.filledActiveBg : null,
          borderRadius: BorderRadius.circular(tokens.filledRadius),
          boxShadow: isActive ? tokens.filledActiveShadow : null,
        ),
        child: content,
      );
    }

    return Center(child: content);
  }

  double _resolveHeight(FlowCompTabs t) {
    switch (size) {
      case FlowTabSize.sm:
        return t.heightSm;
      case FlowTabSize.md:
        return t.heightMd;
      case FlowTabSize.lg:
        return t.heightLg;
      case FlowTabSize.xl:
        return t.heightXl;
    }
  }

  double _resolveFontSize(FlowCompTabs t) {
    switch (size) {
      case FlowTabSize.sm:
        return t.fontSm;
      case FlowTabSize.md:
        return t.fontMd;
      case FlowTabSize.lg:
        return t.fontLg;
      case FlowTabSize.xl:
        return t.fontXl;
    }
  }

  double _resolvePaddingX(FlowCompTabs t) {
    switch (size) {
      case FlowTabSize.sm:
        return t.paddingXSm;
      case FlowTabSize.md:
        return t.paddingXMd;
      case FlowTabSize.lg:
        return t.paddingXLg;
      case FlowTabSize.xl:
        return t.paddingXXl;
    }
  }
}
