/// FLOW Design System — FlowCheckbox + FlowCheckboxGroup (L3 Component)
///
/// Tri-state checkbox control with label, validation, and indeterminate support.
/// Mirrors React's FlowCheckbox + FlowCheckboxGroup.
import 'package:flutter/material.dart';

import '../../tokens/comp_tokens.dart';
import '../../tokens/density.dart';
import '../../primitives/text.dart';
import '../../theme/flow_size_provider.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowCheckbox
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCheckbox extends StatefulWidget {
  const FlowCheckbox({
    super.key,
    this.value = false,
    this.indeterminate = false,
    this.onChanged,
    this.label,
    this.size,
    this.disabled = false,
    this.error = false,
    this.semanticLabel,
  });

  final bool value;
  final bool indeterminate;
  final ValueChanged<bool>? onChanged;
  final String? label;
  final FlowComponentSize? size;
  final bool disabled;
  final bool error;
  final String? semanticLabel;

  @override
  State<FlowCheckbox> createState() => _FlowCheckboxState();
}

class _FlowCheckboxState extends State<FlowCheckbox>
    with SingleTickerProviderStateMixin {
  bool _hovered = false;
  late final AnimationController _anim;

  @override
  void initState() {
    super.initState();
    _anim = AnimationController(
      duration: const Duration(milliseconds: 150),
      vsync: this,
      value: (widget.value || widget.indeterminate) ? 1.0 : 0.0,
    );
  }

  @override
  void didUpdateWidget(FlowCheckbox old) {
    super.didUpdateWidget(old);
    final active = widget.value || widget.indeterminate;
    if (active) {
      _anim.forward();
    } else {
      _anim.reverse();
    }
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
    final t = comp.checkbox;
    final resolvedSize = widget.size ?? FlowSizeProvider.of(context);
    final isActive = widget.value || widget.indeterminate;

    // Resolve colors based on state
    final borderColor = widget.disabled
        ? t.borderDisabled
        : widget.error
            ? t.borderInactivePressed
            : _hovered
                ? t.borderInactivePressed
                : t.borderInactive;
    final fillColor = widget.disabled
        ? t.fillDisabled
        : _hovered
            ? t.fillActivePressed
            : t.fillActive;
    final bw = _hovered ? t.borderWidthHover : t.borderWidth;

    final control = MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: GestureDetector(
        onTap: _handleTap,
        behavior: HitTestBehavior.opaque,
        child: SizedBox(
          width: t.touchTarget,
          height: t.touchTarget,
          child: Center(
            child: AnimatedBuilder(
              animation: _anim,
              builder: (context, _) {
                return Container(
                  width: t.size,
                  height: t.size,
                  decoration: BoxDecoration(
                    color: isActive
                        ? ColorTween(begin: Colors.transparent, end: fillColor)
                            .evaluate(_anim)
                        : Colors.transparent,
                    borderRadius: BorderRadius.circular(t.radius),
                    border: Border.all(
                      color: isActive ? fillColor : borderColor,
                      width: bw,
                    ),
                  ),
                  child: isActive
                      ? Icon(
                          widget.indeterminate ? Icons.remove : Icons.check,
                          size: t.iconSize,
                          color: t.iconColor,
                        )
                      : null,
                );
              },
            ),
          ),
        ),
      ),
    );

    final semanticControl = Semantics(
      checked: widget.value,
      enabled: !widget.disabled,
      label: widget.semanticLabel ?? widget.label,
      child: control,
    );

    if (widget.label == null) return semanticControl;

    return GestureDetector(
      onTap: _handleTap,
      behavior: HitTestBehavior.opaque,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          semanticControl,
          SizedBox(width: resolvedSize == FlowComponentSize.sm ? 4.0 : 8.0),
          FlowText(
            widget.label!,
            role: FlowTextRole.labelM,
            color: widget.disabled ? FlowTextColor.disabled : null,
          ),
        ],
      ),
    );
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowCheckboxGroup
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCheckboxGroup extends StatelessWidget {
  const FlowCheckboxGroup({
    super.key,
    required this.children,
    this.direction = Axis.vertical,
    this.size,
    this.semanticLabel,
  });

  final List<Widget> children;
  final Axis direction;
  final FlowComponentSize? size;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final gap = comp.checkbox.labelFontSize; // proportional gap

    final content = direction == Axis.vertical
        ? Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: _spaced(gap),
          )
        : Wrap(spacing: gap, runSpacing: gap, children: children);

    return Semantics(
      label: semanticLabel,
      container: true,
      child: size != null
          ? FlowSizeProvider(size: size!, child: content)
          : content,
    );
  }

  List<Widget> _spaced(double gap) {
    final result = <Widget>[];
    for (var i = 0; i < children.length; i++) {
      if (i > 0) result.add(SizedBox(height: gap));
      result.add(children[i]);
    }
    return result;
  }
}
