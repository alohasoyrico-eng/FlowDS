/// FLOW Design System — FlowCommandPalette (L4 Pattern)
/// ─────────────────────────────────────────────────────
/// Keyboard-driven command launcher with typeahead search and grouped results.
/// Composes FlowTextInput, FlowIcon, FlowText, FlowStack, FlowInline (L2/L3).
///
/// Maps to React's `<FlowCommandPalette>` from FlowCommandPalette.tsx.
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../components/inputs/flow_text_input.dart';
import '../primitives/icon.dart';
import '../primitives/text.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Data
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// A single command entry.
class FlowCommandItem {
  const FlowCommandItem({
    required this.id,
    required this.label,
    this.icon,
    this.shortcut,
    this.group,
    this.disabled = false,
    this.onAction,
  });

  final String id;
  final String label;
  final IconData? icon;
  final String? shortcut;
  final String? group;
  final bool disabled;
  final VoidCallback? onAction;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Widget
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCommandPalette extends StatefulWidget {
  const FlowCommandPalette({
    super.key,
    required this.open,
    required this.onClose,
    required this.commands,
    this.placeholder = 'Type a command...',
    this.emptyMessage = 'No results found',
    this.onSelect,
  });

  /// Whether the palette is open.
  final bool open;

  /// Called when the palette should close.
  final VoidCallback onClose;

  /// Available commands.
  final List<FlowCommandItem> commands;

  /// Search input placeholder.
  final String placeholder;

  /// Message when no commands match.
  final String emptyMessage;

  /// Called when a command is selected.
  final ValueChanged<FlowCommandItem>? onSelect;

  @override
  State<FlowCommandPalette> createState() => _FlowCommandPaletteState();
}

class _FlowCommandPaletteState extends State<FlowCommandPalette> {
  final _controller = TextEditingController();
  final _focusNode = FocusNode();
  int _activeIdx = 0;

  List<FlowCommandItem> get _filtered {
    final q = _controller.text.toLowerCase().trim();
    final enabled = widget.commands.where((c) => !c.disabled);
    if (q.isEmpty) return enabled.toList();
    return enabled.where((c) => c.label.toLowerCase().contains(q)).toList();
  }

  Map<String, List<FlowCommandItem>> get _grouped {
    final map = <String, List<FlowCommandItem>>{};
    for (final cmd in _filtered) {
      final g = cmd.group ?? '';
      map.putIfAbsent(g, () => []).add(cmd);
    }
    return map;
  }

  void _select(FlowCommandItem cmd) {
    cmd.onAction?.call();
    widget.onSelect?.call(cmd);
    widget.onClose();
  }

  @override
  void didUpdateWidget(FlowCommandPalette old) {
    super.didUpdateWidget(old);
    if (widget.open && !old.open) {
      _controller.clear();
      _activeIdx = 0;
      WidgetsBinding.instance.addPostFrameCallback((_) {
        _focusNode.requestFocus();
      });
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  KeyEventResult _handleKey(FocusNode _, KeyEvent event) {
    if (event is! KeyDownEvent && event is! KeyRepeatEvent) {
      return KeyEventResult.ignored;
    }
    final filtered = _filtered;
    if (event.logicalKey == LogicalKeyboardKey.arrowDown) {
      setState(() {
        _activeIdx = (_activeIdx + 1).clamp(0, filtered.length - 1);
      });
      return KeyEventResult.handled;
    }
    if (event.logicalKey == LogicalKeyboardKey.arrowUp) {
      setState(() {
        _activeIdx = (_activeIdx - 1).clamp(0, filtered.length - 1);
      });
      return KeyEventResult.handled;
    }
    if (event.logicalKey == LogicalKeyboardKey.enter) {
      if (filtered.isNotEmpty && _activeIdx < filtered.length) {
        _select(filtered[_activeIdx]);
      }
      return KeyEventResult.handled;
    }
    if (event.logicalKey == LogicalKeyboardKey.escape) {
      widget.onClose();
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }

  @override
  Widget build(BuildContext context) {
    if (!widget.open) return const SizedBox.shrink();

    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final filtered = _filtered;
    final grouped = _grouped;

    return Semantics(
      scopesRoute: true,
      namesRoute: true,
      label: 'Command palette',
      child: GestureDetector(
        onTap: widget.onClose,
        child: ColoredBox(
          color: sys.surfacePrimary.withOpacity(0.6),
          child: Align(
            alignment: const Alignment(0, -0.4),
            child: GestureDetector(
              onTap: () {}, // absorb
              child: SizedBox(
                width: 540,
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    color: sys.surfacePrimary,
                    borderRadius: BorderRadius.circular(sys.radiusContainer),
                    border: Border.fromBorderSide(BorderSide(
                        color: sys.borderDefault, width: sys.borderThin)),
                    boxShadow: sys.depthElevationHigh,
                  ),
                  child: Focus(
                    onKeyEvent: _handleKey,
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        // Search
                        Padding(
                          padding: EdgeInsets.all(sys.paddingControl),
                          child: FlowTextInput(
                            controller: _controller,
                            focusNode: _focusNode,
                            placeholder: widget.placeholder,
                            leadingIcon: Icons.search,
                            onChanged: (_) => setState(() => _activeIdx = 0),
                          ),
                        ),
                        DecoratedBox(
                          decoration: BoxDecoration(
                            border: Border(
                              top: BorderSide(
                                  color: sys.borderSubtle,
                                  width: sys.borderThin),
                            ),
                          ),
                          child: const SizedBox(width: double.infinity),
                        ),
                        // Results
                        ConstrainedBox(
                          constraints: const BoxConstraints(maxHeight: 360),
                          child: filtered.isEmpty
                              ? Padding(
                                  padding: EdgeInsets.all(sys.paddingSurface),
                                  child: FlowText(widget.emptyMessage,
                                      role: FlowTextRole.paragraphS,
                                      color: FlowTextColor.tertiary,
                                      align: TextAlign.center),
                                )
                              : ListView(
                                  shrinkWrap: true,
                                  padding: EdgeInsets.all(sys.gapTight / 2),
                                  children: grouped.entries.expand((entry) {
                                    final group = entry.key;
                                    final items = entry.value;
                                    return [
                                      if (group.isNotEmpty)
                                        Padding(
                                          padding: EdgeInsets.symmetric(
                                              horizontal: sys.paddingControl,
                                              vertical: sys.gapTight),
                                          child: FlowText(group,
                                              role: FlowTextRole.overline,
                                              color: FlowTextColor.tertiary),
                                        ),
                                      ...items.map((cmd) {
                                        final idx = filtered.indexOf(cmd);
                                        final isActive = idx == _activeIdx;
                                        return _CommandRow(
                                          cmd: cmd,
                                          isActive: isActive,
                                          onTap: () => _select(cmd),
                                          onHover: () =>
                                              setState(() => _activeIdx = idx),
                                        );
                                      }),
                                    ];
                                  }).toList(),
                                ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Command row
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class _CommandRow extends StatelessWidget {
  const _CommandRow({
    required this.cmd,
    required this.isActive,
    required this.onTap,
    required this.onHover,
  });

  final FlowCommandItem cmd;
  final bool isActive;
  final VoidCallback onTap;
  final VoidCallback onHover;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    return Semantics(
      selected: isActive,
      child: MouseRegion(
        onEnter: (_) => onHover(),
        child: GestureDetector(
          onTap: onTap,
          child: DecoratedBox(
            decoration: BoxDecoration(
              color: isActive ? sys.surfaceAccent : Colors.transparent,
              borderRadius: BorderRadius.circular(sys.radiusSm),
            ),
            child: Padding(
              padding: EdgeInsets.symmetric(
                horizontal: sys.paddingControl,
                vertical: sys.gapTight,
              ),
              child: Row(
                children: [
                  if (cmd.icon != null) ...[
                    FlowIcon(cmd.icon!, size: FlowIconSize.sm),
                    SizedBox(width: sys.gapTight),
                  ],
                  Expanded(
                    child: FlowText(cmd.label, role: FlowTextRole.paragraphS),
                  ),
                  if (cmd.shortcut != null)
                    DecoratedBox(
                      decoration: BoxDecoration(
                        color: sys.surfaceSecondary,
                        borderRadius: BorderRadius.circular(sys.radiusSm),
                        border: Border.fromBorderSide(BorderSide(
                            color: sys.borderSubtle, width: sys.borderThin)),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 5, vertical: 1),
                        child: FlowText(cmd.shortcut!,
                            role: FlowTextRole.caption,
                            color: FlowTextColor.tertiary),
                      ),
                    ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
