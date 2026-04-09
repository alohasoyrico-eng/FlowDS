/// FLOW Design System — FlowKPICard (L4 Pattern)
/// ──────────────────────────────────────────────
/// Key performance indicator card showing a metric value, label, and trend.
/// Composes FlowSurface, FlowIcon, FlowText, FlowSkeleton, FlowStack,
/// FlowInline (L2/L3).
///
/// Maps to React's `<FlowKPICard>` from FlowKPICard.tsx.
import 'package:flutter/material.dart';

import '../components/feedback/flow_skeleton.dart';
import '../primitives/icon.dart';
import '../primitives/inline.dart';
import '../primitives/stack.dart';
import '../primitives/surface.dart';
import '../primitives/text.dart';
import '../theme/flow_size_provider.dart';
import '../tokens/density.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Enums
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Trend direction.
enum FlowKPITrend { up, down, neutral }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowKPICard
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowKPICard extends StatelessWidget {
  const FlowKPICard({
    super.key,
    required this.value,
    required this.label,
    this.description,
    this.trend,
    this.trendValue,
    this.upIsGood = true,
    this.icon,
    this.size,
    this.loading = false,
    this.error = false,
    this.onTap,
    this.tone,
  });

  /// Main metric value (e.g. "1,234").
  final String value;

  /// Metric label.
  final String label;

  /// Optional description / subtitle.
  final String? description;

  /// Trend direction.
  final FlowKPITrend? trend;

  /// Trend value text (e.g. "+12.5%").
  final String? trendValue;

  /// Whether "up" trend is positive (green). Default: true.
  final bool upIsGood;

  /// Leading icon.
  final IconData? icon;

  /// Size variant. Omit to inherit from [FlowSizeProvider].
  final FlowComponentSize? size;

  /// Loading state — shows skeleton.
  final bool loading;

  /// Error state.
  final bool error;

  /// Click handler — makes card interactive.
  final VoidCallback? onTap;

  /// Tone variant.
  final FlowTone? tone;

  FlowComponentSize _resolvedSize(BuildContext context) =>
      size ?? FlowSizeProvider.of(context);

  double _padding(FlowSysTokens sys, FlowComponentSize s) {
    switch (s) {
      case FlowComponentSize.sm:
        return sys.paddingControl;
      case FlowComponentSize.lg:
        return sys.paddingSurface;
      default:
        return sys.paddingContainer;
    }
  }

  FlowTextRole _valueRole(FlowComponentSize s) {
    switch (s) {
      case FlowComponentSize.sm:
        return FlowTextRole.headingM;
      case FlowComponentSize.lg:
        return FlowTextRole.displayS;
      default:
        return FlowTextRole.displayXs;
    }
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final s = _resolvedSize(context);
    final pad = _padding(sys, s);

    if (loading) {
      return FlowSurface(
        radius: FlowRadius.container,
        border: true,
        padding: pad,
        child: FlowStack(
          gap: sys.gapComponent,
          children: [
            FlowSkeleton(variant: FlowSkeletonVariant.text, width: 100),
            FlowSkeleton(variant: FlowSkeletonVariant.text, width: 60),
            FlowSkeleton(variant: FlowSkeletonVariant.text, width: 40),
          ],
        ),
      );
    }

    final isPositive = trend == FlowKPITrend.up
        ? upIsGood
        : trend == FlowKPITrend.down
            ? !upIsGood
            : true;
    final trendColor = (trend == null || trend == FlowKPITrend.neutral)
        ? sys.textSecondary
        : isPositive
            ? sys.statusSuccess
            : sys.statusError;
    final trendIcon = trend == FlowKPITrend.up
        ? Icons.trending_up
        : trend == FlowKPITrend.down
            ? Icons.trending_down
            : Icons.remove;

    Widget card = FlowSurface(
      radius: FlowRadius.container,
      border: true,
      padding: pad,
      child: FlowStack(
        gap: sys.gapComponent,
        children: [
          // Header: icon + label
          FlowInline(
            gap: sys.gapTight,
            children: [
              if (icon != null)
                FlowIcon(icon!,
                    size: FlowIconSize.sm, iconColor: sys.textAccent),
              FlowText(label,
                  role: FlowTextRole.overline,
                  color: FlowTextColor.secondary,
                  tone: tone),
            ],
          ),

          // Value
          FlowText(value, role: _valueRole(s), tone: tone),

          // Trend + description
          FlowInline(
            gap: sys.gapTight,
            children: [
              if (trend != null)
                FlowInline(
                  gap: sys.gapTight / 2,
                  children: [
                    FlowIcon(trendIcon,
                        size: FlowIconSize.sm, iconColor: trendColor),
                    if (trendValue != null)
                      FlowText(trendValue!,
                          role: FlowTextRole.caption,
                          color: FlowTextColor.primary),
                  ],
                ),
              if (description != null)
                Flexible(
                  child: FlowText(description!,
                      role: FlowTextRole.paragraphS,
                      color: FlowTextColor.secondary,
                      tone: tone),
                ),
            ],
          ),
        ],
      ),
    );

    if (onTap != null) {
      card = Semantics(
        button: true,
        child: GestureDetector(onTap: onTap, child: card),
      );
    }

    if (error) {
      card = Semantics(label: 'Error', child: card);
    }

    return card;
  }
}
