/** FLOW — FlowCard (L3 Component) */
import React, { type CSSProperties, forwardRef, type ReactNode } from "react";

import { ActionSurface, GrowthObserver, Surface, type Tone } from "../../primitives";
import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD — Elevated/outlined content container
// Composes Surface primitive for structure.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type CardElevation = number;
type CardPadding = "none" | "sm" | "md" | "lg" | "xl" | "container";
type CardSize = "sm" | "md" | "lg" | "xl";
type CardAccent =
  | "action"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral"
  | "accent"
  | "danger";
type CardVariant = "default" | "outlined" | "stat";

/** Props for FlowCard — elevated or outlined content container with optional interactivity and accent borders. */
export interface CardProps {
  /** Card body content */
  children: ReactNode;
  /** Shadow elevation level (0 = flat/outlined) */
  elevation?: CardElevation;
  /** Visual variant (default, outlined, or stat) */
  variant?: CardVariant;
  /** Whether the card responds to hover and click interactions */
  interactive?: boolean | undefined;
  /** Whether the card is in a selected state */
  selected?: boolean;
  /** Callback fired when the card is clicked */
  onClick?: () => void;
  /** Internal padding size */
  padding?: CardPadding;
  /** Card size variant */
  size?: CardSize;
  /** Colored accent border indicator */
  accent?: CardAccent;
  /** Color tone for the card surface */
  tone?: Tone;
  /** Accessible label for the card */
  "aria-label"?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

const cardPaddingMap: Record<CardPadding, string> = {
  none: "0",
  sm: "var(--ref-frame-space-3)",
  md: "var(--sys-frame-padding-control)",
  lg: "var(--comp-card-padding)",
  xl: "var(--ref-frame-space-10)",
  container: "var(--sys-frame-padding-container)",
};

export const FlowCard = forwardRef<HTMLDivElement, CardProps>(
  function FlowCard({
    children,
    elevation = 1,
    variant = "default",
    interactive,
    selected,
    onClick,
    padding = "md",
    size,
    accent,
    tone,
    "aria-label": ariaLabel,
    className = "",
    style,
    ...rest
  }, ref) {
  const resolvedSize = useFlowDefaultSize(size);
  const isInteractive = interactive || !!onClick;

  /* stat variant delegates all styling to CSS via data-variant */
  const isStat = variant === "stat";
  const showBorder = !isStat && elevation === 0 && !accent;

  const sharedProps = {
    "data-size": resolvedSize,
    "data-tone": tone,
    "data-variant": variant !== "default" ? variant : undefined,
    "data-accent": accent || undefined,
    "data-interactive": isInteractive || undefined,
    "data-elevation": isStat || elevation === 0 ? "0" : String(elevation),
    "data-border": showBorder || undefined,
  } as const;

  const cardStyle = {
    padding: cardPaddingMap[padding],
    ...style,
  };

  return (
    <GrowthObserver event="flow.card.impression" properties={{ variant, elevation }} inline>
    {isInteractive ? (
      <ActionSurface
        ref={ref as React.Ref<HTMLButtonElement>}
        {...rest}
        className={`flow-card ${className}`.trim()}
        onPress={onClick}
        selected={!!selected}
        aria-label={ariaLabel}
        aria-pressed={selected || undefined}
        aria-selected={undefined}
        style={cardStyle}
        {...sharedProps}
      >
        {children}
      </ActionSurface>
    ) : (
      <Surface
        ref={ref}
        {...rest}
        className={`flow-card ${className}`.trim()}
        elevation={isStat ? 0 : (elevation as 0 | 1 | 2 | 3 | 4)}
        radius="card"
        padding="none"
        border={showBorder}
        aria-label={ariaLabel}
        style={cardStyle}
        {...sharedProps}
      >
        {children}
      </Surface>
    )}
    </GrowthObserver>
  );
}
);
