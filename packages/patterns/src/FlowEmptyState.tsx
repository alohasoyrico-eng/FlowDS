/** FLOW — FlowEmptyState (L4 Pattern) */
import { type CSSProperties, forwardRef, type ReactNode } from "react";
import {
  FlowIcon,
  GrowthObserver,
  Inline,
  Stack,
  Text,
  type Tone,
  useFlowDefaultSize,
} from "@flow/primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EMPTY STATE — Illustration + title + description + action
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Props for FlowEmptyState — placeholder with icon, title, description, and action buttons for empty content areas. */
export interface EmptyStateProps {
  /** Icon name to show (from FlowIcon set) */
  icon?: string;
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Primary action */
  action?: ReactNode;
  /** Secondary action */
  secondaryAction?: ReactNode;
  /** @deprecated Use `size="sm"` instead */
  compact?: boolean;
  /** Unified size — sm/md/lg/xl */
  size?: "sm" | "md" | "lg" | "xl";
  /** Tone variant */
  tone?: Tone;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowEmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function FlowEmptyState(
  {
    icon = "search",
    title,
    description,
    action,
    secondaryAction,
    compact = false,
    size,
    tone,
    className = "",
    style,
    ...rest
  },
  ref,
) {
  const flowSize = useFlowDefaultSize(size);
  // Backward compat: compact → size="sm"
  const resolvedSize = flowSize || (compact ? "sm" : undefined);

  return (
    <GrowthObserver event="flow.empty-state.impression" properties={{}} inline>
      <div
        ref={ref}
        className={`flow-empty-state ${className}`}
        data-size={resolvedSize}
        data-tone={tone}
        data-compact={compact && !flowSize ? true : undefined}
        style={style}
        {...rest}
      >
        <div className="flow-empty-state-icon">
          <FlowIcon name={icon} size="xl" />
        </div>
        <Stack gap={resolvedSize === "sm" ? 1 : 2} align="center" style={{ textAlign: "center" }}>
          <Text variant="heading-m" color="primary" tone={tone}>
            {title}
          </Text>
          {description && (
            <Text
              variant="paragraph-s"
              color="tertiary"
              tone={tone}
              style={{ maxWidth: "var(--sys-frame-content-prose)" }}
            >
              {description}
            </Text>
          )}
        </Stack>
        {(action || secondaryAction) && (
          <Inline gap={2} justify="center">
            {action}
            {secondaryAction}
          </Inline>
        )}
      </div>
    </GrowthObserver>
  );
});
FlowEmptyState.displayName = "FlowEmptyState";
