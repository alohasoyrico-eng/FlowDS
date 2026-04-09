/// FLOW Design System — FlowColumnConfigurator (L4 Pattern)
/// ────────────────────────────────────────────────────────
/// Popover for toggling table column visibility and reordering.
/// Composes FlowIconButton, FlowCheckbox, FlowText, FlowInline.
/// Maps to React's `<FlowColumnConfigurator>`.
import 'package:flutter/material.dart';

import '../components/controls/flow_icon_button.dart';
import '../components/selection/flow_checkbox.dart';
import '../primitives/inline.dart';
import '../primitives/text.dart';
import '../tokens/density.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Configuration for a single column.
class ColumnConfig {
  const ColumnConfig({
    required this.key,
    required this.label,
    this.visible = true,
  });

  final String key;
  final String label;
  final bool visible;

  ColumnConfig copyWith({bool? visible}) =>
      ColumnConfig(key: key, label: label, visible: visible ?? this.visible);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowColumnConfigurator
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowColumnConfigurator extends StatefulWidget {
  const FlowColumnConfigurator({
    super.key,
    required this.columns,
    required this.onColumnsChange,
  });

  /// Column configurations.
  final List<ColumnConfig> columns;

  /// Callback when column visibility or order changes.
  final ValueChanged<List<ColumnConfig>> onColumnsChange;

  @override
  State<FlowColumnConfigurator> createState() => _FlowColumnConfiguratorState();
}

class _FlowColumnConfiguratorState extends State<FlowColumnConfigurator> {
  final _overlayController = OverlayPortalController();
  final _link = LayerLink();

  void _toggle(String key) {
    widget.onColumnsChange(
      widget.columns
          .map((c) => c.key == key ? c.copyWith(visible: !c.visible) : c)
          .toList(),
    );
  }

  void _moveUp(int index) {
    if (index <= 0) return;
    final next = List.of(widget.columns);
    final temp = next[index - 1];
    next[index - 1] = next[index];
    next[index] = temp;
    widget.onColumnsChange(next);
  }

  void _moveDown(int index) {
    if (index >= widget.columns.length - 1) return;
    final next = List.of(widget.columns);
    final temp = next[index + 1];
    next[index + 1] = next[index];
    next[index] = temp;
    widget.onColumnsChange(next);
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    return CompositedTransformTarget(
      link: _link,
      child: OverlayPortal(
        controller: _overlayController,
        overlayChildBuilder: (context) {
          return GestureDetector(
            behavior: HitTestBehavior.translucent,
            onTap: () => _overlayController.hide(),
            child: Stack(
              children: [
                CompositedTransformFollower(
                  link: _link,
                  targetAnchor: Alignment.bottomRight,
                  followerAnchor: Alignment.topRight,
                  offset: Offset(0, sys.gapTight),
                  child: GestureDetector(
                    onTap: () {}, // prevent close on panel tap
                    child: _buildPanel(sys),
                  ),
                ),
              ],
            ),
          );
        },
        child: FlowIconButton(
          icon: Icons.view_column,
          variant: FlowIconButtonVariant.ghost,
          size: FlowComponentSize.sm,
          onPressed: () {
            if (_overlayController.isShowing) {
              _overlayController.hide();
            } else {
              _overlayController.show();
            }
          },
          semanticLabel: 'Configure columns',
        ),
      ),
    );
  }

  Widget _buildPanel(FlowSysTokens sys) {
    return Material(
      elevation: 0,
      color: sys.surfacePrimary,
      borderRadius: BorderRadius.circular(sys.radiusContainer),
      child: Container(
        constraints: BoxConstraints(minWidth: sys.contentDialog * 0.6),
        decoration: BoxDecoration(
          border: Border.all(color: sys.borderDefault, width: sys.borderThin),
          borderRadius: BorderRadius.circular(sys.radiusContainer),
          boxShadow: sys.depthElevationMedium,
          color: sys.surfacePrimary,
        ),
        padding: EdgeInsets.all(sys.gapTight),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: widget.columns.asMap().entries.map((entry) {
            final i = entry.key;
            final col = entry.value;
            return Padding(
              padding: EdgeInsets.all(sys.gapTight),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  FlowCheckbox(
                    value: col.visible,
                    onChanged: (_) => _toggle(col.key),
                    size: FlowComponentSize.sm,
                  ),
                  SizedBox(width: sys.gapTight),
                  Expanded(
                    child: FlowText(
                      col.label,
                      role: FlowTextRole.caption,
                      color: col.visible
                          ? FlowTextColor.primary
                          : FlowTextColor.tertiary,
                    ),
                  ),
                  FlowInline(
                    gap: 0.0,
                    children: [
                      FlowIconButton(
                        icon: Icons.keyboard_arrow_up,
                        size: FlowComponentSize.sm,
                        variant: FlowIconButtonVariant.ghost,
                        disabled: i == 0,
                        onPressed: () => _moveUp(i),
                        semanticLabel: 'Move ${col.label} up',
                      ),
                      FlowIconButton(
                        icon: Icons.keyboard_arrow_down,
                        size: FlowComponentSize.sm,
                        variant: FlowIconButtonVariant.ghost,
                        disabled: i == widget.columns.length - 1,
                        onPressed: () => _moveDown(i),
                        semanticLabel: 'Move ${col.label} down',
                      ),
                    ],
                  ),
                ],
              ),
            );
          }).toList(),
        ),
      ),
    );
  }
}
