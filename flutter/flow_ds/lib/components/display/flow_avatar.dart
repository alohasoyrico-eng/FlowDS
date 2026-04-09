/// FLOW Design System — FlowAvatar (L3 Component)
/// ────────────────────────────────────────────────
/// User / entity avatar: image, initials, or icon fallback.
/// 4 sizes (sm/md/lg/xl), round or square, optional status indicator.
/// Consumes comp.avatar tokens via FlowCompTokens.
import 'package:flutter/material.dart';

import '../../primitives/icon.dart';
import '../../primitives/text.dart';
import '../../tokens/comp_tokens.dart';

/// Size tier for the avatar.
enum FlowAvatarSize { sm, md, lg, xl }

/// Shape variant.
enum FlowAvatarShape { circle, square }

/// Online / presence status.
enum FlowAvatarStatus { online, offline, busy, away }

class FlowAvatar extends StatelessWidget {
  const FlowAvatar({
    super.key,
    this.imageUrl,
    this.initials,
    this.name,
    this.icon = Icons.person_outline,
    this.size = FlowAvatarSize.md,
    this.shape = FlowAvatarShape.circle,
    this.status,
    this.semanticLabel,
  });

  final String? imageUrl;
  final String? initials;
  final String? name;
  final IconData icon;
  final FlowAvatarSize size;
  final FlowAvatarShape shape;
  final FlowAvatarStatus? status;
  final String? semanticLabel;

  String? get _resolvedInitials {
    if (initials != null) return initials;
    if (name == null) return null;
    return name!
        .split(' ')
        .where((w) => w.isNotEmpty)
        .map((w) => w[0])
        .take(2)
        .join()
        .toUpperCase();
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).extension<FlowCompTokens>()!.avatar;

    final double dimension = _sizeValue(t);
    final double fontSize = _fontValue(t);
    final double radius =
        shape == FlowAvatarShape.circle ? t.radius : t.radiusSquare;
    final FlowIconSize iconSize = _iconSize();

    final hasImage = imageUrl != null && imageUrl!.isNotEmpty;
    final hasInitials = !hasImage && _resolvedInitials != null;

    Widget content;
    if (hasImage) {
      content = ClipRRect(
        borderRadius: BorderRadius.circular(radius),
        child: Image.network(
          imageUrl!,
          width: dimension,
          height: dimension,
          fit: BoxFit.cover,
          errorBuilder: (_, __, ___) => _fallbackIcon(t, iconSize),
        ),
      );
    } else if (hasInitials) {
      content = FlowText(
        _resolvedInitials!,
        role: FlowTextRole.caption,
        color: FlowTextColor.primary,
      );
    } else {
      content = _fallbackIcon(t, iconSize);
    }

    Widget avatar = Container(
      width: dimension,
      height: dimension,
      decoration: BoxDecoration(
        color: hasImage ? null : t.bg,
        borderRadius: BorderRadius.circular(radius),
        border: Border.all(color: t.border, width: t.statusRingWidth),
      ),
      alignment: Alignment.center,
      child: DefaultTextStyle(
        style: TextStyle(fontSize: fontSize, color: t.text),
        child: content,
      ),
    );

    if (status != null) {
      final double statusSize = _statusSize(t);
      avatar = Stack(
        clipBehavior: Clip.none,
        children: [
          avatar,
          Positioned(
            right: 0,
            bottom: 0,
            child: Container(
              width: statusSize,
              height: statusSize,
              decoration: BoxDecoration(
                color: _statusColor(t),
                shape: BoxShape.circle,
                border:
                    Border.all(color: t.statusRing, width: t.statusRingWidth),
              ),
            ),
          ),
        ],
      );
    }

    return Semantics(
      image: true,
      label: semanticLabel ?? _resolvedInitials ?? name ?? 'Avatar',
      child: avatar,
    );
  }

  Widget _fallbackIcon(FlowCompAvatar t, FlowIconSize iconSize) {
    return FlowIcon(icon, size: iconSize, iconColor: t.text);
  }

  double _sizeValue(FlowCompAvatar t) => switch (size) {
        FlowAvatarSize.sm => t.sizeSm,
        FlowAvatarSize.md => t.sizeMd,
        FlowAvatarSize.lg => t.sizeLg,
        FlowAvatarSize.xl => t.sizeXl,
      };

  double _fontValue(FlowCompAvatar t) => switch (size) {
        FlowAvatarSize.sm => t.fontSm,
        FlowAvatarSize.md => t.fontMd,
        FlowAvatarSize.lg => t.fontLg,
        FlowAvatarSize.xl => t.fontXl,
      };

  FlowIconSize _iconSize() => switch (size) {
        FlowAvatarSize.sm => FlowIconSize.sm,
        FlowAvatarSize.md => FlowIconSize.md,
        FlowAvatarSize.lg => FlowIconSize.md,
        FlowAvatarSize.xl => FlowIconSize.lg,
      };

  double _statusSize(FlowCompAvatar t) => switch (size) {
        FlowAvatarSize.sm => t.statusSizeSm,
        FlowAvatarSize.md => t.statusSizeMd,
        FlowAvatarSize.lg => t.statusSizeLg,
        FlowAvatarSize.xl => t.statusSizeXl,
      };

  Color _statusColor(FlowCompAvatar t) => switch (status!) {
        FlowAvatarStatus.online => t.statusOnline,
        FlowAvatarStatus.offline => t.statusOffline,
        FlowAvatarStatus.busy => t.statusBusy,
        FlowAvatarStatus.away => t.statusAway,
      };
}
