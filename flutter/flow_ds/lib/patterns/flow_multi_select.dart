/// FLOW Design System — FlowMultiSelect (L4 Pattern)
/// Multi-select dropdown with chip display, search, select-all, and grouped options.
/// Composes FlowTextInput, FlowChip, FlowCheckbox, FlowButton, FlowIconButton (L3).
/// Source: FlowMultiSelect.tsx
import 'package:flutter/material.dart';

import '../components/controls/flow_button.dart';
import '../components/controls/flow_icon_button.dart';
import '../components/display/flow_chip.dart';
import '../components/inputs/flow_text_input.dart';
import '../components/selection/flow_checkbox.dart';
import '../primitives/icon.dart';
import '../primitives/text.dart';
import '../tokens/density.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// A single option for the multi-select.
class FlowMultiSelectOption {
  const FlowMultiSelectOption({
    required this.value,
    required this.label,
    this.icon,
    this.disabled = false,
    this.group,
  });

  final String value;
  final String label;
  final IconData? icon;
  final bool disabled;
  final String? group;
}

/// Multi-select dropdown with chip display, search, and grouped options.
class FlowMultiSelect extends StatefulWidget {
  const FlowMultiSelect({
    super.key,
    required this.label,
    required this.options,
    this.value,
    this.initialValue,
    this.onChanged,
    this.placeholder = 'Select options...',
    this.hint,
    this.error,
    this.success = false,
    this.loading = false,
    this.size,
    this.disabled = false,
    this.readOnly = false,
    this.required = false,
    this.searchable = true,
    this.maxDisplayChips = 3,
    this.semanticLabel,
  });

  final String label;
  final List<FlowMultiSelectOption> options;
  final List<String>? value;
  final List<String>? initialValue;
  final void Function(List<String> values, List<FlowMultiSelectOption> opts)?
      onChanged;
  final String placeholder;
  final String? hint;
  final String? error;
  final bool success;
  final bool loading;
  final FlowComponentSize? size;
  final bool disabled;
  final bool readOnly;
  final bool required;
  final bool searchable;
  final int maxDisplayChips;
  final String? semanticLabel;

  @override
  State<FlowMultiSelect> createState() => _FlowMultiSelectState();
}

class _FlowMultiSelectState extends State<FlowMultiSelect> {
  final LayerLink _layerLink = LayerLink();
  final TextEditingController _searchCtrl = TextEditingController();
  final FocusNode _searchFocus = FocusNode();
  OverlayEntry? _overlay;
  List<String> _internal = [];
  bool _open = false;
  String _searchText = '';

  bool get _isControlled => widget.value != null;
  List<String> get _current => _isControlled ? widget.value! : _internal;
  bool get _isErr => widget.error?.isNotEmpty == true;
  bool get _isOk => widget.success && !_isErr;

  @override
  void initState() {
    super.initState();
    _internal = List<String>.from(widget.initialValue ?? []);
  }

  @override
  void dispose() {
    _removeOverlay();
    _searchCtrl.dispose();
    _searchFocus.dispose();
    super.dispose();
  }

  void _toggle(FlowMultiSelectOption opt) {
    if (opt.disabled || widget.disabled || widget.readOnly) return;
    final isSelected = _current.contains(opt.value);
    final next = isSelected
        ? _current.where((v) => v != opt.value).toList()
        : [..._current, opt.value];
    _apply(next);
  }

  void _remove(String val) {
    if (widget.disabled || widget.readOnly) return;
    _apply(_current.where((v) => v != val).toList());
  }

  void _clearAll() {
    if (widget.disabled || widget.readOnly) return;
    _apply([]);
  }

  void _selectAll() {
    if (widget.disabled || widget.readOnly) return;
    _apply(
        widget.options.where((o) => !o.disabled).map((o) => o.value).toList());
  }

  void _apply(List<String> next) {
    if (!_isControlled) setState(() => _internal = next);
    widget.onChanged?.call(
      next,
      widget.options.where((o) => next.contains(o.value)).toList(),
    );
    _updateOverlay();
  }

  void _openDropdown() {
    if (widget.disabled || widget.readOnly) return;
    setState(() {
      _open = true;
      _searchText = '';
      _searchCtrl.clear();
    });
    _showOverlay();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _searchFocus.requestFocus();
    });
  }

  void _closeDropdown() {
    _removeOverlay();
    setState(() {
      _open = false;
      _searchText = '';
    });
  }

  void _showOverlay() {
    _removeOverlay();
    _overlay = OverlayEntry(builder: (_) => _buildDropdown());
    Overlay.of(context).insert(_overlay!);
  }

  void _updateOverlay() => _overlay?.markNeedsBuild();
  void _removeOverlay() {
    _overlay?.remove();
    _overlay = null;
  }

  List<FlowMultiSelectOption> get _filteredOptions {
    if (_searchText.isEmpty) return widget.options;
    final q = _searchText.toLowerCase();
    return widget.options
        .where((o) =>
            o.label.toLowerCase().contains(q) ||
            o.value.toLowerCase().contains(q) ||
            (o.group?.toLowerCase().contains(q) ?? false))
        .toList();
  }

  Widget _buildDropdown() {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final filtered = _filteredOptions;
    final enabled = widget.options.where((o) => !o.disabled).length;

    return Positioned(
      width: context.size?.width ?? 300,
      child: CompositedTransformFollower(
        link: _layerLink,
        showWhenUnlinked: false,
        offset: Offset(0, (context.size?.height ?? 56) + FlowRefFrame.space1),
        child: TapRegion(
          onTapOutside: (_) => _closeDropdown(),
          child: Material(
            elevation: 4,
            borderRadius: BorderRadius.circular(FlowRefFrame.radius3),
            color: sys.surfacePrimary,
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxHeight: 320),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (widget.searchable)
                    Padding(
                      padding: const EdgeInsets.all(FlowRefFrame.space2),
                      child: FlowTextInput(
                        controller: _searchCtrl,
                        focusNode: _searchFocus,
                        placeholder: 'Search...',
                        leadingIcon: Icons.search,
                        size: FlowComponentSize.sm,
                        onChanged: (v) {
                          _searchText = v;
                          _updateOverlay();
                        },
                        clearable: true,
                        onClear: () {
                          _searchText = '';
                          _searchCtrl.clear();
                          _updateOverlay();
                          _searchFocus.requestFocus();
                        },
                      ),
                    ),
                  Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: FlowRefFrame.space2,
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        FlowButton(
                          variant: FlowButtonVariant.ghost,
                          size: FlowComponentSize.sm,
                          onPressed: _selectAll,
                          child: const Text('Select all'),
                        ),
                        FlowButton(
                          variant: FlowButtonVariant.ghost,
                          size: FlowComponentSize.sm,
                          onPressed: _clearAll,
                          child: const Text('Clear all'),
                        ),
                      ],
                    ),
                  ),
                  Flexible(
                    child: filtered.isEmpty
                        ? Padding(
                            padding: const EdgeInsets.all(FlowRefFrame.space4),
                            child: FlowText(
                              'No options found',
                              role: FlowTextRole.paragraphS,
                              color: FlowTextColor.tertiary,
                            ),
                          )
                        : ListView.builder(
                            shrinkWrap: true,
                            padding: EdgeInsets.zero,
                            itemCount: filtered.length,
                            itemBuilder: (ctx, i) {
                              final opt = filtered[i];
                              final isSelected = _current.contains(opt.value);
                              return Semantics(
                                selected: isSelected,
                                enabled: !opt.disabled,
                                child: GestureDetector(
                                  onTap: () => _toggle(opt),
                                  child: Container(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: FlowRefFrame.space3,
                                      vertical: FlowRefFrame.space2,
                                    ),
                                    child: Opacity(
                                      opacity: opt.disabled ? 0.5 : 1.0,
                                      child: Row(
                                        children: [
                                          FlowCheckbox(
                                            value: isSelected,
                                            onChanged: (_) => _toggle(opt),
                                            size: FlowComponentSize.sm,
                                            disabled: opt.disabled,
                                          ),
                                          SizedBox(width: FlowRefFrame.space2),
                                          if (opt.icon != null) ...[
                                            FlowIcon(opt.icon!,
                                                size: FlowIconSize.sm),
                                            SizedBox(
                                                width: FlowRefFrame.space2),
                                          ],
                                          Expanded(
                                            child: FlowText(
                                              opt.label,
                                              role: FlowTextRole.paragraphS,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                              );
                            },
                          ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      vertical: FlowRefFrame.space2,
                    ),
                    decoration: BoxDecoration(
                      border: Border(
                        top: BorderSide(color: sys.borderSubtle),
                      ),
                    ),
                    child: Center(
                      child: FlowText(
                        '${_current.length} of $enabled selected',
                        role: FlowTextRole.caption,
                        color: FlowTextColor.secondary,
                      ),
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

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final selectedOpts =
        widget.options.where((o) => _current.contains(o.value)).toList();
    final hasValue = _current.isNotEmpty;

    return CompositedTransformTarget(
      link: _layerLink,
      child: Semantics(
        label: widget.semanticLabel ?? widget.label,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: [
            Padding(
              padding: const EdgeInsets.only(bottom: FlowRefFrame.space1),
              child: FlowText(
                '${widget.label}${widget.required ? ' *' : ''}',
                role: FlowTextRole.labelS,
                color: FlowTextColor.secondary,
              ),
            ),
            GestureDetector(
              onTap: () => _open ? _closeDropdown() : _openDropdown(),
              child: Container(
                constraints: const BoxConstraints(minHeight: 48),
                padding: const EdgeInsets.symmetric(
                  horizontal: FlowRefFrame.space3,
                  vertical: FlowRefFrame.space2,
                ),
                decoration: BoxDecoration(
                  color: widget.disabled
                      ? sys.stateDisabledBg
                      : sys.surfacePrimary,
                  borderRadius: BorderRadius.circular(FlowRefFrame.radius3),
                  border: Border.all(
                    color: _isErr
                        ? sys.borderDanger
                        : _open
                            ? sys.borderFocus
                            : sys.borderControl,
                  ),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: hasValue
                          ? Wrap(
                              spacing: FlowRefFrame.space1,
                              runSpacing: FlowRefFrame.space1,
                              children: [
                                ...selectedOpts
                                    .take(widget.maxDisplayChips)
                                    .map(
                                      (o) => FlowChip(
                                        label: o.label,
                                        size: FlowChipSize.sm,
                                        removable: !widget.disabled &&
                                            !widget.readOnly,
                                        onRemove: () => _remove(o.value),
                                      ),
                                    ),
                                if (selectedOpts.length >
                                    widget.maxDisplayChips)
                                  FlowChip(
                                    label:
                                        '+${selectedOpts.length - widget.maxDisplayChips} more',
                                    size: FlowChipSize.sm,
                                  ),
                              ],
                            )
                          : FlowText(
                              widget.placeholder,
                              role: FlowTextRole.labelM,
                              color: FlowTextColor.tertiary,
                            ),
                    ),
                    if (widget.loading)
                      SizedBox(
                        width: FlowRefFrame.space4,
                        height: FlowRefFrame.space4,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          color: sys.actionPrimary,
                        ),
                      )
                    else ...[
                      if (hasValue && !widget.disabled && !widget.readOnly)
                        FlowIconButton(
                          icon: Icons.close,
                          size: FlowComponentSize.sm,
                          variant: FlowIconButtonVariant.ghost,
                          onPressed: _clearAll,
                          semanticLabel: 'Clear all',
                        ),
                      FlowIcon(
                        _open
                            ? Icons.keyboard_arrow_up
                            : Icons.keyboard_arrow_down,
                        size: FlowIconSize.sm,
                        iconColor: sys.textSecondary,
                      ),
                    ],
                  ],
                ),
              ),
            ),
            if (widget.hint != null || _isErr || _isOk)
              Padding(
                padding: const EdgeInsets.only(top: FlowRefFrame.space1),
                child: Row(
                  children: [
                    if (_isErr)
                      FlowIcon(Icons.warning_amber_rounded,
                          size: FlowIconSize.sm, iconColor: sys.statusError),
                    if (_isOk)
                      FlowIcon(Icons.check_circle_outline,
                          size: FlowIconSize.sm, iconColor: sys.statusSuccess),
                    if (_isErr || _isOk) SizedBox(width: FlowRefFrame.space1),
                    Expanded(
                      child: FlowText(
                        _isErr ? widget.error! : (widget.hint ?? 'Valid'),
                        role: FlowTextRole.caption,
                        color: _isErr
                            ? FlowTextColor.danger
                            : _isOk
                                ? FlowTextColor.success
                                : FlowTextColor.tertiary,
                      ),
                    ),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }
}
