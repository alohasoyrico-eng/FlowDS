/// FLOW Design System — FlowInlineEditable (L4 Pattern)
/// Click-to-edit text field that toggles between display and input modes.
/// Composes FlowTextInput, FlowIconButton (L3).
/// Source: FlowInlineEditable.tsx
import 'package:flutter/material.dart';

import '../components/controls/flow_icon_button.dart';
import '../components/inputs/flow_text_input.dart';
import '../primitives/text.dart';
import '../tokens/density.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// Click-to-edit text field that toggles between display and input modes.
class FlowInlineEditable extends StatefulWidget {
  const FlowInlineEditable({
    super.key,
    required this.value,
    required this.onChanged,
    this.placeholder = 'Click to edit...',
    this.disabled = false,
    this.error = false,
    this.size,
    this.semanticLabel,
  });

  /// Current text value.
  final String value;

  /// Callback fired when the text is committed.
  final ValueChanged<String> onChanged;

  /// Placeholder shown when value is empty.
  final String placeholder;

  /// Whether editing is disabled.
  final bool disabled;

  /// Error state.
  final bool error;

  /// Size variant.
  final FlowComponentSize? size;

  /// Accessible label.
  final String? semanticLabel;

  @override
  State<FlowInlineEditable> createState() => _FlowInlineEditableState();
}

class _FlowInlineEditableState extends State<FlowInlineEditable> {
  bool _editing = false;
  late TextEditingController _ctrl;
  final FocusNode _focus = FocusNode();

  @override
  void initState() {
    super.initState();
    _ctrl = TextEditingController(text: widget.value);
  }

  @override
  void didUpdateWidget(FlowInlineEditable old) {
    super.didUpdateWidget(old);
    if (!_editing && old.value != widget.value) {
      _ctrl.text = widget.value;
    }
  }

  @override
  void dispose() {
    _ctrl.dispose();
    _focus.dispose();
    super.dispose();
  }

  void _startEdit() {
    if (widget.disabled) return;
    setState(() {
      _ctrl.text = widget.value;
      _editing = true;
    });
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _focus.requestFocus();
    });
  }

  void _commit() {
    setState(() => _editing = false);
    widget.onChanged(_ctrl.text);
  }

  void _cancel() {
    setState(() {
      _editing = false;
      _ctrl.text = widget.value;
    });
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    if (_editing) {
      return Semantics(
        label: widget.semanticLabel ?? 'Inline edit',
        child: Focus(
          onFocusChange: (hasFocus) {
            if (!hasFocus) _commit();
          },
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Flexible(
                child: FlowTextInput(
                  controller: _ctrl,
                  focusNode: _focus,
                  size: FlowComponentSize.sm,
                  placeholder: widget.placeholder,
                  autofocus: true,
                  onChanged: (_) {},
                ),
              ),
              SizedBox(width: FlowRefFrame.space1),
              FlowIconButton(
                icon: Icons.check,
                size: FlowComponentSize.sm,
                variant: FlowIconButtonVariant.ghost,
                onPressed: _commit,
                semanticLabel: 'Save',
              ),
              FlowIconButton(
                icon: Icons.close,
                size: FlowComponentSize.sm,
                variant: FlowIconButtonVariant.ghost,
                onPressed: _cancel,
                semanticLabel: 'Cancel',
              ),
            ],
          ),
        ),
      );
    }

    return Semantics(
      label: widget.semanticLabel ?? 'Click to edit',
      button: true,
      enabled: !widget.disabled,
      child: GestureDetector(
        onTap: _startEdit,
        child: Container(
          padding: const EdgeInsets.symmetric(
            horizontal: FlowRefFrame.space2,
            vertical: FlowRefFrame.space1,
          ),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(FlowRefFrame.radius1),
            border: Border.all(
              color: widget.error ? sys.borderDanger : Colors.transparent,
            ),
          ),
          child: FlowText(
            widget.value.isNotEmpty ? widget.value : widget.placeholder,
            role: FlowTextRole.paragraphS,
            color: widget.value.isNotEmpty
                ? (widget.disabled
                    ? FlowTextColor.disabled
                    : FlowTextColor.primary)
                : FlowTextColor.tertiary,
          ),
        ),
      ),
    );
  }
}
