/// FLOW Design System — FlowAdvancedFilters (L4 Pattern)
/// ──────────────────────────────────────────────────────
/// Multi-criteria filter panel with dynamically added/removed filter rows.
/// Composes FlowButton, FlowIconButton, FlowSelect, FlowTextInput,
/// FlowIcon, FlowText, FlowSurface, FlowInline, FlowStack.
/// Maps to React's `<FlowAdvancedFilters>`.
import 'package:flutter/material.dart';

import '../components/controls/flow_button.dart';
import '../components/controls/flow_icon_button.dart';
import '../components/inputs/flow_text_input.dart';
import '../components/selection/flow_select.dart';
import '../primitives/icon.dart';
import '../primitives/inline.dart';
import '../primitives/stack.dart';
import '../primitives/surface.dart';
import '../primitives/text.dart';
import '../tokens/density.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Definition of a filterable field.
class FilterField {
  const FilterField({
    required this.key,
    required this.label,
    this.type = 'text',
    this.options = const [],
  });

  final String key;
  final String label;
  final String type; // text, number, select, date
  final List<FlowSelectOption> options;
}

/// A single active filter row.
class FilterRow {
  const FilterRow({
    required this.id,
    required this.field,
    required this.operator,
    this.value = '',
  });

  final String id;
  final String field;
  final String operator;
  final String value;

  FilterRow copyWith({String? field, String? operator, String? value}) =>
      FilterRow(
        id: id,
        field: field ?? this.field,
        operator: operator ?? this.operator,
        value: value ?? this.value,
      );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Operator maps
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const _operators = <String, List<FlowSelectOption>>{
  'text': [
    FlowSelectOption(value: 'contains', label: 'contains'),
    FlowSelectOption(value: 'equals', label: 'equals'),
    FlowSelectOption(value: 'starts_with', label: 'starts with'),
    FlowSelectOption(value: 'ends_with', label: 'ends with'),
    FlowSelectOption(value: 'not_contains', label: 'not contains'),
  ],
  'number': [
    FlowSelectOption(value: 'eq', label: '='),
    FlowSelectOption(value: 'neq', label: '\u2260'),
    FlowSelectOption(value: 'gt', label: '>'),
    FlowSelectOption(value: 'gte', label: '\u2265'),
    FlowSelectOption(value: 'lt', label: '<'),
    FlowSelectOption(value: 'lte', label: '\u2264'),
  ],
  'select': [
    FlowSelectOption(value: 'is', label: 'is'),
    FlowSelectOption(value: 'is_not', label: 'is not'),
  ],
  'date': [
    FlowSelectOption(value: 'is', label: 'is'),
    FlowSelectOption(value: 'before', label: 'before'),
    FlowSelectOption(value: 'after', label: 'after'),
  ],
};

int _nextFilterId = 0;
String _newFilterId() => 'f-${++_nextFilterId}';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowAdvancedFilters
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowAdvancedFilters extends StatelessWidget {
  const FlowAdvancedFilters({
    super.key,
    required this.fields,
    required this.filters,
    required this.onFiltersChange,
    this.onApply,
    this.onClear,
    this.maxFilters = 10,
    this.loading = false,
    this.error = false,
  });

  final List<FilterField> fields;
  final List<FilterRow> filters;
  final ValueChanged<List<FilterRow>> onFiltersChange;
  final VoidCallback? onApply;
  final VoidCallback? onClear;
  final int maxFilters;
  final bool loading;
  final bool error;

  void _addFilter() {
    if (filters.length >= maxFilters || fields.isEmpty) return;
    final first = fields.first;
    final ops = _operators[first.type] ?? _operators['text']!;
    onFiltersChange([
      ...filters,
      FilterRow(
        id: _newFilterId(),
        field: first.key,
        operator: ops.first.value,
      ),
    ]);
  }

  void _removeFilter(String id) {
    onFiltersChange(filters.where((f) => f.id != id).toList());
  }

  void _updateFilter(String id, FilterRow updated) {
    onFiltersChange(filters.map((f) => f.id == id ? updated : f).toList());
  }

  void _clearAll() {
    onFiltersChange([]);
    onClear?.call();
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    return Semantics(
      label: 'Advanced filters',
      child: FlowSurface(
        radius: FlowRadius.container,
        border: true,
        padding: FlowPadding.control,
        child: FlowStack(
          gap: FlowGap.component,
          children: [
            // Header
            FlowInline(
              mainAlign: MainAxisAlignment.spaceBetween,
              children: [
                FlowInline(
                  gap: sys.gapTight,
                  children: [
                    FlowIcon(Icons.filter_list, size: FlowIconSize.sm),
                    FlowText(
                      'Filters${filters.isNotEmpty ? ' (${filters.length})' : ''}',
                      role: FlowTextRole.labelM,
                    ),
                  ],
                ),
                FlowInline(
                  gap: sys.gapTight,
                  children: [
                    if (filters.isNotEmpty)
                      FlowButton(
                        variant: FlowButtonVariant.ghost,
                        size: FlowComponentSize.sm,
                        onPressed: _clearAll,
                        child: const FlowText('Clear all',
                            role: FlowTextRole.labelS),
                      ),
                    FlowButton(
                      variant: FlowButtonVariant.outline,
                      size: FlowComponentSize.sm,
                      leadingIcon: Icons.add,
                      disabled: filters.length >= maxFilters,
                      onPressed: _addFilter,
                      child: const FlowText('Add filter',
                          role: FlowTextRole.labelS),
                    ),
                  ],
                ),
              ],
            ),
            // Filter rows
            ...filters.asMap().entries.map((entry) {
              final i = entry.key;
              final filter = entry.value;
              return _FilterRowWidget(
                index: i,
                filter: filter,
                fields: fields,
                onUpdate: (updated) => _updateFilter(filter.id, updated),
                onRemove: () => _removeFilter(filter.id),
              );
            }),
            // Apply button
            if (filters.isNotEmpty && onApply != null)
              FlowInline(
                mainAlign: MainAxisAlignment.end,
                children: [
                  FlowButton(
                    variant: FlowButtonVariant.high,
                    onPressed: onApply,
                    child: const FlowText('Apply Filters',
                        role: FlowTextRole.labelM),
                  ),
                ],
              ),
          ],
        ),
      ),
    );
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Individual filter row
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class _FilterRowWidget extends StatelessWidget {
  const _FilterRowWidget({
    required this.index,
    required this.filter,
    required this.fields,
    required this.onUpdate,
    required this.onRemove,
  });

  final int index;
  final FilterRow filter;
  final List<FilterField> fields;
  final ValueChanged<FilterRow> onUpdate;
  final VoidCallback onRemove;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final fieldDef = fields.where((f) => f.key == filter.field).firstOrNull;
    final type = fieldDef?.type ?? 'text';
    final ops = _operators[type] ?? _operators['text']!;

    return Row(
      children: [
        // Where / And label
        SizedBox(
          width: sys.heightControlLg,
          child: FlowText(
            index == 0 ? 'Where' : 'And',
            role: FlowTextRole.caption,
            color: FlowTextColor.tertiary,
          ),
        ),
        SizedBox(width: sys.gapTight),
        // Field
        Expanded(
          flex: 2,
          child: FlowSelect(
            label: 'Field',
            options: fields
                .map((f) => FlowSelectOption(value: f.key, label: f.label))
                .toList(),
            value: filter.field,
            onChanged: (val) {
              final newField = fields.where((f) => f.key == val).firstOrNull;
              final newType = newField?.type ?? 'text';
              final newOps = _operators[newType] ?? _operators['text']!;
              onUpdate(filter.copyWith(
                field: val,
                operator: newOps.first.value,
                value: '',
              ));
            },
            size: FlowComponentSize.sm,
          ),
        ),
        SizedBox(width: sys.gapTight),
        // Operator
        Expanded(
          flex: 2,
          child: FlowSelect(
            label: 'Operator',
            options: ops,
            value: filter.operator,
            onChanged: (val) => onUpdate(filter.copyWith(operator: val)),
            size: FlowComponentSize.sm,
          ),
        ),
        SizedBox(width: sys.gapTight),
        // Value
        Expanded(
          flex: 3,
          child: fieldDef?.type == 'select'
              ? FlowSelect(
                  label: 'Value',
                  options: fieldDef!.options,
                  value: filter.value,
                  onChanged: (val) => onUpdate(filter.copyWith(value: val)),
                  placeholder: 'Select...',
                  size: FlowComponentSize.sm,
                )
              : FlowTextInput(
                  placeholder: 'Value...',
                  initialValue: filter.value,
                  onChanged: (val) => onUpdate(filter.copyWith(value: val)),
                  size: FlowComponentSize.sm,
                ),
        ),
        SizedBox(width: sys.gapTight),
        // Remove
        FlowIconButton(
          icon: Icons.close,
          size: FlowComponentSize.sm,
          variant: FlowIconButtonVariant.ghost,
          onPressed: onRemove,
          semanticLabel: 'Remove filter',
        ),
      ],
    );
  }
}
