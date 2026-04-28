/** FLOW — FlowSectionHeader (L4 Pattern) */
import "../css/SectionHeader.css";
import { type CSSProperties, forwardRef, type ReactNode } from "react";

import { Divider, GrowthObserver, Inline, Stack, Text, type Tone } from "@flow/primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION HEADER — Generic section header with action
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Props for FlowSectionHeader — section heading with optional subtitle, trailing action, and divider. */
export interface SectionHeaderProps {
  /** Section heading text */
  title: string;
  /** Optional description below the title */
  description?: string;
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

export const FlowSectionHeader = forwardRef<HTMLElement, SectionHeaderProps>(
  function FlowSectionHeader(
    { title, description, action, divider = true, tone, className = "", style, ...rest },
    ref,
  ) {
    return (
      <GrowthObserver event="flow.section-header.impression">
        <header
          ref={ref}
          {...rest}
          className={`flow-section-header ${className}`}
          data-tone={tone}
          style={style}
          aria-label={title}
        >
          <Inline gap={2} justify="between" align="end">
            <Stack gap={1}>
              <Text as="h2" variant="heading-m" tone={tone}>
                {title}
              </Text>
              {description && (
                <Text variant="caption" color="secondary" tone={tone}>
                  {description}
                </Text>
              )}
            </Stack>
            {action}
          </Inline>
          {divider && <Divider spacing={2} />}
        </header>
      </GrowthObserver>
    );
  },
);
FlowSectionHeader.displayName = "FlowSectionHeader";
