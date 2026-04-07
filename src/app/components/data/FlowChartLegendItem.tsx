/** FLOW — FlowChartLegendItem (L3 Component) */
import { memo } from "react";

import { Inline, Text } from "../../primitives";

/** Props for FlowChartLegendItem — a color-swatch legend entry for chart visualizations. */
export interface ChartLegendItemProps {
  /** CSS color value for the legend swatch */
  color: string;
  /** Display label for the legend entry */
  label: string;
  /** Optional value text shown after the label */
  value?: string;
  /** Whether the legend item can be toggled on/off */
  toggleable?: boolean;
  /** Whether the legend item is visually hidden (dimmed) */
  hidden?: boolean;
  /** Callback fired when the item is toggled */
  onToggle?: () => void;
}

/** Legend item helper */
export const FlowChartLegendItem = memo(function FlowChartLegendItem({
  color,
  label,
  value,
  toggleable,
  hidden,
  onToggle,
}: ChartLegendItemProps) {
  return (
     
    <Inline
      as="span"
      gap={1}
      align="center"
      style={{
        display: "inline-flex",
        fontSize: "var(--sys-voice-caption-size)",
        fontFamily: "var(--ref-voice-family-sans)",
        color: "var(--sys-energy-text-secondary)",
        opacity: hidden ? 0.4 : 1,
        cursor: toggleable ? "pointer" : undefined,
        userSelect: "none",
      }}
      onClick={toggleable ? onToggle : undefined}
    >
      <span
        style={{
          width: "var(--ref-frame-space-2)",
          height: "var(--ref-frame-space-2)",
          borderRadius: "var(--sys-frame-radius-full)",
          background: color,
          flexShrink: 0,
        }}
      />
      <Text role="caption" as="span">{label}</Text>
      {value && (
        <Text role="label-s" style={{ marginLeft: "var(--ref-frame-space-1)", fontWeight: "var(--ref-voice-weight-semibold)" }}>{value}</Text>
      )}
    </Inline>
  );
});
