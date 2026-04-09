/// FLOW Design System — FlowOTPInput (L4 Pattern)
/// ─────────────────────────────────────────────────
/// Multi-digit one-time password input with per-character cells,
/// auto-focus advance, paste support, and onComplete callback.
/// Uses comp.textInput tokens for visual properties.
///
/// Source: FlowOTPInput.tsx
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../primitives/text.dart';
import '../../theme/flow_size_provider.dart';
import '../../tokens/comp_tokens.dart';
import '../../tokens/density.dart';

/// OTP size is limited to sm/md/lg (no xl) per the React source.
enum FlowOTPSize { sm, md, lg }

/// A multi-digit one-time password input with per-character cells,
/// auto-advance, backspace navigation, paste support, and completion callback.
class FlowOTPInput extends StatefulWidget {
  const FlowOTPInput({
    super.key,
    this.length = 6,
    this.value,
    this.onChanged,
    this.onComplete,
    this.type = FlowOTPType.numeric,
    this.otpSize,
    this.size,
    this.error = false,
    this.errorMessage,
    this.loading = false,
    this.label,
    this.enabled = true,
    this.autofocus = false,
    this.semanticLabel,
  });

  final int length;
  final String? value;
  final ValueChanged<String>? onChanged;
  final ValueChanged<String>? onComplete;
  final FlowOTPType type;

  /// OTP-specific size. Falls back to [size] or FlowSizeProvider.
  final FlowOTPSize? otpSize;
  final FlowComponentSize? size;
  final bool error;
  final String? errorMessage;
  final bool loading;
  final String? label;
  final bool enabled;
  final bool autofocus;
  final String? semanticLabel;

  @override
  State<FlowOTPInput> createState() => _FlowOTPInputState();
}

enum FlowOTPType { numeric, alphanumeric }

class _FlowOTPInputState extends State<FlowOTPInput> {
  late List<TextEditingController> _controllers;
  late List<FocusNode> _focusNodes;

  @override
  void initState() {
    super.initState();
    _controllers = List.generate(widget.length, (i) {
      final initial = (widget.value != null && i < widget.value!.length)
          ? widget.value![i]
          : '';
      return TextEditingController(text: initial);
    });
    _focusNodes = List.generate(widget.length, (_) => FocusNode());
    if (widget.autofocus) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (_focusNodes.isNotEmpty) _focusNodes[0].requestFocus();
      });
    }
  }

  @override
  void didUpdateWidget(FlowOTPInput oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.value != null && widget.value != _currentValue) {
      for (var i = 0; i < widget.length; i++) {
        final c = (i < widget.value!.length) ? widget.value![i] : '';
        _controllers[i].text = c.toString();
      }
    }
  }

  @override
  void dispose() {
    for (final c in _controllers) {
      c.dispose();
    }
    for (final f in _focusNodes) {
      f.dispose();
    }
    super.dispose();
  }

  String get _currentValue =>
      _controllers.map((c) => c.text).join().replaceAll(' ', '');

  bool _isValidChar(String c) {
    if (widget.type == FlowOTPType.numeric) return RegExp(r'^\d$').hasMatch(c);
    return RegExp(r'^[a-zA-Z0-9]$').hasMatch(c);
  }

  void _updateAndNotify() {
    final val = _currentValue;
    widget.onChanged?.call(val);
    if (val.length == widget.length) {
      widget.onComplete?.call(val);
    }
  }

  void _handleChanged(int idx, String raw) {
    // Paste handling: if multiple chars arrive at once
    if (raw.length > 1) {
      final chars = raw.split('').where(_isValidChar).toList();
      for (var i = 0; i < chars.length && (idx + i) < widget.length; i++) {
        _controllers[idx + i].text = chars[i];
      }
      final nextIdx = (idx + chars.length).clamp(0, widget.length - 1);
      _focusNodes[nextIdx].requestFocus();
      _updateAndNotify();
      return;
    }
    final c = raw.isNotEmpty ? raw[raw.length - 1] : '';
    if (c.isEmpty || !_isValidChar(c)) {
      _controllers[idx].text = '';
      return;
    }
    _controllers[idx].text = c;
    if (idx < widget.length - 1) _focusNodes[idx + 1].requestFocus();
    _updateAndNotify();
  }

  void _handleKeyEvent(int idx, KeyEvent event) {
    if (event is! KeyDownEvent) return;
    if (event.logicalKey == LogicalKeyboardKey.backspace) {
      if (_controllers[idx].text.isNotEmpty) {
        _controllers[idx].text = '';
        _updateAndNotify();
      } else if (idx > 0) {
        _controllers[idx - 1].text = '';
        _focusNodes[idx - 1].requestFocus();
        _updateAndNotify();
      }
    } else if (event.logicalKey == LogicalKeyboardKey.arrowLeft && idx > 0) {
      _focusNodes[idx - 1].requestFocus();
    } else if (event.logicalKey == LogicalKeyboardKey.arrowRight &&
        idx < widget.length - 1) {
      _focusNodes[idx + 1].requestFocus();
    }
  }

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.textInput;
    final resolvedSize = widget.size ?? FlowSizeProvider.of(context);

    final isDisabled = !widget.enabled || widget.loading;
    final cellSize = _cellSize(resolvedSize);
    final fontSize = _fontSize(t, resolvedSize);
    final borderColor = isDisabled
        ? t.borderDisabled
        : widget.error
            ? t.borderError
            : t.border;

    return Semantics(
      label: widget.semanticLabel ?? widget.label ?? 'One-time password',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          // Label
          if (widget.label != null) ...[
            FlowText(widget.label!, role: FlowTextRole.labelM),
            SizedBox(height: t.gap),
          ],
          // Cell row
          Row(
            mainAxisSize: MainAxisSize.min,
            children: List.generate(widget.length, (i) {
              return Padding(
                padding: EdgeInsets.only(
                  right: i < widget.length - 1 ? t.contentGap : 0,
                ),
                child: SizedBox(
                  width: cellSize,
                  height: cellSize,
                  child: KeyboardListener(
                    focusNode: FocusNode(), // wrapper node for key events
                    onKeyEvent: (e) => _handleKeyEvent(i, e),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 150),
                      decoration: BoxDecoration(
                        color: isDisabled ? t.bgDisabled : t.bg,
                        borderRadius: BorderRadius.circular(t.radius),
                        border: Border.all(
                          color: (_focusNodes[i].hasFocus && !isDisabled)
                              ? t.borderFocus
                              : borderColor,
                          width: (_focusNodes[i].hasFocus && !isDisabled)
                              ? t.borderWidthActive
                              : t.borderWidth,
                        ),
                      ),
                      alignment: Alignment.center,
                      child: TextField(
                        controller: _controllers[i],
                        focusNode: _focusNodes[i],
                        enabled: !isDisabled,
                        textAlign: TextAlign.center,
                        keyboardType: widget.type == FlowOTPType.numeric
                            ? TextInputType.number
                            : TextInputType.text,
                        inputFormatters: widget.type == FlowOTPType.numeric
                            ? [FilteringTextInputFormatter.digitsOnly]
                            : [
                                FilteringTextInputFormatter.allow(
                                    RegExp(r'[a-zA-Z0-9]'))
                              ],
                        onChanged: (val) => _handleChanged(i, val),
                        onTap: () => _controllers[i].selection = TextSelection(
                            baseOffset: 0,
                            extentOffset: _controllers[i].text.length),
                        style: TextStyle(
                          fontSize: fontSize,
                          color: t.text,
                          fontWeight: FontWeight.w600,
                        ),
                        decoration: const InputDecoration(
                          isDense: true,
                          contentPadding: EdgeInsets.zero,
                          border: InputBorder.none,
                          counterText: '',
                        ),
                        maxLength: widget.length, // allow paste
                      ),
                    ),
                  ),
                ),
              );
            }),
          ),
          // Error message
          if (widget.error && widget.errorMessage != null) ...[
            SizedBox(height: t.gap),
            FlowText(
              widget.errorMessage!,
              role: FlowTextRole.caption,
              color: FlowTextColor.danger,
            ),
          ],
        ],
      ),
    );
  }

  double _cellSize(FlowComponentSize s) {
    switch (s) {
      case FlowComponentSize.sm:
        return 40;
      case FlowComponentSize.md:
        return 48;
      case FlowComponentSize.lg:
        return 56;
      case FlowComponentSize.xl:
        return 64;
    }
  }

  double _fontSize(FlowCompTextInput t, FlowComponentSize s) {
    switch (s) {
      case FlowComponentSize.sm:
        return t.valueSizeSm;
      case FlowComponentSize.md:
        return t.valueSizeMd;
      case FlowComponentSize.lg:
        return t.valueSizeLg;
      case FlowComponentSize.xl:
        return t.valueSizeXl;
    }
  }
}
