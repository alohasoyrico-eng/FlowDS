/** FLOW — FlowSplitPane (L3 Component) */
import React, {
  type CSSProperties,
  forwardRef,
  type KeyboardEvent,
  type MutableRefObject,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";

import { Surface } from "@flow/primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SPLIT PANE — Resizable split panels (horizontal/vertical)
//    Drag divider to resize; keyboard resize with arrow keys
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Props for FlowSplitPane — resizable split panels with a draggable divider for horizontal or vertical layouts. */
export interface SplitPaneProps {
  direction?: "horizontal" | "vertical";
  defaultSplit?: number; // 0–100 percentage
  minFirst?: number;
  minSecond?: number;
  first: ReactNode;
  second: ReactNode;
  /** Disabled state — drag handle not interactive */
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const FlowSplitPane = forwardRef<HTMLDivElement, SplitPaneProps>(function FlowSplitPane(
  {
    direction = "horizontal",
    defaultSplit = 50,
    minFirst = 10,
    minSecond = 10,
    first,
    second,
    disabled = false,
    className = "",
    style,
    ...rest
  },
  ref,
) {
  const [split, setSplit] = useState(defaultSplit);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setRefs = (node: HTMLDivElement | null) => {
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = node;
  };

  const isHoriz = direction === "horizontal";

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pos = isHoriz
        ? ((e.clientX - rect.left) / rect.width) * 100
        : ((e.clientY - rect.top) / rect.height) * 100;
      setSplit(Math.max(minFirst, Math.min(100 - minSecond, pos)));
    },
    [isHoriz, minFirst, minSecond],
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const step = e.shiftKey ? 10 : 2;
      if ((isHoriz && e.key === "ArrowLeft") || (!isHoriz && e.key === "ArrowUp")) {
        e.preventDefault();
        setSplit((s) => Math.max(minFirst, s - step));
      } else if ((isHoriz && e.key === "ArrowRight") || (!isHoriz && e.key === "ArrowDown")) {
        e.preventDefault();
        setSplit((s) => Math.min(100 - minSecond, s + step));
      } else if (e.key === "Home") {
        e.preventDefault();
        setSplit(minFirst);
      } else if (e.key === "End") {
        e.preventDefault();
        setSplit(100 - minSecond);
      }
    },
    [isHoriz, minFirst, minSecond],
  );

  return (
    <div
      ref={setRefs}
      {...rest}
      className={`flow-split-pane ${className}`}
      data-state={disabled ? "disabled" : undefined}
      aria-disabled={disabled || undefined}
      style={{
        display: "flex",
        flexDirection: isHoriz ? "row" : "column",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
        borderRadius: "var(--sys-frame-radius-container)",
        ...style,
      }}
    >
      <Surface
        padding="none"
        border={false}
        elevation={0}
        radius="none"
        style={{
          [isHoriz ? "width" : "height"]: `${split}%`,
          overflow: "auto",
          minWidth: 0,
          minHeight: 0,
        }}
      >
        {first}
      </Surface>
      <div
        role="separator"
        aria-orientation={isHoriz ? "vertical" : "horizontal"}
        aria-valuenow={Math.round(split)}
        aria-valuemin={minFirst}
        aria-valuemax={100 - minSecond}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onPointerDown={disabled ? undefined : onPointerDown}
        onPointerMove={disabled ? undefined : onPointerMove}
        onPointerUp={disabled ? undefined : onPointerUp}
        onKeyDown={disabled ? undefined : onKeyDown}
        style={{
          [isHoriz ? "width" : "height"]: "var(--comp-split-pane-separator-size)",
          [isHoriz ? "minWidth" : "minHeight"]: "var(--comp-split-pane-separator-size)",
          background: "var(--sys-energy-surface-secondary)",
          cursor: disabled ? "default" : isHoriz ? "col-resize" : "row-resize",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          outline: "none",
          transition: "background var(--sys-momentum-transition-fast)",
          borderInline: isHoriz
            ? "var(--sys-frame-border-thin) solid var(--sys-energy-border-subtle)"
            : "none",
          borderBlock: !isHoriz
            ? "var(--sys-frame-border-thin) solid var(--sys-energy-border-subtle)"
            : "none",
        }}
        onFocus={(e) => {
          (e.currentTarget as HTMLElement).style.background = "var(--sys-energy-status-info)";
          (e.currentTarget as HTMLElement).style.opacity = "0.3";
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLElement).style.background = "var(--sys-energy-surface-secondary)";
          (e.currentTarget as HTMLElement).style.opacity = "1";
        }}
      >
        <div
          style={{
            [isHoriz ? "width" : "height"]: "var(--comp-split-pane-handle-width)",
            [isHoriz ? "height" : "width"]: "var(--comp-split-pane-handle-length)",
            borderRadius: "var(--ref-frame-radius-1)",
            background: "var(--sys-energy-border-default)",
            opacity: "var(--ref-state-opacity-dimmed)",
          }}
        />
      </div>
      <Surface
        padding="none"
        border={false}
        elevation={0}
        radius="none"
        style={{ flex: 1, overflow: "auto", minWidth: 0, minHeight: 0 }}
      >
        {second}
      </Surface>
    </div>
  );
});
