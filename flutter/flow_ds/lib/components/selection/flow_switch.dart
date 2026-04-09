/// FLOW Design System — FlowSwitch (L3 Component)
///
/// Toggle switch control with sliding thumb and optional label.
/// Mirrors React's FlowSwitch.
import 'package:flutter/material.dart';

import '../../tokens/comp_tokens.dart';
import '../../primitives/text.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSwitch
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowSwitch extends StatefulWidget {
  const FlowSwitch({
    super.key,
    this.value = false,
    this.onChanged,
    this.label,
    this.labelPosition = FlowSwitchLabelPosition.end,
    this.disabled = false,
    this.error = false,
    this.semanticLabel,
  });

  final bool value;
  final ValueChanged<bool>? onChanged;
  final String? label;
  final FlowSwitchLabelPosition labelPosition;
  final bool disabled;
  final bool error;
  final String? semanticLabel;

  @override
  State<FlowSwitch> createState() => _FlowSwitchState();
}

enum FlowSwitchLabelPosition { start, end }

class _FlowSwitchState extends State<FlowSwitch>
    with SingleTickerProviderStateMixin {
  bool _hovered = false;
  late final AnimationController _anim;
  late final Animation<double> _position;

  @override
  void initState() {
    super.initState();
    _anim = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
      value: widget.value ? 1.0 : 0.0,
    );
    _position = CurvedAnimation(parent: _anim, curve: Curves.easeInOut);
  }

  @override
  void didUpdateWidget(FlowSwitch old) {
    super.didUpdateWidget(old);
    widget.value ? _anim.forward() : _anim.reverse();
  }

  @override
  void dispose() {
    _anim.dispose();
    super.dispose();
  }

  void _handleTap() {
    if (widget.disabled) return;
    widget.onChanged?.call(!widget.value);
  }

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.switchControl;

    final trackColor = widget.disabled
        ? t.trackDisabled
        : widget.value
            ? (_hovered ? t.trackOnHover : t.trackOn)
            : (_hovered ? t.trackOffHover : t.trackOff);
    final thumbColor = widget.disabled
        ? t.thumbDisabled
        : widget.value
            ? t.thumbOn
            : t.thumbOff;
    final iconColor = widget.disabled
        ? t.thumbIconDisabled
        : widget.value
            ? t.thumbIconOn
            : t.thumbIconOff;

    final switchWidget = MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: GestureDetector(
        onTap: _handleTap,
        child: Semantics(
          toggled: widget.value,
          enabled: !widget.disabled,
          label: widget.semanticLabel ?? widget.label,
          child: AnimatedBuilder(
            animation: _position,
            builder: (context, _) {
              final travel = t.trackWidth - t.thumbInset * 2 - t.thumbSize;
              final thumbLeft = t.thumbInset + _position.value * travel;

              return Container(
                width: t.trackWidth,
                height: t.trackHeight,
                decoration: BoxDecoration(
                  color: trackColor,
                  borderRadius: BorderRadius.circular(t.trackRadius),
                ),
                child: Stack(
                  children: [
                    Positioned(
                      left: thumbLeft,
                      top: (t.trackHeight - t.thumbSize) / 2,
                      child: Container(
                        width: t.thumbSize,
                        height: t.thumbSize,
                        decoration: BoxDecoration(
                          color: thumbColor,
                          shape: BoxShape.circle,
                          boxShadow: t.thumbShadow,
                        ),
                        child: Icon(
                          widget.value ? Icons.check : Icons.close,
                          size: t.thumbSize * 0.6,
                          color: iconColor,
                        ),
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ),
    );

    if (widget.label == null) return switchWidget;

    final labelWidget = GestureDetector(
      onTap: widget.disabled ? null : _handleTap,
      child: FlowText(
        widget.label!,
        role: FlowTextRole.labelM,
        color: widget.disabled ? FlowTextColor.disabled : null,
      ),
    );

    final children = widget.labelPosition == FlowSwitchLabelPosition.start
        ? [labelWidget, const SizedBox(width: 8), switchWidget]
        : [switchWidget, const SizedBox(width: 8), labelWidget];

    return Row(mainAxisSize: MainAxisSize.min, children: children);
  }
}
