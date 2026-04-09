/// FLOW Design System — FlowTextInput (L3 Component)
/// Floating-label single-line input with 4 sizes, error/success states,
/// clearable option, and leading/trailing icon support.
/// Source: FlowTextInput.tsx
import 'package:flutter/material.dart';

import '../../primitives/icon.dart';
import '../../primitives/text.dart';
import '../../theme/flow_size_provider.dart';
import '../../tokens/comp_tokens.dart';
import '../../tokens/density.dart';
import '../../tokens/sys_tokens.dart';

const _ctrlIcon = {
  FlowComponentSize.sm: FlowIconSize.sm,
  FlowComponentSize.md: FlowIconSize.sm,
  FlowComponentSize.lg: FlowIconSize.md,
  FlowComponentSize.xl: FlowIconSize.lg
};
const _hintIcon = {
  FlowComponentSize.sm: FlowIconSize.sm,
  FlowComponentSize.md: FlowIconSize.sm,
  FlowComponentSize.lg: FlowIconSize.sm,
  FlowComponentSize.xl: FlowIconSize.md
};

double _h(FlowCompTextInput t, FlowComponentSize s) =>
    [t.heightSm, t.heightMd, t.heightLg, t.heightXl][s.index];
double _px(FlowCompTextInput t, FlowComponentSize s) =>
    [t.paddingSm, t.paddingMd, t.paddingLg, t.paddingXl][s.index];
double _vFs(FlowCompTextInput t, FlowComponentSize s) =>
    [t.valueSizeSm, t.valueSizeMd, t.valueSizeLg, t.valueSizeXl][s.index];
double _lFs(FlowCompTextInput t, FlowComponentSize s) =>
    [t.labelSizeSm, t.labelSizeMd, t.labelSizeLg, t.labelSizeXl][s.index];
double _fFs(FlowCompTextInput t, FlowComponentSize s) => [
      t.labelSizeFloatSm,
      t.labelSizeFloatMd,
      t.labelSizeFloatLg,
      t.labelSizeFloatXl
    ][s.index];
double _hFs(FlowCompTextInput t, FlowComponentSize s) =>
    [t.hintSizeSm, t.hintSizeMd, t.hintSizeLg, t.hintSizeXl][s.index];
double _lOy(FlowCompTextInput t, FlowComponentSize s) => [
      t.labelOffsetYSm,
      t.labelOffsetYMd,
      t.labelOffsetYLg,
      t.labelOffsetYXl
    ][s.index];
double _iB(FlowCompTextInput t, FlowComponentSize s) => [
      t.inputBottomSm,
      t.inputBottomMd,
      t.inputBottomLg,
      t.inputBottomXl
    ][s.index];

/// Floating-label single-line text input with validation, clear button,
/// and optional leading/trailing icons.
class FlowTextInput extends StatefulWidget {
  const FlowTextInput({
    super.key,
    this.label,
    this.hint,
    this.error,
    this.success = false,
    this.loading = false,
    this.size,
    this.controller,
    this.initialValue,
    this.onChanged,
    this.clearable = false,
    this.onClear,
    this.leadingIcon,
    this.trailingIcon,
    this.prefix,
    this.suffix,
    this.enabled = true,
    this.readOnly = false,
    this.obscureText = false,
    this.placeholder,
    this.keyboardType,
    this.textInputAction,
    this.focusNode,
    this.autofocus = false,
    this.semanticLabel,
  });

  final String? label, hint, error, prefix, suffix, placeholder, semanticLabel;
  final bool success,
      loading,
      clearable,
      enabled,
      readOnly,
      obscureText,
      autofocus;
  final FlowComponentSize? size;
  final TextEditingController? controller;
  final String? initialValue;
  final ValueChanged<String>? onChanged;
  final VoidCallback? onClear;
  final IconData? leadingIcon, trailingIcon;
  final TextInputType? keyboardType;
  final TextInputAction? textInputAction;
  final FocusNode? focusNode;

  @override
  State<FlowTextInput> createState() => _FlowTextInputState();
}

class _FlowTextInputState extends State<FlowTextInput>
    with SingleTickerProviderStateMixin {
  late final TextEditingController _ctrl;
  late final FocusNode _focus;
  late final AnimationController _labelAnim;
  bool _ownsCtrl = false, _ownsFocus = false;

  bool get _hasVal => _ctrl.text.isNotEmpty;
  bool get _isErr => widget.error?.isNotEmpty == true;
  bool get _isOk => widget.success && !_isErr;
  bool get _isLoad => widget.loading && !_isErr;
  bool get _floated => _focus.hasFocus || _hasVal;

  @override
  void initState() {
    super.initState();
    _ctrl = widget.controller ??
        (TextEditingController(text: widget.initialValue ?? '')
          ..also((_) => _ownsCtrl = true));
    _focus = widget.focusNode ?? (FocusNode()..also((_) => _ownsFocus = true));
    _labelAnim = AnimationController(
        vsync: this,
        duration: const Duration(milliseconds: 150),
        value: _floated ? 1.0 : 0.0);
    _focus.addListener(_sync);
    _ctrl.addListener(_sync);
  }

  @override
  void dispose() {
    _focus.removeListener(_sync);
    _ctrl.removeListener(_sync);
    _labelAnim.dispose();
    if (_ownsCtrl) _ctrl.dispose();
    if (_ownsFocus) _focus.dispose();
    super.dispose();
  }

  void _sync() {
    _floated ? _labelAnim.forward() : _labelAnim.reverse();
    setState(() {});
  }

  void _clear() {
    _ctrl.clear();
    widget.onClear?.call();
    widget.onChanged?.call('');
    _focus.requestFocus();
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final t = Theme.of(context).extension<FlowCompTokens>()!.textInput;
    final sz = widget.size ?? FlowSizeProvider.of(context);
    final height = _h(t, sz), hPad = _px(t, sz), valFs = _vFs(t, sz);
    final labFs = _lFs(t, sz), fltFs = _fFs(t, sz), hntFs = _hFs(t, sz);
    final brdClr = !widget.enabled
        ? t.borderDisabled
        : _isErr
            ? t.borderError
            : _focus.hasFocus
                ? t.borderFocus
                : t.border;
    final brdW = _focus.hasFocus ? t.borderWidthActive : t.borderWidth;

    return Semantics(
      label: widget.semanticLabel ?? widget.label,
      textField: true,
      enabled: widget.enabled,
      child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: [
            GestureDetector(
              onTap: widget.enabled ? () => _focus.requestFocus() : null,
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 150),
                height: height,
                decoration: BoxDecoration(
                    color: widget.enabled ? t.bg : t.bgDisabled,
                    borderRadius: BorderRadius.circular(t.radius),
                    border: Border.all(color: brdClr, width: brdW)),
                padding: EdgeInsets.symmetric(horizontal: hPad),
                child: Row(children: [
                  if (widget.leadingIcon != null) ...[
                    FlowIcon(widget.leadingIcon!,
                        size: _ctrlIcon[sz]!, iconColor: t.label),
                    SizedBox(width: t.contentGap)
                  ],
                  if (widget.prefix != null)
                    FlowText(widget.prefix!,
                        role: FlowTextRole.caption,
                        color: FlowTextColor.secondary),
                  Expanded(
                      child: Stack(clipBehavior: Clip.none, children: [
                    if (widget.label != null)
                      AnimatedBuilder(
                          animation: _labelAnim,
                          builder: (ctx, _) {
                            final p = _labelAnim.value;
                            return Positioned(
                                left: 0,
                                top: (height - labFs) / 2 -
                                    ((height - labFs) / 2 - _lOy(t, sz)) * p,
                                child: IgnorePointer(
                                    child: Text(widget.label!,
                                        style: TextStyle(
                                            fontSize:
                                                labFs + (fltFs - labFs) * p,
                                            color: !widget.enabled
                                                ? t.labelDisabled
                                                : _isErr
                                                    ? t.borderError
                                                    : t.label,
                                            height: 1.0))));
                          }),
                    Positioned(
                        left: 0,
                        right: 0,
                        bottom: _iB(t, sz),
                        child: EditableText(
                            controller: _ctrl,
                            focusNode: _focus,
                            style: TextStyle(fontSize: valFs, color: t.text),
                            cursorColor: sys.actionPrimary,
                            backgroundCursorColor: Colors.transparent,
                            readOnly: widget.readOnly,
                            obscureText: widget.obscureText,
                            keyboardType: widget.keyboardType,
                            textInputAction: widget.textInputAction,
                            autofocus: widget.autofocus,
                            onChanged: widget.onChanged)),
                  ])),
                  if (widget.suffix != null)
                    FlowText(widget.suffix!,
                        role: FlowTextRole.caption,
                        color: FlowTextColor.secondary),
                  if (widget.trailingIcon != null && !_isLoad) ...[
                    SizedBox(width: t.contentGap),
                    FlowIcon(widget.trailingIcon!,
                        size: _ctrlIcon[sz]!, iconColor: t.label)
                  ],
                  if (widget.clearable && widget.enabled && _hasVal) ...[
                    SizedBox(width: t.contentGap),
                    GestureDetector(
                        onTap: _clear,
                        child: Semantics(
                            button: true,
                            label: 'Clear',
                            child: FlowIcon(Icons.close,
                                size: _ctrlIcon[sz]!, iconColor: t.label)))
                  ],
                  if (_isLoad) ...[
                    SizedBox(width: t.contentGap),
                    SizedBox(
                        width: valFs,
                        height: valFs,
                        child: CircularProgressIndicator(
                            strokeWidth: 2, color: sys.actionPrimary))
                  ],
                ]),
              ),
            ),
            if (widget.hint != null || _isErr) ...[
              SizedBox(height: t.gap),
              Semantics(
                  liveRegion: _isErr,
                  child: Row(children: [
                    if (_isErr)
                      FlowIcon(Icons.warning_amber_rounded,
                          size: _hintIcon[sz]!, iconColor: sys.textDanger),
                    if (_isOk)
                      FlowIcon(Icons.check_circle_outline,
                          size: _hintIcon[sz]!, iconColor: sys.textSuccess),
                    if (_isErr || _isOk) SizedBox(width: t.contentGap),
                    Expanded(
                        child:
                            Text(_isErr ? widget.error! : (widget.hint ?? ''),
                                style: TextStyle(
                                    fontSize: hntFs,
                                    color: _isErr
                                        ? t.hintError
                                        : _isOk
                                            ? sys.textSuccess
                                            : t.hint))),
                  ])),
            ],
          ]),
    );
  }
}

/// Chainable helper (mirrors Kotlin's also).
extension _Also<T> on T {
  void also(void Function(T) fn) => fn(this);
}
