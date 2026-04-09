/// FLOW Design System — FlowPhoneInput (L3 Component)
/// Phone number input with country code selector, flag prefix,
/// dial code display, and floating-label anatomy.
/// Source: FlowPhoneInput.tsx
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
double _fFs(FlowCompTextInput t, FlowComponentSize s) => [
      t.labelSizeFloatSm,
      t.labelSizeFloatMd,
      t.labelSizeFloatLg,
      t.labelSizeFloatXl
    ][s.index];
double _hFs(FlowCompTextInput t, FlowComponentSize s) =>
    [t.hintSizeSm, t.hintSizeMd, t.hintSizeLg, t.hintSizeXl][s.index];
double _iB(FlowCompTextInput t, FlowComponentSize s) => [
      t.inputBottomSm,
      t.inputBottomMd,
      t.inputBottomLg,
      t.inputBottomXl
    ][s.index];

/// Country data for the phone input dropdown.
class FlowCountryEntry {
  const FlowCountryEntry(
      {required this.code, required this.name, required this.dial, this.flag});
  final String code, name, dial;
  final String? flag;
}

/// Default subset of countries.
const _defaultCountries = [
  FlowCountryEntry(
      code: 'FR', name: 'France', dial: '+33', flag: '\u{1F1EB}\u{1F1F7}'),
  FlowCountryEntry(
      code: 'US',
      name: 'United States',
      dial: '+1',
      flag: '\u{1F1FA}\u{1F1F8}'),
  FlowCountryEntry(
      code: 'GB',
      name: 'United Kingdom',
      dial: '+44',
      flag: '\u{1F1EC}\u{1F1E7}'),
  FlowCountryEntry(
      code: 'DE', name: 'Germany', dial: '+49', flag: '\u{1F1E9}\u{1F1EA}'),
  FlowCountryEntry(
      code: 'ES', name: 'Spain', dial: '+34', flag: '\u{1F1EA}\u{1F1F8}'),
  FlowCountryEntry(
      code: 'IT', name: 'Italy', dial: '+39', flag: '\u{1F1EE}\u{1F1F9}'),
  FlowCountryEntry(
      code: 'PT', name: 'Portugal', dial: '+351', flag: '\u{1F1F5}\u{1F1F9}'),
  FlowCountryEntry(
      code: 'BE', name: 'Belgium', dial: '+32', flag: '\u{1F1E7}\u{1F1EA}'),
  FlowCountryEntry(
      code: 'MX', name: 'Mexico', dial: '+52', flag: '\u{1F1F2}\u{1F1FD}'),
  FlowCountryEntry(
      code: 'BR', name: 'Brazil', dial: '+55', flag: '\u{1F1E7}\u{1F1F7}'),
  FlowCountryEntry(
      code: 'JP', name: 'Japan', dial: '+81', flag: '\u{1F1EF}\u{1F1F5}'),
  FlowCountryEntry(
      code: 'IN', name: 'India', dial: '+91', flag: '\u{1F1EE}\u{1F1F3}'),
];

/// Phone number input with country selector, flag, dial code, and floating label.
class FlowPhoneInput extends StatefulWidget {
  const FlowPhoneInput({
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
    this.country = 'FR',
    this.onCountryChanged,
    this.countries,
    this.enabled = true,
    this.readOnly = false,
    this.placeholder,
    this.focusNode,
    this.semanticLabel,
  });

  final String label;
  final String? hint, error, placeholder, initialValue, semanticLabel;
  final bool success, loading, enabled, readOnly;
  final FlowComponentSize? size;
  final TextEditingController? controller;
  final ValueChanged<String>? onChanged;
  final String country;
  final ValueChanged<FlowCountryEntry>? onCountryChanged;
  final List<FlowCountryEntry>? countries;
  final FocusNode? focusNode;

  @override
  State<FlowPhoneInput> createState() => _FlowPhoneInputState();
}

class _FlowPhoneInputState extends State<FlowPhoneInput> {
  late final TextEditingController _ctrl;
  late final FocusNode _focus;
  bool _ownsCtrl = false, _ownsFocus = false;
  late String _countryCode;
  bool _ddOpen = false;
  String _search = '';

  List<FlowCountryEntry> get _countries =>
      widget.countries ?? _defaultCountries;
  FlowCountryEntry get _country =>
      _countries.firstWhere((c) => c.code == _countryCode,
          orElse: () => _countries.first);
  bool get _hasVal => _ctrl.text.isNotEmpty;
  bool get _isErr => widget.error?.isNotEmpty == true;
  bool get _isOk => widget.success && !_isErr;
  bool get _isLoad => widget.loading && !_isErr;

  @override
  void initState() {
    super.initState();
    _countryCode = widget.country;
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
  void didUpdateWidget(FlowPhoneInput old) {
    super.didUpdateWidget(old);
    if (widget.country != old.country) _countryCode = widget.country;
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
  void _toggleDd() {
    if (widget.enabled && !widget.readOnly)
      setState(() {
        _ddOpen = !_ddOpen;
        _search = '';
      });
  }

  void _selectCountry(FlowCountryEntry e) {
    setState(() {
      _countryCode = e.code;
      _ddOpen = false;
    });
    widget.onCountryChanged?.call(e);
    _focus.requestFocus();
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.textInput;
    final dd = comp.countryDropdown;
    final sz = widget.size ?? FlowSizeProvider.of(context);
    final height = _h(t, sz), hPad = _px(t, sz), valFs = _vFs(t, sz);
    final fltFs = _fFs(t, sz), hntFs = _hFs(t, sz);
    final brdClr = !widget.enabled
        ? t.borderDisabled
        : _isErr
            ? t.borderError
            : _focus.hasFocus
                ? t.borderFocus
                : t.border;
    final brdW = _focus.hasFocus ? t.borderWidthActive : t.borderWidth;
    final floated = _focus.hasFocus || _hasVal;
    final c = _country;

    return Semantics(
      label: widget.semanticLabel ?? widget.label,
      textField: true,
      enabled: widget.enabled,
      child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: [
            AnimatedContainer(
              duration: const Duration(milliseconds: 150),
              height: height,
              decoration: BoxDecoration(
                  color: widget.enabled ? t.bg : t.bgDisabled,
                  borderRadius: BorderRadius.circular(t.radius),
                  border: Border.all(color: brdClr, width: brdW)),
              child: Row(children: [
                // Country prefix
                Semantics(
                    button: true,
                    label: 'Country: ${c.name}',
                    child: GestureDetector(
                        onTap: _toggleDd,
                        child: Padding(
                          padding:
                              EdgeInsets.symmetric(horizontal: hPad * 0.75),
                          child: Row(mainAxisSize: MainAxisSize.min, children: [
                            if (c.flag != null)
                              Text(c.flag!,
                                  style: TextStyle(fontSize: valFs * 1.2)),
                            SizedBox(width: t.contentGap),
                            Text(c.dial,
                                style:
                                    TextStyle(fontSize: valFs, color: t.text)),
                            SizedBox(width: t.contentGap * 0.5),
                            FlowIcon(
                                _ddOpen
                                    ? Icons.keyboard_arrow_up
                                    : Icons.keyboard_arrow_down,
                                size: _ctrlIcon[sz]!,
                                iconColor: comp.countrySelect.chevronColor),
                          ]),
                        ))),
                Container(
                    width: t.borderWidth,
                    height: height * 0.5,
                    color: t.border),
                // Input body
                Expanded(
                    child: Padding(
                        padding: EdgeInsets.symmetric(horizontal: hPad),
                        child: Stack(clipBehavior: Clip.none, children: [
                          Positioned(
                              left: 0,
                              top: floated
                                  ? height * 0.12
                                  : (height - valFs) / 2,
                              child: AnimatedDefaultTextStyle(
                                  duration: const Duration(milliseconds: 150),
                                  style: TextStyle(
                                      fontSize: floated ? fltFs : valFs,
                                      color: !widget.enabled
                                          ? t.labelDisabled
                                          : _isErr
                                              ? t.borderError
                                              : t.label,
                                      height: 1.0),
                                  child: Text(widget.label))),
                          Positioned(
                              left: 0,
                              right: 0,
                              bottom: _iB(t, sz),
                              child: TextField(
                                  controller: _ctrl,
                                  focusNode: _focus,
                                  enabled: widget.enabled,
                                  readOnly: widget.readOnly,
                                  keyboardType: TextInputType.phone,
                                  onChanged: widget.onChanged,
                                  style:
                                      TextStyle(fontSize: valFs, color: t.text),
                                  cursorColor: sys.actionPrimary,
                                  decoration: InputDecoration(
                                      isDense: true,
                                      contentPadding: EdgeInsets.zero,
                                      border: InputBorder.none,
                                      hintText: (_focus.hasFocus && !_hasVal)
                                          ? widget.placeholder
                                          : null,
                                      hintStyle: TextStyle(
                                          fontSize: valFs,
                                          color: t.placeholder)))),
                        ]))),
                if (_isLoad)
                  Padding(
                      padding: EdgeInsets.only(right: hPad),
                      child: SizedBox(
                          width: valFs,
                          height: valFs,
                          child: CircularProgressIndicator(
                              strokeWidth: 2, color: sys.actionPrimary))),
              ]),
            ),
            // Country dropdown
            if (_ddOpen) _buildDropdown(dd, t, sys),
            // Hint / error
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

  Widget _buildDropdown(
      FlowCompCountryDropdown dd, FlowCompTextInput t, FlowSysTokens sys) {
    final filtered = _search.isEmpty
        ? _countries
        : _countries.where((c) {
            final q = _search.toLowerCase();
            return c.name.toLowerCase().contains(q) ||
                c.dial.contains(q) ||
                c.code.toLowerCase().contains(q);
          }).toList();
    return Container(
      margin: const EdgeInsets.only(top: 4),
      constraints: BoxConstraints(maxHeight: dd.maxHeight),
      decoration: BoxDecoration(
          color: dd.bg,
          borderRadius: BorderRadius.circular(dd.radius),
          boxShadow: dd.shadow),
      child: Column(mainAxisSize: MainAxisSize.min, children: [
        Padding(
            padding: const EdgeInsets.all(8),
            child: TextField(
                autofocus: true,
                onChanged: (q) => setState(() => _search = q),
                style: TextStyle(fontSize: t.valueSize, color: t.text),
                cursorColor: sys.actionPrimary,
                decoration: InputDecoration(
                    isDense: true,
                    hintText: 'Search...',
                    hintStyle: TextStyle(color: t.placeholder),
                    contentPadding:
                        const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(t.radius),
                        borderSide: BorderSide(color: t.border)),
                    focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(t.radius),
                        borderSide: BorderSide(color: t.borderFocus))))),
        Flexible(
            child: ListView.builder(
                shrinkWrap: true,
                itemCount: filtered.length,
                itemExtent: dd.itemHeight,
                itemBuilder: (_, i) {
                  final entry = filtered[i];
                  final sel = entry.code == _countryCode;
                  return Semantics(
                      selected: sel,
                      label: '${entry.name} ${entry.dial}',
                      child: InkWell(
                          onTap: () => _selectCountry(entry),
                          child: Container(
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 12),
                              color: sel ? dd.itemHoverColor : null,
                              child: Row(children: [
                                if (entry.flag != null)
                                  Text(entry.flag!,
                                      style: const TextStyle(fontSize: 18)),
                                const SizedBox(width: 8),
                                Expanded(
                                    child: FlowText(entry.name,
                                        role: FlowTextRole.labelM)),
                                FlowText(entry.dial,
                                    role: FlowTextRole.caption,
                                    color: FlowTextColor.secondary),
                              ]))));
                })),
      ]),
    );
  }
}
