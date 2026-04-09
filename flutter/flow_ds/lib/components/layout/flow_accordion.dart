/// FLOW Design System — FlowAccordion (Layout)
/// ────────────────────────────────────────────
/// Expandable content sections with 4 sizes.
/// Uses comp.accordion tokens. AnimatedSize for expand/collapse.
import 'package:flutter/material.dart';

import '../../primitives/icon.dart';
import '../../primitives/text.dart';
import '../../tokens/comp_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Enums & models
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

enum FlowAccordionSize { sm, md, lg, xl }

class FlowAccordionItem {
  const FlowAccordionItem({
    required this.key,
    required this.label,
    required this.content,
    this.subtitle,
    this.icon,
    this.disabled = false,
  });

  final String key;
  final String label;
  final Widget content;
  final String? subtitle;
  final IconData? icon;
  final bool disabled;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowAccordion
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowAccordion extends StatefulWidget {
  const FlowAccordion({
    super.key,
    required this.items,
    this.expandedKeys = const [],
    this.onChanged,
    this.multiple = false,
    this.size = FlowAccordionSize.md,
    this.bordered = true,
    this.semanticLabel,
  });

  final List<FlowAccordionItem> items;
  final List<String> expandedKeys;
  final ValueChanged<List<String>>? onChanged;
  final bool multiple;
  final FlowAccordionSize size;
  final bool bordered;
  final String? semanticLabel;

  @override
  State<FlowAccordion> createState() => _FlowAccordionState();
}

class _FlowAccordionState extends State<FlowAccordion> {
  late List<String> _expandedKeys;

  @override
  void initState() {
    super.initState();
    _expandedKeys = List.of(widget.expandedKeys);
  }

  @override
  void didUpdateWidget(FlowAccordion oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.expandedKeys != oldWidget.expandedKeys) {
      _expandedKeys = List.of(widget.expandedKeys);
    }
  }

  void _toggle(String key) {
    setState(() {
      if (_expandedKeys.contains(key)) {
        _expandedKeys.remove(key);
      } else if (widget.multiple) {
        _expandedKeys.add(key);
      } else {
        _expandedKeys = [key];
      }
    });
    widget.onChanged?.call(List.unmodifiable(_expandedKeys));
  }

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.accordion;

    Widget result = Column(
      mainAxisSize: MainAxisSize.min,
      children: widget.items.map((item) {
        final isExpanded = _expandedKeys.contains(item.key);
        return _AccordionItemWidget(
          item: item,
          isExpanded: isExpanded,
          onToggle: item.disabled ? null : () => _toggle(item.key),
          tokens: t,
          size: widget.size,
          bordered: widget.bordered,
        );
      }).toList(),
    );

    if (widget.semanticLabel != null) {
      result = Semantics(
        label: widget.semanticLabel,
        container: true,
        child: result,
      );
    }

    return result;
  }
}

class _AccordionItemWidget extends StatelessWidget {
  const _AccordionItemWidget({
    required this.item,
    required this.isExpanded,
    required this.onToggle,
    required this.tokens,
    required this.size,
    required this.bordered,
  });

  final FlowAccordionItem item;
  final bool isExpanded;
  final VoidCallback? onToggle;
  final FlowCompAccordion tokens;
  final FlowAccordionSize size;
  final bool bordered;

  double _resolveHeight() {
    switch (size) {
      case FlowAccordionSize.sm:
        return tokens.heightSm;
      case FlowAccordionSize.md:
        return tokens.heightMd;
      case FlowAccordionSize.lg:
        return tokens.heightLg;
      case FlowAccordionSize.xl:
        return tokens.heightXl;
    }
  }

  @override
  Widget build(BuildContext context) {
    final height = _resolveHeight();

    return DecoratedBox(
      decoration: BoxDecoration(
        border: bordered
            ? Border(
                bottom: BorderSide(
                  color: isExpanded ? tokens.borderExpanded : tokens.border,
                  width: 1,
                ),
              )
            : null,
        borderRadius: bordered ? null : BorderRadius.circular(tokens.radius),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Trigger button
          Semantics(
            label: item.label,
            button: true,
            expanded: isExpanded,
            enabled: !item.disabled,
            child: GestureDetector(
              onTap: onToggle,
              child: Container(
                height: height,
                color: tokens.bg,
                padding: EdgeInsets.symmetric(horizontal: tokens.paddingX),
                child: Row(
                  children: [
                    if (item.icon != null) ...[
                      FlowIcon(item.icon!,
                          size: FlowIconSize.sm, iconColor: tokens.icon),
                      SizedBox(width: tokens.gap > 0 ? tokens.gap : 8),
                    ],
                    Expanded(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          FlowText(item.label, role: FlowTextRole.labelM),
                          if (item.subtitle != null)
                            FlowText(
                              item.subtitle!,
                              role: FlowTextRole.paragraphS,
                              color: FlowTextColor.secondary,
                            ),
                        ],
                      ),
                    ),
                    AnimatedRotation(
                      turns: isExpanded ? 0.5 : 0.0,
                      duration: const Duration(milliseconds: 200),
                      child: FlowIcon(
                        Icons.expand_more,
                        size: FlowIconSize.sm,
                        iconColor: tokens.icon,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          // Content panel
          AnimatedCrossFade(
            firstChild: const SizedBox(width: double.infinity, height: 0),
            secondChild: Container(
              width: double.infinity,
              color: tokens.bgContent,
              padding: EdgeInsets.symmetric(
                horizontal: tokens.contentPaddingX,
                vertical: tokens.contentPaddingY,
              ),
              child: item.content,
            ),
            crossFadeState: isExpanded
                ? CrossFadeState.showSecond
                : CrossFadeState.showFirst,
            duration: const Duration(milliseconds: 200),
          ),
        ],
      ),
    );
  }
}
