/// FLOW Design System — FlowDataTable (L4 Pattern)
/// ─────────────────────────────────────────────────
/// Advanced table with sorting, filtering, pagination, and row selection.
/// Composes FlowTable, FlowSurface, FlowText, FlowIcon, FlowCheckbox,
/// FlowTextInput, FlowIconButton, FlowInline, FlowPagination.
/// Maps to React's `<FlowDataTable>`.
import 'package:flutter/material.dart';

import '../components/controls/flow_icon_button.dart';
import '../components/feedback/flow_circular_progress.dart';
import '../components/inputs/flow_text_input.dart';
import '../components/selection/flow_checkbox.dart';
import '../primitives/icon.dart';
import '../primitives/inline.dart';
import '../primitives/surface.dart';
import '../primitives/text.dart';
import '../tokens/density.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Column definition with sorting/filtering support.
class DataTableColumn<T> {
  const DataTableColumn({
    required this.key,
    this.header,
    this.width,
    this.align = Alignment.centerLeft,
    this.sortable = false,
    this.sortFn,
    this.filterable = false,
    this.render,
  });

  final String key;
  final String? header;
  final double? width;
  final Alignment align;
  final bool sortable;
  final int Function(T a, T b)? sortFn;
  final bool filterable;
  final Widget Function(T row, int index)? render;
}

enum _SortDir { asc, desc }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowDataTable
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowDataTable<T extends Map<String, dynamic>> extends StatefulWidget {
  const FlowDataTable({
    super.key,
    required this.columns,
    required this.data,
    this.rowKey,
    this.selectable = false,
    this.selectedKeys,
    this.onSelectionChange,
    this.pageSize = 10,
    this.searchable = false,
    this.searchPlaceholder = 'Filter...',
    this.size,
    this.striped = false,
    this.hoverable = true,
    this.loading = false,
    this.error = false,
    this.errorMessage = 'An error occurred loading data',
    this.emptyMessage = 'No data',
    this.caption,
    this.toolbarActions,
    this.semanticLabel,
  });

  final List<DataTableColumn<T>> columns;
  final List<T> data;
  final String Function(T row, int index)? rowKey;
  final bool selectable;
  final Set<String>? selectedKeys;
  final ValueChanged<Set<String>>? onSelectionChange;
  final int pageSize;
  final bool searchable;
  final String searchPlaceholder;
  final FlowComponentSize? size;
  final bool striped;
  final bool hoverable;
  final bool loading;
  final bool error;
  final String errorMessage;
  final String emptyMessage;
  final String? caption;
  final Widget? toolbarActions;
  final String? semanticLabel;

  @override
  State<FlowDataTable<T>> createState() => _FlowDataTableState<T>();
}

class _FlowDataTableState<T extends Map<String, dynamic>>
    extends State<FlowDataTable<T>> {
  String _searchText = '';
  String _sortKey = '';
  _SortDir? _sortDir;
  int _currentPage = 1;
  late Set<String> _internalSelected;

  @override
  void initState() {
    super.initState();
    _internalSelected = widget.selectedKeys ?? <String>{};
  }

  Set<String> get _selected => widget.selectedKeys ?? _internalSelected;

  void _setSelected(Set<String> keys) {
    if (widget.onSelectionChange != null) {
      widget.onSelectionChange!(keys);
    } else {
      setState(() => _internalSelected = keys);
    }
  }

  String _rowKey(T row, int index) =>
      widget.rowKey?.call(row, index) ??
      (row.containsKey('id') ? row['id'].toString() : index.toString());

  List<T> get _filtered {
    if (_searchText.isEmpty) return widget.data;
    final q = _searchText.toLowerCase();
    return widget.data.where((row) {
      return widget.columns.any((col) {
        final val = row[col.key];
        return val != null && val.toString().toLowerCase().contains(q);
      });
    }).toList();
  }

  List<T> get _sorted {
    final data = _filtered;
    if (_sortKey.isEmpty || _sortDir == null) return data;
    final col = widget.columns.where((c) => c.key == _sortKey).firstOrNull;
    if (col == null) return data;
    final dir = _sortDir == _SortDir.asc ? 1 : -1;
    return List.of(data)
      ..sort((a, b) {
        if (col.sortFn != null) return col.sortFn!(a, b) * dir;
        final aVal = (a[_sortKey] ?? '').toString();
        final bVal = (b[_sortKey] ?? '').toString();
        return aVal.compareTo(bVal) * dir;
      });
  }

  List<T> get _paginated {
    if (widget.pageSize <= 0) return _sorted;
    final start = (_currentPage - 1) * widget.pageSize;
    return _sorted.skip(start).take(widget.pageSize).toList();
  }

  int get _totalPages => widget.pageSize > 0
      ? (_sorted.length / widget.pageSize).ceil().clamp(1, 9999)
      : 1;

  void _toggleSort(String key) {
    setState(() {
      if (_sortKey != key) {
        _sortKey = key;
        _sortDir = _SortDir.asc;
      } else if (_sortDir == _SortDir.asc) {
        _sortDir = _SortDir.desc;
      } else {
        _sortKey = '';
        _sortDir = null;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final showToolbar =
        widget.searchable || widget.toolbarActions != null || widget.selectable;
    final paginated = _paginated;
    final safePage = _currentPage.clamp(1, _totalPages);

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
            // Toolbar
            if (showToolbar) _buildToolbar(sys),
            // Table content
            _buildTable(sys, paginated),
            // Pagination
            if (widget.pageSize > 0 && _sorted.isNotEmpty)
              _buildPagination(sys, safePage),
          ],
        ),
      ),
    );
  }

  Widget _buildToolbar(FlowSysTokens sys) {
    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: sys.paddingControl,
        vertical: sys.gapTight,
      ),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(color: sys.borderDefault, width: sys.borderThin),
        ),
      ),
      child: FlowInline(
        gap: sys.gapComponent,
        children: [
          if (widget.selectable && _selected.isNotEmpty)
            FlowText(
              '${_selected.length} selected',
              role: FlowTextRole.paragraphS,
              color: FlowTextColor.accent,
            ),
          if (widget.searchable)
            Expanded(
              child: FlowTextInput(
                placeholder: widget.searchPlaceholder,
                initialValue: _searchText,
                onChanged: (val) => setState(() {
                  _searchText = val;
                  _currentPage = 1;
                }),
                leadingIcon: Icons.search,
                clearable: _searchText.isNotEmpty,
                onClear: () => setState(() {
                  _searchText = '';
                  _currentPage = 1;
                }),
                semanticLabel: 'Filter table',
              ),
            ),
          if (!widget.searchable) const Spacer(),
          if (widget.toolbarActions != null) widget.toolbarActions!,
        ],
      ),
    );
  }

  Widget _buildTable(FlowSysTokens sys, List<T> paginated) {
    return Stack(
      children: [
        Column(
          children: [
            // Header
            _buildHeaderRow(sys),
            // Body
            if (paginated.isEmpty)
              Padding(
                padding: EdgeInsets.all(sys.paddingContainer),
                child: Center(
                  child: FlowText(widget.emptyMessage,
                      role: FlowTextRole.paragraphS,
                      color: FlowTextColor.tertiary),
                ),
              )
            else
              ...paginated
                  .asMap()
                  .entries
                  .map((e) => _buildDataRow(sys, e.value, e.key)),
          ],
        ),
        if (widget.loading) _buildOverlay(sys, isError: false),
        if (widget.error && !widget.loading) _buildOverlay(sys, isError: true),
      ],
    );
  }

  Widget _buildHeaderRow(FlowSysTokens sys) {
    return Container(
      decoration: BoxDecoration(
        color: sys.surfaceSecondary,
        border: Border(
          bottom: BorderSide(color: sys.borderDefault, width: sys.borderMedium),
        ),
      ),
      child: Row(
        children: [
          if (widget.selectable) _buildSelectAllCell(sys),
          ...widget.columns.map((col) => _buildHeaderCell(sys, col)),
        ],
      ),
    );
  }

  Widget _buildSelectAllCell(FlowSysTokens sys) {
    final pageKeys =
        _paginated.asMap().entries.map((e) => _rowKey(e.value, e.key)).toSet();
    final allSelected =
        pageKeys.isNotEmpty && pageKeys.every(_selected.contains);
    final someSelected = pageKeys.any(_selected.contains);

    return SizedBox(
      width: sys.heightControlLg,
      child: Center(
        child: FlowCheckbox(
          value: allSelected,
          indeterminate: someSelected && !allSelected,
          onChanged: (_) {
            if (allSelected) {
              _setSelected(Set.of(_selected)..removeAll(pageKeys));
            } else {
              _setSelected(Set.of(_selected)..addAll(pageKeys));
            }
          },
          semanticLabel: 'Select all rows',
        ),
      ),
    );
  }

  Widget _buildHeaderCell(FlowSysTokens sys, DataTableColumn<T> col) {
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
                    _sortKey == col.key && _sortDir == _SortDir.asc
                        ? Icons.arrow_upward
                        : _sortKey == col.key && _sortDir == _SortDir.desc
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

  Widget _buildDataRow(FlowSysTokens sys, T row, int index) {
    final key = _rowKey(row, index);
    final isSelected = _selected.contains(key);

    return Container(
      decoration: BoxDecoration(
        color: isSelected
            ? sys.surfaceAccent.withValues(alpha: 0.08)
            : widget.striped && index.isOdd
                ? sys.surfaceSecondary
                : null,
        border: Border(
          bottom: BorderSide(color: sys.borderSubtle, width: sys.borderThin),
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
                    if (isSelected) {
                      next.remove(key);
                    } else {
                      next.add(key);
                    }
                    _setSelected(next);
                  },
                  semanticLabel: 'Select row $key',
                ),
              ),
            ),
          ...widget.columns.map((col) => Expanded(
                child: Padding(
                  padding: EdgeInsets.symmetric(
                      horizontal: sys.gapComponent, vertical: sys.gapTight),
                  child: col.render != null
                      ? col.render!(row, index)
                      : FlowText(
                          (row[col.key] ?? '').toString(),
                          role: FlowTextRole.paragraphS,
                        ),
                ),
              )),
        ],
      ),
    );
  }

  Widget _buildOverlay(FlowSysTokens sys, {required bool isError}) {
    return Positioned.fill(
      child: Container(
        color: sys.depthOverlay,
        alignment: Alignment.center,
        child: isError
            ? FlowInline(
                gap: sys.gapTight,
                children: [
                  FlowIcon(Icons.error_outline,
                      size: FlowIconSize.sm, colorRole: FlowIconColor.error),
                  FlowText(widget.errorMessage,
                      role: FlowTextRole.paragraphS,
                      color: FlowTextColor.danger),
                ],
              )
            : const FlowCircularProgress(semanticLabel: 'Loading'),
      ),
    );
  }

  Widget _buildPagination(FlowSysTokens sys, int safePage) {
    return Container(
      padding: EdgeInsets.symmetric(
          horizontal: sys.paddingControl, vertical: sys.gapTight),
      decoration: BoxDecoration(
        border: Border(
          top: BorderSide(color: sys.borderDefault, width: sys.borderThin),
        ),
      ),
      child: FlowInline(
        mainAlign: MainAxisAlignment.spaceBetween,
        children: [
          FlowText(
            _sorted.isEmpty
                ? 'No results'
                : 'Showing ${(safePage - 1) * widget.pageSize + 1}\u2013'
                    '${(safePage * widget.pageSize).clamp(0, _sorted.length)} of ${_sorted.length}',
            role: FlowTextRole.caption,
            color: FlowTextColor.secondary,
          ),
          FlowInline(
            gap: sys.gapTight,
            children: [
              FlowIconButton(
                icon: Icons.first_page,
                size: FlowComponentSize.sm,
                disabled: safePage <= 1,
                onPressed: () => setState(() => _currentPage = 1),
                semanticLabel: 'First page',
              ),
              FlowIconButton(
                icon: Icons.chevron_left,
                size: FlowComponentSize.sm,
                disabled: safePage <= 1,
                onPressed: () => setState(() => _currentPage--),
                semanticLabel: 'Previous page',
              ),
              FlowText('$safePage / $_totalPages', role: FlowTextRole.caption),
              FlowIconButton(
                icon: Icons.chevron_right,
                size: FlowComponentSize.sm,
                disabled: safePage >= _totalPages,
                onPressed: () => setState(() => _currentPage++),
                semanticLabel: 'Next page',
              ),
              FlowIconButton(
                icon: Icons.last_page,
                size: FlowComponentSize.sm,
                disabled: safePage >= _totalPages,
                onPressed: () => setState(() => _currentPage = _totalPages),
                semanticLabel: 'Last page',
              ),
            ],
          ),
        ],
      ),
    );
  }
}
