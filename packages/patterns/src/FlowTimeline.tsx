/** FLOW — FlowTimeline (L4 Pattern) */
import "../css/Timeline.css";
import { type CSSProperties, forwardRef } from "react";

import { GrowthObserver, Stack, Text, type Tone } from "@flow/primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TIMELINE — Vertical event timeline
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface TimelineItem {
  /** Unique identifier for the event */
  id: string;
  /** Event label text */
  label: string;
  /** Optional event description */
  description?: string;
  /** Timestamp label for the event */
  timestamp?: string;
  /** Icon name for the event dot */
  icon?: string;
  /** Semantic status indicating event type */
  status?: "neutral" | "info" | "success" | "warning" | "error";
}

/** Props for FlowTimeline — vertical event timeline with colored dots, titles, and timestamps. */
export interface TimelineProps {
  /** Timeline event items */
  items: TimelineItem[];
  /** Color tone for the timeline */
  tone?: Tone;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

const timelineColors: Record<string, string> = {
  neutral: "var(--sys-energy-text-tertiary)",
  success: "var(--sys-energy-status-success)",
  warning: "var(--sys-energy-status-warning)",
  error: "var(--sys-energy-status-error)",
  info: "var(--sys-energy-status-info)",
};

export const FlowTimeline = forwardRef<HTMLDivElement, TimelineProps>(function FlowTimeline(
  { items, tone, className = "", style, ...rest },
  ref,
) {
  // Guard: return null if no items
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <GrowthObserver event="flow.timeline.impression">
      <div
        ref={ref}
        {...rest}
        className={`flow-timeline ${className}`}
        data-tone={tone || undefined}
        style={style}
        role="list"
        aria-label="Timeline"
      >
        {items.map((item, i) => {
          const color = timelineColors[item.status || "neutral"];
          const isLast = i === items.length - 1;
          return (
            <div
              key={item.id}
              role="listitem"
              style={{
                display: "flex",
                gap: "var(--sys-frame-gap-component)",
                position: "relative",
                paddingBottom: isLast ? 0 : "var(--sys-frame-gap-component)",
              }}
            >
              {/* Line + dot */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "var(--comp-timeline-gutter-width)",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: "var(--comp-timeline-dot-size)",
                    height: "var(--comp-timeline-dot-size)",
                    borderRadius: "var(--sys-frame-radius-full)",
                    background: color,
                    flexShrink: 0,
                    marginTop: "var(--comp-timeline-dot-offset)",
                  }}
                />
                {!isLast && (
                  <div
                    style={{
                      width: "var(--comp-timeline-line-width)",
                      flex: 1,
                      background: "var(--sys-energy-border-default)",
                      marginTop: "var(--ref-frame-space-1)",
                    }}
                  />
                )}
              </div>
              {/* Content */}
              <Stack
                gap={1}
                style={{ flex: 1, minWidth: 0, paddingTop: "var(--comp-timeline-content-offset)" }}
              >
                <Text variant="label-s">{item.label}</Text>
                {item.description && (
                  <Text variant="caption" color="secondary">
                    {item.description}
                  </Text>
                )}
                {item.timestamp && (
                  <Text
                    variant="caption"
                    color="secondary"
                    style={{ fontFamily: "var(--ref-voice-family-mono)" }}
                  >
                    {item.timestamp}
                  </Text>
                )}
              </Stack>
            </div>
          );
        })}
      </div>
    </GrowthObserver>
  );
});
FlowTimeline.displayName = "FlowTimeline";
