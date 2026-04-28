/**
 * FLOW Design System — Surface Primitives
 * ────────────────────────────────────────
 * Surface, ActionSurface, Overlay.
 */
import React, { type CSSProperties, type ElementType, forwardRef, type ReactNode } from "react";

import { resolvePadding, resolveRadius, resolveState } from "./types";
import type { PaddingValue, RadiusValue } from "./types";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Surface
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type Elevation = 0 | 1 | 2 | 3 | 4;
type SurfaceVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "sunken"
  | "inverse"
  | "accent"
  | "filled"
  | "outlined";

interface SurfaceProps {
  elevation?: Elevation;
  variant?: SurfaceVariant;
  radius?: RadiusValue;
  border?: boolean;
  padding?: PaddingValue;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  id?: string;
  role?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-modal"?: boolean | "true" | "false";
  tabIndex?: number;
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  [key: `data-${string}`]: unknown;
}

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  (
    {
      elevation = 0,
      variant = "primary",
      radius = "container",
      border = true,
      padding = "container",
      children,
      className = "",
      style,
      as: Tag = "div",
      ...rest
    },
    ref,
  ) => {
    // Filter out non-HTML props that may come from parent components
    const {
      onPress: _onPress,
      disabled: _disabled,
      loading: _loading,
      selected: _selected,
      ...htmlProps
    } = rest as Record<string, unknown>;

    return (
      <Tag
        ref={ref}
        className={`flow-surface ${className}`.trim()}
        data-border={border || undefined}
        data-elevation={elevation > 0 ? elevation : undefined}
        style={
          {
            "--_surface-bg": `var(--sys-energy-surface-${variant})`,
            "--_surface-radius": resolveRadius(radius),
            "--_surface-padding": resolvePadding(padding),
            ...style,
          } as CSSProperties
        }
        {...htmlProps}
      >
        {children}
      </Tag>
    );
  },
);
Surface.displayName = "Surface";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ActionSurface (interactive primitive)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface ActionSurfaceProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "type"
> {
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  selected?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
}

export const ActionSurface = forwardRef<HTMLButtonElement, ActionSurfaceProps>(
  (
    {
      onPress,
      disabled,
      loading,
      selected,
      children,
      className = "",
      style,
      type = "button",
      ...rest
    },
    ref,
  ) => {
    const resolved = resolveState({ disabled, loading, selected });
    const isInert = resolved === "disabled" || resolved === "loading";

    // Modularity: only force data-state when ActionSurface controls behavior (disabled/loading).
    // Otherwise, let consumer's data-state (e.g. from stateAttrs with error/success) pass through via rest.
    // If consumer didn't set one, fall back to ActionSurface's resolved state.
    const consumerState = (rest as Record<string, unknown>)["data-state"];
    const dataState = isInert ? resolved : ((consumerState as string | undefined) ?? resolved);

    return (
      <button
        ref={ref}
        {...rest}
        type={type}
        onClick={isInert ? undefined : onPress}
        disabled={isInert}
        data-state={dataState}
        className={`flow-action-surface flow-focusable ${className}`.trim()}
        style={style}
      >
        {children}
      </button>
    );
  },
);
ActionSurface.displayName = "ActionSurface";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Overlay (modal dimming primitive)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface OverlayProps {
  visible: boolean;
  onDismiss?: () => void;
  dismissible?: boolean;
  children?: ReactNode;
}

export function Overlay({ visible, onDismiss, dismissible = true, children }: OverlayProps) {
  if (!visible) return null;

  return (
    <div
      className="flow-overlay"
      role="presentation"
      onClick={dismissible ? onDismiss : undefined}
      onKeyDown={
        dismissible
          ? (e) => {
              if (e.key === "Escape") onDismiss?.();
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
