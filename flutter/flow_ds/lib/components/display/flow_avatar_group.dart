/// FLOW Design System — FlowAvatarGroup (L3 Component)
/// ─────────────────────────────────────────────────────
/// Stacked avatars with an overflow "+N" indicator.
/// Consumes comp.avatar tokens for sizing.
import 'package:flutter/material.dart';

import '../../primitives/text.dart';
import '../../tokens/comp_tokens.dart';
import 'flow_avatar.dart';

class FlowAvatarGroup extends StatelessWidget {
  const FlowAvatarGroup({
    super.key,
    required this.avatars,
    this.max = 4,
    this.size = FlowAvatarSize.md,
    this.semanticLabel,
  });

  /// List of FlowAvatar widgets to stack.
  final List<FlowAvatar> avatars;

  /// Maximum visible avatars before showing +N indicator.
  final int max;

  /// Shared size tier applied to the overflow indicator.
  final FlowAvatarSize size;

  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).extension<FlowCompTokens>()!.avatar;

    final double dimension = _sizeValue(t);
    final double overlap = dimension * 0.3;
    final visible = avatars.length <= max ? avatars : avatars.sublist(0, max);
    final overflowCount = avatars.length - visible.length;

    final children = <Widget>[];
    for (var i = 0; i < visible.length; i++) {
      children.add(
        Padding(
          padding: EdgeInsetsDirectional.only(start: i == 0 ? 0 : overlap),
          child: visible[i],
        ),
      );
    }

    if (overflowCount > 0) {
      children.add(
        Padding(
          padding: EdgeInsetsDirectional.only(start: overlap),
          child: Container(
            width: dimension,
            height: dimension,
            decoration: BoxDecoration(
              color: t.bg,
              shape: BoxShape.circle,
              border: Border.all(color: t.statusRing, width: t.statusRingWidth),
            ),
            alignment: Alignment.center,
            child: FlowText(
              '+$overflowCount',
              role: FlowTextRole.caption,
              color: FlowTextColor.primary,
            ),
          ),
        ),
      );
    }

    return Semantics(
      label: semanticLabel ?? '${avatars.length} avatars',
      child: Row(mainAxisSize: MainAxisSize.min, children: children),
    );
  }

  double _sizeValue(FlowCompAvatar t) => switch (size) {
        FlowAvatarSize.sm => t.sizeSm,
        FlowAvatarSize.md => t.sizeMd,
        FlowAvatarSize.lg => t.sizeLg,
        FlowAvatarSize.xl => t.sizeXl,
      };
}
