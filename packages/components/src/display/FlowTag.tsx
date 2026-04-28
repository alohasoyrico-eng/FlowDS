/** FLOW — FlowTag (L3 Component) */
import "../../css/display/Tags.css";
import { type CSSProperties, forwardRef, memo, type ReactNode } from "react";
import { GrowthObserver, Text, useFlowDefaultSize } from "@flow/primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TAG — Non-interactive semantic label
// Two structural variants (label | code) × five status tones (neutral | info | success | warning | error).
// Variant controls typography & shape; status controls chromatic meaning.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type TagVariant = "label" | "code";
type TagStatus = "neutral" | "info" | "success" | "warning" | "error";
type TagSize = "sm" | "md" | "lg" | "xl";

/** Props for FlowTag — non-interactive semantic label with variant and status color options. */
export interface TagProps {
  children: ReactNode;
  /** Structural variant: `label` (sans-serif) or `code` (monospace). Default: `label`. */
  variant?: TagVariant;
  /** Semantic status color. Default: `neutral`. */
  status?: TagStatus;
  size?: TagSize;
  className?: string;
  style?: CSSProperties;
}

export const FlowTag = memo(
  forwardRef<HTMLSpanElement, TagProps>(function FlowTag(
    { children, variant = "label", status = "neutral", size, className = "", style, ...rest },
    ref,
  ) {
    const resolvedSize = useFlowDefaultSize(size);
    return (
      <GrowthObserver event="flow.tag.impression" properties={{ variant, status }} inline>
        <span
          ref={ref}
          {...rest}
          className={`flow-tag ${className}`.trim()}
          data-variant={variant}
          data-status={status}
          data-size={resolvedSize}
          style={style}
        >
          <Text as="span" variant="caption" color="inherit">
            {children}
          </Text>
        </span>
      </GrowthObserver>
    );
  }),
);
