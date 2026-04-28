/** FLOW — FlowSlider (L3 Component) */
import "../../css/selection/Slider.css";
import React, { type CSSProperties, forwardRef, useCallback, useId, useRef, useState } from "react";

import { GrowthObserver, stateAttrs, Text } from "@flow/primitives";

/** Props for FlowSlider — a range slider for selecting numeric values with optional label and marks. */
export interface SliderProps {
  /** Label text */
  label?: string;
  /** Current value */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Change handler */
  onChange?: (value: number) => void;
  /** Show current value display */
  showValue?: boolean;
  /** Format value for display */
  formatValue?: (value: number) => string;
  /** Show min/max marks */
  showMarks?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowSlider = forwardRef<HTMLDivElement, SliderProps>(function FlowSlider(
  {
    label,
    value: controlledValue,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    onChange,
    showValue = true,
    formatValue,
    showMarks = false,
    disabled = false,
    "aria-label": ariaLabel,
    className = "",
    style,
    ...rest
  },
  ref,
) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? controlledValue : internalValue;
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const sliderId = useId();

  const percentage = ((currentValue - min) / (max - min)) * 100;
  const displayValue = formatValue ? formatValue(currentValue) : String(currentValue);

  const updateValue = useCallback(
    (clientX: number) => {
      if (!trackRef.current || disabled) return;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const rawValue = min + ratio * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));

      if (!isControlled) setInternalValue(clampedValue);
      onChange?.(clampedValue);
    },
    [disabled, min, max, step, isControlled, onChange],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      dragging.current = true;
      updateValue(e.clientX);
      e.currentTarget.dispatchEvent(
        new CustomEvent("flow:interaction", {
          bubbles: true,
          detail: {
            event: "flow.component.interaction",
            component: "FlowSlider",
            action: "change",
          },
        }),
      );

      const handleMouseMove = (ev: MouseEvent) => {
        if (dragging.current) updateValue(ev.clientX);
      };
      const handleMouseUp = () => {
        dragging.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [disabled, updateValue],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled) return;
      dragging.current = true;
      updateValue(e.touches[0].clientX);

      const handleTouchMove = (ev: TouchEvent) => {
        if (dragging.current) updateValue(ev.touches[0].clientX);
      };
      const handleTouchEnd = () => {
        dragging.current = false;
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
      document.addEventListener("touchmove", handleTouchMove, { passive: true });
      document.addEventListener("touchend", handleTouchEnd);
    },
    [disabled, updateValue],
  );

  // Keyboard handling on thumb
  const handleThumbKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      let newValue = currentValue;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          newValue = Math.min(max, currentValue + step);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          newValue = Math.max(min, currentValue - step);
          break;
        case "Home":
          e.preventDefault();
          newValue = min;
          break;
        case "End":
          e.preventDefault();
          newValue = max;
          break;
        default:
          return;
      }
      if (!isControlled) setInternalValue(newValue);
      onChange?.(newValue);
    },
    [disabled, currentValue, min, max, step, isControlled, onChange],
  );

  return (
    <GrowthObserver event="flow.slider.impression" properties={{}} inline>
      <div
        ref={ref}
        {...rest}
        className={`flow-slider ${className}`}
        {...stateAttrs({ disabled })}
        style={style}
      >
        {(label || showValue) && (
          <div className="flow-slider-header">
            {label && (
              <Text as="label" variant="label-m" htmlFor={sliderId} className="flow-slider-label">
                {label}
              </Text>
            )}
            {showValue && (
              <Text as="span" variant="label-s" className="flow-slider-value" aria-live="polite">
                {displayValue}
              </Text>
            )}
          </div>
        )}
        <div
          ref={trackRef}
          className="flow-slider-track-container"
          role="presentation"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="flow-slider-track">
            <div className="flow-slider-fill" style={{ width: `${percentage}%` }} />
          </div>
          <div
            ref={thumbRef}
            className="flow-slider-thumb flow-focusable"
            role="slider"
            aria-valuenow={currentValue}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-label={ariaLabel || label}
            tabIndex={disabled ? -1 : 0}
            style={{ left: `${percentage}%` }}
            onKeyDown={handleThumbKeyDown}
          />
          <input
            type="range"
            id={sliderId}
            className="flow-slider-input"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            disabled={disabled}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (!isControlled) setInternalValue(v);
              onChange?.(v);
            }}
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>

        {showMarks && (
          <div className="flow-slider-marks">
            <Text as="span" variant="caption" color="secondary" className="flow-slider-mark">
              {formatValue ? formatValue(min) : min}
            </Text>
            <Text as="span" variant="caption" color="secondary" className="flow-slider-mark">
              {formatValue ? formatValue(max) : max}
            </Text>
          </div>
        )}
      </div>
    </GrowthObserver>
  );
});
