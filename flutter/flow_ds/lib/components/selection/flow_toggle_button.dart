/// FLOW Design System — FlowToggleButton + FlowToggleButtonGroup (L3 Component)
///
/// Pressable toggle button with optional icon and controlled state.
/// Mirrors React's FlowToggleButton + FlowToggleButtonGroup.
import 'package:flutter/material.dart';

import '../../tokens/comp_tokens.dart';
import '../../tokens/density.dart';
import '../../primitives/icon.dart';
import '../../theme/flow_size_provider.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowToggleButton
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowToggleButton extends StatefulWidget {
  const FlowToggleButton({
    super.key,
    required this.child,
    this.pressed = false,
    this.onChanged,
    this.icon,
    this.size,
    this.disabled = false,
    this.semanticLabel,
  });

  final Widget child;
  final bool pressed;
  final ValueChanged<bool>? onChanged;
  final IconData? icon;
  final FlowComponentSize? size;
  final bool disabled;
  final String? semanticLabel;

  @override
  State<FlowToggleButton> createState() => _FlowToggleButtonState();
}

class _FlowToggleButtonState extends State<FlowToggleButton> {
  bool _hovered = false;

  double _heightForSize(FlowCompToggleButton t, FlowComponentSize s) {
    switch (s) {
      case FlowComponentSize.sm:
        return t.heightSm;
      case FlowComponentSize.md:
        return t.heightMd;
      case FlowComponentSize.lg:
        return t.heightLg;
      case FlowComponentSize.xl:
        return t.heightXl;
    }
  }

  double _fontForSize(FlowCompToggleButton t, FlowComponentSize s) {
    switch (s) {
      case FlowComponentSize.sm:
        return t.fontSm;
      case FlowComponentSize.md:
        return t.fontMd;
      case FlowComponentSize.lg:
        return t.fontLg;
      case FlowComponentSize.xl:
        return t.fontXl;
    }
  }

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.toggleButton;
    final resolvedSize = widget.size ?? FlowSizeProvider.of(context);
    final height = _heightForSize(t, resolvedSize);
    final fontSize = _fontForSize(t, resolvedSize);

    final bg = widget.disabled
        ? t.bgDisabled
        : widget.pressed
            ? (_hovered ? t.bgOnHover : t.bgOn)
            : (_hovered ? t.bgOffHover : t.bgOff);
    final textColor = widget.disabled
        ? t.textDisabled
        : widget.pressed
            ? t.textOn
            : t.textOff;
    final borderColor = widget.disabled
        ? t.borderDisabled
        : widget.pressed
            ? t.borderOn
            : t.border;

    final iconSize = resolvedSize == FlowComponentSize.sm
        ? FlowIconSize.sm
        : resolvedSize == FlowComponentSize.xl
            ? FlowIconSize.lg
            : FlowIconSize.md;

    return Semantics(
      toggled: widget.pressed,
      enabled: !widget.disabled,
      label: widget.semanticLabel,
      child: MouseRegion(
        onEnter: (_) => setState(() => _hovered = true),
        onExit: (_) => setState(() => _hovered = false),
        child: GestureDetector(
          onTap: widget.disabled
              ? null
              : () => widget.onChanged?.call(!widget.pressed),
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 150),
            height: height,
            padding: EdgeInsets.symmetric(horizontal: t.paddingX),
            decoration: BoxDecoration(
              color: bg,
              borderRadius: BorderRadius.circular(t.radius),
              border: Border.all(color: borderColor, width: t.borderWidth),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (widget.icon != null) ...[
                  FlowIcon(widget.icon!, size: iconSize, iconColor: textColor),
                  SizedBox(width: t.gap),
                ],
                DefaultTextStyle(
                  style: TextStyle(
                    fontSize: fontSize,
                    color: textColor,
                    fontWeight: FontWeight.w500,
                  ),
                  child: widget.child,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowToggleButtonGroup
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowToggleButtonGroup extends StatelessWidget {
  const FlowToggleButtonGroup({
    super.key,
    required this.children,
    this.semanticLabel = 'Toggle group',
  });

  final List<Widget> children;
  final String semanticLabel;

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.toggleButton;

    return Semantics(
      label: semanticLabel,
      container: true,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(t.groupRadius),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: List.generate(children.length, (i) {
            return Padding(
              padding: EdgeInsets.only(
                left: i > 0 ? t.groupGap : 0,
              ),
              child: children[i],
            );
          }),
        ),
      ),
    );
  }
}
