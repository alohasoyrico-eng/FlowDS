/// FLOW Design System — FlowCountrySelect (L3 Component)
///
/// Combobox country picker with flag prefix and inline search dropdown.
/// Mirrors React's FlowCountrySelect.
import 'package:flutter/material.dart';

import '../../tokens/comp_tokens.dart';
import '../../tokens/density.dart';
import '../../primitives/text.dart';
import '../../primitives/icon.dart';
import '../../theme/flow_size_provider.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowCountryEntry
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCountryEntry {
  const FlowCountryEntry({
    required this.code,
    required this.name,
    this.dial,
    this.emoji,
  });

  final String code;
  final String name;
  final String? dial;
  final String? emoji;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowCountrySelect
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCountrySelect extends StatefulWidget {
  const FlowCountrySelect({
    super.key,
    required this.label,
    required this.countries,
    this.value,
    this.onChanged,
    this.hint,
    this.error,
    this.success = false,
    this.size,
    this.disabled = false,
    this.required = false,
    this.semanticLabel,
  });

  final String label;
  final List<FlowCountryEntry> countries;
  final String? value;
  final ValueChanged<FlowCountryEntry>? onChanged;
  final String? hint;
  final String? error;
  final bool success;
  final FlowComponentSize? size;
  final bool disabled;
  final bool required;
  final String? semanticLabel;

  @override
  State<FlowCountrySelect> createState() => _FlowCountrySelectState();
}

class _FlowCountrySelectState extends State<FlowCountrySelect> {
  final _overlayController = OverlayPortalController();
  final _triggerKey = GlobalKey();
  final _searchController = TextEditingController();
  String _search = '';

  FlowCountryEntry? get _selectedCountry {
    if (widget.value == null) return null;
    return widget.countries.where((c) => c.code == widget.value).firstOrNull;
  }

  List<FlowCountryEntry> get _filteredCountries {
    if (_search.isEmpty) return widget.countries;
    final q = _search.toLowerCase();
    return widget.countries
        .where((c) =>
            c.name.toLowerCase().contains(q) ||
            c.code.toLowerCase().contains(q))
        .toList();
  }

  void _toggle() {
    if (widget.disabled) return;
    if (_overlayController.isShowing) {
      _overlayController.hide();
      _searchController.clear();
      setState(() => _search = '');
    } else {
      _overlayController.show();
    }
  }

  void _selectCountry(FlowCountryEntry entry) {
    widget.onChanged?.call(entry);
    _overlayController.hide();
    _searchController.clear();
    setState(() => _search = '');
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final ti = comp.textInput;
    final cs = comp.countrySelect;
    final resolvedSize = widget.size ?? FlowSizeProvider.of(context);

    final isError = widget.error != null;
    final borderColor = isError ? ti.borderError : ti.border;
    final height = _heightForSize(ti, resolvedSize);
    final labelText = widget.required ? '${widget.label} *' : widget.label;
    final country = _selectedCountry;

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
                      // Flag emoji
                      if (country?.emoji != null)
                        Padding(
                          padding: EdgeInsets.only(right: ti.contentGap),
                          child: Text(
                            country!.emoji!,
                            style: TextStyle(fontSize: ti.valueSizeMd),
                          ),
                        ),
                      // Label + country name
                      Expanded(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            FlowText(labelText,
                                role: FlowTextRole.caption,
                                color: FlowTextColor.secondary),
                            if (country != null)
                              FlowText(country.name, role: FlowTextRole.labelM),
                          ],
                        ),
                      ),
                      // Chevron
                      FlowIcon(
                        Icons.keyboard_arrow_down,
                        size: FlowIconSize.sm,
                        iconColor: widget.disabled
                            ? cs.chevronDisabled
                            : cs.chevronColor,
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
        // Hint / error
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
    final cd = comp.countryDropdown;
    final ti = comp.textInput;

    return Stack(
      children: [
        Positioned.fill(
          child: GestureDetector(
            behavior: HitTestBehavior.opaque,
            onTap: () {
              _overlayController.hide();
              _searchController.clear();
              setState(() => _search = '');
            },
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
            child: Container(
              constraints: BoxConstraints(maxHeight: cd.maxHeight),
              decoration: BoxDecoration(
                color: cd.bg,
                borderRadius: BorderRadius.circular(cd.radius),
                boxShadow: cd.shadow,
              ),
              child: StatefulBuilder(
                builder: (context, setInnerState) {
                  return Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      // Search field
                      Padding(
                        padding: EdgeInsets.all(ti.padding / 2),
                        child: TextField(
                          controller: _searchController,
                          autofocus: true,
                          decoration: InputDecoration(
                            hintText: 'Search countries...',
                            isDense: true,
                            border: InputBorder.none,
                            contentPadding: EdgeInsets.symmetric(
                              horizontal: ti.padding / 2,
                              vertical: ti.gap,
                            ),
                          ),
                          onChanged: (v) {
                            setInnerState(() {});
                            setState(() => _search = v);
                          },
                        ),
                      ),
                      Flexible(
                        child: ListView.builder(
                          padding: EdgeInsets.zero,
                          shrinkWrap: true,
                          itemCount: _filteredCountries.length,
                          itemExtent: cd.itemHeight,
                          itemBuilder: (_, i) {
                            final entry = _filteredCountries[i];
                            final isSelected = entry.code == widget.value;
                            return _CountryTile(
                              entry: entry,
                              isSelected: isSelected,
                              hoverColor: cd.itemHoverColor,
                              onTap: () => _selectCountry(entry),
                            );
                          },
                        ),
                      ),
                    ],
                  );
                },
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// _CountryTile
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class _CountryTile extends StatefulWidget {
  const _CountryTile({
    required this.entry,
    required this.isSelected,
    required this.hoverColor,
    required this.onTap,
  });

  final FlowCountryEntry entry;
  final bool isSelected;
  final Color hoverColor;
  final VoidCallback onTap;

  @override
  State<_CountryTile> createState() => _CountryTileState();
}

class _CountryTileState extends State<_CountryTile> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: GestureDetector(
        onTap: widget.onTap,
        behavior: HitTestBehavior.opaque,
        child: Semantics(
          selected: widget.isSelected,
          child: Container(
            color: _hovered ? widget.hoverColor : Colors.transparent,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: Row(
              children: [
                if (widget.entry.emoji != null)
                  Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: Text(widget.entry.emoji!,
                        style: const TextStyle(fontSize: 18)),
                  ),
                Expanded(
                  child: FlowText(widget.entry.name, role: FlowTextRole.labelM),
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
