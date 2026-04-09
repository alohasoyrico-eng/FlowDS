/// FLOW Design System — FlowTextArea (L3 Component)
/// Multi-line floating-label textarea with validation, character counter,
/// and auto-resize support. Shares comp.textInput tokens.
/// Source: FlowTextArea.tsx
import 'package:flutter/material.dart';

import '../../primitives/icon.dart';
import '../../primitives/text.dart';
import '../../theme/flow_size_provider.dart';
import '../../tokens/comp_tokens.dart';
import '../../tokens/density.dart';
import '../../tokens/sys_tokens.dart';

const _hintIcon = {
  FlowComponentSize.sm: FlowIconSize.sm,
  FlowComponentSize.md: FlowIconSize.sm,
  FlowComponentSize.lg: FlowIconSize.sm,
  FlowComponentSize.xl: FlowIconSize.md
};

double _px(FlowCompTextInput t, FlowComponentSize s) =>
    [t.paddingSm, t.paddingMd, t.paddingLg, t.paddingXl][s.index];
double _vFs(FlowCompTextInput t, FlowComponentSize s) =>
    [t.valueSizeSm, t.valueSizeMd, t.valueSizeLg, t.valueSizeXl][s.index];
double _fFs(FlowCompTextInput t, FlowComponentSize s) => [
      t.labelSizeFloatSm,
      t.labelSizeFloatMd,
      t.labelSizeFloatLg,
      t.labelSizeFloatXl
    ][s.index];
double _hFs(FlowCompTextInput t, FlowComponentSize s) =>
    [t.hintSizeSm, t.hintSizeMd, t.hintSizeLg, t.hintSizeXl][s.index];

/// Multi-line floating-label textarea with validation, character counter,
/// auto-resize, and configurable min/max lines.
class FlowTextArea extends StatefulWidget {
  const FlowTextArea({
    super.key,
    required this.label,
    this.hint,
    this.error,
    this.success = false,
    this.loading = false,
    this.size,
    this.controller,
    this.initialValue,
    this.onChanged,
    this.maxLength,
    this.minLines = 3,
    this.maxLines = 8,
    this.enabled = true,
    this.readOnly = false,
    this.placeholder,
    this.focusNode,
    this.autofocus = false,
    this.semanticLabel,
  });

  final String label;
  final String? hint, error, placeholder, initialValue, semanticLabel;
  final bool success, loading, enabled, readOnly, autofocus;
  final FlowComponentSize? size;
  final TextEditingController? controller;
  final ValueChanged<String>? onChanged;
  final int? maxLength;
  final int minLines, maxLines;
  final FocusNode? focusNode;

  @override
  State<FlowTextArea> createState() => _FlowTextAreaState();
}

class _FlowTextAreaState extends State<FlowTextArea> {
  late final TextEditingController _ctrl;
  late final FocusNode _focus;
  bool _ownsCtrl = false, _ownsFocus = false;

  bool get _hasVal => _ctrl.text.isNotEmpty;
  bool get _isErr => widget.error?.isNotEmpty == true;
  bool get _isOk => widget.success && !_isErr;
  bool get _isLoad => widget.loading && !_isErr;

  @override
  void initState() {
    super.initState();
    if (widget.controller != null) {
      _ctrl = widget.controller!;
    } else {
      _ctrl = TextEditingController(text: widget.initialValue ?? '');
      _ownsCtrl = true;
    }
    if (widget.focusNode != null) {
      _focus = widget.focusNode!;
    } else {
      _focus = FocusNode();
      _ownsFocus = true;
    }
    _focus.addListener(_rebuild);
    _ctrl.addListener(_rebuild);
  }

  @override
  void dispose() {
    _focus.removeListener(_rebuild);
    _ctrl.removeListener(_rebuild);
    if (_ownsCtrl) _ctrl.dispose();
    if (_ownsFocus) _focus.dispose();
    super.dispose();
  }

  void _rebuild() => setState(() {});

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final t = Theme.of(context).extension<FlowCompTokens>()!.textInput;
    final sz = widget.size ?? FlowSizeProvider.of(context);
    final hPad = _px(t, sz),
        valFs = _vFs(t, sz),
        fltFs = _fFs(t, sz),
        hntFs = _hFs(t, sz);
    final brdClr = !widget.enabled
        ? t.borderDisabled
        : _isErr
            ? t.borderError
            : _focus.hasFocus
                ? t.borderFocus
                : t.border;
    final brdW = _focus.hasFocus ? t.borderWidthActive : t.borderWidth;
    final charCount = _ctrl.text.length;
    final overLimit = widget.maxLength != null && charCount > widget.maxLength!;

    return Semantics(
      label: widget.semanticLabel ?? widget.label,
      textField: true,
      multiline: true,
      enabled: widget.enabled,
      child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: [
            GestureDetector(
              onTap: widget.enabled ? () => _focus.requestFocus() : null,
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 150),
                decoration: BoxDecoration(
                    color: widget.enabled ? t.bg : t.bgDisabled,
                    borderRadius: BorderRadius.circular(t.radius),
                    border: Border.all(color: brdClr, width: brdW)),
                padding: EdgeInsets.only(
                    left: hPad,
                    right: hPad,
                    top: fltFs + hPad * 0.6,
                    bottom: hPad * 0.4),
                child: Stack(children: [
                  // Floating label
                  Positioned(
                      left: 0,
                      top: 0,
                      child: AnimatedDefaultTextStyle(
                          duration: const Duration(milliseconds: 150),
                          style: TextStyle(
                              fontSize:
                                  (_focus.hasFocus || _hasVal) ? fltFs : valFs,
                              color: !widget.enabled
                                  ? t.labelDisabled
                                  : _isErr
                                      ? t.borderError
                                      : t.label,
                              height: 1.2),
                          child: Text(widget.label))),
                  // Textarea
                  Padding(
                      padding: EdgeInsets.only(top: fltFs * 0.6),
                      child: TextField(
                          controller: _ctrl,
                          focusNode: _focus,
                          enabled: widget.enabled,
                          readOnly: widget.readOnly,
                          autofocus: widget.autofocus,
                          minLines: widget.minLines,
                          maxLines: widget.maxLines,
                          maxLength: widget.maxLength,
                          onChanged: widget.onChanged,
                          style: TextStyle(fontSize: valFs, color: t.text),
                          cursorColor: sys.actionPrimary,
                          decoration: InputDecoration(
                              isDense: true,
                              contentPadding: EdgeInsets.zero,
                              border: InputBorder.none,
                              counterText: '',
                              hintText: (_focus.hasFocus && !_hasVal)
                                  ? widget.placeholder
                                  : null,
                              hintStyle: TextStyle(
                                  fontSize: valFs, color: t.placeholder)))),
                  // Loading
                  if (_isLoad)
                    Positioned(
                        top: 0,
                        right: 0,
                        child: SizedBox(
                            width: valFs,
                            height: valFs,
                            child: CircularProgressIndicator(
                                strokeWidth: 2, color: sys.actionPrimary))),
                ]),
              ),
            ),
            // Footer
            SizedBox(height: t.gap),
            Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              if (widget.hint != null || _isErr)
                Expanded(
                    child: Semantics(
                        liveRegion: _isErr,
                        child: Row(children: [
                          if (_isErr)
                            FlowIcon(Icons.warning_amber_rounded,
                                size: _hintIcon[sz]!,
                                iconColor: sys.textDanger),
                          if (_isOk)
                            FlowIcon(Icons.check_circle_outline,
                                size: _hintIcon[sz]!,
                                iconColor: sys.textSuccess),
                          if (_isErr || _isOk) SizedBox(width: t.contentGap),
                          Expanded(
                              child: Text(
                                  _isErr ? widget.error! : (widget.hint ?? ''),
                                  style: TextStyle(
                                      fontSize: hntFs,
                                      color: _isErr
                                          ? t.hintError
                                          : _isOk
                                              ? sys.textSuccess
                                              : t.hint))),
                        ])))
              else
                const Spacer(),
              if (widget.maxLength != null)
                FlowText('$charCount/${widget.maxLength}',
                    role: FlowTextRole.caption,
                    color: overLimit
                        ? FlowTextColor.danger
                        : FlowTextColor.secondary),
            ]),
          ]),
    );
  }
}
