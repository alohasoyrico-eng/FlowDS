/// FLOW Design System — FlowFilterChipGroup (L4 Pattern)
/// ──────────────────────────────────────────────────────
/// Group of toggleable filter chips for multi-select or exclusive filtering.
/// Composes FlowChip, FlowIcon, FlowText (L3/L2).
///
/// Maps to React's `<FlowFilterChipGroup>` from FlowFilterChipGroup.tsx.
import 'package:flutter/material.dart';

import '../components/display/flow_chip.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Data
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Describes a single filter chip.
class FlowFilterChipItem {
  const FlowFilterChipItem({
    required this.id,
    required this.label,
    this.count,
  });

  final String id;
  final String label;
  final int? count;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Widget
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowFilterChipGroup extends StatelessWidget {
  const FlowFilterChipGroup({
    super.key,
    required this.chips,
    required this.selected,
    required this.onSelectionChange,
    this.exclusive = false,
  });

  /// Available filter chips.
  final List<FlowFilterChipItem> chips;

  /// Currently selected chip IDs.
  final Set<String> selected;

  /// Callback fired when selection changes.
  final ValueChanged<Set<String>> onSelectionChange;

  /// When true, only one chip can be selected at a time.
  final bool exclusive;

  void _toggle(String id) {
    if (exclusive) {
      onSelectionChange(selected.contains(id) ? {} : {id});
    } else {
      final next = Set<String>.from(selected);
      if (next.contains(id)) {
        next.remove(id);
      } else {
        next.add(id);
      }
      onSelectionChange(next);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (chips.isEmpty) return const SizedBox.shrink();

    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    return Semantics(
      container: true,
      child: Wrap(
        spacing: sys.gapTight,
        runSpacing: sys.gapTight,
        children: chips.map((chip) {
          final isSelected = selected.contains(chip.id);
          return FlowChip(
            label: chip.label,
            size: FlowChipSize.sm,
            selected: isSelected,
            leadingIcon: isSelected ? Icons.check : null,
            onTap: () => _toggle(chip.id),
            semanticLabel:
                '${chip.label}${chip.count != null ? ' (${chip.count})' : ''}'
                '${isSelected ? ', selected' : ''}',
          );
        }).toList(),
      ),
    );
  }
}
