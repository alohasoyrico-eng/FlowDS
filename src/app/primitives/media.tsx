/**
 * FLOW Design System — Media Primitives
 * ──────────────────────────────────────
 * FlowIcon, FlowFlag, Divider.
 */
import React, { type CSSProperties, useEffect, useState } from "react";

import { type FlowIcon as FlowIconDef, flowIcons } from "../icons";
import { FLAG_CELL_SIZE, flagByCode, type FlagSize, flagSizeMap } from "../flags";
import type { SpaceToken } from "./types";
import { spaceMap } from "./types";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowIcon (Iconography primitive)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
/* iconSizeMap moved to CSS: .flow-icon[data-size] in flow.css */

interface FlowIconProps {
  name: string;
  size?: IconSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function FlowIcon({
  name,
  size = "md",
  color = "currentColor",
  className = "",
  style,
}: FlowIconProps) {
  const icon: FlowIconDef | undefined = flowIcons[name];
  if (!icon) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[FlowIcon] Unknown icon name: "${name}"`);
    }
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        aria-label={`Missing icon: ${name}`}
        role="img"
        className={`flow-icon ${className}`.trim()}
        data-size={size}
        style={style}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="4 2" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="12" y1="8" x2="12" y2="16" />
      </svg>
    );
  }

  return (
    <svg
      viewBox={icon.viewBox}
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label={icon.label}
      role="img"
      className={`flow-icon ${className}`.trim()}
      data-size={size}
      style={style}
    >
      <path d={icon.path} />
    </svg>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowFlag (Flag primitive — sprite-clip model)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Renders a single country flag from the Figma Edenred flag sprite (Frame8).
 * Uses the sprite-clip technique: renders the full Frame8 inside a circular
 * overflow:hidden container, positioning it so only the target flag is visible.
 *
 * Sizes: xs=16, sm=20, md=24, lg=32, xl=40 (native sprite resolution).
 *
 * NOTE: Each FlowFlag instance renders the full Frame8 sprite (~300 SVG paths).
 * This is fine for production use (1-5 flags visible at a time) but can be heavy
 * when rendering all 48 simultaneously (explorer page). Future optimization:
 * extract individual flag SVGs into standalone entries (like icons.ts does).
 */

// Lazy import — Frame8 is only loaded when the first FlowFlag renders
let Frame8Component: (() => JSX.Element) | null = null;
let frame8Promise: Promise<void> | null = null;

function useFrame8() {
  const [ready, setReady] = useState(Frame8Component !== null);

  useEffect(() => {
    if (Frame8Component) {
      setReady(true);
      return;
    }
    if (!frame8Promise) {
      frame8Promise = import("../../imports/Frame8").then((mod) => {
        Frame8Component = mod.default;
      });
    }
    frame8Promise.then(() => setReady(true));
  }, []);

  return ready;
}

interface FlowFlagProps {
  /** ISO 3166-1 alpha-2 code (uppercase), e.g. "FR", "BR", "BE" */
  code: string;
  /** Display size preset */
  size?: FlagSize;
  /** Additional className */
  className?: string;
  /** Additional style */
  style?: CSSProperties;
}

export function FlowFlag({ code, size = "md", className = "", style }: FlowFlagProps) {
  const entry = flagByCode[code];
  const frame8Ready = useFrame8();

  if (!entry || !frame8Ready || !Frame8Component) return null;

  const dim = flagSizeMap[size];
  const scale = dim / FLAG_CELL_SIZE; // native=40px

  return (
    <div
      className={className}
      role="img"
      aria-label={`${entry.name} flag`}
      style={{
        width: dim,
        height: dim,
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
        position: "relative",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -entry.x * scale,
          top: -entry.y * scale,
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
          width: 1400, // wider than sprite to avoid clipping
          height: 250,
          pointerEvents: "none",
        }}
      >
        <Frame8Component />
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Divider
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function Divider({
  spacing = 10,
  orientation,
  style,
}: {
  spacing?: SpaceToken;
  orientation?: "horizontal" | "vertical";
  style?: React.CSSProperties;
}) {
  return (
    <hr
      className="flow-divider"
      data-orientation={orientation}
      style={{
        ...(spacing > 0 ? ({ "--_spacing": spaceMap[spacing] } as CSSProperties) : {}),
        ...style,
      }}
    />
  );
}
