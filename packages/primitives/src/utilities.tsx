/**
 * FLOW Design System — Utility Primitives
 * ────────────────────────────────────────
 * Code, CodeBlock, MotionContainer, GrowthObserver.
 */
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Code (inline) & CodeBlock
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function Code({ children }: { children: ReactNode }) {
  return <code className="flow-inline-code">{children}</code>;
}

export function CodeBlock({ children }: { children: ReactNode }) {
  return <pre className="flow-code">{children}</pre>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MotionContainer
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface MotionContainerProps {
  visible: boolean;
  children: ReactNode;
  className?: string;
}

export function MotionContainer({ visible, children, className = "" }: MotionContainerProps) {
  const [shouldRender, setShouldRender] = useState(visible);

  // Sync render lifecycle with visible prop (setState during render on prop change)
  const [prevVisible, setPrevVisible] = useState(visible);
  if (visible !== prevVisible) {
    setPrevVisible(visible);
    if (visible) setShouldRender(true);
  }

  const handleAnimEnd = useCallback(() => {
    if (!visible) setShouldRender(false);
  }, [visible]);

  if (!shouldRender) return null;

  return (
    <div
      className={`${visible ? "flow-collapse-enter" : "flow-collapse-exit"} ${className}`.trim()}
      onAnimationEnd={handleAnimEnd}
    >
      {children}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GrowthObserver (instrumentation)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface GrowthObserverProps {
  event: string;
  properties?: Record<string, unknown>;
  onVisible?: () => void;
  inline?: boolean;
  children: ReactNode;
}

export function GrowthObserver({
  event,
  properties,
  onVisible,
  inline,
  children,
}: GrowthObserverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const emitted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !emitted.current) {
          emitted.current = true;
          onVisible?.();
          const payload = { ...properties, timestamp: Date.now() };
          if (import.meta.env.DEV) {
            console.debug("[Flow.Growth]", event, payload);
          }
          el.dispatchEvent(
            new CustomEvent("flow:impression", { bubbles: true, detail: { event, ...payload } }),
          );
        }
      },
      { threshold: 0.5 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [event, properties, onVisible]);

  return (
    <div ref={ref} data-flow-growth={event} style={inline ? { display: "contents" } : undefined}>
      {children}
    </div>
  );
}
