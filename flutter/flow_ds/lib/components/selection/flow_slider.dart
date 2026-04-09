/// FLOW Design System — FlowSlider (L3 Component)
///
/// Range slider for selecting numeric values with optional label and marks.
/// Mirrors React's FlowSlider.
import 'package:flutter/material.dart';

import '../../tokens/comp_tokens.dart';
import '../../primitives/text.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSlider
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowSlider extends StatefulWidget {
  const FlowSlider({
    super.key,
    this.value = 0,
    this.onChanged,
    this.min = 0,
    this.max = 100,
    this.step = 1,
    this.label,
    this.showValue = true,
    this.formatValue,
    this.showMarks = false,
    this.disabled = false,
    this.semanticLabel,
  });

  final double value;
  final ValueChanged<double>? onChanged;
  final double min;
  final double max;
  final double step;
  final String? label;
  final bool showValue;
  final String Function(double)? formatValue;
  final bool showMarks;
  final bool disabled;
  final String? semanticLabel;

  @override
  State<FlowSlider> createState() => _FlowSliderState();
}

class _FlowSliderState extends State<FlowSlider> {
  bool _hovered = false;

  double get _percentage =>
      ((widget.value - widget.min) / (widget.max - widget.min)).clamp(0.0, 1.0);

  String get _displayValue =>
      widget.formatValue?.call(widget.value) ?? widget.value.toStringAsFixed(0);

  void _updateFromPosition(Offset localPosition, double trackWidth) {
    if (widget.disabled) return;
    final ratio = (localPosition.dx / trackWidth).clamp(0.0, 1.0);
    final rawValue = widget.min + ratio * (widget.max - widget.min);
    final stepped = (rawValue / widget.step).round() * widget.step;
    final clamped = stepped.clamp(widget.min, widget.max);
    widget.onChanged?.call(clamped);
  }

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.slider;

    final trackFill = widget.disabled
        ? t.trackDisabled
        : _hovered
            ? t.trackFillHover
            : t.trackFill;
    final thumbBorderColor = widget.disabled
        ? t.thumbBorderDisabled
        : _hovered
            ? t.thumbBorderHover
            : t.thumbBorder;

    return Semantics(
      label: widget.semanticLabel ?? widget.label,
      slider: true,
      value: _displayValue,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Header: label + value
          if (widget.label != null || widget.showValue)
            Padding(
              padding: EdgeInsets.only(bottom: t.trackHeight),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  if (widget.label != null)
                    FlowText(widget.label!,
                        role: FlowTextRole.labelM,
                        color: FlowTextColor.secondary),
                  if (widget.showValue)
                    FlowText(_displayValue, role: FlowTextRole.labelS),
                ],
              ),
            ),

          // Track + thumb
          MouseRegion(
            onEnter: (_) => setState(() => _hovered = true),
            onExit: (_) => setState(() => _hovered = false),
            child: LayoutBuilder(
              builder: (context, constraints) {
                final trackWidth = constraints.maxWidth;

                return GestureDetector(
                  onHorizontalDragStart: (d) {
                    _updateFromPosition(d.localPosition, trackWidth);
                  },
                  onHorizontalDragUpdate: (d) {
                    _updateFromPosition(d.localPosition, trackWidth);
                  },
                  onHorizontalDragEnd: (_) {},
                  onTapDown: (d) {
                    _updateFromPosition(d.localPosition, trackWidth);
                  },
                  behavior: HitTestBehavior.opaque,
                  child: SizedBox(
                    height: t.focusRingSize,
                    child: Stack(
                      alignment: Alignment.centerLeft,
                      children: [
                        // Background track
                        Container(
                          height: t.trackHeight,
                          decoration: BoxDecoration(
                            color: t.trackBg,
                            borderRadius: BorderRadius.circular(t.trackRadius),
                          ),
                        ),
                        // Fill track
                        FractionallySizedBox(
                          widthFactor: _percentage,
                          child: Container(
                            height: t.trackHeight,
                            decoration: BoxDecoration(
                              color: trackFill,
                              borderRadius:
                                  BorderRadius.circular(t.trackRadius),
                            ),
                          ),
                        ),
                        // Thumb
                        Positioned(
                          left: _percentage * (trackWidth - t.thumbSize),
                          child: Container(
                            width: t.thumbSize,
                            height: t.thumbSize,
                            decoration: BoxDecoration(
                              color: t.thumbBg,
                              shape: BoxShape.circle,
                              border: Border.all(
                                color: thumbBorderColor,
                                width: t.thumbBorderWidth,
                              ),
                              boxShadow: t.thumbShadow,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),

          // Marks: min / max
          if (widget.showMarks)
            Padding(
              padding: EdgeInsets.only(top: t.trackHeight),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  FlowText(
                    widget.formatValue?.call(widget.min) ??
                        widget.min.toStringAsFixed(0),
                    role: FlowTextRole.caption,
                    color: FlowTextColor.secondary,
                  ),
                  FlowText(
                    widget.formatValue?.call(widget.max) ??
                        widget.max.toStringAsFixed(0),
                    role: FlowTextRole.caption,
                    color: FlowTextColor.secondary,
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }
}
