/// FLOW Design System — FlowEmptyState (L4 Pattern)
/// ──────────────────────────────────────────────────
/// Placeholder with icon, title, description, and action buttons
/// for empty content areas.
/// Composes FlowIcon, FlowText, FlowStack, FlowInline (L2 primitives).
///
/// Maps to React's `<FlowEmptyState>` from FlowEmptyState.tsx.
import 'package:flutter/material.dart';

import '../primitives/icon.dart';
import '../primitives/inline.dart';
import '../primitives/stack.dart';
import '../primitives/text.dart';
import '../theme/flow_size_provider.dart';
import '../tokens/density.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowEmptyState
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowEmptyState extends StatelessWidget {
  const FlowEmptyState({
    super.key,
    this.icon = Icons.search,
    required this.title,
    this.description,
    this.action,
    this.secondaryAction,
    this.size,
    this.tone,
  });

  /// Icon displayed above the title.
  final IconData icon;

  /// Title text.
  final String title;

  /// Description text below the title.
  final String? description;

  /// Primary action widget (typically a FlowButton).
  final Widget? action;

  /// Secondary action widget.
  final Widget? secondaryAction;

  /// Size variant. Omit to inherit from [FlowSizeProvider].
  final FlowComponentSize? size;

  /// Tone variant.
  final FlowTone? tone;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final resolvedSize = size ?? FlowSizeProvider.of(context);
    final isSmall = resolvedSize == FlowComponentSize.sm;
    final innerGap = isSmall ? sys.gapTight : sys.gapComponent;

    return Semantics(
      container: true,
      child: Padding(
        padding: EdgeInsets.symmetric(
          vertical: sys.paddingSurface,
          horizontal: sys.paddingContainer,
        ),
        child: FlowStack(
          gap: sys.gapComponent,
          align: CrossAxisAlignment.center,
          children: [
            // Icon
            FlowIcon(icon,
                size: FlowIconSize.xl, colorRole: FlowIconColor.tertiary),

            // Title + description
            FlowStack(
              gap: innerGap,
              align: CrossAxisAlignment.center,
              children: [
                FlowText(title,
                    role: FlowTextRole.headingM,
                    color: FlowTextColor.primary,
                    tone: tone,
                    align: TextAlign.center),
                if (description != null)
                  FlowText(description!,
                      role: FlowTextRole.paragraphS,
                      color: FlowTextColor.tertiary,
                      tone: tone,
                      align: TextAlign.center),
              ],
            ),

            // Actions
            if (action != null || secondaryAction != null)
              FlowInline(
                gap: sys.gapComponent,
                mainAlign: MainAxisAlignment.center,
                children: [
                  if (action != null) action!,
                  if (secondaryAction != null) secondaryAction!,
                ],
              ),
          ],
        ),
      ),
    );
  }
}
