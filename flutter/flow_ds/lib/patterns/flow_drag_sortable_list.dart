/// FLOW Design System — FlowDragSortableList (L4 Pattern)
/// ──────────────────────────────────────────────────────
/// Reorderable list via pointer drag or keyboard shortcuts.
/// Composes FlowText, FlowInline, FlowStack.
/// Maps to React's `<FlowDragSortableList>`.
import 'package:flutter/material.dart';

import '../theme/flow_size_provider.dart';
import '../tokens/density.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// A single sortable item.
class SortableItem {
  const SortableItem({required this.id, required this.content});

  final String id;
  final Widget content;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowDragSortableList
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowDragSortableList extends StatefulWidget {
  const FlowDragSortableList({
    super.key,
    required this.items,
    required this.onReorder,
    this.handle = true,
    this.size,
    this.semanticLabel = 'Sortable list',
  });

  /// The items to display and reorder.
  final List<SortableItem> items;

  /// Callback when items are reordered.
  final ValueChanged<List<SortableItem>> onReorder;

  /// Whether to show a drag handle on each item.
  final bool handle;

  /// Size variant. Omit to inherit from [FlowSizeProvider].
  final FlowComponentSize? size;

  /// Accessible label.
  final String semanticLabel;

  @override
  State<FlowDragSortableList> createState() => _FlowDragSortableListState();
}

class _FlowDragSortableListState extends State<FlowDragSortableList> {
  double _itemHeight(FlowComponentSize size) {
    switch (size) {
      case FlowComponentSize.sm:
        return 36;
      case FlowComponentSize.lg:
        return 52;
      case FlowComponentSize.xl:
        return 56;
      case FlowComponentSize.md:
        return 44;
    }
  }

  void _onReorder(int oldIndex, int newIndex) {
    if (newIndex > oldIndex) newIndex--;
    final items = List.of(widget.items);
    final moved = items.removeAt(oldIndex);
    items.insert(newIndex, moved);
    widget.onReorder(items);
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final resolvedSize = widget.size ?? FlowSizeProvider.of(context);
    final itemH = _itemHeight(resolvedSize);

    return Semantics(
      label: widget.semanticLabel,
      child: ReorderableListView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        buildDefaultDragHandles: false,
        onReorder: _onReorder,
        itemCount: widget.items.length,
        proxyDecorator: (child, index, animation) {
          return AnimatedBuilder(
            listenable: animation,
            builder: (context, child) {
              final scale = Tween<double>(begin: 1.0, end: 1.02).animate(
                  CurvedAnimation(parent: animation, curve: Curves.easeInOut));
              return Transform.scale(
                scale: scale.value,
                child: Material(
                  elevation: 0,
                  color: sys.surfaceAccent.withValues(alpha: 0.08),
                  borderRadius: BorderRadius.circular(sys.radiusSm),
                  child: child,
                ),
              );
            },
            child: child,
          );
        },
        itemBuilder: (context, index) {
          final item = widget.items[index];
          return _SortableItemTile(
            key: ValueKey(item.id),
            item: item,
            index: index,
            itemHeight: itemH,
            showHandle: widget.handle,
            sys: sys,
          );
        },
      ),
    );
  }
}

class _SortableItemTile extends StatelessWidget {
  const _SortableItemTile({
    super.key,
    required this.item,
    required this.index,
    required this.itemHeight,
    required this.showHandle,
    required this.sys,
  });

  final SortableItem item;
  final int index;
  final double itemHeight;
  final bool showHandle;
  final FlowSysTokens sys;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'Sortable item ${index + 1}',
      child: Container(
        height: itemHeight,
        margin: EdgeInsets.only(bottom: sys.gapTight),
        decoration: BoxDecoration(
          border: Border.all(color: sys.borderDefault, width: sys.borderThin),
          borderRadius: BorderRadius.circular(sys.radiusSm),
          color: sys.surfacePrimary,
        ),
        padding: EdgeInsets.symmetric(horizontal: sys.gapComponent),
        child: Row(
          children: [
            if (showHandle)
              ReorderableDragStartListener(
                index: index,
                child: Padding(
                  padding: EdgeInsets.only(right: sys.gapTight),
                  child: Icon(
                    Icons.drag_indicator,
                    size: sys.heightControlSm * 0.4,
                    color: sys.textTertiary,
                  ),
                ),
              ),
            Expanded(child: item.content),
          ],
        ),
      ),
    );
  }
}

/// Animated builder wrapper used for drag proxy decoration.
class AnimatedBuilder extends AnimatedWidget {
  const AnimatedBuilder({
    super.key,
    required super.listenable,
    required this.builder,
    this.child,
  });

  final Widget Function(BuildContext context, Widget? child) builder;
  final Widget? child;

  @override
  Widget build(BuildContext context) => builder(context, child);
}
