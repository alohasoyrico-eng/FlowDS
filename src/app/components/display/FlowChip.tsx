/** FLOW — FlowChip (L3 Component) */
import { type CSSProperties, forwardRef, memo, type ReactNode } from "react";

import { ActionSurface, FlowIcon, GrowthObserver, Text } from "../../primitives";
import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHIP — Pill-shaped label/filter (V8 REFACTORED)
// Now composes Surface/ActionSurface/Text primitives
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type ChipVariant =
  | "default"
  | "neutral"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "outlined"
  | "tonal"
  | "primary"
  | "secondary"
  | "filter"
  | "base"
  | "status"
  | (string & NonNullable<unknown>);
type ChipSize = "sm" | "md" | "lg" | "xl";

/** Props for FlowChip — interactive pill-shaped label/filter supporting selection, removal, and click actions. */
export interface ChipProps {
  /** Chip content */
  children?: ReactNode;
  /** Visual color variant */
  variant?: ChipVariant;
  /** Chip size */
  size?: ChipSize;
  /** Leading icon name */
  icon?: string;
  /** Whether the chip is selected */
  selected?: boolean;
  /** Whether the chip is disabled */
  disabled?: boolean;
  /** Whether the chip shows a remove button */
  removable?: boolean;
  /** Callback fired when the remove button is clicked */
  onRemove?: () => void;
  /** Callback fired when the chip is clicked */
  onClick?: () => void;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowChip = memo(forwardRef<HTMLElement, ChipProps>(
  function FlowChip({
    children,
    variant = "default",
    size,
    selected,
    disabled,
    removable,
    onRemove,
    onClick,
    className = "",
    style,
    ...rest
  }, ref) {
  const resolvedSize = useFlowDefaultSize(size);
  const isInteractive = !!onClick;

  const chipContent = (
    <>
      {/* Chip label — Text primitive for typography control */}
      <Text as="span" role="caption" className="flow-chip-label">{children}</Text>

      {removable && !disabled && (
        <ActionSurface
          onPress={() => { onRemove?.(); }}
          aria-label="Remove"
          className="flow-chip-remove"
        >
          <FlowIcon name="close" size="xs" />
        </ActionSurface>
      )}
    </>
  );

  return (
    <GrowthObserver event="flow.chip.impression" properties={{ variant, size: resolvedSize }} inline>
    {isInteractive ? (
      <ActionSurface
        ref={ref as React.Ref<HTMLButtonElement>}
        onPress={disabled ? undefined : onClick}
        disabled={disabled}
        selected={selected}
        aria-selected={selected || undefined}
        className={`flow-chip ${className}`.trim()}
        data-variant={variant}
        data-size={resolvedSize}
        style={style}
        {...rest}
      >
        {chipContent}
      </ActionSurface>
    ) : (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        {...rest}
        className={`flow-chip ${className}`.trim()}
        data-variant={variant}
        data-size={resolvedSize}
        data-selected={selected || undefined}
        aria-selected={selected || undefined}
        data-state={disabled ? "disabled" : undefined}
        style={style}
      >
        {chipContent}
      </span>
    )}
    </GrowthObserver>
  );
}
));
