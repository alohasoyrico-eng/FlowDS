/**
 * FLOW Design System — Form Primitives
 * ─────────────────────────────────────
 * FormField, FocusRing, StateLayer.
 */
import { type CSSProperties, type ReactNode, useId } from "react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FormField (form layout primitive)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function FormField({
  label,
  htmlFor,
  helperText,
  error,
  success,
  required,
  fullWidth,
  children,
  className = "",
  style,
}: FormFieldProps) {
  const autoId = useId();
  const fieldId = htmlFor || autoId;
  const helperId = `${fieldId}-helper`;
  const hasMessage = !!(error || helperText);

  return (
    <div
      className={`flow-form-field ${className}`.trim()}
      data-full-width={fullWidth || undefined}
      style={style}
    >
      {label && (
        <label htmlFor={fieldId} className="flow-label-l flow-text">
          {label}
          {required && (
            <span className="flow-form-field-required" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {hasMessage && (
        <span
          id={helperId}
          className="flow-caption flow-form-field-message"
          role={error ? "alert" : undefined}
          data-error={error ? "" : undefined}
          data-success={!error && success ? "" : undefined}
        >
          {error || helperText}
        </span>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FocusRing (utility component)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface FocusRingProps {
  /** Color token for the ring. Defaults to sys focus ring color. */
  color?: string;
  /** Ring width. Defaults to sys focus ring width. */
  width?: string;
  /** Ring offset from element edge. Defaults to sys focus ring offset. */
  offset?: string;
  /** Whether the ring is currently visible (e.g. :focus-visible triggered). */
  visible?: boolean;
  /** Render as inset ring instead of outline offset */
  inset?: boolean;
  children: ReactNode;
}

/**
 * FocusRing — renders a visible focus indicator around its child.
 * Consumes sys.state.focusRing tokens for width, offset, and color.
 * When `visible` is undefined, defers to CSS :focus-visible.
 * When `visible` is explicitly true/false, controls ring programmatically.
 */
export function FocusRing({
  color: _color = "var(--sys-state-focus-ring-color)",
  width: _width = "var(--sys-state-focus-ring-width)",
  offset: _offset = "var(--sys-state-focus-ring-offset)",
  visible,
  inset = false,
  children,
}: FocusRingProps) {
  return (
    <div className="flow-focus-ring-container" data-focus-visible={visible}>
      <div
        className={`flow-focus-ring${visible === true ? " flow-focus-ring--active" : ""}`}
        data-inset={inset || undefined}
      >
        {children}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// StateLayer (utility component)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type StateLayerState = "idle" | "hover" | "pressed" | "selected" | "dragging";

interface StateLayerProps {
  /** Current interaction state. Controls overlay opacity/color. */
  state?: StateLayerState;
  /** Custom overlay color. Defaults to sys.state hover/pressed overlays. */
  color?: string;
  /** Whether the layer is disabled (renders at disabled opacity). */
  disabled?: boolean;
  /** Whether to clip the overlay to parent's border-radius. */
  clip?: boolean;
  children: ReactNode;
}

const stateLayerOverlayMap: Record<StateLayerState, { bg: string; opacity: number }> = {
  idle: { bg: "transparent", opacity: 0 },
  hover: { bg: "var(--sys-state-hover-overlay)", opacity: 1 },
  pressed: { bg: "var(--sys-state-pressed-overlay)", opacity: 1 },
  selected: { bg: "var(--sys-state-selected-overlay)", opacity: 1 },
  dragging: { bg: "var(--sys-state-selected-overlay)", opacity: 0.6 },
};

/**
 * StateLayer — renders a semi-transparent overlay inside its child to communicate
 * interaction state (hover, pressed, selected, dragging).
 * Consumes sys.state.* overlay tokens. The overlay is positioned absolute, inset: 0,
 * pointer-events: none, and transitions using Momentum tokens.
 */
export function StateLayer({
  state = "idle",
  color,
  disabled = false,
  clip = true,
  children,
}: StateLayerProps) {
  const overlay = stateLayerOverlayMap[state];

  return (
    <div
      className="flow-state-layer-container"
      data-clip={clip || undefined}
      data-disabled={disabled || undefined}
    >
      {children}
      <div
        className="flow-state-layer"
        aria-hidden="true"
        data-state-layer={state}
        style={
          {
            "--_state-layer-bg": color || overlay.bg,
            "--_state-layer-opacity": color ? (state === "idle" ? 0 : 1) : overlay.opacity,
          } as CSSProperties
        }
      />
    </div>
  );
}
