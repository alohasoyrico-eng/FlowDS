/// FLOW Design System — FlowNotificationPanel (L4 Pattern)
/// ─────────────────────────────────────────────────────────
/// Notification center panel with grouped items, read state, and actions.
/// Composes FlowSurface, FlowIcon, FlowText, FlowBadge, FlowButton,
/// FlowIconButton, FlowStack, FlowInline (L2/L3).
///
/// Maps to React's `<FlowNotificationPanel>` from FlowNotificationPanel.tsx.
import 'package:flutter/material.dart';

import '../components/controls/flow_button.dart';
import '../components/controls/flow_icon_button.dart';
import '../components/display/flow_badge.dart';
import '../primitives/icon.dart';
import '../primitives/inline.dart';
import '../primitives/stack.dart';
import '../primitives/surface.dart';
import '../primitives/text.dart';
import '../tokens/density.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Data classes
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Severity variant for a notification.
enum FlowNotificationVariant { info, success, warning, error }

/// Action attached to a notification.
class FlowNotificationAction {
  const FlowNotificationAction({required this.label, required this.onPressed});
  final String label;
  final VoidCallback onPressed;
}

/// A single notification item.
class FlowNotificationItem {
  const FlowNotificationItem({
    required this.id,
    required this.title,
    this.message,
    required this.timestamp,
    this.read = false,
    this.icon,
    this.variant = FlowNotificationVariant.info,
    this.action,
  });

  final String id;
  final String title;
  final String? message;
  final String timestamp;
  final bool read;
  final IconData? icon;
  final FlowNotificationVariant variant;
  final FlowNotificationAction? action;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Widget
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowNotificationPanel extends StatelessWidget {
  const FlowNotificationPanel({
    super.key,
    required this.notifications,
    this.onMarkRead,
    this.onMarkAllRead,
    this.onDismiss,
    this.title = 'Notifications',
    this.emptyMessage = 'No new notifications',
    this.maxHeight = 420,
  });

  final List<FlowNotificationItem> notifications;
  final void Function(String id)? onMarkRead;
  final VoidCallback? onMarkAllRead;
  final void Function(String id)? onDismiss;
  final String title;
  final String emptyMessage;
  final double maxHeight;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final unreadCount = notifications.where((n) => !n.read).length;

    return Semantics(
      label: title,
      container: true,
      child: FlowSurface(
        variant: FlowSurfaceVariant.primary,
        radius: FlowRadius.container,
        border: true,
        elevation: 2,
        padding: 0.0,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // ── Header ──
            DecoratedBox(
              decoration: BoxDecoration(
                border: Border(
                  bottom: BorderSide(
                      color: sys.borderSubtle, width: sys.borderThin),
                ),
              ),
              child: Padding(
                padding: EdgeInsets.all(sys.paddingControl),
                child: FlowInline(
                  gap: sys.gapComponent,
                  mainAlign: MainAxisAlignment.spaceBetween,
                  mainSize: MainAxisSize.max,
                  children: [
                    FlowInline(
                      gap: sys.gapTight,
                      children: [
                        FlowText(title, role: FlowTextRole.labelS),
                        if (unreadCount > 0)
                          FlowBadge(
                            content: unreadCount,
                            variant: FlowBadgeVariant.count,
                            tone: FlowBadgeTone.accent,
                          ),
                      ],
                    ),
                    if (onMarkAllRead != null && unreadCount > 0)
                      FlowButton(
                        variant: FlowButtonVariant.ghost,
                        size: FlowComponentSize.sm,
                        onPressed: onMarkAllRead,
                        child: const Text('Mark all read'),
                      ),
                  ],
                ),
              ),
            ),

            // ── List ──
            ConstrainedBox(
              constraints: BoxConstraints(maxHeight: maxHeight),
              child: notifications.isEmpty
                  ? Padding(
                      padding: EdgeInsets.all(sys.paddingSurface),
                      child: FlowStack(
                        gap: sys.gapComponent,
                        align: CrossAxisAlignment.center,
                        children: [
                          FlowIcon(Icons.notifications_none,
                              size: FlowIconSize.lg,
                              colorRole: FlowIconColor.tertiary),
                          FlowText(emptyMessage,
                              role: FlowTextRole.paragraphS,
                              color: FlowTextColor.secondary,
                              align: TextAlign.center),
                        ],
                      ),
                    )
                  : ListView.builder(
                      shrinkWrap: true,
                      itemCount: notifications.length,
                      itemBuilder: (context, i) => _NotifTile(
                        item: notifications[i],
                        onMarkRead: onMarkRead,
                        onDismiss: onDismiss,
                      ),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Single notification tile
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const _variantIcons = <FlowNotificationVariant, IconData>{
  FlowNotificationVariant.info: Icons.info_outline,
  FlowNotificationVariant.success: Icons.check_circle_outline,
  FlowNotificationVariant.warning: Icons.warning_amber_rounded,
  FlowNotificationVariant.error: Icons.error_outline,
};

class _NotifTile extends StatelessWidget {
  const _NotifTile({
    required this.item,
    this.onMarkRead,
    this.onDismiss,
  });

  final FlowNotificationItem item;
  final void Function(String id)? onMarkRead;
  final void Function(String id)? onDismiss;

  Color _variantColor(FlowSysTokens sys) {
    switch (item.variant) {
      case FlowNotificationVariant.info:
        return sys.statusInfo;
      case FlowNotificationVariant.success:
        return sys.statusSuccess;
      case FlowNotificationVariant.warning:
        return sys.statusWarning;
      case FlowNotificationVariant.error:
        return sys.statusError;
    }
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final accent = _variantColor(sys);
    final iconData = item.icon ?? _variantIcons[item.variant]!;

    return Semantics(
      label: item.title,
      child: GestureDetector(
        onTap: () {
          if (!item.read) onMarkRead?.call(item.id);
        },
        child: DecoratedBox(
          decoration: BoxDecoration(
            color: item.read ? Colors.transparent : sys.surfaceAccent,
            border: Border(
              bottom:
                  BorderSide(color: sys.borderSubtle, width: sys.borderThin),
            ),
          ),
          child: Padding(
            padding: EdgeInsets.all(sys.paddingControl),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Icon circle
                DecoratedBox(
                  decoration: BoxDecoration(
                    color: accent.withOpacity(0.15),
                    shape: BoxShape.circle,
                  ),
                  child: Padding(
                    padding: EdgeInsets.all(sys.gapTight),
                    child: FlowIcon(iconData,
                        size: FlowIconSize.sm, iconColor: accent),
                  ),
                ),
                SizedBox(width: sys.gapComponent),
                // Content
                Expanded(
                  child: FlowStack(
                    gap: sys.gapTight,
                    children: [
                      Row(
                        children: [
                          Expanded(
                            child: FlowText(item.title,
                                role: FlowTextRole.paragraphS,
                                color: item.read
                                    ? FlowTextColor.secondary
                                    : FlowTextColor.primary),
                          ),
                          if (!item.read)
                            Padding(
                              padding: EdgeInsets.only(left: sys.gapTight),
                              child: DecoratedBox(
                                decoration: BoxDecoration(
                                  color: sys.statusInfo,
                                  shape: BoxShape.circle,
                                ),
                                child: const SizedBox(width: 8, height: 8),
                              ),
                            ),
                          if (onDismiss != null)
                            FlowIconButton(
                              icon: Icons.close,
                              size: FlowComponentSize.sm,
                              variant: FlowIconButtonVariant.ghost,
                              semanticLabel: 'Dismiss ${item.title}',
                              onPressed: () => onDismiss!(item.id),
                            ),
                        ],
                      ),
                      if (item.message != null)
                        FlowText(item.message!,
                            role: FlowTextRole.caption,
                            color: FlowTextColor.secondary),
                      FlowText(item.timestamp,
                          role: FlowTextRole.caption,
                          color: FlowTextColor.secondary),
                      if (item.action != null)
                        FlowButton(
                          variant: FlowButtonVariant.ghost,
                          size: FlowComponentSize.sm,
                          onPressed: item.action!.onPressed,
                          child: Text(item.action!.label),
                        ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
