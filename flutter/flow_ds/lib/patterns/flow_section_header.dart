/// FLOW Design System — FlowSectionHeader (L4 Pattern)
/// ─────────────────────────────────────────────────────
/// Section heading with optional subtitle, trailing action, and divider.
/// Composes FlowText, FlowDivider, FlowInline, FlowStack (L2 primitives).
///
/// Maps to React's `<FlowSectionHeader>` from FlowSectionHeader.tsx.
import 'package:flutter/material.dart';

import '../primitives/divider.dart';
import '../primitives/inline.dart';
import '../primitives/stack.dart';
import '../primitives/text.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSectionHeader
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowSectionHeader extends StatelessWidget {
  const FlowSectionHeader({
    super.key,
    required this.title,
    this.subtitle,
    this.action,
    this.divider = true,
    this.tone,
  });

  /// Section heading text.
  final String title;

  /// Optional subtitle below the title.
  final String? subtitle;

  /// Action element (e.g. FlowButton) rendered on the right.
  final Widget? action;

  /// Whether to show a divider below the header.
  final bool divider;

  /// Color tone for the header text.
  final FlowTone? tone;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    return Semantics(
      header: true,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          FlowInline(
            gap: sys.gapComponent,
            mainAlign: MainAxisAlignment.spaceBetween,
            mainSize: MainAxisSize.max,
            align: CrossAxisAlignment.end,
            children: [
              Flexible(
                child: FlowStack(
                  gap: sys.gapTight,
                  children: [
                    FlowText(title, role: FlowTextRole.headingM, tone: tone),
                    if (subtitle != null)
                      FlowText(subtitle!,
                          role: FlowTextRole.caption,
                          color: FlowTextColor.secondary,
                          tone: tone),
                  ],
                ),
              ),
              if (action != null) action!,
            ],
          ),
          if (divider) FlowDivider(spacing: sys.gapComponent),
        ],
      ),
    );
  }
}
