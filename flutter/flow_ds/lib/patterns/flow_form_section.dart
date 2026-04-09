/// FLOW Design System — FlowFormSection (L4 Pattern)
/// ─────────────────────────────────────────────────
/// Collapsible form section with heading, description, and grouped child controls.
/// Composes FlowSurface, FlowActionSurface, FlowText, FlowStack, FlowIcon.
/// Maps to React's `<FlowFormSection>`.
import 'package:flutter/material.dart';

import '../primitives/action_surface.dart';
import '../primitives/icon.dart';
import '../primitives/stack.dart';
import '../primitives/surface.dart';
import '../primitives/text.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowFormSection
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowFormSection extends StatefulWidget {
  const FlowFormSection({
    super.key,
    required this.title,
    this.description,
    this.collapsible = false,
    this.defaultOpen = true,
    this.children = const [],
  });

  /// Section heading text.
  final String title;

  /// Optional description below the heading.
  final String? description;

  /// Whether the section can be collapsed.
  final bool collapsible;

  /// Whether the section starts expanded.
  final bool defaultOpen;

  /// Form controls rendered inside the section.
  final List<Widget> children;

  @override
  State<FlowFormSection> createState() => _FlowFormSectionState();
}

class _FlowFormSectionState extends State<FlowFormSection>
    with SingleTickerProviderStateMixin {
  late bool _open;
  late final AnimationController _anim;
  late final Animation<double> _rotation;

  @override
  void initState() {
    super.initState();
    _open = widget.defaultOpen;
    _anim = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
      value: _open ? 1.0 : 0.0,
    );
    _rotation = Tween<double>(begin: 0.0, end: 0.5).animate(
      CurvedAnimation(parent: _anim, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _anim.dispose();
    super.dispose();
  }

  void _toggle() {
    setState(() {
      _open = !_open;
      if (_open) {
        _anim.forward();
      } else {
        _anim.reverse();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    final header = FlowStack(
      gap: sys.gapTight,
      children: [
        FlowText(widget.title, role: FlowTextRole.headingM),
        if (widget.description != null)
          FlowText(
            widget.description!,
            role: FlowTextRole.caption,
            color: FlowTextColor.secondary,
          ),
      ],
    );

    return Semantics(
      label: widget.title,
      child: FlowSurface(
        border: false,
        padding: FlowPadding.none,
        elevation: 0,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: [
            // Header
            if (widget.collapsible)
              FlowActionSurface(
                onTap: _toggle,
                border: false,
                padding: FlowPadding.none,
                semanticLabel: _open
                    ? 'Collapse ${widget.title}'
                    : 'Expand ${widget.title}',
                child: Padding(
                  padding: EdgeInsets.only(
                    bottom: _open ? sys.gapComponent : 0,
                  ),
                  child: Row(
                    children: [
                      Expanded(child: header),
                      RotationTransition(
                        turns: _rotation,
                        child: FlowIcon(
                          Icons.expand_more,
                          size: FlowIconSize.sm,
                          colorRole: FlowIconColor.tertiary,
                        ),
                      ),
                    ],
                  ),
                ),
              )
            else
              Padding(
                padding: EdgeInsets.only(bottom: sys.gapComponent),
                child: header,
              ),
            // Content
            if (_open || !widget.collapsible)
              FlowStack(
                gap: FlowGap.component,
                children: widget.children,
              ),
          ],
        ),
      ),
    );
  }
}
