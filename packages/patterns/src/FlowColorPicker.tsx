/** FLOW — FlowColorPicker (L4 Pattern) */
import "../css/ColorPicker.css";
import { type CSSProperties, forwardRef, useEffect, useRef, useState } from "react";

import {
  ActionSurface,
  GrowthObserver,
  Inline,
  Stack,
  stateAttrs,
  Text,
  useFlowDefaultSize,
} from "@flow/primitives";
import { FlowSlider, FlowTextInput } from "@flow/components";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COLOR PICKER — HSL/Hex color selection with swatches
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Props for FlowColorPicker — HSL/hex color selection with sliders and preset swatches. */
export interface ColorPickerProps {
  /** Controlled hex color value */
  value?: string;
  /** Default hex color (uncontrolled) */
  defaultValue?: string;
  /** Callback fired when the color changes */
  onChange?: (color: string) => void;
  /** Preset color swatches */
  swatches?: string[];
  /** Label text for the picker */
  label?: string;
  /** Picker size variant */
  size?: "sm" | "md" | "lg";
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

const DEFAULT_SWATCHES = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#6b7280",
  "#000000",
];

function hexToHsl(hex: string): [number, number, number] {
  let r = 0,
    g = 0,
    b = 0;
  const h = hex.replace("#", "");
  if (h.length === 3) {
    r = parseInt(h[0] + h[0], 16) / 255;
    g = parseInt(h[1] + h[1], 16) / 255;
    b = parseInt(h[2] + h[2], 16) / 255;
  } else if (h.length === 6) {
    r = parseInt(h.slice(0, 2), 16) / 255;
    g = parseInt(h.slice(2, 4), 16) / 255;
    b = parseInt(h.slice(4, 6), 16) / 255;
  }
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let hue = 0,
    sat = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    sat = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) hue = ((b - r) / d + 2) / 6;
    else hue = ((r - g) / d + 4) / 6;
  }
  return [Math.round(hue * 360), Math.round(sat * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  const sN = s / 100,
    lN = l / 100;
  const a = sN * Math.min(lN, 1 - lN);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = lN - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export const FlowColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  function FlowColorPicker(
    {
      value,
      defaultValue = "#3b82f6",
      onChange,
      swatches = DEFAULT_SWATCHES,
      label,
      size = "md",
      disabled = false,
      className = "",
      style,
      ...rest
    },
    ref,
  ) {
    const resolvedSize = useFlowDefaultSize(size);
    const [internal, setInternal] = useState(defaultValue);
    const color = value ?? internal;
    const set = (c: string) => {
      setInternal(c);
      onChange?.(c);
    };

    const [hue, sat, light] = hexToHsl(color);
    const [hexInput, setHexInput] = useState(color);
    const [prevColor, setPrevColor] = useState(color);
    if (color !== prevColor) {
      setPrevColor(color);
      setHexInput(color);
    }

    const swatchSize = resolvedSize === "sm" ? 20 : resolvedSize === "lg" ? 32 : 26;
    const _sliderH = resolvedSize === "sm" ? 12 : resolvedSize === "lg" ? 20 : 16;

    const handleHueChange = (newHue: number) => {
      set(hslToHex(newHue, sat, light));
    };

    const handleSatChange = (newSat: number) => {
      set(hslToHex(hue, newSat, light));
    };

    const handleLightChange = (newLight: number) => {
      set(hslToHex(hue, sat, newLight));
    };

    const commitHex = () => {
      const clean = hexInput.startsWith("#") ? hexInput : `#${hexInput}`;
      if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(clean)) {
        set(clean.toLowerCase());
      } else {
        setHexInput(color);
      }
    };

    // Ref to the FlowTextInput inner <input> for imperative aria + event setup
    const hexInputRef = useRef<HTMLInputElement>(null);
    const commitHexRef = useRef(commitHex);

    // Keep ref in sync with latest commitHex closure (must be in effect, not render)
    useEffect(() => {
      commitHexRef.current = commitHex;
    });

    useEffect(() => {
      const el = hexInputRef.current;
      if (!el) return;
      el.setAttribute("aria-label", "Hex color value");
      const handleBlur = () => commitHexRef.current();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") commitHexRef.current();
      };
      el.addEventListener("blur", handleBlur);
      el.addEventListener("keydown", handleKeyDown);
      return () => {
        el.removeEventListener("blur", handleBlur);
        el.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

    return (
      <GrowthObserver event="flow.color-picker.impression">
        <div
          ref={ref}
          {...rest}
          className={`flow-color-picker ${className}`}
          data-size={resolvedSize}
          {...stateAttrs({ disabled })}
          style={style}
        >
          {label && (
            <Text variant="paragraph-s" color="secondary">
              {label}
            </Text>
          )}

          {/* Preview */}
          <div className="flow-color-picker-preview">
            <div className="flow-color-picker-swatch-preview" style={{ background: color }} />
            <Stack gap={1}>
              <FlowTextInput
                ref={hexInputRef}
                value={hexInput}
                onChange={(val) => setHexInput(val)}
                size={resolvedSize}
                disabled={disabled}
                className="flow-color-picker-hex-input"
              />
              <Text variant="caption" color="secondary">
                HSL: {hue}, {sat}%, {light}%
              </Text>
            </Stack>
          </div>

          {/* Hue slider */}
          <FlowSlider
            label="Hue"
            min={0}
            max={360}
            value={hue}
            onChange={handleHueChange}
            disabled={disabled}
            className="flow-color-picker-slider-group"
          />

          {/* Saturation slider */}
          <FlowSlider
            label="Saturation"
            min={0}
            max={100}
            value={sat}
            onChange={handleSatChange}
            disabled={disabled}
            className="flow-color-picker-slider-group"
          />

          {/* Lightness slider */}
          <FlowSlider
            label="Lightness"
            min={0}
            max={100}
            value={light}
            onChange={handleLightChange}
            disabled={disabled}
            className="flow-color-picker-slider-group"
          />

          {/* Swatches */}
          {swatches.length > 0 && (
            <Inline wrap className="flow-color-picker-swatches" gap={2}>
              {swatches.map((sw) => (
                <ActionSurface
                  key={sw}
                  onPress={() => set(sw)}
                  aria-label={`Select color ${sw}`}
                  className="flow-color-picker-swatch"
                  selected={color === sw}
                  data-selected={color === sw || undefined}
                  style={{ width: swatchSize, height: swatchSize, background: sw }}
                >
                  <span />
                </ActionSurface>
              ))}
            </Inline>
          )}
        </div>
      </GrowthObserver>
    );
  },
);
FlowColorPicker.displayName = "FlowColorPicker";
