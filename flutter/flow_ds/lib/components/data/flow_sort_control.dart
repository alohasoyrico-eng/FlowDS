/// FLOW Design System — FlowSortControl (Data)
/// ────────────────────────────────────────────
/// Column sort toggle that cycles through asc/desc/none.
/// Uses sys tokens for typography/spacing/colors.
import 'package:flutter/material.dart';

import '../../primitives/icon.dart';
import '../../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Enums
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

enum FlowSortDirection { none, ascending, descending }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSortControl
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowSortControl extends StatelessWidget {
  const FlowSortControl({
    super.key,
    required this.label,
    required this.direction,
    required this.onChanged,
    this.semanticLabel,
  });

  final String label;
  final FlowSortDirection direction;
  final ValueChanged<FlowSortDirection> onChanged;
  final String? semanticLabel;

  void _cycle() {
    switch (direction) {
      case FlowSortDirection.none:
        onChanged(FlowSortDirection.ascending);
        break;
      case FlowSortDirection.ascending:
        onChanged(FlowSortDirection.descending);
        break;
      case FlowSortDirection.descending:
        onChanged(FlowSortDirection.none);
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    final isActive = direction != FlowSortDirection.none;
    final textColor = isActive ? sys.textPrimary : sys.textSecondary;
    final iconColor = isActive ? sys.actionPrimary : sys.textTertiary;

    final sortLabel = direction == FlowSortDirection.ascending
        ? 'sorted ascending'
        : direction == FlowSortDirection.descending
            ? 'sorted descending'
            : 'not sorted';

    return Semantics(
      label: semanticLabel ?? '$label, $sortLabel',
      button: true,
      child: GestureDetector(
        onTap: _cycle,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              label,
              style: TextStyle(
                color: textColor,
                fontSize: sys.labelSFontSize,
                fontWeight: isActive ? FontWeight.w600 : FontWeight.w500,
                fontFamily: sys.controlFontFamily,
              ),
            ),
            SizedBox(width: sys.gapTight),
            _SortArrows(direction: direction, iconColor: iconColor, sys: sys),
          ],
        ),
      ),
    );
  }
}

class _SortArrows extends StatelessWidget {
  const _SortArrows({
    required this.direction,
    required this.iconColor,
    required this.sys,
  });

  final FlowSortDirection direction;
  final Color iconColor;
  final FlowSysTokens sys;

  @override
  Widget build(BuildContext context) {
    final activeColor = sys.actionPrimary;
    final inactiveColor = sys.textTertiary;

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        FlowIcon(
          Icons.arrow_drop_up,
          size: FlowIconSize.xs,
          iconColor: direction == FlowSortDirection.ascending
              ? activeColor
              : inactiveColor,
        ),
        FlowIcon(
          Icons.arrow_drop_down,
          size: FlowIconSize.xs,
          iconColor: direction == FlowSortDirection.descending
              ? activeColor
              : inactiveColor,
        ),
      ],
    );
  }
}
