/// FLOW Design System — FlowSelect (L3 Component)
///
/// Custom dropdown select with floating label and rich option rendering.
/// Mirrors React's FlowSelect.
import 'package:flutter/material.dart';

import '../../tokens/comp_tokens.dart';
import '../../tokens/density.dart';
import '../../primitives/text.dart';
import '../../primitives/icon.dart';
import '../../primitives/surface.dart';
import '../../theme/flow_size_provider.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSelectOption
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowSelectOption {
  const FlowSelectOption({
    required this.value,
    required this.label,
    this.icon,
    this.disabled = false,
  });

  final String value;
  final String label;
  final IconData? icon;
  final bool disabled;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSelect
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowSelect extends StatefulWidget {
  const FlowSelect({
    super.key,
    required this.label,
    required this.options,
    this.value,
    this.onChanged,
    this.placeholder,
    this.hint,
    this.error,
    this.success = false,
    this.size,
    this.disabled = false,
    this.required = false,
    this.semanticLabel,
  });

  final String label;
  final List<FlowSelectOption> options;
  final String? value;
  final ValueChanged<String>? onChanged;
  final String? placeholder;
  final String? hint;
  final String? error;
  final bool success;
  final FlowComponentSize? size;
  final bool disabled;
  final bool required;
  final String? semanticLabel;

  @override
  State<FlowSelect> createState() => _FlowSelectState();
}

class _FlowSelectState extends State<FlowSelect> {
  final _overlayController = OverlayPortalController();
  final _triggerKey = GlobalKey();
  FlowSelectOption? get _selectedOption {
    if (widget.value == null) return null;
    return widget.options.where((o) => o.value == widget.value).firstOrNull;
  }

  void _toggle() {
    if (widget.disabled) return;
    if (_overlayController.isShowing) {
      _overlayController.hide();
    } else {
      _overlayController.show();
    }
  }

  void _selectOption(FlowSelectOption opt) {
    if (opt.disabled) return;
    widget.onChanged?.call(opt.value);
    _overlayController.hide();
  }

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final ti = comp.textInput;
    final resolvedSize = widget.size ?? FlowSizeProvider.of(context);

    final isError = widget.error != null;
    final isSuccess = widget.success && !isError;
    final hasValue = _selectedOption != null;
    final borderColor = isError
        ? ti.borderError
        : isSuccess
            ? ti.borderFocus
            : ti.border;

    final height = _heightForSize(ti, resolvedSize);
    final labelText = widget.required ? '${widget.label} *' : widget.label;

    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        OverlayPortal(
          controller: _overlayController,
          overlayChildBuilder: (_) => _buildDropdown(context, comp),
          child: Semantics(
            label: widget.semanticLabel ?? widget.label,
            button: true,
            enabled: !widget.disabled,
            child: GestureDetector(
              onTap: _toggle,
              child: Opacity(
                opacity: widget.disabled ? 0.5 : 1.0,
                child: Container(
                  key: _triggerKey,
                  height: height,
                  padding: EdgeInsets.symmetric(horizontal: ti.padding),
                  decoration: BoxDecoration(
                    color: ti.bg,
                    borderRadius: BorderRadius.circular(ti.radius),
                    border:
                        Border.all(color: borderColor, width: ti.borderWidth),
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            FlowText(
                              labelText,
                              role: FlowTextRole.caption,
                              color: FlowTextColor.secondary,
                            ),
                            if (hasValue)
                              FlowText(
                                _selectedOption!.label,
                                role: FlowTextRole.labelM,
                              )
                            else if (widget.placeholder != null)
                              FlowText(
                                widget.placeholder!,
                                role: FlowTextRole.labelM,
                                color: FlowTextColor.tertiary,
                              ),
                          ],
                        ),
                      ),
                      FlowIcon(Icons.keyboard_arrow_down,
                          size: FlowIconSize.sm),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
        if (widget.error != null || widget.hint != null) ...[
          SizedBox(height: ti.gap),
          Row(
            children: [
              if (isError)
                Padding(
                  padding: EdgeInsets.only(right: ti.contentGap),
                  child: FlowIcon(Icons.warning_amber,
                      size: FlowIconSize.xs, colorRole: FlowIconColor.error),
                ),
              Flexible(
                child: FlowText(
                  widget.error ?? widget.hint ?? '',
                  role: FlowTextRole.caption,
                  color:
                      isError ? FlowTextColor.danger : FlowTextColor.secondary,
                ),
              ),
            ],
          ),
        ],
      ],
    );
  }

  Widget _buildDropdown(BuildContext ctx, FlowCompTokens comp) {
    final renderBox =
        _triggerKey.currentContext?.findRenderObject() as RenderBox?;
    if (renderBox == null) return const SizedBox.shrink();

    final offset = renderBox.localToGlobal(Offset.zero);
    final triggerSize = renderBox.size;
    final ti = comp.textInput;

    return Stack(
      children: [
        // Dismiss layer
        Positioned.fill(
          child: GestureDetector(
            behavior: HitTestBehavior.opaque,
            onTap: () => _overlayController.hide(),
            child: const ColoredBox(color: Colors.transparent),
          ),
        ),
        Positioned(
          left: offset.dx,
          top: offset.dy + triggerSize.height + ti.gap,
          width: triggerSize.width,
          child: Material(
            elevation: 0,
            color: Colors.transparent,
            child: FlowSurface(
              elevation: 2,
              padding: 4.0,
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxHeight: 280),
                child: ListView.builder(
                  padding: EdgeInsets.zero,
                  shrinkWrap: true,
                  itemCount: widget.options.length,
                  itemBuilder: (_, i) {
                    final opt = widget.options[i];
                    final isSelected = opt.value == widget.value;
                    return _OptionTile(
                      option: opt,
                      isSelected: isSelected,
                      onTap: () => _selectOption(opt),
                    );
                  },
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  double _heightForSize(FlowCompTextInput ti, FlowComponentSize size) {
    switch (size) {
      case FlowComponentSize.sm:
        return ti.heightSm;
      case FlowComponentSize.md:
        return ti.heightMd;
      case FlowComponentSize.lg:
        return ti.heightLg;
      case FlowComponentSize.xl:
        return ti.heightXl;
    }
  }
}

class _OptionTile extends StatefulWidget {
  const _OptionTile({
    required this.option,
    required this.isSelected,
    required this.onTap,
  });

  final FlowSelectOption option;
  final bool isSelected;
  final VoidCallback onTap;

  @override
  State<_OptionTile> createState() => _OptionTileState();
}

class _OptionTileState extends State<_OptionTile> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final list = comp.list;

    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: GestureDetector(
        onTap: widget.option.disabled ? null : widget.onTap,
        behavior: HitTestBehavior.opaque,
        child: Semantics(
          selected: widget.isSelected,
          enabled: !widget.option.disabled,
          child: Container(
            padding: EdgeInsets.symmetric(
              horizontal: list.itemPaddingX,
              vertical: list.itemPaddingY,
            ),
            decoration: BoxDecoration(
              color: _hovered ? list.itemBgHover : Colors.transparent,
              borderRadius: BorderRadius.circular(list.radius),
            ),
            child: Row(
              children: [
                if (widget.option.icon != null)
                  Padding(
                    padding: EdgeInsets.only(right: list.gap),
                    child: FlowIcon(widget.option.icon!, size: FlowIconSize.sm),
                  ),
                Expanded(
                  child: FlowText(
                    widget.option.label,
                    role: FlowTextRole.labelM,
                    color:
                        widget.option.disabled ? FlowTextColor.disabled : null,
                  ),
                ),
                if (widget.isSelected)
                  FlowIcon(Icons.check,
                      size: FlowIconSize.sm, colorRole: FlowIconColor.action),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
