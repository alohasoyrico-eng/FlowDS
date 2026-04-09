/// FLOW Design System — FlowPagination (Navigation)
/// ────────────────────────────────────────────────
/// Page numbers with prev/next navigation buttons.
/// Uses comp.pagination tokens.
import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../primitives/icon.dart';
import '../../tokens/comp_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowPagination
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowPagination extends StatelessWidget {
  const FlowPagination({
    super.key,
    required this.currentPage,
    required this.totalPages,
    required this.onPageChanged,
    this.siblingCount = 1,
    this.semanticLabel,
  });

  final int currentPage;
  final int totalPages;
  final ValueChanged<int> onPageChanged;

  /// Number of page buttons to show on each side of the current page.
  final int siblingCount;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.pagination;

    final pages = _buildPageRange();
    final isFirstPage = currentPage == 1;
    final isLastPage = currentPage == totalPages;

    Widget result = Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Previous button
        _NavButton(
          icon: Icons.chevron_left,
          onTap: isFirstPage ? null : () => onPageChanged(currentPage - 1),
          tokens: t,
          semanticLabel: 'Previous page',
        ),
        SizedBox(width: t.gap),
        // Page buttons
        ...pages.map((page) {
          if (page == -1) {
            return Padding(
              padding: EdgeInsets.symmetric(horizontal: t.gap / 2),
              child: SizedBox(
                width: t.minWidth,
                height: t.height,
                child: Center(
                  child: Text(
                    '...',
                    style: TextStyle(color: t.text, fontSize: t.font),
                  ),
                ),
              ),
            );
          }
          final isActive = page == currentPage;
          return Padding(
            padding: EdgeInsets.symmetric(horizontal: t.gap / 2),
            child: _PageButton(
              page: page,
              isActive: isActive,
              tokens: t,
              onTap: () => onPageChanged(page),
            ),
          );
        }),
        SizedBox(width: t.gap),
        // Next button
        _NavButton(
          icon: Icons.chevron_right,
          onTap: isLastPage ? null : () => onPageChanged(currentPage + 1),
          tokens: t,
          semanticLabel: 'Next page',
        ),
      ],
    );

    if (semanticLabel != null) {
      result = Semantics(label: semanticLabel, container: true, child: result);
    }

    return result;
  }

  List<int> _buildPageRange() {
    if (totalPages <= 7) {
      return List.generate(totalPages, (i) => i + 1);
    }

    final start = math.max(2, currentPage - siblingCount);
    final end = math.min(totalPages - 1, currentPage + siblingCount);

    final pages = <int>[1];

    if (start > 2) pages.add(-1); // ellipsis

    for (var i = start; i <= end; i++) {
      pages.add(i);
    }

    if (end < totalPages - 1) pages.add(-1); // ellipsis

    pages.add(totalPages);
    return pages;
  }
}

class _PageButton extends StatelessWidget {
  const _PageButton({
    required this.page,
    required this.isActive,
    required this.tokens,
    required this.onTap,
  });

  final int page;
  final bool isActive;
  final FlowCompPagination tokens;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'Page $page',
      selected: isActive,
      button: true,
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          height: tokens.height,
          constraints: BoxConstraints(minWidth: tokens.minWidth),
          decoration: BoxDecoration(
            color: isActive ? tokens.bgActive : tokens.bg,
            borderRadius: BorderRadius.circular(tokens.radius),
          ),
          alignment: Alignment.center,
          padding: const EdgeInsets.symmetric(horizontal: 4),
          child: Text(
            page.toString(),
            style: TextStyle(
              color: isActive ? tokens.textActive : tokens.text,
              fontSize: tokens.font,
              fontWeight: tokens.fontWeight,
            ),
          ),
        ),
      ),
    );
  }
}

class _NavButton extends StatelessWidget {
  const _NavButton({
    required this.icon,
    required this.onTap,
    required this.tokens,
    required this.semanticLabel,
  });

  final IconData icon;
  final VoidCallback? onTap;
  final FlowCompPagination tokens;
  final String semanticLabel;

  @override
  Widget build(BuildContext context) {
    final isDisabled = onTap == null;

    return Semantics(
      label: semanticLabel,
      button: true,
      enabled: !isDisabled,
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          height: tokens.height,
          width: tokens.minWidth,
          decoration: BoxDecoration(
            color: tokens.bg,
            borderRadius: BorderRadius.circular(tokens.radius),
            border: Border.fromBorderSide(
              BorderSide(color: tokens.border, width: 1),
            ),
          ),
          alignment: Alignment.center,
          child: FlowIcon(
            icon,
            size: FlowIconSize.sm,
            iconColor: isDisabled ? tokens.navIconDisabled : tokens.navIcon,
          ),
        ),
      ),
    );
  }
}
