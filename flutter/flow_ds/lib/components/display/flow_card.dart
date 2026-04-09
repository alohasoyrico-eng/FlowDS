/// FLOW Design System — FlowCard (L3 Component)
/// ─────────────────────────────────────────────
/// Elevated / outlined / filled content container.
/// Optional interactivity with hover shadow lift.
/// Consumes comp.card tokens via FlowCompTokens.
import 'package:flutter/material.dart';

import '../../tokens/comp_tokens.dart';

/// Card visual variant.
enum FlowCardVariant { elevated, outlined, filled }

class FlowCard extends StatefulWidget {
  const FlowCard({
    super.key,
    required this.child,
    this.variant = FlowCardVariant.elevated,
    this.interactive = false,
    this.onTap,
    this.semanticLabel,
  });

  final Widget child;
  final FlowCardVariant variant;
  final bool interactive;
  final VoidCallback? onTap;
  final String? semanticLabel;

  @override
  State<FlowCard> createState() => _FlowCardState();
}

class _FlowCardState extends State<FlowCard> {
  bool _hovered = false;

  bool get _isInteractive => widget.interactive || widget.onTap != null;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).extension<FlowCompTokens>()!.card;

    final bgColor = switch (widget.variant) {
      FlowCardVariant.elevated => t.bgElevated,
      FlowCardVariant.outlined => t.bgOutlined,
      FlowCardVariant.filled => t.bgFilled,
    };

    final shadows = widget.variant == FlowCardVariant.outlined
        ? const <BoxShadow>[]
        : (_hovered && _isInteractive ? t.shadowHover : t.shadow);

    final border = widget.variant != FlowCardVariant.elevated
        ? Border.all(color: t.border, width: 1)
        : null;

    Widget card = AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      curve: Curves.easeOut,
      padding: EdgeInsets.all(t.padding),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(t.radius),
        border: border,
        boxShadow: shadows.isNotEmpty ? shadows : null,
      ),
      child: widget.child,
    );

    if (_isInteractive) {
      card = MouseRegion(
        onEnter: (_) => setState(() => _hovered = true),
        onExit: (_) => setState(() => _hovered = false),
        cursor: SystemMouseCursors.click,
        child: GestureDetector(onTap: widget.onTap, child: card),
      );
    }

    return Semantics(
      label: widget.semanticLabel,
      button: _isInteractive,
      child: card,
    );
  }
}
