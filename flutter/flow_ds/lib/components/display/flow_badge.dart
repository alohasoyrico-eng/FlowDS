/// FLOW Design System — FlowBadge (L3 Component)
/// ──────────────────────────────────────────────
/// Notification badge: dot or count, 4 tones.
/// Anchored to a child widget or standalone.
/// Consumes comp.badge tokens via FlowCompTokens.
import 'package:flutter/material.dart';

import '../../tokens/comp_tokens.dart';

/// Badge display variant.
enum FlowBadgeVariant { dot, count }

/// Badge color tone.
enum FlowBadgeTone { defaultTone, accent, success, warning }

class FlowBadge extends StatelessWidget {
  const FlowBadge({
    super.key,
    this.child,
    this.content,
    this.variant = FlowBadgeVariant.count,
    this.tone = FlowBadgeTone.defaultTone,
    this.max = 99,
    this.hidden = false,
    this.semanticLabel,
  });

  /// Element the badge is anchored to.
  final Widget? child;

  /// Numeric or text content (ignored for dot variant).
  final dynamic content;

  final FlowBadgeVariant variant;
  final FlowBadgeTone tone;

  /// Max count; shows "99+" when exceeded.
  final int max;

  /// Whether to hide the badge.
  final bool hidden;

  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).extension<FlowCompTokens>()!.badge;

    if (hidden) return child ?? const SizedBox.shrink();

    final bgColor = _bgColor(t);
    final String? displayText = _displayText();

    final badge = Semantics(
      label: semanticLabel ?? (displayText ?? 'notification'),
      child: Container(
        constraints: BoxConstraints(
          minWidth: variant == FlowBadgeVariant.dot ? t.minSize : t.height,
          minHeight: variant == FlowBadgeVariant.dot ? t.minSize : t.height,
        ),
        padding: variant == FlowBadgeVariant.dot
            ? EdgeInsets.zero
            : EdgeInsets.symmetric(horizontal: t.paddingX),
        decoration: BoxDecoration(
          color: bgColor,
          borderRadius: BorderRadius.circular(t.radius),
          border: Border.all(color: t.ring, width: t.ringWidth),
        ),
        alignment: Alignment.center,
        child: displayText != null
            ? Text(
                displayText,
                style: TextStyle(
                  fontSize: t.font,
                  fontWeight: t.fontWeight,
                  color: t.text,
                  height: 1,
                ),
              )
            : null,
      ),
    );

    if (child == null) return badge;

    return Stack(
      clipBehavior: Clip.none,
      children: [
        child!,
        Positioned(
          top: -t.height / 3,
          right: -t.height / 3,
          child: badge,
        ),
      ],
    );
  }

  String? _displayText() {
    if (variant == FlowBadgeVariant.dot) return null;
    if (content is int && content > max) return '$max+';
    return content?.toString();
  }

  Color _bgColor(FlowCompBadge t) => switch (tone) {
        FlowBadgeTone.defaultTone => t.bgDefault,
        FlowBadgeTone.accent => t.bgAccent,
        FlowBadgeTone.success => t.bgSuccess,
        FlowBadgeTone.warning => t.bgWarning,
      };
}
