/** FLOW — FlowSkeleton (L3 Component) */
import { type CSSProperties, forwardRef, memo } from "react";

import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";
import { GrowthObserver } from "../../primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SKELETON — Loading placeholder
// Variants: text, circle, rect, card.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type SkeletonVariant = "text" | "circle" | "circular" | "rect" | "rectangular" | "card";

/** Props for FlowSkeleton — a loading placeholder with text, circle, rect, and card shape variants. */
export interface SkeletonProps {
  /** Shape variant */
  variant?: SkeletonVariant;
  /** Width (CSS value or number for px). Default: 100% for text/rect, size for circle. */
  width?: string | number;
  /** Height (CSS value or number for px). Default: 1em for text, width for circle, 120px for rect. */
  height?: string | number;
  /** Number of text lines to render */
  lines?: number;
  /** Whether animation is active */
  animate?: boolean;
  /** Unified size — sm/md/lg/xl, controls default height scale for text variant */
  size?: "sm" | "md" | "lg" | "xl";
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowSkeleton = memo(forwardRef<HTMLDivElement, SkeletonProps>(
  function FlowSkeleton({
    variant = "text",
    width,
    height,
    lines = 1,
    animate = true,
    size,
    className = "",
    style,
    ...rest
  }, ref) {
  const resolvedSize = useFlowDefaultSize(size);
  if (variant === "text" && lines > 1) {
    return (
      <GrowthObserver event="flow.skeleton.impression" properties={{ variant }} inline>
      <div ref={ref} {...rest} className={`flow-skeleton-group ${className}`} style={style}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className="flow-skeleton"
            data-variant="text"
            data-animate={animate || undefined}
            data-size={resolvedSize}
            style={{
              width: i === lines - 1 ? "75%" : width || "100%",
              height: height || undefined,
            }}
          />
        ))}
      </div>
      </GrowthObserver>
    );
  }

  const resolvedWidth = width || (variant === "circle" ? "var(--ref-frame-space-10)" : "100%");
  const resolvedHeight =
    height ||
    (variant === "circle"
      ? resolvedWidth
      : variant === "rect" || variant === "card"
        ? "var(--ref-frame-space-20)"
        : undefined);

  return (
    <GrowthObserver event="flow.skeleton.impression" properties={{ variant }} inline>
    <div
      ref={ref}
      {...rest}
      className={`flow-skeleton ${className}`}
      data-variant={variant}
      data-animate={animate || undefined}
      data-size={resolvedSize}
      style={{
        width: resolvedWidth,
        height: resolvedHeight,
        ...style,
      }}
      aria-hidden="true"
    />
    </GrowthObserver>
  );
  }
));
