/// FLOW Design System — FlowTransferList (L4 Pattern)
/// ──────────────────────────────────────────────────
/// Dual-list pattern for moving items between source and target lists.
/// Composes FlowButton, FlowIconButton, FlowTextInput, FlowCheckbox,
/// FlowText, FlowInline, FlowStack.
/// Maps to React's `<FlowTransferList>`.
import 'package:flutter/material.dart';

import '../components/controls/flow_button.dart';
import '../components/controls/flow_icon_button.dart';
import '../components/inputs/flow_text_input.dart';
import '../components/selection/flow_checkbox.dart';
import '../primitives/inline.dart';
import '../primitives/stack.dart';
import '../primitives/text.dart';
import '../theme/flow_size_provider.dart';
import '../tokens/density.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// An item in the transfer list.
class TransferItem {
  const TransferItem(
      {required this.id, required this.label, this.disabled = false});

  final String id;
  final String label;
  final bool disabled;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowTransferList
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowTransferList extends StatefulWidget {
  const FlowTransferList({
    super.key,
    this.sourceTitle = 'Available',
    this.targetTitle = 'Selected',
    required this.items,
    this.defaultTargetIds = const [],
    this.onChange,
    this.searchable = false,
    this.size,
  });

  final String sourceTitle;
  final String targetTitle;
  final List<TransferItem> items;
  final List<String> defaultTargetIds;
  final ValueChanged<List<String>>? onChange;
  final bool searchable;
  final FlowComponentSize? size;

  @override
  State<FlowTransferList> createState() => _FlowTransferListState();
}

class _FlowTransferListState extends State<FlowTransferList> {
  late Set<String> _targetIds;
  final Set<String> _sourceSelected = {};
  final Set<String> _targetSelected = {};
  String _sourceSearch = '';
  String _targetSearch = '';

  @override
  void initState() {
    super.initState();
    _targetIds = Set.of(widget.defaultTargetIds);
  }

  List<TransferItem> get _sourceItems =>
      widget.items.where((it) => !_targetIds.contains(it.id)).toList();

  List<TransferItem> get _targetItems =>
      widget.items.where((it) => _targetIds.contains(it.id)).toList();

  List<TransferItem> _filter(List<TransferItem> items, String query) {
    if (query.isEmpty) return items;
    final q = query.toLowerCase();
    return items.where((it) => it.label.toLowerCase().contains(q)).toList();
  }

  void _moveRight() {
    setState(() {
      _targetIds.addAll(_sourceSelected);
      _sourceSelected.clear();
    });
    widget.onChange?.call(_targetIds.toList());
  }

  void _moveLeft() {
    setState(() {
      _targetIds.removeAll(_targetSelected);
      _targetSelected.clear();
    });
    widget.onChange?.call(_targetIds.toList());
  }

  void _moveAllRight() {
    setState(() {
      _targetIds =
          widget.items.where((i) => !i.disabled).map((i) => i.id).toSet();
      _sourceSelected.clear();
    });
    widget.onChange?.call(_targetIds.toList());
  }

  void _moveAllLeft() {
    setState(() {
      _targetIds.clear();
      _targetSelected.clear();
    });
    widget.onChange?.call([]);
  }

  void _toggleInSet(Set<String> set, String id) {
    setState(() {
      if (set.contains(id)) {
        set.remove(id);
      } else {
        set.add(id);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final filteredSource = _filter(_sourceItems, _sourceSearch);
    final filteredTarget = _filter(_targetItems, _targetSearch);

    return Semantics(
      label: 'Transfer list',
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Expanded(
            child: _buildList(
              sys,
              title: widget.sourceTitle,
              items: filteredSource,
              selected: _sourceSelected,
              search: _sourceSearch,
              onSearchChanged: (v) => setState(() => _sourceSearch = v),
              semanticLabel: 'Available items',
            ),
          ),
          SizedBox(width: sys.gapTight),
          _buildControls(sys),
          SizedBox(width: sys.gapTight),
          Expanded(
            child: _buildList(
              sys,
              title: widget.targetTitle,
              items: filteredTarget,
              selected: _targetSelected,
              search: _targetSearch,
              onSearchChanged: (v) => setState(() => _targetSearch = v),
              semanticLabel: 'Selected items',
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildList(
    FlowSysTokens sys, {
    required String title,
    required List<TransferItem> items,
    required Set<String> selected,
    required String search,
    required ValueChanged<String> onSearchChanged,
    required String semanticLabel,
  }) {
    final resolvedSize = widget.size ?? FlowSizeProvider.of(context);
    final listHeight = resolvedSize == FlowComponentSize.sm
        ? 200.0
        : resolvedSize == FlowComponentSize.lg
            ? 360.0
            : 280.0;
    final itemHeight = resolvedSize == FlowComponentSize.sm
        ? 32.0
        : resolvedSize == FlowComponentSize.lg
            ? 44.0
            : 36.0;

    return Container(
      decoration: BoxDecoration(
        border: Border.all(color: sys.borderDefault, width: sys.borderThin),
        borderRadius: BorderRadius.circular(sys.radiusContainer),
      ),
      clipBehavior: Clip.hardEdge,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          // Header
          Container(
            padding: EdgeInsets.symmetric(
                horizontal: sys.gapComponent, vertical: sys.gapTight),
            color: sys.surfaceSecondary,
            child: FlowInline(
              mainAlign: MainAxisAlignment.spaceBetween,
              children: [
                FlowText(title, role: FlowTextRole.labelS),
                FlowText(
                  '${selected.length}/${items.length}',
                  role: FlowTextRole.caption,
                  color: FlowTextColor.secondary,
                ),
              ],
            ),
          ),
          // Search
          if (widget.searchable)
            Padding(
              padding: EdgeInsets.all(sys.gapTight),
              child: FlowTextInput(
                placeholder: 'Search...',
                initialValue: search,
                onChanged: onSearchChanged,
                size: FlowComponentSize.sm,
                semanticLabel: 'Search $title',
              ),
            ),
          // Item list
          Semantics(
            label: semanticLabel,
            child: SizedBox(
              height: listHeight,
              child: ListView.builder(
                itemCount: items.length,
                itemExtent: itemHeight,
                itemBuilder: (context, index) {
                  final item = items[index];
                  final isSel = selected.contains(item.id);
                  return Semantics(
                    selected: isSel,
                    enabled: !item.disabled,
                    child: GestureDetector(
                      onTap: item.disabled
                          ? null
                          : () => _toggleInSet(selected, item.id),
                      child: Container(
                        padding:
                            EdgeInsets.symmetric(horizontal: sys.gapComponent),
                        color: isSel
                            ? sys.surfaceAccent.withValues(alpha: 0.08)
                            : null,
                        child: FlowInline(
                          gap: sys.gapTight,
                          children: [
                            FlowCheckbox(
                              value: isSel,
                              disabled: item.disabled,
                              onChanged: (_) => _toggleInSet(selected, item.id),
                              size: FlowComponentSize.sm,
                            ),
                            Expanded(
                              child: FlowText(
                                item.label,
                                role: FlowTextRole.paragraphS,
                                color: item.disabled
                                    ? FlowTextColor.disabled
                                    : FlowTextColor.primary,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
          if (items.isEmpty)
            Padding(
              padding: EdgeInsets.all(sys.paddingControl),
              child: FlowText('No items',
                  role: FlowTextRole.caption, color: FlowTextColor.tertiary),
            ),
        ],
      ),
    );
  }

  Widget _buildControls(FlowSysTokens sys) {
    return FlowStack(
      gap: sys.gapTight,
      align: CrossAxisAlignment.center,
      children: [
        FlowButton(
          variant: FlowButtonVariant.outline,
          size: FlowComponentSize.sm,
          disabled: _sourceItems.isEmpty,
          onPressed: _moveAllRight,
          child: const FlowText('\u00BB', role: FlowTextRole.labelM),
        ),
        FlowIconButton(
          icon: Icons.chevron_right,
          size: FlowComponentSize.sm,
          variant: FlowIconButtonVariant.outline,
          disabled: _sourceSelected.isEmpty,
          onPressed: _moveRight,
          semanticLabel: 'Move selected right',
        ),
        FlowIconButton(
          icon: Icons.chevron_left,
          size: FlowComponentSize.sm,
          variant: FlowIconButtonVariant.outline,
          disabled: _targetSelected.isEmpty,
          onPressed: _moveLeft,
          semanticLabel: 'Move selected left',
        ),
        FlowButton(
          variant: FlowButtonVariant.outline,
          size: FlowComponentSize.sm,
          disabled: _targetItems.isEmpty,
          onPressed: _moveAllLeft,
          child: const FlowText('\u00AB', role: FlowTextRole.labelM),
        ),
      ],
    );
  }
}
