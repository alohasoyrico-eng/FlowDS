/// FLOW Design System — FlowBreadcrumbs (Navigation)
/// ─────────────────────────────────────────────────
/// Trail of links with separator, highlighting the current page.
/// Uses comp.breadcrumbs tokens.
import 'package:flutter/material.dart';

import '../../primitives/text.dart';
import '../../tokens/comp_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Breadcrumb item model
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowBreadcrumbItem {
  const FlowBreadcrumbItem({
    required this.label,
    this.onTap,
  });

  final String label;

  /// Tap handler. Null means this is the current page (last item).
  final VoidCallback? onTap;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowBreadcrumbs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowBreadcrumbs extends StatelessWidget {
  const FlowBreadcrumbs({
    super.key,
    required this.items,
    this.separator = '/',
    this.semanticLabel,
  });

  final List<FlowBreadcrumbItem> items;
  final String separator;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.breadcrumbs;

    final children = <Widget>[];

    for (var i = 0; i < items.length; i++) {
      final item = items[i];
      final isCurrent = i == items.length - 1;

      if (i > 0) {
        children.add(
          Padding(
            padding: EdgeInsets.symmetric(horizontal: t.gap),
            child: Text(
              separator,
              style: TextStyle(
                color: t.separator,
                fontSize: t.separatorFont,
              ),
            ),
          ),
        );
      }

      if (isCurrent) {
        children.add(
          Semantics(
            label: 'Current page: ${item.label}',
            child: Padding(
              padding: EdgeInsets.symmetric(
                horizontal: t.itemPaddingX,
                vertical: t.itemPaddingY,
              ),
              child: FlowText(
                item.label,
                role: FlowTextRole.labelS,
                color: FlowTextColor.primary,
              ),
            ),
          ),
        );
      } else {
        children.add(
          Semantics(
            label: item.label,
            link: true,
            child: GestureDetector(
              onTap: item.onTap,
              child: DecoratedBox(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(t.itemRadius),
                ),
                child: Padding(
                  padding: EdgeInsets.symmetric(
                    horizontal: t.itemPaddingX,
                    vertical: t.itemPaddingY,
                  ),
                  child: FlowText(
                    item.label,
                    role: FlowTextRole.labelS,
                    color: FlowTextColor.secondary,
                  ),
                ),
              ),
            ),
          ),
        );
      }
    }

    Widget result = Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: children,
    );

    if (semanticLabel != null) {
      result = Semantics(label: semanticLabel, container: true, child: result);
    }

    return result;
  }
}
