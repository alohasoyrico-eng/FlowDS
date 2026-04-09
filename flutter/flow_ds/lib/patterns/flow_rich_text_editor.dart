/// FLOW Design System — FlowRichTextEditor (L4 Pattern)
/// Basic rich text editor with a formatting toolbar.
/// Composes FlowIconButton (L3).
/// Source: FlowRichTextEditor.tsx
///
/// NOTE: Flutter does not have a native contentEditable equivalent.
/// This pattern provides a toolbar over a basic TextField with multiline
/// support. For true rich text, integrate a package like flutter_quill.
import 'package:flutter/material.dart';

import '../components/controls/flow_icon_button.dart';
import '../primitives/text.dart';
import '../tokens/density.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// Format action that can be applied.
enum FlowRichTextFormat {
  bold,
  italic,
  underline,
  bulletList,
  numberedList,
  h1,
  h2,
  h3
}

/// Toolbar button definition.
class _ToolbarBtn {
  const _ToolbarBtn(this.format, this.icon, this.label);
  final FlowRichTextFormat format;
  final IconData icon;
  final String label;
}

const _toolbarButtons = [
  _ToolbarBtn(FlowRichTextFormat.bold, Icons.format_bold, 'Bold'),
  _ToolbarBtn(FlowRichTextFormat.italic, Icons.format_italic, 'Italic'),
  _ToolbarBtn(
      FlowRichTextFormat.underline, Icons.format_underline, 'Underline'),
  _ToolbarBtn(
      FlowRichTextFormat.bulletList, Icons.format_list_bulleted, 'Bullet list'),
  _ToolbarBtn(FlowRichTextFormat.numberedList, Icons.format_list_numbered,
      'Numbered list'),
];

const _headingButtons = [
  _ToolbarBtn(FlowRichTextFormat.h1, Icons.looks_one, 'Heading 1'),
  _ToolbarBtn(FlowRichTextFormat.h2, Icons.looks_two, 'Heading 2'),
  _ToolbarBtn(FlowRichTextFormat.h3, Icons.looks_3, 'Heading 3'),
];

/// Basic rich text editor with a formatting toolbar and multiline input.
class FlowRichTextEditor extends StatefulWidget {
  const FlowRichTextEditor({
    super.key,
    this.initialValue = '',
    this.onChanged,
    this.onFormatAction,
    this.placeholder = 'Start typing...',
    this.minHeight = 160,
    this.maxHeight = 400,
    this.disabled = false,
    this.label,
    this.semanticLabel,
  });

  /// Default text content (uncontrolled).
  final String initialValue;

  /// Callback fired when the text changes.
  final ValueChanged<String>? onChanged;

  /// Callback fired when a formatting action is triggered.
  /// Integrate with a rich text engine to apply formatting.
  final ValueChanged<FlowRichTextFormat>? onFormatAction;

  /// Placeholder text shown when empty.
  final String placeholder;

  /// Minimum editor height.
  final double minHeight;

  /// Maximum editor height.
  final double maxHeight;

  /// Whether the editor is disabled.
  final bool disabled;

  /// Label text above the editor.
  final String? label;

  /// Accessible label.
  final String? semanticLabel;

  @override
  State<FlowRichTextEditor> createState() => _FlowRichTextEditorState();
}

class _FlowRichTextEditorState extends State<FlowRichTextEditor> {
  late final TextEditingController _ctrl;
  final FocusNode _focus = FocusNode();

  @override
  void initState() {
    super.initState();
    _ctrl = TextEditingController(text: widget.initialValue);
  }

  @override
  void dispose() {
    _ctrl.dispose();
    _focus.dispose();
    super.dispose();
  }

  void _onFormat(FlowRichTextFormat fmt) {
    widget.onFormatAction?.call(fmt);
    _focus.requestFocus();
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    return Semantics(
      label: widget.semanticLabel ?? widget.label ?? 'Rich text editor',
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
                  padding: const EdgeInsets.only(bottom: FlowRefFrame.space1),
                  child: FlowText(
                    widget.label!,
                    role: FlowTextRole.paragraphS,
                    color: FlowTextColor.secondary,
                  ),
                ),
              Container(
                decoration: BoxDecoration(
                  border: Border.all(color: sys.borderControl),
                  borderRadius: BorderRadius.circular(FlowRefFrame.radius3),
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    // Toolbar
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: FlowRefFrame.space2,
                        vertical: FlowRefFrame.space1,
                      ),
                      decoration: BoxDecoration(
                        color: sys.surfaceSecondary,
                        borderRadius: const BorderRadius.vertical(
                          top: Radius.circular(FlowRefFrame.radius3),
                        ),
                        border: Border(
                          bottom: BorderSide(color: sys.borderSubtle),
                        ),
                      ),
                      child: Semantics(
                        label: 'Formatting',
                        child: Wrap(
                          spacing: FlowRefFrame.space1,
                          children: [
                            ..._toolbarButtons.map((btn) => FlowIconButton(
                                  icon: btn.icon,
                                  size: FlowComponentSize.sm,
                                  variant: FlowIconButtonVariant.ghost,
                                  onPressed: () => _onFormat(btn.format),
                                  semanticLabel: btn.label,
                                  tooltip: btn.label,
                                )),
                            // Divider
                            Container(
                              width: 1,
                              height: FlowRefFrame.space5,
                              margin: const EdgeInsets.symmetric(
                                horizontal: FlowRefFrame.space1,
                              ),
                              color: sys.borderSubtle,
                            ),
                            ..._headingButtons.map((btn) => FlowIconButton(
                                  icon: btn.icon,
                                  size: FlowComponentSize.sm,
                                  variant: FlowIconButtonVariant.ghost,
                                  onPressed: () => _onFormat(btn.format),
                                  semanticLabel: btn.label,
                                  tooltip: btn.label,
                                )),
                          ],
                        ),
                      ),
                    ),
                    // Editor area
                    ConstrainedBox(
                      constraints: BoxConstraints(
                        minHeight: widget.minHeight,
                        maxHeight: widget.maxHeight,
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(FlowRefFrame.space4),
                        child: EditableText(
                          controller: _ctrl,
                          focusNode: _focus,
                          style: TextStyle(
                            fontSize: sys.paragraphMFontSize,
                            color: sys.textPrimary,
                            height: 1.5,
                          ),
                          cursorColor: sys.actionPrimary,
                          backgroundCursorColor: Colors.transparent,
                          maxLines: null,
                          onChanged: widget.onChanged,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
