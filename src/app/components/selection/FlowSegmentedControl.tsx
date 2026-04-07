/** FLOW — FlowSegmentedControl (L3 Component) */
import React, { type CSSProperties, forwardRef, type ReactNode, useCallback, useRef, useState } from "react";

import { FlowIcon, GrowthObserver, Surface } from "../../primitives";
import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";

type SegmentedSize = "sm" | "md" | "lg" | "xl";

export interface SegmentOption {
  /** Unique value */
  value: string;
  /** Display label */
  label: ReactNode;
  /** Optional icon */
  icon?: string;
  /** Disabled */
  disabled?: boolean;
}

/** Props for FlowSegmentedControl — a mutually exclusive segmented option picker with animated indicator. */
export interface SegmentedControlProps {
  /** Options */
  options: SegmentOption[];
  /** Controlled value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Size */
  size?: SegmentedSize;
  /** Full width — stretches to fill container */
  fullWidth?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowSegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  function FlowSegmentedControl({
    options,
    value: controlledValue,
    defaultValue,
    onChange,
    size = "md",
    fullWidth = false,
    "aria-label": ariaLabel = "Options",
    className = "",
    style,
    ...rest
  }, ref) {
  const resolvedSize = useFlowDefaultSize(size);
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || (options[0]?.value ?? ""));
  const value = isControlled ? controlledValue : internalValue;
  const groupRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(
    (val: string) => {
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
    },
    [isControlled, onChange],
  );

  // Keyboard navigation: arrow keys
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const enabledOptions = options.filter((o) => !o.disabled);
      const currentIdx = enabledOptions.findIndex((o) => o.value === value);
      let nextIdx = currentIdx;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          nextIdx = (currentIdx + 1) % enabledOptions.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          nextIdx = (currentIdx - 1 + enabledOptions.length) % enabledOptions.length;
          break;
        case "Home":
          e.preventDefault();
          nextIdx = 0;
          break;
        case "End":
          e.preventDefault();
          nextIdx = enabledOptions.length - 1;
          break;
        default:
          return;
      }

      const nextVal = enabledOptions[nextIdx].value;
      handleSelect(nextVal);

      // Focus the newly selected button
      const btn = groupRef.current?.querySelector(
        `[data-segment-value="${nextVal}"]`,
      ) as HTMLElement | null;
      btn?.focus();
    },
    [options, value, handleSelect],
  );

  return (
    <GrowthObserver event="flow.segmented-control.impression" properties={{ size: resolvedSize }} inline>
    <Surface
      {...rest}
      ref={(node) => {
        (groupRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={`flow-segmented ${className}`}
      role="radiogroup"
      tabIndex={-1}
      aria-label={ariaLabel}
      data-size={resolvedSize}
      data-full-width={fullWidth || undefined}
      onKeyDown={handleKeyDown}
      style={style}
      elevation={0}
      border={false}
      padding="none"
    >
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            className="flow-segmented-btn"
            role="radio"
            aria-checked={isActive}
            tabIndex={isActive ? 0 : -1}
            disabled={opt.disabled}
            data-segment-value={opt.value}
            onClick={() => !opt.disabled && handleSelect(opt.value)}
          >
            {opt.icon && <FlowIcon name={opt.icon} size="sm" />}
            {opt.label}
          </button>
        );
      })}
    </Surface>
    </GrowthObserver>
  );
}
);
