/** FLOW — FlowDragSortableList (L4 Pattern) */
import React, { type CSSProperties, forwardRef, type KeyboardEvent, type ReactNode, useState } from "react";

import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";
import { Inline, Stack, Text } from "../../primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DRAG SORTABLE LIST — Reorderable list via pointer drag
//     Accessible: also supports keyboard reorder with Alt+Arrow
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface SortableItem {
  /** Unique item identifier */
  id: string;
  /** Item display content */
  content: ReactNode;
}

/** Props for FlowDragSortableList — reorderable list via pointer drag or keyboard shortcuts (Alt+Arrow). */
export interface DragSortableListProps {
  /** Sortable items */
  items: SortableItem[];
  /** Callback fired when items are reordered */
  onReorder: (items: SortableItem[]) => void;
  /** Whether to show a drag handle on each item */
  handle?: boolean;
  /** List size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
  /** Accessible label for the list */
  "aria-label"?: string;
}

export const FlowDragSortableList = forwardRef<HTMLDivElement, DragSortableListProps>(
  function FlowDragSortableList({
  items,
  onReorder,
  handle = true,
  size = "md",
  className = "",
  style,
  ...rest
}, ref) {
  const resolvedSize = useFlowDefaultSize(size);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const itemH = resolvedSize === "sm" ? 36 : resolvedSize === "lg" ? 52 : 44;

  const handleDragStart = (idx: number) => (e: React.DragEvent) => {
    setDragIdx(idx);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(idx));
  };

  const handleDragOver = (idx: number) => (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setOverIdx(idx);
  };

  const handleDrop = (idx: number) => (e: React.DragEvent) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) {
      setDragIdx(null);
      setOverIdx(null);
      return;
    }
    const next = [...items];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(idx, 0, moved);
    onReorder(next);
    setDragIdx(null);
    setOverIdx(null);
  };

  const handleDragEnd = () => {
    setDragIdx(null);
    setOverIdx(null);
  };

  const moveItem = (fromIdx: number, dir: 1 | -1) => {
    const toIdx = fromIdx + dir;
    if (toIdx < 0 || toIdx >= items.length) return;
    const next = [...items];
    [next[fromIdx], next[toIdx]] = [next[toIdx], next[fromIdx]];
    onReorder(next);
  };

  const handleKeyDown = (idx: number) => (e: KeyboardEvent) => {
    if (e.altKey && e.key === "ArrowUp") {
      e.preventDefault();
      moveItem(idx, -1);
    } else if (e.altKey && e.key === "ArrowDown") {
      e.preventDefault();
      moveItem(idx, 1);
    }
  };

  return (
    <div
      ref={ref}
      role="listbox"
      aria-label={rest["aria-label"] ?? "Sortable list"}
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--ref-frame-space-1)",
        ...style,
      }}
    >
      {items.map((item, idx) => {
        const isDragging = dragIdx === idx;
        const isOver = overIdx === idx && dragIdx !== idx;
        return (
          <div
            key={item.id}
            role="option"
            aria-selected={false}
            aria-grabbed={isDragging || undefined}
            draggable
            onDragStart={handleDragStart(idx)}
            onDragOver={handleDragOver(idx)}
            onDragLeave={() => setOverIdx(null)}
            onDrop={handleDrop(idx)}
            onDragEnd={handleDragEnd}
            tabIndex={0}
            onKeyDown={handleKeyDown(idx)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--ref-frame-space-2)",
              height: itemH,
              paddingInline: "var(--ref-frame-space-3)",
              borderRadius: "var(--sys-frame-radius-sm)",
              border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
              background: isDragging
                ? "var(--sys-energy-surface-accent-subtle)"
                : isOver
                  ? "var(--sys-energy-state-hover)"
                  : "var(--sys-energy-surface-primary)",
              opacity: isDragging ? 0.5 : 1,
              cursor: "grab",
              transition:
                "background var(--sys-momentum-transition-fast), opacity var(--sys-momentum-transition-fast)",
              outline: "none",
              borderTop: isOver ? "2px solid var(--sys-energy-status-info)" : undefined,
            }}
          >
            {handle && (
              <Stack
                gap={0}
                style={{
                  gap: "var(--comp-drag-handle-row-gap)",
                  cursor: "grab",
                  color: "var(--sys-energy-text-tertiary)",
                  flexShrink: 0,
                }}
              >
                <Inline gap={0} style={{ gap: "var(--comp-drag-handle-dot-gap)" }}>
                  <div
                    style={{ width: "var(--comp-drag-handle-dot-size)", height: "var(--comp-drag-handle-dot-size)", borderRadius: "50%", background: "currentColor" }}
                  />
                  <div
                    style={{ width: "var(--comp-drag-handle-dot-size)", height: "var(--comp-drag-handle-dot-size)", borderRadius: "50%", background: "currentColor" }}
                  />
                </Inline>
                <Inline gap={0} style={{ gap: "var(--comp-drag-handle-dot-gap)" }}>
                  <div
                    style={{ width: "var(--comp-drag-handle-dot-size)", height: "var(--comp-drag-handle-dot-size)", borderRadius: "50%", background: "currentColor" }}
                  />
                  <div
                    style={{ width: "var(--comp-drag-handle-dot-size)", height: "var(--comp-drag-handle-dot-size)", borderRadius: "50%", background: "currentColor" }}
                  />
                </Inline>
                <Inline gap={0} style={{ gap: "var(--comp-drag-handle-dot-gap)" }}>
                  <div
                    style={{ width: "var(--comp-drag-handle-dot-size)", height: "var(--comp-drag-handle-dot-size)", borderRadius: "50%", background: "currentColor" }}
                  />
                  <div
                    style={{ width: "var(--comp-drag-handle-dot-size)", height: "var(--comp-drag-handle-dot-size)", borderRadius: "50%", background: "currentColor" }}
                  />
                </Inline>
              </Stack>
            )}
            <Text role="paragraph-s" style={{ flex: 1, minWidth: 0 }}>
              {item.content}
            </Text>
          </div>
        );
      })}
    </div>
  );
});
FlowDragSortableList.displayName = "FlowDragSortableList";
