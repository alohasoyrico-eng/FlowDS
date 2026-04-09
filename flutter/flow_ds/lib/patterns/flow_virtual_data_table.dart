/// FLOW Design System — FlowVirtualDataTable (L4 Pattern)
/// ──────────────────────────────────────────────────────
/// Virtualized data table with sorting, filtering, and row selection.
/// Composes FlowSurface, FlowText, FlowIcon, FlowCheckbox, FlowTextInput,
/// FlowIconButton, FlowInline.
/// Maps to React's `<FlowVirtualDataTable>`.
import 'package:flutter/material.dart';

import '../components/feedback/flow_circular_progress.dart';
import '../components/inputs/flow_text_input.dart';
import '../components/selection/flow_checkbox.dart';
import '../primitives/icon.dart';
import '../primitives/inline.dart';
import '../primitives/surface.dart';
import '../primitives/text.dart';
import '../theme/flow_size_provider.dart';
import '../tokens/density.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Column definition for virtual data table.
class VirtualDataTableColumn<T> {
  const VirtualDataTableColumn({
    required this.key,
    this.header,
    this.width,
    this.minWidth,
    this.align = Alignment.centerLeft,
    this.sortable = false,
    this.sortFn,
    this.render,
  });

  final String key;
  final String? header;
  final double? width;
  final double? minWidth;
  final Alignment align;
  final bool sortable;
  final int Function(T a, T b)? sortFn;
  final Widget Function(T row, int index)? render;
}

enum _VSortDir { asc, desc }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowVirtualDataTable
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowVirtualDataTable<T> extends StatefulWidget {
  const FlowVirtualDataTable({
    super.key,
    required this.columns,
    required this.data,
    required this.rowKey,
    this.rowHeight,
    this.height = 480.0,
    this.overscan = 5,
    this.selectable = false,
    this.selectedKeys,
    this.onSelectionChange,
    this.searchable = false,
    this.searchPlaceholder = 'Filter...',
    this.size,
    this.striped = false,
    this.hoverable = true,
    this.loading = false,
    this.emptyMessage = 'No data',
    this.caption,
    this.toolbarActions,
    this.semanticLabel,
  });

  final List<VirtualDataTableColumn<T>> columns;
  final List<T> data;
  final String Function(T row, int index) rowKey;
  final double? rowHeight;
  final double height;
  final int overscan;
  final bool selectable;
  final Set<String>? selectedKeys;
  final ValueChanged<Set<String>>? onSelectionChange;
  final bool searchable;
  final String searchPlaceholder;
  final FlowComponentSize? size;
  final bool striped;
  final bool hoverable;
  final bool loading;
  final String emptyMessage;
  final String? caption;
  final Widget? toolbarActions;
  final String? semanticLabel;

  @override
  State<FlowVirtualDataTable<T>> createState() =>
      _FlowVirtualDataTableState<T>();
}

class _FlowVirtualDataTableState<T> extends State<FlowVirtualDataTable<T>> {
  final ScrollController _scrollCtrl = ScrollController();
  String _searchText = '';
  String _sortKey = '';
  _VSortDir? _sortDir;
  late Set<String> _internalSelected;

  static const _rowSizeMap = <FlowComponentSize, double>{
    FlowComponentSize.sm: 32,
    FlowComponentSize.md: 40,
    FlowComponentSize.lg: 48,
    FlowComponentSize.xl: 56,
  };

  @override
  void initState() {
    super.initState();
    _internalSelected = widget.selectedKeys ?? <String>{};
  }

  @override
  void dispose() {
    _scrollCtrl.dispose();
    super.dispose();
  }

  Set<String> get _selected => widget.selectedKeys ?? _internalSelected;

  void _setSelected(Set<String> keys) {
    if (widget.onSelectionChange != null) {
      widget.onSelectionChange!(keys);
    } else {
      setState(() => _internalSelected = keys);
    }
  }

  List<T> get _filtered {
    if (_searchText.isEmpty) return widget.data;
    final q = _searchText.toLowerCase();
    return widget.data.where((row) {
      return widget.columns.any((col) {
        final val = (row as dynamic)[col.key];
        return val != null && val.toString().toLowerCase().contains(q);
      });
    }).toList();
  }

  List<T> get _sorted {
    final data = _filtered;
    if (_sortKey.isEmpty || _sortDir == null) return data;
    final col = widget.columns.where((c) => c.key == _sortKey).firstOrNull;
    if (col == null) return data;
    final dir = _sortDir == _VSortDir.asc ? 1 : -1;
    return List.of(data)
      ..sort((a, b) {
        if (col.sortFn != null) return col.sortFn!(a, b) * dir;
        final aVal = ((a as dynamic)[_sortKey] ?? '').toString();
        final bVal = ((b as dynamic)[_sortKey] ?? '').toString();
        return aVal.compareTo(bVal) * dir;
      });
  }

  void _toggleSort(String key) {
    setState(() {
      if (_sortKey != key) {
        _sortKey = key;
        _sortDir = _VSortDir.asc;
      } else if (_sortDir == _VSortDir.asc) {
        _sortDir = _VSortDir.desc;
      } else {
        _sortKey = '';
        _sortDir = null;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final resolvedSize = widget.size ?? FlowSizeProvider.of(context);
    final rowH = widget.rowHeight ?? _rowSizeMap[resolvedSize] ?? 40.0;
    final sorted = _sorted;
    final showToolbar =
        widget.searchable || widget.toolbarActions != null || widget.selectable;

    return Semantics(
      label: widget.semanticLabel ?? widget.caption ?? 'Data table',
      child: FlowSurface(
        radius: FlowRadius.container,
        border: true,
        padding: FlowPadding.none,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: [
            if (showToolbar) _buildToolbar(sys),
            _buildHeader(sys),
            _buildVirtualBody(sys, sorted, rowH),
            _buildFooter(sys, sorted),
          ],
        ),
      ),
    );
  }

  Widget _buildToolbar(FlowSysTokens sys) {
    return Container(
      padding: EdgeInsets.symmetric(
          horizontal: sys.paddingControl, vertical: sys.gapTight),
      decoration: BoxDecoration(
        border: Border(
            bottom:
                BorderSide(color: sys.borderDefault, width: sys.borderThin)),
      ),
      child: FlowInline(
        gap: sys.gapComponent,
        children: [
          if (widget.selectable && _selected.isNotEmpty)
            FlowText('${_selected.length} selected',
                role: FlowTextRole.paragraphS, color: FlowTextColor.accent),
          if (widget.searchable)
            Expanded(
              child: FlowTextInput(
                placeholder: widget.searchPlaceholder,
                initialValue: _searchText,
                onChanged: (val) => setState(() => _searchText = val),
                leadingIcon: Icons.search,
                clearable: _searchText.isNotEmpty,
                onClear: () => setState(() => _searchText = ''),
                semanticLabel: 'Filter table',
              ),
            ),
          if (!widget.searchable) const Spacer(),
          if (widget.toolbarActions != null) widget.toolbarActions!,
        ],
      ),
    );
  }

  Widget _buildHeader(FlowSysTokens sys) {
    return Container(
      decoration: BoxDecoration(
        color: sys.surfaceSecondary,
        border: Border(
            bottom:
                BorderSide(color: sys.borderDefault, width: sys.borderMedium)),
      ),
      child: Row(
        children: [
          if (widget.selectable) _buildSelectAllHeader(sys),
          ...widget.columns.map((col) => _headerCell(sys, col)),
        ],
      ),
    );
  }

  Widget _buildSelectAllHeader(FlowSysTokens sys) {
    final allKeys = _sorted
        .asMap()
        .entries
        .map((e) => widget.rowKey(e.value, e.key))
        .toSet();
    final allSel = allKeys.isNotEmpty && allKeys.every(_selected.contains);
    final someSel = allKeys.any(_selected.contains);

    return SizedBox(
      width: sys.heightControlLg,
      child: Center(
        child: FlowCheckbox(
          value: allSel,
          indeterminate: someSel && !allSel,
          onChanged: (_) {
            if (allSel) {
              _setSelected(Set.of(_selected)..removeAll(allKeys));
            } else {
              _setSelected(Set.of(_selected)..addAll(allKeys));
            }
          },
          semanticLabel: 'Select all rows',
        ),
      ),
    );
  }

  Widget _headerCell(FlowSysTokens sys, VirtualDataTableColumn<T> col) {
    return Expanded(
      child: Semantics(
        button: col.sortable,
        child: GestureDetector(
          onTap: col.sortable ? () => _toggleSort(col.key) : null,
          child: Container(
            padding: EdgeInsets.symmetric(
                horizontal: sys.gapComponent, vertical: sys.gapTight),
            child: FlowInline(
              gap: sys.gapTight,
              children: [
                FlowText(col.header ?? col.key,
                    role: FlowTextRole.caption, color: FlowTextColor.secondary),
                if (col.sortable)
                  FlowIcon(
                    _sortKey == col.key && _sortDir == _VSortDir.asc
                        ? Icons.arrow_upward
                        : _sortKey == col.key && _sortDir == _VSortDir.desc
                            ? Icons.arrow_downward
                            : Icons.unfold_more,
                    size: FlowIconSize.sm,
                    colorRole: _sortKey == col.key
                        ? FlowIconColor.action
                        : FlowIconColor.tertiary,
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildVirtualBody(FlowSysTokens sys, List<T> sorted, double rowH) {
    if (sorted.isEmpty) {
      return SizedBox(
        height: widget.height,
        child: Center(
          child: FlowText(widget.emptyMessage,
              role: FlowTextRole.paragraphS, color: FlowTextColor.tertiary),
        ),
      );
    }

    return SizedBox(
      height: widget.height,
      child: Stack(
        children: [
          ListView.builder(
            controller: _scrollCtrl,
            itemCount: sorted.length,
            itemExtent: rowH,
            itemBuilder: (context, index) {
              final row = sorted[index];
              final key = widget.rowKey(row, index);
              final isSelected = _selected.contains(key);
              final isStriped = widget.striped && index.isOdd;

              return Semantics(
                selected: isSelected,
                child: Container(
                  height: rowH,
                  decoration: BoxDecoration(
                    color: isSelected
                        ? sys.surfaceAccent.withValues(alpha: 0.08)
                        : isStriped
                            ? sys.surfaceSecondary
                            : null,
                    border: Border(
                      bottom: BorderSide(
                          color: sys.borderSubtle, width: sys.borderThin),
                    ),
                  ),
                  child: Row(
                    children: [
                      if (widget.selectable)
                        SizedBox(
                          width: sys.heightControlLg,
                          child: Center(
                            child: FlowCheckbox(
                              value: isSelected,
                              onChanged: (_) {
                                final next = Set.of(_selected);
                                isSelected ? next.remove(key) : next.add(key);
                                _setSelected(next);
                              },
                              semanticLabel: 'Select row $key',
                            ),
                          ),
                        ),
                      ...widget.columns.map((col) => Expanded(
                            child: Padding(
                              padding: EdgeInsets.symmetric(
                                  horizontal: sys.gapComponent),
                              child: col.render != null
                                  ? col.render!(row, index)
                                  : FlowText(
                                      ((row as dynamic)[col.key] ?? '')
                                          .toString(),
                                      role: FlowTextRole.paragraphS,
                                    ),
                            ),
                          )),
                    ],
                  ),
                ),
              );
            },
          ),
          if (widget.loading)
            Positioned.fill(
              child: Container(
                color: sys.depthOverlay,
                alignment: Alignment.center,
                child: const FlowCircularProgress(semanticLabel: 'Loading'),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildFooter(FlowSysTokens sys, List<T> sorted) {
    return Container(
      padding: EdgeInsets.symmetric(
          horizontal: sys.paddingControl, vertical: sys.gapTight),
      decoration: BoxDecoration(
        border: Border(
            top: BorderSide(color: sys.borderDefault, width: sys.borderThin)),
      ),
      child: FlowInline(
        mainAlign: MainAxisAlignment.spaceBetween,
        children: [
          FlowText(
            sorted.isEmpty
                ? 'No results'
                : '${sorted.length} row${sorted.length != 1 ? 's' : ''}'
                    '${_searchText.isNotEmpty ? ' (filtered from ${widget.data.length})' : ''}',
            role: FlowTextRole.caption,
            color: FlowTextColor.secondary,
          ),
          FlowText('Virtual scroll active',
              role: FlowTextRole.caption, color: FlowTextColor.tertiary),
        ],
      ),
    );
  }
}
