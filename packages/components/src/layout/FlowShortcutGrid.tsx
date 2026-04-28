/** FLOW — FlowShortcutGrid (L3 Layout) */
import { forwardRef } from "react";

import { ActionSurface, FlowIcon, Text } from "@flow/primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SHORTCUT GRID — Mobile shortcut grid of icon+label actions
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface ShortcutAction {
  icon: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface ShortcutGridProps {
  actions: ShortcutAction[];
  columns?: number;
  className?: string;
}

export const FlowShortcutGrid = forwardRef<HTMLDivElement, ShortcutGridProps>(
  function FlowShortcutGrid({ actions, columns = 4, className = "" }, ref) {
    return (
      <div
        ref={ref}
        className={`flow-shortcut-grid ${className}`}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "var(--ref-frame-space-3)",
        }}
      >
        {actions.map((action, index) => (
          <ActionSurface
            key={index}
            onPress={action.onClick}
            disabled={action.disabled}
            aria-label={action.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--ref-frame-space-2)",
              padding: "var(--sys-frame-padding-control)",
              borderRadius: "var(--sys-frame-radius-control)",
              background: "var(--sys-energy-surface-secondary)",
            }}
          >
            <FlowIcon
              name={action.icon}
              size="lg"
              color={
                action.disabled
                  ? "var(--sys-energy-text-tertiary)"
                  : "var(--sys-energy-text-primary)"
              }
            />
            <Text
              variant="label-s"
              color={action.disabled ? "tertiary" : "primary"}
              style={{ textAlign: "center" }}
            >
              {action.label}
            </Text>
          </ActionSurface>
        ))}
      </div>
    );
  },
);
