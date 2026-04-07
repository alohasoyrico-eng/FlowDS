/** FLOW — FlowSectionHeader (L4 Pattern) */
import { type CSSProperties, forwardRef, type ReactNode } from "react";

import { Divider, Inline, Stack, Text, type Tone } from "../../primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION HEADER — Generic section header with action
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Props for FlowSectionHeader — section heading with optional subtitle, trailing action, and divider. */
export interface SectionHeaderProps {
  /** Section heading text */
  title: string;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Action element (e.g. button) rendered on the right */
  action?: ReactNode;
  /** Whether to show a divider below the header */
  divider?: boolean;
  /** Color tone for the header text */
  tone?: Tone;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowSectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  function FlowSectionHeader({
  title,
  subtitle,
  action,
  divider = true,
  tone,
  className = "",
  style,
  ...rest
}, ref) {
  return (
    <div ref={ref} {...rest} className={`flow-section-header ${className}`} data-tone={tone} style={style}>
      <Inline gap={2} justify="between" align="end">
        <Stack gap={1}>
          <Text role="heading-m" tone={tone}>{title}</Text>
          {subtitle && (
            <Text role="caption" color="secondary" tone={tone}>
              {subtitle}
            </Text>
          )}
        </Stack>
        {action}
      </Inline>
      {divider && <Divider spacing={2} />}
    </div>
  );
});
FlowSectionHeader.displayName = "FlowSectionHeader";
