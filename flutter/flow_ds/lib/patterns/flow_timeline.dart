/// FLOW Design System — FlowTimeline (L4 Pattern)
/// ───────────────────────────────────────────────
/// Vertical event timeline with colored dots, titles, and timestamps.
/// Composes FlowText, FlowStack (L2 primitives).
///
/// Maps to React's `<FlowTimeline>` from FlowTimeline.tsx.
import 'package:flutter/material.dart';

import '../primitives/stack.dart';
import '../primitives/text.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Data
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Color variant for a timeline event.
enum FlowTimelineVariant { defaultVariant, success, warning, error, info }

/// A single timeline event.
class FlowTimelineItem {
  const FlowTimelineItem({
    required this.id,
    required this.title,
    this.description,
    this.timestamp,
    this.variant = FlowTimelineVariant.defaultVariant,
  });

  final String id;
  final String title;
  final String? description;
  final String? timestamp;
  final FlowTimelineVariant variant;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Widget
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowTimeline extends StatelessWidget {
  const FlowTimeline({
    super.key,
    required this.items,
    this.tone,
  });

  /// Timeline event items.
  final List<FlowTimelineItem> items;

  /// Tone variant.
  final FlowTone? tone;

  Color _variantColor(FlowSysTokens sys, FlowTimelineVariant v) {
    switch (v) {
      case FlowTimelineVariant.defaultVariant:
        return sys.textTertiary;
      case FlowTimelineVariant.success:
        return sys.statusSuccess;
      case FlowTimelineVariant.warning:
        return sys.statusWarning;
      case FlowTimelineVariant.error:
        return sys.statusError;
      case FlowTimelineVariant.info:
        return sys.statusInfo;
    }
  }

  @override
  Widget build(BuildContext context) {
    if (items.isEmpty) return const SizedBox.shrink();

    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final dotSize = sys.gapTight; // ~8-12 logical px
    final lineWidth = sys.borderThin;

    return Semantics(
      container: true,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: List.generate(items.length, (i) {
          final item = items[i];
          final isLast = i == items.length - 1;
          final color = _variantColor(sys, item.variant);

          return Padding(
            padding: isLast
                ? EdgeInsets.zero
                : EdgeInsets.only(bottom: sys.gapComponent),
            child: IntrinsicHeight(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Gutter: dot + line
                  SizedBox(
                    width: sys.gapComponent,
                    child: Column(
                      children: [
                        // Dot
                        Container(
                          width: dotSize,
                          height: dotSize,
                          margin: EdgeInsets.only(top: sys.gapTight / 2),
                          decoration: BoxDecoration(
                            color: color,
                            shape: BoxShape.circle,
                          ),
                        ),
                        // Line
                        if (!isLast)
                          Expanded(
                            child: Padding(
                              padding: EdgeInsets.only(top: sys.gapTight / 2),
                              child: SizedBox(
                                width: lineWidth,
                                child: ColoredBox(color: sys.borderDefault),
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                  SizedBox(width: sys.gapComponent),
                  // Content
                  Expanded(
                    child: FlowStack(
                      gap: sys.gapTight,
                      children: [
                        FlowText(item.title,
                            role: FlowTextRole.labelS, tone: tone),
                        if (item.description != null)
                          FlowText(item.description!,
                              role: FlowTextRole.caption,
                              color: FlowTextColor.secondary),
                        if (item.timestamp != null)
                          FlowText(item.timestamp!,
                              role: FlowTextRole.caption,
                              color: FlowTextColor.secondary),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        }),
      ),
    );
  }
}
