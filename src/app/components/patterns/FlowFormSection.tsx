/** FLOW — FlowFormSection (L4 Pattern) */
import { type CSSProperties, forwardRef, type ReactNode, useState } from "react";

import { ActionSurface, FlowIcon, Stack, Surface, Text } from "../../primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FORM SECTION — Section header + fields group
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Props for FlowFormSection — collapsible form section with heading, description, and grouped child controls. */
export interface FormSectionProps {
  /** Section heading text */
  title: string;
  /** Optional description below the heading */
  description?: string;
  /** Form controls rendered inside the section */
  children: ReactNode;
  /** Whether the section can be collapsed */
  collapsible?: boolean;
  /** Whether the section is initially expanded */
  defaultOpen?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowFormSection = forwardRef<HTMLDivElement, FormSectionProps>(
  function FlowFormSection({
  title,
  description,
  children,
  collapsible = false,
  defaultOpen = true,
  className = "",
  style,
  ...rest
}, ref) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Surface ref={ref} {...rest} border={false} padding={0} elevation={0} className={`flow-form-section ${className}`} style={style}>
      {collapsible ? (
        <ActionSurface
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            marginBottom: open ? "var(--sys-frame-gap-component)" : 0,
          }}
          onPress={() => setOpen(!open)}
          aria-expanded={open}
        >
          <Stack gap={1}>
            <Text role="heading-m">{title}</Text>
            {description && (
              <Text role="caption" color="secondary">
                {description}
              </Text>
            )}
          </Stack>
          <FlowIcon
            name={open ? "chevron-up" : "chevron-down"}
            size="sm"
            style={{ color: "var(--sys-energy-text-tertiary)" }}
          />
        </ActionSurface>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "var(--sys-frame-gap-component)",
          }}
        >
          <Stack gap={1}>
            <Text role="heading-m">{title}</Text>
            {description && (
              <Text role="caption" color="secondary">
                {description}
              </Text>
            )}
          </Stack>
        </div>
      )}
      {(open || !collapsible) && <Stack gap="component">{children}</Stack>}
    </Surface>
  );
});
FlowFormSection.displayName = "FlowFormSection";
