/// FLOW Design System — FlowSearch (L4 Pattern)
/// Search input with optional keyboard shortcut hint, clear button, and loading state.
/// Composes FlowTextInput (L3).
/// Source: FlowSearch.tsx
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../components/inputs/flow_text_input.dart';
import '../primitives/text.dart';
import '../theme/flow_size_provider.dart';
import '../tokens/density.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// Search input with optional shortcut hint, clear, loading, and submit.
class FlowSearch extends StatefulWidget {
  const FlowSearch({
    super.key,
    this.value,
    this.initialValue,
    this.onChanged,
    this.placeholder = 'Search...',
    this.size,
    this.shortcut,
    this.onSubmit,
    this.clearable = true,
    this.loading = false,
    this.error = false,
    this.disabled = false,
    this.autofocus = false,
    this.semanticLabel = 'Search',
  });

  /// Current value (controlled).
  final String? value;

  /// Default value (uncontrolled).
  final String? initialValue;

  /// Change handler.
  final ValueChanged<String>? onChanged;

  /// Placeholder text.
  final String placeholder;

  /// Size variant. Omit to inherit from [FlowSizeProvider].
  final FlowComponentSize? size;

  /// Keyboard shortcut hint displayed when input is empty (e.g. "/" or "Ctrl+K").
  final String? shortcut;

  /// Submit handler (Enter key).
  final ValueChanged<String>? onSubmit;

  /// Show clear button.
  final bool clearable;

  /// Loading state.
  final bool loading;

  /// Error state.
  final bool error;

  /// Disabled state.
  final bool disabled;

  /// Auto focus on mount.
  final bool autofocus;

  /// Accessible label.
  final String semanticLabel;

  @override
  State<FlowSearch> createState() => _FlowSearchState();
}

class _FlowSearchState extends State<FlowSearch> {
  late final TextEditingController _ctrl;
  late final FocusNode _focus;
  bool _ownsCtrl = false;

  bool get _isControlled => widget.value != null;
  String get _value => _isControlled ? widget.value! : _ctrl.text;
  bool get _showShortcut => widget.shortcut != null && _value.isEmpty;

  @override
  void initState() {
    super.initState();
    _ctrl = TextEditingController(text: widget.initialValue ?? '')
      ..also((_) => _ownsCtrl = true);
    _focus = FocusNode();
  }

  @override
  void didUpdateWidget(FlowSearch oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (_isControlled && widget.value != _ctrl.text) {
      _ctrl.text = widget.value!;
    }
  }

  @override
  void dispose() {
    if (_ownsCtrl) _ctrl.dispose();
    _focus.dispose();
    super.dispose();
  }

  void _handleChange(String v) {
    if (!_isControlled) setState(() {});
    widget.onChanged?.call(v);
  }

  void _handleClear() {
    _ctrl.clear();
    widget.onChanged?.call('');
    _focus.requestFocus();
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final sz = widget.size ?? FlowSizeProvider.of(context);

    return Semantics(
      label: widget.semanticLabel,
      container: true,
      child: KeyboardListener(
        focusNode: FocusNode(),
        onKeyEvent: (event) {
          if (event is KeyDownEvent &&
              event.logicalKey == LogicalKeyboardKey.enter) {
            widget.onSubmit?.call(_value);
          }
        },
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Stack(
              alignment: AlignmentDirectional.centerEnd,
              children: [
                FlowTextInput(
                  controller: _ctrl,
                  focusNode: _focus,
                  placeholder: widget.placeholder,
                  leadingIcon: Icons.search,
                  clearable: widget.clearable,
                  onClear: _handleClear,
                  size: sz,
                  enabled: !widget.disabled,
                  loading: widget.loading,
                  error: widget.error ? ' ' : null,
                  autofocus: widget.autofocus,
                  onChanged: _handleChange,
                  semanticLabel: widget.semanticLabel,
                ),
                if (_showShortcut)
                  Positioned(
                    right: FlowRefFrame.space3,
                    child: IgnorePointer(
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: FlowRefFrame.space2,
                          vertical: FlowRefFrame.space1,
                        ),
                        decoration: BoxDecoration(
                          color: sys.surfaceTertiary,
                          borderRadius: BorderRadius.circular(
                            FlowRefFrame.radius1,
                          ),
                          border: Border.all(color: sys.borderSubtle),
                        ),
                        child: FlowText(
                          widget.shortcut!,
                          role: FlowTextRole.caption,
                          color: FlowTextColor.tertiary,
                        ),
                      ),
                    ),
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

/// Chainable helper.
extension _Also<T> on T {
  void also(void Function(T) fn) => fn(this);
}
