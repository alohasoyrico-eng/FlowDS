/** FLOW — FlowTooltip (L3 Component) */
import "../../css/overlays/Tooltip.css";
import {
  forwardRef,
  type ReactNode,
  type Ref,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  GrowthObserver,
  Surface,
  Text,
  type Tone,
  useFlowAnnounce,
  useFlowDefaultSize,
} from "@flow/primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TOOLTIP — Accessible tooltip on hover/focus
// Renders as a positioned overlay. Pure CSS would be ideal
// but we need portal + position awareness for edge cases.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type TooltipPosition = "top" | "bottom" | "left" | "right";

/** Props for FlowTooltip — accessible tooltip shown on hover/focus with configurable position and delay. */
export interface TooltipProps {
  /** Tooltip content */
  content: ReactNode;
  /** Position relative to trigger */
  position?: TooltipPosition;
  /** Delay before showing (ms) */
  delay?: number;
  /** Whether tooltip is disabled */
  disabled?: boolean;
  /** Unified size — sm/md/lg/xl, controls font-size + padding */
  size?: "sm" | "md" | "lg" | "xl";
  /** Tone variant */
  tone?: Tone;
  /** Trigger element the tooltip is anchored to */
  children: ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export const FlowTooltip = forwardRef<HTMLSpanElement, TooltipProps>(function FlowTooltip(
  {
    content,
    position = "top",
    delay = 200,
    disabled = false,
    size,
    tone,
    children,
    className = "",
    ...rest
  },
  ref,
) {
  const resolvedSize = useFlowDefaultSize(size);
  const announce = useFlowAnnounce();

  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const tooltipId = useId();

  const show = useCallback(() => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  }, [disabled, delay]);

  const hide = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  // Announce tooltip content to screen readers when visible
  useEffect(() => {
    if (visible && typeof content === "string") {
      announce(content);
    }
  }, [visible, content, announce]);

  return (
    <GrowthObserver event="flow.tooltip.impression" properties={{ position }} inline>
      <span
        {...rest}
        className={`flow-tooltip-trigger ${className}`}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        aria-describedby={visible ? tooltipId : undefined}
      >
        {children}
        {visible && (
          <Surface
            ref={ref as Ref<HTMLDivElement>}
            as="span"
            id={tooltipId}
            role="tooltip"
            className="flow-tooltip"
            variant="inverse"
            elevation={1}
            border={false}
            data-position={position}
            data-size={resolvedSize}
            data-tone={tone}
          >
            <Text as="span" variant="caption" color="inherit">
              {content}
            </Text>
            <span className="flow-tooltip-arrow" />
          </Surface>
        )}
      </span>
    </GrowthObserver>
  );
});
