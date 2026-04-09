/// FLOW Design System — FlowAutocomplete (L4 Pattern)
/// Search input with filterable suggestions dropdown and keyboard navigation.
/// Composes FlowTextInput (L3).
/// Source: FlowAutocomplete.tsx
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../components/inputs/flow_text_input.dart';
import '../primitives/text.dart';
import '../theme/flow_size_provider.dart';
import '../tokens/density.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// A single autocomplete option.
class FlowAutocompleteOption {
  const FlowAutocompleteOption({
    required this.value,
    required this.label,
    this.secondary,
    this.disabled = false,
  });

  final String value;
  final String label;
  final String? secondary;
  final bool disabled;
}

/// Search input with filterable dropdown suggestions and keyboard navigation.
class FlowAutocomplete extends StatefulWidget {
  const FlowAutocomplete({
    super.key,
    required this.options,
    this.value,
    this.initialValue,
    this.onChanged,
    this.onInputChanged,
    this.label,
    this.placeholder = 'Type to search...',
    this.size,
    this.error,
    this.loading = false,
    this.showIcon = true,
    this.clearable = true,
    this.filterFn,
    this.emptyText = 'No results found',
    this.highlightMatch = true,
    this.disabled = false,
    this.semanticLabel,
  });

  final List<FlowAutocompleteOption> options;
  final String? value;
  final String? initialValue;
  final ValueChanged<String>? onChanged;
  final ValueChanged<String>? onInputChanged;
  final String? label;
  final String placeholder;
  final FlowComponentSize? size;
  final String? error;
  final bool loading;
  final bool showIcon;
  final bool clearable;
  final bool Function(FlowAutocompleteOption option, String input)? filterFn;
  final String emptyText;
  final bool highlightMatch;
  final bool disabled;
  final String? semanticLabel;

  @override
  State<FlowAutocomplete> createState() => _FlowAutocompleteState();
}

class _FlowAutocompleteState extends State<FlowAutocomplete> {
  final LayerLink _layerLink = LayerLink();
  final TextEditingController _ctrl = TextEditingController();
  final FocusNode _focus = FocusNode();
  OverlayEntry? _overlay;
  List<FlowAutocompleteOption> _filtered = [];
  int _highlightedIdx = -1;
  String _currentValue = '';

  bool get _isControlled => widget.value != null;

  @override
  void initState() {
    super.initState();
    _currentValue = widget.value ?? widget.initialValue ?? '';
    _syncInputText();
    _focus.addListener(_onFocusChange);
  }

  @override
  void didUpdateWidget(FlowAutocomplete old) {
    super.didUpdateWidget(old);
    if (_isControlled && widget.value != _currentValue) {
      _currentValue = widget.value!;
      _syncInputText();
    }
  }

  void _syncInputText() {
    final opt =
        widget.options.where((o) => o.value == _currentValue).firstOrNull;
    _ctrl.text = opt?.label ?? '';
  }

  @override
  void dispose() {
    _removeOverlay();
    _focus.removeListener(_onFocusChange);
    _focus.dispose();
    _ctrl.dispose();
    super.dispose();
  }

  void _onFocusChange() {
    if (_focus.hasFocus) {
      _open();
    } else {
      Future.delayed(const Duration(milliseconds: 150), () {
        if (!_focus.hasFocus) _close();
      });
    }
  }

  void _filter() {
    final input = _ctrl.text;
    final fn = widget.filterFn ??
        (FlowAutocompleteOption o, String q) =>
            o.label.toLowerCase().contains(q.toLowerCase());
    _filtered = widget.options.where((o) => fn(o, input)).toList();
  }

  void _open() {
    _filter();
    _showOverlay();
  }

  void _close() {
    _removeOverlay();
    setState(() {
      _highlightedIdx = -1;
    });
    _syncInputText();
  }

  void _selectOption(FlowAutocompleteOption opt) {
    _currentValue = opt.value;
    if (!_isControlled) setState(() {});
    widget.onChanged?.call(opt.value);
    _ctrl.text = opt.label;
    _close();
  }

  void _handleInputChange(String val) {
    widget.onInputChanged?.call(val);
    _highlightedIdx = -1;
    _filter();
    _updateOverlay();
  }

  void _handleClear() {
    _currentValue = '';
    _ctrl.clear();
    widget.onChanged?.call('');
  }

  KeyEventResult _handleKey(FocusNode node, KeyEvent event) {
    if (event is! KeyDownEvent) return KeyEventResult.ignored;
    final enabled = _filtered.where((o) => !o.disabled).toList();

    if (event.logicalKey == LogicalKeyboardKey.arrowDown) {
      setState(() {
        _highlightedIdx = (_highlightedIdx + 1).clamp(0, enabled.length - 1);
      });
      _updateOverlay();
      return KeyEventResult.handled;
    }
    if (event.logicalKey == LogicalKeyboardKey.arrowUp) {
      setState(() {
        _highlightedIdx = (_highlightedIdx - 1).clamp(0, enabled.length - 1);
      });
      _updateOverlay();
      return KeyEventResult.handled;
    }
    if (event.logicalKey == LogicalKeyboardKey.enter) {
      if (_highlightedIdx >= 0 && _highlightedIdx < enabled.length) {
        _selectOption(enabled[_highlightedIdx]);
      }
      return KeyEventResult.handled;
    }
    if (event.logicalKey == LogicalKeyboardKey.escape) {
      _close();
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }

  void _showOverlay() {
    _removeOverlay();
    _overlay = OverlayEntry(builder: (_) => _buildDropdown());
    Overlay.of(context).insert(_overlay!);
  }

  void _updateOverlay() {
    _overlay?.markNeedsBuild();
  }

  void _removeOverlay() {
    _overlay?.remove();
    _overlay = null;
  }

  Widget _buildDropdown() {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    _filter();

    return Positioned(
      width: context.size?.width ?? 300,
      child: CompositedTransformFollower(
        link: _layerLink,
        showWhenUnlinked: false,
        offset: Offset(0, (context.size?.height ?? 56) + FlowRefFrame.space1),
        child: Material(
          elevation: 4,
          borderRadius: BorderRadius.circular(FlowRefFrame.radius3),
          color: sys.surfacePrimary,
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxHeight: 260),
            child: _filtered.isEmpty
                ? Padding(
                    padding: const EdgeInsets.all(FlowRefFrame.space4),
                    child: FlowText(
                      widget.emptyText,
                      role: FlowTextRole.paragraphS,
                      color: FlowTextColor.tertiary,
                    ),
                  )
                : ListView.builder(
                    shrinkWrap: true,
                    padding: const EdgeInsets.symmetric(
                      vertical: FlowRefFrame.space1,
                    ),
                    itemCount: _filtered.length,
                    itemBuilder: (ctx, i) => _buildOption(ctx, i, sys),
                  ),
          ),
        ),
      ),
    );
  }

  Widget _buildOption(BuildContext ctx, int idx, FlowSysTokens sys) {
    final opt = _filtered[idx];
    final enabled = _filtered.where((o) => !o.disabled).toList();
    final enabledIdx = enabled.indexOf(opt);
    final isHighlighted = enabledIdx == _highlightedIdx;
    final isSelected = opt.value == _currentValue;

    return Semantics(
      selected: isSelected,
      enabled: !opt.disabled,
      child: GestureDetector(
        onTap: opt.disabled ? null : () => _selectOption(opt),
        child: Container(
          padding: const EdgeInsets.symmetric(
            horizontal: FlowRefFrame.space4,
            vertical: FlowRefFrame.space2,
          ),
          color: isHighlighted
              ? sys.surfaceSecondary
              : isSelected
                  ? sys.surfaceTertiary
                  : null,
          child: Opacity(
            opacity: opt.disabled ? 0.5 : 1.0,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                widget.highlightMatch
                    ? _HighlightText(
                        text: opt.label,
                        query: _ctrl.text,
                        baseColor: sys.textPrimary,
                        highlightColor: sys.actionPrimary,
                      )
                    : FlowText(opt.label, role: FlowTextRole.paragraphS),
                if (opt.secondary != null)
                  FlowText(
                    opt.secondary!,
                    role: FlowTextRole.caption,
                    color: FlowTextColor.secondary,
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final sz = widget.size ?? FlowSizeProvider.of(context);

    return CompositedTransformTarget(
      link: _layerLink,
      child: Focus(
        onKeyEvent: _handleKey,
        child: Semantics(
          label: widget.semanticLabel ?? widget.label,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisSize: MainAxisSize.min,
            children: [
              if (widget.label != null)
                Padding(
                  padding: const EdgeInsets.only(
                    bottom: FlowRefFrame.space1,
                  ),
                  child: FlowText(
                    widget.label!,
                    role: FlowTextRole.labelS,
                    color: FlowTextColor.secondary,
                  ),
                ),
              FlowTextInput(
                controller: _ctrl,
                focusNode: _focus,
                placeholder: widget.placeholder,
                leadingIcon: widget.showIcon ? Icons.search : null,
                clearable: widget.clearable,
                onClear: _handleClear,
                size: sz,
                enabled: !widget.disabled,
                loading: widget.loading,
                error: widget.error,
                onChanged: _handleInputChange,
                semanticLabel: widget.semanticLabel ?? widget.label,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Text widget that highlights matching substring.
class _HighlightText extends StatelessWidget {
  const _HighlightText({
    required this.text,
    required this.query,
    required this.baseColor,
    required this.highlightColor,
  });

  final String text;
  final String query;
  final Color baseColor;
  final Color highlightColor;

  @override
  Widget build(BuildContext context) {
    if (query.isEmpty) {
      return FlowText(text, role: FlowTextRole.paragraphS);
    }
    final idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx == -1) {
      return FlowText(text, role: FlowTextRole.paragraphS);
    }
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    return RichText(
      text: TextSpan(
        style: TextStyle(color: baseColor, fontSize: sys.paragraphSFontSize),
        children: [
          TextSpan(text: text.substring(0, idx)),
          TextSpan(
            text: text.substring(idx, idx + query.length),
            style: TextStyle(
              color: highlightColor,
              fontWeight: FontWeight.w600,
            ),
          ),
          TextSpan(text: text.substring(idx + query.length)),
        ],
      ),
    );
  }
}
