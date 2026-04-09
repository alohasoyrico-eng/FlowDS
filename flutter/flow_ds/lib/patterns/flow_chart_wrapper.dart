/// FLOW Design System — FlowChartWrapper (L4 Pattern)
/// ──────────────────────────────────────────────────
/// Container for chart libraries providing title, legend, and
/// loading/error/empty states.
/// Composes FlowSurface, FlowText, FlowCircularProgress, FlowInline, FlowStack.
/// Maps to React's `<FlowChartWrapper>`.
import 'package:flutter/material.dart';

import '../components/feedback/flow_circular_progress.dart';
import '../primitives/inline.dart';
import '../primitives/stack.dart';
import '../primitives/surface.dart';
import '../primitives/text.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowChartWrapper
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowChartWrapper extends StatelessWidget {
  const FlowChartWrapper({
    super.key,
    this.title,
    this.subtitle,
    this.legend,
    this.actions,
    this.child,
    this.height = 300.0,
    this.loading = false,
    this.error = false,
    this.errorMessage = 'Failed to load chart',
    this.empty = false,
    this.emptyMessage = 'No data available',
  });

  /// Chart title text.
  final String? title;

  /// Subtitle below the title.
  final String? subtitle;

  /// Legend content rendered below the chart.
  final Widget? legend;

  /// Action elements rendered in the header.
  final Widget? actions;

  /// Chart content (chart library output).
  final Widget? child;

  /// Chart area height.
  final double height;

  /// Whether the chart is loading.
  final bool loading;

  /// Whether the chart has an error.
  final bool error;

  /// Error message displayed in the chart area.
  final String errorMessage;

  /// Whether the chart has no data.
  final bool empty;

  /// Message shown when chart data is empty.
  final String emptyMessage;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    return Semantics(
      label: title ?? 'Chart',
      child: FlowSurface(
        radius: FlowRadius.container,
        border: true,
        padding: FlowPadding.control,
        child: FlowStack(
          gap: FlowGap.component,
          children: [
            // Header
            if (title != null || actions != null)
              FlowInline(
                mainAlign: MainAxisAlignment.spaceBetween,
                align: CrossAxisAlignment.start,
                children: [
                  FlowStack(
                    gap: sys.gapTight,
                    children: [
                      if (title != null)
                        FlowText(title!, role: FlowTextRole.labelM),
                      if (subtitle != null)
                        FlowText(
                          subtitle!,
                          role: FlowTextRole.caption,
                          color: FlowTextColor.secondary,
                        ),
                    ],
                  ),
                  if (actions != null) actions!,
                ],
              ),

            // Chart area
            SizedBox(
              height: height,
              child: _buildContent(sys),
            ),

            // Legend
            if (legend != null)
              FlowInline(
                gap: sys.gapComponent,
                wrap: true,
                mainAlign: MainAxisAlignment.center,
                children: [legend!],
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildContent(FlowSysTokens sys) {
    if (loading) {
      return Container(
        decoration: BoxDecoration(
          color: sys.surfaceSecondary,
          borderRadius: BorderRadius.circular(sys.radiusSm),
        ),
        alignment: Alignment.center,
        child: const FlowCircularProgress(
          size: FlowCircularProgressSize.sm,
          semanticLabel: 'Loading chart',
        ),
      );
    }

    if (error) {
      return Semantics(
        liveRegion: true,
        child: Container(
          decoration: BoxDecoration(
            color: sys.surfaceSecondary,
            borderRadius: BorderRadius.circular(sys.radiusSm),
          ),
          alignment: Alignment.center,
          child: FlowText(
            errorMessage,
            role: FlowTextRole.paragraphM,
            color: FlowTextColor.danger,
          ),
        ),
      );
    }

    if (empty) {
      return Center(
        child: FlowText(
          emptyMessage,
          role: FlowTextRole.paragraphM,
          color: FlowTextColor.tertiary,
        ),
      );
    }

    return child ?? const SizedBox.shrink();
  }
}
