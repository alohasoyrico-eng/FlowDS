/// FLOW Design System — FlowToolbar (L4 Pattern)
/// ──────────────────────────────────────────────
/// Horizontal action bar for grouping buttons, dividers, and tool controls.
/// Composes FlowInline, FlowDivider primitives.
/// Maps to React's `<FlowToolbar>`.
import 'package:flutter/material.dart';

import '../primitives/inline.dart';
import '../primitives/stack.dart';
import '../theme/flow_size_provider.dart';
import '../tokens/density.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowToolbar
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowToolbar extends StatelessWidget {
  const FlowToolbar({
    super.key,
    this.children = const [],
    this.leftActions,
    this.rightActions,
    this.size,
    this.bordered = true,
    this.disabled = false,
    this.semanticLabel = 'Toolbar',
  });

  /// Toolbar content (buttons, dividers, etc.).
  final List<Widget> children;

  /// Left-aligned actions.
  final List<Widget>? leftActions;

  /// Right-aligned actions.
  final List<Widget>? rightActions;

  /// Size variant. Omit to inherit from [FlowSizeProvider].
  final FlowComponentSize? size;

  /// Whether to show a border around the toolbar.
  final bool bordered;

  /// Disabled state -- disables all toolbar children.
  final bool disabled;

  /// Accessible label for the toolbar.
  final String semanticLabel;

  @override
  Widget build(BuildContext context) {
    final resolvedSize = size ?? FlowSizeProvider.of(context);
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final hasSlots = leftActions != null || rightActions != null;

    final heightMap = <FlowComponentSize, double>{
      FlowComponentSize.sm: sys.heightControlSm,
      FlowComponentSize.md: sys.heightControlMd,
      FlowComponentSize.lg: sys.heightControlLg,
      FlowComponentSize.xl: sys.heightControlXl,
    };

    return Semantics(
      label: semanticLabel,
      enabled: !disabled,
      child: IgnorePointer(
        ignoring: disabled,
        child: AnimatedOpacity(
          duration: const Duration(milliseconds: 150),
          opacity: disabled ? 0.5 : 1.0,
          child: Container(
            height: heightMap[resolvedSize],
            decoration: bordered
                ? BoxDecoration(
                    border: Border.all(
                      color: sys.borderDefault,
                      width: sys.borderThin,
                    ),
                    borderRadius: BorderRadius.circular(sys.radiusControl),
                  )
                : null,
            padding: EdgeInsets.symmetric(horizontal: sys.paddingControl),
            child: hasSlots
                ? Row(
                    children: [
                      if (leftActions != null)
                        FlowInline(
                          gap: FlowGap.tight,
                          children: leftActions!,
                        ),
                      const Spacer(),
                      if (rightActions != null)
                        FlowInline(
                          gap: FlowGap.tight,
                          children: rightActions!,
                        ),
                    ],
                  )
                : FlowInline(
                    gap: FlowGap.tight,
                    children: children,
                  ),
          ),
        ),
      ),
    );
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowToolbarDivider
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Vertical separator within a toolbar.
class FlowToolbarDivider extends StatelessWidget {
  const FlowToolbarDivider({super.key});

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    return Semantics(
      label: 'Separator',
      child: SizedBox(
        width: sys.borderThin,
        height: sys.heightControlSm * 0.6,
        child: ColoredBox(color: sys.borderDefault),
      ),
    );
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowToolbarGroup
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Group of items within a toolbar.
class FlowToolbarGroup extends StatelessWidget {
  const FlowToolbarGroup({
    super.key,
    this.children = const [],
  });

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      container: true,
      child: FlowInline(
        gap: FlowGap.tight,
        children: children,
      ),
    );
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowToolbarSpacer
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Spacer that pushes trailing items to the end.
class FlowToolbarSpacer extends StatelessWidget {
  const FlowToolbarSpacer({super.key});

  @override
  Widget build(BuildContext context) => const Spacer();
}
