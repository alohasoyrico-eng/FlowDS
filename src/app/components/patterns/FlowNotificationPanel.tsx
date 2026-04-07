/** FLOW — FlowNotificationPanel (L4 Pattern) */
import React, { forwardRef } from "react";

import { FlowIcon, Inline, Stack, Surface, Text, type Tone } from "../../primitives";
import { FlowIconButton } from "../controls/FlowIconButton";
import { FlowButton } from "../controls/FlowButton";
import { FlowBadge } from "../display/FlowBadge";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NOTIFICATION PANEL — Notification center with groups
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface NotificationItem {
  /** Unique notification identifier */
  id: string;
  /** Notification title */
  title: string;
  /** Notification body text */
  message?: string;
  /** Timestamp label */
  timestamp: string;
  /** Whether the notification has been read */
  read?: boolean;
  /** Icon name */
  icon?: string;
  /** Severity variant */
  variant?: "info" | "success" | "warning" | "error";
  /** Optional action button */
  action?: { label: string; onClick: () => void };
}

/** Props for FlowNotificationPanel — notification center panel with grouped items, read state, and dismiss actions. */
export interface NotificationPanelProps {
  /** Notification items */
  notifications: NotificationItem[];
  /** Callback to mark a single notification as read */
  onMarkRead?: (id: string) => void;
  /** Callback to mark all notifications as read */
  onMarkAllRead?: () => void;
  /** Callback to dismiss a notification */
  onDismiss?: (id: string) => void;
  /** Panel title */
  title?: string;
  /** Message shown when there are no notifications */
  emptyMessage?: string;
  /** Error state */
  error?: boolean;
  /** Color tone for the panel */
  tone?: Tone;
  /** Maximum panel height in px */
  maxHeight?: number;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
}

const NOTIF_VARIANT_COLOR: Record<string, string> = {
  info: "var(--sys-energy-status-info)",
  success: "var(--sys-energy-status-success)",
  warning: "var(--sys-energy-status-warning)",
  error: "var(--sys-energy-status-error)",
};

const NOTIF_VARIANT_ICON: Record<string, string> = {
  info: "info",
  success: "check",
  warning: "warning",
  error: "alert-circle",
};

export const FlowNotificationPanel = forwardRef<HTMLDivElement, NotificationPanelProps>(
  function FlowNotificationPanel({
  notifications,
  onMarkRead,
  onMarkAllRead,
  onDismiss,
  title = "Notifications",
  emptyMessage = "No new notifications",
  error = false,
  tone,
  maxHeight = 420,
  className = "",
  style,
  ...rest
}, ref) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Surface
      ref={ref}
      {...rest}
      variant="primary"
      radius="container"
      border
      className={`flow-notification-panel ${className}`}
      style={{
        overflow: "hidden",
        width: "min(var(--comp-notification-panel-width), 100%)",
        boxShadow: "var(--sys-depth-elevation-medium)",
        ...style,
      }}
      role="region"
      aria-label={title}
      data-state={error ? "error" : undefined}
      data-tone={tone || undefined}
    >
      {/* Header */}
      <Inline
        gap={2}
        justify="between"
        padding={3}
        style={{
          borderBottom: "var(--sys-frame-border-thin) solid var(--sys-energy-border-subtle)",
        }}
      >
        <Inline gap={2}>
          <Text role="label-s">{title}</Text>
          {unreadCount > 0 && (
            <FlowBadge
              content={unreadCount}
              variant="count"
              color="accent"
              standalone
              className="flow-notification-badge"
            />
          )}
        </Inline>
        {onMarkAllRead && unreadCount > 0 && (
          <FlowButton
            variant="ghost"
            size="sm"
            onClick={onMarkAllRead}
          >
            Mark all read
          </FlowButton>
        )}
      </Inline>

      {/* Notification list */}
      <div style={{ maxHeight, overflowY: "auto" }} role="list">
        {notifications.length === 0 ? (
          <Stack gap={2} align="center" padding={6} style={{ textAlign: "center" }}>
            <FlowIcon name="bell" size="lg" color="var(--sys-energy-text-tertiary)" />
            <Text role="paragraph-s" color="secondary">
              {emptyMessage}
            </Text>
          </Stack>
        ) : (
          notifications.map((notif) => {
            const variantColor = NOTIF_VARIANT_COLOR[notif.variant ?? "info"];
            const variantIcon = notif.icon ?? NOTIF_VARIANT_ICON[notif.variant ?? "info"];
            return (
               
              <Inline
                key={notif.id}
                gap={3}
                align="start"
                padding={3}
                style={{
                  borderBottom:
                    "var(--sys-frame-border-thin) solid var(--sys-energy-border-subtle)",
                  background: notif.read
                    ? "transparent"
                    : "var(--sys-energy-surface-accent-subtle)",
                  cursor: "pointer",
                  transition: "background var(--sys-momentum-transition-fast)",
                }}
                role="listitem"
                onClick={() => {
                  if (!notif.read) onMarkRead?.(notif.id);
                }}
              >
                <div
                  style={{
                    width: "var(--ref-frame-space-8)",
                    height: "var(--ref-frame-space-8)",
                    borderRadius: "50%",
                    background: `color-mix(in srgb, ${variantColor} 15%, transparent)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <FlowIcon name={variantIcon} size="sm" color={variantColor} />
                </div>
                <Stack gap={1} style={{ flex: 1, minWidth: 0 }}>
                  <Inline gap={2} justify="between" align="start">
                    <Text role="paragraph-s" color={notif.read ? "secondary" : "primary"}>
                      {notif.title}
                    </Text>
                    <Inline gap={1} style={{ flexShrink: 0 }}>
                      {!notif.read && (
                        <div
                          style={{
                            width: "var(--comp-notification-dot-size)",
                            height: "var(--comp-notification-dot-size)",
                            borderRadius: "50%",
                            background: "var(--sys-energy-status-info)",
                          }}
                        />
                      )}
                      {onDismiss && (
                        <span role="presentation" onClick={(e) => e.stopPropagation()}>
                          <FlowIconButton
                            icon="close"
                            size="sm"
                            variant="ghost"
                            aria-label={`Dismiss ${notif.title}`}
                            onClick={() => onDismiss(notif.id)}
                          />
                        </span>
                      )}
                    </Inline>
                  </Inline>
                  {notif.message && (
                    <Text role="caption" color="secondary">
                      {notif.message}
                    </Text>
                  )}
                  <Text role="caption" color="secondary" style={{ opacity: "var(--ref-state-opacity-muted)" }}>
                    {notif.timestamp}
                  </Text>
                  {notif.action && (
                    <span role="presentation" onClick={(e) => e.stopPropagation()}>
                      <FlowButton
                        variant="ghost"
                        size="sm"
                        onClick={() => notif.action!.onClick()}
                      >
                        {notif.action.label}
                      </FlowButton>
                    </span>
                  )}
                </Stack>
              </Inline>
            );
          })
        )}
      </div>
    </Surface>
  );
});
FlowNotificationPanel.displayName = "FlowNotificationPanel";
