/// FLOW Design System — FlowColorPicker (L4 Pattern)
/// HSL/hex color selection with sliders and preset swatches.
/// Composes FlowTextInput, FlowSlider (L3).
/// Source: FlowColorPicker.tsx
import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../components/inputs/flow_text_input.dart';
import '../components/selection/flow_slider.dart';
import '../primitives/text.dart';
import '../theme/flow_size_provider.dart';
import '../tokens/density.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

const _defaultSwatches = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#6b7280',
  '#000000',
];

/// HSL/hex color picker with sliders and preset swatches.
class FlowColorPicker extends StatefulWidget {
  const FlowColorPicker({
    super.key,
    this.value,
    this.initialValue = '#3b82f6',
    this.onChanged,
    this.swatches = _defaultSwatches,
    this.label,
    this.size,
    this.disabled = false,
    this.semanticLabel,
  });

  final String? value;
  final String initialValue;
  final ValueChanged<String>? onChanged;
  final List<String> swatches;
  final String? label;
  final FlowComponentSize? size;
  final bool disabled;
  final String? semanticLabel;

  @override
  State<FlowColorPicker> createState() => _FlowColorPickerState();
}

class _FlowColorPickerState extends State<FlowColorPicker> {
  late String _internal;
  late TextEditingController _hexCtrl;
  final FocusNode _hexFocus = FocusNode();

  bool get _isControlled => widget.value != null;
  String get _color => _isControlled ? widget.value! : _internal;

  @override
  void initState() {
    super.initState();
    _internal = widget.initialValue;
    _hexCtrl = TextEditingController(text: _color);
    _hexFocus.addListener(() {
      if (!_hexFocus.hasFocus) _commitHex();
    });
  }

  @override
  void didUpdateWidget(FlowColorPicker old) {
    super.didUpdateWidget(old);
    if (_isControlled && widget.value != _hexCtrl.text) {
      _hexCtrl.text = widget.value!;
    }
  }

  @override
  void dispose() {
    _hexCtrl.dispose();
    _hexFocus.dispose();
    super.dispose();
  }

  void _set(String c) {
    if (!_isControlled) setState(() => _internal = c);
    _hexCtrl.text = c;
    widget.onChanged?.call(c);
  }

  void _commitHex() {
    var clean = _hexCtrl.text;
    if (!clean.startsWith('#')) clean = '#$clean';
    if (RegExp(r'^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$').hasMatch(clean)) {
      _set(clean.toLowerCase());
    } else {
      _hexCtrl.text = _color;
    }
  }

  // ── Color conversion ──

  static List<int> _hexToHsl(String hex) {
    final h = hex.replaceAll('#', '');
    double r, g, b;
    if (h.length == 3) {
      r = int.parse('${h[0]}${h[0]}', radix: 16) / 255;
      g = int.parse('${h[1]}${h[1]}', radix: 16) / 255;
      b = int.parse('${h[2]}${h[2]}', radix: 16) / 255;
    } else {
      r = int.parse(h.substring(0, 2), radix: 16) / 255;
      g = int.parse(h.substring(2, 4), radix: 16) / 255;
      b = int.parse(h.substring(4, 6), radix: 16) / 255;
    }
    final mx = math.max(r, math.max(g, b));
    final mn = math.min(r, math.min(g, b));
    double hue = 0, sat = 0;
    final l = (mx + mn) / 2;
    if (mx != mn) {
      final d = mx - mn;
      sat = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
      if (mx == r)
        hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (mx == g)
        hue = ((b - r) / d + 2) / 6;
      else
        hue = ((r - g) / d + 4) / 6;
    }
    return [(hue * 360).round(), (sat * 100).round(), (l * 100).round()];
  }

  static String _hslToHex(int h, int s, int l) {
    final sN = s / 100, lN = l / 100;
    final a = sN * math.min(lN, 1 - lN);
    String f(int n) {
      final k = (n + h / 30) % 12;
      final color =
          lN - a * math.max(math.min(k - 3, math.min(9 - k, 1.0)), -1.0);
      return (255 * color).round().toRadixString(16).padLeft(2, '0');
    }

    return '#${f(0)}${f(8)}${f(4)}';
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final sz = widget.size ?? FlowSizeProvider.of(context);
    final hsl = _hexToHsl(_color);
    final hue = hsl[0], sat = hsl[1], light = hsl[2];
    final swatchDim = sz == FlowComponentSize.sm
        ? 20.0
        : sz == FlowComponentSize.lg
            ? 32.0
            : 26.0;

    Color? parseHex(String hex) {
      final h = hex.replaceAll('#', '');
      if (h.length == 6) return Color(int.parse('FF$h', radix: 16));
      if (h.length == 3)
        return Color(int.parse('FF${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}',
            radix: 16));
      return null;
    }

    return Semantics(
      label: widget.semanticLabel ?? widget.label ?? 'Color picker',
      child: Opacity(
        opacity: widget.disabled ? 0.5 : 1.0,
        child: AbsorbPointer(
          absorbing: widget.disabled,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisSize: MainAxisSize.min,
            children: [
              if (widget.label != null)
                Padding(
                  padding: const EdgeInsets.only(bottom: FlowRefFrame.space2),
                  child: FlowText(widget.label!,
                      role: FlowTextRole.paragraphS,
                      color: FlowTextColor.secondary),
                ),
              // Preview + hex input
              Row(
                children: [
                  Container(
                    width: FlowRefFrame.space10,
                    height: FlowRefFrame.space10,
                    decoration: BoxDecoration(
                      color: parseHex(_color),
                      borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
                      border: Border.all(color: sys.borderSubtle),
                    ),
                  ),
                  SizedBox(width: FlowRefFrame.space3),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        FlowTextInput(
                          controller: _hexCtrl,
                          focusNode: _hexFocus,
                          size: sz,
                          semanticLabel: 'Hex color value',
                          onChanged: (_) {},
                        ),
                        SizedBox(height: FlowRefFrame.space1),
                        FlowText(
                          'HSL: $hue, $sat%, $light%',
                          role: FlowTextRole.caption,
                          color: FlowTextColor.secondary,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              SizedBox(height: FlowRefFrame.space3),
              // Hue slider
              FlowSlider(
                label: 'Hue',
                min: 0,
                max: 360,
                value: hue.toDouble(),
                onChanged: (v) => _set(_hslToHex(v.round(), sat, light)),
                disabled: widget.disabled,
                semanticLabel: 'Hue',
              ),
              SizedBox(height: FlowRefFrame.space2),
              // Saturation slider
              FlowSlider(
                label: 'Saturation',
                min: 0,
                max: 100,
                value: sat.toDouble(),
                onChanged: (v) => _set(_hslToHex(hue, v.round(), light)),
                disabled: widget.disabled,
                semanticLabel: 'Saturation',
              ),
              SizedBox(height: FlowRefFrame.space2),
              // Lightness slider
              FlowSlider(
                label: 'Lightness',
                min: 0,
                max: 100,
                value: light.toDouble(),
                onChanged: (v) => _set(_hslToHex(hue, sat, v.round())),
                disabled: widget.disabled,
                semanticLabel: 'Lightness',
              ),
              // Swatches
              if (widget.swatches.isNotEmpty) ...[
                SizedBox(height: FlowRefFrame.space3),
                Wrap(
                  spacing: FlowRefFrame.space2,
                  runSpacing: FlowRefFrame.space2,
                  children: widget.swatches.map((sw) {
                    final isSelected = _color == sw;
                    return Semantics(
                      label: 'Select color $sw',
                      selected: isSelected,
                      child: GestureDetector(
                        onTap: () => _set(sw),
                        child: Container(
                          width: swatchDim,
                          height: swatchDim,
                          decoration: BoxDecoration(
                            color: parseHex(sw),
                            borderRadius:
                                BorderRadius.circular(FlowRefFrame.radius1),
                            border: isSelected
                                ? Border.all(color: sys.borderFocus, width: 2)
                                : Border.all(color: sys.borderSubtle),
                          ),
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
