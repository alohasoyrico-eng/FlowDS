/** FLOW — FlowColumnConfigurator (L4 Pattern) */
import React, { type CSSProperties, forwardRef, useCallback, useEffect, useRef, useState } from "react";

import { Inline, Text } from "../../primitives";
import { FlowCheckbox } from "../selection/FlowCheckbox";
import { FlowIconButton } from "../controls/FlowIconButton";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COLUMN CONFIGURATOR — Show/hide/reorder table columns
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface ColumnConfig {
  /** Unique column identifier */
  key: string;
  /** Column display label */
  label: string;
  /** Whether the column is currently visible */
  visible: boolean;
}

/** Props for FlowColumnConfigurator — popover for toggling table column visibility and reordering. */
export interface ColumnConfiguratorProps {
  /** Column configurations */
  columns: ColumnConfig[];
  /** Callback fired when column visibility or order changes */
  onColumnsChange: (columns: ColumnConfig[]) => void;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowColumnConfigurator = forwardRef<HTMLDivElement, ColumnConfiguratorProps>(
  function FlowColumnConfigurator({
  columns,
  onColumnsChange,
  className = "",
  style,
  ...rest
}, ref) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const setRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      (popoverRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!popoverRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const toggle = (key: string) => {
    onColumnsChange(columns.map((c) => (c.key === key ? { ...c, visible: !c.visible } : c)));
  };

  const moveUp = (idx: number) => {
    if (idx <= 0) return;
    const next = [...columns];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    onColumnsChange(next);
  };

  const moveDown = (idx: number) => {
    if (idx >= columns.length - 1) return;
    const next = [...columns];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    onColumnsChange(next);
  };

  return (
    <div
      ref={setRootRef}
      {...rest}
      className={`flow-column-configurator ${className}`}
      style={{ position: "relative", display: "inline-block", ...style }}
    >
      <FlowIconButton
        icon="columns"
        variant="ghost"
        size="sm"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Configure columns"
      />

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + var(--ref-frame-space-1))",
            right: 0,
            zIndex: "var(--sys-depth-layer-dropdown)" as unknown as number,
            background: "var(--sys-energy-surface-primary)",
            border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
            borderRadius: "var(--sys-frame-radius-container)",
            boxShadow: "var(--sys-depth-elevation-medium)",
            padding: "var(--ref-frame-space-2)",
            minWidth: "var(--comp-column-config-min-width)",
          }}
        >
          {columns.map((col, i) => (
            <div
              key={col.key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--ref-frame-space-2)",
                padding: "var(--ref-frame-space-2)",
                borderRadius: "var(--sys-frame-radius-sm)",
              }}
            >
              <FlowCheckbox
                checked={col.visible}
                onChange={() => toggle(col.key)}
                size="sm"
              />
              <Text role="caption" color={col.visible ? "primary" : "tertiary"} style={{ flex: 1 }}>
                {col.label}
              </Text>
              <Inline gap={0}>
                <FlowIconButton
                  icon="chevron-up"
                  size="sm"
                  variant="ghost"
                  onClick={() => moveUp(i)}
                  disabled={i === 0}
                  aria-label={`Move ${col.label} up`}
                />
                <FlowIconButton
                  icon="chevron-down"
                  size="sm"
                  variant="ghost"
                  onClick={() => moveDown(i)}
                  disabled={i === columns.length - 1}
                  aria-label={`Move ${col.label} down`}
                />
              </Inline>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
FlowColumnConfigurator.displayName = "FlowColumnConfigurator";
