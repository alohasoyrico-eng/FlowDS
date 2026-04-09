/// FLOW Design System — FlowRadio + FlowRadioGroup (L3 Component)
///
/// Single radio selection control with label and validation states.
/// Mirrors React's FlowRadioButton + FlowRadioGroup.
import 'package:flutter/material.dart';

import '../../tokens/comp_tokens.dart';
import '../../tokens/density.dart';
import '../../primitives/text.dart';
import '../../theme/flow_size_provider.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowRadio
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowRadio<T> extends StatefulWidget {
  const FlowRadio({
    super.key,
    required this.value,
    required this.groupValue,
    required this.onChanged,
    this.label,
    this.size,
    this.disabled = false,
    this.error = false,
    this.semanticLabel,
  });

  final T value;
  final T? groupValue;
  final ValueChanged<T>? onChanged;
  final String? label;
  final FlowComponentSize? size;
  final bool disabled;
  final bool error;
  final String? semanticLabel;

  bool get _selected => value == groupValue;

  @override
  State<FlowRadio<T>> createState() => _FlowRadioState<T>();
}

class _FlowRadioState<T> extends State<FlowRadio<T>>
    with SingleTickerProviderStateMixin {
  bool _hovered = false;
  late final AnimationController _anim;

  @override
  void initState() {
    super.initState();
    _anim = AnimationController(
      duration: const Duration(milliseconds: 150),
      vsync: this,
      value: widget._selected ? 1.0 : 0.0,
    );
  }

  @override
  void didUpdateWidget(FlowRadio<T> old) {
    super.didUpdateWidget(old);
    widget._selected ? _anim.forward() : _anim.reverse();
  }

  @override
  void dispose() {
    _anim.dispose();
    super.dispose();
  }

  void _handleTap() {
    if (widget.disabled) return;
    widget.onChanged?.call(widget.value);
  }

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.radio;
    final resolvedSize = widget.size ?? FlowSizeProvider.of(context);

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
                final selected = widget._selected;
                return Container(
                  width: t.size,
                  height: t.size,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: selected ? fillColor : Colors.transparent,
                    border: Border.all(
                      color: selected ? fillColor : borderColor,
                      width: bw,
                    ),
                  ),
                  child: selected
                      ? Center(
                          child: Container(
                            width: t.dotSize,
                            height: t.dotSize,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: t.dotColor,
                            ),
                          ),
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
      selected: widget._selected,
      enabled: !widget.disabled,
      label: widget.semanticLabel ?? widget.label,
      inMutuallyExclusiveGroup: true,
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
// FlowRadioGroup
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowRadioGroup extends StatelessWidget {
  const FlowRadioGroup({
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
    final gap = comp.radio.labelFontSize;

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
