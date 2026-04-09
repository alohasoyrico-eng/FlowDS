/// FLOW Design System — FlowChip (L3 Component)
/// ─────────────────────────────────────────────
/// Pill-shaped label/filter: 4 sizes, selected state, removable, leading icon.
/// Consumes comp.chip tokens via FlowCompTokens.
import 'package:flutter/material.dart';

import '../../primitives/icon.dart';
import '../../primitives/text.dart';
import '../../tokens/comp_tokens.dart';

/// Chip size tier.
enum FlowChipSize { sm, md, lg, xl }

class FlowChip extends StatelessWidget {
  const FlowChip({
    super.key,
    required this.label,
    this.size = FlowChipSize.md,
    this.selected = false,
    this.disabled = false,
    this.removable = false,
    this.leadingIcon,
    this.onTap,
    this.onRemove,
    this.semanticLabel,
  });

  final String label;
  final FlowChipSize size;
  final bool selected;
  final bool disabled;
  final bool removable;
  final IconData? leadingIcon;
  final VoidCallback? onTap;
  final VoidCallback? onRemove;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).extension<FlowCompTokens>()!.chip;

    final bgColor = selected ? t.bgSelected : t.bg;
    final textColor = selected ? t.textSelected : t.text;
    final double fontSize = _fontSize(t);

    final children = <Widget>[];

    if (leadingIcon != null) {
      children.add(
          FlowIcon(leadingIcon!, size: FlowIconSize.xs, iconColor: textColor));
      children.add(SizedBox(width: t.gap));
    }

    children.add(
      FlowText(label, role: FlowTextRole.caption, color: FlowTextColor.primary),
    );

    if (removable && !disabled) {
      children.add(SizedBox(width: t.gap));
      children.add(
        GestureDetector(
          onTap: onRemove,
          child: FlowIcon(Icons.close,
              size: FlowIconSize.xs, iconColor: textColor),
        ),
      );
    }

    Widget chip = AnimatedContainer(
      duration: const Duration(milliseconds: 150),
      padding:
          EdgeInsets.symmetric(horizontal: t.paddingX, vertical: t.paddingY),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(t.radius),
      ),
      child: DefaultTextStyle(
        style: TextStyle(fontSize: fontSize, color: textColor),
        child: Row(mainAxisSize: MainAxisSize.min, children: children),
      ),
    );

    if (disabled) {
      chip = Opacity(opacity: 0.5, child: chip);
    } else if (onTap != null) {
      chip = GestureDetector(onTap: onTap, child: chip);
    }

    return Semantics(
      label: semanticLabel ?? label,
      button: onTap != null,
      selected: selected,
      enabled: !disabled,
      child: chip,
    );
  }

  double _fontSize(FlowCompChip t) => switch (size) {
        FlowChipSize.sm => t.fontSm,
        FlowChipSize.md => t.fontMd,
        FlowChipSize.lg => t.fontLg,
        FlowChipSize.xl => t.fontXl,
      };
}
